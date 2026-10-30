const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/notification_box.BsAj8uXM.js","assets/chunks/index.N77tNhSb.js","assets/chunks/index.BChUgqng.js","assets/chunks/browser.7zTvUqO3.js"])))=>i.map(i=>d[i]);
import{v as b,P as k,V as y,x as v,C as x,o as w,c as E,a2 as c,E as n,w as a,j as t,a as o}from"./chunks/framework.nU6eqUhJ.js";import{e as N,i as m,o as C}from"./chunks/browser.7zTvUqO3.js";const q=JSON.parse('{"title":"Notification","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/notification.md","filePath":"en/components/notification.md","lastUpdated":1793253144000}'),A={name:"en/components/notification.md"},I=Object.assign(A,{setup(T){let l,r=!1,p="",d;function h(s){var f;const e=s.target,i=e.getAttribute("data-notification");if(!i||!d)return;if(i==="component"){(f=document.getElementById(e.getAttribute("data-target")))==null||f.show();return}if(i==="close"){d.close(p);return}if(i==="closeAll"){d.closeAll();return}const u=e.getAttribute("data-duration"),g={title:e.getAttribute("data-title")||"",message:e.getAttribute("data-message")||"",placement:e.getAttribute("data-placement")||"topRight",duration:u==null?4500:Number(u),action:e.getAttribute("data-action")||void 0};p=d[i](g)}return b(()=>{k(async()=>{r||(d=(await y(async()=>{const{default:s}=await import("./chunks/notification_box.BsAj8uXM.js").then(e=>e.e);return{default:s}},__vite__mapDeps([0,1,2,3]))).default,!r&&(l=N(".preview-container l-button"),m(l,s=>{C(s,"click",h)})))})}),v(()=>{r=!0,d==null||d.closeAll(),m(l||[],s=>{s.removeEventListener("click",h)})}),(s,e)=>{const i=x("ClientOnly");return w(),E("div",null,[e[9]||(e[9]=c("",11)),n(i,null,{default:a(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">Show component notification</l-button>
  <l-notification id="notification-basic"
    title="System notification"
    message="A notification from the system. Close it using the button in the top-right corner."
  ></l-notification>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button id="show-notification-basic" data-notification="component" data-target="notification-basic">Show component notification</l-button>
  <l-notification id="notification-basic"
    title="System notification"
    message="A notification from the system. Close it using the button in the top-right corner."
  ></l-notification>
`),t("textarea",{lang:"js"},`  document.getElementById('show-notification-basic').addEventListener('click', (event) => {
    document.getElementById(event.currentTarget.getAttribute('data-target')).show();
  });
`)])],-1)])]),_:1}),e[10]||(e[10]=t("p",null,[o("For declarative usage, customize content with the "),t("code",null,"title"),o(", "),t("code",null,"default"),o(", and "),t("code",null,"action"),o(" slots.")],-1)),n(i,null,{default:a(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="show-notification-slots" data-notification="component" data-target="notification-slots">Show custom notification</l-button>
  <l-notification id="notification-slots" type="info" duration="0">
    <span slot="title">Custom title</span>
    <div>
      <p>First line of content</p>
      <p>Second line of content</p>
    </div>
  </l-notification>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button id="show-notification-slots" data-notification="component" data-target="notification-slots">Show custom notification</l-button>
  <l-notification id="notification-slots" type="info" duration="0">
    <span slot="title">Custom title</span>
    <div>
      <p>First line of content</p>
      <p>Second line of content</p>
    </div>
  </l-notification>
`),t("textarea",{lang:"js"},`  document.getElementById('show-notification-slots').addEventListener('click', (event) => {
    document.getElementById(event.currentTarget.getAttribute('data-target')).show();
  });
`)])],-1)])]),_:1}),e[11]||(e[11]=t("h3",{id:"imperative-usage",tabindex:"-1"},[o("Imperative Usage "),t("a",{class:"header-anchor",href:"#imperative-usage","aria-label":'Permalink to "Imperative Usage"'},"​")],-1)),e[12]||(e[12]=t("p",null,[o("Call a static method on "),t("code",null,"Notification"),o(" to show a notification from your code. The method returns its "),t("code",null,"id"),o(".")],-1)),n(i,null,{default:a(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="info"
    data-title="Notification title"
    data-message="This notification closes automatically after 4.5 seconds."
  >Show notification</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button>Show notification</l-button>
`),t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    NotificationBox.show({
      title: 'Notification title',
      message: 'This notification closes automatically after 4.5 seconds.',
    });
  });
`)])],-1)])]),_:1}),e[13]||(e[13]=c("",2)),n(i,null,{default:a(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="Information" data-message="This is an informational message.">Info</l-button>
  <l-button data-notification="success" data-title="Success" data-message="Data saved successfully.">Success</l-button>
  <l-button data-notification="warning" data-title="Warning" data-message="This operation may involve a risk.">Warning</l-button>
  <l-button data-notification="error" data-title="Error" data-message="The request failed. Please try again later.">Error</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: 'Information', message: 'This is an informational message.' });
  NotificationBox.success({ title: 'Success', message: 'Data saved successfully.' });
  NotificationBox.warning({ title: 'Warning', message: 'This operation may involve a risk.' });
  NotificationBox.error({ title: 'Error', message: 'The request failed. Please try again later.' });
`)])],-1)])]),_:1}),e[14]||(e[14]=c("",2)),n(i,null,{default:a(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-placement="topLeft" data-title="Top left" data-message="A message from the top-left corner.">Top left</l-button>
  <l-button data-notification="info" data-placement="topRight" data-title="Top right" data-message="A message from the top-right corner.">Top right</l-button>
  <l-button data-notification="info" data-placement="bottomLeft" data-title="Bottom left" data-message="A message from the bottom-left corner.">Bottom left</l-button>
  <l-button data-notification="info" data-placement="bottomRight" data-title="Bottom right" data-message="A message from the bottom-right corner.">Bottom right</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.info({ title: 'Top left', message: 'A message from the top-left corner.', placement: 'topLeft' });
  NotificationBox.info({ title: 'Top right', message: 'A message from the top-right corner.', placement: 'topRight' });
  NotificationBox.info({ title: 'Bottom left', message: 'A message from the bottom-left corner.', placement: 'bottomLeft' });
  NotificationBox.info({ title: 'Bottom right', message: 'A message from the bottom-right corner.', placement: 'bottomRight' });
`)])],-1)])]),_:1}),e[15]||(e[15]=t("blockquote",null,[t("p",null,"Click the same button repeatedly to see notifications arrange themselves in the same corner without covering one another.")],-1)),e[16]||(e[16]=t("h3",{id:"complex-content",tabindex:"-1"},[o("Complex Content "),t("a",{class:"header-anchor",href:"#complex-content","aria-label":'Permalink to "Complex Content"'},"​")],-1)),e[17]||(e[17]=t("p",null,[o("Pass an HTML string as "),t("code",null,"message"),o(" to display more complex content.")],-1)),n(i,null,{default:a(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="success"
    data-title="Deployment complete"
    data-message="<div>Branch: <b>main</b></div><div>Duration: 32s</div>"
  >Deployment complete</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.success({
    title: 'Deployment complete',
    message: '<div>Branch: <b>main</b></div><div>Duration: 32s</div>',
  });
`)])],-1)])]),_:1}),e[18]||(e[18]=t("h3",{id:"actions",tabindex:"-1"},[o("Actions "),t("a",{class:"header-anchor",href:"#actions","aria-label":'Permalink to "Actions"'},"​")],-1)),e[19]||(e[19]=t("p",null,[o("Set the action button text with "),t("code",null,"action"),o(". Clicking it emits an "),t("code",null,"action"),o(" event so you can handle the next step. For imperative usage, supply an "),t("code",null,"onAction"),o(" callback.")],-1)),n(i,null,{default:a(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",null,`  <l-button
    data-notification="warning"
    data-title="New version available"
    data-message="The new version fixes several issues. We recommend updating now."
    data-action="Update now"
    data-duration="0"
  >New version available</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.warning({
    title: 'New version available',
    message: 'The new version fixes several issues. We recommend updating now.',
    action: 'Update now',
    duration: 0,
    onAction: (id) => {
      // Handle the next user action.
      console.log('Action clicked', id);
    },
  });
`)])],-1)])]),_:1}),e[20]||(e[20]=t("h3",{id:"automatic-and-manual-closing",tabindex:"-1"},[o("Automatic and Manual Closing "),t("a",{class:"header-anchor",href:"#automatic-and-manual-closing","aria-label":'Permalink to "Automatic and Manual Closing"'},"​")],-1)),e[21]||(e[21]=t("p",null,[o("Set "),t("code",null,"duration"),o(" to the auto-close delay in milliseconds, or "),t("code",null,"0"),o(" to disable automatic closing. The countdown pauses while the pointer is over the notification and resumes when it leaves. Show methods return an "),t("code",null,"id"),o("; call "),t("code",null,"NotificationBox.close(id)"),o(" to close that notification manually.")],-1)),n(i,null,{default:a(()=>[...e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="error" data-title="Close manually" data-message="This notification will not close automatically." data-duration="0">Open</l-button>
  <l-button data-notification="close">Close last</l-button>
  <l-button data-notification="closeAll">Close all</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  // Show a notification and save its id.
  const id = NotificationBox.error({
    title: 'Close manually',
    message: 'This notification will not close automatically.',
    duration: 0,
  });
  // Close the specified notification.
  NotificationBox.close(id);
  // Close all notifications.
  NotificationBox.closeAll();
`)])],-1)])]),_:1}),e[22]||(e[22]=t("h3",{id:"global-configuration",tabindex:"-1"},[o("Global Configuration "),t("a",{class:"header-anchor",href:"#global-configuration","aria-label":'Permalink to "Global Configuration"'},"​")],-1)),e[23]||(e[23]=t("p",null,[o("Set global defaults with "),t("code",null,"NotificationBox.config"),o(". Notifications created afterward use those defaults.")],-1)),n(i,null,{default:a(()=>[...e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-notification="info" data-title="Global configuration" data-message="This notification uses the global width and duration settings.">Show notification</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { NotificationBox } from 'litos-ui';
  //-
  NotificationBox.config({
    width: 380,
    duration: 6000,
    maxCount: 3,
  });
  NotificationBox.info({ title: 'Global configuration', message: 'This notification uses the global width and duration settings.' });
`)])],-1)])]),_:1}),e[24]||(e[24]=c("",23))])}}});export{q as __pageData,I as default};
