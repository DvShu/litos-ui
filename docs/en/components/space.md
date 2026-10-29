# Space

Apply consistent spacing between adjacent components.

## Import and Registration

```js
import { regist, Space, Button } from "litos-ui";

regist(Space);

// Register additional components used in this page’s demos.
regist([Button]);
```

## Examples

### Basic Usage

Add horizontal spacing between adjacent components.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-space>
    <span>Text</span>
    <l-button>Button</l-button>
  </l-space>
</textarea>
</l-code-preview>
</ClientOnly>

### Horizontal Alignment

Set `justify` to control horizontal alignment using [`css-justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content)

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-space>
    <span>Text</span>
    <l-button>Button</l-button>
  </l-space>
  <hr/>
  <l-space justify="center">
    <span>Text</span>
    <l-button>Button</l-button>
  </l-space>
  <hr/>
  <l-space justify="flex-end">
    <span>Text</span>
    <l-button>Button</l-button>
  </l-space>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/space";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Space Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `inline` | Whether to use inline layout | `boolean` | `false` |
| `justify` | Horizontal alignment | `string` | `flex-start` |
| `direction` | Layout direction | `string` | `row` |
| `wrap` | Whether to wrap | `boolean` | `false` |
| `align` | Vertical alignment | `string` | `center` |
| `gap` | Gap; comma-separated values specify horizontal and vertical spacing, for example 10,15 | `string` | `10px` |

### Space CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-space-display` | Container display type | `flex` |
| `--l-space-align` | Cross-axis alignment (align-items) | `center` |
| `--l-space-justify` | Main-axis alignment (justify-content) | `flex-start` |
| `--l-space-gap` | Spacing between children (gap) | `10px` |
| `--l-space-wrap` | Wrapping behavior (flex-wrap) | `nowrap` |
| `--l-space-direction` | Main-axis direction (flex-direction) | `row` |