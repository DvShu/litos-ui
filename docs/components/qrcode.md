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
| `text` | 二维码内容 | `string` | — |
| `fill` | 二维码颜色 | `string` | `#000000` |
| `size` | 二维码大小 | `string` | `100` |
| `level`| 二维码容错率, `L`、`M`、`Q`、`H` | `string` | `M` |
