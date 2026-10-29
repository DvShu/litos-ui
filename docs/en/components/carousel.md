# Carousel

Display a sequence of slides within the same content area.

## Import and Registration

```js
import { Carousel, CarouselItem, regist } from "litos-ui";

regist([Carousel, CarouselItem]);
```

## Examples

### Basic Usage

Combine `l-carousel` with `l-carousel-item`. Place each slide’s content inside an `l-carousel-item`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-carousel loop="off" autoplay>
    <l-carousel-item class="carousel-item carousel1">1</l-carousel-item>
    <l-carousel-item class="carousel-item carousel2">2</l-carousel-item>
    <l-carousel-item class="carousel-item carousel3">3</l-carousel-item>
    <l-carousel-item class="carousel-item carousel4">4</l-carousel-item>
    <l-carousel-item class="carousel-item carousel5">5</l-carousel-item>
  </l-carousel>
</textarea>
</l-code-preview>
</ClientOnly>

### Navigation Arrows

The `arrows` attribute controls when navigation arrows appear. By default they appear on `hover`. Set `always` to keep them visible or `never` to hide them.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-carousel arrows="always">
    <l-carousel-item class="carousel-item carousel1">1</l-carousel-item>
    <l-carousel-item class="carousel-item carousel2">2</l-carousel-item>
    <l-carousel-item class="carousel-item carousel3">3</l-carousel-item>
    <l-carousel-item class="carousel-item carousel4">4</l-carousel-item>
    <l-carousel-item class="carousel-item carousel5">5</l-carousel-item>
  </l-carousel>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/carousel";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Carousel Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `arrows` | When navigation arrows appear | `hover`\|`always`\|`never` | `hover` |
| `current-index` | Active slide index, starting at 0 | `number` | `0` |
| `loop` | Whether to loop slides | `on`\|`off` | `on` |
| `autoplay` | Whether to advance automatically | `boolean` | `false` |