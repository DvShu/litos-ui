import{o as d,$ as a,a as r,t as s,b,i as m}from"./chunks/browser.CpyXlELn.js";import{c as y}from"./chunks/transition.DIPieWIu.js";import{d as _,v as x,P as f,x as v,C as E,o as T,c as A,a2 as o,E as c,w as p,j as e}from"./chunks/framework.nU6eqUhJ.js";const D=JSON.parse('{"title":"Transition 过渡","description":"","frontmatter":{},"headers":[],"relativePath":"components/transition.md","filePath":"components/transition.md","lastUpdated":1793115401000}'),q={name:"components/transition.md"},w=_({...q,setup(P){let l;function h(){const i=a("#text1");(i.getAttribute("l-transition-emit")||"show")==="hide"?i.setAttribute("l-transition-emit","show"):i.setAttribute("l-transition-emit","hide")}function g(){const i=a("#text2");i.style.display==="none"?(i.style.display="block",s(i,[["opacity","0","0.3s"]])):s(i,[["opacity","0","0.3s"]],"leave",()=>{i.style.display="none"})}function u(){const i=b(".in-trans");m(i,t=>{const n=t.style.display==="none",k=t.getAttribute("l-name");n?(t.style.display="inline-block",s(t,k,"enter")):s(t,k,"leave",()=>{t.style.display="none"})})}return x(()=>{f(()=>{l=y(),l.init(),d(a("#toggle1"),"click",h),d(a("#toggle2"),"click",g),d(a("#toggle3"),"click",u)})}),v(()=>{{l.destroy();const i=a("#toggle1");i&&r(i,"click",h);const t=a("#toggle2");t&&r(t,"click",g);const n=a("#toggle3");n&&r(n,"click",u)}}),(i,t)=>{const n=E("ClientOnly");return T(),A("div",null,[t[3]||(t[3]=o("",9)),c(n,null,{default:p(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
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
`)])],-1)])]),_:1}),t[4]||(t[4]=o("",3)),c(n,null,{default:p(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
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
`)])],-1)])]),_:1}),t[5]||(t[5]=o("",3)),c(n,null,{default:p(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle3">Toggle</l-button>
  <div class="in-trans" l-name="l-opacity">l-opacity</div>
  <div class="in-trans" l-name="l-fadein">l-fadein</div>
  <div class="in-trans" l-name="l-scale">l-scale</div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
`),e("textarea",{lang:"js"},"")])],-1)])]),_:1}),t[6]||(t[6]=o("",8))])}}});export{D as __pageData,w as default};
