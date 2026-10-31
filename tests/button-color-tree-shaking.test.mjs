import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { build } from "vite";

// Run after lib:build: consumer bundling must exercise the emitted public entries,
// not source aliases or a mock of utilane's color adjustment implementation.
async function bundle(source) {
  const result = await build({
    configFile: false,
    root: fileURLToPath(new URL("..", import.meta.url)),
    logLevel: "silent",
    plugins: [
      {
        name: "button-color-consumer",
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
  // The library build may shorten the generator's local name. Check the color
  // algorithm, not the utils module: ordinary buttons also use its other exports.
  assert.doesNotMatch(code, /\bfunction adjust\s*\(/);
  assert.doesNotMatch(code, /\bfunction (?:getHue|getSaturation|getValue|toHsv)\s*\(/);
}

test("ordinary litos-ui/button registration eliminates generator and utilane adjustment", async () => {
  const code = await bundle('import "litos-ui/button";');
  assert.match(code, /customElements\.define\(/);
  assert.match(code, /l-btn/);
  assertNoColorMath(code);
});

test("utility regist import eliminates generator and utilane adjustment", async () => {
  const code = await bundle(`
    import { regist } from "litos-ui/utils";
    export function register(component) { regist(component); }
  `);
  assert.match(code, /customElements\.define\(/);
  assertNoColorMath(code);
});

test("calling the public generateButtonColor retains the generator and adjustment implementation", async () => {
  const code = await bundle(`
    import { generateButtonColor } from "litos-ui/utils";
    export function colors(value, text, ghost) {
      return generateButtonColor(value, text, ghost);
    }
  `);
  assert.match(code, /lib\/utils\/index\.js/);
  assert.match(code, /\bfunction adjust\s*\(/);
  assert.match(code, /--l-btn-hover-background/);
  assert.match(code, /\btoHsv\(/);
  // Execute the DOM-free consumer as an additional positive control: merely
  // retaining a name or an unresolved external import does not satisfy this test.
  const consumer = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  assert.equal(consumer.colors("#3584c7")["--l-btn-hover-background"], "#5B9FD4");
  assert.equal(consumer.colors("#3584c7")["--l-btn-active-background"], "#0A2A54");
});