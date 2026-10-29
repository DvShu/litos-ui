import{b as f,i as c,o as h,a as p,$ as y}from"./chunks/browser.CpyXlELn.js";import{v as k,P as x,x as v,C as E,o as w,c as C,a2 as m,E as n,w as l,j as t,a as o}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Modal","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/modal.md","filePath":"en/components/modal.md","lastUpdated":1793253144000}'),B={name:"en/components/modal.md"},$=Object.assign(B,{setup(A){let s,i;function u(d){const a=d.target.id;a==="alert"?ModalBox.alert("This is some content","Title").then(()=>{console.log("alert close")}):a==="confirm"?ModalBox.confirm("Save your changes?","Notice").then(r=>{console.log(r)}):a==="prompt"?ModalBox.prompt("Command","Command key",{placeholder:"Enter a command"}).then(r=>{console.log(r)}):y(`l-modal[for="${a}"]`).setAttribute("show","true")}function b(d){d.target.removeAttribute("show")}function g(d){const e=d.target;e.getAttribute("for")==="open3"&&(e.setAttribute("confirm-loading","true"),e.innerHTML="<span>Submitting content...</span>",setTimeout(()=>{e.innerHTML="<span>Dialog content</span>",e.removeAttribute("confirm-loading"),d.target.removeAttribute("show")},1500))}return k(()=>{x(()=>{s=f("l-button[id]"),i=f("l-modal"),c(s,d=>{h(d,"click",u)}),c(i,d=>{h(d,"cancel",b),h(d,"ok",g)})})}),v(()=>{s&&(c(s,d=>{p(d,"click",u)}),s=void 0),i&&(c(i,d=>{p(d,"cancel",b),p(d,"ok",g)}),i=void 0)}),(d,e)=>{const a=E("ClientOnly");return w(),C("div",null,[e[6]||(e[6]=m("",8)),n(a,null,{default:l(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open1" header-title="Header" vertical-align="middle">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open1" header-title="Header">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open1" type="primary">open</l-button>
`),t("textarea",{lang:"js"},`  const $open1Btn = document.getElementById('open1');
  const $modal1 = document.querySelector('l-modal[for="open1"]');
  $open1Btn.addEventListener('click', () => {
    $modal1.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal1.addEventListener('cancel', () => {
    $modal1.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[7]||(e[7]=t("h3",{id:"custom-header",tabindex:"-1"},[o("Custom Header "),t("a",{class:"header-anchor",href:"#custom-header","aria-label":'Permalink to "Custom Header"'},"​")],-1)),e[8]||(e[8]=t("p",null,[o("Use "),t("code",null,"header-title"),o(" for a text title or the "),t("code",null,"header"),o(" slot for custom header content. Set "),t("code",null,"width"),o(" to change the dialog width.")],-1)),n(a,null,{default:l(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">Notice</span>
    <span>Content</span>
  </l-modal>
  <l-button id="open2" type="primary">Open custom header</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open2" width="300px">
    <l-info-icon slot="header"></l-info-icon>
    <span slot="header">Notice</span>
    <span>Content</span>
  </l-modal>
  <l-button id="open2" type="primary">Open custom header</l-button>
`),t("textarea",{lang:"js"},`  const $open2Btn = document.getElementById('open2');
  const $modal2 = document.querySelector('l-modal[for="open2"]');
  $open2Btn.addEventListener('click', () => {
    $modal2.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal2.addEventListener('cancel', () => {
    $modal2.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[9]||(e[9]=t("blockquote",null,[t("p",null,[o("Register the InfoIcon component with "),t("code",null,"regist"),o(" before using "),t("code",null,"l-info-icon"),o(".")])],-1)),e[10]||(e[10]=t("h3",{id:"asynchronous-closing",tabindex:"-1"},[o("Asynchronous Closing "),t("a",{class:"header-anchor",href:"#asynchronous-closing","aria-label":'Permalink to "Asynchronous Closing"'},"​")],-1)),e[11]||(e[11]=t("p",null,"Close the dialog asynchronously after confirmation, for example after submitting a form.",-1)),n(a,null,{default:l(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open3" header-title="Asynchronous closing">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open3" type="primary">Open async dialog</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open3" header-title="Asynchronous closing">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open3" type="primary">Open async dialog</l-button>
`),t("textarea",{lang:"js"},`  const $open3Btn = document.getElementById('open3');
  const $modal3 = document.querySelector('l-modal[for="open3"]');
  $open3Btn.addEventListener('click', () => {
    $modal3.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal3.addEventListener('cancel', () => {
    $modal3.removeAttribute('show');
  });
  $modal3.addEventListener('ok', () => {
    $modal3.setAttribute('confirm-loading', 'true');
    $modal3.innerHTML = "<span>Submitting content...</span>";
    setTimeout(() => {
      $modal3.innerHTML = "<span>Dialog content</span>";
      $modal3.removeAttribute('confirm-loading');
      $modal3.removeAttribute('show');
    }, 1500);
  });
`)])],-1)])]),_:1}),e[12]||(e[12]=t("h3",{id:"close-button",tabindex:"-1"},[o("Close Button "),t("a",{class:"header-anchor",href:"#close-button","aria-label":'Permalink to "Close Button"'},"​")],-1)),e[13]||(e[13]=t("p",null,[o("Use "),t("code",null,"close"),o(" to control the close button: "),t("code",null,"0"),o(" hides it, "),t("code",null,"1"),o(" places it inside the dialog (the default), and "),t("code",null,"2"),o(" places it at the corner.")],-1)),n(a,null,{default:l(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open4" header-title="Title" close="2">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open4" type="primary">Open</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open4" header-title="Title" close="2">
    <span>Dialog content</span>
  </l-modal>
  <l-button id="open4" type="primary">Open async dialog</l-button>
`),t("textarea",{lang:"js"},`  const $open4Btn = document.getElementById('open4');
  const $modal4 = document.querySelector('l-modal[for="open4"]');
  $open4Btn.addEventListener('click', () => {
    $modal4.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal4.addEventListener('cancel', () => {
    $modal4.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[14]||(e[14]=t("h3",{id:"mobile-style",tabindex:"-1"},[o("Mobile Style "),t("a",{class:"header-anchor",href:"#mobile-style","aria-label":'Permalink to "Mobile Style"'},"​")],-1)),e[15]||(e[15]=t("p",null,[o("Dialogs use desktop styling by default. Add "),t("code",null,"mobile"),o(" for centered text and evenly arranged footer buttons. Set "),t("code",null,'vertical-align="middle"'),o(" to center the dialog vertically.")],-1)),n(a,null,{default:l(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open5" header-title="Title" mobile close="0" vertical-align="middle">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-modal for="open5" header-title="Title" mobile close="0" vertical-align="middle">
    <span>This is the content</span>
  </l-modal>
  <l-button id="open5" type="primary">open</l-button>
`),t("textarea",{lang:"js"},`  const $open5Btn = document.getElementById('open5');
  const $modal5 = document.querySelector('l-modal[for="open5"]');
  $open5Btn.addEventListener('click', () => {
    $modal5.setAttribute('show', 'true');
  });
  // Handle cancellation from the overlay, close button, or cancel button; inspect e.detail.action.
  $modal5.addEventListener('cancel', () => {
    $modal5.removeAttribute('show');
  });
`)])],-1)])]),_:1}),e[16]||(e[16]=m("",3)),n(a,null,{default:l(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="alert">alert</l-button>
  <l-button id="confirm">confirm</l-button>
  <l-button id="prompt">prompt</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  // alert
  ModalBox.alert('This is some content', 'Title').then(() => {
    console.log("alert close")
  });
  // confirm
  ModalBox.confirm('Save your changes?', 'Notice').then((ok) => {
    console.log(ok);
  })
  // prompt
  ModalBox.prompt('Command', 'Command key', { placeholder: 'Enter a command' }).then((text) => {
    console.log(text);
  });
`)])],-1)])]),_:1}),e[17]||(e[17]=m("",19))])}}});export{q as __pageData,$ as default};
