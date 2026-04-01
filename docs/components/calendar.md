# Calendar 日历

显示日期；按照日历的形式展示数据的容器

## 引用

```js
import { regist, Calendar } from "litos-ui";

regist(Calendar);
```

## 演示

<script setup>
  import { $one, on, off } from 'ph-utils/dom';
  import { onMounted, onUnmounted, nextTick } from 'vue';

  let $calendar1;
  let $calendar2;
  let $calendar3;
  let selectedDates = [];
  let startRangeSelect = false;
  let rangeDate = [];

  function handleDayClick(e) {
    const detail = e.detail;
    if (!detail.isActiveMonth) {
      const dateItem = detail.day.split('-');
      $calendar1.setAttribute('year', dateItem[0]);
      $calendar1.setAttribute('month', Number(dateItem[1]));
    }
  }

  function handleDayClick2(e) {
    const detail = e.detail;
    let i = selectedDates.indexOf(detail.day);
    if (i !== -1) {
      selectedDates.splice(i, 1);
    } else {
      selectedDates.push(detail.day);
    }
    $calendar2.value = selectedDates.join("&");
  }

  function handleDayClick3(e) {
    const detail = e.detail;
    console.log(detail);
    if (!startRangeSelect) {
      startRangeSelect = true;
      rangeDate = [detail.dayTimestamp, detail.dayTimestamp];
    } else {
      rangeDate[1] = detail.dayTimestamp;
      if (rangeDate[0] > rangeDate[1]) {
        const temp = rangeDate[0];
        rangeDate[0] = rangeDate[1];
        rangeDate[1] = temp;
      }
      startRangeSelect = false;
    }
    $calendar3.value = rangeDate.join(",");
  }

  function handleDayHover(e) {}

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $calendar1 = $one('#calendar1');
        $calendar2 = $one('#calendar2');
        $calendar3 = $one('#calendar3');
        if ($calendar1) {
          on($calendar1, 'day-click', handleDayClick);
        }
        if ($calendar2) {
          on($calendar2, 'day-click', handleDayClick2);
        }
        if ($calendar3) {
          on($calendar3, 'day-click', handleDayClick3);
        }
      }
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($calendar1) {
        off($calendar1, 'day-click', handleDayClick);
      }
      if ($calendar2) {
        off($calendar2, 'day-click', handleDayClick2);
      }
      if ($calendar3) {
        off($calendar3, 'day-click', handleDayClick3);
      }
    }
  });
</script>

### 基础用法

渲染 `year`、`month` 渲染指定年月的日历。默认为当前年月。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar year="2026" month="2"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### 限制可选日期

通过 `min-date`、`max-date` 属性可以限制可选日期的范围。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### 日期切换

通过监听 `day-click` 事件来获取点击的日期，并实现点击上一月、下一月日期时，切换日期

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar id="calendar1"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### 选中日期

通过 `type=select` 然后设置 `value` 属性，可以选中指定的日期。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar id="calendar2"></l-calendar>
</textarea>
<div class="source">
<textarea lang="html">
  <l-calendar id="calendar2"></l-calendar>
</textarea>
<textarea lang="js">
  const $calendar2 = $one('#calendar2');
  const selectedDates = [];
  //-
  function handleDayClick2(e) {
    const detail = e.detail;
    let i = selectedDates.indexOf(detail.day);
    if (i !== -1) {
      selectedDates.splice(i, 1);
    } else {
      selectedDates.push(detail.day);
    }
    $calendar2.value = selectedDates.join("&");
  }
  //-
  on($calendar2, 'day-click', handleDayClick2);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> `value` 的值通过 `&` 分隔实现选择多个日期

### 范围选择

通过 `type=range` 然后设置 `value` 属性为一个 `number,number` 格式的值，可以选中的日期范围。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar id="calendar3" type="range"></l-calendar>
</textarea>
<div class="source">
<textarea lang="html">
  <l-calendar id="calendar3" type="range"></l-calendar>
</textarea>
<textarea lang="js">
  const $calendar3 = $one('#calendar3');
  const selectedDates = [];
  //-
  function handleDayClick3(e) {
    const detail = e.detail;
    let i = selectedDates.indexOf(detail.day);
    if (i !== -1) {
      selectedDates.splice(i, 1);
    } else {
      selectedDates.push(detail.day);
    }
    $calendar3.value = selectedDates.join("&");
  }
  //-
  on($calendar3, 'day-click', handleDayClick3);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Calendar Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### Calendar Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Calendar Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Calendar Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### Calendar CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |

| - | - | - |