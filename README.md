# Agent Skills

[![CI](https://github.com/game-dev-rta-club/agent-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/game-dev-rta-club/agent-skills/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/game-dev-rta-club/agent-skills)](https://github.com/game-dev-rta-club/agent-skills/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Small, reusable Agent Skills for Codex and Claude Code.

## Install

### Codex

```sh
codex plugin marketplace add game-dev-rta-club/agent-skills
codex plugin add agent-skills@game-dev-rta-club
```

### Claude Code

```sh
claude plugin marketplace add game-dev-rta-club/agent-skills
claude plugin install agent-skills@game-dev-rta-club
```

## Skills

| Skill | Role |
| --- | --- |
| [`rubber-duck-caller`](skills/rubber-duck-caller/SKILL.md) | Starts and continues an independent review during non-trivial work. |
| [`rubber-duck-partner`](skills/rubber-duck-partner/SKILL.md) | Reviews the caller's plan, code, or draft. Used internally by the caller. |

Try it with:

```text
Use rubber-duck-caller to pressure-test this migration plan before changing production.
```

## Safety

These skills contain instructions and have no runtime dependencies. Review the
source before installing and review proposed tool actions before approving
them. Report vulnerabilities through [SECURITY.md](SECURITY.md).

## Community

Use [GitHub Issues](https://github.com/game-dev-rta-club/agent-skills/issues)
for bugs and ideas. Contributions and forks are welcome; see
[CONTRIBUTING.md](CONTRIBUTING.md).

This volunteer-maintained project does not guarantee response times, releases,
fixes, or long-term maintenance. General contact is available through the
[Game Dev RTA Club Google Group](https://groups.google.com/g/game-dev-rta-club).

## License

[MIT](LICENSE) © 2026 Game Dev RTA Club.
