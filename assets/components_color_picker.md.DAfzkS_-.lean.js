import{_ as r,c as i,a2 as t,G as s,w as d,B as l,o as n,j as a}from"./chunks/framework.CmfdOiHF.js";const g=JSON.parse('{"title":"ColorPicker 颜色选择器","description":"","frontmatter":{},"headers":[],"relativePath":"components/color_picker.md","filePath":"components/color_picker.md","lastUpdated":1734065457000}'),c={name:"components/color_picker.md"};function h(p,e,k,u,b,m){const o=l("ClientOnly");return n(),i("div",null,[e[1]||(e[1]=t(`<h1 id="colorpicker-颜色选择器" tabindex="-1">ColorPicker 颜色选择器 <a class="header-anchor" href="#colorpicker-颜色选择器" aria-label="Permalink to &quot;ColorPicker 颜色选择器&quot;">​</a></h1><p>通常用于进行颜色选择。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ColorPicker, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ColorPicker);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>通过 <code>value</code> 设置初始颜色。</p>`,7)),s(o,null,{default:d(()=>e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-color-picker value="#722ed1"></l-color-picker>
`)],-1)])),_:1}),e[2]||(e[2]=t('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="colorpicker-attibutes" tabindex="-1">ColorPicker Attibutes <a class="header-anchor" href="#colorpicker-attibutes" aria-label="Permalink to &quot;ColorPicker Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>原生 <code>name</code> 属性</td><td><code>string</code></td><td>-</td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>value</code></td><td>颜色值</td><td><code>string</code></td><td><code>#000000</code></td></tr></tbody></table><h3 id="colorpicker-events" tabindex="-1">ColorPicker Events <a class="header-anchor" href="#colorpicker-events" aria-label="Permalink to &quot;ColorPicker Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>颜色改变触发, 通过 <code>event.target.value</code> 获取值</td><td><code>(event: Event)</code></td></tr></tbody></table>',5))])}const P=r(c,[["render",h]]);export{g as __pageData,P as default};
