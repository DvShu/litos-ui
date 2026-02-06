import{L as i}from"./chunks/index.DfUgI4Se.js";import{o as r,$ as t,a as c}from"./chunks/dom.DntxtiBs.js";import{v as b,P as E,x as m,C as y,o as L,c as x,ag as p,E as l,w as o,j as a,a as n}from"./chunks/framework.-4c4jpF6.js";const A=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1753941375000}'),v={name:"components/loading.md"},T=Object.assign(v,{setup(f){function g(){i.init("loading3"),setTimeout(()=>{i.close("loading3")},3e3)}function h(){const e=i.create();setTimeout(()=>{e.hide()},3e3)}function k(e){const d=e.target.getAttribute("data-loading");i.init(d)}function u(e){const d=e.target.getAttribute("data-loading");i.close(d)}return b(()=>{E(()=>{i.init("loading1"),i.init("loading2"),i.init("loading5"),r(t('[l-loading="loading3"]'),"click",g),r(t("#startLoading"),"click",h),r(t("#startBarLoading"),"click",k),r(t("#endBarLoading"),"click",u)})}),m(()=>{c(t('[l-loading="loading3"]'),"click",g),c(t("#startLoading"),"click",h),c(t("#startBarLoading"),"click",k),c(t("#endBarLoading"),"click",u)}),(e,d)=>{const s=y("ClientOnly");return L(),x("div",null,[d[6]||(d[6]=p(`<h1 id="loading-加载" tabindex="-1">Loading 加载 <a class="header-anchor" href="#loading-加载" aria-label="Permalink to &quot;Loading 加载&quot;">​</a></h1><p>数据加载时显示的动效。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><p>如果没有配合 <code>litosui-unplugin-resolver</code> 自动引用，则需要手动引入样式文件</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Loading </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/loading.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="区域加载" tabindex="-1">区域加载 <a class="header-anchor" href="#区域加载" aria-label="Permalink to &quot;区域加载&quot;">​</a></h3><p>在某一个区域加载数据时展示加载动画，防止页面失去响应，提高用户体验</p><p>给节点添加一个 <code>l-loading</code> 属性，然后调用 <code>LLoading.init()</code> 初始化, 调用 <code>LLoading.close()</code> 关闭。</p>`,9)),l(s,null,{default:o(()=>[...d[0]||(d[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[7]||(d[7]=a("h3",{id:"自定义内容",tabindex:"-1"},[n("自定义内容 "),a("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),d[8]||(d[8]=a("p",null,"你可以自定义加载中组件的文字，背景颜色。",-1)),d[9]||(d[9]=a("p",null,[n("在绑定了 "),a("code",null,"l-loading"),n(" 属性的元素上添加 "),a("code",null,"l-loading-text"),n(" 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。"),a("code",null,"l-loading-background"),n(" 用来设定背景色值。")],-1)),l(s,null,{default:o(()=>[...d[1]||(d[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
    style="height:150px;" 
    l-loading="loading2" 
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div 
    style="height:150px;" 
    l-loading="loading" 
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[10]||(d[10]=a("h3",{id:"全屏",tabindex:"-1"},[n("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),d[11]||(d[11]=a("p",null,[n("通过传递 "),a("code",null,"l-loading-fullscreen"),n(" 属性将遮罩插入至 "),a("code",null,"body"),n(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),n(" 可以允许滚动。")],-1)),l(s,null,{default:o(()=>[...d[2]||(d[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[12]||(d[12]=a("h3",{id:"进度条风格",tabindex:"-1"},[n("进度条风格 "),a("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),d[13]||(d[13]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="bar"'),n(" 参数可以将圆形加载变为进度条风格。")],-1)),l(s,null,{default:o(()=>[...d[3]||(d[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;" 
    l-loading="loading4" 
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;" 
    l-loading="loading4" 
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
`),a("textarea",{lang:"js"},`  //-
  function handleStartBarLoading() {
    LLoading.init('loading5');
  }
  //-
  function handleEndBarLoading() {
    LLoading.close('loading5');
  }
  //-
  const $startBarLoading = document.getElementById('startBarLoading');
  const $endBarLoading = document.getElementById('endBarLoading');
  $startBarLoading.addEventListener('click', handleStartBarLoading);
  $endBarLoading.addEventListener('click', handleEndBarLoading);
`)])],-1)])]),_:1}),d[14]||(d[14]=a("h3",{id:"边框动画风格",tabindex:"-1"},[n("边框动画风格 "),a("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),d[15]||(d[15]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="border"'),n(" 参数可以变为边框加载动画。")],-1)),l(s,null,{default:o(()=>[...d[4]||(d[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px" 
    l-loading="loading5"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px" 
    l-loading="loading5" 
    l-loading-mask="1"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
`)])],-1)])]),_:1}),d[16]||(d[16]=p(`<h3 id="编程式调用" tabindex="-1">编程式调用 <a class="header-anchor" href="#编程式调用" aria-label="Permalink to &quot;编程式调用&quot;">​</a></h3><blockquote><p>编程式调用依赖于自动引入</p></blockquote><p>通过调用 <code>create()</code> 函数来显示加载动画，例如：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(options);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中 <code>options</code> 参数为 <code>Loading</code> 的配置项，具体见下表。该会返回一个 <code>Loading</code> 实例，可通过调用该实例的 <code>hide()</code> 方法来关闭它：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  loading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>需要注意的是，以编程方式创建的 <code>Loading</code> 默认为全屏的且该全屏 <code>Loading</code> 是单例的。 若在前一个全屏 <code>Loading</code> 关闭前再次调用全屏 <code>Loading</code>，并不会创建一个新的 <code>Loading</code> 实例，而是返回现有全屏 <code>Loading</code> 的实例，只要其中一个实例关闭，其它都关闭：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">loading2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,8)),l(s,null,{default:o(()=>[...d[5]||(d[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),d[17]||(d[17]=p('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h3><table tabindex="0"><thead><tr><th>字段</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>to</code></td><td>加载条的挂载位置；可传入一个 <code>DOM</code> 对象或字符串；若传入字符串，则会将其作为参数传入 <code>document.querySelector</code> 以获取到对应 <code>DOM</code> 节点</td><td><code>string</code> | <code>HTMLElement</code></td><td><code>body</code></td></tr><tr><td><code>text</code></td><td>显示在加载图标下方的加载文案; 通过传递空字符串可以用于不显示文本</td><td><code>string</code></td><td><code>加载中……</code></td></tr><tr><td><code>background</code></td><td>遮罩层背景色</td><td><code>string</code></td><td><code>rgba(0, 0, 0, .6)</code></td></tr><tr><td><code>fullscreen</code></td><td>是否显示全屏加载动画</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>lock</code></td><td>是否禁止滚动</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>shape</code></td><td>形状, circle - 圆形, bar - 进度条样式, border - 边框动画</td><td><code>string</code></td><td><code>circle</code></td></tr><tr><td><code>color</code></td><td>颜色</td><td><code>string</code></td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>mask</code></td><td>是否显示阴影, 0 - 不显示, 1 - 显示, 2 - 自动[circle-显示,bar-不显示]</td><td><code>number</code></td><td><code>2</code></td></tr><tr><td><code>zindex</code></td><td>z-index 层级</td><td><code>string</code></td><td><code>10</code></td></tr></tbody></table><h3 id="节点属性" tabindex="-1">节点属性 <a class="header-anchor" href="#节点属性" aria-label="Permalink to &quot;节点属性&quot;">​</a></h3><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>l-loading-text</code></td><td>显示在加载图标下方的加载文案; 当值为 <code>false</code> 时则不显示文本</td><td><code>加载中……</code></td></tr><tr><td><code>l-loading-background</code></td><td>遮罩层背景色</td><td><code>rgba(0, 0, 0, .6)</code></td></tr><tr><td><code>l-loading-fullscreen</code></td><td>是否显示全屏加载动画</td><td><code>-</code></td></tr><tr><td><code>l-loading-lock</code></td><td>是否禁止滚动, 当值为 <code>false</code> 或 <code>0</code> 时则允许滚动</td><td><code>true</code></td></tr><tr><td><code>l-loading-shape</code></td><td>形状</td><td><code>circle</code></td></tr><tr><td><code>l-loading-color</code></td><td>颜色</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>l-loading-mask</code></td><td>是否显示阴影, 0 - 不显示, 1 - 显示, 2 - 自动[circle-显示,bar-不显示]</td><td><code>2</code></td></tr><tr><td><code>l-loading-zindex</code></td><td>z-index 层级</td><td><code>10</code></td></tr></tbody></table>',5))])}}});export{A as __pageData,T as default};
