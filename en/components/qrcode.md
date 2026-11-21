---
url: https://dvshu.github.io/litos-ui/en/components/qrcode.md
---
# Qrcode

Generate QR codes using [qrcode-generator-es](https://www.npmjs.com/package/qrcode-generator-es) for rendering.

## Import and Registration

```js
import { Qrcode, regist } from "litos-ui";

regist(Qrcode);
```

## Examples

### Basic Usage

Set the QR code content with `text`.

```html
  <l-qrcode text="Hello World"></l-qrcode>
```

### Styling

Use `fill` to set the color and `size` to set the size. The renderer adjusts each QR module to whole pixels, so the actual size may be smaller than the requested `size`.

```html
  <l-qrcode text="Hello World" fill="#4998f4" size="120"></l-qrcode>
```

### Icon

Use `icon` to place a logo in the QR code.

```html
  <l-qrcode text="Hello World" icon="/litos-ui/logo.svg"></l-qrcode>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/qrcode";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Qrcode Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `text` | QR code content | `string` | — |
| `fill` | QR code color | `string` | `#000000` |
| `size` | QR code size | `string` | `120` |
| `level` | QR error correction level: `L`, `M`, `Q`, `H` | `string` | `M` |

The `icon` attribute accepts an image URL for the center logo. No logo is shown by default.
