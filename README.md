# Rubber Ducking Skill

[![CI](https://github.com/game-dev-rta-club/rubber-ducking-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/game-dev-rta-club/rubber-ducking-skill/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/game-dev-rta-club/rubber-ducking-skill)](https://github.com/game-dev-rta-club/rubber-ducking-skill/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Catch weak assumptions before they reach the final answer.**

A single agent can carry an early assumption from its first plan into its final
answer. Rubber Ducking gives it a separate Rubber Duck agent that challenges
assumptions, asks for missing evidence, and checks the answer at key moments—
while there is still time to change course.

Install it once, then work as usual. On complex tasks, your agent starts and
manages the dialogue; you do not need extra prompts or manual handoffs. It works
with Codex and Claude Code when subagents are available. This second opinion
adds time and token use, and cannot guarantee a correct answer.

![A yellow rubber duck leaving two ripples on calm blue water.](assets/rubber-duck-hero.png)

> ### Example conversation
>
> - **You:** Find why CI is flaky, fix it, and verify the result.
>   - **Agent — before work:** I will start by treating this as a test bug.
>     - **Rubber Duck:** What evidence separates a test failure from a runner
>       failure?
>   - **Agent — new evidence:** Successful runs use an earlier runner image. I
>     will test that difference first.
>     - **Rubber Duck:** Timing alone does not isolate the runner image. Run the
>       same revision repeatedly on both images.
>   - **Agent — after comparison:** I ran the same revision repeatedly on both
>     images. Failures reproduced on the new image but not the previous one. I
>     pinned the previous image and reran the affected jobs; they passed.
>     - **Rubber Duck — before answer:** Material gap: none. Next action: none.
>   - **Agent — answer to You:** The new runner image caused the flakes. I
>     pinned the previous image and verified the affected jobs pass.

The Rubber Duck is another subagent, not a human reviewer. The caller returns
to the same dialogue as the current task changes.

## Design principle

On complex tasks, a single agent can widen the scope, keep several plausible
paths alive, or carry a weak assumption forward. The context that makes its
work coherent can also make those patterns harder to notice.

Rubber Ducking counterbalances that continuity with a separate role. At key
moments, one focused question or correction from the Rubber Duck helps the
working agent narrow the work, test the direction, and choose the next
step—without handing over ownership.

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
   Rubber Duck conversation before substantive work and transfers a
   self-contained working brief.
2. [`rubber-duck-partner`](skills/rubber-duck-partner/SKILL.md) acts as the
   Rubber Duck subagent. It challenges the direction with the highest-leverage
   question or correction without taking over the task.
3. The caller revisits the same dialogue when evidence, decisions, results, or
   the proposed answer change. It checks once more before replying.
4. Each check reports at most one material gap and one next action. The
   dialogue ends when neither remains.

The Rubber Duck concentrates on four questions:

- **Alignment:** Does the work still match the user's latest requirements?
- **Evidence:** Do direct conversation, artifacts, and results support the
  conclusion?
- **Simplicity:** Is each fallback, branch, or extra layer required by evidence?
- **Completion:** Is the highest-leverage gap resolved before the answer is
  sent?

The caller remains responsible for the work and decides what to adopt. The
Rubber Duck does not implement the task or make decisions for the user.

## Trust and limits

- The two skills are Markdown instructions with no runtime dependencies,
  hooks, background services, or executable integration code.
- Automatic skill selection depends on the host and model. Use the explicit
  call above to request the caller directly. If subagent spawning is
  unavailable, the dialogue will not start.
- The Rubber Duck may use the same model or provider. It creates another line
  of inquiry, not a guarantee of independence, correctness, or improved
  accuracy.
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
