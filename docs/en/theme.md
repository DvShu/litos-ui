# Preset Themes

Switch themes by overriding the CSS variables defined in `styles/vars.css`. Components inherit variables from their containing element, so they do not need to be registered or rendered again.

## Preset Themes

Seven preset themes are available: **Jade (jade, #00AA7E)**, **Coral (coral, #FF6448)**, **Tangerine (tangerine, #FF7802)**, **Apple (apple, #9E8D51)**, **Deep Sea Blue (deep-sea-blue, #1D3D79)**, **Gamboge (gamboge, #FED110)**, and **Lotus Seed (lotus-seed, #E515AA)**.

Each theme includes a primary color, color shades, status colors, and neutral colors. Control heights and border radii still use the base variables. Primary, success, error, and warning colors are configured independently; when colors are similar, the corresponding status color is adjusted to keep them distinct.

Select a card to apply its theme. Select it again to restore the default blue. Only one preset can be selected at a time, and the light or dark mode stays unchanged.

<ClientOnly>
  <div class="theme-presets" role="group" aria-label="Preset themes">
    <button v-for="preset in presets" :key="preset.id" type="button" class="theme-preset" :style="{ '--preset-color': preset.color }" :aria-pressed="selected === preset.id" @click="selectTheme(preset.id)">
      <span class="theme-preset-swatch" aria-hidden="true"></span>
      <span class="theme-preset-name">{{ preset.name }}</span>
      <span class="theme-preset-meta">{{ preset.id }} · {{ preset.color }}</span>
      <span class="theme-preset-status">{{ selected === preset.id ? 'Selected ✓' : 'Apply theme' }}</span>
    </button>
  </div>
  <p aria-live="polite">Current theme: {{ presets.find(preset => preset.id === selected)?.name || 'Default blue' }}</p>
  <div class="theme-preview">
    <l-button type="primary">Primary button</l-button>
    <span class="theme-status" style="--status-color: var(--l-success-color); --status-bg: var(--l-success-color-light5)">Success</span>
    <span class="theme-status" style="--status-color: var(--l-error-color); --status-bg: var(--l-error-color-light5)">Error</span>
    <span class="theme-status" style="--status-color: var(--l-warning-color); --status-bg: var(--l-warning-color-light5, var(--vp-c-bg-soft))">Warning</span>
  </div>
</ClientOnly>

The Gamboge theme uses dark text for filled primary buttons through `--l-primary-contrast-color` (default: `#ffffff`). Its warning color uses a darker amber to distinguish it from the primary color. On light backgrounds, avoid using the bright primary color alone for small text.

## Importing Theme Variables

Import the base variables first, then choose a preset theme file. With no explicit `data-theme` selection, theme variables are applied on `:root`, and later imports override earlier ones.

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/themes/jade.css";
// To use another preset, replace the theme import above:
// import "litos-ui/styles/themes/coral.css";
// import "litos-ui/styles/themes/tangerine.css";
// import "litos-ui/styles/themes/apple.css";
// import "litos-ui/styles/themes/deep-sea-blue.css";
// import "litos-ui/styles/themes/gamboge.css";
// import "litos-ui/styles/themes/lotus-seed.css";
```

You can also load the stylesheets directly in HTML, keeping the same order:

```html
<link rel="stylesheet" href="/path/to/litos-ui/styles/vars.css" />
<link rel="stylesheet" href="/path/to/litos-ui/styles/themes/jade.css" />
```

## Selecting a Theme with data-theme

Set `data-theme` on `html` to select a loaded `jade`, `coral`, `tangerine`, `apple`, `deep-sea-blue`, `gamboge`, or `lotus-seed` theme. An explicit selection takes precedence over the base `:root` declarations regardless of their import order. Import the theme collection before the base variables to use the default blue when no theme is selected.

```js
import "litos-ui/styles/themes.css";
import "litos-ui/styles/vars.css";

// Select Lotus Seed, or use another loaded theme
document.documentElement.dataset.theme = "lotus-seed";

// Clear the selection and restore the default colors
document.documentElement.removeAttribute("data-theme");
```

`themes.css` imports all seven presets. You can also import only the `themes/<name>.css` files you need. When `data-theme` is absent or removed, matching variables follow import order: a theme imported after `vars.css` is applied automatically; importing `vars.css` last restores the default colors. Inline color variables on the root element override theme styles, so remove existing custom inline color variables before using presets.

For dark mode, also import `litos-ui/styles/dark.css` after the base variables, then toggle the `dark` class on the root element. This file only provides dark variable overrides; it does not switch modes automatically and is not implicitly loaded by `vars.css`.

Only loaded themes can be selected with `data-theme`. Setting the identifier of a theme that has not been imported does not load its CSS automatically.

## Theme Variable Source

Each theme file overrides only the colors it changes; other variables come from `vars.css`. You can import them directly or copy and customize them. Warning colors use `--l-warning-color`; text colors use `--l-text-color` and `--l-text-secondary-color`; subtle fill backgrounds use `--l-fill-secondary-color`.

The shared source files below retain their original Chinese comments.

### Jade · jade

<<< ../../styles/themes/jade.css

### Coral · coral

<<< ../../styles/themes/coral.css

### Tangerine · tangerine

<<< ../../styles/themes/tangerine.css

### Apple · apple

<<< ../../styles/themes/apple.css

### Deep Sea Blue · deep-sea-blue

<<< ../../styles/themes/deep-sea-blue.css

### Gamboge · gamboge

<<< ../../styles/themes/gamboge.css

### Lotus Seed · lotus-seed

<<< ../../styles/themes/lotus-seed.css

> For custom theme switching, see the [Theme component](/en/components/theme). If you have used the color picker to set inline color variables on the root element, remove those inline variables first so that the preset theme styles can take effect.

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const presets = [
  { id: "jade", name: "Jade", color: "#00AA7E" },
  { id: "coral", name: "Coral", color: "#FF6448" },
  { id: "tangerine", name: "Tangerine", color: "#FF7802" },
  { id: "apple", name: "Apple", color: "#9E8D51" },
  { id: "deep-sea-blue", name: "Deep Sea Blue", color: "#1D3D79" },
  { id: "gamboge", name: "Gamboge", color: "#FED110" },
  { id: "lotus-seed", name: "Lotus Seed", color: "#E515AA" },
];
const selected = ref("");
let observer;
function syncTheme() {
  selected.value = document.documentElement.getAttribute("data-theme") || "";
}
function selectTheme(id) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === id) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
  syncTheme();
}
onMounted(() => {
  syncTheme();
  observer = new MutationObserver(syncTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
});
onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.theme-preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.theme-status {
  padding: 6px 12px;
  border: 1px solid var(--status-color);
  border-radius: 6px;
  background: var(--status-bg);
  color: var(--status-color);
  font-size: 14px;
}
.theme-presets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin: 24px 0 16px;
}
.theme-preset {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.theme-preset:hover,
.theme-preset[aria-pressed="true"] {
  border-color: var(--preset-color);
  box-shadow: 0 0 0 1px var(--preset-color);
}
.theme-preset:focus-visible {
  outline: 3px solid var(--preset-color);
  outline-offset: 4px;
}
.theme-preset-swatch {
  width: 36px;
  height: 36px;
  margin-bottom: 4px;
  border-radius: 50%;
  background: var(--preset-color);
}
.theme-preset-name { font-size: 16px; font-weight: 600; }
.theme-preset-meta { font-size: 12px; color: var(--vp-c-text-2); }
.theme-preset-status { font-size: 13px; }
.theme-preset[aria-pressed="true"] .theme-preset-status { font-weight: 600; }
</style>