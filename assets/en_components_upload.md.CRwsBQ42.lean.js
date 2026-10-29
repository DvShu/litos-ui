import{e as P,i as w}from"./chunks/browser.CpyXlELn.js";import{v as T,P as U,x as C,C as I,o as A,c as S,a2 as g,E as l,w as c,j as t,a as d}from"./chunks/framework.nU6eqUhJ.js";const _=JSON.parse('{"title":"Upload","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/upload.md","filePath":"en/components/upload.md","lastUpdated":1793253144000}'),D={name:"en/components/upload.md"},O=Object.assign(D,{setup(L){let h,o,p,b,n,m=!1;function E(s){var a;if((s==null?void 0:s.status)!=="success"||typeof((a=s==null?void 0:s.data)==null?void 0:a.url)!="string")throw new Error("The upload response does not contain a valid file URL");const e=new URL(s.data.url);if(e.origin!=="http://127.0.0.1:3001"||e.username||e.password)throw new Error("The file URL is not from the allowed local upload service");return e.href}async function f({body:s,headers:e,signal:a,onProgress:r}){a.throwIfAborted();let i=0,u;const k=()=>{clearInterval(u)};try{r(i),u=setInterval(()=>{i=Math.min(i+10,90),r(i)},150),a.addEventListener("abort",k,{once:!0});const y=await fetch("http://127.0.0.1:3001/upload",{method:"POST",body:s,headers:e,signal:a}),q=await y.text(),F=JSON.parse(q);return a.throwIfAborted(),y.ok&&r(100),{response:F,responseText:q,status:y.status}}finally{k(),a.removeEventListener("abort",k)}}function R(s){s.fileList=[{id:"first",url:"http://127.0.0.1:3001/files/3b315d19-d97b-47a9-96bf-724a9aa9da11.jpeg",status:"uploading",percentage:0},{id:"second",url:"http://127.0.0.1:3001/files/5a710bd6-c7e5-4b7b-8e99-5a37ccf92efd",status:"ready"}];const e=(r,i)=>{s.fileList=s.fileList.map(u=>u.id===r?{...u,...i}:u)},a=[setTimeout(()=>e("first",{percentage:50}),2e3),setTimeout(()=>{e("first",{status:"success",percentage:100}),e("second",{status:"uploading",percentage:0})},3e3),setTimeout(()=>e("second",{status:"fail"}),5e3)];return()=>a.forEach(clearTimeout)}function v(){if(m)return;const s=document.getElementById("upload-external-file-list");if(s===b||(n==null||n(),n=void 0,b=s,!s))return;let e;const a=new IntersectionObserver(r=>{r.some(i=>i.isIntersecting)&&(a.disconnect(),!m&&b===s&&!e&&(e=R(s)))});a.observe(s),n=()=>{a.disconnect(),e==null||e()}}function x(){if(m)return;const s=document.getElementById("upload-custom-request");s!==o&&(o&&(o.abort(),o.customRequest===f&&(o.customRequest=void 0)),o=s,o&&(o.customRequest=f))}return T(async()=>{await Promise.all([customElements.whenDefined("l-upload"),customElements.whenDefined("l-code-preview")]),await U(),!m&&(p=new MutationObserver(()=>{x(),v()}),p.observe(document.body,{childList:!0,subtree:!0}),x(),v(),h=P("l-upload[data-response-parser=local]"),w(h,s=>{s.parseResponse=E}))}),C(()=>{m=!0,n==null||n(),n=void 0,b=void 0,p==null||p.disconnect(),p=void 0,o&&(o.abort(),o.customRequest===f&&(o.customRequest=void 0),o=void 0),h&&(w(h,s=>{s.abort(),s.parseResponse===E&&(s.parseResponse=void 0)}),h=void 0)}),(s,e)=>{const a=I("ClientOnly");return A(),S("div",null,[e[7]||(e[7]=g("",10)),l(a,null,{default:c(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload action="http://127.0.0.1:3001/upload" accept=".txt,.md,.json">
    <l-button type="primary">Select files</l-button>
    <span slot="tip">Please upload text files</span>
  </l-upload>
`)],-1)])]),_:1}),e[8]||(e[8]=t("h3",{id:"image-upload",tabindex:"-1"},[d("Image Upload "),t("a",{class:"header-anchor",href:"#image-upload","aria-label":'Permalink to "Image Upload"'},"​")],-1)),e[9]||(e[9]=t("p",null,[d("Set "),t("code",null,'list-type="picture"'),d(" and "),t("code",null,'accept="image/*"'),d(".")],-1)),l(a,null,{default:c(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
  </l-upload>
`)],-1)])]),_:1}),e[10]||(e[10]=t("h3",{id:"picture-card-gallery",tabindex:"-1"},[d("Picture Card Gallery "),t("a",{class:"header-anchor",href:"#picture-card-gallery","aria-label":'Permalink to "Picture Card Gallery"'},"​")],-1)),e[11]||(e[11]=t("p",null,[d("Set "),t("code",null,'list-type="picture-card"'),d(" to display a gallery of images. Add "),t("code",null,"multiple"),d(" to allow selecting several files at once.")],-1)),l(a,null,{default:c(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload list-type="picture-card" accept="image/*" drag multiple max-count="4" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
    <span slot="tip">Upload up to 4 images</span>
  </l-upload>
`)],-1)])]),_:1}),e[12]||(e[12]=t("h3",{id:"custom-response-parsing",tabindex:"-1"},[d("Custom Response Parsing "),t("a",{class:"header-anchor",href:"#custom-response-parsing","aria-label":'Permalink to "Custom Response Parsing"'},"​")],-1)),e[13]||(e[13]=t("p",null,[d("Set the JavaScript property "),t("code",null,"parseResponse"),d(" to provide a response parser.")],-1)),l(a,null,{default:c(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload" data-response-parser="local">
    <l-plus-icon></l-plus-icon>
  </l-upload>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`<l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload" data-response-parser="local">
  <l-plus-icon></l-plus-icon>
</l-upload>
`),t("textarea",{lang:"js"},`function parseLocalUploadResponse(response) {
  if (response?.status !== "success" || typeof response?.data?.url !== "string") {
    throw new Error("The upload response does not contain a valid file URL");
  }
  const url = new URL(response.data.url);
  if (url.origin !== "http://127.0.0.1:3001" || url.username || url.password) {
    throw new Error("The file URL is not from the allowed local upload service");
  }
  return url.href;
}
//-
const upload = document.querySelector("l-upload[data-response-parser=local]");
upload.parseResponse = parseLocalUploadResponse;
`)])],-1)])]),_:1}),e[14]||(e[14]=g("",4)),l(a,null,{default:c(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload id="upload-custom-request" accept="image/*" list-type="picture">
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
    // Simulated progress for this example only; it does not measure bytes uploaded by fetch.
    onProgress(percent);
    timer = setInterval(() => {
      percent = Math.min(percent + 10, 90);
      onProgress(percent);
    }, 150);
    signal.addEventListener("abort", stopProgress, { once: true });
    // The component has already added the file and extra fields to body.
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
`)])],-1)])]),_:1}),e[15]||(e[15]=g("",2)),l(a,null,{default:c(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload id="upload-external-file-list" list-type="picture-card" auto-upload="false" max-count="2">
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
  // Call when the page unmounts or the example is rebuilt to stop further updates.
  return () => timers.forEach(clearTimeout);
}
//-
const cleanup = demoFileList(document.querySelector("#upload-external-file-list"));
// Call cleanup() when the page unmounts.
`)])],-1)])]),_:1}),e[16]||(e[16]=t("h3",{id:"disabled-state",tabindex:"-1"},[d("Disabled State "),t("a",{class:"header-anchor",href:"#disabled-state","aria-label":'Permalink to "Disabled State"'},"​")],-1)),e[17]||(e[17]=t("p",null,[d("Use "),t("code",null,"disabled"),d(" to control the component's disabled state.")],-1)),l(a,null,{default:c(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-upload action="http://127.0.0.1:3001/upload" disabled>
    <l-button type="primary" disabled>Select files</l-button>
  </l-upload>
`)],-1)])]),_:1}),e[18]||(e[18]=g("",38))])}}});export{_ as __pageData,O as default};
