# Container 容器布局

容器布局，采用了 `flex` 布局，一般用于后台管理项目的一些常用排版，方便快速搭建页面的基本结构：

- `l-container`：外层容器，一般用于 `section` 标签，基本排版为水平左右排列，可以通过设置 `l-layout-verticle` 调整为垂直上下排列。可以嵌套
- `l-header`：顶栏容器，一般用于 `header` 标签
- `l-aside`: 侧边栏容器，一般用于 `aside` 标签
- `l-main`: 主要区域容器，一般用于 `main` 标签
- `l-footer`: 底栏容器，一般用于 `footer` 标签

通常用于后台管理系统的首页排版

## 引入

由于使用不是特别频繁，所以没有封装为组件，在需要时手动引入样式表

```ts
import "litos-ui/styles/container.css";
```

## 常见布局

### 上下两栏排版

<ClientOnly>
<l-code-preview class="mt-15">
<textarea lang="html">
  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
  </section>
</textarea>
</l-code-preview>
</ClientOnly>

### 左右两栏排版

<ClientOnly>
<l-code-preview class="mt-15">
<textarea lang="html">
  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <main class="l-main">Main</main>
  </section>
</textarea>
</l-code-preview>
</ClientOnly>

### 上下两栏嵌套

<ClientOnly>
<l-code-preview class="mt-15">
<textarea lang="html">
  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
</textarea>
</l-code-preview>
</ClientOnly>

### 左右两栏嵌套

<ClientOnly>
<l-code-preview class="mt-15">
<textarea lang="html">
  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <section class="l-container l-layout-vertical">
      <header class="l-header">Header</header>
      <main class="l-main">Main</main>
    </section>
  </section>
</textarea>
</l-code-preview>
</ClientOnly>

### 上中下三栏

<ClientOnly>
<l-code-preview class="mt-15">
<textarea lang="html">
  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
    <footer class="l-footer">Footer</footer>
  </section>
</textarea>
</l-code-preview>
</ClientOnly>

### 经典后台系统

在 `header` 里面放点东西就成了，就成了经典的后台管理系统的模板, 左边是图标，右边是登录用户；`Aside` 里面放菜单(`Menu`)，`Main` 里面放内容就是经典的后台管理系统模板

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <section class="l-container l-layout-vertical">
    <header class="l-header">
      <a href="#">LitOS UI</a>
      <div>登录用户</div>
    </header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
</textarea>
</l-code-preview>
</ClientOnly>

## 主题定制

### 样式变量

| 名称                | 描述       | 默认值                         |
| ------------------- | ---------- | ------------------------------ |
| `--l-header-height` | header高度 | `50px`                         |
| `--l-aside-width`   | 侧边栏宽度 | `240px`                        |
| `--l-footer-height` | 底栏高度   | `var(--l-header-height, 50px)` |
