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
  import { $one } from 'ph-utils/dom';

  let $preview;
  const imgs = [
    '/litos-ui/img1.svg',
    '/litos-ui/img2.svg',
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  ]

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $preview = $one('#preview');
        $preview.setImages(imgs);
      }
    });
  })

  onUnmounted(() => {
    $preview = undefined;
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

### 手动预览

如果不想通过 `Image` 组件来预览图片，也可以手动通过使用 `ImagePreview` 来预览图片

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image></l-image>
  <l-image-preview id="preview"></l-image-preview>
</textarea>
<div class="source">
<textarea lang="html">
  <l-image></l-image>
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
