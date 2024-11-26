# Button 按钮

## 引用

```js
import { Button, regist } from "litos-ui";

regist(Button);
```

## 基础使用

<script setup>
  import { onMounted, onUnmounted } from 'vue';
  import { iterate, on, off, $, nextTick } from 'ph-utils/dom';

  function handleClick() {
    console.log('click')
  }

  onMounted(() => {
    nextTick(() => {
      iterate($('l-button'), (el) => {
        on(el, 'click', handleClick);
      });
    })
  });

  onUnmounted(() => {
    iterate($('l-button'), (el) => {
      off(el, 'click', handleClick);
    });
  });
</script>

### 按钮类型

使用 `type` 控制按钮类型, 提供两种类型: `normal`, `primary`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button>Default</l-button>
  <l-button type="primary">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 文本按钮

通过传递 `text` 属性将按钮变为文本按钮，配合 `type` 能有更多风格。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button text>Default</l-button>
  <l-button type="primary" text>Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

使用 `disabled` 控制按钮禁用状态, 禁用状态下不可点击。该属性接受一个 `Boolean` 类型的值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button disabled>Default</l-button>
  <l-button text disabled>Text</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 加载状态

使用 `loading` 控制按钮加载状态, `loading-text` 传递加载时显示的文本。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button loading>按钮</l-button>
  <l-button type="primary" loading loading-text="Loading">按钮</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Block按钮

`block` 属性使按钮适合其父宽度。`[100%]`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button block type="primary">按钮</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 按钮形状

使用 `shape` 控制按钮形状, 提供两种类型: `default`, `round`、`circle`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button>default</l-button>
  <l-button shape="round">round</l-button>
  <l-button shape="circle">C</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 按钮图标

直接在 `Button` 内使用 [Icon](/components/icon) 组件。可以搭配文字形成图标文字按钮。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button shape="circle">
    <l-search-icon />
  </l-button>
  <l-button shape="round" type="primary">
    <l-search-icon></l-search-icon>
    <span>搜索</span>
  </l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 透明背景

`ghost` 背景变为透明，常用在有色背景上

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button ghost type="primary">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义颜色

`color` 属性可以自定义按钮颜色。`color` 接受一个 `String` 类型的值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button color="#722ed1">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>
