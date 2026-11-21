import{t as u}from"./chunks/browser.CplAf69P.js";import{a as r}from"./chunks/index.CPlhR6H9.js";import{v as b,x as k,C as m,o as y,c as E,a2 as c,E as d,w as i,j as e,a as s,P as v}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";import"./chunks/index.IdDs_81b.js";const _=JSON.parse('{"title":"Tag 标签","description":"","frontmatter":{},"headers":[],"relativePath":"components/tag.md","filePath":"components/tag.md","lastUpdated":1793445495000}'),f={name:"components/tag.md"},P=Object.assign(f,{setup(T){let h=!1,l,o;function p(){if(o){let a=document.createElement("l-tag");a.setAttribute("closeable","true"),a.setAttribute("type","primary"),a.style.marginRight="5px",a.innerHTML="标签",o.appendChild(a),u(a,"l-scale","enter"),a=null}}function g(a){u(a.target,"l-scale","leave",()=>{a.target.remove()})}return b(async()=>{if(await v(),h)return;const a=document.querySelector('l-tag[data-custom-color="jade"]'),t=document.querySelector('l-tag[data-custom-color="blue"]'),n=document.querySelector('l-tag[data-custom-color="orange"]');a&&(a.color=r("#00AA7E")),t&&t.setColor(r("#1e9fff")),n&&(n.color=r("#FF7802")),l=document.getElementById("btn-add"),o=document.getElementById("tag-container"),o==null||o.addEventListener("close",g),l==null||l.addEventListener("click",p)}),k(()=>{h=!0,o==null||o.removeEventListener("close",g),l==null||l.removeEventListener("click",p)}),(a,t)=>{const n=m("ClientOnly");return y(),E("div",null,[t[4]||(t[4]=c("",7)),d(n,null,{default:i(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-tag type="primary">标签</l-tag>
  <l-tag type="success">标签</l-tag>
  <l-tag type="info">标签</l-tag>
  <l-tag type="warning">标签</l-tag>
  <l-tag type="error">标签</l-tag>
  <l-tag type="blue">标签</l-tag>
`)],-1)])]),_:1}),t[5]||(t[5]=c("",4)),d(n,null,{default:i(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-tag data-custom-color="jade">翡翠绿</l-tag>
  <l-tag data-custom-color="blue">蓝色</l-tag>
  <l-tag data-custom-color="orange">橙色</l-tag>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-tag data-custom-color="jade">翡翠绿</l-tag>
  <l-tag data-custom-color="blue">蓝色</l-tag>
  <l-tag data-custom-color="orange">橙色</l-tag>
`),e("textarea",{lang:"js"},`import { generateTagColor } from "litos-ui/utils";
const jade = document.querySelector('l-tag[data-custom-color="jade"]');
const blue = document.querySelector('l-tag[data-custom-color="blue"]');
const orange = document.querySelector('l-tag[data-custom-color="orange"]');
jade.color = generateTagColor("#00AA7E");
blue.setColor(generateTagColor("#1e9fff"));
orange.color = generateTagColor("#FF7802");
`)])],-1)])]),_:1}),t[6]||(t[6]=e("h3",{id:"可移除",tabindex:"-1"},[s("可移除 "),e("a",{class:"header-anchor",href:"#可移除","aria-label":'Permalink to "可移除"'},"​")],-1)),t[7]||(t[7]=e("p",null,[s("通过 "),e("code",null,"closeable"),s(" 属性来实现可移除的标签，然后监听 "),e("code",null,"close"),s(" 事件。")],-1)),d(n,null,{default:i(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-tag type="primary" closeable>标签</l-tag>
  <l-tag type="success" closeable>标签</l-tag>
  <l-tag type="info" closeable>标签</l-tag>
  <l-tag type="warning" closeable>标签</l-tag>
  <l-tag type="error" closeable>标签</l-tag>
`)],-1)])]),_:1}),t[8]||(t[8]=e("blockquote",null,[e("p",null,[s("需要引入 "),e("code",null,"CloseIcon"),s(" 组件")])],-1)),t[9]||(t[9]=e("h3",{id:"过渡效果",tabindex:"-1"},[s("过渡效果 "),e("a",{class:"header-anchor",href:"#过渡效果","aria-label":'Permalink to "过渡效果"'},"​")],-1)),t[10]||(t[10]=e("p",null,[s("如果想给标签添加显示或移除时的过渡效果，通过 "),e("code",null,"utilane/transition"),s(" 实现, 具体使用参考 "),e("a",{href:"/litos-ui/components/transition"},"transition"),s("。")],-1)),d(n,null,{default:i(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`<l-button id="btn-add">添加</l-button>
<hr />
<div id="tag-container"></div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="btn-add">添加</l-button>
  <hr />
  <div id="tag-container"></div>
`),e("textarea",{lang:"js"},`  import { transition } from 'utilane/browser';
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
`)])],-1)])]),_:1}),t[11]||(t[11]=c("",23))])}}});export{_ as __pageData,P as default};
