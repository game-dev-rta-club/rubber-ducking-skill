# Rubber Ducking Skill

[![CI](https://github.com/game-dev-rta-club/rubber-ducking-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/game-dev-rta-club/rubber-ducking-skill/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/game-dev-rta-club/rubber-ducking-skill)](https://github.com/game-dev-rta-club/rubber-ducking-skill/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Install once. Give your agent a second line of inquiry as the work evolves.**

Rubber Ducking is an Agent Skill for Codex and Claude Code. It is designed to
activate across non-trivial planning, implementation, debugging, research, and
writing. When the caller is active and subagent spawning is available, it
starts a separate partner dialogue, returns to it at key checkpoints, and
checks again before answering. The caller handles that orchestration for you.

**Illustrative example**

**You:** Find why CI is flaky, fix it, and verify the result.

**Before work**

- **Agent:** I will start by treating this as a test bug.
- **Partner:** What evidence separates a test failure from a runner failure?
- **Agent:** Successful runs use an earlier runner image. I will test that
  difference first.

**Evidence changed**

- **Partner:** Material gap: Timing alone does not isolate the runner image.
  Next action: Run the same revision repeatedly on both images.
- **Agent:** I ran the same revision repeatedly on both images. In those runs,
  failures reproduced on the new image but not the previous one. I pinned the
  previous image in the runner configuration and reran the affected jobs; they
  passed.

**Before answer**

- **Partner:** Material gap: none. Next action: none.

One request; the caller returns to the same partner dialogue as the work changes.

## Why it is different

When one agent plans, acts, and answers along a single reasoning trajectory,
early assumptions and blind spots can reinforce themselves instead of being
re-examined. Rubber Ducking inserts a focused thinking partner into that
trajectory while the task is still in progress.

- **Checklist review:** A checklist says what to inspect; the caller also
  manages when to bring the partner back into the task.
- **Ordinary rubber duck:** A passive duck listens; the partner returns a
  focused question or correction.
- **One-shot subagent review:** A one-shot review inspects one snapshot; Rubber
  Ducking revisits the same dialogue at material checkpoints.

Use it across migration plans, uncertain bug fixes, implementation decisions,
research conclusions, and user-facing drafts. The caller skips greetings,
simple answers, and other work where another dialogue would add little value.

## Quick start

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

After installation, give your agent a non-trivial task as usual. To verify the
setup with an explicit call, try:

```text
Use rubber-duck-caller to investigate why this test is flaky, fix it, and verify the result.
```

## How it works

1. [`rubber-duck-caller`](skills/rubber-duck-caller/SKILL.md) opens a fresh
   partner conversation before substantive work and transfers a self-contained
   working brief.
2. [`rubber-duck-partner`](skills/rubber-duck-partner/SKILL.md) challenges the
   direction with the highest-leverage question or correction without taking
   over the task.
3. The caller revisits the same dialogue when evidence, decisions, results, or
   the proposed answer change. It checks once more before replying.
4. Each check reports at most one material gap and one next action. The
   dialogue ends when neither remains.

The partner concentrates on four questions:

- **Alignment:** Does the work still match the user's latest requirements?
- **Evidence:** Do direct conversation, artifacts, and results support the
  conclusion?
- **Simplicity:** Is each fallback, branch, or extra layer required by evidence?
- **Completion:** Is the highest-leverage gap resolved before the answer is
  sent?

The caller remains responsible for the work and decides what to adopt. The
partner does not implement the task or make decisions for the user.

## Trust and limits

- The two skills are Markdown instructions with no runtime dependencies,
  hooks, background services, or executable integration code.
- Automatic skill selection depends on the host and model. Use the explicit
  call above to request the caller directly. If subagent spawning is
  unavailable, the dialogue will not start.
- The partner may use the same model or provider. It creates another line of
  inquiry, not a guarantee of independence, correctness, or improved accuracy.
- The dialogue adds agent turns, time, and token usage. It stops when another
  exchange would not materially improve the result.
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
