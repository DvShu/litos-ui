# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 引用

```js
import { Switch, regist } from "litos-ui";

regist(Switch);
```

## 演示

### 基础用法

绑定 `value` 到一个 `boolean` 类型的变量。可以使用 `true` 和 `false` 分别表示开和关。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-switch value="false"></l-switch>
</textarea>
<div class="source">
<textarea lang="html">
  <l-switch></l-switch>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Switch Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Switch Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Switch Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Switch Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Switch CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
