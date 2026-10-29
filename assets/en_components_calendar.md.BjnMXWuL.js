import{$ as y,o as m,a as u}from"./chunks/browser.CpyXlELn.js";import{v as C,P as D,x as E,C as T,o as q,c as S,a2 as b,E as o,w as c,j as a,a as d}from"./chunks/framework.nU6eqUhJ.js";const w=JSON.parse('{"title":"Calendar","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/calendar.md","filePath":"en/components/calendar.md","lastUpdated":1793253144000}'),_={name:"en/components/calendar.md"},F=Object.assign(_,{setup(P){let s,r,i,h=[],p=!1,n=[];function g(l){const e=l.detail;if(!e.isActiveMonth){const t=e.day.split("-");s.setAttribute("year",t[0]),s.setAttribute("month",Number(t[1]))}}function k(l){const e=l.detail;let t=h.indexOf(e.day);t!==-1?h.splice(t,1):h.push(e.day),r.value=h.join("&")}function f(l){if(n[1]=l,n[0]>n[1]){const e=n[0];n[0]=n[1],n[1]=e}}function v(l){const e=l.detail;p?(f(e.dayTimestamp),p=!1):(p=!0,n=[e.dayTimestamp,e.dayTimestamp]),i.value=n.join(",")}function x(l){if(!p)return;const e=l.detail;f(e.dayTimestamp),i.value=n.join(",")}return C(()=>{D(()=>{s=y("#calendar1"),r=y("#calendar2"),i=y("#calendar3"),s&&m(s,"day-click",g),r&&m(r,"day-click",k),i&&(m(i,"day-click",v),m(i,"day-hover",x))})}),E(()=>{s&&u(s,"day-click",g),r&&u(r,"day-click",k),i&&(u(i,"day-click",v),u(i,"day-hover",x))}),(l,e)=>{const t=T("ClientOnly");return q(),S("div",null,[e[5]||(e[5]=b(`<h1 id="calendar" tabindex="-1">Calendar <a class="header-anchor" href="#calendar" aria-label="Permalink to &quot;Calendar&quot;">​</a></h1><p>Display dates and data in a calendar layout.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Calendar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Calendar);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>The built-in weekday labels currently support only <code>zh-CN</code>. Translating this page does not change the component’s locale support.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Set <code>year</code> and <code>month</code> to display a specific month. The current year and month are used by default.</p>`,8)),o(t,null,{default:c(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar year="2026" month="2"></l-calendar>
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
`)])],-1)])]),_:1}),e[12]||(e[12]=b('<blockquote><p>Separate dates in <code>value</code> with <code>&amp;</code> to select multiple dates.</p></blockquote><h3 id="range-selection" tabindex="-1">Range Selection <a class="header-anchor" href="#range-selection" aria-label="Permalink to &quot;Range Selection&quot;">​</a></h3><p>Use <code>type=&quot;range&quot;</code> and set <code>value</code> to two timestamps in <code>number,number</code> format to select a date range.</p>',3)),o(t,null,{default:c(()=>[...e[4]||(e[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
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
`)])],-1)])]),_:1}),e[13]||(e[13]=b(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/calendar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="calendar-attributes" tabindex="-1">Calendar Attributes <a class="header-anchor" href="#calendar-attributes" aria-label="Permalink to &quot;Calendar Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>min-date</code></td><td>Earliest date, for example <code>2026-04-03</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>max-date</code></td><td>Latest date, for example <code>2026-04-03</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>year</code></td><td>Year, for example <code>2026</code></td><td><code>number</code></td><td>Current year</td></tr><tr><td><code>month</code></td><td>Month, for example <code>4</code></td><td><code>number</code></td><td>Current month</td></tr><tr><td><code>type</code></td><td>Calendar mode: select or range</td><td><code>string</code></td><td><code>select</code></td></tr><tr><td><code>value</code></td><td>Selected dates: &amp;-separated date strings in select mode, or two comma-separated timestamps in range mode; also available as the value property</td><td><code>string</code></td><td>-</td></tr><tr><td><code>locale</code></td><td>Locale; only zh-CN is currently built in</td><td><code>string</code></td><td><code>zh-CN</code></td></tr></tbody></table><h3 id="calendar-slots" tabindex="-1">Calendar Slots <a class="header-anchor" href="#calendar-slots" aria-label="Permalink to &quot;Calendar Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>-</td><td>The default slot is not currently rendered</td></tr></tbody></table><h3 id="calendar-events" tabindex="-1">Calendar Events <a class="header-anchor" href="#calendar-events" aria-label="Permalink to &quot;Calendar Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>day-click</code></td><td>Fires when a date is clicked; detail contains isActiveMonth, day, dayTimestamp, minTimestamp, and maxTimestamp</td><td><code>(event: CustomEvent)</code></td></tr><tr><td><code>day-hover</code></td><td>Fires when a date is hovered; detail has the same structure as day-click</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="calendar-css-variables" tabindex="-1">Calendar CSS Variables <a class="header-anchor" href="#calendar-css-variables" aria-label="Permalink to &quot;Calendar CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-calendar-header-height</code></td><td>Weekday header height</td><td><code>32px</code></td></tr><tr><td><code>--l-calendar-off-text-color</code></td><td>Text color for dates outside the displayed month</td><td><code>#a8abb2</code></td></tr></tbody></table>`,12))])}}});export{w as __pageData,F as default};
