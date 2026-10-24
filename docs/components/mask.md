# Mask 浮层遮罩

基础遮罩组件，弹出窗、图片预览框都是基于该组件实现的。

## 引用

```js
import { Mask, Button, regist } from "litos-ui";

regist([Mask, Button]);
```

## 演示

<script setup>
  import { onMounted, onUnmounted } from 'vue';
  if (!import.meta.env.SSR) {
    let $overlay;
    let $open;
    let $close;

    function handleToggle(e) {
      const action = e.target.getAttribute('data-action');
      if (action && $overlay) {
        $overlay.open = action === 'open';
      }
    }

    onMounted(() => {
      requestAnimationFrame(() => {
        $overlay = document.querySelector('#overlay');
        $open = document.querySelector('#open');
        $close = document.querySelector('#close');
        if ($open) {
          $open.addEventListener('click', handleToggle);
        }
        if ($close) {
          $close.addEventListener('click', handleToggle);
        }
      });
    });

    onUnmounted(() => {
      if ($open) {
        $open.removeEventListener('click', handleToggle);
      }
      if ($close) {
        $close.removeEventListener('click', handleToggle);
      }
    });
  }
</script>

### 直接用法

通过 `regist` 注册组件，然后在模板中使用 `<l-mask>` 标签即可, 可以通过 `open` 属性控制是否显示遮罩层。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-mask id="overlay" open></l-mask>
  <l-button id="open" data-action="open">打开</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 继承使用

通过继承 `Mask` 类，然后实现自定义功能逻辑，为自定义的类设置一个 `static baseName = "x";` 将 `x` 替换为自定义的组件名称，就能在模板中使用 `<l-x>` 标签了。

## API

### Mask Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` | 是否显示遮罩，可通过实例 open 属性切换 | `boolean` | `false` |
| `z-index` | 遮罩层级，内容层在此基础上加一 | `number` | `100` |
| `mask-closable` | 点击遮罩是否关闭 | `boolean` | `true` |
| `lock-scroll` | 打开时是否锁定 body 滚动 | `boolean` | `true` |

### Mask Slots

默认插槽提供遮罩面板内容。

### Mask Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 数据 |
| --- | --- | --- |
| `close` | 开始关闭时触发 | 无 detail 数据 |
| `closed` | 关闭动画完成时触发 | 无 detail 数据 |
| `action` | 点击带 data-action 的面板操作时触发 | event.detail 为操作字符串 |

### 继承扩展

可覆盖 `contentRender()` 返回字符串、HTMLElement 或 DocumentFragment，使用 `afterOpened()`、`afterClosed()` 处理打开和关闭后的逻辑，或通过 `onAction(action)` 接管操作。外部控制显示使用 `element.open = true` 或设置 open 属性。

### CSS Variables 与 Parts

`--l-mask-zindex` 默认 `100`。组件提供 `mask`、`panel` 两个 part，可通过 `::part()` 定制遮罩及内容层。