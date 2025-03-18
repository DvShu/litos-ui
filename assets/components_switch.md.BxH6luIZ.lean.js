import{b as l}from"./chunks/dom.CBY_V37t.js";import{v as h,P as r,C as u,c as b,o as m,ag as c,G as o,j as t,w as i,a}from"./chunks/framework.BCyZWppQ.js";const g=JSON.parse('{"title":"Switch 开关","description":"","frontmatter":{},"headers":[],"relativePath":"components/switch.md","filePath":"components/switch.md","lastUpdated":1734017180000}'),p={name:"components/switch.md"},S=Object.assign(p,{setup(w){let d;return h(()=>{r(()=>{d=l("#custom-switch"),d!=null&&d.setActionRender(s=>s.checked?"<l-moon-icon></l-moon-icon>":document.createElement("l-sun-icon"))})}),(s,e)=>{const n=u("ClientOnly");return m(),b("div",null,[e[3]||(e[3]=c("",7)),o(n,null,{default:i(()=>e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-switch></l-switch>
`)],-1)])),_:1}),e[4]||(e[4]=t("h3",{id:"文字描述",tabindex:"-1"},[a("文字描述 "),t("a",{class:"header-anchor",href:"#文字描述","aria-label":'Permalink to "文字描述"'},"​")],-1)),e[5]||(e[5]=t("p",null,[a("使用 "),t("code",null,"checked-text"),a(" 和 "),t("code",null,"unchecked-text"),a(" 属性来设置开关的文字描述。")],-1)),o(n,null,{default:i(()=>e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-switch checked-text="Y" unchecked-text="N"></l-switch>
`)],-1)])),_:1}),e[6]||(e[6]=t("h3",{id:"自定义操作图标",tabindex:"-1"},[a("自定义操作图标 "),t("a",{class:"header-anchor",href:"#自定义操作图标","aria-label":'Permalink to "自定义操作图标"'},"​")],-1)),e[7]||(e[7]=t("p",null,[a("既可以通过使用 "),t("code",null,"checked-action"),a(" 插槽 和 "),t("code",null,"unchecked-action"),a(" 插槽分别渲染打开/关闭时的操作图标。也可以通过 "),t("code",null,"js"),a(" 设置 "),t("code",null,"actionRender"),a(" 来渲染操作图标.")],-1)),o(n,null,{default:i(()=>e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <l-switch id="custom-switch"></l-switch>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <!-- 使用 checked-action 和 unchecked-action 插槽 -->
  <l-switch>
    <l-sun-icon slot="unchecked-action"></l-sun-icon>
    <l-moon-icon slot="checked-action"></l-moon-icon>
  </l-switch>
  <!-- 使用 js 设置 -->
  <l-switch id="custom-switch"></l-switch>
`),t("textarea",{lang:"js"},`  let $customSwitch = document.querySelector('#custom-switch');
  // 设置 actionRender
  $customSwitch.setActionRender((cfg) => {
    if (cfg.checked) {
      return '<l-moon-icon></l-moon-icon>';
    } else {
      const $dom = document.createElement('l-sun-icon');
      return $dom;
    }
  });
`)])],-1)])),_:1}),e[8]||(e[8]=c("",11))])}}});export{g as __pageData,S as default};
