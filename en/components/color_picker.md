---
url: https://dvshu.github.io/litos-ui/en/components/color_picker.md
---
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

```html
  <l-color-picker value="#722ed1"></l-color-picker>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/color-picker";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

Use six-digit hexadecimal colors such as `#123456`. Reading the value or submitting it through a native form yields lowercase hex. Empty or invalid values fall back to `#000000`.

### ColorPicker Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Native name attribute | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `value` | Color value | `string` | `#000000` |

### ColorPicker Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the color changes; event.detail is the color string, also available through the value property | `(event: CustomEvent<string>)` |
