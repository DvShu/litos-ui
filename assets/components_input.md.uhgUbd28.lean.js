import{$ as p}from"./chunks/browser.CpyXlELn.js";import{v as h,P as u,C as c,o as b,c as k,a2 as r,E as n,w as l,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const v=JSON.parse('{"title":"Input 输入框","description":"","frontmatter":{},"headers":[],"relativePath":"components/input.md","filePath":"components/input.md","lastUpdated":1793115401000}'),m={name:"components/input.md"},E=Object.assign(m,{setup(g){let i;function o(s){let t=parseInt(s,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return h(()=>{u(()=>{i=p("#input"),i.addEventListener("change",function(s){console.log("input",s.target.value)}),i.setParser(o)})}),(s,t)=>{const d=c("ClientOnly");return b(),k("div",null,[t[6]||(t[6]=r("",6)),n(d,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容"></l-input>
`)],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),e("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),t[8]||(t[8]=e("p",null,[a("通过 "),e("code",null,"disabled"),a(" 属性设置输入框为禁用状态。")],-1)),n(d,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" disabled></l-input>
`)],-1)])]),_:1}),t[9]||(t[9]=r("",4)),n(d,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数" clearable></l-input>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数"></l-input>
`),e("textarea",{lang:"ts"},`  import { $one, on, off } from 'utilane/browser';
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
`)])],-1)])]),_:1}),t[10]||(t[10]=e("h3",{id:"带图标的输入框",tabindex:"-1"},[a("带图标的输入框 "),e("a",{class:"header-anchor",href:"#带图标的输入框","aria-label":'Permalink to "带图标的输入框"'},"​")],-1)),t[11]||(t[11]=e("p",null,[a("要在输入框中添加图标，只需要使用 "),e("code",null,"prefix"),a(" 和 "),e("code",null,"suffix"),a(" 命名的插槽。")],-1)),n(d,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])]),_:1}),t[12]||(t[12]=e("h3",{id:"带清除图标",tabindex:"-1"},[a("带清除图标 "),e("a",{class:"header-anchor",href:"#带清除图标","aria-label":'Permalink to "带清除图标"'},"​")],-1)),t[13]||(t[13]=e("p",null,[a("使用 "),e("code",null,"clearable"),a(" 属性即可显示一个清除图标，点击图标删除所有内容。")],-1)),n(d,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])]),_:1}),t[14]||(t[14]=e("h3",{id:"错误状态",tabindex:"-1"},[a("错误状态 "),e("a",{class:"header-anchor",href:"#错误状态","aria-label":'Permalink to "错误状态"'},"​")],-1)),t[15]||(t[15]=e("p",null,[a("通过 "),e("code",null,"error"),a(" 属性设置输入框为错误状态。")],-1)),n(d,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" error block></l-input>
`)],-1)])]),_:1}),t[16]||(t[16]=r("",12))])}}});export{v as __pageData,E as default};
