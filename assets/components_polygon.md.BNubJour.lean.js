import{_ as i,C as d,c as r,o as p,ag as n,G as o,j as a,w as s,a as e}from"./chunks/framework._HD6XqYi.js";const v=JSON.parse('{"title":"Polygon 多边形","description":"","frontmatter":{},"headers":[],"relativePath":"components/polygon.md","filePath":"components/polygon.md","lastUpdated":1733932899000}'),h={name:"components/polygon.md"};function c(g,t,y,b,u,m){const l=d("ClientOnly");return p(),r("div",null,[t[2]||(t[2]=n("",7)),o(l,null,{default:s(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},` <div class="grid grid-cols-4">
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
`)],-1)])]),_:1}),t[3]||(t[3]=a("h3",{id:"自定义形状",tabindex:"-1"},[e("自定义形状 "),a("a",{class:"header-anchor",href:"#自定义形状","aria-label":'Permalink to "自定义形状"'},"​")],-1)),t[4]||(t[4]=a("p",null,[e("通过 "),a("code",null,"part::(default)"),e(" 设置自定义的 "),a("code",null,"clip-path"),e("。例如自定义菱形")],-1)),o(l,null,{default:s(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-polygon class="polygon-rhombus" background="red"></l-polygon>
`),a("textarea",{lang:"css"},`  .polygon-rhombus::part(default) {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
`)])],-1)])]),_:1}),t[5]||(t[5]=n("",5))])}const f=i(h,[["render",c]]);export{v as __pageData,f as default};
