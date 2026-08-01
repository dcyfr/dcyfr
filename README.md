# Drew Gowan, Cyber Architect

<!-- README-META
  tlp_clearance: GREEN
  status: active
  name: dcyfr
  last_validated: 2026-08-01
-->

> **Agents that act. Rails that hold.**

I'm Drew, a cyber architect. I build autonomous systems that take real actions in production and the guardrails that make that a safe bet.

Founder at [**DCYFR Labs**](https://github.com/dcyfr-labs) · Head of AI at [**GameShark Labs**](https://github.com/gameshark-labs) · Principal Security Engineer at [**Monks**](https://www.monks.com/)

**[cyberdrew.dev](https://www.cyberdrew.dev)** is the long version of this page.

**60+** agents on one substrate · **continuous** autonomous cycle · **local-first** default model tier · **6+ yrs** security engineering

## Work

- [**`@dcyfr/ai`**](https://github.com/dcyfr-labs/dcyfr-ai) `open source` <br> The portable TypeScript runtime the fleet thinks in: model routing across local and frontier tiers, tool-use, and MCP wiring you drop into an existing project.
- [**The agentic fleet**](https://www.dcyfr.ai/about) `running` <br> Sixty-odd daemons on a shared substrate, spanning research, code review, monitoring, and self-healing. They run autonomously on a local-first model stack under a hard budget.
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
| **Spend ceiling** (`enforced`) | A hard monthly ceiling on model spend, sized to the deployment. Trip it and the kill switch fires. |
| **Sender kill switch** (`< 1 s`) | Every outbound path (mail, chat, webhooks) honours one pause flag. |
| **Credential isolation** (`per-process`) | Secrets resolve at exec time from the OS keychain. Nothing lands in an environment dump, a plist, or a prompt. |
| **Tool sandbox** (`allowlist`) | The shell an agent gets is not your shell: fixed binaries, no metacharacters, no SSRF to localhost or private ranges. |
| **Metacognition breaker** (`6 cycles`) | An agent that keeps picking the same task without shipping is quarantined. |
| **Self-heal watchdog** (`3 / hr`) | Downed services restart on graduated trust. Dry-run first, and never more than three times an hour before escalation. |

## Writing

Notes from the build live at [**dcyfr.ai/blog**](https://www.dcyfr.ai/blog): agentic AI security, autonomous delivery, and what breaks when you let agents act. There is a [feed](https://www.dcyfr.ai/blog/feed) if you would rather subscribe than visit.

## Certifications

**GIAC** · `GDSA` Defensible Security Architecture · `GSTRT` Strategic Planning, Policy & Leadership · `GCIH` Certified Incident Handler

**CompTIA** · `SecurityX` Advanced Security Practitioner (CASP+)

[25 verified on Credly](https://www.credly.com/users/dcyfr/badges).

## Work with me

I work with teams putting agents into production. That usually looks like one of three things: your first secure agent, a governed fleet, or a hard look at what you already run.

[**Book an intro call**](https://cal.com/dcyfr/intro) · [hello@cyberdrew.dev](mailto:hello@cyberdrew.dev) · [LinkedIn](https://www.linkedin.com/in/dcyfr/) · [X](https://x.com/dcyfr_)

For security disclosures: **security@dcyfr.ai** (see the [DCYFR Labs security policy](https://github.com/dcyfr-labs/dcyfr-ai/blob/main/SECURITY.md)).

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/dcyfr/dcyfr)
