# Transition 过渡

帮助你制作基于状态变化的过渡和动画；通常在一个元素或组件进入和离开 `DOM` 时应用动画

## 引用

```js
import { createTransition } from "litos-ui";

// 会自动加载页面中带有 l-transition 属性的元素并应用动画
const trans = createTransition();

trans.init();
```

## 演示

<script setup lang="ts">
  import { $one, on, off, transition } from 'ph-utils/dom';
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { createTransition } from '../../src/components/utils';

  const trans = createTransition();

  function toggle() {
    const $text = $one('#text1');
    const transEmit = $text.getAttribute('l-transition-emit') || 'show';
    if (transEmit === 'hide') {
      $text.setAttribute('l-transition-emit', "show");
    } else {
      $text.setAttribute('l-transition-emit', "hide");
    }
  }

  function toggle2() {
    const $text = $one('#text2');
    const display = $text.style.display;
    if (display === 'none') {
      $text.style.display = 'block';
      // 展示显示动画
      transition($text, [['opacity', '0', '0.3s']]);
    } else {
      // 隐藏隐藏动画
      transition($text, [['opacity', '0', '0.3s']], 'leave', () => {
        $text.style.display = 'none';
      });
    }
  }

  onMounted(() => {
    nextTick(() => {
      // 初始化, 加载带有 l-transition 属性的元素动画
      trans.init();
      on($one('#toggle1'), 'click', toggle);
      on($one('#toggle2'), 'click', toggle2);
    })
  })

  onUnmounted(() => {
    trans.destroy();
    off($one('#toggle1'), 'click', toggle)
    off($one('#toggle2'), 'click', toggle2)
  })
</script>

### 基本用法

创建过渡动画后，在节点加载完成后，调用 `init` 方法，即可自动加载带有 `l-transition` 属性的元素并应用动画。同时也会监听节点的 `l-transition-emit` 属性，当属性变化时，会自动应用动画。

基于此当想要隐藏节点时，只需要将 `l-transition-emit` 属性设置为 `hide` 即可。

如果想要隐藏动画完成后，删除节点而不是设置 `display: none` ; 可以将 `l-transition-method` 属性设置为 `remove` 即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="toggle1">Toggle</l-button>
  <p id="text1" l-transition="l-opacity" l-transition-method="hide">hello</p>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="toggle1">Toggle</l-button>
  <p id="text1" l-transition="l-opacity" l-transition-method="hide">hello</p>
</textarea>
<textarea lang="css">
  .l-opacity-enter-active,
  .l-opacity-leave-active {
    transition: opacity 0.3s ease;
  }
  //-
  .l-opacity-enter-from,
  .l-opacity-leave-to {
    opacity: 0;
  }
</textarea>
<textarea lang="js">
  import { $one, on, off } from 'ph-utils/dom';
  import { createTransition } from 'litos-ui';
  //-
  const trans = createTransition();
  // 初始化, 加载带有 l-transition 属性的元素动画
  // 需要在页面结束时调用 trans.destroy()
  trans.init();
  //-
  function toggle() {
    const $text = $one('#text1');
    const transEmit = $text.getAttribute('l-transition-emit') || 'show';
    if (transEmit === 'hide') {
      $text.setAttribute('l-transition-emit', "show");
    } else {
      $text.setAttribute('l-transition-emit', "hide");
    }
  }
  //-
  on($one('#toggle1'), 'click', toggle);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 注意: 设置 `l-transition-method="remove"` 后，新添加节点时，需要手动调用 `trans.add()` 方法重新添加节点动画

### 手动动画

如果想要手动控制动画，可以通过直接引用 `ph-utils/dom transition` 然后调用 `transition` 方法即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
</textarea>
<textarea lang="js">
  function toggle2() {
    const $text = $one('#text2');
    const display = $text.style.display;
    if (display === 'none') {
      $text.style.display = 'block';
      // 展示显示动画
      transition($text, [['opacity', '0', '0.3s']]);
    } else {
      // 隐藏隐藏动画
      transition($text, [['opacity', '0', '0.3s']], 'leave', () => {
        $text.style.display = 'none';
      });
    }
  }
  //-
  on($one('#toggle2'), 'click', toggle2);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> `transition()` 函数有4个参数
>
> 1. `el: HTMLElement` 执行过渡的节点
> 2. `property: string | [string, string, string][]` 过渡的属性，当为 `string` 时为过渡名称，通过 `css` 定义过渡; 为数组时为过渡的属性名，过渡的属性值，过渡的持续时间，如 `['opacity', '0', '0.3s']` 为透明度从 `1` 到 `0` 的过渡，持续时间为 `0.3s`
> 3. `dir: 'enter' | 'leave'` 过渡的方向，`enter` 为进入，`leave` 为离开
> 4. `finish?:() => void` 过渡完成后的回调函数

## API

### Transition Property

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `l-transition` | 为节点添加过渡动画 | `string` | `l` |
| `l-transition-method` | 为节点添加过渡动画后，节点隐藏方式 | `remove`[删除节点]、`hide`[隐藏节点] | `hide` |
| `l-transition-emit` | 为节点应用过渡动画, 该属性变化时节点自动应用动画 | `show`[显示节点]、`hide`[隐藏节点] | `show` |

### Transition Method

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `init` | 初始化，加载带有 `l-transition` 属性的元素并应用动画 | `() => void` | - |
| `destroy` | 销毁，移除所有动画 | `() => void` | - |
| `add` | 添加节点动画 | `(el: HTMLElement[]) => void` | - |
