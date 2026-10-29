# On-demand Imports

Import a lowercase kebab-case subpath in your client entry. Element entries register the element and its built-in dependencies. Base variables remain an explicit import.

This page describes the package built from the current source. Until a release containing these entries is published, install a local `npm pack` tarball to try them; existing npm releases may not provide these paths.

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
import "litos-ui/input-number";
```

```html
<l-button type="primary" loading>Save</l-button> <l-input-number value="2"></l-input-number>
```

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary">Save</l-button>
  <l-button type="primary" loading>Saving</l-button>
  <l-input-number value="2"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

Button includes its loading icon. Parent entries such as form, tabbar, carousel and collapse include their standard child elements. Consumers import components placed in custom slots separately. Theme includes all its built-in display modes. Importing one icon, for example `litos-ui/icon/arrow-left`, registers only that icon.

Notification requires explicit registration: neither `litos-ui/notification` nor `litos-ui/notification-box` registers elements or icons.

## Classes and services

Element subpaths also provide the default class and public types. They register the same constructors exported by the root entry, so mixing subpaths with manual `regist()` calls is safe. The root entry remains available and does not automatically register components.

```js
import Button from "litos-ui/button";
import Message from "litos-ui/message";
import Notification from "litos-ui/notification";
import NotificationBox from "litos-ui/notification-box";
import { regist, InfoIcon, SuccessIcon, WarnIcon, CloseFilledIcon, CloseIcon } from "litos-ui";
regist([InfoIcon, SuccessIcon, WarnIcon, CloseFilledIcon, CloseIcon, Notification]);
import { Popover, popconfirmProps } from "litos-ui/popconfirm";

Message.success("Saved");
NotificationBox.success("Saved");
```

```ts
import type { UploadFile } from "litos-ui/upload";
import type { Column } from "litos-ui/table";
```

Service entries require explicit API calls. Their global CSS imports are currently commented out for future Vite plugin configuration; entries do not inject styles into document.head. Importing them does not open a message, create a global API variable, or scan the page. Use `litos-ui/popover` for plain Popover; `litos-ui/popconfirm` additionally registers Button and WarnIcon for the confirmation configuration. Tabs.init() and createTransition().init() remain explicit operations with cleanup.

## Styles, themes and SSR

Element Shadow DOM styles come with the entry. Components reuse module-level CSSStyleSheet instances directly. Global CSS for Message, loading, dialog, modal-box, notification, tabs, popover, select and date-picker must currently be imported explicitly through the existing styles subpaths or configured by a future Vite plugin. Import vars.css once. For dark mode, also import `litos-ui/styles/dark.css` after it and toggle the root element's `dark` class; reset, container, scrollbar and preset theme CSS remain explicit opt-ins through existing styles subpaths. Choose only one preset. No global stylesheet containing the entire library is required.

```js
import "litos-ui/styles/theme-jade.css";
document.documentElement.classList.toggle("dark");
```

These are browser modules. In SSR frameworks, import them inside a client-only entry or mounted lifecycle hook:

```js
await import("litos-ui/button");
```

Tree shaking removes unused pure exports and unrelated components. Explicit auto-registration entries are intentional side effects and remain in production bundles. Keep the package sideEffects metadata when repackaging. No auto-import plugin is required. Existing root imports and lib/styles/types subpaths remain supported.

## Entries

<!-- prettier-ignore -->
| Subpath | Behavior |
| --- | --- |
| `litos-ui/base` | Explicit API |
| `litos-ui/message` | Service API |
| `litos-ui/dialog` | Service API |
| `litos-ui/dialog-container` | Auto-registration |
| `litos-ui/dialog-box` | Service API |
| `litos-ui/loading` | Service API |
| `litos-ui/tabs` | Service API |
| `litos-ui/modal` | Auto-registration |
| `litos-ui/modal-box` | Service API |
| `litos-ui/icon/base` | Auto-registration |
| `litos-ui/icon/arrow-down` | Auto-registration |
| `litos-ui/icon/arrow-left` | Auto-registration |
| `litos-ui/icon/arrow-right` | Auto-registration |
| `litos-ui/icon/arrow-up` | Auto-registration |
| `litos-ui/icon/caret-top` | Auto-registration |
| `litos-ui/icon/caret-bottom` | Auto-registration |
| `litos-ui/icon/font-icon` | Auto-registration |
| `litos-ui/icon/loading` | Auto-registration |
| `litos-ui/icon/search` | Auto-registration |
| `litos-ui/icon/sun` | Auto-registration |
| `litos-ui/icon/moon` | Auto-registration |
| `litos-ui/icon/reduction` | Auto-registration |
| `litos-ui/icon/refresh-left` | Auto-registration |
| `litos-ui/icon/refresh-right` | Auto-registration |
| `litos-ui/icon/sort` | Auto-registration |
| `litos-ui/icon/theme-default` | Auto-registration |
| `litos-ui/icon/close` | Auto-registration |
| `litos-ui/icon/info` | Auto-registration |
| `litos-ui/icon/success` | Auto-registration |
| `litos-ui/icon/warn` | Auto-registration |
| `litos-ui/icon/close-filled` | Auto-registration |
| `litos-ui/icon/more` | Auto-registration |
| `litos-ui/icon/d-arrow-left` | Auto-registration |
| `litos-ui/icon/d-arrow-right` | Auto-registration |
| `litos-ui/icon/zoom-in` | Auto-registration |
| `litos-ui/icon/zoom-out` | Auto-registration |
| `litos-ui/icon/select` | Auto-registration |
| `litos-ui/icon/calendar` | Auto-registration |
| `litos-ui/icon/refresh` | Auto-registration |
| `litos-ui/icon/copy` | Auto-registration |
| `litos-ui/icon/plus` | Auto-registration |
| `litos-ui/icon/minus` | Auto-registration |
| `litos-ui/icon/eye-outline` | Auto-registration |
| `litos-ui/icon/delete` | Auto-registration |
| `litos-ui/icon/picture` | Auto-registration |
| `litos-ui/form` | Auto-registration |
| `litos-ui/form-item` | Auto-registration |
| `litos-ui/radio-group` | Auto-registration |
| `litos-ui/radio` | Auto-registration |
| `litos-ui/checkbox` | Auto-registration |
| `litos-ui/checkbox-group` | Auto-registration |
| `litos-ui/button` | Auto-registration |
| `litos-ui/input` | Auto-registration |
| `litos-ui/input-number` | Auto-registration |
| `litos-ui/select-ori` | Auto-registration |
| `litos-ui/switch` | Auto-registration |
| `litos-ui/md-input` | Auto-registration |
| `litos-ui/select` | Auto-registration |
| `litos-ui/date-picker` | Auto-registration |
| `litos-ui/date-picker-ori` | Auto-registration |
| `litos-ui/color-picker` | Auto-registration |
| `litos-ui/list` | Auto-registration |
| `litos-ui/polygon` | Auto-registration |
| `litos-ui/tabbar` | Auto-registration |
| `litos-ui/tabbar-item` | Auto-registration |
| `litos-ui/theme` | Auto-registration |
| `litos-ui/theme-color` | Auto-registration |
| `litos-ui/menu` | Auto-registration |
| `litos-ui/carousel` | Auto-registration |
| `litos-ui/carousel-item` | Auto-registration |
| `litos-ui/qrcode` | Auto-registration |
| `litos-ui/description-panel` | Auto-registration |
| `litos-ui/pagination` | Auto-registration |
| `litos-ui/mask` | Auto-registration |
| `litos-ui/page-header` | Auto-registration |
| `litos-ui/tag` | Auto-registration |
| `litos-ui/collapse` | Auto-registration |
| `litos-ui/collapse-item` | Auto-registration |
| `litos-ui/image` | Auto-registration |
| `litos-ui/image-preview` | Auto-registration |
| `litos-ui/table` | Auto-registration |
| `litos-ui/space` | Auto-registration |
| `litos-ui/card` | Auto-registration |
| `litos-ui/calendar` | Auto-registration |
| `litos-ui/upload` | Auto-registration |
| `litos-ui/notification` | Auto-registration |
| `litos-ui/popover` | Explicit API |
| `litos-ui/popconfirm` | Explicit API |
| `litos-ui/transition` | Explicit API |
| `litos-ui/utils` | Explicit API |