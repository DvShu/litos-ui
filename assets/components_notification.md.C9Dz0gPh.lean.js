const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/notification_box.Ba_w9I5m.js","assets/chunks/index.N77tNhSb.js","assets/chunks/index.BChUgqng.js","assets/chunks/browser.CpyXlELn.js"])))=>i.map(i=>d[i]);
import{v as g,P as k,V as x,x as E,C as y,o as N,c as v,a2 as c,E as i,w as n,j as t,a as d}from"./chunks/framework.nU6eqUhJ.js";import{e as B,i as b,o as A}from"./chunks/browser.CpyXlELn.js";const C=JSON.parse('{"title":"Notification 通知提醒框","description":"","frontmatter":{},"headers":[],"relativePath":"components/notification.md","filePath":"components/notification.md","lastUpdated":1793253144000}'),q={name:"components/notification.md"},_=Object.assign(q,{setup(w){let l,r=!1,p="",a;function u(s){var f;const o=s.target,e=o.getAttribute("data-notification");if(!e||!a)return;if(e==="component"){(f=document.getElementById(o.getAttribute("data-target")))==null||f.show();return}if(e==="close"){a.close(p);return}if(e==="closeAll"){a.closeAll();return}const h=o.getAttribute("data-duration"),m={title:o.getAttribute("data-title")||"",message:o.getAttribute("data-message")||"",placement:o.getAttribute("data-placement")||"topRight",duration:h==null?4500:Number(h),action:o.getAttribute("data-action")||void 0};p=a[e](m)}return g(()=>{k(async()=>{r||(a=(await x(async()=>{const{default:s}=await import("./chunks/notification_box.Ba_w9I5m.js").then(o=>o.e);return{default:s}},__vite__mapDeps([0,1,2,3]))).default,!r&&(l=B(".preview-container l-button"),b(l,s=>{A(s,"click",u)})))})}),E(()=>{r=!0,a==null||a.closeAll(),b(l||[],s=>{s.removeEventListener("click",u)})}),(s,o)=>{const e=y("ClientOnly");return N(),v("div",null,[o[9]||(o[9]=c("",11)),i(e,null,{default:n(()=>[...o[0]||(o[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">显示组件式通知</l-button>
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
`)])],-1)])]),_:1}),o[13]||(o[13]=c("",2)),i(e,null,{default:n(()=>[...o[3]||(o[3]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="提示" data-message="这是一条普通提示信息。">信息</l-button>
  <l-button data-notification="success" data-title="成功" data-message="数据保存成功。">成功</l-button>
  <l-button data-notification="warning" data-title="警告" data-message="当前操作可能存在风险。">警告</l-button>
  <l-button data-notification="error" data-title="错误" data-message="请求失败, 请稍后重试。">错误</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: '提示', message: '这是一条普通提示信息。' });
  NotificationBox.success({ title: '成功', message: '数据保存成功。' });
  NotificationBox.warning({ title: '警告', message: '当前操作可能存在风险。' });
  NotificationBox.error({ title: '错误', message: '请求失败, 请稍后重试。' });
`)])],-1)])]),_:1}),o[14]||(o[14]=c("",2)),i(e,null,{default:n(()=>[...o[4]||(o[4]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-placement="topLeft" data-title="左上" data-message="来自左上角的消息。">左上</l-button>
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
`)])],-1)])]),_:1}),o[24]||(o[24]=c("",23))])}}});export{C as __pageData,_ as default};
