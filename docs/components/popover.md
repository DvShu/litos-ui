# Popover 弹出气泡

点击/鼠标移入元素，弹出气泡式的卡片浮层。在内容周围弹出一些隐藏的信息。和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 引用

```js
import { Popover, regist } from "litos-ui";

regist(Popover);
```

## 演示

<script setup>
  import { set } from '../../src/components/utils/clickoutside';
  import { onMounted, nextTick } from 'vue';
  import { $one } from 'ph-utils/dom';

  onMounted(() => {
    nextTick(() => {
    });
  });
</script>

### 基础用法

最简单的用法，通过 `content` 传递浮层内容。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-popover content="悬浮提示">
    <l-button slot="trigger">提示</l-button>
  </l-popover>
</textarea>
<div class="source">
<textarea lang="html">
  <l-popover></l-popover>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Popover Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Popover Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Popover Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Popover Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Popover CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
