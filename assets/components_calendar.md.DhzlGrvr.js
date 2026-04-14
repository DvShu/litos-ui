import{$ as b,o as p,a as m}from"./chunks/dom.C80Rjh4g.js";import{v as C,P as D,x as T,C as _,o as E,c as q,ag as y,E as s,w as c,j as a,a as d}from"./chunks/framework.C43vV33z.js";const R=JSON.parse('{"title":"Calendar 日历","description":"","frontmatter":{},"headers":[],"relativePath":"components/calendar.md","filePath":"components/calendar.md","lastUpdated":1775148860000}'),P={name:"components/calendar.md"},j=Object.assign(P,{setup(S){let o,i,r,h=[],u=!1,l=[];function g(n){const e=n.detail;if(!e.isActiveMonth){const t=e.day.split("-");o.setAttribute("year",t[0]),o.setAttribute("month",Number(t[1]))}}function f(n){const e=n.detail;let t=h.indexOf(e.day);t!==-1?h.splice(t,1):h.push(e.day),i.value=h.join("&")}function k(n){if(l[1]=n,l[0]>l[1]){const e=l[0];l[0]=l[1],l[1]=e}}function v(n){const e=n.detail;u?(k(e.dayTimestamp),u=!1):(u=!0,l=[e.dayTimestamp,e.dayTimestamp]),r.value=l.join(",")}function x(n){if(!u)return;const e=n.detail;k(e.dayTimestamp),r.value=l.join(",")}return C(()=>{D(()=>{o=b("#calendar1"),i=b("#calendar2"),r=b("#calendar3"),o&&p(o,"day-click",g),i&&p(i,"day-click",f),r&&(p(r,"day-click",v),p(r,"day-hover",x))})}),T(()=>{o&&m(o,"day-click",g),i&&m(i,"day-click",f),r&&(m(r,"day-click",v),m(r,"day-hover",x))}),(n,e)=>{const t=_("ClientOnly");return E(),q("div",null,[e[5]||(e[5]=y(`<h1 id="calendar-日历" tabindex="-1">Calendar 日历 <a class="header-anchor" href="#calendar-日历" aria-label="Permalink to &quot;Calendar 日历&quot;">​</a></h1><p>显示日期；按照日历的形式展示数据的容器</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Calendar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Calendar);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>渲染 <code>year</code>、<code>month</code> 渲染指定年月的日历。默认为当前年月。</p>`,7)),s(t,null,{default:c(()=>[...e[0]||(e[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar year="2026" month="2"></l-calendar>
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
`)])],-1)])]),_:1}),e[12]||(e[12]=y('<blockquote><p><code>value</code> 的值通过 <code>&amp;</code> 分隔实现选择多个日期</p></blockquote><h3 id="范围选择" tabindex="-1">范围选择 <a class="header-anchor" href="#范围选择" aria-label="Permalink to &quot;范围选择&quot;">​</a></h3><p>通过 <code>type=range</code> 然后设置 <code>value</code> 属性为一个 <code>number,number</code> 格式的值，可以选中的日期范围。</p>',3)),s(t,null,{default:c(()=>[...e[4]||(e[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-calendar id="calendar3" type="range"></l-calendar>
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
`)])],-1)])]),_:1}),e[13]||(e[13]=y('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="calendar-attibutes" tabindex="-1">Calendar Attibutes <a class="header-anchor" href="#calendar-attibutes" aria-label="Permalink to &quot;Calendar Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>min-date</code></td><td>最小日期, 例如: <code>2026-04-03</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>max-date</code></td><td>最大日期, 例如: <code>2026-04-03</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>year</code></td><td>年份, 例如: <code>2026</code></td><td><code>number</code></td><td>当前年份</td></tr><tr><td><code>month</code></td><td>月份, 例如: <code>4</code></td><td><code>number</code></td><td>当前月份</td></tr><tr><td><code>type</code></td><td>日历类型，可选值 <code>select</code>、<code>range</code></td><td><code>string</code></td><td><code>select</code></td></tr><tr><td><code>value</code></td><td>选中日期，当 type 为 select 时为选中日期字符串以 <code>&amp;</code>，当 type 为 range 时为两个日期的组合字符串（逗号分隔）; 同时也是 <code>value</code> 属性</td><td><code>string</code></td><td>-</td></tr><tr><td><code>locale</code></td><td>语言</td><td><code>string</code></td><td><code>zh-CN</code></td></tr></tbody></table><h3 id="calendar-slots" tabindex="-1">Calendar Slots <a class="header-anchor" href="#calendar-slots" aria-label="Permalink to &quot;Calendar Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr></tbody></table><h3 id="calendar-events" tabindex="-1">Calendar Events <a class="header-anchor" href="#calendar-events" aria-label="Permalink to &quot;Calendar Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td></tr><tr><td><code>day-click</code></td><td>点击日期时触发</td><td><code>(detail: {isActiveMonth: boolean, day: string, dayTimestamp: number})</code></td></tr><tr><td><code>day-hover</code></td><td>鼠标悬停日期时触发</td><td><code>(detail: {isActiveMonth: boolean, day: string, dayTimestamp: number})</code></td></tr></tbody></table><h3 id="calendar-css-variables" tabindex="-1">Calendar CSS Variables <a class="header-anchor" href="#calendar-css-variables" aria-label="Permalink to &quot;Calendar CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--calendar-header-height</code></td><td>周信息栏高度</td><td><code>auto</code></td></tr><tr><td><code>--l-calendar-off-text-color</code></td><td>当日期不是当前年月时的文字颜色</td><td><code>#a8abb2</code></td></tr></tbody></table>',9))])}}});export{R as __pageData,j as default};
