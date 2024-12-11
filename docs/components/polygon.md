# Polygon 多边形

显示一些多边形，例如：三角形、菱形、六边形、梯形等；全部采用 [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path) 实现

## 引用

```js
import { l-polygon, regist } from "litos-ui";

regist(l-polygon);
```

## 演示

### 基础用法

默认提供了多种三角形，只需要配置 `shape` 属性即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
 <div class="grid grid-cols-4">
  <div class="center flex-col">
    <l-polygon shape="triangle-top"></l-polygon>
    <span>triangle-top</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom"></l-polygon>
    <span>triangle-bottom</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-left"></l-polygon>
    <span>triangle-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-right"></l-polygon>
    <span>triangle-right</span>
  </div>
</div>
<div class="grid grid-cols-4 mt-15">
  <div class="center flex-col">
    <l-polygon shape="triangle-top-right"></l-polygon>
    <span>triangle-top-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-top-left"></l-polygon>
    <span>triangle-top-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-right"></l-polygon>
    <span>triangle-bottom-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-left"></l-polygon>
    <span>triangle-bottom-left</span>
  </div>
</div>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### l-polygon Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### l-polygon Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### l-polygon Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### l-polygon Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### l-polygon CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
