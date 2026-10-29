import{L as d}from"./chunks/index.CUe7CM8d.js";import{a as m,$ as y,o as E}from"./chunks/browser.CpyXlELn.js";import{v,P as x,x as f,C as L,o as C,c as F,a2 as r,E as s,w as l,j as e,a as i}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"Loading","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/loading.md","filePath":"en/components/loading.md","lastUpdated":1793253144000}'),B={name:"en/components/loading.md"},q=Object.assign(B,{setup(T){const p=[];let h=!1;function o(a,t){const n=y(a);n&&(E(n,"click",t),p.push([n,t]))}function c(){d.init("loading3"),setTimeout(()=>{d.close("loading3")},3e3)}function g(){const a=d.create();setTimeout(()=>{a.hide()},3e3)}function u(){const a=d.create({to:"#startLoading1Parent",fullscreen:!1});setTimeout(()=>{a.updateLoadingText("Reloading...")},3e3),setTimeout(()=>{a.hide()},6e3)}function k(a){const t=a.target.getAttribute("data-loading");d.init(t)}function b(a){const t=a.target.getAttribute("data-loading");d.close(t)}return v(()=>{x(()=>{h||(d.init("loading1"),d.init("loading2"),d.init("loading5"),o('[l-loading="loading3"]',c),o("#startLoading",g),o("#startBarLoading",k),o("#endBarLoading",b),o("#startLoading1",u))})}),f(()=>{h=!0;for(const[a,t]of p)m(a,"click",t);p.length=0}),(a,t)=>{const n=L("ClientOnly");return C(),F("div",null,[t[7]||(t[7]=r(`<h1 id="loading" tabindex="-1">Loading <a class="header-anchor" href="#loading" aria-label="Permalink to &quot;Loading&quot;">​</a></h1><p>Animated indicators shown while data is loading.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><p>Import the stylesheet manually unless it is supplied by your resolver configuration.</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Loading </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/loading.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="regional-loading" tabindex="-1">Regional Loading <a class="header-anchor" href="#regional-loading" aria-label="Permalink to &quot;Regional Loading&quot;">​</a></h3><p>Show a loading indicator over a region while its data is being loaded.</p><p>Add <code>l-loading</code> to an element, call <code>LLoading.init()</code> to show the indicator, and call <code>LLoading.close()</code> to close it.</p>`,9)),s(n,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">Content loading area</div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div l-loading="loading">Content loading area</div>
`),e("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[8]||(t[8]=r('<h3 id="custom-content" tabindex="-1">Custom Content <a class="header-anchor" href="#custom-content" aria-label="Permalink to &quot;Custom Content&quot;">​</a></h3><p>Customize the loading text and background color.</p><p>Add <code>l-loading-text</code> to an element with <code>l-loading</code> to show text below the spinner. Set it to <code>false</code> or <code>0</code> to hide the text; an empty attribute uses the default text. Use <code>l-loading-background</code> to set the overlay background.</p>',3)),s(n,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div
    style="height:150px;"
    l-loading="loading2"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    Content loading area
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div
    style="height:150px;"
    l-loading="loading"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    Content loading area
  </div>
`),e("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"fullscreen",tabindex:"-1"},[i("Fullscreen "),e("a",{class:"header-anchor",href:"#fullscreen","aria-label":'Permalink to "Fullscreen"'},"​")],-1)),t[10]||(t[10]=e("p",null,[i("Add "),e("code",null,"l-loading-fullscreen"),i(" to mount the overlay on "),e("code",null,"body"),i(" and display a fullscreen indicator. Scrolling is locked by default; set "),e("code",null,'l-loading-lock="false"'),i(" to allow scrolling.")],-1)),s(n,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>Load</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>Load</l-button>
`),e("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"progress-bar",tabindex:"-1"},[i("Progress Bar "),e("a",{class:"header-anchor",href:"#progress-bar","aria-label":'Permalink to "Progress Bar"'},"​")],-1)),t[12]||(t[12]=e("p",null,[i("Set "),e("code",null,'l-loading-shape="bar"'),i(" to use a progress bar instead of a circular spinner.")],-1)),s(n,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">Start</l-button>
    <l-button id="endBarLoading" data-loading="loading4">Stop</l-button>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">Start</l-button>
    <l-button id="endBarLoading" data-loading="loading4">Stop</l-button>
  </div>
`),e("textarea",{lang:"js"},`  //-
  function handleStartBarLoading() {
    LLoading.init('loading4');
  }
  //-
  function handleEndBarLoading() {
    LLoading.close('loading4');
  }
  //-
  const $startBarLoading = document.getElementById('startBarLoading');
  const $endBarLoading = document.getElementById('endBarLoading');
  $startBarLoading.addEventListener('click', handleStartBarLoading);
  $endBarLoading.addEventListener('click', handleEndBarLoading);
`)])],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"animated-border",tabindex:"-1"},[i("Animated Border "),e("a",{class:"header-anchor",href:"#animated-border","aria-label":'Permalink to "Animated Border"'},"​")],-1)),t[14]||(t[14]=e("p",null,[i("Set "),e("code",null,'l-loading-shape="border"'),i(" to use an animated border.")],-1)),s(n,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-shape="border"
  >
    Content loading area
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-mask="1"
    l-loading-shape="border"
  >
    Content loading area
  </div>
`)])],-1)])]),_:1}),t[15]||(t[15]=r(`<h3 id="imperative-api" tabindex="-1">Imperative API <a class="header-anchor" href="#imperative-api" aria-label="Permalink to &quot;Imperative API&quot;">​</a></h3><blockquote><p>Import the Loading API and loading.css explicitly for imperative usage.</p></blockquote><p>Call <code>create()</code> to show a loading indicator:</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(options);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>The <code>options</code> argument configures the indicator; see the options table below. The returned instance provides a <code>hide()</code> method:</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  loading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Imperative indicators are fullscreen by default. Fullscreen calls share a single DOM indicator: another call creates a new wrapper instance around the existing fullscreen node. Hiding either wrapper closes the shared indicator:</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">loading2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,8)),s(n,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="startLoading">Start</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="startLoading">Button</l-button>
`),e("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),t[16]||(t[16]=e("p",null,[i("Update the text of an imperative indicator with "),e("code",null,"loading1.updateLoadingText(str)"),i(".")],-1)),s(n,null,{default:l(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">Start</l-button>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">Start</l-button>
  </div>
`),e("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading1');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create({ to: '#startLoading1Parent', fullscreen: false });
    setTimeout(() => {
      loading.updateLoadingText("Reloading...");
    }, 3000);
    setTimeout(() => {
      loading.hide();
    }, 6000);
  });
`)])],-1)])]),_:1}),t[17]||(t[17]=r(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/loading.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Loading </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/loading&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><p>The built-in loading text is Chinese. Set <code>text</code> for imperative calls or <code>l-loading-text</code> on an element to provide English text. The background and color defaults below are CSS fallbacks; JavaScript leaves them unset.</p><p>Implementation limits: element-based <code>l-loading-mask</code> is currently read by presence, so any supplied value enables the overlay. <code>l-loading-zindex</code> is not read by the initializer; set <code>--l-loading-zindex</code> in CSS instead. Use imperative <code>mask</code> and <code>zindex</code> options when needed.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Property</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>to</code></td><td>Mount target: an HTMLElement or a selector resolved with document.querySelector</td><td><code>string</code> | <code>HTMLElement</code></td><td><code>body</code></td></tr><tr><td><code>text</code></td><td>Text below the circular spinner; pass an empty string to hide it</td><td><code>string</code></td><td><code>加载中……</code></td></tr><tr><td><code>background</code></td><td>Overlay background</td><td><code>string</code></td><td><code>rgba(0, 0, 0, .7)</code></td></tr><tr><td><code>fullscreen</code></td><td>Whether to show a fullscreen indicator</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>lock</code></td><td>Whether to lock scrolling</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>shape</code></td><td>Shape: circle (spinner), bar (progress bar), or border (animated border)</td><td><code>string</code></td><td><code>circle</code></td></tr><tr><td><code>color</code></td><td>Color</td><td><code>string</code></td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>mask</code></td><td>Overlay: 0 hides it, 1 shows it, 2 shows it for circle only</td><td><code>number</code></td><td><code>2</code></td></tr><tr><td><code>zindex</code></td><td>Overlay stacking level; CSS fallback is 10, or 50 for fullscreen</td><td><code>number</code></td><td>Not set</td></tr></tbody></table><h3 id="element-attributes" tabindex="-1">Element Attributes <a class="header-anchor" href="#element-attributes" aria-label="Permalink to &quot;Element Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Attribute</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>l-loading-text</code></td><td>Text below the circular spinner; false or 0 hides it</td><td><code>加载中……</code></td></tr><tr><td><code>l-loading-background</code></td><td>Overlay background</td><td><code>rgba(0, 0, 0, .7)</code></td></tr><tr><td><code>l-loading-fullscreen</code></td><td>Whether to show a fullscreen indicator</td><td><code>-</code></td></tr><tr><td><code>l-loading-lock</code></td><td>Whether to lock scrolling; false or 0 allows scrolling</td><td><code>true</code></td></tr><tr><td><code>l-loading-shape</code></td><td>Shape</td><td><code>circle</code></td></tr><tr><td><code>l-loading-color</code></td><td>Color</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>l-loading-mask</code></td><td>Overlay: 0 hides it, 1 shows it, 2 shows it for circle only</td><td><code>2</code></td></tr><tr><td><code>l-loading-zindex</code></td><td>Stacking level (z-index)</td><td><code>10</code></td></tr></tbody></table>`,10))])}}});export{P as __pageData,q as default};
