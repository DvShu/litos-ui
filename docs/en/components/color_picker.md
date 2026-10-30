# ColorPicker

Choose a color.

## Import and Registration

```js
import { ColorPicker, regist } from "litos-ui";

regist(ColorPicker);
```

## Examples

### Basic Usage

Set the initial color with `value`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-color-picker value="#722ed1"></l-color-picker>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/color-picker";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### ColorPicker Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Native name attribute | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `value` | Color value | `string` | `#000000` |

### ColorPicker Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the color changes; event.detail is the color string, also available through the value property | `(event: CustomEvent<string>)` |