import{_ as p,C as r,o as h,c as o,a2 as e,E as n,w as t,j as a,a as l}from"./chunks/framework.nU6eqUhJ.js";const y=JSON.parse('{"title":"Theme","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/theme.md","filePath":"en/components/theme.md","lastUpdated":1793253144000}'),d={name:"en/components/theme.md"};function c(k,s,m,u,E,b){const i=r("ClientOnly");return h(),o("div",null,[s[3]||(s[3]=e(`<h1 id="theme" tabindex="-1">Theme <a class="header-anchor" href="#theme" aria-label="Permalink to &quot;Theme&quot;">​</a></h1><p>Switch themes for more comfortable viewing during extended screen use.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/dark.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Theme,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ThemeColor,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  regist,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Button,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SelectOri,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Switch,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Radio,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RadioGroup,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ColorPicker,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  SunIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MoonIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ThemeDefaultIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Theme);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Theme color</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([ColorPicker, ThemeColor]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register the dependencies for the selected style.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Button, SunIcon, MoonIcon]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Button style</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(SelectOri); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Select style</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Switch, SunIcon, MoonIcon]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Switch style</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Radio group with icons [label=&quot;icon&quot;]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Radio, SunIcon, MoonIcon, ThemeDefaultIcon, RadioGroup]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Radio group with text labels</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Radio, RadioGroup]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><blockquote><ol><li>Theme switching is handled by the theme utilities in <a href="https://www.npmjs.com/package/utilane" target="_blank" rel="noreferrer">utilane</a>.</li><li>Call <code>initTheme()</code> when your application starts to restore the selected mode after a reload.</li></ol></blockquote><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-lo-Kw" id="tab-l27i37i" checked><label data-title="main.ts" for="tab-l27i37i">main.ts</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initTheme } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;utilane/browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initTheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div></div><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Choose a theme switcher style with <code>type</code>: button, select, radio group, or switch.</p><p>The component&#39;s built-in select and text-radio labels currently remain in Chinese. This page translates the documentation; component localization is separate.</p>`,10)),n(i,null,{default:t(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme style="vertical-align:middle;"></l-theme>
  <l-theme type="select" style="vertical-align:middle;"></l-theme>
  <l-theme type="switch" style="vertical-align:middle;"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;" label="icon"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;"></l-theme>
`)],-1)])]),_:1}),s[4]||(s[4]=e(`<blockquote><p>Call <code>initTheme()</code> at application startup to restore the last selected theme mode.</p></blockquote><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initTheme } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;utilane/browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// await initTheme();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initTheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="custom-styles" tabindex="-1">Custom Styles <a class="header-anchor" href="#custom-styles" aria-label="Permalink to &quot;Custom Styles&quot;">​</a></h3><p>The built-in theme switchers provide different layouts around the theme functions in <code>utilane</code>.</p><p>The commonly used functions are <code>getTheme()</code> and <code>applyTheme()</code>.</p><p>The built-in switching effect is a fade transition.</p><p>You can create your own layout or animation. The example below uses <code>Radio</code> with text labels. Its circular animation requires the View Transitions API.</p>`,7)),n(i,null,{default:t(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-custom-theme>Theme</l-custom-theme>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-radio-group gap="15" id="customThemeRadio">
    <l-radio value="auto">System</l-radio>
    <l-radio value="light">Light</l-radio>
    <l-radio value="dark">Dark</l-radio>
  </l-radio-group>
`),a("textarea",{lang:"js"},`  import { applyTheme } from "utilane/browser";
  //-
  const $radio = document.querySelector('#customThemeRadio');
  //-
  $radio.addEventListener('change', (e) => {
    const newTheme = e.target.value;
    const transition = document.startViewTransition(() => {
      // Apply the theme.
      applyTheme(newTheme, true, false).then();
    });
    //-
    transition.ready.then(() => {
      /*
        For a circular reveal centered on the pointer in a click handler:
        // Get the pointer coordinates.
        const { clientX, clientY } = e;
        a: (clientX, clientY)
                              b: (innerWidth, innerHeight)
        The distance from a to b is the maximum radius.
        //-
        // Calculate the maximum radius.
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
      */
      //-
      // Start the circular reveal.
      document.documentElement.animate(
        /*
          // Expand from the pointer position.
          clipPath: [
             \`circle(0% at \${clientX}px \${clientY}px)\`,
             \`circle(\${radius}px at \${clientX}px \${clientY}px)\`,
          ]
        */
        {
          clipPath: [\`circle(0% at center)\`, \`circle(100% at center)\`],
        },
        // Set the duration and target pseudo-element.
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
`),a("textarea",{lang:"css"},`  ::view-transition-new(root),
  ::view-transition-old(root) {
    /* Disable the default animation. */
    animation: none;
  }
`)])],-1)])]),_:1}),s[5]||(s[5]=a("h3",{id:"changing-the-theme-color",tabindex:"-1"},[l("Changing the Theme Color "),a("a",{class:"header-anchor",href:"#changing-the-theme-color","aria-label":'Permalink to "Changing the Theme Color"'},"​")],-1)),s[6]||(s[6]=a("p",null,[l("In addition to switching modes, you can change the primary theme color with "),a("code",null,"ThemeColor"),l(".")],-1)),n(i,null,{default:t(()=>[...s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme-color></l-theme-color>
`)],-1)])]),_:1}),s[7]||(s[7]=e(`<p>The generated theme color variables look like this:</p><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:root</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#722ed1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#9254de</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#b37feb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#d3adf7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#efdbff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-light5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#f9f0ff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  --l-primary-color-dark1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#531dab</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote><p>As with the theme mode, call <code>initColorTheme()</code> at application startup to restore the selected theme color.</p></blockquote><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// main.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { initColorTheme } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;utilane/browser&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> initColorTheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/theme&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="theme-attributes" tabindex="-1">Theme Attributes <a class="header-anchor" href="#theme-attributes" aria-label="Permalink to &quot;Theme Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>type</code></td><td>Theme switcher style</td><td><code>button</code> | <code>select</code> | <code>switch</code> | <code>radio</code></td><td><code>button</code></td></tr><tr><td><code>label</code></td><td>Whether radio mode uses text or icons</td><td><code>text</code> | <code>icon</code></td><td><code>text</code></td></tr></tbody></table><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback</th></tr></thead><tbody><tr><td><code>change</code></td><td>Fires when the theme changes; read the value from e.detail</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table>`,12))])}const v=p(d,[["render",c]]);export{y as __pageData,v as default};
