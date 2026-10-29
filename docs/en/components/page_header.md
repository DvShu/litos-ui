# PageHeader

A page header with a title and a back button, commonly used on nested pages.

## Import and Registration

```js
import { regist, PageHeader, Button, ArrowLeftIcon, MoreIcon } from "litos-ui";

regist(PageHeader);
regist([Button, ArrowLeftIcon]); // Required for the back button.

// Register additional components used in this page’s demos.
regist([MoreIcon]);
```

## Examples

### Basic Usage

Set `align` to `left` or `center` to align the title. The default is `left`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-page-header page-title="Title" page-sub-title="Subtitle" back-text="Back" show-right>
    <l-more-icon slot="right"></l-more-icon>
  </l-page-header>
  <hr/>
  <l-page-header page-title="Title" align="center" back-text="Back" show-right height="44px" border>
    <l-more-icon slot="right" data-action="more"></l-more-icon>
  </l-page-header>
</textarea>
</l-code-preview>
</ClientOnly>

### Events

Add `l-action` to a child element and listen for the page header’s `action` event. Clicking that child emits the event.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-page-header page-title="Title" page-sub-title="Subtitle" back-text="Back" show-right>
    <l-more-icon slot="right" l-action="more"></l-more-icon>
  </l-page-header>
</textarea>
<div class="source">
<textarea lang="html">
  <l-page-header id="header" page-title="Title" page-sub-title="Subtitle" back-text="Back" show-right>
    <l-more-icon slot="right" l-action="more" data-param="1"></l-more-icon>
  </l-page-header>
</textarea>
<textarea lang="js">
  const header = document.getElementById("header");
  header.addEventListener("action", (e) => {
    const detail = e.detail;
    if (detail.action === 'back') {
      // The back button was clicked.
    } else if (detail.action === 'more') {
      console.log(detail.param); // 1
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/page-header";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

The built-in back-button label is Chinese. Set `back-text="Back"` to customize it, as in these examples.

## API

### PageHeader Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `show-left` | Whether to show the left area | `boolean` | `true` |
| `show-right` | Whether to show the right area | `boolean` | `true` |
| `height` | Height | `string` | - |
| `border` | Whether to show the bottom border | `boolean` | `false` |
| `align` | Title alignment | `left`, `center` | `left` |
| `show-back` | Whether to show the back button | `boolean` | `true` |
| `back-text` | Back button text | `string` | 返回 |
| `page-title` | Title | `string` | - |
| `page-sub-title` | Subtitle | `string` | - |

### PageHeader Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Title content |
| `left` | Left area content |
| `right` | Right area content |

### PageHeader Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `click` | Fires when clicked | `(event: Event)` |
| `action` | Fires when a child with l-action is clicked; event.detail contains action and the spread dataset fields | `(event: CustomEvent)` |

### PageHeader Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| - | - | - |

### PageHeader CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| - | - | - |