import{_ as i,C as r,o as d,c as p,a2 as l,E as s,w as o,j as t,a}from"./chunks/framework.nU6eqUhJ.js";const v=JSON.parse('{"title":"Polygon 多边形","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/polygon.md","filePath":"en/components/polygon.md","lastUpdated":1793115401000}'),h={name:"en/components/polygon.md"};function c(g,e,y,u,b,m){const n=r("ClientOnly");return d(),p("div",null,[e[2]||(e[2]=l("",7)),s(n,null,{default:o(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},` <div class="grid grid-cols-4">
  <div class="center flex-col">
    <l-polygon shape="triangle-top"></l-polygon>
    <span>triangle-top</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom"></l-polygon>
    <span>triangle-bottom</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-left"></l-polygon>
    <span>triangle-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-right"></l-polygon>
    <span>triangle-right</span>
  </div>
</div>
<div class="grid grid-cols-4 mt-15">
  <div class="center flex-col">
    <l-polygon shape="triangle-top-right"></l-polygon>
    <span>triangle-top-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-top-left"></l-polygon>
    <span>triangle-top-left</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-right"></l-polygon>
    <span>triangle-bottom-right</span>
  </div>
  <div class="center flex-col">
    <l-polygon shape="triangle-bottom-left"></l-polygon>
    <span>triangle-bottom-left</span>
  </div>
</div>
`)],-1)])]),_:1}),e[3]||(e[3]=t("h3",{id:"自定义形状",tabindex:"-1"},[a("自定义形状 "),t("a",{class:"header-anchor",href:"#自定义形状","aria-label":'Permalink to "自定义形状"'},"​")],-1)),e[4]||(e[4]=t("p",null,[a("通过 "),t("code",null,"part::(default)"),a(" 设置自定义的 "),t("code",null,"clip-path"),a("。例如自定义菱形")],-1)),s(n,null,{default:o(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),t("textarea",{lang:"css"},`  .polygon-rhombus::part(default) {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
`)])],-1)])]),_:1}),e[5]||(e[5]=l("",8))])}const f=i(h,[["render",c]]);export{v as __pageData,f as default};
