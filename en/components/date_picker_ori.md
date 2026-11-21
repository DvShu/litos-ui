---
url: https://dvshu.github.io/litos-ui/en/components/date_picker_ori.md
---
# DatePickerOri

A date input and picker built on native `input` elements.

## Import and Registration

```js
import { DatePickerOri, regist } from "litos-ui";

regist(DatePickerOri);
```

## Examples

### Basic Usage

Set `type` to `date`, `datetime-local`, `time`, `month`, or `week`. Use `value` for the initial value.

```html
  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02T17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
```

```js
  import { on, $ } from 'utilane/browser';
  //-
  const $pickers = $('l-date-picker-ori');
  on($pickers, 'change', (e) => {
    // { value: string, dateStr: string[], dates: Date[] }
    const detail = e.detail;
  });
```

> Support for `month` and `week` depends on the browser.

### Date Limits

Limit the date range with `min` and `max`.

```html
  <l-date-picker-ori min="2025-04-01" max="2025-04-30"></l-date-picker-ori>
```

### Range Picker

Enable `range` to select a date range.

The `value` property and the native form submission both use a comma-separated string. The start date sets the minimum for the end date, and the end date sets the maximum for the start date.

```html
  <l-date-picker-ori range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker-ori>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/date-picker-ori";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### DatePickerOri Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `value` | Initial value; in range mode, separate the start and end dates with a comma, for example 2025-04-01,2025-04-15 | `string` | `-` |
| `min` | Earliest date | `string` | `-` |
| `max` | Latest date | `string` | `-` |
| `type` | Input type: date, datetime-local, time, month, or week | `string` | `date` |
| `range` | Whether to enable range selection | `boolean` | `false` |
| `allow-empty` | Whether empty values are allowed; false restores the initial value when cleared | `boolean` | `true` |
| `disabled` | Whether the control is disabled | `boolean` | `false` |
| `width` | Width | `string` | `-` |
| `delay` | Change event delay in range mode, in milliseconds; defaults to 300 to batch changes. Set 0 to emit immediately | `number` | `300` |

### DatePickerOri Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the date changes; event.detail contains the current value | `(event: CustomEvent)` |

Initial `datetime-local` values must use the native input format, for example `2025-05-02T17:00`.
