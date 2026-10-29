# List

A list that loads more data as you scroll to the bottom.

## Import and Registration

```js
import { List, regist, LoadingIcon } from "litos-ui";

regist([List, LoadingIcon]);
```

## Examples

<script setup>
  import { $one, on, off } from 'utilane/browser';
  import { onMounted, onUnmounted, nextTick } from 'vue';

  let $list;
  let $list1;
  // Simulate paginated data.
  let start = 0;
  let max = 20;
  let step = 10;

  function handleLoadmore() {
     // Simulate data loading.
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
        $list.removeAttribute('loading'); // Clear the loading state to show more content.
        if (isFinish) {
          $list.setAttribute('finish', 'finish');
        } else {
          $list.removeAttribute('finish');
        }
        start = end;
      }
    }, 1000);
  }

  function createRenderFragemnt(start, end) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const $div = document.createElement('div');
      $div.style.cssText = 'padding: 10px; border-bottom: 1px solid #dedede;';
      $div.textContent = i;
      fragment.appendChild($div);
    }
    return fragment;
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $list = $one('#list');
        if ($list) {
          on($list, 'load', handleLoadmore);
        }

        $list1 = $one('#list1');
        if ($list1) {
          $list1.append(createRenderFragemnt(0, 100));
        }
      }
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($list) {
        off($list, 'load', handleLoadmore);
      }
    }
  });
</script>

### Basic Usage

Scrolling to the bottom emits a `load` event. Set `finish` when all data has been loaded.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
</textarea>
<textarea lang="js">
  const $list = document.querySelector('#list');
  // Simulate paginated data.
  let start = 0;
  let max = 20;
  let step = 10;
  //-
  function handleLoadmore() {
     // Simulate data loading.
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
        $list.removeAttribute('loading');
        if (isFinish) {
          $list.setAttribute('finish', 'finish');
        } else {
          $list.removeAttribute('finish');
        }
        start = end;
      }
    }, 1000);
  }
  //-
  function createRenderFragemnt(start, end) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const $div = document.createElement('div');
      $div.style.cssText = 'padding: 10px; border-bottom: 1px solid #dedede;';
      $div.textContent = i;
      fragment.appendChild($div);
    }
    return fragment;
  }
  //-
  // Listen for the load event.
  $list.addEventListener('load', handleLoadmore);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Regular List

Set `infinite="false"` to disable infinite loading and use a regular scrollable list.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
</textarea>
<textarea lang="js">
  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/list";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

The built-in loading and end-of-list messages are currently Chinese.

## API

### List Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `finish` | Whether all data has been loaded | `boolean` | `false` |
| `infinite` | Whether infinite loading is enabled | `boolean` | `true` |

### List Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | List content |

### List Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `load` | Requests more data; e.detail.page contains the page number | `(e: CustomEvent)` |