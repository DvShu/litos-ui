# Modal

Display a dialog while preserving the current page state. It contains a header, content area, and action area.

## Import and Registration

```js
import { Modal, regist, Button, CloseIcon, InfoIcon, LoadingIcon, ModalBox } from "litos-ui";

regist([CloseIcon, LoadingIcon, Button, Modal]);
// Register Button when showing the footer.
regist(Button);
// Register CloseIcon when showing the close button.
regist(CloseIcon);

// Register the additional components used in this page’s demos.
regist([InfoIcon]);
```

## Examples

<script setup>
  import { $one, on, off, $, iterate, $$ } from 'utilane/browser';
  import { onMounted, nextTick, onUnmounted } from 'vue';

  let $btns;
  let $modals;

  function showDialog(e) {
    const $target = e.target;
    const id = $target.id;
    if (id === 'alert') {
      ModalBox.alert('This is some content', 'Title').then(() => {
        console.log("alert close")
      })
    } else if (id === 'confirm') {
      ModalBox.confirm('Save your changes?', 'Notice').then((ok) => {
        console.log(ok)
      })
    } else if (id === 'prompt') {
      ModalBox.prompt('Command', 'Command key', { placeholder: 'Enter a command' }).then((text) => {
        console.log(text)
      })
    } else {
      const $modal = $one(`l-modal[for="${id}"]`);
      $modal.setAttribute('show', 'true');
    }
  }

  function onCancel(e) {
    e.target.removeAttribute('show');
  }

  function onOk(e) {
    const $target = e.target;
    const forAttr = $target.getAttribute('for');
    if (forAttr === 'open3') {
      $target.setAttribute('confirm-loading', 'true');
      $target.innerHTML = "<span>Submitting content...</span>";
      setTimeout(() => {
        $target.innerHTML = "<span>Dialog content</span>";
        $target.removeAttribute('confirm-loading');
        e.target.removeAttribute('show');
      }, 1500);
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $btns = $('l-button[id]');
        $modals = $('l-modal');
        iterate($btns, ($btn) => {
          on($btn, 'click', showDialog);
        });
        iterate($modals, ($modal) => {
          on($modal, 'cancel', onCancel);
          on($modal, 'ok', onOk);
        });
      }
    })
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($btns) {
        iterate($btns, ($btn) => {
          off($btn, 'click', showDialog);
        });
        $btns = undefined;
      }
      if ($modals) {
        iterate($modals, ($modal) => {
          off($modal, 'cancel', onCancel);
          off($modal, 'ok', onOk);
        });
        $modals = undefined;
      }
    }
  })
</script>

### Basic Usage

Use the boolean `show` attribute to control visibility. `header-title` sets the title; it is optional and empty by default.

Set `cancel-text` and `ok-text` to customize button labels. Their built-in defaults and the ModalBox service labels remain in Chinese; this page does not change component localization.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open1" header-title="Header" vertical-align="middle">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open1" header-title="Header">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
</textarea>
<textarea lang="js">
  const $open1Btn = document.getElementById('open1');
  const $modal1 = document.querySelector('l-modal[for="open1"]');
  $open1Btn.addEventListener('click', () => {
    $modal1.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal1.addEventListener('cancel', () => {
    $modal1.removeAttribute('show');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Custom Header

Use `header-title` for a text title or the `header` slot for custom header content. Set `width` to change the dialog width.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">Notice</span>
    <span>Content</span>
  </l-modal>
  <l-button id="open2" type="primary">Open custom header</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">Notice</span>
    <span>Content</span>
  </l-modal>
  <l-button id="open2" type="primary">Open custom header</l-button>
</textarea>
<textarea lang="js">
  const $open2Btn = document.getElementById('open2');
  const $modal2 = document.querySelector('l-modal[for="open2"]');
  $open2Btn.addEventListener('click', () => {
    $modal2.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal2.addEventListener('cancel', () => {
    $modal2.removeAttribute('show');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Register the InfoIcon component with `regist` before using `l-info-icon`.

### Asynchronous Closing

Close the dialog asynchronously after confirmation, for example after submitting a form.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open3" header-title="Asynchronous closing">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open3" type="primary">Open async dialog</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open3" header-title="Asynchronous closing">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open3" type="primary">Open async dialog</l-button>
</textarea>
<textarea lang="js">
  const $open3Btn = document.getElementById('open3');
  const $modal3 = document.querySelector('l-modal[for="open3"]');
  $open3Btn.addEventListener('click', () => {
    $modal3.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal3.addEventListener('cancel', () => {
    $modal3.removeAttribute('show');
  });
  $modal3.addEventListener('ok', () => {
    $modal3.setAttribute('confirm-loading', 'true');
    $modal3.innerHTML = "<span>Submitting content...</span>";
    setTimeout(() => {
      $modal3.innerHTML = "<span>Dialog content</span>";
      $modal3.removeAttribute('confirm-loading');
      $modal3.removeAttribute('show');
    }, 1500);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Close Button

Use `close` to control the close button: `0` hides it, `1` places it inside the dialog (the default), and `2` places it at the corner.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open4" header-title="Title" close="2">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open4" type="primary">Open</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open4" header-title="Title" close="2">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open4" type="primary">Open async dialog</l-button>
</textarea>
<textarea lang="js">
  const $open4Btn = document.getElementById('open4');
  const $modal4 = document.querySelector('l-modal[for="open4"]');
  $open4Btn.addEventListener('click', () => {
    $modal4.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal4.addEventListener('cancel', () => {
    $modal4.removeAttribute('show');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Mobile Style

Dialogs use desktop styling by default. Add `mobile` for centered text and evenly arranged footer buttons. Set `vertical-align="middle"` to center the dialog vertically.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal for="open5" header-title="Title" mobile close="0" vertical-align="middle">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal for="open5" header-title="Title" mobile close="0" vertical-align="middle">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
</textarea>
<textarea lang="js">
  const $open5Btn = document.getElementById('open5');
  const $modal5 = document.querySelector('l-modal[for="open5"]');
  $open5Btn.addEventListener('click', () => {
    $modal5.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal5.addEventListener('cancel', () => {
    $modal5.removeAttribute('show');
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Message Boxes

Modal message boxes provide styled alternatives to the native browser `alert`, `confirm`, and `prompt` dialogs for alerts, confirmations, and text input.

Call `ModalBox.alert()`, `ModalBox.confirm()`, or `ModalBox.prompt()`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="alert">alert</l-button>
  <l-button id="confirm">confirm</l-button>
  <l-button id="prompt">prompt</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  // alert
  ModalBox.alert('This is some content', 'Title').then(() => {
    console.log("alert close")
  });
  // confirm
  ModalBox.confirm('Save your changes?', 'Notice').then((ok) => {
    console.log(ok);
  })
  // prompt
  ModalBox.prompt('Command', 'Command key', { placeholder: 'Enter a command' }).then((text) => {
    console.log(text);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/modal_box.css";
import "litos-ui/modal";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Modal Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `show` | Whether to show the dialog | `boolean` | `false` |
| `destroy-on-close` | Destroys Modal children when closed | `boolean` | `false` |
| `mask-closable` | Whether clicking the overlay closes the dialog | `boolean` | `true` |
| `mask` | Whether to show the overlay | `boolean` | `true` |
| `header` | Whether to show the header | `boolean` | `true` |
| `header-title` | Header title text | `string` | `""` |
| `footer` | Whether to show the footer | `boolean` | `true` |
| `cancel-text` | Cancel button text | `string` | `取消` |
| `ok-text` | Confirmation button text | `string` | `确定` |
| `close` | Close button position: 0 hidden, 1 inside (default), 2 at the corner | `0` \| `1` \| `2` | `1` |
| `mobile` | Whether to use mobile styling | `boolean` | `false` |
| `vertical-align` | Vertical alignment: top, middle, or bottom | `top` \| `middle` \| `bottom` | `top` |
| `confirm-loading` | Confirmation button loading state | `boolean` | `false` |
| `cancel` | Whether to show the cancel button | `boolean` | `true` |
| `width` | Dialog width | `string` | `27%` |
| `z-index` | Dialog stacking level | `string` | `100` |

### Modal Parts

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `mask` | Overlay |
| `wrapper` | Outer wrapper |
| `default` | Dialog body |
| `header` | Dialog header |
| `container` | Dialog content |
| `footer` | Dialog footer |
| `close-btn` | Close button |

### Modal Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Dialog content |
| `header` | Dialog title |
| `footer` | Dialog footer |

### Modal Events

<!-- prettier-ignore -->
| Event | Description | Callback |
| --- | --- | --- |
| `cancel` | Fires when the overlay, close button, or cancel button is clicked | `(event: CustomEvent)` |
| `ok` | Fires when confirmation is clicked | `(event: CustomEvent)` |
| `close` | Fires after the component has fully closed | `(event: CustomEvent)` |

### Modal CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-modal-zindex` | Dialog stacking level (z-index) | `100` |
| `--l-modal-width` | Dialog width | `27%` |
| `--l-modal-header-padding` | Header padding | `10px` |
| `--l-modal-footer-padding` | Footer padding | `10px` |
| `--l-modal-border-radius` | Dialog border radius | `5px` |

### ModalBox Methods

<!-- prettier-ignore -->
| Method | Description | Parameters | Returns |
| --- | --- | --- | --- |
| `alert` | Shows an alert | `message: string, title?: string, options?: ModalBoxOptions` | `Promise<boolean>` |
| `confirm` | Shows a confirmation box | `message: string, title?: string, options?: ModalBoxOptions` | `Promise<boolean>` |
| `prompt` | Shows a prompt | `message: string, title?: string, options?: ModalBoxOptions` | `Promise<string \| false>` |

### ModalBoxOptions

These options describe the object accepted by the methods; ModalBoxOptions is a documentation label, not an exported package type.

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `showCancel` | Whether to show the cancel button | `boolean` | `true` (false for alert) |
| `close` | Close button position: 0 hidden, 1 inside (default), 2 at the corner | `0` \| `1` \| `2` | `0` |
| `maskClosable` | Whether clicking the overlay closes the dialog | `boolean` | `true` (false for alert) |
| `icon` | Custom icon renderer | `() => HTMLElement` | `-` |
| `placeholder` | Input placeholder; prompt only | `string` | `-` |