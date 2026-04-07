# DatePicker 日期选择器

输入或选择日期的控件；当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

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

最简单的用法，在浮层中可以选择日期

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker></l-date-picker>
</textarea>
<div class="source">
<textarea lang="html">
  <l-date-picker></l-date-picker>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### DatePicker Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `width` | 宽度 | `string` | `-` |

### DatePicker Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### DatePicker Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### DatePicker Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### DatePicker CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-date-picker-width` | 宽度 | `140px` |
| `--l-form-control-height` | 高度 | `32px` |
| `--l-border-color` | 边框颜色 | `#dedede` |
| `--l-border-radius` | 边框圆角 | `3px` |