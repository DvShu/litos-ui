# Input 输入框

## 引用

```js
import { Input, regist } from "litos-ui";

regist(Input);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'ph-utils/dom';

  let $input;

  function numericParse(value) {
    let val = parseInt(value, 10)
    if (Number.isNaN(val)) {
      val = ''
    } else {
      val = Math.abs(val)
    }
    return String(val);
  }

  onMounted(() => {
    nextTick(() => {
      $input = $one('#input');
      $input.setParser(numericParse);
    })
  });

  onUnmounted(() => {
  })
</script>

### 基础用法

文本输入的基础用法。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="请输入内容"></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

通过 `disabled` 属性设置输入框为禁用状态。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="请输入内容" disabled></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### 限制输入

通过传递 `allow-input` 来限制输入的值。`integer` 只能输入正整数, `number` 只能输入正数；以 - 开头表明允许输入负数; 以 `.2` 结尾表明小数点后精度; 例如: `-number.4` 表明允许输入数字，且小数点后保留 `4` 位小数。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="只能输入正整数" allow-input="integer"></l-input>
  <l-input placeholder="只能输入整数" allow-input="-integer"></l-input>
  <l-input placeholder="输入数字,保留2位小数" allow-input="-number.2"></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### 输入解析

通过 `setParser` 给节点设置自定义 `parser` 在接受到输入值的时候进行解析，例如：只允许输入正整数

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input id="input" placeholder="请输入正整数"></l-input>
</textarea>
<div class="source">
<textarea lang="html">
  <l-input id="input" placeholder="请输入正整数"></l-input>
</textarea>
<textarea lang="ts">
  import { $one, on, off } from 'ph-utils/dom';
  //-
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
  const $input = $one('#input');
  $input.setParser(numericParse);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Input Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `html-type` | 原始的 [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B) | `string` | `text` |
| `placeholder` | 占位文本 | `string` | - |
| `allow-input` | 允许输入的值; `number`、`integer`,前面包含 `-` 表明允许负数, 以 `.2` 结尾表明小数点后精度 | `string` | - |

### Input Methods

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `setParser` | 设置输入解析 | `(parser: (val: string) => string): void` |
| `focus` | 聚焦 | `(): void` |
