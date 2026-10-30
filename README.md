# litos-ui

**English** | [简体中文](./README.zh-CN.md)

A framework-agnostic UI component library built with native Web Components and TypeScript, featuring customizable themes and dark mode.

The name comes from the Greek adjective “λιτός” (`litós`), meaning simple or plain. Components use the `l-` prefix, such as `l-button` and `l-input`.

Built on native Web Components, litos-ui runs in modern browsers and can be used with React, Vue, Angular, or plain HTML and JavaScript.

## Installation

```bash
npm install litos-ui
```

## Usage

Import the base variables and the component subpaths you need in your client entry point. Element subpaths automatically register their built-in dependencies. The library ships as ESM.

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
```

Then use the custom element in your markup:

```html
<l-button type="primary">Get started</l-button>
```

## Themes and Dark Mode

Import the base variables first, then optionally import **one** preset theme:

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/theme-jade.css";
```

<!-- prettier-ignore -->
| Theme | File | Primary color |
| --- | --- | --- |
| Jade | `theme-jade.css` | `#00AA7E` |
| Coral | `theme-coral.css` | `#FF6448` |
| Tangerine | `theme-tangerine.css` | `#FF7802` |

Presets define global CSS variables on `:root`. Choose one preset; importing several makes the last loaded theme override the earlier ones. Omit the preset import to use the default blue theme. You can also override individual variables in your own stylesheet.

Dark mode variables are in the separate `dark.css` file. Import it after `vars.css`, then toggle the root element's `dark` class from client-side code:

```js
import "litos-ui/styles/dark.css";

document.documentElement.classList.add("dark");
// Restore light mode:
document.documentElement.classList.remove("dark");
```

See the [theme guide](https://dvshu.github.io/litos-ui/en/theme) for details.

## Browser and SSR Usage

The components use browser APIs such as Custom Elements, Shadow DOM, and constructable stylesheets (`CSSStyleSheet` and `adoptedStyleSheets`). Use a modern browser with support for these APIs.

Component modules access browser APIs when imported. In server-rendered applications, import and register them inside a client-only entry point or lifecycle hook. For example, run this code only on the client:

```js
const { Button, regist } = await import("litos-ui");
regist([Button]);
```

Framework-specific configuration may also be needed to recognize custom elements and handle properties and custom events.

## Optional Auto-imports

For optional automatic imports of service APIs such as `Message` and `ModalBox`, together with their styles, install the resolver and auto-import plugin:

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

## Development and Build

For development in this repository, use Node.js 24 LTS and pnpm 12.5.1 to match CI. These versions describe the contributor environment, not a Node.js runtime requirement for browser applications.

```bash
pnpm install --frozen-lockfile
pnpm docs:dev
pnpm lib:build
pnpm docs:build
```

Use `pnpm docs:dev` to preview the documentation and component examples. `pnpm dev` is a separate debugging entry point; currently, `src/main.ts` does not register any components.

Run `pnpm lint` and `pnpm fmt:check` to check the code, or `pnpm fmt` to format it. Running `npm pack` or `npm publish` automatically builds the library and type declarations first. Use `npm pack --dry-run` to inspect the package contents before publishing.

### Markdown Table Formatting

Use compact Markdown tables in README files and both documentation languages: one space around each cell, with no padding for source-column alignment. Use `| --- | --- |` for separator rows and preserve alignment markers such as `:---`, `---:`, and `:---:`. Keep cell content, escaped pipes, and code examples unchanged.

Place `<!-- prettier-ignore -->` immediately above each table header, with no blank line between them. This local directive keeps Oxfmt from padding the table while the rest of the Markdown file remains formatted. Do not add directives inside code examples or exclude whole Markdown files.

```text
<!-- prettier-ignore -->
| Attribute | Default |
| --- | --- |
| `disabled` | `false` |
```

Format only the files you changed, then check them; replace these README paths with the corresponding Chinese and English component documentation paths when needed:

```bash
pnpm exec oxfmt README.md README.zh-CN.md
pnpm exec oxfmt --check README.md README.zh-CN.md
pnpm fmt:check
```

Confirm that formatting does not add table padding. A formatting check does not independently enforce compact tables inside ignored blocks, so review their source and rendered output. Follow the [repository guidelines](./AGENTS.md) and [translation guide](./TRANSLATION_GUIDE.md). These rules apply to new and edited tables; migration of existing tables and editor settings remains tracked in the task list.

## Documentation

[English documentation](https://dvshu.github.io/litos-ui/en/) | [Chinese documentation](https://dvshu.github.io/litos-ui/)

The Chinese documentation is the content source for the English documentation. After component development is complete, the English pages are translated and verified against the Chinese pages in a coordinated pass. New, missing, or outdated translations are tracked and synchronized according to the [translation guide](./TRANSLATION_GUIDE.md).

## License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## On-demand Imports

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
import "litos-ui/input-number";
```

These client-only element entries register their built-in dependencies, including Button's loading icon. Root imports with manual regist() remain supported. Service subpaths, such as Message from "litos-ui/message", require explicit API calls and do not install global styles. CSS imports are currently commented out for future Vite plugin configuration. See the [complete entry list and SSR guidance](https://dvshu.github.io/litos-ui/en/on_demand).