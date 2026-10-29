# Mask

A basic overlay component used as a foundation for floating panels and image previews.

## Import and Registration

```js
import { Mask, Button, regist } from "litos-ui";

regist([Mask, Button]);
```

## Examples

<script setup>
  import { onMounted, onUnmounted } from 'vue';
  if (!import.meta.env.SSR) {
    let $overlay;
    let $open;
    let $close;

    function handleToggle(e) {
      const action = e.target.getAttribute('data-action');
      if (action && $overlay) {
        $overlay.open = action === 'open';
      }
    }

    onMounted(() => {
      requestAnimationFrame(() => {
        $overlay = document.querySelector('#overlay');
        $open = document.querySelector('#open');
        $close = document.querySelector('#close');
        if ($open) {
          $open.addEventListener('click', handleToggle);
        }
        if ($close) {
          $close.addEventListener('click', handleToggle);
        }
      });
    });

    onUnmounted(() => {
      if ($open) {
        $open.removeEventListener('click', handleToggle);
      }
      if ($close) {
        $close.removeEventListener('click', handleToggle);
      }
    });
  }
</script>

### Direct Usage

Register the component with `regist`, then use `<l-mask>` in your markup. Control its visibility with the `open` attribute.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-mask id="overlay" open></l-mask>
  <l-button id="open" data-action="open">Open</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Extending Mask

Extend `Mask` and implement your custom behavior. Set `static baseName = "x";` on the subclass, replacing `x` with your component name, then register it to use `<l-x>` in your markup.

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/mask";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Mask Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `open` | Whether to show the overlay; also controlled by the instance open property | `boolean` | `false` |
| `z-index` | Overlay stacking level; the content layer is one level higher | `number` | `100` |
| `mask-closable` | Whether clicking the overlay closes it | `boolean` | `true` |
| `lock-scroll` | Whether to lock body scrolling while open | `boolean` | `true` |

### Mask Slots

The default slot supplies the overlay panel content.

### Mask Events

<!-- prettier-ignore -->
| Event | Description | Data |
| --- | --- | --- |
| `close` | Fires when closing starts | No detail data |
| `closed` | Fires when the closing animation finishes | No detail data |
| `action` | Fires when a panel action with data-action is clicked | event.detail contains the action string |

### Extension Hooks

Override `contentRender()` to return a string, HTMLElement, or DocumentFragment. Use `afterOpened()` and `afterClosed()` for post-open and post-close logic, or handle actions in `onAction(action)`. To control visibility externally, use `element.open = true` or set the `open` attribute.

### CSS Variables and Parts

`--l-mask-zindex` defaults to `100`. The component exposes the `mask` and `panel` parts; use `::part()` to customize the overlay and content layers.