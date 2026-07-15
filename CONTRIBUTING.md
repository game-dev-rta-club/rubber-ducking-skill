# Contributing

Contributions that make the skills clearer, safer, or easier to reuse are
welcome.

If you have found a security vulnerability, do not open a public issue. Follow
the private reporting process in [SECURITY.md](SECURITY.md).

## Propose a change

- For a typo, documentation fix, or small bug fix, open a pull request directly.
- For a new skill or a behavior change, open an issue first so the scope can be
  discussed before implementation.
- Keep each skill independently understandable. Related skills may share a name
  prefix, but every skill directory remains directly under `skills/`.

## Local development

Requirements: Node.js 20 or later.

```sh
git clone https://github.com/game-dev-rta-club/agent-skills.git
cd agent-skills
npm ci
npm test
```

When changing Claude plugin or marketplace metadata, also run:

```sh
claude plugin validate .
```

## Pull requests

Keep pull requests focused on one logical change. A pull request should:

- Explain the problem and why the proposed change addresses it.
- Include or update tests when repository structure or behavior changes.
- Update user-facing documentation when installation or usage changes.
- Pass `npm test`.
- Avoid unrelated formatting or refactoring.

Conventional Commit prefixes such as `docs:`, `fix:`, `feat:`, and `test:` are
preferred for commit and pull-request titles.

Maintainers review contributions when available. A response, merge, or release
timeline is not guaranteed.

## Contribution license

No Contributor License Agreement or Developer Certificate of Origin is
required. Unless explicitly stated otherwise, contributions intentionally
submitted for inclusion in this repository are licensed under the repository's
[MIT License](LICENSE).
