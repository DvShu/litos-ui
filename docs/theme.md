# 主题切换

通过覆盖 `styles/vars.css` 中的 CSS 变量切换主题，组件会继承所在容器的变量，无需重新注册或渲染。

## 预置主题

提供三套预置主题：**翡翠绿（jade，#00AA7E）**、**珊瑚红（coral，#FF6448）**、**活力橙（tangerine，#FF7802）**。

每套主题包含主色及其浅色、深色阶，同时搭配成功、错误、警告、文字、边框和禁用颜色。控件高度、圆角等尺寸仍沿用基础变量。主题色与状态色分别定义，例如珊瑚红主题中的错误状态使用更深的红色。

下面三个固定模块展示预置主题的主色，文字和边框分别使用对应颜色。各主题的完整 CSS 变量见下方源码。

<ClientOnly>
  <div class="grid grid-cols-3 gap-4">
    <section style="color: #00AA7E; border: 1px solid #00AA7E; padding: 10px;">
      <div>翡翠绿[jade] * #00AA7E</div>
    </section>
    <section style="color: #FF6448; border: 1px solid #FF6448; padding: 10px;">
      <div>珊瑚红[coral] * #FF6448</div>
    </section>
    <section style="color: #FF7802; border: 1px solid #FF7802; padding: 10px;">
      <div>活力橙[tangerine] * #FF7802</div>
    </section>
  </div>
</ClientOnly>

## 引入主题变量

先引入基础变量，再选择一套预置主题文件。主题变量定义在 `:root` 上，同时引入多套时，后加载的主题会覆盖先加载的主题。

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/theme-jade.css";
// 切换为珊瑚红或活力橙时，将上一行替换为对应文件：
// import "litos-ui/styles/theme-coral.css";
// import "litos-ui/styles/theme-tangerine.css";
```

需要暗黑模式时，在基础变量之后额外引入 `litos-ui/styles/dark.css`，再通过根元素的 `dark` 类切换。该文件只包含暗黑变量覆盖，不自动切换模式，也不由 `vars.css` 隐式加载。

## 主题变量源码

三套文件均使用 CSS 变量定义颜色，可直接引用，也可复制后调整。警告颜色统一使用 `--l-warning-color`，文字颜色使用 `--l-text-color` 和 `--l-text-secondary-color`。

### 翡翠绿 · jade

<<< ../styles/theme-jade.css

### 珊瑚红 · coral

<<< ../styles/theme-coral.css

### 活力橙 · tangerine

<<< ../styles/theme-tangerine.css

> 自定义主题切换方式见 [Theme 主题切换组件](./components/theme)。如果曾通过颜色选择器设置根元素上的内联颜色变量，需要先移除对应内联变量，才能由预置主题样式接管。