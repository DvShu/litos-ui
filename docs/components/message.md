# Message 消息提示

常用于主动操作后的反馈提示。更多用于系统级通知的被动提醒。

## 基础用法

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate, on } from 'ph-utils/dom';

  let $btns;
  let id;

  function showMessage(e) {
    const $target = e.target;
    const message = $target.getAttribute('data-message');
    const type = $target.getAttribute('data-type') || 'info';
    const duration = $target.getAttribute('data-duration') || 3000;
    if (type !== 'close') {
      id = LMessage.show({ message, type, duration: Number(duration) });
    } else {
      LMessage.close(id);
    }
  }

  onMounted(() => {
    nextTick(() => {
      $btns = elem('.preview-container l-button');
      iterate($btns, ($btn) => {
        on($btn, 'click', showMessage);
      });
    });
  });

  onUnmounted(() => {
    if ($btns) {
      iterate($btns, ($btn) => {
        $btn.removeEventListener('click', showMessage);
      });
    }
  })
</script>

### 显示信息

从顶部出现，`3` 秒后自动消失; 可以接收一个字符串被显示为正文内容

<ClientOnly>
<l-code-preview>
<textarea>
<l-button data-message="这是一条普通的提示信息">显示消息</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button text>显示消息</l-button>
</textarea>
<textarea lang="js">
  import { Message } from 'litos-ui';
  import { elem, on } from 'ph-utils/dom';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: '这是一条普通的提示信息' });
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

当需要自定义更多属性时，`Message` 也可以接收一个对象为参数。 比如，设置 `type` 字段可以定义不同的状态，默认为 `info` 。 此时正文内容以 `message` 的值传入。 同时，也为 `Message` 的各种 `type` 注册了方法，可以在不传入 `type` 字段的情况下, 直接调用指定类型的函数, 例如: `Message.info('x')`。

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-message="提示消息" data-type="info">提示消息</l-button>
  <l-button data-message="成功消息" data-type="success">成功消息</l-button>
  <l-button data-message="警告消息" data-type="warn">警告消息</l-button>
  <l-button data-message="错误消息" data-type="error">错误消息</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Message } from 'litos-ui';
  //-
  Message.info("提示消息");
  Message.success("成功消息");
  Message.warn("警告消息");
  Message.error("错误消息");
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 手动关闭

将 `duration` 属性设置为 `0`, 可以使 `Message` 不自动消失。然后显示消息的函数会返回一个消息 `id`, 通过手动调用 close 手动关闭

<ClientOnly>
<l-code-preview>
<textarea>
  <l-button data-message="这是一条手动关闭的提示信息" data-duration="0">打开</l-button>
  <l-button data-type="close">关闭</l-button>
</textarea>
<div class="source">
<textarea lang="js">
  import { Message } from 'litos-ui';
  //-
  // 打开消息
  const id = Message.show({ 
    message: '这是一条手动关闭的提示信息', 
    type: 'info',
    duration: 0 
  });
  // 关闭消息
  Message.close(id);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Methods

<!-- prettier-ignore -->
| 名称 | 参数 | 说明 | 返回类型 |
| --- | --- | --- | --- |
| `info` | `MessageOption` | 显示普通提示信息, 参数为配置项, 返回消息 `id` | `string` |
| `success` | `MessageOption` | 显示成功提示信息 | `string` |
| `warn` | `MessageOption` | 显示警告提示信息 | `string` |
| `error` | `MessageOption` | 显示错误提示信息 | `string` |
| `close` | `id: string` | 手动关闭消息 | - |

### MessageOption

<!-- prettier-ignore -->
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `message` | `string` | - | 消息正文内容 |
| `duration` | `number` | `3000` | 消息显示的持续时间，单位为毫秒。如果设置为 `0`，则不会自动关闭 |
| `type` | `string` | `info` | 消息类型，可选值为 `success`、`warning`、`error`、`info` |
| `customClass` | `string` | - | 自定义类名 |
