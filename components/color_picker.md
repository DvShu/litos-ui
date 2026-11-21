---
url: https://dvshu.github.io/litos-ui/components/color_picker.md
---
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

```html
  <l-color-picker value="#722ed1"></l-color-picker>
```

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/color-picker";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](https://dvshu.github.io/litos-ui/on_demand.md)。

## API

颜色值使用六位十六进制格式，例如 `#123456`。读取和原生表单提交均使用小写，空值或无效颜色回到 `#000000`。

### ColorPicker Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 原生 `name` 属性 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `value` | 颜色值 | `string` | `#000000` |

### ColorPicker Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 颜色改变时触发，`event.detail` 为颜色字符串，也可通过组件 value 属性读取 | `(event: CustomEvent<string>)` |
