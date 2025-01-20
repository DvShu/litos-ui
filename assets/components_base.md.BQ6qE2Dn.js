import{_ as e,c as l,a2 as i,G as t,w as p,B as h,o as r,j as a}from"./chunks/framework.CmfdOiHF.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"components/base.md","filePath":"components/base.md","lastUpdated":1735291662000}'),d={name:"components/base.md"};function o(k,s,c,b,E,u){const n=h("ClientOnly");return r(),l("div",null,[s[1]||(s[1]=i('<h3 id="base-基础组件" tabindex="-1">Base 基础组件 <a class="header-anchor" href="#base-基础组件" aria-label="Permalink to &quot;Base 基础组件&quot;">​</a></h3><p>框架的所有组件都是基于这个组件进行扩展的，所以这个组件是框架的基础组件，也是框架的核心组件。基础组件标记了组件是否渲染完成(生命周期函数 <code>connectedCallback</code> 是否已经调用函数)。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { BaseComponent } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>只需要继承这个类，然后实现 <code>render</code> 函数即可。</p>',7)),t(n,null,{default:p(()=>s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-hello-world></l-hello-world>
`),a("div",{class:"source"},[a("textarea",{lang:"js"},`  import { BaseComponent, regist } from 'litos-ui';
  //-
  class HelloWorld extends BaseComponent {
    public render() {
      return "<span>Hello World</span>";
    }
  }
  //-
  regist(HelloWorld, 'app-hello-world');
`),a("textarea",{lang:"html"},`  <app-hello-world></app-hello-world>
`)])],-1)])),_:1}),s[2]||(s[2]=i(`<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h3><ol><li><code>root</code></li></ol><p>如果是 <code>Shadow</code> 模式则为 <code>ShadowRoot</code> 否则为 <code>HTMLElement</code> 代表当前组件节点。</p><ol start="2"><li><code>rendered</code></li></ol><p>组件是否渲染完成，是否已经渲染到了 <code>DOM</code> 节点上。(是否调用 \`\`connectedCallback\` 函数)</p><h3 id="可实现函数" tabindex="-1">可实现函数 <a class="header-anchor" href="#可实现函数" aria-label="Permalink to &quot;可实现函数&quot;">​</a></h3><ol><li><code>constructor(shadow = true)</code></li></ol><p>构造函数可以传入一个参数 <code>shadow</code>，默认为 <code>true</code>，表示是否使用 <code>shadow</code> 模式渲染组件，如果为 <code>false</code> 则使用普通模式渲染组件。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 不是有 Shadow 模式， 使用普通模式渲染</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="2"><li><code>connectedCallback()</code></li></ol><p>当组件被插入到 DOM 中时，会触发 <code>connectedCallback</code> 函数，此时组件已经渲染完成，可以访问 DOM 节点。可以在这里加载样式、初始化属性、事件处理等。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initAttr } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;litos-ui&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">connectedCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 将 html 节点上的属性绑定到js上，这样就可以通过 this.x 来访问了</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 例如: &lt;x-a text=&quot;d&quot;&gt;&lt;/x-a&gt; ，在 x-a 组件内，调用 initAttr(this) 后，就可以通过 this.text 访问属性了。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 注意如果节点上是 a-text ，则 js 上就是 aText</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  initAttr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 加载样式文本</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createStyle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;:host:{color:red;}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 引用样式文件url</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createLink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/static/css/a.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">connectedCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 一定要调用该函数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 初始化事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote><ol><li>一定要调用 <code>super.connectedCallback()</code> 函数，否则渲染状态不准确</li><li>事件处理一定要在 <code>super.connectedCallback()</code> 之后</li></ol></blockquote><ol start="3"><li><code>disconnectedCallback()</code></li></ol><p>当组件从 DOM 中移除时，会触发 <code>disconnectedCallback</code> 函数，此时组件已经从 DOM 中移除，可以做一些清理工作。例如取消事件监听、取消定时器等。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">disconnectedCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">disconnectedCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 取消事件监听</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="4"><li><code>render(): void | string | HTMLElement | HTMLElement[]</code></li></ol><p>渲染函数，返回一个字符串、一个 HTML 元素、一个 HTML 元素数组或者 <code>undefined</code>。如果返回 <code>undefined</code>，则需要自己手动渲染节点内容。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 返回节点字符串，自动渲染到 DOM 节点上</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`&lt;span&gt;hello world&lt;/span&gt;\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 也可以不返回任何内容手动调用 this.root.innerHTML = &#39;&lt;span&gt;hello world&lt;/span&gt;&#39; 来渲染</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,20))])}const y=e(d,[["render",o]]);export{m as __pageData,y as default};
