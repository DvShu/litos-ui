# DatePicker

基于原生 `input` 封装的输入或选择日期的控件。

## 引用

```js
import { DatePicker, regist } from "litos-ui";

regist(DatePicker);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'ph-utils/dom';

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
  <l-date-picker value="2025-04-02"></l-date-picker>
  <l-date-picker type="datetime-local" value="2025-05-02 17:00"></l-date-picker>
  <l-date-picker type="time" value="17:00"></l-date-picker>
  <l-date-picker type="month"></l-date-picker>
  <l-date-picker type="week"></l-date-picker>
</textarea>
<div class="source">
<textarea lang="html">
  <l-date-picker value="2025-04-02"></l-date-picker>
  <l-date-picker type="datetime-local" value="2025-05-02 17:00"></l-date-picker>
  <l-date-picker type="time" value="17:00"></l-date-picker>
  <l-date-picker type="month"></l-date-picker>
  <l-date-picker type="week"></l-date-picker>
</textarea>
<textarea lang="js">
  import { on, $ } from 'ph-utils/dom';
  //-
  const $pickers = $('l-date-picker');
  on($pickers, 'change', (e) => {
    // { value: string, dateStr: string[], dates: Date[] }
    const detail = e.detail;
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 注意使用 `month`、`week` 时需要考虑兼容性

### 限定日期范围

通过 `min` 和 `max` 限定日期范围。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker min="2025-04-01" max="2025-04-30"></l-date-picker>
</textarea>
</l-code-preview>
</ClientOnly>

### 范围选择器

通过 `range` 属性开启范围选择。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### DatePicker Attibutes

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
| `emit-timeout` | 触发 `change` 事件时延时, 在范围选择时有效；为了性能考虑, 立即改变一个日期后，会延迟 `300ms` 通知, 以响应其它选择器, `0` - 立即触发 | `number` | `number` | `300` |

### DatePicker Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 日期改变时触发, 通过 `event.detail` 可以获取到当前值 | `(event: CustomEvent)` |


### DatePicker CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
