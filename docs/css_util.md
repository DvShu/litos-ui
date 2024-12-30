# CSS Util

提供一些常用的 `CSS` 工具类

<script setup>
  import { nextTick, onMounted, onUnmounted } from 'vue';
  import { $, $one, on, off, iterate } from 'ph-utils/dom';
  import { createTransition } from '../src/components/utils';

  const trans = createTransition();

  function handleTransition(e) {
    const name = e.target.getAttribute('data-transition');
    const $targets = $(`[l-transition="${name}"]`);
    iterate($targets, ($target) => {
      const display = $target.style.display;
      if (display === 'none') {
        $target.setAttribute('l-transition-emit', 'show');
      } else {
        $target.setAttribute('l-transition-emit', 'hide');
      }
    });
  }

  onMounted(() => {
    nextTick(() => {
      trans.init();
      iterate($('[data-transition]'), (el) => {
        on(el, 'click', handleTransition);
      });
    });
  });

  onUnmounted(() => {
    trans.destroy();
    iterate($('[data-transition]'), (el) => {
      off(el, 'click', handleTransition);
    });
  });
</script>

## 1. `Transition` 渐变

### 1.1 引入样式

```js
import "litos-ui/styles/transition.css";
```

### 1.2 使用

所有的渐变都支持传递 `--l-transition-times` 控制时长, 默认为 `0.3s`；添加相应的 `l-transition` 属性即可。然后执行 `transition.init()`, 详细文档 [Transition渐变](/components/transition)

### 1.3 示例

1. `l-opacity`

普通渐变进入/退出

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-transition="l-opacity">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="toggle">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
</textarea>
<textarea lang="js">
  import { $one, on } from 'ph-utils/dom';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

2. `l-fadein`

从顶部往下移动渐变的进入/退出; 支持通过 `--l-fadein-offset` 控制距离, 默认为 `-20px`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-transition="l-fadein">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
</textarea>
<textarea lang="js">
  import { $one, on } from 'ph-utils/dom';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

3. `l-scale`

缩放进入/退出

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-transition="l-scale">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
</textarea>
<textarea lang="js">
  import { $one, on } from 'ph-utils/dom';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 这些渐变效果也支持在 `vue` 中使用

```vue
<Transition name="l-opacity">...</Transition>
```

## 2. `CSS Animation` 动画

### 2.1 引入样式

```js
import "litos-ui/styles/animation.css";
```

### 2.2 使用

可以直接通过动画名称，添加 `css class`、也可以通过 `css animation` 使用动画名称；例如：

1. 添加 `css class`

所有的动画的 `class` 规则为: `l-` + 动画名称 + `-anim`；例如旋转动画为: `l-rotate-anim`

```html
<l-loading-icon class="l-rotate-anim"></l-loading-icon>
```

2. 通过 `css animation` 使用动画名称

所有的动画的 `animation` 名称规则为：`l-` + 动画名称 + `-frame`；例如旋转动画为: `l-rotate-frame`

::: code-group

```html
<l-loading-icon class="custome-rotate" />
```

```css
.custome-rotate {
  animation: l-rotate-frame 1.5s infinite linear;
}
```

:::

内置动画有：`rotate` 旋转

## 3. 滚动条样式

如果觉得默认滚动条不好看，想修改滚动条样式

### 3.1 引入样式

```js
import "litos-ui/styles/scrollbar.css";
```

### 3.2 使用

只需要在滚动容器添加 `l-scrollbar` 类即可

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="l-scrollbar" style="width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### 3.3 更改滚动条颜色以及大小

通过使用下面表格中的 `CSS` 变量，可以更改滚动条的颜色以及大小

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="l-scrollbar" style="--l-scrollbar-bg:orange;--l-scrollbar-hover:red;--l-scrollbar-size:8px;width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### 3.4 样式变量

<!-- prettier-ignore -->
| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| `--l-scrollbar-bg` | `#d9d9d9` | 滚动条背景色 |
| `--l-scrollbar-hover` | `#bfbfbf` | 鼠标悬浮时滑块颜色 |
| `--l-scrollbar-size` | `10px` | 滑块尺寸, 水平滚动条时为高度，垂直时为宽度 |
