# Popover

Show a floating card when an element is clicked or hovered. Unlike a tooltip, a popover can contain interactive elements such as links and buttons, making it suitable for more complex content.

## Import and Registration

```js
import { Popover, regist, Button, WarnIcon } from "litos-ui";
import "litos-ui/styles/popover.css";
regist([Button, WarnIcon]); // Register Button and WarnIcon when using Popconfirm.

const popover = new Popover();

// On unmount, call popover.destroy().
```

## Examples

<script setup>
  import { Popover, popconfirmProps, createPopoverObserver } from '../../../src/components/utils/popover';
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { transition } from 'utilane/browser';

  let popover;
  let popover1;
  let popover2;
  let popover3;
  let popover4;
  let popover5;
  let popover6;
  let popconfirm;
  let $addTag;
  let $tagGroup;
  let observer;
  let listPopover;

  function handleAddTag() {
    if ($tagGroup) {
      let $addTagTmp = document.createElement('l-tag');
      $addTagTmp.setAttribute('closeable', 'true');
      $addTagTmp.setAttribute('type', 'primary');
      $addTagTmp.setAttribute('data-title', 'Tag tooltip');
      $addTagTmp.style.marginRight = "5px";
      $addTagTmp.classList.add('tooltip-tag');
      $addTagTmp.innerHTML = 'Tag';
      $tagGroup.appendChild($addTagTmp);
      transition($addTagTmp, 'l-scale', "enter");
      $addTagTmp = null;
    }
  }

  function handleRemoveTag(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        listPopover = new Popover({ theme: 'tooltip', reference: '.tooltip-tag' });
        $tagGroup = document.getElementById('tagGroup');
        if ($tagGroup) {
          $tagGroup.addEventListener('close', handleRemoveTag);
          observer = createPopoverObserver($tagGroup, 'tooltip-tag', listPopover);
        }
        $addTag = document.getElementById('addTag');
        if ($addTag) {
          $addTag.addEventListener('click', handleAddTag);
        }
        popover = new Popover();
        popover1 = new Popover({
          reference: '#hover-popover',
          trigger: 'hover',
        });
        popover2 = new Popover({
          reference: '#click-popover',
          trigger: 'click',
        });
        popover3 = new Popover({
          reference: '#focus-popover',
          trigger: 'focus',
        });
        popover4 = new Popover({ reference: '#none-arrow', arrow: false, offset: 5 });
        popover5 = new Popover({
          reference: '#custom',
          contentRender () {
            const fragment = document.createDocumentFragment();
            const $p1 = document.createElement('p');
            $p1.innerHTML = 'Custom content 1';
            fragment.appendChild($p1);
            const $p2 = document.createElement('p');
            $p2.innerHTML = 'Custom content 2';
            fragment.appendChild($p2);
            return fragment;
          },
          updateContent (popoverEl, datas) {}
        });
        popover6 = new Popover({
          reference: '#tooltip',
          theme: 'tooltip',
        });
        popconfirm = new Popover({
          ...popconfirmProps,
          reference: '#popconfirm',
          onPopoverAction (action) {
            console.log(action);
          }
        });
      }
    });
  });

  onUnmounted(() => {
    if ($tagGroup) {
      $tagGroup.removeEventListener('close', handleRemoveTag);
    }
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
    if (listPopover) {
      listPopover.destroy();
      listPopover = undefined;
    }
    if ($addTag) {
      $addTag.removeEventListener('click', handleAddTag);
    }
    if (popover) {
      popover.destroy();
    }
    popover = undefined;
    if (popover1) {
      popover1.destroy();
    }
    popover1 = undefined;
    if (popover2) {
      popover2.destroy();
    }
    popover2 = undefined;
    if (popover3) {
      popover3.destroy();
    }
    popover3 = undefined;
    if (popover4) {
      popover4.destroy();
    }
    popover4 = undefined;
    if (popover5) {
      popover5.destroy();
    }
    popover5 = undefined;
    if (popover6) {
      popover6.destroy();
    }
    popover6 = undefined;
    if (popconfirm) {
      popconfirm.destroy();
    }
    popconfirm = undefined;

  });
</script>

### Basic Usage

Add a `data-title` attribute and the `l-popover-reference` class to the trigger element, then create a `Popover` instance.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <a data-title="Hover hint" class="l-popover-reference">Hint</a>
</textarea>
<div class="source">
<textarea lang="html">
  <a data-title="Hover hint" class="l-popover-reference">Hint</a>
</textarea>
<textarea lang="js">
  let popover = new Popover();
  // On unmount, call popover.destroy().
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Pass `reference` to specify the reference elements when constructing `Popover`. If omitted, it finds all `.l-popover-reference` elements.

### Triggers

Set `trigger` to `hover`, `click`, or `focus`. The default is `hover`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="hover-popover" data-title="Hover hint">Hover hint</l-button>
  <l-button id="click-popover" data-title="Click hint">Click hint</l-button>
  <l-button id="focus-popover" data-title="Focus hint">Focus hint</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="hover-popover" data-title="Hover hint">Hover hint</l-button>
  <l-button id="click-popover" data-title="Click hint">Click hint</l-button>
  <l-button id="focus-popover" data-title="Focus hint">Focus hint</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#hover-popover',
    trigger: 'hover',
  });
  new Popover({
    reference: '#click-popover',
    trigger: 'click',
  });
  new Popover({
    reference: '#focus-popover',
    trigger: 'focus',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Set `trigger: "manual"` for manual control, then call `popover.show(reference)` and `popover.hide()`. The separate `updatePosition` and `autoUpdate` helpers handle positioning rather than visibility.

### Placement

There are `12` placements. Set the placement with the `data-placement` attribute.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="top-start">top-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="top">top</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="top-end">top-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="left-start">left-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="left">left</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="left-end">left-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="right-start">right-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="right">right</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="right-end">right-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="bottom-start">bottom-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="bottom">bottom</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="bottom-end">bottom-end</l-button>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

> You can also pass `placement` when constructing `Popover`.

### Hiding the Arrow

Set `arrow` to `false` when constructing `Popover` to hide the arrow. Use `offset` to adjust the distance from the reference element.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="none-arrow" data-title="Hint content">Hint</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="none-arrow" data-title="Hint content">Hint</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#none-arrow',
    arrow: false,
    offset: 5,
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Custom Content

Customize content with `contentRender` and `updateContent`, or supply a custom DOM element through the `popover` option.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="custom">Hint</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="custom">Hint</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#custom',
    // Provide a renderer called when content is first created.
    contentRender () {
      const fragment = document.createDocumentFragment();
      const $p1 = document.createElement('p');
      $p1.innerHTML = 'Custom content 1';
      fragment.appendChild($p1);
      const $p2 = document.createElement('p');
      $p2.innerHTML = 'Custom content 2';
      fragment.appendChild($p2);
      return fragment;
    },
    // Update content on each show; datas contains the reference data attributes.
    updateContent (popoverEl, datas) {}
  })
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Pass your own element through `popover` to customize the entire popover structure.

::: code-group

```html [html]
<div id="popover" class="l-popover">
  <div class="l-popover-content">
    <!-- Add the remaining content here. -->
  </div>
  <div class="l-popover-arrow"></div>
</div>
```

```js [js]
const $popover = document.querySelector("#popover");
new Popover({
  reference: "#custom",
  popover: $popover,
});
```

:::

### Tooltip

The tooltip variant uses slightly different styling. Set the constructor option `theme: 'tooltip'` to enable it.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-title="Hint content" id="tooltip">Hint</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-title="Hint content" id="tooltip">Hint</l-button>
</textarea>
<textarea lang="js">
  new Popover({
    reference: '#tooltip',
    theme: 'tooltip',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Popconfirm

Import the `popconfirmProps` configuration and set `data-content` on the reference element to provide the confirmation message.

The built-in confirmation buttons currently use Chinese labels. This page translates the examples without changing component localization.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button data-content="Delete this item?" id="popconfirm">Delete</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button data-content="Delete this item?" id="popconfirm">Delete</l-button>
</textarea>
<textarea lang="js">
  import { regist, Button, WarnIcon, popconfirmProps } from 'litos-ui';
  regist([Button, WarnIcon]);
  //-
  new Popover({
    ...popconfirmProps,
    reference: '#popconfirm',
    onPopoverAction (action) {
      console.log(action);
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Dynamic List Elements

Use `createPopoverObserver` to track elements added to or removed from a dynamic list, such as when changing pages.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="addTag" type="primary">Add tag</l-button>
  <hr />
  <div id="tagGroup"></div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="addTag" type="primary">Add tag</l-button>
  <hr />
  <div id="tagGroup"></div>
</textarea>
<textarea lang="js">
  import { createPopoverObserver, Popover, Tag, Button, CloseIcon, regist } from 'litos-ui';
  import 'litos-ui/styles/transition.css';
  regist([CloseIcon, Button, Tag]);
  import { transition } from 'utilane/browser';
  //-
  let $tagGroup = document.getElementById('tagGroup');
  let $addTag = document.getElementById('addTag');
  //-
  let tooltip = new Popover({
    reference: '.tooltip-tag',
    theme: 'tooltip',
  });
  //-
  let observer = createPopoverObserver(tagGroup, 'tooltip-tag', tooltip);
  //-
  function handleAddTag() {
    if ($tagGroup) {
      let $addTagTmp = document.createElement('l-tag');
      $addTagTmp.setAttribute('closeable', 'true');
      $addTagTmp.setAttribute('type', 'primary');
      $addTagTmp.setAttribute('data-title', 'Tag tooltip'); // Set the tooltip content.
      $addTagTmp.style.marginRight = "5px";
      $addTagTmp.classList.add('tooltip-tag'); // Add the tooltip-tag class.
      $addTagTmp.innerHTML = 'Tag';
      $tagGroup.appendChild($addTagTmp);
      transition($addTagTmp, 'l-scale', "enter");
      $addTagTmp = null;
    }
  }
  //-
  function handleRemoveTag(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }
  //-
  $addTag.addEventListener('click', handleAddTag);
  $tagGroup.addEventListener('close', handleRemoveTag);
  //-
  // Release resources on unmount.
  // tooltip.destroy();
  // observer.disconnect();
  // tooltip = null;
  // observer = null;
  // $addTag.removeEventListener('click', handleAddTag);
  // $tagGroup.removeEventListener('close', handleRemoveTag);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

`createPopoverObserver(target: HTMLElement,class: string,popover: Popover): MutationObserver`

Creates an observer that updates the popover references when elements with the specified class are added or removed.

1. `target`: The element whose children are observed, typically a list container or table.
2. `class`: The class used to identify relevant added or removed elements.
3. `popover`: The Popover instance whose references are updated when matching elements change.

> For a small, fixed set of elements, call `popover.addReference` and `popover.removeReference` manually instead of using `createPopoverObserver`.

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/popover.css";
import { Popover } from "litos-ui/popover";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Popover Constructor Options

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `reference` | Reference elements; defaults to all .l-popover-reference elements | `HTMLElement`, `HTMLElement[]`, `string` | `-` |
| `popover` | Popover DOM element; created automatically if omitted | `HTMLElement` | `-` |
| `contentRender` | Content renderer | `() => HTMLElement \| string \| DocumentFragment` | `-` |
| `updateContent` | Runs on each show to update content; datas contains the reference element data attributes | `(popoverElement: HTMLElement, datas?: Record<string, any>) => void` | `-` |
| `trigger` | Trigger mode | `hover`, `click`, `focus`, `manual` (manual control) | `hover` |
| `offset` | Offset | `number` | `10` |
| `arrow` | Whether to show the arrow | `boolean` | `true` |
| `arrowSize` | Arrow size | `number` | `8` |
| `theme` | Theme | `default`, `tooltip`, `popconfirm` | `default` |
| `placement` | Placement | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | `top` |
| `popoverWidth` | Popover width; trigger matches the reference element width | `number`, `trigger` | `-` |
| `onPopoverAction` | Called when a popover element with data-action is clicked | `(action: string, target: HTMLElement) => void` | `-` |
| `onOpenChange` | Called when visibility changes | `(isOpen: boolean, popoverElement?: HTMLElement) => void` | `-` |
| `onOutsideTap` | Called on outside clicks; isReference and isPopover identify the clicked area | `(e: Event, isReference: boolean, isPopover: boolean) => void` | `-` |

### Popover Methods

<!-- prettier-ignore -->
| Name | Description | Parameters |
| --- | --- | --- |
| `destroy` | Destroys the instance | `-` |
| `hide` | Hides the popover | `-` |
| `show` | Shows the popover | `(reference: HTMLElement)` The element used to position the popover |