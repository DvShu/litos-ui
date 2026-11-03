import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";

// 从独立注册入口检查，而不是总入口；总入口的 Collapse 仍属于独立迁移范围。
const entries = [
  "form",
  "form-item",
  "input",
  "input-number",
  "md-input",
  "select",
  "select-ori",
  "switch",
  "checkbox",
  "checkbox-group",
  "radio",
  "radio-group",
  "color-picker",
  "date-picker",
  "date-picker-ori",
];

test("form-related on-demand entries have no alien-signals runtime or signal type graph", async () => {
  const visited = new Set();
  const output = await build({
    configFile: false,
    logLevel: "error",
    plugins: [
      {
        name: "assert-form-signal-boundary",
        moduleParsed(info) {
          if (!info.id.includes("node_modules")) visited.add(info.id.split("?")[0]);
          assert.ok(!/alien-signals/.test(info.id), `Unexpected signal module: ${info.id}`);
        },
      },
    ],
    build: {
      write: false,
      minify: false,
      rollupOptions: {
        input: Object.fromEntries(
          entries.map((name) => [name, `src/components/entries/${name}.ts`]),
        ),
        output: { format: "es" },
        external(id) {
          assert.ok(!/^alien-signals(?:\/|$)/.test(id), `Unexpected signal import: ${id}`);
          return /^utilane(?:\/|$)/.test(id) || id === "qrcode-generator-es";
        },
      },
    },
  });
  for (const bundle of Array.isArray(output) ? output : [output]) {
    for (const item of bundle.output) {
      if (item.type === "chunk")
        assert.doesNotMatch(item.code, /alien-signals|resetCtx|["']form-context-request["']/);
    }
  }
  let checked = 0;
  for (const filename of visited) {
    if (!/\.[cm]?[jt]s$/.test(filename)) continue;
    const source = await readFile(filename, "utf8");
    assert.doesNotMatch(
      source,
      /(?:import|export)[\s\S]*?from\s*["'][^"']*signal_types["']/,
      `Signal type coupling: ${path.relative(process.cwd(), filename)}`,
    );
    assert.doesNotMatch(source, /from\s*["']alien-signals["']|\bresetCtx\b/);
    checked++;
  }
  assert.ok(checked >= 20, `Expected actual source graph, found ${checked} files`);
});