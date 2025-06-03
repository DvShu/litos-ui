# Carousel 轮播

在同一平级(水平、垂直)内容下，循环播放展示子内容。

## 引用

```js
import { Carousel, CarouselItem, regist } from "litos-ui";

regist([Carousel, CarouselItem]);
```

## 演示

### 基础用法

结合使用 `l-carousel` 和 `l-carousel-item` 标签就能实现轮播。把想要展示的内容放在 `l-carousel-item` 标签内。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-carousel loop="off" autoplay>
    <l-carousel-item class="carousel-item carousel1">1</l-carousel-item>
    <l-carousel-item class="carousel-item carousel2">2</l-carousel-item>
    <l-carousel-item class="carousel-item carousel3">3</l-carousel-item>
    <l-carousel-item class="carousel-item carousel4">4</l-carousel-item>
    <l-carousel-item class="carousel-item carousel5">5</l-carousel-item>
  </l-carousel>
</textarea>
</l-code-preview>
</ClientOnly>

### 箭头切换

`arrows` 属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标 `hover` 到组件上时才会显示。 若将 `arrows` 设置为 `always`，则会一直显示；设置为 `never`，则会一直隐藏。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-carousel arrows="always">
    <l-carousel-item class="carousel-item carousel1">1</l-carousel-item>
    <l-carousel-item class="carousel-item carousel2">2</l-carousel-item>
    <l-carousel-item class="carousel-item carousel3">3</l-carousel-item>
    <l-carousel-item class="carousel-item carousel4">4</l-carousel-item>
    <l-carousel-item class="carousel-item carousel5">5</l-carousel-item>
  </l-carousel>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Carousel Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `arrows` | 切换箭头的显示时机 | `hover`\|`always`\|`never` | `hover` |
| `current-index` | 激活的幻灯片的索引，从 `0` 开始 | `number` | `0` |
| `loop` | 是否开启循环显示 | `on`\|`off` | `on` |
| `autoplay` | 是否自动切换 | `boolean` | `false` |

