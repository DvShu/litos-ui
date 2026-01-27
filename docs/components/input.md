# Input 输入框

## 引用

```js
import { Input, regist, CloseFilledIcon } from "litos-ui";

regist(Input);
regist(CloseFilledIcon); // 需要使用 clearable 功能时
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
      if (!import.meta.env.SSR) {
        $input = $one('#input');
        $input.addEventListener('change', function(e) {
          console.log('input', e.target.value);
        });
        $input.setParser(numericParse);
      }
    })
  });
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
  <l-input id="input" placeholder="请输入正整数" clearable></l-input>
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

### 带图标的输入框

要在输入框中添加图标，只需要使用 `prefix` 和 `suffix` 命名的插槽。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### 带清除图标

使用 `clearable` 属性即可显示一个清除图标，点击图标删除所有内容。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="input something" clearable></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Input Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 原始的 [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B) | `string` | `text` |
| `placeholder` | 占位文本 | `string` | - |
| `allow-input` | 允许输入的值; `number`、`integer`,前面包含 `-` 表明允许负数, 以 `.2` 结尾表明小数点后精度 | `string` | - |
| `block` | 宽度是否铺满父元素 | `boolean` | `false` |
| `width` | 宽度 | `string` | - |
| `autofocus` | 原生属性，自动获取焦点 | `boolean` | `false` |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `inputmode` | 输入模式, [inputmode](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/inputmode) | `string` | `text` |
| `maxlength` | 最大输入长度 | `number` | - |
| `minlength` | 最小输入长度 | `number` | - |

### Input Methods

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `setParser` | 设置输入解析 | `(parser: (val: string) => string): void` |
| `focus` | 聚焦 | `(): void` |

### Input Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |
| `prefix` | 前缀图标 |
| `suffix` | 后缀图标 |

### 样式变量

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-btn-text-color` | 按钮的文字颜色 | `rgba(0, 0, 0, 0.65)` |
