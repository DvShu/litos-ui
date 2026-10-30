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

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="100"></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

### Alignment

Set `align` to `start`, `center`, or `end` to control alignment.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="100" align="start"></l-pagination>
  <hr/>
  <l-pagination total="100" align="center"></l-pagination>
  <hr/>
  <l-pagination total="100" align="end"></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

### Hide on a Single Page

Set `hide-on-single-page` to hide pagination when there is only one page.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="10" hide-on-single-page></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

### Simple Pagination

Use simple pagination when space is limited.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="100" simple></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/pagination";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

Navigation titles and accessible labels use English: Previous page, Next page, Previous 5 pages, Next 5 pages, Page N, and Page number. The active page is marked with `aria-current="page"`.

## API

### Pagination Attributes

<!-- prettier-ignore -->
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

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `-` | - |

### Pagination Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `change` | Fires when the page changes; detail: {current:number, pageSize:number, totalPage:number} | `(event: CustomEvent)` |

### Pagination Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `setAttribute("current-page", "2")` | Set the current page through this attribute; there is no setCurrent method | Native HTMLElement method |

### Pagination CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| - | - | - |