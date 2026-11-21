---
url: https://dvshu.github.io/litos-ui/en/components/calendar.md
---
# Calendar

Display dates and data in a calendar layout.

## Import and Registration

```js
import { regist, Calendar } from "litos-ui";

regist(Calendar);
```

Weekday labels support Chinese and English. These examples use `locale="en-US"`; the week starts on Monday in both languages.

## Examples

### Basic Usage

Set `year` and `month` to display a specific month. The current year and month are used by default.

```html
  <l-calendar locale="en-US" year="2026" month="2"></l-calendar>
```

### Date Limits

Use `min-date` and `max-date` to limit the selectable dates.

```html
  <l-calendar locale="en-US" min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
```

### Changing the Month

Handle `day-click` to obtain the clicked date and change the displayed month when a date from an adjacent month is clicked.

```html
  <l-calendar locale="en-US" id="calendar1"></l-calendar>
```

### Selected Dates

Use `type="select"` and set `value` to select dates.

```html
  <l-calendar locale="en-US" id="calendar2"></l-calendar>
```

```js
  const $calendar2 = $one('#calendar2');
  const selectedDates = [];
  //-
  function handleDayClick2(e) {
    const detail = e.detail;
    let i = selectedDates.indexOf(detail.day);
    if (i !== -1) {
      selectedDates.splice(i, 1);
    } else {
      selectedDates.push(detail.day);
    }
    $calendar2.value = selectedDates.join("&");
  }
  //-
  on($calendar2, 'day-click', handleDayClick2);
```

> Separate dates in `value` with `&` to select multiple dates.

### Range Selection

Use `type="range"` and set `value` to two timestamps in `number,number` format to select a date range.

```html
  <l-calendar locale="en-US" id="calendar3" type="range"></l-calendar>
```

```js
  const $calendar3 = $one('#calendar3');
  let startRangeSelect = false;
  let rangeDate = [];
  //-
  function updateRangeEnd(endDate) {
    rangeDate[1] = endDate;
    if (rangeDate[0] > rangeDate[1]) {
      const temp = rangeDate[0];
      rangeDate[0] = rangeDate[1];
      rangeDate[1] = temp;
    }
  }
  //-
  function handleDayClick3(e) {
    const detail = e.detail;
    if (!startRangeSelect) {
      startRangeSelect = true;
      rangeDate = [detail.dayTimestamp, detail.dayTimestamp];
    } else {
      updateRangeEnd(detail.dayTimestamp);
      startRangeSelect = false;
    }
    $calendar3.value = rangeDate.join(",");
  }
  //-
  function handleDayHover(e) {
    if (!startRangeSelect) return;
    const detail = e.detail;
    updateRangeEnd(detail.dayTimestamp);
    $calendar3.value = rangeDate.join(",");
  }
  //-
  on($calendar3, 'day-click', handleDayClick3);
  on($calendar3, 'day-hover', handleDayHover);
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/calendar";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## Locale Resolution

`getLocale()` reads an explicit argument, sessionStorage, localStorage, `html.lang`, browser languages, then falls back to `zh-CN`. Both storage sources use the `locale` key with plain language strings; JSON and legacy cache formats are not parsed. Reading blocked storage is safe. The utility returns a language identifier; Calendar maps it to supported labels.

```js
import { getLocale } from "utilane/browser";
localStorage.setItem("locale", "en-US");
const locale = getLocale();
```

Changing the locale attribute updates an existing Calendar. Removing it reads the current environment again. Changing storage or html.lang alone does not automatically update mounted components; set their locale attributes when switching language.

## API

### Calendar Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `min-date` | Earliest date, for example `2026-04-03` | `string` | - |
| `max-date` | Latest date, for example `2026-04-03` | `string` | - |
| `year` | Year, for example `2026` | `number` | Current year |
| `month` | Month, for example `4` | `number` | Current month |
| `type` | Calendar mode: select or range | `string` | `select` |
| `value` | Selected dates: &-separated date strings in select mode, or two comma-separated timestamps in range mode; also available as the value property | `string` | - |
| `locale` | Locale; en variants use en-US, zh variants and unsupported languages use zh-CN; supports dynamic updates | `string` | Resolved by getLocale(), with zh-CN as the final fallback |

### Calendar Slots

| Name | Description |
| --- | --- |
| - | The default slot is not currently rendered |

### Calendar Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `day-click` | Fires when a date is clicked; detail contains isActiveMonth, day, dayTimestamp, minTimestamp, and maxTimestamp | `(event: CustomEvent)` |
| `day-hover` | Fires when a date is hovered; detail has the same structure as day-click | `(event: CustomEvent)` |

### Calendar CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-calendar-header-height` | Weekday header height | `32px` |
| `--l-calendar-off-text-color` | Text color for dates outside the displayed month | `#a8abb2` |
