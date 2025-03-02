# Loading 加载

数据加载时显示的动效。

## 演示

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import Loading from '../../src/components/loading';

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        Loading.init();
      }
    })
  });
</script>

### 区域加载

在某一个区域加载数据时展示加载动画，防止页面失去响应，提高用户体验

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:100px;" l-loading="loading1">内容加载区域</div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>
