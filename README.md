# Drew Gowan, Cyber Architect

<!-- README-META
  tlp_clearance: GREEN
  status: active
  name: dcyfr
  last_validated: 2026-11-17
-->

> **Agents that act. Rails that hold.**

I'm Drew, a cyber architect. I build autonomous systems that take real actions in production and the guardrails that make that a safe bet.

Founder at [**DCYFR Labs**](https://github.com/dcyfr-labs) · Head of AI at [**GameShark Labs**](https://github.com/gameshark-labs) · Principal Security Engineer at [**Monks**](https://www.monks.com/)

**[cyberdrew.dev](https://www.cyberdrew.dev)** is the long version of this page.

**60+** agents on one substrate · **continuous** autonomous cycle · **local-first** default model tier · **6+ yrs** security engineering

## Work

- [**`@dcyfr/ai`**](https://github.com/dcyfr-labs/dcyfr-ai) `open source` <br> The portable TypeScript runtime the fleet thinks in: model routing across local and frontier tiers, tool-use, and MCP wiring you drop into an existing project.
- [**The agentic fleet**](https://www.dcyfr.ai/about) `running` <br> Sixty-odd daemons on a shared substrate, spanning research, code review, monitoring, and self-healing. They run autonomously on a local-first model stack under a hard budget.
- [**`cache-invariants`**](https://github.com/dcyfr-labs/cache-invariants) `open source` <br> Finds the code that silently breaks LLM prompt caching: a linter for agent code and an audit that replays real call logs.
- [**`spend-gate`**](https://github.com/dcyfr-labs/spend-gate) `open source` <br> A budget trip for autonomous agents. When spend crosses a threshold, every paid call that checks the gate stops, and the trip survives a Redis outage or restart.
- [**SharkVault**](https://sharkvault.gamesharklabs.com) `live` <br> Proof the fleet ships product and not just diffs: a backer-funded consumer app taken end to end, from auth to payments to content pipeline, largely by agents.

Starter templates for [agents](https://github.com/dcyfr-labs/dcyfr-ai-agents), [APIs](https://github.com/dcyfr-labs/dcyfr-ai-api), [GraphQL](https://github.com/dcyfr-labs/dcyfr-ai-graphql), [React](https://github.com/dcyfr-labs/dcyfr-ai-react), [chatbots](https://github.com/dcyfr-labs/dcyfr-ai-chatbot), [CLIs](https://github.com/dcyfr-labs/dcyfr-ai-cli), and [Node.js](https://github.com/dcyfr-labs/dcyfr-ai-nodejs) live in the [DCYFR Labs org](https://github.com/dcyfr-labs), which holds the canonical repo catalog.

## The loop

The fleet doesn't wait to be asked. It wakes on a schedule, reads its own state, picks work off the queue, and writes down what it learned. Then it starts over. Five states, each with something that can stop it.

| State | Runs on | What stops it |
| --- | --- | --- |
| **01 Observe** | no model | Restricted paths never enter context: message stores, journals, backups |
| **02 Triage** | tier-0, local | Local-first routing. Frontier tiers cost money, so they have to be earned |
| **03 Think** | tier-3, frontier | A metacognition breaker halts any agent spinning past six unproductive cycles |
| **04 Act** | sandboxed | Allowlisted binaries only. No metacharacters, no pipe to rm, no private-IP fetches |
| **05 Record** | append-only | Writes confined to two directories. Everything else is read-only to the daemon |

## Guardrails

Autonomy is a claim about what happens when nobody is watching. These are the controls that make the claim checkable.

| Control | What it means |
| --- | --- |
| **Spend ceiling** (`enforced`) | A hard monthly ceiling on model spend, sized to the deployment. Trip it and the kill switch fires. The pattern is published as [`spend-gate`](https://github.com/dcyfr-labs/spend-gate). |
| **Sender kill switch** (`< 1 s`) | Every outbound path (mail, chat, webhooks) honours one pause flag. |
| **Credential isolation** (`per-process`) | Secrets resolve at exec time from the OS keychain. Nothing lands in an environment dump, a plist, or a prompt. |
| **Tool sandbox** (`allowlist`) | The shell an agent gets is not your shell: fixed binaries, no metacharacters, no SSRF to localhost or private ranges. |
| **Metacognition breaker** (`6 cycles`) | An agent that keeps picking the same task without shipping is quarantined. |
| **Self-heal watchdog** (`3 / hr`) | Downed services restart on graduated trust. Dry-run first, and never more than three times an hour before escalation. |

## Upstream

When something I depend on is broken, the fix goes back to the project. This list is rebuilt weekly from GitHub search by [`scripts/upstream-ledger.mjs`](scripts/upstream-ledger.mjs). It shows merged and open pull requests only.

<!-- upstream-ledger:start -->
2 merged and 6 open across 6 projects in the last 12 months.

| Project | Pull request | Status |
| --- | --- | --- |
| [batocera-linux/batocera.linux](https://github.com/batocera-linux/batocera.linux) | [#16444](https://github.com/batocera-linux/batocera.linux/pull/16444) rk3568: restore the Rockchip GMAC (stmmac) driver in the kernel config | merged 2026-09-12 |
| [batocera-linux/batocera.linux](https://github.com/batocera-linux/batocera.linux) | [#16445](https://github.com/batocera-linux/batocera.linux/pull/16445) rk3568: fix ODROID-M1S Ethernet by naming the RTL8211F by PHY ID | merged 2026-09-12 |
| [Clownacy/clown68000](https://github.com/Clownacy/clown68000) | [#5](https://github.com/Clownacy/clown68000/pull/5) Give ADDQ and SUBQ a defined source address mode | open since 2026-10-08 |
| [Clownacy/clownmdemu-libretro](https://github.com/Clownacy/clownmdemu-libretro) | [#2](https://github.com/Clownacy/clownmdemu-libretro/pull/2) Export only the libretro API from the unix build | open since 2026-10-08 |
| [libretro/supafaust](https://github.com/libretro/supafaust) | [#35](https://github.com/libretro/supafaust/pull/35) libretro: expose work RAM as RETRO_MEMORY_SYSTEM_RAM | open since 2026-10-08 |
| [libretro/supafaust](https://github.com/libretro/supafaust) | [#36](https://github.com/libretro/supafaust/pull/36) libretro: accept every cheat format, and apply RAM-write cheats | open since 2026-10-08 |
| [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | [#128](https://github.com/anthropics/claude-code-security-review/pull/128) fix: use configured model in validate_api_access instead of retired claude-3-5-haiku | open since 2026-08-29 |
| [drcursor/HushScribe](https://github.com/drcursor/HushScribe) | [#5](https://github.com/drcursor/HushScribe/pull/5) Surface system-audio capture failures instead of swallowing them | open since 2026-08-27 |
<!-- upstream-ledger:end -->

## Writing

Notes from the build live at [**dcyfr.ai/blog**](https://www.dcyfr.ai/blog): agentic AI security, autonomous delivery, and what breaks when you let agents act. There is a [feed](https://www.dcyfr.ai/blog/feed) if you would rather subscribe than visit.

## Certifications

**GIAC** · `GDSA` Defensible Security Architecture · `GSTRT` Strategic Planning, Policy & Leadership · `GCIH` Certified Incident Handler

**CompTIA** · `SecurityX` Advanced Security Practitioner (CASP+)

[25 verified on Credly](https://www.credly.com/users/dcyfr/badges).

## Sponsor

[**GitHub Sponsors**](https://github.com/sponsors/dcyfr) pays for the open-source work on this page and the upstream fixes above. Tiers start at $5 a month, and every sponsor gets a monthly build note: what shipped, what broke, what's next.

## Work with me

I work with teams putting agents into production. That usually looks like one of three things: your first secure agent, a governed fleet, or a hard look at what you already run.

[**Book an intro call**](https://cal.com/dcyfr/intro) · [hello@cyberdrew.dev](mailto:hello@cyberdrew.dev) · [LinkedIn](https://www.linkedin.com/in/dcyfr/) · [X](https://x.com/dcyfr_)

For security disclosures: **security@dcyfr.ai** (see the [DCYFR Labs security policy](https://github.com/dcyfr-labs/dcyfr-ai/blob/main/SECURITY.md)).
