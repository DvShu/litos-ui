---
url: https://dvshu.github.io/litos-ui/en/components/container.md
---
# Container

These container styles use flexbox to build common admin dashboard layouts and quickly establish a page structure:

* `l-container`: Outer container, typically a `section`. Arranges children horizontally by default; add `l-layout-vertical` for a vertical layout. Containers can be nested.
* `l-header`: Header container, typically a `header`.
* `l-aside`: Sidebar container, typically an `aside`.
* `l-main`: Main content container, typically a `main`.
* `l-footer`: Footer container, typically a `footer`.

These layouts are commonly used for admin dashboard home pages.

## Imports

These styles are not packaged as a custom element. Import the stylesheet manually when needed.

```ts
import "litos-ui/styles/container.css";
```

## Common Layouts

### Header and Main Content

```html
  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
  </section>
```

### Sidebar and Main Content

```html
  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <main class="l-main">Main</main>
  </section>
```

### Vertical Layout with a Nested Horizontal Container

```html
  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
```

### Horizontal Layout with a Nested Vertical Container

```html
  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <section class="l-container l-layout-vertical">
      <header class="l-header">Header</header>
      <main class="l-main">Main</main>
    </section>
  </section>
```

### Header, Main Content, and Footer

```html
  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
    <footer class="l-footer">Footer</footer>
  </section>
```

### Classic Admin Dashboard

Place a logo on the left and the signed-in user on the right of the header. Add a menu to the sidebar and page content to the main area to create a classic admin dashboard layout.

```html
  <section class="l-container l-layout-vertical">
    <header class="l-header">
      <a href="#">LitosUI</a>
      <div>Signed-in user</div>
    </header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
```

## Theming

### CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-header-height` | Header height | `50px` |
| `--l-aside-width` | Sidebar width | `240px` |
| `--l-footer-height` | Footer height | `var(--l-header-height, 50px)` |
