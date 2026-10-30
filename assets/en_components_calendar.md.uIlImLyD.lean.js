import{$ as g,o as u,a as m}from"./chunks/browser.7zTvUqO3.js";import{v as C,P as x,x as D,C as S,o as q,c as T,a2 as k,E as o,w as c,j as a,a as n}from"./chunks/framework.nU6eqUhJ.js";const w=JSON.parse('{"title":"Calendar","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/calendar.md","filePath":"en/components/calendar.md","lastUpdated":1793335100000}'),F={name:"en/components/calendar.md"},R=Object.assign(F,{setup(_){let i,r,d,h=[],p=!1,l=[];function y(s){const e=s.detail;if(!e.isActiveMonth){const t=e.day.split("-");i.setAttribute("year",t[0]),i.setAttribute("month",Number(t[1]))}}function b(s){const e=s.detail;let t=h.indexOf(e.day);t!==-1?h.splice(t,1):h.push(e.day),r.value=h.join("&")}function f(s){if(l[1]=s,l[0]>l[1]){const e=l[0];l[0]=l[1],l[1]=e}}function v(s){const e=s.detail;p?(f(e.dayTimestamp),p=!1):(p=!0,l=[e.dayTimestamp,e.dayTimestamp]),d.value=l.join(",")}function E(s){if(!p)return;const e=s.detail;f(e.dayTimestamp),d.value=l.join(",")}return C(()=>{x(()=>{i=g("#calendar1"),r=g("#calendar2"),d=g("#calendar3"),i&&u(i,"day-click",y),r&&u(r,"day-click",b),d&&(u(d,"day-click",v),u(d,"day-hover",E))})}),D(()=>{i&&m(i,"day-click",y),r&&m(r,"day-click",b),d&&(m(d,"day-click",v),m(d,"day-hover",E))}),(s,e)=>{const t=S("ClientOnly");return q(),T("div",null,[e[5]||(e[5]=k("",8)),o(t,null,{default:c(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" year="2026" month="2"></l-calendar>
`)],-1)])]),_:1}),e[6]||(e[6]=a("h3",{id:"date-limits",tabindex:"-1"},[n("Date Limits "),a("a",{class:"header-anchor",href:"#date-limits","aria-label":'Permalink to "Date Limits"'},"​")],-1)),e[7]||(e[7]=a("p",null,[n("Use "),a("code",null,"min-date"),n(" and "),a("code",null,"max-date"),n(" to limit the selectable dates.")],-1)),o(t,null,{default:c(()=>[...e[1]||(e[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
`)],-1)])]),_:1}),e[8]||(e[8]=a("h3",{id:"changing-the-month",tabindex:"-1"},[n("Changing the Month "),a("a",{class:"header-anchor",href:"#changing-the-month","aria-label":'Permalink to "Changing the Month"'},"​")],-1)),e[9]||(e[9]=a("p",null,[n("Handle "),a("code",null,"day-click"),n(" to obtain the clicked date and change the displayed month when a date from an adjacent month is clicked.")],-1)),o(t,null,{default:c(()=>[...e[2]||(e[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" id="calendar1"></l-calendar>
`)],-1)])]),_:1}),e[10]||(e[10]=a("h3",{id:"selected-dates",tabindex:"-1"},[n("Selected Dates "),a("a",{class:"header-anchor",href:"#selected-dates","aria-label":'Permalink to "Selected Dates"'},"​")],-1)),e[11]||(e[11]=a("p",null,[n("Use "),a("code",null,'type="select"'),n(" and set "),a("code",null,"value"),n(" to select dates.")],-1)),o(t,null,{default:c(()=>[...e[3]||(e[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" id="calendar2"></l-calendar>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" id="calendar2"></l-calendar>
`),a("textarea",{lang:"js"},`  const $calendar2 = $one('#calendar2');
  const selectedDates = [];
  //-
  function handleDayClick2(e) {
    const detail = e.detail;
    let i = selectedDates.indexOf(detail.day);
    if (i !== -1) {
      selectedDates.splice(i, 1);
    } else {
      selectedDates.push(detail.day);
    }
    $calendar2.value = selectedDates.join("&");
  }
  //-
  on($calendar2, 'day-click', handleDayClick2);
`)])],-1)])]),_:1}),e[12]||(e[12]=k("",3)),o(t,null,{default:c(()=>[...e[4]||(e[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" id="calendar3" type="range"></l-calendar>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-calendar locale="en-US" id="calendar3" type="range"></l-calendar>
`),a("textarea",{lang:"js"},`  const $calendar3 = $one('#calendar3');
  let startRangeSelect = false;
  let rangeDate = [];
  //-
  function updateRangeEnd(endDate) {
    rangeDate[1] = endDate;
    if (rangeDate[0] > rangeDate[1]) {
      const temp = rangeDate[0];
      rangeDate[0] = rangeDate[1];
      rangeDate[1] = temp;
    }
  }
  //-
  function handleDayClick3(e) {
    const detail = e.detail;
    if (!startRangeSelect) {
      startRangeSelect = true;
      rangeDate = [detail.dayTimestamp, detail.dayTimestamp];
    } else {
      updateRangeEnd(detail.dayTimestamp);
      startRangeSelect = false;
    }
    $calendar3.value = rangeDate.join(",");
  }
  //-
  function handleDayHover(e) {
    if (!startRangeSelect) return;
    const detail = e.detail;
    updateRangeEnd(detail.dayTimestamp);
    $calendar3.value = rangeDate.join(",");
  }
  //-
  on($calendar3, 'day-click', handleDayClick3);
  on($calendar3, 'day-hover', handleDayHover);
`)])],-1)])]),_:1}),e[13]||(e[13]=k("",16))])}}});export{w as __pageData,R as default};
