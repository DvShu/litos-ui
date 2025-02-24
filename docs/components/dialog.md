# Dialog 对话框

在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区

## 引用

```js
import { DialogContainer, regist, Button, CloseIcon } from "litos-ui";

regist([DialogContainer, Button, CloseIcon]);
```

## 演示

<script setup>
  import { $one, on, off, $, iterate } from 'ph-utils/dom';
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import Dialog from '../../src/components/dialog'

  let dialogs = {};
  let $btns;

  function showDialog(e) {
    const $target = e.target;
    const id = $target.getAttribute('data-id');
    dialogs[id].open();
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        dialogs['dialog'] = Dialog({ el: '#dialog', onAction: (action, done) => {
          console.log(action);
          done();
        } });
        dialogs['dialog2'] = Dialog({ el: '#dialog2' })

        $btns = $('l-button[data-id]');
        iterate($btns, ($btn) => {
          on($btn, 'click', showDialog);
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
        for (const id in dialogs) {
          dialogs[id].destroy();
        }
        dialogs = {};
      }
    }
  })
</script>

### 基本用法

将 `l-dialog-container` 元素作为 `dialog` 的子元素，并设置 `header` 属性为标题。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog" >显示 Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = LDialog({ 
    el: '#dialog', 
    onAction: (action, done) => {
      console.log(action);
      done();
    } 
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 切记在页面关闭时，如 `onUnmounted` 中调用 `dialog.destroy()` 方法销毁弹窗

### 自定义头部

除了使用 `header` 属性定义头部内容外，也可以通过传递 `header-slot` 插槽自定义头部内容。通过传递 `width` 属性改变宽度；通常当需要在头部显示图标时有用, 比如：`confirm` 弹窗

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog2" >显示 Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = LDialog({ el: '#dialog' });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
</textarea>
</div>
</l-code-preview>
</ClientOnly>
