# DescriptionPanel

Display descriptions or introductory text, especially on mobile screens where space is limited and only a small amount of content is shown initially.

## Import and Registration

```js
import { DescriptionPanel, regist, Button, ArrowDownIcon } from "litos-ui";

regist([ArrowDownIcon, Button, DescriptionPanel]);
```

## Examples

### Basic Usage

All block-level content in the content area inherits a `text-indent`.

The sample article below is translated from the Chinese documentation. The component's built-in expand/collapse button currently uses Chinese labels; component localization is separate from this page's translation.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-description-panel>
    <p>Chery recently announced plans for a strategic partnership with Jaguar Land Rover, whose new product line will be built on Chery's electric vehicle platform. Meanwhile, Dongfeng Nissan's Yunfeng plant has chosen to manufacture a new electric SUV for Voyah. One foreign brand is seeking contract production from a domestic brand, while the other is manufacturing for a domestic brand. Both are focused on reducing costs.</p>
    <p>Looking further back, cost reduction also led two major joint-venture automakers, FAW-Volkswagen and GAC Honda, to the same response: job cuts. This suggests that joint-venture brands, once dominant, have entered their most difficult period. The release of May sales figures, showing their market share falling to 28.8%, made the seriousness of their position in China even clearer to the public.</p>
    <p>Although joint-venture brands have visibly struggled with the shift toward electric and intelligent vehicles, the scale of their decline in recent years has still surprised many industry observers. During this near free fall, what exactly did these brands get wrong? Do they still have a chance to recover?</p>

  </l-description-panel>
</textarea>
</l-code-preview>
</ClientOnly>

### Collapsed Height

Set the collapsed height with `collapse-height`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-description-panel collapse-height="150">
    <p>Chery recently announced plans for a strategic partnership with Jaguar Land Rover, whose new product line will be built on Chery's electric vehicle platform. Meanwhile, Dongfeng Nissan's Yunfeng plant has chosen to manufacture a new electric SUV for Voyah. One foreign brand is seeking contract production from a domestic brand, while the other is manufacturing for a domestic brand. Both are focused on reducing costs.</p>
    <p>Looking further back, cost reduction also led two major joint-venture automakers, FAW-Volkswagen and GAC Honda, to the same response: job cuts. This suggests that joint-venture brands, once dominant, have entered their most difficult period. The release of May sales figures, showing their market share falling to 28.8%, made the seriousness of their position in China even clearer to the public.</p>
    <p>Although joint-venture brands have visibly struggled with the shift toward electric and intelligent vehicles, the scale of their decline in recent years has still surprised many industry observers. During this near free fall, what exactly did these brands get wrong? Do they still have a chance to recover?</p>
  </l-description-panel>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/description-panel";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### DescriptionPanel Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `collapse-height` | Container height when collapsed | `number` | `100` |

### DescriptionPanel Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Content |

### DescriptionPanel CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-desc-panel-min-height` | Container height when collapsed | `100px` |
| `--l-desc-panel-font-size` | Font size | `14px` |
| `--l-desc-panel-textindent` | Text indentation | `calc(var(--l-desc-panel-font-size) * 2)` |