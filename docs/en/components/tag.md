# Tag

Display short labels or attributes.

## Import and Registration

```js
import { regist, Tag, CloseIcon, Button } from "litos-ui";

regist(Tag);
regist(CloseIcon); // Required when closeable is enabled.
```

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { transition } from 'utilane/browser';
  import { generateTagColor } from '../../../src/components/utils';

  let disposed = false;
  let $addBtn;
  let $tagContainer;

  function handleAddTag() {
    if ($tagContainer) {
      let $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closeable', 'true');
      $addTag.setAttribute('type', 'primary');
      $addTag.style.marginRight = "5px";
      $addTag.innerHTML = 'Tag';
      $tagContainer.appendChild($addTag);
      transition($addTag, 'l-scale', "enter");
      $addTag = null;
    }
  }

  function onClose(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }

  onMounted(async () => {
    if (import.meta.env.SSR) return;
    await nextTick();
    if (disposed) return;
    const jade = document.querySelector('l-tag[data-custom-color="jade"]');
    const blue = document.querySelector('l-tag[data-custom-color="blue"]');
    const orange = document.querySelector('l-tag[data-custom-color="orange"]');
    if (jade) jade.color = generateTagColor('#00AA7E');
    if (blue) blue.setColor(generateTagColor('#1e9fff'));
    if (orange) orange.color = generateTagColor('#FF7802');
    $addBtn = document.getElementById('btn-add');
    $tagContainer = document.getElementById('tag-container');
    $tagContainer?.addEventListener('close', onClose);
    $addBtn?.addEventListener('click', handleAddTag);
  });

  onUnmounted(() => {
    disposed = true;
    $tagContainer?.removeEventListener('close', onClose);
    $addBtn?.removeEventListener('click', handleAddTag);
  });
</script>

### Basic Usage

Choose a tag style with the `type` attribute.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag type="primary">Tag</l-tag>
  <l-tag type="success">Tag</l-tag>
  <l-tag type="info">Tag</l-tag>
  <l-tag type="warning">Tag</l-tag>
  <l-tag type="error">Tag</l-tag>
  <l-tag type="blue">Tag</l-tag>
</textarea>
</l-code-preview>
</ClientOnly>

> Pass a custom `type` and define `.l-tag--xx` in CSS for a custom style.

```css
.l-tag--blue {
  --l-tag-color: #4998f6;
  --l-tag-background: #e8f5ff;
  --l-tag-border-color: #4998f6;
}
```

### Custom Colors

Set colors through the JavaScript `color` property or `setColor()`, using `generateTagColor()` to generate the palette.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag data-custom-color="jade">Jade</l-tag>
  <l-tag data-custom-color="blue">Blue</l-tag>
  <l-tag data-custom-color="orange">Orange</l-tag>
</textarea>
<div class="source">
<textarea lang="html">
  <l-tag data-custom-color="jade">Jade</l-tag>
  <l-tag data-custom-color="blue">Blue</l-tag>
  <l-tag data-custom-color="orange">Orange</l-tag>
</textarea>
<textarea lang="js">
import { generateTagColor } from "litos-ui/utils";
const jade = document.querySelector('l-tag[data-custom-color="jade"]');
const blue = document.querySelector('l-tag[data-custom-color="blue"]');
const orange = document.querySelector('l-tag[data-custom-color="orange"]');
jade.color = generateTagColor("#00AA7E");
blue.setColor(generateTagColor("#1e9fff"));
orange.color = generateTagColor("#FF7802");
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Removable Tags

Add `closeable` to show a close button, then handle the `close` event to remove the tag.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag type="primary" closeable>Tag</l-tag>
  <l-tag type="success" closeable>Tag</l-tag>
  <l-tag type="info" closeable>Tag</l-tag>
  <l-tag type="warning" closeable>Tag</l-tag>
  <l-tag type="error" closeable>Tag</l-tag>
</textarea>
</l-code-preview>
</ClientOnly>

> Import and register `CloseIcon`.

### Transitions

Use `transition` from `utilane/browser` to animate tags as they appear or are removed. See [Transition](/en/components/transition).

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<l-button id="btn-add">Add</l-button>
<hr />
<div id="tag-container"></div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="btn-add">Add</l-button>
  <hr />
  <div id="tag-container"></div>
</textarea>
<textarea lang="js">
  import { transition } from 'utilane/browser';
  //-
  function handleAddTag() {
    if ($tagContainer) {
      let $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closeable', 'true');
      $addTag.setAttribute('type', 'primary');
      $addTag.style.marginRight = "5px";
      $addTag.innerHTML = 'Tag';
      $tagContainer.appendChild($addTag);
      transition($addTag, 'l-scale', "enter");
      $addTag = null;
    }
  }
  //-
  function onClose(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }
  //-
  const $addBtn = document.getElementById('btn-add');
  const $tagContainer = document.getElementById('tag-container');
  $tagContainer.addEventListener('close', onClose);
  $addBtn.addEventListener('click', handleAddTag);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> This example uses built-in transition names. Import `litos-ui/styles/transition.css` explicitly.
> You can also pass CSS property transitions, for example: `transition(target, [["opacity", "0", "0.3s"]], "enter")`

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/tag";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Tag Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Type | `string` | `info`; Available values: `primary`, `success`, `info`, `warning`, `error` |
| `closeable` | Whether to show the close button | `boolean` | `false` |

### Tag Properties

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | Custom color variable object; `undefined` or `{}` clears custom colors while preserving other inline styles; the HTML `color` attribute is not supported | `TagColor \| undefined` | `undefined` |

### Tag Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Content |

### Tag Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `click` | Fires when clicked | `(event: Event)` |
| `close` | Fires when the close button is clicked; remove the tag in the handler | `(event: CustomEvent)` |

### Tag Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `setColor(value?)` | Replaces color variables, equivalent to assigning `color`; omit the argument or pass `{}` to reset while preserving other inline styles | `(value?: TagColor) => void` |

### Color Generator

```text
generateTagColor(color: string): TagColor
```

Import `generateTagColor` from `litos-ui/utils` or the root entry.

<!-- prettier-ignore -->
| Parameter | Type | Description |
| --- | --- | --- |
| `color` | `string` | Base color, such as `"#00AA7E"`; an empty or whitespace-only string returns `{}` |

**Returns:** A `TagColor` object containing text and border colors with a matching light background.

`TagColor` is an optional string mapping of these three CSS variables and allows partial overrides; import it with `import type { TagColor } from "litos-ui/utils"` or from the root entry.

### Tag CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-tag-height` | Tag height | `22px` |
| `--l-tag-border-color` | Tag border color | `#dedede` |
| `--l-tag-background` | Tag background | `#fff` |
| `--l-tag-color` | Tag text color | `#333` |