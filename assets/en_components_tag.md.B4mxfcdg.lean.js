import{t as h}from"./chunks/browser.7zTvUqO3.js";import{v as p,P as g,x as u,C as b,o as k,c as m,a2 as i,E as o,w as d,j as a}from"./chunks/framework.nU6eqUhJ.js";const f=JSON.parse('{"title":"Tag","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/tag.md","filePath":"en/components/tag.md","lastUpdated":1793253144000}'),y={name:"en/components/tag.md"},_=Object.assign(y,{setup(E){let n,s;function r(){if(s){let e=document.createElement("l-tag");e.setAttribute("closeable","true"),e.setAttribute("type","primary"),e.style.marginRight="5px",e.innerHTML="Tag",s.appendChild(e),h(e,"l-scale","enter"),e=null}}function c(e){h(e.target,"l-scale","leave",()=>{e.target.remove()})}return p(()=>{g(()=>{n=document.getElementById("btn-add"),s=document.getElementById("tag-container"),s.addEventListener("close",c),n.addEventListener("click",r)})}),u(()=>{s==null||s.removeEventListener("close",c),n==null||n.removeEventListener("click",r)}),(e,t)=>{const l=b("ClientOnly");return k(),m("div",null,[t[3]||(t[3]=i("",7)),o(l,null,{default:d(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary">Tag</l-tag>
  <l-tag type="success">Tag</l-tag>
  <l-tag type="info">Tag</l-tag>
  <l-tag type="warning">Tag</l-tag>
  <l-tag type="error">Tag</l-tag>
  <l-tag color="#409eff">Tag</l-tag>
  <l-tag type="blue">Tag</l-tag>
`)],-1)])]),_:1}),t[4]||(t[4]=i("",4)),o(l,null,{default:d(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary" closeable>Tag</l-tag>
  <l-tag type="success" closeable>Tag</l-tag>
  <l-tag type="info" closeable>Tag</l-tag>
  <l-tag type="warning" closeable>Tag</l-tag>
  <l-tag type="error" closeable>Tag</l-tag>
  <l-tag color="#409eff" closeable>Tag</l-tag>
`)],-1)])]),_:1}),t[5]||(t[5]=i("",3)),o(l,null,{default:d(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`<l-button id="btn-add">Add</l-button>
<hr />
<div id="tag-container"></div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="btn-add">Add</l-button>
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
      $addTag.innerHTML = 'Tag';
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
`)])],-1)])]),_:1}),t[6]||(t[6]=i("",15))])}}});export{f as __pageData,_ as default};
