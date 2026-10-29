import{o as d,$ as a,a as r,t as s,b as k,i as b}from"./chunks/browser.CpyXlELn.js";import{c as y}from"./chunks/transition.DIPieWIu.js";import{d as f,v,P as _,x,C as E,o as T,c as A,a2 as o,E as c,w as p,j as e}from"./chunks/framework.nU6eqUhJ.js";const w=JSON.parse('{"title":"Transition 过渡","description":"","frontmatter":{},"headers":[],"relativePath":"components/transition.md","filePath":"components/transition.md","lastUpdated":1793253144000}'),q={name:"components/transition.md"},D=f({...q,setup($){let l;function h(){const n=a("#text1");(n.getAttribute("l-transition-emit")||"show")==="hide"?n.setAttribute("l-transition-emit","show"):n.setAttribute("l-transition-emit","hide")}function g(){const n=a("#text2");n.style.display==="none"?(n.style.display="block",s(n,[["opacity","0","0.3s"]])):s(n,[["opacity","0","0.3s"]],"leave",()=>{n.style.display="none"})}function u(){const n=k(".in-trans");b(n,t=>{const i=t.style.display==="none",m=t.getAttribute("l-name");i?(t.style.display="inline-block",s(t,m,"enter")):s(t,m,"leave",()=>{t.style.display="none"})})}return v(()=>{_(()=>{l=y(),l.init(),d(a("#toggle1"),"click",h),d(a("#toggle2"),"click",g),d(a("#toggle3"),"click",u)})}),x(()=>{{l.destroy();const n=a("#toggle1");n&&r(n,"click",h);const t=a("#toggle2");t&&r(t,"click",g);const i=a("#toggle3");i&&r(i,"click",u)}}),(n,t)=>{const i=E("ClientOnly");return T(),A("div",null,[t[3]||(t[3]=o("",9)),c(i,null,{default:p(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
  <p id="text1" l-transition="l-opacity" l-transition-method="hide">hello</p>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
  <p id="text1" l-transition="l-opacity" l-transition-method="hide">hello</p>
`),e("textarea",{lang:"css"},`  .l-opacity-enter-active,
  .l-opacity-leave-active {
    transition: opacity 0.3s ease;
  }
  //-
  .l-opacity-enter-from,
  .l-opacity-leave-to {
    opacity: 0;
  }
`),e("textarea",{lang:"js"},`  import { $one, on, off } from 'utilane/browser';
  import { createTransition } from 'litos-ui/lib/utils/transition.js';
  //-
  const trans = createTransition();
  // 初始化, 加载带有 l-transition 属性的元素动画
  // 需要在页面结束时调用 trans.destroy()
  trans.init();
  //-
  function toggle() {
    const $text = $one('#text1');
    const transEmit = $text.getAttribute('l-transition-emit') || 'show';
    if (transEmit === 'hide') {
      $text.setAttribute('l-transition-emit', "show");
    } else {
      $text.setAttribute('l-transition-emit', "hide");
    }
  }
  //-
  on($one('#toggle1'), 'click', toggle);
`)])],-1)])]),_:1}),t[4]||(t[4]=o("",3)),c(i,null,{default:p(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
`),e("textarea",{lang:"js"},`  function toggle2() {
    const $text = $one('#text2');
    const display = $text.style.display;
    if (display === 'none') {
      $text.style.display = 'block';
      // 展示显示动画
      transition($text, [['opacity', '0', '0.3s']]);
    } else {
      // 隐藏隐藏动画
      transition($text, [['opacity', '0', '0.3s']], 'leave', () => {
        $text.style.display = 'none';
      });
    }
  }
  //-
  on($one('#toggle2'), 'click', toggle2);
`)])],-1)])]),_:1}),t[5]||(t[5]=o("",3)),c(i,null,{default:p(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle3">Toggle</l-button>
  <div class="in-trans" l-name="l-opacity">l-opacity</div>
  <div class="in-trans" l-name="l-fadein">l-fadein</div>
  <div class="in-trans" l-name="l-scale">l-scale</div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="toggle3">Toggle</l-button>
  <div class="in-trans" l-name="l-opacity">l-opacity</div>
  <div class="in-trans" l-name="l-fadein">l-fadein</div>
  <div class="in-trans" l-name="l-scale">l-scale</div>
`),e("textarea",{lang:"js"},`  import { $, $one, on, off, iterate, transition } from 'utilane/browser';
  import 'litos-ui/styles/transition.css';
  //-
  function toggleInner() {
    iterate($('.in-trans'), (item) => {
      const name = item.getAttribute('l-name');
      if (item.style.display === 'none') {
        item.style.display = 'inline-block';
        transition(item, name, 'enter');
      } else {
        transition(item, name, 'leave', () => {
          item.style.display = 'none';
        });
      }
    });
  }
  //-
  on($one('#toggle3'), 'click', toggleInner);
  // 页面卸载时调用： off($one('#toggle3'), 'click', toggleInner);
`)])],-1)])]),_:1}),t[6]||(t[6]=o("",8))])}}});export{w as __pageData,D as default};
