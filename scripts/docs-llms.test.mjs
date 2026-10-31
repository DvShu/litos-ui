import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { cleanMarkdown, generateBilingualLlms, rewriteLinks } from "./docs-llms.mjs";

const origin = "https://example.com";
const base = "/litos-ui/";
const routes = new Set([
  "usage",
  "components/button",
  "components/icon",
  "en/usage",
  "en/components/button",
  "en/components/icon",
]);

test("cleanMarkdown preserves existing backtick and tilde fences before HTML cleanup", () => {
  const examples = [
    '```html\n<script>example()</script>\n<style>.demo { color: red; }</style>\n<textarea lang="js">keep()</textarea>\n<ClientOnly>example</ClientOnly>\n```',
    '~~~vue\n<template><div v-if="visible">{{ label }}</div></template>\n<script setup>const visible = true;</script>\n~~~',
    "````md\n```html\n<script>nested()</script>\n```\n````",
  ];
  for (const example of examples) {
    assert.equal(cleanMarkdown(example), `${example}\n`);
  }
});

test("cleanMarkdown extracts textarea code without stripping embedded scripts or markup", () => {
  const code =
    '  <template><div v-for="item in items">{{ item }}</div></template>\n  <script>const literal = "```";</script>\n  <style>.demo { color: red; }</style>';
  const result = cleanMarkdown(
    `<ClientOnly>\n<l-code-preview>\n<textarea lang="vue">\n${code}\n</textarea>\n</l-code-preview>\n</ClientOnly>`,
  );
  assert.equal(result, `\`\`\`\`vue\n${code}\n\`\`\`\`\n`);
});

test("cleanMarkdown prefers source slot and keeps all languages without duplicate preview", () => {
  const result = cleanMarkdown(
    '<l-code-preview>\n<textarea lang="html"><l-button>Example</l-button></textarea>\n<div class="source">\n<textarea lang="html"><l-button>Example</l-button></textarea>\n<textarea lang="js">const value = 1;</textarea>\n<textarea lang="css">l-button { color: red; }</textarea>\n</div>\n</l-code-preview>',
  );
  assert.equal(result.match(/<l-button>Example<\/l-button>/g)?.length, 1);
  assert.match(result, /```html\n<l-button>Example<\/l-button>\n```/);
  assert.match(result, /```js\nconst value = 1;\n```/);
  assert.match(result, /```css\nl-button \{ color: red; \}\n```/);
  assert.doesNotMatch(result, /<\/?(?:textarea|l-code-preview|div)\b/);
});

test("cleanMarkdown removes executable blocks and wrappers but retains prose, tables and grouped code", () => {
  const result = cleanMarkdown(
    "# Demo\r\n<script setup>secretRuntime()</script>\r\n<style scoped>.runtime { display:none; }</style>\r\n<ClientOnly><template><div>Visible description</div></template></ClientOnly>\r\n<!-- prettier-ignore -->\r\n| Name | Value |\r\n| --- | --- |\r\n| `value` | 1 |\r\n::: code-group\r\n```js\r\nexample();\r\n```\r\n:::\r\n",
  );
  assert.match(result, /^# Demo/);
  assert.match(result, /Visible description/);
  assert.match(result, /\| `value` \| 1 \|/);
  assert.match(result, /```js\nexample\(\);\n```/);
  assert.doesNotMatch(
    result,
    /secretRuntime|runtime|prettier-ignore|:::|<\/?(?:ClientOnly|template|div)\b|\r/,
  );
});

test("rewriteLinks maps root and already-based bilingual document links exactly once", () => {
  const source = "[中文](/usage) [English](/en/usage) [Base](/litos-ui/components/icon.html)";
  assert.equal(
    rewriteLinks(source, "components/button.md", routes, origin, base),
    "[中文](https://example.com/litos-ui/usage.md) [English](https://example.com/litos-ui/en/usage.md) [Base](https://example.com/litos-ui/components/icon.md)",
  );
});

test("rewriteLinks resolves relative routes, extensions, query and hash in each locale", () => {
  assert.equal(
    rewriteLinks(
      "[Icon](./icon?mode=api#attributes) [Guide](../usage.md#start)",
      "components/button.md",
      routes,
      origin,
      base,
    ),
    "[Icon](https://example.com/litos-ui/components/icon.md?mode=api#attributes) [Guide](https://example.com/litos-ui/usage.md#start)",
  );
  assert.equal(
    rewriteLinks(
      "[Icon](./icon.html#api) [Guide](../usage)",
      "en/components/button.md",
      routes,
      origin,
      base,
    ),
    "[Icon](https://example.com/litos-ui/en/components/icon.md#api) [Guide](https://example.com/litos-ui/en/usage.md)",
  );
});

test("rewriteLinks leaves external links, images, anchors, unknown routes and fenced examples unchanged", () => {
  const source =
    "[External](https://example.org/usage) [CDN](//cdn.example.org/a) [Mail](mailto:help@example.org) [Anchor](#api) [Unknown](./missing) ![Image](./icon)\n\n```md\n[Example](./icon)\n```\n\n~~~md\n[Example](../usage)\n~~~";
  assert.equal(rewriteLinks(source, "components/button.md", routes, origin, base), source);
});

async function fixture(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "litos-docs-llms-test-"));
  t.after(async () => {
    // Guard the exact recursive deletion target: only this test's mkdtemp child.
    assert.equal(path.dirname(directory), path.resolve(os.tmpdir()));
    assert.ok(path.basename(directory).startsWith("litos-docs-llms-test-"));
    await rm(directory, { recursive: true, force: true });
  });
  const config = {
    srcDir: path.join(directory, "src"),
    outDir: path.join(directory, "out"),
    site: {
      base,
      sitemap: { hostname: `${origin}${base}` },
      locales: {
        root: {
          description: "ZH description",
          themeConfig: {
            sidebar: [
              { text: "指南", items: [{ text: "开始", link: "/usage" }] },
              {
                text: "组件",
                items: [
                  { text: "图标", link: "/components/icon" },
                  { text: "按钮", link: "/components/button" },
                  { text: "重复", link: "/components/icon" },
                ],
              },
            ],
          },
        },
        en: {
          description: "EN description",
          themeConfig: {
            sidebar: [
              { text: "Guide", items: [{ text: "Start", link: "/en/usage" }] },
              {
                text: "Components",
                items: [
                  { text: "Icon", link: "/en/components/icon" },
                  { text: "Button", link: "/en/components/button" },
                ],
              },
            ],
          },
        },
      },
    },
  };
  for (const route of routes) {
    for (const root of [config.srcDir, config.outDir]) {
      const filename = path.join(root, `${route}.md`);
      await mkdir(path.dirname(filename), { recursive: true });
      await writeFile(
        filename,
        `# ${route.startsWith("en/") ? "EN_ONLY" : "ZH_ONLY"} ${route}\n\n[Icon](./icon#api)\n`,
      );
    }
  }
  // Unlisted generated files must not leak into either language collection.
  await writeFile(path.join(config.outDir, "private.md"), "UNLISTED_PRIVATE_PAGE");
  return config;
}

test("generateBilingualLlms emits five indexes with isolated languages and sidebar ordering", async (t) => {
  const config = await fixture(t);
  await generateBilingualLlms(config);
  const files = (await readdir(config.outDir)).filter((name) => name.startsWith("llms")).sort();
  assert.deepEqual(files, [
    "llms-en-full.txt",
    "llms-en.txt",
    "llms-zh-full.txt",
    "llms-zh.txt",
    "llms.txt",
  ]);
  const get = (name) => readFile(path.join(config.outDir, name), "utf8");
  const root = await get("llms.txt");
  for (const name of files.filter((name) => name !== "llms.txt"))
    assert.ok(root.includes(`${origin}${base}${name}`));
  for (const language of ["zh", "en"]) {
    const index = await get(`llms-${language}.txt`);
    const full = await get(`llms-${language}-full.txt`);
    const prefix = language === "en" ? "en/" : "";
    const ordered = ["usage", "components/icon", "components/button"].map(
      (route) => `${origin}${base}${prefix}${route}.md`,
    );
    assert.ok(index.indexOf(ordered[0]) < index.indexOf(ordered[1]));
    assert.ok(index.indexOf(ordered[1]) < index.indexOf(ordered[2]));
    assert.ok(
      full.indexOf(`<!-- Source: ${ordered[0]} -->`) <
        full.indexOf(`<!-- Source: ${ordered[1]} -->`),
    );
    assert.ok(
      full.indexOf(`<!-- Source: ${ordered[1]} -->`) <
        full.indexOf(`<!-- Source: ${ordered[2]} -->`),
    );
    assert.equal(full.match(/<!-- Source:/g)?.length, 3);
    assert.equal(index.split(ordered[1]).length - 1, 1);
    assert.match(full, language === "en" ? /EN_ONLY/ : /ZH_ONLY/);
    assert.doesNotMatch(full, language === "en" ? /ZH_ONLY/ : /EN_ONLY/);
    assert.doesNotMatch(index + full, /UNLISTED_PRIVATE_PAGE|private\.md/);
    assert.ok(full.includes(`${origin}${base}${prefix}components/icon.md#api`));
  }
  assert.match(await get("llms-en.txt"), /English translations may lag behind/);
});

test("generateBilingualLlms fails rather than silently omitting missing generated Markdown", async (t) => {
  const config = await fixture(t);
  config.site.locales.root.themeConfig.sidebar[0].items.push({
    text: "Missing",
    link: "/missing-output",
  });
  await writeFile(path.join(config.srcDir, "missing-output.md"), "# Source exists\n");
  await assert.rejects(
    generateBilingualLlms(config),
    (error) =>
      error.code === "ENOENT" && error.path === path.join(config.outDir, "missing-output.md"),
  );
});

test("generateBilingualLlms rejects routes assigned to the wrong language", async (t) => {
  const config = await fixture(t);
  config.site.locales.root.themeConfig.sidebar[0].items.unshift({
    text: "Wrong locale",
    link: "/en/usage",
  });
  await assert.rejects(generateBilingualLlms(config), /Invalid language route: en\/usage/);
});