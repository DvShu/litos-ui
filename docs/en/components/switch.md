# Switch

Toggle between two opposing states, commonly on and off.

## Import and Registration

```js
import { Switch, regist } from "litos-ui";

regist(Switch);
```

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'utilane/browser';

  let $customSwitch;

  onMounted(() => {
    if (!import.meta.env.SSR) {
      nextTick(() => {
        $customSwitch = $one('#custom-switch');
        if ($customSwitch != null) {
          $customSwitch.setActionRender((cfg) => {
            if (cfg.checked) {
              return '<l-moon-icon></l-moon-icon>';
            } else {
              const $dom = document.createElement('l-sun-icon');
              return $dom;
            }
          });
        }
      })
    }
  });
</script>

### Basic Usage

Use a boolean `value` to represent the on (true) and off (false) states.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch></l-switch>
</textarea>
</l-code-preview>
</ClientOnly>

### Text Labels

Set `checked-text` and `unchecked-text` to describe the on and off states.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch checked-text="Y" unchecked-text="N"></l-switch>
</textarea>
</l-code-preview>
</ClientOnly>

### Custom Action Icons

```js
import { MoonIcon, SunIcon, regist } from "litos-ui";
regist([MoonIcon, SunIcon]);
```

Use the `checked-action` and `unchecked-action` slots for on and off icons, or call `setActionRender()` with a renderer.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <l-switch id="custom-switch"></l-switch>
</textarea>
<div class="source">
<textarea lang="html">
  <!-- Use the checked-action and unchecked-action slots. -->
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <!-- Set the renderer with JavaScript. -->
  <l-switch id="custom-switch"></l-switch>
</textarea>
<textarea lang="js">
  let $customSwitch = document.querySelector('#custom-switch');
  // Set actionRender.
  $customSwitch.setActionRender((cfg) => {
    if (cfg.checked) {
      return '<l-moon-icon></l-moon-icon>';
    } else {
      const $dom = document.createElement('l-sun-icon');
      return $dom;
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/switch";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Switch Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Whether the switch is on | `boolean` | `false` |
| `checked-text` | Text for the on state | `string` | - |
| `unchecked-text` | Text for the off state | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `name` | Native name attribute | `string` | - |

### Switch Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `checked-action` | Action icon for the on state |
| `unchecked-action` | Action icon for the off state |

### Switch Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the switch state changes; read the component value property for the current state | `(event: CustomEvent)` |

### Switch Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `setActionRender` | Sets the action icon renderer | `((cfg: { checked: boolean }) => string \| HTMLElement): void` |

### Switch CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-switch-height` | Switch height | `22px` |
| `--l-switch-width` | Switch width | `40px` |