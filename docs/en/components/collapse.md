# Collapse

Expand or collapse sections of content, such as panels in a dashboard sidebar.

## Import and Registration

```js
import { regist, Collapse, CollapseItem, ArrowRightIcon } from "litos-ui";

regist([Collapse, CollapseItem, ArrowRightIcon]);
```

## Examples

### Basic Usage

Multiple panels can be expanded independently.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse>
    <l-collapse-item prop="1" header-text="Red light" expand>
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Controlled Expansion

Set `prop` on `l-collapse` to the expanded panel names, separated by `&`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse prop="1&3">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

> You can also add `expand` to an `l-collapse-item` to expand it.

### Accordion

Enable `accordion` to allow only one panel to be expanded at a time.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse accordion>
    <l-collapse-item prop="1" header-text="Red light" expand>
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Arrow Placement

Set `arrow-placement` to `left` (default) or `right`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Header Alignment

Use `header-justify` to align header content. Combine `space-between` with `arrow-placement="right"` to place the text and arrow at opposite ends.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Background and Border

Enable `background` to show the panel background and border.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Panel Spacing

Set `gap` to control the space between panels.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Border Radius

Set `border-radius` to round the panel corners.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

### Grid Layout

Enable `grid` to arrange panels in a grid.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse
    arrow-placement="right"
    header-justify="space-between"
    background
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/collapse";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Collapse Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `prop` | Expanded panel names, separated by & when multiple panels are expanded | `string` | - |
| `grid` | Grid layout | `boolean` | `false` |
| `gap` | Panel spacing | `string` | `0px` |
| `border-radius` | Border radius | `string` | `0px` |
| `background` | Background and border | `boolean` | `false` |
| `arrow-placement` | Arrow position | `string` | `left` |
| `header-justify` | Header alignment: flex-start, flex-end, or space-between | `string` | `flex-start` |
| `accordion` | Accordion mode | `boolean` | `false` |

### CollapseItem Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `prop` | Panel name | `string` | - |
| `header-text` | Header text | `string` | - |
| `expand` | Whether the panel is expanded | `boolean` | `false` |

### Collapse Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when panels change; detail: { expands: string[], value: string } | `(event: CustomEvent)` |

### Collapse CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| - | - | - |