import{_ as i,C as n,o as r,c as p,a2 as s,E as d,w as o,j as e,a as l}from"./chunks/framework.DBq8O7k4.js";const g=JSON.parse('{"title":"collapse 折叠面板","description":"","frontmatter":{},"headers":[],"relativePath":"components/collapse.md","filePath":"components/collapse.md","lastUpdated":1795187990000}'),c={name:"components/collapse.md"};function h(m,t,u,b,v,x){const a=n("ClientOnly");return r(),p("div",null,[t[10]||(t[10]=s("",8)),d(a,null,{default:o(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse>
    <l-collapse-item prop="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"手动展开",tabindex:"-1"},[l("手动展开 "),e("a",{class:"header-anchor",href:"#手动展开","aria-label":'Permalink to "手动展开"'},"​")],-1)),t[12]||(t[12]=e("p",null,[l("将 "),e("code",null,"collapse"),l(" 标签的 "),e("code",null,"prop"),l(" 设置为展开项, 多个项用 "),e("code",null,"&"),l(" 分隔")],-1)),d(a,null,{default:o(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse prop="1&3">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[13]||(t[13]=s("",3)),d(a,null,{default:o(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse accordion>
    <l-collapse-item prop="1" header-text="红灯" expand>
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[14]||(t[14]=e("h3",{id:"箭头位置",tabindex:"-1"},[l("箭头位置 "),e("a",{class:"header-anchor",href:"#箭头位置","aria-label":'Permalink to "箭头位置"'},"​")],-1)),t[15]||(t[15]=e("p",null,[l("使用 "),e("code",null,"arrow-placement"),l(" 来设定箭头的位置；可选值为 "),e("code",null,"left"),l("[默认]、"),e("code",null,"right")],-1)),d(a,null,{default:o(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[16]||(t[16]=e("h3",{id:"标题栏对齐方式",tabindex:"-1"},[l("标题栏对齐方式 "),e("a",{class:"header-anchor",href:"#标题栏对齐方式","aria-label":'Permalink to "标题栏对齐方式"'},"​")],-1)),t[17]||(t[17]=e("p",null,[l("用 "),e("code",null,"header-justify"),l(" 设置标题栏对齐。"),e("code",null,"flex-start"),l(" 与 "),e("code",null,"flex-end"),l(" 分别对齐到行首与行尾，"),e("code",null,"space-between"),l(" 将箭头和标题分别放在两端。")],-1)),d(a,null,{default:o(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[18]||(t[18]=e("h3",{id:"背景边框",tabindex:"-1"},[l("背景边框 "),e("a",{class:"header-anchor",href:"#背景边框","aria-label":'Permalink to "背景边框"'},"​")],-1)),t[19]||(t[19]=e("p",null,[l("通过设置 "),e("code",null,"background"),l(" 就能实现带背景边框样式")],-1)),d(a,null,{default:o(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[20]||(t[20]=e("h3",{id:"项间距",tabindex:"-1"},[l("项间距 "),e("a",{class:"header-anchor",href:"#项间距","aria-label":'Permalink to "项间距"'},"​")],-1)),t[21]||(t[21]=e("p",null,[l("通过 "),e("code",null,"gap"),l(" 设置项间距")],-1)),d(a,null,{default:o(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[22]||(t[22]=e("h3",{id:"圆角",tabindex:"-1"},[l("圆角 "),e("a",{class:"header-anchor",href:"#圆角","aria-label":'Permalink to "圆角"'},"​")],-1)),t[23]||(t[23]=e("p",null,[l("通过 "),e("code",null,"border-radius"),l(" 设置边框圆角")],-1)),d(a,null,{default:o(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[24]||(t[24]=e("h3",{id:"网格模式",tabindex:"-1"},[l("网格模式 "),e("a",{class:"header-anchor",href:"#网格模式","aria-label":'Permalink to "网格模式"'},"​")],-1)),t[25]||(t[25]=e("p",null,[l("通过传递 "),e("code",null,"grid"),l(" 属性让折叠面板变为网格模式")],-1)),d(a,null,{default:o(()=>[...t[8]||(t[8]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse
    arrow-placement="right"
    header-justify="space-between"
    background
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item prop="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[26]||(t[26]=e("h3",{id:"包装层与独立面板",tabindex:"-1"},[l("包装层与独立面板 "),e("a",{class:"header-anchor",href:"#包装层与独立面板","aria-label":'Permalink to "包装层与独立面板"'},"​")],-1)),t[27]||(t[27]=e("p",null,[e("code",null,"l-collapse-item"),l(" 可以直接放在 "),e("code",null,"l-collapse"),l(" 下、由普通元素包裹，或独立使用。在 "),e("code",null,"grid"),l(" 模式下，每个直接子元素占一格，包装层中的多个面板共用一格。")],-1)),d(a,null,{default:o(()=>[...t[9]||(t[9]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse grid gap="8" prop="delivery">
    <div>
      <l-collapse-item prop="delivery" header-text="配送方式">
        <div>支持快递配送。</div>
      </l-collapse-item>
      <l-collapse-item prop="pickup" header-text="门店自提">
        <div>订单备好后可到店领取。</div>
      </l-collapse-item>
    </div>
    <l-collapse-item prop="returns" header-text="退换货">
      <div>请在订单详情中申请退换货。</div>
    </l-collapse-item>
  </l-collapse>
  <l-collapse-item header-text="营业时间">
    <div>周一至周日 09:00–18:00。</div>
  </l-collapse-item>
`)],-1)])]),_:1}),t[28]||(t[28]=s("",23))])}const f=i(c,[["render",h]]);export{g as __pageData,f as default};
