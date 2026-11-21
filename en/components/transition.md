---
url: https://dvshu.github.io/litos-ui/en/components/transition.md
---
# Transition

Create transitions and animations based on state changes, typically when an element or component enters or leaves the DOM.

## Import and Registration

```js
import { createTransition } from "litos-ui/lib/utils/transition.js";

// init() finds elements with l-transition and applies their transitions.
const trans = createTransition();

trans.init();
// Call trans.destroy() when the page unmounts to release observers.
```

## Examples

### Basic Usage

Create a transition handler, then call `init` after the elements have mounted. It finds elements with `l-transition`, applies their transitions, and observes changes to `l-transition-emit`. Set this attribute to `show` or `hide` to apply the corresponding transition.

To hide an element, set its `l-transition-emit` attribute to `hide`.

To remove an element after its leave transition instead of setting `display: none`, set `l-transition-method` to `remove`.

```html
  <l-button id="toggle1">Toggle</l-button>
  <p id="text1" l-transition="l-opacity" l-transition-method="hide">hello</p>
```

```css
  .l-opacity-enter-active,
  .l-opacity-leave-active {
    transition: opacity 0.3s ease;
  }
  //-
  .l-opacity-enter-from,
  .l-opacity-leave-to {
    opacity: 0;
  }
```

```js
  import { $one, on, off } from 'utilane/browser';
  import { createTransition } from 'litos-ui/lib/utils/transition.js';
  //-
  const trans = createTransition();
  // Initialize transitions for elements with l-transition.
  // Call trans.destroy() when the page unmounts.
  trans.init();
  //-
  function toggle() {
    const $text = $one('#text1');
    const transEmit = $text.getAttribute('l-transition-emit') || 'show';
    if (transEmit === 'hide') {
      $text.setAttribute('l-transition-emit', "show");
    } else {
      $text.setAttribute('l-transition-emit', "hide");
    }
  }
  //-
  on($one('#toggle1'), 'click', toggle);
```

> After using `l-transition-method="remove"`, register any newly added elements with `trans.add([element])` to observe their transitions.

### Manual Transitions

For manual control, import `transition` from `utilane/browser` and call it directly.

```html
  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
```

```js
  function toggle2() {
    const $text = $one('#text2');
    const display = $text.style.display;
    if (display === 'none') {
      $text.style.display = 'block';
      // Apply the enter transition.
      transition($text, [['opacity', '0', '0.3s']]);
    } else {
      // Apply the leave transition.
      transition($text, [['opacity', '0', '0.3s']], 'leave', () => {
        $text.style.display = 'none';
      });
    }
  }
  //-
  on($one('#toggle2'), 'click', toggle2);
```

> `transition()` accepts four parameters:
>
> 1. `el: HTMLElement`: The element to animate.
> 2. `property: string | [string, string, string][]`: A CSS transition name, or an array of property names, values, and durations. For example, `['opacity', '0', '0.3s']` defines an opacity transition between `1` and `0` lasting `0.3s`.
> 3. `dir: 'enter' | 'leave'`: The direction: `enter` for entering and `leave` for leaving.
> 4. `finish?:() => void`: Callback invoked when the transition finishes.

### Built-in Transitions

Import `litos-ui/styles/transition.css` to apply the built-in transitions by name with the `transition` function.

```html
  <l-button id="toggle3">Toggle</l-button>
  <div class="in-trans" l-name="l-opacity">l-opacity</div>
  <div class="in-trans" l-name="l-fadein">l-fadein</div>
  <div class="in-trans" l-name="l-scale">l-scale</div>
```

```js
  import { $, $one, on, off, iterate, transition } from 'utilane/browser';
  import 'litos-ui/styles/transition.css';
  //-
  function toggleInner() {
    iterate($('.in-trans'), (item) => {
      const name = item.getAttribute('l-name');
      if (item.style.display === 'none') {
        item.style.display = 'inline-block';
        transition(item, name, 'enter');
      } else {
        transition(item, name, 'leave', () => {
          item.style.display = 'none';
        });
      }
    });
  }
  //-
  on($one('#toggle3'), 'click', toggleInner);
  // On unmount, call: off($one('#toggle3'), 'click', toggleInner);
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import { createTransition } from "litos-ui/transition";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Transition Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `l-transition` | Transition name applied to the element | `string` | `l` |
| `l-transition-method` | How to handle the element after its leave transition | `remove` (remove the element), `hide` (hide the element) | `hide` |
| `l-transition-emit` | Applies the corresponding transition when the attribute changes | `show` (show the element), `hide` (hide the element) | `show` |

### Transition Methods

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `init` | Finds elements with l-transition and initializes their transitions | `() => void` | - |
| `destroy` | Disconnects attribute observation and releases the Observer | `() => void` | - |
| `add` | Adds elements to the transition observer | `(el: HTMLElement[]) => void` | - |
