---
url: https://dvshu.github.io/litos-ui/en/components/message.md
---
# Message

Display feedback after user actions or passive system messages.

## Imports

```js
import { Message } from "litos-ui";
import "litos-ui/styles/message.css";
```

## Basic Usage

### Showing a Message

Messages appear at the top and disappear automatically after `3` seconds. Pass a string to use it as the message content.

```html
  <l-button text>Show message</l-button>
```

```js
  import { Message } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: 'This is an informational message' });
  });
```

### Message Types

Provide success, warning, informational, and error feedback.

Pass an options object to customize more settings. Set `type` to select the message type (the default is `info`) and `message` to supply its content. Each type also has a convenience method, such as `Message.info('x')`, so you do not need to specify `type` explicitly.

```js
  import { Message } from 'litos-ui';
  //-
  Message.info("Informational message");
  Message.success("Success message");
  Message.warn("Warning message");
  Message.error("Error message");
```

### Closing Manually

Set `duration` to `0` to prevent automatic closing. The show method returns a message `id`; pass it to `Message.close()` to close the message manually.

```js
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
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/message.css";
import Message from "litos-ui/message";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Methods

| Name | Parameters | Description | Returns |
| --- | --- | --- | --- |
| `info`, `show` | `string` or `MessageOption` | Shows an informational message and returns its id | `string` |
| `success` | `string` or `MessageOption` | Shows a success message | `string` |
| `warn` | `string` or `MessageOption` | Shows a warning message | `string` |
| `error` | `string` or `MessageOption` | Shows an error message | `string` |
| `close` | `id: string` | Closes a message manually | - |

### MessageOption

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | `string` | - | Message content |
| `duration` | `number` | `3000` | Display duration in milliseconds; 0 prevents automatic closing |
| `type` | `string` | `info` | Message type: success, warn, error, or info |
| `customClass` | `string` | - | Custom class name |
