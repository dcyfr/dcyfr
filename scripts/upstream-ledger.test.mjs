import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  START,
  END,
  buildQuery,
  escapeCell,
  render,
  search,
  sinceDate,
  splice,
  toRows,
} from './upstream-ledger.mjs';

const item = (over = {}) => ({
  repository_url: 'https://api.github.com/repos/acme/widget',
  number: 7,
  title: 'Fix the widget',
  html_url: 'https://github.com/acme/widget/pull/7',
  state: 'open',
  created_at: '2026-05-01T10:00:00Z',
  pull_request: { merged_at: null },
  ...over,
});

test('sinceDate steps back whole months in UTC', () => {
  assert.equal(sinceDate(new Date('2026-11-17T23:59:00Z'), 12), '2025-11-17');
  assert.equal(sinceDate(new Date('2026-01-05T00:00:00Z'), 2), '2025-11-05');
});

test('buildQuery negates every excluded owner', () => {
  const q = buildQuery({ author: 'dcyfr', exclude: ['user:dcyfr', 'org:dcyfr-labs'], since: '2025-11-17' });
  assert.equal(q, 'author:dcyfr type:pr is:public -user:dcyfr -org:dcyfr-labs created:>=2025-11-17');
});

test('toRows drops closed-unmerged, puts merged first, newest first', () => {
  const rows = toRows([
    item({ number: 1 }),
    item({ number: 2, state: 'closed' }),
    item({ number: 3, state: 'closed', pull_request: { merged_at: '2026-06-02T00:00:00Z' } }),
    item({ number: 4, state: 'closed', pull_request: { merged_at: '2026-09-12T00:00:00Z' } }),
    item({ number: 5, created_at: '2026-07-01T00:00:00Z' }),
  ]);
  assert.deepEqual(
    rows.map((r) => [r.number, r.status, r.date]),
    [
      [4, 'merged', '2026-09-12'],
      [3, 'merged', '2026-06-02'],
      [5, 'open', '2026-07-01'],
      [1, 'open', '2026-05-01'],
    ],
  );
  assert.equal(rows[0].repo, 'acme/widget');
});

test('escapeCell keeps a hostile title inside its cell', () => {
  assert.equal(escapeCell('a | b\n[x](y) <img> *z*'), 'a \\| b \\[x\\](y) \\<img\\> \\*z\\*');
});

test('render counts and formats rows', () => {
  const out = render(
    toRows([
      item({ number: 4, state: 'closed', pull_request: { merged_at: '2026-09-12T00:00:00Z' } }),
      item({ number: 1, repository_url: 'https://api.github.com/repos/other/thing', html_url: 'https://github.com/other/thing/pull/1' }),
    ]),
    { months: 12 },
  );
  assert.equal(
    out,
    [
      '1 merged and 1 open across 2 projects in the last 12 months.',
      '',
      '| Project | Pull request | Status |',
      '| --- | --- | --- |',
      '| [acme/widget](https://github.com/acme/widget) | [#4](https://github.com/acme/widget/pull/7) Fix the widget | merged 2026-09-12 |',
      '| [other/thing](https://github.com/other/thing) | [#1](https://github.com/other/thing/pull/1) Fix the widget | open since 2026-05-01 |',
    ].join('\n'),
  );
});

test('render refuses an empty ledger', () => {
  assert.throws(() => render([], { months: 12 }), /empty ledger/);
});

test('splice replaces only what sits between the markers', () => {
  const readme = `top\n${START}\nold\n${END}\nbottom\n`;
  assert.equal(splice(readme, 'new'), `top\n${START}\nnew\n${END}\nbottom\n`);
  assert.equal(splice(splice(readme, 'new'), 'new'), splice(readme, 'new'));
});

test('splice rejects missing, reversed or repeated markers', () => {
  assert.throws(() => splice('no markers', 'x'), /markers not found/);
  assert.throws(() => splice(`${END}\n${START}`, 'x'), /markers not found/);
  assert.throws(() => splice(`${START}\n${END}\n${START}\n${END}`, 'x'), /more than once/);
});

const reply = (status, body) => async () => ({ ok: status === 200, status, json: async () => body });

test('search fails closed on an HTTP error, a bad body or incomplete results', async () => {
  await assert.rejects(search('q', { fetchImpl: reply(403, { message: 'rate limited' }) }), /HTTP 403/);
  await assert.rejects(search('q', { fetchImpl: reply(200, { message: 'odd' }) }), /no items array/);
  await assert.rejects(
    search('q', { fetchImpl: reply(200, { total_count: 1, incomplete_results: true, items: [item()] }) }),
    /incomplete/,
  );
});

test('search returns the items of a complete single page', async () => {
  const items = await search('q', {
    fetchImpl: reply(200, { total_count: 1, incomplete_results: false, items: [item()] }),
  });
  assert.equal(items.length, 1);
});
