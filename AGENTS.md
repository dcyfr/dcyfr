# AGENTS.md - dcyfr

## Project Overview

Personal/brand hub for the `dcyfr` GitHub presence. This repo is documentation-first: `README.md` is the GitHub profile page rendered at github.com/dcyfr, and it mirrors the positioning, copy and figures on [cyberdrew.dev](https://www.cyberdrew.dev). When the site's content model (`lib/site.ts` in `dcyfr/cyberdrew-dev`) changes, this README is the other place that has to move.

## Working Rules

- Treat `README.md` as the primary source of truth for repo purpose and linked projects.
- Prefer small documentation edits over inventing code structure that is not present.
- When changes affect linked repos, make the change in the target repo instead of expanding this repo arbitrarily.

## Upstream ledger

The table between the `upstream-ledger` markers in `README.md` is generated. Do not edit it by hand: `scripts/upstream-ledger.mjs` rebuilds it from GitHub search, and `.github/workflows/upstream-ledger.yml` commits the result every Monday. To refresh it locally, run `node scripts/upstream-ledger.mjs --readme README.md`. Tests: `node --test "scripts/*.test.mjs"`.

## Validation

- Re-read `README.md` after edits to keep package names, links, and ecosystem descriptions consistent.
