const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.DT3Ul6K9.js","assets/chunks/browser.Chubywy5.js","assets/chunks/dialog_box.DCKszwAs.js","assets/chunks/info.BgTfn2LJ.js","assets/chunks/index.B_dLCkhl.js","assets/chunks/index.CuJgq1IQ.js"])))=>i.map(i=>d[i]);
import{a3 as q,v as D,P as C,x as A,C as _,o as F,c as P,a2 as g,E as s,w as r,j as e,a as d,V as y}from"./chunks/framework.CiKxQFaU.js";import{b as x,i as k,o as v,a as f}from"./chunks/browser.Chubywy5.js";const I=JSON.parse('{"title":"Dialog 对话框","description":"","frontmatter":{},"headers":[],"relativePath":"components/dialog.md","filePath":"components/dialog.md","lastUpdated":1787672332000}'),B={name:"components/dialog.md"},V=Object.assign(B,{async setup(w){let c,b,n,h;{const[a,t]=([c,b]=q(()=>Promise.all([y(()=>import("./chunks/index.DT3Ul6K9.js"),__vite__mapDeps([0,1])),y(()=>import("./chunks/dialog_box.DCKszwAs.js").then(o=>o.a),__vite__mapDeps([2,0,1,3,4,5]))])),c=await c,b(),c);n=a.default,h=t.default}let i={},p,l;function m(a){const o=a.target.getAttribute("data-id");i[o].open()}function E(a){const o=a.target.id;o==="d-alert"?h.alert("这是一段内容","标题").then(()=>{console.log("alert close")}):o==="d-confirm"?h.confirm("确定要保存更改？","提示").then(u=>{console.log(u)}):o==="d-prompt"&&h.prompt("指令密钥","指令",{placeholder:"请输入指令"}).then(u=>{console.log(u)})}return D(()=>{C(()=>{i.dialog=new n({el:"#dialog",onAction:(a,t)=>{console.log(a),t()}}),i.dialog2=new n({el:"#dialog2"}),i.dialog3=new n({el:"#dialog3",onAction:(a,t)=>{console.log(a),t()}}),i.dialog4=new n({el:"#dialog4",onAction:(a,t)=>{if(a==="ok"){const o=document.querySelector("#dialog4 l-dialog-container");o.setAttribute("confirm-loading",""),setTimeout(()=>{o.removeAttribute("confirm-loading"),t()},1500)}else t()}}),p=x("l-button[data-id]"),k(p,a=>{v(a,"click",m)}),l=x("#d-alert, #d-confirm, #d-prompt"),k(l,a=>{v(a,"click",E)})})}),A(()=>{{p&&k(p,a=>{f(a,"click",m)}),l&&(k(l,a=>{f(a,"click",E)}),l=void 0);for(const a in i)i[a].destroy();i={}}}),(a,t)=>{const o=_("ClientOnly");return F(),P("div",null,[t[5]||(t[5]=g("",7)),s(o,null,{default:r(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog" >显示 Dialog</l-button>
  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="Title">
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({ 
    el: '#dialog', 
    onAction: (action, done) => {
      console.log(action);
      done();
    } 
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),t[6]||(t[6]=g("",3)),s(o,null,{default:r(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog2" >显示 Dialog</l-button>
  <dialog id="dialog2" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog" width="300px">
    <l-dialog-container>
      <l-info-icon slot="header"></l-info-icon>
      <span slot="header">Header</span>
      <div>这是一个对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({ el: '#dialog' });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"移动端风格",tabindex:"-1"},[d("移动端风格 "),e("a",{class:"header-anchor",href:"#移动端风格","aria-label":'Permalink to "移动端风格"'},"​")],-1)),t[8]||(t[8]=e("p",null,[d("通过在 "),e("code",null,"l-dialog-container"),d(" 上设置 "),e("code",null,"mobile"),d(" 属性，可切换为移动端风格的对话框。移动端风格下，标题居中显示，底部按钮平铺排列。")],-1)),s(o,null,{default:r(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog3" >移动端风格</l-button>
  <dialog id="dialog3" vertical-align="middle">
    <l-dialog-container header="提示" mobile >
      <div>这是一个移动端风格对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog" vertical-align="middle">
    <l-dialog-container header="提示" mobile>
      <div>这是一个移动端风格对话框示例。</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({ 
    el: '#dialog', 
    onAction: (action, done) => {
      console.log(action);
      done();
    } 
  });
  dialog.open(); // 打开弹窗
  // 在页面结束时 onUnmounted 中调用 dialog.destroy() 方法销毁弹窗
`)])],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"异步关闭",tabindex:"-1"},[d("异步关闭 "),e("a",{class:"header-anchor",href:"#异步关闭","aria-label":'Permalink to "异步关闭"'},"​")],-1)),t[10]||(t[10]=e("p",null,[d("点击确定后异步关闭对话框，例如提交表单。通过 "),e("code",null,"confirm-loading"),d(" 属性设置确定按钮的加载状态，配合 "),e("code",null,"onAction"),d(" 回调实现异步操作。")],-1)),s(o,null,{default:r(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog4" >异步关闭</l-button>
  <dialog id="dialog4">
    <l-dialog-container header="异步关闭">
      <div>对话框内容</div>
    </l-dialog-container>
  </dialog>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <dialog id="dialog">
    <l-dialog-container header="异步关闭">
      <div>对话框内容</div>
    </l-dialog-container>
  </dialog>
`),e("textarea",{lang:"js"},`  const dialog = new Dialog({ 
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
`)])],-1)])]),_:1}),t[11]||(t[11]=g("",4)),s(o,null,{default:r(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="d-alert">alert</l-button>
  <l-button id="d-confirm">confirm</l-button>
  <l-button id="d-prompt">prompt</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"js"},`  import { DialogBox } from "litos-ui";
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
`)])],-1)])]),_:1}),t[12]||(t[12]=g("",42))])}}});export{I as __pageData,V as default};
