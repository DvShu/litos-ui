# ColorPicker 颜色选择器

通常用于进行颜色选择。

## 引用

```js
import { ColorPicker, regist } from "litos-ui";

regist(ColorPicker);
```

## 演示

### 基础用法

通过 `value` 设置初始颜色。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-color-picker value="#722ed1"></l-color-picker>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/color-picker";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### ColorPicker Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 原生 `name` 属性 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `value` | 颜色值 | `string` | `#000000` |

### ColorPicker Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 颜色改变时触发，`event.detail` 为颜色字符串，也可通过组件 value 属性读取 | `(event: CustomEvent<string>)` |