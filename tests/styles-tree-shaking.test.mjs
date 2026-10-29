import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { build } from "vite";

// Build the library before running this test. Use emitted JS to also verify
// that the library build preserves PURE annotations for consumer bundlers.
const styles = [
  "button/style.js",
  "dialog/dialog_container_style.js",
  "icon/icon_style.js",
  "input_number/style.js",
  "notification/style.js",
  "styles/animation/index.js",
  "styles/mask/index.js",
  "upload/style.js",
].map((name) => fileURLToPath(new URL(`../lib/${name}`, import.meta.url)).replaceAll("\\", "/"));

async function bundle(used, annotations = true) {
  const imports = styles
    .map((path, index) => `import sheet${index} from ${JSON.stringify(path)};`)
    .join("\n");
  const result = await build({
    configFile: false,
    logLevel: "silent",
    plugins: [
      {
        name: "shared-style-consumer",
        resolveId(id) {
          if (id.endsWith("virtual:consumer")) return "\0virtual:consumer";
        },
        load(id) {
          if (id === "\0virtual:consumer") {
            return `${imports}\nexport const result = ${used ? `[${styles.map((_, index) => `sheet${index}`).join(",")}]` : "true"};`;
          }
          if (styles.includes(id)) {
            // Force modules to be evaluated: removal must rely on PURE calls,
            // rather than package.json declaring the whole module side-effect-free.
            const code = readFileSync(id, "utf8");
            return {
              code: annotations ? code : code.replace(/\/\*\s*[@#]__PURE__\s*\*\//g, ""),
              moduleSideEffects: true,
            };
          }
        },
      },
    ],
    build: {
      write: false,
      minify: false,
      target: "esnext",
      lib: { entry: "virtual:consumer", formats: ["es"] },
      rolldownOptions: { treeshake: { moduleSideEffects: true } },
    },
  });
  return (Array.isArray(result) ? result[0] : result).output
    .filter((item) => item.type === "chunk")
    .map((item) => item.code)
    .join("\n");
}

test("unused shared sheets lose both construction and initialization", async () => {
  const code = await bundle(false);
  assert(!code.includes("CSSStyleSheet"));
  assert(!code.includes("replaceSync"));
});

test("used shared sheets retain their CSS initialization", async () => {
  const code = await bundle(true);
  assert.equal((code.match(/new CSSStyleSheet\(/g) || []).length, styles.length);
  assert.equal((code.match(/\.replaceSync\(/g) || []).length, styles.length);
});
test("without PURE the same forced-evaluation modules retain initialization", async () => {
  const code = await bundle(false, false);
  assert.equal((code.match(/new CSSStyleSheet\(/g) || []).length, styles.length);
  assert.equal((code.match(/\.replaceSync\(/g) || []).length, styles.length);
});