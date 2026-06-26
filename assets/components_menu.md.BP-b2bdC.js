import{$ as l,c as d}from"./chunks/dom.BraL7hJS.js";import{v as h,P as u,C as m,o as b,c as p,a2 as r,E as c,w as s,j as t,a}from"./chunks/framework.DEyxsvWG.js";const x=JSON.parse('{"title":"Menu 菜单","description":"","frontmatter":{},"headers":[],"relativePath":"components/menu.md","filePath":"components/menu.md","lastUpdated":1781371650000}'),k={name:"components/menu.md"},_=Object.assign(k,{setup(y){const n=[{key:"N1",label:"导航一",icon:()=>d("iconify-icon",{icon:"tdesign:app"}),children:[{key:"A1",label:"选项1"},{key:"A2",label:"选项2"},{key:"A3",label:"选项3"}]},{key:"N2",label:"导航二",icon:()=>d("iconify-icon",{icon:"solar:bug-outline"}),children:[{key:"B1",label:"选项1"},{key:"B2",label:"选项2"},{key:"B3",label:"选项3"}]},{key:"N3",label:"导航三",icon:()=>d("iconify-icon",{icon:"stash:light-bulb"}),children:[{key:"C1",label:"选项1"},{key:"C2",label:"选项2"}]},{key:"N4",label:"选项四",icon:()=>d("iconify-icon",{icon:"solar:book-linear"})}];return h(()=>{u(()=>{{const o=l("#menu");o.items=n;const e=l("#menu-accordion");e.items=n}})}),(o,e)=>{const i=m("ClientOnly");return b(),p("div",null,[e[2]||(e[2]=r(`<h1 id="menu-菜单" tabindex="-1">Menu 菜单 <a class="header-anchor" href="#menu-菜单" aria-label="Permalink to &quot;Menu 菜单&quot;">​</a></h1><p>为网站提供导航功能的垂直菜单组件，支持多级嵌套子菜单、手风琴模式和自定义图标。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Menu, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Menu);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>垂直菜单，可内嵌子菜单。</p>`,7)),c(i,null,{default:s(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-menu id="menu" selected-index="A1">
  </l-menu>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`    <l-menu id="menu" selected-index="A1">
    </l-menu>
  `),t("textarea",{lang:"ts"},`    const menuItems = [
      {
        key: "N1",
        label: "导航一",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "选项1" },
          { key: "A2", label: "选项2" },
          { key: "A3", label: "选项3" },
        ],
      },
      {
        key: "N2",
        label: "导航二",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "选项1" },
          { key: "B2", label: "选项2" },
          { key: "B3", label: "选项3" },
        ],
      },
      {
        key: "N3",
        label: "导航三",
        icon: () => {
          return $$('iconify-icon', { icon: 'stash:light-bulb' });
        },
        children: [
          { key: "C1", label: "选项1" },
          { key: "C2", label: "选项2" },
        ],
      },
      {
        key: "N4",
        label: "选项四",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),e[3]||(e[3]=t("h3",{id:"手风琴模式",tabindex:"-1"},[a("手风琴模式 "),t("a",{class:"header-anchor",href:"#手风琴模式","aria-label":'Permalink to "手风琴模式"'},"​")],-1)),e[4]||(e[4]=t("p",null,[a("设置 "),t("code",null,"accordion"),a(" 属性，同一时间只展开一个子菜单。")],-1)),c(i,null,{default:s(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-menu id="menu-accordion" accordion> 
  </l-menu>
`)],-1)])]),_:1}),e[5]||(e[5]=r('<h2 id="menuitem-数据结构" tabindex="-1">MenuItem 数据结构 <a class="header-anchor" href="#menuitem-数据结构" aria-label="Permalink to &quot;MenuItem 数据结构&quot;">​</a></h2><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td><code>key</code></td><td>菜单项唯一标识</td><td><code>string</code></td><td>是</td></tr><tr><td><code>label</code></td><td>菜单项标题</td><td><code>string | ((item: MenuItem) =&gt; HTMLElement)</code></td><td>是</td></tr><tr><td><code>icon</code></td><td>菜单项图标，返回 HTMLElement</td><td><code>(item: MenuItem) =&gt; HTMLElement</code></td><td>否</td></tr><tr><td><code>children</code></td><td>子菜单项</td><td><code>MenuItem[]</code></td><td>否</td></tr></tbody></table><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="menu-attributes" tabindex="-1">Menu Attributes <a class="header-anchor" href="#menu-attributes" aria-label="Permalink to &quot;Menu Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>selected-index</code></td><td>当前选中的菜单项 key</td><td><code>string</code></td><td>-</td></tr><tr><td><code>accordion</code></td><td>是否手风琴模式，只有一个子菜单展开</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="menu-properties" tabindex="-1">Menu Properties <a class="header-anchor" href="#menu-properties" aria-label="Permalink to &quot;Menu Properties&quot;">​</a></h3><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>items</code></td><td>菜单项数据，可通过 JS 动态设置</td><td><code>MenuItem[]</code></td></tr></tbody></table><h3 id="menu-events" tabindex="-1">Menu Events <a class="header-anchor" href="#menu-events" aria-label="Permalink to &quot;Menu Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>select</code></td><td>菜单项点击时触发</td><td><code>(event: CustomEvent&lt;{ key: string, keyPaths: string[] }&gt;)</code></td></tr></tbody></table><h3 id="menu-methods" tabindex="-1">Menu Methods <a class="header-anchor" href="#menu-methods" aria-label="Permalink to &quot;Menu Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td><code>expandSubmenus</code></td><td>展开指定 key 的子菜单</td><td><code>(keys: string[], collapseOther?: boolean): void</code></td></tr><tr><td><code>updateSelectedKeys</code></td><td>更新选中的菜单项</td><td><code>(key: string): void</code></td></tr></tbody></table><h3 id="menu-css-variables" tabindex="-1">Menu CSS Variables <a class="header-anchor" href="#menu-css-variables" aria-label="Permalink to &quot;Menu CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-menu-width</code></td><td>菜单宽度</td><td><code>240px</code></td></tr><tr><td><code>--l-menu-height</code></td><td>菜单高度</td><td><code>auto</code></td></tr><tr><td><code>--l-menu-item-height</code></td><td>菜单项高度</td><td><code>40px</code></td></tr><tr><td><code>--l-menu-item-padding-x</code></td><td>菜单项水平内边距</td><td><code>10px</code></td></tr><tr><td><code>--l-menu-item-indent</code></td><td>子菜单缩进距离</td><td><code>15px</code></td></tr><tr><td><code>--l-menu-item-radius</code></td><td>菜单项圆角</td><td><code>0</code></td></tr><tr><td><code>--l-menu-item-hover-background</code></td><td>菜单项悬浮背景色</td><td><code>#f9f0ff</code></td></tr><tr><td><code>--l-menu-item-active-color</code></td><td>菜单项选中文字颜色</td><td><code>#722ed1</code></td></tr><tr><td><code>--l-menu-item-active-background</code></td><td>菜单项选中背景色</td><td><code>#f9f0ff</code></td></tr><tr><td><code>--l-menu-border-color</code></td><td>菜单边框颜色</td><td><code>#dedede</code></td></tr><tr><td><code>--l-menu-border-width</code></td><td>菜单边框宽度</td><td><code>1px</code></td></tr><tr><td><code>--l-menu-arrow-color</code></td><td>子菜单箭头颜色</td><td><code>#8c8c8c</code></td></tr></tbody></table>',13))])}}});export{x as __pageData,_ as default};
