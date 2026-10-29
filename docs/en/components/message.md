# Message

Display feedback after user actions or passive system messages.

## Imports

```js
import { Message } from "litos-ui";
import "litos-ui/styles/message.css";
```

## Basic Usage

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate, on } from 'utilane/browser';

  let $btns;
  let id;

  function showMessage(e) {
    const $target = e.target;
    const message = $target.getAttribute('data-message');
    const type = $target.getAttribute('data-type') || 'info';
    const duration = $target.getAttribute('data-duration') || 3000;
    if (type !== 'close') {
      id = Message.show({ message, type, duration: Number(duration) });
    } else {
      Message.close(id);
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $btns = elem('.preview-container l-button');
        iterate($btns, ($btn) => {
          on($btn, 'click', showMessage);
        });
      }
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($btns) {
        iterate($btns, ($btn) => {
          $btn.removeEventListener('click', showMessage);
        });
      }
    }
  })
</script>

### Showing a Message

Messages appear at the top and disappear automatically after `3` seconds. Pass a string to use it as the message content.

<ClientOnly>
<l-code-preview>
<textarea>
<l-button data-message="This is an informational message">Show message</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button text>Show message</l-button>
</textarea>
<textarea lang="js">
  import { Message } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: 'This is an informational message' });
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Message Types

Provide success, warning, informational, and error feedback.

Pass an options object to customize more settings. Set `type` to select the message type (the default is `info`) and `message` to supply its content. Each type also has a convenience method, such as `Message.info('x')`, so you do not need to specify `type` explicitly.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-message="Informational message" data-type="info">Informational message</l-button>
  <l-button data-message="Success message" data-type="success">Success message</l-button>
  <l-button data-message="Warning message" data-type="warn">Warning message</l-button>
  <l-button data-message="Error message" data-type="error">Error message</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Message } from 'litos-ui';
  //-
  Message.info("Informational message");
  Message.success("Success message");
  Message.warn("Warning message");
  Message.error("Error message");
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Closing Manually

Set `duration` to `0` to prevent automatic closing. The show method returns a message `id`; pass it to `Message.close()` to close the message manually.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-message="This message must be closed manually" data-duration="0" data-type="error">Open</l-button>
  <l-button data-type="close">Close</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Message } from 'litos-ui';
  //-
  // Show the message
  const id = Message.show({
    message: 'This message must be closed manually',
    type: 'info',
    duration: 0
  });
  // Close the message
  Message.close(id);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/message.css";
import Message from "litos-ui/message";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Methods

<!-- prettier-ignore -->
| Name | Parameters | Description | Returns |
| --- | --- | --- | --- |
| `info`, `show` | `string` or `MessageOption` | Shows an informational message and returns its id | `string` |
| `success` | `string` or `MessageOption` | Shows a success message | `string` |
| `warn` | `string` or `MessageOption` | Shows a warning message | `string` |
| `error` | `string` or `MessageOption` | Shows an error message | `string` |
| `close` | `id: string` | Closes a message manually | - |

### MessageOption

<!-- prettier-ignore -->
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | `string` | - | Message content |
| `duration` | `number` | `3000` | Display duration in milliseconds; 0 prevents automatic closing |
| `type` | `string` | `info` | Message type: success, warn, error, or info |
| `customClass` | `string` | - | Custom class name |