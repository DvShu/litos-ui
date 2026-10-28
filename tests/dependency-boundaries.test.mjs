import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { analyzeSources, auditRepository, formatSummary } from "../scripts/audit-dependencies.mjs";

const repository = fileURLToPath(new URL("../", import.meta.url));

test("the real source graph keeps implementation and registration boundaries", () => {
  const audit = auditRepository();
  assert.equal(audit.ok, true, formatSummary(audit));
  assert.deepEqual(audit.violations, []);
  assert.deepEqual(audit.unresolved, []);
  assert.deepEqual(audit.parseErrors, []);
  const entries = readdirSync(path.join(repository, "src/components/entries"))
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".d.ts"))
    .map((name) => `entries/${name}`)
    .sort();
  assert.deepEqual(Object.keys(audit.entries).sort(), entries);
  assert(entries.length > 0);
  for (const [id, entry] of Object.entries(audit.entries)) {
    assert(entry.modules.includes(id));
    assert(!entry.modules.includes("index.ts"), id);
  }
  assert(audit.sharedModules.some((item) => item.module === "utils/index.ts"));
  assert(
    audit.entries["entries/button.ts"].styles.some((edge) => edge.target === "button/index.less"),
  );
  assert(
    audit.entries["entries/qrcode.ts"].externals.some(
      (edge) => edge.target === "qrcode-generator-es",
    ),
  );
  // Optional states may deliberately require additional entries. Do not assert their presence.
  assert(
    audit.entries["entries/button.ts"].registrations.some((call) =>
      call.bindings.some((binding) => binding.tag === "l-button"),
    ),
  );
  assert(
    audit.modules["icon/icon_style.ts"].topLevelOperations.some(
      (call) => call.callee === "CSSStyleSheet" && call.kind === "new",
    ),
  );
  assert(!audit.modules["utils/style.ts"]);
  assert(!Object.keys(audit.modules).some((id) => id.endsWith(".d.ts")));
  assert.match(formatSummary(audit), /^Dependency audit: PASS/);
  assert.doesNotThrow(() => JSON.stringify(audit));
});

test("direct and indirect implementation imports of registration entries are rejected", () => {
  const audit = analyzeSources({
    "index.ts": 'export { Button } from "./button";',
    "button.ts": 'import "./helper"; export class Button {}',
    "helper.ts": 'import "./entries/button";',
    "entries/button.ts": "export {};",
  });
  assert.equal(audit.ok, false);
  assert(
    audit.violations.some(
      (item) =>
        item.from === "helper.ts" && item.path.join(" -> ") === "helper.ts -> entries/button.ts",
    ),
  );
  assert(
    audit.violations.some(
      (item) =>
        item.from === "button.ts" &&
        item.path.join(" -> ") === "button.ts -> helper.ts -> entries/button.ts",
    ),
  );
});

test("neither implementations nor registration entries may load the total barrel", () => {
  const audit = analyzeSources({
    "index.ts": "export {};",
    "direct.ts": 'export * from "./index";',
    "helper.ts": 'import "./index";',
    "button.ts": 'import "./helper";',
    "entries/button.ts": 'import "../button";',
    "entries/direct.ts": 'import "../index";',
  });
  assert.equal(audit.ok, false);
  for (const id of [
    "direct.ts",
    "helper.ts",
    "button.ts",
    "entries/button.ts",
    "entries/direct.ts",
  ]) {
    assert(
      audit.violations.some((item) => item.from === id && item.target === "index.ts"),
      id,
    );
  }
  assert(
    audit.violations.some(
      (item) =>
        item.rule === "entry-imports-barrel" &&
        item.path.join(" -> ") === "entries/button.ts -> button.ts -> helper.ts -> index.ts",
    ),
  );
});

test("the barrel can re-export implementations and entries can share registrations", () => {
  const audit = analyzeSources({
    "index.ts": 'export { Button } from "./button";',
    "button.ts": "export class Button {}",
    "entries/button.ts": 'export { Button } from "../button";',
    "entries/composite.ts": 'import "./button"; export { Button } from "../button";',
  });
  assert.equal(audit.ok, true);
  assert.deepEqual(audit.entries["entries/composite.ts"].registrationEntries, [
    "entries/button.ts",
  ]);
});

test("explicit type-only imports, exports and import types do not create runtime edges", () => {
  const audit = analyzeSources({
    "index.ts": "export {};",
    "types.d.ts": 'import "./entries/absent";',
    "types.ts": [
      'import type Thing from "./entries/absent";',
      'import { type Entry } from "./entries/absent";',
      'export type { Entry } from "./index";',
      'export { type Entry } from "./entries/absent";',
      'export type * from "./entries/absent";',
      'type Module = typeof import("./entries/absent");',
    ].join("\n"),
  });
  assert.equal(audit.ok, true);
  assert.deepEqual(audit.modules["types.ts"].dependencies, []);
  assert(!audit.modules["types.d.ts"]);
});

test("mixed type/value declarations retain value edges and report source locations", () => {
  const audit = analyzeSources({
    "pure.ts":
      'import { type Entry, value } from "./entries/value";\nexport { type Entry, value } from "./entries/value";',
    "entries/value.ts": "export const value = 1; export type Entry = string;",
  });
  assert.equal(audit.ok, false);
  assert.deepEqual(
    audit.modules["pure.ts"].dependencies.map((edge) => [edge.kind, edge.line, edge.column]),
    [
      ["import", 1, 1],
      ["re-export", 2, 1],
    ],
  );
});

test("runtime resolution separates shared modules, stylesheet assets and third parties", () => {
  const audit = analyzeSources({
    "entries/example.ts": [
      'import "../component";',
      'import "../explicit.ts";',
      'import "../script.js";',
      'import "../view.less?inline";',
      'import "../theme.css";',
      'import { signal } from "alien-signals";',
      'export { value } from "../explicit";',
    ].join("\n"),
    "component/index.ts": "export {};",
    "explicit.ts": "export const value = 1;",
    "script.ts": "export {};",
  });
  assert.equal(audit.ok, true);
  assert.deepEqual(audit.entries["entries/example.ts"].modules, [
    "component/index.ts",
    "entries/example.ts",
    "explicit.ts",
    "script.ts",
  ]);
  assert.deepEqual(
    audit.entries["entries/example.ts"].styles.map((edge) => edge.target),
    ["view.less", "theme.css"],
  );
  assert.deepEqual(
    audit.entries["entries/example.ts"].externals.map((edge) => edge.target),
    ["alien-signals"],
  );
});

test("literal dynamic imports are tracked even when deferred; computed imports are disclosed", () => {
  const audit = analyzeSources({
    "pure.ts": 'export function lazy(name: string) { import("./entries/lazy"); import(name); }',
    "entries/lazy.ts": "export {};",
  });
  assert.equal(audit.ok, false);
  assert.equal(audit.modules["pure.ts"].dependencies[0].kind, "dynamic-import");
  assert.equal(audit.modules["pure.ts"].dynamicImports.length, 1);
  assert.equal(audit.modules["pure.ts"].dynamicImports[0].expression, "import(name)");
  assert.deepEqual(audit.modules["pure.ts"].topLevelOperations, []);
});

test("top-level calls and constructions exclude functions and instance initializers", () => {
  const audit = analyzeSources({
    "operations.ts": [
      "const sheet = /* @__PURE__ */ makeSheet(css);",
      "const immediate = new Sheet(argument());",
      "const deferred = () => callback();",
      "function later(x = parameter()) { body(); return new Hidden(); }",
      "class Widget extends makeBase() {",
      "  instance = new InstanceSheet();",
      "  static sheet = new StaticSheet();",
      "  static delayed = () => nested();",
      "  static { install(); }",
      "  [key()]() { method(); }",
      "  constructor() { super(); construct(); }",
      "  get value() { return getter(); }",
      "}",
      "const obj = { [objectKey()]() { objectBody(); } };",
      "if (enabled) maybe();",
      "const iife = (() => insideIife())();",
    ].join("\n"),
  });
  assert.equal(audit.ok, true);
  const operations = audit.modules["operations.ts"].topLevelOperations;
  assert.deepEqual(
    operations.map((item) => item.callee),
    [
      "makeSheet",
      "Sheet",
      "argument",
      "makeBase",
      "StaticSheet",
      "install",
      "key",
      "objectKey",
      "maybe",
      "(() => insideIife())",
    ],
  );
  assert.equal(operations[0].pureAnnotated, true);
  assert.deepEqual(
    operations.find((item) => item.callee === "StaticSheet"),
    {
      kind: "new",
      callee: "StaticSheet",
      expression: "new StaticSheet()",
      context: "class-static-field",
      pureAnnotated: false,
      line: 7,
      column: 18,
    },
  );
  assert.equal(operations.find((item) => item.callee === "install").context, "class-static-block");
  assert.equal(operations.find((item) => item.callee === "key").context, "computed-name");
});

test("direct registration sites resolve implementation classes and tags", () => {
  const audit = analyzeSources({
    "entries/example.ts": 'import Example from "../example"; regist(Example);',
    "example.ts": 'export default class Example { static baseName = "example"; }',
  });
  assert.equal(audit.ok, true);
  assert.deepEqual(audit.entries["entries/example.ts"].registrations[0].bindings, [
    { name: "Example", specifier: "../example", implementation: "example.ts", tag: "l-example" },
  ]);
});

test("unresolved imports and syntax errors fail while cycles are reported", () => {
  const missing = analyzeSources({ "a.ts": 'import "./missing";' });
  assert.equal(missing.ok, false);
  assert.equal(missing.unresolved[0].specifier, "./missing");
  const invalid = analyzeSources({ "invalid.ts": "const = ;" });
  assert.equal(invalid.ok, false);
  assert(invalid.parseErrors.length > 0);
  const cycle = analyzeSources({ "a.ts": 'import "./b";', "b.ts": 'import "./a";' });
  assert.equal(cycle.ok, true);
  assert.deepEqual(cycle.cycles, [["a.ts", "b.ts", "a.ts"]]);
});