import{_ as p,c as h,a2 as n,G as e,w as t,j as a,a as l,B as r,o as d}from"./chunks/framework.Dxibp1RX.js";const y=JSON.parse('{"title":"Theme 主题切换","description":"","frontmatter":{},"headers":[],"relativePath":"components/theme.md","filePath":"components/theme.md","lastUpdated":1735010203000}'),k={name:"components/theme.md"};function o(c,s,E,m,u,b){const i=r("ClientOnly");return d(),h("div",null,[s[3]||(s[3]=n(`<h1 id="theme-主题切换" tabindex="-1">Theme 主题切换 <a class="header-anchor" href="#theme-主题切换" aria-label="Permalink to &quot;Theme 主题切换&quot;">​</a></h1><p>通过切换主题来减轻长时间使用屏幕带来的视觉疲劳</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Theme,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ThemeColor,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  regist,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Button,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SelectOri,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Switch,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Radio,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SunIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MoonIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ThemeDefaultIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Theme);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 颜色主题</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ThemeColor);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 根据风格注册以下组件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Button, SunIcon, MoonIcon]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 按钮风格</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(SelectOri); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 下拉风格</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Switch, SunIcon, MoonIcon]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 开关风格</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 图标单选风格[label=&quot;icon&quot;]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Radio, SunIcon, MoonIcon, ThemeDefaultIcon]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文本单选风格</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Radio);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><blockquote><ol><li>主题切换是通过 <a href="https://www.npmjs.com/package/ph-utils" target="_blank" rel="noreferrer">ph-utils</a> 工具库的 <code>theme</code> 工具类控制</li><li>为了每次切换主题后，重新加载能够生效，需要在应用开始的时候, 执行 <code>initTheme()</code> 方法</li></ol></blockquote><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-w3Kld" id="tab-kzrCp5F" checked><label data-title="main.ts" for="tab-kzrCp5F">main.ts</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initTheme } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ph-utils/theme&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initTheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div></div><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>提供多种风格的主题切换按钮: 按钮、下拉选择、单选按钮组、开关; 通过 <code>type</code> 指定。</p>`,9)),e(i,null,{default:t(()=>s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme></l-theme>
  <l-theme type="select"></l-theme>
  <l-theme type="switch" style="vertical-align:middle;"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;"></l-theme>
`)],-1)])),_:1}),s[4]||(s[4]=n(`<blockquote><p>切换主题后，如果要让应用启动的时候也应用上一次切换的主题, 需要在应用开始的地方调用 <code>initTheme()</code> 函数</p></blockquote><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initTheme } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ph-utils/theme&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// await initTheme();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initTheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="自定义风格" tabindex="-1">自定义风格 <a class="header-anchor" href="#自定义风格" aria-label="Permalink to &quot;自定义风格&quot;">​</a></h3><p>框架内置的主题切换其实就是一个排版的样式，核心的主题切换的逻辑是调用的 <code>ph-utils</code> 库的 <code>theme</code> 模块相关函数来实现的。</p><p>通常调用的模块有: <code>getTheme()</code>、<code>applyTheme()</code></p><p>内置的切换的动画效果为渐变动画。</p><p>如果想要实现自定义的排版或者自定义的动画完全可以通过自定义来实现，下面通过 <code>Radio</code> + 简单文字实现</p>`,7)),e(i,null,{default:t(()=>s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-custom-theme>按钮</l-custom-theme>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-radio id="customThemeRadio">
    <span radio-value="auto">自</span>+
    <span radio-value="light">浅</span>
    <span radio-value="dark">深</span>
  </l-radio>
`),a("textarea",{lang:"js"},`  import { applyTheme } from "ph-utils/theme";
  //-
  const $radio = document.querySelector('#customThemeRadio');
  //-
  $radio.addEventListener('change', (e) => {
    const newTheme = (e.target as any).value;
    const transition = document.startViewTransition(() => {
      // 应用主题
      applyTheme(newTheme, true, false).then();
    });
    //-
    transition.ready.then(() => {
      /*
        如果在 click 事件中想根据鼠标位置来设置圆形扩散效果
        // 获取鼠标的坐标
        const { clientX, clientY } = e;
        a: (clientX, clientY)        
                              b: (innerWidth, innerHeight)
        a -> b 的距离就是最大半径
        //-
        // 计算最大半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
      */
      //-
      // 圆形动画扩散开始
      document.documentElement.animate(
        /*
          // 应用鼠标位置扩展
          clipPath: [
             \`circle(0% at \${clientX}px \${clientY}px)\`,
             \`circle(\${radius}px at \${clientX}px \${clientY}px)\`,
          ]
        */
        {
          clipPath: [\`circle(0% at center)\`, \`circle(100% at center)\`],
        },
        // 设置时间，已经目标伪元素
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
`),a("textarea",{lang:"css"},`  ::view-transition-new(root),
  ::view-transition-old(root) {
    /* 关闭默认动画 */
    animation: none;
  }
`)])],-1)])),_:1}),s[5]||(s[5]=a("h3",{id:"主题色更改",tabindex:"-1"},[l("主题色更改 "),a("a",{class:"header-anchor",href:"#主题色更改","aria-label":'Permalink to "主题色更改"'},"​")],-1)),s[6]||(s[6]=a("p",null,[l("除了修改主题风格，还可以修改主题色，通过修改 "),a("code",null,"ThemeColor"),l(" 来实现。")],-1)),e(i,null,{default:t(()=>s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme-color></l-theme-color>
`)],-1)])),_:1}),s[7]||(s[7]=n(`<p>生成的主题色代码如下:</p><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:root</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#722ed1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#9254de</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#b37feb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#d3adf7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#efdbff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#f9f0ff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-dark1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#531dab</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote><p>跟主题模式一样，如果想要再下次启动时也应用选择的主题色，需要在应用启动时，调用 <code>initColorTheme()</code> 函数</p></blockquote><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initColorTheme } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ph-utils/theme&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initColorTheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="theme-attibutes" tabindex="-1">Theme Attibutes <a class="header-anchor" href="#theme-attibutes" aria-label="Permalink to &quot;Theme Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>type</code></td><td>主题切换按钮风格</td><td><code>button</code> | <code>select</code> | &quot;<code>switch</code> | <code>radio</code></td><td><code>button</code></td></tr><tr><td><code>label</code></td><td>当 <code>type=&quot;radio&quot;</code> 时是使用文字还是图标</td><td><code>text</code> | <code>icon</code></td><td><code>text</code></td></tr></tbody></table><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>主题改变时触发, 可以通过 <code>e.detail</code> 获取值</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table>`,9))])}const F=p(k,[["render",o]]);export{y as __pageData,F as default};
