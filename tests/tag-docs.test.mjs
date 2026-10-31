import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { createMarkdownRenderer } from "vitepress";

const require = createRequire(import.meta.resolve("vitepress"));
const { compileTemplate } = require("@vue/compiler-sfc");
const markdown = await createMarkdownRenderer(process.cwd());

for (const file of ["docs/components/tag.md", "docs/en/components/tag.md"]) {
  const content = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  test(`${file}: custom colors guard SSR and early unmount and preserve transition cleanup`, async () => {
    assert.match(content, /## (?:演示|Examples)\s+<script setup>/);
    const script = content
      .match(/<script setup>([\s\S]*?)<\/script>/)[1]
      .replace(/^\s*import .*;\r?$/gm, "");
    for (const scenario of ["client", "ssr", "unmounted"]) {
      let mount, unmount;
      const listeners = new Map();
      const nodes = new Map(
        ["jade", "blue", "orange"].map((key) => [
          key,
          {
            setColor(value) {
              this.color = value;
            },
          },
        ]),
      );
      const controls = new Map(
        ["btn-add", "tag-container"].map((id) => [
          id,
          {
            addEventListener(event, handler) {
              listeners.set(`${id}:${event}`, handler);
            },
            removeEventListener(event, handler) {
              assert.equal(listeners.get(`${id}:${event}`), handler);
              listeners.delete(`${id}:${event}`);
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
            return nodes.get(selector.match(/"(jade|blue|orange)"/)[1]);
          },
          getElementById: (id) => {
            assert.equal(scenario, "client");
            return controls.get(id);
          },
        },
        generateTagColor: (color) => color,
        transition: () => {},
      });
      const ready = mount();
      if (scenario === "unmounted") unmount();
      await ready;
      if (scenario === "client") {
        assert.equal(nodes.get("jade").color, "#00AA7E");
        assert.equal(nodes.get("blue").color, "#1e9fff");
        assert.equal(nodes.get("orange").color, "#FF7802");
        assert.equal(listeners.size, 2);
        unmount();
      } else {
        for (const node of nodes.values()) assert.equal(node.color, undefined);
      }
      assert.equal(listeners.size, 0);
    }
  });
  test(`${file}: Markdown previews compile without textarea paragraph injection or legacy color attributes`, () => {
    assert.doesNotMatch(content, /<l-tag\b[^>]*\scolor\s*=/);
    const rendered = markdown.render(content);
    const result = compileTemplate({
      source: rendered,
      filename: file,
      id: "tag-docs",
      compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") },
    });
    assert.deepEqual(result.errors, []);
    const sources = [...rendered.matchAll(/<textarea lang="js">([\s\S]*?)<\/textarea>/g)];
    assert.equal(sources.length, 2, "custom colors and transitions must both expose JavaScript");
    assert.match(sources[0][1], /generateTagColor/);
    for (const [, source] of sources) {
      assert.doesNotMatch(source.trim(), /\n\s*\n/);
      assert.doesNotMatch(source, /<\/?(?:p|pre|code)\b/);
    }
    assert.doesNotMatch(rendered, /data-color-action|data-color-feedback/);
  });
}