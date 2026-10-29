# Image

An image component with preview, native image attributes, lazy loading, placeholders, and error fallbacks.

## Import and Registration

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
// Register these components when image preview is enabled.
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

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, $, on, off, $$, iterate } from 'utilane/browser';
  import { Popover } from '../../../src/components/utils/popover';

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
        // Multiple-image preview
        $morePreview = $('.morePreview');
        $morePreview.forEach((item) => {
          item.setPreviewImageList(imgs);
        });
        // Manual preview
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
    handlePreviewClosed();
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

### Basic Usage

Set the image URL with `src`, and its dimensions with `width` and `height`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px"></l-image>
</textarea>
</l-code-preview>
</ClientOnly>

### Object Fit

Set `fit` to control how the image fits its container:

- fill: Stretch the image to fill the content box. Its aspect ratio may change.
- contain: Fit the entire image inside the content box while preserving its aspect ratio; empty space may remain.
- cover: Fill the content box while preserving the aspect ratio, cropping any overflow.
- none: Keep the image at its intrinsic size.
- scale-down: Use the smaller result of none and contain, preserving the aspect ratio without enlarging the image.

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
        data-title="Stretch to fill the content box; the aspect ratio may change."
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
        data-title="Fit the entire image while preserving its aspect ratio."
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
        data-title="Fill the content box while preserving the aspect ratio, cropping overflow."
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
        data-title="Keep the image at its intrinsic size."
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
        data-title="Use the smaller image size produced by none and contain."
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

### Placeholder

Set `placeholder` to an image displayed while the main image loads. For progressive loading of large images, use a blurred version of the original.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image src="/litos-ui/img1.svg" width="100px" placeholder="/litos-ui/img_loading.png"></l-image>
</textarea>
</l-code-preview>
</ClientOnly>

### Error Fallback

Set `fallback` to an image URL displayed on failure. To provide custom fallback content, enable `custom-fallback` and use the `fallback` slot.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-image src="/litos-ui/img3.svg" width="100px" height="100px" fallback="/litos-ui/loading_error.png"></l-image>
  <l-image src="/litos-ui/img3.svg" width="100px" height="100px" custom-fallback>
    <span slot="fallback">error</span>
  </l-image>
</textarea>
</l-code-preview>
</ClientOnly>

### Multiple-image Preview

Call `setPreviewImageList(imageList?: string[])` to supply the preview images, and set `preview-index` to choose the initial image.

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
  import { $, $$, on, off, iterate } from 'utilane/browser';
  const imgs = [
    '/litos-ui/img1.svg',
    '/litos-ui/img2.svg',
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  ];
  const $morePreview = $('.morePreview');
  iterate($morePreview, (item) => {
    item.setPreviewImageList(imgs);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Disabling Preview

Set `preview-disabled` to disable image preview.

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

### Lazy Loading

Set `loading="lazy"` to use native browser lazy loading.

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

> Lazy loading depends on browser support. If needed, evaluate [loading-attribute-polyfill](https://github.com/mfranzke/loading-attribute-polyfill) for your target browsers.

### Manual Preview

Use `ImagePreview` directly to preview images without relying on the `Image` component.

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
  import { $, $$, on, off, iterate } from 'utilane/browser';
  const imgs = [
    '/litos-ui/img1.svg',
    '/litos-ui/img2.svg',
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  ];
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

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/image";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Image Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `src` | Required image URL, matching the native src attribute | `string` | — |
| `width` | Width | `string` | - |
| `height` | Height | `string` | - |
| `alt` | Native alt attribute | `string` | - |
| `loading` | Native browser image loading strategy | `eager`, `lazy` | `eager` |
| `fit` | How the image fits its container; see [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | `string` | - |
| `fallback` | Image URL displayed when loading fails | `string` | - |
| `custom-fallback` | Whether to use custom fallback content | `boolean` | `false` |
| `placeholder` | Placeholder image displayed while the main image loads | `string` | - |
| `preview-disabled` | Whether to disable image preview | `boolean` | `false` |
| `preview-image-list` | Comma-separated preview image URLs | `string` | - |
| `preview-index` | Initial preview image index | `number` | `0` |

### Image Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Content |
| `fallback` | Content displayed when image loading fails |

### Image Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `click` | Fires when the image is clicked | `(event: Event)` |

### Image Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `setPreviewImageList(imageList: string[] \| undefined)` | Sets the preview image URLs | `void` |
| `setPreviewIndex(index: number)` | Sets the preview image index | `void` |
| `openPreview()` | Opens the preview | `void` |
| `closePreview()` | Closes the preview | `void` |

### Image CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| - | - | - |