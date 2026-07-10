---
name: rubber-ducking
description: Use at the beginning of any non-trivial turn that involves reasoning, planning, implementation, debugging, review, research, writing, design, judgment, tool execution, or synthesis. Open a rubber-duck-partner dialogue before substantive work starts, checkpoint when evidence, uncertainty, plans, or decisions change, and close before the final response. Skip greetings, acknowledgments, exact status reports, trivial command results, truly simple direct answers, or requests where the user asks for a direct answer or no delegation.
---

# Rubber Ducking

Use a fresh thinking partner to bend straight-line reasoning throughout a non-trivial turn. The partner is not the decision-maker; they challenge, trim, and sharpen your plan, progress, evidence, and final draft.

When a partner task inherits earlier chat history from a fork, assume the partner experiences the old text as one continuous conversation until your new prompt arrives. Make the context switch explicit: separate inherited history from the new partner task, and state that the next section is addressed to the receiving agent.

## Trigger Rule

Open this skill at the start of any request that requires thought or action where a second reader could catch a meaningful flaw. Do this before substantive work starts.

Skip only when the response is a near-immediate social reply, simple acknowledgment, exact status report, trivial command result, direct one-sentence answer with no tool use or decision, or the user explicitly asks for a direct answer or no delegation. If unsure, ask: "Could a second reader catch a meaningful flaw here?" If yes, use the skill.

If you were asked to act as the rubber duck partner for another agent, use `rubber-duck-partner` instead. Do not start another rubber-duck dialogue from inside the partner role.

## Dialogue Modes

Choose the lightest mode that protects quality:

- Checkpointed dialogue: default for non-trivial turns. Open before substantive work, then checkpoint as needed.
- Close-only review: narrow exception for explicit review, partner, fork, or final-draft-check requests where the task is only to inspect an already-formed draft or decision.

Checkpointed dialogue follows:

```text
Open -> Checkpoint* -> Close
```

`Checkpoint*` means zero or more checkpoints after Open. Do not message the partner after every small action. Use checkpoints only when a second reader could change direction or catch a meaningful omission.

## Workflow

1. Open early.
   Start a partner dialogue before substantive work on a non-trivial turn. Build a compact working brief:
   - user's request and relevant constraints
   - current context needed to judge the answer
   - intended outcome and success criteria
   - your initial plan, hypothesis, or decision point
   - known risks, uncertainties, or evidence gaps
   - what you want checked

2. Start a fresh partner dialogue.
   - Ask the partner to use `rubber-duck-partner`.
   - Use the full template from "Partner Prompt Contract" below.
   - Put a clear separator before the partner task so the forked agent can tell the context has changed.
   - Keep the prompt self-contained. Do not rely on forked context for the draft, evidence, current-turn commentary, or decision point; include those explicitly in the prompt under the required labels.
   - Tell the partner not to start another delegation loop; their next response is the deliverable.

3. Match the pressure to the dialogue moment.
   Use a light Open contract, a focused Checkpoint contract, and a deeper Close contract:
   - Open: calibrate the request, success criteria, early watchpoints, and when to checkpoint. Do not ask for final-answer fulfillment scoring when no draft or evidence exists.
   - Checkpoint: inspect new evidence, drift, changed assumptions, missing results, and the smallest useful adjustment.
   - Close: inspect the proposed final answer against the user's requested outcome, concrete result, omissions, and unnecessary detail.

4. Checkpoint when the work evolves.
   Send a short follow-up with explicit new context when:
   - new evidence appears
   - the plan changes
   - a work chunk completes and affects the next step
   - uncertainty rises
   - a decision point appears
   - the draft starts drifting away from the user's actual request

   Each checkpoint must include `New context since last checkpoint`; partner threads do not automatically receive caller-side context added after the fork.

5. Continue the dialogue until the useful uncertainty is resolved.
   - Do not stop after the first reply if the partner asks a material question.
   - Keep each follow-up narrow.
   - Usually use one or two rounds.
   - Stop after two rounds unless the remaining uncertainty is high-risk, user-visible, or explicitly requested by the user.
   - Do not enter finalization while another checkpoint is still expected.

6. Decide what to adopt.
   - Adopt partner suggestions only when they improve the answer.
   - Explicitly reject suggestions that conflict with the user request, known facts, tool evidence, or scope.
   - Do not outsource responsibility for the final answer.

7. Close before finalizing for the user.
   Before the final response, ask the partner to check the proposed final answer or decision unless the whole dialogue already resolved that check.
   - Do not expose the whole internal dialogue unless the user asked to see it.
   - Close the partner agent when the dialogue is complete, unless the user explicitly asked to keep the partner agent open or closing fails.
   - Mention the partner thread/link only when the user explicitly asked to inspect the dialogue or the task specifically requires an audit link.
   - Keep the final response shaped around the user's request, not around the review process.

## Partner Prompt Contract

Use this base template for every partner prompt. Replace bracketed sections with the current task details, then add the phase-specific check block that matches `Dialogue moment`.

```text
==================== CONTEXT SWITCH ====================
The conversation above may be inherited from a fork. From this point onward, treat this as a new request addressed to you, the agent receiving this message.

Definitions:
- `caller` means the agent asking you to review a draft or decision.
- `user` means the original end user whose request the caller is trying to answer.

This request is addressed to you, the agent receiving this message.
Your next response is the deliverable for this request.
Your role is to act here as the rubber duck partner: read the caller's draft, plan, or decision point and challenge its assumptions, omissions, unnecessary parts, and fit to the user's intent.
This is not a request to arrange, delegate, implement, continue the caller's task, or run a separate verification workflow.

Use rubber-duck-partner.

Dialogue moment:
[Open / Checkpoint / Close]

Original user request:
[quote or summarize the user's newest request and any constraints]

Proposed next response:
[paste the exact user-facing draft, or write "none"; for Open, usually write "none" unless a concrete draft already exists]

Decision under review:
[paste the plan, hypothesis, or decision to inspect, or write "none" if the proposed response is the only review target]

Evidence / results already gathered:
[list concrete tool output, thread ids, files, tests, or say "none"]

New context since last checkpoint:
[for Checkpoint and Close, paste new evidence, progress, revised plan, or draft changes; for Open, write "none"]

Specific checks requested:
[paste the phase-specific bullet list below]
```

Avoid shorthand such as "parent thread" unless the prompt defines it. Prefer "caller", "forked conversation", "inherited history", and "this new request" so the partner does not confuse their role with running another subagent.

### Open Checks

Use Open before substantive work begins. Keep it light but sharp. Ask the partner to calibrate the starting direction, not to review a final answer. In Open, do not ask the partner to fill Close or Checkpoint fields unless a concrete draft or result already exists and you explicitly need that review.

```text
- Restate the user's actual request and success criteria in one or two lines.
- Name 1-3 early watchpoints, such as scope drift, missing constraints, premature conclusions, or likely evidence gaps.
- Say what evidence or result would matter most before the caller commits to an answer.
- Suggest when the caller should checkpoint next.
- Ask at most one blocking question. If none is needed, say so.
```

For Open, avoid asking whether a draft fully answers the user, whether the result was reported, or what final wording should be revised unless a concrete draft already exists. A normal Open response should be short, often 5-8 bullets total.

### Checkpoint Checks

Use Checkpoint after evidence, work state, uncertainty, or decisions change.

```text
- Has the work drifted away from the user's original request or success criteria?
- Does the new evidence support the current direction, or does it change the plan?
- What concrete result, verification, comparison, or artifact is still missing?
- What should be removed, narrowed, or de-emphasized before continuing?
- What is the smallest useful next adjustment?
- Is another checkpoint needed? If yes, when?
```

### Close Checks

Use Close before replying to the user.

```text
- Does the proposed final answer fully answer what the user asked for?
- Are any requested conditions unmet or replaced by a safer but different answer?
- If the user asked for investigation, execution, verification, comparison, or a concrete decision, does the answer report the concrete result?
- Is the answer honest about verification, uncertainty, or remaining risk?
- Has the work drifted away from the original user request?
- What should be changed, removed, or clarified before replying to the user?
```

## Partner Context Modes

Choose context deliberately:

- Minimal context: best for independent outside pressure.
- Shared or summarized context: best when the partner must catch subtle mismatches with the user's intent.

When sharing context, tell the partner to use it to improve disagreement, not to agree more fluently.

## Output Discipline

Keep the dialogue bounded and useful:

- Prefer short, concrete partner prompts.
- Pass later context explicitly in follow-up messages; existing partner threads do not automatically receive caller-side context added after the fork.
- Ask the partner to identify what to remove, not only what to add.
- Preserve raw thread links or agent ids only when the user wants to inspect the conversation, when validating this skill itself, or when the task specifically requires audit evidence.
- When validating this skill itself, preserve the partner thread id and one-line outcome evidence.
- Close completed partner agents to keep the subagent list tidy.
- Keep the partner agent open only when the user explicitly asks for the live subagent to remain open or closing fails.
