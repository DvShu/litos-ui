import{$ as b,o as u,a as k}from"./chunks/browser.7zTvUqO3.js";import{v as p,P as x,x as m,C as g,o as v,c as C,a2 as s,E as d,w as c,j as t,a as o}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Checkbox","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/checkbox.md","filePath":"en/components/checkbox.md","lastUpdated":1793335100000}'),f={name:"en/components/checkbox.md"},A=Object.assign(f,{setup(y){let a,n;function h(i){const e=i.detail.value.length;e===4?(a.removeAttribute("indeterminate"),a.checked=!0):e===0?(a.removeAttribute("indeterminate"),a.checked=!1):(a.setAttribute("indeterminate",""),a.checked=!1)}function r(i){const e=i.detail.checked;a.removeAttribute("indeterminate"),e?n.value="CD&BJ&SZ&HZ":n.value=""}return p(()=>{x(()=>{n=b("#group"),a=b("#check-all"),u(n,"change",h),u(a,"change",r)})}),m(()=>{n&&k(n,"change",h),a&&k(a,"change",r)}),(i,e)=>{const l=g("ClientOnly");return v(),C("div",null,[e[5]||(e[5]=s(`<h1 id="checkbox" tabindex="-1">Checkbox <a class="header-anchor" href="#checkbox" aria-label="Permalink to &quot;Checkbox&quot;">​</a></h1><p>Select multiple options from a group, or use a standalone checkbox to ask users to acknowledge a choice.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Checkbox, regist, CheckboxGroup } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Checkbox, CheckboxGroup]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>For a standalone checkbox, use the boolean <code>checked</code> state to control selection. Supply custom label content through the default slot.</p>`,7)),d(l,null,{default:c(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox checked>
    <span>
      <span>I agree to the</span>
      <a href='#'>Privacy policy</a>
    </span>
  </l-checkbox>
`)],-1)])]),_:1}),e[6]||(e[6]=t("h3",{id:"disabled-state",tabindex:"-1"},[o("Disabled State "),t("a",{class:"header-anchor",href:"#disabled-state","aria-label":'Permalink to "Disabled State"'},"​")],-1)),e[7]||(e[7]=t("p",null,[o("Set "),t("code",null,"disabled"),o(" to disable a checkbox.")],-1)),d(l,null,{default:c(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox disabled checked>Disabled</l-checkbox>
`)],-1)])]),_:1}),e[8]||(e[8]=t("h3",{id:"checkbox-group",tabindex:"-1"},[o("Checkbox Group "),t("a",{class:"header-anchor",href:"#checkbox-group","aria-label":'Permalink to "Checkbox Group"'},"​")],-1)),e[9]||(e[9]=t("p",null,[o("Place checkboxes inside "),t("code",null,"l-checkbox-group"),o(" for multiple selection.")],-1)),d(l,null,{default:c(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">Chengdu</l-checkbox>
    <l-checkbox value="BJ">Beijing</l-checkbox>
    <l-checkbox value="SZ">Shenzhen</l-checkbox>
    <l-checkbox value="SH">Shanghai</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[10]||(e[10]=s('<blockquote><p>Encode each selected value with <code>encodeURIComponent</code>, then join the values with <code>&amp;</code> for <code>l-checkbox-group</code>.</p></blockquote><h3 id="button-style" tabindex="-1">Button Style <a class="header-anchor" href="#button-style" aria-label="Permalink to &quot;Button Style&quot;">​</a></h3><p>Add <code>button</code> to <code>l-checkbox</code> for button styling.</p>',3)),d(l,null,{default:c(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[11]||(e[11]=t("h3",{id:"indeterminate-state",tabindex:"-1"},[o("Indeterminate State "),t("a",{class:"header-anchor",href:"#indeterminate-state","aria-label":'Permalink to "Indeterminate State"'},"​")],-1)),e[12]||(e[12]=t("p",null,[o("Set "),t("code",null,"indeterminate"),o(" to show a partially selected state.")],-1)),d(l,null,{default:c(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
`),t("textarea",{lang:"ts"},`  import { $one, on, off } from 'utilane/browser';
  //-
  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // Select all
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // Clear all
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // Partially selected
    }
  }
  //-
  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // Select all
    } else {
      $group.value = ''; // Clear all
    }
  }
  //-
  const $group = $one('#group');
  const $allCheck = $one('#check-all');
  //-
  on($group, 'change', handleGroupChange);
  on($allCheck, 'change', handleAllCheckChange);
  // Remove listeners when the page unmounts.
  // off($group, 'change', handleGroupChange);
  // off($allCheck, 'change', handleAllCheckChange);
`)])],-1)])]),_:1}),e[13]||(e[13]=s(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/checkbox&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/checkbox-group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="checkbox-attributes" tabindex="-1">Checkbox Attributes <a class="header-anchor" href="#checkbox-attributes" aria-label="Permalink to &quot;Checkbox Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>value</code></td><td>value</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>checked</code></td><td>Whether the option is checked</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>Whether the control is disabled</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>button</code></td><td>Whether to use button styling</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>indeterminate</code></td><td>Whether to display the indeterminate state</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>name</code></td><td>Native attribute</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>label</code></td><td>Displayed label</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="checkboxgroup-attributes" tabindex="-1">CheckboxGroup Attributes <a class="header-anchor" href="#checkboxgroup-attributes" aria-label="Permalink to &quot;CheckboxGroup Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>value</code></td><td>Selected values, each encoded with encodeURIComponent and joined with &amp;</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="checkbox-slots" tabindex="-1">Checkbox Slots <a class="header-anchor" href="#checkbox-slots" aria-label="Permalink to &quot;Checkbox Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Label</td></tr></tbody></table><h3 id="checkbox-events" tabindex="-1">Checkbox Events <a class="header-anchor" href="#checkbox-events" aria-label="Permalink to &quot;Checkbox Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>change</code></td><td>Fires when selection changes; e.detail contains value, name, and checked</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="checkboxgroup-events" tabindex="-1">CheckboxGroup Events <a class="header-anchor" href="#checkboxgroup-events" aria-label="Permalink to &quot;CheckboxGroup Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>change</code></td><td>Fires when the group selection changes; e.detail.value is the list of selected values</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="checkbox-css-variables" tabindex="-1">Checkbox CSS Variables <a class="header-anchor" href="#checkbox-css-variables" aria-label="Permalink to &quot;Checkbox CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-check-size</code></td><td>Checkbox size</td><td><code>14px</code></td></tr><tr><td><code>--l-check-border-radius</code></td><td>Checkbox border radius</td><td><code>3px</code></td></tr><tr><td><code>--l-primary-color</code></td><td>Checked-state color</td><td><code>#007bff</code> (with vars.css)</td></tr><tr><td><code>--l-disabled-color</code></td><td>Disabled-state color</td><td><code>#e6e6e6</code></td></tr><tr><td><code>--l-form-control-height</code></td><td>Button-style height</td><td><code>40px</code> (with vars.css; component fallback without it: 32px)</td></tr><tr><td><code>--l-check-gap</code></td><td>Checkbox group spacing</td><td><code>0px</code></td></tr></tbody></table>`,16))])}}});export{q as __pageData,A as default};
