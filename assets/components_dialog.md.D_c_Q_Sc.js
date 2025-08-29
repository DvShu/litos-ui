import{b as p,i as d,o as h,a as u}from"./chunks/dom.DBNJew1L.js";import{D as s}from"./chunks/index.DUO8G0ql.js";import{v as m,P as k,x as b,C as _,c as f,o as v,ag as r,G as c,w as g,j as n}from"./chunks/framework._HD6XqYi.js";const T=JSON.parse('{"title":"Dialog 对话框","description":"","frontmatter":{},"headers":[],"relativePath":"components/dialog.md","filePath":"components/dialog.md","lastUpdated":1740415499000}'),x={name:"components/dialog.md"},q=Object.assign(x,{setup(y){let e={},i;function t(o){const l=o.target.getAttribute("data-id");e[l].open()}return m(()=>{k(()=>{e.dialog=s({el:"#dialog",onAction:(o,a)=>{console.log(o),a()}}),e.dialog2=s({el:"#dialog2"}),i=p("l-button[data-id]"),d(i,o=>{h(o,"click",t)})})}),b(()=>{if(i){d(i,o=>{u(o,"click",t)});for(const o in e)e[o].destroy();e={}}}),(o,a)=>{const l=_("ClientOnly");return v(),f("div",null,[a[2]||(a[2]=r(`<h1 id="dialog-对话框" tabindex="-1">Dialog 对话框 <a class="header-anchor" href="#dialog-对话框" aria-label="Permalink to &quot;Dialog 对话框&quot;">​</a></h1><p>在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { DialogContainer, regist, Button, CloseIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([DialogContainer, Button, CloseIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h3><p>将 <code>l-dialog-container</code> 元素作为 <code>dialog</code> 的子元素，并设置 <code>header</code> 属性为标题。</p>`,7)),c(l,null,{default:g(()=>[...a[0]||(a[0]=[n("l-code-preview",null,[n("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog" >显示 Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),n("div",{class:"source"},[n("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),n("textarea",{lang:"js"},`  const dialog = LDialog({ 
    el: '#dialog', 
    onAction: (action, done) => {
      console.log(action);
      done();
    } 
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),a[3]||(a[3]=r('<blockquote><p>切记在页面关闭时，如 <code>onUnmounted</code> 中调用 <code>dialog.destroy()</code> 方法销毁弹窗</p></blockquote><h3 id="自定义头部" tabindex="-1">自定义头部 <a class="header-anchor" href="#自定义头部" aria-label="Permalink to &quot;自定义头部&quot;">​</a></h3><p>除了使用 <code>header</code> 属性定义头部内容外，也可以通过传递 <code>header-slot</code> 插槽自定义头部内容。通过传递 <code>width</code> 属性改变宽度；通常当需要在头部显示图标时有用, 比如：<code>confirm</code> 弹窗</p>',3)),c(l,null,{default:g(()=>[...a[1]||(a[1]=[n("l-code-preview",null,[n("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog2" >显示 Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),n("div",{class:"source"},[n("textarea",{lang:"html"},`  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),n("textarea",{lang:"js"},`  const dialog = LDialog({ el: '#dialog' });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1})])}}});export{T as __pageData,q as default};
