import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const repositoryRoot = new URL("../", import.meta.url);
const skillsRoot = new URL("../skills/", import.meta.url);

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, repositoryRoot), "utf8"));
}

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

test("Codex and Claude marketplaces publish the root plugin", () => {
  const codexMarketplace = readJson(".agents/plugins/marketplace.json");
  const claudeMarketplace = readJson(".claude-plugin/marketplace.json");
  const codexPlugin = readJson(".codex-plugin/plugin.json");
  const claudePlugin = readJson(".claude-plugin/plugin.json");

  assert.equal(codexMarketplace.name, "game-dev-rta-club");
  assert.equal(codexMarketplace.plugins.length, 1);
  assert.equal(codexMarketplace.plugins[0].name, codexPlugin.name);
  assert.deepEqual(codexMarketplace.plugins[0].source, {
    source: "url",
    url: "https://github.com/game-dev-rta-club/agent-skills.git",
  });

  assert.equal(claudeMarketplace.name, "game-dev-rta-club");
  assert.equal(claudeMarketplace.plugins.length, 1);
  assert.equal(claudeMarketplace.plugins[0].name, claudePlugin.name);
  assert.deepEqual(claudeMarketplace.plugins[0].source, {
    source: "github",
    repo: "game-dev-rta-club/agent-skills",
  });
});
