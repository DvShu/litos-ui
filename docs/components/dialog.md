# Dialog 对话框

在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区

## 演示

<script setup>
  import { $one, on, off } from 'ph-utils/dom';
  import { onMounted, nextTick } from 'vue';
  import Dialog from '../../src/components/dialog'

  let dialog;
  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        dialog = Dialog({ el: '#dialog' });
        dialog.open();
      }
    })
  });
</script>

### 基本用法

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <dialog id="dialog" vertical-align="bottom" width="100%"><p>这是一个对话框示例。</p></dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>
