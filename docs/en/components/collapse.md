# Collapse

Expand or collapse sections of content, such as panels in a dashboard sidebar.

## Import and Registration

```js
import { regist, Collapse, CollapseItem, ArrowRightIcon } from "litos-ui";

regist([Collapse, CollapseItem, ArrowRightIcon]);
```

## Examples

### Basic Usage

Multiple panels can be expanded independently. Press Tab to focus a header, then Enter or Space to toggle it.

When a panel collapses, focus inside it returns to the header. With reduced motion enabled, the panel and arrow update immediately.

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

Use `header-justify` to align the header content. `flex-start` and `flex-end` align it to the start and end of the row, respectively, while `space-between` places the text and arrow at opposite ends.

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

### Wrappers and Standalone Panels

Place `l-collapse-item` directly inside `l-collapse`, inside a regular wrapper element, or on its own. In `grid` mode, each direct child occupies one grid cell, so panels inside a wrapper share a cell.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapse grid gap="8" prop="delivery">
    <div>
      <l-collapse-item prop="delivery" header-text="Delivery Options">
        <div>Courier delivery is available.</div>
      </l-collapse-item>
      <l-collapse-item prop="pickup" header-text="Store Pickup">
        <div>Pick up your order once it is ready.</div>
      </l-collapse-item>
    </div>
    <l-collapse-item prop="returns" header-text="Returns and Exchanges">
      <div>Request a return or exchange from the order details.</div>
    </l-collapse-item>
  </l-collapse>

  <l-collapse-item header-text="Opening Hours">
    <div>Monday to Sunday, 09:00–18:00.</div>
  </l-collapse-item>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/collapse";
```

For standalone panels, load `litos-ui/collapse-item`.

```js
import "litos-ui/styles/vars.css";
import "litos-ui/collapse-item";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Collapse Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `prop` | Expanded panel names separated by `&`. Accordion mode uses the first name. | `string` | - |
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
| `header-text` | Header text. When empty or removed, the `header-text` slot is shown. | `string` | - |
| `heading-level` | Heading level in the document outline, from `1` to `6` | `string` | `3` |
| `toggle-label` | Accessible name of the toggle. Set it explicitly when the header contains only an icon or an action button. | `string` | Header text or `Toggle panel` |
| `expand` | Whether the panel is expanded | `boolean` | `false` |

### CollapseItem Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| Default slot | Panel content |
| `header-text` | Custom header content. Links and buttons in the slot can be focused and used independently. |

### CollapseItem CSS Parts

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `header` | Header container |
| `header-text` | Header text rendered from the `header-text` attribute |

### Collapse Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires after a grouped panel is toggled via its header. `event.detail` is `{ expands: string[], value: string }`. | `(event: CustomEvent)` |

### CollapseItem Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `expand-change` | Fires after this panel is toggled via its header. `event.detail` is `{ prop: string, expand: boolean }`. | `(event: CustomEvent)` |

Initialization, changes to the `prop` or `expand` attributes, and other panels closing during an accordion toggle update state silently.

### CollapseItem Manual Context Injection

Before mounting, pass two callable values to `contextInject(context, expands)` to set the initial layout and expansion state. When the values change, call `_updateLayout()` to refresh the layout or `_handleExpandsChange()` to refresh the expansion state.

### Collapse CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-collapse-gap` | Overrides panel spacing on `l-collapse` | `gap` attribute or `0px` |
| `--l-collapse-border-radius` | Overrides panel corner radius on `l-collapse` | `border-radius` attribute or `0px` |
| `--l-collapse-border-color` | Overrides panel border color on `l-collapse` | `--l-border-color` or `#dedede` |