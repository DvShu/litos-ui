import{$ as c,o as p,a as h}from"./chunks/browser.CplAf69P.js";import{v as m,x as k,C as u,o as b,c as g,a2 as r,E as o,w as n,j as t,a,P as y}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const P=JSON.parse('{"title":"DatePickerOri","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/date_picker_ori.md","filePath":"en/components/date_picker_ori.md","lastUpdated":1795187990000}'),v={name:"en/components/date_picker_ori.md"},q=Object.assign(v,{setup(f){let i;function s(l){console.log(l)}return m(()=>{y(()=>{i=c("#picker"),p(i,"change",s)})}),k(()=>{i&&h(i,"change",s)}),(l,e)=>{const d=u("ClientOnly");return b(),g("div",null,[e[3]||(e[3]=r("",7)),o(d,null,{default:n(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori value="2025-04-02"></l-date-picker-ori>
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
`)])],-1)])]),_:1}),e[4]||(e[4]=r("",3)),o(d,null,{default:n(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori min="2025-04-01" max="2025-04-30"></l-date-picker-ori>
`)],-1)])]),_:1}),e[5]||(e[5]=t("h3",{id:"range-picker",tabindex:"-1"},[a("Range Picker "),t("a",{class:"header-anchor",href:"#range-picker","aria-label":'Permalink to "Range Picker"'},"​")],-1)),e[6]||(e[6]=t("p",null,[a("Enable "),t("code",null,"range"),a(" to select a date range.")],-1)),e[7]||(e[7]=t("p",null,[a("The "),t("code",null,"value"),a(" property and the native form submission both use a comma-separated string. The start date sets the minimum for the end date, and the end date sets the maximum for the start date.")],-1)),o(d,null,{default:n(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-date-picker-ori range min="2025-04-01" max="2025-04-15" allow-empty="off" id="picker"></l-date-picker-ori>
`)],-1)])]),_:1}),e[8]||(e[8]=r("",9))])}}});export{P as __pageData,q as default};
