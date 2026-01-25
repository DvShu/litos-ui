import{_ as i,C as d,o as r,c as p,ag as n,E as o,w as s,j as a,a as e}from"./chunks/framework.-4c4jpF6.js";const v=JSON.parse('{"title":"Polygon 多边形","description":"","frontmatter":{},"headers":[],"relativePath":"components/polygon.md","filePath":"components/polygon.md","lastUpdated":1733932899000}'),h={name:"components/polygon.md"};function c(g,t,y,b,u,m){const l=d("ClientOnly");return r(),p("div",null,[t[2]||(t[2]=n(`<h1 id="polygon-多边形" tabindex="-1">Polygon 多边形 <a class="header-anchor" href="#polygon-多边形" aria-label="Permalink to &quot;Polygon 多边形&quot;">​</a></h1><p>显示一些多边形，例如：三角形、菱形、六边形、梯形等；全部采用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path" target="_blank" rel="noreferrer">clip-path</a> 实现</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { l-polygon, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(l</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">polygon);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>默认提供了多种三角形，只需要配置 <code>shape</code> 属性即可。</p>`,7)),o(l,null,{default:s(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},` <div class="grid grid-cols-4">
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
`)],-1)])]),_:1}),t[3]||(t[3]=a("h3",{id:"自定义形状",tabindex:"-1"},[e("自定义形状 "),a("a",{class:"header-anchor",href:"#自定义形状","aria-label":'Permalink to "自定义形状"'},"​")],-1)),t[4]||(t[4]=a("p",null,[e("通过 "),a("code",null,"part::(default)"),e(" 设置自定义的 "),a("code",null,"clip-path"),e("。例如自定义菱形")],-1)),o(l,null,{default:s(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("textarea",{lang:"css"},`  .polygon-rhombus::part(default) {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
`)])],-1)])]),_:1}),t[5]||(t[5]=n('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="l-polygon-attibutes" tabindex="-1">l-polygon Attibutes <a class="header-anchor" href="#l-polygon-attibutes" aria-label="Permalink to &quot;l-polygon Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>shape</code></td><td>传递指定的默认的形状</td><td><code>string</code></td><td><code>triangle-top</code></td></tr><tr><td><code>background</code></td><td>背景颜色</td><td><code>string</code></td><td>-</td></tr></tbody></table><h3 id="l-polygon-css-variables" tabindex="-1">l-polygon CSS Variables <a class="header-anchor" href="#l-polygon-css-variables" aria-label="Permalink to &quot;l-polygon CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-polygen-size</code></td><td>多边形大小</td><td><code>10px</code></td></tr><tr><td><code>--l-polygen-width</code></td><td>多边形宽度</td><td><code>var(--l-polygen-size)</code></td></tr><tr><td><code>--l-polygen-height</code></td><td>多边形高度</td><td><code>var(--l-polygen-size)</code></td></tr><tr><td><code>--l-polygen-background</code></td><td>多边形背景色</td><td><code>#666</code></td></tr></tbody></table>',5))])}const f=i(h,[["render",c]]);export{v as __pageData,f as default};
