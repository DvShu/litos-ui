# Input 输入框

## 引用

```js
import { Input, regist, CloseFilledIcon, ReductionIcon, SearchIcon } from "litos-ui";

regist(Input);
regist(CloseFilledIcon); // 需要使用 clearable 功能时

// 注册本页演示使用的附加组件
regist([ReductionIcon, SearchIcon]);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'utilane/browser';

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

当前版本未接入 `allow-input` 和 `autofocus` 属性。限制输入请使用下面的 `setParser()` 示例；需要聚焦时，在组件挂载后调用 `focus()`。

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
  import { $one, on, off } from 'utilane/browser';
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

### 错误状态

通过 `error` 属性设置输入框为错误状态。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="请输入内容" error block></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Input Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 输入值，可通过实例 value 属性读写 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `name` | 表单字段名 | `string` | - |
| `type` | 原始的 [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B) | `string` | `text` |
| `placeholder` | 占位文本 | `string` | - |
| `block` | 宽度是否铺满父元素 | `boolean` | `false` |
| `width` | 宽度 | `string` | - |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `inputmode` | 原生输入模式，未设置时由浏览器决定 | `string` | 未设置 |
| `maxlength` | 最大输入长度 | `number` | - |
| `minlength` | 最小输入长度 | `number` | - |
| `error` | 错误状态标记；存在该属性即显示错误状态，恢复时移除属性 | `string` | 未设置 |

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
| `prefix` | 前缀图标 |
| `suffix` | 后缀图标 |

### 样式变量

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-input-width` | 输入框宽度 | `170px` |