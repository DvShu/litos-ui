# Calendar 日历

显示日期；按照日历的形式展示数据的容器

## 引用

```js
import { regist, Calendar } from "litos-ui";

regist(Calendar);
```

## 演示

### 基础用法

渲染 `year`、`month` 渲染指定年月的日历。默认为当前年月。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar year="2026" month="2"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

### 限制可选日期

通过 `min-date`、`max-date` 属性可以限制可选日期的范围。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-calendar min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Calendar Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### Calendar Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Calendar Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Calendar Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### Calendar CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |

| - | - | - |