# Tag

Display short labels or attributes.

## Import and Registration

```js
import { regist, Tag, CloseIcon, Button } from "litos-ui";

regist(Tag);
regist(CloseIcon); // Required when closeable is enabled.

// Register additional components used in this page’s demos.
regist([Button]);
```

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { transition } from 'utilane/browser';

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

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $addBtn = document.getElementById('btn-add');
        $tagContainer = document.getElementById('tag-container');
        $tagContainer.addEventListener('close', onClose);
        $addBtn.addEventListener('click', handleAddTag);
      }
    });
  });

  onUnmounted(() => {
    $tagContainer?.removeEventListener('close', onClose);
    $addBtn?.removeEventListener('click', handleAddTag);
  });
</script>

### Basic Usage

Choose a tag style with `type`, or set `color` for a custom background.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag type="primary">Tag</l-tag>
  <l-tag type="success">Tag</l-tag>
  <l-tag type="info">Tag</l-tag>
  <l-tag type="warning">Tag</l-tag>
  <l-tag type="error">Tag</l-tag>
  <l-tag color="#409eff">Tag</l-tag>
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
  <l-tag color="#409eff" closeable>Tag</l-tag>
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
| `color` | Tag color | `string` | - |
| `closeable` | Whether to show the close button | `boolean` | `false` |

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
| - | - | - |

### Tag CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-tag-height` | Tag height | `22px` |
| `--l-tag-border-color` | Tag border color | `#dedede` |
| `--l-tag-background` | Tag background | `#fff` |
| `--l-tag-color` | Tag text color | `#333` |