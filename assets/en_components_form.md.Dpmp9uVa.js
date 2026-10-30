import{$ as n,o as d,a as m}from"./chunks/browser.7zTvUqO3.js";import{v as C,P as S,x,C as _,o as I,c as A,a2 as f,E as l,w as s,j as t,a}from"./chunks/framework.nU6eqUhJ.js";const B=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/form.md","filePath":"en/components/form.md","lastUpdated":1793335100000}'),$={name:"en/components/form.md"},R=Object.assign($,{setup(T){let p,h,c,i,b,g="en",u={};const k={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password must be at least 6 characters",password_invalid:"Password must contain letters and numbers"}};function y(r){const e=r.target.value;n("#positionForm").setAttribute("label-position",e)}function v(r){const e=r.target;console.log(e.getData())}function w(){n("#customValidForm").setErrors({name:"Name is required",password:"Password is required",confimPassword:"Confirm password is required"})}function E(r){const e=r.target;u={},console.log(e.getData())}function q(){const r={};for(const e in u){const o=u[e];o&&(o in k[g]?r[e]=k[g][o]:r[e]=o)}i.setErrors(r)}function F(r){const e=r.detail,o=e.errors;e.all===!0&&(u=o),q()}function P(r){g=r.detail.value,Object.keys(u).length&&q()}return C(()=>{S(()=>{p=n("#lform"),d(p,"submit",v),h=n("#customSubmit"),d(h,"click",w),i=n("#i18nForm"),b=n("#langCheck"),i.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:r=>r.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),d(i,"validate-error",F),d(i,"submit",E),d(b,"change",P),c=n("#positionRadio"),d(c,"change",y)})}),x(()=>{p&&m(p,"submit",v),h&&m(h,"click",w),i&&(m(i,"validate-error",F),m(i,"submit",E)),b&&m(b,"change",P),c&&m(c,"change",y)}),(r,e)=>{const o=_("ClientOnly");return I(),A("div",null,[e[7]||(e[7]=f(`<h1 id="form" tabindex="-1">Form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;Form&quot;">​</a></h1><p>A form with field management, data entry, validation, reset behavior, and layout styles.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Form, FormItem, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([FormItem, Form]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Space, Button, Input, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Space, Button, Input]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>A basic form with layout, initialization, validation, reset, and submission. Validation uses <a href="https://github.com/DvShu/utilane#readme" target="_blank" rel="noreferrer">utilane/validator</a></p>`,8)),l(o,null,{default:s(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
    <l-form-item required label="Name" prop="name">
      <l-input placeholder="Enter your name" value=""></l-input>
    </l-form-item>
    <l-form-item required label="Password" prop="password">
      <l-input placeholder="Enter your password" type="password" value=""></l-input>
    </l-form-item>
    <l-form-item required label="Confirm password" verify="same:password" prop="confimPassword">
      <l-input placeholder="Enter your password again" type="password" value=""></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-space>
        <l-button html-type="reset">Reset</l-button>
        <l-button html-type="submit" type="primary">Submit</l-button>
      </l-space>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[8]||(e[8]=f('<blockquote><ol><li>Use the Space component to add spacing between buttons.</li><li>Inside Form, a Button with <code>html-type=&quot;reset&quot;</code> or <code>html-type=&quot;submit&quot;</code> triggers form reset or submission.</li></ol></blockquote><h3 id="custom-validation" tabindex="-1">Custom Validation <a class="header-anchor" href="#custom-validation" aria-label="Permalink to &quot;Custom Validation&quot;">​</a></h3><p>For custom validation, set <code>novalidate=&quot;on&quot;</code> to disable validation on submission, then call <code>setErrors(errors: Record&lt;string, any&gt;)</code> to supply error messages.</p>',3)),l(o,null,{default:s(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
    <l-form-item required label="Name" prop="name">
      <l-input placeholder="Enter your name"></l-input>
    </l-form-item>
    <l-form-item required label="Password" prop="password">
      <l-input placeholder="Enter your password" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="Confirm password" prop="confimPassword">
      <l-input placeholder="Enter your password again" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button type="primary" id="customSubmit">Submit</l-button>
    </l-form-item>
  </l-form>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
    <l-form-item required label="Name" prop="name">
      <l-input placeholder="Enter your name"></l-input>
    </l-form-item>
    <l-form-item required label="Password" prop="password">
      <l-input placeholder="Enter your password" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="Confirm password" prop="confimPassword">
      <l-input placeholder="Enter your password again" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button id="customSubmit" type="primary">Submit</l-button>
    </l-form-item>
  </l-form>
`),t("textarea",{lang:"ts"},`  import { $one } from 'utilane/browser';
  //-
  // Custom validation
  const $customValidForm = $one('#customValidForm');
  const $customSubmitBtn = $one('#customSubmit');
  $customSubmitBtn.addEventListener('click', (event) => {
    $customValidForm.setErrors({
      name: 'Name is required',
      password: 'Password is required',
      confimPassword: 'Confirm password is required',
    });
  });
`)])],-1)])]),_:1}),e[9]||(e[9]=f(`<blockquote><p>Omit valid fields, or pass undefined or null for them. For standalone FormItem usage, set its <code>error</code> attribute to display a message. There is no <code>setError()</code> method on FormItem.</p></blockquote><h3 id="localized-validation" tabindex="-1">Localized Validation <a class="header-anchor" href="#localized-validation" aria-label="Permalink to &quot;Localized Validation&quot;">​</a></h3><p>The example defaults to English and retains Chinese messages under the <code>zh</code> key to demonstrate language switching. This translates validation messages supplied by the page; it does not change built-in component messages.</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Radio, RadioGroup, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Radio, RadioGroup]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Configure custom validation rules with <code>setSchemas()</code> to provide localized messages. Enable <code>emit-error</code> to receive validation failures through <code>validate-error</code>, translate the error identifiers, then pass the messages to <code>setErrors()</code>.</p>`,5)),l(o,null,{default:s(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
    <l-radio-group value="en" id="langCheck">
      <l-radio label="Chinese" value="zh" button></l-radio>
      <l-radio label="En" value="en" button></l-radio>
    </l-radio-group>
    <hr/>
    <l-form id="i18nForm" emit-error>
      <l-form-item required label="Mobile number" prop="mobile">
        <l-input placeholder="Enter your mobile number"></l-input>
      </l-form-item>
      <l-form-item required label="Password" prop="password">
        <l-input placeholder="Enter your password" type="password"></l-input>
      </l-form-item>
      <l-form-item label="">
        <l-button type="primary" html-type="submit">Submit</l-button>
      </l-form-item>
    </l-form>
  </div>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <div>
    <l-radio-group value="en" id="langCheck">
      <l-radio label="Chinese" value="zh" button></l-radio>
      <l-radio label="En" value="en" button></l-radio>
    </l-radio-group>
    <hr/>
    <l-form id="i18nForm" emit-error>
      <l-form-item required label="Mobile number" prop="mobile">
        <l-input placeholder="Enter your mobile number"></l-input>
      </l-form-item>
      <l-form-item required label="Password" prop="password">
        <l-input placeholder="Enter your password" type="password"></l-input>
      </l-form-item>
      <l-form-item label="">
        <l-button type="primary" html-type="submit">Submit</l-button>
      </l-form-item>
    </l-form>
  </div>
`),t("textarea",{lang:"ts"},`  import { $one, on } from 'utilane/browser';
  //-
  let $i18nForm, $langCheck;
  let lang = 'en';
  let errors = {};
  const i18n = {
    zh: {
      mobile_required: '手机号不能为空',
      mobile_invalid: '请输入正确的手机号码',
      password_required: '密码不能为空',
      password_min6: '密码至少为6位',
      password_invalid: '密码必须包含字母和数字'
    },
    en: {
      mobile_required: 'Mobile is required',
      mobile_invalid: 'Please enter a valid mobile number',
      password_required: 'Password is required',
      password_min6: 'Password must be at least 6 characters',
      password_invalid: 'Password must contain letters and numbers'
    }
  }
  //-
  function handleI18nSubmit(event) {
    const $target = event.target;
    errors = {};
    console.log($target.getData());
  }
  //-
  function setI18nErrors() {
    const showErrors = {};
    for (const key in errors) {
      const errorMessage = errors[key];
      if (errorMessage) {
        if (errorMessage in i18n[lang]) {
          showErrors[key] = i18n[lang][errorMessage];
        } else {
          showErrors[key] = errorMessage;
        }
      }
    }
    $i18nForm.setErrors(showErrors);
  }
  //-
  function handleI18nError(event) {
    const detail = event.detail;
    const errs = detail.errors;
    if (detail.all === true) {
      errors = errs;
    }
    setI18nErrors(errs);
  }
  //-
  function handleLangChange(e) {
    lang = e.detail.value;
    if (Object.keys(errors).length) {
      setI18nErrors(errors);
    }
  }
  $i18nForm = $one('#i18nForm');
  $langCheck = $one("#langCheck");
  $i18nForm.setSchemas([{
    key: 'mobile',
    rules: [
      { rule: 'required', message: 'mobile_required' },
      { rule: 'mobile', message: 'mobile_invalid' },
  ]}, {
    key: 'password',
    rules: [
      { rule: 'required', message: 'password_required' },
      { rule: (v) => v.length >= 6, message: 'password_min6' },
      { rule: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/, message: 'password_invalid' }
    ]
  }]);
  on($i18nForm, 'validate-error', handleI18nError);
  on($i18nForm, 'submit', handleI18nSubmit);
  on($langCheck, 'change', handleLangChange);
`)])],-1)])]),_:1}),e[10]||(e[10]=t("blockquote",null,[t("p",null,"Each schema key must match a FormItem prop. Use unique message identifiers in the rules so they can be mapped to localized error messages.")],-1)),e[11]||(e[11]=t("h3",{id:"innerblock",tabindex:"-1"},[t("code",null,"InnerBlock"),a(),t("a",{class:"header-anchor",href:"#innerblock","aria-label":'Permalink to "`InnerBlock`"'},"​")],-1)),e[12]||(e[12]=t("p",null,[a("Enable "),t("code",null,"inner-block"),a(" to let form controls fill the remaining width.")],-1)),l(o,null,{default:s(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inner-block>
    <l-form-item required label="Name" prop="name">
      <l-input placeholder="Enter your name" value="Zhang San"></l-input>
    </l-form-item>
    <l-form-item required label="Password" prop="password">
      <l-input placeholder="Enter your password" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="Confirm password" verify="same:password" prop="confimPassword">
      <l-input placeholder="Enter your password again" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button html-type="reset">Reset</l-button>
      <l-button html-type="submit" type="primary">Submit</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[13]||(e[13]=t("h3",{id:"inline-form",tabindex:"-1"},[a("Inline Form "),t("a",{class:"header-anchor",href:"#inline-form","aria-label":'Permalink to "Inline Form"'},"​")],-1)),e[14]||(e[14]=t("p",null,"Place a simple form on a single row.",-1)),e[15]||(e[15]=t("p",null,[a("Enable "),t("code",null,"inline"),a(" to arrange form fields inline.")],-1)),l(o,null,{default:s(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inline inner-block label-width="auto">
    <l-form-item label="Username">
      <l-input placeholder="Enter your username" value="Zhang San"></l-input>
    </l-form-item>
    <l-form-item label="Password">
      <l-input placeholder="Enter your password" type="password"></l-input>
    </l-form-item>
    <l-form-item label="Username">
      <l-input placeholder="Enter your username" value="Zhang San"></l-input>
    </l-form-item>
    <l-form-item label="Password">
      <l-input placeholder="Enter your password" type="password"></l-input>
    </l-form-item>
    <l-form-item>
      <l-button type="primary">Submit</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[16]||(e[16]=t("h3",{id:"label-alignment",tabindex:"-1"},[a("Label Alignment "),t("a",{class:"header-anchor",href:"#label-alignment","aria-label":'Permalink to "Label Alignment"'},"​")],-1)),e[17]||(e[17]=t("p",null,[a("Set "),t("code",null,"label-position"),a(" to control label alignment relative to the content.")],-1)),e[18]||(e[18]=t("p",null,[a("Set "),t("code",null,"label-position"),a(" on individual form items to override the form setting. When it is empty, the form’s label position is used.")],-1)),l(o,null,{default:s(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
    <l-form-item label="LabelPosition">
      <l-radio-group value="right" id="positionRadio">
        <l-radio label="Left" value="left" button></l-radio>
        <l-radio label="Right" value="right" button></l-radio>
        <l-radio label="Top" value="top" button></l-radio>
      </l-radio-group>
    </l-form-item>
    <l-form-item label="Username">
      <l-input placeholder="Enter your username" value="Zhang San"></l-input>
    </l-form-item>
    <l-form-item label="Password">
      <l-input placeholder="Enter your password" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button type="primary">Submit</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[19]||(e[19]=t("h3",{id:"standalone-formitem",tabindex:"-1"},[a("Standalone FormItem "),t("a",{class:"header-anchor",href:"#standalone-formitem","aria-label":'Permalink to "Standalone FormItem"'},"​")],-1)),e[20]||(e[20]=t("p",null,"FormItem can be used on its own, outside Form.",-1)),l(o,null,{default:s(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form-item id="form1" label="Name">
    <l-input placeholder="Enter text"></l-input>
  </l-form-item>
`)],-1)])]),_:1}),e[21]||(e[21]=f(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/form&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="form-attributes" tabindex="-1">Form Attributes <a class="header-anchor" href="#form-attributes" aria-label="Permalink to &quot;Form Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>inline</code></td><td>Inline form; arrange as many items as possible on each row</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>label-position</code></td><td>Label position</td><td><code>left</code>, <code>right</code>, <code>top</code></td><td><code>right</code></td></tr><tr><td><code>label-width</code></td><td>Field label width; accepts auto</td><td><code>string</code></td><td><code>80px</code></td></tr><tr><td><code>inner-block</code></td><td>Whether controls fill the remaining width</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>novalidate</code></td><td>Whether to disable validation on submission</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><p>Form and FormItem do not provide a shared disabled attribute. Configure disabled on each input control.</p><h3 id="form-slots" tabindex="-1">Form Slots <a class="header-anchor" href="#form-slots" aria-label="Permalink to &quot;Form Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Form item</td></tr></tbody></table><h3 id="form-events" tabindex="-1">Form Events <a class="header-anchor" href="#form-events" aria-label="Permalink to &quot;Form Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>submit</code></td><td>Fires on submission; detail contains the form data</td><td><code>(e: CustomEvent): void</code></td></tr><tr><td><code>validate-error</code></td><td>Reports validation errors when emit-error is enabled; detail contains errors and all</td><td><code>(e: CustomEvent): void</code></td></tr></tbody></table><h3 id="form-methods" tabindex="-1">Form Methods <a class="header-anchor" href="#form-methods" aria-label="Permalink to &quot;Form Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>validate</code></td><td>Validates all data and returns a Promise with the result</td><td><code>() =&gt; Promise&lt;{ result: boolean; errors: Record&lt;string, any&gt; }&gt;</code></td></tr><tr><td><code>validateField</code></td><td>Does not currently apply field validation rules; use validate for full validation</td><td><code>(field: string | string[]) =&gt; Promise&lt;void&gt;</code></td></tr><tr><td><code>clearValidate</code></td><td>Clears validation results from form items</td><td><code>() =&gt; void</code></td></tr><tr><td><code>setErrors(errors: Record&lt;string, string&gt;)</code></td><td>Sets form error messages</td><td>-</td></tr></tbody></table><h3 id="formitem-attributes" tabindex="-1">FormItem Attributes <a class="header-anchor" href="#formitem-attributes" aria-label="Permalink to &quot;FormItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>label</code></td><td>Label text</td><td><code>string</code></td><td>-</td></tr><tr><td><code>verify</code></td><td>Built-in rules: required, same:password (password confirmation), and mobile (phone number)</td><td><code>string</code></td><td>-</td></tr><tr><td><code>pattern</code></td><td>Regular expression</td><td><code>string</code></td><td>-</td></tr><tr><td><code>validity</code></td><td>Message displayed on validation failure</td><td><code>string</code></td><td>-</td></tr><tr><td><code>prop</code></td><td>Field key used to identify the form value</td><td><code>string</code></td><td>-</td></tr><tr><td><code>label-position</code></td><td>Label position</td><td><code>left</code>, <code>right</code>, <code>top</code></td><td><code>right</code></td></tr><tr><td><code>required</code></td><td>Whether the field is required</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>Whether controls fill the remaining width</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>error</code></td><td>Error message</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="formitem-slots" tabindex="-1">FormItem Slots <a class="header-anchor" href="#formitem-slots" aria-label="Permalink to &quot;FormItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Form item</td></tr></tbody></table><h3 id="formitem-events" tabindex="-1">FormItem Events <a class="header-anchor" href="#formitem-events" aria-label="Permalink to &quot;FormItem Events&quot;">​</a></h3><p>FormItem does not emit custom focus or blur events. Listen for the corresponding native events on the input control.</p><h3 id="form-css-variables" tabindex="-1">Form CSS Variables <a class="header-anchor" href="#form-css-variables" aria-label="Permalink to &quot;Form CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>`,21))])}}});export{B as __pageData,R as default};
