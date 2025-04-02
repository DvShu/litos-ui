# litos-ui

源自于希腊语中，表示“简洁、朴素”的形容词 "λιτός" (`litós`)；所有组件均以 `l-` 为前缀，如 `l-button`、`l-input` 等。

采用原生 `Web Components` 作为技术栈，不依赖任何第三方库，可运行在现代浏览器上。跨平台、跨框架，可运行在 `React`、`Vue`、`Angular` 等框架中。

## 安装

```bash
npm install litos-ui
```

如果需要自动使用一些服务组件，例如: `Message`、`ModalBox` 等且需要自动引入样式时，需要安装 `litosui-unplugin-resolver`、`unplugin-auto-import` 插件。

```js
// vite.config.js
import AutoImport from "unplugin-auto-import/vite";
import LitosuiResolver from "litosui-unplugin-resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...,
    AutoImport({
      resolvers: [LitosuiResolver()],
      dts: "src/auto-imports.d.ts",
    }),
  ],
  ...
});
```

## 使用

引入相关组件并注册

```js
import { Button, regist } from "litos-ui";

regist([Button]); // <l-button></l-button>
```

## 文档

[litos-ui 文档](https://dvshu.github.io/litos-ui/)

## 许可证

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
