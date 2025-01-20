import{_ as a,c as p,a2 as r,G as n,w as d,j as o,a as e,B as i,o as s}from"./chunks/framework.Dxibp1RX.js";const k=JSON.parse('{"title":"Popover 弹出气泡","description":"","frontmatter":{},"headers":[],"relativePath":"components/popover.md","filePath":"components/popover.md","lastUpdated":1737345140000}'),c={name:"components/popover.md"};function u(b,t,h,v,g,m){const l=i("ClientOnly");return s(),p("div",null,[t[6]||(t[6]=r(`<h1 id="popover-弹出气泡" tabindex="-1">Popover 弹出气泡 <a class="header-anchor" href="#popover-弹出气泡" aria-label="Permalink to &quot;Popover 弹出气泡&quot;">​</a></h1><p>点击/鼠标移入元素，弹出气泡式的卡片浮层。在内容周围弹出一些隐藏的信息。和 <code>Tooltip</code> 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Popover, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Popover);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>最简单的用法，通过 <code>content</code> 传递浮层内容。<code>inline</code> 属性表明 <code>l-popover</code> 标签是行级元素。</p>`,7)),n(l,null,{default:d(()=>t[0]||(t[0]=[o("l-code-preview",null,[o("textarea",{lang:"html"},`  <l-popover content="悬浮提示" inline>
    <a slot="trigger">提示</a>
  </l-popover>
`)],-1)])),_:1}),t[7]||(t[7]=r('<h3 id="触发方式" tabindex="-1">触发方式 <a class="header-anchor" href="#触发方式" aria-label="Permalink to &quot;触发方式&quot;">​</a></h3><p>四种触发方式：鼠标移入[<code>hover</code>]、点击[<code>click</code>]、焦点[<code>focus</code>]；通过 <code>trigger</code> 属性设置触发方式。默认为：<code>hover</code>；</p>',2)),n(l,null,{default:d(()=>t[1]||(t[1]=[o("l-code-preview",null,[o("textarea",{lang:"html"},`  <l-popover content="悬浮提示" inline>
    <l-button slot="trigger">悬浮提示</l-button>
  </l-popover>
  <l-popover content="点击提示" inline trigger="click">
    <l-button slot="trigger">点击提示</l-button>
  </l-popover>
  <l-popover content="焦点提示" inline trigger="focus">
    <l-button slot="trigger">焦点提示</l-button>
  </l-popover>
`)],-1)])),_:1}),t[8]||(t[8]=o("h3",{id:"位置",tabindex:"-1"},[e("位置 "),o("a",{class:"header-anchor",href:"#位置","aria-label":'Permalink to "位置"'},"​")],-1)),t[9]||(t[9]=o("p",null,[e("有 "),o("code",null,"12"),e(" 个弹出位置。通过 "),o("code",null,"placement"),e(" 属性设置弹出位置。")],-1)),n(l,null,{default:d(()=>t[2]||(t[2]=[o("l-code-preview",null,[o("textarea",{lang:"html"},`  <div class="popover-p-row">
    <l-popover content="提示内容" placement="top-start">
      <l-button slot="trigger">top-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="top">
      <l-button slot="trigger">top</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="top-end">
      <l-button slot="trigger">top-end</l-button>
    </l-popover>
  </div>
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="left-start">
      <l-button slot="trigger">left-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="left">
      <l-button slot="trigger">left</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="left-end">
      <l-button slot="trigger">left-end</l-button>
    </l-popover>
  </div>
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="right-start">
      <l-button slot="trigger">right-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="right">
      <l-button slot="trigger">right</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="right-end">
      <l-button slot="trigger">right-end</l-button>
    </l-popover>
  </div>
  <div class="popover-p-row">
    <l-popover content="提示内容" placement="bottom-start">
      <l-button slot="trigger">bottom-start</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="bottom">
      <l-button slot="trigger">bottom</l-button>
    </l-popover>
    <l-popover content="提示内容" placement="bottom-end">
      <l-button slot="trigger">bottom-end</l-button>
    </l-popover>
  </div>
`)],-1)])),_:1}),t[10]||(t[10]=o("h3",{id:"不显示箭头",tabindex:"-1"},[e("不显示箭头 "),o("a",{class:"header-anchor",href:"#不显示箭头","aria-label":'Permalink to "不显示箭头"'},"​")],-1)),t[11]||(t[11]=o("p",null,[e("通过传递 "),o("code",null,"show-arrow"),e(" 为 "),o("code",null,"false"),e(" 来取消箭头显示")],-1)),n(l,null,{default:d(()=>t[3]||(t[3]=[o("l-code-preview",null,[o("textarea",{lang:"html"},`  <l-popover content="提示内容" show-arrow="false" offset="5">
    <l-button slot="trigger">提示</l-button>
  </l-popover>
`)],-1)])),_:1}),t[12]||(t[12]=o("h3",{id:"自定义内容",tabindex:"-1"},[e("自定义内容 "),o("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),t[13]||(t[13]=o("p",null,[e("通过 "),o("code",null,"slot"),e(" 插槽来设置 "),o("code",null,"l-popover"),e(" 的内容")],-1)),n(l,null,{default:d(()=>t[4]||(t[4]=[o("l-code-preview",null,[o("textarea",{lang:"html"},`  <l-popover>
    <l-button slot="trigger">提示</l-button>
    <p>提示内容1</p>
    <p>提示内容2</p>
  </l-popover>
`)],-1)])),_:1}),t[14]||(t[14]=r('<blockquote><p><code>l-popover</code> 组件整体是一个相对定位的标签，所以如果需要对 <code>l-popover</code> 设置定位的话，需要在外围包裹一个 <code>div</code> 标签，然后对 <code>div</code> 标签设置定位。</p></blockquote><h3 id="tooltip" tabindex="-1">Tooltip <a class="header-anchor" href="#tooltip" aria-label="Permalink to &quot;Tooltip&quot;">​</a></h3><p><code>tooltip</code> 相对于 <code>popover</code> 只是样式进行了小调整；只需要设置 <code>theme=&quot;tooltip&quot;</code> 属性就能即可。</p>',3)),n(l,null,{default:d(()=>t[5]||(t[5]=[o("l-code-preview",null,[o("textarea",{lang:"html"},`  <l-popover content="提示内容" theme="tooltip" placement="top">
    <l-button slot="trigger">提示</l-button>
  </l-popover>
`),o("div",{class:"source"},[o("textarea",{lang:"html"},`  <l-button>按钮</l-button>
`)])],-1)])),_:1}),t[15]||(t[15]=r('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="popover-attibutes" tabindex="-1">Popover Attibutes <a class="header-anchor" href="#popover-attibutes" aria-label="Permalink to &quot;Popover Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>inline</code></td><td><code>l-popover</code> 是否是行级元素</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>content</code></td><td><code>l-popover</code> 的内容</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>placement</code></td><td>位置</td><td><code>string</code></td><td><code>top</code></td></tr><tr><td><code>trigger</code></td><td>触发方式</td><td><code>hover</code>、<code>click</code>、<code>focus</code></td><td><code>hover</code></td></tr><tr><td><code>offset</code></td><td>偏移量</td><td><code>number</code></td><td><code>10</code></td></tr><tr><td><code>show-arrow</code></td><td>是否显示箭头</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>width</code></td><td>宽度</td><td><code>string</code>、<code>number</code></td><td><code>-</code></td></tr><tr><td><code>destroy-on-hide</code></td><td>隐藏时销毁 <code>DOM</code> 结构; <code>false</code> 隐藏时未销毁只是设置 <code>display: none</code></td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="popover-slots" tabindex="-1">Popover Slots <a class="header-anchor" href="#popover-slots" aria-label="Permalink to &quot;Popover Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr><tr><td><code>trigger</code></td><td>触发按钮</td></tr></tbody></table><h3 id="popover-css-variables" tabindex="-1">Popover CSS Variables <a class="header-anchor" href="#popover-css-variables" aria-label="Permalink to &quot;Popover CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-popover-offset</code></td><td>偏移量</td><td><code>10px</code></td></tr></tbody></table>',7))])}const x=a(c,[["render",u]]);export{k as __pageData,x as default};
