import{$ as s,o as p,a as h}from"./chunks/dom.C80Rjh4g.js";import{v as k,P as u,x as m,C as b,o as _,c as g,ag as o,E as i,w as r,j as t,a as c}from"./chunks/framework.C43vV33z.js";const y=JSON.parse('{"title":"DatePicker","description":"","frontmatter":{},"headers":[],"relativePath":"components/date_picker_ori.md","filePath":"components/date_picker_ori.md","lastUpdated":1772619671000}'),f={name:"components/date_picker_ori.md"},q=Object.assign(f,{setup(v){let d;function l(n){console.log(n)}return k(()=>{u(()=>{d=s("#picker"),p(d,"change",l)})}),m(()=>{d&&h(d,"change",l)}),(n,e)=>{const a=b("ClientOnly");return _(),g("div",null,[e[3]||(e[3]=o("",7)),i(a,null,{default:r(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02 17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02 17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
`),t("textarea",{lang:"js"},`  import { on, $ } from 'ph-utils/dom';
  //-
  const $pickers = $('l-date-picker');
  on($pickers, 'change', (e) => {
    // { value: string, dateStr: string[], dates: Date[] }
    const detail = e.detail;
  });
`)])],-1)])]),_:1}),e[4]||(e[4]=o("",3)),i(a,null,{default:r(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori min="2025-04-01" max="2025-04-30"></l-date-picker-ori>
`)],-1)])]),_:1}),e[5]||(e[5]=t("h3",{id:"范围选择器",tabindex:"-1"},[c("范围选择器 "),t("a",{class:"header-anchor",href:"#范围选择器","aria-label":'Permalink to "范围选择器"'},"​")],-1)),e[6]||(e[6]=t("p",null,[c("通过 "),t("code",null,"range"),c(" 属性开启范围选择。")],-1)),i(a,null,{default:r(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker-ori>
`)],-1)])]),_:1}),e[7]||(e[7]=o("",7))])}}});export{y as __pageData,q as default};
