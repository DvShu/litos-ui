# Dialog

Display a dialog while preserving the current page state. It contains a header, content area, and action area.

## Import and Registration

```js
import {
  DialogContainer,
  regist,
  Button,
  CloseIcon,
  Dialog,
  DialogBox,
  LoadingIcon,
} from "litos-ui";
import "litos-ui/styles/dialog.css";

regist([CloseIcon, LoadingIcon, Button, DialogContainer]);
```

## Examples

<script setup>
  import { $one, on, off, $, iterate } from 'utilane/browser';
  import { onMounted, nextTick, onUnmounted } from 'vue';


  let dialogs = {};
  let $btns;
  let $boxBtns;

  function showDialog(e) {
    const $target = e.target;
    const id = $target.getAttribute('data-id');
    dialogs[id].open();
  }

  function showBoxDialog(e) {
    const $target = e.target;
    const id = $target.id;
    if (id === 'd-alert') {
      DialogBox.alert('This is some content', 'Title').then(() => {
        console.log("alert close")
      });
    } else if (id === 'd-confirm') {
      DialogBox.confirm('Save your changes?', 'Notice').then((ok) => {
        console.log(ok)
      });
    } else if (id === 'd-prompt') {
      DialogBox.prompt('Command key', 'Command', { placeholder: 'Enter a command' }).then((text) => {
        console.log(text)
      });
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR && Dialog) {
        dialogs['dialog'] = new Dialog({ el: '#dialog', onAction: (action, done) => {
          console.log(action);
          done();
        } });
        dialogs['dialog2'] = new Dialog({ el: '#dialog2', onAction: (action, done) => {
          done();
        } })
        dialogs['dialog3'] = new Dialog({ el: '#dialog3', onAction: (action, done) => {
          console.log(action);
          done();
        } })
        dialogs['dialog4'] = new Dialog({ el: '#dialog4', onAction: (action, done) => {
          if (action === 'ok') {
            const $container = document.querySelector('#dialog4 l-dialog-container');
            $container.setAttribute('confirm-loading', '');
            setTimeout(() => {
              $container.removeAttribute('confirm-loading');
              done();
            }, 1500);
          } else {
            done();
          }
        } })

        $btns = $('l-button[data-id]');
        iterate($btns, ($btn) => {
          on($btn, 'click', showDialog);
        });

        $boxBtns = $('#d-alert, #d-confirm, #d-prompt');
        iterate($boxBtns, ($btn) => {
          on($btn, 'click', showBoxDialog);
        });
      }
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($btns) {
        iterate($btns, ($btn) => {
          off($btn, 'click', showDialog);
        });
      }
      if ($boxBtns) {
        iterate($boxBtns, ($btn) => {
          off($btn, 'click', showBoxDialog);
        });
        $boxBtns = undefined;
      }
      for (const id in dialogs) {
        dialogs[id].destroy();
      }
      dialogs = {};
    }
  })
</script>

### Basic Usage

Place `l-dialog-container` inside a native `dialog` element and set its `header` attribute to the title.

The container supports `cancel-text` and `ok-text` for button labels. Their built-in defaults and the DialogBox service labels remain in Chinese; this page does not change component localization.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog" >Show Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      console.log(action);
      done();
    }
  });
  dialog.open(); // Open the dialog.
  // On unmount, call dialog.destroy() to release listeners.
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Call `dialog.destroy()` when the page unmounts, for example in `onUnmounted`, to release its listeners.

### Custom Header

Instead of setting the `header` attribute, use the `header` slot for custom content, such as a confirmation icon. Set `width` on the native dialog element to change its width.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog2" >Show Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      done();
    }
  });
  dialog.open(); // Open the dialog.
  // On unmount, call dialog.destroy() to release listeners.
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Mobile Style

Set `mobile` on `l-dialog-container` for a mobile-style dialog with a centered title and evenly arranged footer buttons.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog3" >Mobile style</l-button>
  <dialog id="dialog3" vertical-align="middle">
    <l-dialog-container header="Notice" mobile >
      <div>This is a mobile-style dialog example.</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog" vertical-align="middle">
    <l-dialog-container header="Notice" mobile>
      <div>This is a mobile-style dialog example.</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      console.log(action);
      done();
    }
  });
  dialog.open(); // Open the dialog.
  // On unmount, call dialog.destroy() to release listeners.
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Asynchronous Closing

Close the dialog asynchronously after confirmation, for example after submitting a form. Use `confirm-loading` for the confirmation button's loading state and handle the asynchronous operation in `onAction`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog4" >Asynchronous closing</l-button>
  <dialog id="dialog4">
    <l-dialog-container header="Asynchronous closing">
      <div>Dialog content</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog">
    <l-dialog-container header="Asynchronous closing">
      <div>Dialog content</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      if (action === 'ok') {
        const $container = document.querySelector('#dialog l-dialog-container');
        // Enable confirmation button loading.
        $container.setAttribute('confirm-loading', '');
        // Simulate an asynchronous operation.
        setTimeout(() => {
          // Remove loading and close the dialog.
          $container.removeAttribute('confirm-loading');
          done();
        }, 1500);
      } else {
        done();
      }
    }
  });
  dialog.open();
  // On unmount, call dialog.destroy().
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> While `confirm-loading` is enabled, clicking the confirmation button does not call `onAction` again, preventing duplicate submissions.

### Message Boxes

Message boxes provide styled alternatives to native browser dialogs for alerts, confirmations, and text input. The three methods are `alert`, `confirm`, and `prompt`.

Call `DialogBox.alert()`, `DialogBox.confirm()`, or `DialogBox.prompt()`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="d-alert">alert</l-button>
  <l-button id="d-confirm">confirm</l-button>
  <l-button id="d-prompt">prompt</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { DialogBox } from "litos-ui";
  // alert
  DialogBox.alert('This is some content', 'Title').then(() => {
    console.log("alert close")
  });
  // confirm
  DialogBox.confirm('Save your changes?', 'Notice').then((ok) => {
    console.log(ok);
  })
  // prompt
  DialogBox.prompt('Command key', 'Command', { placeholder: 'Enter a command' }).then((text) => {
    console.log(text);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/dialog.css";
import Dialog from "litos-ui/dialog";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Dialog

`Dialog` is a class for controlling a native `<dialog>` element, used with the `l-dialog-container` Web Component.

#### Constructor

```text
new Dialog(option?: DialogInitialParams)
```

#### DialogInitialParams

<!-- prettier-ignore -->
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| el | `HTMLDialogElement \| string` | - | **Required**: dialog element or CSS selector |
| onAction | `(action: string, done: () => void) => void` | - | Button callback; action is ok, cancel, or close. Call done() to close the dialog |
| verticalAlign | `"top" \| "bottom" \| "middle"` | `"top"` | Vertical position of the dialog |
| translate | `string` | - | CSS translation value; for example, 0,0,0 produces translate3d(0,0,0) |
| width | `string` | - | Dialog width |
| escClose | `boolean` | `true` | Whether to close on Escape (see implementation limitation below) |
| maskClosable | `boolean` | `true` | Whether clicking the overlay closes the dialog |
| close | `number` | `1` | Close button position: 1 inside, 2 at the corner, 0 hidden |

Implementation limitation: the current Escape handler closes the dialog regardless of escClose. The initial vertical position and close-button setting are read from the native dialog attributes; when those attributes are absent, they default to top and 1 rather than using the corresponding JavaScript options.

#### Instance Methods

<!-- prettier-ignore -->
| Method | Description |
| --- | --- |
| `open()` | Opens the dialog |
| `close()` | Closes the dialog |
| `destroy()` | Removes event listeners; call when the page unmounts |
| `setProp(key, value)` | Sets a single property |
| `setProps(props)` | Sets multiple properties |
| `setConfirmLoading(loading)` | Sets the confirmation button loading state |

#### Attribute Initialization

`Dialog` reads the following HTML attributes from the native `<dialog>` element during initialization. Attribute values take precedence over JavaScript configuration:

- `vertical-align`
- `translate`
- `width`
- `close`

---

### DialogContainer

`l-dialog-container` is a Web Component placed inside `<dialog>`. It provides the header, content, and footer button layout.

#### Import and Registration

```js
import { DialogContainer, regist } from "litos-ui";

regist([DialogContainer]);
```

#### HTML Attributes

<!-- prettier-ignore -->
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| header | `string` | - | Title text |
| show-header | `boolean` | `true` | Whether to show the header |
| show-footer | `boolean` | `true` | Whether to show the footer |
| show-cancel | `boolean` | `true` | Whether to show the cancel button |
| cancel-text | `string` | `"取消"` | Cancel button text |
| show-ok | `boolean` | `true` | Whether to show the confirmation button |
| ok-text | `string` | `"确定"` | Confirmation button text |
| close | `number` | `1` | Close button style: 1 inside, 2 at the corner, 0 hidden |
| container-class | `string` | - | Custom content-area class name |
| mobile | `boolean` | `false` | Whether to use mobile styling with centered title and evenly arranged buttons |
| confirm-loading | `boolean` | `false` | Confirmation loading state; while true, repeated clicks do not trigger the callback |

#### Slots

<!-- prettier-ignore -->
| Slot | Description |
| --- | --- |
| Default slot | Dialog body content |
| `header` | Custom header content; replaces the header attribute |
| `footer` | Custom footer content; replaces the default cancel/confirm buttons |

#### Custom Events

<!-- prettier-ignore -->
| Event | detail | Description |
| --- | --- | --- |
| `dialogAction` | `{ action: string }` | Fires on button clicks; action is ok, cancel, or close |

#### CSS Variables

Set these CSS variables on `l-dialog-container` or its ancestors to customize the container.

<!-- prettier-ignore -->
| Name | Default | Description |
| --- | --- | --- |
| `--l-dialog-main-padding` | `0` | Overall dialog padding |
| `--l-dialog-header-padding` | `10px` | Header padding outside mobile style |
| `--l-dialog-container-padding` | `15px 10px` | Content padding outside mobile style |
| `--l-dialog-footer-padding` | `10px` | Footer padding outside mobile style |
| `--l-dialog-line-color` | `rgba(0, 0, 0, 0.06)` | Divider color between header, footer, and mobile footer buttons; the mobile header divider is transparent |
| `--l-dialog-close-right` | `5px` for close=1, `0` for close=2 | Close button offset from the right edge |
| `--l-dialog-close-top` | `6px` for close=1, `0` for close=2 | Close button offset from the top edge |

```html
<l-dialog-container
  header="Custom styling"
  style="--l-dialog-header-padding: 16px; --l-dialog-container-padding: 20px; --l-dialog-footer-padding: 16px; --l-dialog-close-top: 12px;"
>
  <div>Dialog content</div>
</l-dialog-container>
```

> In mobile style (`mobile`), the header, content, and footer padding is fixed at `20px 10px 5px`, `5px 15px 20px`, and `0`, respectively, overriding the corresponding padding variables. `--l-dialog-main-padding` still applies.

---

### DialogBox

`DialogBox` provides `alert`, `confirm`, and `prompt` methods for creating message boxes as alternatives to native browser dialogs.

#### Import and Registration

```js
import { DialogBox } from "litos-ui";
```

#### DialogBox.alert

```text
DialogBox.alert(content: string, title?: string, option?: AlertOptions): Promise<boolean>
```

Shows an alert with only a confirmation button. Resolves to `true` when confirmed.

#### DialogBox.confirm

```text
DialogBox.confirm(content: string, title?: string, option?: AlertOptions): Promise<boolean>
```

Shows a confirmation box with confirmation and cancellation buttons. Resolves to `true` when confirmed and `false` when canceled.

#### DialogBox.prompt

```text
DialogBox.prompt(label: string, title?: string, option?: PromptOptions): Promise<string | false>
```

Shows a dialog with a text input. Resolves to the input value when confirmed and `false` when canceled.

#### AlertOptions

<!-- prettier-ignore -->
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| showCancel | `boolean` | `false` for alert; `true` for confirm/prompt | Whether to show the cancel button |
| close | `number` | `0` | Close button position: 0 hidden, 1 inside, 2 at the corner |
| maskClosable | `boolean` | `false` for alert; `true` for confirm/prompt | Whether clicking the overlay closes the dialog |
| icon | `() => HTMLElement` | - | Custom icon renderer |

#### PromptOptions

Extends `AlertOptions` with the following option:

<!-- prettier-ignore -->
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| placeholder | `string` | `""` | Input placeholder |