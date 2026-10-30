# Input

## Import and Registration

```js
import { Input, regist, CloseFilledIcon } from "litos-ui";

regist(Input);
regist(CloseFilledIcon); // Required for clearable inputs.
```

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off } from 'utilane/browser';

  let $input;

  function handleChange(e) {
    console.log('input', e.target.value);
  }

  function numericParse(value) {
    let val = parseInt(value, 10)
    if (Number.isNaN(val)) {
      val = ''
    } else {
      val = Math.abs(val)
    }
    return String(val);
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $input = $one('#input');
        if ($input) {
          $input.addEventListener('change', handleChange);
          $input.setParser(numericParse);
        }
      }
    })
  });
  onUnmounted(() => {
    $input?.removeEventListener('change', handleChange);
    $input = undefined;
  });
</script>

### Basic Usage

A basic text input.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="Enter text"></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### Disabled State

Set `disabled` to disable the input.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="Enter text" disabled></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### Read-only State

Set `readonly` to make the input read-only. Users can still focus it and select or copy text, but the clear button is hidden. Use `readonly` or `readonly="true"` to enable it; set `readonly="false"` or remove the attribute to restore editing. You can also toggle the instance’s boolean `readOnly` property dynamically. Programmatic changes to `value` remain available. Native input read-only restrictions apply to types such as text and number, but not to types such as checkbox or range that do not support read-only behavior.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input value="Read-only text you can select and copy" readonly clearable></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

```js
const input = document.querySelector("l-input");
input.readOnly = true;
input.readOnly = false;
// Alternatively, use setAttribute("readonly", "") / removeAttribute("readonly").
```

### Restricting Input

The current implementation does not support `allow-input` or `autofocus`. Use `setParser()` to restrict input, as shown below. Call `focus()` after mounting to focus the input.

### Input Parser

Use `setParser` to parse incoming values with a custom function, for example to accept only non-negative integers.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input id="input" placeholder="Enter a non-negative integer" clearable></l-input>
</textarea>
<div class="source">
<textarea lang="html">
  <l-input id="input" placeholder="Enter a non-negative integer"></l-input>
</textarea>
<textarea lang="ts">
  import { $one, on, off } from 'utilane/browser';
  //-
  function numericParse(value) {
    let val = parseInt(value, 10)
    if (Number.isNaN(val)) {
      val = ''
    } else {
      val = Math.abs(val)
    }
    return String(val);
  }
  //-
  const $input = $one('#input');
  $input.setParser(numericParse);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Input with Icons

```js
import { ReductionIcon, SearchIcon, regist } from "litos-ui";
regist([ReductionIcon, SearchIcon]);
```

Use the `prefix` and `suffix` slots to add icons.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### Clearable Input

Set `clearable` to show a clear icon. Clicking it clears the input.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="input something" clearable></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### Error State

Add `error` to display the error state.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="Enter text" error block></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/input";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Input Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Input value; also readable and writable through the value property | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `readonly` | Whether the input is read-only; also readable and writable through the readOnly property | `boolean` | `false` |
| `name` | Form field name | `string` | - |
| `type` | Native input [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) | `string` | `text` |
| `placeholder` | Placeholder text | `string` | - |
| `block` | Whether to fill the parent’s width | `boolean` | `false` |
| `width` | Width | `string` | - |
| `clearable` | Whether to show the clear button | `boolean` | `false` |
| `inputmode` | Native input mode; determined by the browser when unset | `string` | Not set |
| `maxlength` | Maximum input length | `number` | - |
| `minlength` | Minimum input length | `number` | - |
| `error` | Error-state marker; its presence enables the error state. Remove it to clear the state | `string` | Not set |

### Input Methods

<!-- prettier-ignore -->
| Name | Description | Parameters |
| --- | --- | --- |
| `setParser` | Sets the input parser | `(parser: (val: string) => string): void` |
| `focus` | Focuses the input | `(): void` |

### Input Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `prefix` | Prefix icon |
| `suffix` | Suffix icon |

### CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-input-width` | Input width | `170px` |