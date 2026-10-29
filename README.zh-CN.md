# litos-ui

[English](./README.md) | **简体中文**

基于原生 Web Components 和 TypeScript 的跨框架 UI 组件库，支持 CSS 变量主题定制与暗黑模式。

源自于希腊语中，表示“简洁、朴素”的形容词 "λιτός" (`litós`)；所有组件均以 `l-` 为前缀，如 `l-button`、`l-input` 等。

采用原生 `Web Components` 作为技术栈，可运行在现代浏览器上。跨平台、跨框架，可运行在 `React`、`Vue`、`Angular` 等框架中。

## 安装

```bash
npm install litos-ui
```

## 使用

在客户端入口引入基础变量和需要的组件子路径，自动注册组件及内建依赖。组件库提供 ESM 产物，使用 ES Module `import` 引入。

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
```

然后在页面中使用自定义元素：

```html
<l-button type="primary">开始使用</l-button>
```

## 主题与暗黑模式

先引入基础变量，再按需选择**一套**预置主题：

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/theme-jade.css";
```

<!-- prettier-ignore -->
| 主题 | 文件 | 主色 |
| --- | --- | --- |
| 翡翠绿 | `theme-jade.css` | `#00AA7E` |
| 珊瑚红 | `theme-coral.css` | `#FF6448` |
| 活力橙 | `theme-tangerine.css` | `#FF7802` |

预置主题通过 `:root` 定义全局 CSS 变量。一次选择一套，同时引入多套时，后加载的主题会覆盖先加载的主题。不引入预置主题时，使用默认蓝色主题，也可以在自己的样式文件中覆盖单个变量。

暗黑模式变量独立放在 `dark.css` 中。在 `vars.css` 之后引入，再通过客户端代码切换根元素的 `dark` 类：

```js
import "litos-ui/styles/dark.css";

document.documentElement.classList.add("dark");
// 恢复浅色模式：
document.documentElement.classList.remove("dark");
```

更多用法见[主题切换指南](https://dvshu.github.io/litos-ui/theme)。

## 浏览器与 SSR 使用

组件使用 Custom Elements、Shadow DOM 和可构造样式表（`CSSStyleSheet`、`adoptedStyleSheets`）等浏览器 API，需要使用支持这些能力的现代浏览器。

组件模块在导入时就会访问浏览器 API。服务端渲染项目需要在客户端专用入口或生命周期中导入、注册组件，不能在服务端直接执行组件导入。例如，以下代码仅在客户端执行：

```js
const { Button, regist } = await import("litos-ui");
regist([Button]);
```

集成具体框架时，可能还需要配置自定义元素识别，以及属性和自定义事件的处理。

## 可选自动导入

如果需要自动导入 `Message`、`ModalBox` 等服务 API 及其样式，可选用以下插件：

```bash
npm install -D litosui-unplugin-resolver unplugin-auto-import
```

```js
// vite.config.js
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import LitosuiResolver from "litosui-unplugin-resolver";

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [LitosuiResolver()],
      dts: "src/auto-imports.d.ts",
    }),
  ],
});
```

## 开发与构建

参与本仓库开发时，使用 Node.js 24 LTS 和 pnpm 12.5.1，与 CI 保持一致。这是贡献者的开发环境约定，不是浏览器应用使用组件库的 Node.js 运行时要求。

```bash
pnpm install --frozen-lockfile
pnpm docs:dev
pnpm lib:build
pnpm docs:build
```

使用 `pnpm docs:dev` 预览文档和组件示例。`pnpm dev` 是独立的调试入口，当前 `src/main.ts` 尚未注册组件。

可使用 `pnpm lint`、`pnpm fmt:check` 检查代码，使用 `pnpm fmt` 格式化。执行 `npm pack` 或 `npm publish` 前会自动构建组件库和类型声明；发布前可通过 `npm pack --dry-run` 检查文件清单。

### Markdown 表格格式

README 和中英文文档的 Markdown 表格采用紧凑写法：单元格两侧各保留一个空格，不为源码列对齐添加填充空格。分隔行使用 `| --- | --- |`，保留 `:---`、`---:`、`:---:` 等对齐标记，不改变单元格内容、转义竖线和代码示例。

每个表头前紧贴一行 `<!-- prettier-ignore -->`，两者之间不留空行。该局部指令防止 Oxfmt 为表格补齐空格，其余 Markdown 仍正常格式化；不在代码示例内添加指令，也不忽略整份 Markdown。

```text
<!-- prettier-ignore -->
| 属性 | 默认值 |
| --- | --- |
| `disabled` | `false` |
```

优先只格式化本次修改的文件，再执行检查；维护组件文档时，将以下 README 路径替换为对应的中英文组件文档路径：

```bash
pnpm exec oxfmt README.md README.zh-CN.md
pnpm exec oxfmt --check README.md README.zh-CN.md
pnpm fmt:check
```

确认格式化后没有回填表格空格。格式检查不会独立约束被忽略表格内部的紧凑写法，因此还需核对源码和渲染结果。具体遵循[仓库协作规范](./AGENTS.md)与[翻译指南](./TRANSLATION_GUIDE.md)。此约定适用于新增和编辑的表格，历史表格迁移及编辑器配置仍按待完成清单单独跟踪。

## 文档

[中文文档](https://dvshu.github.io/litos-ui/)

英文文档结构已建立，页面正文暂时保留中文，待后续翻译。

## 许可证

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 按需导入

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
import "litos-ui/input-number";
```

在客户端入口加载后即可使用，自动注册内建依赖（包括 Button 的 loading 图标）。原有总入口加手动 regist() 用法继续支持。服务子路径（如默认导入 litos-ui/message）不自动引入全局样式（入口仅保留 CSS 引入注释，后续由 Vite 插件配置），仍需显式调用 API。完整入口、类型及 SSR 限制见[按需导入指南](https://dvshu.github.io/litos-ui/on_demand)。