import{b,i as c,o as k,a as m}from"./chunks/browser.7zTvUqO3.js";import{v as E,P as x,x as y,C as q,o as v,c as f,a2 as p,E as l,w as s,j as a,a as i}from"./chunks/framework.nU6eqUhJ.js";const F=JSON.parse('{"title":"Dialog 对话框","description":"","frontmatter":{},"headers":[],"relativePath":"components/dialog.md","filePath":"components/dialog.md","lastUpdated":1793253144000}'),D={name:"components/dialog.md"},B=Object.assign(D,{setup(C){let d={},r,n;function g(e){const o=e.target.getAttribute("data-id");d[o].open()}function u(e){const o=e.target.id;o==="d-alert"?DialogBox.alert("这是一段内容","标题").then(()=>{console.log("alert close")}):o==="d-confirm"?DialogBox.confirm("确定要保存更改？","提示").then(h=>{console.log(h)}):o==="d-prompt"&&DialogBox.prompt("指令密钥","指令",{placeholder:"请输入指令"}).then(h=>{console.log(h)})}return E(()=>{x(()=>{Dialog&&(d.dialog=new Dialog({el:"#dialog",onAction:(e,t)=>{console.log(e),t()}}),d.dialog2=new Dialog({el:"#dialog2",onAction:(e,t)=>{t()}}),d.dialog3=new Dialog({el:"#dialog3",onAction:(e,t)=>{console.log(e),t()}}),d.dialog4=new Dialog({el:"#dialog4",onAction:(e,t)=>{if(e==="ok"){const o=document.querySelector("#dialog4 l-dialog-container");o.setAttribute("confirm-loading",""),setTimeout(()=>{o.removeAttribute("confirm-loading"),t()},1500)}else t()}}),r=b("l-button[data-id]"),c(r,e=>{k(e,"click",g)}),n=b("#d-alert, #d-confirm, #d-prompt"),c(n,e=>{k(e,"click",u)}))})}),y(()=>{{r&&c(r,e=>{m(e,"click",g)}),n&&(c(n,e=>{m(e,"click",u)}),n=void 0);for(const e in d)d[e].destroy();d={}}}),(e,t)=>{const o=q("ClientOnly");return v(),f("div",null,[t[5]||(t[5]=p("",7)),l(o,null,{default:s(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog" >显示 Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),a("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      console.log(action);
      done();
    }
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),t[6]||(t[6]=p("",3)),l(o,null,{default:s(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog2" >显示 Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),a("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      done();
    }
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),t[7]||(t[7]=a("h3",{id:"移动端风格",tabindex:"-1"},[i("移动端风格 "),a("a",{class:"header-anchor",href:"#移动端风格","aria-label":'Permalink to "移动端风格"'},"​")],-1)),t[8]||(t[8]=a("p",null,[i("通过在 "),a("code",null,"l-dialog-container"),i(" 上设置 "),a("code",null,"mobile"),i(" 属性，可切换为移动端风格的对话框。移动端风格下，标题居中显示，底部按钮平铺排列。")],-1)),l(o,null,{default:s(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog3" >移动端风格</l-button>
  <dialog id="dialog3" vertical-align="middle">
    <l-dialog-container header="提示" mobile >
      <div>这是一个移动端风格对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <dialog id="dialog" vertical-align="middle">
    <l-dialog-container header="提示" mobile>
      <div>这是一个移动端风格对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),a("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      console.log(action);
      done();
    }
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),t[9]||(t[9]=a("h3",{id:"异步关闭",tabindex:"-1"},[i("异步关闭 "),a("a",{class:"header-anchor",href:"#异步关闭","aria-label":'Permalink to "异步关闭"'},"​")],-1)),t[10]||(t[10]=a("p",null,[i("点击确定后异步关闭对话框，例如提交表单。通过 "),a("code",null,"confirm-loading"),i(" 属性设置确定按钮的加载状态，配合 "),a("code",null,"onAction"),i(" 回调实现异步操作。")],-1)),l(o,null,{default:s(()=>[...t[3]||(t[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog4" >异步关闭</l-button>
  <dialog id="dialog4">
    <l-dialog-container header="异步关闭">
      <div>对话框内容</div>
    </l-dialog-container>
  </dialog>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="异步关闭">
      <div>对话框内容</div>
    </l-dialog-container>
  </dialog>
`),a("textarea",{lang:"js"},`  const dialog = new Dialog({
    el: '#dialog',
    onAction: (action, done) => {
      if (action === 'ok') {
        const $container = document.querySelector('#dialog l-dialog-container');
        // 设置确定按钮 loading
        $container.setAttribute('confirm-loading', '');
        // 模拟异步操作
        setTimeout(() => {
          // 移除 loading 并关闭弹窗
          $container.removeAttribute('confirm-loading');
          done();
        }, 1500);
      } else {
        done();
      }
    }
  });
  dialog.open();
  // 在页面结束时调用 dialog.destroy() 销毁弹窗
`)])],-1)])]),_:1}),t[11]||(t[11]=p("",4)),l(o,null,{default:s(()=>[...t[4]||(t[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="d-alert">alert</l-button>
  <l-button id="d-confirm">confirm</l-button>
  <l-button id="d-prompt">prompt</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"js"},`  import { DialogBox } from "litos-ui";
  // alert
  DialogBox.alert('这是一段内容', '标题').then(() => {
    console.log("alert close")
  });
  // confirm
  DialogBox.confirm('确定要保存更改？', '提示').then((ok) => {
    console.log(ok);
  })
  // prompt
  DialogBox.prompt('指令密钥', '指令', { placeholder: '请输入指令' }).then((text) => {
    console.log(text);
  });
`)])],-1)])]),_:1}),t[12]||(t[12]=p("",51))])}}});export{F as __pageData,B as default};
