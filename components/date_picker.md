---
url: https://dvshu.github.io/litos-ui/components/date_picker.md
---
# DatePicker 日期选择器

日期面板组件，目前处于完善阶段：支持打开浮层和配置宽度，尚未接入日期选择回填、月份切换和此刻按钮行为。需要可用的原生日期输入或范围输入时，请使用 [DatePickerOri](https://dvshu.github.io/litos-ui/components/date_picker_ori.md)。

## 引用

```js
import {
  regist,
  DatePicker,
  Calendar,
  CalendarIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
} from "litos-ui";
import "litos-ui/styles/datepicker.css";

regist([
  DatePicker,
  Calendar,
  CalendarIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
]);
```

## 演示

### 基础用法

基础演示：点击输入框打开日期面板。此演示不代表已实现日期选择与值回填。

```html
  <l-date-picker></l-date-picker>
```

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/datepicker.css";
import "litos-ui/date-picker";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](https://dvshu.github.io/litos-ui/on_demand.md)。

## API

### DatePicker Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `width` | 宽度 | `string` | `-` |

### DatePicker Slots

| 名称 | 说明 |
| --- | --- |
| - | 当前未渲染默认插槽 |

### DatePicker Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 原生点击事件，不代表日期选择或值改变 | `(event: Event)` |

### DatePicker Methods

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### DatePicker CSS Variables

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-date-picker-width` | 宽度 | `140px` |
| `--l-form-control-height` | 高度 | `40px`（引入 vars.css 后；未引入时组件回退为 32px） |
| `--l-border-color` | 边框颜色 | `#dedede` |
| `--l-border-radius` | 边框圆角 | `5px`（引入 vars.css 后；未引入时组件回退为 3px） |
