# MdInput

A Material Design input.

## Import and Registration

```js
import { MdInput, regist } from "litos-ui";

regist(MdInput);
```

## Examples

### Basic Usage

Basic usage of `l-md-input`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-md-input label="Name" outline></l-md-input>
</textarea>
<div class="source">
<textarea lang="html">
  <l-md-input label="Name" outline></l-md-input>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Autofill

Set `autocomplete` to provide an autofill hint. Use `html-type="password"` for passwords. When unset, the field inherits the [Form](/en/components/form#form-wide-autofill) default. Removing the field's setting restores inheritance.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-md-input label="Email" name="email" autocomplete="email"></l-md-input>
  <l-md-input label="Set a password" name="password" html-type="password" autocomplete="new-password"></l-md-input>
</textarea>
</l-code-preview>
</ClientOnly>

The browser decides whether to offer autofill. Password managers can still fill fields with `off`.

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/md-input";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### MdInput Attributes

The component reads `label`, `outline`, and `inputmode` when it mounts. You can update `value`, `name`, `disabled`, `html-type`, and `autocomplete` at runtime.

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Floating input label | `string` | - |
| `outline` | Whether to show an outline | `boolean` | `false` |
| `html-type` | Native input type: text, number, password, or tel | `string` | `text` |
| `inputmode` | Native input mode | `string` | - |
| `autocomplete` | Browser autofill hint, such as `on`, `off`, `email`, `current-password`, `new-password`, or a `section-*` combination | `string` | Not set |
| `name` | Form field name | `string` | - |
| `value` | Default value restored on form reset | `string` | `""` |
| `disabled` | Whether the control is disabled | `boolean` | `false` |

The `value` property and the native submission value are both strings. Clearing the input submits an empty string.

Passwords can be submitted and autofilled. The component excludes them from form history restoration state. The browser's back-forward cache and password manager operate independently.

### MdInput Properties

<!-- prettier-ignore -->
| Name | Description | Type |
| --- | --- | --- |
| `autocomplete` | Reflects the attribute of the same name. Assign `""` to remove it | `string` |
| `htmlType` | Reflects `html-type`. Removing the attribute restores `text` | `"text" \| "number" \| "password" \| "tel"` |

### Events and Methods

Read the current input through the component’s `value` property. The component does not emit a separate custom change event; native input events do not provide `event.detail.value`.

`setValue(value)` updates the component value and the mounted native input. The default slot is not rendered.

### CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-input-width` | Input width | `180px` |
| `--l-form-control-height` | Input height | `40px` (with vars.css; component fallback: 32px) |