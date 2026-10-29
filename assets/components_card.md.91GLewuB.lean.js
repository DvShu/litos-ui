import{_ as d,C as r,o,c as p,a2 as l,E as i,w as n,j as a,a as t}from"./chunks/framework.nU6eqUhJ.js";const y=JSON.parse('{"title":"Card 卡片","description":"","frontmatter":{},"headers":[],"relativePath":"components/card.md","filePath":"components/card.md","lastUpdated":1793253144000}'),h={name:"components/card.md"};function c(k,s,u,b,E,g){const e=r("ClientOnly");return o(),p("div",null,[s[5]||(s[5]=l("",6)),i(e,null,{default:n(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-card header-text="卡片标题">
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
  </l-card>
`)],-1)])]),_:1}),s[6]||(s[6]=a("h2",{id:"简洁卡片",tabindex:"-1"},[t("简洁卡片 "),a("a",{class:"header-anchor",href:"#简洁卡片","aria-label":'Permalink to "简洁卡片"'},"​")],-1)),s[7]||(s[7]=a("p",null,[t("只包含内容区域，通过设置 "),a("code",null,"show-header"),t(" 为 "),a("code",null,"false"),t(" 隐藏标题。")],-1)),i(e,null,{default:n(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-card header-text="卡片标题" show-header="false">
    <div>卡片内容</div>
  </l-card>
`)],-1)])]),_:1}),s[8]||(s[8]=a("h2",{id:"完整卡片",tabindex:"-1"},[t("完整卡片 "),a("a",{class:"header-anchor",href:"#完整卡片","aria-label":'Permalink to "完整卡片"'},"​")],-1)),s[9]||(s[9]=a("p",null,"卡片包含标题、内容、操作区域以及底部区域。",-1)),i(e,null,{default:n(()=>[...s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-card header-text="卡片标题" show-footer footer-text="底部区域">
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
  </l-card>
`)],-1)])]),_:1}),s[10]||(s[10]=a("h2",{id:"卡片标题",tabindex:"-1"},[t("卡片标题 "),a("a",{class:"header-anchor",href:"#卡片标题","aria-label":'Permalink to "卡片标题"'},"​")],-1)),s[11]||(s[11]=a("p",null,[t("标题和底部区域除了可以通过 "),a("code",null,"header-text"),t(" 和 "),a("code",null,"footer-text"),t(" 传递以外，也可以通过 "),a("code",null,"header"),t(" 和 "),a("code",null,"footer"),t(" 插槽自定义。")],-1)),i(e,null,{default:n(()=>[...s[3]||(s[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-card show-footer>
    <span slot="header" style="color: red">卡片标题</span>
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    <span slot="footer" style="color: orange">底部区域</span>
  </l-card>
`)],-1)])]),_:1}),s[12]||(s[12]=a("h2",{id:"栅格卡片",tabindex:"-1"},[t("栅格卡片 "),a("a",{class:"header-anchor",href:"#栅格卡片","aria-label":'Permalink to "栅格卡片"'},"​")],-1)),s[13]||(s[13]=a("p",null,"在系统概览页面常常和栅格进行配合。通常用于管理后台的工作台聚合展示。",-1)),s[14]||(s[14]=a("p",null,[t("关于栅格布局，框架不提供，推荐使用 "),a("a",{href:"https://unocss.dev/interactive/?s=grid",target:"_blank",rel:"noreferrer"},"unocss"),t(" 或者 "),a("a",{href:"https://www.tailwindcss.cn/docs/display#grid",target:"_blank",rel:"noreferrer"},"tailwindcss"),t(" 的 "),a("code",null,"grid"),t(" 实现")],-1)),i(e,null,{default:n(()=>[...s[4]||(s[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="grid grid-cols-3 gap-4">
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
`)],-1)])]),_:1}),s[15]||(s[15]=l("",19))])}const v=d(h,[["render",c]]);export{y as __pageData,v as default};
