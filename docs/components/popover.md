# Popover 弹出气泡

点击/鼠标移入元素，弹出气泡式的卡片浮层。在内容周围弹出一些隐藏的信息。和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 引用

```js
import { Popover, regist } from "litos-ui";

regist(Popover);
```

## 演示

### 基础用法

最简单的用法，通过 `content` 传递浮层内容。`inline` 属性表明 `l-popover` 标签是行级元素。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover content="悬浮提示" inline>
    <a slot="trigger">提示</a>
  </l-popover>
</textarea>
</l-code-preview>
</ClientOnly>

### 触发方式

四种触发方式：鼠标移入[`hover`]、点击[`click`]、焦点[`focus`]；通过 `trigger` 属性设置触发方式。默认为：`hover`；

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover content="悬浮提示" inline>
    <l-button slot="trigger">悬浮提示</l-button>
  </l-popover>
  <l-popover content="点击提示" inline trigger="click">
    <l-button slot="trigger">点击提示</l-button>
  </l-popover>
  <l-popover content="焦点提示" inline trigger="focus">
    <l-button slot="trigger">焦点提示</l-button>
  </l-popover>
</textarea>
</l-code-preview>
</ClientOnly>

### 位置

有 `12` 个弹出位置。通过 `placement` 属性设置弹出位置。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="top-start">
      <l-button slot="trigger">top-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="top">
      <l-button slot="trigger">top</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="top-end">
      <l-button slot="trigger">top-end</l-button>
    </l-popover>
  </div>
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="left-start">
      <l-button slot="trigger">left-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="left">
      <l-button slot="trigger">left</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="left-end">
      <l-button slot="trigger">left-end</l-button>
    </l-popover>
  </div>
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="right-start">
      <l-button slot="trigger">right-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="right">
      <l-button slot="trigger">right</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="right-end">
      <l-button slot="trigger">right-end</l-button>
    </l-popover>
  </div>
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="bottom-start">
      <l-button slot="trigger">bottom-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="bottom">
      <l-button slot="trigger">bottom</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="bottom-end">
      <l-button slot="trigger">bottom-end</l-button>
    </l-popover>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### 不显示箭头

通过传递 `show-arrow` 为 `false` 来取消箭头显示

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover content="提示内容" show-arrow="false" offset="5">
    <l-button slot="trigger">提示</l-button>
  </l-popover>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义内容

通过 `slot` 插槽来设置 `l-popover` 的内容

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover>
    <l-button slot="trigger">提示</l-button>
    <p>提示内容1</p>
    <p>提示内容2</p>
  </l-popover>
</textarea>
</l-code-preview>
</ClientOnly>

> `l-popover` 组件整体是一个相对定位的标签，所以如果需要对 `l-popover` 设置定位的话，需要在外围包裹一个 `div` 标签，然后对 `div` 标签设置定位。

### Tooltip

`tooltip` 相对于 `popover` 只是样式进行了小调整；只需要设置 `theme="tooltip"` 属性就能即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover content="提示内容" theme="tooltip" placement="top">
    <l-button slot="trigger">提示</l-button>
  </l-popover>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Popover Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `inline` | `l-popover` 是否是行级元素 | `boolean` | `false` |
| `content` | `l-popover` 的内容 | `string` | `-` |
| `placement` | 位置 | `string` | `top` |
| `trigger` | 触发方式 | `hover`、`click`、`focus` | `hover` |
| `offset` | 偏移量 | `number` | `10` |
| `show-arrow` | 是否显示箭头 | `boolean` | `true` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `width` | 宽度 | `string`、`number` | `-` |
| `destroy-on-hide` | 隐藏时销毁 `DOM` 结构; `false` 隐藏时未销毁只是设置 `display: none` | `boolean` | `false` |

### Popover Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |
| `trigger` | 触发按钮 |

### Popover CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-popover-offset` | 偏移量 | `10px` |
