# Polygon

Display polygons such as triangles, rhombuses, hexagons, and trapezoids using [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path).

## Import and Registration

```js
import { Polygon, regist } from "litos-ui";

regist(Polygon);
```

## Examples

### Basic Usage

Several triangle shapes are provided by default. Select one with the `shape` attribute.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
 <div class="grid grid-cols-4">
  <div class="center flex-col">
    <l-polygon shape="triangle-top"></l-polygon>
    <span>triangle-top</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom"></l-polygon>
    <span>triangle-bottom</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-left"></l-polygon>
    <span>triangle-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-right"></l-polygon>
    <span>triangle-right</span>
  </div>
</div>
<div class="grid grid-cols-4 mt-15">
  <div class="center flex-col">
    <l-polygon shape="triangle-top-right"></l-polygon>
    <span>triangle-top-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-top-left"></l-polygon>
    <span>triangle-top-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-right"></l-polygon>
    <span>triangle-bottom-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-left"></l-polygon>
    <span>triangle-bottom-left</span>
  </div>
</div>
</textarea>
</l-code-preview>
</ClientOnly>

### Custom Shapes

Set a custom `clip-path` through `::part(default)`. For example, create a rhombus:

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
</textarea>
<div class="source">
<textarea lang="html">
  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
</textarea>
<textarea lang="css">
  .polygon-rhombus::part(default) {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/polygon";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Polygon Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `shape` | Selects a built-in shape | `string` | `triangle-top` |
| `background` | Background color | `string` | - |

### Polygon CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-polygen-size` | Polygon size | `10px` |
| `--l-polygen-width` | Polygon width | `var(--l-polygen-size)` |
| `--l-polygen-height` | Polygon height | `var(--l-polygen-size)` |
| `--l-polygen-background` | Polygon background color | `#666` |