# Popover 弹出气泡

点击/鼠标移入元素，弹出气泡式的卡片浮层。在内容周围弹出一些隐藏的信息。和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 引用

```js
import { Popover } from "litos-ui";
import "litos-ui/styles/popover.css";

const popover = new Popover();

// 页面结束时调用: popover.destroy();
```

## 演示

<script setup>
  import { Popover } from '../../src/components/utils/popover';
  import { onMounted, onUnmounted, nextTick } from 'vue';

  let popover;
  let popover1;
  let popover2;
  let popover3;
  let popover4;
  let popover5;

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        popover = new Popover();
        popover1 = new Popover({
          reference: '#hover-popover',
          trigger: 'hover',
        });
        popover2 = new Popover({
          reference: '#click-popover',
          trigger: 'click',
        });
        popover3 = new Popover({
          reference: '#focus-popover',
          trigger: 'focus',
        });
        popover4 = new Popover({ reference: '#none-arrow', arrow: false, offset: 5 });
        popover5 = new Popover({ 
          reference: '#custom', 
          contentRender () {
            const fragment = document.createDocumentFragment();
            const $p1 = document.createElement('p');
            $p1.innerHTML = '自定义内容1';
            fragment.appendChild($p1);
            const $p2 = document.createElement('p');
            $p2.innerHTML = '自定义内容2';
            fragment.appendChild($p2);
            return fragment;
          },
          updateContent (popoverEl, datas) {}
        })
      }
    });
  });

  onUnmounted(() => {
    if (popover) {
      popover.destroy();
    }
    popover = undefined;
    if (popover1) {
      popover1.destroy();
    }
    popover1 = undefined;
    if (popover2) {
      popover2.destroy();
    }
    popover2 = undefined;
    if (popover3) {
      popover3.destroy();
    }
    popover3 = undefined;
    if (popover4) {
      popover4.destroy();
    }
    popover4 = undefined;
  });
</script>

### 基础用法

最简单的用法，给需要弹出的元素添加 `data-title` 属性以及 `l-popover-reference` 类, 然后构造一个 `Popover` 对象。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <a data-title="悬浮提示" class="l-popover-reference">提示</a>
</textarea>
<div class="source">
<textarea lang="html">
  <a data-title="悬浮提示" class="l-popover-reference">提示</a>
</textarea>
<textarea lang="js">
  let popover = new Popover();
  // 页面结束时调用: popover.destroy();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 构造 `Popver` 对象时支持传递 `reference` 参数，用于指定弹出层的参考元素，如果不指定则查找所有的 `.l-popover-reference` 元素。

### 触发方式

三种触发方式：鼠标移入[`hover`]、点击[`click`]、焦点[`focus`]；通过 `trigger` 属性设置触发方式。默认为：`hover`；

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="hover-popover" data-title="悬浮提示">悬浮提示</l-button>
  <l-button id="click-popover" data-title="点击提示">点击提示</l-button>
  <l-button id="focus-popover" data-title="焦点提示">焦点提示</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="hover-popover" data-title="悬浮提示">悬浮提示</l-button>
  <l-button id="click-popover" data-title="点击提示">点击提示</l-button>
  <l-button id="focus-popover" data-title="焦点提示">焦点提示</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#hover-popover',
    trigger: 'hover',
  });
  new Popover({
    reference: '#click-popover',
    trigger: 'click',
  });
  new Popover({
    reference: '#focus-popover',
    trigger: 'focus',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 位置

有 `12` 个弹出位置。通过 `data-placement` 属性设置弹出位置。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="top-start">top-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="top">top</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="top-end">top-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="left-start">left-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="left">left</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="left-end">left-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="right-start">right-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="right">right</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="right-end">right-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="bottom-start">bottom-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="bottom">bottom</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="bottom-end">bottom-end</l-button>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

> 也可以再构造 `Popover` 对象时传递 `placement` 参数来设置弹出位置。

### 不显示箭头

构造 `Popover` 时将 `arrow` 参数设置为 `false` 即可；同时可以设置 `offset` 参数来设置偏移量。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="none-arrow" data-title="提示内容">提示</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="none-arrow" data-title="提示内容">提示</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#none-arrow',
    arrow: false,
    offset: 5,
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 自定义内容

通过 `slot` 插槽来设置 `l-popover` 的内容

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="custom">提示</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="custom">提示</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#custom',
    // 提供自定义的内容渲染函数, 初次渲染时调用
    contentRender () {
      const fragment = document.createDocumentFragment();
      const $p1 = document.createElement('p');
      $p1.innerHTML = '自定义内容1';
      fragment.appendChild($p1);
      const $p2 = document.createElement('p');
      $p2.innerHTML = '自定义内容2';
      fragment.appendChild($p2);
      return fragment;
    },
    // 每次显示的时候，都会调用这个函数更新渲染内容, datas 为 reference 节点上的 data 属性集
    updateContent (popoverEl, datas) {}
  })
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 出了通过这种形式外，也可以自己通过 `popover` 属性，指向一个 `popover` 节点，这个时候，可以完全自定义包括整个 `popover` 在内的结构

### Tooltip

`tooltip` 相对于 `popover` 只是样式进行了小调整；只需要设置 `theme="tooltip"` 属性就能即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover content="提示内容" theme="tooltip" placement="top">
    <l-button slot="trigger">提示</l-button>
  </l-popover>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Popover Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `inline` | `l-popover` 是否是行级元素 | `boolean` | `false` |
| `content` | `l-popover` 的内容 | `string` | `-` |
| `placement` | 位置 | `string` | `top` |
| `trigger` | 触发方式 | `hover`、`click`、`focus` | `hover` |
| `offset` | 偏移量 | `number` | `10` |
| `show-arrow` | 是否显示箭头 | `boolean` | `true` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `width` | 宽度 | `string`、`number` | `-` |
| `destroy-on-hide` | 隐藏时销毁 `DOM` 结构; `false` 隐藏时未销毁只是设置 `display: none` | `boolean` | `false` |

### Popover Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |
| `trigger` | 触发按钮 |

### Popover CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-popover-offset` | 偏移量 | `10px` |
