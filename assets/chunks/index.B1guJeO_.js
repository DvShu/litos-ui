var w=Object.defineProperty;var z=(e,s,t)=>s in e?w(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var d=(e,s,t)=>z(e,typeof s!="symbol"?s+"":s,t);import{r as $,u as b}from"./index.BlcR5lE1.js";import{t as h}from"./dom.CBY_V37t.js";import{a as m,I as v}from"./info.7dcC2p4v.js";class p extends m{constructor(){super(),this.viewBox="0 0 24 24"}renderChildren(){return'<path fill="currentColor" d="M12 23a11 11 0 100-22 11 11 0 000 22zM8.82 7.4L12 10.6l3.18-3.19 1.42 1.42L13.4 12l3.19 3.18-1.42 1.42L12 13.4 8.82 16.6 7.4 15.18 10.6 12 7.4 8.82 8.82 7.4z"></path>'}}d(p,"baseName","mask-close-icon");class g extends m{connectedCallback(){super.connectedCallback()}renderChildren(){return'<path fill="currentColor" d="M512 0C228.693333 0 0 228.693333 0 512s228.693333 512 512 512 512-228.693333 512-512S795.306667 0 512 0z m307.2 368.64L467.626667 730.453333c0 3.413333-3.413333 3.413333-3.413334 6.826667-13.653333 13.653333-37.546667 13.653333-51.2 0l-177.493333-177.493333c-13.653333-13.653333-13.653333-37.546667 0-51.2 13.653333-13.653333 37.546667-13.653333 51.2 0l150.186667 153.6 334.506666-341.333334c13.653333-13.653333 37.546667-13.653333 51.2 0 10.24 10.24 10.24 34.133333-3.413333 47.786667z m0 0"></path>'}}d(g,"baseName","success-icon");class y extends m{connectedCallback(){super.connectedCallback()}renderChildren(){return'<path fill="currentColor" d="M512 1024C229.234 1024 0 794.766 0 512S229.234 0 512 0s512 229.234 512 512-229.234 512-512 512z m-64.853-734.52l19.484 244.906 1.309 16.156c1.251 15.93 15.018 28.644 30.72 28.644h25.571c15.56 0 29.298-12.601 30.663-28.132l1.422-16.668 21.334-244.907c3.214-36.978-24.434-66.844-61.725-66.844h-6.627c-37.462 0-65.138 29.923-62.18 66.844zM512 801.393a66.788 66.788 0 1 0 0-133.575 66.788 66.788 0 0 0 0 133.575z"></path>'}}d(y,"baseName","warn-icon");const a=[],C=[["opacity","0","0.3s"],["transform","translate3d(-50%, -100%, 0)","0.3s"]];let u=!0;function x(e){const s=a.findIndex(r=>r.id===e);if(s===-1)return;const t=a.splice(s,1)[0];if(t==null)return;h(t,C,"leave",()=>{t.remove()});const c=15+t.offsetHeight,n=a.length;if(n!==0)for(let r=s;r<n;r++){const l=a[r],f=parseInt(l.style.top,10)-c;l.style.setProperty("top",`${f}px`)}}function M(e){const s=document.createElement("div");s.id=e.id;const t=e.type||"info";let c=`l-message l-message-${t}`;e.customClass&&(c+=" "+e.customClass),s.className=c,s.style.setProperty("top",`${e.offset}px`),s.style.setProperty("z-index",`${e.zindex||1e3}`),e.width&&s.style.setProperty("width",e.width);let n=t;return n==="error"&&(n="mask-close"),s.innerHTML=['<div class="l-message-container">',`<l-${n}-icon class="l-message-icon"></l-${n}-icon>`,`<span class="l-message-content">${e.message}</span>`,"</div>"].join(""),s}const o=e=>{u&&($([p,g,y,v]),u=!1);const s=a.reduce((l,f)=>l+f.offsetHeight+15,15),t=b(),c=typeof e=="string"?{message:e}:e;c.id=t,c.offset=s;const n=M(c);a.push(n),document.body.appendChild(n),h(n,C,"enter");let r=c.duration;return r==null&&(r=3e3),r!==0&&setTimeout(()=>{x(t)},r),t};function i(e,s="info"){const t=typeof e=="string"?{message:e}:e;return t.type||(t.type=s),o(t)}o.info=e=>i(e,"info");o.success=e=>i(e,"success");o.error=e=>i(e,"error");o.warn=e=>i(e,"warn");o.show=e=>i(e);o.close=x;export{o as M,g as S,y as W};
