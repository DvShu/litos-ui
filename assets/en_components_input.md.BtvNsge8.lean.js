import{$ as p}from"./chunks/browser.CpyXlELn.js";import{v as h,P as u,C as c,o as b,c as m,a2 as r,E as d,w as i,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const x=JSON.parse('{"title":"Input 输入框","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/input.md","filePath":"en/components/input.md","lastUpdated":1793115401000}'),k={name:"en/components/input.md"},v=Object.assign(k,{setup(g){let s;function o(l){let t=parseInt(l,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return h(()=>{u(()=>{s=p("#input"),s.addEventListener("change",function(l){console.log("input",l.target.value)}),s.setParser(o)})}),(l,t)=>{const n=c("ClientOnly");return b(),m("div",null,[t[6]||(t[6]=r("",6)),d(n,null,{default:i(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容"></l-input>
`)],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),e("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),t[8]||(t[8]=e("p",null,[a("通过 "),e("code",null,"disabled"),a(" 属性设置输入框为禁用状态。")],-1)),d(n,null,{default:i(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" disabled></l-input>
`)],-1)])]),_:1}),t[9]||(t[9]=r("",4)),d(n,null,{default:i(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="请输入正整数" clearable></l-input>
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
`)])],-1)])]),_:1}),t[10]||(t[10]=e("h3",{id:"带图标的输入框",tabindex:"-1"},[a("带图标的输入框 "),e("a",{class:"header-anchor",href:"#带图标的输入框","aria-label":'Permalink to "带图标的输入框"'},"​")],-1)),t[11]||(t[11]=e("p",null,[a("要在输入框中添加图标，只需要使用 "),e("code",null,"prefix"),a(" 和 "),e("code",null,"suffix"),a(" 命名的插槽。")],-1)),d(n,null,{default:i(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])]),_:1}),t[12]||(t[12]=e("h3",{id:"带清除图标",tabindex:"-1"},[a("带清除图标 "),e("a",{class:"header-anchor",href:"#带清除图标","aria-label":'Permalink to "带清除图标"'},"​")],-1)),t[13]||(t[13]=e("p",null,[a("使用 "),e("code",null,"clearable"),a(" 属性即可显示一个清除图标，点击图标删除所有内容。")],-1)),d(n,null,{default:i(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])]),_:1}),t[14]||(t[14]=e("h3",{id:"错误状态",tabindex:"-1"},[a("错误状态 "),e("a",{class:"header-anchor",href:"#错误状态","aria-label":'Permalink to "错误状态"'},"​")],-1)),t[15]||(t[15]=e("p",null,[a("通过 "),e("code",null,"error"),a(" 属性设置输入框为错误状态。")],-1)),d(n,null,{default:i(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" error block></l-input>
`)],-1)])]),_:1}),t[16]||(t[16]=r("",12))])}}});export{x as __pageData,v as default};
