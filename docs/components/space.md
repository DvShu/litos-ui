# Space

避免组件紧贴在一起，拉开统一的空间。

## 引用

```js
import { regist, Space } from "litos-ui";

regist(Space);
```

## 演示

### 基础用法

相邻组件水平间距

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-space>
    <span>文字</span>
    <l-button>按钮</l-button>
  </l-space>
</textarea>
</l-code-preview>
</ClientOnly>

### 水平方向位置

通过设置 `justify` 定义元素在水平方向的位置，值为 [`css-justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/justify-content)

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-space>
    <span>文字</span>
    <l-button>按钮</l-button>
  </l-space>
  <hr/>
  <l-space justify="center">
    <span>文字</span>
    <l-button>按钮</l-button>
  </l-space>
  <hr/>
  <l-space justify="flex-end">
    <span>文字</span>
    <l-button>按钮</l-button>
  </l-space>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Space Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `inline` | 是否为行内元素 | `boolean` | `false` |
| `justify` | 水平方向位置 | `string` | `flex-start` |
| `direction` | 布局方向 | `string` | `row` |
| `wrap` | 是否换行 | `boolean` | `false` |
| `align` | 垂直方向位置 | `string` | `flex-start` |
| `gap` | 间距, 如果是 `,` 分隔的值则为水平、垂直方向间距; 例如: `10,15` | `string` | `10px` |

### Space CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-space-display` | 控制容器的 display 类型 | `flex` |
| `--l-space-align` | 设置交叉轴对齐方式（align-items） | `center` |
| `--l-space-justify` | 设置主轴对齐方式（justify-content） | `flex-start` |
| `--l-space-gap` | 设置子元素之间的间距（gap） | `10px` |
| `--l-space-wrap` | 控制是否换行（flex-wrap） | `nowrap` |
| `--l-space-direction` | 设置主轴方向（flex-direction） | `row` |
