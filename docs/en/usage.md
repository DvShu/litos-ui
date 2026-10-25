# 快速开始

组件库使用工具库 [utilane](https://github.com/DvShu/utilane#readme)

## 使用

### 安装

```shell
npm install litos-ui
```

### 引入

```js
import "litos-ui/styles/vars.css";
import { Button, regist } from "litos-ui";

// 注册为 Web Components, 注册后, 可以通过 `<l-button></l-button>` 使用
regist(Button);
```

推荐在客户端入口文件中引入样式并注册组件，再在页面中使用：

```html
<l-button type="primary">按钮</l-button>
```

### 注册组件

`regist()` 支持传入一个组件或组件数组。组件统一使用 `l-` 前缀，标签名由 `l-` 和组件的 `baseName` 组成，例如 `Button` 对应 `l-button`。

当前暂不支持自定义组件前缀或标签名，请使用默认的 `l-` 标签体系。组件库不提供 `config()` 全局前缀配置 API。

```js
import { Button, Input, regist } from "litos-ui";

regist([Button, Input]);
```

重复注册已有标签名时，`regist()` 会跳过该名称。

### 服务组件与可选自动导入

服务组件需要对应的全局样式。例如手动使用 Message：

```js
import "litos-ui/styles/message.css";
import { Message } from "litos-ui";

Message.success("操作成功");
```

如需自动导入服务 API 与对应样式，可以按需使用自动导入插件：

```shell
npm install -D unplugin-auto-import litosui-unplugin-resolver
```

在 Vite 配置中添加插件，保留项目已有配置：

```js
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

Web Components 的注册仍通过 `regist()` 完成。

### 全局变量

组件库的样式全部使用 `CSS` 变量控制，为了让样式可控变得简单化，所以需要手动引入全局变量文件；在入口文件，如 `main.ts` 中引入:

```js
import "litos-ui/styles/vars.css";
```

内容如下：

<<< ../../styles/vars.css

### 暗黑模式

暗黑模式变量已包含在 `vars.css` 中。在根元素上添加 `dark` 类即可启用，移除该类即可恢复浅色模式。

```javascript
document.documentElement.classList.add("dark");
```