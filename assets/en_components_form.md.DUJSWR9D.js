import{$ as r,o as s,a as c}from"./chunks/browser.CplAf69P.js";import{v as T,x as I,C as A,o as R,c as D,a2 as m,E as a,w as i,j as t,a as n,P as V}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const O=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/form.md","filePath":"en/components/form.md","lastUpdated":1795187990000}'),N={name:"en/components/form.md"},U=Object.assign(N,{setup($){let h,p,b,f,l,g,v,y="en",u={};const w={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password must be at least 6 characters",password_invalid:"Password must contain letters and numbers"}};function k(o){const e=o.target.value;r("#positionForm").setAttribute("label-position",e)}function q(o){const e=o.target;console.log(e.getData())}function F(o){o.preventDefault();const e=o.currentTarget;e.querySelector("output").value=`Submitted ${new FormData(e).get("username")}`}function E(o){r("#autocompleteForm").autocomplete=o.currentTarget.value}function S(){r("#customValidForm").setErrors({name:"Name is required",password:"Password is required",confimPassword:"Confirm password is required"})}function x(o){const e=o.target;u={},console.log(e.getData())}function P(){const o={};for(const e in u){const d=u[e];d&&(d in w[y]?o[e]=w[y][d]:o[e]=d)}l.setErrors(o)}function _(o){const{errors:e,all:d}=o.detail;u=d===!0?e:{...u,...e},P()}function C(o){y=o.detail.value,Object.keys(u).length&&P()}return T(()=>{V(()=>{h=r("#lform"),s(h,"submit",q),p=r("#nativeButtonForm"),s(p,"submit",F),v=r("#formAutocompleteMode"),s(v,"change",E),b=r("#customSubmit"),s(b,"click",S),l=r("#i18nForm"),g=r("#langCheck"),l.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:o=>o.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),s(l,"validate-error",_),s(l,"submit",x),s(g,"change",C),f=r("#positionRadio"),s(f,"change",k)})}),I(()=>{h&&c(h,"submit",q),p&&c(p,"submit",F),v&&c(v,"change",E),b&&c(b,"click",S),l&&(c(l,"validate-error",_),c(l,"submit",x)),g&&c(g,"change",C),f&&c(f,"change",k)}),(o,e)=>{const d=A("ClientOnly");return R(),D("div",null,[e[9]||(e[9]=m(`<h1 id="form" tabindex="-1">Form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;Form&quot;">​</a></h1><p>A form with field management, data entry, validation, reset behavior, and layout styles.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Button, Form, FormItem, Input, Space, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([FormItem, Form, Input, Button, Space]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>A basic form with layout, default values, validation, reset, and submission. Validation uses <a href="https://github.com/DvShu/utilane#readme" target="_blank" rel="noreferrer">utilane/validator</a>.</p><p>Editing a field validates it and any fields that depend on it. Submission validates the entire form. A failed business rule sets the field&#39;s <code>validity.customError</code> to <code>true</code>.</p>`,8)),a(d,null,{default:i(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
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
`)],-1)])]),_:1}),e[10]||(e[10]=m('<blockquote><ol><li>Use the Space component to add spacing between buttons.</li><li>Inside Form, a Button with <code>html-type=&quot;reset&quot;</code> or <code>html-type=&quot;submit&quot;</code> triggers form reset or submission.</li></ol></blockquote><p>Use the <code>value</code> attribute or <code>defaultValue</code> property to set the value restored on reset. For composite fields such as arrays, use the control&#39;s <code>defaultValue</code>. Once the current value has changed, updating the default preserves the current edit until the next reset. The first assignment to the <code>value</code> property only sets the current value.</p><p>Press Enter in a single-line <code>l-input</code> to activate the form&#39;s first submit button.</p><h3 id="native-forms" tabindex="-1">Native Forms <a class="header-anchor" href="#native-forms" aria-label="Permalink to &quot;Native Forms&quot;">​</a></h3><p><code>l-button</code> can submit or reset a native <code>&lt;form&gt;</code>. Pressing Enter in a single-line <code>l-input</code> can also activate its submit button.</p><p>Standalone <code>l-form</code> skips browser constraint validation on submit and runs its business validation. When it sits inside a native <code>&lt;form&gt;</code>, the browser checks constraints according to that form&#39;s <code>novalidate</code> attribute and the submit button&#39;s <code>formnovalidate</code> attribute. The <code>l-form</code> that starts submission runs its own business rules. The browser handles submissions from the outer form&#39;s own buttons.</p>',6)),a(d,null,{default:i(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <form id="nativeButtonForm">
    <l-input name="username" placeholder="Username" aria-label="Username" required></l-input>
    <l-button html-type="submit" type="primary">Submit</l-button>
    <l-button html-type="reset">Reset</l-button>
    <output aria-live="polite"></output>
  </form>
`)],-1)])]),_:1}),e[11]||(e[11]=m('<h3 id="form-wide-autofill" tabindex="-1">Form-wide Autofill <a class="header-anchor" href="#form-wide-autofill" aria-label="Permalink to &quot;Form-wide Autofill&quot;">​</a></h3><p>Form&#39;s <code>autocomplete</code> supplies a default for supported controls and native <code>input</code>, <code>textarea</code>, and <code>select</code> elements within the form. Change the default below to see the fields inherit it while the email field keeps its own <code>email</code> hint.</p><p>Register <code>SelectOri</code> and <code>MdInput</code> alongside the basic form components to use this example.</p>',3)),a(d,null,{default:i(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select-ori id="formAutocompleteMode" value="on" aria-label="Default autofill setting">
    <option value="on">Allow autofill</option>
    <option value="off">Turn off autofill hints</option>
  </l-select-ori>
  <l-form id="autocompleteForm" autocomplete="on">
    <l-form-item label="Name">
      <l-input name="name" placeholder="Inherits the form setting"></l-input>
    </l-form-item>
    <l-form-item label="Phone">
      <l-md-input name="tel" html-type="tel" label="Inherits the form setting"></l-md-input>
    </l-form-item>
    <l-form-item label="Email">
      <l-input name="email" type="email" autocomplete="email" placeholder="Uses its own email hint"></l-input>
    </l-form-item>
  </l-form>
`),t("textarea",{lang:"js"},`  const mode = document.querySelector('#formAutocompleteMode');
  mode.addEventListener('change', () => {
    document.querySelector('#autocompleteForm').autocomplete = mode.value;
  });
`)],-1)])]),_:1}),e[12]||(e[12]=m('<p>Remove a field&#39;s <code>autocomplete</code> attribute to restore inheritance. When Form leaves it unset, it uses the setting from the surrounding native form, if available. The browser controls whether to offer autofill. Password managers can still fill fields with <code>off</code>, and autofill applies only to controls that already support it.</p><h3 id="custom-validation" tabindex="-1">Custom Validation <a class="header-anchor" href="#custom-validation" aria-label="Permalink to &quot;Custom Validation&quot;">​</a></h3><p>Set <code>novalidate</code> to skip automatic business validation on input and submission. Use <code>setErrors()</code> to display your own errors.</p>',3)),a(d,null,{default:i(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
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
`)])],-1)])]),_:1}),e[13]||(e[13]=m(`<blockquote><p>Omit valid fields, or pass undefined or null for them. For standalone FormItem usage, set its <code>error</code> attribute to display a message. There is no <code>setError()</code> method on FormItem.</p></blockquote><h3 id="localized-validation" tabindex="-1">Localized Validation <a class="header-anchor" href="#localized-validation" aria-label="Permalink to &quot;Localized Validation&quot;">​</a></h3><p>The example defaults to English and retains Chinese messages under the <code>zh</code> key to demonstrate language switching. This translates validation messages supplied by the page; it does not change built-in component messages.</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Radio, RadioGroup, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Radio, RadioGroup]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Configure custom validation rules with <code>setSchemas()</code> to provide localized messages. Enable <code>emit-error</code> to receive validation failures through <code>validate-error</code>, translate the error identifiers, then pass the messages to <code>setErrors()</code>.</p>`,5)),a(d,null,{default:i(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
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
    const { errors: nextErrors, all } = event.detail;
    errors = all === true ? nextErrors : { ...errors, ...nextErrors };
    setI18nErrors();
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
`)])],-1)])]),_:1}),e[14]||(e[14]=m('<blockquote><p>Each schema key must match the field&#39;s <code>name</code>. If the control inherits its name from FormItem, use that item&#39;s <code>prop</code>. Use unique message identifiers in the rules so they can be mapped to localized error messages.</p></blockquote><h3 id="innerblock" tabindex="-1"><code>InnerBlock</code> <a class="header-anchor" href="#innerblock" aria-label="Permalink to &quot;`InnerBlock`&quot;">​</a></h3><p>Enable <code>inner-block</code> to let form controls fill the remaining width.</p>',3)),a(d,null,{default:i(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inner-block>
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
`)],-1)])]),_:1}),e[15]||(e[15]=t("h3",{id:"inline-form",tabindex:"-1"},[n("Inline Form "),t("a",{class:"header-anchor",href:"#inline-form","aria-label":'Permalink to "Inline Form"'},"​")],-1)),e[16]||(e[16]=t("p",null,"Place a simple form on a single row.",-1)),e[17]||(e[17]=t("p",null,[n("Enable "),t("code",null,"inline"),n(" to arrange form fields inline.")],-1)),a(d,null,{default:i(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inline inner-block label-width="auto">
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
`)],-1)])]),_:1}),e[18]||(e[18]=t("h3",{id:"label-alignment",tabindex:"-1"},[n("Label Alignment "),t("a",{class:"header-anchor",href:"#label-alignment","aria-label":'Permalink to "Label Alignment"'},"​")],-1)),e[19]||(e[19]=t("p",null,[n("Set "),t("code",null,"label-position"),n(" to control label alignment relative to the content.")],-1)),e[20]||(e[20]=t("p",null,[n("Set "),t("code",null,"label-position"),n(" on individual form items to override the form setting. When it is empty, the form’s label position is used.")],-1)),a(d,null,{default:i(()=>[...e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
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
`)],-1)])]),_:1}),e[21]||(e[21]=t("h3",{id:"standalone-formitem",tabindex:"-1"},[n("Standalone FormItem "),t("a",{class:"header-anchor",href:"#standalone-formitem","aria-label":'Permalink to "Standalone FormItem"'},"​")],-1)),e[22]||(e[22]=t("p",null,"FormItem can be used on its own, outside Form.",-1)),a(d,null,{default:i(()=>[...e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form-item id="form1" label="Name">
    <l-input placeholder="Enter text"></l-input>
  </l-form-item>
`)],-1)])]),_:1}),e[23]||(e[23]=m(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/form&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="form-attributes" tabindex="-1">Form Attributes <a class="header-anchor" href="#form-attributes" aria-label="Permalink to &quot;Form Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>inline</code></td><td>Inline form; arrange as many items as possible on each row</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>label-position</code></td><td>Label position</td><td><code>left</code>, <code>right</code>, <code>top</code></td><td><code>right</code></td></tr><tr><td><code>label-width</code></td><td>Field label width; accepts auto</td><td><code>string</code></td><td><code>80px</code></td></tr><tr><td><code>label-height</code></td><td>Field label height. Accepts a CSS length or a number in pixels</td><td><code>string</code></td><td>Follows <code>--l-form-control-height</code></td></tr><tr><td><code>inner-block</code></td><td>Whether controls fill the remaining width</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>Disables the form&#39;s controls</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>autocomplete</code></td><td>Default autofill hint for controls without their own setting. Can change at runtime</td><td><code>on</code>, <code>off</code></td><td>Not set. Uses the surrounding native form setting or the browser default</td></tr><tr><td><code>novalidate</code></td><td>Skips automatic business validation on input and submission</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>emit-error</code></td><td>Reports automatic validation results through <code>validate-error</code> so the caller can display errors</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><p>Set <code>disabled</code> on <code>l-form-item</code> to disable only the controls in that item.</p><h3 id="form-properties" tabindex="-1">Form Properties <a class="header-anchor" href="#form-properties" aria-label="Permalink to &quot;Form Properties&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>disabled</code></td><td>Reads or sets the form&#39;s disabled state and reflects it to the HTML attribute</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>autocomplete</code></td><td>Reads or sets the form&#39;s own attribute. Assign <code>&quot;&quot;</code> to remove it</td><td><code>&quot;on&quot; | &quot;off&quot; | &quot;&quot;</code></td><td><code>&quot;&quot;</code></td></tr><tr><td><code>nativeForm</code></td><td>Read-only. The associated native form, or <code>undefined</code> before mounting or after disconnecting</td><td><code>HTMLFormElement | undefined</code></td><td><code>undefined</code></td></tr><tr><td><code>validationErrors</code></td><td>Read-only snapshot of the errors currently displayed</td><td><code>Readonly&lt;Record&lt;string, string | undefined&gt;&gt;</code></td><td><code>{}</code></td></tr><tr><td><code>validator</code></td><td>Validator instance. Use the schema methods below to configure rules</td><td><code>Validator</code> from utilane</td><td>Created automatically</td></tr></tbody></table><h3 id="form-slots" tabindex="-1">Form Slots <a class="header-anchor" href="#form-slots" aria-label="Permalink to &quot;Form Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Form item</td></tr></tbody></table><h3 id="form-events" tabindex="-1">Form Events <a class="header-anchor" href="#form-events" aria-label="Permalink to &quot;Form Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>submit</code></td><td>Fires on submission. <code>event.detail</code> contains the form data</td><td><code>(e: CustomEvent): void</code></td></tr><tr><td><code>validate-error</code></td><td>Reports validation results when <code>emit-error</code> is enabled. Replace all errors if <code>event.detail.all</code> is <code>true</code>, or merge <code>event.detail.errors</code> for the specified fields when it is an array of names. An <code>undefined</code> entry indicates that the field passed validation</td><td><code>(e: CustomEvent): void</code></td></tr></tbody></table><h3 id="form-methods" tabindex="-1">Form Methods <a class="header-anchor" href="#form-methods" aria-label="Permalink to &quot;Form Methods&quot;">​</a></h3><p>Custom rule functions return a boolean synchronously. Returning a Promise causes the field to fail validation. Call <code>validateField()</code> to revalidate specific fields after setting a value in code.</p><p><code>getData()</code> reads the current values of associated fields synchronously. You can read them immediately after assigning a value or from an <code>input</code> or <code>change</code> handler. It includes disabled fields, keeps their original business values, and uses the last control in DOM order when several share a name. Each call returns a new top-level object and preserves references to field values.</p><p>Native checkboxes return booleans, radio buttons return the selected value, and multiple selects return string arrays. File inputs return <code>File</code>, <code>File[]</code>, or <code>null</code>. Other text inputs return strings. To associate a control outside a standalone <code>l-form</code>, set its <code>form</code> attribute to <code>lForm.nativeForm.id</code>. Both elements must be in the same DOM tree. When multiple <code>l-form</code> elements share a surrounding native form, each <code>getData()</code> call reads its own controls.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>validate</code></td><td>Validates all data and returns a Promise with the result</td><td><code>() =&gt; Promise&lt;{ result: boolean; errors: Record&lt;string, any&gt; }&gt;</code></td></tr><tr><td><code>getData</code></td><td>Returns a shallow snapshot of the current field values</td><td><code>() =&gt; Record&lt;string, any&gt;</code></td></tr><tr><td><code>validateField</code></td><td>Validates the specified fields. Resolves on success and rejects with field errors in <code>error.detail</code> on failure</td><td><code>(field: string | string[]) =&gt; Promise&lt;void&gt;</code></td></tr><tr><td><code>clearValidate</code></td><td>Clears displayed errors and interaction state while preserving field validity</td><td><code>() =&gt; void</code></td></tr><tr><td><code>reset</code></td><td>Triggers a reset on the associated native form. If the reset proceeds, defaults are restored and error messages are cleared. Other controls that share the form also reset</td><td><code>() =&gt; void</code></td></tr><tr><td><code>submit</code></td><td>Runs business validation and emits <code>submit</code> on success. With <code>novalidate</code>, it skips automatic business validation</td><td><code>() =&gt; void</code></td></tr><tr><td><code>setErrors</code></td><td>Replaces the displayed errors. Omit entries for valid fields or set them to <code>undefined</code> or <code>null</code>. Pass <code>{}</code> to clear all displayed errors</td><td><code>(errors: Record&lt;string, any&gt;) =&gt; void</code></td></tr><tr><td><code>setValidateErrors</code></td><td>With <code>emit-error</code>, emits <code>validate-error</code> with <code>errors</code> and <code>all</code>. Otherwise behaves like <code>setErrors()</code>. <code>all</code> defaults to <code>true</code></td><td><code>(errors: Record&lt;string, string | undefined&gt;, all?: string | string[] | boolean) =&gt; void</code></td></tr><tr><td><code>setSchemas</code></td><td>Replaces the entire set of validation rules</td><td><code>(schemas: SchemaType[]) =&gt; void</code></td></tr><tr><td><code>setSchema</code></td><td>Replaces the validation rules for the specified <code>key</code> and keeps other fields&#39; rules</td><td><code>(schema: SchemaType) =&gt; void</code></td></tr><tr><td><code>addSchemas</code></td><td>Appends rules for multiple fields. Rules for the same <code>key</code> are cumulative</td><td><code>(schemas: SchemaType[]) =&gt; void</code></td></tr><tr><td><code>addSchema</code></td><td>Appends rules for one field. Rules for the same <code>key</code> are cumulative</td><td><code>(schema: SchemaType) =&gt; void</code></td></tr></tbody></table><h3 id="schematype" tabindex="-1">SchemaType <a class="header-anchor" href="#schematype" aria-label="Permalink to &quot;SchemaType&quot;">​</a></h3><p>Import <code>SchemaType</code> and <code>RuleType</code> from <code>utilane</code>. A <code>RuleType</code> can be a built-in rule string, a regular expression, a synchronous boolean function, or a <code>{ rule, message }</code> object.</p><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>key</code></td><td>Field name matching the control&#39;s <code>name</code> or FormItem&#39;s <code>prop</code></td><td><code>string</code></td><td>Required</td></tr><tr><td><code>required</code></td><td>Enables required validation</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>rules</code></td><td>Validation rules in execution order</td><td><code>RuleType[]</code></td><td><code>[]</code></td></tr><tr><td><code>message</code></td><td>Error message used when a rule provides none</td><td><code>string</code></td><td>Validator&#39;s default message</td></tr></tbody></table><h3 id="formitem-attributes" tabindex="-1">FormItem Attributes <a class="header-anchor" href="#formitem-attributes" aria-label="Permalink to &quot;FormItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>label</code></td><td>Label text</td><td><code>string</code></td><td>-</td></tr><tr><td><code>verify</code></td><td>Built-in rules: required, same:password (password confirmation), and mobile (phone number)</td><td><code>string</code></td><td>-</td></tr><tr><td><code>pattern</code></td><td>Regular expression</td><td><code>string</code></td><td>-</td></tr><tr><td><code>validity</code></td><td>Message displayed on validation failure</td><td><code>string</code></td><td>-</td></tr><tr><td><code>prop</code></td><td>Field key used to identify the form value</td><td><code>string</code></td><td>-</td></tr><tr><td><code>label-position</code></td><td>Label position. Overrides the Form setting when set</td><td><code>left</code>, <code>right</code>, <code>top</code></td><td>Inherited from Form, or <code>right</code> when standalone</td></tr><tr><td><code>label-width</code></td><td>Label width. Overrides the Form setting when set</td><td><code>string</code></td><td>Inherited from Form, or <code>auto</code> when standalone</td></tr><tr><td><code>label-height</code></td><td>Label height. Overrides the Form setting when set</td><td><code>string</code></td><td>Inherited from Form or <code>--l-form-control-height</code></td></tr><tr><td><code>required</code></td><td>Whether the field is required</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>Disables the controls in this form item</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>Whether controls fill the remaining width. Explicit <code>false</code> overrides Form</td><td><code>boolean</code></td><td>Inherited from Form</td></tr><tr><td><code>error</code></td><td>Error message</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><p>Changing <code>required</code>, <code>verify</code>, <code>pattern</code>, or <code>validity</code> updates the FormItem&#39;s validation settings.</p><p>Clicking the label focuses a native control or a component with one internal input, such as <code>l-input</code> or <code>l-input-number</code>. When a FormItem contains several controls, <code>label</code> names the group. Give each field a native label, <code>aria-label</code>, or <code>aria-labelledby</code>.</p><h3 id="formitem-slots" tabindex="-1">FormItem Slots <a class="header-anchor" href="#formitem-slots" aria-label="Permalink to &quot;FormItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Form item</td></tr></tbody></table><h3 id="formitem-events" tabindex="-1">FormItem Events <a class="header-anchor" href="#formitem-events" aria-label="Permalink to &quot;FormItem Events&quot;">​</a></h3><p>FormItem does not emit custom focus or blur events. Listen for the corresponding native events on the input control.</p><h3 id="formitem-methods" tabindex="-1">FormItem Methods <a class="header-anchor" href="#formitem-methods" aria-label="Permalink to &quot;FormItem Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>setRules</code></td><td>Replaces the business rules for the current <code>prop</code> on each call</td><td><code>(config: { required?: boolean; rules?: RuleType[]; message?: string }) =&gt; void</code></td></tr></tbody></table><h3 id="common-form-control-apis" tabindex="-1">Common Form Control APIs <a class="header-anchor" href="#common-form-control-apis" aria-label="Permalink to &quot;Common Form Control APIs&quot;">​</a></h3><p>These APIs apply to Input, MdInput, InputNumber, Select, SelectOri, Radio, Checkbox, both group types, Switch, ColorPicker, and the date controls. See each control&#39;s page for its value types. Upload manages its file list through its own API.</p><h4 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>name</code></td><td>Field name. Can inherit FormItem&#39;s <code>prop</code> when unset</td><td><code>string</code></td><td>Not set</td></tr><tr><td><code>form</code></td><td>ID of the associated native <code>&lt;form&gt;</code>. An explicit ID takes precedence</td><td><code>string</code></td><td>Associated automatically</td></tr><tr><td><code>value</code></td><td>Default restored on reset. Also updates the current value until it is edited or assigned</td><td><code>string</code></td><td>Depends on the control</td></tr><tr><td><code>disabled</code></td><td>The control&#39;s own disabled state. Form, FormItem, or a group can also disable it</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>required</code></td><td>Native required constraint. What counts as empty depends on the control</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>autocomplete</code></td><td>Browser autofill hint. Inherits the Form default when unset</td><td><code>string</code></td><td>Not set</td></tr><tr><td><code>inner-block</code></td><td>Whether the control fills the remaining width. Controls that support this layout can override the inherited setting</td><td><code>boolean</code></td><td>Inherited</td></tr><tr><td><code>readonly</code></td><td>Read-only constraint for input types that support it</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>pattern</code></td><td>Text format constraint for input types that support it</td><td><code>string</code></td><td>Not set</td></tr><tr><td><code>minlength</code>, <code>maxlength</code></td><td>Text length constraints</td><td><code>number</code></td><td>Not set</td></tr><tr><td><code>min</code>, <code>max</code>, <code>step</code></td><td>Numeric or date constraints, depending on the control type</td><td><code>number</code> or <code>string</code></td><td>Not set</td></tr></tbody></table><p>For Radio and Checkbox, the <code>checked</code> attribute sets the default selection and the <code>checked</code> property holds the current selection. <code>value</code> is the option&#39;s value.</p><h4 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>value</code></td><td>Reads or sets the current business value</td><td>Depends on the control</td></tr><tr><td><code>defaultValue</code></td><td>Reads or sets the reset value and reflects the <code>value</code> attribute</td><td>Depends on the control</td></tr><tr><td><code>name</code></td><td>Reads or sets the field name. Assign <code>undefined</code> to restore inheritance</td><td><code>string | undefined</code></td></tr><tr><td><code>disabled</code></td><td>Reads or sets the control&#39;s own disabled setting</td><td><code>boolean</code></td></tr><tr><td><code>autocomplete</code></td><td>Reads or sets the control&#39;s own attribute. Assign <code>&quot;&quot;</code> to remove it</td><td><code>string</code></td></tr><tr><td><code>form</code></td><td>Read-only. The associated native form</td><td><code>HTMLFormElement | null</code></td></tr><tr><td><code>labels</code></td><td>Read-only. Native labels associated with the control</td><td><code>NodeList</code></td></tr><tr><td><code>validity</code></td><td>Read-only. Current native validity state</td><td><code>ValidityState</code></td></tr><tr><td><code>validationMessage</code></td><td>Read-only. Current native validation message</td><td><code>string</code></td></tr><tr><td><code>willValidate</code></td><td>Read-only. Whether the control participates in native constraint validation</td><td><code>boolean</code></td></tr></tbody></table><h4 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>getValue</code></td><td>Reads the current business value</td><td><code>() =&gt; any</code></td></tr><tr><td><code>setValue</code></td><td>Sets the current business value</td><td><code>(value: any) =&gt; void</code></td></tr><tr><td><code>getName</code></td><td>Reads the current field name</td><td><code>() =&gt; string | undefined</code></td></tr><tr><td><code>setDisabled</code></td><td>Sets the control&#39;s own disabled setting</td><td><code>(disabled: boolean) =&gt; void</code></td></tr><tr><td><code>isDisabled</code></td><td>Reads the effective disabled state after combining local and inherited settings</td><td><code>() =&gt; boolean</code></td></tr><tr><td><code>checkValidity</code></td><td>Checks native validity and returns the result</td><td><code>() =&gt; boolean</code></td></tr><tr><td><code>reportValidity</code></td><td>Checks native validity and asks the browser to display its message</td><td><code>() =&gt; boolean</code></td></tr><tr><td><code>setValidity</code></td><td>Sets validity manually. Pass <code>{}</code> to clear manual errors. An invalid flag requires a nonempty message</td><td><code>(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement) =&gt; void</code></td></tr><tr><td><code>reset</code></td><td>Restores the control&#39;s default value</td><td><code>() =&gt; void</code></td></tr></tbody></table><p>Setting values in code does not emit user <code>input</code> or <code>change</code> events. Call Form&#39;s <code>validate()</code> or <code>validateField()</code> to run business rules.</p><h3 id="form-css-variables" tabindex="-1">Form CSS Variables <a class="header-anchor" href="#form-css-variables" aria-label="Permalink to &quot;Form CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-form-gap</code></td><td>Spacing between form items</td><td><code>20px</code></td></tr><tr><td><code>--l-form-label-width</code></td><td>Label width. Also settable with <code>label-width</code></td><td><code>80px</code> for Form, <code>auto</code> for a standalone FormItem</td></tr><tr><td><code>--l-form-label-height</code></td><td>Label height. Also settable with <code>label-height</code></td><td><code>var(--l-form-control-height, 32px)</code></td></tr><tr><td><code>--l-form-label-align</code></td><td>Label text alignment</td><td><code>right</code>, adjusted by <code>label-position</code></td></tr><tr><td><code>--l-form-control-height</code></td><td>Base height when no label height is set</td><td><code>40px</code> with vars.css, <code>32px</code> component fallback</td></tr></tbody></table>`,43))])}}});export{O as __pageData,U as default};
