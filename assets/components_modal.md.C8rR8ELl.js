import{c as A,o as u,$ as B,b as E,i as b,a as M}from"./chunks/dom.BOKvBN-7.js";import{B as k,M as x,C as v,F as q,I as P}from"./chunks/index.0kXtNFCT.js";import{I as C}from"./chunks/info.BhPFqlOn.js";import{r as y}from"./chunks/index.DCtgrrjC.js";import{v as T,P as L,x as w,C as S,c as I,o as _,ag as f,G as p,j as t,w as m,a as d}from"./chunks/framework.BCyZWppQ.js";import"./chunks/color.9DIoxwsF.js";import"./chunks/index.DZ7iFm8i.js";function $(i,l,a,r="alert"){return new Promise(c=>{const s=[];if(a.icon){let e=a.icon();e.setAttribute("slot","header"),s.push(e.outerHTML)}s.push(`<span slot="header">${i}</span>`),r==="prompt"?(s.push(`<l-form-item label="${l}" label-position="top" inner-block>`),s.push(`<l-input placeholder="${a.placeholder||""}"></l-input>`),s.push("</l-form-item>")):s.push(`<span>${l}</span>`);let o=A("l-modal",{cancel:`${a.showCancel}`,innerHTML:s.join(""),open:!0,class:`l-modal-box l-modal-box--${r}`,close:`${a.close}`,"mask-closable":`${a.maskClosable}`});u(o,"close",()=>{o.remove(),o=void 0},{once:!0}),u(o,"ok",()=>{let e=!0;r==="prompt"&&(e=B(".l-modal-box l-input").value),o.removeAttribute("open"),c(e)},{once:!0}),u(o,"cancel",()=>{o.removeAttribute("open"),c(!1)},{once:!0}),document.body.appendChild(o)})}function F(i,l,a){return y([k,x,v]),new Promise(r=>{const c={showCancel:!1,close:0,maskClosable:!1,icon:void 0,...a};return $(l||"提示",i,c,"alert")})}function V(i,l,a){y([k,x,v,C]);const r={showCancel:!0,close:0,maskClosable:!0,icon:()=>A("l-info-icon",{style:"color:#1890ff;"}),...a};return $(l||"提示",i,r,"confirm")}function j(i,l,a){y([k,x,v,C,q,P]);const r={showCancel:!0,close:0,maskClosable:!0,placeholder:"",...a};return $(l||"提示",i,r,"prompt")}const g={alert:F,confirm:V,prompt:j},J=JSON.parse('{"title":"Modal 对话框","description":"","frontmatter":{},"headers":[],"relativePath":"components/modal.md","filePath":"components/modal.md","lastUpdated":1743478616000}'),D={name:"components/modal.md"},K=Object.assign(D,{setup(i){let l,a;function r(o){const n=o.target.id;n==="alert"?g.alert("这是一段内容","标题").then(()=>{console.log("alert close")}):n==="confirm"?g.confirm("确定要保存更改？","提示").then(h=>{console.log(h)}):n==="prompt"?g.prompt("指令","指令密钥",{placeholder:"请输入指令"}).then(h=>{console.log(h)}):B(`l-modal[for="${n}"]`).setAttribute("open","true")}function c(o){o.target.removeAttribute("open")}function s(o){const e=o.target;e.getAttribute("for")==="open3"&&(e.setAttribute("confirm-loading","true"),e.innerHTML="<span>正在提交内容……</span>",setTimeout(()=>{e.innerHTML="<span>对话框内容</span>",e.removeAttribute("confirm-loading"),o.target.removeAttribute("open")},1500))}return T(()=>{L(()=>{l=E("l-button[id]"),a=E("l-modal"),b(l,o=>{u(o,"click",r)}),b(a,o=>{u(o,"cancel",c),u(o,"ok",s)})})}),w(()=>{l&&(b(l,o=>{M(o,"click",r)}),l=void 0),a&&(b(a,o=>{M(o,"cancel",c)}),a=void 0)}),(o,e)=>{const n=S("ClientOnly");return _(),I("div",null,[e[6]||(e[6]=f(`<h1 id="modal-对话框" tabindex="-1">Modal 对话框 <a class="header-anchor" href="#modal-对话框" aria-label="Permalink to &quot;Modal 对话框&quot;">​</a></h1><p>在保留当前页面状态的情况下，弹出一个对话框告知用户并承载相关操作，包含：标题区、内容区、操作区</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Modal, regist, Button, CloseIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Modal]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 当显示底部时调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Button);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 当需要显示关闭按钮时</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(CloseIcon);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>需要设置 <code>open</code> 属性，它接收 <code>Boolean</code>，当为 <code>true</code> 时显示 <code>Modal</code>。<code>title</code> 属性用于定义标题，它是可选的，默认值为空。</p>`,7)),p(n,null,{default:m(()=>e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open1" title="Title" vertical-align="middle">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open1" title="Title">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
`),t("textarea",{lang:"js"},`  const $open1Btn = document.getElementById('open1');
  const $modal1 = document.querySelector('l-modal[for="open1"]');
  $open1Btn.addEventListener('click', () => {
    $modal1.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal1.addEventListener('cancel', () => {
    $modal1.removeAttribute('open');
  });
`)])],-1)])),_:1}),e[7]||(e[7]=t("h3",{id:"自定义头部",tabindex:"-1"},[d("自定义头部 "),t("a",{class:"header-anchor",href:"#自定义头部","aria-label":'Permalink to "自定义头部"'},"​")],-1)),e[8]||(e[8]=t("p",null,[d("除了使用 "),t("code",null,"title"),d(" 属性定义头部内容外，也可以通过传递 "),t("code",null,"header-slot"),d(" 插槽自定义头部内容。通过传递 "),t("code",null,"width"),d(" 属性改变宽度")],-1)),p(n,null,{default:m(()=>e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">提示</span>
    <span>内容</span>
  </l-modal>
  <l-button id="open2" type="primary">打开-自定义头部</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">提示</span>
    <span>内容</span>
  </l-modal>
  <l-button id="open2" type="primary">打开-自定义头部</l-button>
`),t("textarea",{lang:"js"},`  const $open2Btn = document.getElementById('open2');
  const $modal2 = document.querySelector('l-modal[for="open2"]');
  $open2Btn.addEventListener('click', () => {
    $modal2.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal2.addEventListener('cancel', () => {
    $modal2.removeAttribute('open');
  });
`)])],-1)])),_:1}),e[9]||(e[9]=t("blockquote",null,[t("p",null,[d("注意：实际使用 "),t("code",null,"l-info-icon"),d(" 时, 需要 "),t("code",null,"regist"),d(" 注册")])],-1)),e[10]||(e[10]=t("h3",{id:"异步关闭",tabindex:"-1"},[d("异步关闭 "),t("a",{class:"header-anchor",href:"#异步关闭","aria-label":'Permalink to "异步关闭"'},"​")],-1)),e[11]||(e[11]=t("p",null,"点击确定后异步关闭对话框，例如提交表单。",-1)),p(n,null,{default:m(()=>e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open3" title="异步关闭">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open3" type="primary">打开-异步关闭</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open3" title="异步关闭">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open3" type="primary">打开-异步关闭</l-button>
`),t("textarea",{lang:"js"},`  const $open3Btn = document.getElementById('open3');
  const $modal3 = document.querySelector('l-modal[for="open3"]');
  $open3Btn.addEventListener('click', () => {
    $modal3.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal3.addEventListener('cancel', () => {
    $modal3.removeAttribute('open');
  });
  $modal3.addEventListener('ok', () => {
    $modal3.setAttribute('confirm-loading', 'true');
    $modal3.innerHTML = "<span>正在提交内容……</span>";
    setTimeout(() => {
      $modal3.innerHTML = "<span>对话框内容</span>";
      $modal3.removeAttribute('confirm-loading');
      $modal3.removeAttribute('open');
    }, 1500);
  });
`)])],-1)])),_:1}),e[12]||(e[12]=t("h3",{id:"关闭按钮",tabindex:"-1"},[d("关闭按钮 "),t("a",{class:"header-anchor",href:"#关闭按钮","aria-label":'Permalink to "关闭按钮"'},"​")],-1)),e[13]||(e[13]=t("p",null,[d("通过设置 "),t("code",null,"close"),d(" 来控制关闭按钮的显示以及位置；"),t("code",null,"0"),d(" - 不显示, "),t("code",null,"1"),d(" - 显示在框内(默认), "),t("code",null,"2"),d(" - 显示在边角")],-1)),p(n,null,{default:m(()=>e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open4" title="Title" close="2">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open4" type="primary">打开</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open3" title="异步关闭">
    <span>对话框内容</span>
  </l-modal>
  <l-button id="open3" type="primary">打开-异步关闭</l-button>
`),t("textarea",{lang:"js"},`  const $open4Btn = document.getElementById('open4');
  const $modal4 = document.querySelector('l-modal[for="open4"]');
  $open4Btn.addEventListener('click', () => {
    $modal4.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal4.addEventListener('cancel', () => {
    $modal4.removeAttribute('open');
  });
`)])],-1)])),_:1}),e[14]||(e[14]=t("h3",{id:"移动风格",tabindex:"-1"},[d("移动风格 "),t("a",{class:"header-anchor",href:"#移动风格","aria-label":'Permalink to "移动风格"'},"​")],-1)),e[15]||(e[15]=t("p",null,[d("默认情况下对话框为 "),t("code",null,"pc"),d(" 端风格，可以通过传递 "),t("code",null,"mobile"),d(" 属性将对话框变为移动风格；设置 "),t("code",null,'vertical-align="middle"'),d(" 让对话框垂直居中显示;具体表现为：文本居中，下方按钮平铺")],-1)),p(n,null,{default:m(()=>e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open5" title="Title" mobile close="0" vertical-align="middle">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open5" title="Title" mobile close="0" vertical-align="middle">
    <span>这是内容</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
`),t("textarea",{lang:"js"},`  const $open5Btn = document.getElementById('open5');
  const $modal5 = document.querySelector('l-modal[for="open5"]');
  $open5Btn.addEventListener('click', () => {
    $modal5.setAttribute('open', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal5.addEventListener('cancel', () => {
    $modal5.removeAttribute('open');
  });
`)])],-1)])),_:1}),e[16]||(e[16]=f('<h3 id="消息弹窗" tabindex="-1">消息弹窗 <a class="header-anchor" href="#消息弹窗" aria-label="Permalink to &quot;消息弹窗&quot;">​</a></h3><p>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。系统自带有3种消息弹窗：<code>alert</code>、<code>confirm</code>、<code>prompt</code> 但是其样式比较简陋不太美观，消息弹窗优化了样式。</p><p>分别通过 <code>LModalBox.alert()</code>、<code>LModalBox.confirm()</code>、<code>LModalBox.prompt()</code> 调用</p>',3)),p(n,null,{default:m(()=>e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="alert">alert</l-button>
  <l-button id="confirm">confirm</l-button>
  <l-button id="prompt">prompt</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  // alert
  LModalBox.alert('这是一段内容', '标题').then(() => {
    console.log("alert close")
  });
  // confirm
  LModalBox.confirm('确定要保存更改？', '提示').then((ok) => {
    console.log(ok);
  })
  // prompt
  LModalBox.prompt('指令', '指令密钥', { placeholder: '请输入指令' }).then((text) => {
    console.log(text);
  });
`)])],-1)])),_:1}),e[17]||(e[17]=f('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="modal-attibutes" tabindex="-1">Modal Attibutes <a class="header-anchor" href="#modal-attibutes" aria-label="Permalink to &quot;Modal Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>open</code></td><td>是否显示对话框</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>destroy-on-close</code></td><td>关闭时销毁 Modal 里的子元素</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>mask-closable</code></td><td>点击蒙层是否允许关闭</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>mask</code></td><td>是否显示遮罩层</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>title</code></td><td>标题</td><td><code>string</code></td><td><code>&quot;&quot;</code></td></tr><tr><td><code>footer</code></td><td>是否展示底部</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>cancel-text</code></td><td>取消按钮文字</td><td><code>string</code></td><td><code>取消</code></td></tr><tr><td><code>ok-text</code></td><td>确定按钮文字</td><td><code>string</code></td><td><code>确定</code></td></tr><tr><td><code>close</code></td><td>关闭按钮显示位置, <code>0</code> - 不显示, <code>1</code> - 显示在框内(默认), <code>2</code> - 显示在边角</td><td><code>0</code> | <code>1</code> | <code>2</code></td><td><code>1</code></td></tr><tr><td><code>mobile</code></td><td>是否为移动风格</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>vertical-align</code></td><td>对话框垂直对齐方式, <code>top</code> - 顶部, <code>middle</code> - 居中</td><td><code>top</code> | <code>middle</code> | <code>bottom</code></td><td><code>top</code></td></tr><tr><td><code>confirm-loading</code></td><td>确定按钮 <code>loading</code></td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>cancel</code></td><td>是否显示取消按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>width</code></td><td>对话框宽度</td><td><code>string</code></td><td><code>27%</code></td></tr><tr><td><code>z-index</code></td><td>对话框层级</td><td><code>string</code></td><td><code>100</code></td></tr></tbody></table><h3 id="modal-parts" tabindex="-1">Modal Parts <a class="header-anchor" href="#modal-parts" aria-label="Permalink to &quot;Modal Parts&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>mask</code></td><td>遮罩层</td></tr><tr><td><code>wrapper</code></td><td>对话框外层</td></tr><tr><td><code>default</code></td><td>对话框主体</td></tr><tr><td><code>header</code></td><td>对话框头部</td></tr><tr><td><code>container</code></td><td>对话框内容</td></tr><tr><td><code>footer</code></td><td>对话框底部</td></tr></tbody></table><h3 id="modal-slots" tabindex="-1">Modal Slots <a class="header-anchor" href="#modal-slots" aria-label="Permalink to &quot;Modal Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>对话框内容</td></tr><tr><td><code>header</code></td><td>对话框标题</td></tr><tr><td><code>footer</code></td><td>对话框底部</td></tr></tbody></table><h3 id="modal-events" tabindex="-1">Modal Events <a class="header-anchor" href="#modal-events" aria-label="Permalink to &quot;Modal Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>cancel</code></td><td>点击遮罩层或右上角叉或取消按钮的回调</td><td><code>(event: CustomEvent)</code></td></tr><tr><td><code>ok</code></td><td>点击确定回调</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="modal-css-variables" tabindex="-1">Modal CSS Variables <a class="header-anchor" href="#modal-css-variables" aria-label="Permalink to &quot;Modal CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-modal-zindex</code></td><td>对话框的层级 <code>z-index</code></td><td><code>100</code></td></tr><tr><td><code>--l-modal-width</code></td><td>对话框宽度</td><td><code>27%</code></td></tr></tbody></table><h3 id="modalbox-methods" tabindex="-1">ModalBox Methods <a class="header-anchor" href="#modalbox-methods" aria-label="Permalink to &quot;ModalBox Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>参数</th><th>返回值</th></tr></thead><tbody><tr><td><code>alert</code></td><td>展示消息提示框</td><td><code>message: string, title?: string, options?: LModalBoxOptions</code></td><td><code>Promise</code></td></tr><tr><td><code>confirm</code></td><td>展示消息确认框</td><td><code>message: string, title?: string, options?: LModalBoxOptions</code></td><td><code>Promise&lt;boolean&gt;</code></td></tr><tr><td><code>prompt</code></td><td>展示输入框</td><td><code>message: string, title?: string, options?: LModalBoxOptions</code></td><td><code>Promise&lt;string&gt;</code></td></tr></tbody></table><h3 id="modalboxoptions" tabindex="-1">ModalBoxOptions <a class="header-anchor" href="#modalboxoptions" aria-label="Permalink to &quot;ModalBoxOptions&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>showCancel</code></td><td>是否显示取消按钮</td><td><code>boolean</code></td><td><code>true</code>(<code>alert</code>默认<code>false</code>)</td></tr><tr><td><code>close</code></td><td>关闭按钮显示位置, <code>0</code> - 不显示, <code>1</code> - 显示在框内(默认), <code>2</code> - 显示在边角</td><td><code>0</code> | <code>1</code> | <code>2</code></td><td><code>0</code></td></tr><tr><td><code>maskClosable</code></td><td>点击蒙层是否允许关闭</td><td><code>boolean</code></td><td><code>true</code>(<code>alert</code>默认<code>false</code>)</td></tr><tr><td><code>icon</code></td><td>自定义图标</td><td><code>() =&gt; HTMLElement</code></td><td><code>-</code></td></tr><tr><td><code>placeholder</code></td><td>输入框占位符, <code>prompt</code> 时有效</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table>',15))])}}});export{J as __pageData,K as default};
