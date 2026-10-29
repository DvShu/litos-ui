import{t as p}from"./chunks/browser.CpyXlELn.js";import{v as g,P as u,x as b,C as k,o as m,c as E,a2 as d,E as o,w as r,j as a,a as n}from"./chunks/framework.nU6eqUhJ.js";const C=JSON.parse('{"title":"Tag 标签","description":"","frontmatter":{},"headers":[],"relativePath":"components/tag.md","filePath":"components/tag.md","lastUpdated":1793253144000}'),y={name:"components/tag.md"},q=Object.assign(y,{setup(v){let i,s;function h(){if(s){let e=document.createElement("l-tag");e.setAttribute("closeable","true"),e.setAttribute("type","primary"),e.style.marginRight="5px",e.innerHTML="标签",s.appendChild(e),p(e,"l-scale","enter"),e=null}}function c(e){p(e.target,"l-scale","leave",()=>{e.target.remove()})}return g(()=>{u(()=>{i=document.getElementById("btn-add"),s=document.getElementById("tag-container"),s.addEventListener("close",c),i.addEventListener("click",h)})}),b(()=>{s==null||s.removeEventListener("close",c),i==null||i.removeEventListener("click",h)}),(e,t)=>{const l=k("ClientOnly");return m(),E("div",null,[t[3]||(t[3]=d("",7)),o(l,null,{default:r(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary">标签</l-tag>
  <l-tag type="success">标签</l-tag>
  <l-tag type="info">标签</l-tag>
  <l-tag type="warning">标签</l-tag>
  <l-tag type="error">标签</l-tag>
  <l-tag color="#409eff">标签</l-tag>
  <l-tag type="blue">标签</l-tag>
`)],-1)])]),_:1}),t[4]||(t[4]=d("",4)),o(l,null,{default:r(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary" closeable>标签</l-tag>
  <l-tag type="success" closeable>标签</l-tag>
  <l-tag type="info" closeable>标签</l-tag>
  <l-tag type="warning" closeable>标签</l-tag>
  <l-tag type="error" closeable>标签</l-tag>
  <l-tag color="#409eff" closeable>标签</l-tag>
`)],-1)])]),_:1}),t[5]||(t[5]=a("blockquote",null,[a("p",null,[n("需要引入 "),a("code",null,"CloseIcon"),n(" 组件")])],-1)),t[6]||(t[6]=a("h3",{id:"过渡效果",tabindex:"-1"},[n("过渡效果 "),a("a",{class:"header-anchor",href:"#过渡效果","aria-label":'Permalink to "过渡效果"'},"​")],-1)),t[7]||(t[7]=a("p",null,[n("如果想给标签添加显示或移除时的过渡效果，通过 "),a("code",null,"utilane/transition"),n(" 实现, 具体使用参考 "),a("a",{href:"/litos-ui/components/transition"},"transition"),n("。")],-1)),o(l,null,{default:r(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`<l-button id="btn-add">添加</l-button>
<hr />
<div id="tag-container"></div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="btn-add">添加</l-button>
  <hr />
  <div id="tag-container"></div>
`),a("textarea",{lang:"js"},`  import { transition } from 'utilane/browser';
  //-
  function handleAddTag() {
    if ($tagContainer) {
      let $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closeable', 'true');
      $addTag.setAttribute('type', 'primary');
      $addTag.style.marginRight = "5px";
      $addTag.innerHTML = '标签';
      $tagContainer.appendChild($addTag);
      transition($addTag, 'l-scale', "enter");
      $addTag = null;
    }
  }
  //-
  function onClose(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }
  //-
  const $addBtn = document.getElementById('btn-add');
  const $tagContainer = document.getElementById('tag-container');
  $tagContainer.addEventListener('close', onClose);
  $addBtn.addEventListener('click', handleAddTag);
`)])],-1)])]),_:1}),t[8]||(t[8]=d("",15))])}}});export{C as __pageData,q as default};
