import{e as g,i as h,o as m}from"./chunks/browser.7zTvUqO3.js";import{v as b,P as k,x as y,C as f,o as E,c as _,a2 as i,E as n,w as l,j as t,a}from"./chunks/framework.nU6eqUhJ.js";const A=JSON.parse('{"title":"Message 消息提示","description":"","frontmatter":{},"headers":[],"relativePath":"components/message.md","filePath":"components/message.md","lastUpdated":1793253144000}'),M={name:"components/message.md"},F=Object.assign(M,{setup(x){let o,r;function c(s){const e=s.target,d=e.getAttribute("data-message"),p=e.getAttribute("data-type")||"info",u=e.getAttribute("data-duration")||3e3;p!=="close"?r=Message.show({message:d,type:p,duration:Number(u)}):Message.close(r)}return b(()=>{k(()=>{o=g(".preview-container l-button"),h(o,s=>{m(s,"click",c)})})}),y(()=>{o&&h(o,s=>{s.removeEventListener("click",c)})}),(s,e)=>{const d=f("ClientOnly");return E(),_("div",null,[e[3]||(e[3]=i("",7)),n(d,null,{default:l(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",null,`<l-button data-message="这是一条普通的提示信息">显示消息</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button text>显示消息</l-button>
`),t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: '这是一条普通的提示信息' });
  });
`)])],-1)])]),_:1}),e[4]||(e[4]=i("",3)),n(d,null,{default:l(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-message="提示消息" data-type="info">提示消息</l-button>
  <l-button data-message="成功消息" data-type="success">成功消息</l-button>
  <l-button data-message="警告消息" data-type="warn">警告消息</l-button>
  <l-button data-message="错误消息" data-type="error">错误消息</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  //-
  Message.info("提示消息");
  Message.success("成功消息");
  Message.warn("警告消息");
  Message.error("错误消息");
`)])],-1)])]),_:1}),e[5]||(e[5]=t("h3",{id:"手动关闭",tabindex:"-1"},[a("手动关闭 "),t("a",{class:"header-anchor",href:"#手动关闭","aria-label":'Permalink to "手动关闭"'},"​")],-1)),e[6]||(e[6]=t("p",null,[a("将 "),t("code",null,"duration"),a(" 属性设置为 "),t("code",null,"0"),a(", 可以使 "),t("code",null,"Message"),a(" 不自动消失。然后显示消息的函数会返回一个消息 "),t("code",null,"id"),a(", 通过手动调用 close 手动关闭")],-1)),n(d,null,{default:l(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",null,`  <l-button data-message="这是一条手动关闭的提示信息" data-duration="0" data-type="error">打开</l-button>
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
`)])],-1)])]),_:1}),e[7]||(e[7]=i("",8))])}}});export{A as __pageData,F as default};
