# Calendar

Display dates and data in a calendar layout.

## Import and Registration

```js
import { regist, Calendar } from "litos-ui";

regist(Calendar);
```

Weekday labels support Chinese and English. These examples use `locale="en-US"`; the week starts on Monday in both languages.

## Examples

<script setup>
  import { $one, on, off } from 'utilane/browser';
  import { onMounted, onUnmounted, nextTick } from 'vue';

  let $calendar1;
  let $calendar2;
  let $calendar3;
  let selectedDates = [];
  let startRangeSelect = false;
  let rangeDate = [];

  function handleDayClick(e) {
    const detail = e.detail;
    if (!detail.isActiveMonth) {
      const dateItem = detail.day.split('-');
      $calendar1.setAttribute('year', dateItem[0]);
      $calendar1.setAttribute('month', Number(dateItem[1]));
    }
  }

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

  function updateRangeEnd(endDate) {
    rangeDate[1] = endDate;
    if (rangeDate[0] > rangeDate[1]) {
      const temp = rangeDate[0];
      rangeDate[0] = rangeDate[1];
      rangeDate[1] = temp;
    }
  }

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

  function handleDayHover(e) {
    if (!startRangeSelect) return;
    const detail = e.detail;
    updateRangeEnd(detail.dayTimestamp);
    $calendar3.value = rangeDate.join(",");
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $calendar1 = $one('#calendar1');
        $calendar2 = $one('#calendar2');
        $calendar3 = $one('#calendar3');
        if ($calendar1) {
          on($calendar1, 'day-click', handleDayClick);
        }
        if ($calendar2) {
          on($calendar2, 'day-click', handleDayClick2);
        }
        if ($calendar3) {
          on($calendar3, 'day-click', handleDayClick3);
          on($calendar3, 'day-hover', handleDayHover);
        }
      }
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($calendar1) {
        off($calendar1, 'day-click', handleDayClick);
      }
      if ($calendar2) {
        off($calendar2, 'day-click', handleDayClick2);
      }
      if ($calendar3) {
        off($calendar3, 'day-click', handleDayClick3);
        off($calendar3, 'day-hover', handleDayHover);
      }
    }
  });
</script>

### Basic Usage

Set `year` and `month` to display a specific month. The current year and month are used by default.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar locale="en-US" year="2026" month="2"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### Date Limits

Use `min-date` and `max-date` to limit the selectable dates.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar locale="en-US" min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### Changing the Month

Handle `day-click` to obtain the clicked date and change the displayed month when a date from an adjacent month is clicked.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar locale="en-US" id="calendar1"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### Selected Dates

Use `type="select"` and set `value` to select dates.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar locale="en-US" id="calendar2"></l-calendar>
</textarea>
<div class="source">
<textarea lang="html">
  <l-calendar locale="en-US" id="calendar2"></l-calendar>
</textarea>
<textarea lang="js">
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Separate dates in `value` with `&` to select multiple dates.

### Range Selection

Use `type="range"` and set `value` to two timestamps in `number,number` format to select a date range.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar locale="en-US" id="calendar3" type="range"></l-calendar>
</textarea>
<div class="source">
<textarea lang="html">
  <l-calendar locale="en-US" id="calendar3" type="range"></l-calendar>
</textarea>
<textarea lang="js">
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/calendar";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## Locale Resolution

`getLocale()` reads an explicit argument, sessionStorage, localStorage, `html.lang`, browser languages, then falls back to `zh-CN`. Both storage sources use the `locale` key with plain language strings; JSON and legacy cache formats are not parsed. Reading blocked storage is safe. The utility returns a language identifier; Calendar maps it to supported labels.

```js
import { getLocale } from "litos-ui/utils";
localStorage.setItem("locale", "en-US");
const locale = getLocale();
```

Changing the locale attribute updates an existing Calendar. Removing it reads the current environment again. Changing storage or html.lang alone does not automatically update mounted components; set their locale attributes when switching language.

## API

### Calendar Attributes

<!-- prettier-ignore -->
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

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| - | The default slot is not currently rendered |

### Calendar Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `day-click` | Fires when a date is clicked; detail contains isActiveMonth, day, dayTimestamp, minTimestamp, and maxTimestamp | `(event: CustomEvent)` |
| `day-hover` | Fires when a date is hovered; detail has the same structure as day-click | `(event: CustomEvent)` |

### Calendar CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-calendar-header-height` | Weekday header height | `32px` |
| `--l-calendar-off-text-color` | Text color for dates outside the displayed month | `#a8abb2` |