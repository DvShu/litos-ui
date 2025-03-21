# Modal 对话框

在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区

## 引用

```js
import { Modal, regist } from "litos-ui";

regist(Modal);
```

## 演示

<script setup>
  import { $one, on, off, $, iterate } from 'ph-utils/dom';
  import { onMounted, nextTick, onUnmounted } from 'vue';

  let $btns;
  let $modals;

  function showDialog(e) {
    const $target = e.target;
    const id = $target.id;
    const $modal = $one(`l-modal[for="${id}"]`);
    $modal.setAttribute('open', 'true');
  }

  function onCancel(e) {
    e.target.removeAttribute('open');
  }

  function onOk(e) {
    const $target = e.target;
    const forAttr = $target.getAttribute('for');
    if (forAttr === 'open3') {
      $target.setAttribute('confirm-loading', 'true');
      $target.innerHTML = "<span>正在提交内容……</span>";
      setTimeout(() => {
        $target.innerHTML = "<span>对话框内容</span>";
        $target.removeAttribute('confirm-loading');
        e.target.removeAttribute('open');
      }, 1500);
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $btns = $('l-button[id]');
        $modals = $('l-modal');
        iterate($btns, ($btn) => {
          on($btn, 'click', showDialog);
        });
        iterate($modals, ($modal) => {
          on($modal, 'cancel', onCancel);
          on($modal, 'ok', onOk);
        });
      }
    })
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($btns) {
        iterate($btns, ($btn) => {
          off($btn, 'click', showDialog);
        });
        $btns = undefined;
      }
      if ($modals) {
        iterate($modals, ($modal) => {
          off($modal, 'cancel', onCancel);
        });
        $modals = undefined;
      }
    }
  })
</script>

### 基础用法

需要设置 `open` 属性，它接收 `Boolean`，当为 `true` 时显示 `Modal`。`title` 属性用于定义标题，它是可选的，默认值为空。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open1" title="Title">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open1" title="Title">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
</textarea>
<textarea lang="js">
  const $open1Btn = document.getElementById('open1');
  const $modal1 = document.querySelector('l-modal[for="open1"]');
  $open1Btn.addEventListener('click', () => {
    $modal1.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal1.addEventListener('cancel', () => {
    $modal1.removeAttribute('open');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 自定义头部

除了使用 `title` 属性定义头部内容外，也可以通过传递 `header-slot` 插槽自定义头部内容。通过传递 `width` 属性改变宽度

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">提示</span>
    <span>内容</span>
  </l-modal>
  <l-button id="open2" type="primary">打开-自定义头部</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">提示</span>
    <span>内容</span>
  </l-modal>
  <l-button id="open2" type="primary">打开-自定义头部</l-button>
</textarea>
<textarea lang="js">
  const $open2Btn = document.getElementById('open2');
  const $modal2 = document.querySelector('l-modal[for="open2"]');
  $open2Btn.addEventListener('click', () => {
    $modal2.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal2.addEventListener('cancel', () => {
    $modal2.removeAttribute('open');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 注意：实际使用 `l-info-icon` 时, 需要 `regist` 注册

### 异步关闭

点击确定后异步关闭对话框，例如提交表单。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open3" title="异步关闭">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open3" type="primary">打开-异步关闭</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open3" title="异步关闭">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open3" type="primary">打开-异步关闭</l-button>
</textarea>
<textarea lang="js">
  const $open3Btn = document.getElementById('open3');
  const $modal3 = document.querySelector('l-modal[for="open3"]');
  $open3Btn.addEventListener('click', () => {
    $modal3.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal3.addEventListener('cancel', () => {
    $modal3.removeAttribute('open');
  });
  $modal3.addEventListener('ok', () => {
    $modal3.setAttribute('confirm-loading', 'true');
    $modal3.innerHTML = "<span>正在提交内容……</span>";
    setTimeout(() => {
      $modal3.innerHTML = "<span>对话框内容</span>";
      $modal3.removeAttribute('confirm-loading');
      $modal3.removeAttribute('open');
    }, 1500);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 关闭按钮

通过设置 `close` 来控制关闭按钮的显示以及位置；`0` - 不显示, `1` - 显示在框内(默认), `2` - 显示在边角

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open4" title="Title" close="2">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open4" type="primary">打开</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open3" title="异步关闭">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open3" type="primary">打开-异步关闭</l-button>
</textarea>
<textarea lang="js">
  const $open4Btn = document.getElementById('open4');
  const $modal4 = document.querySelector('l-modal[for="open4"]');
  $open4Btn.addEventListener('click', () => {
    $modal4.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal4.addEventListener('cancel', () => {
    $modal4.removeAttribute('open');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 移动风格

默认情况下对话框为 `pc` 端风格，可以通过传递 `mobile` 属性将对话框变为移动风格；设置 `vertical-align="middle"` 让对话框垂直居中显示;具体表现为：文本居中，下方按钮平铺

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open5" title="Title" mobile close="0" vertical-align="middle">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open5" title="Title" mobile close="0" vertical-align="middle">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
</textarea>
<textarea lang="js">
  const $open5Btn = document.getElementById('open5');
  const $modal5 = document.querySelector('l-modal[for="open5"]');
  $open5Btn.addEventListener('click', () => {
    $modal5.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal5.addEventListener('cancel', () => {
    $modal5.removeAttribute('open');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Modal Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Modal Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Modal Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `cancel` | 点击遮罩层或右上角叉或取消按钮的回调 | `(event: CustomEvent)` |

### Modal Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Modal CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
