import{$ as s,o as p,a as h}from"./chunks/dom.BOKvBN-7.js";import{v as k,P as u,x as m,C as b,c as g,o as _,ag as o,G as i,j as t,w as c,a as r}from"./chunks/framework.BCyZWppQ.js";const y=JSON.parse('{"title":"DatePicker","description":"","frontmatter":{},"headers":[],"relativePath":"components/date_picker.md","filePath":"components/date_picker.md","lastUpdated":1743672472000}'),f={name:"components/date_picker.md"},q=Object.assign(f,{setup(v){let d;function l(n){console.log(n)}return k(()=>{u(()=>{d=s("#picker"),p(d,"change",l)})}),m(()=>{d&&h(d,"change",l)}),(n,e)=>{const a=b("ClientOnly");return _(),g("div",null,[e[3]||(e[3]=o("",7)),i(a,null,{default:c(()=>e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker value="2025-04-02"></l-date-picker>
  <l-date-picker type="datetime-local" value="2025-05-02 17:00"></l-date-picker>
  <l-date-picker type="time" value="17:00"></l-date-picker>
  <l-date-picker type="month"></l-date-picker>
  <l-date-picker type="week"></l-date-picker>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-date-picker value="2025-04-02"></l-date-picker>
  <l-date-picker type="datetime-local" value="2025-05-02 17:00"></l-date-picker>
  <l-date-picker type="time" value="17:00"></l-date-picker>
  <l-date-picker type="month"></l-date-picker>
  <l-date-picker type="week"></l-date-picker>
`),t("textarea",{lang:"js"},`  import { on, $ } from 'ph-utils/dom';
  //-
  const $pickers = $('l-date-picker');
  on($pickers, 'change', (e) => {
    // { value: string, dateStr: string[], dates: Date[] }
    const detail = e.detail;
  });
`)])],-1)])),_:1}),e[4]||(e[4]=o("",3)),i(a,null,{default:c(()=>e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker min="2025-04-01" max="2025-04-30"></l-date-picker>
`)],-1)])),_:1}),e[5]||(e[5]=t("h3",{id:"范围选择器",tabindex:"-1"},[r("范围选择器 "),t("a",{class:"header-anchor",href:"#范围选择器","aria-label":'Permalink to "范围选择器"'},"​")],-1)),e[6]||(e[6]=t("p",null,[r("通过 "),t("code",null,"range"),r(" 属性开启范围选择。")],-1)),i(a,null,{default:c(()=>e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker>
`)],-1)])),_:1}),e[7]||(e[7]=o("",7))])}}});export{y as __pageData,q as default};
