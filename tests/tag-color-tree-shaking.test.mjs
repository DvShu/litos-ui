import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "vite";

// Run only after a fresh lib:build: resolve the real public package exports,
// without source aliases, externalizing utilane, or writing consumer artifacts.
async function bundle(source) {
  const result = await build({
    configFile: false,
    root: fileURLToPath(new URL("..", import.meta.url)),
    logLevel: "silent",
    plugins: [
      {
        name: "tag-color-consumer",
        resolveId(id) {
          if (id.endsWith("virtual:consumer")) return "\0virtual:consumer";
        },
        load(id) {
          if (id === "\0virtual:consumer") return source;
        },
      },
    ],
    build: {
      write: false,
      minify: false,
      target: "esnext",
      lib: { entry: "virtual:consumer", formats: ["es"] },
    },
  });
  return (Array.isArray(result) ? result[0] : result).output
    .filter((item) => item.type === "chunk")
    .map((item) => item.code)
    .join("\n");
}

function assertNoColorMath(code) {
  // Emitted generator names may be shortened; inspect the retained color math.
  assert.doesNotMatch(code, /\bfunction adjust\s*\(/);
  assert.doesNotMatch(code, /\bfunction (?:getHue|getSaturation|getValue|toHsv)\s*\(/);
  assert.doesNotMatch(code, /\btoHsv\(/);
}

test("ordinary litos-ui/tag registration excludes generator and utilane adjust/HSV math", async () => {
  const code = await bundle('import "litos-ui/tag";');
  assert.match(code, /customElements\.define\(/);
  assert.match(code, /l-tag-content/);
  assertNoColorMath(code);
});

test("utility regist import excludes tag generator and utilane adjust/HSV math", async () => {
  const code = await bundle(`
    import { regist } from "litos-ui/utils";
    export function register(component) { regist(component); }
  `);
  assert.match(code, /customElements\.define\(/);
  assertNoColorMath(code);
});

test("public generateTagColor usage retains and executes color adjustment", async () => {
  const code = await bundle(`
    import { generateTagColor } from "litos-ui/utils";
    export function colors(value) { return generateTagColor(value); }
  `);
  assert.match(code, /lib\/utils\/index\.js/);
  assert.match(code, /\bfunction adjust\s*\(/);
  assert.match(code, /\btoHsv\(/);
  assert.match(code, /--l-tag-background/);
  // Executing the DOM-free bundle also catches unresolved external imports and
  // confirms the generated background, not merely the presence of a symbol.
  const consumer = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  assert.deepEqual(consumer.colors("#3584c7"), {
    "--l-tag-color": "#3584c7",
    "--l-tag-border-color": "#3584c7",
    "--l-tag-background": "#F0FAFF",
  });
  assert.deepEqual(consumer.colors("#00AA7E"), {
    "--l-tag-color": "#00AA7E",
    "--l-tag-border-color": "#00AA7E",
    "--l-tag-background": "#BCEBD6",
  });
  assert.deepEqual(consumer.colors(""), {});
  assert.deepEqual(consumer.colors(" \t\n"), {});
});