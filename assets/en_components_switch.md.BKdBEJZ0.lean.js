import{$ as c}from"./chunks/browser.7zTvUqO3.js";import{v as r,P as h,C as p,o as u,c as m,a2 as n,E as o,w as d,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const f=JSON.parse('{"title":"Switch","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/switch.md","filePath":"en/components/switch.md","lastUpdated":1793335100000}'),b={name:"en/components/switch.md"},y=Object.assign(b,{setup(k){let s;return r(()=>{h(()=>{s=c("#custom-switch"),s!=null&&s.setActionRender(l=>l.checked?"<l-moon-icon></l-moon-icon>":document.createElement("l-sun-icon"))})}),(l,t)=>{const i=p("ClientOnly");return u(),m("div",null,[t[3]||(t[3]=n("",7)),o(i,null,{default:d(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-switch></l-switch>
`)],-1)])]),_:1}),t[4]||(t[4]=e("h3",{id:"text-labels",tabindex:"-1"},[a("Text Labels "),e("a",{class:"header-anchor",href:"#text-labels","aria-label":'Permalink to "Text Labels"'},"​")],-1)),t[5]||(t[5]=e("p",null,[a("Set "),e("code",null,"checked-text"),a(" and "),e("code",null,"unchecked-text"),a(" to describe the on and off states.")],-1)),o(i,null,{default:d(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-switch checked-text="Y" unchecked-text="N"></l-switch>
`)],-1)])]),_:1}),t[6]||(t[6]=n("",3)),o(i,null,{default:d(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <l-switch id="custom-switch"></l-switch>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <!-- Use the checked-action and unchecked-action slots. -->
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <!-- Set the renderer with JavaScript. -->
  <l-switch id="custom-switch"></l-switch>
`),e("textarea",{lang:"js"},`  let $customSwitch = document.querySelector('#custom-switch');
  // Set actionRender.
  $customSwitch.setActionRender((cfg) => {
    if (cfg.checked) {
      return '<l-moon-icon></l-moon-icon>';
    } else {
      const $dom = document.createElement('l-sun-icon');
      return $dom;
    }
  });
`)])],-1)])]),_:1}),t[7]||(t[7]=n("",14))])}}});export{f as __pageData,y as default};
