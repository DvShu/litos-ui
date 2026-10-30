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

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/md-input";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### MdInput Initialization Attributes

Except for disabled, the attributes below are primarily read when the component connects. Not all attributes support dynamic updates; initialization options do not imply full controlled-form behavior.

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Floating input label | `string` | - |
| `outline` | Whether to show an outline | `boolean` | `false` |
| `html-type` | Native input type: text, number, password, or tel | `string` | `text` |
| `inputmode` | Native input mode | `string` | - |
| `name` | Form field name | `string` | - |

The current implementation does not fully synchronize the initial value with the native input or forward disabled to it. These behaviors are not demonstrated as supported; they require separate component changes.

### Events and Methods

Read the current input through the component’s `value` property. The component does not emit a separate custom change event; native input events do not provide `event.detail.value`.

`setValue(value)` updates the component value and the mounted native input. The default slot is not rendered.

### CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-input-width` | Input width | `180px` |
| `--l-form-control-height` | Input height | `40px` (with vars.css; component fallback: 32px) |