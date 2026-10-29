const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/notification_box.Ba_w9I5m.js","assets/chunks/index.N77tNhSb.js","assets/chunks/index.BChUgqng.js","assets/chunks/browser.CpyXlELn.js"])))=>i.map(i=>d[i]);
import{v as g,P as k,V as x,x as E,C as y,o as N,c as v,a2 as c,E as i,w as n,j as t,a as d}from"./chunks/framework.nU6eqUhJ.js";import{e as B,i as b,o as A}from"./chunks/browser.CpyXlELn.js";const C=JSON.parse('{"title":"Notification 通知提醒框","description":"","frontmatter":{},"headers":[],"relativePath":"components/notification.md","filePath":"components/notification.md","lastUpdated":1793253144000}'),q={name:"components/notification.md"},_=Object.assign(q,{setup(w){let l,r=!1,p="",a;function u(s){var f;const o=s.target,e=o.getAttribute("data-notification");if(!e||!a)return;if(e==="component"){(f=document.getElementById(o.getAttribute("data-target")))==null||f.show();return}if(e==="close"){a.close(p);return}if(e==="closeAll"){a.closeAll();return}const h=o.getAttribute("data-duration"),m={title:o.getAttribute("data-title")||"",message:o.getAttribute("data-message")||"",placement:o.getAttribute("data-placement")||"topRight",duration:h==null?4500:Number(h),action:o.getAttribute("data-action")||void 0};p=a[e](m)}return g(()=>{k(async()=>{r||(a=(await x(async()=>{const{default:s}=await import("./chunks/notification_box.Ba_w9I5m.js").then(o=>o.e);return{default:s}},__vite__mapDeps([0,1,2,3]))).default,!r&&(l=B(".preview-container l-button"),b(l,s=>{A(s,"click",u)})))})}),E(()=>{r=!0,a==null||a.closeAll(),b(l||[],s=>{s.removeEventListener("click",u)})}),(s,o)=>{const e=y("ClientOnly");return N(),v("div",null,[o[9]||(o[9]=c(`<h1 id="notification-通知提醒框" tabindex="-1">Notification 通知提醒框 <a class="header-anchor" href="#notification-通知提醒框" aria-label="Permalink to &quot;Notification 通知提醒框&quot;">​</a></h1><p>系统主动推送的通知提醒。相较于 <a href="/litos-ui/components/message">Message 消息提示</a>, Notification 更适合以下场景:</p><ol><li>较为复杂的通知内容;</li><li>带有交互的通知, 给出用户下一步的行动点;</li><li>系统主动推送。</li></ol><p>组件提供 <code>info</code>、<code>success</code>、<code>error</code>、<code>warning</code> 四种状态, 支持四个角(左上、右上、左下、右下)的显示方位; 同一个方位上的通知不会相互叠加, 而是按顺序排列并通过动画插入与补位。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Notification,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  NotificationBox,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  regist,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  InfoIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SuccessIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  WarnIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  CloseFilledIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  CloseIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/notification.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([InfoIcon, SuccessIcon, WarnIcon, CloseFilledIcon, CloseIcon, Notification]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><blockquote><p>组件式与命令式使用前均需显式注册 Notification 及所需图标；NotificationBox 不会自动注册组件。</p></blockquote><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><h3 id="组件式" tabindex="-1">组件式 <a class="header-anchor" href="#组件式" aria-label="Permalink to &quot;组件式&quot;">​</a></h3><p>点击下方按钮显示示例通知，进入页面时不会自动弹出。</p><p>通过 <code>open</code> 属性控制显示, <code>title</code> 设置标题, <code>message</code> 设置消息内容。组件式使用时默认不会自动关闭(<code>duration</code> 默认为 <code>0</code>), 由 <code>open</code> 属性控制显示与隐藏。</p>`,11)),i(e,null,{default:n(()=>[...o[0]||(o[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">显示组件式通知</l-button>
  <l-notification id="notification-basic"
    title="系统通知"
    message="这是一条系统主动推送的通知, 点击右上角可以关闭。"
  ></l-notification>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">显示组件式通知</l-button>
  <l-notification id="notification-basic"
    title="系统通知"
    message="这是一条系统主动推送的通知, 点击右上角可以关闭。"
  ></l-notification>
`),t("textarea",{lang:"js"},`  document.getElementById('show-notification-basic').addEventListener('click', (event) => {
    document.getElementById(event.currentTarget.getAttribute('data-target')).show();
  });
`)])],-1)])]),_:1}),o[10]||(o[10]=t("p",null,[d("组件式使用时, 也可以通过插槽自定义内容, 支持 "),t("code",null,"title"),d("(标题)、"),t("code",null,"default"),d("(内容)、"),t("code",null,"action"),d("(行动点) 三个插槽。")],-1)),i(e,null,{default:n(()=>[...o[1]||(o[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="show-notification-slots" data-notification="component" data-target="notification-slots">显示自定义通知</l-button>
  <l-notification id="notification-slots" type="info" duration="0">
    <span slot="title">自定义标题</span>
    <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
    </div>
  </l-notification>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button id="show-notification-slots" data-notification="component" data-target="notification-slots">显示自定义通知</l-button>
  <l-notification id="notification-slots" type="info" duration="0">
    <span slot="title">自定义标题</span>
    <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
    </div>
  </l-notification>
`),t("textarea",{lang:"js"},`  document.getElementById('show-notification-slots').addEventListener('click', (event) => {
    document.getElementById(event.currentTarget.getAttribute('data-target')).show();
  });
`)])],-1)])]),_:1}),o[11]||(o[11]=t("h3",{id:"命令式",tabindex:"-1"},[d("命令式 "),t("a",{class:"header-anchor",href:"#命令式","aria-label":'Permalink to "命令式"'},"​")],-1)),o[12]||(o[12]=t("p",null,[d("调用 "),t("code",null,"Notification"),d(" 的静态方法即可在任意位置弹出通知, 方法会返回通知 "),t("code",null,"id"),d("。")],-1)),i(e,null,{default:n(()=>[...o[2]||(o[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="info"
    data-title="通知标题"
    data-message="通知内容, 4.5 秒后自动关闭。"
  >显示通知</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button>显示通知</l-button>
`),t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    NotificationBox.show({
      title: '通知标题',
      message: '通知内容, 4.5 秒后自动关闭。',
    });
  });
`)])],-1)])]),_:1}),o[13]||(o[13]=c('<h3 id="不同状态" tabindex="-1">不同状态 <a class="header-anchor" href="#不同状态" aria-label="Permalink to &quot;不同状态&quot;">​</a></h3><p>通过 <code>type</code> 设置通知状态, 提供 <code>info</code>、<code>success</code>、<code>error</code>、<code>warning</code> 四种状态; 同时为每种状态提供了同名方法, 可以在不传递 <code>type</code> 的情况下直接调用, 例如: <code>NotificationBox.success(&#39;保存成功&#39;)</code>。</p>',2)),i(e,null,{default:n(()=>[...o[3]||(o[3]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="提示" data-message="这是一条普通提示信息。">信息</l-button>
  <l-button data-notification="success" data-title="成功" data-message="数据保存成功。">成功</l-button>
  <l-button data-notification="warning" data-title="警告" data-message="当前操作可能存在风险。">警告</l-button>
  <l-button data-notification="error" data-title="错误" data-message="请求失败, 请稍后重试。">错误</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: '提示', message: '这是一条普通提示信息。' });
  NotificationBox.success({ title: '成功', message: '数据保存成功。' });
  NotificationBox.warning({ title: '警告', message: '当前操作可能存在风险。' });
  NotificationBox.error({ title: '错误', message: '请求失败, 请稍后重试。' });
`)])],-1)])]),_:1}),o[14]||(o[14]=c('<h3 id="显示方位" tabindex="-1">显示方位 <a class="header-anchor" href="#显示方位" aria-label="Permalink to &quot;显示方位&quot;">​</a></h3><p>通过 <code>placement</code> 设置显示方位, 提供 <code>topLeft</code>、<code>topRight</code>、<code>bottomLeft</code>、<code>bottomRight</code> 四个角; 同一个方位上的通知不会叠加，新通知排在已有通知下方；关闭通知后，其余通知自动补位。</p>',2)),i(e,null,{default:n(()=>[...o[4]||(o[4]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-placement="topLeft" data-title="左上" data-message="来自左上角的消息。">左上</l-button>
  <l-button data-notification="info" data-placement="topRight" data-title="右上" data-message="来自右上角的消息。">右上</l-button>
  <l-button data-notification="info" data-placement="bottomLeft" data-title="左下" data-message="来自左下角的消息。">左下</l-button>
  <l-button data-notification="info" data-placement="bottomRight" data-title="右下" data-message="来自右下角的消息。">右下</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: '左上', message: '来自左上角的消息。', placement: 'topLeft' });
  NotificationBox.info({ title: '右上', message: '来自右上角的消息。', placement: 'topRight' });
  NotificationBox.info({ title: '左下', message: '来自左下角的消息。', placement: 'bottomLeft' });
  NotificationBox.info({ title: '右下', message: '来自右下角的消息。', placement: 'bottomRight' });
`)])],-1)])]),_:1}),o[15]||(o[15]=t("blockquote",null,[t("p",null,"连续点击同一个按钮, 可以观察到同一个方位上的通知会依次排列, 不会相互遮挡。")],-1)),o[16]||(o[16]=t("h3",{id:"复杂内容",tabindex:"-1"},[d("复杂内容 "),t("a",{class:"header-anchor",href:"#复杂内容","aria-label":'Permalink to "复杂内容"'},"​")],-1)),o[17]||(o[17]=t("p",null,[t("code",null,"message"),d(" 支持传入 HTML 字符串, 用于展示较为复杂的通知内容。")],-1)),i(e,null,{default:n(()=>[...o[5]||(o[5]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="success"
    data-title="部署完成"
    data-message="<div>分支: <b>main</b></div><div>耗时: 32s</div>"
  >部署完成</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.success({
    title: '部署完成',
    message: '<div>分支: <b>main</b></div><div>耗时: 32s</div>',
  });
`)])],-1)])]),_:1}),o[18]||(o[18]=t("h3",{id:"行动点",tabindex:"-1"},[d("行动点 "),t("a",{class:"header-anchor",href:"#行动点","aria-label":'Permalink to "行动点"'},"​")],-1)),o[19]||(o[19]=t("p",null,[d("通过 "),t("code",null,"action"),d(" 设置行动点按钮的文本, 点击后触发 "),t("code",null,"action"),d(" 事件, 用于给出用户下一步的操作; 命令式调用时可以配合 "),t("code",null,"onAction"),d(" 回调。")],-1)),i(e,null,{default:n(()=>[...o[6]||(o[6]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="warning"
    data-title="检测到新版本"
    data-message="新版本修复了若干问题, 建议立即更新。"
    data-action="立即更新"
    data-duration="0"
  >检测到新版本</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.warning({
    title: '检测到新版本',
    message: '新版本修复了若干问题, 建议立即更新。',
    action: '立即更新',
    duration: 0,
    onAction: (id) => {
      // 处理用户的下一步操作
      console.log('点击了行动点', id);
    },
  });
`)])],-1)])]),_:1}),o[20]||(o[20]=t("h3",{id:"自动关闭与手动关闭",tabindex:"-1"},[d("自动关闭与手动关闭 "),t("a",{class:"header-anchor",href:"#自动关闭与手动关闭","aria-label":'Permalink to "自动关闭与手动关闭"'},"​")],-1)),o[21]||(o[21]=t("p",null,[t("code",null,"duration"),d(" 设置自动关闭的时间(毫秒), 设置为 "),t("code",null,"0"),d(" 时不会自动关闭; 鼠标悬浮在通知上时会暂停自动关闭的倒计时, 移出后继续。显示通知的方法会返回通知 "),t("code",null,"id"),d(", 可以通过 "),t("code",null,"NotificationBox.close(id)"),d(" 手动关闭。")],-1)),i(e,null,{default:n(()=>[...o[7]||(o[7]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="error" data-title="手动关闭" data-message="这条通知不会自动关闭。" data-duration="0">打开</l-button>
  <l-button data-notification="close">关闭最后一条</l-button>
  <l-button data-notification="closeAll">全部关闭</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  // 打开通知, 保存返回的 id
  const id = NotificationBox.error({
    title: '手动关闭',
    message: '这条通知不会自动关闭。',
    duration: 0,
  });
  // 关闭指定的通知
  NotificationBox.close(id);
  // 关闭全部通知
  NotificationBox.closeAll();
`)])],-1)])]),_:1}),o[22]||(o[22]=t("h3",{id:"全局配置",tabindex:"-1"},[d("全局配置 "),t("a",{class:"header-anchor",href:"#全局配置","aria-label":'Permalink to "全局配置"'},"​")],-1)),o[23]||(o[23]=t("p",null,[d("通过 "),t("code",null,"NotificationBox.config"),d(" 设置全局默认配置, 之后创建的通知都会使用该配置。")],-1)),i(e,null,{default:n(()=>[...o[8]||(o[8]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="全局配置" data-message="这条通知使用了全局配置的宽度与关闭时间。">显示通知</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.config({
    width: 380,
    duration: 6000,
    maxCount: 3,
  });
  NotificationBox.info({ title: '全局配置', message: '这条通知使用了全局配置的宽度与关闭时间。' });
`)])],-1)])]),_:1}),o[24]||(o[24]=c(`<blockquote><p>全局配置会持续生效, 可以设置 <code>placement</code>、<code>width</code>、<code>duration</code>、<code>offset</code>、<code>zIndex</code>、<code>maxCount</code> 等所有配置项。上面的配置代码仅供参考，演示按钮不调用全局配置，以免影响其它示例。</p></blockquote><h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/notification.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Notification </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/notification&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> NotificationBox </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/notification-box&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 按上方示例注册 Notification 和图标。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>notification 与 notification-box 入口不会自动注册元素，需显式注册 Notification 及所需图标。SSR 框架请在客户端入口加载，参见<a href="/litos-ui/on_demand">按需导入</a>。</p><p>命令式方法现由 <code>NotificationBox</code> 提供，<code>Notification</code> 仅作为自定义元素组件类。原有 <code>Notification.info(...)</code> 等调用需改为 <code>NotificationBox.info(...)</code>。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="notification-attributes" tabindex="-1">Notification Attributes <a class="header-anchor" href="#notification-attributes" aria-label="Permalink to &quot;Notification Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>open</code></td><td>是否显示通知</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>type</code></td><td>通知状态, <code>info</code>、<code>success</code>、<code>error</code>、<code>warning</code></td><td><code>string</code></td><td><code>info</code></td></tr><tr><td><code>title</code></td><td>标题(纯文本)</td><td><code>string</code></td><td>-</td></tr><tr><td><code>message</code></td><td>消息内容, 支持 HTML 字符串</td><td><code>string</code></td><td>-</td></tr><tr><td><code>placement</code></td><td>显示方位, <code>topLeft</code>、<code>topRight</code>、<code>bottomLeft</code>、<code>bottomRight</code></td><td><code>string</code></td><td><code>topRight</code></td></tr><tr><td><code>duration</code></td><td>自动关闭时间(毫秒), <code>0</code> 表示不自动关闭</td><td><code>number</code></td><td><code>0</code></td></tr><tr><td><code>closable</code></td><td>是否显示关闭按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>show-icon</code></td><td>是否显示状态图标</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>width</code></td><td>通知宽度, 数字会自动转换为 <code>px</code></td><td><code>string</code> | <code>number</code></td><td><code>330px</code></td></tr><tr><td><code>offset</code></td><td>距离视口边缘的距离(px)</td><td><code>number</code></td><td><code>16</code></td></tr><tr><td><code>z-index</code></td><td>层级</td><td><code>number</code></td><td><code>2000</code></td></tr><tr><td><code>max-count</code></td><td>同一方位最多同时显示的通知数量, <code>0</code> 表示不限制</td><td><code>number</code></td><td><code>0</code></td></tr><tr><td><code>action</code></td><td>行动点按钮的文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>custom-class</code></td><td>自定义类名, 多个使用空格分隔</td><td><code>string</code></td><td>-</td></tr></tbody></table><h3 id="notification-slots" tabindex="-1">Notification Slots <a class="header-anchor" href="#notification-slots" aria-label="Permalink to &quot;Notification Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>消息内容, 存在插槽内容时优先于 <code>message</code></td></tr><tr><td><code>title</code></td><td>标题, 存在插槽内容时优先于 <code>title</code></td></tr><tr><td><code>action</code></td><td>行动点区域, 存在插槽内容时优先于 <code>action</code></td></tr></tbody></table><h3 id="notification-events" tabindex="-1">Notification Events <a class="header-anchor" href="#notification-events" aria-label="Permalink to &quot;Notification Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>event.detail</th></tr></thead><tbody><tr><td><code>close</code></td><td>通知关闭时触发</td><td><code>{ id: string }</code></td></tr><tr><td><code>action</code></td><td>点击行动点时触发</td><td><code>{ id: string }</code></td></tr></tbody></table><h3 id="notification-methods" tabindex="-1">Notification Methods <a class="header-anchor" href="#notification-methods" aria-label="Permalink to &quot;Notification Methods&quot;">​</a></h3><p>实例方法, 可以通过 <code>ref</code> 或者 <code>document.querySelector</code> 获取到组件实例后调用。</p><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>show()</code></td><td>显示通知</td></tr><tr><td><code>close()</code></td><td>关闭通知</td></tr></tbody></table><h3 id="命令式-api" tabindex="-1">命令式 API <a class="header-anchor" href="#命令式-api" aria-label="Permalink to &quot;命令式 API&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>返回类型</th></tr></thead><tbody><tr><td><code>NotificationBox.show(option)</code></td><td>显示通知</td><td><code>string</code>(通知 id)</td></tr><tr><td><code>NotificationBox.info(option)</code></td><td>显示普通通知</td><td><code>string</code></td></tr><tr><td><code>NotificationBox.success(option)</code></td><td>显示成功通知</td><td><code>string</code></td></tr><tr><td><code>NotificationBox.warning(option)</code> / <code>warn(option)</code></td><td>显示警告通知</td><td><code>string</code></td></tr><tr><td><code>NotificationBox.error(option)</code></td><td>显示错误通知</td><td><code>string</code></td></tr><tr><td><code>NotificationBox.close(id)</code></td><td>关闭指定 id 的通知</td><td>-</td></tr><tr><td><code>NotificationBox.closeAll(placement?)</code></td><td>关闭所有通知, 传递 <code>placement</code> 时只关闭指定方位</td><td>-</td></tr><tr><td><code>NotificationBox.config(option)</code></td><td>设置全局默认配置</td><td>-</td></tr></tbody></table><h3 id="notificationoptions" tabindex="-1">NotificationOptions <a class="header-anchor" href="#notificationoptions" aria-label="Permalink to &quot;NotificationOptions&quot;">​</a></h3><p>命令式 API 的配置项, 也可以传入一个字符串作为 <code>message</code>。</p><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>id</code></td><td>自定义通知 id, 不传则自动生成</td><td><code>string</code></td><td>-</td></tr><tr><td><code>title</code></td><td>标题</td><td><code>string</code></td><td>-</td></tr><tr><td><code>message</code></td><td>消息内容, 支持 HTML 字符串</td><td><code>string</code></td><td>-</td></tr><tr><td><code>type</code></td><td>通知状态</td><td><code>string</code></td><td><code>info</code></td></tr><tr><td><code>placement</code></td><td>显示方位</td><td><code>string</code></td><td><code>topRight</code></td></tr><tr><td><code>duration</code></td><td>自动关闭时间(毫秒), <code>0</code> 表示不自动关闭</td><td><code>number</code></td><td><code>4500</code></td></tr><tr><td><code>closable</code></td><td>是否显示关闭按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>showIcon</code></td><td>是否显示状态图标</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>width</code></td><td>通知宽度</td><td><code>string</code> | <code>number</code></td><td><code>330px</code></td></tr><tr><td><code>offset</code></td><td>距离视口边缘的距离(px)</td><td><code>number</code></td><td><code>16</code></td></tr><tr><td><code>zIndex</code></td><td>层级</td><td><code>number</code></td><td><code>2000</code></td></tr><tr><td><code>maxCount</code></td><td>同一方位最多同时显示的通知数量</td><td><code>number</code></td><td><code>0</code></td></tr><tr><td><code>action</code></td><td>行动点按钮的文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>customClass</code></td><td>自定义类名</td><td><code>string</code></td><td>-</td></tr><tr><td><code>onClose</code></td><td>关闭后的回调</td><td><code>(id: string) =&gt; void</code></td><td>-</td></tr><tr><td><code>onAction</code></td><td>点击行动点的回调</td><td><code>(id: string) =&gt; void</code></td><td>-</td></tr></tbody></table><h3 id="样式变量" tabindex="-1">样式变量 <a class="header-anchor" href="#样式变量" aria-label="Permalink to &quot;样式变量&quot;">​</a></h3><p>组件使用 Shadow DOM, 内部样式无法被外部选择器覆盖, 可以通过覆盖宿主节点上的 CSS 变量来自定义样式。</p><table tabindex="0"><thead><tr><th>名称</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-notification-width</code></td><td>通知宽度</td><td><code>330px</code></td></tr><tr><td><code>--l-notification-gap</code></td><td>同一个方位的通知之间的间距</td><td><code>16px</code></td></tr><tr><td><code>--l-notification-offset</code></td><td>距离视口边缘的距离, 由 <code>offset</code> 属性同步</td><td><code>16px</code></td></tr><tr><td><code>--l-notification-zindex</code></td><td>层级, 由 <code>z-index</code> 属性同步</td><td><code>2000</code></td></tr><tr><td><code>--l-notification-padding</code></td><td>内边距</td><td><code>16px</code></td></tr><tr><td><code>--l-notification-radius</code></td><td>圆角</td><td><code>8px</code></td></tr><tr><td><code>--l-notification-background</code></td><td>背景色</td><td><code>#ffffff</code></td></tr><tr><td><code>--l-notification-shadow</code></td><td>阴影</td><td>-</td></tr><tr><td><code>--l-notification-title-color</code></td><td>标题颜色</td><td><code>rgba(0, 0, 0, 0.88)</code></td></tr><tr><td><code>--l-notification-message-color</code></td><td>内容颜色</td><td><code>rgba(0, 0, 0, 0.65)</code></td></tr><tr><td><code>--l-notification-icon-size</code></td><td>状态图标大小</td><td><code>22px</code></td></tr><tr><td><code>--l-notification-anim-duration</code></td><td>动画时长</td><td><code>0.3s</code></td></tr><tr><td><code>--l-notification-color</code></td><td>状态色, 由 <code>type</code> 决定</td><td><code>var(--l-primary-color, #007bff)</code></td></tr></tbody></table>`,23))])}}});export{C as __pageData,_ as default};
