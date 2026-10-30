import{$ as u,o as k,a as v}from"./chunks/browser.7zTvUqO3.js";import{v as x,P as y,x as E,C as q,o as _,c as F,a2 as b,E as g,w as f,j as e,a as h}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"List","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/list.md","filePath":"en/components/list.md","lastUpdated":1793253144000}'),C={name:"en/components/list.md"},T=Object.assign(C,{setup(A){let a,l,i=0,d=20,p=10;function c(){setTimeout(()=>{if(a&&i<d){let s=!1,t=i+p;i+p>=d&&(s=!0,t=d),a.append(m(i,t)),a.removeAttribute("loading"),s?a.setAttribute("finish","finish"):a.removeAttribute("finish"),i=t}},1e3)}function m(s,t){const n=document.createDocumentFragment();for(let r=s;r<t;r++){const o=document.createElement("div");o.style.cssText="padding: 10px; border-bottom: 1px solid #dedede;",o.textContent=r,n.appendChild(o)}return n}return x(()=>{y(()=>{a=u("#list"),a&&k(a,"load",c),l=u("#list1"),l&&l.append(m(0,100))})}),E(()=>{a&&v(a,"load",c)}),(s,t)=>{const n=q("ClientOnly");return _(),F("div",null,[t[2]||(t[2]=b(`<h1 id="list" tabindex="-1">List <a class="header-anchor" href="#list" aria-label="Permalink to &quot;List&quot;">​</a></h1><p>A list that loads more data as you scroll to the bottom.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { List, regist, LoadingIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([List, LoadingIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Scrolling to the bottom emits a <code>load</code> event. Set <code>finish</code> when all data has been loaded.</p>`,7)),g(n,null,{default:f(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list = document.querySelector('#list');
  // Simulate paginated data.
  let start = 0;
  let max = 20;
  let step = 10;
  //-
  function handleLoadmore() {
     // Simulate data loading.
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
        $list.removeAttribute('loading');
        if (isFinish) {
          $list.setAttribute('finish', 'finish');
        } else {
          $list.removeAttribute('finish');
        }
        start = end;
      }
    }, 1000);
  }
  //-
  function createRenderFragemnt(start, end) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const $div = document.createElement('div');
      $div.style.cssText = 'padding: 10px; border-bottom: 1px solid #dedede;';
      $div.textContent = i;
      fragment.appendChild($div);
    }
    return fragment;
  }
  //-
  // Listen for the load event.
  $list.addEventListener('load', handleLoadmore);
`)])],-1)])]),_:1}),t[3]||(t[3]=e("h3",{id:"regular-list",tabindex:"-1"},[h("Regular List "),e("a",{class:"header-anchor",href:"#regular-list","aria-label":'Permalink to "Regular List"'},"​")],-1)),t[4]||(t[4]=e("p",null,[h("Set "),e("code",null,'infinite="false"'),h(" to disable infinite loading and use a regular scrollable list.")],-1)),g(n,null,{default:f(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
`)])],-1)])]),_:1}),t[5]||(t[5]=b(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><p>The built-in loading and end-of-list messages are currently Chinese.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="list-attributes" tabindex="-1">List Attributes <a class="header-anchor" href="#list-attributes" aria-label="Permalink to &quot;List Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>finish</code></td><td>Whether all data has been loaded</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>infinite</code></td><td>Whether infinite loading is enabled</td><td><code>boolean</code></td><td><code>true</code></td></tr></tbody></table><h3 id="list-slots" tabindex="-1">List Slots <a class="header-anchor" href="#list-slots" aria-label="Permalink to &quot;List Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>List content</td></tr></tbody></table><h3 id="list-events" tabindex="-1">List Events <a class="header-anchor" href="#list-events" aria-label="Permalink to &quot;List Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>load</code></td><td>Requests more data; e.detail.page contains the page number</td><td><code>(e: CustomEvent)</code></td></tr></tbody></table>`,11))])}}});export{P as __pageData,T as default};
