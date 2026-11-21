import{v as u,x as c,C as k,o as b,c as m,a2 as l,E as i,w as n,j as e,a,P as g}from"./chunks/framework.DBq8O7k4.js";const v=JSON.parse('{"title":"Input 输入框","description":"","frontmatter":{},"headers":[],"relativePath":"components/input.md","filePath":"components/input.md","lastUpdated":1795187990000}'),E={name:"components/input.md"},x=Object.assign(E,{setup(y){let d,o=!1;function p(r){console.log("input",r.target.value)}function h(r){let t=parseInt(r,10);return Number.isNaN(t)?t="":t=Math.abs(t),String(t)}return u(async()=>{o=!0,await customElements.whenDefined("l-input"),await g(),o&&(d=document.querySelector("l-input#input-parser-example"),d==null||d.setParser(h),d==null||d.addEventListener("change",p))}),c(()=>{o=!1,d==null||d.removeEventListener("change",p),d=void 0}),(r,t)=>{const s=k("ClientOnly");return b(),m("div",null,[t[8]||(t[8]=l("",6)),i(s,null,{default:n(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容"></l-input>
`)],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),e("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),t[10]||(t[10]=e("p",null,[a("通过 "),e("code",null,"disabled"),a(" 属性设置输入框为禁用状态。")],-1)),i(s,null,{default:n(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" disabled></l-input>
`)],-1)])]),_:1}),t[11]||(t[11]=l("",2)),i(s,null,{default:n(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input value="只读内容，可以选择和复制" readonly clearable></l-input>
`)],-1)])]),_:1}),t[12]||(t[12]=l("",5)),i(s,null,{default:n(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input id="input-parser-example" placeholder="请输入正整数" clearable></l-input>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-input id="input-parser-example" placeholder="请输入正整数" clearable></l-input>
`),e("textarea",{lang:"ts"},`  function numericParse(value) {
    let val = parseInt(value, 10)
    if (Number.isNaN(val)) {
      val = ''
    } else {
      val = Math.abs(val)
    }
    return String(val);
  }
  //-
  const $input = document.querySelector('l-input#input-parser-example');
  $input.setParser(numericParse);
`)])],-1)])]),_:1}),t[13]||(t[13]=l("",3)),i(s,null,{default:n(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])]),_:1}),t[14]||(t[14]=e("h3",{id:"自动填充",tabindex:"-1"},[a("自动填充 "),e("a",{class:"header-anchor",href:"#自动填充","aria-label":'Permalink to "自动填充"'},"​")],-1)),t[15]||(t[15]=e("p",null,[a("通过 "),e("code",null,"autocomplete"),a(" 设置浏览器的填充提示，也可用实例的 "),e("code",null,"autocomplete"),a(" property 动态修改。未单独设置时继承 "),e("a",{href:"./form"},"Form"),a(" 的默认配置，移除后恢复继承。")],-1)),i(s,null,{default:n(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input name="email" type="email" autocomplete="email" placeholder="邮箱"></l-input>
  <l-input name="password" type="password" autocomplete="new-password" placeholder="设置密码"></l-input>
`)],-1)])]),_:1}),t[16]||(t[16]=e("p",null,[a("是否提供自动填充由浏览器决定，"),e("code",null,"off"),a(" 不强制禁用密码管理器。")],-1)),t[17]||(t[17]=e("h3",{id:"带清除图标",tabindex:"-1"},[a("带清除图标 "),e("a",{class:"header-anchor",href:"#带清除图标","aria-label":'Permalink to "带清除图标"'},"​")],-1)),t[18]||(t[18]=e("p",null,[a("使用 "),e("code",null,"clearable"),a(" 属性即可显示一个清除图标，点击图标删除所有内容。")],-1)),i(s,null,{default:n(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])]),_:1}),t[19]||(t[19]=e("h3",{id:"错误状态",tabindex:"-1"},[a("错误状态 "),e("a",{class:"header-anchor",href:"#错误状态","aria-label":'Permalink to "错误状态"'},"​")],-1)),t[20]||(t[20]=e("p",null,[a("通过 "),e("code",null,"error"),a(" 属性设置输入框为错误状态。")],-1)),i(s,null,{default:n(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-input placeholder="请输入内容" error block></l-input>
`)],-1)])]),_:1}),t[21]||(t[21]=l("",16))])}}});export{v as __pageData,x as default};
