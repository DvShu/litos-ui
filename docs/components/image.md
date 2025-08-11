# Image 图片

可预览的图片，在保留所有原生 `img` 的特性下，支持懒加载，自定义占位图片、加载失败等

## 引用

```js
import {
  regist,
  Image,
  ImagePreview,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ReductionIcon,
  RefreshLeftIcon,
  RefreshRightIcon,
} from "litos-ui";

regist([Image]);
// 需要图片预览时, 如果禁用图片预览, 则不需要引入下面
regist([
  ImagePreview,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ReductionIcon,
  RefreshLeftIcon,
  RefreshRightIcon,
]);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, $, on, off, $$, iterate } from 'ph-utils/dom';
  import { Popover } from '../../src/components/utils/popover';

  let $preview;
  let $morePreview;
  let $customPreview;
  let tooltip;


  const imgs = [
    '/litos-ui/img1.svg',
    '/litos-ui/img2.svg',
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  ]

  function handlePreviewClosed() {
    if ($preview) {
      off($preview, 'closed', handlePreviewClosed);
      $preview.remove();
      $preview = undefined;
    }
  }

  function handleCustomTap(e) {
    const index = Number(e.target.getAttribute('data-preview-index'));
    if (!$preview) {
      $preview = $$("l-image-preview");
      $preview.setImages(imgs);
      $preview.setCurrentIndex(index);
      on($preview, 'closed', handlePreviewClosed);
      document.body.appendChild($preview);
      $preview.open = true;
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        // 多图预览
        $morePreview = $('.morePreview');
        $morePreview.forEach((item) => {
          item.setPreviewImageList(imgs);
        });
        // 手动预览
        $customPreview = $('.customPreview');
        iterate($customPreview, (item) => {
          on(item, 'click', handleCustomTap);
        });
        // tooltip
        tooltip = new Popover({
          theme: 'tooltip',
        });
      }
    });
  })

  onUnmounted(() => {
    $morePreview = undefined;
    this.handlePreviewClosed();
    if ($customPreview) {
      iterate($customPreview, (item) => {
        off(item, 'click', handleCustomTap);
      });
    }
    if (tooltip) {
      tooltip.destroy();
      tooltip = undefined;
    }
  });

</script>

### 基础用法

通过 `src` 属性来设置图片的地址, 可以通过 `width`、`height` 来设置图片的宽度、高度

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px"></l-image>
</textarea>
</l-code-preview>
</ClientOnly>

### 适应容器

通过设置 `fit` 属性来控制图片的填充模式，可选值有：

- fill: 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。
- contain: 保持原有尺寸比例完整显示在内容区域内，可能会留白。
- cover: 保持原有尺寸比例缩放图片，直到图片至少一边填满内容区域，另一边超出内容区域并被裁剪。
- none: 不改变图像本身的尺寸、密度和方向。
- scale-down: 将图像缩小，以使其适应元素的内容框，同时保持其原始纵横比。如果无法满足这一条件（即图像已经小于或等于元素的大小），则将使用 'none' 值进行替代。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="docs-image-area1">
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="fill"
        class="l-popover-reference"
        data-title="被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框"
      ></l-image>
      <span>fit</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="contain"
        class="l-popover-reference"
        data-title="被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比"
      ></l-image>
      <span>contain</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="cover"
        class="l-popover-reference"
        data-title="被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框"
      ></l-image>
      <span>cover</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="none"
        class="l-popover-reference"
        data-title="被替换的内容本身的尺寸、密度和方向都不改变"
      ></l-image>
      <span>none</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="scale-down"
        class="l-popover-reference"
        data-title="内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些"
      ></l-image>
      <span>scale-down</span>
    </div>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="fill"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="contain"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="cover"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="none"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="scale-down"
  ></l-image>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 多图预览

通过 `setPreviewImageList(imageList?: string[])` 函数来设置多图预览, 可以通过 `preview-index` 属性来设置当前预览的图片索引

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image class="morePreview" src="/litos-ui/img1.svg" width="100px" preview-index="0"></l-image>
  <l-image class="morePreview" src="/litos-ui/img2.svg" width="100px" preview-index="1"></l-image>
  <l-image class="morePreview" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px" preview-index="2"></l-image>
</textarea>
<div class="source">
<textarea lang="html">
  <l-image class="morePreview" src="/litos-ui/img1.svg" width="100px" preview-index="0"></l-image>
  <l-image class="morePreview" src="/litos-ui/img2.svg" width="100px" preview-index="1"></l-image>
  <l-image class="morePreview" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px" preview-index="2"></l-image>
</textarea>
<textarea lang="js">
  import { $, iterate } from 'ph-utils/dom';
  const $morePreview = $('.morePreview');
  iterate($morePreview, (item) => {
    item.setPreviewImageList(imgs);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 禁用预览

通过 `preview-disabled` 属性来禁用图片预览

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image 
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" 
    width="100px" 
    preview-disabled
  ></l-image>
</textarea>
</l-code-preview>
</ClientOnly>

### 懒加载

通过使用浏览器原生支持的 `loading` 属性来开启懒加载，只需要设置 `loading="lazy"`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    loading="lazy"
  ></l-image>
</textarea>
</l-code-preview>
</ClientOnly>

> 从 `ios 15.4` 开始已经全面支持; 对于不支持 `loading="lazy"` 属性的浏览器，可以通过 [loading-attribute-polyfill](https://github.com/mfranzke/loading-attribute-polyfill) 来兼容

### 手动预览

如果不想通过 `Image` 组件来预览图片，也可以手动通过使用 `ImagePreview` 来预览图片

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image 
    class="customPreview" 
    src="/litos-ui/img1.svg" 
    width="100px" 
    data-preview-index="0"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="/litos-ui/img2.svg" 
    width="100px" 
    data-preview-index="1"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" 
    width="100px" 
    data-preview-index="2"
    preview-disabled
  ></l-image>
</textarea>
<div class="source">
<textarea lang="html">
  <l-image 
    class="customPreview" 
    src="/litos-ui/img1.svg" 
    width="100px" 
    data-preview-index="0"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="/litos-ui/img2.svg" 
    width="100px" 
    data-preview-index="1"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" 
    width="100px" 
    data-preview-index="2"
    preview-disabled
  ></l-image>
</textarea>
<textarea lang="js">
  import { $, iterate } from 'ph-utils/dom';
  let $preview;
  const $customPreview = $('.customPreview');
  iterate($customPreview, (item) => {
    on(item, 'click', handleCustomTap);
  });
  function handleCustomTap(e) {
    const index = Number(e.target.getAttribute('data-preview-index'));
    if (!$preview) {
      $preview = $$("l-image-preview");
      $preview.setImages(imgs);
      $preview.setCurrentIndex(index);
      on($preview, 'closed', handlePreviewClosed);
      document.body.appendChild($preview);
      $preview.open = true;
    }
  }
  function handlePreviewClosed() {
    if ($preview) {
      off($preview, 'closed', handlePreviewClosed);
      $preview.remove();
      $preview = undefined;
    }
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Image Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### Image Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Image Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Image Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### Image CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |
