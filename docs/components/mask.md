# Mask 浮层遮罩

基础遮罩组件，弹出窗、图片预览框都是基于该组件实现的。

## 引用

```js
import { regist, Mask } from "litos-ui";

regist(Mask);
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

### 基础用法

使用

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-mask id="overlay"></l-mask>
  <l-button id="open" data-action="open">打开</l-button>
  <l-button id="close" data-action="close">关闭</l-button>
</textarea>
<div class="source">
<textarea lang="html">
  <l-mask></l-mask>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### BaseOverlay Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### BaseOverlay Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### BaseOverlay Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### BaseOverlay Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### BaseOverlay CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
