# DatePickerOri 原生日期选择器

基于原生 `input` 封装的输入或选择日期的控件。

## 引用

```js
import { DatePickerOri, regist } from "litos-ui";

regist(DatePickerOri);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'utilane/browser';

  let $picker;

  function handleChange(e) {
    console.log(e);
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $picker = $one('#picker');
        on($picker, 'change', handleChange);
      }
    })
  });

  onUnmounted(() => {
    if ($picker) {
      off($picker, 'change', handleChange);
    }
  });
</script>

### 基础用法

通过 `type` 属性指定类型，`date`、`datetime-local`、`time`、`month`、`week`。`value` 设置初始值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02T17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
</textarea>
<div class="source">
<textarea lang="html">
  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02T17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
</textarea>
<textarea lang="js">
  import { on, $ } from 'utilane/browser';
  //-
  const $pickers = $('l-date-picker-ori');
  on($pickers, 'change', (e) => {
    // { value: string, dateStr: string[], dates: Date[] }
    const detail = e.detail;
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> `month` 和 `week` 的选择界面取决于浏览器。iOS／iPadOS 从 18.2 开始支持原生 `week` 选择器。[WebKit 发布说明](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/#html)

### 限定日期范围

通过 `min` 和 `max` 限定日期范围。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker-ori min="2025-04-01" max="2025-04-30"></l-date-picker-ori>
</textarea>
</l-code-preview>
</ClientOnly>

### 范围选择器

通过 `range` 属性开启范围选择。

区间的 `value` 和原生表单提交值用逗号分隔。只填一端时保留逗号，例如 `2025-04-01,`。两端都为空时值为 `""`。开始日限制结束日的最小值，结束日限制开始日的最大值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker-ori range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker-ori>
</textarea>
</l-code-preview>
</ClientOnly>

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/date-picker-ori";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](/on_demand)。

## API

### DatePickerOri Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 初始值, 如果是范围选择，则逗号分隔开始结束日期, 例如: `2025-04-01,2025-04-15` | `string` | `-` |
| `min` | 最小日期 | `string` | `-` |
| `max` | 最大日期 | `string` | `-` |
| `type` | 类型, 可选值: `date`、`datetime-local`、`time`、`month`、`week` | `string` | `date` |
| `range` | 是否开启范围选择 | `boolean` | `false` |
| `allow-empty` | 是否允许空值, 设置为 `false` 时如果为空会赋值初始值 | `boolean` | `true` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `width` | 宽度 | `string` | `-` |
| `delay` | 区间 `change` 的延时，单位为毫秒。设为 `0` 时在下一轮定时器任务中派发 | `number` | `300` |

### DatePickerOri Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 日期改变时触发，`detail` 包含 `value`、`dateStr` 和 `dates`。事件的 `bubbles` 和 `composed` 均为 `false` | `(event: CustomEvent)` |

区间事件的 `dateStr` 固定包含起点和终点，空端点为 `""`，在 `dates` 中对应 `Invalid Date`。`time` 的日期取 UTC 的 1970-01-01，`week` 取该周周一的 UTC 零点。

初始 `datetime-local` 值使用原生输入框要求的格式，例如 `2025-05-02T17:00`。