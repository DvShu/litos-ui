import{c as A,o as u,$ as B,b as E,i as b,a as M}from"./chunks/dom.DntxtiBs.js";import{B as k,M as x,C as v,F as C,I as q}from"./chunks/index.BOTgZn3-.js";import{r as y,I as w}from"./chunks/info.DAzEmGVU.js";import{v as P,P as T,x as L,C as S,o as I,c as _,ag as f,E as p,w as m,j as t,a as d}from"./chunks/framework.-4c4jpF6.js";import"./chunks/color.DEra9DJZ.js";import"./chunks/index.DZ7iFm8i.js";function $(i,l,a,r="alert"){return new Promise(c=>{const s=[];if(a.icon){let e=a.icon();e.setAttribute("slot","header"),s.push(e.outerHTML)}s.push(`<span slot="header">${i}</span>`),r==="prompt"?(s.push(`<l-form-item label="${l}" label-position="top" inner-block>`),s.push(`<l-input placeholder="${a.placeholder||""}"></l-input>`),s.push("</l-form-item>")):s.push(`<span>${l}</span>`);let o=A("l-modal",{cancel:`${a.showCancel}`,innerHTML:s.join(""),show:!0,class:`l-modal-box l-modal-box--${r}`,close:`${a.close}`,"mask-closable":`${a.maskClosable}`});u(o,"close",()=>{o.remove(),o=void 0},{once:!0}),u(o,"ok",()=>{let e=!0;r==="prompt"&&(e=B(".l-modal-box l-input").value),o.removeAttribute("open"),c(e)},{once:!0}),u(o,"cancel",()=>{o.removeAttribute("open"),c(!1)},{once:!0}),document.body.appendChild(o)})}function F(i,l,a){return y([k,x,v]),new Promise(r=>{const c={showCancel:!1,close:0,maskClosable:!1,icon:void 0,...a};return $(l||"提示",i,c,"alert")})}function V(i,l,a){y([k,x,v,w]);const r={showCancel:!0,close:0,maskClosable:!0,icon:()=>A("l-info-icon",{style:"color:#1890ff;"}),...a};return $(l||"提示",i,r,"confirm")}function j(i,l,a){y([k,x,v,w,C,q]);const r={showCancel:!0,close:0,maskClosable:!0,placeholder:"",...a};return $(l||"提示",i,r,"prompt")}const g={alert:F,confirm:V,prompt:j},J=JSON.parse('{"title":"Modal 对话框","description":"","frontmatter":{},"headers":[],"relativePath":"components/modal.md","filePath":"components/modal.md","lastUpdated":1769506224000}'),D={name:"components/modal.md"},G=Object.assign(D,{setup(i){let l,a;function r(o){const n=o.target.id;n==="alert"?g.alert("这是一段内容","标题").then(()=>{console.log("alert close")}):n==="confirm"?g.confirm("确定要保存更改？","提示").then(h=>{console.log(h)}):n==="prompt"?g.prompt("指令","指令密钥",{placeholder:"请输入指令"}).then(h=>{console.log(h)}):B(`l-modal[for="${n}"]`).setAttribute("show","true")}function c(o){o.target.removeAttribute("show")}function s(o){const e=o.target;e.getAttribute("for")==="open3"&&(e.setAttribute("confirm-loading","true"),e.innerHTML="<span>正在提交内容……</span>",setTimeout(()=>{e.innerHTML="<span>对话框内容</span>",e.removeAttribute("confirm-loading"),o.target.removeAttribute("show")},1500))}return P(()=>{T(()=>{l=E("l-button[id]"),a=E("l-modal"),b(l,o=>{u(o,"click",r)}),b(a,o=>{u(o,"cancel",c),u(o,"ok",s)})})}),L(()=>{l&&(b(l,o=>{M(o,"click",r)}),l=void 0),a&&(b(a,o=>{M(o,"cancel",c)}),a=void 0)}),(o,e)=>{const n=S("ClientOnly");return I(),_("div",null,[e[6]||(e[6]=f("",7)),p(n,null,{default:m(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open1" title="Title" vertical-align="middle">
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
    $modal1.setAttribute('show', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal1.addEventListener('cancel', () => {
    $modal1.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[7]||(e[7]=t("h3",{id:"自定义头部",tabindex:"-1"},[d("自定义头部 "),t("a",{class:"header-anchor",href:"#自定义头部","aria-label":'Permalink to "自定义头部"'},"​")],-1)),e[8]||(e[8]=t("p",null,[d("除了使用 "),t("code",null,"title"),d(" 属性定义头部内容外，也可以通过传递 "),t("code",null,"header-slot"),d(" 插槽自定义头部内容。通过传递 "),t("code",null,"width"),d(" 属性改变宽度")],-1)),p(n,null,{default:m(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open2" width="300px">
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
    $modal2.setAttribute('show', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal2.addEventListener('cancel', () => {
    $modal2.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[9]||(e[9]=t("blockquote",null,[t("p",null,[d("注意：实际使用 "),t("code",null,"l-info-icon"),d(" 时, 需要 "),t("code",null,"regist"),d(" 注册")])],-1)),e[10]||(e[10]=t("h3",{id:"异步关闭",tabindex:"-1"},[d("异步关闭 "),t("a",{class:"header-anchor",href:"#异步关闭","aria-label":'Permalink to "异步关闭"'},"​")],-1)),e[11]||(e[11]=t("p",null,"点击确定后异步关闭对话框，例如提交表单。",-1)),p(n,null,{default:m(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open3" title="异步关闭">
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
    $modal3.setAttribute('show', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal3.addEventListener('cancel', () => {
    $modal3.removeAttribute('show');
  });
  $modal3.addEventListener('ok', () => {
    $modal3.setAttribute('confirm-loading', 'true');
    $modal3.innerHTML = "<span>正在提交内容……</span>";
    setTimeout(() => {
      $modal3.innerHTML = "<span>对话框内容</span>";
      $modal3.removeAttribute('confirm-loading');
      $modal3.removeAttribute('show');
    }, 1500);
  });
`)])],-1)])]),_:1}),e[12]||(e[12]=t("h3",{id:"关闭按钮",tabindex:"-1"},[d("关闭按钮 "),t("a",{class:"header-anchor",href:"#关闭按钮","aria-label":'Permalink to "关闭按钮"'},"​")],-1)),e[13]||(e[13]=t("p",null,[d("通过设置 "),t("code",null,"close"),d(" 来控制关闭按钮的显示以及位置；"),t("code",null,"0"),d(" - 不显示, "),t("code",null,"1"),d(" - 显示在框内(默认), "),t("code",null,"2"),d(" - 显示在边角")],-1)),p(n,null,{default:m(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open4" title="Title" close="2">
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
    $modal4.setAttribute('show', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal4.addEventListener('cancel', () => {
    $modal4.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[14]||(e[14]=t("h3",{id:"移动风格",tabindex:"-1"},[d("移动风格 "),t("a",{class:"header-anchor",href:"#移动风格","aria-label":'Permalink to "移动风格"'},"​")],-1)),e[15]||(e[15]=t("p",null,[d("默认情况下对话框为 "),t("code",null,"pc"),d(" 端风格，可以通过传递 "),t("code",null,"mobile"),d(" 属性将对话框变为移动风格；设置 "),t("code",null,'vertical-align="middle"'),d(" 让对话框垂直居中显示;具体表现为：文本居中，下方按钮平铺")],-1)),p(n,null,{default:m(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open5" title="Title" mobile close="0" vertical-align="middle">
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
    $modal5.setAttribute('show', 'true');
  });
  // 对话框取消事件, 点击遮罩层或右上角叉或取消按钮的回调, 可以通过 e.detail.action 获取具体的回调行为
  $modal5.addEventListener('cancel', () => {
    $modal5.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[16]||(e[16]=f("",3)),p(n,null,{default:m(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="alert">alert</l-button>
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
`)])],-1)])]),_:1}),e[17]||(e[17]=f("",15))])}}});export{J as __pageData,G as default};
