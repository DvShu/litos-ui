import{t as c}from"./chunks/dom.DBNJew1L.js";import{v as g,P as b,C as u,c as k,o as m,ag as l,G as i,j as a,w as o,a as s}from"./chunks/framework._HD6XqYi.js";const v=JSON.parse('{"title":"Tag 标签","description":"","frontmatter":{},"headers":[],"relativePath":"components/tag.md","filePath":"components/tag.md","lastUpdated":1756372474000}'),y={name:"components/tag.md"},C=Object.assign(y,{setup(E){let r,n;function h(){if(n){let e=document.createElement("l-tag");e.setAttribute("closable","true"),e.setAttribute("type","primary"),e.style.marginRight="5px",e.innerHTML="标签",n.appendChild(e),c(e,"l-scale","enter"),e=null}}function p(e){c(e.target,"l-scale","leave",()=>{e.target.remove()})}return g(()=>{b(()=>{r=document.getElementById("btn-add"),n=document.getElementById("tag-container"),n.addEventListener("close",p),r.addEventListener("click",h)})}),(e,t)=>{const d=u("ClientOnly");return m(),k("div",null,[t[3]||(t[3]=l(`<h1 id="tag-标签" tabindex="-1">Tag 标签 <a class="header-anchor" href="#tag-标签" aria-label="Permalink to &quot;Tag 标签&quot;">​</a></h1><p>通常用来展示一些属性</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Tag, CloseIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Tag);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(CloseIcon); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 需要 closable 引入</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>由 <code>type</code> 属性来选择 <code>tag</code> 的类型。也可以通过 <code>color</code> 属性来自定义背景色。</p>`,7)),i(d,null,{default:o(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary">标签</l-tag>
  <l-tag type="success">标签</l-tag>
  <l-tag type="info">标签</l-tag>
  <l-tag type="warning">标签</l-tag>
  <l-tag type="error">标签</l-tag>
  <l-tag color="#409eff">标签</l-tag>
  <l-tag type="blue">标签</l-tag>
`)],-1)])]),_:1}),t[4]||(t[4]=l(`<blockquote><p><code>type</code> 属性，可以传递一个自定义的值，然后在 <code>css</code> 中定义 <code>.l-tag--xx</code> 就能实现自定义的样式。</p></blockquote><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.l-tag--blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-tag-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#4998f6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-tag-background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#e8f5ff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-tag-border-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#4998f6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="可移除" tabindex="-1">可移除 <a class="header-anchor" href="#可移除" aria-label="Permalink to &quot;可移除&quot;">​</a></h3><p>通过 <code>closeable</code> 属性来实现可移除的标签，然后监听 <code>close</code> 事件。</p>`,4)),i(d,null,{default:o(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tag type="primary" closeable>标签</l-tag>
  <l-tag type="success" closeable>标签</l-tag>
  <l-tag type="info" closeable>标签</l-tag>
  <l-tag type="warning" closeable>标签</l-tag>
  <l-tag type="error" closeable>标签</l-tag>
  <l-tag color="#409eff" closeable>标签</l-tag>
`)],-1)])]),_:1}),t[5]||(t[5]=a("blockquote",null,[a("p",null,[s("需要引入 "),a("code",null,"CloseIcon"),s(" 组件")])],-1)),t[6]||(t[6]=a("h3",{id:"过渡效果",tabindex:"-1"},[s("过渡效果 "),a("a",{class:"header-anchor",href:"#过渡效果","aria-label":'Permalink to "过渡效果"'},"​")],-1)),t[7]||(t[7]=a("p",null,[s("如果想给标签添加显示或移除时的过渡效果，通过 "),a("code",null,"ph-utils/transition"),s(" 实现, 具体使用参考 "),a("a",{href:"/litos-ui/components/transition"},"transition"),s("。")],-1)),i(d,null,{default:o(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`<l-button id="btn-add">添加</l-button>
<hr />
<div id="tag-container"></div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="btn-add">添加</l-button>
  <hr />
  <div id="tag-container"></div>
`),a("textarea",{lang:"js"},`  import { transition } from 'ph-utils/dom';
  //-
  function handleAddTag() {
    if ($tagContainer) {
      const $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closable', 'true');
      $addTag.setAttribute('type', 'primary');
      $addTag.style.marginRight = "5px";
      $addTag.innerHTML = '标签';
      $tagContainer.appendChild($addTag);
      transition($addTag, 'l-scale', "enter");
      $addTag = null;
    }
  }
  //-
  function onClose(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }
  //-
  const $addBtn = document.getElementById('btn-add');
  const $tagContainer = document.getElementById('tag-container');
  $tagContainer.addEventListener('close', onClose);
  $addBtn.addEventListener('click', handleAddTag);
`)])],-1)])]),_:1}),t[8]||(t[8]=l('<blockquote><p>这里使用的是内置的过渡名称，需要手动引入 <code>litos-ui/styles/transition.css</code> 文件 也可以通过传递 <code>css</code> 属性实现过渡, 例如: <code>transition(target, [[&quot;opacity&quot;, &quot;0&quot;, &quot;0.3s&quot;]], &quot;enter&quot;)</code></p></blockquote><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="tag-attibutes" tabindex="-1">Tag Attibutes <a class="header-anchor" href="#tag-attibutes" aria-label="Permalink to &quot;Tag Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>type</code></td><td>类型</td><td><code>string</code></td><td><code>primary</code>, 可选值有: <code>primary</code>, <code>success</code>, <code>info</code>, <code>warning</code>, <code>error</code></td></tr><tr><td><code>color</code></td><td>标签颜色</td><td><code>string</code></td><td>-</td></tr><tr><td><code>closeable</code></td><td>是否可移除</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="tag-slots" tabindex="-1">Tag Slots <a class="header-anchor" href="#tag-slots" aria-label="Permalink to &quot;Tag Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr></tbody></table><h3 id="tag-events" tabindex="-1">Tag Events <a class="header-anchor" href="#tag-events" aria-label="Permalink to &quot;Tag Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td></tr><tr><td><code>close</code></td><td>移除标签时触发</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="tag-methods" tabindex="-1">Tag Methods <a class="header-anchor" href="#tag-methods" aria-label="Permalink to &quot;Tag Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="tag-css-variables" tabindex="-1">Tag CSS Variables <a class="header-anchor" href="#tag-css-variables" aria-label="Permalink to &quot;Tag CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-tag-height</code></td><td>标签高度</td><td><code>22px</code></td></tr><tr><td><code>--l-tag-border-color</code></td><td>标签边框颜色</td><td><code>#dedede</code></td></tr><tr><td><code>--l-tag-background</code></td><td>标签背景色</td><td><code>#fff</code></td></tr><tr><td><code>--l-tag-color</code></td><td>标签字体颜色</td><td><code>#333</code></td></tr></tbody></table>',12))])}}});export{v as __pageData,C as default};
