import{$ as c}from"./chunks/browser.7zTvUqO3.js";import{v as h,P as r,C as p,o as u,c as k,a2 as n,E as d,w as o,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const E=JSON.parse('{"title":"Switch 开关","description":"","frontmatter":{},"headers":[],"relativePath":"components/switch.md","filePath":"components/switch.md","lastUpdated":1793335100000}'),b={name:"components/switch.md"},v=Object.assign(b,{setup(m){let s;return h(()=>{r(()=>{s=c("#custom-switch"),s!=null&&s.setActionRender(l=>l.checked?"<l-moon-icon></l-moon-icon>":document.createElement("l-sun-icon"))})}),(l,t)=>{const i=p("ClientOnly");return u(),k("div",null,[t[3]||(t[3]=n("",7)),d(i,null,{default:o(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-switch></l-switch>
`)],-1)])]),_:1}),t[4]||(t[4]=e("h3",{id:"文字描述",tabindex:"-1"},[a("文字描述 "),e("a",{class:"header-anchor",href:"#文字描述","aria-label":'Permalink to "文字描述"'},"​")],-1)),t[5]||(t[5]=e("p",null,[a("使用 "),e("code",null,"checked-text"),a(" 和 "),e("code",null,"unchecked-text"),a(" 属性来设置开关的文字描述。")],-1)),d(i,null,{default:o(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-switch checked-text="Y" unchecked-text="N"></l-switch>
`)],-1)])]),_:1}),t[6]||(t[6]=n("",3)),d(i,null,{default:o(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <l-switch id="custom-switch"></l-switch>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <!-- 使用 checked-action 和 unchecked-action 插槽 -->
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <!-- 使用 js 设置 -->
  <l-switch id="custom-switch"></l-switch>
`),e("textarea",{lang:"js"},`  let $customSwitch = document.querySelector('#custom-switch');
  // 设置 actionRender
  $customSwitch.setActionRender((cfg) => {
    if (cfg.checked) {
      return '<l-moon-icon></l-moon-icon>';
    } else {
      const $dom = document.createElement('l-sun-icon');
      return $dom;
    }
  });
`)])],-1)])]),_:1}),t[7]||(t[7]=n("",14))])}}});export{E as __pageData,v as default};
