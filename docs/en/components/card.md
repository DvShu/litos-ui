# Card

A general-purpose card, commonly used in dashboard overview pages.

## Import and Registration

```js
import { Card, regist, Button } from "litos-ui";

regist(Card);

// Register additional components used in this page’s demos.
regist([Button]);
```

## Basic Card

A card with a header, content, and actions.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card header-text="Card title">
    <div>Card content</div>
    <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## Simple Card

Show only the content area by setting `show-header="false"`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card header-text="Card title" show-header="false">
    <div>Card content</div>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## Complete Card

A card with a header, content, actions, and a footer.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card header-text="Card title" show-footer footer-text="Footer">
    <div>Card content</div>
    <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## Custom Header and Footer

Set `header-text` and `footer-text`, or customize these areas with the `header` and `footer` slots.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card show-footer>
    <span slot="header" style="color: red">Card title</span>
    <div>Card content</div>
    <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    <span slot="footer" style="color: orange">Footer</span>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## Grid Cards

Combine cards with a grid layout to build a dashboard overview.

The library does not provide a grid layout. You can use [unocss](https://unocss.dev/interactive/?s=grid) or [tailwindcss](https://tailwindcss.com/docs/display#grid) for a CSS grid layout.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="grid grid-cols-3 gap-4">
    <l-card header-text="Card title1">
      <div>Card content1</div>
      <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    </l-card>
    <l-card header-text="Card title2">
      <div>Card content2</div>
      <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    </l-card>
    <l-card header-text="Card title3">
      <div>Card content3</div>
      <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    </l-card>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/card";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Card Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `header-text` | Header text | `string` | - |
| `show-header` | Whether to show the header | `boolean` | `true` |
| `footer-text` | Footer text | `string` | - |
| `show-footer` | Whether to show the footer | `boolean` | `false` |

### Card Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Body content |
| `header` | Custom header content |
| `footer` | Custom footer content |
| `header-extra` | Custom content to the right of the header (actions) |

### CSS Parts

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `header` | Header area |
| `body` | Body area |
| `footer` | Footer |

Customize the header with `::part(header)`:

```css
l-card::part(header) {
  background-color: #f5f5f5;
}
```

### CSS Variables

The component provides light-color fallbacks through `var()`, so you do not need to define every variable. The table below lists these fallbacks; the border uses `--l-border-color` when available.

Dark colors are provided by global theme variables. Import `litos-ui/styles/vars.css` and `litos-ui/styles/dark.css`, then add `dark` to `html`. The Card variables in `:root.dark` are inherited by the component:

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/dark.css";

document.documentElement.classList.add("dark");
```

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-card-bg` | Card background | `#ffffff` |
| `--l-card-text-color` | Card text color | `#333` |
| `--l-card-border-color` | Card border color | `var(--l-border-color, #e8e8e8)` |

You can also set variables on an ancestor or an individual `l-card`. Local overrides still apply in dark mode. For example, add `custom-card` to a card and set:

```css
l-card.custom-card {
  --l-card-bg: #f0f9ff;
  --l-card-text-color: #164e63;
  --l-card-border-color: #bae6fd;
}
```