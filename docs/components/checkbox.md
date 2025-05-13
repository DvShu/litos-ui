# Checkbox 复选框

在一组备选项中进行多选。适用提醒用户勾选场景，突出多选框选项，可以有效增加用户识别度。

## 引用

```js
import { Checkbox, regist } from "litos-ui";

regist([Checkbox]);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'ph-utils/dom';

  let $allCheck;
  let $group;

  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // 全选
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // 全不选
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // 部分选中
    }
  }

  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // 全选
    } else {
      $group.value = ''; // 全不选
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $group = $one('#group');
        $allCheck = $one('#check-all');

        on($group, 'change', handleGroupChange);
        on($allCheck, 'change', handleAllCheckChange);
      }
    })
  });

  onUnmounted(() => {
    if ($group) {
      off($group, 'change', handleGroupChange);
    }
    if ($allCheck) {
      off($allCheck, 'change', handleAllCheckChange);
    }
  })
</script>

### 基础用法

使用当只有一个选项时，可以直接 `checked` 绑定 `boolean` 值来控制是否选中；使用 `slot-label` 来重写选项的文字。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

使用 `disabled` 属性来禁用复选框。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox disabled checked>禁用</l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### 多选框组

结合 `l-checkbox-group` 组件实现单选框组

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="SH">上海</l-checkbox>
  </l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

> 注意：传递给 `l-checkbox-group` 的 `value` 为多选值的每一项 `encodeURIComponent` 后拼接 `&`

### 按钮样式

只需要为 `l-checkbox` 设置 `button` 属性，即可将复选框变为按钮样式

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### 中间状态

设置 `indeterminate` 属性，表示不确定状态，一般用于实现部分选中的状态。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox>
</textarea>
<div class="source">
<textarea lang="html">
  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
</textarea>
<textarea lang="ts">
  import { $one, on, off } from 'ph-utils/dom';
  //-
  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // 全选
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // 全不选
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // 部分选中
    }
  }
  //-
  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // 全选
    } else {
      $group.value = ''; // 全不选
    }
  }
  //-
  const $group = $one('#group');
  const $allCheck = $one('#check-all');
  //-
  on($group, 'change', handleGroupChange);
  on($allCheck, 'change', handleAllCheckChange);
  // 页面关闭时移除事件
  // off($group, 'change', handleGroupChange);
  // off($allCheck, 'change', handleAllCheckChange);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Checkbox Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | value | `string` | `-` |
| `checked` | 是否选中 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `button` | 是否为按钮样式 | `boolean` | `false` |
| `indeterminate` | 是否为中间状态 | `boolean` | `false` |
| `name` | 原生属性 | `string` | `-` |
| `label` | 显示的标签 | `string` | `-` |

### CheckboxGroup Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 多选值,每一项 `encodeURIComponent` 后拼接 `&`  | `string` | `-` |

### Checkbox Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 标签 |

### Checkbox Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 选中改变时触发, `e.detail` 包含 `value`、`name`、`checked` | `(event: CustomEvent)` |

### CheckboxGroup Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 选中改变时触发, `e.detail` 包含 `value` 为选中的值的列表 | `(event: CustomEvent)` |


### Checkbox CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
