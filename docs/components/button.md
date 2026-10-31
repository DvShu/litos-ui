# Button 按钮

## 引用

```js
import { Button, regist, LoadingIcon } from "litos-ui";

regist(Button);
// 如果需要使用加载状态
regist(LoadingIcon);
```

## 基础使用

<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import { generateButtonColor } from "../../src/components/utils";

let disposed = false;
onMounted(async () => {
  if (import.meta.env.SSR) return;
  await nextTick();
  if (disposed) return;
  const solid = document.querySelector('l-button[data-custom-color="solid"]');
  const ghost = document.querySelector('l-button[data-custom-color="ghost"]');
  const text = document.querySelector('l-button[data-custom-color="text"]');
  if (solid) solid.color = generateButtonColor("#00AA7E");
  if (ghost) ghost.setColor(generateButtonColor("#1e9fff", false, true));
  if (text) text.color = generateButtonColor("#FF7802", true);
});
onUnmounted(() => { disposed = true; });
</script>

### 按钮类型

使用 `type` 控制按钮类型, 提供三种类型: `normal`, `normal-v2`, `primary`；通过设置 `box-shadow` 按钮 `hover` 时阴影效果；

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button box-shadow>Default</l-button>
  <l-button type="normal-v2" box-shadow>Default</l-button>
  <l-button type="primary" box-shadow>Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

> 如果想要实现按钮之间的间隔，需要引入 `litos-ui/styles/reset.css` 文件

### 文本按钮

通过传递 `text` 属性将按钮变为文本按钮，配合 `type` 能有更多风格。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button text>Default</l-button>
  <l-button type="primary" text>Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 按钮尺寸

按钮有大中小三种尺寸；通过设置 `size` 为 `large`、`small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸默认为 `default`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button size="large">Default</l-button>
  <l-button>Primary</l-button>
  <l-button size="small">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

使用 `disabled` 控制按钮禁用状态, 禁用状态下不可点击。该属性接受一个 `Boolean` 类型的值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button disabled>Default</l-button>
  <l-button disabled type="primary">Primary</l-button>
  <l-button text disabled>Text</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 加载状态

使用 `loading` 控制按钮加载状态, `loading-text` 传递加载时显示的文本。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="loadingBtn" loading>按钮</l-button>
  <l-button type="primary" loading loading-text="Loading">按钮</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Block按钮

`block` 属性使按钮适合其父宽度。`[100%]`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button block type="primary">按钮</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 按钮形状

使用 `shape` 控制按钮形状, 提供三种类型: `default`, `round`、`circle`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button>default</l-button>
  <l-button shape="round">round</l-button>
  <l-button shape="circle">C</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 按钮图标

```js
import { SearchIcon, regist } from "litos-ui";
regist(SearchIcon);
```

直接在 `Button` 内使用 [Icon](/components/icon) 组件。可以搭配文字形成图标文字按钮。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button shape="circle">
    <l-search-icon />
  </l-button>
  <l-button shape="round" type="primary">
    <l-search-icon></l-search-icon>
    <span>搜索</span>
  </l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 透明背景

`ghost` 背景变为透明，常用在有色背景上

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button ghost type="primary">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义颜色

通过 JavaScript `color` property 或 `setColor()` 传入颜色变量对象。配合 `generateButtonColor(color, text = false, ghost = false)` 工具函数。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-custom-color="solid">自定义颜色</l-button>
  <l-button data-custom-color="ghost" ghost>幽灵按钮</l-button>
  <l-button data-custom-color="text" text>文本按钮</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-custom-color="solid">自定义颜色</l-button>
  <l-button data-custom-color="ghost" ghost>幽灵按钮</l-button>
  <l-button data-custom-color="text" text>文本按钮</l-button>
</textarea>
<textarea lang="js">
import { generateButtonColor } from "litos-ui/utils";
const solid = document.querySelector('l-button[data-custom-color="solid"]');
const ghost = document.querySelector('l-button[data-custom-color="ghost"]');
const text = document.querySelector('l-button[data-custom-color="text"]');
solid.color = generateButtonColor("#00AA7E");
ghost.setColor(generateButtonColor("#1e9fff", false, true));
text.color = generateButtonColor("#FF7802", true);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 扩展type

通过给 `type` 设置一个非预设的值，然后定义 `l-button[type="x"]::part(default)` 的样式。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="blue">蓝色按钮</l-button>
  <l-button type="gradient">渐变按钮</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button type="blue">蓝色按钮</l-button>
  <l-button type="gradient">渐变按钮</l-button>
</textarea>
<textarea lang="css">
  l-button[type="blue"]::part(default) {
    --l-btn-border-color: #1677ff;
    --l-btn-hover-border-color: #4096ff;
    --l-btn-active-border-color: #0958d9;
  }
  l-button[type="gradient"]::part(default) {
    border: none;
    --l-btn-text-color: #389e0d;
    --l-btn-active-text-color: #0fd850;
    --l-btn-background: linear-gradient(90deg, #0fd850 0%, #f9f047 100%);
    --l-btn-hover-background: linear-gradient(90deg, #2af06a 0%, #fbf478 100%);
    --l-btn-active-background: linear-gradient(90deg, #0a9036 0%, #ece008 100%);
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](/on_demand)。

## API

### Button Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 按钮类型，normal、normal-v2、primary | `string` | `normal` |
| `disabled` | 按钮禁用状态 | `boolean` | `false` |
| `loading` | 按钮加载状态 | `boolean` | `false` |
| `block` | 按钮是否为块级元素[适合其父宽度(宽度100%)] | `boolean` | `false` |
| `shape` | 按钮形状, `default`, `round`按钮为圆角[弧形按钮] , `circle`按钮为圆形 | `string` | `default` |
| `html-type` | 原生的 `type` 属性; `button`、`submit`、`reset` | `string` | `button` |
| `loading-text` | 加载状态时显示的文字 | `string` | `加载中……` |
| `text` | 文本按钮 | `boolean` | `false` |
| `ghost` | 幽灵按钮 | `boolean` | `false` |
| `size` | small、default、large | `string` | `default` |
| `height` | 自定义高度 | `string` | - |
| `box-shadow` | 按钮阴影 | `boolean` | `false` |

### Button Properties

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `color` | 最终的自定义颜色变量对象；赋值立即生效，挂载前赋值也会保留；`undefined` 或 `{}` 清除自定义配色 | `ButtonColor \| undefined` | `undefined` |

### Button Methods

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `setColor(color?)` | 替换颜色变量，与赋值 `color` 等价；只清除之前设置的颜色变量，不覆盖其它内联样式 | `ButtonColor`，可省略 |

### 颜色生成工具

```text
generateButtonColor(color: string, text?: boolean, ghost?: boolean): ButtonColor
```

根据基础颜色生成普通、文本或幽灵按钮的九个 CSS 变量（下表的 text/background/border 及其 hover、active 变量）。函数不修改按钮或 DOM；只有显式调用它才执行颜色调整。

<!-- prettier-ignore -->
| 参数 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| `color` | `string` | 必填基础颜色，使用 `adjust` 支持的颜色字符串，例如 `"#00AA7E"`；空字符串返回空对象 | 无 |
| `text` | `boolean` | 是否生成文本按钮配色；背景和边框透明，文字随 hover、active 状态变色 | `false` |
| `ghost` | `boolean` | 是否生成幽灵按钮配色；背景透明，文字和边框随 hover、active 状态变色 | `false` |

当 `text` 与 `ghost` 同为 `true` 时，按文本按钮处理，边框透明。这两个参数只控制生成结果，不会设置按钮的 `text` / `ghost` attribute；请让按钮属性与生成参数保持一致。

**返回值：** `ButtonColor`，一个全新的颜色变量对象，可赋给 `button.color` 或传入 `button.setColor()`。非空颜色生成九个变量，空字符串生成 `{}`。结果是静态快照，不会随按钮属性变化自动重新计算。

`ButtonColor` 是这些 CSS 变量的可选字符串映射，也支持只覆盖部分变量。类型可通过 `import type { ButtonColor } from "litos-ui/utils"` 或总入口引入。

### Button Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 按钮内容 |

### 样式变量

下表列出组件样式中的基础变量值；normal、primary、text 等状态会覆盖其中部分变量。全局 vars.css 提供的高度与圆角优先于组件回退值。

<!-- prettier-ignore -->
| 名称 | 默认值 |
| --- | --- |
| `--l-btn-text-color` | `#fff`，普通按钮状态由具体样式覆盖 |
| `--l-btn-background` | `var(--l-btn-border-color)` |
| `--l-btn-border-color` | `var(--l-primary-color, #722ed1)` |
| `--l-btn-hover-text-color` | `var(--l-btn-text-color)` |
| `--l-btn-hover-border-color` | `var(--l-primary-color-light1, #9254de)` |
| `--l-btn-hover-background` | `var(--l-btn-hover-border-color)` |
| `--l-btn-active-text-color` | `var(--l-btn-text-color)` |
| `--l-btn-active-border-color` | `var(--l-primary-color-dark1, #531dab)` |
| `--l-btn-active-background` | `var(--l-btn-active-border-color)` |
| `--l-btn-disabled-color` | `#c9c9c9` |
| `--l-btn-disabled-background` | `#fbfbfb` |
| `--l-btn-disabled-border-color` | `#e6e6e6` |
| `--l-form-control-height` | `40px`（vars.css；组件回退为 32px） |
| `--l-border-radius` | `5px`（vars.css；组件回退为 3px） |