import{o as r,$ as a,a as d,t as s,b,i as y}from"./chunks/browser.CpyXlELn.js";import{c as k}from"./chunks/transition.DIPieWIu.js";import{d as f,v,P as T,x,C as _,o as E,c as A,a2 as o,E as c,w as p,j as e}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"Transition","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/transition.md","filePath":"en/components/transition.md","lastUpdated":1793253144000}'),q={name:"en/components/transition.md"},D=f({...q,setup(w){let l;function h(){const n=a("#text1");(n.getAttribute("l-transition-emit")||"show")==="hide"?n.setAttribute("l-transition-emit","show"):n.setAttribute("l-transition-emit","hide")}function m(){const n=a("#text2");n.style.display==="none"?(n.style.display="block",s(n,[["opacity","0","0.3s"]])):s(n,[["opacity","0","0.3s"]],"leave",()=>{n.style.display="none"})}function u(){const n=b(".in-trans");y(n,t=>{const i=t.style.display==="none",g=t.getAttribute("l-name");i?(t.style.display="inline-block",s(t,g,"enter")):s(t,g,"leave",()=>{t.style.display="none"})})}return v(()=>{T(()=>{l=k(),l.init(),r(a("#toggle1"),"click",h),r(a("#toggle2"),"click",m),r(a("#toggle3"),"click",u)})}),x(()=>{{l.destroy();const n=a("#toggle1");n&&d(n,"click",h);const t=a("#toggle2");t&&d(t,"click",m);const i=a("#toggle3");i&&d(i,"click",u)}}),(n,t)=>{const i=_("ClientOnly");return E(),A("div",null,[t[3]||(t[3]=o(`<h1 id="transition" tabindex="-1">Transition <a class="header-anchor" href="#transition" aria-label="Permalink to &quot;Transition&quot;">​</a></h1><p>Create transitions and animations based on state changes, typically when an element or component enters or leaves the DOM.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createTransition } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/lib/utils/transition.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// init() finds elements with l-transition and applies their transitions.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> trans</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createTransition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">trans.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Call trans.destroy() when the page unmounts to release observers.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Create a transition handler, then call <code>init</code> after the elements have mounted. It finds elements with <code>l-transition</code>, applies their transitions, and observes changes to <code>l-transition-emit</code>. Set this attribute to <code>show</code> or <code>hide</code> to apply the corresponding transition.</p><p>To hide an element, set its <code>l-transition-emit</code> attribute to <code>hide</code>.</p><p>To remove an element after its leave transition instead of setting <code>display: none</code>, set <code>l-transition-method</code> to <code>remove</code>.</p>`,9)),c(i,null,{default:p(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle1">Toggle</l-button>
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
  // Initialize transitions for elements with l-transition.
  // Call trans.destroy() when the page unmounts.
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
`)])],-1)])]),_:1}),t[4]||(t[4]=o('<blockquote><p>After using <code>l-transition-method=&quot;remove&quot;</code>, register any newly added elements with <code>trans.add([element])</code> to observe their transitions.</p></blockquote><h3 id="manual-transitions" tabindex="-1">Manual Transitions <a class="header-anchor" href="#manual-transitions" aria-label="Permalink to &quot;Manual Transitions&quot;">​</a></h3><p>For manual control, import <code>transition</code> from <code>utilane/browser</code> and call it directly.</p>',3)),c(i,null,{default:p(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="toggle2">Toggle</l-button>
  <p id="text2">hello</p>
`),e("textarea",{lang:"js"},`  function toggle2() {
    const $text = $one('#text2');
    const display = $text.style.display;
    if (display === 'none') {
      $text.style.display = 'block';
      // Apply the enter transition.
      transition($text, [['opacity', '0', '0.3s']]);
    } else {
      // Apply the leave transition.
      transition($text, [['opacity', '0', '0.3s']], 'leave', () => {
        $text.style.display = 'none';
      });
    }
  }
  //-
  on($one('#toggle2'), 'click', toggle2);
`)])],-1)])]),_:1}),t[5]||(t[5]=o('<blockquote><p><code>transition()</code> accepts four parameters:</p><ol><li><code>el: HTMLElement</code>: The element to animate.</li><li><code>property: string | [string, string, string][]</code>: A CSS transition name, or an array of property names, values, and durations. For example, <code>[&#39;opacity&#39;, &#39;0&#39;, &#39;0.3s&#39;]</code> defines an opacity transition between <code>1</code> and <code>0</code> lasting <code>0.3s</code>.</li><li><code>dir: &#39;enter&#39; | &#39;leave&#39;</code>: The direction: <code>enter</code> for entering and <code>leave</code> for leaving.</li><li><code>finish?:() =&gt; void</code>: Callback invoked when the transition finishes.</li></ol></blockquote><h3 id="built-in-transitions" tabindex="-1">Built-in Transitions <a class="header-anchor" href="#built-in-transitions" aria-label="Permalink to &quot;Built-in Transitions&quot;">​</a></h3><p>Import <code>litos-ui/styles/transition.css</code> to apply the built-in transitions by name with the <code>transition</code> function.</p>',3)),c(i,null,{default:p(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="toggle3">Toggle</l-button>
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
  // On unmount, call: off($one('#toggle3'), 'click', toggleInner);
`)])],-1)])]),_:1}),t[6]||(t[6]=o(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createTransition } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/transition&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="transition-attributes" tabindex="-1">Transition Attributes <a class="header-anchor" href="#transition-attributes" aria-label="Permalink to &quot;Transition Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>l-transition</code></td><td>Transition name applied to the element</td><td><code>string</code></td><td><code>l</code></td></tr><tr><td><code>l-transition-method</code></td><td>How to handle the element after its leave transition</td><td><code>remove</code> (remove the element), <code>hide</code> (hide the element)</td><td><code>hide</code></td></tr><tr><td><code>l-transition-emit</code></td><td>Applies the corresponding transition when the attribute changes</td><td><code>show</code> (show the element), <code>hide</code> (hide the element)</td><td><code>show</code></td></tr></tbody></table><h3 id="transition-methods" tabindex="-1">Transition Methods <a class="header-anchor" href="#transition-methods" aria-label="Permalink to &quot;Transition Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>init</code></td><td>Finds elements with l-transition and initializes their transitions</td><td><code>() =&gt; void</code></td><td>-</td></tr><tr><td><code>destroy</code></td><td>Disconnects attribute observation and releases the Observer</td><td><code>() =&gt; void</code></td><td>-</td></tr><tr><td><code>add</code></td><td>Adds elements to the transition observer</td><td><code>(el: HTMLElement[]) =&gt; void</code></td><td>-</td></tr></tbody></table>`,8))])}}});export{P as __pageData,D as default};
