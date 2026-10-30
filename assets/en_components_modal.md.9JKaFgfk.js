import{b as f,i as c,o as h,a as p,$ as y}from"./chunks/browser.7zTvUqO3.js";import{v as k,P as x,x as v,C as E,o as w,c as C,a2 as m,E as n,w as l,j as t,a as o}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Modal","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/modal.md","filePath":"en/components/modal.md","lastUpdated":1793253144000}'),B={name:"en/components/modal.md"},$=Object.assign(B,{setup(A){let s,i;function u(d){const a=d.target.id;a==="alert"?ModalBox.alert("This is some content","Title").then(()=>{console.log("alert close")}):a==="confirm"?ModalBox.confirm("Save your changes?","Notice").then(r=>{console.log(r)}):a==="prompt"?ModalBox.prompt("Command","Command key",{placeholder:"Enter a command"}).then(r=>{console.log(r)}):y(`l-modal[for="${a}"]`).setAttribute("show","true")}function b(d){d.target.removeAttribute("show")}function g(d){const e=d.target;e.getAttribute("for")==="open3"&&(e.setAttribute("confirm-loading","true"),e.innerHTML="<span>Submitting content...</span>",setTimeout(()=>{e.innerHTML="<span>Dialog content</span>",e.removeAttribute("confirm-loading"),d.target.removeAttribute("show")},1500))}return k(()=>{x(()=>{s=f("l-button[id]"),i=f("l-modal"),c(s,d=>{h(d,"click",u)}),c(i,d=>{h(d,"cancel",b),h(d,"ok",g)})})}),v(()=>{s&&(c(s,d=>{p(d,"click",u)}),s=void 0),i&&(c(i,d=>{p(d,"cancel",b),p(d,"ok",g)}),i=void 0)}),(d,e)=>{const a=E("ClientOnly");return w(),C("div",null,[e[6]||(e[6]=m(`<h1 id="modal" tabindex="-1">Modal <a class="header-anchor" href="#modal" aria-label="Permalink to &quot;Modal&quot;">​</a></h1><p>Display a dialog while preserving the current page state. It contains a header, content area, and action area.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Modal, regist, Button, CloseIcon, InfoIcon, LoadingIcon, ModalBox } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([CloseIcon, LoadingIcon, Button, Modal]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register Button when showing the footer.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Button);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register CloseIcon when showing the close button.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(CloseIcon);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register the additional components used in this page’s demos.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([InfoIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Use the boolean <code>show</code> attribute to control visibility. <code>header-title</code> sets the title; it is optional and empty by default.</p><p>Set <code>cancel-text</code> and <code>ok-text</code> to customize button labels. Their built-in defaults and the ModalBox service labels remain in Chinese; this page does not change component localization.</p>`,8)),n(a,null,{default:l(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-modal for="open1" header-title="Header" vertical-align="middle">
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
`)])],-1)])]),_:1}),e[16]||(e[16]=m('<h3 id="message-boxes" tabindex="-1">Message Boxes <a class="header-anchor" href="#message-boxes" aria-label="Permalink to &quot;Message Boxes&quot;">​</a></h3><p>Modal message boxes provide styled alternatives to the native browser <code>alert</code>, <code>confirm</code>, and <code>prompt</code> dialogs for alerts, confirmations, and text input.</p><p>Call <code>ModalBox.alert()</code>, <code>ModalBox.confirm()</code>, or <code>ModalBox.prompt()</code>.</p>',3)),n(a,null,{default:l(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="alert">alert</l-button>
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
`)])],-1)])]),_:1}),e[17]||(e[17]=m(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/modal_box.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/modal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="modal-attributes" tabindex="-1">Modal Attributes <a class="header-anchor" href="#modal-attributes" aria-label="Permalink to &quot;Modal Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>show</code></td><td>Whether to show the dialog</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>destroy-on-close</code></td><td>Destroys Modal children when closed</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>mask-closable</code></td><td>Whether clicking the overlay closes the dialog</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>mask</code></td><td>Whether to show the overlay</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>header</code></td><td>Whether to show the header</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>header-title</code></td><td>Header title text</td><td><code>string</code></td><td><code>&quot;&quot;</code></td></tr><tr><td><code>footer</code></td><td>Whether to show the footer</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>cancel-text</code></td><td>Cancel button text</td><td><code>string</code></td><td><code>取消</code></td></tr><tr><td><code>ok-text</code></td><td>Confirmation button text</td><td><code>string</code></td><td><code>确定</code></td></tr><tr><td><code>close</code></td><td>Close button position: 0 hidden, 1 inside (default), 2 at the corner</td><td><code>0</code> | <code>1</code> | <code>2</code></td><td><code>1</code></td></tr><tr><td><code>mobile</code></td><td>Whether to use mobile styling</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>vertical-align</code></td><td>Vertical alignment: top, middle, or bottom</td><td><code>top</code> | <code>middle</code> | <code>bottom</code></td><td><code>top</code></td></tr><tr><td><code>confirm-loading</code></td><td>Confirmation button loading state</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>cancel</code></td><td>Whether to show the cancel button</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>width</code></td><td>Dialog width</td><td><code>string</code></td><td><code>27%</code></td></tr><tr><td><code>z-index</code></td><td>Dialog stacking level</td><td><code>string</code></td><td><code>100</code></td></tr></tbody></table><h3 id="modal-parts" tabindex="-1">Modal Parts <a class="header-anchor" href="#modal-parts" aria-label="Permalink to &quot;Modal Parts&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>mask</code></td><td>Overlay</td></tr><tr><td><code>wrapper</code></td><td>Outer wrapper</td></tr><tr><td><code>default</code></td><td>Dialog body</td></tr><tr><td><code>header</code></td><td>Dialog header</td></tr><tr><td><code>container</code></td><td>Dialog content</td></tr><tr><td><code>footer</code></td><td>Dialog footer</td></tr><tr><td><code>close-btn</code></td><td>Close button</td></tr></tbody></table><h3 id="modal-slots" tabindex="-1">Modal Slots <a class="header-anchor" href="#modal-slots" aria-label="Permalink to &quot;Modal Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Dialog content</td></tr><tr><td><code>header</code></td><td>Dialog title</td></tr><tr><td><code>footer</code></td><td>Dialog footer</td></tr></tbody></table><h3 id="modal-events" tabindex="-1">Modal Events <a class="header-anchor" href="#modal-events" aria-label="Permalink to &quot;Modal Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback</th></tr></thead><tbody><tr><td><code>cancel</code></td><td>Fires when the overlay, close button, or cancel button is clicked</td><td><code>(event: CustomEvent)</code></td></tr><tr><td><code>ok</code></td><td>Fires when confirmation is clicked</td><td><code>(event: CustomEvent)</code></td></tr><tr><td><code>close</code></td><td>Fires after the component has fully closed</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="modal-css-variables" tabindex="-1">Modal CSS Variables <a class="header-anchor" href="#modal-css-variables" aria-label="Permalink to &quot;Modal CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-modal-zindex</code></td><td>Dialog stacking level (z-index)</td><td><code>100</code></td></tr><tr><td><code>--l-modal-width</code></td><td>Dialog width</td><td><code>27%</code></td></tr><tr><td><code>--l-modal-header-padding</code></td><td>Header padding</td><td><code>10px</code></td></tr><tr><td><code>--l-modal-footer-padding</code></td><td>Footer padding</td><td><code>10px</code></td></tr><tr><td><code>--l-modal-border-radius</code></td><td>Dialog border radius</td><td><code>5px</code></td></tr></tbody></table><h3 id="modalbox-methods" tabindex="-1">ModalBox Methods <a class="header-anchor" href="#modalbox-methods" aria-label="Permalink to &quot;ModalBox Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Parameters</th><th>Returns</th></tr></thead><tbody><tr><td><code>alert</code></td><td>Shows an alert</td><td><code>message: string, title?: string, options?: ModalBoxOptions</code></td><td><code>Promise&lt;boolean&gt;</code></td></tr><tr><td><code>confirm</code></td><td>Shows a confirmation box</td><td><code>message: string, title?: string, options?: ModalBoxOptions</code></td><td><code>Promise&lt;boolean&gt;</code></td></tr><tr><td><code>prompt</code></td><td>Shows a prompt</td><td><code>message: string, title?: string, options?: ModalBoxOptions</code></td><td><code>Promise&lt;string | false&gt;</code></td></tr></tbody></table><h3 id="modalboxoptions" tabindex="-1">ModalBoxOptions <a class="header-anchor" href="#modalboxoptions" aria-label="Permalink to &quot;ModalBoxOptions&quot;">​</a></h3><p>These options describe the object accepted by the methods; ModalBoxOptions is a documentation label, not an exported package type.</p><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>showCancel</code></td><td>Whether to show the cancel button</td><td><code>boolean</code></td><td><code>true</code> (false for alert)</td></tr><tr><td><code>close</code></td><td>Close button position: 0 hidden, 1 inside (default), 2 at the corner</td><td><code>0</code> | <code>1</code> | <code>2</code></td><td><code>0</code></td></tr><tr><td><code>maskClosable</code></td><td>Whether clicking the overlay closes the dialog</td><td><code>boolean</code></td><td><code>true</code> (false for alert)</td></tr><tr><td><code>icon</code></td><td>Custom icon renderer</td><td><code>() =&gt; HTMLElement</code></td><td><code>-</code></td></tr><tr><td><code>placeholder</code></td><td>Input placeholder; prompt only</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table>`,19))])}}});export{q as __pageData,$ as default};
