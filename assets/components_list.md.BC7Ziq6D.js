import{$ as m,o as g,a as v}from"./chunks/browser.CpyXlELn.js";import{v as x,P as y,x as E,C as _,o as q,c as F,a2 as b,E as f,w as k,j as e,a as h}from"./chunks/framework.nU6eqUhJ.js";const L=JSON.parse('{"title":"List 滚动列表","description":"","frontmatter":{},"headers":[],"relativePath":"components/list.md","filePath":"components/list.md","lastUpdated":1793115401000}'),C={name:"components/list.md"},$=Object.assign(C,{setup(A){let a,l,i=0,d=20,p=10;function c(){setTimeout(()=>{if(a&&i<d){let s=!1,t=i+p;i+p>=d&&(s=!0,t=d),a.append(u(i,t)),a.removeAttribute("loading"),s?a.setAttribute("finish","finish"):a.removeAttribute("finish"),i=t}},1e3)}function u(s,t){const n=document.createDocumentFragment();for(let o=s;o<t;o++){const r=document.createElement("div");r.style.cssText="padding: 10px; border-bottom: 1px solid #dedede;",r.textContent=o,n.appendChild(r)}return n}return x(()=>{y(()=>{a=m("#list"),a&&g(a,"load",c),l=m("#list1"),l&&l.append(u(0,100))})}),E(()=>{a&&v(a,"load",c)}),(s,t)=>{const n=_("ClientOnly");return q(),F("div",null,[t[2]||(t[2]=b(`<h1 id="list-滚动列表" tabindex="-1">List 滚动列表 <a class="header-anchor" href="#list-滚动列表" aria-label="Permalink to &quot;List 滚动列表&quot;">​</a></h1><p>无限加载数据的列表。滚动至底部时，加载更多数据。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { List, regist, LoadingIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([List, LoadingIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>滚动到底部触发 <code>load</code> 加载更多事件，通过 <code>finish</code> 属性决定是否加载完成。</p>`,7)),f(n,null,{default:k(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list = document.querySelector('#list');
  // 模拟分页数据
  let start = 0;
  let max = 20;
  let step = 10;
  //-
  function handleLoadmore() {
     // 模拟数据加载
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
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
  // 监听加载事件
  $list.addEventListener('load', handleLoadmore);
`)])],-1)])]),_:1}),t[3]||(t[3]=e("h3",{id:"普通列表",tabindex:"-1"},[h("普通列表 "),e("a",{class:"header-anchor",href:"#普通列表","aria-label":'Permalink to "普通列表"'},"​")],-1)),t[4]||(t[4]=e("p",null,[h("通过传递 "),e("code",null,'infinite="false"'),h(" 禁用滚动加载这样就成了一个单纯的可以滚动的列表。")],-1)),f(n,null,{default:k(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
`),e("textarea",{lang:"js"},`  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
`)])],-1)])]),_:1}),t[5]||(t[5]=b(`<h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见<a href="/litos-ui/on_demand">按需导入</a>。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="list-attributes" tabindex="-1">List Attributes <a class="header-anchor" href="#list-attributes" aria-label="Permalink to &quot;List Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>finish</code></td><td>是否加载完成</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>infinite</code></td><td>是否无限滚动</td><td><code>boolean</code></td><td><code>true</code></td></tr></tbody></table><h3 id="list-slots" tabindex="-1">List Slots <a class="header-anchor" href="#list-slots" aria-label="Permalink to &quot;List Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>列表内容</td></tr></tbody></table><h3 id="list-events" tabindex="-1">List Events <a class="header-anchor" href="#list-events" aria-label="Permalink to &quot;List Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>load</code></td><td>加载更多, <code>e.detail</code> 包含 <code>page</code> 分页页码</td><td><code>(e: CustomEvent)</code></td></tr></tbody></table>`,10))])}}});export{L as __pageData,$ as default};
