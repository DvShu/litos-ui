---
url: https://dvshu.github.io/litos-ui/en/components/input_number.md
---
# InputNumber

## Import and Registration

```js
import { InputNumber, regist } from "litos-ui";

regist(InputNumber);
```

## Examples

### Basic Usage

Change the value with the `+` / `-` buttons or the Up and Down arrow keys.

```html
  <l-input-number value="5"></l-input-number>
```

### Disabled State

Set `disabled` to disable the number input.

```html
  <l-input-number value="3" disabled></l-input-number>
```

### Step

Set `step` to control each increment or decrement. It defaults to `1` and supports decimals.

```html
  <l-input-number value="1" step="2"></l-input-number>
  <l-input-number value="0.5" step="0.5" precision="1"></l-input-number>
```

### Precision

Set `precision` to control decimal places. The value is formatted when the input loses focus.

```html
  <l-input-number value="1.5" precision="2" step="0.1"></l-input-number>
```

### Value Limits

Use `min` and `max` to limit the value. The corresponding step button is disabled at each boundary.

```html
  <l-input-number value="5" min="0" max="10"></l-input-number>
```

### Sizes

Number inputs have three sizes: `large`, `default`, and `small`. The default size is `default`.

```html
  <l-input-number value="1" size="large"></l-input-number>
  <l-input-number value="1"></l-input-number>
  <l-input-number value="1" size="small"></l-input-number>
```

### Hiding Step Buttons

Enable `controls-disabled` to hide the `+` / `-` buttons and show only the input.

```html
  <l-input-number value="10" controls-disabled placeholder="Enter a value"></l-input-number>
```

### Width and InnerBlock

Set `width` for a custom width, or enable `inner-block` to fill the parent.

```html
  <l-input-number value="1" width="240"></l-input-number>
  <l-input-number value="1" inner-block></l-input-number>
```

### Events

Listen for `change` to receive the updated value. `event.detail` contains `value` and `name`.

```html
  <l-input-number id="num-change" value="0" name="count"></l-input-number>
```

```ts
  import { $one } from 'utilane/browser';
  //-
  const $num = $one('#num-change');
  $num.addEventListener('change', function(e) {
    console.log('value:', e.detail.value, 'name:', e.detail.name);
  });
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/input-number";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### InputNumber Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Current value | `number` | - |
| `min` | Minimum value | `number` | - |
| `max` | Maximum value | `number` | - |
| `step` | Step | `number` | `1` |
| `precision` | Precision (decimal places) | `number` | - |
| `placeholder` | Placeholder text | `string` | - |
| `size` | Size: small, default, or large | `string` | `default` |
| `width` | Width | `string` | `170px` |
| `inner-block` | Whether to fill the parent’s width | `boolean` | `false` |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `controls-disabled` | Whether to hide the step buttons | `boolean` | `false` |
| `name` | Form field name | `string` | - |

### InputNumber Events

Set the `value` attribute to choose the number restored on form reset. The `value` property contains a number after valid input and `undefined` after clearing. `FormData` submits a numeric string or an empty string, respectively.

| Name | Description | event.detail |
| --- | --- | --- |
| `input` | Fires on typing or stepping. `event.detail.value` is `undefined` after clearing | `{ value: number \| undefined, name: string }` |
| `change` | Fires when a value change is committed on blur or Enter | `{ value: number, name: string }` |

### InputNumber Methods

| Name | Description | Parameters |
| --- | --- | --- |
| `focus` | Focuses the input | `(): void` |

### CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-input-number-width` | Component width | `170px` |
| `--l-input-number-border-color` | Border color | `var(--l-border-color, #d9d9d9)` |
| `--l-input-number-bg` | Background color | `#ffffff` |
| `--l-input-number-btn-color` | Button text color | `#606266` |
| `--l-input-number-btn-bg` | Button background | `#f5f7fa` |
| `--l-input-number-btn-hover-color` | Button text color on hover | `var(--l-primary-color, #722ed1)` |
| `--l-input-number-btn-hover-bg` | Button background on hover | `var(--l-primary-color-light5, #f3e8ff)` |
| `--l-input-number-btn-disabled-color` | Disabled button color | `#c0c4cc` |
| `--l-form-control-height` | Component height | `40px` (with vars.css; component fallback without it: 32px) |
