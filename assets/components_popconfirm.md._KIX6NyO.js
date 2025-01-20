import{_ as n,c as i,a2 as a,G as s,w as r,B as p,o as l,j as e}from"./chunks/framework.CmfdOiHF.js";const v=JSON.parse('{"title":"Popconfirm","description":"","frontmatter":{},"headers":[],"relativePath":"components/popconfirm.md","filePath":"components/popconfirm.md","lastUpdated":1736404744000}'),d={name:"components/popconfirm.md"};function c(h,t,m,u,b,f){const o=p("ClientOnly");return l(),i("div",null,[t[1]||(t[1]=a(`<h1 id="popconfirm" tabindex="-1">Popconfirm <a class="header-anchor" href="#popconfirm" aria-label="Permalink to &quot;Popconfirm&quot;">​</a></h1><p>点击元素，弹出简单的气泡式的确认框</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Popconfirm, regist, Button, WarnIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Popconfirm, Button, WarnIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>传递 <code>content</code> 属性或者 <code>slot-default</code> 为内容。</p>`,7)),s(o,null,{default:r(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-popconfirm content="确认要删除吗？">
    <l-button slot="trigger">提示</l-button>
  </l-popconfirm>
`)],-1)])),_:1}),t[2]||(t[2]=a('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="popconfirm-attibutes" tabindex="-1">Popconfirm Attibutes <a class="header-anchor" href="#popconfirm-attibutes" aria-label="Permalink to &quot;Popconfirm Attibutes&quot;">​</a></h3><p>属性同 <a href="/litos_ui/components/popover#popover-attibutes">popover-attibutes</a> 一致</p><h3 id="popconfirm-slots" tabindex="-1">Popconfirm Slots <a class="header-anchor" href="#popconfirm-slots" aria-label="Permalink to &quot;Popconfirm Slots&quot;">​</a></h3><p>除了保持 <a href="/litos_ui/components/popover#popover-slots">popover-slots</a> 一致外，还新增有</p><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>icon</code></td><td>图标</td></tr></tbody></table><h3 id="popconfirm-events" tabindex="-1">Popconfirm Events <a class="header-anchor" href="#popconfirm-events" aria-label="Permalink to &quot;Popconfirm Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>cancel</code></td><td>点击取消按钮时触发</td><td><code>(event: CustomEvent)</code></td></tr><tr><td>``confirm`</td><td>点击确认按钮时触发</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table>',8))])}const P=n(d,[["render",c]]);export{v as __pageData,P as default};
