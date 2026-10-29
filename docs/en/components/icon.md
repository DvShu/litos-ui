# Icon

The built-in icon set is limited. For more icons, consider [Iconify](https://iconify.design/docs/iconify-icon/).

## Basic Usage

### Import and Registration

```js
import { ArrowDownIcon, regist, BaseIcon, CaretBottomIcon, FontIcon } from "litos-ui";

regist(ArrowDownIcon);
// ...

// Register the additional components used by this page's demos.
regist([BaseIcon, CaretBottomIcon, FontIcon]);
```

### Usage

```html
<l-arrow-down-icon></l-arrow-down-icon>
```

### Built-in Icons

The library includes the following icons:

<ClientOnly>
  <l-icon-list></l-icon-list>
</ClientOnly>

### Iconfont Icons

Load the iconfont file separately, then set the `name` attribute to the corresponding `id` in that file.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-font-icon name="icon-red-packet"></l-font-icon>
</textarea>
</l-code-preview>
</ClientOnly>

### Custom Icons

Create a custom icon by placing SVG path elements inside `l-base-icon`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-base-icon>
    <path
      d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
      fill="#231F20"
    ></path>
  </l-base-icon>
</textarea>
</l-code-preview>
</ClientOnly>

> You can also create custom icons by extending `BaseIcon`.

```js
import { BaseIcon, regist } from "litos-ui";

class MyIcon extends BaseIcon {
  constructor() {
    super();
    this.viewBox = "0 0 1024 1024"; // Default
  }

  renderChildren() {
    return '<path fill="currentColor" d="M512 320 192 704h639.936z"></path>';
  }
}

regist(MyIcon, "my-icon");

// <my-icon></my-icon>
```

### Color and Size

Set the color and size through the CSS `color` and `font-size` properties, or use the `color` and `size` attributes.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-caret-bottom-icon style="color:red;font-size:32px;"></l-caret-bottom-icon>
  <l-caret-bottom-icon color="red" size="32"></l-caret-bottom-icon>
</textarea>
</l-code-preview>
</ClientOnly>

> These examples use the `style` attribute. You can also apply styles through a CSS class.

### Icon Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | Icon color | `string` | - |
| `size` | Icon size; numbers are treated as px, and CSS units are also supported | `string` | - |

### Icon Properties

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `viewBox` | Sets the SVG viewBox before the initial render; the view-box attribute is not observed | `string` | `0 0 1024 1024` for BaseIcon; individual icons may override it |

### CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-icon-size` | Size | `-` |
| `--l-icon-color` | Color | `-` |

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/icon/loading";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.