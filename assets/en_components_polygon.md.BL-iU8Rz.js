import{_ as i,C as r,o as d,c as p,a2 as s,E as l,w as o,j as a,a as t}from"./chunks/framework.nU6eqUhJ.js";const v=JSON.parse('{"title":"Polygon","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/polygon.md","filePath":"en/components/polygon.md","lastUpdated":1793253144000}'),h={name:"en/components/polygon.md"};function c(g,e,u,y,m,b){const n=r("ClientOnly");return d(),p("div",null,[e[2]||(e[2]=s(`<h1 id="polygon" tabindex="-1">Polygon <a class="header-anchor" href="#polygon" aria-label="Permalink to &quot;Polygon&quot;">​</a></h1><p>Display polygons such as triangles, rhombuses, hexagons, and trapezoids using <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path" target="_blank" rel="noreferrer">clip-path</a>.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Polygon, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Polygon);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Several triangle shapes are provided by default. Select one with the <code>shape</code> attribute.</p>`,7)),l(n,null,{default:o(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},` <div class="grid grid-cols-4">
  <div class="center flex-col">
    <l-polygon shape="triangle-top"></l-polygon>
    <span>triangle-top</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom"></l-polygon>
    <span>triangle-bottom</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-left"></l-polygon>
    <span>triangle-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-right"></l-polygon>
    <span>triangle-right</span>
  </div>
</div>
<div class="grid grid-cols-4 mt-15">
  <div class="center flex-col">
    <l-polygon shape="triangle-top-right"></l-polygon>
    <span>triangle-top-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-top-left"></l-polygon>
    <span>triangle-top-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-right"></l-polygon>
    <span>triangle-bottom-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-left"></l-polygon>
    <span>triangle-bottom-left</span>
  </div>
</div>
`)],-1)])]),_:1}),e[3]||(e[3]=a("h3",{id:"custom-shapes",tabindex:"-1"},[t("Custom Shapes "),a("a",{class:"header-anchor",href:"#custom-shapes","aria-label":'Permalink to "Custom Shapes"'},"​")],-1)),e[4]||(e[4]=a("p",null,[t("Set a custom "),a("code",null,"clip-path"),t(" through "),a("code",null,"::part(default)"),t(". For example, create a rhombus:")],-1)),l(n,null,{default:o(()=>[...e[1]||(e[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("textarea",{lang:"css"},`  .polygon-rhombus::part(default) {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
`)])],-1)])]),_:1}),e[5]||(e[5]=s(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/polygon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="polygon-attributes" tabindex="-1">Polygon Attributes <a class="header-anchor" href="#polygon-attributes" aria-label="Permalink to &quot;Polygon Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>shape</code></td><td>Selects a built-in shape</td><td><code>string</code></td><td><code>triangle-top</code></td></tr><tr><td><code>background</code></td><td>Background color</td><td><code>string</code></td><td>-</td></tr></tbody></table><h3 id="polygon-css-variables" tabindex="-1">Polygon CSS Variables <a class="header-anchor" href="#polygon-css-variables" aria-label="Permalink to &quot;Polygon CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-polygen-size</code></td><td>Polygon size</td><td><code>10px</code></td></tr><tr><td><code>--l-polygen-width</code></td><td>Polygon width</td><td><code>var(--l-polygen-size)</code></td></tr><tr><td><code>--l-polygen-height</code></td><td>Polygon height</td><td><code>var(--l-polygen-size)</code></td></tr><tr><td><code>--l-polygen-background</code></td><td>Polygon background color</td><td><code>#666</code></td></tr></tbody></table>`,8))])}const f=i(h,[["render",c]]);export{v as __pageData,f as default};
