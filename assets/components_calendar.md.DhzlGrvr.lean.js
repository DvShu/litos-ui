import{$ as b,o as p,a as m}from"./chunks/dom.C80Rjh4g.js";import{v as C,P as D,x as T,C as _,o as E,c as q,ag as y,E as s,w as c,j as a,a as d}from"./chunks/framework.C43vV33z.js";const R=JSON.parse('{"title":"Calendar 日历","description":"","frontmatter":{},"headers":[],"relativePath":"components/calendar.md","filePath":"components/calendar.md","lastUpdated":1775148860000}'),P={name:"components/calendar.md"},j=Object.assign(P,{setup(S){let o,i,r,h=[],u=!1,l=[];function g(n){const e=n.detail;if(!e.isActiveMonth){const t=e.day.split("-");o.setAttribute("year",t[0]),o.setAttribute("month",Number(t[1]))}}function f(n){const e=n.detail;let t=h.indexOf(e.day);t!==-1?h.splice(t,1):h.push(e.day),i.value=h.join("&")}function k(n){if(l[1]=n,l[0]>l[1]){const e=l[0];l[0]=l[1],l[1]=e}}function v(n){const e=n.detail;u?(k(e.dayTimestamp),u=!1):(u=!0,l=[e.dayTimestamp,e.dayTimestamp]),r.value=l.join(",")}function x(n){if(!u)return;const e=n.detail;k(e.dayTimestamp),r.value=l.join(",")}return C(()=>{D(()=>{o=b("#calendar1"),i=b("#calendar2"),r=b("#calendar3"),o&&p(o,"day-click",g),i&&p(i,"day-click",f),r&&(p(r,"day-click",v),p(r,"day-hover",x))})}),T(()=>{o&&m(o,"day-click",g),i&&m(i,"day-click",f),r&&(m(r,"day-click",v),m(r,"day-hover",x))}),(n,e)=>{const t=_("ClientOnly");return E(),q("div",null,[e[5]||(e[5]=y("",7)),s(t,null,{default:c(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar year="2026" month="2"></l-calendar>
`)],-1)])]),_:1}),e[6]||(e[6]=a("h3",{id:"限制可选日期",tabindex:"-1"},[d("限制可选日期 "),a("a",{class:"header-anchor",href:"#限制可选日期","aria-label":'Permalink to "限制可选日期"'},"​")],-1)),e[7]||(e[7]=a("p",null,[d("通过 "),a("code",null,"min-date"),d("、"),a("code",null,"max-date"),d(" 属性可以限制可选日期的范围。")],-1)),s(t,null,{default:c(()=>[...e[1]||(e[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
`)],-1)])]),_:1}),e[8]||(e[8]=a("h3",{id:"日期切换",tabindex:"-1"},[d("日期切换 "),a("a",{class:"header-anchor",href:"#日期切换","aria-label":'Permalink to "日期切换"'},"​")],-1)),e[9]||(e[9]=a("p",null,[d("通过监听 "),a("code",null,"day-click"),d(" 事件来获取点击的日期，并实现点击上一月、下一月日期时，切换日期")],-1)),s(t,null,{default:c(()=>[...e[2]||(e[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar1"></l-calendar>
`)],-1)])]),_:1}),e[10]||(e[10]=a("h3",{id:"选中日期",tabindex:"-1"},[d("选中日期 "),a("a",{class:"header-anchor",href:"#选中日期","aria-label":'Permalink to "选中日期"'},"​")],-1)),e[11]||(e[11]=a("p",null,[d("通过 "),a("code",null,"type=select"),d(" 然后设置 "),a("code",null,"value"),d(" 属性，可以选中指定的日期。")],-1)),s(t,null,{default:c(()=>[...e[3]||(e[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar2"></l-calendar>
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
`)])],-1)])]),_:1}),e[12]||(e[12]=y("",3)),s(t,null,{default:c(()=>[...e[4]||(e[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
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
`)])],-1)])]),_:1}),e[13]||(e[13]=y("",9))])}}});export{R as __pageData,j as default};
