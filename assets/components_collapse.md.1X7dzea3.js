import{_ as i,C as n,o as r,c as p,a2 as s,E as d,w as o,j as e,a as l}from"./chunks/framework.DBq8O7k4.js";const g=JSON.parse('{"title":"collapse 折叠面板","description":"","frontmatter":{},"headers":[],"relativePath":"components/collapse.md","filePath":"components/collapse.md","lastUpdated":1795187990000}'),c={name:"components/collapse.md"};function h(m,t,u,b,v,x){const a=n("ClientOnly");return r(),p("div",null,[t[10]||(t[10]=s(`<h1 id="collapse-折叠面板" tabindex="-1">collapse 折叠面板 <a class="header-anchor" href="#collapse-折叠面板" aria-label="Permalink to &quot;collapse 折叠面板&quot;">​</a></h1><p>折叠/展开的内容区域; 通常用于后台系统的首页边栏的控制面板上</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Collapse, CollapseItem, ArrowRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Collapse, CollapseItem, ArrowRightIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>可以同时展开多个面板。按 Tab 聚焦标题，再按 Enter 或空格切换。</p><p>收起时，面板内的焦点会返回标题。系统启用减少动态效果时，面板和箭头会直接切换。</p>`,8)),d(a,null,{default:o(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse>
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
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"手动展开",tabindex:"-1"},[l("手动展开 "),e("a",{class:"header-anchor",href:"#手动展开","aria-label":'Permalink to "手动展开"'},"​")],-1)),t[12]||(t[12]=e("p",null,[l("将 "),e("code",null,"collapse"),l(" 标签的 "),e("code",null,"prop"),l(" 设置为展开项, 多个项用 "),e("code",null,"&"),l(" 分隔")],-1)),d(a,null,{default:o(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse prop="1&3">
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
`)],-1)])]),_:1}),t[13]||(t[13]=s('<blockquote><p>也可以给 <code>collapse-item</code> 标签添加 <code>expand</code> 属性用于展开某一项</p></blockquote><h3 id="手风琴模式" tabindex="-1">手风琴模式 <a class="header-anchor" href="#手风琴模式" aria-label="Permalink to &quot;手风琴模式&quot;">​</a></h3><p>通过设置 <code>accordion</code> 为 <code>true</code> 即可实现手风琴模式，每次只能展开一个面板</p>',3)),d(a,null,{default:o(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse accordion>
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
`)],-1)])]),_:1}),t[14]||(t[14]=e("h3",{id:"箭头位置",tabindex:"-1"},[l("箭头位置 "),e("a",{class:"header-anchor",href:"#箭头位置","aria-label":'Permalink to "箭头位置"'},"​")],-1)),t[15]||(t[15]=e("p",null,[l("使用 "),e("code",null,"arrow-placement"),l(" 来设定箭头的位置；可选值为 "),e("code",null,"left"),l("[默认]、"),e("code",null,"right")],-1)),d(a,null,{default:o(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
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
`)],-1)])]),_:1}),t[16]||(t[16]=e("h3",{id:"标题栏对齐方式",tabindex:"-1"},[l("标题栏对齐方式 "),e("a",{class:"header-anchor",href:"#标题栏对齐方式","aria-label":'Permalink to "标题栏对齐方式"'},"​")],-1)),t[17]||(t[17]=e("p",null,[l("用 "),e("code",null,"header-justify"),l(" 设置标题栏对齐。"),e("code",null,"flex-start"),l(" 与 "),e("code",null,"flex-end"),l(" 分别对齐到行首与行尾，"),e("code",null,"space-between"),l(" 将箭头和标题分别放在两端。")],-1)),d(a,null,{default:o(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
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
`)],-1)])]),_:1}),t[18]||(t[18]=e("h3",{id:"背景边框",tabindex:"-1"},[l("背景边框 "),e("a",{class:"header-anchor",href:"#背景边框","aria-label":'Permalink to "背景边框"'},"​")],-1)),t[19]||(t[19]=e("p",null,[l("通过设置 "),e("code",null,"background"),l(" 就能实现带背景边框样式")],-1)),d(a,null,{default:o(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
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
`)],-1)])]),_:1}),t[20]||(t[20]=e("h3",{id:"项间距",tabindex:"-1"},[l("项间距 "),e("a",{class:"header-anchor",href:"#项间距","aria-label":'Permalink to "项间距"'},"​")],-1)),t[21]||(t[21]=e("p",null,[l("通过 "),e("code",null,"gap"),l(" 设置项间距")],-1)),d(a,null,{default:o(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
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
`)],-1)])]),_:1}),t[22]||(t[22]=e("h3",{id:"圆角",tabindex:"-1"},[l("圆角 "),e("a",{class:"header-anchor",href:"#圆角","aria-label":'Permalink to "圆角"'},"​")],-1)),t[23]||(t[23]=e("p",null,[l("通过 "),e("code",null,"border-radius"),l(" 设置边框圆角")],-1)),d(a,null,{default:o(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
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
`)],-1)])]),_:1}),t[24]||(t[24]=e("h3",{id:"网格模式",tabindex:"-1"},[l("网格模式 "),e("a",{class:"header-anchor",href:"#网格模式","aria-label":'Permalink to "网格模式"'},"​")],-1)),t[25]||(t[25]=e("p",null,[l("通过传递 "),e("code",null,"grid"),l(" 属性让折叠面板变为网格模式")],-1)),d(a,null,{default:o(()=>[...t[8]||(t[8]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse
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
`)],-1)])]),_:1}),t[26]||(t[26]=e("h3",{id:"包装层与独立面板",tabindex:"-1"},[l("包装层与独立面板 "),e("a",{class:"header-anchor",href:"#包装层与独立面板","aria-label":'Permalink to "包装层与独立面板"'},"​")],-1)),t[27]||(t[27]=e("p",null,[e("code",null,"l-collapse-item"),l(" 可以直接放在 "),e("code",null,"l-collapse"),l(" 下、由普通元素包裹，或独立使用。在 "),e("code",null,"grid"),l(" 模式下，每个直接子元素占一格，包装层中的多个面板共用一格。")],-1)),d(a,null,{default:o(()=>[...t[9]||(t[9]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse grid gap="8" prop="delivery">
    <div>
      <l-collapse-item prop="delivery" header-text="配送方式">
        <div>支持快递配送。</div>
      </l-collapse-item>
      <l-collapse-item prop="pickup" header-text="门店自提">
        <div>订单备好后可到店领取。</div>
      </l-collapse-item>
    </div>
    <l-collapse-item prop="returns" header-text="退换货">
      <div>请在订单详情中申请退换货。</div>
    </l-collapse-item>
  </l-collapse>
  <l-collapse-item header-text="营业时间">
    <div>周一至周日 09:00–18:00。</div>
  </l-collapse-item>
`)],-1)])]),_:1}),t[28]||(t[28]=s(`<h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/collapse&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>仅使用独立面板时，可单独加载 <code>litos-ui/collapse-item</code>。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/collapse-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见<a href="/litos-ui/on_demand">按需导入</a>。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="collapse-attributes" tabindex="-1">Collapse Attributes <a class="header-anchor" href="#collapse-attributes" aria-label="Permalink to &quot;Collapse Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>prop</code></td><td>展开的面板，以 <code>&amp;</code> 分隔。手风琴模式下取第一个名称</td><td><code>string</code></td><td>-</td></tr><tr><td><code>grid</code></td><td>网格模式</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>gap</code></td><td>面板间距</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>border-radius</code></td><td>圆角</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>background</code></td><td>背景边框</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>arrow-placement</code></td><td>箭头位置</td><td><code>string</code></td><td><code>left</code></td></tr><tr><td><code>header-justify</code></td><td>标题栏对齐方式，可选 <code>flex-start</code>、<code>flex-end</code>、<code>space-between</code></td><td><code>string</code></td><td><code>flex-start</code></td></tr><tr><td><code>accordion</code></td><td>手风琴模式</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapseitem-attributes" tabindex="-1">CollapseItem Attributes <a class="header-anchor" href="#collapseitem-attributes" aria-label="Permalink to &quot;CollapseItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>prop</code></td><td>面板名称</td><td><code>string</code></td><td>-</td></tr><tr><td><code>header-text</code></td><td>标题栏文本。为空或移除时显示同名插槽</td><td><code>string</code></td><td>-</td></tr><tr><td><code>heading-level</code></td><td>标题在文档大纲中的级别，取值为 <code>1</code>～<code>6</code></td><td><code>string</code></td><td><code>3</code></td></tr><tr><td><code>toggle-label</code></td><td>切换按钮的可访问名称。默认使用标题文本；标题只有图标或操作按钮时，建议显式指定</td><td><code>string</code></td><td>标题文本或 <code>Toggle panel</code></td></tr><tr><td><code>expand</code></td><td>是否展开</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapseitem-slots" tabindex="-1">CollapseItem Slots <a class="header-anchor" href="#collapseitem-slots" aria-label="Permalink to &quot;CollapseItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>默认插槽</td><td>面板内容</td></tr><tr><td><code>header-text</code></td><td>自定义标题。插槽内的链接和按钮可独立聚焦、操作</td></tr></tbody></table><h3 id="collapseitem-css-parts" tabindex="-1">CollapseItem CSS Parts <a class="header-anchor" href="#collapseitem-css-parts" aria-label="Permalink to &quot;CollapseItem CSS Parts&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>header</code></td><td>标题栏容器</td></tr><tr><td><code>header-text</code></td><td>通过 <code>header-text</code> 属性渲染的标题文本</td></tr></tbody></table><h3 id="collapse-events" tabindex="-1">Collapse Events <a class="header-anchor" href="#collapse-events" aria-label="Permalink to &quot;Collapse Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>通过标题切换面板后触发，<code>event.detail</code> 为 <code>{ expands: string[], value: string }</code></td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="collapseitem-events" tabindex="-1">CollapseItem Events <a class="header-anchor" href="#collapseitem-events" aria-label="Permalink to &quot;CollapseItem Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>expand-change</code></td><td>通过标题切换当前面板后触发，<code>event.detail</code> 为 <code>{ prop: string, expand: boolean }</code></td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><p>初始化、修改 <code>prop</code> 或 <code>expand</code> 属性，以及手风琴模式下联动收起其他面板时，均静默同步状态。</p><h3 id="collapseitem-手动注入" tabindex="-1">CollapseItem 手动注入 <a class="header-anchor" href="#collapseitem-手动注入" aria-label="Permalink to &quot;CollapseItem 手动注入&quot;">​</a></h3><p>挂载前可通过 <code>contextInject(context, expands)</code> 注入两个可调用的值，Item 会在挂载时应用初值。外部数据变化后，调用 <code>_updateLayout()</code> 刷新布局，或调用 <code>_handleExpandsChange()</code> 刷新展开状态。</p><h3 id="collapse-css-variables" tabindex="-1">Collapse CSS Variables <a class="header-anchor" href="#collapse-css-variables" aria-label="Permalink to &quot;Collapse CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-collapse-gap</code></td><td>在 <code>l-collapse</code> 上覆盖面板间距</td><td><code>gap</code> 属性或 <code>0px</code></td></tr><tr><td><code>--l-collapse-border-radius</code></td><td>在 <code>l-collapse</code> 上覆盖面板圆角</td><td><code>border-radius</code> 属性或 <code>0px</code></td></tr><tr><td><code>--l-collapse-border-color</code></td><td>在 <code>l-collapse</code> 上覆盖面板边框颜色</td><td><code>--l-border-color</code> 或 <code>#dedede</code></td></tr></tbody></table>`,23))])}const f=i(c,[["render",h]]);export{g as __pageData,f as default};
