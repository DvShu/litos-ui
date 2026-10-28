import{_ as l,C as d,o as b,c as o,a2 as i,E as s,w as r,j as a,a as e}from"./chunks/framework.nU6eqUhJ.js";const g=JSON.parse('{"title":"Tabbar 标签栏","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabbar.md","filePath":"components/tabbar.md","lastUpdated":1793115401000}'),c={name:"components/tabbar.md"};function h(p,t,m,u,k,E){const n=d("ClientOnly");return b(),o("div",null,[t[4]||(t[4]=i(`<h1 id="tabbar-标签栏" tabindex="-1">Tabbar 标签栏 <a class="header-anchor" href="#tabbar-标签栏" aria-label="Permalink to &quot;Tabbar 标签栏&quot;">​</a></h1><p>使用场景如下:</p><ol><li>底部导航栏，用于在不同页面之间进行切换</li><li>标签切换</li><li>选项卡</li></ol><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Tabbar,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  TabbarItem,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  regist,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ReductionIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RefreshLeftIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RefreshRightIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SearchIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SortIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Tabbar, TabbarItem]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 注册本页演示使用的附加组件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([ReductionIcon, RefreshLeftIcon, RefreshRightIcon, SearchIcon, SortIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="导航栏模式" tabindex="-1">导航栏模式 <a class="header-anchor" href="#导航栏模式" aria-label="Permalink to &quot;导航栏模式&quot;">​</a></h3><p>将 <code>type</code> 设置为 <code>nav</code>[默认]; 通过 <code>name</code> 标记选项卡项，<code>icon</code> 标记渲染图标; 然后通过 <code>slot=&quot;icon&quot;</code> 来渲染图标</p>`,8)),s(n,null,{default:r(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar style="border: 1px solid #dedede" name="Search">
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
`)],-1)])]),_:1}),t[5]||(t[5]=a("h3",{id:"选项卡模式",tabindex:"-1"},[e("选项卡模式 "),a("a",{class:"header-anchor",href:"#选项卡模式","aria-label":'Permalink to "选项卡模式"'},"​")],-1)),t[6]||(t[6]=a("p",null,[e("基础的、简洁的选项卡，设置 "),a("code",null,"type"),e(" 为 "),a("code",null,"bar"),e("。")],-1)),s(n,null,{default:r(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar type="bar" name="2">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),t[7]||(t[7]=a("h3",{id:"卡片式",tabindex:"-1"},[e("卡片式 "),a("a",{class:"header-anchor",href:"#卡片式","aria-label":'Permalink to "卡片式"'},"​")],-1)),t[8]||(t[8]=a("p",null,[e("具有卡片风格的标签。只需要设置 "),a("code",null,"type"),e(" 属性为 "),a("code",null,"card"),e(" 就可以使选项卡改变为标签风格。 同时可以通过 "),a("code",null,"gap"),e(" 调整选项卡之间的间距。")],-1)),s(n,null,{default:r(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar type="card" name="1">
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
`)],-1)])]),_:1}),t[9]||(t[9]=a("h3",{id:"排列方式",tabindex:"-1"},[e("排列方式 "),a("a",{class:"header-anchor",href:"#排列方式","aria-label":'Permalink to "排列方式"'},"​")],-1)),t[10]||(t[10]=a("p",null,[e("主轴的排列方式，只对 "),a("code",null,"bar"),e(" 类型生效。只需要将 "),a("code",null,"justify-content"),e(" 的属性设置为 "),a("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E5%80%BC",target:"_blank",rel:"noreferrer"},"justify-content"),e(" 可用值即可。")],-1)),s(n,null,{default:r(()=>[...t[3]||(t[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" justify-content="center">
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
`)],-1)])]),_:1}),t[11]||(t[11]=i(`<h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/tabbar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见<a href="/litos-ui/on_demand">按需导入</a>。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="tabbar-attributes" tabindex="-1">Tabbar Attributes <a class="header-anchor" href="#tabbar-attributes" aria-label="Permalink to &quot;Tabbar Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>选中的选项卡</td><td><code>string</code></td><td>-</td></tr><tr><td><code>type</code></td><td>风格</td><td><code>nav</code>、<code>bar</code>、<code>card</code></td><td><code>nav</code></td></tr><tr><td><code>gap</code></td><td>选项卡之间的间距</td><td><code>number</code>、<code>string</code></td><td><code>0</code></td></tr><tr><td><code>justify-content</code></td><td>主轴排列方式</td><td><code>string</code></td><td><code>flex-start</code></td></tr></tbody></table><h3 id="tabbar-slots" tabindex="-1">Tabbar Slots <a class="header-anchor" href="#tabbar-slots" aria-label="Permalink to &quot;Tabbar Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>只能为 <code>l-tabbar-item</code> 标签</td></tr></tbody></table><h3 id="tabbar-events" tabindex="-1">Tabbar Events <a class="header-anchor" href="#tabbar-events" aria-label="Permalink to &quot;Tabbar Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选项卡切换时触发, <code>e.detail.name</code> 获取选中值</td><td><code>(e: CustomEvent&lt;{ name: string }&gt;)</code></td></tr></tbody></table><h3 id="tabbaritem" tabindex="-1">TabbarItem <a class="header-anchor" href="#tabbaritem" aria-label="Permalink to &quot;TabbarItem&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>选项卡项的名称， <em>必填</em></td><td><code>string</code></td><td>-</td></tr><tr><td><code>icon</code></td><td>是否渲染图标</td><td><code>off</code></td><td>-</td></tr><tr><td><code>only-icon</code></td><td>是否仅渲染图标</td><td><code>off</code></td><td>-</td></tr></tbody></table><h3 id="tabbar-css-variables" tabindex="-1">Tabbar CSS Variables <a class="header-anchor" href="#tabbar-css-variables" aria-label="Permalink to &quot;Tabbar CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-tabbar-hover-color</code></td><td>选项卡的鼠标悬浮时的颜色</td><td><code>var(--l-primary-color-light1, #9254de)</code></td></tr><tr><td><code>--l-tabbar-active-color</code></td><td>选项卡的选中时的颜色</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>--l-tabbar-item-gap</code></td><td>选项卡之间的间距</td><td><code>0</code></td></tr><tr><td><code>--l-tabbar-height</code></td><td>选项卡的高度</td><td><code>38px</code>[<code>nav</code>时默认为: <code>50px</code>]</td></tr><tr><td><code>--l-tabbar-line-color</code></td><td>下划线的颜色</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>--l-tabbar-card-border-color</code></td><td>卡片选项卡的边框颜色</td><td><code>#f5f7fa</code></td></tr><tr><td><code>--l-tabbar-card-border-radius</code></td><td>卡片选项卡的边框圆角</td><td><code>5px</code></td></tr></tbody></table>`,14))])}const f=l(c,[["render",h]]);export{g as __pageData,f as default};
