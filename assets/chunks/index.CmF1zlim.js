var m=Object.defineProperty;var p=(t,e,l)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[e]=l;var r=(t,e,l)=>p(t,typeof e!="symbol"?e+"":e,l);import{$ as u,i as g,h as k,b as v,g as c,c as d}from"./dom.CBY_V37t.js";function b(t,e){if(k(t,"l-loading"))return;let l;if(e.fullscreen&&(l=v("#l-loading-mask"),l!=null))return;c(t,"l-loading"),l=d("div",{class:"l-loading-mask"}),e.background&&(l.style.backgroundColor=e.background);const s=d("div",{class:"l-loading-spinner"});if(e.bar)c(l,"l-loading-bar");else{const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 50 50"),n.classList.add("circle");const a=document.createElementNS("http://www.w3.org/2000/svg","circle");if(a.classList.add("path"),a.setAttribute("cx","25"),a.setAttribute("cy","25"),a.setAttribute("r","23"),a.setAttribute("fill","none"),n.appendChild(a),s.appendChild(n),e.text){const i=d("p",{class:"l-loading-text",textContent:e.text});s.appendChild(i)}}if(e.fullscreen){const n=["l-loading-fullscreen"];e.lock&&n.push("l-loading-lock"),t.classList.add(...n),l.id="l-loading-mask"}l.appendChild(s),t.appendChild(l),setTimeout(()=>{e.bar?c(l,"l-loading-bar--start"):l.style.opacity="1"},10)}function h(t,e){const l=e.fullscreen?"#":".",s=u(`${l}l-loading-mask`,t);g(s,n=>{function a(){const f=["l-loading-bar--start","l-loading-bar--finish"];t.tagName==="BODY"&&f.push("l-loading","l-loading-fullscreen","l-loading-lock"),t.classList.remove(...f),n!=null&&t.contains(n)&&(t.removeChild(n),n=void 0)}let i=-1;n.addEventListener("transitionend",()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>{a()})},{once:!0}),e.bar?t.classList.add("l-loading-bar--finish"):n.style.opacity="0",setTimeout(()=>{a()},500)})}class x{constructor(e){r(this,"el");r(this,"option");this.option={fullscreen:!0,lock:!0,bar:!1,text:"加载中……",background:"",...e};const l=(e||{}).to;let s=null;l!=null&&(typeof l=="string"?s=document.querySelector(l):s=l),(s==null||this.option.fullscreen)&&(s=document.body),this.el=s,this.show()}show(){b(this.el,this.option)}hide(){h(this.el,this.option)}}function o(t){const e=t.getAttribute("l-loading-text"),l=t.getAttribute("l-loading-lock");return{background:t.getAttribute("l-loading-background"),text:e?e==="0"||e==="false"?void 0:e:"加载中……",fullscreen:t.hasAttribute("l-loading-fullscreen"),lock:!(l==="0"||l==="false"),bar:t.hasAttribute("l-loading-bar")}}const C={create(t){return new x(t)},init(t){const e=t?`[l-loading="${t}"]`:"[l-loading]",l=u(e);g(l,s=>{const n=o(s);b(n.fullscreen?document.body:s,o(s))})},close(t){const e=t?`[l-loading="${t}"]`:"[l-loading]",l=u(e);g(l,s=>{const n=o(s);h(n.fullscreen?document.body:s,o(s))})}};export{C as L};
