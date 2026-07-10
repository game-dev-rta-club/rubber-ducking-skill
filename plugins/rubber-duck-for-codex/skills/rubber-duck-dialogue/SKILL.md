---
name: rubber-duck-dialogue
description: Use when preparing any non-trivial response or action that involves reasoning, planning, implementation, debugging, review, research, writing, design, judgment, tool execution, or synthesis. Use before finalizing drafts, plans, decisions, code changes, explanations, or user-facing answers where independent pressure-testing could materially improve quality, and during work when thinking has become linear or uncertain. Skip greetings, acknowledgments, exact status reports, trivial command results, truly simple direct answers, or requests where the user asks for a direct answer or no delegation. Start a fresh rubber-duck-partner dialogue and keep it bounded.
---

# Rubber Duck Dialogue

Use a fresh thinking partner to bend straight-line reasoning before you answer. The partner is not the decision-maker; they challenge, trim, and sharpen your draft or current plan.

When a partner task inherits earlier chat history from a fork, assume the partner experiences the old text as one continuous conversation until your new prompt arrives. Make the context switch explicit: separate inherited history from the new partner task, and state that the next section is addressed to the receiving agent.

## Trigger Rule

Use this skill by default for any request that requires thought or action where a second reader could catch a meaningful flaw.

Skip only when the response is a near-immediate social reply, simple acknowledgment, exact status report, trivial command result, direct one-sentence answer with no tool use or decision, or the user explicitly asks for a direct answer or no delegation. If unsure, ask: "Could a second reader catch a meaningful flaw here?" If yes, use the skill.

If you were asked to act as the rubber duck partner for another agent, use `rubber-duck-partner` instead. Do not start another rubber-duck dialogue from inside the partner role.

## Workflow

1. Build a compact working brief before contacting the partner:
   - user's request and relevant constraints
   - current context needed to judge the answer
   - your draft, plan, hypothesis, or decision point
   - what you want checked

2. Start a fresh partner dialogue.
   - Ask the partner to use `rubber-duck-partner`.
   - Use the full template from "Partner Prompt Contract" below.
   - Put a clear separator before the partner task so the forked agent can tell the context has changed.
   - Keep the prompt self-contained. Do not rely on forked context for the draft, evidence, current-turn commentary, or decision point; include those explicitly in the prompt under the required labels.
   - Tell the partner not to start another delegation loop; their next response is the deliverable.

3. Ask for pressure, not approval.
   Require the partner to return:
   - `Contradictions or weak assumptions`
   - `User-request fulfillment`
   - `Missing considerations`
   - `Unnecessary or overbuilt parts`
   - `User-intent fit`
   - `Suggested changes`
   - `One question for the next round` when another round would improve the result

4. Continue the dialogue until the useful uncertainty is resolved.
   - Do not stop after the first reply if the partner asks a material question.
   - Keep each follow-up narrow.
   - Usually use one or two rounds.
   - Stop after two rounds unless the remaining uncertainty is high-risk, user-visible, or explicitly requested by the user.
   - Do not enter finalization while another checkpoint is still expected.

5. Decide what to adopt.
   - Adopt partner suggestions only when they improve the answer.
   - Explicitly reject suggestions that conflict with the user request, known facts, tool evidence, or scope.
   - Do not outsource responsibility for the final answer.

6. Finalize for the user.
   - Do not expose the whole internal dialogue unless the user asked to see it.
   - Close the partner agent when the dialogue is complete, unless the user explicitly asked to keep the partner agent open or closing fails.
   - Mention the partner thread/link only when the user explicitly asked to inspect the dialogue or the task specifically requires an audit link.
   - Keep the final response shaped around the user's request, not around the review process.

## Partner Prompt Contract

Use this template for every partner prompt. Replace bracketed sections with the current task details.

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

Original user request:
[quote or summarize the user's newest request and any constraints]

Proposed next response:
[paste the exact user-facing draft, or write "none" if the review is about a decision rather than a draft]

Decision under review:
[paste the plan, hypothesis, or decision to inspect, or write "none" if the proposed response is the only review target]

Evidence / results already gathered:
[list concrete tool output, thread ids, files, tests, or say "none"]

Specific checks requested:
- Does the draft fully answer what the user asked for?
- Are any requested conditions unmet or replaced by a safer but different answer?
- If the user asked for investigation, execution, verification, comparison, or a concrete decision, does the draft report the concrete result?
- What should be changed before replying to the user?
```

Avoid shorthand such as "parent thread" unless the prompt defines it. Prefer "caller", "forked conversation", "inherited history", and "this new request" so the partner does not confuse their role with running another subagent.

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
