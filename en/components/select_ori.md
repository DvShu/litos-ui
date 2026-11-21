---
url: https://dvshu.github.io/litos-ui/en/components/select_ori.md
---
# SelectOri

A wrapper around the native `select` element, typically used for single selection.

## Import and Registration

```js
import { SelectOri, regist } from "litos-ui";

regist(SelectOri);
```

## Examples

### Basic Usage

Call `setOptions()` to supply options, or place native `<option>` elements inside the component.

```html
  <l-select-ori value="2">
    <option value="1">Option one</option>
    <option value="2">Option two</option>
    <option value="3">Option three</option>
  </l-select-ori>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/select-ori";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### SelectOri Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected value | `string` | - |
| `name` | Native name attribute | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |

### SelectOri Slots

| Name | Description |
| --- | --- |
| `default` | Option list |

### SelectOri Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when selection changes; event.detail is the selected string value | `(event: CustomEvent<string>)` |

### SelectOri Methods

Use `setOptions()` and `appendOptions()` before or after mounting. A native form submits the selected enabled option. It omits the field when there is no selection or the selected option is disabled.

| Method | Description | Type |
| --- | --- | --- |
| `setOptions` | Replaces the option list | `(options: SelectOption[]): void` |
| `appendOptions` | Appends options to the list | `(options: SelectOption[]): void` |

### SelectOption

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Option value | `string` | - |
| `label` | Option label | `string` | - |
| `disabled` | Whether the option is disabled | `boolean` | `false` |
