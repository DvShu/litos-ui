# Getting Started

LitosUI uses the [utilane](https://github.com/DvShu/utilane#readme) utility library.

## Usage

### Installation

```shell
npm install litos-ui
```

### Import and Registration

```js
import "litos-ui/styles/vars.css";
import { Button, regist } from "litos-ui";

// Register the Web Component, then use it as <l-button></l-button>.
regist(Button);
```

Import the styles and register components in your client entry point before using them on the page:

```html
<l-button type="primary">Button</l-button>
```

### Registering Components

`regist()` accepts a single component or an array of components. Component tags use the `l-` prefix followed by the component's `baseName`. For example, `Button` becomes `l-button`.

Custom component prefixes and tag names are currently unsupported; use the default `l-` tags. The library does not provide a `config()` API for setting a global prefix.

```js
import { Button, Input, regist } from "litos-ui";

regist([Button, Input]);
```

If a tag name is already registered, `regist()` skips it.

### Services and Optional Auto-imports

Services require their corresponding global styles. For example, to use Message manually:

```js
import "litos-ui/styles/message.css";
import { Message } from "litos-ui";

Message.success("Operation successful");
```

To automatically import service APIs and their styles, you can optionally use an auto-import plugin:

```shell
npm install -D unplugin-auto-import litosui-unplugin-resolver
```

Add the plugin to your Vite configuration, keeping your existing project configuration:

```js
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import LitosuiResolver from "litosui-unplugin-resolver";

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [LitosuiResolver()],
      dts: "src/auto-imports.d.ts",
    }),
  ],
});
```

Web Components still need to be registered with `regist()`.

### Global Variables

The library uses CSS variables for styling. Import the global variables stylesheet explicitly in your entry file, such as `main.ts`, to configure these values:

```js
import "litos-ui/styles/vars.css";
```

The shared source file is shown below. Its original Chinese comments are preserved:

<<< ../../styles/vars.css

### Dark Mode

Dark mode variables are in the separate `dark.css` file. Import it explicitly after `vars.css`, then add the `dark` class to the root element to enable dark mode. Remove the class to return to light mode. Importing `vars.css` alone does not include the dark color overrides.

```javascript
import "litos-ui/styles/dark.css";

document.documentElement.classList.add("dark");
```

## On-demand Imports

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
import "litos-ui/input-number";
```

These client-only element entries register themselves and their configured dependencies. Import additional dependencies explicitly for conditional features; for example, Button's loading state requires `import "litos-ui/icon/loading"`. Root imports with manual `regist()` remain supported. Service subpaths, such as the default import from `litos-ui/message`, do not automatically import global styles: CSS imports in these entries are currently commented out for future Vite plugin configuration. Service APIs still require explicit calls. See [On-demand Imports](/en/on_demand) for the complete entry list, types, and SSR limitations.