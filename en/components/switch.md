---
url: https://dvshu.github.io/litos-ui/en/components/switch.md
---
# Switch

Toggle between two opposing states, commonly on and off.

## Import and Registration

```js
import { Switch, regist } from "litos-ui";

regist(Switch);
```

## Examples

### Basic Usage

Use a boolean `value` to represent the on (true) and off (false) states.

```html
  <l-switch></l-switch>
```

### Text Labels

Set `checked-text` and `unchecked-text` to describe the on and off states.

```html
  <l-switch checked-text="Y" unchecked-text="N"></l-switch>
```

### Custom Action Icons

```js
import { MoonIcon, SunIcon, regist } from "litos-ui";
regist([MoonIcon, SunIcon]);
```

Use the `checked-action` and `unchecked-action` slots for on and off icons, or call `setActionRender()` with a renderer.

```html
  <!-- Use the checked-action and unchecked-action slots. -->
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <!-- Set the renderer with JavaScript. -->
  <l-switch id="custom-switch"></l-switch>
```

```js
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
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/switch";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

The `value` property is a boolean. A native form submits `"true"` when the switch is on and `"false"` when it is off. With `required` set, the switch must be on to pass required validation.

### Switch Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Whether the switch is on | `boolean` | `false` |
| `checked-text` | Text for the on state | `string` | - |
| `unchecked-text` | Text for the off state | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `name` | Native name attribute | `string` | - |

### Switch Slots

| Name | Description |
| --- | --- |
| `checked-action` | Action icon for the on state |
| `unchecked-action` | Action icon for the off state |

### Switch Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the switch state changes; read the component value property for the current state | `(event: CustomEvent)` |

### Switch Methods

| Method | Description | Type |
| --- | --- | --- |
| `setActionRender` | Sets the action icon renderer | `((cfg: { checked: boolean }) => string \| HTMLElement): void` |

### Switch CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-switch-height` | Switch height | `22px` |
| `--l-switch-width` | Switch width | `40px` |
