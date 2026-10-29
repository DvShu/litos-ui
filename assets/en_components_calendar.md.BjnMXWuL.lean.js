import{$ as y,o as m,a as u}from"./chunks/browser.CpyXlELn.js";import{v as C,P as D,x as E,C as T,o as q,c as S,a2 as b,E as o,w as c,j as a,a as d}from"./chunks/framework.nU6eqUhJ.js";const w=JSON.parse('{"title":"Calendar","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/calendar.md","filePath":"en/components/calendar.md","lastUpdated":1793253144000}'),_={name:"en/components/calendar.md"},F=Object.assign(_,{setup(P){let s,r,i,h=[],p=!1,n=[];function g(l){const e=l.detail;if(!e.isActiveMonth){const t=e.day.split("-");s.setAttribute("year",t[0]),s.setAttribute("month",Number(t[1]))}}function k(l){const e=l.detail;let t=h.indexOf(e.day);t!==-1?h.splice(t,1):h.push(e.day),r.value=h.join("&")}function f(l){if(n[1]=l,n[0]>n[1]){const e=n[0];n[0]=n[1],n[1]=e}}function v(l){const e=l.detail;p?(f(e.dayTimestamp),p=!1):(p=!0,n=[e.dayTimestamp,e.dayTimestamp]),i.value=n.join(",")}function x(l){if(!p)return;const e=l.detail;f(e.dayTimestamp),i.value=n.join(",")}return C(()=>{D(()=>{s=y("#calendar1"),r=y("#calendar2"),i=y("#calendar3"),s&&m(s,"day-click",g),r&&m(r,"day-click",k),i&&(m(i,"day-click",v),m(i,"day-hover",x))})}),E(()=>{s&&u(s,"day-click",g),r&&u(r,"day-click",k),i&&(u(i,"day-click",v),u(i,"day-hover",x))}),(l,e)=>{const t=T("ClientOnly");return q(),S("div",null,[e[5]||(e[5]=b("",8)),o(t,null,{default:c(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar year="2026" month="2"></l-calendar>
`)],-1)])]),_:1}),e[6]||(e[6]=a("h3",{id:"date-limits",tabindex:"-1"},[d("Date Limits "),a("a",{class:"header-anchor",href:"#date-limits","aria-label":'Permalink to "Date Limits"'},"​")],-1)),e[7]||(e[7]=a("p",null,[d("Use "),a("code",null,"min-date"),d(" and "),a("code",null,"max-date"),d(" to limit the selectable dates.")],-1)),o(t,null,{default:c(()=>[...e[1]||(e[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
`)],-1)])]),_:1}),e[8]||(e[8]=a("h3",{id:"changing-the-month",tabindex:"-1"},[d("Changing the Month "),a("a",{class:"header-anchor",href:"#changing-the-month","aria-label":'Permalink to "Changing the Month"'},"​")],-1)),e[9]||(e[9]=a("p",null,[d("Handle "),a("code",null,"day-click"),d(" to obtain the clicked date and change the displayed month when a date from an adjacent month is clicked.")],-1)),o(t,null,{default:c(()=>[...e[2]||(e[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar1"></l-calendar>
`)],-1)])]),_:1}),e[10]||(e[10]=a("h3",{id:"selected-dates",tabindex:"-1"},[d("Selected Dates "),a("a",{class:"header-anchor",href:"#selected-dates","aria-label":'Permalink to "Selected Dates"'},"​")],-1)),e[11]||(e[11]=a("p",null,[d("Use "),a("code",null,'type="select"'),d(" and set "),a("code",null,"value"),d(" to select dates.")],-1)),o(t,null,{default:c(()=>[...e[3]||(e[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar2"></l-calendar>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-calendar id="calendar2"></l-calendar>
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
`)])],-1)])]),_:1}),e[12]||(e[12]=b("",3)),o(t,null,{default:c(()=>[...e[4]||(e[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
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
`)])],-1)])]),_:1}),e[13]||(e[13]=b("",12))])}}});export{w as __pageData,F as default};
