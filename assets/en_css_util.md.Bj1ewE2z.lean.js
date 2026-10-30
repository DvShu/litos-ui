import{i as r,o as u,b as d,a as g}from"./chunks/browser.7zTvUqO3.js";import{c as b}from"./chunks/transition.CTPlZOSS.js";import{v as m,P as k,x as y,C as v,o as E,c as f,a2 as p,E as e,w as l,j as a,a as n}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Utility Styles","description":"","frontmatter":{},"headers":[],"relativePath":"en/css_util.md","filePath":"en/css_util.md","lastUpdated":1793253144000}'),C={name:"en/css_util.md"},A=Object.assign(C,{setup(x){const h=b();function c(s){const t=s.target.getAttribute("data-transition"),i=d(`[l-transition="${t}"]`);r(i,o=>{o.style.display==="none"?o.setAttribute("l-transition-emit","show"):o.setAttribute("l-transition-emit","hide")})}return m(()=>{k(()=>{h.init(),r(d("[data-transition]"),s=>{u(s,"click",c)})})}),y(()=>{h.destroy(),r(d("[data-transition]"),s=>{g(s,"click",c)})}),(s,t)=>{const i=v("ClientOnly");return E(),f("div",null,[t[5]||(t[5]=p("",10)),e(i,null,{default:l(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button data-transition="l-opacity">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="toggle">Toggle</l-button>
  <span l-transition="l-opacity" class="ml-10">Hello world</span>
`),a("textarea",{lang:"js"},`  import { $one, on } from 'utilane/browser';
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
`)])],-1)])]),_:1}),t[6]||(t[6]=a("ol",{start:"2"},[a("li",null,[a("code",null,"l-fadein")])],-1)),t[7]||(t[7]=a("p",null,[n("Fade in from above and reverse the effect when leaving. Use "),a("code",null,"--l-fadein-offset"),n(" to control the distance; the default is "),a("code",null,"-20px"),n(".")],-1)),e(i,null,{default:l(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button data-transition="l-fadein">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-fadein" class="ml-10 inline">Hello world</div>
  <div l-transition="l-fadein" class="ml-10 inline" style="--l-fadein-offset:-50px;">Hello world</div>
`),a("textarea",{lang:"js"},`  import { $one, on } from 'utilane/browser';
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
`)])],-1)])]),_:1}),t[8]||(t[8]=a("ol",{start:"3"},[a("li",null,[a("code",null,"l-scale")])],-1)),t[9]||(t[9]=a("p",null,"Scale in and out.",-1)),e(i,null,{default:l(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button data-transition="l-scale">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="toggle">Toggle</l-button>
  <div l-transition="l-scale" class="ml-10 inline">Hello world</div>
`),a("textarea",{lang:"js"},`  import { $one, on } from 'utilane/browser';
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
`)])],-1)])]),_:1}),t[10]||(t[10]=p("",20)),e(i,null,{default:l(()=>[...t[3]||(t[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-scrollbar" style="width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
`)],-1)])]),_:1}),t[11]||(t[11]=a("h3",{id:"_3-3-changing-scrollbar-colors-and-size",tabindex:"-1"},[n("3.3 Changing Scrollbar Colors and Size "),a("a",{class:"header-anchor",href:"#_3-3-changing-scrollbar-colors-and-size","aria-label":'Permalink to "3.3 Changing Scrollbar Colors and Size"'},"​")],-1)),t[12]||(t[12]=a("p",null,"Use the CSS variables in the table below to change the scrollbar colors and size.",-1)),e(i,null,{default:l(()=>[...t[4]||(t[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-scrollbar" style="--l-scrollbar-bg:orange;--l-scrollbar-hover:red;--l-scrollbar-size:8px;width:100%;height:80px;border:1px solid #dedede;overflow:auto;">
    <div style="width:150%;height:150px;">ScrollBar</div>
  </div>
`)],-1)])]),_:1}),t[13]||(t[13]=p("",2))])}}});export{q as __pageData,A as default};
