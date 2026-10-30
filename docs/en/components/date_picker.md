# DatePicker

This date panel is still under development. It opens a popover and supports width configuration, but date selection, value updates, month navigation, and the current-time button are not implemented. For native date or range input, use [DatePickerOri](./date_picker_ori).

## Import and Registration

```js
import {
  regist,
  DatePicker,
  Calendar,
  CalendarIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
} from "litos-ui";
import "litos-ui/styles/datepicker.css";

regist([
  DatePicker,
  Calendar,
  CalendarIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
]);
```

## Examples

### Basic Usage

Click the input to open the date panel. This demo does not provide date selection or value updates.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-date-picker></l-date-picker>
</textarea>
<div class="source">
<textarea lang="html">
  <l-date-picker></l-date-picker>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/datepicker.css";
import "litos-ui/date-picker";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

The embedded calendar and unfinished panel controls retain their built-in Chinese labels.

## API

### DatePicker Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `width` | Width | `string` | `-` |

### DatePicker Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| - | The default slot is not currently rendered |

### DatePicker Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `click` | Native click event; does not indicate date selection or a value change | `(event: Event)` |

### DatePicker Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| - | - | - |

### DatePicker CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-date-picker-width` | Width | `140px` |
| `--l-form-control-height` | Height | `40px` (with vars.css; component fallback without it: 32px) |
| `--l-border-color` | Border color | `#dedede` |
| `--l-border-radius` | Border radius | `5px` (with vars.css; component fallback without it: 3px) |