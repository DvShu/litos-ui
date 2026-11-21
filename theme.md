---
url: https://dvshu.github.io/litos-ui/theme.md
---
# 预置主题

通过覆盖 `styles/vars.css` 中的 CSS 变量切换主题，组件会继承所在容器的变量，无需重新注册或渲染。

## 预置主题

提供七套预置主题：**翡翠绿（jade，#00AA7E）**、**珊瑚红（coral，#FF6448）**、**活力橙（tangerine，#FF7802）**、**苹果（apple，#9E8D51）**、**深海蓝（deep-sea-blue，#1D3D79）**、**藤黄（gamboge，#FED110）**、**莲子（lotus-seed，#E515AA）**。

每套主题包含主色、色阶、状态色和中性色，控件高度、圆角仍沿用基础变量。主色与成功、错误、警告颜色独立配置，颜色接近时通过调整对应状态色保持区分。

点击卡片应用主题，再次点击已选卡片恢复默认蓝色。同一时间只能选中一套主题，明暗模式保持不变。

```
<button v-for="preset in presets" :key="preset.id" type="button" class="theme-preset" :style="{ '--preset-color': preset.color }" :aria-pressed="selected === preset.id" @click="selectTheme(preset.id)">
  <span class="theme-preset-swatch" aria-hidden="true"></span>
  <span class="theme-preset-name">{{ preset.name }}</span>
  <span class="theme-preset-meta">{{ preset.id }} · {{ preset.color }}</span>
  <span class="theme-preset-status">{{ selected === preset.id ? '已选中 ✓' : '点击应用' }}</span>
</button>
```

  <p aria-live="polite">当前主题：{{ presets.find(preset => preset.id === selected)?.name || '默认蓝色' }}</p>

```
<l-button type="primary">主题按钮</l-button>
<span class="theme-status" style="--status-color: var(--l-success-color); --status-bg: var(--l-success-color-light5)">成功</span>
<span class="theme-status" style="--status-color: var(--l-error-color); --status-bg: var(--l-error-color-light5)">错误</span>
<span class="theme-status" style="--status-color: var(--l-warning-color); --status-bg: var(--l-warning-color-light5, var(--vp-c-bg-soft))">警告</span>
```

藤黄主题通过 `--l-primary-contrast-color`（默认 `#ffffff`）为实心主题按钮设置深色文字，警告色使用较深的琥珀色与主色区分。浅色背景上应避免单独用明亮主色显示小字号文字。

## 引入主题变量

先引入基础变量，再选择一套预置主题文件。主题变量定义在 `:root` 上，同时引入多套时，后加载的主题会覆盖先加载的主题。

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/themes/jade.css";
// 切换为其他预置主题时，将上一行替换为对应文件：
// import "litos-ui/styles/themes/coral.css";
// import "litos-ui/styles/themes/tangerine.css";
// import "litos-ui/styles/themes/apple.css";
// import "litos-ui/styles/themes/deep-sea-blue.css";
// import "litos-ui/styles/themes/gamboge.css";
// import "litos-ui/styles/themes/lotus-seed.css";
```

也可以直接通过 HTML 样式表引入，保持相同顺序：

```html
<link rel="stylesheet" href="/path/to/litos-ui/styles/vars.css" />
<link rel="stylesheet" href="/path/to/litos-ui/styles/themes/jade.css" />
```

## 通过 data-theme 手动选择

通过 `html` 的 `data-theme` 选择已引入的 `jade`、`coral`、`tangerine`、`apple`、`deep-sea-blue`、`gamboge` 或 `lotus-seed`，显式选择不受这些文件引入顺序影响。先引入主题集合、再引入基础变量，未选择时使用默认蓝色。

```js
import "litos-ui/styles/themes.css";
import "litos-ui/styles/vars.css";

// 选择莲子，也可设置为其他已加载主题的标识
document.documentElement.dataset.theme = "lotus-seed";

// 取消选择，恢复默认配色
document.documentElement.removeAttribute("data-theme");
```

`themes.css` 汇总引入七套主题，也可以只引入需要的 `themes/<name>.css`。未设置或移除 `data-theme` 时，同名变量由引入顺序决定：主题在 `vars.css` 之后引入则自动应用，反过来则使用默认配色。根元素上的内联颜色变量会优先于主题样式，使用前应移除已有的自定义内联颜色变量。

需要暗黑模式时，在基础变量之后额外引入 `litos-ui/styles/dark.css`，再通过根元素的 `dark` 类切换。该文件只包含暗黑变量覆盖，不自动切换模式，也不由 `vars.css` 隐式加载。

只有已经引入的主题才能通过 `data-theme` 选择。设置未加载的主题标识不会自动加载 CSS。

## 主题变量源码

各主题文件只覆盖发生变化的颜色，其余变量沿用 `vars.css`，可直接引用，也可复制后调整。警告颜色统一使用 `--l-warning-color`，文字颜色使用 `--l-text-color` 和 `--l-text-secondary-color`，浅色填充背景使用 `--l-fill-secondary-color`。

### 翡翠绿 · jade

```css
/* 翡翠绿主题 · #00AA7E，先引入 vars.css */
:root,
:root[data-theme="jade"] {
  /* 主题色 */
  --l-primary-color: #00aa7e;
  --l-primary-color-light1: #33bb98;
  --l-primary-color-light2: #66ccb2;
  --l-primary-color-light3: #99ddcb;
  --l-primary-color-light4: #cceee5;
  --l-primary-color-light5: #e6f7f2;
  --l-primary-color-dark1: #008865;
  --l-primary-color-dark2: #00664c;
  /* 状态色：保持成功、错误和警告的语义区别 */
  --l-success-color: #389e60;
  --l-success-color-light1: #60b180;
  --l-success-color-light2: #88c5a0;
  --l-success-color-light3: #afd8bf;
  --l-success-color-light4: #d7ecdf;
  --l-success-color-light5: #ebf5ef;
  --l-success-color-dark1: #2d7e4d;
  --l-error-color: #df4b52;
  --l-error-color-light3: #f2b7ba;
  --l-error-color-light5: #fcedee;
  --l-warning-color: #d99016;
  --l-warning-color-light5: #fbf4e8;
  --l-text-color: #354a42;
  --l-text-secondary-color: #596e65;
  --l-fill-secondary-color: #f8f9f9;
  /* 中性色 */
  --l-border-color: #d8e5e0;
  --l-disabled-color: #e5ece9;
}

/* 暗黑模式下保持禁用状态的可辨识度 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### 珊瑚红 · coral

```css
/* 珊瑚红主题 · #FF6448，先引入 vars.css */
:root,
:root[data-theme="coral"] {
  /* 主题色 */
  --l-primary-color: #ff6448;
  --l-primary-color-light1: #ff836d;
  --l-primary-color-light2: #ffa291;
  --l-primary-color-light3: #ffc1b6;
  --l-primary-color-light4: #ffe0da;
  --l-primary-color-light5: #fff0ed;
  --l-primary-color-dark1: #cc503a;
  --l-primary-color-dark2: #993c2b;
  /* 状态色：保持成功、错误和警告的语义区别 */
  --l-success-color: #409b72;
  --l-success-color-light1: #66af8e;
  --l-success-color-light2: #8cc3aa;
  --l-success-color-light3: #b3d7c7;
  --l-success-color-light4: #d9ebe3;
  --l-success-color-light5: #ecf5f1;
  --l-success-color-dark1: #337c5b;
  --l-error-color: #d9364f;
  --l-error-color-light3: #f0afb9;
  --l-error-color-light5: #fbebed;
  --l-warning-color: #d99420;
  --l-warning-color-light5: #fbf4e9;
  --l-text-color: #51413d;
  --l-text-secondary-color: #75605a;
  --l-fill-secondary-color: #f9f8f8;
  /* 中性色 */
  --l-border-color: #e8dcd8;
  --l-disabled-color: #efe7e4;
}

/* 暗黑模式下保持禁用状态的可辨识度 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### 活力橙 · tangerine

```css
/* 活力橙主题 · #FF7802，先引入 vars.css */
:root,
:root[data-theme="tangerine"] {
  /* 主题色 */
  --l-primary-color: #ff7802;
  --l-primary-color-light1: #ff9335;
  --l-primary-color-light2: #ffae67;
  --l-primary-color-light3: #ffc99a;
  --l-primary-color-light4: #ffe4cc;
  --l-primary-color-light5: #fff2e6;
  --l-primary-color-dark1: #cc6002;
  --l-primary-color-dark2: #994801;
  /* 状态色：保持成功、错误和警告的语义区别 */
  --l-success-color: #489b60;
  --l-success-color-light1: #6daf80;
  --l-success-color-light2: #91c3a0;
  --l-success-color-light3: #b6d7bf;
  --l-success-color-light4: #daebdf;
  --l-success-color-light5: #edf5ef;
  --l-success-color-dark1: #3a7c4d;
  --l-error-color: #dc4848;
  --l-error-color-light3: #f1b6b6;
  --l-error-color-light5: #fceded;
  --l-warning-color: #d9a11b;
  --l-warning-color-light5: #fbf6e8;
  --l-text-color: #4d4338;
  --l-text-secondary-color: #726452;
  --l-fill-secondary-color: #f9f9f8;
  /* 中性色 */
  --l-border-color: #e8dfd3;
  --l-disabled-color: #eee9e1;
}

/* 暗黑模式下保持禁用状态的可辨识度 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### 苹果 · apple

```css
/* 苹果主题 · #9E8D51；默认配色按引入顺序覆盖，data-theme 可显式选择。 */
:root,
:root[data-theme="apple"] {
  --l-primary-color: #9e8d51;
  --l-primary-color-light1: #b1a474;
  --l-primary-color-light2: #c5bb97;
  --l-primary-color-light3: #d8d1b9;
  --l-primary-color-light4: #ece8dc;
  --l-primary-color-light5: #f5f4ee;
  --l-primary-color-dark1: #7e7141;
  --l-primary-color-dark2: #5f5531;
  --l-success-color: #52c41a;
  --l-success-color-light1: #73d13d;
  --l-success-color-light2: #95de64;
  --l-success-color-light3: #b7eb8f;
  --l-success-color-light4: #d9f7be;
  --l-success-color-light5: #f6ffed;
  --l-success-color-dark1: #389e0d;
  --l-success-color-dark2: #317610;
  --l-error-color: #f5222d;
  --l-error-color-light1: #f74e57;
  --l-error-color-light2: #f97a81;
  --l-error-color-light3: #ffa39e;
  --l-error-color-light4: #fdd3d5;
  --l-error-color-light5: #fff1f0;
  --l-error-color-dark1: #c41b24;
  --l-error-color-dark2: #93141b;
  /* 主色与默认警告色相近，使用深琥珀色保持警告语义。 */
  --l-warning-color: #a65b00;
  --l-warning-color-light1: #b87c33;
  --l-warning-color-light2: #ca9d66;
  --l-warning-color-light3: #dbbd99;
  --l-warning-color-light4: #eddecc;
  --l-warning-color-light5: #f6efe6;
  --l-warning-color-dark1: #854900;
  --l-warning-color-dark2: #643700;
  --l-text-color: #433f30;
  --l-text-secondary-color: #68614d;
  --l-fill-secondary-color: #faf9f5;
  --l-border-color: #e5e0cf;
  --l-disabled-color: #ebe8de;
}

/* 暗黑模式下保持禁用状态的可辨识度。 */
:root.dark {
  --l-disabled-color: #6c6c6c;
}
```

### 深海蓝 · deep-sea-blue

```css
/* 深海蓝主题 · #1D3D79；其余颜色继承 vars.css。 */
:root,
:root[data-theme="deep-sea-blue"] {
  --l-primary-color: #1d3d79;
  --l-primary-color-light1: #4a6494;
  --l-primary-color-light2: #778baf;
  --l-primary-color-light3: #a5b1c9;
  --l-primary-color-light4: #d2d8e4;
  --l-primary-color-light5: #e8ecf2;
  --l-primary-color-dark1: #173161;
  --l-primary-color-dark2: #112549;
}
```

### 藤黄 · gamboge

```css
/* 藤黄主题 · #FED110；未变化的颜色继承 vars.css。 */
:root,
:root[data-theme="gamboge"] {
  --l-primary-color: #fed110;
  --l-primary-color-light1: #feda40;
  --l-primary-color-light2: #fee370;
  --l-primary-color-light3: #ffed9f;
  --l-primary-color-light4: #fff6cf;
  --l-primary-color-light5: #fffae7;
  --l-primary-color-dark1: #cba70d;
  --l-primary-color-dark2: #987d0a;
  --l-warning-color: #b86e00;
  --l-warning-color-light5: #f8f1e6;
  --l-primary-contrast-color: #332900;
}
```

### 莲子 · lotus-seed

```css
/* 莲子主题 · #E515AA；其余颜色继承 vars.css。 */
:root,
:root[data-theme="lotus-seed"] {
  --l-primary-color: #e515aa;
  --l-primary-color-light1: #ea44bb;
  --l-primary-color-light2: #ef73cc;
  --l-primary-color-light3: #f5a1dd;
  --l-primary-color-light4: #fad0ee;
  --l-primary-color-light5: #fce8f7;
  --l-primary-color-dark1: #b71188;
  --l-primary-color-dark2: #890d66;
}
```

> 自定义主题切换方式见 [Theme 主题切换组件](https://dvshu.github.io/litos-ui/components/theme.md)。如果曾通过颜色选择器设置根元素上的内联颜色变量，需要先移除对应内联变量，才能由预置主题样式接管。
