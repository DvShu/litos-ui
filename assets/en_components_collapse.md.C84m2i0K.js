import{_ as i,C as s,o as r,c as p,a2 as n,E as d,w as o,j as t,a as l}from"./chunks/framework.nU6eqUhJ.js";const g=JSON.parse('{"title":"collapse 折叠面板","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/collapse.md","filePath":"en/components/collapse.md","lastUpdated":1793115401000}'),c={name:"en/components/collapse.md"};function h(m,e,u,b,v,x){const a=s("ClientOnly");return r(),p("div",null,[e[9]||(e[9]=n(`<h1 id="collapse-折叠面板" tabindex="-1">collapse 折叠面板 <a class="header-anchor" href="#collapse-折叠面板" aria-label="Permalink to &quot;collapse 折叠面板&quot;">​</a></h1><p>折叠/展开的内容区域; 通常用于后台系统的首页边栏的控制面板上</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Collapse, CollapseItem, ArrowRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Collapse, CollapseItem, ArrowRightIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>可以同时展开多个面板，面板之间不影响</p>`,7)),d(a,null,{default:o(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse>
    <l-collapse-item prop="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[10]||(e[10]=t("h3",{id:"手动展开",tabindex:"-1"},[l("手动展开 "),t("a",{class:"header-anchor",href:"#手动展开","aria-label":'Permalink to "手动展开"'},"​")],-1)),e[11]||(e[11]=t("p",null,[l("将 "),t("code",null,"collapse"),l(" 标签的 "),t("code",null,"prop"),l(" 设置为展开项, 多个项用 "),t("code",null,"&"),l(" 分隔")],-1)),d(a,null,{default:o(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse prop="1&3">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[12]||(e[12]=n('<blockquote><p>也可以给 <code>collapse-item</code> 标签添加 <code>expand</code> 属性用于展开某一项</p></blockquote><h3 id="手风琴模式" tabindex="-1">手风琴模式 <a class="header-anchor" href="#手风琴模式" aria-label="Permalink to &quot;手风琴模式&quot;">​</a></h3><p>通过设置 <code>accordion</code> 为 <code>true</code> 即可实现手风琴模式，每次只能展开一个面板</p>',3)),d(a,null,{default:o(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse accordion>
    <l-collapse-item prop="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[13]||(e[13]=t("h3",{id:"箭头位置",tabindex:"-1"},[l("箭头位置 "),t("a",{class:"header-anchor",href:"#箭头位置","aria-label":'Permalink to "箭头位置"'},"​")],-1)),e[14]||(e[14]=t("p",null,[l("使用 "),t("code",null,"arrow-placement"),l(" 来设定箭头的位置；可选值为 "),t("code",null,"left"),l("[默认]、"),t("code",null,"right")],-1)),d(a,null,{default:o(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[15]||(e[15]=t("h3",{id:"标题栏对齐方式",tabindex:"-1"},[l("标题栏对齐方式 "),t("a",{class:"header-anchor",href:"#标题栏对齐方式","aria-label":'Permalink to "标题栏对齐方式"'},"​")],-1)),e[16]||(e[16]=t("p",null,[l("通过 "),t("code",null,"header-justify"),l(" 来设置对齐方式，例如设置为 "),t("code",null,"space-between"),l(" 表明两端对齐，这个时候，配合 "),t("code",null,"arrow-placement: right"),l(" 就能实现，箭头和文本两端对齐的效果")],-1)),d(a,null,{default:o(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[17]||(e[17]=t("h3",{id:"背景边框",tabindex:"-1"},[l("背景边框 "),t("a",{class:"header-anchor",href:"#背景边框","aria-label":'Permalink to "背景边框"'},"​")],-1)),e[18]||(e[18]=t("p",null,[l("通过设置 "),t("code",null,"background"),l(" 就能实现带背景边框样式")],-1)),d(a,null,{default:o(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[19]||(e[19]=t("h3",{id:"项间距",tabindex:"-1"},[l("项间距 "),t("a",{class:"header-anchor",href:"#项间距","aria-label":'Permalink to "项间距"'},"​")],-1)),e[20]||(e[20]=t("p",null,[l("通过 "),t("code",null,"gap"),l(" 设置项间距")],-1)),d(a,null,{default:o(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[21]||(e[21]=t("h3",{id:"圆角",tabindex:"-1"},[l("圆角 "),t("a",{class:"header-anchor",href:"#圆角","aria-label":'Permalink to "圆角"'},"​")],-1)),e[22]||(e[22]=t("p",null,[l("通过 "),t("code",null,"border-radius"),l(" 设置边框圆角")],-1)),d(a,null,{default:o(()=>[...e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[23]||(e[23]=t("h3",{id:"网格模式",tabindex:"-1"},[l("网格模式 "),t("a",{class:"header-anchor",href:"#网格模式","aria-label":'Permalink to "网格模式"'},"​")],-1)),e[24]||(e[24]=t("p",null,[l("通过传递 "),t("code",null,"grid"),l(" 属性让折叠面板变为网格模式")],-1)),d(a,null,{default:o(()=>[...e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-collapse
    arrow-placement="right"
    header-justify="space-between"
    background
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[25]||(e[25]=n(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/collapse&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="collapse-attributes" tabindex="-1">Collapse Attributes <a class="header-anchor" href="#collapse-attributes" aria-label="Permalink to &quot;Collapse Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>prop</code></td><td>展开的面板,展开多选时以 <code>&amp;</code> 分隔</td><td><code>string</code></td><td>-</td></tr><tr><td><code>grid</code></td><td>网格模式</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>gap</code></td><td>面板间距</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>border-radius</code></td><td>圆角</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>background</code></td><td>背景边框</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>arrow-placement</code></td><td>箭头位置</td><td><code>string</code></td><td><code>left</code></td></tr><tr><td><code>header-justify</code></td><td>标题栏对齐方式, <code>flex-start</code>、<code>flex-end</code>、<code>space-between</code></td><td><code>string</code></td><td><code>flex-start</code></td></tr><tr><td><code>accordion</code></td><td>手风琴模式</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapseitem-attributes" tabindex="-1">CollapseItem Attributes <a class="header-anchor" href="#collapseitem-attributes" aria-label="Permalink to &quot;CollapseItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>prop</code></td><td>面板名称</td><td><code>string</code></td><td>-</td></tr><tr><td><code>header-text</code></td><td>标题栏文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>expand</code></td><td>是否展开</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapse-events" tabindex="-1">Collapse Events <a class="header-anchor" href="#collapse-events" aria-label="Permalink to &quot;Collapse Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>面板变化时触发, <code>detail: { expandedNames: string[] }</code></td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="collapse-css-variables" tabindex="-1">Collapse CSS Variables <a class="header-anchor" href="#collapse-css-variables" aria-label="Permalink to &quot;Collapse CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>`,12))])}const f=i(c,[["render",h]]);export{g as __pageData,f as default};
