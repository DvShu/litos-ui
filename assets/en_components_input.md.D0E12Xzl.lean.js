import{$ as h}from"./chunks/browser.7zTvUqO3.js";import{v as u,P as c,x as b,C as k,o as m,c as g,a2 as d,E as s,w as l,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const x=JSON.parse('{"title":"Input","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/input.md","filePath":"en/components/input.md","lastUpdated":1793335100000}'),y={name:"en/components/input.md"},q=Object.assign(y,{setup(E){let n;function o(r){console.log("input",r.target.value)}function p(r){let t=parseInt(r,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return u(()=>{c(()=>{n=h("#input"),n&&(n.addEventListener("change",o),n.setParser(p))})}),b(()=>{n==null||n.removeEventListener("change",o),n=void 0}),(r,t)=>{const i=k("ClientOnly");return m(),g("div",null,[t[7]||(t[7]=d("",6)),s(i,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="Enter text"></l-input>
`)],-1)])]),_:1}),t[8]||(t[8]=e("h3",{id:"disabled-state",tabindex:"-1"},[a("Disabled State "),e("a",{class:"header-anchor",href:"#disabled-state","aria-label":'Permalink to "Disabled State"'},"​")],-1)),t[9]||(t[9]=e("p",null,[a("Set "),e("code",null,"disabled"),a(" to disable the input.")],-1)),s(i,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="Enter text" disabled></l-input>
`)],-1)])]),_:1}),t[10]||(t[10]=d("",2)),s(i,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input value="Read-only text you can select and copy" readonly clearable></l-input>
`)],-1)])]),_:1}),t[11]||(t[11]=d("",5)),s(i,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="Enter a non-negative integer" clearable></l-input>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-input id="input" placeholder="Enter a non-negative integer"></l-input>
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
`)])],-1)])]),_:1}),t[12]||(t[12]=d("",3)),s(i,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"clearable-input",tabindex:"-1"},[a("Clearable Input "),e("a",{class:"header-anchor",href:"#clearable-input","aria-label":'Permalink to "Clearable Input"'},"​")],-1)),t[14]||(t[14]=e("p",null,[a("Set "),e("code",null,"clearable"),a(" to show a clear icon. Clicking it clears the input.")],-1)),s(i,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])]),_:1}),t[15]||(t[15]=e("h3",{id:"error-state",tabindex:"-1"},[a("Error State "),e("a",{class:"header-anchor",href:"#error-state","aria-label":'Permalink to "Error State"'},"​")],-1)),t[16]||(t[16]=e("p",null,[a("Add "),e("code",null,"error"),a(" to display the error state.")],-1)),s(i,null,{default:l(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="Enter text" error block></l-input>
`)],-1)])]),_:1}),t[17]||(t[17]=d("",12))])}}});export{x as __pageData,q as default};
