import{_ as l,C as d,o,c as b,a2 as s,E as i,w as r,j as t,a as e}from"./chunks/framework.nU6eqUhJ.js";const f=JSON.parse('{"title":"Tabbar","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/tabbar.md","filePath":"en/components/tabbar.md","lastUpdated":1793253144000}'),c={name:"en/components/tabbar.md"};function p(h,a,m,u,k,y){const n=d("ClientOnly");return o(),b("div",null,[a[4]||(a[4]=s(`<h1 id="tabbar" tabindex="-1">Tabbar <a class="header-anchor" href="#tabbar" aria-label="Permalink to &quot;Tabbar&quot;">​</a></h1><p>Common use cases include:</p><ol><li>Bottom navigation for switching between pages</li><li>Switching between labeled sections</li><li>Tabs</li></ol><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
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
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([TabbarItem, Tabbar]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register the additional components used in this page’s demos.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([ReductionIcon, RefreshLeftIcon, RefreshRightIcon, SearchIcon, SortIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="navigation-mode" tabindex="-1">Navigation Mode <a class="header-anchor" href="#navigation-mode" aria-label="Permalink to &quot;Navigation Mode&quot;">​</a></h3><p>Set <code>type</code> to <code>nav</code> (the default). Identify each item with <code>name</code>, enable its icon with <code>icon</code>, and place the icon in <code>slot=&quot;icon&quot;</code>.</p>`,8)),i(n,null,{default:r(()=>[...a[0]||(a[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar style="border: 1px solid #dedede" name="Search">
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
`)],-1)])]),_:1}),a[5]||(a[5]=t("h3",{id:"tab-mode",tabindex:"-1"},[e("Tab Mode "),t("a",{class:"header-anchor",href:"#tab-mode","aria-label":'Permalink to "Tab Mode"'},"​")],-1)),a[6]||(a[6]=t("p",null,[e("Set "),t("code",null,"type"),e(" to "),t("code",null,"bar"),e(" for simple tabs.")],-1)),i(n,null,{default:r(()=>[...a[1]||(a[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="2">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[7]||(a[7]=t("h3",{id:"card-style",tabindex:"-1"},[e("Card Style "),t("a",{class:"header-anchor",href:"#card-style","aria-label":'Permalink to "Card Style"'},"​")],-1)),a[8]||(a[8]=t("p",null,[e("Set "),t("code",null,"type"),e(" to "),t("code",null,"card"),e(" for card-style tabs. Use "),t("code",null,"gap"),e(" to adjust the space between items.")],-1)),i(n,null,{default:r(()=>[...a[2]||(a[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="card" name="1">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[9]||(a[9]=t("h3",{id:"alignment",tabindex:"-1"},[e("Alignment "),t("a",{class:"header-anchor",href:"#alignment","aria-label":'Permalink to "Alignment"'},"​")],-1)),a[10]||(a[10]=t("p",null,[e("Main-axis alignment applies only to "),t("code",null,"bar"),e(" mode. Set the "),t("code",null,"justify-content"),e(" attribute to a valid CSS "),t("a",{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#values",target:"_blank",rel:"noreferrer"},"justify-content"),e(" value.")],-1)),i(n,null,{default:r(()=>[...a[3]||(a[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" justify-content="center">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <l-tabbar-item name="1">Option 1</l-tabbar-item>
    <l-tabbar-item name="2">Option 2</l-tabbar-item>
    <l-tabbar-item name="3">Option 3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),a[11]||(a[11]=s(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/tabbar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="tabbar-attributes" tabindex="-1">Tabbar Attributes <a class="header-anchor" href="#tabbar-attributes" aria-label="Permalink to &quot;Tabbar Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>name</code></td><td>Selected tab</td><td><code>string</code></td><td>-</td></tr><tr><td><code>type</code></td><td>Tab style</td><td><code>nav</code>, <code>bar</code>, <code>card</code></td><td><code>nav</code></td></tr><tr><td><code>gap</code></td><td>Space between items</td><td><code>number</code>, <code>string</code></td><td><code>0</code></td></tr><tr><td><code>justify-content</code></td><td>Main-axis alignment</td><td><code>string</code></td><td><code>flex-start</code></td></tr></tbody></table><h3 id="tabbar-slots" tabindex="-1">Tabbar Slots <a class="header-anchor" href="#tabbar-slots" aria-label="Permalink to &quot;Tabbar Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Accepts only l-tabbar-item elements</td></tr></tbody></table><h3 id="tabbar-events" tabindex="-1">Tabbar Events <a class="header-anchor" href="#tabbar-events" aria-label="Permalink to &quot;Tabbar Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback</th></tr></thead><tbody><tr><td><code>change</code></td><td>Fires when the selected tab changes; read the selected value from e.detail.name</td><td><code>(e: CustomEvent&lt;{ name: string }&gt;)</code></td></tr></tbody></table><h3 id="tabbaritem-attributes" tabindex="-1">TabbarItem Attributes <a class="header-anchor" href="#tabbaritem-attributes" aria-label="Permalink to &quot;TabbarItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>name</code></td><td>Item name; <em>required</em></td><td><code>string</code></td><td>-</td></tr><tr><td><code>icon</code></td><td>Whether to render an icon</td><td><code>boolean</code></td><td>-</td></tr><tr><td><code>only-icon</code></td><td>Whether to render only the icon</td><td><code>boolean</code></td><td>-</td></tr></tbody></table><h3 id="tabbar-css-variables" tabindex="-1">Tabbar CSS Variables <a class="header-anchor" href="#tabbar-css-variables" aria-label="Permalink to &quot;Tabbar CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-tabbar-hover-color</code></td><td>Item color on hover</td><td><code>var(--l-primary-color-light1, #9254de)</code></td></tr><tr><td><code>--l-tabbar-active-color</code></td><td>Selected item color</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>--l-tabbar-item-gap</code></td><td>Space between items</td><td><code>0</code></td></tr><tr><td><code>--l-tabbar-height</code></td><td>Tabbar height</td><td><code>38px</code> (<code>50px</code> in nav mode)</td></tr><tr><td><code>--l-tabbar-line-color</code></td><td>Indicator line color</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>--l-tabbar-card-border-color</code></td><td>Card tab border color</td><td><code>#f5f7fa</code></td></tr><tr><td><code>--l-tabbar-card-border-radius</code></td><td>Card tab border radius</td><td><code>5px</code></td></tr></tbody></table>`,14))])}const E=l(c,[["render",p]]);export{f as __pageData,E as default};
