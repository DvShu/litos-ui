# List 滚动列表

无限加载数据的列表。滚动至底部时，加载更多数据。

## 引用

```js
import { List, regist } from "litos-ui";

regist(List);
```

## 演示

### 基础用法

滚动到底部触发 `load-more` 加载更多事件，通过 `finish` 属性决定是否加载完成。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
 <l-list></l-list>
</textarea>
<div class="source">
<textarea lang="html">
  <l-list></l-list>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### List Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### List Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### List Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### List Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### List CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
