# Loading 加载

数据加载时显示的动效。

## 引用

如果没有配合 `litosui-unplugin-resolver` 自动引用，则需要手动引入样式文件

```js
import { Loading as LLoading } from "litos-ui";
import "litos-ui/styles/loading.css";
```

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

  function handleStartLoading() {
    const loading = Loading.create();

    setTimeout(() => {
      loading.hide();
    }, 3000)
  }

  function handleStartBarLoading(e) {
    const id = e.target.getAttribute('data-loading');
    Loading.init(id);
  }

  function handleEndBarLoading(e) {
    const id = e.target.getAttribute('data-loading');
    Loading.close(id);
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        Loading.init('loading1');
        Loading.init('loading2');
        Loading.init('loading5');
        on($one('[l-loading="loading3"]'), 'click', handleLoading);
        on($one('#startLoading'), 'click', handleStartLoading);
        on($one('#startBarLoading'), 'click', handleStartBarLoading);
        on($one('#endBarLoading'), 'click', handleEndBarLoading);
      }
    })
  });

  onUnmounted(() => {
    off($one('[l-loading="loading3"]'), 'click', handleLoading);
    off($one('#startLoading'), 'click', handleStartLoading);
    off($one('#startBarLoading'), 'click', handleStartBarLoading);
    off($one('#endBarLoading'), 'click', handleEndBarLoading);
  });
</script>

### 区域加载

在某一个区域加载数据时展示加载动画，防止页面失去响应，提高用户体验

给节点添加一个 `l-loading` 属性，然后调用 `LLoading.init()` 初始化, 调用 `LLoading.close()` 关闭。

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
  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
</textarea>
<textarea lang="js">
  LLoading.init();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 进度条风格

通过传递 `l-loading-shape="bar"` 参数可以将圆形加载变为进度条风格。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;" 
    l-loading="loading4" 
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;" 
    l-loading="loading4" 
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
</textarea>

<textarea lang="js">
  //-
  function handleStartBarLoading() {
    LLoading.init('loading5');
  }
  //-
  function handleEndBarLoading() {
    LLoading.close('loading5');
  }
  //-
  const $startBarLoading = document.getElementById('startBarLoading');
  const $endBarLoading = document.getElementById('endBarLoading');
  $startBarLoading.addEventListener('click', handleStartBarLoading);
  $endBarLoading.addEventListener('click', handleEndBarLoading);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 边框动画风格

通过传递 `l-loading-shape="border"` 参数可以变为边框加载动画。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px" 
    l-loading="loading5"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px" 
    l-loading="loading5" 
    l-loading-mask="1"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 编程式调用

> 编程式调用依赖于自动引入

通过调用 `create()` 函数来显示加载动画，例如：

```js
const loading = LLoading.create(options);
```

其中 `options` 参数为 `Loading` 的配置项，具体见下表。该会返回一个 `Loading` 实例，可通过调用该实例的 `hide()` 方法来关闭它：

```js
const loading = LLoading.create({});

setTimeout(() => {
  loading.hide();
}, 3000);
```

需要注意的是，以编程方式创建的 `Loading` 默认为全屏的且该全屏 `Loading` 是单例的。 若在前一个全屏 `Loading` 关闭前再次调用全屏 `Loading`，并不会创建一个新的 `Loading` 实例，而是返回现有全屏 `Loading` 的实例，只要其中一个实例关闭，其它都关闭：

```js
const loading1 = LLoading.create();
const loading2 = LLoading.create();

loading2.hide();
```

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="startLoading">开始</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="startLoading">按钮</l-button>
</textarea>
<textarea lang="js">
  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### 配置项

<!-- prettier-ignore -->
| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `to` | 加载条的挂载位置；可传入一个 `DOM` 对象或字符串；若传入字符串，则会将其作为参数传入 `document.querySelector` 以获取到对应 `DOM` 节点 | `string` \| `HTMLElement` | `body` |
| `text` | 显示在加载图标下方的加载文案; 通过传递空字符串可以用于不显示文本 | `string` | `加载中……` |
| `background` | 遮罩层背景色 | `string` | `rgba(0, 0, 0, .6)` |
| `fullscreen` | 是否显示全屏加载动画 | `boolean` | `true` |
| `lock` | 是否禁止滚动 | `boolean` | `true` |
| `shape` | 形状, circle - 圆形, bar - 进度条样式, border - 边框动画 | `string` | `circle` |
| `color` | 颜色 | `string` | `var(--l-primary-color, #722ed1)` |
| `mask` | 是否显示阴影, 0 - 不显示, 1 - 显示, 2 - 自动[circle-显示,bar-不显示] | `number` | `2` |
| `zindex` | z-index 层级 | `string` | `10` |

### 节点属性

<!-- prettier-ignore -->
| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `l-loading-text` | 显示在加载图标下方的加载文案; 当值为 `false` 时则不显示文本 | `加载中……` |
| `l-loading-background` | 遮罩层背景色 | `rgba(0, 0, 0, .6)` |
| `l-loading-fullscreen` | 是否显示全屏加载动画 | `-` |
| `l-loading-lock` | 是否禁止滚动, 当值为 `false` 或 `0` 时则允许滚动 | `true` |
| `l-loading-shape` | 形状 | `circle` |
| `l-loading-color` | 颜色 | `var(--l-primary-color, #722ed1)` |
| `l-loading-mask` | 是否显示阴影, 0 - 不显示, 1 - 显示, 2 - 自动[circle-显示,bar-不显示] | `2` |
| `l-loading-zindex` | z-index 层级 | `10` |
