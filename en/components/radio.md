---
url: https://dvshu.github.io/litos-ui/en/components/radio.md
---
# Radio

Select one option from a group.

## Import and Registration

```js
import { RadioGroup, Radio, regist } from "litos-ui";

regist([RadioGroup, Radio]);
```

## Examples

### Basic Usage

For a standalone radio, use the boolean `checked` state to control selection. Supply custom label content through the default slot.

```html
<l-radio>
  <span>
    <span>I agree to the</span>
    <a href='#'>Privacy policy</a>
  </span>
</l-radio>
```

### Disabled State

Set `disabled` to disable the option.

```html
  <l-radio disabled label="Disabled"></l-radio>
```

### Radio Group

Combine radio options inside `l-radio-group` for single selection.

A native form submits one selected value under the group's `name`. It omits the value if the selected option is disabled.

```html
  <l-radio-group value="1" gap="15">
    <l-radio label="Female" value="0"></l-radio>
    <l-radio label="Male" value="1"></l-radio>
  </l-radio-group>
```

### Button Style

Add `button` to each `l-radio` in a group for button styling.

```html
  <l-radio-group value="0">
    <l-radio label="Female" value="0" button></l-radio>
    <l-radio label="Unknown" value="-1" button></l-radio>
    <l-radio label="Male" value="1" button></l-radio>
  </l-radio-group>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/radio";
import "litos-ui/radio-group";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Radio Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Native name attribute | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `button` | Whether to use button styling | `boolean` | `false` |
| `value` | Option value | `string` | - |
| `checked` | Whether the option is checked | `boolean` | `false` |
| `label` | Label text | `string` | - |

### Radio Properties

| Name | Description | Type |
| --- | --- | --- |
| `checked` | Current checked state | `boolean` |
| `defaultChecked` | Checked state restored on reset, reflected by the `checked` attribute | `boolean` |

See [Common Form Control APIs](https://dvshu.github.io/litos-ui/en/components/form.md#common-form-control-apis) for field names, defaults, validity, and reset methods.

### Radio Slots

| Name | Description |
| --- | --- |
| `default` | Radio label content |

### Radio Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | For an individual option, detail contains value, name, and checked; the group event provides the selected value in detail.value | `(event: CustomEvent)` |

### RadioGroup Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected option value | `string` | - |
| `name` | Form field name for the group | `string` | Not set |
| `disabled` | Disables all options in the group | `boolean` | `false` |
| `required` | Requires a selected value that can be submitted | `boolean` | `false` |
| `gap` | Spacing between options. Plain numbers are treated as pixels | `string` | `0px` |
| `form` | Associated native form ID. An explicit ID takes precedence | `string` | Associated automatically |

See [Common Form Control APIs](https://dvshu.github.io/litos-ui/en/components/form.md#common-form-control-apis) for `value`, `defaultValue`, validity, and reset methods.

Provide options as `l-radio` children. There is currently no `setItems()` method.

### Radio CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-check-size` | Radio size | `14px` |
