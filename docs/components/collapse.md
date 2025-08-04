# collapse 折叠面板

折叠/展开的内容区域; 通常用于后台系统的首页边栏的控制面板上

## 引用

```js
import { regist, Collapse, CollapseItem, ArrowRightIcon } from "litos-ui";

regist([Collapse, CollapseItem, ArrowRightIcon]);
```

## 演示

### 基础用法

可以同时展开多个面板，面板之间不影响

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse>
    <l-collapse-item name="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 手动展开

将 `collapse` 标签的 `name` 设置为展开项, 多个项用 `&` 分隔

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse name="1&3">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
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
    <l-collapse-item name="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
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
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### 标题栏对齐方式

通过 `header-justify` 来设置对齐方式，例如设置为 `space-between` 表明两端对齐，这个时候，配合 `arrow-placement: right` 就能实现，箭头和文本两端对齐的效果

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
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
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
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
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
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
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
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
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Collapse Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 展开的面板,展开多选时以 `&` 分隔 | `string` | - |
| `grid` | 网格模式 | `boolean` | `false` |
| `gap` | 面板间距 | `string` | `0px` |
| `border-radius` | 圆角 | `string` | `0px` |
| `background` | 背景边框 | `boolean` | `false` |
| `arrow-placement` | 箭头位置 | `string` | `left` |
| `header-justify` | 标题栏对齐方式, `flex-start`、`flex-end`、`space-between` | `string` | `flex-start` |
| `accordion` | 手风琴模式 | `boolean` | `false` |

### CollapseItem Attibutes

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `name` | 面板名称 | `string` | - |
| `header-text` | 标题栏文本 | `string` | - |
| `expand` | 是否展开 | `boolean` | `false` |

### Collapse Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 面板变化时触发, `detail: { expandedNames: string[] }` | `(event: CustomEvent)` |

### Collapse CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |
