# Dialog 对话框

在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区

## 引用

```js
import { DialogContainer, regist, Button, Dialog, CloseIcon } from "litos-ui";

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
        dialogs['dialog'] = Dialog({ el: '#dialog' });

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
  <dialog id="dialog" show-close="2">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>
