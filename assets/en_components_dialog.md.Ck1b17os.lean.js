import{b as m,i as c,o as b,a as k}from"./chunks/browser.CpyXlELn.js";import{v as y,P as f,x,C as v,o as E,c as D,a2 as h,E as d,w as l,j as e,a as n}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"Dialog","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/dialog.md","filePath":"en/components/dialog.md","lastUpdated":1793253144000}'),C={name:"en/components/dialog.md"},T=Object.assign(C,{setup(q){let i={},r,s;function g(a){const o=a.target.getAttribute("data-id");i[o].open()}function u(a){const o=a.target.id;o==="d-alert"?DialogBox.alert("This is some content","Title").then(()=>{console.log("alert close")}):o==="d-confirm"?DialogBox.confirm("Save your changes?","Notice").then(p=>{console.log(p)}):o==="d-prompt"&&DialogBox.prompt("Command key","Command",{placeholder:"Enter a command"}).then(p=>{console.log(p)})}return y(()=>{f(()=>{Dialog&&(i.dialog=new Dialog({el:"#dialog",onAction:(a,t)=>{console.log(a),t()}}),i.dialog2=new Dialog({el:"#dialog2",onAction:(a,t)=>{t()}}),i.dialog3=new Dialog({el:"#dialog3",onAction:(a,t)=>{console.log(a),t()}}),i.dialog4=new Dialog({el:"#dialog4",onAction:(a,t)=>{if(a==="ok"){const o=document.querySelector("#dialog4 l-dialog-container");o.setAttribute("confirm-loading",""),setTimeout(()=>{o.removeAttribute("confirm-loading"),t()},1500)}else t()}}),r=m("l-button[data-id]"),c(r,a=>{b(a,"click",g)}),s=m("#d-alert, #d-confirm, #d-prompt"),c(s,a=>{b(a,"click",u)}))})}),x(()=>{{r&&c(r,a=>{k(a,"click",g)}),s&&(c(s,a=>{k(a,"click",u)}),s=void 0);for(const a in i)i[a].destroy();i={}}}),(a,t)=>{const o=v("ClientOnly");return E(),D("div",null,[t[5]||(t[5]=h("",8)),d(o,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog" >Show Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      console.log(action);
      done();
    }
  });
  dialog.open(); // Open the dialog.
  // On unmount, call dialog.destroy() to release listeners.
`)])],-1)])]),_:1}),t[6]||(t[6]=h("",3)),d(o,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog2" >Show Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>This is a dialog example.</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      done();
    }
  });
  dialog.open(); // Open the dialog.
  // On unmount, call dialog.destroy() to release listeners.
`)])],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"mobile-style",tabindex:"-1"},[n("Mobile Style "),e("a",{class:"header-anchor",href:"#mobile-style","aria-label":'Permalink to "Mobile Style"'},"​")],-1)),t[8]||(t[8]=e("p",null,[n("Set "),e("code",null,"mobile"),n(" on "),e("code",null,"l-dialog-container"),n(" for a mobile-style dialog with a centered title and evenly arranged footer buttons.")],-1)),d(o,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog3" >Mobile style</l-button>
  <dialog id="dialog3" vertical-align="middle">
    <l-dialog-container header="Notice" mobile >
      <div>This is a mobile-style dialog example.</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog" vertical-align="middle">
    <l-dialog-container header="Notice" mobile>
      <div>This is a mobile-style dialog example.</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      console.log(action);
      done();
    }
  });
  dialog.open(); // Open the dialog.
  // On unmount, call dialog.destroy() to release listeners.
`)])],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"asynchronous-closing",tabindex:"-1"},[n("Asynchronous Closing "),e("a",{class:"header-anchor",href:"#asynchronous-closing","aria-label":'Permalink to "Asynchronous Closing"'},"​")],-1)),t[10]||(t[10]=e("p",null,[n("Close the dialog asynchronously after confirmation, for example after submitting a form. Use "),e("code",null,"confirm-loading"),n(" for the confirmation button's loading state and handle the asynchronous operation in "),e("code",null,"onAction"),n(".")],-1)),d(o,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog4" >Asynchronous closing</l-button>
  <dialog id="dialog4">
    <l-dialog-container header="Asynchronous closing">
      <div>Dialog content</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="Asynchronous closing">
      <div>Dialog content</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      if (action === 'ok') {
        const $container = document.querySelector('#dialog l-dialog-container');
        // Enable confirmation button loading.
        $container.setAttribute('confirm-loading', '');
        // Simulate an asynchronous operation.
        setTimeout(() => {
          // Remove loading and close the dialog.
          $container.removeAttribute('confirm-loading');
          done();
        }, 1500);
      } else {
        done();
      }
    }
  });
  dialog.open();
  // On unmount, call dialog.destroy().
`)])],-1)])]),_:1}),t[11]||(t[11]=h("",4)),d(o,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="d-alert">alert</l-button>
  <l-button id="d-confirm">confirm</l-button>
  <l-button id="d-prompt">prompt</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"js"},`  import { DialogBox } from "litos-ui";
  // alert
  DialogBox.alert('This is some content', 'Title').then(() => {
    console.log("alert close")
  });
  // confirm
  DialogBox.confirm('Save your changes?', 'Notice').then((ok) => {
    console.log(ok);
  })
  // prompt
  DialogBox.prompt('Command key', 'Command', { placeholder: 'Enter a command' }).then((text) => {
    console.log(text);
  });
`)])],-1)])]),_:1}),t[12]||(t[12]=h("",51))])}}});export{P as __pageData,T as default};
