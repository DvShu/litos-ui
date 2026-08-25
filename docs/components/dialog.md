# Dialog 对话框

在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区

## 引用

```js
import { DialogContainer, regist, Button, CloseIcon } from "litos-ui";
import "litos-ui/styles/dialog.css";

regist([DialogContainer, Button, CloseIcon]);
```

## 演示

<script setup>
  import { $one, on, off, $, iterate } from 'ph-utils/browser';
  import { onMounted, nextTick, onUnmounted } from 'vue';

  let Dialog, DialogBox;
  if (!import.meta.env.SSR) {
    const [dialogMod, dialogBoxMod] = await Promise.all([
      import('../../src/components/dialog'),
      import('../../src/components/dialog/dialog_box'),
    ]);
    Dialog = dialogMod.default;
    DialogBox = dialogBoxMod.default;
  }

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
      DialogBox.alert('这是一段内容', '标题').then(() => {
        console.log("alert close")
      });
    } else if (id === 'd-confirm') {
      DialogBox.confirm('确定要保存更改？', '提示').then((ok) => {
        console.log(ok)
      });
    } else if (id === 'd-prompt') {
      DialogBox.prompt('指令密钥', '指令', { placeholder: '请输入指令' }).then((text) => {
        console.log(text)
      });
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        dialogs['dialog'] = new Dialog({ el: '#dialog', onAction: (action, done) => {
          console.log(action);
          done();
        } });
        dialogs['dialog2'] = new Dialog({ el: '#dialog2' })
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
    })
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

### 基本用法

将 `l-dialog-container` 元素作为 `dialog` 的子元素，并设置 `header` 属性为标题。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog" >显示 Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
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
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 切记在页面关闭时，如 `onUnmounted` 中调用 `dialog.destroy()` 方法销毁弹窗

### 自定义头部

除了使用 `header` 属性定义头部内容外，也可以通过传递 `header-slot` 插槽自定义头部内容。通过传递 `width` 属性改变宽度；通常当需要在头部显示图标时有用, 比如：`confirm` 弹窗

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog2" >显示 Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = new Dialog({ el: '#dialog' });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 移动端风格

通过在 `l-dialog-container` 上设置 `mobile` 属性，可切换为移动端风格的对话框。移动端风格下，标题居中显示，底部按钮平铺排列。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog3" >移动端风格</l-button>
  <dialog id="dialog3" vertical-align="middle">
    <l-dialog-container header="提示" mobile >
      <div>这是一个移动端风格对话框示例。</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog" vertical-align="middle">
    <l-dialog-container header="提示" mobile>
      <div>这是一个移动端风格对话框示例。</div>
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
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 异步关闭

点击确定后异步关闭对话框，例如提交表单。通过 `confirm-loading` 属性设置确定按钮的加载状态，配合 `onAction` 回调实现异步操作。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary" data-id="dialog4" >异步关闭</l-button>
  <dialog id="dialog4">
    <l-dialog-container header="异步关闭">
      <div>对话框内容</div>
    </l-dialog-container>
  </dialog>
</textarea>
<div class="source">
<textarea lang="html">
  <dialog id="dialog">
    <l-dialog-container header="异步关闭">
      <div>对话框内容</div>
    </l-dialog-container>
  </dialog>
</textarea>
<textarea lang="js">
  const dialog = new Dialog({ 
    el: '#dialog', 
    onAction: (action, done) => {
      if (action === 'ok') {
        const $container = document.querySelector('#dialog l-dialog-container');
        // 设置确定按钮 loading
        $container.setAttribute('confirm-loading', '');
        // 模拟异步操作
        setTimeout(() => {
          // 移除 loading 并关闭弹窗
          $container.removeAttribute('confirm-loading');
          done();
        }, 1500);
      } else {
        done();
      }
    } 
  });
  dialog.open();
  // 在页面结束时调用 dialog.destroy() 销毁弹窗
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> `confirm-loading` 为 `true` 时，点击确定按钮不会重复触发 `onAction` 回调，可防止重复提交。

### 消息弹窗

模拟系统的消息提示框而实现的一套对话框组件，用于消息提示、确认消息和提交内容。提供 3 种消息弹窗：`alert`、`confirm`、`prompt`

分别通过 `DialogBox.alert()`、`DialogBox.confirm()`、`DialogBox.prompt()` 调用

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
  DialogBox.alert('这是一段内容', '标题').then(() => {
    console.log("alert close")
  });
  // confirm
  DialogBox.confirm('确定要保存更改？', '提示').then((ok) => {
    console.log(ok);
  })
  // prompt
  DialogBox.prompt('指令密钥', '指令', { placeholder: '请输入指令' }).then((text) => {
    console.log(text);
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Dialog

`Dialog` 是一个用于控制原生 `<dialog>` 元素的类，配合 `l-dialog-container` Web Component 使用。

#### 构造函数

```ts
new Dialog(option?: DialogInitialParams)
```

#### DialogInitialParams

| 属性          | 类型                                            | 默认值  | 说明                                                                                |
| ------------- | ----------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| el            | `HTMLDialogElement \| string`                   | -       | **必填**，dialog 节点或 CSS 选择器                                                  |
| onAction      | `(action: string, done: () => void) => boolean` | -       | 按钮点击回调，`action` 为 `"ok"` 或 `"cancel"` 或 `"close"`，调用 `done()` 关闭弹窗 |
| verticalAlign | `"top" \| "bottom" \| "middle"`                 | `"top"` | 对话框垂直方向位置                                                                  |
| translate     | `string`                                        | -       | CSS translate 值，例如 `"0,0,0"` 表示 `translate3d(0,0,0)`                          |
| width         | `string`                                        | -       | 对话框宽度                                                                          |
| escClose      | `boolean`                                       | `true`  | 是否在点击 Esc 时关闭弹窗                                                           |
| maskClosable  | `boolean`                                       | `true`  | 是否可以通过点击遮罩关闭对话框                                                      |
| close         | `number`                                        | `1`     | 是否显示右上角关闭按钮，`1` - 显示在框内，`2` - 显示在框角，`0` - 不显示            |

#### 实例方法

| 方法                         | 说明                                               |
| ---------------------------- | -------------------------------------------------- |
| `open()`                     | 打开对话框                                         |
| `close()`                    | 关闭对话框                                         |
| `destroy()`                  | 销毁对话框，移除所有事件监听。在页面卸载时必须调用 |
| `setProp(key, value)`        | 设置单个属性                                       |
| `setProps(props)`            | 批量设置属性                                       |
| `setConfirmLoading(loading)` | 设置确定按钮 loading 状态                          |

#### 属性继承

`Dialog` 支持从 `<dialog>` 元素上读取以下 HTML 属性作为初始值（优先级高于 JS 配置）：

- `vertical-align`
- `translate`
- `width`
- `close`

---

### DialogContainer

`l-dialog-container` 是一个 Web Component，作为 `<dialog>` 的子元素，提供标题栏、内容区、底部按钮的布局。

#### 引用

```js
import { DialogContainer, regist } from "litos-ui";

regist([DialogContainer]);
```

#### HTML 属性

| 属性            | 类型      | 默认值   | 说明                                                        |
| --------------- | --------- | -------- | ----------------------------------------------------------- |
| header          | `string`  | -        | 标题文本                                                    |
| show-header     | `boolean` | `true`   | 是否显示标题栏                                              |
| show-footer     | `boolean` | `true`   | 是否显示底部                                                |
| show-cancel     | `boolean` | `true`   | 是否显示取消按钮                                            |
| cancel-text     | `string`  | `"取消"` | 取消按钮文本                                                |
| show-ok         | `boolean` | `true`   | 是否显示确定按钮                                            |
| ok-text         | `string`  | `"确定"` | 确定按钮文本                                                |
| close           | `number`  | `1`      | 关闭按钮样式，`1` - 框内，`2` - 框角，`0` - 不显示          |
| container-class | `string`  | -        | 内容区自定义类名                                            |
| mobile          | `boolean` | `false`  | 是否使用移动端风格，标题居中，底部按钮平铺排列              |
| confirm-loading | `boolean` | `false`  | 确定按钮 loading 状态，为 `true` 时点击确定不会重复触发回调 |

#### 插槽

| 插槽名   | 说明                                    |
| -------- | --------------------------------------- |
| 默认插槽 | 对话框主体内容                          |
| `header` | 自定义头部内容，替代 `header` 属性      |
| `footer` | 自定义底部内容，替代默认的取消/确定按钮 |

#### 自定义事件

| 事件名         | detail               | 说明                                                          |
| -------------- | -------------------- | ------------------------------------------------------------- |
| `dialogAction` | `{ action: string }` | 按钮点击时触发，`action` 值为 `"ok"`、`"cancel"` 或 `"close"` |

---

### DialogBox

`DialogBox` 提供 `alert`、`confirm`、`prompt` 三种静态方法，用于快速创建消息弹窗，替代浏览器原生弹窗。

#### 引用

```js
import { DialogBox } from "litos-ui";
```

#### DialogBox.alert

```ts
DialogBox.alert(content: string, title?: string, option?: AlertOptions): Promise<boolean>
```

显示一个仅包含确定按钮的消息提示框。点击确定后 resolve `true`。

#### DialogBox.confirm

```ts
DialogBox.confirm(content: string, title?: string, option?: AlertOptions): Promise<boolean>
```

显示一个包含确定和取消按钮的确认框。点击确定 resolve `true`，点击取消 resolve `false`。

#### DialogBox.prompt

```ts
DialogBox.prompt(label: string, title?: string, option?: PromptOptions): Promise<string | false>
```

显示一个包含输入框的对话框。点击确定 resolve 输入框的值，点击取消 resolve `false`。

#### AlertOptions

| 属性         | 类型                | 默认值                                               | 说明                                               |
| ------------ | ------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| showCancel   | `boolean`           | `alert` 默认 `false`，`confirm`/`prompt` 默认 `true` | 是否显示取消按钮                                   |
| close        | `number`            | `0`                                                  | 关闭按钮位置，`0` - 不显示，`1` - 框内，`2` - 框角 |
| maskClosable | `boolean`           | `alert` 默认 `false`，`confirm`/`prompt` 默认 `true` | 点击蒙层是否允许关闭                               |
| icon         | `() => HTMLElement` | -                                                    | 自定义图标                                         |

#### PromptOptions

继承 `AlertOptions`，额外属性：

| 属性        | 类型     | 默认值 | 说明         |
| ----------- | -------- | ------ | ------------ |
| placeholder | `string` | `""`   | 输入框占位符 |