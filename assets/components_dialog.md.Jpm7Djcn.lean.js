import{b as p,i as d,o as h,a as u}from"./chunks/dom.BepTD04X.js";import{D as s}from"./chunks/index.BbYZ47QY.js";import{v as m,P as k,x as b,C as _,c as f,o as v,ag as r,G as c,w as g,j as n}from"./chunks/framework.BCyZWppQ.js";const T=JSON.parse('{"title":"Dialog 对话框","description":"","frontmatter":{},"headers":[],"relativePath":"components/dialog.md","filePath":"components/dialog.md","lastUpdated":1740415499000}'),x={name:"components/dialog.md"},q=Object.assign(x,{setup(y){let e={},i;function t(o){const l=o.target.getAttribute("data-id");e[l].open()}return m(()=>{k(()=>{e.dialog=s({el:"#dialog",onAction:(o,a)=>{console.log(o),a()}}),e.dialog2=s({el:"#dialog2"}),i=p("l-button[data-id]"),d(i,o=>{h(o,"click",t)})})}),b(()=>{if(i){d(i,o=>{u(o,"click",t)});for(const o in e)e[o].destroy();e={}}}),(o,a)=>{const l=_("ClientOnly");return v(),f("div",null,[a[2]||(a[2]=r("",7)),c(l,null,{default:g(()=>a[0]||(a[0]=[n("l-code-preview",null,[n("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog" >显示 Dialog</l-button>
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
`)])],-1)])),_:1}),a[3]||(a[3]=r("",3)),c(l,null,{default:g(()=>a[1]||(a[1]=[n("l-code-preview",null,[n("textarea",{lang:"html"},`  <l-button type="primary" data-id="dialog2" >显示 Dialog</l-button>
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
`)])],-1)])),_:1})])}}});export{T as __pageData,q as default};
