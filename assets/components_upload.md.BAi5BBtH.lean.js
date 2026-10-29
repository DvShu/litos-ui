import{e as w,i as F}from"./chunks/browser.CpyXlELn.js";import{v as I,P as C,x as T,C as A,o as U,c as S,a2 as m,E as r,w as c,j as t,a as o}from"./chunks/framework.nU6eqUhJ.js";const O=JSON.parse('{"title":"Upload 上传","description":"","frontmatter":{},"headers":[],"relativePath":"components/upload.md","filePath":"components/upload.md","lastUpdated":1793253144000}'),D={name:"components/upload.md"},j=Object.assign(D,{setup(L){let h,a,p,k,n,b=!1;function y(d){var s;if((d==null?void 0:d.status)!=="success"||typeof((s=d==null?void 0:d.data)==null?void 0:s.url)!="string")throw new Error("上传响应缺少有效的文件地址");const e=new URL(d.data.url);if(e.origin!=="http://127.0.0.1:3001"||e.username||e.password)throw new Error("文件地址不是允许的本地上传服务地址");return e.href}async function g({body:d,headers:e,signal:s,onProgress:l}){s.throwIfAborted();let i=0,u;const E=()=>{clearInterval(u)};try{l(i),u=setInterval(()=>{i=Math.min(i+10,90),l(i)},150),s.addEventListener("abort",E,{once:!0});const f=await fetch("http://127.0.0.1:3001/upload",{method:"POST",body:d,headers:e,signal:s}),v=await f.text(),R=JSON.parse(v);return s.throwIfAborted(),f.ok&&l(100),{response:R,responseText:v,status:f.status}}finally{E(),s.removeEventListener("abort",E)}}function P(d){d.fileList=[{id:"first",url:"http://127.0.0.1:3001/files/3b315d19-d97b-47a9-96bf-724a9aa9da11.jpeg",status:"uploading",percentage:0},{id:"second",url:"http://127.0.0.1:3001/files/5a710bd6-c7e5-4b7b-8e99-5a37ccf92efd",status:"ready"}];const e=(l,i)=>{d.fileList=d.fileList.map(u=>u.id===l?{...u,...i}:u)},s=[setTimeout(()=>e("first",{percentage:50}),2e3),setTimeout(()=>{e("first",{status:"success",percentage:100}),e("second",{status:"uploading",percentage:0})},3e3),setTimeout(()=>e("second",{status:"fail"}),5e3)];return()=>s.forEach(clearTimeout)}function q(){if(b)return;const d=document.getElementById("upload-external-file-list");if(d===k||(n==null||n(),n=void 0,k=d,!d))return;let e;const s=new IntersectionObserver(l=>{l.some(i=>i.isIntersecting)&&(s.disconnect(),!b&&k===d&&!e&&(e=P(d)))});s.observe(d),n=()=>{s.disconnect(),e==null||e()}}function x(){if(b)return;const d=document.getElementById("upload-custom-request");d!==a&&(a&&(a.abort(),a.customRequest===g&&(a.customRequest=void 0)),a=d,a&&(a.customRequest=g))}return I(async()=>{await Promise.all([customElements.whenDefined("l-upload"),customElements.whenDefined("l-code-preview")]),await C(),!b&&(p=new MutationObserver(()=>{x(),q()}),p.observe(document.body,{childList:!0,subtree:!0}),x(),q(),h=w("l-upload[data-response-parser=local]"),F(h,d=>{d.parseResponse=y}))}),T(()=>{b=!0,n==null||n(),n=void 0,k=void 0,p==null||p.disconnect(),p=void 0,a&&(a.abort(),a.customRequest===g&&(a.customRequest=void 0),a=void 0),h&&(F(h,d=>{d.abort(),d.parseResponse===y&&(d.parseResponse=void 0)}),h=void 0)}),(d,e)=>{const s=A("ClientOnly");return U(),S("div",null,[e[7]||(e[7]=m("",9)),r(s,null,{default:c(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload action="http://127.0.0.1:3001/upload" accept=".txt,.md,.json">
    <l-button type="primary">选择文件</l-button>
    <span slot="tip">请上传 text 文件</span>
  </l-upload>
`)],-1)])]),_:1}),e[8]||(e[8]=t("h3",{id:"图片上传",tabindex:"-1"},[o("图片上传 "),t("a",{class:"header-anchor",href:"#图片上传","aria-label":'Permalink to "图片上传"'},"​")],-1)),e[9]||(e[9]=t("p",null,[o("设置 "),t("code",null,'list-type="picture"'),o(" 以及 "),t("code",null,'accept="image/*"')],-1)),r(s,null,{default:c(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
  </l-upload>
`)],-1)])]),_:1}),e[10]||(e[10]=t("h3",{id:"照片墙",tabindex:"-1"},[o("照片墙 "),t("a",{class:"header-anchor",href:"#照片墙","aria-label":'Permalink to "照片墙"'},"​")],-1)),e[11]||(e[11]=t("p",null,[o("设置 "),t("code",null,'list-type="picture-card"'),o(" 展示多图照片墙，"),t("code",null,"multiple"),o(" 允许一次选择多张。")],-1)),r(s,null,{default:c(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload list-type="picture-card" accept="image/*" drag multiple max-count="4" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
    <span slot="tip">最多上传 4 张图片</span>
  </l-upload>
`)],-1)])]),_:1}),e[12]||(e[12]=t("h3",{id:"自定义响应解析",tabindex:"-1"},[o("自定义响应解析 "),t("a",{class:"header-anchor",href:"#自定义响应解析","aria-label":'Permalink to "自定义响应解析"'},"​")],-1)),e[13]||(e[13]=t("p",null,[o("通过 JavaScript 实例属性 "),t("code",null,"parseResponse"),o(" 设置解析函数；")],-1)),r(s,null,{default:c(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload" data-response-parser="local">
    <l-plus-icon></l-plus-icon>
  </l-upload>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`<l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload" data-response-parser="local">
  <l-plus-icon></l-plus-icon>
</l-upload>
`),t("textarea",{lang:"js"},`function parseLocalUploadResponse(response) {
  if (response?.status !== "success" || typeof response?.data?.url !== "string") {
    throw new Error("上传响应缺少有效的文件地址");
  }
  const url = new URL(response.data.url);
  if (url.origin !== "http://127.0.0.1:3001" || url.username || url.password) {
    throw new Error("文件地址不是允许的本地上传服务地址");
  }
  return url.href;
}
//-
const upload = document.querySelector("l-upload[data-response-parser=local]");
upload.parseResponse = parseLocalUploadResponse;
`)])],-1)])]),_:1}),e[14]||(e[14]=m("",4)),r(s,null,{default:c(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload id="upload-custom-request" accept="image/*" list-type="picture">
    <l-plus-icon></l-plus-icon>
  </l-upload>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`<l-upload id="upload-custom-request" accept="image/*" list-type="picture">
  <l-plus-icon></l-plus-icon>
</l-upload>
`),t("textarea",{lang:"js"},`async function demoCustomRequest({ body, headers, signal, onProgress }) {
  signal.throwIfAborted();
  let percent = 0;
  let timer;
  const stopProgress = () => { clearInterval(timer); };
  try {
    // 仅用于演示的模拟进度，不代表 fetch 实际上传的字节进度。
    onProgress(percent);
    timer = setInterval(() => {
      percent = Math.min(percent + 10, 90);
      onProgress(percent);
    }, 150);
    signal.addEventListener("abort", stopProgress, { once: true });
    // body 已由组件装入 file 文件及附加字段，无需再次 append 文件。
    const result = await fetch("http://127.0.0.1:3001/upload", {
      method: "POST", body, headers, signal,
    });
    const responseText = await result.text();
    const response = JSON.parse(responseText);
    signal.throwIfAborted();
    if (result.ok) onProgress(100);
    return { response, responseText, status: result.status };
  } finally {
    stopProgress();
    signal.removeEventListener("abort", stopProgress);
  }
}
//-
const upload = document.querySelector("#upload-custom-request");
upload.customRequest = demoCustomRequest;
`)])],-1)])]),_:1}),e[15]||(e[15]=m("",2)),r(s,null,{default:c(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload id="upload-external-file-list" list-type="picture-card" auto-upload="false" max-count="2">
    <l-plus-icon></l-plus-icon>
  </l-upload>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`<l-upload id="upload-external-file-list" list-type="picture-card" auto-upload="false" max-count="2">
  <l-plus-icon></l-plus-icon>
</l-upload>
`),t("textarea",{lang:"js"},`function demoFileList(upload) {
  upload.fileList = [
    { id: "first", url: "http://127.0.0.1:3001/files/3b315d19-d97b-47a9-96bf-724a9aa9da11.jpeg", status: "uploading", percentage: 0 },
    { id: "second", url: "http://127.0.0.1:3001/files/5a710bd6-c7e5-4b7b-8e99-5a37ccf92efd", status: "ready" },
  ];
  const patch = (id, changes) => {
    upload.fileList = upload.fileList.map((file) => file.id === id ? { ...file, ...changes } : file);
  };
  const timers = [
    setTimeout(() => patch("first", { percentage: 50 }), 2000),
    setTimeout(() => {
      patch("first", { status: "success", percentage: 100 });
      patch("second", { status: "uploading", percentage: 0 });
    }, 3000),
    setTimeout(() => patch("second", { status: "fail" }), 5000),
  ];
  // 页面卸载或演示容器重建时调用，停止后续更新。
  return () => timers.forEach(clearTimeout);
}
//-
const cleanup = demoFileList(document.querySelector("#upload-external-file-list"));
// 页面卸载时调用 cleanup()。
`)])],-1)])]),_:1}),e[16]||(e[16]=t("h3",{id:"禁用状态",tabindex:"-1"},[o("禁用状态 "),t("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),e[17]||(e[17]=t("p",null,[o("使用 "),t("code",null,"disabled"),o(" 控制上传组件禁用状态。")],-1)),r(s,null,{default:c(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload action="http://127.0.0.1:3001/upload" disabled>
    <l-button type="primary" disabled>选择文件</l-button>
  </l-upload>
`)],-1)])]),_:1}),e[18]||(e[18]=m("",38))])}}});export{O as __pageData,j as default};
