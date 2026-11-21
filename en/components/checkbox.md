---
url: https://dvshu.github.io/litos-ui/en/components/checkbox.md
---
# Checkbox

Select multiple options from a group, or use a standalone checkbox to ask users to acknowledge a choice.

## Import and Registration

```js
import { Checkbox, regist, CheckboxGroup } from "litos-ui";

regist([Checkbox, CheckboxGroup]);
```

## Examples

### Basic Usage

For a standalone checkbox, use the boolean `checked` state to control selection. Supply custom label content through the default slot.

```html
  <l-checkbox checked>
    <span>
      <span>I agree to the</span>
      <a href='#'>Privacy policy</a>
    </span>
  </l-checkbox>
```

### Disabled State

Set `disabled` to disable a checkbox.

```html
  <l-checkbox disabled checked>Disabled</l-checkbox>
```

### Checkbox Group

Place checkboxes inside `l-checkbox-group` for multiple selection.

```html
  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">Chengdu</l-checkbox>
    <l-checkbox value="BJ">Beijing</l-checkbox>
    <l-checkbox value="SZ">Shenzhen</l-checkbox>
    <l-checkbox value="SH">Shanghai</l-checkbox>
  </l-checkbox-group>
```

> Encode each selected value with `encodeURIComponent`, then join the values with `&` for `l-checkbox-group`.

A native form submits one entry per selected value under the group's `name`. It omits values that correspond only to disabled options.

### Button Style

Add `button` to `l-checkbox` for button styling.

```html
  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
```

### Indeterminate State

Set `indeterminate` to show a partially selected state.

```html
  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
```

```ts
  import { $one, on, off } from 'utilane/browser';
  //-
  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // Select all
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // Clear all
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // Partially selected
    }
  }
  //-
  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // Select all
    } else {
      $group.value = ''; // Clear all
    }
  }
  //-
  const $group = $one('#group');
  const $allCheck = $one('#check-all');
  //-
  on($group, 'change', handleGroupChange);
  on($allCheck, 'change', handleAllCheckChange);
  // Remove listeners when the page unmounts.
  // off($group, 'change', handleGroupChange);
  // off($allCheck, 'change', handleAllCheckChange);
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/checkbox";
import "litos-ui/checkbox-group";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Checkbox Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | value | `string` | `-` |
| `checked` | Whether the option is checked | `boolean` | `false` |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `button` | Whether to use button styling | `boolean` | `false` |
| `indeterminate` | Whether to display the indeterminate state | `boolean` | `false` |
| `name` | Native attribute | `string` | `-` |
| `label` | Displayed label | `string` | `-` |

### Checkbox Properties

| Name | Description | Type |
| --- | --- | --- |
| `checked` | Current checked state | `boolean` |
| `defaultChecked` | Checked state restored on reset, reflected by the `checked` attribute | `boolean` |

See [Common Form Control APIs](https://dvshu.github.io/litos-ui/en/components/form.md#common-form-control-apis) for field names, defaults, validity, and reset methods.

### CheckboxGroup Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected values, each encoded with encodeURIComponent and joined with & | `string` | `-` |
| `name` | Form field name for the group | `string` | Not set |
| `disabled` | Disables all options in the group | `boolean` | `false` |
| `required` | Requires at least one selected value that can be submitted | `boolean` | `false` |
| `gap` | Spacing between options. Plain numbers are treated as pixels | `string` | `0px` |
| `form` | Associated native form ID. An explicit ID takes precedence | `string` | Associated automatically |

See [Common Form Control APIs](https://dvshu.github.io/litos-ui/en/components/form.md#common-form-control-apis) for `value`, `defaultValue`, validity, and reset methods.

### Checkbox Slots

| Name | Description |
| --- | --- |
| `default` | Label |

### Checkbox Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when selection changes; e.detail contains value, name, and checked | `(event: CustomEvent)` |

### CheckboxGroup Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the group selection changes; e.detail.value is the list of selected values | `(event: CustomEvent)` |

### Checkbox CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-check-size` | Checkbox size | `14px` |
| `--l-check-border-radius` | Checkbox border radius | `3px` |
| `--l-primary-color` | Checked-state color | `#007bff` (with vars.css) |
| `--l-disabled-color` | Disabled-state color | `#e6e6e6` |
| `--l-form-control-height` | Button-style height | `40px` (with vars.css; component fallback without it: 32px) |
| `--l-check-gap` | Checkbox group spacing | `0px` |
