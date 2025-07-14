# 快速开始

`UI` 库依赖一个清理级的工具库 [ph-utils](https://gitee.com/towardly/ph/wikis/Home?sort_id=4035190)

## 使用

### 安装

```shell
npm install litos-ui
```

### 引入

```js
import { Button, regist, ... } from "litos-ui";

// 注册为 Web Components, 注册后, 可以通过 `<l-button></l-button>` 使用
regist(Button);
```

> 推荐在入口文件引入并注册
>
> 所有的组件有一个前缀 `l-`, 例如 `Button` 组件的标签为 `<l-button></l-button>`; 可以通过一下两种方式修改:
>
> 1. 通过 `config` 方法配置前缀; 通过这种方法更改所有的组件的前缀
> 2. 通过 `regist` 时, 传入第二个参数, 为组件配置自定义的标签名; 通过这种方法更改单个组件的标签名

```js
import { Button, regist, config } from "litos-ui";

// 1. 通过 config 方法配置全局前缀
config({ prefix: "lt" }); // 组件的使用变为: <lt-button></lt-button>

// 2. 通过 regist 手动指定名称
regist(Button, "lu-button"); // 组件的使用变为: <lu-button></lu-button>
```

如果需要使用 `Message`，但是不想手动引入 `css`，可以通过 `vite-autoimport` 自动引入

安装 `unplugin-auto-import unplugin-vue-components litosui-unplugin-resolver`

```shell
npm install unplugin-auto-import unplugin-vue-components litosui-unplugin-resolver
```

在 `vite.config.ts` 中配置

```js
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import LitosUiResolver from "litosui-unplugin-resolver";

export default defineConfig({
  ...
  plugins: [
    AutoImport({
      resolvers: [LitosUiResolver()],
      dts: "src/auto-imports.d.ts"
    }),
    Components({
      resolvers: [LitosUiResolver()]
    })
  ]
})
```

### 全局变量

组件库的样式全部使用 `CSS` 变量控制，为了让样式可控变得简单化，所以需要手动引入全局变量文件；在入口文件，如 `main.ts` 中引入:

```js
import "litos-ui/styles/vars.css";
```

内容如下：

<<< ../styles/vars.css
