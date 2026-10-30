import{$ as m,o as g,a as v}from"./chunks/browser.7zTvUqO3.js";import{v as x,P as y,x as E,C as _,o as q,c as F,a2 as b,E as f,w as k,j as e,a as h}from"./chunks/framework.nU6eqUhJ.js";const $=JSON.parse('{"title":"List 滚动列表","description":"","frontmatter":{},"headers":[],"relativePath":"components/list.md","filePath":"components/list.md","lastUpdated":1793253144000}'),C={name:"components/list.md"},L=Object.assign(C,{setup(A){let a,l,i=0,d=20,p=10;function c(){setTimeout(()=>{if(a&&i<d){let s=!1,t=i+p;i+p>=d&&(s=!0,t=d),a.append(u(i,t)),a.removeAttribute("loading"),s?a.setAttribute("finish","finish"):a.removeAttribute("finish"),i=t}},1e3)}function u(s,t){const n=document.createDocumentFragment();for(let o=s;o<t;o++){const r=document.createElement("div");r.style.cssText="padding: 10px; border-bottom: 1px solid #dedede;",r.textContent=o,n.appendChild(r)}return n}return x(()=>{y(()=>{a=m("#list"),a&&g(a,"load",c),l=m("#list1"),l&&l.append(u(0,100))})}),E(()=>{a&&v(a,"load",c)}),(s,t)=>{const n=_("ClientOnly");return q(),F("div",null,[t[2]||(t[2]=b("",7)),f(n,null,{default:k(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list = document.querySelector('#list');
  // 模拟分页数据
  let start = 0;
  let max = 20;
  let step = 10;
  //-
  function handleLoadmore() {
     // 模拟数据加载
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
  // 监听加载事件
  $list.addEventListener('load', handleLoadmore);
`)])],-1)])]),_:1}),t[3]||(t[3]=e("h3",{id:"普通列表",tabindex:"-1"},[h("普通列表 "),e("a",{class:"header-anchor",href:"#普通列表","aria-label":'Permalink to "普通列表"'},"​")],-1)),t[4]||(t[4]=e("p",null,[h("通过传递 "),e("code",null,'infinite="false"'),h(" 禁用滚动加载这样就成了一个单纯的可以滚动的列表。")],-1)),f(n,null,{default:k(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
`)])],-1)])]),_:1}),t[5]||(t[5]=b("",10))])}}});export{$ as __pageData,L as default};
