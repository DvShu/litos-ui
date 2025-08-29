import{e as m,i as p,o as b}from"./chunks/dom.DBNJew1L.js";import{M as h}from"./chunks/index.Drgo8aIw.js";import{v as k,P as f,x as _,C as M,c as y,o as x,ag as n,G as i,j as t,w as r,a as s}from"./chunks/framework._HD6XqYi.js";import"./chunks/info.C2EOFWes.js";import"./chunks/index.DZ7iFm8i.js";const w=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"components/message.md","filePath":"components/message.md","lastUpdated":1737345140000}'),q={name:"components/message.md"},S=Object.assign(q,{setup(v){let o,l;function c(a){const e=a.target,d=e.getAttribute("data-message"),u=e.getAttribute("data-type")||"info",g=e.getAttribute("data-duration")||3e3;u!=="close"?l=h.show({message:d,type:u,duration:Number(g)}):h.close(l)}return k(()=>{f(()=>{o=m(".preview-container l-button"),p(o,a=>{b(a,"click",c)})})}),_(()=>{o&&p(o,a=>{a.removeEventListener("click",c)})}),(a,e)=>{const d=M("ClientOnly");return x(),y("div",null,[e[3]||(e[3]=n("",7)),i(d,null,{default:r(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",null,`<l-button data-message="这是一条普通的提示信息">显示消息</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button text>显示消息</l-button>
`),t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  import { elem, on } from 'ph-utils/dom';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: '这是一条普通的提示信息' });
  });
`)])],-1)])]),_:1}),e[4]||(e[4]=n("",3)),i(d,null,{default:r(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-message="提示消息" data-type="info">提示消息</l-button>
  <l-button data-message="成功消息" data-type="success">成功消息</l-button>
  <l-button data-message="警告消息" data-type="warn">警告消息</l-button>
  <l-button data-message="错误消息" data-type="error">错误消息</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  //-
  Message.info("提示消息");
  Message.success("成功消息");
  Message.warn("警告消息");
  Message.error("错误消息");
`)])],-1)])]),_:1}),e[5]||(e[5]=t("h3",{id:"手动关闭",tabindex:"-1"},[s("手动关闭 "),t("a",{class:"header-anchor",href:"#手动关闭","aria-label":'Permalink to "手动关闭"'},"​")],-1)),e[6]||(e[6]=t("p",null,[s("将 "),t("code",null,"duration"),s(" 属性设置为 "),t("code",null,"0"),s(", 可以使 "),t("code",null,"Message"),s(" 不自动消失。然后显示消息的函数会返回一个消息 "),t("code",null,"id"),s(", 通过手动调用 close 手动关闭")],-1)),i(d,null,{default:r(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-message="这是一条手动关闭的提示信息" data-duration="0">打开</l-button>
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
`)])],-1)])]),_:1}),e[7]||(e[7]=n("",5))])}}});export{w as __pageData,S as default};
