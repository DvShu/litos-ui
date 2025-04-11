import{_ as i,C as s,c as l,o,ag as n,G as d,w as r,j as t}from"./chunks/framework.BCyZWppQ.js";const f=JSON.parse('{"title":"Menu 菜单","description":"","frontmatter":{},"headers":[],"relativePath":"components/menu.md","filePath":"components/menu.md","lastUpdated":1744107634000}'),h={name:"components/menu.md"};function u(m,e,c,b,p,k){const a=s("ClientOnly");return o(),l("div",null,[e[1]||(e[1]=n(`<h1 id="menu-菜单" tabindex="-1">Menu 菜单 <a class="header-anchor" href="#menu-菜单" aria-label="Permalink to &quot;Menu 菜单&quot;">​</a></h1><p>为网站提供导航功能的菜单。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Menu, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Menu);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="侧栏" tabindex="-1">侧栏 <a class="header-anchor" href="#侧栏" aria-label="Permalink to &quot;侧栏&quot;">​</a></h3><p>垂直菜单，可内嵌子菜单。</p>`,7)),d(a,null,{default:r(()=>e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-menu selected-key="A1">
    <l-sub-menu key="N1">
      <iconify-icon icon="tdesign:app" slot="icon"></iconify-icon>
      <span slot="title">导航一</span>
      <l-menu-item key="A1">选项1</l-menu-item>
      <l-menu-item key="A2">选项2</l-menu-item>
      <l-menu-item key="A3">选项3</l-menu-item>
    </l-sub-menu>
    <l-sub-menu key="N2">
      <iconify-icon icon="solar:bug-outline" slot="icon"></iconify-icon>
      <span slot="title">导航二</span>
      <l-menu-item key="B1">选项1</l-menu-item>
      <l-menu-item key="B2">选项2</l-menu-item>
      <l-menu-item key="B3">选项3</l-menu-item>
    </l-sub-menu>
    <l-sub-menu key="N3">
      <iconify-icon icon="stash:light-bulb" slot="icon"></iconify-icon>
      <span slot="title">导航二</span>
      <l-menu-item key="C1">选项1</l-menu-item>
      <l-menu-item key="C2">选项2</l-menu-item>
    </l-sub-menu>
    <l-menu-item key="N4">
      <iconify-icon icon="solar:book-linear" slot="icon"></iconify-icon>
      <span>选项2</span>
    </l-menu-item>
  </l-menu>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-menu></l-menu>
`)])],-1)])),_:1}),e[2]||(e[2]=n('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="menu-attibutes" tabindex="-1">Menu Attibutes <a class="header-anchor" href="#menu-attibutes" aria-label="Permalink to &quot;Menu Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>x</td><td>x</td><td>x</td><td>x</td></tr></tbody></table><h3 id="menu-slots" tabindex="-1">Menu Slots <a class="header-anchor" href="#menu-slots" aria-label="Permalink to &quot;Menu Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr></tbody></table><h3 id="menu-events" tabindex="-1">Menu Events <a class="header-anchor" href="#menu-events" aria-label="Permalink to &quot;Menu Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td></tr></tbody></table><h3 id="menu-methods" tabindex="-1">Menu Methods <a class="header-anchor" href="#menu-methods" aria-label="Permalink to &quot;Menu Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>x</code></td><td>x</td><td><code>(x: number): string</code></td></tr></tbody></table><h3 id="menu-css-variables" tabindex="-1">Menu CSS Variables <a class="header-anchor" href="#menu-css-variables" aria-label="Permalink to &quot;Menu CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l</code></td><td>x</td><td><code>#fff</code></td></tr></tbody></table>',11))])}const _=i(h,[["render",u]]);export{f as __pageData,_ as default};
