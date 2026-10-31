# Theming

Switch themes by overriding the CSS variables defined in `styles/vars.css`. Components inherit variables from their containing element, so they do not need to be registered or rendered again.

## Preset Themes

Three preset themes are available: **Jade (jade, #00AA7E)**, **Coral (coral, #FF6448)**, and **Tangerine (tangerine, #FF7802)**.

Each theme includes a primary color with lighter and darker shades, along with success, error, warning, text, border, and disabled colors. Dimensions such as control height and border radius still use the base variables. Theme colors and status colors are defined separately; for example, the Coral theme uses a darker red for error states.

The three static blocks below show the primary colors of the preset themes, using each color for their text and borders. The complete CSS variables for each theme are shown in the source files below.

<ClientOnly>
  <div class="grid grid-cols-3 gap-4">
    <section style="color: #00AA7E; border: 1px solid #00AA7E; padding: 10px;">
      <div>Jade[jade] * #00AA7E</div>
    </section>
    <section style="color: #FF6448; border: 1px solid #FF6448; padding: 10px;">
      <div>Coral[coral] * #FF6448</div>
    </section>
    <section style="color: #FF7802; border: 1px solid #FF7802; padding: 10px;">
      <div>Tangerine[tangerine] * #FF7802</div>
    </section>
  </div>
</ClientOnly>

## Importing Theme Variables

Import the base variables first, then choose one preset theme file. Theme variables are defined on `:root`. If you import multiple themes, the last one loaded overrides the earlier ones.

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/theme-jade.css";
// To use Coral or Tangerine, replace the line above with the corresponding file:
// import "litos-ui/styles/theme-coral.css";
// import "litos-ui/styles/theme-tangerine.css";
```

For dark mode, also import `litos-ui/styles/dark.css` after the base variables, then toggle the `dark` class on the root element. This file only provides dark variable overrides; it does not switch modes automatically and is not implicitly loaded by `vars.css`.

## Theme Variable Source

All three files define colors with CSS variables. You can import them directly or copy and customize them. Warning colors use `--l-warning-color`; text colors use `--l-text-color` and `--l-text-secondary-color`; subtle fill backgrounds use `--l-fill-secondary-color`.

The shared source files below retain their original Chinese comments.

### Jade · jade

<<< ../../styles/theme-jade.css

### Coral · coral

<<< ../../styles/theme-coral.css

### Tangerine · tangerine

<<< ../../styles/theme-tangerine.css

> For custom theme switching, see the [Theme component](/en/components/theme). If you have used the color picker to set inline color variables on the root element, remove those inline variables first so that the preset theme styles can take effect.