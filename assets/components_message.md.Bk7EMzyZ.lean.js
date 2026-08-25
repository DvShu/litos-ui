import{e as m,i as p,o as b}from"./chunks/browser.Chubywy5.js";import{M as h}from"./chunks/index.B0f8PPnA.js";import{v as k,P as f,x as _,C as y,o as M,c as x,a2 as n,E as i,w as r,j as t,a as s}from"./chunks/framework.CiKxQFaU.js";import"./chunks/info.BgTfn2LJ.js";import"./chunks/index.B_dLCkhl.js";const C=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"components/message.md","filePath":"components/message.md","lastUpdated":1787245584000}'),q={name:"components/message.md"},S=Object.assign(q,{setup(v){let d,l;function c(a){const e=a.target,o=e.getAttribute("data-message"),u=e.getAttribute("data-type")||"info",g=e.getAttribute("data-duration")||3e3;u!=="close"?l=h.show({message:o,type:u,duration:Number(g)}):h.close(l)}return k(()=>{f(()=>{d=m(".preview-container l-button"),p(d,a=>{b(a,"click",c)})})}),_(()=>{d&&p(d,a=>{a.removeEventListener("click",c)})}),(a,e)=>{const o=y("ClientOnly");return M(),x("div",null,[e[3]||(e[3]=n("",7)),i(o,null,{default:r(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",null,`<l-button data-message="这是一条普通的提示信息">显示消息</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button text>显示消息</l-button>
`),t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  import { elem, on } from 'ph-utils/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: '这是一条普通的提示信息' });
  });
`)])],-1)])]),_:1}),e[4]||(e[4]=n("",3)),i(o,null,{default:r(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-message="提示消息" data-type="info">提示消息</l-button>
  <l-button data-message="成功消息" data-type="success">成功消息</l-button>
  <l-button data-message="警告消息" data-type="warn">警告消息</l-button>
  <l-button data-message="错误消息" data-type="error">错误消息</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  //-
  Message.info("提示消息");
  Message.success("成功消息");
  Message.warn("警告消息");
  Message.error("错误消息");
`)])],-1)])]),_:1}),e[5]||(e[5]=t("h3",{id:"手动关闭",tabindex:"-1"},[s("手动关闭 "),t("a",{class:"header-anchor",href:"#手动关闭","aria-label":'Permalink to "手动关闭"'},"​")],-1)),e[6]||(e[6]=t("p",null,[s("将 "),t("code",null,"duration"),s(" 属性设置为 "),t("code",null,"0"),s(", 可以使 "),t("code",null,"Message"),s(" 不自动消失。然后显示消息的函数会返回一个消息 "),t("code",null,"id"),s(", 通过手动调用 close 手动关闭")],-1)),i(o,null,{default:r(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-message="这是一条手动关闭的提示信息" data-duration="0" data-type="error">打开</l-button>
  <l-button data-type="close">关闭</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  //-
  // 打开消息
  const id = Message.show({ 
    message: '这是一条手动关闭的提示信息', 
    type: 'info',
    duration: 0 
  });
  // 关闭消息
  Message.close(id);
`)])],-1)])]),_:1}),e[7]||(e[7]=n("",5))])}}});export{C as __pageData,S as default};
