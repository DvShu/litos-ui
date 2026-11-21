---
url: https://dvshu.github.io/litos-ui/en/theme.md
---
# Preset Themes

Switch themes by overriding the CSS variables defined in `styles/vars.css`. Components inherit variables from their containing element, so they do not need to be registered or rendered again.

## Preset Themes

Seven preset themes are available: **Jade (jade, #00AA7E)**, **Coral (coral, #FF6448)**, **Tangerine (tangerine, #FF7802)**, **Apple (apple, #9E8D51)**, **Deep Sea Blue (deep-sea-blue, #1D3D79)**, **Gamboge (gamboge, #FED110)**, and **Lotus Seed (lotus-seed, #E515AA)**.

Each theme includes a primary color, color shades, status colors, and neutral colors. Control heights and border radii still use the base variables. Primary, success, error, and warning colors are configured independently; when colors are similar, the corresponding status color is adjusted to keep them distinct.

Select a card to apply its theme. Select it again to restore the default blue. Only one preset can be selected at a time, and the light or dark mode stays unchanged.

```
<button v-for="preset in presets" :key="preset.id" type="button" class="theme-preset" :style="{ '--preset-color': preset.color }" :aria-pressed="selected === preset.id" @click="selectTheme(preset.id)">
  <span class="theme-preset-swatch" aria-hidden="true"></span>
  <span class="theme-preset-name">{{ preset.name }}</span>
  <span class="theme-preset-meta">{{ preset.id }} · {{ preset.color }}</span>
  <span class="theme-preset-status">{{ selected === preset.id ? 'Selected ✓' : 'Apply theme' }}</span>
</button>
```

  <p aria-live="polite">Current theme: {{ presets.find(preset => preset.id === selected)?.name || 'Default blue' }}</p>

```
<l-button type="primary">Primary button</l-button>
<span class="theme-status" style="--status-color: var(--l-success-color); --status-bg: var(--l-success-color-light5)">Success</span>
<span class="theme-status" style="--status-color: var(--l-error-color); --status-bg: var(--l-error-color-light5)">Error</span>
<span class="theme-status" style="--status-color: var(--l-warning-color); --status-bg: var(--l-warning-color-light5, var(--vp-c-bg-soft))">Warning</span>
```

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

```css
/* 翡翠绿主题 · #00AA7E，先引入 vars.css */
:root,
:root[data-theme="jade"] {
  /* 主题色 */
  --l-primary-color: #00aa7e;
  --l-primary-color-light1: #33bb98;
  --l-primary-color-light2: #66ccb2;
  --l-primary-color-light3: #99ddcb;
  --l-primary-color-light4: #cceee5;
  --l-primary-color-light5: #e6f7f2;
  --l-primary-color-dark1: #008865;
  --l-primary-color-dark2: #00664c;
  /* 状态色：保持成功、错误和警告的语义区别 */
  --l-success-color: #389e60;
  --l-success-color-light1: #60b180;
  --l-success-color-light2: #88c5a0;
  --l-success-color-light3: #afd8bf;
  --l-success-color-light4: #d7ecdf;
  --l-success-color-light5: #ebf5ef;
  --l-success-color-dark1: #2d7e4d;
  --l-error-color: #df4b52;
  --l-error-color-light3: #f2b7ba;
  --l-error-color-light5: #fcedee;
  --l-warning-color: #d99016;
  --l-warning-color-light5: #fbf4e8;
  --l-text-color: #354a42;
  --l-text-secondary-color: #596e65;
  --l-fill-secondary-color: #f8f9f9;
  /* 中性色 */
  --l-border-color: #d8e5e0;
  --l-disabled-color: #e5ece9;
}

/* 暗黑模式下保持禁用状态的可辨识度 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### Coral · coral

```css
/* 珊瑚红主题 · #FF6448，先引入 vars.css */
:root,
:root[data-theme="coral"] {
  /* 主题色 */
  --l-primary-color: #ff6448;
  --l-primary-color-light1: #ff836d;
  --l-primary-color-light2: #ffa291;
  --l-primary-color-light3: #ffc1b6;
  --l-primary-color-light4: #ffe0da;
  --l-primary-color-light5: #fff0ed;
  --l-primary-color-dark1: #cc503a;
  --l-primary-color-dark2: #993c2b;
  /* 状态色：保持成功、错误和警告的语义区别 */
  --l-success-color: #409b72;
  --l-success-color-light1: #66af8e;
  --l-success-color-light2: #8cc3aa;
  --l-success-color-light3: #b3d7c7;
  --l-success-color-light4: #d9ebe3;
  --l-success-color-light5: #ecf5f1;
  --l-success-color-dark1: #337c5b;
  --l-error-color: #d9364f;
  --l-error-color-light3: #f0afb9;
  --l-error-color-light5: #fbebed;
  --l-warning-color: #d99420;
  --l-warning-color-light5: #fbf4e9;
  --l-text-color: #51413d;
  --l-text-secondary-color: #75605a;
  --l-fill-secondary-color: #f9f8f8;
  /* 中性色 */
  --l-border-color: #e8dcd8;
  --l-disabled-color: #efe7e4;
}

/* 暗黑模式下保持禁用状态的可辨识度 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### Tangerine · tangerine

```css
/* 活力橙主题 · #FF7802，先引入 vars.css */
:root,
:root[data-theme="tangerine"] {
  /* 主题色 */
  --l-primary-color: #ff7802;
  --l-primary-color-light1: #ff9335;
  --l-primary-color-light2: #ffae67;
  --l-primary-color-light3: #ffc99a;
  --l-primary-color-light4: #ffe4cc;
  --l-primary-color-light5: #fff2e6;
  --l-primary-color-dark1: #cc6002;
  --l-primary-color-dark2: #994801;
  /* 状态色：保持成功、错误和警告的语义区别 */
  --l-success-color: #489b60;
  --l-success-color-light1: #6daf80;
  --l-success-color-light2: #91c3a0;
  --l-success-color-light3: #b6d7bf;
  --l-success-color-light4: #daebdf;
  --l-success-color-light5: #edf5ef;
  --l-success-color-dark1: #3a7c4d;
  --l-error-color: #dc4848;
  --l-error-color-light3: #f1b6b6;
  --l-error-color-light5: #fceded;
  --l-warning-color: #d9a11b;
  --l-warning-color-light5: #fbf6e8;
  --l-text-color: #4d4338;
  --l-text-secondary-color: #726452;
  --l-fill-secondary-color: #f9f9f8;
  /* 中性色 */
  --l-border-color: #e8dfd3;
  --l-disabled-color: #eee9e1;
}

/* 暗黑模式下保持禁用状态的可辨识度 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### Apple · apple

```css
/* 苹果主题 · #9E8D51；默认配色按引入顺序覆盖，data-theme 可显式选择。 */
:root,
:root[data-theme="apple"] {
  --l-primary-color: #9e8d51;
  --l-primary-color-light1: #b1a474;
  --l-primary-color-light2: #c5bb97;
  --l-primary-color-light3: #d8d1b9;
  --l-primary-color-light4: #ece8dc;
  --l-primary-color-light5: #f5f4ee;
  --l-primary-color-dark1: #7e7141;
  --l-primary-color-dark2: #5f5531;
  --l-success-color: #52c41a;
  --l-success-color-light1: #73d13d;
  --l-success-color-light2: #95de64;
  --l-success-color-light3: #b7eb8f;
  --l-success-color-light4: #d9f7be;
  --l-success-color-light5: #f6ffed;
  --l-success-color-dark1: #389e0d;
  --l-success-color-dark2: #317610;
  --l-error-color: #f5222d;
  --l-error-color-light1: #f74e57;
  --l-error-color-light2: #f97a81;
  --l-error-color-light3: #ffa39e;
  --l-error-color-light4: #fdd3d5;
  --l-error-color-light5: #fff1f0;
  --l-error-color-dark1: #c41b24;
  --l-error-color-dark2: #93141b;
  /* 主色与默认警告色相近，使用深琥珀色保持警告语义。 */
  --l-warning-color: #a65b00;
  --l-warning-color-light1: #b87c33;
  --l-warning-color-light2: #ca9d66;
  --l-warning-color-light3: #dbbd99;
  --l-warning-color-light4: #eddecc;
  --l-warning-color-light5: #f6efe6;
  --l-warning-color-dark1: #854900;
  --l-warning-color-dark2: #643700;
  --l-text-color: #433f30;
  --l-text-secondary-color: #68614d;
  --l-fill-secondary-color: #faf9f5;
  --l-border-color: #e5e0cf;
  --l-disabled-color: #ebe8de;
}

/* 暗黑模式下保持禁用状态的可辨识度。 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### Deep Sea Blue · deep-sea-blue

```css
/* 深海蓝主题 · #1D3D79；其余颜色继承 vars.css。 */
:root,
:root[data-theme="deep-sea-blue"] {
  --l-primary-color: #1d3d79;
  --l-primary-color-light1: #4a6494;
  --l-primary-color-light2: #778baf;
  --l-primary-color-light3: #a5b1c9;
  --l-primary-color-light4: #d2d8e4;
  --l-primary-color-light5: #e8ecf2;
  --l-primary-color-dark1: #173161;
  --l-primary-color-dark2: #112549;
}
```

### Gamboge · gamboge

```css
/* 藤黄主题 · #FED110；未变化的颜色继承 vars.css。 */
:root,
:root[data-theme="gamboge"] {
  --l-primary-color: #fed110;
  --l-primary-color-light1: #feda40;
  --l-primary-color-light2: #fee370;
  --l-primary-color-light3: #ffed9f;
  --l-primary-color-light4: #fff6cf;
  --l-primary-color-light5: #fffae7;
  --l-primary-color-dark1: #cba70d;
  --l-primary-color-dark2: #987d0a;
  --l-warning-color: #b86e00;
  --l-warning-color-light5: #f8f1e6;
  --l-primary-contrast-color: #332900;
}
```

### Lotus Seed · lotus-seed

```css
/* 莲子主题 · #E515AA；其余颜色继承 vars.css。 */
:root,
:root[data-theme="lotus-seed"] {
  --l-primary-color: #e515aa;
  --l-primary-color-light1: #ea44bb;
  --l-primary-color-light2: #ef73cc;
  --l-primary-color-light3: #f5a1dd;
  --l-primary-color-light4: #fad0ee;
  --l-primary-color-light5: #fce8f7;
  --l-primary-color-dark1: #b71188;
  --l-primary-color-dark2: #890d66;
}
```

> For custom theme switching, see the [Theme component](https://dvshu.github.io/litos-ui/en/components/theme.md). If you have used the color picker to set inline color variables on the root element, remove those inline variables first so that the preset theme styles can take effect.
