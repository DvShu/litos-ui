import{$ as u,o as k,a as v}from"./chunks/browser.CpyXlELn.js";import{v as x,P as y,x as E,C as q,o as _,c as F,a2 as b,E as g,w as f,j as e,a as h}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"List","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/list.md","filePath":"en/components/list.md","lastUpdated":1793253144000}'),C={name:"en/components/list.md"},T=Object.assign(C,{setup(A){let a,l,i=0,d=20,p=10;function c(){setTimeout(()=>{if(a&&i<d){let s=!1,t=i+p;i+p>=d&&(s=!0,t=d),a.append(m(i,t)),a.removeAttribute("loading"),s?a.setAttribute("finish","finish"):a.removeAttribute("finish"),i=t}},1e3)}function m(s,t){const n=document.createDocumentFragment();for(let r=s;r<t;r++){const o=document.createElement("div");o.style.cssText="padding: 10px; border-bottom: 1px solid #dedede;",o.textContent=r,n.appendChild(o)}return n}return x(()=>{y(()=>{a=u("#list"),a&&k(a,"load",c),l=u("#list1"),l&&l.append(m(0,100))})}),E(()=>{a&&v(a,"load",c)}),(s,t)=>{const n=q("ClientOnly");return _(),F("div",null,[t[2]||(t[2]=b("",7)),g(n,null,{default:f(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list = document.querySelector('#list');
  // Simulate paginated data.
  let start = 0;
  let max = 20;
  let step = 10;
  //-
  function handleLoadmore() {
     // Simulate data loading.
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
        $list.removeAttribute('loading');
        if (isFinish) {
          $list.setAttribute('finish', 'finish');
        } else {
          $list.removeAttribute('finish');
        }
        start = end;
      }
    }, 1000);
  }
  //-
  function createRenderFragemnt(start, end) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const $div = document.createElement('div');
      $div.style.cssText = 'padding: 10px; border-bottom: 1px solid #dedede;';
      $div.textContent = i;
      fragment.appendChild($div);
    }
    return fragment;
  }
  //-
  // Listen for the load event.
  $list.addEventListener('load', handleLoadmore);
`)])],-1)])]),_:1}),t[3]||(t[3]=e("h3",{id:"regular-list",tabindex:"-1"},[h("Regular List "),e("a",{class:"header-anchor",href:"#regular-list","aria-label":'Permalink to "Regular List"'},"​")],-1)),t[4]||(t[4]=e("p",null,[h("Set "),e("code",null,'infinite="false"'),h(" to disable infinite loading and use a regular scrollable list.")],-1)),g(n,null,{default:f(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
`)])],-1)])]),_:1}),t[5]||(t[5]=b("",11))])}}});export{P as __pageData,T as default};
