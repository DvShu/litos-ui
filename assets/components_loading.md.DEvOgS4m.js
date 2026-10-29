import{L as e}from"./chunks/index.CUe7CM8d.js";import{a as m,$ as E,o as y}from"./chunks/browser.CpyXlELn.js";import{v as L,P as x,x as v,C as f,o as F,c as C,a2 as r,E as s,w as l,j as a,a as n}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1793253144000}'),B={name:"components/loading.md"},S=Object.assign(B,{setup(T){const p=[];let h=!1;function o(t,i){const d=E(t);d&&(y(d,"click",i),p.push([d,i]))}function c(){e.init("loading3"),setTimeout(()=>{e.close("loading3")},3e3)}function g(){const t=e.create();setTimeout(()=>{t.hide()},3e3)}function k(){const t=e.create({to:"#startLoading1Parent",fullscreen:!1});setTimeout(()=>{t.updateLoadingText("重新加载中……")},3e3),setTimeout(()=>{t.hide()},6e3)}function u(t){const i=t.target.getAttribute("data-loading");e.init(i)}function b(t){const i=t.target.getAttribute("data-loading");e.close(i)}return L(()=>{x(()=>{h||(e.init("loading1"),e.init("loading2"),e.init("loading5"),o('[l-loading="loading3"]',c),o("#startLoading",g),o("#startBarLoading",u),o("#endBarLoading",b),o("#startLoading1",k))})}),v(()=>{h=!0;for(const[t,i]of p)m(t,"click",i);p.length=0}),(t,i)=>{const d=f("ClientOnly");return F(),C("div",null,[i[7]||(i[7]=r(`<h1 id="loading-加载" tabindex="-1">Loading 加载 <a class="header-anchor" href="#loading-加载" aria-label="Permalink to &quot;Loading 加载&quot;">​</a></h1><p>数据加载时显示的动效。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><p>如果没有配合 <code>litosui-unplugin-resolver</code> 自动引用，则需要手动引入样式文件</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Loading </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/loading.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="区域加载" tabindex="-1">区域加载 <a class="header-anchor" href="#区域加载" aria-label="Permalink to &quot;区域加载&quot;">​</a></h3><p>在某一个区域加载数据时展示加载动画，防止页面失去响应，提高用户体验</p><p>给节点添加一个 <code>l-loading</code> 属性，然后调用 <code>LLoading.init()</code> 初始化, 调用 <code>LLoading.close()</code> 关闭。</p>`,9)),s(d,null,{default:l(()=>[...i[0]||(i[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),i[8]||(i[8]=r('<h3 id="自定义内容" tabindex="-1">自定义内容 <a class="header-anchor" href="#自定义内容" aria-label="Permalink to &quot;自定义内容&quot;">​</a></h3><p>你可以自定义加载中组件的文字，背景颜色。</p><p>在绑定了 <code>l-loading</code> 属性的元素上添加 <code>l-loading-text</code> 属性，其值会被渲染为加载文案，并显示在加载图标的下方；设置为 <code>false</code> 或 <code>0</code> 可隐藏文本；空字符串会恢复默认文案。<code>l-loading-background</code> 用来设定背景色值。</p>',3)),s(d,null,{default:l(()=>[...i[1]||(i[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
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
`)])],-1)])]),_:1}),i[9]||(i[9]=a("h3",{id:"全屏",tabindex:"-1"},[n("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),i[10]||(i[10]=a("p",null,[n("通过传递 "),a("code",null,"l-loading-fullscreen"),n(" 属性将遮罩插入至 "),a("code",null,"body"),n(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),n(" 可以允许滚动。")],-1)),s(d,null,{default:l(()=>[...i[2]||(i[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),i[11]||(i[11]=a("h3",{id:"进度条风格",tabindex:"-1"},[n("进度条风格 "),a("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),i[12]||(i[12]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="bar"'),n(" 参数可以将圆形加载变为进度条风格。")],-1)),s(d,null,{default:l(()=>[...i[3]||(i[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
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
`)])],-1)])]),_:1}),i[13]||(i[13]=a("h3",{id:"边框动画风格",tabindex:"-1"},[n("边框动画风格 "),a("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),i[14]||(i[14]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="border"'),n(" 参数可以变为边框加载动画。")],-1)),s(d,null,{default:l(()=>[...i[4]||(i[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
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
`)])],-1)])]),_:1}),i[15]||(i[15]=r(`<h3 id="编程式调用" tabindex="-1">编程式调用 <a class="header-anchor" href="#编程式调用" aria-label="Permalink to &quot;编程式调用&quot;">​</a></h3><blockquote><p>编程式调用需要显式导入 Loading API 和 loading.css。</p></blockquote><p>通过调用 <code>create()</code> 函数来显示加载动画，例如：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(options);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中 <code>options</code> 参数为 <code>Loading</code> 的配置项，具体见下表。该会返回一个 <code>Loading</code> 实例，可通过调用该实例的 <code>hide()</code> 方法来关闭它：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  loading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>需要注意的是，以编程方式创建的 <code>Loading</code> 默认为全屏的且该全屏 <code>Loading</code> 是单例的。 若在前一个全屏 <code>Loading</code> 关闭前再次调用全屏 <code>Loading</code>，不会创建新的全屏节点，而是创建共享同一全屏节点的新包装实例，只要其中一个实例关闭，其它都关闭：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LLoading.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">loading2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,8)),s(d,null,{default:l(()=>[...i[5]||(i[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),i[16]||(i[16]=a("p",null,[n("使用编程方式时，可以修改加载文案。调用 "),a("code",null,"loading1.updateLoadingText(str)")],-1)),s(d,null,{default:l(()=>[...i[6]||(i[6]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">开始</l-button>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">开始</l-button>
  </div>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading1');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create({ to: '#startLoading1Parent', fullscreen: false });
    setTimeout(() => {
      loading.updateLoadingText("重新加载中……");
    }, 3000);
    setTimeout(() => {
      loading.hide();
    }, 6000);
  });
`)])],-1)])]),_:1}),i[17]||(i[17]=r(`<h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/loading.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Loading </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/loading&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见<a href="/litos-ui/on_demand">按需导入</a>。</p><p>内置默认加载文案为中文。下表中的背景色和颜色为 CSS 回退值，JavaScript 默认未指定这两项。</p><p>当前实现限制：节点属性 <code>l-loading-mask</code> 按是否存在读取，传入任意值均启用遮罩；初始化器未读取 <code>l-loading-zindex</code>，需通过 CSS 设置 <code>--l-loading-zindex</code>。需要这些配置时可使用编程式 <code>mask</code> 和 <code>zindex</code> 选项。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h3><table tabindex="0"><thead><tr><th>字段</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>to</code></td><td>加载条的挂载位置；可传入一个 <code>DOM</code> 对象或字符串；若传入字符串，则会将其作为参数传入 <code>document.querySelector</code> 以获取到对应 <code>DOM</code> 节点</td><td><code>string</code> | <code>HTMLElement</code></td><td><code>body</code></td></tr><tr><td><code>text</code></td><td>显示在加载图标下方的加载文案; 通过传递空字符串可以用于不显示文本</td><td><code>string</code></td><td><code>加载中……</code></td></tr><tr><td><code>background</code></td><td>遮罩层背景色</td><td><code>string</code></td><td><code>rgba(0, 0, 0, .7)</code></td></tr><tr><td><code>fullscreen</code></td><td>是否显示全屏加载动画</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>lock</code></td><td>是否禁止滚动</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>shape</code></td><td>形状, circle - 圆形, bar - 进度条样式, border - 边框动画</td><td><code>string</code></td><td><code>circle</code></td></tr><tr><td><code>color</code></td><td>颜色</td><td><code>string</code></td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>mask</code></td><td>是否显示阴影, 0 - 不显示, 1 - 显示, 2 - 自动[circle-显示,bar-不显示]</td><td><code>number</code></td><td><code>2</code></td></tr><tr><td><code>zindex</code></td><td>遮罩层级；CSS 回退值为 10，全屏时为 50</td><td><code>number</code></td><td>未设置</td></tr></tbody></table><h3 id="节点属性" tabindex="-1">节点属性 <a class="header-anchor" href="#节点属性" aria-label="Permalink to &quot;节点属性&quot;">​</a></h3><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>l-loading-text</code></td><td>显示在加载图标下方的加载文案; 当值为 <code>false</code> 时则不显示文本</td><td><code>加载中……</code></td></tr><tr><td><code>l-loading-background</code></td><td>遮罩层背景色</td><td><code>rgba(0, 0, 0, .7)</code></td></tr><tr><td><code>l-loading-fullscreen</code></td><td>是否显示全屏加载动画</td><td><code>-</code></td></tr><tr><td><code>l-loading-lock</code></td><td>是否禁止滚动, 当值为 <code>false</code> 或 <code>0</code> 时则允许滚动</td><td><code>true</code></td></tr><tr><td><code>l-loading-shape</code></td><td>形状</td><td><code>circle</code></td></tr><tr><td><code>l-loading-color</code></td><td>颜色</td><td><code>var(--l-primary-color, #722ed1)</code></td></tr><tr><td><code>l-loading-mask</code></td><td>是否显示阴影, 0 - 不显示, 1 - 显示, 2 - 自动[circle-显示,bar-不显示]</td><td><code>2</code></td></tr><tr><td><code>l-loading-zindex</code></td><td>z-index 层级</td><td><code>10</code></td></tr></tbody></table>`,10))])}}});export{P as __pageData,S as default};
