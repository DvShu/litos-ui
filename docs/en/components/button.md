# Button 按钮

## 引用

```js
import { Button, regist, LoadingIcon, SearchIcon } from "litos-ui";

regist(Button);
// 如果需要使用加载状态
regist(LoadingIcon);

// 注册本页演示使用的附加组件
regist([SearchIcon]);
```

## 基础使用

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

直接在 `Button` 内使用 [Icon](/en/components/icon) 组件。可以搭配文字形成图标文字按钮。

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

`color` 属性可以自定义按钮颜色。`color` 接受一个 `String` 类型的值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button color="#2a9235">Primary</l-button>
  <l-button color="#1e9fff" ghost>Primary</l-button>
</textarea>
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
    --l-btn-color: #389e0d;
    --l-btn-active-color: #0fd850;
    --l-btn-background: linear-gradient(90deg, #0fd850 0%, #f9f047 100%);
    --l-btn-hover-background: linear-gradient(90deg, #2af06a 0%, #fbf478 100%);
    --l-btn-active-background: linear-gradient(90deg, #0a9036 0%, #ece008 100%);
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

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
| `color` | 自定义按钮颜色 | `string` | - |
| `text` | 文本按钮 | `boolean` | `false` |
| `ghost` | 幽灵按钮 | `boolean` | `false` |
| `size` | small、default、large | `string` | `default` |
| `height` | 自定义高度 | `string` | - |
| `box-shadow` | 按钮阴影 | `boolean` | `false` |

### Button Slots

<!-- prettier-ignore -->
| 名称      | 说明     |
| --------- | -------- |
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