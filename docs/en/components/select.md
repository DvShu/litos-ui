# Select

A dropdown selector.

- Show a dropdown menu as an alternative to a native select, including support for multiple selection.
- Use a dropdown when there are too many options to display at once.

> The default width of `l-select` is `100%`. Set an explicit width when using it inline.

## Import and Registration

```js
import {
  regist,
  Select,
  ArrowDownIcon,
  Tag,
  CloseIcon,
  LoadingIcon,
  CloseFilledIcon,
} from "litos-ui";
import "litos-ui/styles/select.css";

regist([ArrowDownIcon, Select]);
// multiple
regist([Tag, CloseIcon]);
// loading
regist([LoadingIcon]);
// clearable
regist([CloseFilledIcon]);
```

## Examples

<script setup>
  import { $, iterate, on, off } from 'utilane/browser';
  import { onMounted, onUnmounted, nextTick } from 'vue';
  const fruits = ["Apple", "Banana", "Orange", "Grape", "Lemon", "Strawberry", "Cherry", "Mango", "Kiwifruit", "Bayberry", "Pineapple", "Watermelon", "Hami melon", "Peach", "Pear", "Persimmon", "Durian", "Coconut", "Longan", "Lychee"];
  const options = fruits.map((item, i) => { return { value: i, label: item } });

  let $selects;

  function filter(match, option) {
    return option.label.includes(match) || option.value == match;
  }

  function handleSearch(e) {
    const $target = e.target;
    if ($target.loading) return;
    $target.loading = true;
    setTimeout(() => {
      const searchValue = e.detail.value;
      const options = fruits.filter((item) => {
        return item.includes(searchValue);
      }).map((item, index) => {
        return { value: index, label: item }
      });
      $target.setOptions(options);
      $target.loading = false;
    }, 1500);
  }

  onMounted(() => {
    if (!import.meta.env.SSR) {
      nextTick(() => {
        $selects = $('l-select');
        if ($selects && $selects.length > 0) {
          iterate($selects, (el) => {
            el.setOptions(options);
          });
          $selects[0].value = 0;
          // $selects[7].setFilter(filter);

          $selects[8].setOptions([]);
          on($selects[8], 'search', handleSearch);
        }
      });
    }
  });

  onUnmounted(() => {
    if ($selects && $selects.length > 0) {
      off($selects[8], 'search', handleSearch);
    }
    $selects = null;
  });
</script>

### Basic Usage

Supply options with `setOptions()`. Read or update the selection through `.value`; use an array for multiple selection.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option"></l-select>
</textarea>
<div class="source">
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" id="select1"></l-select>
</textarea>
<textarea lang="js">
  const $select1 = document.querySelector('#select1');
  $select1.setOptions([{value:0,label:'Apple'}, {value:1,label:'Banana'}]);
  // Multiple selection: $select1.value = [0, 1];
  $select1.value = 0;
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 1. Use `value-field` and `label-field` to customize the option keys for values and labels.
> 2. String selections can also be provided through the HTML `value` attribute; separate multiple values with `,`.

### Disabled State

Set `disabled` to disable the selector.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" disabled></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

> Form and FormItem do not currently provide a shared disabled attribute. Set disabled on each Select control.

### Multiple Selection

Enable `multiple` for multiple selection. Selected values are shown as Tag components by default; enable `collapse-tags` to show them as text instead.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" multiple width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" multiple collapse-tags width="180px"></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

### Clearable Selection

Enable `clearable` to let users clear the selection.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" clearable width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" multiple collapse-tags clearable width="180px"></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

### Filtering Options

Filter options to find them quickly.

Enable `filterable` to search options. By default, Select matches labels containing the input. Call `setFilter()` with a custom function to change this behavior. The function receives the search string and option, and returns a boolean indicating whether the option matches.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" filterable width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" multiple filterable width="180px"></l-select>
</textarea>
<div class="source">
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" filterable width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" id="select2" multiple filterable width="180px"></l-select>
</textarea>
<textarea lang="js">
  const $select2 = document.querySelector('#select2');
  $select2.setOptions([{value:0,label:'Apple'}, {value:1,label:'Banana'}]);
  //-
  function filter(match, option) {
    return option.label.includes(match) || option.value == match;
  }
  //-
  $select2.setFilter(filter);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Remote Search

Search remote data by entering keywords.

Enable both `filterable` and `remote`, then handle `search` using `event.detail.value`. Fetch matching data and call `setOptions()` to replace the options. Set `loading` while the request is pending.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" multiple filterable remote width="180px"></l-select>
</textarea>
<div class="source">
<textarea lang="html">
  <l-select empty-text="No options" placeholder="Select an option" id="select3" multiple filterable remote width="180px"></l-select>
</textarea>
<textarea lang="js">
  const fruits = ["Apple", "Banana", "Orange", "Grape", "Lemon", "Strawberry", "Cherry", "Mango", "Kiwifruit", "Bayberry", "Pineapple", "Watermelon", "Hami melon", "Peach", "Pear", "Persimmon", "Durian", "Coconut", "Longan", "Lychee"];
  const $select = document.querySelector('#select3');
  //-
  function handleSearch(e) {
    const $target = e.target;
    if ($target.loading) return;
    $target.loading = true;
    // You can also set loading through an attribute.
    // $target.setAttribute('loading', 'on');
    const searchValue = e.detail.value;
    // Simulate a request.
    setTimeout(() => {
      const options = fruits.filter((item) => {
        return item.includes(searchValue);
      }).map((item, index) => {
        return { value: index, label: item }
      });
      $target.setOptions(options);
      $target.loading = false;
      // $target.setAttribute('loading', 'off');
    }, 1500);
  }
  //-
  $select.addEventListener('search', handleSearch);
  // $select.removeEventListener('search', handleSearch);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/select.css";
import "litos-ui/select";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

The default placeholder and empty-state labels are Chinese. These examples set English `placeholder` and `empty-text` attributes explicitly. Both support dynamic updates; an empty string hides the text and removing the attribute restores its default.

## API

### Select Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Selected value as an HTML attribute | `string` | - |
| `placeholder` | Placeholder | `string` | 请选择 |
| `empty-text` | Text displayed when no options match; supports dynamic updates. An empty string hides the text; removing the attribute restores the default | `string` | 暂无数据 |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `label-field` | Option field used for labels | `string` | `label` |
| `value-field` | Option field used for values | `string` | `value` |
| `multiple` | Whether to allow multiple selection | `boolean` | `false` |
| `collapse-tags` | Whether to display multiple selected values as text | `boolean` | `false` |
| `clearable` | Whether to allow clearing | `boolean` | `false` |
| `filterable` | Whether to enable filtering | `boolean` | `false` |
| `remote` | Whether to enable remote search | `boolean` | `false` |
| `loading` | Whether to show loading, typically during remote search | `boolean` | `false` |
| `width` | Width | `string` | `100%` |

The JavaScript `value` property accepts a string, number, or an array of selected values. Arrays must be assigned as a property rather than an HTML attribute.

### Select Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| - | The default slot is not currently rendered |

### Select Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `search` | Fires when searching; e.detail.value contains the search text | `(e: CustomEvent)` |
| `change` | Fires when selection changes; detail contains value and labels | `(e: CustomEvent)` |

Use `setOptions()` for option objects and `setFilter()` for a filter function. Object arrays and functions cannot be passed directly as HTML attributes.

### Select Methods

<!-- prettier-ignore -->
| Method | Description |
| --- | --- |
| `setOptions(options: SelectOption[])` | Sets the options |
| `setFilter(filter: (match: string, option: SelectOption) => boolean)` | Sets a custom filter function |

### SelectOption

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Option value | `string` or `number` | - |
| `label` | Option label | `string` | - |

### Select CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| - | - | - |