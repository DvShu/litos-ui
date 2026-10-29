import{_ as s,C as r,o as d,c,a2 as l,E as n,w as i,j as e,a as o}from"./chunks/framework.nU6eqUhJ.js";const v=JSON.parse('{"title":"Container","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/container.md","filePath":"en/components/container.md","lastUpdated":1793253144000}'),h={name:"en/components/container.md"};function m(u,a,p,b,y,f){const t=r("ClientOnly");return d(),c("div",null,[a[6]||(a[6]=l('<h1 id="container" tabindex="-1">Container <a class="header-anchor" href="#container" aria-label="Permalink to &quot;Container&quot;">​</a></h1><p>These container styles use flexbox to build common admin dashboard layouts and quickly establish a page structure:</p><ul><li><code>l-container</code>: Outer container, typically a <code>section</code>. Arranges children horizontally by default; add <code>l-layout-vertical</code> for a vertical layout. Containers can be nested.</li><li><code>l-header</code>: Header container, typically a <code>header</code>.</li><li><code>l-aside</code>: Sidebar container, typically an <code>aside</code>.</li><li><code>l-main</code>: Main content container, typically a <code>main</code>.</li><li><code>l-footer</code>: Footer container, typically a <code>footer</code>.</li></ul><p>These layouts are commonly used for admin dashboard home pages.</p><h2 id="imports" tabindex="-1">Imports <a class="header-anchor" href="#imports" aria-label="Permalink to &quot;Imports&quot;">​</a></h2><p>These styles are not packaged as a custom element. Import the stylesheet manually when needed.</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/container.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="common-layouts" tabindex="-1">Common Layouts <a class="header-anchor" href="#common-layouts" aria-label="Permalink to &quot;Common Layouts&quot;">​</a></h2><h3 id="header-and-main-content" tabindex="-1">Header and Main Content <a class="header-anchor" href="#header-and-main-content" aria-label="Permalink to &quot;Header and Main Content&quot;">​</a></h3>',9)),n(t,null,{default:i(()=>[...a[0]||(a[0]=[e("l-code-preview",{class:"mt-15"},[e("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
  </section>
`)],-1)])]),_:1}),a[7]||(a[7]=e("h3",{id:"sidebar-and-main-content",tabindex:"-1"},[o("Sidebar and Main Content "),e("a",{class:"header-anchor",href:"#sidebar-and-main-content","aria-label":'Permalink to "Sidebar and Main Content"'},"​")],-1)),n(t,null,{default:i(()=>[...a[1]||(a[1]=[e("l-code-preview",{class:"mt-15"},[e("textarea",{lang:"html"},`  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <main class="l-main">Main</main>
  </section>
`)],-1)])]),_:1}),a[8]||(a[8]=e("h3",{id:"vertical-layout-with-a-nested-horizontal-container",tabindex:"-1"},[o("Vertical Layout with a Nested Horizontal Container "),e("a",{class:"header-anchor",href:"#vertical-layout-with-a-nested-horizontal-container","aria-label":'Permalink to "Vertical Layout with a Nested Horizontal Container"'},"​")],-1)),n(t,null,{default:i(()=>[...a[2]||(a[2]=[e("l-code-preview",{class:"mt-15"},[e("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
`)],-1)])]),_:1}),a[9]||(a[9]=e("h3",{id:"horizontal-layout-with-a-nested-vertical-container",tabindex:"-1"},[o("Horizontal Layout with a Nested Vertical Container "),e("a",{class:"header-anchor",href:"#horizontal-layout-with-a-nested-vertical-container","aria-label":'Permalink to "Horizontal Layout with a Nested Vertical Container"'},"​")],-1)),n(t,null,{default:i(()=>[...a[3]||(a[3]=[e("l-code-preview",{class:"mt-15"},[e("textarea",{lang:"html"},`  <section class="l-container">
    <aside class="l-aside">Aside</aside>
    <section class="l-container l-layout-vertical">
      <header class="l-header">Header</header>
      <main class="l-main">Main</main>
    </section>
  </section>
`)],-1)])]),_:1}),a[10]||(a[10]=e("h3",{id:"header-main-content-and-footer",tabindex:"-1"},[o("Header, Main Content, and Footer "),e("a",{class:"header-anchor",href:"#header-main-content-and-footer","aria-label":'Permalink to "Header, Main Content, and Footer"'},"​")],-1)),n(t,null,{default:i(()=>[...a[4]||(a[4]=[e("l-code-preview",{class:"mt-15"},[e("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">Header</header>
    <main class="l-main">Main</main>
    <footer class="l-footer">Footer</footer>
  </section>
`)],-1)])]),_:1}),a[11]||(a[11]=e("h3",{id:"classic-admin-dashboard",tabindex:"-1"},[o("Classic Admin Dashboard "),e("a",{class:"header-anchor",href:"#classic-admin-dashboard","aria-label":'Permalink to "Classic Admin Dashboard"'},"​")],-1)),a[12]||(a[12]=e("p",null,"Place a logo on the left and the signed-in user on the right of the header. Add a menu to the sidebar and page content to the main area to create a classic admin dashboard layout.",-1)),n(t,null,{default:i(()=>[...a[5]||(a[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <section class="l-container l-layout-vertical">
    <header class="l-header">
      <a href="#">LitosUI</a>
      <div>Signed-in user</div>
    </header>
    <section class="l-container">
      <aside class="l-aside">Aside</aside>
      <main class="l-main">Main</main>
    </section>
  </section>
`)],-1)])]),_:1}),a[13]||(a[13]=l('<h2 id="theming" tabindex="-1">Theming <a class="header-anchor" href="#theming" aria-label="Permalink to &quot;Theming&quot;">​</a></h2><h3 id="css-variables" tabindex="-1">CSS Variables <a class="header-anchor" href="#css-variables" aria-label="Permalink to &quot;CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-header-height</code></td><td>Header height</td><td><code>50px</code></td></tr><tr><td><code>--l-aside-width</code></td><td>Sidebar width</td><td><code>240px</code></td></tr><tr><td><code>--l-footer-height</code></td><td>Footer height</td><td><code>var(--l-header-height, 50px)</code></td></tr></tbody></table>',3))])}const C=s(h,[["render",m]]);export{v as __pageData,C as default};
