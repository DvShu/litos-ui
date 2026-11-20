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

### 自动填充

用 `autocomplete` 提供浏览器填充提示，配合 `html-type="password"` 标识密码输入。未单独设置时继承 [Form](./form) 的默认配置，移除后恢复继承。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-md-input label="邮箱" name="email" autocomplete="email"></l-md-input>
  <l-md-input label="设置密码" name="password" html-type="password" autocomplete="new-password"></l-md-input>
</textarea>
</l-code-preview>
</ClientOnly>

是否提供自动填充由浏览器决定，`off` 不强制禁用密码管理器。

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/md-input";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](/on_demand)。

## API

### MdInput Attributes

`label`、`outline` 和 `inputmode` 在组件挂载时读取。`value`、`name`、`disabled`、`html-type` 和 `autocomplete` 支持运行时更新。

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 输入框浮动标签 | `string` | - |
| `outline` | 是否显示四周边框 | `boolean` | `false` |
| `html-type` | 原生输入类型，可选 text、number、password、tel | `string` | `text` |
| `inputmode` | 原生输入模式 | `string` | - |
| `autocomplete` | 原生自动填充提示，如 on、off、email、current-password、new-password 或 section-* 组合 | `string` | 未设置 |
| `name` | 表单字段名 | `string` | - |
| `value` | 初始值，表单重置时恢复此值 | `string` | `""` |
| `disabled` | 是否禁用 | `boolean` | `false` |

`value` property 和原生表单提交值都是字符串。清空后提交空字符串。`html-type="number"` 时，无效的数字赋值也按空字符串处理。

密码正常参与提交，也可按 `autocomplete` 提示填充，但不写入表单历史恢复状态。这不控制浏览器的页面往返缓存或密码管理器。

### MdInput Properties

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `autocomplete` | 与同名 attribute 同步；设为 `""` 移除配置 | `string` |
| `htmlType` | 与 `html-type` attribute 同步；移除 attribute 后恢复 text | `"text" \| "number" \| "password" \| "tel"` |

### 事件与方法

输入时可通过组件的 `value` 属性读取当前值。当前未单独派发自定义 change 事件；不要把原生 input 事件的数据描述为 `event.detail.value`。

`setValue(value)` 可更新组件值和已挂载的内部输入框。默认插槽未参与渲染。

### CSS Variables

<!-- prettier-ignore -->
| 名称 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-input-width` | 输入框宽度 | `180px` |
| `--l-form-control-height` | 输入框高度 | `40px`（引入 vars.css 后；组件回退为 32px） |