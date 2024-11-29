# Input 输入框

## 引用

```js
import { Input, regist } from "litos-ui";

regist(Input);
```

## 演示

### 基础用法

文本输入的基础用法。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="请输入内容"></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

通过 `disabled` 属性设置输入框为禁用状态。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-input placeholder="请输入内容" disabled></l-input>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Input Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Input Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### 样式变量

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-btn-text-color` | 按钮的文字颜色 | `rgba(0, 0, 0, 0.65)` |
