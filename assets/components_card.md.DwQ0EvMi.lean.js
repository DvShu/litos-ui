import{_ as n,C as i,o,c as h,a2 as l,E as r,w as s,j as e,a}from"./chunks/framework.CiKxQFaU.js";const g=JSON.parse('{"title":"Card 卡片","description":"","frontmatter":{},"headers":[],"relativePath":"components/card.md","filePath":"components/card.md","lastUpdated":1787509849000}'),p={name:"components/card.md"};function c(b,t,u,k,m,f){const d=i("ClientOnly");return o(),h("div",null,[t[5]||(t[5]=l("",6)),r(d,null,{default:s(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card header-text="卡片标题">
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
  </l-card>
`)],-1)])]),_:1}),t[6]||(t[6]=e("h2",{id:"简洁卡片",tabindex:"-1"},[a("简洁卡片 "),e("a",{class:"header-anchor",href:"#简洁卡片","aria-label":'Permalink to "简洁卡片"'},"​")],-1)),t[7]||(t[7]=e("p",null,[a("只包含内容区域，通过设置 "),e("code",null,"show-header"),a(" 为 "),e("code",null,"false"),a(" 隐藏标题。")],-1)),r(d,null,{default:s(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card header-text="卡片标题" show-header="false">
    <div>卡片内容</div>
  </l-card>
`)],-1)])]),_:1}),t[8]||(t[8]=e("h2",{id:"完整卡片",tabindex:"-1"},[a("完整卡片 "),e("a",{class:"header-anchor",href:"#完整卡片","aria-label":'Permalink to "完整卡片"'},"​")],-1)),t[9]||(t[9]=e("p",null,"卡片包含标题、内容、操作区域以及底部区域。",-1)),r(d,null,{default:s(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card header-text="卡片标题" show-footer footer-text="底部区域">
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
  </l-card>
`)],-1)])]),_:1}),t[10]||(t[10]=e("h2",{id:"卡片标题",tabindex:"-1"},[a("卡片标题 "),e("a",{class:"header-anchor",href:"#卡片标题","aria-label":'Permalink to "卡片标题"'},"​")],-1)),t[11]||(t[11]=e("p",null,[a("标题和底部区域除了可以通过 "),e("code",null,"header-text"),a(" 和 "),e("code",null,"footer-text"),a(" 传递以外，也可以通过 "),e("code",null,"header"),a(" 和 "),e("code",null,"footer"),a(" 插槽自定义。")],-1)),r(d,null,{default:s(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card show-footer>
    <span slot="header" style="color: red">卡片标题</span>
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    <span slot="footer" style="color: orange">底部区域</span>
  </l-card>
`)],-1)])]),_:1}),t[12]||(t[12]=e("h2",{id:"栅格卡片",tabindex:"-1"},[a("栅格卡片 "),e("a",{class:"header-anchor",href:"#栅格卡片","aria-label":'Permalink to "栅格卡片"'},"​")],-1)),t[13]||(t[13]=e("p",null,"在系统概览页面常常和栅格进行配合。通常用于管理后台的工作台聚合展示。",-1)),t[14]||(t[14]=e("p",null,[a("关于栅格布局，框架不提供，推荐使用 "),e("a",{href:"https://unocss.dev/interactive/?s=grid",target:"_blank",rel:"noreferrer"},"unocss"),a(" 或者 "),e("a",{href:"https://www.tailwindcss.cn/docs/display#grid",target:"_blank",rel:"noreferrer"},"tailwindcss"),a(" 的 "),e("code",null,"grid"),a(" 实现")],-1)),r(d,null,{default:s(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="grid grid-cols-3 gap-4">
    <l-card header-text="卡片标题1">
      <div>卡片内容1</div>
      <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    </l-card>
    <l-card header-text="卡片标题2">
      <div>卡片内容2</div>
      <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    </l-card>
    <l-card header-text="卡片标题3">
      <div>卡片内容3</div>
      <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    </l-card>
  </div>
`)],-1)])]),_:1}),t[15]||(t[15]=l("",11))])}const y=n(p,[["render",c]]);export{g as __pageData,y as default};
