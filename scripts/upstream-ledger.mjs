#!/usr/bin/env node
// Rebuilds the "Upstream" block in README.md from GitHub search.
//
// It lists public pull requests the author opened in repositories they do not
// own, over a rolling window. Merged and open pull requests are listed; closed
// without a merge are left out.
//
// Usage:
//   node scripts/upstream-ledger.mjs --readme README.md   rewrite the block
//   node scripts/upstream-ledger.mjs --print              print the block only
//
// Environment:
//   GITHUB_TOKEN     optional; raises the search rate limit
//   LEDGER_AUTHOR    GitHub login (default: dcyfr)
//   LEDGER_EXCLUDE   comma-separated owners to leave out, as search qualifiers
//                    (default: user:dcyfr,org:dcyfr-labs,org:gameshark-labs)
//   LEDGER_MONTHS    window in months (default: 12)

import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const START = '<!-- upstream-ledger:start -->';
export const END = '<!-- upstream-ledger:end -->';

const API = 'https://api.github.com/search/issues';
const PER_PAGE = 100;
const MAX_PAGES = 5;

export function sinceDate(now, months) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months, now.getUTCDate()));
  return d.toISOString().slice(0, 10);
}

export function buildQuery({ author, exclude, since }) {
  const skip = exclude.map((q) => `-${q}`).join(' ');
  return `author:${author} type:pr is:public ${skip} created:>=${since}`.replace(/\s+/g, ' ');
}

// Keeps a title on one table row and stops it from opening markup of its own.
export function escapeCell(text) {
  return String(text)
    .replace(/[\r\n]+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/([|[\]<>*])/g, '\\$1')
    .trim();
}

export function toRows(items) {
  return items
    .map((item) => {
      const repo = item.repository_url.replace(/^.*\/repos\//, '');
      const mergedAt = item.pull_request?.merged_at ?? null;
      const status = mergedAt ? 'merged' : item.state === 'open' ? 'open' : 'closed';
      return {
        repo,
        number: item.number,
        title: item.title,
        url: item.html_url,
        status,
        date: (mergedAt ?? item.created_at).slice(0, 10),
      };
    })
    .filter((row) => row.status !== 'closed')
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'merged' ? -1 : 1;
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return `${a.repo}#${a.number}`.localeCompare(`${b.repo}#${b.number}`);
    });
}

export function render(rows, { months }) {
  if (rows.length === 0) throw new Error('refusing to write an empty ledger');
  const merged = rows.filter((r) => r.status === 'merged').length;
  const open = rows.length - merged;
  const projects = new Set(rows.map((r) => r.repo)).size;
  const lines = [
    `${merged} merged and ${open} open across ${projects} ${projects === 1 ? 'project' : 'projects'} in the last ${months} months.`,
    '',
    '| Project | Pull request | Status |',
    '| --- | --- | --- |',
  ];
  for (const r of rows) {
    const status = r.status === 'merged' ? `merged ${r.date}` : `open since ${r.date}`;
    lines.push(
      `| [${r.repo}](https://github.com/${r.repo}) | [#${r.number}](${r.url}) ${escapeCell(r.title)} | ${status} |`,
    );
  }
  return lines.join('\n');
}

export function splice(readme, block) {
  const a = readme.indexOf(START);
  const b = readme.indexOf(END);
  if (a === -1 || b === -1 || b < a) throw new Error(`markers not found in order: ${START} ... ${END}`);
  if (readme.indexOf(START, a + 1) !== -1 || readme.indexOf(END, b + 1) !== -1) {
    throw new Error('markers appear more than once');
  }
  return `${readme.slice(0, a + START.length)}\n${block}\n${readme.slice(b)}`;
}

export async function search(query, { token, fetchImpl = fetch } = {}) {
  const items = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = `${API}?q=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`;
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'upstream-ledger' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetchImpl(url, { headers });
    if (!res.ok) throw new Error(`search failed: HTTP ${res.status}`);
    const body = await res.json();
    if (!Array.isArray(body.items)) throw new Error('search returned no items array');
    if (body.incomplete_results) throw new Error('search returned incomplete results');
    items.push(...body.items);
    if (items.length >= body.total_count || body.items.length < PER_PAGE) return items;
  }
  throw new Error(`more than ${MAX_PAGES * PER_PAGE} results; narrow the window`);
}

async function main(argv) {
  const print = argv.includes('--print');
  const at = argv.indexOf('--readme');
  const readmePath = at === -1 ? null : argv[at + 1];
  if (!print && !readmePath) throw new Error('pass --readme <path> or --print');

  const months = Number(process.env.LEDGER_MONTHS ?? 12);
  if (!Number.isInteger(months) || months < 1) throw new Error('LEDGER_MONTHS must be a positive integer');
  const author = process.env.LEDGER_AUTHOR ?? 'dcyfr';
  const exclude = (process.env.LEDGER_EXCLUDE ?? 'user:dcyfr,org:dcyfr-labs,org:gameshark-labs')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const q of [author, ...exclude]) {
    if (!/^[A-Za-z0-9:_.-]+$/.test(q)) throw new Error(`unexpected search qualifier: ${q}`);
  }

  const query = buildQuery({ author, exclude, since: sinceDate(new Date(), months) });
  const items = await search(query, { token: process.env.GITHUB_TOKEN });
  const block = render(toRows(items), { months });

  if (print) {
    console.log(block);
    return;
  }
  const before = readFileSync(readmePath, 'utf8');
  const after = splice(before, block);
  if (after === before) {
    console.log('upstream ledger: no change');
    return;
  }
  writeFileSync(readmePath, after);
  console.log(`upstream ledger: updated ${readmePath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(`upstream ledger: ${err.message}`);
    process.exit(1);
  });
}
