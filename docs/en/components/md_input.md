# MdInput

`Material Design` 风格输入框

## 引用

```js
import { MdInput, regist } from "litos-ui";

regist(MdInput);
```

## 演示

### 基础用法

基础使用 `l-md-input`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-md-input label="姓名" outline></l-md-input>
</textarea>
<div class="source">
<textarea lang="html">
  <l-md-input label="姓名" outline></l-md-input>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/md-input";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### MdInput 初始化属性

除 disabled 外，下列属性主要在连接组件时读取。当前实现未提供所有属性的动态重绘能力；不要将初始化配置等同于完整的受控表单行为。

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 输入框浮动标签 | `string` | - |
| `outline` | 是否显示四周边框 | `boolean` | `false` |
| `html-type` | 原生输入类型，可选 text、number、password、tel | `string` | `text` |
| `inputmode` | 原生输入模式 | `string` | - |
| `name` | 表单字段名 | `string` | - |

当前实现尚未完整同步初始 value 与原生输入框，也未将 disabled 状态传递到内部 input，不应作为这些行为已经可用的示例。此处仅说明现有实现，组件功能完善需另行处理。

### 事件与方法

输入时可通过组件的 `value` 属性读取当前值。当前未单独派发自定义 change 事件；不要把原生 input 事件的数据描述为 `event.detail.value`。

`setValue(value)` 可更新组件值和已挂载的内部输入框。默认插槽未参与渲染。

### CSS Variables

<!-- prettier-ignore -->
| 名称 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-input-width` | 输入框宽度 | `180px` |
| `--l-form-control-height` | 输入框高度 | `40px`（引入 vars.css 后；组件回退为 32px） |