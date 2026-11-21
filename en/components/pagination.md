---
url: https://dvshu.github.io/litos-ui/en/components/pagination.md
---
# Pagination

Split large datasets into pages so users can move between them without loading everything at once.

## Import and Registration

```js
import {
  Pagination,
  regist,
  Button,
  ArrowLeftIcon,
  ArrowRightIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  MoreIcon,
  Input,
} from "litos-ui";

regist([
  Pagination,
  Button,
  ArrowLeftIcon,
  ArrowRightIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  MoreIcon,
  Input,
]);
```

## Examples

### Basic Usage

Set `total` or `page-count` to display pagination. Handle page changes in the `change` event.

```html
  <l-pagination total="100"></l-pagination>
```

### Alignment

Set `align` to `start`, `center`, or `end` to control alignment.

```html
  <l-pagination total="100" align="start"></l-pagination>
  <hr/>
  <l-pagination total="100" align="center"></l-pagination>
  <hr/>
  <l-pagination total="100" align="end"></l-pagination>
```

### Hide on a Single Page

Set `hide-on-single-page` to hide pagination when there is only one page.

```html
  <l-pagination total="10" hide-on-single-page></l-pagination>
```

### Simple Pagination

Use simple pagination when space is limited.

```html
  <l-pagination total="100" simple></l-pagination>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/pagination";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

Navigation titles and accessible labels use English: Previous page, Next page, Previous 5 pages, Next 5 pages, Page N, and Page number. The active page is marked with `aria-current="page"`.

## API

### Pagination Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `total` | Total number of records | `number` | `0` |
| `page-count` | Total number of pages | `number` | `0` |
| `simple` | Simple pagination | `boolean` | `false` |
| `hide-on-single-page` | Hide when there is only one page | `boolean` | `false` |
| `align` | Alignment | `start`, `center`, `end` | `start` |
| `current-page` | Current page | `number` | `1` |
| `page-size` | Records per page | `number` | `10` |

### Pagination Slots

| Name | Description |
| --- | --- |
| `-` | - |

### Pagination Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the page changes; detail: {current:number, pageSize:number, totalPage:number} | `(event: CustomEvent)` |

### Pagination Methods

| Method | Description | Type |
| --- | --- | --- |
| `setAttribute("current-page", "2")` | Set the current page through this attribute; there is no setCurrent method | Native HTMLElement method |

### Pagination CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| - | - | - |
