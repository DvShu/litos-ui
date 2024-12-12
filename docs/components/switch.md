# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 引用

```js
import { Switch, regist } from "litos-ui";

regist(Switch);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'ph-utils/dom';

  let $customSwitch;

  onMounted(() => {
    if (!import.meta.env.SSR) {
      nextTick(() => {
        $customSwitch = $one('#custom-switch');
        if ($customSwitch != null) {
          $customSwitch.setActionRender((cfg) => {
            if (cfg.checked) {
              return '<l-moon-icon></l-moon-icon>';
            } else {
              const $dom = document.createElement('l-sun-icon');
              return $dom;
            }
          });
        }
      })
    }
  });
</script>

### 基础用法

绑定 `value` 到一个 `boolean` 类型的变量。可以使用 `true` 和 `false` 分别表示开和关。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch></l-switch>
</textarea>
</l-code-preview>
</ClientOnly>

### 文字描述

使用 `checked-text` 和 `unchecked-text` 属性来设置开关的文字描述。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch checked-text="Y" unchecked-text="N"></l-switch>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义操作图标

既可以通过使用 `checked-action` 插槽 和 `unchecked-action` 插槽分别渲染打开/关闭时的操作图标。也可以通过 `js` 设置 `actionRender` 来渲染操作图标.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <l-switch id="custom-switch"></l-switch>
</textarea>
<div class="source">
<textarea lang="html">
  <!-- 使用 checked-action 和 unchecked-action 插槽 -->
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <!-- 使用 js 设置 -->
  <l-switch id="custom-switch"></l-switch>
</textarea>
<textarea lang="js">
  let $customSwitch = document.querySelector('#custom-switch');
  // 设置 actionRender
  $customSwitch.setActionRender((cfg) => {
    if (cfg.checked) {
      return '<l-moon-icon></l-moon-icon>';
    } else {
      const $dom = document.createElement('l-sun-icon');
      return $dom;
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Switch Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 开关状态(是否打开) | `boolean` | `false` |
| `checked-text` | 打开时的文字描述 | `string` | - |
| `unchecked-text` | 关闭时的文字描述 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `name` | 原生 `name` 属性 | `string` | - |

### Switch Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `checked-action` | 打开时的操作图标 |
| `unchecked-action` | 关闭时的操作图标 |

### Switch Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 开关状态改变时的事件 | `(event: Event)` |

### Switch Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `setActionRender` | 设置操作图标渲染函数 | `((cfg: { checked: boolean }) => string \| HTMLElement): void` |

### Switch CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-switch-height` | 开关按钮高度 | `20px` |
| `--l-switch-width` | 开关按钮宽度 | `var(--l-switch-height) * 2` |
