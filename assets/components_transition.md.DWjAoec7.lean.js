import{o as r,$ as n,a as c,t as p}from"./chunks/dom.CgJDYxOB.js";import{c as m}from"./chunks/index.CDm6J-Fm.js";import{d as u,v as k,P as b,x as y,C as x,c as _,o as T,ag as a,G as h,w as g,j as e}from"./chunks/framework.BCyZWppQ.js";import"./chunks/index.DZ7iFm8i.js";const C=JSON.parse('{"title":"Transition 过渡","description":"","frontmatter":{},"headers":[],"relativePath":"components/transition.md","filePath":"components/transition.md","lastUpdated":1737345140000}'),f={name:"components/transition.md"},$=u({...f,setup(E){let o;function s(){const i=n("#text1");(i.getAttribute("l-transition-emit")||"show")==="hide"?i.setAttribute("l-transition-emit","show"):i.setAttribute("l-transition-emit","hide")}function d(){const i=n("#text2");i.style.display==="none"?(i.style.display="block",p(i,[["opacity","0","0.3s"]])):p(i,[["opacity","0","0.3s"]],"leave",()=>{i.style.display="none"})}return k(()=>{b(()=>{o=m(),o.init(),r(n("#toggle1"),"click",s),r(n("#toggle2"),"click",d)})}),y(()=>{o.destroy(),c(n("#toggle1"),"click",s),c(n("#toggle2"),"click",d)}),(i,t)=>{const l=x("ClientOnly");return T(),_("div",null,[t[2]||(t[2]=a("",9)),h(l,null,{default:g(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
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
`)])],-1)])),_:1}),t[3]||(t[3]=a("",3)),h(l,null,{default:g(()=>t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
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
`)])],-1)])),_:1}),t[4]||(t[4]=a("",6))])}}});export{C as __pageData,$ as default};
