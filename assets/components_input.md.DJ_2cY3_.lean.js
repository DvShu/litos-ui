import{$ as h}from"./chunks/browser.7zTvUqO3.js";import{v as u,P as c,x as k,C as b,o as g,c as m,a2 as l,E as n,w as d,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const x=JSON.parse('{"title":"Input 输入框","description":"","frontmatter":{},"headers":[],"relativePath":"components/input.md","filePath":"components/input.md","lastUpdated":1793335100000}'),E={name:"components/input.md"},q=Object.assign(E,{setup(y){let s;function o(r){console.log("input",r.target.value)}function p(r){let t=parseInt(r,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return u(()=>{c(()=>{s=h("#input"),s&&(s.addEventListener("change",o),s.setParser(p))})}),k(()=>{s==null||s.removeEventListener("change",o),s=void 0}),(r,t)=>{const i=b("ClientOnly");return g(),m("div",null,[t[7]||(t[7]=l("",6)),n(i,null,{default:d(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容"></l-input>
`)],-1)])]),_:1}),t[8]||(t[8]=e("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),e("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),t[9]||(t[9]=e("p",null,[a("通过 "),e("code",null,"disabled"),a(" 属性设置输入框为禁用状态。")],-1)),n(i,null,{default:d(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" disabled></l-input>
`)],-1)])]),_:1}),t[10]||(t[10]=l("",2)),n(i,null,{default:d(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input value="只读内容，可以选择和复制" readonly clearable></l-input>
`)],-1)])]),_:1}),t[11]||(t[11]=l("",5)),n(i,null,{default:d(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数" clearable></l-input>
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
`)])],-1)])]),_:1}),t[12]||(t[12]=l("",3)),n(i,null,{default:d(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"带清除图标",tabindex:"-1"},[a("带清除图标 "),e("a",{class:"header-anchor",href:"#带清除图标","aria-label":'Permalink to "带清除图标"'},"​")],-1)),t[14]||(t[14]=e("p",null,[a("使用 "),e("code",null,"clearable"),a(" 属性即可显示一个清除图标，点击图标删除所有内容。")],-1)),n(i,null,{default:d(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])]),_:1}),t[15]||(t[15]=e("h3",{id:"错误状态",tabindex:"-1"},[a("错误状态 "),e("a",{class:"header-anchor",href:"#错误状态","aria-label":'Permalink to "错误状态"'},"​")],-1)),t[16]||(t[16]=e("p",null,[a("通过 "),e("code",null,"error"),a(" 属性设置输入框为错误状态。")],-1)),n(i,null,{default:d(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" error block></l-input>
`)],-1)])]),_:1}),t[17]||(t[17]=l("",12))])}}});export{x as __pageData,q as default};
