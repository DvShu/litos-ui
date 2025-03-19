# Modal 对话框

在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区

## 引用

```js
import { Modal, regist } from "litos-ui";

regist(Modal);
```

## 演示

### 基础用法

需要设置 `open` 属性，它接收 `Boolean`，当为 `true` 时显示 `Dialog`。`title` 属性用于定义标题，它是可选的，默认值为空。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-modal open></l-modal>
</textarea>
<div class="source">
<textarea lang="html">
  <l-modal></l-modal>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Modal Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Modal Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Modal Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Modal Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Modal CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
