---
url: https://dvshu.github.io/litos-ui/components/input.md
---
# Input 输入框

## 引用

```js
import { Input, regist, CloseFilledIcon } from "litos-ui";

regist(Input);
regist(CloseFilledIcon); // 需要使用 clearable 功能时
```

## 演示

### 基础用法

文本输入的基础用法。

```html
  <l-input placeholder="请输入内容"></l-input>
```

### 禁用状态

通过 `disabled` 属性设置输入框为禁用状态。

```html
  <l-input placeholder="请输入内容" disabled></l-input>
```

### 只读状态

通过 `readonly` 设置只读，仍可聚焦、选择和复制文字；只读时不显示清除按钮。支持 `readonly`、`readonly="true"`，`readonly="false"` 或移除属性恢复编辑。也可通过实例的 `readOnly` 布尔属性动态切换，程序设置 `value` 不受影响。原生 input 的只读限制适用于文本、数字等类型，不适用于 checkbox、range 等不支持只读的原生类型。

```html
  <l-input value="只读内容，可以选择和复制" readonly clearable></l-input>
```

```js
const input = document.querySelector("l-input");
input.readOnly = true;
input.readOnly = false;
// 也可以使用 setAttribute("readonly", "") / removeAttribute("readonly")。
```

### 限制输入

当前版本未接入 `allow-input` 和 `autofocus` 属性。限制输入请使用下面的 `setParser()` 示例；需要聚焦时，在组件挂载后调用 `focus()`。

### 输入解析

通过 `setParser` 给节点设置自定义 `parser` 在接受到输入值的时候进行解析，例如：只允许输入正整数

```html
  <l-input id="input-parser-example" placeholder="请输入正整数" clearable></l-input>
```

```ts
  function numericParse(value) {
    let val = parseInt(value, 10)
    if (Number.isNaN(val)) {
      val = ''
    } else {
      val = Math.abs(val)
    }
    return String(val);
  }
  //-
  const $input = document.querySelector('l-input#input-parser-example');
  $input.setParser(numericParse);
```

### 带图标的输入框

```js
import { ReductionIcon, SearchIcon, regist } from "litos-ui";
regist([ReductionIcon, SearchIcon]);
```

要在输入框中添加图标，只需要使用 `prefix` 和 `suffix` 命名的插槽。

```html
  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
```

### 自动填充

通过 `autocomplete` 设置浏览器的填充提示，也可用实例的 `autocomplete` property 动态修改。未单独设置时继承 [Form](https://dvshu.github.io/litos-ui/components/form.md) 的默认配置，移除后恢复继承。

```html
  <l-input name="email" type="email" autocomplete="email" placeholder="邮箱"></l-input>
  <l-input name="password" type="password" autocomplete="new-password" placeholder="设置密码"></l-input>
```

是否提供自动填充由浏览器决定，`off` 不强制禁用密码管理器。

### 带清除图标

使用 `clearable` 属性即可显示一个清除图标，点击图标删除所有内容。

```html
  <l-input placeholder="input something" clearable></l-input>
```

### 错误状态

通过 `error` 属性设置输入框为错误状态。

```html
  <l-input placeholder="请输入内容" error block></l-input>
```

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/input";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](https://dvshu.github.io/litos-ui/on_demand.md)。

## API

### Input Attributes

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 默认输入值；修改后仅在当前值未编辑时同步 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读；可通过实例 readOnly 属性动态读写 | `boolean` | `false` |
| `name` | 表单字段名 | `string` | - |
| `type` | 原始的 [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B) | `string` | `text` |
| `placeholder` | 占位文本 | `string` | - |
| `block` | 宽度是否铺满父元素 | `boolean` | `false` |
| `width` | 宽度 | `string` | - |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `inputmode` | 原生输入模式，未设置时由浏览器决定 | `string` | 未设置 |
| `autocomplete` | 原生自动填充提示，如 on、off、email、current-password、new-password 或 section-\* 组合 | `string` | 未设置 |
| `maxlength` | 最大输入长度 | `number` | - |
| `minlength` | 最小输入长度 | `number` | - |
| `error` | 错误状态标记；存在该属性即显示错误状态，恢复时移除属性 | `string` | 未设置 |

### Input Properties

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `value` | 当前值；程序赋值与用户输入均不改变默认值 | `string` |
| `defaultValue` | 默认值，与宿主 `value` attribute 同步 | `string` |
| `autocomplete` | 自动填充提示，与同名 attribute 同步；设为 `""` 移除配置 | `string` |

通过 `value` attribute 或 `defaultValue` 设置重置默认值。修改过当前值后，再修改默认值不会覆盖当前编辑内容；表单重置时恢复最新默认值，并重新允许默认值变化同步当前值。第一次给实例 `value` 赋值不再自动成为默认值。

密码正常参与提交，也可按 `autocomplete` 提示填充，但不写入表单历史恢复状态。这不控制浏览器的页面往返缓存或密码管理器。

### Input Methods

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `setParser` | 设置输入解析 | `(parser: (val: string) => string): void` |
| `focus` | 聚焦 | `(): void` |

### Input Slots

| 名称 | 说明 |
| --- | --- |
| `prefix` | 前缀图标 |
| `suffix` | 后缀图标 |

### 样式变量

| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-input-width` | 输入框宽度 | `170px` |
