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

## API

### ColorPicker Attibutes

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
| `change` | 颜色改变触发, 通过 `event.target.value` 获取值 | `(event: Event)` |
