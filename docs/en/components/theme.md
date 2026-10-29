# Theme

Switch themes for more comfortable viewing during extended screen use.

## Import and Registration

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/dark.css";

import {
  Theme,
  ThemeColor,
  regist,
  Button,
  SelectOri,
  Switch,
  Radio,
  RadioGroup,
  ColorPicker,
  SunIcon,
  MoonIcon,
  ThemeDefaultIcon,
} from "litos-ui";

regist(Theme);
// Theme color
regist([ColorPicker, ThemeColor]);
// Register the dependencies for the selected style.
regist([Button, SunIcon, MoonIcon]); // Button style
regist(SelectOri); // Select style
regist([Switch, SunIcon, MoonIcon]); // Switch style
// Radio group with icons [label="icon"]
regist([Radio, SunIcon, MoonIcon, ThemeDefaultIcon, RadioGroup]);
// Radio group with text labels
regist([Radio, RadioGroup]);
```

## Examples

> 1. Theme switching is handled by the theme utilities in [utilane](https://www.npmjs.com/package/utilane).
> 2. Call `initTheme()` when your application starts to restore the selected mode after a reload.

::: code-group

```js [main.ts]
import { initTheme } from "utilane/browser";

initTheme().then();
```

:::

### Basic Usage

Choose a theme switcher style with `type`: button, select, radio group, or switch.

The component's built-in select and text-radio labels currently remain in Chinese. This page translates the documentation; component localization is separate.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-theme style="vertical-align:middle;"></l-theme>
  <l-theme type="select" style="vertical-align:middle;"></l-theme>
  <l-theme type="switch" style="vertical-align:middle;"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;" label="icon"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;"></l-theme>
</textarea>
</l-code-preview>
</ClientOnly>

> Call `initTheme()` at application startup to restore the last selected theme mode.

```javascript
// main.js
import { initTheme } from "utilane/browser";

// await initTheme();
initTheme().then();
```

### Custom Styles

The built-in theme switchers provide different layouts around the theme functions in `utilane`.

The commonly used functions are `getTheme()` and `applyTheme()`.

The built-in switching effect is a fade transition.

You can create your own layout or animation. The example below uses `Radio` with text labels. Its circular animation requires the View Transitions API.

<!-- prettier-ignore -->
<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-custom-theme>Theme</l-custom-theme>
</textarea>
<div class="source">
<textarea lang="html">
  <l-radio-group gap="15" id="customThemeRadio">
    <l-radio value="auto">System</l-radio>
    <l-radio value="light">Light</l-radio>
    <l-radio value="dark">Dark</l-radio>
  </l-radio-group>
</textarea>
<textarea lang="js">
  import { applyTheme } from "utilane/browser";
  //-
  const $radio = document.querySelector('#customThemeRadio');
  //-
  $radio.addEventListener('change', (e) => {
    const newTheme = e.target.value;
    const transition = document.startViewTransition(() => {
      // Apply the theme.
      applyTheme(newTheme, true, false).then();
    });
    //-
    transition.ready.then(() => {
      /*
        For a circular reveal centered on the pointer in a click handler:
        // Get the pointer coordinates.
        const { clientX, clientY } = e;
        a: (clientX, clientY)
                              b: (innerWidth, innerHeight)
        The distance from a to b is the maximum radius.
        //-
        // Calculate the maximum radius.
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
      */
      //-
      // Start the circular reveal.
      document.documentElement.animate(
        /*
          // Expand from the pointer position.
          clipPath: [
             `circle(0% at ${clientX}px ${clientY}px)`,
             `circle(${radius}px at ${clientX}px ${clientY}px)`,
          ]
        */
        {
          clipPath: [`circle(0% at center)`, `circle(100% at center)`],
        },
        // Set the duration and target pseudo-element.
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
</textarea>
<textarea lang="css">
  ::view-transition-new(root),
  ::view-transition-old(root) {
    /* Disable the default animation. */
    animation: none;
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Changing the Theme Color

In addition to switching modes, you can change the primary theme color with `ThemeColor`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-theme-color></l-theme-color>
</textarea>
</l-code-preview>
</ClientOnly>

The generated theme color variables look like this:

```CSS
:root {
  --l-primary-color: #722ed1;
  --l-primary-color-light1: #9254de;
  --l-primary-color-light2: #b37feb;
  --l-primary-color-light3: #d3adf7;
  --l-primary-color-light4: #efdbff;
  --l-primary-color-light5: #f9f0ff;
  --l-primary-color-dark1: #531dab;
}
```

> As with the theme mode, call `initColorTheme()` at application startup to restore the selected theme color.

```javascript
// main.js
import { initColorTheme } from "utilane/browser";

await initColorTheme();
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/theme";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Theme Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Theme switcher style | `button` \| `select` \| `switch` \| `radio` | `button` |
| `label` | Whether radio mode uses text or icons | `text` \| `icon` | `text` |

### Events

<!-- prettier-ignore -->
| Event | Description | Callback |
| --- | --- | --- |
| `change` | Fires when the theme changes; read the value from e.detail | `(event: CustomEvent)` |