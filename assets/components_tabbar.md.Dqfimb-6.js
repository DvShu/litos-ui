import{_ as l,C as o,c as i,o as s,ag as b,G as d,j as t,w as n,a as e}from"./chunks/framework._HD6XqYi.js";const g=JSON.parse('{"title":"Tabbar 标签栏","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabbar.md","filePath":"components/tabbar.md","lastUpdated":1750839050000}'),c={name:"components/tabbar.md"};function h(m,a,p,u,f,y){const r=o("ClientOnly");return s(),i("div",null,[a[4]||(a[4]=b(`<h1 id="tabbar-标签栏" tabindex="-1">Tabbar 标签栏 <a class="header-anchor" href="#tabbar-标签栏" aria-label="Permalink to &quot;Tabbar 标签栏&quot;">​</a></h1><p>使用场景如下:</p><ol><li>底部导航栏，用于在不同页面之间进行切换</li><li>标签切换</li><li>选项卡</li></ol><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Tabbar, TabbarItem, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Tabbar, TabbarItem]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="导航栏模式" tabindex="-1">导航栏模式 <a class="header-anchor" href="#导航栏模式" aria-label="Permalink to &quot;导航栏模式&quot;">​</a></h3><p>将 <code>type</code> 设置为 <code>nav</code>[默认]; 通过 <code>name</code> 标记选项卡项，<code>icon</code> 标记渲染图标; 然后通过 <code>slot=&quot;icon&quot;</code> 来渲染图标</p>`,8)),d(r,null,{default:n(()=>[...a[0]||(a[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar style="border: 1px solid #dedede" name="Search">
    <l-tabbar-item name="Reduction" icon>
      <l-reduction-icon slot="icon"></l-reduction-icon>
      <span>Reduction</span>
    </l-tabbar-item>
    <l-tabbar-item name="RefreshLieft" icon>
      <l-refresh-left-icon slot="icon"></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </l-tabbar-item>
    <l-tabbar-item name="Search" icon>
      <l-search-icon slot="icon"></l-search-icon>
      <span>Search</span>
    </l-tabbar-item>
    <l-tabbar-item name="RefreshRight" icon>
      <l-refresh-right-icon slot="icon"></l-refresh-right-icon>
      <span>RefreshRight</span>
    </l-tabbar-item>
    <l-tabbar-item name="Sort" icon>
      <l-sort-icon slot="icon"></l-sort-icon>
      <span>Sort</span>
    </l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[5]||(a[5]=t("h3",{id:"选项卡模式",tabindex:"-1"},[e("选项卡模式 "),t("a",{class:"header-anchor",href:"#选项卡模式","aria-label":'Permalink to "选项卡模式"'},"​")],-1)),a[6]||(a[6]=t("p",null,[e("基础的、简洁的选项卡，设置 "),t("code",null,"type"),e(" 为 "),t("code",null,"bar"),e("。")],-1)),d(r,null,{default:n(()=>[...a[1]||(a[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="2">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[7]||(a[7]=t("h3",{id:"卡片式",tabindex:"-1"},[e("卡片式 "),t("a",{class:"header-anchor",href:"#卡片式","aria-label":'Permalink to "卡片式"'},"​")],-1)),a[8]||(a[8]=t("p",null,[e("具有卡片风格的标签。只需要设置 "),t("code",null,"type"),e(" 属性为 "),t("code",null,"card"),e(" 就可以使选项卡改变为标签风格。 同时可以通过 "),t("code",null,"gap"),e(" 调整选项卡之间的间距。")],-1)),d(r,null,{default:n(()=>[...a[2]||(a[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="card" name="1">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[9]||(a[9]=t("h3",{id:"排列方式",tabindex:"-1"},[e("排列方式 "),t("a",{class:"header-anchor",href:"#排列方式","aria-label":'Permalink to "排列方式"'},"​")],-1)),a[10]||(a[10]=t("p",null,[e("主轴的排列方式，只对 "),t("code",null,"bar"),e(" 类型生效。只需要将 "),t("code",null,"justify-content"),e(" 的属性设置为 "),t("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E5%80%BC",target:"_blank",rel:"noreferrer"},"justify-content"),e(" 可用值即可。")],-1)),d(r,null,{default:n(()=>[...a[3]||(a[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" justify-content="center">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[11]||(a[11]=b('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="tabbar-attibutes" tabindex="-1">Tabbar Attibutes <a class="header-anchor" href="#tabbar-attibutes" aria-label="Permalink to &quot;Tabbar Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>选中的选项卡</td><td><code>string</code></td><td>-</td></tr><tr><td><code>type</code></td><td>风格</td><td><code>nav</code>、<code>bar</code>、<code>card</code></td><td><code>nav</code></td></tr><tr><td><code>gap</code></td><td>选项卡之间的间距</td><td><code>number</code>、<code>string</code></td><td><code>0</code></td></tr><tr><td><code>justify-content</code></td><td>主轴排列方式</td><td><code>string</code></td><td><code>flex-start</code></td></tr></tbody></table><h3 id="tabbar-slots" tabindex="-1">Tabbar Slots <a class="header-anchor" href="#tabbar-slots" aria-label="Permalink to &quot;Tabbar Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>只能为 <code>l-tabbar-item</code> 标签</td></tr></tbody></table><h3 id="tabbar-events" tabindex="-1">Tabbar Events <a class="header-anchor" href="#tabbar-events" aria-label="Permalink to &quot;Tabbar Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选项卡切换时触发, <code>e.detail.name</code> 获取选中值</td><td><code>(e: Event)</code></td></tr></tbody></table><h3 id="tabbaritem" tabindex="-1">TabbarItem <a class="header-anchor" href="#tabbaritem" aria-label="Permalink to &quot;TabbarItem&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>选项卡项的名称， <em>必填</em></td><td><code>string</code></td><td>-</td></tr><tr><td><code>icon</code></td><td>是否渲染图标</td><td><code>off</code></td><td>-</td></tr><tr><td><code>only-icon</code></td><td>是否仅渲染图标</td><td><code>off</code></td><td>-</td></tr></tbody></table><h3 id="tabbar-css-variables" tabindex="-1">Tabbar CSS Variables <a class="header-anchor" href="#tabbar-css-variables" aria-label="Permalink to &quot;Tabbar CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-tabbar-hover-color</code></td><td>选项卡的鼠标悬浮时的颜色</td><td><code>var(--l-primary-color-light1)</code></td></tr><tr><td><code>--l-tabbar-active-color</code></td><td>选项卡的选中时的颜色</td><td><code>var(--l-primary-color)</code></td></tr><tr><td><code>--l-tabbar-item-gap</code></td><td>选项卡之间的间距</td><td><code>0</code></td></tr><tr><td><code>--l-tabbar-height</code></td><td>选项卡的高度</td><td><code>38px</code>[<code>nav</code>时默认为: <code>50px</code>]</td></tr><tr><td><code>--l-tabbar-line-color</code></td><td>下划线的颜色</td><td><code>var(--l-primary-color)</code></td></tr><tr><td><code>--l-tabbar-card-border-color</code></td><td>卡片选项卡的边框颜色</td><td><code>#f5f7fa</code></td></tr><tr><td><code>--l-tabbar-card-border-radius</code></td><td>卡片选项卡的边框圆角</td><td><code>5px</code></td></tr></tbody></table>',11))])}const x=l(c,[["render",h]]);export{g as __pageData,x as default};
