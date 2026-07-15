import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const skillsRoot = new URL("../skills/", import.meta.url);

test("skills use a flat layout and matching frontmatter names", () => {
  const names = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  assert.deepEqual(names, ["rubber-duck-caller", "rubber-duck-partner"]);
  for (const name of names) {
    const skill = readFileSync(new URL(`${name}/SKILL.md`, skillsRoot), "utf8");
    assert.match(skill, new RegExp(`^name: ${name}$`, "m"));
  }
});

test("the caller points to the partner skill", () => {
  const caller = readFileSync(new URL("rubber-duck-caller/SKILL.md", skillsRoot), "utf8");
  assert.match(caller, /`rubber-duck-partner`/);
  assert.doesNotMatch(caller, /^name: rubber-ducking$/m);
});
