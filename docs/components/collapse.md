# collapse 折叠面板

折叠/展开的内容区域; 通常用于后台系统的首页边栏的控制面板上

## 引用

```js
import { regist, Collapse, CollapseItem, ArrowRightIcon } from "litos-ui";

regist([Collapse, CollapseItem, ArrowRightIcon]);
```

## 演示

### 基础用法

可以同时展开多个面板。按 Tab 聚焦标题，再按 Enter 或空格切换。

收起时，面板内的焦点会返回标题。系统启用减少动态效果时，面板和箭头会直接切换。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse>
    <l-collapse-item prop="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 手动展开

将 `collapse` 标签的 `prop` 设置为展开项, 多个项用 `&` 分隔

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse prop="1&3">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

> 也可以给 `collapse-item` 标签添加 `expand` 属性用于展开某一项

### 手风琴模式

通过设置 `accordion` 为 `true` 即可实现手风琴模式，每次只能展开一个面板

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse accordion>
    <l-collapse-item prop="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 箭头位置

使用 `arrow-placement` 来设定箭头的位置；可选值为 `left`[默认]、`right`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 标题栏对齐方式

用 `header-justify` 设置标题栏对齐。`flex-start` 与 `flex-end` 分别对齐到行首与行尾，`space-between` 将箭头和标题分别放在两端。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 背景边框

通过设置 `background` 就能实现带背景边框样式

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 项间距

通过 `gap` 设置项间距

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 圆角

通过 `border-radius` 设置边框圆角

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 网格模式

通过传递 `grid` 属性让折叠面板变为网格模式

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse
    arrow-placement="right"
    header-justify="space-between"
    background
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 包装层与独立面板

`l-collapse-item` 可以直接放在 `l-collapse` 下、由普通元素包裹，或独立使用。在 `grid` 模式下，每个直接子元素占一格，包装层中的多个面板共用一格。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse grid gap="8" prop="delivery">
    <div>
      <l-collapse-item prop="delivery" header-text="配送方式">
        <div>支持快递配送。</div>
      </l-collapse-item>
      <l-collapse-item prop="pickup" header-text="门店自提">
        <div>订单备好后可到店领取。</div>
      </l-collapse-item>
    </div>
    <l-collapse-item prop="returns" header-text="退换货">
      <div>请在订单详情中申请退换货。</div>
    </l-collapse-item>
  </l-collapse>

  <l-collapse-item header-text="营业时间">
    <div>周一至周日 09:00–18:00。</div>
  </l-collapse-item>
</textarea>
</l-code-preview>
</ClientOnly>

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/collapse";
```

仅使用独立面板时，可单独加载 `litos-ui/collapse-item`。

```js
import "litos-ui/styles/vars.css";
import "litos-ui/collapse-item";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](/on_demand)。

## API

### Collapse Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 展开的面板，以 `&` 分隔。手风琴模式下取第一个名称 | `string` | - |
| `grid` | 网格模式 | `boolean` | `false` |
| `gap` | 面板间距 | `string` | `0px` |
| `border-radius` | 圆角 | `string` | `0px` |
| `background` | 背景边框 | `boolean` | `false` |
| `arrow-placement` | 箭头位置 | `string` | `left` |
| `header-justify` | 标题栏对齐方式，可选 `flex-start`、`flex-end`、`space-between` | `string` | `flex-start` |
| `accordion` | 手风琴模式 | `boolean` | `false` |

### CollapseItem Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 面板名称 | `string` | - |
| `header-text` | 标题栏文本。为空或移除时显示同名插槽 | `string` | - |
| `heading-level` | 标题在文档大纲中的级别，取值为 `1`～`6` | `string` | `3` |
| `toggle-label` | 切换按钮的可访问名称。默认使用标题文本；标题只有图标或操作按钮时，建议显式指定 | `string` | 标题文本或 `Toggle panel` |
| `expand` | 是否展开 | `boolean` | `false` |

### CollapseItem Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| 默认插槽 | 面板内容 |
| `header-text` | 自定义标题。插槽内的链接和按钮可独立聚焦、操作 |

### CollapseItem CSS Parts

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `header` | 标题栏容器 |
| `header-text` | 通过 `header-text` 属性渲染的标题文本 |

### Collapse Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 通过标题切换面板后触发，`event.detail` 为 `{ expands: string[], value: string }` | `(event: CustomEvent)` |

### CollapseItem Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `expand-change` | 通过标题切换当前面板后触发，`event.detail` 为 `{ prop: string, expand: boolean }` | `(event: CustomEvent)` |

初始化、修改 `prop` 或 `expand` 属性，以及手风琴模式下联动收起其他面板时，均静默同步状态。

### CollapseItem 手动注入

挂载前可通过 `contextInject(context, expands)` 注入两个可调用的值，Item 会在挂载时应用初值。外部数据变化后，调用 `_updateLayout()` 刷新布局，或调用 `_handleExpandsChange()` 刷新展开状态。

### Collapse CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-collapse-gap` | 在 `l-collapse` 上覆盖面板间距 | `gap` 属性或 `0px` |
| `--l-collapse-border-radius` | 在 `l-collapse` 上覆盖面板圆角 | `border-radius` 属性或 `0px` |
| `--l-collapse-border-color` | 在 `l-collapse` 上覆盖面板边框颜色 | `--l-border-color` 或 `#dedede` |