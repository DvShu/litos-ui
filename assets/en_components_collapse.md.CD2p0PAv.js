import{_ as i,C as r,o as s,c as p,a2 as o,E as n,w as d,j as e,a as t}from"./chunks/framework.nU6eqUhJ.js";const k=JSON.parse('{"title":"Collapse","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/collapse.md","filePath":"en/components/collapse.md","lastUpdated":1793253144000}'),h={name:"en/components/collapse.md"};function c(u,l,m,g,b,x){const a=r("ClientOnly");return s(),p("div",null,[l[9]||(l[9]=o(`<h1 id="collapse" tabindex="-1">Collapse <a class="header-anchor" href="#collapse" aria-label="Permalink to &quot;Collapse&quot;">​</a></h1><p>Expand or collapse sections of content, such as panels in a dashboard sidebar.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Collapse, CollapseItem, ArrowRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Collapse, CollapseItem, ArrowRightIcon]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Multiple panels can be expanded independently.</p>`,7)),n(a,null,{default:d(()=>[...l[0]||(l[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse>
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
`)],-1)])]),_:1}),l[10]||(l[10]=e("h3",{id:"controlled-expansion",tabindex:"-1"},[t("Controlled Expansion "),e("a",{class:"header-anchor",href:"#controlled-expansion","aria-label":'Permalink to "Controlled Expansion"'},"​")],-1)),l[11]||(l[11]=e("p",null,[t("Set "),e("code",null,"prop"),t(" on "),e("code",null,"l-collapse"),t(" to the expanded panel names, separated by "),e("code",null,"&"),t(".")],-1)),n(a,null,{default:d(()=>[...l[1]||(l[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse prop="1&3">
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
`)],-1)])]),_:1}),l[12]||(l[12]=e("blockquote",null,[e("p",null,[t("You can also add "),e("code",null,"expand"),t(" to an "),e("code",null,"l-collapse-item"),t(" to expand it.")])],-1)),l[13]||(l[13]=e("h3",{id:"accordion",tabindex:"-1"},[t("Accordion "),e("a",{class:"header-anchor",href:"#accordion","aria-label":'Permalink to "Accordion"'},"​")],-1)),l[14]||(l[14]=e("p",null,[t("Enable "),e("code",null,"accordion"),t(" to allow only one panel to be expanded at a time.")],-1)),n(a,null,{default:d(()=>[...l[2]||(l[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse accordion>
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
`)],-1)])]),_:1}),l[15]||(l[15]=e("h3",{id:"arrow-placement",tabindex:"-1"},[t("Arrow Placement "),e("a",{class:"header-anchor",href:"#arrow-placement","aria-label":'Permalink to "Arrow Placement"'},"​")],-1)),l[16]||(l[16]=e("p",null,[t("Set "),e("code",null,"arrow-placement"),t(" to "),e("code",null,"left"),t(" (default) or "),e("code",null,"right"),t(".")],-1)),n(a,null,{default:d(()=>[...l[3]||(l[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
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
`)],-1)])]),_:1}),l[17]||(l[17]=e("h3",{id:"header-alignment",tabindex:"-1"},[t("Header Alignment "),e("a",{class:"header-anchor",href:"#header-alignment","aria-label":'Permalink to "Header Alignment"'},"​")],-1)),l[18]||(l[18]=e("p",null,[t("Use "),e("code",null,"header-justify"),t(" to align header content. Combine "),e("code",null,"space-between"),t(" with "),e("code",null,'arrow-placement="right"'),t(" to place the text and arrow at opposite ends.")],-1)),n(a,null,{default:d(()=>[...l[4]||(l[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
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
`)],-1)])]),_:1}),l[19]||(l[19]=e("h3",{id:"background-and-border",tabindex:"-1"},[t("Background and Border "),e("a",{class:"header-anchor",href:"#background-and-border","aria-label":'Permalink to "Background and Border"'},"​")],-1)),l[20]||(l[20]=e("p",null,[t("Enable "),e("code",null,"background"),t(" to show the panel background and border.")],-1)),n(a,null,{default:d(()=>[...l[5]||(l[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
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
`)],-1)])]),_:1}),l[21]||(l[21]=e("h3",{id:"panel-spacing",tabindex:"-1"},[t("Panel Spacing "),e("a",{class:"header-anchor",href:"#panel-spacing","aria-label":'Permalink to "Panel Spacing"'},"​")],-1)),l[22]||(l[22]=e("p",null,[t("Set "),e("code",null,"gap"),t(" to control the space between panels.")],-1)),n(a,null,{default:d(()=>[...l[6]||(l[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
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
`)],-1)])]),_:1}),l[23]||(l[23]=e("h3",{id:"border-radius",tabindex:"-1"},[t("Border Radius "),e("a",{class:"header-anchor",href:"#border-radius","aria-label":'Permalink to "Border Radius"'},"​")],-1)),l[24]||(l[24]=e("p",null,[t("Set "),e("code",null,"border-radius"),t(" to round the panel corners.")],-1)),n(a,null,{default:d(()=>[...l[7]||(l[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
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
`)],-1)])]),_:1}),l[25]||(l[25]=e("h3",{id:"grid-layout",tabindex:"-1"},[t("Grid Layout "),e("a",{class:"header-anchor",href:"#grid-layout","aria-label":'Permalink to "Grid Layout"'},"​")],-1)),l[26]||(l[26]=e("p",null,[t("Enable "),e("code",null,"grid"),t(" to arrange panels in a grid.")],-1)),n(a,null,{default:d(()=>[...l[8]||(l[8]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse
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
`)],-1)])]),_:1}),l[27]||(l[27]=o(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/collapse&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="collapse-attributes" tabindex="-1">Collapse Attributes <a class="header-anchor" href="#collapse-attributes" aria-label="Permalink to &quot;Collapse Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>prop</code></td><td>Expanded panel names, separated by &amp; when multiple panels are expanded</td><td><code>string</code></td><td>-</td></tr><tr><td><code>grid</code></td><td>Grid layout</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>gap</code></td><td>Panel spacing</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>border-radius</code></td><td>Border radius</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>background</code></td><td>Background and border</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>arrow-placement</code></td><td>Arrow position</td><td><code>string</code></td><td><code>left</code></td></tr><tr><td><code>header-justify</code></td><td>Header alignment: flex-start, flex-end, or space-between</td><td><code>string</code></td><td><code>flex-start</code></td></tr><tr><td><code>accordion</code></td><td>Accordion mode</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapseitem-attributes" tabindex="-1">CollapseItem Attributes <a class="header-anchor" href="#collapseitem-attributes" aria-label="Permalink to &quot;CollapseItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>prop</code></td><td>Panel name</td><td><code>string</code></td><td>-</td></tr><tr><td><code>header-text</code></td><td>Header text</td><td><code>string</code></td><td>-</td></tr><tr><td><code>expand</code></td><td>Whether the panel is expanded</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="collapse-events" tabindex="-1">Collapse Events <a class="header-anchor" href="#collapse-events" aria-label="Permalink to &quot;Collapse Events&quot;">​</a></h3>`,9)),l[28]||(l[28]=e("table",{tabindex:"0"},[e("thead",null,[e("tr",null,[e("th",null,"Event"),e("th",null,"Description"),e("th",null,"Callback parameter")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("code",null,"change")]),e("td",{"expands:":"","string[],":"","value:":"",string:""},"Fires when panels change; detail:"),e("td",null,[e("code",null,"(event: CustomEvent)")])])])],-1)),l[29]||(l[29]=o('<h3 id="collapse-css-variables" tabindex="-1">Collapse CSS Variables <a class="header-anchor" href="#collapse-css-variables" aria-label="Permalink to &quot;Collapse CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>',2))])}const f=i(h,[["render",c]]);export{k as __pageData,f as default};
