import{_ as i,C as r,o as s,c as p,a2 as n,E as d,w as o,j as e,a as l}from"./chunks/framework.DBq8O7k4.js";const k=JSON.parse('{"title":"Collapse","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/collapse.md","filePath":"en/components/collapse.md","lastUpdated":1795187990000}'),c={name:"en/components/collapse.md"};function h(u,t,m,g,b,x){const a=r("ClientOnly");return s(),p("div",null,[t[10]||(t[10]=n(`<h1 id="collapse" tabindex="-1">Collapse <a class="header-anchor" href="#collapse" aria-label="Permalink to &quot;Collapse&quot;">​</a></h1><p>Expand or collapse sections of content, such as panels in a dashboard sidebar.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Collapse, CollapseItem, ArrowRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Collapse, CollapseItem, ArrowRightIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Multiple panels can be expanded independently. Press Tab to focus a header, then Enter or Space to toggle it.</p><p>When a panel collapses, focus inside it returns to the header. With reduced motion enabled, the panel and arrow update immediately.</p>`,8)),d(a,null,{default:o(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse>
    <l-collapse-item prop="1" header-text="Red light" expand>
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"controlled-expansion",tabindex:"-1"},[l("Controlled Expansion "),e("a",{class:"header-anchor",href:"#controlled-expansion","aria-label":'Permalink to "Controlled Expansion"'},"​")],-1)),t[12]||(t[12]=e("p",null,[l("Set "),e("code",null,"prop"),l(" on "),e("code",null,"l-collapse"),l(" to the expanded panel names, separated by "),e("code",null,"&"),l(".")],-1)),d(a,null,{default:o(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse prop="1&3">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[13]||(t[13]=e("blockquote",null,[e("p",null,[l("You can also add "),e("code",null,"expand"),l(" to an "),e("code",null,"l-collapse-item"),l(" to expand it.")])],-1)),t[14]||(t[14]=e("h3",{id:"accordion",tabindex:"-1"},[l("Accordion "),e("a",{class:"header-anchor",href:"#accordion","aria-label":'Permalink to "Accordion"'},"​")],-1)),t[15]||(t[15]=e("p",null,[l("Enable "),e("code",null,"accordion"),l(" to allow only one panel to be expanded at a time.")],-1)),d(a,null,{default:o(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse accordion>
    <l-collapse-item prop="1" header-text="Red light" expand>
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[16]||(t[16]=e("h3",{id:"arrow-placement",tabindex:"-1"},[l("Arrow Placement "),e("a",{class:"header-anchor",href:"#arrow-placement","aria-label":'Permalink to "Arrow Placement"'},"​")],-1)),t[17]||(t[17]=e("p",null,[l("Set "),e("code",null,"arrow-placement"),l(" to "),e("code",null,"left"),l(" (default) or "),e("code",null,"right"),l(".")],-1)),d(a,null,{default:o(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[18]||(t[18]=e("h3",{id:"header-alignment",tabindex:"-1"},[l("Header Alignment "),e("a",{class:"header-anchor",href:"#header-alignment","aria-label":'Permalink to "Header Alignment"'},"​")],-1)),t[19]||(t[19]=e("p",null,[l("Use "),e("code",null,"header-justify"),l(" to align the header content. "),e("code",null,"flex-start"),l(" and "),e("code",null,"flex-end"),l(" align it to the start and end of the row, respectively, while "),e("code",null,"space-between"),l(" places the text and arrow at opposite ends.")],-1)),d(a,null,{default:o(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[20]||(t[20]=e("h3",{id:"background-and-border",tabindex:"-1"},[l("Background and Border "),e("a",{class:"header-anchor",href:"#background-and-border","aria-label":'Permalink to "Background and Border"'},"​")],-1)),t[21]||(t[21]=e("p",null,[l("Enable "),e("code",null,"background"),l(" to show the panel background and border.")],-1)),d(a,null,{default:o(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[22]||(t[22]=e("h3",{id:"panel-spacing",tabindex:"-1"},[l("Panel Spacing "),e("a",{class:"header-anchor",href:"#panel-spacing","aria-label":'Permalink to "Panel Spacing"'},"​")],-1)),t[23]||(t[23]=e("p",null,[l("Set "),e("code",null,"gap"),l(" to control the space between panels.")],-1)),d(a,null,{default:o(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[24]||(t[24]=e("h3",{id:"border-radius",tabindex:"-1"},[l("Border Radius "),e("a",{class:"header-anchor",href:"#border-radius","aria-label":'Permalink to "Border Radius"'},"​")],-1)),t[25]||(t[25]=e("p",null,[l("Set "),e("code",null,"border-radius"),l(" to round the panel corners.")],-1)),d(a,null,{default:o(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[26]||(t[26]=e("h3",{id:"grid-layout",tabindex:"-1"},[l("Grid Layout "),e("a",{class:"header-anchor",href:"#grid-layout","aria-label":'Permalink to "Grid Layout"'},"​")],-1)),t[27]||(t[27]=e("p",null,[l("Enable "),e("code",null,"grid"),l(" to arrange panels in a grid.")],-1)),d(a,null,{default:o(()=>[...t[8]||(t[8]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse
    arrow-placement="right"
    header-justify="space-between"
    background
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[28]||(t[28]=e("h3",{id:"wrappers-and-standalone-panels",tabindex:"-1"},[l("Wrappers and Standalone Panels "),e("a",{class:"header-anchor",href:"#wrappers-and-standalone-panels","aria-label":'Permalink to "Wrappers and Standalone Panels"'},"​")],-1)),t[29]||(t[29]=e("p",null,[l("Place "),e("code",null,"l-collapse-item"),l(" directly inside "),e("code",null,"l-collapse"),l(", inside a regular wrapper element, or on its own. In "),e("code",null,"grid"),l(" mode, each direct child occupies one grid cell, so panels inside a wrapper share a cell.")],-1)),d(a,null,{default:o(()=>[...t[9]||(t[9]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse grid gap="8" prop="delivery">
    <div>
      <l-collapse-item prop="delivery" header-text="Delivery Options">
        <div>Courier delivery is available.</div>
      </l-collapse-item>
      <l-collapse-item prop="pickup" header-text="Store Pickup">
        <div>Pick up your order once it is ready.</div>
      </l-collapse-item>
    </div>
    <l-collapse-item prop="returns" header-text="Returns and Exchanges">
      <div>Request a return or exchange from the order details.</div>
    </l-collapse-item>
  </l-collapse>
  <l-collapse-item header-text="Opening Hours">
    <div>Monday to Sunday, 09:00–18:00.</div>
  </l-collapse-item>
`)],-1)])]),_:1}),t[30]||(t[30]=n(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/collapse&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>For standalone panels, load <code>litos-ui/collapse-item</code>.</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/collapse-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="collapse-attributes" tabindex="-1">Collapse Attributes <a class="header-anchor" href="#collapse-attributes" aria-label="Permalink to &quot;Collapse Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>prop</code></td><td>Expanded panel names separated by <code>&amp;</code>. Accordion mode uses the first name.</td><td><code>string</code></td><td>-</td></tr><tr><td><code>grid</code></td><td>Grid layout</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>gap</code></td><td>Panel spacing</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>border-radius</code></td><td>Border radius</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>background</code></td><td>Background and border</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>arrow-placement</code></td><td>Arrow position</td><td><code>string</code></td><td><code>left</code></td></tr><tr><td><code>header-justify</code></td><td>Header alignment: flex-start, flex-end, or space-between</td><td><code>string</code></td><td><code>flex-start</code></td></tr><tr><td><code>accordion</code></td><td>Accordion mode</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapseitem-attributes" tabindex="-1">CollapseItem Attributes <a class="header-anchor" href="#collapseitem-attributes" aria-label="Permalink to &quot;CollapseItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>prop</code></td><td>Panel name</td><td><code>string</code></td><td>-</td></tr><tr><td><code>header-text</code></td><td>Header text. When empty or removed, the <code>header-text</code> slot is shown.</td><td><code>string</code></td><td>-</td></tr><tr><td><code>heading-level</code></td><td>Heading level in the document outline, from <code>1</code> to <code>6</code></td><td><code>string</code></td><td><code>3</code></td></tr><tr><td><code>toggle-label</code></td><td>Accessible name of the toggle. Set it explicitly when the header contains only an icon or an action button.</td><td><code>string</code></td><td>Header text or <code>Toggle panel</code></td></tr><tr><td><code>expand</code></td><td>Whether the panel is expanded</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapseitem-slots" tabindex="-1">CollapseItem Slots <a class="header-anchor" href="#collapseitem-slots" aria-label="Permalink to &quot;CollapseItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>Default slot</td><td>Panel content</td></tr><tr><td><code>header-text</code></td><td>Custom header content. Links and buttons in the slot can be focused and used independently.</td></tr></tbody></table><h3 id="collapseitem-css-parts" tabindex="-1">CollapseItem CSS Parts <a class="header-anchor" href="#collapseitem-css-parts" aria-label="Permalink to &quot;CollapseItem CSS Parts&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>header</code></td><td>Header container</td></tr><tr><td><code>header-text</code></td><td>Header text rendered from the <code>header-text</code> attribute</td></tr></tbody></table><h3 id="collapse-events" tabindex="-1">Collapse Events <a class="header-anchor" href="#collapse-events" aria-label="Permalink to &quot;Collapse Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>change</code></td><td>Fires after a grouped panel is toggled via its header. <code>event.detail</code> is <code>{ expands: string[], value: string }</code>.</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="collapseitem-events" tabindex="-1">CollapseItem Events <a class="header-anchor" href="#collapseitem-events" aria-label="Permalink to &quot;CollapseItem Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>expand-change</code></td><td>Fires after this panel is toggled via its header. <code>event.detail</code> is <code>{ prop: string, expand: boolean }</code>.</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><p>Initialization, changes to the <code>prop</code> or <code>expand</code> attributes, and other panels closing during an accordion toggle update state silently.</p><h3 id="collapseitem-manual-context-injection" tabindex="-1">CollapseItem Manual Context Injection <a class="header-anchor" href="#collapseitem-manual-context-injection" aria-label="Permalink to &quot;CollapseItem Manual Context Injection&quot;">​</a></h3><p>Before mounting, pass two callable values to <code>contextInject(context, expands)</code> to set the initial layout and expansion state. When the values change, call <code>_updateLayout()</code> to refresh the layout or <code>_handleExpandsChange()</code> to refresh the expansion state.</p><h3 id="collapse-css-variables" tabindex="-1">Collapse CSS Variables <a class="header-anchor" href="#collapse-css-variables" aria-label="Permalink to &quot;Collapse CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-collapse-gap</code></td><td>Overrides panel spacing on <code>l-collapse</code></td><td><code>gap</code> attribute or <code>0px</code></td></tr><tr><td><code>--l-collapse-border-radius</code></td><td>Overrides panel corner radius on <code>l-collapse</code></td><td><code>border-radius</code> attribute or <code>0px</code></td></tr><tr><td><code>--l-collapse-border-color</code></td><td>Overrides panel border color on <code>l-collapse</code></td><td><code>--l-border-color</code> or <code>#dedede</code></td></tr></tbody></table>`,23))])}const y=i(c,[["render",h]]);export{k as __pageData,y as default};
