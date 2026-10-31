# Button

## Import and Registration

```js
import { Button, regist, LoadingIcon } from "litos-ui";

regist(Button);
// Required for the loading state.
regist(LoadingIcon);
```

## Basic Usage

<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import { generateButtonColor } from "../../../src/components/utils";

let disposed = false;
onMounted(async () => {
  if (import.meta.env.SSR) return;
  await nextTick();
  if (disposed) return;
  const solid = document.querySelector('l-button[data-custom-color="solid"]');
  const ghost = document.querySelector('l-button[data-custom-color="ghost"]');
  const text = document.querySelector('l-button[data-custom-color="text"]');
  if (solid) solid.color = generateButtonColor("#00AA7E");
  if (ghost) ghost.setColor(generateButtonColor("#1e9fff", false, true));
  if (text) text.color = generateButtonColor("#FF7802", true);
});
onUnmounted(() => { disposed = true; });
</script>

### Button Types

Use `type` to choose `normal`, `normal-v2`, or `primary`. Enable `box-shadow` to show a shadow on hover.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button box-shadow>Default</l-button>
  <l-button type="normal-v2" box-shadow>Default</l-button>
  <l-button type="primary" box-shadow>Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

> Import `litos-ui/styles/reset.css` to apply the spacing used between these buttons.

### Text Buttons

Add `text` to use a text button. Combine it with `type` for different styles.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button text>Default</l-button>
  <l-button type="primary" text>Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Button Sizes

Buttons have three sizes. Set `size` to `large` or `small`; the default is `default`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button size="large">Default</l-button>
  <l-button>Primary</l-button>
  <l-button size="small">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Disabled State

Use the boolean `disabled` attribute to disable button interaction.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button disabled>Default</l-button>
  <l-button disabled type="primary">Primary</l-button>
  <l-button text disabled>Text</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Loading State

Set `loading` to show the loading state and `loading-text` to customize its text.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="loadingBtn" loading loading-text="Loading...">Button</l-button>
  <l-button type="primary" loading loading-text="Loading">Button</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Block Buttons

Add `block` to make the button fill its parent’s width (100%).

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button block type="primary">Button</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Button Shapes

Use `shape` to choose `default`, `round`, or `circle`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button>default</l-button>
  <l-button shape="round">round</l-button>
  <l-button shape="circle">C</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Button Icons

```js
import { SearchIcon, regist } from "litos-ui";
regist(SearchIcon);
```

Place an [Icon](/en/components/icon) inside Button, optionally alongside text.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button shape="circle">
    <l-search-icon />
  </l-button>
  <l-button shape="round" type="primary">
    <l-search-icon></l-search-icon>
    <span>Search</span>
  </l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Transparent Background

Enable `ghost` for a transparent background, commonly used on colored surfaces.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button ghost type="primary">Primary</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### Custom Colors

Pass a color variable object through the JavaScript `color` property or `setColor()`, together with the `generateButtonColor(color, text = false, ghost = false)` utility function.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-custom-color="solid">Custom color</l-button>
  <l-button data-custom-color="ghost" ghost>Ghost button</l-button>
  <l-button data-custom-color="text" text>Text button</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-custom-color="solid">Custom color</l-button>
  <l-button data-custom-color="ghost" ghost>Ghost button</l-button>
  <l-button data-custom-color="text" text>Text button</l-button>
</textarea>
<textarea lang="js">
import { generateButtonColor } from "litos-ui/utils";
const solid = document.querySelector('l-button[data-custom-color="solid"]');
const ghost = document.querySelector('l-button[data-custom-color="ghost"]');
const text = document.querySelector('l-button[data-custom-color="text"]');
solid.color = generateButtonColor("#00AA7E");
ghost.setColor(generateButtonColor("#1e9fff", false, true));
text.color = generateButtonColor("#FF7802", true);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Custom Types

Set a custom `type` and style `l-button[type="x"]::part(default)`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="blue">Blue button</l-button>
  <l-button type="gradient">Gradient button</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button type="blue">Blue button</l-button>
  <l-button type="gradient">Gradient button</l-button>
</textarea>
<textarea lang="css">
  l-button[type="blue"]::part(default) {
    --l-btn-border-color: #1677ff;
    --l-btn-hover-border-color: #4096ff;
    --l-btn-active-border-color: #0958d9;
  }
  l-button[type="gradient"]::part(default) {
    border: none;
    --l-btn-text-color: #389e0d;
    --l-btn-active-text-color: #0fd850;
    --l-btn-background: linear-gradient(90deg, #0fd850 0%, #f9f047 100%);
    --l-btn-hover-background: linear-gradient(90deg, #2af06a 0%, #fbf478 100%);
    --l-btn-active-background: linear-gradient(90deg, #0a9036 0%, #ece008 100%);
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

The built-in loading label is Chinese. Set `loading-text` to provide an English label.

## API

### Button Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Button type: normal, normal-v2, or primary | `string` | `normal` |
| `disabled` | Whether the button is disabled | `boolean` | `false` |
| `loading` | Whether the button is loading | `boolean` | `false` |
| `block` | Whether the button fills its parent’s width (100%) | `boolean` | `false` |
| `shape` | Shape: default, round (rounded ends), or circle | `string` | `default` |
| `html-type` | Native type attribute: button, submit, or reset | `string` | `button` |
| `loading-text` | Text displayed while loading | `string` | `加载中……` |
| `text` | Text button | `boolean` | `false` |
| `ghost` | Ghost button with a transparent background | `boolean` | `false` |
| `size` | small, default, large | `string` | `default` |
| `height` | Custom height | `string` | - |
| `box-shadow` | Button shadow | `boolean` | `false` |

### Button Properties

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | Final custom color variable object; assignments take effect immediately and are preserved before mounting; `undefined` or `{}` clears custom colors | `ButtonColor \| undefined` | `undefined` |

### Button Methods

<!-- prettier-ignore -->
| Name | Description | Parameters |
| --- | --- | --- |
| `setColor(color?)` | Replaces color variables, equivalent to assigning `color`; only clears previously set color variables without overwriting other inline styles | `ButtonColor`, optional |

### Color Generation Utility

```text
generateButtonColor(color: string, text?: boolean, ghost?: boolean): ButtonColor
```

Generates nine CSS variables for normal, text, or ghost buttons from a base color (the text/background/border variables in the table below and their hover and active variants). The function does not modify buttons or the DOM; color adjustments run only when you explicitly call it.

<!-- prettier-ignore -->
| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `color` | `string` | Required base color, using a color string supported by `adjust`, such as `"#00AA7E"`; an empty string returns an empty object | Not set |
| `text` | `boolean` | Whether to generate text button colors; the background and border are transparent, and the text color changes on hover and active states | `false` |
| `ghost` | `boolean` | Whether to generate ghost button colors; the background is transparent, and the text and border colors change on hover and active states | `false` |

When both `text` and `ghost` are `true`, text button colors take precedence and the border is transparent. These parameters only control the generated result; they do not set the button’s `text` / `ghost` attributes. Keep the button attributes consistent with the generation parameters.

**Returns:** `ButtonColor`, a new color variable object that can be assigned to `button.color` or passed to `button.setColor()`. A non-empty color generates nine variables; an empty string generates `{}`. The result is a static snapshot and is not automatically recalculated when the button’s attributes change.

`ButtonColor` is a mapping of these CSS variables to optional string values and also supports overriding only some variables. Import the type with `import type { ButtonColor } from "litos-ui/utils"` or from the root entry.

### Button Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Button content |

### CSS Variables

The table lists base CSS variable values. Styles such as normal, primary, and text override some of them. Height and border radius values from vars.css take precedence over component fallbacks.

<!-- prettier-ignore -->
| Name | Default |
| --- | --- |
| `--l-btn-text-color` | `#fff`; normal button styles override this value |
| `--l-btn-background` | `var(--l-btn-border-color)` |
| `--l-btn-border-color` | `var(--l-primary-color, #722ed1)` |
| `--l-btn-hover-text-color` | `var(--l-btn-text-color)` |
| `--l-btn-hover-border-color` | `var(--l-primary-color-light1, #9254de)` |
| `--l-btn-hover-background` | `var(--l-btn-hover-border-color)` |
| `--l-btn-active-text-color` | `var(--l-btn-text-color)` |
| `--l-btn-active-border-color` | `var(--l-primary-color-dark1, #531dab)` |
| `--l-btn-active-background` | `var(--l-btn-active-border-color)` |
| `--l-btn-disabled-color` | `#c9c9c9` |
| `--l-btn-disabled-background` | `#fbfbfb` |
| `--l-btn-disabled-border-color` | `#e6e6e6` |
| `--l-form-control-height` | `40px` (vars.css; component fallback: 32px) |
| `--l-border-radius` | `5px` (vars.css; component fallback: 3px) |