import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRepository } from "./audit-dependencies.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => readFileSync(path.join(root, name), "utf8");
const unique = (values) => [...new Set(values)].sort();
const canonical = (file) =>
  file
    .replace(/^entries\//, "")
    .replace(/\.ts$/, "")
    .replace(/^icon-/, "icon/");
const code = (value) => "`" + value + "`";
const cell = (values) => (values.length ? values.map(code).join("、") : "无");

export function collectEntries() {
  const audit = auditRepository();
  assert(audit.ok, "运行时依赖图存在违规");
  const requirements = JSON.parse(read("scripts/entry-requirements.json"));
  function exportsOf(id, seen = new Set()) {
    if (seen.has(id)) return [];
    seen.add(id);
    const content = read(`src/components/${id}`);
    const names = [
      ...content.matchAll(
        /^export\s+(?:declare\s+)?(?:type|interface|class|function|const|let)\s+(\w+)/gm,
      ),
    ].map((match) => match[1]);
    for (const match of content.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/g)) {
      names.push(
        ...match[1]
          .split(",")
          .map((value) =>
            value
              .trim()
              .replace(/^type\s+/, "")
              .split(/\s+as\s+/)
              .at(-1),
          )
          .filter(Boolean),
      );
    }
    if (/export\s+default\b/.test(content)) names.push("default");
    for (const edge of audit.modules[id].dependencies.filter(
      (edge) => edge.kind === "re-export" && edge.category === "module",
    )) {
      if (content.includes(`export * from "${edge.specifier}"`))
        names.push(...exportsOf(edge.target, seen));
    }
    return unique(names);
  }
  const records = Object.entries(audit.entries)
    .map(([entry, graph]) => {
      const primary = audit.modules[entry].dependencies.find(
        (edge) => edge.kind === "re-export" && edge.category === "module",
      );
      assert(primary, `${entry} 缺少实现导出`);
      const source = primary.target;
      const text = read(`src/components/${source}`);
      const publicPath = canonical(entry);
      const own = graph.registrations
        .filter((call) => call.module === entry)
        .flatMap((call) => call.bindings);
      const tag = own[0]?.tag ?? null;
      const globals = unique(
        graph.modules
          .filter((id) => id.startsWith("entries/"))
          .flatMap((id) =>
            audit.modules[id].dependencies
              .filter((edge) => edge.category === "style")
              .map((edge) => edge.target),
          ),
      );
      const pendingGlobalStyles = unique(
        graph.modules
          .filter((id) => id.startsWith("entries/"))
          .flatMap((id) =>
            [...read(`src/components/${id}`).matchAll(/^\/\/ import "([^"]+\.css)";/gm)].map(
              (match) => path.posix.normalize(path.posix.join(path.posix.dirname(id), match[1])),
            ),
          ),
      );
      return {
        path: publicPath,
        entry,
        source,
        tag,
        inheritance: text.match(/class\s+\w+(?:<[^\n]+?>)?\s+extends\s+(\w+)/)?.[1] ?? null,
        required: requirements[publicPath] ?? [],
        registered: unique(
          graph.registrations.flatMap((call) =>
            call.bindings.map((binding) => binding.tag).filter(Boolean),
          ),
        ),
        globals,
        pendingGlobalStyles,
        declarations: exportsOf(entry),
        styles: unique(graph.styles.map((edge) => edge.target)),
        externals: unique(graph.externals.map((edge) => edge.target)),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
  const byPath = new Map(records.map((record) => [record.path, record]));
  for (const key of Object.keys(requirements)) assert(byPath.has(key), `失效规则 ${key}`);
  for (const record of records)
    for (const [dependency, condition, kind] of record.required) {
      assert(byPath.has(dependency), `未知依赖 ${dependency}`);
      assert(condition && ["internal", "companion", "lazy"].includes(kind));
    }
  function closure(key, seen = new Set()) {
    for (const [dependency] of byPath.get(key).required)
      if (!seen.has(dependency)) {
        seen.add(dependency);
        closure(dependency, seen);
      }
    return [...seen].sort();
  }
  for (const record of records) record.requiredClosure = closure(record.path);
  for (const match of read("src/components/index.ts").matchAll(
    /export \{ default as (\w+) \} from "([^"]+)"/g,
  )) {
    const target = audit.modules["index.ts"].dependencies.find(
      (edge) => edge.specifier === match[2],
    ).target;
    assert(
      records.some((record) => record.source === target),
      `总入口 ${match[1]} 未映射`,
    );
    for (const record of records.filter((item) => item.source === target))
      record.publicName = match[1];
  }
  const pkg = JSON.parse(read("package.json"));
  for (const record of records) {
    const key = record.path.startsWith("icon/") ? "./icon/*" : "./*";
    const target = pkg.exports[`./${record.path}`] ?? pkg.exports[key];
    const wildcard = key === "./icon/*" ? record.path.slice(5) : record.path;
    assert.equal(
      target.import.replace("*", wildcard),
      `./lib/${record.entry.replace(/\.ts$/, ".js")}`,
    );
    assert.equal(
      target.types.replace("*", wildcard),
      `./lib/${record.entry.replace(/\.ts$/, ".d.ts")}`,
    );
  }
  return records;
}

const apiExamples = {
  message: 'import Message from "litos-ui/message";\nMessage.success("保存成功");',
  loading:
    'import Loading from "litos-ui/loading";\nLoading.init(); // 页面已有 [l-loading] 节点\nLoading.close();',
  dialog:
    'import Dialog from "litos-ui/dialog";\nconst el = document.createElement("dialog");\ndocument.body.append(el);\nconst dialog = new Dialog({ el });\ndialog.open();\ndialog.close();\ndialog.destroy();\nel.remove();',
  "dialog-box": 'import DialogBox from "litos-ui/dialog-box";\nawait DialogBox.alert("保存成功");',
  "modal-box": 'import ModalBox from "litos-ui/modal-box";\nawait ModalBox.alert("保存成功");',
  tabs: 'import Tabs from "litos-ui/tabs";\nconst tabs = Tabs.init(); // 配套 DOM 挂载后\n// 卸载时\ntabs.destroy();',
  transition:
    'import { createTransition } from "litos-ui/transition";\nconst transition = createTransition();\ntransition.init();\n// 卸载时\ntransition.destroy();',
  utils: 'import { kebabToCamel } from "litos-ui/utils";\nconsole.log(kebabToCamel("demo-value"));',
  base: 'import BaseComponent from "litos-ui/base";\nclass Demo extends BaseComponent {}\ncustomElements.define("demo-element", Demo);',
  popover:
    'import { Popover } from "litos-ui/popover";\nconst popover = new Popover({ reference: document.querySelector("button") });\n// 卸载时\npopover.destroy();',
  popconfirm:
    'import { Popover, popconfirmProps } from "litos-ui/popconfirm";\nconst popover = new Popover({ ...popconfirmProps, reference: document.querySelector("button") });\n// 卸载时\npopover.destroy();',
};

export function renderCatalog(records = collectEntries()) {
  const lines = [
    "# T226：公开入口与依赖映射",
    "",
    "由 `node scripts/public-entries.mjs --write` 生成，使用 `--check` 检查漂移，`--json` 获取完整数据。条件依赖统一维护在 `scripts/entry-requirements.json`；其余映射从当前源码和 exports 提取。",
    "",
    "覆盖 87 个公开对象及 popconfirm、transition、utils，共 90 个规范入口。总入口保留纯实现，独立包装不反向污染总入口。图标规范路径为 icon/*；不将通配符可解析的其他拼写当作新增 API 承诺。详见 [T200 审计](./TREE_SHAKING_AUDIT.md)。",
    "",
    "示例在客户端执行，并预先导入 litos-ui/styles/vars.css；主题、reset、container、scrollbar 按需显式导入。DOM 示例只展示最小挂载，完整交互与配套内容见组件文档。Popover 示例需要页面已有 button；Tabs 需要已有 .l-tabs 和配套 Tabbar。SSR 仅在客户端加载。",
    "",
    "继承不构成注册要求；用户插槽内容及自定义图标不纳入固定依赖。条件依赖是全部现有能力的并集，区分内建、标准配套、调用时注册。实际注册列仅表示导入时行为，不含服务函数内惰性注册。消费示例显式补齐全部条件依赖，不宣称当前包装已自动覆盖全部功能。",
    "",
    "声明列包括 default 与具名导出及公开类型；默认类的实例类型使用 InstanceType<typeof 默认导入>。内部未导出的类型不作为公开 API。当前全局 CSS 引入仅保留注释，供后续 Vite 插件配置，不自动安装；待接入列记录这些资源。组件内联样式及模块级共享 CSSStyleSheet 继续复用，vars.css 仍需显式引入。本映射校验不代替打包、类型编译或浏览器验收。",
    "",
  ];
  lines.push(
    "## 总入口补充工具与类型",
    "",
    "下列补充 API 保留在总入口，不创建注册元素。",
    "",
    "<!-- prettier-ignore -->",
    "| API | 公开入口／源码 | 使用边界 |",
    "| --- | --- | --- |",
    "| Signal、SignalStop | litos-ui；utils/signal_types.ts | 仅类型，使用 import type |",
    "| addClickOutside、removeClickOutside | litos-ui；utils/clickoutside.ts | 调用时绑定／解除监听；既有 lib/utils/clickoutside.js 保留 set／remove 原名 |",
    "| regist、useId、属性转换等工具 | litos-ui 或 litos-ui/utils；utils/index.ts | 具名导入，regist 显式调用才注册 |",
    "| Popover、getOverflowAncestors、updatePosition、autoUpdate、createPopoverObserver、popconfirmProps | litos-ui 或 popover／popconfirm；utils/popover.ts | 配置与显式函数，普通 Popover 不注册确认框依赖 |",
    "",
    "```ts",
    'import type { Signal, SignalStop } from "litos-ui";',
    'import { addClickOutside, removeClickOutside } from "litos-ui";',
    'const el = document.createElement("div");',
    'addClickOutside(el, () => console.log("outside"));',
    "// 卸载时",
    "removeClickOutside(el);",
    "```",
    "",
  );
  for (const record of records) {
    lines.push(
      `## litos-ui/${record.path}`,
      "",
      "<!-- prettier-ignore -->",
      "| 项目 | 映射 |",
      "| --- | --- |",
      `| 公共对象 | ${code(record.publicName ?? (record.source === "utils/popover.ts" ? "Popover／定位函数／popconfirmProps" : record.path))} |`,
      `| 实现／包装 | ${code("src/components/" + record.source)} ／ ${code("src/components/" + record.entry)} |`,
      `| 行为／标签 | ${record.tag ? "自动注册" : "显式 API"} ／ ${record.tag ? code(record.tag) : "无元素标签"} |`,
      `| 继承实现（不注册） | ${record.inheritance ? code(record.inheritance) : "无"} |`,
      `| 条件依赖 | ${record.required.length ? record.required.map(([name, condition, kind]) => `${code(name)}（${condition}；${{ internal: "内建", companion: "标准配套", lazy: "调用时注册" }[kind]}）`).join("；") : "无额外元素依赖"} |`,
      `| 传递条件依赖 | ${cell(record.requiredClosure)} |`,
      `| 入口实际注册 | ${cell(record.registered)} |`,
      `| 全局 CSS（含传递包装） | ${cell(record.globals)} |`,
      `| 待插件接入的全局 CSS | ${cell(record.pendingGlobalStyles)} |`,
      `| 样式资源（含内联） | ${cell(record.styles)} |`,
      `| 第三方实现依赖 | ${cell(record.externals)} |`,
      `| 声明／具名导出 | ${cell(record.declarations)} |`,
      "",
      "客户端消费示例：",
      "",
      "```js",
    );
    for (const dependency of record.requiredClosure) lines.push(`import "litos-ui/${dependency}";`);
    lines.push(
      apiExamples[record.path] ??
        `import "litos-ui/${record.path}";\ndocument.body.insertAdjacentHTML("beforeend", "<${record.tag}></${record.tag}>");`,
      "```",
      "",
    );
  }
  return lines.join("\n").trimEnd();
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const mode = process.argv[2];
  const target = path.join(root, "PUBLIC_ENTRIES.md");
  if (mode === "--write") writeFileSync(target, renderCatalog());
  else if (mode === "--check") {
    assert.equal(
      readFileSync(target, "utf8").replaceAll("\r\n", "\n"),
      renderCatalog(),
      "映射已漂移，请重新生成",
    );
    console.log("Public entry mapping: PASS (90 entries)");
  } else if (mode === "--json") console.log(JSON.stringify(collectEntries(), null, 2));
  else throw new Error("Usage: node scripts/public-entries.mjs --write|--check|--json");
}