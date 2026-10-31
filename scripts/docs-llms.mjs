import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import llmstxt from "vitepress-plugin-llms";

// Keep executable demos on the website unchanged. Only the plugin's private
// Markdown collection receives this text-only representation.
export function cleanMarkdown(source) {
  const blocks = [];
  const protect = (value) => {
    const key = `LITOSLLMSBLOCK${blocks.length}END`;
    blocks.push(value);
    return `\n\n${key}\n\n`;
  };
  let text = source.replace(/\r\n/g, "\n");
  // Protect existing fenced examples before examining HTML or script tags.
  text = text.replace(/^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[ \t]*(?=\n|$)/gm, protect);
  const textarea = /<textarea\b([^>]*)>([\s\S]*?)<\/textarea\s*>/gi;
  const extract = (input) =>
    input.replace(textarea, (_, attrs, code) => {
      const language = /\blang=["']([\w-]+)["']/i.exec(attrs)?.[1] ?? "html";
      const content = code.replace(/^\n/, "").replace(/\s+$/, "");
      const runs = content.match(/`+/g) ?? [];
      const fence = "`".repeat(Math.max(3, ...runs.map((run) => run.length + 1)));
      return protect(`${fence}${language}\n${content}\n${fence}`);
    });
  text = text.replace(/<l-code-preview\b[^>]*>([\s\S]*?)<\/l-code-preview\s*>/gi, (_, body) => {
    // The source slot contains the copyable example, the first textarea only
    // supplies the live preview. Do not publish that preview twice.
    const sourceStart = /<div\b[^>]*\bclass=["'][^"']*\bsource\b[^"']*["'][^>]*>/i.exec(body);
    return extract(sourceStart ? body.slice(sourceStart.index + sourceStart[0].length) : body);
  });
  text = extract(text);
  text = text.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  text = text.replace(/<!--\s*prettier-ignore\s*-->/g, "");
  text = text.replace(/<\/?(?:ClientOnly|div|template)\b[^>]*>/gi, "");
  text = text.replace(/^\s*:::(?:\s*code-group)?\s*$/gm, "");
  text = text.replace(/LITOSLLMSBLOCK(\d+)END/g, (_, index) => blocks[Number(index)]);
  return `${text.trim()}\n`;
}

export function llmsPagesPlugin() {
  const plugins = llmstxt({
    domain: "https://dvshu.github.io",
    generateLLMsTxt: false,
    generateLLMsFullTxt: false,
    generateLLMFriendlyDocsForEachPage: true,
    injectLLMHint: false,
    // Custom element examples are code, not disposable HTML.
    stripHTML: false,
    ignoreFiles: ["en/index.md"],
  });
  const collector = plugins[0];
  if (
    collector?.name !== "vitepress-plugin-llms:llm-tags" ||
    typeof collector.transform !== "function"
  ) {
    throw new Error("vitepress-plugin-llms collector changed; review the pinned-version adapter.");
  }
  const collect = collector.transform;
  collector.transform = async function (content, id, ...args) {
    // Never return the cleaned source to Vite: that would remove live demos.
    await collect.call(this, id.endsWith(".md") ? cleanMarkdown(content) : content, id, ...args);
    return null;
  };
  return plugins;
}

function sidebarPages(items, group = "") {
  return items.flatMap((item) => [
    ...(item.link ? [{ route: item.link, title: item.text, group }] : []),
    ...sidebarPages(item.items ?? [], group || item.text),
  ]);
}

export function rewriteLinks(markdown, page, routes, origin, base) {
  // Do not rewrite links inside fenced examples.
  const fences = [];
  const protectedText = markdown.replace(
    /^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[ \t]*(?=\n|$)/gm,
    (block) => {
      fences.push(block);
      return `LITOSLINKFENCE${fences.length - 1}END`;
    },
  );
  const parts = [protectedText];
  return parts
    .map((part, index) =>
      index % 2
        ? part
        : part.replace(/(?<!!)\[([^\]\n]+)\]\(([^\s)]+)\)/g, (all, label, target) => {
            if (/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(target)) return all;
            const withBase =
              target.startsWith("/") && !target.startsWith(base)
                ? `${base}${target.slice(1)}`
                : target;
            const resolved = new URL(withBase, `${origin}${base}${page}`);
            if (!resolved.pathname.startsWith(base)) return all;
            let route = resolved.pathname
              .slice(base.length)
              .replace(/\.(?:md|html)$/, "")
              .replace(/\/$/, "/index");
            if (!route) route = "index";
            if (!routes.has(route)) return all;
            return `[${label}](${origin}${base}${route}.md${resolved.search}${resolved.hash})`;
          }),
    )
    .join("")
    .replace(/LITOSLINKFENCE(\d+)END/g, (_, index) => fences[Number(index)]);
}

export async function generateBilingualLlms(config) {
  const origin = new URL(config.site.sitemap?.hostname ?? "https://dvshu.github.io").origin;
  const base = config.site.base;
  const locales = config.site.locales;
  const languages = [
    {
      code: "zh",
      prefix: "",
      title: "中文文档",
      locale: locales.root,
      note: "中文文档是内容依据。英文译文可能滞后；两者不一致时，以中文为准。",
    },
    {
      code: "en",
      prefix: "en/",
      title: "English documentation",
      locale: locales.en,
      note: "Chinese documentation is the source of truth. English translations may lag behind; prefer Chinese when the versions differ. Pages under /en/ are not a guarantee of translation completeness.",
    },
  ];
  const collections = languages.map((language) => ({
    ...language,
    pages: sidebarPages(language.locale.themeConfig.sidebar),
  }));
  const routes = new Set(
    collections.flatMap(({ pages }) => pages.map(({ route }) => route.slice(1))),
  );
  for (const language of collections) {
    const seen = new Set();
    let group;
    const index = [
      `# LitosUI — ${language.title}`,
      "",
      `> ${language.locale.description}`,
      "",
      language.note,
      "",
      `[${language.code === "zh" ? "全文" : "Full documentation"}](${origin}${base}llms-${language.code}-full.txt)`,
      "",
    ];
    const full = [`# LitosUI — ${language.title}`, "", language.note, ""];
    for (const page of language.pages) {
      const route = page.route.slice(1);
      if (
        !route.startsWith(language.prefix) ||
        (language.code === "zh" && route.startsWith("en/")) ||
        route.includes("..")
      )
        throw new Error(`Invalid language route: ${route}`);
      if (seen.has(route)) continue;
      seen.add(route);
      const filename = `${route}.md`;
      // Only current sidebar targets are read. Missing plugin output fails the
      // build instead of silently publishing an incomplete index.
      await readFile(path.join(config.srcDir, filename), "utf8");
      const generated = await readFile(path.join(config.outDir, filename), "utf8");
      const content = rewriteLinks(generated, filename, routes, origin, base);
      await writeFile(path.join(config.outDir, filename), content);
      if (group !== page.group) {
        group = page.group;
        index.push(`## ${group}`, "");
      }
      const url = `${origin}${base}${filename}`;
      index.push(`- [${page.title}](${url})`);
      full.push(`<!-- Source: ${url} -->`, "", content.trim(), "", "---", "");
    }
    await writeFile(path.join(config.outDir, `llms-${language.code}.txt`), `${index.join("\n")}\n`);
    await writeFile(path.join(config.outDir, `llms-${language.code}-full.txt`), full.join("\n"));
    console.log(`[llms] ${language.code}: ${seen.size} pages`);
  }
  const link = (file) => `${origin}${base}${file}`;
  await writeFile(
    path.join(config.outDir, "llms.txt"),
    `# LitosUI\n\n> A framework-agnostic UI component library built with Web Components and TypeScript.\n\n## Documentation languages\n\n- [中文文档索引](${link("llms-zh.txt")})\n- [English documentation index](${link("llms-en.txt")})\n\n## Full documentation\n\n- [中文全文](${link("llms-zh-full.txt")})\n- [English full documentation](${link("llms-en-full.txt")})\n\n## Content policy\n\nChinese documentation is the source of truth. English translations may lag behind. If the two versions differ, prefer the Chinese documentation. English-path pages may still contain untranslated content.\n\nThe language indexes cover the guides and components in the site sidebars; marketing home pages are omitted.\n`,
  );
}