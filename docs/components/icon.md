# icon

内置图标有限，推荐使用 [iconify](https://iconify.design/docs/iconify-icon/)

## 基本使用

### 引入

```js
import { ArrowDownIcon, regist, ... } from "litos-ui";

regist(ArrowDownIcon);
// ...
```

### 使用

```html
<l-arrow-down-icon></l-arrow-down-icon>
```

### 内置图标

框架内置的图标如下：

<ClientOnly>
  <l-icon-list></l-icon-list>
</ClientOnly>

### `iconfont` 图标

使用时需要单独引入 `iconfont` 图标文件。`name` 属性填入引入的 `iconfont` 文件里面对应的 `id`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-font-icon name="icon-red-packet"></l-font-icon>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义图标

可以通过使用 `base-icon` 然后加入自定义的 `svg-path` 路径来构建自定义的图标

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-base-icon>
    <path
      d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
      fill="#231F20"
    ></path>
  </l-base-icon>
</textarea>
</l-code-preview>
</ClientOnly>

> 当前也可以通过继承 `BaseIcon` 来自定义图标

```js
import { BaseIcon, regist } from "litos-ui";

class MyIcon extends BaseIcon {
  constructor() {
    super();
    this.viewBox = "0 0 1024 1024"; // 默认
  }

  renderChildren() {
    return '<path fill="currentColor" d="M512 320 192 704h639.936z"></path>';
  }
}

regist(MyIcon, "my-icon");

// <my-icon></my-icon>
```

### 颜色和尺寸

修改颜色和尺寸可以通过 `color` 和 `font-size` 修改

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-caret-bottom-icon style="color:red;font-size:32px;" />
</textarea>
</l-code-preview>
</ClientOnly>

> 这里是通过 `style` 属性来修改的，也可以通过 `class` 来修改

### Icon Attribute

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `view-box` | svg view box  | `string` | `0 0 1024 1024` |
