import{t as c}from"./chunks/dom.DBNJew1L.js";import{v as g,P as b,C as u,c as k,o as m,ag as l,G as i,j as a,w as o,a as s}from"./chunks/framework._HD6XqYi.js";const v=JSON.parse('{"title":"Tag 标签","description":"","frontmatter":{},"headers":[],"relativePath":"components/tag.md","filePath":"components/tag.md","lastUpdated":1756372474000}'),y={name:"components/tag.md"},C=Object.assign(y,{setup(E){let r,n;function h(){if(n){let e=document.createElement("l-tag");e.setAttribute("closable","true"),e.setAttribute("type","primary"),e.style.marginRight="5px",e.innerHTML="标签",n.appendChild(e),c(e,"l-scale","enter"),e=null}}function p(e){c(e.target,"l-scale","leave",()=>{e.target.remove()})}return g(()=>{b(()=>{r=document.getElementById("btn-add"),n=document.getElementById("tag-container"),n.addEventListener("close",p),r.addEventListener("click",h)})}),(e,t)=>{const d=u("ClientOnly");return m(),k("div",null,[t[3]||(t[3]=l("",7)),i(d,null,{default:o(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary">标签</l-tag>
  <l-tag type="success">标签</l-tag>
  <l-tag type="info">标签</l-tag>
  <l-tag type="warning">标签</l-tag>
  <l-tag type="error">标签</l-tag>
  <l-tag color="#409eff">标签</l-tag>
  <l-tag type="blue">标签</l-tag>
`)],-1)])]),_:1}),t[4]||(t[4]=l("",4)),i(d,null,{default:o(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary" closeable>标签</l-tag>
  <l-tag type="success" closeable>标签</l-tag>
  <l-tag type="info" closeable>标签</l-tag>
  <l-tag type="warning" closeable>标签</l-tag>
  <l-tag type="error" closeable>标签</l-tag>
  <l-tag color="#409eff" closeable>标签</l-tag>
`)],-1)])]),_:1}),t[5]||(t[5]=a("blockquote",null,[a("p",null,[s("需要引入 "),a("code",null,"CloseIcon"),s(" 组件")])],-1)),t[6]||(t[6]=a("h3",{id:"过渡效果",tabindex:"-1"},[s("过渡效果 "),a("a",{class:"header-anchor",href:"#过渡效果","aria-label":'Permalink to "过渡效果"'},"​")],-1)),t[7]||(t[7]=a("p",null,[s("如果想给标签添加显示或移除时的过渡效果，通过 "),a("code",null,"ph-utils/transition"),s(" 实现, 具体使用参考 "),a("a",{href:"/litos-ui/components/transition"},"transition"),s("。")],-1)),i(d,null,{default:o(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`<l-button id="btn-add">添加</l-button>
<hr />
<div id="tag-container"></div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="btn-add">添加</l-button>
  <hr />
  <div id="tag-container"></div>
`),a("textarea",{lang:"js"},`  import { transition } from 'ph-utils/dom';
  //-
  function handleAddTag() {
    if ($tagContainer) {
      const $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closable', 'true');
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
`)])],-1)])]),_:1}),t[8]||(t[8]=l("",12))])}}});export{v as __pageData,C as default};
