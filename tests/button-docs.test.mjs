import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { createMarkdownRenderer } from "vitepress";

const require = createRequire(import.meta.resolve("vitepress"));
const { compileTemplate } = require("@vue/compiler-sfc");
const markdown = await createMarkdownRenderer(process.cwd());

for (const file of ["docs/components/button.md", "docs/en/components/button.md"]) {
  test(`${file}: script follows Basic Usage and guards SSR and early unmount`, async () => {
    const content = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(content, /## (?:基础使用|Basic Usage)\s+<script setup>/);
    const script = content
      .match(/<script setup>([\s\S]*?)<\/script>/)[1]
      .replace(/^import .*;\r?$/gm, "");
    for (const scenario of ["client", "ssr", "unmounted"]) {
      let mount, unmount;
      const nodes = new Map(
        ["solid", "ghost", "text"].map((key) => [
          key,
          {
            setColor(value) {
              this.color = value;
            },
          },
        ]),
      );
      runInNewContext(script.replaceAll("import.meta.env.SSR", String(scenario === "ssr")), {
        onMounted: (fn) => {
          mount = fn;
        },
        onUnmounted: (fn) => {
          unmount = fn;
        },
        nextTick: () => Promise.resolve(),
        document: {
          querySelector: (selector) => {
            assert.equal(scenario, "client", "must not access DOM during SSR or after unmount");
            return nodes.get(selector.match(/"(solid|ghost|text)"/)[1]);
          },
        },
        generateButtonColor: (...args) => args,
      });
      const ready = mount();
      if (scenario === "unmounted") unmount();
      await ready;
      if (scenario === "client") {
        assert.deepEqual(nodes.get("solid").color, ["#00AA7E"]);
        assert.deepEqual(nodes.get("ghost").color, ["#1e9fff", false, true]);
        assert.deepEqual(nodes.get("text").color, ["#FF7802", true]);
      } else {
        for (const node of nodes.values()) assert.equal(node.color, undefined);
      }
    }
  });
  test(`${file}: Markdown previews compile as Vue templates without injected paragraphs`, () => {
    const rendered = markdown.render(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"));
    const result = compileTemplate({
      source: rendered,
      filename: file,
      id: "button-docs",
      compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") },
    });
    assert.deepEqual(result.errors, []);
    const source = rendered.match(/<textarea lang="js">([\s\S]*?)<\/textarea>/)?.[1];
    assert(source, "custom color example must expose its JavaScript in the source panel");
    assert.match(source, /generateButtonColor/);
    assert.doesNotMatch(source, /<\/?(?:p|pre|code)\b/);
    assert.doesNotMatch(rendered, /data-color-action|data-color-feedback/);
  });
}