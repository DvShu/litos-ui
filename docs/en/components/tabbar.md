# Tabbar

Common use cases include:

1. Bottom navigation for switching between pages
2. Switching between labeled sections
3. Tabs

## Import and Registration

```js
import {
  Tabbar,
  TabbarItem,
  regist,
  ReductionIcon,
  RefreshLeftIcon,
  RefreshRightIcon,
  SearchIcon,
  SortIcon,
} from "litos-ui";

regist([TabbarItem, Tabbar]);

// Register the additional components used in this page’s demos.
regist([ReductionIcon, RefreshLeftIcon, RefreshRightIcon, SearchIcon, SortIcon]);
```

## Examples

### Navigation Mode

Set `type` to `nav` (the default). Identify each item with `name`, enable its icon with `icon`, and place the icon in `slot="icon"`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar style="border: 1px solid #dedede" name="Search">
    <l-tabbar-item name="Reduction" icon>
      <l-reduction-icon slot="icon"></l-reduction-icon>
      <span>Reduction</span>
    </l-tabbar-item>
    <l-tabbar-item name="RefreshLieft" icon>
      <l-refresh-left-icon slot="icon"></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </l-tabbar-item>
    <l-tabbar-item name="Search" icon>
      <l-search-icon slot="icon"></l-search-icon>
      <span>Search</span>
    </l-tabbar-item>
    <l-tabbar-item name="RefreshRight" icon>
      <l-refresh-right-icon slot="icon"></l-refresh-right-icon>
      <span>RefreshRight</span>
    </l-tabbar-item>
    <l-tabbar-item name="Sort" icon>
      <l-sort-icon slot="icon"></l-sort-icon>
      <span>Sort</span>
    </l-tabbar-item>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

### Tab Mode

Set `type` to `bar` for simple tabs.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar type="bar" name="2">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

### Card Style

Set `type` to `card` for card-style tabs. Use `gap` to adjust the space between items.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar type="card" name="1">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

### Alignment

Main-axis alignment applies only to `bar` mode. Set the `justify-content` attribute to a valid CSS [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#values) value.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar type="bar" name="1" justify-content="center">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/tabbar";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Tabbar Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Selected tab | `string` | - |
| `type` | Tab style | `nav`, `bar`, `card` | `nav` |
| `gap` | Space between items | `number`, `string` | `0` |
| `justify-content` | Main-axis alignment | `string` | `flex-start` |

### Tabbar Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Accepts only l-tabbar-item elements |

### Tabbar Events

<!-- prettier-ignore -->
| Event | Description | Callback |
| --- | --- | --- |
| `change` | Fires when the selected tab changes; read the selected value from e.detail.name | `(e: CustomEvent<{ name: string }>)` |

### TabbarItem Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Item name; *required* | `string` | - |
| `icon` | Whether to render an icon | `boolean` | - |
| `only-icon` | Whether to render only the icon | `boolean` | - |

### Tabbar CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-tabbar-hover-color` | Item color on hover | `var(--l-primary-color-light1, #9254de)` |
| `--l-tabbar-active-color` | Selected item color | `var(--l-primary-color, #722ed1)` |
| `--l-tabbar-item-gap` | Space between items | `0` |
| `--l-tabbar-height` | Tabbar height | `38px` (`50px` in nav mode) |
| `--l-tabbar-line-color` | Indicator line color | `var(--l-primary-color, #722ed1)` |
| `--l-tabbar-card-border-color` | Card tab border color | `#f5f7fa` |
| `--l-tabbar-card-border-radius` | Card tab border radius | `5px` |