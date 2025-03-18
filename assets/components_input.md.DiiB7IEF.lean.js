import{b as p}from"./chunks/dom.CBY_V37t.js";import{v as u,P as h,C as c,c as b,o as m,ag as i,G as n,j as e,w as l,a}from"./chunks/framework.BCyZWppQ.js";const x=JSON.parse('{"title":"Input 输入框","description":"","frontmatter":{},"headers":[],"relativePath":"components/input.md","filePath":"components/input.md","lastUpdated":1737345140000}'),k={name:"components/input.md"},P=Object.assign(k,{setup(g){let r;function s(o){let t=parseInt(o,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return u(()=>{h(()=>{r=p("#input"),r.setParser(s)})}),(o,t)=>{const d=c("ClientOnly");return m(),b("div",null,[t[4]||(t[4]=i("",6)),n(d,null,{default:l(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容"></l-input>
`)],-1)])),_:1}),t[5]||(t[5]=e("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),e("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),t[6]||(t[6]=e("p",null,[a("通过 "),e("code",null,"disabled"),a(" 属性设置输入框为禁用状态。")],-1)),n(d,null,{default:l(()=>t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" disabled></l-input>
`)],-1)])),_:1}),t[7]||(t[7]=i("",2)),n(d,null,{default:l(()=>t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="只能输入正整数" allow-input="integer"></l-input>
  <l-input placeholder="只能输入整数" allow-input="-integer"></l-input>
  <l-input placeholder="输入数字,保留2位小数" allow-input="-number.2"></l-input>
`)],-1)])),_:1}),t[8]||(t[8]=e("h3",{id:"输入解析",tabindex:"-1"},[a("输入解析 "),e("a",{class:"header-anchor",href:"#输入解析","aria-label":'Permalink to "输入解析"'},"​")],-1)),t[9]||(t[9]=e("p",null,[a("通过 "),e("code",null,"setParser"),a(" 给节点设置自定义 "),e("code",null,"parser"),a(" 在接受到输入值的时候进行解析，例如：只允许输入正整数")],-1)),n(d,null,{default:l(()=>t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数"></l-input>
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
`)])],-1)])),_:1}),t[10]||(t[10]=i("",9))])}}});export{x as __pageData,P as default};
