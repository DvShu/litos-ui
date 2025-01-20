import{_ as p,c as r,a2 as n,G as e,w as l,j as a,a as t,B as o,o as h}from"./chunks/framework.CmfdOiHF.js";const y=JSON.parse('{"title":"icon","description":"","frontmatter":{},"headers":[],"relativePath":"components/icon.md","filePath":"components/icon.md","lastUpdated":1736485611000}'),d={name:"components/icon.md"};function c(k,s,u,b,E,g){const i=o("ClientOnly");return h(),r("div",null,[s[4]||(s[4]=n(`<h1 id="icon" tabindex="-1">icon <a class="header-anchor" href="#icon" aria-label="Permalink to &quot;icon&quot;">​</a></h1><p>内置图标有限，推荐使用 <a href="https://iconify.design/docs/iconify-icon/" target="_blank" rel="noreferrer">iconify</a></p><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><h3 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ArrowDownIcon, regist, ... } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ArrowDownIcon);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-arrow-down-icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-arrow-down-icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="内置图标" tabindex="-1">内置图标 <a class="header-anchor" href="#内置图标" aria-label="Permalink to &quot;内置图标&quot;">​</a></h3><p>框架内置的图标如下：</p>`,9)),e(i,null,{default:l(()=>s[0]||(s[0]=[a("l-icon-list",null,null,-1)])),_:1}),s[5]||(s[5]=n('<h3 id="iconfont-图标" tabindex="-1"><code>iconfont</code> 图标 <a class="header-anchor" href="#iconfont-图标" aria-label="Permalink to &quot;`iconfont` 图标&quot;">​</a></h3><p>使用时需要单独引入 <code>iconfont</code> 图标文件。<code>name</code> 属性填入引入的 <code>iconfont</code> 文件里面对应的 <code>id</code>.</p>',2)),e(i,null,{default:l(()=>s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-font-icon name="icon-red-packet"></l-font-icon>
`)],-1)])),_:1}),s[6]||(s[6]=a("h3",{id:"自定义图标",tabindex:"-1"},[t("自定义图标 "),a("a",{class:"header-anchor",href:"#自定义图标","aria-label":'Permalink to "自定义图标"'},"​")],-1)),s[7]||(s[7]=a("p",null,[t("可以通过使用 "),a("code",null,"base-icon"),t(" 然后加入自定义的 "),a("code",null,"svg-path"),t(" 路径来构建自定义的图标")],-1)),e(i,null,{default:l(()=>s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-base-icon>
    <path
      d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
      fill="#231F20"
    ></path>
  </l-base-icon>
`)],-1)])),_:1}),s[8]||(s[8]=n(`<blockquote><p>当前也可以通过继承 <code>BaseIcon</code> 来自定义图标</p></blockquote><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { BaseIcon, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BaseIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.viewBox </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;0 0 1024 1024&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 默认</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  renderChildren</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&lt;path fill=&quot;currentColor&quot; d=&quot;M512 320 192 704h639.936z&quot;&gt;&lt;/path&gt;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(MyIcon, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;my-icon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &lt;my-icon&gt;&lt;/my-icon&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="颜色和尺寸" tabindex="-1">颜色和尺寸 <a class="header-anchor" href="#颜色和尺寸" aria-label="Permalink to &quot;颜色和尺寸&quot;">​</a></h3><p>修改颜色和尺寸可以通过 <code>color</code> 和 <code>font-size</code> 修改</p>`,4)),e(i,null,{default:l(()=>s[3]||(s[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-caret-bottom-icon style="color:red;font-size:32px;" />
`)],-1)])),_:1}),s[9]||(s[9]=n('<blockquote><p>这里是通过 <code>style</code> 属性来修改的，也可以通过 <code>class</code> 来修改</p></blockquote><h3 id="icon-attribute" tabindex="-1">Icon Attribute <a class="header-anchor" href="#icon-attribute" aria-label="Permalink to &quot;Icon Attribute&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>view-box</code></td><td>svg view box</td><td><code>string</code></td><td><code>0 0 1024 1024</code></td></tr></tbody></table>',3))])}const f=p(d,[["render",c]]);export{y as __pageData,f as default};
