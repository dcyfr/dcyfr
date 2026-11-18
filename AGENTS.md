# AGENTS.md - dcyfr

## Project Overview

Personal/brand hub for the `dcyfr` GitHub presence. This repo is documentation-first: `README.md` is the GitHub profile page rendered at github.com/dcyfr, and it shares its positioning with [cyberdrew.dev](https://www.cyberdrew.dev) without mirroring it: sections such as Upstream and Sponsor exist only here. Keep the facts both pages state in agreement (roles, figures, and the availability note under "Work with me", which follows `contact.note` in `lib/site.ts` of `dcyfr/cyberdrew-dev`).

## Working Rules

- Treat `README.md` as the primary source of truth for repo purpose and linked projects.
- Prefer small documentation edits over inventing code structure that is not present.
- When changes affect linked repos, make the change in the target repo instead of expanding this repo arbitrarily.

## Upstream ledger

The table between the `upstream-ledger` markers in `README.md` is generated. Do not edit it by hand: `scripts/upstream-ledger.mjs` rebuilds it from GitHub search, and `.github/workflows/upstream-ledger.yml` commits the result every Monday. To refresh it locally, run `node scripts/upstream-ledger.mjs --readme README.md`. Tests: `node --test "scripts/*.test.mjs"`.

## Validation

- Re-read `README.md` after edits to keep package names, links, and ecosystem descriptions consistent.
