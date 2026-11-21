---
url: https://dvshu.github.io/litos-ui/en/css_util.md
---
# Utility Styles

Common CSS utility classes for transitions, animations, and scrollbars.

## 1. Transitions

### 1.1 Importing Styles

```js
import "litos-ui/styles/transition.css";
```

### 1.2 Usage

All transitions support `--l-transition-times` to control their duration, which defaults to `0.3s`. Add the corresponding `l-transition` attribute, then call `transition.init()`. See [Transition](https://dvshu.github.io/litos-ui/en/components/transition.md) for details.

### 1.3 Examples

1. `l-opacity`

Fade in and out by changing opacity.

```html
  <l-button id="toggle">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
```

```js
  import { $one, on } from 'utilane/browser';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
```

2. `l-fadein`

Fade in from above and reverse the effect when leaving. Use `--l-fadein-offset` to control the distance; the default is `-20px`.

```html
  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
```

```js
  import { $one, on } from 'utilane/browser';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
```

3. `l-scale`

Scale in and out.

```html
  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
```

```js
  import { $one, on } from 'utilane/browser';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
```

> These transition effects can also be used with Vue.

```vue
<Transition name="l-opacity">...</Transition>
```

## 2. CSS Animations

### 2.1 Importing Styles

```js
import "litos-ui/styles/animation.css";
```

### 2.2 Usage

Apply an animation by adding its CSS class or by referencing its name in the CSS `animation` property:

1. Add a CSS class.

Animation classes follow the pattern `l-` + animation name + `-anim`. For example, the rotation animation uses `l-rotate-anim`.

```html
<l-loading-icon class="l-rotate-anim"></l-loading-icon>
```

2. Reference the animation name in CSS.

Animation names follow the pattern `l-` + animation name + `-frame`. For example, the rotation animation is named `l-rotate-frame`.

```html
<l-loading-icon class="custome-rotate" />
```

```css
.custome-rotate {
  animation: l-rotate-frame 1.5s infinite linear;
}
```

The built-in animation is `rotate` (rotation).

## 3. Scrollbar Styles

Use these styles to customize the appearance of the default scrollbar.

### 3.1 Importing Styles

```js
import "litos-ui/styles/scrollbar.css";
```

### 3.2 Usage

Add the `l-scrollbar` class to the scroll container.

```html
  <div class="l-scrollbar" style="width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
```

### 3.3 Changing Scrollbar Colors and Size

Use the CSS variables in the table below to change the scrollbar colors and size.

```html
  <div class="l-scrollbar" style="--l-scrollbar-bg:orange;--l-scrollbar-hover:red;--l-scrollbar-size:8px;width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
```

### 3.4 CSS Variables

| Name | Default | Description |
| --- | --- | --- |
| `--l-scrollbar-bg` | `#d9d9d9` | Scrollbar thumb background color |
| `--l-scrollbar-hover` | `#bfbfbf` | Scrollbar thumb color on hover |
| `--l-scrollbar-size` | `10px` | Thumb size: height for horizontal scrollbars and width for vertical scrollbars |
