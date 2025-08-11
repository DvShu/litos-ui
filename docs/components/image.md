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

  let $preview;
  let $morePreview;
  let $customPreview;


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
