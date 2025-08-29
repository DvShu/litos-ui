import{_ as d,C as o,c as r,o as c,ag as s,G as l,j as a,w as i,a as t}from"./chunks/framework._HD6XqYi.js";const v=JSON.parse('{"title":"Container 容器布局","description":"","frontmatter":{},"headers":[],"relativePath":"components/container.md","filePath":"components/container.md","lastUpdated":1735616805000}'),h={name:"components/container.md"};function m(u,e,p,b,f,x){const n=o("ClientOnly");return c(),r("div",null,[e[6]||(e[6]=s('<h1 id="container-容器布局" tabindex="-1">Container 容器布局 <a class="header-anchor" href="#container-容器布局" aria-label="Permalink to &quot;Container 容器布局&quot;">​</a></h1><p>容器布局，采用了 <code>flex</code> 布局，一般用于后台管理项目的一些常用排版，方便快速搭建页面的基本结构：</p><ul><li><code>l-container</code>：外层容器，一般用于 <code>section</code> 标签，基本排版为水平左右排列，可以通过设置 <code>l-layout-verticle</code> 调整为垂直上下排列。可以嵌套</li><li><code>l-header</code>：顶栏容器，一般用于 <code>header</code> 标签</li><li><code>l-aside</code>: 侧边栏容器，一般用于 <code>aside</code> 标签</li><li><code>l-main</code>: 主要区域容器，一般用于 <code>main</code> 标签</li><li><code>l-footer</code>: 底栏容器，一般用于 <code>footer</code> 标签</li></ul><p>通常用于后台管理系统的首页排版</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h2><p>由于使用不是特别频繁，所以没有封装为组件，在需要时手动引入样式表</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/container.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="常见布局" tabindex="-1">常见布局 <a class="header-anchor" href="#常见布局" aria-label="Permalink to &quot;常见布局&quot;">​</a></h2><h3 id="上下两栏排版" tabindex="-1">上下两栏排版 <a class="header-anchor" href="#上下两栏排版" aria-label="Permalink to &quot;上下两栏排版&quot;">​</a></h3>',9)),l(n,null,{default:i(()=>[...e[0]||(e[0]=[a("l-code-preview",{class:"mt-15"},[a("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
  </section>
`)],-1)])]),_:1}),e[7]||(e[7]=a("h3",{id:"左右两栏排版",tabindex:"-1"},[t("左右两栏排版 "),a("a",{class:"header-anchor",href:"#左右两栏排版","aria-label":'Permalink to "左右两栏排版"'},"​")],-1)),l(n,null,{default:i(()=>[...e[1]||(e[1]=[a("l-code-preview",{class:"mt-15"},[a("textarea",{lang:"html"},`  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <main class="l-main">Main</main>
  </section>
`)],-1)])]),_:1}),e[8]||(e[8]=a("h3",{id:"上下两栏嵌套",tabindex:"-1"},[t("上下两栏嵌套 "),a("a",{class:"header-anchor",href:"#上下两栏嵌套","aria-label":'Permalink to "上下两栏嵌套"'},"​")],-1)),l(n,null,{default:i(()=>[...e[2]||(e[2]=[a("l-code-preview",{class:"mt-15"},[a("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
`)],-1)])]),_:1}),e[9]||(e[9]=a("h3",{id:"左右两栏嵌套",tabindex:"-1"},[t("左右两栏嵌套 "),a("a",{class:"header-anchor",href:"#左右两栏嵌套","aria-label":'Permalink to "左右两栏嵌套"'},"​")],-1)),l(n,null,{default:i(()=>[...e[3]||(e[3]=[a("l-code-preview",{class:"mt-15"},[a("textarea",{lang:"html"},`  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <section class="l-container l-layout-vertical">
      <header class="l-header">Header</header>
      <main class="l-main">Main</main>
    </section>
  </section>
`)],-1)])]),_:1}),e[10]||(e[10]=a("h3",{id:"上中下三栏",tabindex:"-1"},[t("上中下三栏 "),a("a",{class:"header-anchor",href:"#上中下三栏","aria-label":'Permalink to "上中下三栏"'},"​")],-1)),l(n,null,{default:i(()=>[...e[4]||(e[4]=[a("l-code-preview",{class:"mt-15"},[a("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
    <footer class="l-footer">Footer</footer>
  </section>
`)],-1)])]),_:1}),e[11]||(e[11]=a("h3",{id:"经典后台系统",tabindex:"-1"},[t("经典后台系统 "),a("a",{class:"header-anchor",href:"#经典后台系统","aria-label":'Permalink to "经典后台系统"'},"​")],-1)),e[12]||(e[12]=a("p",null,[t("在 "),a("code",null,"header"),t(" 里面放点东西就成了，就成了经典的后台管理系统的模板, 左边是图标，右边是登录用户；"),a("code",null,"Aside"),t(" 里面放菜单("),a("code",null,"Menu"),t(")，"),a("code",null,"Main"),t(" 里面放内容就是经典的后台管理系统模板")],-1)),l(n,null,{default:i(()=>[...e[5]||(e[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">
      <a href="#">LitOS UI</a>
      <div>登录用户</div>
    </header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
`)],-1)])]),_:1}),e[13]||(e[13]=s('<h2 id="主题定制" tabindex="-1">主题定制 <a class="header-anchor" href="#主题定制" aria-label="Permalink to &quot;主题定制&quot;">​</a></h2><h3 id="样式变量" tabindex="-1">样式变量 <a class="header-anchor" href="#样式变量" aria-label="Permalink to &quot;样式变量&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-header-height</code></td><td>header高度</td><td><code>50px</code></td></tr><tr><td><code>--l-aside-width</code></td><td>侧边栏宽度</td><td><code>240px</code></td></tr><tr><td><code>--l-footer-height</code></td><td>底栏高度</td><td><code>var(--l-header-height, 50px)</code></td></tr></tbody></table>',3))])}const g=d(h,[["render",m]]);export{v as __pageData,g as default};
