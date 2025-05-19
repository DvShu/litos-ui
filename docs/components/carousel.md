# Carousel 轮播

在同一平级(水平、垂直)内容下，循环播放展示子内容。

## 引用

```js
import { Carousel, CarouselItem, regist } from "litos-ui";

regist([Carousel, CarouselItem]);
```

## 演示

### 基础用法

使用

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-carousel>
    <l-carousel-item style="background:red;color:#ffffff;">1</l-carousel-item>
    <l-carousel-item style="background:green;color:#ffffff;">2</l-carousel-item>
    <l-carousel-item style="background:orange;color:#ffffff;">3</l-carousel-item>
    <l-carousel-item style="background:blue;color:#ffffff;">4</l-carousel-item>
    <l-carousel-item style="background:#008858;color:#ffffff;">5</l-carousel-item>
  </l-carousel>
</textarea>
<div class="source">
<textarea lang="html">
  <l-carousel></l-carousel>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Carousel Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Carousel Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Carousel Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Carousel Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Carousel CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
