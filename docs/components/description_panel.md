# DescriptionPanel 简介面板

通常用于显示描述信息、简介的地方；更多用于手机上，空间有限，一开始可以显示少量内容。

## 引用

```js
import { DescriptionPanel, regist } from "litos-ui";

regist(DescriptionPanel);
```

## 演示

### 基础用法

使用

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-description-panel></l-description-panel>
</textarea>
<div class="source">
<textarea lang="html">
  <l-description-panel></l-description-panel>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### DescriptionPanel Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### DescriptionPanel Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### DescriptionPanel Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### DescriptionPanel Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### DescriptionPanel CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
