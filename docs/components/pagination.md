# Pagination 分页

当加载所有数据时将花费更多时间，使用分页组件可以快速切换数据。

## 引用

```js
import {
  Pagination,
  regist,
  Button,
  ArrowLeftIcon,
  ArrowRightIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  MoreIcon,
  Input,
} from "litos-ui";

regist([
  Pagination,
  Button,
  ArrowLeftIcon,
  ArrowRightIcon,
  DArrowLeftIcon,
  DArrowRightIcon,
  MoreIcon,
  Input,
]);
```

## 演示

### 基础用法

只需要传递 `total` 或者 `page-count` 就能显示一个分页组件. 在 `change` 事件中进行分页处理

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="100"></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

### 对齐方式

通过 `align` 来设置对齐方式. 取值有: start、center、end

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="100" align="start"></l-pagination>
  <hr/>
  <l-pagination total="100" align="center"></l-pagination>
  <hr/>
  <l-pagination total="100" align="end"></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

### 单页隐藏

通过 `hide-on-single-page` 来设置单页隐藏.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="10" hide-on-single-page></l-pagination>
</textarea>
</l-code-preview>
</ClientOnly>

### 简单分页

简单的分页，在空间有限的情况下，可以使用简单分页。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-pagination total="100" simple></l-pagination>
</textarea>
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
