import{e as g,i as h,o as u}from"./chunks/browser.CpyXlELn.js";import{v as b,P as k,x as y,C as f,o as E,c as M,a2 as i,E as d,w as r,j as s,a}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Message","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/message.md","filePath":"en/components/message.md","lastUpdated":1793253144000}'),_={name:"en/components/message.md"},S=Object.assign(_,{setup(v){let o,l;function c(t){const e=t.target,n=e.getAttribute("data-message"),p=e.getAttribute("data-type")||"info",m=e.getAttribute("data-duration")||3e3;p!=="close"?l=Message.show({message:n,type:p,duration:Number(m)}):Message.close(l)}return b(()=>{k(()=>{o=g(".preview-container l-button"),h(o,t=>{u(t,"click",c)})})}),y(()=>{o&&h(o,t=>{t.removeEventListener("click",c)})}),(t,e)=>{const n=f("ClientOnly");return E(),M("div",null,[e[3]||(e[3]=i("",7)),d(n,null,{default:r(()=>[...e[0]||(e[0]=[s("l-code-preview",null,[s("textarea",null,`<l-button data-message="This is an informational message">Show message</l-button>
`),s("div",{class:"source"},[s("textarea",{lang:"html"},`  <l-button text>Show message</l-button>
`),s("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  import { elem, on } from 'utilane/browser';
  //-
  on(elem('l-button')[0], 'click', () => {
    Message.show({ message: 'This is an informational message' });
  });
`)])],-1)])]),_:1}),e[4]||(e[4]=i("",3)),d(n,null,{default:r(()=>[...e[1]||(e[1]=[s("l-code-preview",null,[s("textarea",null,`  <l-button data-message="Informational message" data-type="info">Informational message</l-button>
  <l-button data-message="Success message" data-type="success">Success message</l-button>
  <l-button data-message="Warning message" data-type="warn">Warning message</l-button>
  <l-button data-message="Error message" data-type="error">Error message</l-button>
`),s("div",{class:"source"},[s("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  //-
  Message.info("Informational message");
  Message.success("Success message");
  Message.warn("Warning message");
  Message.error("Error message");
`)])],-1)])]),_:1}),e[5]||(e[5]=s("h3",{id:"closing-manually",tabindex:"-1"},[a("Closing Manually "),s("a",{class:"header-anchor",href:"#closing-manually","aria-label":'Permalink to "Closing Manually"'},"​")],-1)),e[6]||(e[6]=s("p",null,[a("Set "),s("code",null,"duration"),a(" to "),s("code",null,"0"),a(" to prevent automatic closing. The show method returns a message "),s("code",null,"id"),a("; pass it to "),s("code",null,"Message.close()"),a(" to close the message manually.")],-1)),d(n,null,{default:r(()=>[...e[2]||(e[2]=[s("l-code-preview",null,[s("textarea",null,`  <l-button data-message="This message must be closed manually" data-duration="0" data-type="error">Open</l-button>
  <l-button data-type="close">Close</l-button>
`),s("div",{class:"source"},[s("textarea",{lang:"js"},`  import { Message } from 'litos-ui';
  //-
  // Show the message
  const id = Message.show({
    message: 'This message must be closed manually',
    type: 'info',
    duration: 0
  });
  // Close the message
  Message.close(id);
`)])],-1)])]),_:1}),e[7]||(e[7]=i("",8))])}}});export{q as __pageData,S as default};
