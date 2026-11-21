import{t as u}from"./chunks/browser.CplAf69P.js";import{a as c}from"./chunks/index.CPlhR6H9.js";import{v as b,x as m,C as k,o as y,c as T,a2 as i,E as l,w as r,j as t,a as d,P as E}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";import"./chunks/index.IdDs_81b.js";const S=JSON.parse('{"title":"Tag","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/tag.md","filePath":"en/components/tag.md","lastUpdated":1793445495000}'),v={name:"en/components/tag.md"},F=Object.assign(v,{setup(f){let h=!1,s,o;function p(){if(o){let a=document.createElement("l-tag");a.setAttribute("closeable","true"),a.setAttribute("type","primary"),a.style.marginRight="5px",a.innerHTML="Tag",o.appendChild(a),u(a,"l-scale","enter"),a=null}}function g(a){u(a.target,"l-scale","leave",()=>{a.target.remove()})}return b(async()=>{if(await E(),h)return;const a=document.querySelector('l-tag[data-custom-color="jade"]'),e=document.querySelector('l-tag[data-custom-color="blue"]'),n=document.querySelector('l-tag[data-custom-color="orange"]');a&&(a.color=c("#00AA7E")),e&&e.setColor(c("#1e9fff")),n&&(n.color=c("#FF7802")),s=document.getElementById("btn-add"),o=document.getElementById("tag-container"),o==null||o.addEventListener("close",g),s==null||s.addEventListener("click",p)}),m(()=>{h=!0,o==null||o.removeEventListener("close",g),s==null||s.removeEventListener("click",p)}),(a,e)=>{const n=k("ClientOnly");return y(),T("div",null,[e[4]||(e[4]=i("",7)),l(n,null,{default:r(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tag type="primary">Tag</l-tag>
  <l-tag type="success">Tag</l-tag>
  <l-tag type="info">Tag</l-tag>
  <l-tag type="warning">Tag</l-tag>
  <l-tag type="error">Tag</l-tag>
  <l-tag type="blue">Tag</l-tag>
`)],-1)])]),_:1}),e[5]||(e[5]=i("",4)),l(n,null,{default:r(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tag data-custom-color="jade">Jade</l-tag>
  <l-tag data-custom-color="blue">Blue</l-tag>
  <l-tag data-custom-color="orange">Orange</l-tag>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-tag data-custom-color="jade">Jade</l-tag>
  <l-tag data-custom-color="blue">Blue</l-tag>
  <l-tag data-custom-color="orange">Orange</l-tag>
`),t("textarea",{lang:"js"},`import { generateTagColor } from "litos-ui/utils";
const jade = document.querySelector('l-tag[data-custom-color="jade"]');
const blue = document.querySelector('l-tag[data-custom-color="blue"]');
const orange = document.querySelector('l-tag[data-custom-color="orange"]');
jade.color = generateTagColor("#00AA7E");
blue.setColor(generateTagColor("#1e9fff"));
orange.color = generateTagColor("#FF7802");
`)])],-1)])]),_:1}),e[6]||(e[6]=t("h3",{id:"removable-tags",tabindex:"-1"},[d("Removable Tags "),t("a",{class:"header-anchor",href:"#removable-tags","aria-label":'Permalink to "Removable Tags"'},"​")],-1)),e[7]||(e[7]=t("p",null,[d("Add "),t("code",null,"closeable"),d(" to show a close button, then handle the "),t("code",null,"close"),d(" event to remove the tag.")],-1)),l(n,null,{default:r(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tag type="primary" closeable>Tag</l-tag>
  <l-tag type="success" closeable>Tag</l-tag>
  <l-tag type="info" closeable>Tag</l-tag>
  <l-tag type="warning" closeable>Tag</l-tag>
  <l-tag type="error" closeable>Tag</l-tag>
`)],-1)])]),_:1}),e[8]||(e[8]=i("",3)),l(n,null,{default:r(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`<l-button id="btn-add">Add</l-button>
<hr />
<div id="tag-container"></div>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button id="btn-add">Add</l-button>
  <hr />
  <div id="tag-container"></div>
`),t("textarea",{lang:"js"},`  import { transition } from 'utilane/browser';
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
`)])],-1)])]),_:1}),e[9]||(e[9]=i("",23))])}}});export{S as __pageData,F as default};
