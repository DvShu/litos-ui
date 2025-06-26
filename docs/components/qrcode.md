# Qrcode 二维码

生成二维码；底层的二维码的渲染是使用 [qrcode-generator-es](https://www.npmjs.com/package/qrcode-generator-es) 进行渲染

## 引用

```js
import { Qrcode, regist } from "litos-ui";

regist(Qrcode);
```

## 演示

### 基础用法

`text` 属性为二维码内容

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-qrcode text="Hello World"></l-qrcode>
</textarea>
</l-code-preview>
</ClientOnly>

### 样式调整

可以通过 `fill` 属性更改二维码颜色, `size` 属性更改大小; 注意: 实际的二维码的大小不一定跟传递的 `size` 一样大，因为会调整每一个二维码小单元格尺寸, 所以最终大小只能是小于等于传递的 `size`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-qrcode text="Hello World" fill="#4998f4" size="120"></l-qrcode>
</textarea>
</l-code-preview>
</ClientOnly>

### 图标

可以将 `logo` 放入二维码

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-qrcode text="Hello World" icon="/litos-ui/logo.svg"></l-qrcode>
</textarea>
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
