# Loading

Animated indicators shown while data is loading.

## Import and Registration

Import the stylesheet manually unless it is supplied by your resolver configuration.

```js
import { Loading as LLoading } from "litos-ui";
import "litos-ui/styles/loading.css";
```

## Examples

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import Loading from '../../../src/components/loading';
  import { on, off, $one } from 'utilane/browser';

  const listeners = [];
  let disposed = false;

  function bindClick(selector, handler) {
    const element = $one(selector);
    if (element) {
      on(element, 'click', handler);
      listeners.push([element, handler]);
    }
  }

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

  function handleUpdateText() {
    const loading1 = Loading.create({
      to: '#startLoading1Parent',
      fullscreen: false
    });

    setTimeout(() => {
      loading1.updateLoadingText("Reloading...");
    }, 3000);

    setTimeout(() => {
      loading1.hide();
    }, 6000);
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
      if (!import.meta.env.SSR && !disposed) {
        Loading.init('loading1');
        Loading.init('loading2');
        Loading.init('loading5');
        bindClick('[l-loading="loading3"]', handleLoading);
        bindClick('#startLoading', handleStartLoading);
        bindClick('#startBarLoading', handleStartBarLoading);
        bindClick('#endBarLoading', handleEndBarLoading);
        bindClick('#startLoading1', handleUpdateText);
      }
    })
  });

  onUnmounted(() => {
    disposed = true;
    for (const [element, handler] of listeners) {
      off(element, 'click', handler);
    }
    listeners.length = 0;
  });
</script>

### Regional Loading

Show a loading indicator over a region while its data is being loaded.

Add `l-loading` to an element, call `LLoading.init()` to show the indicator, and call `LLoading.close()` to close it.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:150px;" l-loading="loading1">Content loading area</div>
</textarea>
<div class="source">
<textarea lang="html">
  <div l-loading="loading">Content loading area</div>
</textarea>
<textarea source="js">
  LLoading.init();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Custom Content

Customize the loading text and background color.

Add `l-loading-text` to an element with `l-loading` to show text below the spinner. Set it to `false` or `0` to hide the text; an empty attribute uses the default text. Use `l-loading-background` to set the overlay background.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div
    style="height:150px;"
    l-loading="loading2"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    Content loading area
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
    Content loading area
  </div>
</textarea>
<textarea source="js">
  LLoading.init();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Fullscreen

Add `l-loading-fullscreen` to mount the overlay on `body` and display a fullscreen indicator. Scrolling is locked by default; set `l-loading-lock="false"` to allow scrolling.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button l-loading="loading3" l-loading-fullscreen>Load</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button l-loading="loading3" l-loading-fullscreen>Load</l-button>
</textarea>
<textarea lang="js">
  LLoading.init();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Progress Bar

Set `l-loading-shape="bar"` to use a progress bar instead of a circular spinner.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">Start</l-button>
    <l-button id="endBarLoading" data-loading="loading4">Stop</l-button>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">Start</l-button>
    <l-button id="endBarLoading" data-loading="loading4">Stop</l-button>
  </div>
</textarea>

<textarea lang="js">
  //-
  function handleStartBarLoading() {
    LLoading.init('loading4');
  }
  //-
  function handleEndBarLoading() {
    LLoading.close('loading4');
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

### Animated Border

Set `l-loading-shape="border"` to use an animated border.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-shape="border"
  >
    Content loading area
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
    Content loading area
  </div>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Imperative API

> Import the Loading API and loading.css explicitly for imperative usage.

Call `create()` to show a loading indicator:

```js
const loading = LLoading.create(options);
```

The `options` argument configures the indicator; see the options table below. The returned instance provides a `hide()` method:

```js
const loading = LLoading.create({});

setTimeout(() => {
  loading.hide();
}, 3000);
```

Imperative indicators are fullscreen by default. Fullscreen calls share a single DOM indicator: another call creates a new wrapper instance around the existing fullscreen node. Hiding either wrapper closes the shared indicator:

```js
const loading1 = LLoading.create();
const loading2 = LLoading.create();

loading2.hide();
```

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="startLoading">Start</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="startLoading">Button</l-button>
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

Update the text of an imperative indicator with `loading1.updateLoadingText(str)`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">Start</l-button>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">Start</l-button>
  </div>
</textarea>
<textarea lang="js">
  const $startLoading = document.getElementById('startLoading1');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create({ to: '#startLoading1Parent', fullscreen: false });
    setTimeout(() => {
      loading.updateLoadingText("Reloading...");
    }, 3000);
    setTimeout(() => {
      loading.hide();
    }, 6000);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/loading.css";
import Loading from "litos-ui/loading";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

The built-in loading text is Chinese. Set `text` for imperative calls or `l-loading-text` on an element to provide English text. The background and color defaults below are CSS fallbacks; JavaScript leaves them unset.

Implementation limits: element-based `l-loading-mask` is currently read by presence, so any supplied value enables the overlay. `l-loading-zindex` is not read by the initializer; set `--l-loading-zindex` in CSS instead. Use imperative `mask` and `zindex` options when needed.

## API

### Options

<!-- prettier-ignore -->
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `to` | Mount target: an HTMLElement or a selector resolved with document.querySelector | `string` \| `HTMLElement` | `body` |
| `text` | Text below the circular spinner; pass an empty string to hide it | `string` | `加载中……` |
| `background` | Overlay background | `string` | `rgba(0, 0, 0, .7)` |
| `fullscreen` | Whether to show a fullscreen indicator | `boolean` | `true` |
| `lock` | Whether to lock scrolling | `boolean` | `true` |
| `shape` | Shape: circle (spinner), bar (progress bar), or border (animated border) | `string` | `circle` |
| `color` | Color | `string` | `var(--l-primary-color, #722ed1)` |
| `mask` | Overlay: 0 hides it, 1 shows it, 2 shows it for circle only | `number` | `2` |
| `zindex` | Overlay stacking level; CSS fallback is 10, or 50 for fullscreen | `number` | Not set |

### Element Attributes

<!-- prettier-ignore -->
| Attribute | Description | Default |
| --- | --- | --- |
| `l-loading-text` | Text below the circular spinner; false or 0 hides it | `加载中……` |
| `l-loading-background` | Overlay background | `rgba(0, 0, 0, .7)` |
| `l-loading-fullscreen` | Whether to show a fullscreen indicator | `-` |
| `l-loading-lock` | Whether to lock scrolling; false or 0 allows scrolling | `true` |
| `l-loading-shape` | Shape | `circle` |
| `l-loading-color` | Color | `var(--l-primary-color, #722ed1)` |
| `l-loading-mask` | Overlay: 0 hides it, 1 shows it, 2 shows it for circle only | `2` |
| `l-loading-zindex` | Stacking level (z-index) | `10` |