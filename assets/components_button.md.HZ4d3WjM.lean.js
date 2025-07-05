import{_ as r,C as i,c as s,o as u,ag as a,G as o,j as t,w as n,a as d}from"./chunks/framework.DaU-16c2.js";const y=JSON.parse('{"title":"Button 按钮","description":"","frontmatter":{},"headers":[],"relativePath":"components/button.md","filePath":"components/button.md","lastUpdated":1742549245000}'),b={name:"components/button.md"};function c(p,e,h,m,f,g){const l=i("ClientOnly");return u(),s("div",null,[e[10]||(e[10]=a("",6)),o(l,null,{default:n(()=>e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button>Default</l-button>
  <l-button type="primary">Primary</l-button>
`)],-1)])),_:1,__:[0]}),e[11]||(e[11]=t("blockquote",null,[t("p",null,[d("如果想要实现按钮之间的间隔，需要引入 "),t("code",null,"litos-ui/styles/reset.css"),d(" 文件")])],-1)),e[12]||(e[12]=t("h3",{id:"文本按钮",tabindex:"-1"},[d("文本按钮 "),t("a",{class:"header-anchor",href:"#文本按钮","aria-label":'Permalink to "文本按钮"'},"​")],-1)),e[13]||(e[13]=t("p",null,[d("通过传递 "),t("code",null,"text"),d(" 属性将按钮变为文本按钮，配合 "),t("code",null,"type"),d(" 能有更多风格。")],-1)),o(l,null,{default:n(()=>e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button text>Default</l-button>
  <l-button type="primary" text>Primary</l-button>
`)],-1)])),_:1,__:[1]}),e[14]||(e[14]=t("h3",{id:"禁用状态",tabindex:"-1"},[d("禁用状态 "),t("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),e[15]||(e[15]=t("p",null,[d("使用 "),t("code",null,"disabled"),d(" 控制按钮禁用状态, 禁用状态下不可点击。该属性接受一个 "),t("code",null,"Boolean"),d(" 类型的值。")],-1)),o(l,null,{default:n(()=>e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button disabled>Default</l-button>
  <l-button disabled type="primary">Primary</l-button>
  <l-button text disabled>Text</l-button>
`)],-1)])),_:1,__:[2]}),e[16]||(e[16]=t("h3",{id:"加载状态",tabindex:"-1"},[d("加载状态 "),t("a",{class:"header-anchor",href:"#加载状态","aria-label":'Permalink to "加载状态"'},"​")],-1)),e[17]||(e[17]=t("p",null,[d("使用 "),t("code",null,"loading"),d(" 控制按钮加载状态, "),t("code",null,"loading-text"),d(" 传递加载时显示的文本。")],-1)),o(l,null,{default:n(()=>e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button loading>按钮</l-button>
  <l-button type="primary" loading loading-text="Loading">按钮</l-button>
`)],-1)])),_:1,__:[3]}),e[18]||(e[18]=t("h3",{id:"block按钮",tabindex:"-1"},[d("Block按钮 "),t("a",{class:"header-anchor",href:"#block按钮","aria-label":'Permalink to "Block按钮"'},"​")],-1)),e[19]||(e[19]=t("p",null,[t("code",null,"block"),d(" 属性使按钮适合其父宽度。"),t("code",null,"[100%]")],-1)),o(l,null,{default:n(()=>e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button block type="primary">按钮</l-button>
`)],-1)])),_:1,__:[4]}),e[20]||(e[20]=t("h3",{id:"按钮形状",tabindex:"-1"},[d("按钮形状 "),t("a",{class:"header-anchor",href:"#按钮形状","aria-label":'Permalink to "按钮形状"'},"​")],-1)),e[21]||(e[21]=t("p",null,[d("使用 "),t("code",null,"shape"),d(" 控制按钮形状, 提供两种类型: "),t("code",null,"default"),d(", "),t("code",null,"round"),d("、"),t("code",null,"circle"),d("。")],-1)),o(l,null,{default:n(()=>e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button>default</l-button>
  <l-button shape="round">round</l-button>
  <l-button shape="circle">C</l-button>
`)],-1)])),_:1,__:[5]}),e[22]||(e[22]=t("h3",{id:"按钮图标",tabindex:"-1"},[d("按钮图标 "),t("a",{class:"header-anchor",href:"#按钮图标","aria-label":'Permalink to "按钮图标"'},"​")],-1)),e[23]||(e[23]=t("p",null,[d("直接在 "),t("code",null,"Button"),d(" 内使用 "),t("a",{href:"/litos-ui/components/icon"},"Icon"),d(" 组件。可以搭配文字形成图标文字按钮。")],-1)),o(l,null,{default:n(()=>e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button shape="circle">
    <l-search-icon />
  </l-button>
  <l-button shape="round" type="primary">
    <l-search-icon></l-search-icon>
    <span>搜索</span>
  </l-button>
`)],-1)])),_:1,__:[6]}),e[24]||(e[24]=t("h3",{id:"透明背景",tabindex:"-1"},[d("透明背景 "),t("a",{class:"header-anchor",href:"#透明背景","aria-label":'Permalink to "透明背景"'},"​")],-1)),e[25]||(e[25]=t("p",null,[t("code",null,"ghost"),d(" 背景变为透明，常用在有色背景上")],-1)),o(l,null,{default:n(()=>e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button ghost type="primary">Primary</l-button>
`)],-1)])),_:1,__:[7]}),e[26]||(e[26]=t("h3",{id:"自定义颜色",tabindex:"-1"},[d("自定义颜色 "),t("a",{class:"header-anchor",href:"#自定义颜色","aria-label":'Permalink to "自定义颜色"'},"​")],-1)),e[27]||(e[27]=t("p",null,[t("code",null,"color"),d(" 属性可以自定义按钮颜色。"),t("code",null,"color"),d(" 接受一个 "),t("code",null,"String"),d(" 类型的值。")],-1)),o(l,null,{default:n(()=>e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button color="#2a9235">Primary</l-button>
  <l-button color="#1e9fff" ghost>Primary</l-button>
`)],-1)])),_:1,__:[8]}),e[28]||(e[28]=t("h3",{id:"扩展type",tabindex:"-1"},[d("扩展type "),t("a",{class:"header-anchor",href:"#扩展type","aria-label":'Permalink to "扩展type"'},"​")],-1)),e[29]||(e[29]=t("p",null,[d("通过给 "),t("code",null,"type"),d(" 设置一个非预设的值，然后定义 "),t("code",null,'l-button[type="x"]::part(default)'),d(" 的样式。")],-1)),o(l,null,{default:n(()=>e[9]||(e[9]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button type="blue">蓝色按钮</l-button>
  <l-button type="gradient">渐变按钮</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button type="blue">蓝色按钮</l-button>
  <l-button type="gradient">渐变按钮</l-button>
`),t("textarea",{lang:"css"},`  l-button[type="blue"]::part(default) {
    --l-btn-border-color: #1677ff;
    --l-btn-hover-border-color: #4096ff;
    --l-btn-active-border-color: #0958d9;
  }
  l-button[type="gradient"]::part(default) {
    border: none;
    --l-btn-color: #389e0d;
    --l-btn-active-color: #0fd850;
    --l-btn-background: linear-gradient(90deg, #0fd850 0%, #f9f047 100%);
    --l-btn-hover-background: linear-gradient(90deg, #2af06a 0%, #fbf478 100%);
    --l-btn-active-background: linear-gradient(90deg, #0a9036 0%, #ece008 100%);
  }
`)])],-1)])),_:1,__:[9]}),e[30]||(e[30]=a("",7))])}const x=r(b,[["render",c]]);export{y as __pageData,x as default};
