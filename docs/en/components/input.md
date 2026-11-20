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
  let $input;
  let mounted = false;

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

  onMounted(async () => {
    mounted = true;
    await customElements.whenDefined('l-input');
    await nextTick();
    if (!mounted) return;
    $input = document.querySelector('l-input#input-parser-example');
    $input?.setParser(numericParse);
    $input?.addEventListener('change', handleChange);
  });
  onUnmounted(() => {
    mounted = false;
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
  <l-input id="input-parser-example" placeholder="Enter a non-negative integer" clearable></l-input>
</textarea>
<div class="source">
<textarea lang="html">
  <l-input id="input-parser-example" placeholder="Enter a non-negative integer" clearable></l-input>
</textarea>
<textarea lang="ts">
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
  const $input = document.querySelector('l-input#input-parser-example');
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

### Autofill

Set the `autocomplete` attribute or property to give the browser an autofill hint. When unset, the field inherits the [Form](/en/components/form#form-wide-autofill) default. Removing the field's setting restores inheritance.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input name="email" type="email" autocomplete="email" placeholder="Email"></l-input>
  <l-input name="password" type="password" autocomplete="new-password" placeholder="Set a password"></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

The browser decides whether to offer autofill. Password managers can still fill fields with `off`.

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
| `value` | Default input value. Changes update the current value until it is edited or assigned | `string` | - |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `readonly` | Whether the input is read-only; also readable and writable through the readOnly property | `boolean` | `false` |
| `name` | Form field name | `string` | - |
| `type` | Native input [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) | `string` | `text` |
| `placeholder` | Placeholder text | `string` | - |
| `block` | Whether to fill the parent’s width | `boolean` | `false` |
| `width` | Width | `string` | - |
| `clearable` | Whether to show the clear button | `boolean` | `false` |
| `inputmode` | Native input mode; determined by the browser when unset | `string` | Not set |
| `autocomplete` | Browser autofill hint, such as `on`, `off`, `email`, `current-password`, `new-password`, or a `section-*` combination | `string` | Not set |
| `maxlength` | Maximum input length | `number` | - |
| `minlength` | Minimum input length | `number` | - |
| `error` | Error-state marker; its presence enables the error state. Remove it to clear the state | `string` | Not set |

### Input Properties

<!-- prettier-ignore -->
| Name | Description | Type |
| --- | --- | --- |
| `value` | Current value. Assignments and user input leave the default unchanged | `string` |
| `defaultValue` | Reset value, reflected by the `value` attribute | `string` |
| `autocomplete` | Reflects the attribute of the same name. Assign `""` to remove it | `string` |

Use the `value` attribute or `defaultValue` property to set the value restored on reset. After the current value changes, updating the default preserves the edit until reset. Reset restores the latest default and lets later default changes update the current value again. The first assignment to the `value` property only sets the current value.

Passwords can be submitted and autofilled. The component excludes them from form history restoration state. The browser's back-forward cache and password manager operate independently.

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