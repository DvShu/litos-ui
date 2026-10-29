import{_ as i,C as r,o as d,c as p,a2 as s,E as l,w as o,j as a,a as t}from"./chunks/framework.nU6eqUhJ.js";const v=JSON.parse('{"title":"Polygon","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/polygon.md","filePath":"en/components/polygon.md","lastUpdated":1793253144000}'),h={name:"en/components/polygon.md"};function c(g,e,u,y,m,b){const n=r("ClientOnly");return d(),p("div",null,[e[2]||(e[2]=s("",7)),l(n,null,{default:o(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},` <div class="grid grid-cols-4">
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
`)],-1)])]),_:1}),e[3]||(e[3]=a("h3",{id:"custom-shapes",tabindex:"-1"},[t("Custom Shapes "),a("a",{class:"header-anchor",href:"#custom-shapes","aria-label":'Permalink to "Custom Shapes"'},"​")],-1)),e[4]||(e[4]=a("p",null,[t("Set a custom "),a("code",null,"clip-path"),t(" through "),a("code",null,"::part(default)"),t(". For example, create a rhombus:")],-1)),l(n,null,{default:o(()=>[...e[1]||(e[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("textarea",{lang:"css"},`  .polygon-rhombus::part(default) {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
`)])],-1)])]),_:1}),e[5]||(e[5]=s("",8))])}const f=i(h,[["render",c]]);export{v as __pageData,f as default};
