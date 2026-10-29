# Notification

Notifications pushed by the system. Compared with [Message](/en/components/message), Notification is better suited to:

1. More complex notification content
2. Interactive notifications that offer a next action
3. System-initiated notifications

The component provides four types: `info`, `success`, `error`, and `warning`. Notifications can appear in any of the four corners. Notifications in the same corner are arranged without overlapping, with animations when they are inserted or repositioned.

## Import and Registration

```js
import {
  Notification,
  NotificationBox,
  regist,
  InfoIcon,
  SuccessIcon,
  WarnIcon,
  CloseFilledIcon,
  CloseIcon,
} from "litos-ui";
import "litos-ui/styles/notification.css";

regist([InfoIcon, SuccessIcon, WarnIcon, CloseFilledIcon, CloseIcon, Notification]);
```

> Register Notification and the required icons explicitly before declarative or imperative usage. NotificationBox does not register elements automatically.

## Basic Usage

### Declarative Usage

Click the buttons below to show the examples; no notifications open automatically on page entry.

Control visibility with `open`, set the heading with `title`, and set the content with `message`. Declarative notifications do not close automatically by default (`duration` is `0`); visibility is controlled by `open`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">Show component notification</l-button>
  <l-notification id="notification-basic"
    title="System notification"
    message="A notification from the system. Close it using the button in the top-right corner."
  ></l-notification>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">Show component notification</l-button>
  <l-notification id="notification-basic"
    title="System notification"
    message="A notification from the system. Close it using the button in the top-right corner."
  ></l-notification>
</textarea>
<textarea lang="js">
  document.getElementById('show-notification-basic').addEventListener('click', (event) => {
    document.getElementById(event.currentTarget.getAttribute('data-target')).show();
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

For declarative usage, customize content with the `title`, `default`, and `action` slots.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button id="show-notification-slots" data-notification="component" data-target="notification-slots">Show custom notification</l-button>
  <l-notification id="notification-slots" type="info" duration="0">
    <span slot="title">Custom title</span>
    <div>
      <p>First line of content</p>
      <p>Second line of content</p>
    </div>
  </l-notification>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="show-notification-slots" data-notification="component" data-target="notification-slots">Show custom notification</l-button>
  <l-notification id="notification-slots" type="info" duration="0">
    <span slot="title">Custom title</span>
    <div>
      <p>First line of content</p>
      <p>Second line of content</p>
    </div>
  </l-notification>
</textarea>
<textarea lang="js">
  document.getElementById('show-notification-slots').addEventListener('click', (event) => {
    document.getElementById(event.currentTarget.getAttribute('data-target')).show();
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Imperative Usage

Call a static method on `Notification` to show a notification from your code. The method returns its `id`.

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate, on } from 'utilane/browser';

  let $btns;
  let disposed = false;
  let lastId = '';
  // The component class uses DOM APIs; import it dynamically on the client.
  let LNotificationBox;

  function showNotification(e) {
    const $target = e.target;
    const type = $target.getAttribute('data-notification');
    if (!type || !LNotificationBox) return;
    if (type === 'component') {
      document.getElementById($target.getAttribute('data-target'))?.show();
      return;
    }
    if (type === 'close') {
      LNotificationBox.close(lastId);
      return;
    }
    if (type === 'closeAll') {
      LNotificationBox.closeAll();
      return;
    }
    const duration = $target.getAttribute('data-duration');
    const option = {
      title: $target.getAttribute('data-title') || '',
      message: $target.getAttribute('data-message') || '',
      placement: $target.getAttribute('data-placement') || 'topRight',
      duration: duration == null ? 4500 : Number(duration),
      action: $target.getAttribute('data-action') || undefined,
    };
    lastId = LNotificationBox[type](option);
  }

  onMounted(() => {
    nextTick(async () => {
      if (import.meta.env.SSR || disposed) return;
      LNotificationBox = (await import('../../../src/components/notification/notification_box')).default;
      if (disposed) return;
      $btns = elem('.preview-container l-button');
      iterate($btns, ($btn) => {
        on($btn, 'click', showNotification);
      });
    });
  });

  onUnmounted(() => {
    disposed = true;
    if (!import.meta.env.SSR) {
      LNotificationBox?.closeAll();
      iterate($btns || [], ($btn) => {
        $btn.removeEventListener('click', showNotification);
      });
    }
  });
</script>

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button
    data-notification="info"
    data-title="Notification title"
    data-message="This notification closes automatically after 4.5 seconds."
  >Show notification</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>Show notification</l-button>
</textarea>
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    NotificationBox.show({
      title: 'Notification title',
      message: 'This notification closes automatically after 4.5 seconds.',
    });
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Notification Types

Set `type` to `info`, `success`, `error`, or `warning`. Each type has a convenience method, so you can call it without supplying `type`, for example `NotificationBox.success('Saved successfully')`.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="info" data-title="Information" data-message="This is an informational message.">Info</l-button>
  <l-button data-notification="success" data-title="Success" data-message="Data saved successfully.">Success</l-button>
  <l-button data-notification="warning" data-title="Warning" data-message="This operation may involve a risk.">Warning</l-button>
  <l-button data-notification="error" data-title="Error" data-message="The request failed. Please try again later.">Error</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: 'Information', message: 'This is an informational message.' });
  NotificationBox.success({ title: 'Success', message: 'Data saved successfully.' });
  NotificationBox.warning({ title: 'Warning', message: 'This operation may involve a risk.' });
  NotificationBox.error({ title: 'Error', message: 'The request failed. Please try again later.' });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Placement

Set `placement` to `topLeft`, `topRight`, `bottomLeft`, or `bottomRight`. Notifications in the same corner do not overlap; existing notifications reposition automatically.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="info" data-placement="topLeft" data-title="Top left" data-message="A message from the top-left corner.">Top left</l-button>
  <l-button data-notification="info" data-placement="topRight" data-title="Top right" data-message="A message from the top-right corner.">Top right</l-button>
  <l-button data-notification="info" data-placement="bottomLeft" data-title="Bottom left" data-message="A message from the bottom-left corner.">Bottom left</l-button>
  <l-button data-notification="info" data-placement="bottomRight" data-title="Bottom right" data-message="A message from the bottom-right corner.">Bottom right</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: 'Top left', message: 'A message from the top-left corner.', placement: 'topLeft' });
  NotificationBox.info({ title: 'Top right', message: 'A message from the top-right corner.', placement: 'topRight' });
  NotificationBox.info({ title: 'Bottom left', message: 'A message from the bottom-left corner.', placement: 'bottomLeft' });
  NotificationBox.info({ title: 'Bottom right', message: 'A message from the bottom-right corner.', placement: 'bottomRight' });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Click the same button repeatedly to see notifications arrange themselves in the same corner without covering one another.

### Complex Content

Pass an HTML string as `message` to display more complex content.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button
    data-notification="success"
    data-title="Deployment complete"
    data-message="&lt;div&gt;Branch: &lt;b&gt;main&lt;/b&gt;&lt;/div&gt;&lt;div&gt;Duration: 32s&lt;/div&gt;"
  >Deployment complete</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.success({
    title: 'Deployment complete',
    message: '<div>Branch: <b>main</b></div><div>Duration: 32s</div>',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Actions

Set the action button text with `action`. Clicking it emits an `action` event so you can handle the next step. For imperative usage, supply an `onAction` callback.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button
    data-notification="warning"
    data-title="New version available"
    data-message="The new version fixes several issues. We recommend updating now."
    data-action="Update now"
    data-duration="0"
  >New version available</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.warning({
    title: 'New version available',
    message: 'The new version fixes several issues. We recommend updating now.',
    action: 'Update now',
    duration: 0,
    onAction: (id) => {
      // Handle the next user action.
      console.log('Action clicked', id);
    },
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Automatic and Manual Closing

Set `duration` to the auto-close delay in milliseconds, or `0` to disable automatic closing. The countdown pauses while the pointer is over the notification and resumes when it leaves. Show methods return an `id`; call `NotificationBox.close(id)` to close that notification manually.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="error" data-title="Close manually" data-message="This notification will not close automatically." data-duration="0">Open</l-button>
  <l-button data-notification="close">Close last</l-button>
  <l-button data-notification="closeAll">Close all</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  //-
  // Show a notification and save its id.
  const id = NotificationBox.error({
    title: 'Close manually',
    message: 'This notification will not close automatically.',
    duration: 0,
  });
  // Close the specified notification.
  NotificationBox.close(id);
  // Close all notifications.
  NotificationBox.closeAll();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Global Configuration

Set global defaults with `NotificationBox.config`. Notifications created afterward use those defaults.

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="info" data-title="Global configuration" data-message="This notification uses the global width and duration settings.">Show notification</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.config({
    width: 380,
    duration: 6000,
    maxCount: 3,
  });
  NotificationBox.info({ title: 'Global configuration', message: 'This notification uses the global width and duration settings.' });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Global configuration remains in effect and accepts all options, including `placement`, `width`, `duration`, `offset`, `zIndex`, and `maxCount`. The configuration code above is for reference; the live button does not apply global configuration, to avoid affecting other examples.

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/notification.css";
import Notification from "litos-ui/notification";
import NotificationBox from "litos-ui/notification-box";
// Register Notification and the icons as shown above.
```

The notification and notification-box entries do not register elements. Register Notification and the required icons explicitly. Load these APIs from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand).

Imperative methods are provided by `NotificationBox`; the `Notification` class only represents the custom element. Replace previous `Notification.info(...)` calls with `NotificationBox.info(...)`.

## API

### Notification Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `open` | Whether to show the notification | `boolean` | `false` |
| `type` | Notification type: info, success, error, or warning | `string` | `info` |
| `title` | Title (plain text) | `string` | - |
| `message` | Message content; supports HTML strings | `string` | - |
| `placement` | Corner placement: topLeft, topRight, bottomLeft, or bottomRight | `string` | `topRight` |
| `duration` | Auto-close delay in milliseconds; 0 disables automatic closing | `number` | `0` |
| `closable` | Whether to show the close button | `boolean` | `true` |
| `show-icon` | Whether to show the status icon | `boolean` | `true` |
| `width` | Notification width; numbers are converted to px | `string` \| `number` | `330px` |
| `offset` | Distance from the viewport edge in px | `number` | `16` |
| `z-index` | Stacking level | `number` | `2000` |
| `max-count` | Maximum visible notifications per corner; 0 means unlimited | `number` | `0` |
| `action` | Action button text | `string` | - |
| `custom-class` | Custom class names separated by spaces | `string` | - |

### Notification Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Content; slot content takes precedence over message |
| `title` | Title; slot content takes precedence over the title attribute |
| `action` | Action area; slot content takes precedence over the action attribute |

### Notification Events

<!-- prettier-ignore -->
| Name | Description | event.detail |
| --- | --- | --- |
| `close` | Fires when the notification closes | `{ id: string }` |
| `action` | Fires when the action is clicked | `{ id: string }` |

### Notification Methods

Call instance methods after obtaining the component through a ref or `document.querySelector`.

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `show()` | Shows a notification |
| `close()` | Closes the notification |

### Imperative API

<!-- prettier-ignore -->
| Name | Description | Returns |
| --- | --- | --- |
| `NotificationBox.show(option)` | Shows a notification | `string` (notification id) |
| `NotificationBox.info(option)` | Shows an informational notification | `string` |
| `NotificationBox.success(option)` | Shows a success notification | `string` |
| `NotificationBox.warning(option)` / `warn(option)` | Shows a warning notification | `string` |
| `NotificationBox.error(option)` | Shows an error notification | `string` |
| `NotificationBox.close(id)` | Closes the notification with the specified id | - |
| `NotificationBox.closeAll(placement?)` | Closes all notifications, or only those in placement if supplied | - |
| `NotificationBox.config(option)` | Sets global defaults | - |

### NotificationOptions

Options for the imperative API. You can also pass a string to use as `message`.

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `id` | Custom id; generated automatically if omitted | `string` | - |
| `title` | Title | `string` | - |
| `message` | Message content; supports HTML strings | `string` | - |
| `type` | Notification type | `string` | `info` |
| `placement` | Placement | `string` | `topRight` |
| `duration` | Auto-close delay in milliseconds; 0 disables automatic closing | `number` | `4500` |
| `closable` | Whether to show the close button | `boolean` | `true` |
| `showIcon` | Whether to show the status icon | `boolean` | `true` |
| `width` | Notification width | `string` \| `number` | `330px` |
| `offset` | Distance from the viewport edge in px | `number` | `16` |
| `zIndex` | Stacking level | `number` | `2000` |
| `maxCount` | Maximum visible notifications per corner | `number` | `0` |
| `action` | Action button text | `string` | - |
| `customClass` | Custom class name | `string` | - |
| `onClose` | Callback after closing | `(id: string) => void` | - |
| `onAction` | Callback when the action is clicked | `(id: string) => void` | - |

### CSS Variables

The component uses Shadow DOM, so external selectors cannot override its internal styles. Customize it by setting CSS variables on the host element.

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-notification-width` | Notification width | `330px` |
| `--l-notification-gap` | Gap between notifications in the same corner | `16px` |
| `--l-notification-offset` | Distance from the viewport edge; synchronized with offset | `16px` |
| `--l-notification-zindex` | Stacking level; synchronized with z-index | `2000` |
| `--l-notification-padding` | Padding | `16px` |
| `--l-notification-radius` | Border radius | `8px` |
| `--l-notification-background` | Background color | `#ffffff` |
| `--l-notification-shadow` | Shadow | - |
| `--l-notification-title-color` | Title color | `rgba(0, 0, 0, 0.88)` |
| `--l-notification-message-color` | Content color | `rgba(0, 0, 0, 0.65)` |
| `--l-notification-icon-size` | Status icon size | `22px` |
| `--l-notification-anim-duration` | Animation duration | `0.3s` |
| `--l-notification-color` | Status color determined by type | `var(--l-primary-color, #007bff)` |