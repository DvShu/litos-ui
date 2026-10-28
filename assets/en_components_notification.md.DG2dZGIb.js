const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.Dp0GRk1N.js","assets/chunks/info.Cu6rqLzm.js","assets/chunks/browser.CpyXlELn.js","assets/chunks/index.BChUgqng.js"])))=>i.map(i=>d[i]);
import{v as b,P as m,V as g,x as k,C as x,o as y,c as v,a2 as s,E as i,w as n,j as t,a as e}from"./chunks/framework.nU6eqUhJ.js";import{e as N,i as f,o as q}from"./chunks/browser.CpyXlELn.js";const _=JSON.parse('{"title":"Notification 通知提醒框","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/notification.md","filePath":"en/components/notification.md","lastUpdated":1793115401000}'),A={name:"en/components/notification.md"},T=Object.assign(A,{setup(E){let l,r="",c;function u(a){const d=a.target,o=d.getAttribute("data-notification");if(!o||!c)return;if(o==="close"){c.close(r);return}if(o==="closeAll"){c.closeAll();return}const p=d.getAttribute("data-duration"),h={title:d.getAttribute("data-title")||"",message:d.getAttribute("data-message")||"",placement:d.getAttribute("data-placement")||"topRight",duration:p==null?4500:Number(p),action:d.getAttribute("data-action")||void 0};r=c[o](h)}return b(()=>{m(async()=>{c=(await g(async()=>{const{default:a}=await import("./chunks/index.Dp0GRk1N.js").then(d=>d.i);return{default:a}},__vite__mapDeps([0,1,2,3]))).default,l=N(".preview-container l-button"),f(l,a=>{q(a,"click",u)})})}),k(()=>{f(l||[],a=>{a.removeEventListener("click",u)})}),(a,d)=>{const o=x("ClientOnly");return y(),v("div",null,[d[9]||(d[9]=s(`<h1 id="notification-通知提醒框" tabindex="-1">Notification 通知提醒框 <a class="header-anchor" href="#notification-通知提醒框" aria-label="Permalink to &quot;Notification 通知提醒框&quot;">​</a></h1><p>系统主动推送的通知提醒。相较于 <a href="/litos-ui/en/components/message">Message 消息提示</a>, Notification 更适合以下场景:</p><ol><li>较为复杂的通知内容;</li><li>带有交互的通知, 给出用户下一步的行动点;</li><li>系统主动推送。</li></ol><p>组件提供 <code>info</code>、<code>success</code>、<code>error</code>、<code>warning</code> 四种状态, 支持四个角(左上、右上、左下、右下)的显示方位; 同一个方位上的通知不会相互叠加, 而是按顺序排列并通过动画插入与补位。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Notification, regist, Button } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/notification.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 组件式使用需要注册组件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Notification);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 注册本页演示使用的附加组件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Button]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote><p>命令式调用(如 <code>Notification.info(...)</code>)会自动注册组件与依赖的图标, 无需手动调用 <code>regist</code>。</p></blockquote><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><h3 id="组件式" tabindex="-1">组件式 <a class="header-anchor" href="#组件式" aria-label="Permalink to &quot;组件式&quot;">​</a></h3><p>通过 <code>open</code> 属性控制显示, <code>title</code> 设置标题, <code>message</code> 设置消息内容。组件式使用时默认不会自动关闭(<code>duration</code> 默认为 <code>0</code>), 由 <code>open</code> 属性控制显示与隐藏。</p>`,10)),i(o,null,{default:n(()=>[...d[0]||(d[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-notification
    open
    title="系统通知"
    message="这是一条系统主动推送的通知, 点击右上角可以关闭。"
  ></l-notification>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-notification
    open
    title="系统通知"
    message="这是一条系统主动推送的通知, 点击右上角可以关闭。"
  ></l-notification>
`)])],-1)])]),_:1}),d[10]||(d[10]=t("h3",{id:"命令式",tabindex:"-1"},[e("命令式 "),t("a",{class:"header-anchor",href:"#命令式","aria-label":'Permalink to "命令式"'},"​")],-1)),d[11]||(d[11]=t("p",null,[e("调用 "),t("code",null,"Notification"),e(" 的静态方法即可在任意位置弹出通知, 方法会返回通知 "),t("code",null,"id"),e("。")],-1)),i(o,null,{default:n(()=>[...d[1]||(d[1]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="info"
    data-title="通知标题"
    data-message="通知内容, 4.5 秒后自动关闭。"
  >显示通知</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button>显示通知</l-button>
`),t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Notification.show({
      title: '通知标题',
      message: '通知内容, 4.5 秒后自动关闭。',
    });
  });
`)])],-1)])]),_:1}),d[12]||(d[12]=s('<h3 id="不同状态" tabindex="-1">不同状态 <a class="header-anchor" href="#不同状态" aria-label="Permalink to &quot;不同状态&quot;">​</a></h3><p>通过 <code>type</code> 设置通知状态, 提供 <code>info</code>、<code>success</code>、<code>error</code>、<code>warning</code> 四种状态; 同时为每种状态提供了同名方法, 可以在不传递 <code>type</code> 的情况下直接调用, 例如: <code>Notification.success(&#39;保存成功&#39;)</code>。</p>',2)),i(o,null,{default:n(()=>[...d[2]||(d[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="提示" data-message="这是一条普通提示信息。">信息</l-button>
  <l-button data-notification="success" data-title="成功" data-message="数据保存成功。">成功</l-button>
  <l-button data-notification="warning" data-title="警告" data-message="当前操作可能存在风险。">警告</l-button>
  <l-button data-notification="error" data-title="错误" data-message="请求失败, 请稍后重试。">错误</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  Notification.info({ title: '提示', message: '这是一条普通提示信息。' });
  Notification.success({ title: '成功', message: '数据保存成功。' });
  Notification.warning({ title: '警告', message: '当前操作可能存在风险。' });
  Notification.error({ title: '错误', message: '请求失败, 请稍后重试。' });
`)])],-1)])]),_:1}),d[13]||(d[13]=s('<h3 id="显示方位" tabindex="-1">显示方位 <a class="header-anchor" href="#显示方位" aria-label="Permalink to &quot;显示方位&quot;">​</a></h3><p>通过 <code>placement</code> 设置显示方位, 提供 <code>topLeft</code>、<code>topRight</code>、<code>bottomLeft</code>、<code>bottomRight</code> 四个角; 同一个方位上的通知不会叠加, 已有的通知会自动向后补位。</p>',2)),i(o,null,{default:n(()=>[...d[3]||(d[3]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-placement="topLeft" data-title="左上" data-message="来自左上角的消息。">左上</l-button>
  <l-button data-notification="info" data-placement="topRight" data-title="右上" data-message="来自右上角的消息。">右上</l-button>
  <l-button data-notification="info" data-placement="bottomLeft" data-title="左下" data-message="来自左下角的消息。">左下</l-button>
  <l-button data-notification="info" data-placement="bottomRight" data-title="右下" data-message="来自右下角的消息。">右下</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  Notification.info({ title: '左上', message: '来自左上角的消息。', placement: 'topLeft' });
  Notification.info({ title: '右上', message: '来自右上角的消息。', placement: 'topRight' });
  Notification.info({ title: '左下', message: '来自左下角的消息。', placement: 'bottomLeft' });
  Notification.info({ title: '右下', message: '来自右下角的消息。', placement: 'bottomRight' });
`)])],-1)])]),_:1}),d[14]||(d[14]=t("blockquote",null,[t("p",null,"连续点击同一个按钮, 可以观察到同一个方位上的通知会依次排列, 不会相互遮挡。")],-1)),d[15]||(d[15]=t("h3",{id:"复杂内容",tabindex:"-1"},[e("复杂内容 "),t("a",{class:"header-anchor",href:"#复杂内容","aria-label":'Permalink to "复杂内容"'},"​")],-1)),d[16]||(d[16]=t("p",null,[t("code",null,"message"),e(" 支持传入 HTML 字符串, 用于展示较为复杂的通知内容。")],-1)),i(o,null,{default:n(()=>[...d[4]||(d[4]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="success"
    data-title="部署完成"
    data-message="<div>分支: <b>main</b></div><div>耗时: 32s</div>"
  >部署完成</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  Notification.success({
    title: '部署完成',
    message: '<div>分支: <b>main</b></div><div>耗时: 32s</div>',
  });
`)])],-1)])]),_:1}),d[17]||(d[17]=t("p",null,[e("组件式使用时, 也可以通过插槽自定义内容, 支持 "),t("code",null,"title"),e("(标题)、"),t("code",null,"default"),e("(内容)、"),t("code",null,"action"),e("(行动点) 三个插槽。")],-1)),i(o,null,{default:n(()=>[...d[5]||(d[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-notification open type="info" duration="0">
    <span slot="title">自定义标题</span>
    <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
    </div>
  </l-notification>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-notification open type="info" duration="0">
    <span slot="title">自定义标题</span>
    <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
    </div>
  </l-notification>
`)])],-1)])]),_:1}),d[18]||(d[18]=t("h3",{id:"行动点",tabindex:"-1"},[e("行动点 "),t("a",{class:"header-anchor",href:"#行动点","aria-label":'Permalink to "行动点"'},"​")],-1)),d[19]||(d[19]=t("p",null,[e("通过 "),t("code",null,"action"),e(" 设置行动点按钮的文本, 点击后触发 "),t("code",null,"action"),e(" 事件, 用于给出用户下一步的操作; 命令式调用时可以配合 "),t("code",null,"onAction"),e(" 回调。")],-1)),i(o,null,{default:n(()=>[...d[6]||(d[6]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="warning"
    data-title="检测到新版本"
    data-message="新版本修复了若干问题, 建议立即更新。"
    data-action="立即更新"
    data-duration="0"
  >检测到新版本</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  Notification.warning({
    title: '检测到新版本',
    message: '新版本修复了若干问题, 建议立即更新。',
    action: '立即更新',
    duration: 0,
    onAction: (id) => {
      // 处理用户的下一步操作
      console.log('点击了行动点', id);
    },
  });
`)])],-1)])]),_:1}),d[20]||(d[20]=t("h3",{id:"自动关闭与手动关闭",tabindex:"-1"},[e("自动关闭与手动关闭 "),t("a",{class:"header-anchor",href:"#自动关闭与手动关闭","aria-label":'Permalink to "自动关闭与手动关闭"'},"​")],-1)),d[21]||(d[21]=t("p",null,[t("code",null,"duration"),e(" 设置自动关闭的时间(毫秒), 设置为 "),t("code",null,"0"),e(" 时不会自动关闭; 鼠标悬浮在通知上时会暂停自动关闭的倒计时, 移出后继续。显示通知的方法会返回通知 "),t("code",null,"id"),e(", 可以通过 "),t("code",null,"Notification.close(id)"),e(" 手动关闭。")],-1)),i(o,null,{default:n(()=>[...d[7]||(d[7]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="error" data-title="手动关闭" data-message="这条通知不会自动关闭。" data-duration="0">打开</l-button>
  <l-button data-notification="close">关闭最后一条</l-button>
  <l-button data-notification="closeAll">全部关闭</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  // 打开通知, 保存返回的 id
  const id = Notification.error({
    title: '手动关闭',
    message: '这条通知不会自动关闭。',
    duration: 0,
  });
  // 关闭指定的通知
  Notification.close(id);
  // 关闭全部通知
  Notification.closeAll();
`)])],-1)])]),_:1}),d[22]||(d[22]=t("h3",{id:"全局配置",tabindex:"-1"},[e("全局配置 "),t("a",{class:"header-anchor",href:"#全局配置","aria-label":'Permalink to "全局配置"'},"​")],-1)),d[23]||(d[23]=t("p",null,[e("通过 "),t("code",null,"Notification.config"),e(" 设置全局默认配置, 之后创建的通知都会使用该配置。")],-1)),i(o,null,{default:n(()=>[...d[8]||(d[8]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="全局配置" data-message="这条通知使用了全局配置的宽度与关闭时间。">显示通知</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  Notification.config({
    width: 380,
    duration: 6000,
    maxCount: 3,
  });
  Notification.info({ title: '全局配置', message: '这条通知使用了全局配置的宽度与关闭时间。' });
`)])],-1)])]),_:1}),d[24]||(d[24]=s(`<blockquote><p>全局配置会持续生效, 可以设置 <code>placement</code>、<code>width</code>、<code>duration</code>、<code>offset</code>、<code>zIndex</code>、<code>maxCount</code> 等所有配置项。上面的示例为了避免影响其它示例, 只修改了通知宽度与自动关闭时间。</p></blockquote><h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/notification&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="notification-attributes" tabindex="-1">Notification Attributes <a class="header-anchor" href="#notification-attributes" aria-label="Permalink to &quot;Notification Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>open</code></td><td>是否显示通知</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>type</code></td><td>通知状态, <code>info</code>、<code>success</code>、<code>error</code>、<code>warning</code></td><td><code>string</code></td><td><code>info</code></td></tr><tr><td><code>title</code></td><td>标题(纯文本)</td><td><code>string</code></td><td>-</td></tr><tr><td><code>message</code></td><td>消息内容, 支持 HTML 字符串</td><td><code>string</code></td><td>-</td></tr><tr><td><code>placement</code></td><td>显示方位, <code>topLeft</code>、<code>topRight</code>、<code>bottomLeft</code>、<code>bottomRight</code></td><td><code>string</code></td><td><code>topRight</code></td></tr><tr><td><code>duration</code></td><td>自动关闭时间(毫秒), <code>0</code> 表示不自动关闭</td><td><code>number</code></td><td><code>0</code></td></tr><tr><td><code>closable</code></td><td>是否显示关闭按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>show-icon</code></td><td>是否显示状态图标</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>width</code></td><td>通知宽度, 数字会自动转换为 <code>px</code></td><td><code>string</code> | <code>number</code></td><td><code>330px</code></td></tr><tr><td><code>offset</code></td><td>距离视口边缘的距离(px)</td><td><code>number</code></td><td><code>16</code></td></tr><tr><td><code>z-index</code></td><td>层级</td><td><code>number</code></td><td><code>2000</code></td></tr><tr><td><code>max-count</code></td><td>同一方位最多同时显示的通知数量, <code>0</code> 表示不限制</td><td><code>number</code></td><td><code>0</code></td></tr><tr><td><code>action</code></td><td>行动点按钮的文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>custom-class</code></td><td>自定义类名, 多个使用空格分隔</td><td><code>string</code></td><td>-</td></tr></tbody></table><h3 id="notification-slots" tabindex="-1">Notification Slots <a class="header-anchor" href="#notification-slots" aria-label="Permalink to &quot;Notification Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>消息内容, 存在插槽内容时优先于 <code>message</code></td></tr><tr><td><code>title</code></td><td>标题, 存在插槽内容时优先于 <code>title</code></td></tr><tr><td><code>action</code></td><td>行动点区域, 存在插槽内容时优先于 <code>action</code></td></tr></tbody></table><h3 id="notification-events" tabindex="-1">Notification Events <a class="header-anchor" href="#notification-events" aria-label="Permalink to &quot;Notification Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>close</code></td><td>通知关闭时触发</td><td><code>{ id: string }</code></td></tr><tr><td><code>action</code></td><td>点击行动点时触发</td><td><code>{ id: string }</code></td></tr></tbody></table><h3 id="notification-methods" tabindex="-1">Notification Methods <a class="header-anchor" href="#notification-methods" aria-label="Permalink to &quot;Notification Methods&quot;">​</a></h3><p>实例方法, 可以通过 <code>ref</code> 或者 <code>document.querySelector</code> 获取到组件实例后调用。</p><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>show()</code></td><td>显示通知</td></tr><tr><td><code>close()</code></td><td>关闭通知</td></tr></tbody></table><h3 id="命令式-api" tabindex="-1">命令式 API <a class="header-anchor" href="#命令式-api" aria-label="Permalink to &quot;命令式 API&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>返回类型</th></tr></thead><tbody><tr><td><code>Notification.show(option)</code></td><td>显示通知</td><td><code>string</code>(通知 id)</td></tr><tr><td><code>Notification.info(option)</code></td><td>显示普通通知</td><td><code>string</code></td></tr><tr><td><code>Notification.success(option)</code></td><td>显示成功通知</td><td><code>string</code></td></tr><tr><td><code>Notification.warning(option)</code> / <code>warn(option)</code></td><td>显示警告通知</td><td><code>string</code></td></tr><tr><td><code>Notification.error(option)</code></td><td>显示错误通知</td><td><code>string</code></td></tr><tr><td><code>Notification.close(id)</code></td><td>关闭指定 id 的通知</td><td>-</td></tr><tr><td><code>Notification.closeAll(placement?)</code></td><td>关闭所有通知, 传递 <code>placement</code> 时只关闭指定方位</td><td>-</td></tr><tr><td><code>Notification.config(option)</code></td><td>设置全局默认配置</td><td>-</td></tr></tbody></table><h3 id="notificationoptions" tabindex="-1">NotificationOptions <a class="header-anchor" href="#notificationoptions" aria-label="Permalink to &quot;NotificationOptions&quot;">​</a></h3><p>命令式 API 的配置项, 也可以传入一个字符串作为 <code>message</code>。</p><table tabindex="0"><thead><tr><th>名称</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>id</code></td><td>自定义通知 id, 不传则自动生成</td><td><code>string</code></td><td>-</td></tr><tr><td><code>title</code></td><td>标题</td><td><code>string</code></td><td>-</td></tr><tr><td><code>message</code></td><td>消息内容, 支持 HTML 字符串</td><td><code>string</code></td><td>-</td></tr><tr><td><code>type</code></td><td>通知状态</td><td><code>string</code></td><td><code>info</code></td></tr><tr><td><code>placement</code></td><td>显示方位</td><td><code>string</code></td><td><code>topRight</code></td></tr><tr><td><code>duration</code></td><td>自动关闭时间(毫秒), <code>0</code> 表示不自动关闭</td><td><code>number</code></td><td><code>4500</code></td></tr><tr><td><code>closable</code></td><td>是否显示关闭按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>showIcon</code></td><td>是否显示状态图标</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>width</code></td><td>通知宽度</td><td><code>string</code> | <code>number</code></td><td><code>330px</code></td></tr><tr><td><code>offset</code></td><td>距离视口边缘的距离(px)</td><td><code>number</code></td><td><code>16</code></td></tr><tr><td><code>zIndex</code></td><td>层级</td><td><code>number</code></td><td><code>2000</code></td></tr><tr><td><code>maxCount</code></td><td>同一方位最多同时显示的通知数量</td><td><code>number</code></td><td><code>0</code></td></tr><tr><td><code>action</code></td><td>行动点按钮的文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>customClass</code></td><td>自定义类名</td><td><code>string</code></td><td>-</td></tr><tr><td><code>onClose</code></td><td>关闭后的回调</td><td><code>(id: string) =&gt; void</code></td><td>-</td></tr><tr><td><code>onAction</code></td><td>点击行动点的回调</td><td><code>(id: string) =&gt; void</code></td><td>-</td></tr></tbody></table><h3 id="样式变量" tabindex="-1">样式变量 <a class="header-anchor" href="#样式变量" aria-label="Permalink to &quot;样式变量&quot;">​</a></h3><p>组件使用 Shadow DOM, 内部样式无法被外部选择器覆盖, 可以通过覆盖宿主节点上的 CSS 变量来自定义样式。</p><table tabindex="0"><thead><tr><th>名称</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-notification-width</code></td><td>通知宽度</td><td><code>330px</code></td></tr><tr><td><code>--l-notification-gap</code></td><td>同一个方位的通知之间的间距</td><td><code>16px</code></td></tr><tr><td><code>--l-notification-offset</code></td><td>距离视口边缘的距离, 由 <code>offset</code> 属性同步</td><td><code>16px</code></td></tr><tr><td><code>--l-notification-zindex</code></td><td>层级, 由 <code>z-index</code> 属性同步</td><td><code>2000</code></td></tr><tr><td><code>--l-notification-padding</code></td><td>内边距</td><td><code>16px</code></td></tr><tr><td><code>--l-notification-radius</code></td><td>圆角</td><td><code>8px</code></td></tr><tr><td><code>--l-notification-background</code></td><td>背景色</td><td><code>#ffffff</code></td></tr><tr><td><code>--l-notification-shadow</code></td><td>阴影</td><td>-</td></tr><tr><td><code>--l-notification-title-color</code></td><td>标题颜色</td><td><code>rgba(0, 0, 0, 0.88)</code></td></tr><tr><td><code>--l-notification-message-color</code></td><td>内容颜色</td><td><code>rgba(0, 0, 0, 0.65)</code></td></tr><tr><td><code>--l-notification-icon-size</code></td><td>状态图标大小</td><td><code>22px</code></td></tr><tr><td><code>--l-notification-anim-duration</code></td><td>动画时长</td><td><code>0.3s</code></td></tr><tr><td><code>--l-notification-color</code></td><td>状态色, 由 <code>type</code> 决定</td><td><code>var(--l-primary-color, #007bff)</code></td></tr></tbody></table>`,22))])}}});export{_ as __pageData,T as default};
