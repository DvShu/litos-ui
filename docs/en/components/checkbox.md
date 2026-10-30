# Checkbox

Select multiple options from a group, or use a standalone checkbox to ask users to acknowledge a choice.

## Import and Registration

```js
import { Checkbox, regist, CheckboxGroup } from "litos-ui";

regist([Checkbox, CheckboxGroup]);
```

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'utilane/browser';

  let $allCheck;
  let $group;

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
      $allCheck.checked = false;
    }
  }

  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    $allCheck.removeAttribute('indeterminate');
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // Select all
    } else {
      $group.value = ''; // Clear all
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $group = $one('#group');
        $allCheck = $one('#check-all');

        on($group, 'change', handleGroupChange);
        on($allCheck, 'change', handleAllCheckChange);
      }
    })
  });

  onUnmounted(() => {
    if ($group) {
      off($group, 'change', handleGroupChange);
    }
    if ($allCheck) {
      off($allCheck, 'change', handleAllCheckChange);
    }
  })
</script>

### Basic Usage

For a standalone checkbox, use the boolean `checked` state to control selection. Supply custom label content through the default slot.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox checked>
    <span>
      <span>I agree to the</span>
      <a href='#'>Privacy policy</a>
    </span>
  </l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### Disabled State

Set `disabled` to disable a checkbox.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox disabled checked>Disabled</l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### Checkbox Group

Place checkboxes inside `l-checkbox-group` for multiple selection.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">Chengdu</l-checkbox>
    <l-checkbox value="BJ">Beijing</l-checkbox>
    <l-checkbox value="SZ">Shenzhen</l-checkbox>
    <l-checkbox value="SH">Shanghai</l-checkbox>
  </l-checkbox-group>
</textarea>
</l-code-preview>
</ClientOnly>

> Encode each selected value with `encodeURIComponent`, then join the values with `&` for `l-checkbox-group`.

### Button Style

Add `button` to `l-checkbox` for button styling.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
</textarea>
</l-code-preview>
</ClientOnly>

### Indeterminate State

Set `indeterminate` to show a partially selected state.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
</textarea>
<div class="source">
<textarea lang="html">
  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
</textarea>
<textarea lang="ts">
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/checkbox";
import "litos-ui/checkbox-group";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Checkbox Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | value | `string` | `-` |
| `checked` | Whether the option is checked | `boolean` | `false` |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `button` | Whether to use button styling | `boolean` | `false` |
| `indeterminate` | Whether to display the indeterminate state | `boolean` | `false` |
| `name` | Native attribute | `string` | `-` |
| `label` | Displayed label | `string` | `-` |

### CheckboxGroup Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected values, each encoded with encodeURIComponent and joined with & | `string` | `-` |

### Checkbox Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Label |

### Checkbox Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when selection changes; e.detail contains value, name, and checked | `(event: CustomEvent)` |

### CheckboxGroup Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the group selection changes; e.detail.value is the list of selected values | `(event: CustomEvent)` |

### Checkbox CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-check-size` | Checkbox size | `14px` |
| `--l-check-border-radius` | Checkbox border radius | `3px` |
| `--l-primary-color` | Checked-state color | `#007bff` (with vars.css) |
| `--l-disabled-color` | Disabled-state color | `#e6e6e6` |
| `--l-form-control-height` | Button-style height | `40px` (with vars.css; component fallback without it: 32px) |
| `--l-check-gap` | Checkbox group spacing | `0px` |