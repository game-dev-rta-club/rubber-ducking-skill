---
name: rubber-duck-caller
description: Use at the beginning of any non-trivial turn that involves reasoning, planning, implementation, debugging, review, research, writing, design, judgment, tool execution, or synthesis. Open a rubber-duck-partner dialogue before substantive work starts, then check again when evidence, uncertainty, plans, decisions, results, or the proposed user-facing answer change. Skip greetings, acknowledgments, exact status reports, trivial command results, truly simple direct answers, or requests where the user asks for a direct answer or no delegation.
---

# Rubber Ducking

Run a fresh thinking-partner dialogue throughout a non-trivial turn. Exchange short, focused messages that let the caller and partner sharpen the work together. This skill owns the dialogue lifecycle and context transfer. The partner owns the quality criteria and applies `rubber-duck-partner`; the caller remains responsible for the work and final answer.

When a partner task inherits earlier chat history from a fork, assume the partner experiences the old text as one continuous conversation until your new prompt arrives. Make the context switch explicit: separate inherited history from the new partner task, and state that the next section is addressed to the receiving agent.

## Trigger Rule

Open this skill at the start of any request that requires thought or action where a second reader could catch a meaningful flaw. Do this before substantive work starts.

Skip only when the response is a near-immediate social reply, simple acknowledgment, exact status report, trivial command result, direct one-sentence answer with no tool use or decision, or the user explicitly asks for a direct answer or no delegation. If unsure, ask: "Could a second reader catch a meaningful flaw here?" If yes, use the skill.

If you were asked to act as the rubber duck partner for another agent, use `rubber-duck-partner` instead. Do not start another rubber-duck dialogue from inside the partner role.

## Dialogue Modes

Choose the lightest dialogue that protects quality:

- Open-and-check dialogue: default for non-trivial turns. Open before substantive work, then check the work as it develops.
- Check-only dialogue: narrow exception for explicit review, partner, fork, or final-draft-check requests where the work already exists.

The default dialogue follows:

```text
Open -> Check -> Check -> ...
```

Each Check carries the latest relevant evidence, decision, result, or proposed response. Repeat it while another focused exchange could change direction, fill a material gap, or improve the answer.

## Workflow

1. Prepare the first dialogue request.
   Use the mode selected in "Dialogue Modes" to set the initial dialogue moment:
   - Open: send the request, success criteria, initial direction, uncertainty, and evidence needs before substantive work.
   - Check: send the existing or changed work, evidence, decision, result, uncertainty, or proposed response.

   Build a compact working brief:
   - user's request and relevant constraints
   - current context needed to judge the answer
   - intended outcome and success criteria
   - your initial plan, hypothesis, or decision point
   - known risks, uncertainties, or evidence gaps
   - what changed or remains uncertain

   Fill the full template from "Partner Prompt Contract" below:
   - Ask the partner to use `rubber-duck-partner`.
   - Put a clear separator before the partner task so the forked agent can tell the context has changed.
   - Keep the prompt self-contained. Do not rely on forked context for the draft, evidence, current-turn commentary, or decision point; include those explicitly in the prompt under the required labels.
   - Tell the partner not to start another delegation loop; their next response is the deliverable.
   - Ask the partner to apply the matching dialogue contract from `rubber-duck-partner`. Do not copy its quality policy into this orchestration skill.

2. Start a fresh partner dialogue.
   Launch `rubber-duck-partner` as an internal subagent with the prepared dialogue request.
   - If direct internal spawning is unavailable, or the launch explicitly reports that nested delegation is unavailable because of the current depth limit, skip rubber-ducking for the rest of the turn. Continue the assigned task without later dialogue, Check, or cleanup attempts.
   - Handle and report other launch failures as ordinary tool errors rather than treating them as a depth-related skip.
   - Internal subagent spawning is the only partner launch path. Do not probe for or substitute App tasks, thread forks, App Server calls, or shell commands.

3. Continue with Checks as the work evolves.
   Send a short follow-up with explicit new context when:
   - new evidence appears
   - the plan changes
   - a work chunk completes and affects the next step
   - uncertainty rises
   - a decision point appears
   - the draft starts drifting away from the user's actual request

   Each Check must include `New context since last check`; partner threads do not automatically receive caller-side context added after the fork.

4. Continue the dialogue until the useful uncertainty is resolved.
   - Keep each exchange short and focused on the next useful piece of context, evidence, or judgment.
   - When the partner identifies information that is uncertain, weakly supported, or unavailable to them, investigate it or provide the relevant path, result, or context, then share what changed.
   - When a material uncertainty in the user's requested conclusion can be safely and proportionately resolved with available tools, gather that evidence as part of the answer and return it in another Check.
   - Continue while another focused exchange can materially improve confidence in the work or its evidence.
   - The dialogue is ready to finish when the latest Check reports `Material gap: none` and `Next action: none`.

5. Decide what to adopt.
   - Adopt partner suggestions only when they improve the answer.
   - Explicitly reject suggestions that conflict with the user request, known facts, tool evidence, or scope.
   - Do not outsource responsibility for the final answer.

6. Check the user-facing answer, then finish.
   Before the final response, send the latest proposed user-facing answer and its concrete evidence through an ordinary Check.
   - When the partner returns a material gap or next action, perform the action and return with another Check.
   - Finalize when both fields are `none`, then close the partner agent as operational cleanup.
   - Do not expose the whole internal dialogue unless the user asked to see it.
   - Mention the partner thread/link only when the user explicitly asked to inspect the dialogue or the task specifically requires an audit link.
   - Keep the final response shaped around the user's request, not around the review process.

## Partner Prompt Contract

Use the full template below for the first request and ordinary work-state Checks, including the final user-facing-answer Check. Replace bracketed sections with the current task details.

```text
==================== CONTEXT SWITCH ====================
The conversation above may be inherited from a fork. From this point onward, treat this as a new request addressed to you, the agent receiving this message.

Definitions:
- `caller` means the agent asking you to review a draft or decision.
- `user` means the original end user whose request the caller is trying to answer.

This request is addressed to you, the agent receiving this message.
Your next response is the deliverable for this request.
Your role is to act here as the rubber duck partner: independently review the caller's draft, plan, evidence, or decision point using the quality criteria and phase contract in `rubber-duck-partner`.
This is not a request to arrange, delegate, implement, continue the caller's task, or run a separate verification workflow.

Use rubber-duck-partner.

Dialogue moment:
[Open / Check]

Original user request:
[quote or summarize the user's newest request and any constraints]

Proposed next response:
[paste the exact user-facing draft, or write "none"; for Open, usually write "none" unless a concrete draft already exists]

Decision under review:
[paste the plan, hypothesis, or decision to inspect, or write "none" if the proposed response is the only review target]

Evidence / results already gathered:
[list concrete tool output, thread ids, files, tests, or say "none"]

New context since last check:
[for Check, paste new evidence, progress, revised plan, or draft changes; for Open, write "none"]

Specific checks requested:
[write "Apply the rubber-duck-partner contract for this dialogue moment", plus any task-specific concern that is not already in the skill]
```

For a direct answer or question about the partner's immediately preceding response, omit unchanged fields and send only:

```text
Dialogue moment:
Check

New context since last check:
[one direct answer or question, plus any new evidence or context]

Specific checks requested:
Reply directly and briefly to this point.
Revise your previous view if warranted.
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
- Preserve raw thread links or agent ids only when the user wants to inspect the conversation, when validating this skill itself, or when the task specifically requires audit evidence.
- When validating this skill itself, preserve the partner thread id and one-line outcome evidence.
- Close completed partner agents to keep the subagent list tidy.
- Keep the partner agent open only when the user explicitly asks for the live subagent to remain open or closing fails.
