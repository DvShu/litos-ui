import{o as r,$ as n,a as c,t as p}from"./chunks/dom.DNZbcrqS.js";import{c as m}from"./chunks/index.DXEE3QqF.js";import{d as u,v as k,P as b,x as y,C as _,c as x,o as T,ag as a,G as h,w as g,j as e}from"./chunks/framework.DaU-16c2.js";import"./chunks/index.DZ7iFm8i.js";const C=JSON.parse('{"title":"Transition 过渡","description":"","frontmatter":{},"headers":[],"relativePath":"components/transition.md","filePath":"components/transition.md","lastUpdated":1737345140000}'),f={name:"components/transition.md"},$=u({...f,setup(E){let o;function s(){const i=n("#text1");(i.getAttribute("l-transition-emit")||"show")==="hide"?i.setAttribute("l-transition-emit","show"):i.setAttribute("l-transition-emit","hide")}function d(){const i=n("#text2");i.style.display==="none"?(i.style.display="block",p(i,[["opacity","0","0.3s"]])):p(i,[["opacity","0","0.3s"]],"leave",()=>{i.style.display="none"})}return k(()=>{b(()=>{o=m(),o.init(),r(n("#toggle1"),"click",s),r(n("#toggle2"),"click",d)})}),y(()=>{o.destroy(),c(n("#toggle1"),"click",s),c(n("#toggle2"),"click",d)}),(i,t)=>{const l=_("ClientOnly");return T(),x("div",null,[t[2]||(t[2]=a(`<h1 id="transition-过渡" tabindex="-1">Transition 过渡 <a class="header-anchor" href="#transition-过渡" aria-label="Permalink to &quot;Transition 过渡&quot;">​</a></h1><p>帮助你制作基于状态变化的过渡和动画；通常在一个元素或组件进入和离开 <code>DOM</code> 时应用动画</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createTransition } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 会自动加载页面中带有 l-transition 属性的元素并应用动画</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> trans</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createTransition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">trans.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h3><p>创建过渡动画后，在节点加载完成后，调用 <code>init</code> 方法，即可自动加载带有 <code>l-transition</code> 属性的元素并应用动画。同时也会监听节点的 <code>l-transition-emit</code> 属性，当属性变化时，会自动应用动画。</p><p>基于此当想要隐藏节点时，只需要将 <code>l-transition-emit</code> 属性设置为 <code>hide</code> 即可。</p><p>如果想要隐藏动画完成后，删除节点而不是设置 <code>display: none</code> ; 可以将 <code>l-transition-method</code> 属性设置为 <code>remove</code> 即可。</p>`,9)),h(l,null,{default:g(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
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
`)])],-1)])),_:1,__:[0]}),t[3]||(t[3]=a('<blockquote><p>注意: 设置 <code>l-transition-method=&quot;remove&quot;</code> 后，新添加节点时，需要手动调用 <code>trans.add()</code> 方法重新添加节点动画</p></blockquote><h3 id="手动动画" tabindex="-1">手动动画 <a class="header-anchor" href="#手动动画" aria-label="Permalink to &quot;手动动画&quot;">​</a></h3><p>如果想要手动控制动画，可以通过直接引用 <code>ph-utils/dom transition</code> 然后调用 <code>transition</code> 方法即可。</p>',3)),h(l,null,{default:g(()=>t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
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
`)])],-1)])),_:1,__:[1]}),t[4]||(t[4]=a('<blockquote><p><code>transition()</code> 函数有4个参数</p><ol><li><code>el: HTMLElement</code> 执行过渡的节点</li><li><code>property: string | [string, string, string][]</code> 过渡的属性，当为 <code>string</code> 时为过渡名称，通过 <code>css</code> 定义过渡; 为数组时为过渡的属性名，过渡的属性值，过渡的持续时间，如 <code>[&#39;opacity&#39;, &#39;0&#39;, &#39;0.3s&#39;]</code> 为透明度从 <code>1</code> 到 <code>0</code> 的过渡，持续时间为 <code>0.3s</code></li><li><code>dir: &#39;enter&#39; | &#39;leave&#39;</code> 过渡的方向，<code>enter</code> 为进入，<code>leave</code> 为离开</li><li><code>finish?:() =&gt; void</code> 过渡完成后的回调函数</li></ol></blockquote><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="transition-property" tabindex="-1">Transition Property <a class="header-anchor" href="#transition-property" aria-label="Permalink to &quot;Transition Property&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>l-transition</code></td><td>为节点添加过渡动画</td><td><code>string</code></td><td><code>l</code></td></tr><tr><td><code>l-transition-method</code></td><td>为节点添加过渡动画后，节点隐藏方式</td><td><code>remove</code>[删除节点]、<code>hide</code>[隐藏节点]</td><td><code>hide</code></td></tr><tr><td><code>l-transition-emit</code></td><td>为节点应用过渡动画, 该属性变化时节点自动应用动画</td><td><code>show</code>[显示节点]、<code>hide</code>[隐藏节点]</td><td><code>show</code></td></tr></tbody></table><h3 id="transition-method" tabindex="-1">Transition Method <a class="header-anchor" href="#transition-method" aria-label="Permalink to &quot;Transition Method&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>init</code></td><td>初始化，加载带有 <code>l-transition</code> 属性的元素并应用动画</td><td><code>() =&gt; void</code></td><td>-</td></tr><tr><td><code>destroy</code></td><td>销毁，移除所有动画</td><td><code>() =&gt; void</code></td><td>-</td></tr><tr><td><code>add</code></td><td>添加节点动画</td><td><code>(el: HTMLElement[]) =&gt; void</code></td><td>-</td></tr></tbody></table>',6))])}}});export{C as __pageData,$ as default};
