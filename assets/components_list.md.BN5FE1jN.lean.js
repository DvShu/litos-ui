import{$ as u,o as x,a as v}from"./chunks/dom.BepTD04X.js";import{v as k,P as _,x as y,C as E,c as q,o as P,ag as b,G as f,j as e,w as g,a as h}from"./chunks/framework.BCyZWppQ.js";const $=JSON.parse('{"title":"List 滚动列表","description":"","frontmatter":{},"headers":[],"relativePath":"components/list.md","filePath":"components/list.md","lastUpdated":1737345140000}'),T={name:"components/list.md"},A=Object.assign(T,{setup(C){let a,l,n=0,d=20,c=10;function p(){setTimeout(()=>{if(a&&n<d){let i=!1,t=n+c;n+c>=d&&(i=!0,t=d),a.append(m(n,t)),i?a.setAttribute("finish","finish"):a.removeAttribute("finish"),n=t}},1e3)}function m(i,t){const s=document.createDocumentFragment();for(let o=i;o<t;o++){const r=document.createElement("div");r.style.cssText="padding: 10px; border-bottom: 1px solid #dedede;",r.textContent=o,s.appendChild(r)}return s}return k(()=>{_(()=>{a=u("#list"),a&&x(a,"load-more",p),l=u("#list1"),l&&l.append(m(0,100))})}),y(()=>{a&&v(a,"load-more",p)}),(i,t)=>{const s=E("ClientOnly");return P(),q("div",null,[t[2]||(t[2]=b("",7)),f(s,null,{default:g(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
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
  $list.addEventListener('load-more', handleLoadmore);
`)])],-1)])),_:1}),t[3]||(t[3]=e("h3",{id:"普通列表",tabindex:"-1"},[h("普通列表 "),e("a",{class:"header-anchor",href:"#普通列表","aria-label":'Permalink to "普通列表"'},"​")],-1)),t[4]||(t[4]=e("p",null,[h("通过传递 "),e("code",null,'infinite="false"'),h(" 禁用滚动加载这样就成了一个单纯的可以滚动的列表。")],-1)),f(s,null,{default:g(()=>t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
`)])],-1)])),_:1}),t[5]||(t[5]=b("",7))])}}});export{$ as __pageData,A as default};
