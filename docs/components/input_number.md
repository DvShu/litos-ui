# InputNumber 数字输入框

## 引用

```js
import { InputNumber, regist } from "litos-ui";

regist(InputNumber);
```

## 演示

<script setup>
  import { onMounted, nextTick } from 'vue';
  import { $one } from 'ph-utils/browser';

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        const $num1 = $one('#num-change');
        if ($num1) {
          $num1.addEventListener('change', function(e) {
            console.log('input-number change', e.detail);
          });
        }
      }
    })
  });
</script>

### 基础用法

数字输入框的基础用法，支持通过 `+` / `-` 按钮或键盘上下方向键增减数值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="5"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

通过 `disabled` 属性设置数字输入框为禁用状态。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="3" disabled></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 步长设置

通过 `step` 属性设置每次增减的步长，默认为 `1`。支持小数步长。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="1" step="2"></l-input-number>
  <l-input-number value="0.5" step="0.5" precision="1"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 精度控制

通过 `precision` 属性设置数值的小数精度，输入值会在失焦时自动格式化。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="1.5" precision="2" step="0.1"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 范围限制

通过 `min` 和 `max` 属性设置数值的有效范围，达到边界时对应按钮自动禁用。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="5" min="0" max="10"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 尺寸

数字输入框有大中小三种尺寸。通过设置 `size` 为 `large`、`small` 分别设为大、小尺寸。若不设置 `size`，则尺寸默认为 `default`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="1" size="large"></l-input-number>
  <l-input-number value="1"></l-input-number>
  <l-input-number value="1" size="small"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 隐藏步进按钮

通过 `controls-disabled` 属性可以隐藏左右两侧的 `+` / `-` 步进按钮，仅保留输入框。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="10" controls-disabled placeholder="请输入"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 宽度与 InnerBlock

通过 `width` 属性自定义宽度，或使用 `inner-block` 属性使输入框铺满父元素。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number value="1" width="240"></l-input-number>
  <l-input-number value="1" inner-block></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

### 监听事件

通过监听 `change` 事件获取值的变化，事件 `detail` 中包含 `value` 和 `name`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input-number id="num-change" value="0" name="count"></l-input-number>
</textarea>
<div class="source">
<textarea lang="html">
  <l-input-number id="num-change" value="0" name="count"></l-input-number>
</textarea>
<textarea lang="ts">
  import { $one } from 'ph-utils/browser';
  //-
  const $num = $one('#num-change');
  $num.addEventListener('change', function(e) {
    console.log('value:', e.detail.value, 'name:', e.detail.name);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### InputNumber Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值 | `number` | - |
| `min` | 最小值 | `number` | - |
| `max` | 最大值 | `number` | - |
| `step` | 步长 | `number` | `1` |
| `precision` | 数值精度（小数位数） | `number` | - |
| `placeholder` | 占位文本 | `string` | - |
| `size` | 尺寸，`small`、`default`、`large` | `string` | `default` |
| `width` | 宽度 | `string` | `170px` |
| `block` | 宽度是否铺满父元素 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `controls-disabled` | 是否隐藏步进按钮 | `boolean` | `false` |
| `name` | 表单字段名 | `string` | - |

### InputNumber Events

<!-- prettier-ignore -->
| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| `input` | 值变化时触发（实时） | `{ value: number, name: string }` |
| `change` | 值变化时触发（失焦或回车） | `{ value: number, name: string }` |

### InputNumber Methods

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `focus` | 聚焦输入框 | `(): void` |

### 样式变量

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-input-number-width` | 组件宽度 | `170px` |
| `--l-input-number-border-color` | 边框颜色 | `#d9d9d9` |
| `--l-input-number-bg` | 背景色 | `#ffffff` |
| `--l-input-number-btn-color` | 按钮文字颜色 | `#606266` |
| `--l-input-number-btn-bg` | 按钮背景色 | `#f5f7fa` |
| `--l-input-number-btn-hover-color` | 按钮悬浮文字颜色 | `var(--l-primary-color, #722ed1)` |
| `--l-input-number-btn-hover-bg` | 按钮悬浮背景色 | `var(--l-primary-color-light5, #f3e8ff)` |
| `--l-input-number-btn-disabled-color` | 禁用时按钮颜色 | `#c0c4cc` |
| `--l-form-control-height` | 组件高度 | `32px` |