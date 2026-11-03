# 预置主题

通过覆盖 `styles/vars.css` 中的 CSS 变量切换主题，组件会继承所在容器的变量，无需重新注册或渲染。

## 预置主题

提供七套预置主题：**翡翠绿（jade，#00AA7E）**、**珊瑚红（coral，#FF6448）**、**活力橙（tangerine，#FF7802）**、**苹果（apple，#9E8D51）**、**深海蓝（deep-sea-blue，#1D3D79）**、**藤黄（gamboge，#FED110）**、**莲子（lotus-seed，#E515AA）**。

每套主题包含主色、色阶、状态色和中性色，控件高度、圆角仍沿用基础变量。主色与成功、错误、警告颜色独立配置，颜色接近时通过调整对应状态色保持区分。

点击卡片应用主题，再次点击已选卡片恢复默认蓝色。同一时间只能选中一套主题，明暗模式保持不变。

<ClientOnly>
  <div class="theme-presets" role="group" aria-label="预置主题">
    <button v-for="preset in presets" :key="preset.id" type="button" class="theme-preset" :style="{ '--preset-color': preset.color }" :aria-pressed="selected === preset.id" @click="selectTheme(preset.id)">
      <span class="theme-preset-swatch" aria-hidden="true"></span>
      <span class="theme-preset-name">{{ preset.name }}</span>
      <span class="theme-preset-meta">{{ preset.id }} · {{ preset.color }}</span>
      <span class="theme-preset-status">{{ selected === preset.id ? '已选中 ✓' : '点击应用' }}</span>
    </button>
  </div>
  <p aria-live="polite">当前主题：{{ presets.find(preset => preset.id === selected)?.name || '默认蓝色' }}</p>
  <div class="theme-preview">
    <l-button type="primary">主题按钮</l-button>
    <span class="theme-status" style="--status-color: var(--l-success-color); --status-bg: var(--l-success-color-light5)">成功</span>
    <span class="theme-status" style="--status-color: var(--l-error-color); --status-bg: var(--l-error-color-light5)">错误</span>
    <span class="theme-status" style="--status-color: var(--l-warning-color); --status-bg: var(--l-warning-color-light5, var(--vp-c-bg-soft))">警告</span>
  </div>
</ClientOnly>

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

<<< ../styles/themes/jade.css

### 珊瑚红 · coral

<<< ../styles/themes/coral.css

### 活力橙 · tangerine

<<< ../styles/themes/tangerine.css

### 苹果 · apple

<<< ../styles/themes/apple.css

### 深海蓝 · deep-sea-blue

<<< ../styles/themes/deep-sea-blue.css

### 藤黄 · gamboge

<<< ../styles/themes/gamboge.css

### 莲子 · lotus-seed

<<< ../styles/themes/lotus-seed.css

> 自定义主题切换方式见 [Theme 主题切换组件](./components/theme)。如果曾通过颜色选择器设置根元素上的内联颜色变量，需要先移除对应内联变量，才能由预置主题样式接管。

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const presets = [
  { id: "jade", name: "翡翠绿", color: "#00AA7E" },
  { id: "coral", name: "珊瑚红", color: "#FF6448" },
  { id: "tangerine", name: "活力橙", color: "#FF7802" },
  { id: "apple", name: "苹果", color: "#9E8D51" },
  { id: "deep-sea-blue", name: "深海蓝", color: "#1D3D79" },
  { id: "gamboge", name: "藤黄", color: "#FED110" },
  { id: "lotus-seed", name: "莲子", color: "#E515AA" },
];
const selected = ref("");
let observer;
function syncTheme() {
  selected.value = document.documentElement.getAttribute("data-theme") || "";
}
function selectTheme(id) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === id) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
  syncTheme();
}
onMounted(() => {
  syncTheme();
  observer = new MutationObserver(syncTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
});
onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.theme-preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.theme-status {
  padding: 6px 12px;
  border: 1px solid var(--status-color);
  border-radius: 6px;
  background: var(--status-bg);
  color: var(--status-color);
  font-size: 14px;
}
.theme-presets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin: 24px 0 16px;
}
.theme-preset {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.theme-preset:hover,
.theme-preset[aria-pressed="true"] {
  border-color: var(--preset-color);
  box-shadow: 0 0 0 1px var(--preset-color);
}
.theme-preset:focus-visible {
  outline: 3px solid var(--preset-color);
  outline-offset: 4px;
}
.theme-preset-swatch {
  width: 36px;
  height: 36px;
  margin-bottom: 4px;
  border-radius: 50%;
  background: var(--preset-color);
}
.theme-preset-name { font-size: 16px; font-weight: 600; }
.theme-preset-meta { font-size: 12px; color: var(--vp-c-text-2); }
.theme-preset-status { font-size: 13px; }
.theme-preset[aria-pressed="true"] .theme-preset-status { font-weight: 600; }
</style>