import{o as d,$ as o,a as r,t as a,b,i as k}from"./chunks/dom.DntxtiBs.js";import{c as y}from"./chunks/transition.Dbc24b9p.js";import{d as _,v as x,P as f,x as T,C as v,o as E,c as A,ag as s,E as c,w as p,j as e}from"./chunks/framework.-4c4jpF6.js";const w=JSON.parse('{"title":"Transition 过渡","description":"","frontmatter":{},"headers":[],"relativePath":"components/transition.md","filePath":"components/transition.md","lastUpdated":1754042164000}'),q={name:"components/transition.md"},F=_({...q,setup(P){let l;function h(){const n=o("#text1");(n.getAttribute("l-transition-emit")||"show")==="hide"?n.setAttribute("l-transition-emit","show"):n.setAttribute("l-transition-emit","hide")}function g(){const n=o("#text2");n.style.display==="none"?(n.style.display="block",a(n,[["opacity","0","0.3s"]])):a(n,[["opacity","0","0.3s"]],"leave",()=>{n.style.display="none"})}function u(){const n=b(".in-trans");k(n,t=>{const i=t.style.display==="none",m=t.getAttribute("l-name");i?(t.style.display="inline-block",a(t,m,"enter")):a(t,m,"leave",()=>{t.style.display="none"})})}return x(()=>{f(()=>{l=y(),l.init(),d(o("#toggle1"),"click",h),d(o("#toggle2"),"click",g),d(o("#toggle3"),"click",u)})}),T(()=>{{l.destroy();const n=o("#toggle1");n&&r(n,"click",h);const t=o("#toggle2");t&&r(t,"click",g);const i=o("#toggle3");i&&r(i,"click",u)}}),(n,t)=>{const i=v("ClientOnly");return E(),A("div",null,[t[3]||(t[3]=s("",9)),c(i,null,{default:p(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
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
`),e("textarea",{lang:"js"},`  import { $one, on, off } from 'ph-utils/dom';
  import { createTransition } from 'litos-ui';
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
`)])],-1)])]),_:1}),t[4]||(t[4]=s("",3)),c(i,null,{default:p(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
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
`)])],-1)])]),_:1}),t[5]||(t[5]=s("",3)),c(i,null,{default:p(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle3">Toggle</l-button>
  <div class="in-trans" l-name="l-opacity">l-opacity</div>
  <div class="in-trans" l-name="l-fadein">l-fadein</div>
  <div class="in-trans" l-name="l-scale">l-scale</div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
`),e("textarea",{lang:"js"},"")])],-1)])]),_:1}),t[6]||(t[6]=s("",5))])}}});export{w as __pageData,F as default};
