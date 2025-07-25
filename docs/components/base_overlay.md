# BaseOverlay 基础浮层

基础浮层组件，弹出窗、图片预览框都是基于该组件实现的。

## 引用

```js
import { regist, BaseOverlay } from "litos-ui";

regist(BaseOverlay);
```

## 演示

### 基础用法

使用

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-base-overlay></l-base-overlay>
</textarea>
<div class="source">
<textarea lang="html">
  <l-base-overlay></l-base-overlay>
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
