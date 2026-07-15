import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  lstatSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const repositoryRoot = new URL("../", import.meta.url);
const skillsRoot = new URL("../skills/", import.meta.url);
const japaneseTextPattern = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, repositoryRoot), "utf8"));
}

function readProjectText(fileURL) {
  if (lstatSync(fileURL).isSymbolicLink()) {
    return readlinkSync(fileURL);
  }

  const content = readFileSync(fileURL);
  return content.includes(0) ? "" : content.toString("utf8");
}

function listTrackedTextFiles() {
  return execFileSync("git", ["ls-files", "-z"], { cwd: repositoryRoot, encoding: "utf8" })
    .split("\0")
    .filter(Boolean)
    .map((path) => {
      const fileURL = new URL(path, repositoryRoot);
      return { path, content: readProjectText(fileURL) };
    });
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

test("plugin metadata presents a skill collection rather than one workflow", () => {
  const codexPlugin = readJson(".codex-plugin/plugin.json");
  const claudePlugin = readJson(".claude-plugin/plugin.json");
  const claudeMarketplace = readJson(".claude-plugin/marketplace.json");
  const publicMetadata = JSON.stringify({
    codexDescription: codexPlugin.description,
    codexInterface: codexPlugin.interface,
    claudeDescription: claudePlugin.description,
    marketplaceDescription: claudeMarketplace.metadata.description,
    pluginListingDescription: claudeMarketplace.plugins[0].description,
  });

  assert.match(publicMetadata, /Agent Skills/);
  assert.doesNotMatch(publicMetadata, /rubber-duck|independent review/i);
});

test("project text uses English scripts", () => {
  const matches = listTrackedTextFiles()
    .filter(({ path, content }) => japaneseTextPattern.test(path) || japaneseTextPattern.test(content))
    .map(({ path }) => path);

  assert.deepEqual(matches, []);
});

test("English-only check recognizes Japanese text ranges", () => {
  for (const value of ["\u3042", "\u30a2", "\u6f22", "\u3001", "\uff21"]) {
    assert.match(value, japaneseTextPattern);
  }
  assert.doesNotMatch("Agent Skills", japaneseTextPattern);
});

test("English-only check reads symlink targets without following them", () => {
  const directory = mkdtempSync(join(tmpdir(), "agent-skills-english-test-"));
  const link = join(directory, "linked-skill");
  try {
    symlinkSync("\u3042", link);
    assert.match(readProjectText(pathToFileURL(link)), japaneseTextPattern);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
