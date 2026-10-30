import{$ as m,o as u,a as k}from"./chunks/browser.7zTvUqO3.js";import{v as C,P as x,x as D,C as q,o as F,c as S,a2 as b,E as o,w as c,j as e,a as d}from"./chunks/framework.nU6eqUhJ.js";const j=JSON.parse('{"title":"Calendar 日历","description":"","frontmatter":{},"headers":[],"relativePath":"components/calendar.md","filePath":"components/calendar.md","lastUpdated":1793335100000}'),T={name:"components/calendar.md"},$=Object.assign(T,{setup(_){let i,r,s,h=[],p=!1,l=[];function g(n){const a=n.detail;if(!a.isActiveMonth){const t=a.day.split("-");i.setAttribute("year",t[0]),i.setAttribute("month",Number(t[1]))}}function y(n){const a=n.detail;let t=h.indexOf(a.day);t!==-1?h.splice(t,1):h.push(a.day),r.value=h.join("&")}function E(n){if(l[1]=n,l[0]>l[1]){const a=l[0];l[0]=l[1],l[1]=a}}function f(n){const a=n.detail;p?(E(a.dayTimestamp),p=!1):(p=!0,l=[a.dayTimestamp,a.dayTimestamp]),s.value=l.join(",")}function v(n){if(!p)return;const a=n.detail;E(a.dayTimestamp),s.value=l.join(",")}return C(()=>{x(()=>{i=m("#calendar1"),r=m("#calendar2"),s=m("#calendar3"),i&&u(i,"day-click",g),r&&u(r,"day-click",y),s&&(u(s,"day-click",f),u(s,"day-hover",v))})}),D(()=>{i&&k(i,"day-click",g),r&&k(r,"day-click",y),s&&(k(s,"day-click",f),k(s,"day-hover",v))}),(n,a)=>{const t=q("ClientOnly");return F(),S("div",null,[a[5]||(a[5]=b("",7)),o(t,null,{default:c(()=>[...a[0]||(a[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-calendar year="2026" month="2"></l-calendar>
`)],-1)])]),_:1}),a[6]||(a[6]=e("h3",{id:"限制可选日期",tabindex:"-1"},[d("限制可选日期 "),e("a",{class:"header-anchor",href:"#限制可选日期","aria-label":'Permalink to "限制可选日期"'},"​")],-1)),a[7]||(a[7]=e("p",null,[d("通过 "),e("code",null,"min-date"),d("、"),e("code",null,"max-date"),d(" 属性可以限制可选日期的范围。")],-1)),o(t,null,{default:c(()=>[...a[1]||(a[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-calendar min-date="2026-03-20" max-date="2026-03-25"></l-calendar>
`)],-1)])]),_:1}),a[8]||(a[8]=e("h3",{id:"日期切换",tabindex:"-1"},[d("日期切换 "),e("a",{class:"header-anchor",href:"#日期切换","aria-label":'Permalink to "日期切换"'},"​")],-1)),a[9]||(a[9]=e("p",null,[d("通过监听 "),e("code",null,"day-click"),d(" 事件来获取点击的日期，并实现点击上一月、下一月日期时，切换日期")],-1)),o(t,null,{default:c(()=>[...a[2]||(a[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-calendar id="calendar1"></l-calendar>
`)],-1)])]),_:1}),a[10]||(a[10]=e("h3",{id:"选中日期",tabindex:"-1"},[d("选中日期 "),e("a",{class:"header-anchor",href:"#选中日期","aria-label":'Permalink to "选中日期"'},"​")],-1)),a[11]||(a[11]=e("p",null,[d("通过 "),e("code",null,"type=select"),d(" 然后设置 "),e("code",null,"value"),d(" 属性，可以选中指定的日期。")],-1)),o(t,null,{default:c(()=>[...a[3]||(a[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-calendar id="calendar2"></l-calendar>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-calendar id="calendar2"></l-calendar>
`),e("textarea",{lang:"js"},`  const $calendar2 = $one('#calendar2');
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
`)])],-1)])]),_:1}),a[12]||(a[12]=b("",3)),o(t,null,{default:c(()=>[...a[4]||(a[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
`),e("textarea",{lang:"js"},`  const $calendar3 = $one('#calendar3');
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
`)])],-1)])]),_:1}),a[13]||(a[13]=b("",16))])}}});export{j as __pageData,$ as default};
