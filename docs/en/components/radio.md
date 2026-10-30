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

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<l-radio>
  <span>
    <span>I agree to the</span>
    <a href='#'>Privacy policy</a>
  </span>
</l-radio>
</textarea>
</l-code-preview>
</ClientOnly>

### Disabled State

Set `disabled` to disable the option.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-radio disabled label="Disabled"></l-radio>
</textarea>
</l-code-preview>
</ClientOnly>

### Radio Group

Combine radio options inside `l-radio-group` for single selection.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-radio-group value="1" gap="15">
    <l-radio label="Female" value="0"></l-radio>
    <l-radio label="Male" value="1"></l-radio>
  </l-radio-group>
</textarea>
</l-code-preview>
</ClientOnly>

### Button Style

Add `button` to each `l-radio` in a group for button styling.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-radio-group value="0">
    <l-radio label="Female" value="0" button></l-radio>
    <l-radio label="Unknown" value="-1" button></l-radio>
    <l-radio label="Male" value="1" button></l-radio>
  </l-radio-group>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/radio";
import "litos-ui/radio-group";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Radio Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Native name attribute | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `button` | Whether to use button styling | `boolean` | `false` |
| `value` | Option value | `string` | - |
| `checked` | Whether the option is checked | `boolean` | `false` |
| `label` | Label text | `string` | - |

### Radio Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Radio label content |

### Radio Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | For an individual option, detail contains value, name, and checked; the group event provides the selected value in detail.value | `(event: CustomEvent)` |

### RadioGroup Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected option value | `string` | - |
| `gap` | Spacing between options | `string` | - |

Provide options as `l-radio` children. There is currently no `setItems()` method.

### Radio CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-check-size` | Radio size | `14px` |