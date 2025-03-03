# Loading 加载

数据加载时显示的动效。

## 演示

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import Loading from '../../src/components/loading';
  import { on, off, $one } from 'ph-utils/dom';

  function handleLoading() {
    Loading.init('loading3');
    setTimeout(() => {
      Loading.close('loading3');
    }, 3000);
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        Loading.init('loading1');
        Loading.init('loading2');
        on($one('[l-loading="loading3"]'), 'click', handleLoading);
      }
    })
  });

  onUnmounted(() => {
    off($one('[l-loading="loading3"]'), 'click', handleLoading);
  });
</script>

### 区域加载

在某一个区域加载数据时展示加载动画，防止页面失去响应，提高用户体验

给节点添加一个 `l-loading` 属性，然后调用 `LLoading.init()` 初始化

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
</textarea>
<div class="source">
<textarea lang="html">
  <div l-loading="loading">内容加载区域</div>
</textarea>
<textarea source="js">
  LLoading.init();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 自定义内容

你可以自定义加载中组件的文字，背景颜色。

在绑定了 `l-loading` 属性的元素上添加 `l-loading-text` 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。`l-loading-background` 用来设定背景色值。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div 
    style="height:150px;" 
    l-loading="loading2" 
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div 
    style="height:150px;" 
    l-loading="loading" 
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
</textarea>
<textarea source="js">
  LLoading.init();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 全屏

通过传递 `l-loading-fullscreen` 属性将遮罩插入至 `body` 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 `l-loading-lock="false"` 可以允许滚动。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>
