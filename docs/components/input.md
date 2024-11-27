# Input 输入框

## 引用

```js
import { Input, regist } from "litos-ui";

regist(Input);
```

## 使用

### 使用

使用

<ClientOnly>
<l-code-preview>
<textarea>
  <l-input a='135'>按钮</l-input>
</textarea>
<div class="source">
<textarea lang="html">
  <l-input>按钮</l-input>
</textarea>
</div>
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
