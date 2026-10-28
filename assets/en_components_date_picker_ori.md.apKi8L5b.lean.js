import{$ as c,o as p,a as h}from"./chunks/browser.CpyXlELn.js";import{v as k,P as u,x as m,C as b,o as g,c as y,a2 as i,E as o,w as r,j as t,a as n}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"DatePickerOri 原生日期选择器","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/date_picker_ori.md","filePath":"en/components/date_picker_ori.md","lastUpdated":1793115401000}'),_={name:"en/components/date_picker_ori.md"},x=Object.assign(_,{setup(v){let a;function s(l){console.log(l)}return k(()=>{u(()=>{a=c("#picker"),p(a,"change",s)})}),m(()=>{a&&h(a,"change",s)}),(l,e)=>{const d=b("ClientOnly");return g(),y("div",null,[e[3]||(e[3]=i("",7)),o(d,null,{default:r(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02T17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
  <l-date-picker-ori type="datetime-local" value="2025-05-02T17:00"></l-date-picker-ori>
  <l-date-picker-ori type="time" value="17:00"></l-date-picker-ori>
  <l-date-picker-ori type="month"></l-date-picker-ori>
  <l-date-picker-ori type="week"></l-date-picker-ori>
`),t("textarea",{lang:"js"},`  import { on, $ } from 'utilane/browser';
  //-
  const $pickers = $('l-date-picker-ori');
  on($pickers, 'change', (e) => {
    // { value: string, dateStr: string[], dates: Date[] }
    const detail = e.detail;
  });
`)])],-1)])]),_:1}),e[4]||(e[4]=i("",3)),o(d,null,{default:r(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori min="2025-04-01" max="2025-04-30"></l-date-picker-ori>
`)],-1)])]),_:1}),e[5]||(e[5]=t("h3",{id:"范围选择器",tabindex:"-1"},[n("范围选择器 "),t("a",{class:"header-anchor",href:"#范围选择器","aria-label":'Permalink to "范围选择器"'},"​")],-1)),e[6]||(e[6]=t("p",null,[n("通过 "),t("code",null,"range"),n(" 属性开启范围选择。")],-1)),o(d,null,{default:r(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker-ori>
`)],-1)])]),_:1}),e[7]||(e[7]=i("",9))])}}});export{P as __pageData,x as default};
