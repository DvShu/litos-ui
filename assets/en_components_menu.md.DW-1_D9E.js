import{$ as r,b as m,o as b,a as k,c as l}from"./chunks/browser.CpyXlELn.js";import{v as y,P as g,x as f,C as x,o as v,c as E,a2 as p,E as c,w as u,j as e,a as d}from"./chunks/framework.nU6eqUhJ.js";const w=JSON.parse('{"title":"Menu","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/menu.md","filePath":"en/components/menu.md","lastUpdated":1793253144000}'),M={name:"en/components/menu.md"},O=Object.assign(M,{setup(A){const s=[{key:"N1",label:"Navigation 1",icon:()=>l("iconify-icon",{icon:"tdesign:app"}),children:[{key:"A1",label:"Option 1"},{key:"A2",label:"Option 2"},{key:"A3",label:"Option 3"}]},{key:"N2",label:"Navigation 2",icon:()=>l("iconify-icon",{icon:"solar:bug-outline"}),children:[{key:"B1",label:"Option 1"},{key:"B2",label:"Option 2"},{key:"B3",label:"Option 3"}]},{key:"N3",label:"Navigation 3",icon:()=>l("iconify-icon",{icon:"stash:light-bulb"}),children:[{key:"C1",label:"Option 1"},{key:"C2",label:"Option 2"}]},{key:"N4",label:"Option 4",icon:()=>l("iconify-icon",{icon:"solar:book-linear"})}];let i,o;function h(n){if(n.target.getAttribute("role")==="collapsed"){const a=n.target.getAttribute("data-action");o&&(a==="collapse"?o.setAttribute("collapsed",""):o.removeAttribute("collapsed"))}}return y(()=>{g(()=>{{const n=r("#menu");n.items=s;const t=r("#menu-accordion");t.items=s,o=r("#menu-collapsed"),o&&(o.items=s),i=m("l-button[role]"),i&&i.forEach(a=>{b(a,"click",h)})}})}),f(()=>{i&&i.forEach(n=>{k(n,"click",h)})}),(n,t)=>{const a=x("ClientOnly");return v(),E("div",null,[t[3]||(t[3]=p(`<h1 id="menu" tabindex="-1">Menu <a class="header-anchor" href="#menu" aria-label="Permalink to &quot;Menu&quot;">​</a></h1><p>A vertical navigation menu with nested submenus, accordion mode, collapsed mode, and custom icons.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Menu, regist, Button, ArrowRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([ArrowRightIcon, Menu]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register the additional components used in this page’s demos.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Button]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>The custom icon examples use iconify-icon. Install and import that package separately to use them; Menu itself does not require this icon library.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>A vertical menu that supports nested submenus.</p>`,8)),c(a,null,{default:u(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-menu id="menu" selected-index="A1">
  </l-menu>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`    <l-menu id="menu" selected-index="A1">
    </l-menu>
  `),e("textarea",{lang:"ts"},`    const menuItems = [
      {
        key: "N1",
        label: "Navigation 1",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "Option 1" },
          { key: "A2", label: "Option 2" },
          { key: "A3", label: "Option 3" },
        ],
      },
      {
        key: "N2",
        label: "Navigation 2",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "Option 1" },
          { key: "B2", label: "Option 2" },
          { key: "B3", label: "Option 3" },
        ],
      },
      {
        key: "N3",
        label: "Navigation 3",
        icon: () => {
          return $$('iconify-icon', { icon: 'stash:light-bulb' });
        },
        children: [
          { key: "C1", label: "Option 1" },
          { key: "C2", label: "Option 2" },
        ],
      },
      {
        key: "N4",
        label: "Option 4",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),t[4]||(t[4]=e("h3",{id:"accordion-mode",tabindex:"-1"},[d("Accordion Mode "),e("a",{class:"header-anchor",href:"#accordion-mode","aria-label":'Permalink to "Accordion Mode"'},"​")],-1)),t[5]||(t[5]=e("p",null,[d("Set the "),e("code",null,"accordion"),d(" attribute to keep only one submenu expanded at a time.")],-1)),c(a,null,{default:u(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-menu id="menu-accordion" accordion>
  </l-menu>
`)],-1)])]),_:1}),t[6]||(t[6]=e("h3",{id:"collapsed-mode",tabindex:"-1"},[d("Collapsed Mode "),e("a",{class:"header-anchor",href:"#collapsed-mode","aria-label":'Permalink to "Collapsed Mode"'},"​")],-1)),t[7]||(t[7]=e("p",null,[d("Set "),e("code",null,"collapsed"),d(" to display a narrow, icon-only menu and collapse all expanded submenus. Use "),e("code",null,"collapsed-width"),d(" to set the collapsed width and "),e("code",null,"collapsed-icon-size"),d(" to set the icon size in this mode.")],-1)),c(a,null,{default:u(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div>
    <l-button role="collapsed" data-action="expand">Expand</l-button>
    <l-button role="collapsed" data-action="collapse">Collapse</l-button>
  </div>
  <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
  </l-menu>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`    <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
    </l-menu>
  `),e("textarea",{lang:"ts"},`    const menuItems = [
      {
        key: "N1",
        label: "Navigation 1",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "Option 1" },
          { key: "A2", label: "Option 2" },
          { key: "A3", label: "Option 3" },
        ],
      },
      {
        key: "N2",
        label: "Navigation 2",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "Option 1" },
          { key: "B2", label: "Option 2" },
          { key: "B3", label: "Option 3" },
        ],
      },
      {
        key: "N4",
        label: "Option 4",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu-collapsed');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),t[8]||(t[8]=p(`<h2 id="menuitem-data-structure" tabindex="-1">MenuItem Data Structure <a class="header-anchor" href="#menuitem-data-structure" aria-label="Permalink to &quot;MenuItem Data Structure&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Property</th><th>Description</th><th>Type</th><th>Required</th></tr></thead><tbody><tr><td><code>key</code></td><td>Unique item identifier</td><td><code>string</code></td><td>Yes</td></tr><tr><td><code>label</code></td><td>Item label</td><td><code>string | ((item: MenuItem) =&gt; HTMLElement)</code></td><td>Yes</td></tr><tr><td><code>icon</code></td><td>Item icon renderer; returns an HTMLElement</td><td><code>(item: MenuItem) =&gt; HTMLElement</code></td><td>No</td></tr><tr><td><code>children</code></td><td>Submenu items</td><td><code>MenuItem[]</code></td><td>No</td></tr></tbody></table><h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/menu&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="menu-attributes" tabindex="-1">Menu Attributes <a class="header-anchor" href="#menu-attributes" aria-label="Permalink to &quot;Menu Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>selected-index</code></td><td>Key of the selected menu item</td><td><code>string</code></td><td>-</td></tr><tr><td><code>accordion</code></td><td>Whether only one submenu can be expanded</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>collapsed</code></td><td>Whether to show only icons, hide text, and collapse all submenus</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>collapsed-width</code></td><td>Menu width when collapsed</td><td><code>number</code></td><td><code>-</code></td></tr><tr><td><code>icon-size</code></td><td>Icon size</td><td><code>number</code></td><td><code>-</code></td></tr><tr><td><code>collapsed-icon-size</code></td><td>Icon size when collapsed</td><td><code>number</code></td><td><code>-</code></td></tr></tbody></table><h3 id="menu-properties" tabindex="-1">Menu Properties <a class="header-anchor" href="#menu-properties" aria-label="Permalink to &quot;Menu Properties&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Property</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>items</code></td><td>Menu item data; can be updated dynamically through JavaScript</td><td><code>MenuItem[]</code></td></tr></tbody></table><h3 id="menu-events" tabindex="-1">Menu Events <a class="header-anchor" href="#menu-events" aria-label="Permalink to &quot;Menu Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback</th></tr></thead><tbody><tr><td><code>select</code></td><td>Fires when a menu item is clicked</td><td><code>(event: CustomEvent&lt;{ key: string, keyPaths: string[] }&gt;)</code></td></tr></tbody></table><h3 id="menu-methods" tabindex="-1">Menu Methods <a class="header-anchor" href="#menu-methods" aria-label="Permalink to &quot;Menu Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Parameters</th></tr></thead><tbody><tr><td><code>expandSubmenus</code></td><td>Expands the submenus with the specified keys</td><td><code>(keys: string[], collapseOther?: boolean): void</code></td></tr><tr><td><code>updateSelectedKeys</code></td><td>Updates the selected menu item</td><td><code>(key: string): void</code></td></tr></tbody></table><h3 id="menu-css-variables" tabindex="-1">Menu CSS Variables <a class="header-anchor" href="#menu-css-variables" aria-label="Permalink to &quot;Menu CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-menu-width</code></td><td>Menu width</td><td><code>240px</code></td></tr><tr><td><code>--l-menu-height</code></td><td>Menu height</td><td><code>auto</code></td></tr><tr><td><code>--l-menu-item-height</code></td><td>Item height</td><td><code>40px</code></td></tr><tr><td><code>--l-menu-item-padding-x</code></td><td>Item horizontal padding</td><td><code>10px</code></td></tr><tr><td><code>--l-menu-item-indent</code></td><td>Submenu indentation</td><td><code>15px</code></td></tr><tr><td><code>--l-menu-item-radius</code></td><td>Item border radius</td><td><code>0</code></td></tr><tr><td><code>--l-menu-item-hover-background</code></td><td>Item background on hover</td><td><code>var(--l-primary-color-light5, #f9f0ff)</code></td></tr><tr><td><code>--l-menu-item-active-color</code></td><td>Selected item text color</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>--l-menu-item-active-background</code></td><td>Selected item background</td><td><code>var(--l-primary-color-light5, #f9f0ff)</code></td></tr><tr><td><code>--l-menu-border-color</code></td><td>Menu border color</td><td><code>transparent</code></td></tr><tr><td><code>--l-menu-border-width</code></td><td>Menu border width</td><td><code>0px</code></td></tr><tr><td><code>--l-menu-arrow-color</code></td><td>Submenu arrow color</td><td><code>var(--l-text-color, #8c8c8c)</code></td></tr><tr><td><code>--l-menu-collapsed-width</code></td><td>Menu width when collapsed</td><td><code>40px</code></td></tr><tr><td><code>--l-menu-icon-size</code></td><td>Icon size</td><td><code>1.8rem</code></td></tr><tr><td><code>--l-menu-collapsed-icon-size</code></td><td>Icon size when collapsed</td><td><code>1.8rem</code></td></tr></tbody></table>`,16))])}}});export{w as __pageData,O as default};
