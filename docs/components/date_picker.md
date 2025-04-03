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
  <l-date-picker id="picker" value="2025-04-02"></l-date-picker>
  <l-date-picker type="datetime-local" value="2025-05-02 17:00"></l-date-picker>
  <l-date-picker type="time" value="17:00"></l-date-picker>
  <l-date-picker type="month"></l-date-picker>
  <l-date-picker type="week"></l-date-picker>
</textarea>
<div class="source">
<textarea lang="html">
  <l-date-picker></l-date-picker>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 注意使用 `month`、`week` 时需要考虑兼容性

## API

### DatePicker Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

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
| `x` | x | `(x: number): string` |

### DatePicker CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
