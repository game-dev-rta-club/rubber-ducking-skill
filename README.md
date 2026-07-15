# Agent Skills

[![CI](https://github.com/game-dev-rta-club/agent-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/game-dev-rta-club/agent-skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Reusable review workflows for Codex and Claude Code, maintained by Game Dev
RTA Club.

The skills are intentionally small and instruction-only. They help an agent
open an independent review dialogue, challenge a draft or decision, and keep
checking the work as new evidence appears.

## Included skills

| Skill | Purpose |
| --- | --- |
| `rubber-duck-caller` | Opens and continues an independent review dialogue during non-trivial work. |
| `rubber-duck-partner` | Reviews a draft, plan, decision, or result inside that dialogue. |

Every skill lives directly under `skills/`. Related skills share a name prefix
instead of using nested directories.

## Install

Review the repository before installing it. Plugins and skills provide
instructions to an agent and should be treated as trusted code.

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

### Project-local skills

With [`gh-linked-skills`](https://github.com/game-dev-rta-club/gh-linked-skills)
installed, add every skill to the current Git project:

```sh
gh linked-skills install game-dev-rta-club/agent-skills --all --tag v1.0.0
```

This writes the skills to `.agents/skills/` and records their source in
`.gh-linked-skills.json`.

## Use

Ask the agent to use `rubber-duck-caller` for work where a second reader could
catch a meaningful flaw. The caller invokes `rubber-duck-partner` internally;
you normally do not need to invoke the partner yourself.

Example:

```text
Use rubber-duck-caller to pressure-test this migration plan before changing production.
```

## Development

Requirements: Node.js 20 or later.

```sh
npm ci
npm test
claude plugin validate .
```

The Claude validation command is only required when changing Claude plugin or
marketplace metadata.

## Support and maintenance

Use [GitHub Issues](https://github.com/game-dev-rta-club/agent-skills/issues)
for reproducible bugs and proposed improvements. General contact is available
through the [Game Dev RTA Club Google Group](https://groups.google.com/g/game-dev-rta-club).

This is a volunteer-maintained project. Response times, releases, fixes, and
long-term maintenance are not guaranteed. Report vulnerabilities privately as
described in [SECURITY.md](SECURITY.md).

## Contributing

Contributions and forks are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for
the development and pull-request process.

## License

[MIT](LICENSE) © 2026 Game Dev RTA Club.
