# Qrcode 二维码

生成二维码

## 引用

```js
import { Qrcode, regist } from "litos-ui";

regist(Qrcode);
```

## 演示

### 基础用法

使用

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-qrcode></l-qrcode>
</textarea>
<div class="source">
<textarea lang="html">
  <l-qrcode></l-qrcode>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Qrcode Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Qrcode Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Qrcode Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Qrcode Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Qrcode CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
