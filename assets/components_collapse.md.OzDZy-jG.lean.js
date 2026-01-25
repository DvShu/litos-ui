import{_ as i,C as s,o as r,c as p,ag as o,E as d,w as n,j as l,a as t}from"./chunks/framework.-4c4jpF6.js";const k=JSON.parse('{"title":"collapse 折叠面板","description":"","frontmatter":{},"headers":[],"relativePath":"components/collapse.md","filePath":"components/collapse.md","lastUpdated":1754301554000}'),c={name:"components/collapse.md"};function m(h,e,u,b,v,x){const a=s("ClientOnly");return r(),p("div",null,[e[9]||(e[9]=o("",7)),d(a,null,{default:n(()=>[...e[0]||(e[0]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse>
    <l-collapse-item name="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[10]||(e[10]=l("h3",{id:"手动展开",tabindex:"-1"},[t("手动展开 "),l("a",{class:"header-anchor",href:"#手动展开","aria-label":'Permalink to "手动展开"'},"​")],-1)),e[11]||(e[11]=l("p",null,[t("将 "),l("code",null,"collapse"),t(" 标签的 "),l("code",null,"name"),t(" 设置为展开项, 多个项用 "),l("code",null,"&"),t(" 分隔")],-1)),d(a,null,{default:n(()=>[...e[1]||(e[1]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse name="1&3">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[12]||(e[12]=o("",3)),d(a,null,{default:n(()=>[...e[2]||(e[2]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse accordion>
    <l-collapse-item name="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[13]||(e[13]=l("h3",{id:"箭头位置",tabindex:"-1"},[t("箭头位置 "),l("a",{class:"header-anchor",href:"#箭头位置","aria-label":'Permalink to "箭头位置"'},"​")],-1)),e[14]||(e[14]=l("p",null,[t("使用 "),l("code",null,"arrow-placement"),t(" 来设定箭头的位置；可选值为 "),l("code",null,"left"),t("[默认]、"),l("code",null,"right")],-1)),d(a,null,{default:n(()=>[...e[3]||(e[3]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[15]||(e[15]=l("h3",{id:"标题栏对齐方式",tabindex:"-1"},[t("标题栏对齐方式 "),l("a",{class:"header-anchor",href:"#标题栏对齐方式","aria-label":'Permalink to "标题栏对齐方式"'},"​")],-1)),e[16]||(e[16]=l("p",null,[t("通过 "),l("code",null,"header-justify"),t(" 来设置对齐方式，例如设置为 "),l("code",null,"space-between"),t(" 表明两端对齐，这个时候，配合 "),l("code",null,"arrow-placement: right"),t(" 就能实现，箭头和文本两端对齐的效果")],-1)),d(a,null,{default:n(()=>[...e[4]||(e[4]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[17]||(e[17]=l("h3",{id:"背景边框",tabindex:"-1"},[t("背景边框 "),l("a",{class:"header-anchor",href:"#背景边框","aria-label":'Permalink to "背景边框"'},"​")],-1)),e[18]||(e[18]=l("p",null,[t("通过设置 "),l("code",null,"background"),t(" 就能实现带背景边框样式")],-1)),d(a,null,{default:n(()=>[...e[5]||(e[5]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[19]||(e[19]=l("h3",{id:"项间距",tabindex:"-1"},[t("项间距 "),l("a",{class:"header-anchor",href:"#项间距","aria-label":'Permalink to "项间距"'},"​")],-1)),e[20]||(e[20]=l("p",null,[t("通过 "),l("code",null,"gap"),t(" 设置项间距")],-1)),d(a,null,{default:n(()=>[...e[6]||(e[6]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[21]||(e[21]=l("h3",{id:"圆角",tabindex:"-1"},[t("圆角 "),l("a",{class:"header-anchor",href:"#圆角","aria-label":'Permalink to "圆角"'},"​")],-1)),e[22]||(e[22]=l("p",null,[t("通过 "),l("code",null,"border-radius"),t(" 设置边框圆角")],-1)),d(a,null,{default:n(()=>[...e[7]||(e[7]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[23]||(e[23]=l("h3",{id:"网格模式",tabindex:"-1"},[t("网格模式 "),l("a",{class:"header-anchor",href:"#网格模式","aria-label":'Permalink to "网格模式"'},"​")],-1)),e[24]||(e[24]=l("p",null,[t("通过传递 "),l("code",null,"grid"),t(" 属性让折叠面板变为网格模式")],-1)),d(a,null,{default:n(()=>[...e[8]||(e[8]=[l("l-code-preview",null,[l("textarea",{lang:"html"},`  <l-collapse 
    arrow-placement="right" 
    header-justify="space-between" 
    background 
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),e[25]||(e[25]=o("",9))])}const f=i(c,[["render",m]]);export{k as __pageData,f as default};
