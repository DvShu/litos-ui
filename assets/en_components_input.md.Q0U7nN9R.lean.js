import{v as h,x as c,C as b,o as m,c as k,a2 as l,E as i,w as d,j as t,a,P as g}from"./chunks/framework.DBq8O7k4.js";const E=JSON.parse('{"title":"Input","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/input.md","filePath":"en/components/input.md","lastUpdated":1795187990000}'),y={name:"en/components/input.md"},x=Object.assign(y,{setup(f){let s,o=!1;function p(r){console.log("input",r.target.value)}function u(r){let e=parseInt(r,10);return Number.isNaN(e)?e="":e=Math.abs(e),String(e)}return h(async()=>{o=!0,await customElements.whenDefined("l-input"),await g(),o&&(s=document.querySelector("l-input#input-parser-example"),s==null||s.setParser(u),s==null||s.addEventListener("change",p))}),c(()=>{o=!1,s==null||s.removeEventListener("change",p),s=void 0}),(r,e)=>{const n=b("ClientOnly");return m(),k("div",null,[e[8]||(e[8]=l("",6)),i(n,null,{default:d(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input placeholder="Enter text"></l-input>
`)],-1)])]),_:1}),e[9]||(e[9]=t("h3",{id:"disabled-state",tabindex:"-1"},[a("Disabled State "),t("a",{class:"header-anchor",href:"#disabled-state","aria-label":'Permalink to "Disabled State"'},"​")],-1)),e[10]||(e[10]=t("p",null,[a("Set "),t("code",null,"disabled"),a(" to disable the input.")],-1)),i(n,null,{default:d(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input placeholder="Enter text" disabled></l-input>
`)],-1)])]),_:1}),e[11]||(e[11]=l("",2)),i(n,null,{default:d(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input value="Read-only text you can select and copy" readonly clearable></l-input>
`)],-1)])]),_:1}),e[12]||(e[12]=l("",5)),i(n,null,{default:d(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input id="input-parser-example" placeholder="Enter a non-negative integer" clearable></l-input>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-input id="input-parser-example" placeholder="Enter a non-negative integer" clearable></l-input>
`),t("textarea",{lang:"ts"},`  function numericParse(value) {
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
`)])],-1)])]),_:1}),e[13]||(e[13]=l("",3)),i(n,null,{default:d(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input placeholder="input something">
    <l-reduction-icon slot="prefix"></l-reduction-icon>
    <l-search-icon slot="suffix"></l-search-icon>
  </l-input>
`)],-1)])]),_:1}),e[14]||(e[14]=t("h3",{id:"autofill",tabindex:"-1"},[a("Autofill "),t("a",{class:"header-anchor",href:"#autofill","aria-label":'Permalink to "Autofill"'},"​")],-1)),e[15]||(e[15]=t("p",null,[a("Set the "),t("code",null,"autocomplete"),a(" attribute or property to give the browser an autofill hint. When unset, the field inherits the "),t("a",{href:"/litos-ui/en/components/form#form-wide-autofill"},"Form"),a(" default. Removing the field's setting restores inheritance.")],-1)),i(n,null,{default:d(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input name="email" type="email" autocomplete="email" placeholder="Email"></l-input>
  <l-input name="password" type="password" autocomplete="new-password" placeholder="Set a password"></l-input>
`)],-1)])]),_:1}),e[16]||(e[16]=t("p",null,[a("The browser decides whether to offer autofill. Password managers can still fill fields with "),t("code",null,"off"),a(".")],-1)),e[17]||(e[17]=t("h3",{id:"clearable-input",tabindex:"-1"},[a("Clearable Input "),t("a",{class:"header-anchor",href:"#clearable-input","aria-label":'Permalink to "Clearable Input"'},"​")],-1)),e[18]||(e[18]=t("p",null,[a("Set "),t("code",null,"clearable"),a(" to show a clear icon. Clicking it clears the input.")],-1)),i(n,null,{default:d(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input placeholder="input something" clearable></l-input>
`)],-1)])]),_:1}),e[19]||(e[19]=t("h3",{id:"error-state",tabindex:"-1"},[a("Error State "),t("a",{class:"header-anchor",href:"#error-state","aria-label":'Permalink to "Error State"'},"​")],-1)),e[20]||(e[20]=t("p",null,[a("Add "),t("code",null,"error"),a(" to display the error state.")],-1)),i(n,null,{default:d(()=>[...e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-input placeholder="Enter text" error block></l-input>
`)],-1)])]),_:1}),e[21]||(e[21]=l("",16))])}}});export{E as __pageData,x as default};
