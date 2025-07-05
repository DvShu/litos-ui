import{i as d,o as u,b as r,a as k}from"./chunks/dom.DNZbcrqS.js";import{c as g}from"./chunks/index.DXEE3QqF.js";import{v as b,P as m,x as v,C as y,c as E,o as f,ag as p,G as e,j as i,w as l,a as n}from"./chunks/framework.DaU-16c2.js";import"./chunks/index.DZ7iFm8i.js";const A=JSON.parse('{"title":"CSS Util","description":"","frontmatter":{},"headers":[],"relativePath":"css_util.md","filePath":"css_util.md","lastUpdated":1735551012000}'),_={name:"css_util.md"},S=Object.assign(_,{setup(C){const h=g();function c(t){const s=t.target.getAttribute("data-transition"),a=r(`[l-transition="${s}"]`);d(a,o=>{o.style.display==="none"?o.setAttribute("l-transition-emit","show"):o.setAttribute("l-transition-emit","hide")})}return b(()=>{m(()=>{h.init(),d(r("[data-transition]"),t=>{u(t,"click",c)})})}),v(()=>{h.destroy(),d(r("[data-transition]"),t=>{k(t,"click",c)})}),(t,s)=>{const a=y("ClientOnly");return f(),E("div",null,[s[5]||(s[5]=p("",10)),e(a,null,{default:l(()=>s[0]||(s[0]=[i("l-code-preview",null,[i("textarea",{lang:"html"},`  <l-button data-transition="l-opacity">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
`),i("div",{class:"source"},[i("textarea",{lang:"html"},`  <l-button id="toggle">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
`),i("textarea",{lang:"js"},`  import { $one, on } from 'ph-utils/dom';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
`)])],-1)])),_:1,__:[0]}),s[6]||(s[6]=i("ol",{start:"2"},[i("li",null,[i("code",null,"l-fadein")])],-1)),s[7]||(s[7]=i("p",null,[n("从顶部往下移动渐变的进入/退出; 支持通过 "),i("code",null,"--l-fadein-offset"),n(" 控制距离, 默认为 "),i("code",null,"-20px")],-1)),e(a,null,{default:l(()=>s[1]||(s[1]=[i("l-code-preview",null,[i("textarea",{lang:"html"},`  <l-button data-transition="l-fadein">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
`),i("div",{class:"source"},[i("textarea",{lang:"html"},`  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
`),i("textarea",{lang:"js"},`  import { $one, on } from 'ph-utils/dom';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
`)])],-1)])),_:1,__:[1]}),s[8]||(s[8]=i("ol",{start:"3"},[i("li",null,[i("code",null,"l-scale")])],-1)),s[9]||(s[9]=i("p",null,"缩放进入/退出",-1)),e(a,null,{default:l(()=>s[2]||(s[2]=[i("l-code-preview",null,[i("textarea",{lang:"html"},`  <l-button data-transition="l-scale">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
`),i("div",{class:"source"},[i("textarea",{lang:"html"},`  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
`),i("textarea",{lang:"js"},`  import { $one, on } from 'ph-utils/dom';
  //-
  on($one('#toggle'), 'click', (e) => {
    const $target = $one('[l-transition]');
    const display = $target.style.display;
    if (display === 'none') {
      $target.setAttribute('l-transition-emit', 'show');
    } else {
      $target.setAttribute('l-transition-emit', 'hide');
    }
  });
`)])],-1)])),_:1,__:[2]}),s[10]||(s[10]=p("",20)),e(a,null,{default:l(()=>s[3]||(s[3]=[i("l-code-preview",null,[i("textarea",{lang:"html"},`  <div class="l-scrollbar" style="width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
`)],-1)])),_:1,__:[3]}),s[11]||(s[11]=i("h3",{id:"_3-3-更改滚动条颜色以及大小",tabindex:"-1"},[n("3.3 更改滚动条颜色以及大小 "),i("a",{class:"header-anchor",href:"#_3-3-更改滚动条颜色以及大小","aria-label":'Permalink to "3.3 更改滚动条颜色以及大小"'},"​")],-1)),s[12]||(s[12]=i("p",null,[n("通过使用下面表格中的 "),i("code",null,"CSS"),n(" 变量，可以更改滚动条的颜色以及大小")],-1)),e(a,null,{default:l(()=>s[4]||(s[4]=[i("l-code-preview",null,[i("textarea",{lang:"html"},`  <div class="l-scrollbar" style="--l-scrollbar-bg:orange;--l-scrollbar-hover:red;--l-scrollbar-size:8px;width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
`)],-1)])),_:1,__:[4]}),s[13]||(s[13]=p("",2))])}}});export{A as __pageData,S as default};
