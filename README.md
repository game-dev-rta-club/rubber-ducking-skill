# Rubber Ducking Skill

[![CI](https://github.com/game-dev-rta-club/rubber-ducking-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/game-dev-rta-club/rubber-ducking-skill/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/game-dev-rta-club/rubber-ducking-skill)](https://github.com/game-dev-rta-club/rubber-ducking-skill/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Catch weak assumptions before they become actions or answers.**

Rubber Ducking adds a separate review pass to Codex and Claude Code. A fresh
partner challenges the main agent's plan, evidence, implementation, and final
answer without taking over the task.

```text
Your request -> partner checks direction -> agent works
             -> partner checks result -> final answer
```

The review is designed to surface contradictions, missing evidence, missed
requirements, and unnecessary complexity while they can still be corrected.
It does not claim to guarantee correctness.

## What a review looks like

A review stays focused on the highest-leverage gap instead of producing a long
list of generic suggestions.

```text
Plan:
Add a fallback because the primary API might be unavailable.

Partner:
Material gap: There is no evidence that the primary path fails or that a
second path is required.

Next action:
Verify the actual failure modes before adding the fallback.
```

Use it to pressure-test work such as:

- a migration or implementation plan before making changes
- a bug fix whose root cause is still uncertain
- a research conclusion supported by limited evidence
- a final answer that may have missed a user requirement

## Install

### Codex

```sh
codex plugin marketplace add game-dev-rta-club/rubber-ducking-skill
codex plugin add rubber-ducking-skill@game-dev-rta-club
```

### Claude Code

```sh
claude plugin marketplace add game-dev-rta-club/rubber-ducking-skill
claude plugin install rubber-ducking-skill@game-dev-rta-club
```

## Use

Ask for the caller when you want an explicit review:

```text
Use rubber-duck-caller to pressure-test this migration plan before changing production.
```

The caller is also designed to activate for non-trivial work when the host
recognizes its skill description. It skips greetings, simple answers, and
other tasks where a second pass would add little value.

## How it works

1. [`rubber-duck-caller`](skills/rubber-duck-caller/SKILL.md) opens a fresh
   partner conversation before substantive work.
2. [`rubber-duck-partner`](skills/rubber-duck-partner/SKILL.md) challenges the
   direction with the highest-leverage question or correction.
3. The caller checks again when evidence or decisions change and before the
   final answer. Each check reports at most one material gap and one next
   action; the dialogue ends when neither remains.

The review contract concentrates on four questions:

| Check | Question |
| --- | --- |
| Alignment | Does the work still match the user's latest requirements? |
| Evidence | Do direct conversation, artifacts, and results support the conclusion? |
| Simplicity | Is each fallback, branch, or extra layer required by evidence? |
| Completion | Is the highest-leverage gap resolved before the answer is sent? |

The caller remains responsible for the work. The partner critiques its current
direction but does not implement the task or make decisions for the user.

## Trust and limits

- The two skills are Markdown instructions with no runtime dependencies,
  hooks, background services, or executable integration code.
- A separate review pass may still use the same model or provider, so it is not
  a substitute for human review or independent testing.
- Reviews add agent turns, time, and token usage. The caller skips trivial work
  and stops when another exchange would not materially improve the result.
- Review the source before installing and approve tool actions deliberately.
  Report vulnerabilities through [SECURITY.md](SECURITY.md).

## Community

Bugs and ideas are welcome in
[GitHub Issues](https://github.com/game-dev-rta-club/rubber-ducking-skill/issues).
See [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md) before contributing. General contact is
available through the
[Game Dev RTA Club Google Group](https://groups.google.com/g/game-dev-rta-club).
This is a volunteer-maintained project with no guaranteed response or
maintenance time.

## License

[MIT](LICENSE) © 2026 Game Dev RTA Club.
