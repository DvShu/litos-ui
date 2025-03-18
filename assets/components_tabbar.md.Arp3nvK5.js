import{_ as o,C as i,c as s,o as b,ag as l,G as n,j as t,w as r,a as e}from"./chunks/framework.BCyZWppQ.js";const y=JSON.parse('{"title":"Tabbar 标签栏","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabbar.md","filePath":"components/tabbar.md","lastUpdated":1736310296000}'),c={name:"components/tabbar.md"};function h(m,a,p,u,v,f){const d=i("ClientOnly");return b(),s("div",null,[a[5]||(a[5]=l(`<h1 id="tabbar-标签栏" tabindex="-1">Tabbar 标签栏 <a class="header-anchor" href="#tabbar-标签栏" aria-label="Permalink to &quot;Tabbar 标签栏&quot;">​</a></h1><p>使用场景如下:</p><ol><li>底部导航栏，用于在不同页面之间进行切换</li><li>标签切换</li><li>选项卡</li></ol><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Tabbar, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Tabbar);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="导航栏模式" tabindex="-1">导航栏模式 <a class="header-anchor" href="#导航栏模式" aria-label="Permalink to &quot;导航栏模式&quot;">​</a></h3><p>将 <code>type</code> 设置为 <code>nav</code>[默认]; 通过 <code>l-name</code> 标记选项卡项，<code>l-icon</code> 标记为图标</p>`,8)),n(d,null,{default:r(()=>a[0]||(a[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar style="border: 1px solid #dedede" name="Search">
    <div l-name="Reduction">
      <l-reduction-icon l-icon></l-reduction-icon>
      <span>Reduction</span>
    </div>
    <div l-name="RefreshLieft">
      <l-refresh-left-icon l-icon></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </div>
    <div l-name="Search">
      <l-search-icon l-icon></l-search-icon>
      <span>Search</span>
    </div>
    <div l-name="RefreshRight">
      <l-refresh-right-icon l-icon></l-refresh-right-icon>
      <span>RefreshRight</span>
    </div>
    <div l-name="Sort">
      <l-sort-icon l-icon></l-sort-icon>
      <span>Sort</span>
    </div>
  </l-tabbar>
`)],-1)])),_:1}),a[6]||(a[6]=t("h3",{id:"选项卡模式",tabindex:"-1"},[e("选项卡模式 "),t("a",{class:"header-anchor",href:"#选项卡模式","aria-label":'Permalink to "选项卡模式"'},"​")],-1)),a[7]||(a[7]=t("p",null,[e("基础的、简洁的选项卡，设置 "),t("code",null,"type"),e(" 为 "),t("code",null,"bar"),e("。")],-1)),n(d,null,{default:r(()=>a[1]||(a[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="2">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
`)],-1)])),_:1}),a[8]||(a[8]=t("h3",{id:"卡片式",tabindex:"-1"},[e("卡片式 "),t("a",{class:"header-anchor",href:"#卡片式","aria-label":'Permalink to "卡片式"'},"​")],-1)),a[9]||(a[9]=t("p",null,[e("具有卡片风格的标签。只需要设置 "),t("code",null,"type"),e(" 属性为 "),t("code",null,"card"),e(" 就可以使选项卡改变为标签风格。 同时可以通过 "),t("code",null,"gap"),e(" 调整选项卡之间的间距。")],-1)),n(d,null,{default:r(()=>a[2]||(a[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="card" name="1">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
`)],-1)])),_:1}),a[10]||(a[10]=t("h3",{id:"排列方式",tabindex:"-1"},[e("排列方式 "),t("a",{class:"header-anchor",href:"#排列方式","aria-label":'Permalink to "排列方式"'},"​")],-1)),a[11]||(a[11]=t("p",null,[e("主轴的排列方式，只对 "),t("code",null,"bar"),e(" 类型生效。只需要将 "),t("code",null,"justify-content"),e(" 的属性设置为 "),t("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E5%80%BC",target:"_blank",rel:"noreferrer"},"justify-content"),e(" 可用值即可。")],-1)),n(d,null,{default:r(()=>a[3]||(a[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" justify-content="center">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
`)],-1)])),_:1}),a[12]||(a[12]=t("h3",{id:"自定义内容",tabindex:"-1"},[e("自定义内容 "),t("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),a[13]||(a[13]=t("p",null,[e("通过设置 "),t("code",null,"custom-content"),e(" 属性可以自定义选项卡的内容。这样的话，选项卡每一项的样式完全可控。给每一项添加 "),t("code",null,"l-name"),e(" 属性。")],-1)),n(d,null,{default:r(()=>a[4]||(a[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" custom-content class="custom-tabbar">
    <div l-name="1" class="custom-tabbar-item">选项1</div>
    <div l-name="2" class="custom-tabbar-item">选项2</div>
    <div l-name="3" class="custom-tabbar-item">选项3</div>
  </l-tabbar>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" custom-content class="custom-tabbar">
    <div l-name="1" class="custom-tabbar-item">选项1</div>
    <div l-name="2" class="custom-tabbar-item">选项2</div>
    <div l-name="3" class="custom-tabbar-item">选项3</div>
  </l-tabbar>
`),t("textarea",{lang:"css"},`  .custom-tabbar {
    --l-tabbar-line-color: #4998f4;
    --l-tabbar-height: auto;
  }
  .custom-tabbar-item {
    padding: 10px 0;
  }
  .custom-tabbar-item.active {
    color: #4998f4;
  }
`)])],-1)])),_:1}),a[14]||(a[14]=l('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="tabbar-attibutes" tabindex="-1">Tabbar Attibutes <a class="header-anchor" href="#tabbar-attibutes" aria-label="Permalink to &quot;Tabbar Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>选中的选项卡</td><td><code>string</code></td><td>-</td></tr><tr><td><code>type</code></td><td>风格</td><td><code>nav</code>、<code>bar</code>、<code>card</code></td><td><code>nav</code></td></tr><tr><td><code>gap</code></td><td>选项卡之间的间距</td><td><code>number</code>、<code>string</code></td><td><code>0</code></td></tr><tr><td><code>justify-content</code></td><td>主轴排列方式</td><td><code>string</code></td><td><code>flex-start</code></td></tr></tbody></table><h3 id="tabbar-slots" tabindex="-1">Tabbar Slots <a class="header-anchor" href="#tabbar-slots" aria-label="Permalink to &quot;Tabbar Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容, 通过 <code>l-name</code> 标记选项卡项, <code>l-icon</code> 标记为图标</td></tr></tbody></table><h3 id="tabbar-events" tabindex="-1">Tabbar Events <a class="header-anchor" href="#tabbar-events" aria-label="Permalink to &quot;Tabbar Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选项卡切换时触发, <code>e.detail.name</code> 获取选中值</td><td><code>(e: Event)</code></td></tr></tbody></table><h3 id="tabbar-methods" tabindex="-1">Tabbar Methods <a class="header-anchor" href="#tabbar-methods" aria-label="Permalink to &quot;Tabbar Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>setItems</code></td><td>设置选项卡栏的项目列表, 通过 <code>js</code> 渲染选项卡, 注意: <em>调用该函数会清空之前的渲染, 然后重新渲染</em></td><td><code>(items: TabbarItem[]): void</code></td></tr><tr><td><code>addItems</code></td><td>向标签栏添加项目</td><td><code>(items: TabbarItem[]): void</code></td></tr></tbody></table><h3 id="tabbaritem" tabindex="-1">TabbarItem <a class="header-anchor" href="#tabbaritem" aria-label="Permalink to &quot;TabbarItem&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>选项卡项的名称， <em>必填</em></td><td><code>string</code></td><td>-</td></tr><tr><td><code>icon</code></td><td>选项卡项的图标</td><td><code>string</code>、<code>() =&gt; string | HTMLElement</code></td><td>-</td></tr><tr><td><code>text</code></td><td>选项卡内容</td><td><code>string</code>、<code>() =&gt; string | HTMLElement</code></td><td>-</td></tr></tbody></table><h3 id="tabbar-css-variables" tabindex="-1">Tabbar CSS Variables <a class="header-anchor" href="#tabbar-css-variables" aria-label="Permalink to &quot;Tabbar CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-tabbar-hover-color</code></td><td>选项卡的鼠标悬浮时的颜色</td><td><code>var(--l-primary-color-light1)</code></td></tr><tr><td><code>--l-tabbar-active-color</code></td><td>选项卡的选中时的颜色</td><td><code>var(--l-primary-color)</code></td></tr><tr><td><code>--l-tabbar-item-gap</code></td><td>选项卡之间的间距</td><td><code>0</code></td></tr><tr><td><code>--l-tabbar-height</code></td><td>选项卡的高度</td><td><code>38px</code>[<code>nav</code>时默认为: <code>50px</code>]</td></tr><tr><td><code>--l-tabbar-line-color</code></td><td>下划线的颜色</td><td><code>var(--l-primary-color)</code></td></tr><tr><td><code>--l-tabbar-card-border-color</code></td><td>卡片选项卡的边框颜色</td><td><code>#f5f7fa</code></td></tr><tr><td><code>--l-tabbar-card-border-radius</code></td><td>卡片选项卡的边框圆角</td><td><code>5px</code></td></tr></tbody></table>',13))])}const k=o(c,[["render",h]]);export{y as __pageData,k as default};
