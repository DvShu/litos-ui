# Pagination 分页

当加载所有数据时将花费更多时间，使用分页组件可以快速切换数据。

## 引用

```js
import { Pagination, regist } from "litos-ui";

regist(Pagination);
```

## 演示

### 基础用法

只需要传递 `total` 或者 `page-count` 就能显示一个分页组件. 在 `change` 事件中进行分页处理

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination></l-pagination>
</textarea>
<div class="source">
<textarea lang="html">
  <l-pagination></l-pagination>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Pagination Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Pagination Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Pagination Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Pagination Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Pagination CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
