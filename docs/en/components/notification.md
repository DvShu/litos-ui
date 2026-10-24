# Notification 通知提醒框

系统主动推送的通知提醒。相较于 [Message 消息提示](/en/components/message), Notification 更适合以下场景:

1. 较为复杂的通知内容;
2. 带有交互的通知, 给出用户下一步的行动点;
3. 系统主动推送。

组件提供 `info`、`success`、`error`、`warning` 四种状态, 支持四个角(左上、右上、左下、右下)的显示方位; 同一个方位上的通知不会相互叠加, 而是按顺序排列并通过动画插入与补位。

## 引用

```js
import { Notification, regist, Button } from "litos-ui";
import "litos-ui/styles/notification.css";

// 组件式使用需要注册组件
regist(Notification);

// 注册本页演示使用的附加组件
regist([Button]);
```

> 命令式调用(如 `Notification.info(...)`)会自动注册组件与依赖的图标, 无需手动调用 `regist`。

## 基础用法

### 组件式

通过 `open` 属性控制显示, `title` 设置标题, `message` 设置消息内容。组件式使用时默认不会自动关闭(`duration` 默认为 `0`), 由 `open` 属性控制显示与隐藏。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-notification
    open
    title="系统通知"
    message="这是一条系统主动推送的通知, 点击右上角可以关闭。"
  ></l-notification>
</textarea>
<div class="source">
<textarea lang="html">
  <l-notification
    open
    title="系统通知"
    message="这是一条系统主动推送的通知, 点击右上角可以关闭。"
  ></l-notification>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 命令式

调用 `Notification` 的静态方法即可在任意位置弹出通知, 方法会返回通知 `id`。

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate, on } from 'ph-utils/browser';

  let $btns;
  let lastId = '';
  // 组件类中包含 DOM API, 需要在浏览器端动态引入
  let LNotification;

  function showNotification(e) {
    const $target = e.target;
    const type = $target.getAttribute('data-notification');
    if (!type || !LNotification) return;
    if (type === 'close') {
      LNotification.close(lastId);
      return;
    }
    if (type === 'closeAll') {
      LNotification.closeAll();
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
    lastId = LNotification[type](option);
  }

  onMounted(() => {
    nextTick(async () => {
      if (import.meta.env.SSR) return;
      LNotification = (await import('../../../src/components/notification')).default;
      $btns = elem('.preview-container l-button');
      iterate($btns, ($btn) => {
        on($btn, 'click', showNotification);
      });
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
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
    data-title="通知标题"
    data-message="通知内容, 4.5 秒后自动关闭。"
  >显示通知</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>显示通知</l-button>
</textarea>
<textarea lang="js">
  import { Notification } from 'litos-ui';
  import { elem, on } from 'ph-utils/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Notification.show({
      title: '通知标题',
      message: '通知内容, 4.5 秒后自动关闭。',
    });
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 不同状态

通过 `type` 设置通知状态, 提供 `info`、`success`、`error`、`warning` 四种状态; 同时为每种状态提供了同名方法, 可以在不传递 `type` 的情况下直接调用, 例如: `Notification.success('保存成功')`。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="info" data-title="提示" data-message="这是一条普通提示信息。">信息</l-button>
  <l-button data-notification="success" data-title="成功" data-message="数据保存成功。">成功</l-button>
  <l-button data-notification="warning" data-title="警告" data-message="当前操作可能存在风险。">警告</l-button>
  <l-button data-notification="error" data-title="错误" data-message="请求失败, 请稍后重试。">错误</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Notification } from 'litos-ui';
  //-
  Notification.info({ title: '提示', message: '这是一条普通提示信息。' });
  Notification.success({ title: '成功', message: '数据保存成功。' });
  Notification.warning({ title: '警告', message: '当前操作可能存在风险。' });
  Notification.error({ title: '错误', message: '请求失败, 请稍后重试。' });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 显示方位

通过 `placement` 设置显示方位, 提供 `topLeft`、`topRight`、`bottomLeft`、`bottomRight` 四个角; 同一个方位上的通知不会叠加, 已有的通知会自动向后补位。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="info" data-placement="topLeft" data-title="左上" data-message="来自左上角的消息。">左上</l-button>
  <l-button data-notification="info" data-placement="topRight" data-title="右上" data-message="来自右上角的消息。">右上</l-button>
  <l-button data-notification="info" data-placement="bottomLeft" data-title="左下" data-message="来自左下角的消息。">左下</l-button>
  <l-button data-notification="info" data-placement="bottomRight" data-title="右下" data-message="来自右下角的消息。">右下</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Notification } from 'litos-ui';
  //-
  Notification.info({ title: '左上', message: '来自左上角的消息。', placement: 'topLeft' });
  Notification.info({ title: '右上', message: '来自右上角的消息。', placement: 'topRight' });
  Notification.info({ title: '左下', message: '来自左下角的消息。', placement: 'bottomLeft' });
  Notification.info({ title: '右下', message: '来自右下角的消息。', placement: 'bottomRight' });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 连续点击同一个按钮, 可以观察到同一个方位上的通知会依次排列, 不会相互遮挡。

### 复杂内容

`message` 支持传入 HTML 字符串, 用于展示较为复杂的通知内容。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button
    data-notification="success"
    data-title="部署完成"
    data-message="&lt;div&gt;分支: &lt;b&gt;main&lt;/b&gt;&lt;/div&gt;&lt;div&gt;耗时: 32s&lt;/div&gt;"
  >部署完成</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Notification } from 'litos-ui';
  //-
  Notification.success({
    title: '部署完成',
    message: '<div>分支: <b>main</b></div><div>耗时: 32s</div>',
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

组件式使用时, 也可以通过插槽自定义内容, 支持 `title`(标题)、`default`(内容)、`action`(行动点) 三个插槽。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-notification open type="info" duration="0">
    <span slot="title">自定义标题</span>
    <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
    </div>
  </l-notification>
</textarea>
<div class="source">
<textarea lang="html">
  <l-notification open type="info" duration="0">
    <span slot="title">自定义标题</span>
    <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
    </div>
  </l-notification>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 行动点

通过 `action` 设置行动点按钮的文本, 点击后触发 `action` 事件, 用于给出用户下一步的操作; 命令式调用时可以配合 `onAction` 回调。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button
    data-notification="warning"
    data-title="检测到新版本"
    data-message="新版本修复了若干问题, 建议立即更新。"
    data-action="立即更新"
    data-duration="0"
  >检测到新版本</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Notification } from 'litos-ui';
  //-
  Notification.warning({
    title: '检测到新版本',
    message: '新版本修复了若干问题, 建议立即更新。',
    action: '立即更新',
    duration: 0,
    onAction: (id) => {
      // 处理用户的下一步操作
      console.log('点击了行动点', id);
    },
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 自动关闭与手动关闭

`duration` 设置自动关闭的时间(毫秒), 设置为 `0` 时不会自动关闭; 鼠标悬浮在通知上时会暂停自动关闭的倒计时, 移出后继续。显示通知的方法会返回通知 `id`, 可以通过 `Notification.close(id)` 手动关闭。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="error" data-title="手动关闭" data-message="这条通知不会自动关闭。" data-duration="0">打开</l-button>
  <l-button data-notification="close">关闭最后一条</l-button>
  <l-button data-notification="closeAll">全部关闭</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Notification } from 'litos-ui';
  //-
  // 打开通知, 保存返回的 id
  const id = Notification.error({
    title: '手动关闭',
    message: '这条通知不会自动关闭。',
    duration: 0,
  });
  // 关闭指定的通知
  Notification.close(id);
  // 关闭全部通知
  Notification.closeAll();
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 全局配置

通过 `Notification.config` 设置全局默认配置, 之后创建的通知都会使用该配置。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-notification="info" data-title="全局配置" data-message="这条通知使用了全局配置的宽度与关闭时间。">显示通知</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Notification } from 'litos-ui';
  //-
  Notification.config({
    width: 380,
    duration: 6000,
    maxCount: 3,
  });
  Notification.info({ title: '全局配置', message: '这条通知使用了全局配置的宽度与关闭时间。' });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 全局配置会持续生效, 可以设置 `placement`、`width`、`duration`、`offset`、`zIndex`、`maxCount` 等所有配置项。上面的示例为了避免影响其它示例, 只修改了通知宽度与自动关闭时间。

## API

### Notification Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` | 是否显示通知 | `boolean` | `false` |
| `type` | 通知状态, `info`、`success`、`error`、`warning` | `string` | `info` |
| `title` | 标题(纯文本) | `string` | - |
| `message` | 消息内容, 支持 HTML 字符串 | `string` | - |
| `placement` | 显示方位, `topLeft`、`topRight`、`bottomLeft`、`bottomRight` | `string` | `topRight` |
| `duration` | 自动关闭时间(毫秒), `0` 表示不自动关闭 | `number` | `0` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `show-icon` | 是否显示状态图标 | `boolean` | `true` |
| `width` | 通知宽度, 数字会自动转换为 `px` | `string` \| `number` | `330px` |
| `offset` | 距离视口边缘的距离(px) | `number` | `16` |
| `z-index` | 层级 | `number` | `2000` |
| `max-count` | 同一方位最多同时显示的通知数量, `0` 表示不限制 | `number` | `0` |
| `action` | 行动点按钮的文本 | `string` | - |
| `custom-class` | 自定义类名, 多个使用空格分隔 | `string` | - |

### Notification Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 消息内容, 存在插槽内容时优先于 `message` |
| `title` | 标题, 存在插槽内容时优先于 `title` |
| `action` | 行动点区域, 存在插槽内容时优先于 `action` |

### Notification Events

<!-- prettier-ignore -->
| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| `close` | 通知关闭时触发 | `{ id: string }` |
| `action` | 点击行动点时触发 | `{ id: string }` |

### Notification Methods

实例方法, 可以通过 `ref` 或者 `document.querySelector` 获取到组件实例后调用。

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `show()` | 显示通知 |
| `close()` | 关闭通知 |

### 命令式 API

<!-- prettier-ignore -->
| 名称 | 说明 | 返回类型 |
| --- | --- | --- |
| `Notification.show(option)` | 显示通知 | `string`(通知 id) |
| `Notification.info(option)` | 显示普通通知 | `string` |
| `Notification.success(option)` | 显示成功通知 | `string` |
| `Notification.warning(option)` / `warn(option)` | 显示警告通知 | `string` |
| `Notification.error(option)` | 显示错误通知 | `string` |
| `Notification.close(id)` | 关闭指定 id 的通知 | - |
| `Notification.closeAll(placement?)` | 关闭所有通知, 传递 `placement` 时只关闭指定方位 | - |
| `Notification.config(option)` | 设置全局默认配置 | - |

### NotificationOptions

命令式 API 的配置项, 也可以传入一个字符串作为 `message`。

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 自定义通知 id, 不传则自动生成 | `string` | - |
| `title` | 标题 | `string` | - |
| `message` | 消息内容, 支持 HTML 字符串 | `string` | - |
| `type` | 通知状态 | `string` | `info` |
| `placement` | 显示方位 | `string` | `topRight` |
| `duration` | 自动关闭时间(毫秒), `0` 表示不自动关闭 | `number` | `4500` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `showIcon` | 是否显示状态图标 | `boolean` | `true` |
| `width` | 通知宽度 | `string` \| `number` | `330px` |
| `offset` | 距离视口边缘的距离(px) | `number` | `16` |
| `zIndex` | 层级 | `number` | `2000` |
| `maxCount` | 同一方位最多同时显示的通知数量 | `number` | `0` |
| `action` | 行动点按钮的文本 | `string` | - |
| `customClass` | 自定义类名 | `string` | - |
| `onClose` | 关闭后的回调 | `(id: string) => void` | - |
| `onAction` | 点击行动点的回调 | `(id: string) => void` | - |

### 样式变量

组件使用 Shadow DOM, 内部样式无法被外部选择器覆盖, 可以通过覆盖宿主节点上的 CSS 变量来自定义样式。

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-notification-width` | 通知宽度 | `330px` |
| `--l-notification-gap` | 同一个方位的通知之间的间距 | `16px` |
| `--l-notification-offset` | 距离视口边缘的距离, 由 `offset` 属性同步 | `16px` |
| `--l-notification-zindex` | 层级, 由 `z-index` 属性同步 | `2000` |
| `--l-notification-padding` | 内边距 | `16px` |
| `--l-notification-radius` | 圆角 | `8px` |
| `--l-notification-background` | 背景色 | `#ffffff` |
| `--l-notification-shadow` | 阴影 | - |
| `--l-notification-title-color` | 标题颜色 | `rgba(0, 0, 0, 0.88)` |
| `--l-notification-message-color` | 内容颜色 | `rgba(0, 0, 0, 0.65)` |
| `--l-notification-icon-size` | 状态图标大小 | `22px` |
| `--l-notification-anim-duration` | 动画时长 | `0.3s` |
| `--l-notification-color` | 状态色, 由 `type` 决定 | `var(--l-primary-color, #007bff)` |