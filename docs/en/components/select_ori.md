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

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select-ori value="2">
    <option value="1">Option one</option>
    <option value="2">Option two</option>
    <option value="3">Option three</option>
  </l-select-ori>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/select-ori";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### SelectOri Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected value | `string` | - |
| `name` | Native name attribute | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |

### SelectOri Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Option list |

### SelectOri Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when selection changes; event.detail is the selected string value | `(event: CustomEvent<string>)` |

### SelectOri Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `setOptions` | Replaces the option list | `(options: SelectOption[]): void` |
| `appendOptions` | Appends options to the list | `(options: SelectOption[]): void` |

### SelectOption

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Option value | `string` | - |
| `label` | Option label | `string` | - |