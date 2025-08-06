# Popover 弹出气泡

点击/鼠标移入元素，弹出气泡式的卡片浮层。在内容周围弹出一些隐藏的信息。和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 引用

```js
import { Popover, regist, Button, WarnIcon } from "litos-ui";
import "litos-ui/styles/popover.css";
regist([Button, WarnIcon]); // 当使用 Popconfirm 时，需要注册 Button 和 WarnIcon 组件

const popover = new Popover();

// 页面结束时调用: popover.destroy();
```

## 演示

<script setup>
  import { Popover, PopconfirmProps } from '../../src/components/utils/popover';
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { transition } from 'ph-utils/dom';

  let popover;
  let popover1;
  let popover2;
  let popover3;
  let popover4;
  let popover5;
  let popover6;
  let popconfirm;
  let $addTag;
  let $tagGroup;
  let observer;

  function handleAddTag() {
    if ($tagGroup) {
      let $addTagTmp = document.createElement('l-tag');
      $addTagTmp.setAttribute('closable', 'true');
      $addTagTmp.setAttribute('type', 'primary');
      $addTagTmp.style.marginRight = "5px";
      $addTagTmp.className = "ddd"
      // $addTagTmp.classList.add('tooltip-tag');
      $addTagTmp.innerHTML = '标签';
      const $tw = document.createElement('div');
      $tw.appendChild($addTagTmp);
      $tagGroup.appendChild($tw);
      transition($addTagTmp, 'l-scale', "enter");
      $addTagTmp = null;
    }
  }

  function handleRemoveTag(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $tagGroup = document.getElementById('tagGroup');
        if ($tagGroup) {
          $tagGroup.addEventListener('close', handleRemoveTag);
          observer = new MutationObserver(function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('子节点被添加或删除了', mutation);
                    // mutation.addedNodes: 新增的节点列表
                    // mutation.removedNodes: 被删除的节点列表
                }

                if (mutation.type === 'subtree') {
                    // 注意：subtree 不是 mutation.type 的值，而是配置项
                }
            }
          });
          observer.observe($tagGroup, {
            childList: true,
            subtree: true
          });
        }
        $addTag = document.getElementById('addTag');
        if ($addTag) {
          $addTag.addEventListener('click', handleAddTag);
        }
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
        });
        popover6 = new Popover({
          reference: '#tooltip',
          theme: 'tooltip',
        });
        popconfirm = new Popover({
          ...PopconfirmProps,
          reference: '#popconfirm',
          onPopoverAction (action) {
            console.log(action);
          }
        });
      }
    });
  });

  onUnmounted(() => {
    if ($tagGroup) {
      $tagGroup.removeEventListener('close', handleRemoveTag);
    }
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
    if ($addTag) {
      $addTag.removeEventListener('click', handleAddTag);
    }
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
    if (popover5) {
      popover5.destroy();
    }
    popover5 = undefined;
    if (popover6) {
      popover6.destroy();
    }
    popover6 = undefined;
    if (popconfirm) {
      popconfirm.destroy();
    }
    popconfirm = undefined;

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

::: code-group

```html [html]
<div id="popover" class="l-popover">
  <div class="l-popover-content">
    <!--这里填充其余内容部分-->
  </div>
  <div class="l-popover-arrow"></div>
</div>
```

```js [js]
const $popover = document.querySelector("#popover");
new Popover({
  reference: "#custom",
  popover: $popover,
});
```

:::

### Tooltip

`tooltip` 相对于 `popover` 只是样式进行了小调整；只需要设置 `theme="tooltip"` 属性就能即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-title="提示内容" id="tooltip">提示</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-title="提示内容" id="tooltip">提示</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#tooltip',
    theme: 'tooltip',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Popconfirm

引入 `Popconfirm` 配置，然后在 `reference` 节点上添加 `data-content` 属性为提示内容。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-content="确定删除吗？" id="popconfirm">删除</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-content="确定删除吗？" id="popconfirm">删除</l-button>
</textarea>
<textarea lang="js">
  import { regist, Button, WarnIcon, PopconfirmProps } from 'litos-ui';
  regist([Button, WarnIcon]);
  //-
  new Popover({
    ...PopconfirmProps,
    reference: '#popconfirm',
    onPopoverAction (action) {
      console.log(action);
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 列表

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="addTag" type="primary">添加标签</l-button>
  <hr />
  <div id="tagGroup"></div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-title="提示内容" id="tooltip">提示</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#tooltip',
    theme: 'tooltip',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Popover Constructor Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `reference` | 触发元素, 不传,则查询所有的 `.l-popover-reference` | `HTMLElement`、`HTMLElement[]`、`string` | `-` |
| `popover` | `Popover`元素节点, 不传会自动创建 | `HTMLElement` | `-` |
| `contentRender` | 内容渲染函数 | `() => HTMLElement | string | DocumentFragment` | `-` |
| `updateContent` | 内容更新函数, `datas` 为 `reference` 节点上的 `data` 属性集 | `(popoverElement: HTMLElement, datas?: Record<string, any>) => void` | `-` |
| `trigger` | 触发方式 | `hover`、`click`、`focus` | `hover` |
| `offset` | 偏移量 | `number` | `10` |
| `arrow` | 是否显示箭头 | `boolean` | `true` |
| `arrowSize` | 箭头大小 | `number` | `8` |
| `width` | 宽度 | `string`、`number` | `-` |
| `theme` | 主题 | `default`、`tooltip` | `default` |
| `placement` | 位置 | `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | `top` |
| `popoverWidth` | 弹出宽度, `trigger` 保持和触发元素宽度一致 | `string`、`trigger` | `-` |
| `onPopoverAction` | 点击 `Popover` 内具有 `data-action` 的元素时触发 | `(action: string) => void` | `-` |

### Popover CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `-` | - | `-` |
