const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.Dp0GRk1N.js","assets/chunks/info.Cu6rqLzm.js","assets/chunks/browser.CpyXlELn.js","assets/chunks/index.BChUgqng.js"])))=>i.map(i=>d[i]);
import{v as b,P as m,V as g,x as k,C as x,o as y,c as v,a2 as s,E as i,w as n,j as t,a as e}from"./chunks/framework.nU6eqUhJ.js";import{e as N,i as f,o as q}from"./chunks/browser.CpyXlELn.js";const _=JSON.parse('{"title":"Notification 通知提醒框","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/notification.md","filePath":"en/components/notification.md","lastUpdated":1793115401000}'),A={name:"en/components/notification.md"},T=Object.assign(A,{setup(E){let l,r="",c;function u(a){const d=a.target,o=d.getAttribute("data-notification");if(!o||!c)return;if(o==="close"){c.close(r);return}if(o==="closeAll"){c.closeAll();return}const p=d.getAttribute("data-duration"),h={title:d.getAttribute("data-title")||"",message:d.getAttribute("data-message")||"",placement:d.getAttribute("data-placement")||"topRight",duration:p==null?4500:Number(p),action:d.getAttribute("data-action")||void 0};r=c[o](h)}return b(()=>{m(async()=>{c=(await g(async()=>{const{default:a}=await import("./chunks/index.Dp0GRk1N.js").then(d=>d.i);return{default:a}},__vite__mapDeps([0,1,2,3]))).default,l=N(".preview-container l-button"),f(l,a=>{q(a,"click",u)})})}),k(()=>{f(l||[],a=>{a.removeEventListener("click",u)})}),(a,d)=>{const o=x("ClientOnly");return y(),v("div",null,[d[9]||(d[9]=s("",10)),i(o,null,{default:n(()=>[...d[0]||(d[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-notification
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
`)])],-1)])]),_:1}),d[12]||(d[12]=s("",2)),i(o,null,{default:n(()=>[...d[2]||(d[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="提示" data-message="这是一条普通提示信息。">信息</l-button>
  <l-button data-notification="success" data-title="成功" data-message="数据保存成功。">成功</l-button>
  <l-button data-notification="warning" data-title="警告" data-message="当前操作可能存在风险。">警告</l-button>
  <l-button data-notification="error" data-title="错误" data-message="请求失败, 请稍后重试。">错误</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Notification } from 'litos-ui';
  //-
  Notification.info({ title: '提示', message: '这是一条普通提示信息。' });
  Notification.success({ title: '成功', message: '数据保存成功。' });
  Notification.warning({ title: '警告', message: '当前操作可能存在风险。' });
  Notification.error({ title: '错误', message: '请求失败, 请稍后重试。' });
`)])],-1)])]),_:1}),d[13]||(d[13]=s("",2)),i(o,null,{default:n(()=>[...d[3]||(d[3]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-placement="topLeft" data-title="左上" data-message="来自左上角的消息。">左上</l-button>
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
`)])],-1)])]),_:1}),d[24]||(d[24]=s("",22))])}}});export{_ as __pageData,T as default};
