---
url: https://dvshu.github.io/litos-ui/en/components/tag.md
---
# Tag

Display short labels or attributes.

## Import and Registration

```js
import { regist, Tag, CloseIcon, Button } from "litos-ui";

regist(Tag);
regist(CloseIcon); // Required when closeable is enabled.
```

## Examples

### Basic Usage

Choose a tag style with the `type` attribute.

```html
  <l-tag type="primary">Tag</l-tag>
  <l-tag type="success">Tag</l-tag>
  <l-tag type="info">Tag</l-tag>
  <l-tag type="warning">Tag</l-tag>
  <l-tag type="error">Tag</l-tag>
  <l-tag type="blue">Tag</l-tag>
```

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

```html
  <l-tag data-custom-color="jade">Jade</l-tag>
  <l-tag data-custom-color="blue">Blue</l-tag>
  <l-tag data-custom-color="orange">Orange</l-tag>
```

```js
import { generateTagColor } from "litos-ui/utils";
const jade = document.querySelector('l-tag[data-custom-color="jade"]');
const blue = document.querySelector('l-tag[data-custom-color="blue"]');
const orange = document.querySelector('l-tag[data-custom-color="orange"]');
jade.color = generateTagColor("#00AA7E");
blue.setColor(generateTagColor("#1e9fff"));
orange.color = generateTagColor("#FF7802");
```

### Removable Tags

Add `closeable` to show a close button, then handle the `close` event to remove the tag.

```html
  <l-tag type="primary" closeable>Tag</l-tag>
  <l-tag type="success" closeable>Tag</l-tag>
  <l-tag type="info" closeable>Tag</l-tag>
  <l-tag type="warning" closeable>Tag</l-tag>
  <l-tag type="error" closeable>Tag</l-tag>
```

> Import and register `CloseIcon`.

### Transitions

Use `transition` from `utilane/browser` to animate tags as they appear or are removed. See [Transition](https://dvshu.github.io/litos-ui/en/components/transition.md).

```html
  <l-button id="btn-add">Add</l-button>
  <hr />
  <div id="tag-container"></div>
```

```js
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
```

> This example uses built-in transition names. Import `litos-ui/styles/transition.css` explicitly.
> You can also pass CSS property transitions, for example: `transition(target, [["opacity", "0", "0.3s"]], "enter")`

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/tag";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Tag Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Type | `string` | `info`; Available values: `primary`, `success`, `info`, `warning`, `error` |
| `closeable` | Whether to show the close button | `boolean` | `false` |

### Tag Properties

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | Custom color variable object; `undefined` or `{}` clears custom colors while preserving other inline styles; the HTML `color` attribute is not supported | `TagColor \| undefined` | `undefined` |

### Tag Slots

| Name | Description |
| --- | --- |
| `default` | Content |

### Tag Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `click` | Fires when clicked | `(event: Event)` |
| `close` | Fires when the close button is clicked; remove the tag in the handler | `(event: CustomEvent)` |

### Tag Methods

| Method | Description | Type |
| --- | --- | --- |
| `setColor(value?)` | Replaces color variables, equivalent to assigning `color`; omit the argument or pass `{}` to reset while preserving other inline styles | `(value?: TagColor) => void` |

### Color Generator

```text
generateTagColor(color: string): TagColor
```

Import `generateTagColor` from `litos-ui/utils` or the root entry.

| Parameter | Type | Description |
| --- | --- | --- |
| `color` | `string` | Base color, such as `"#00AA7E"`; an empty or whitespace-only string returns `{}` |

**Returns:** A `TagColor` object containing text and border colors with a matching light background.

`TagColor` is an optional string mapping of these three CSS variables and allows partial overrides; import it with `import type { TagColor } from "litos-ui/utils"` or from the root entry.

### Tag CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-tag-height` | Tag height | `22px` |
| `--l-tag-border-color` | Tag border color | `#dedede` |
| `--l-tag-background` | Tag background | `#fff` |
| `--l-tag-color` | Tag text color | `#333` |
