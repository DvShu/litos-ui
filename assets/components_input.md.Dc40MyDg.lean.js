import{$ as u}from"./chunks/dom.BOKvBN-7.js";import{v as p,P as h,C as c,c as b,o as m,ag as i,G as l,j as e,w as n,a}from"./chunks/framework.BCyZWppQ.js";const v=JSON.parse('{"title":"Input 输入框","description":"","frontmatter":{},"headers":[],"relativePath":"components/input.md","filePath":"components/input.md","lastUpdated":1744789039000}'),f={name:"components/input.md"},P=Object.assign(f,{setup(g){let r;function s(o){let t=parseInt(o,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return p(()=>{h(()=>{r=u("#input"),r.addEventListener("change",function(o){console.log("input",o.target.value)}),r.setParser(s)})}),(o,t)=>{const d=c("ClientOnly");return m(),b("div",null,[t[6]||(t[6]=i("",6)),l(d,null,{default:n(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容"></l-input>
`)],-1)])),_:1}),t[7]||(t[7]=e("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),e("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),t[8]||(t[8]=e("p",null,[a("通过 "),e("code",null,"disabled"),a(" 属性设置输入框为禁用状态。")],-1)),l(d,null,{default:n(()=>t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" disabled></l-input>
`)],-1)])),_:1}),t[9]||(t[9]=i("",2)),l(d,null,{default:n(()=>t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="只能输入正整数" allow-input="integer"></l-input>
  <l-input placeholder="只能输入整数" allow-input="-integer"></l-input>
  <l-input placeholder="输入数字,保留2位小数" allow-input="-number.2"></l-input>
`)],-1)])),_:1}),t[10]||(t[10]=e("h3",{id:"输入解析",tabindex:"-1"},[a("输入解析 "),e("a",{class:"header-anchor",href:"#输入解析","aria-label":'Permalink to "输入解析"'},"​")],-1)),t[11]||(t[11]=e("p",null,[a("通过 "),e("code",null,"setParser"),a(" 给节点设置自定义 "),e("code",null,"parser"),a(" 在接受到输入值的时候进行解析，例如：只允许输入正整数")],-1)),l(d,null,{default:n(()=>t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数" clearable></l-input>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数"></l-input>
`),e("textarea",{lang:"ts"},`  import { $one, on, off } from 'ph-utils/dom';
  //-
  function numericParse(value) {
    let val = parseInt(value, 10)
    if (Number.isNaN(val)) {
      val = ''
    } else {
      val = Math.abs(val)
    }
    return String(val);
  }
  //-
  const $input = $one('#input');
  $input.setParser(numericParse);
`)])],-1)])),_:1}),t[12]||(t[12]=e("h3",{id:"带图标的输入框",tabindex:"-1"},[a("带图标的输入框 "),e("a",{class:"header-anchor",href:"#带图标的输入框","aria-label":'Permalink to "带图标的输入框"'},"​")],-1)),t[13]||(t[13]=e("p",null,[a("要在输入框中添加图标，只需要使用 "),e("code",null,"prefix"),a(" 和 "),e("code",null,"suffix"),a(" 命名的插槽。")],-1)),l(d,null,{default:n(()=>t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])),_:1}),t[14]||(t[14]=e("h3",{id:"带清除图标",tabindex:"-1"},[a("带清除图标 "),e("a",{class:"header-anchor",href:"#带清除图标","aria-label":'Permalink to "带清除图标"'},"​")],-1)),t[15]||(t[15]=e("p",null,[a("使用 "),e("code",null,"clearable"),a(" 属性即可显示一个清除图标，点击图标删除所有内容。")],-1)),l(d,null,{default:n(()=>t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])),_:1}),t[16]||(t[16]=i("",9))])}}});export{v as __pageData,P as default};
