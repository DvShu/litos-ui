import{$ as a,o as n,a as c}from"./chunks/browser.CplAf69P.js";import{v as A,x as $,C as V,o as R,c as M,a2 as m,E as l,w as i,j as t,a as r,P as B}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const G=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1795187990000}'),N={name:"components/form.md"},H=Object.assign(N,{setup(L){let p,h,b,f,s,g,v,k,y="zh",u={};const q={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password length is at least 6 digits",password_invalid:"Password contain letters and numbers"}};function F(o){const e=o.target.value;a("#positionForm").setAttribute("label-position",e)}function x(o){const e=o.target;console.log(e.getData())}function _(o){o.preventDefault();const e=o.currentTarget;e.querySelector("output").value=`已提交 ${new FormData(e).get("username")}`}function E(o){o.preventDefault();const e=o.currentTarget,d=e.querySelector("l-form").getData(),D=[...new FormData(e)];e.querySelector("output").value=`getData(): ${JSON.stringify(d)}
FormData: ${JSON.stringify(D)}`}function w(o){a("#autocompleteForm").autocomplete=o.currentTarget.value}function S(){a("#customValidForm").setErrors({name:"姓名不能为空",password:"密码不能为空",confimPassword:"确认密码不能为空"})}function P(o){const e=o.target;u={},console.log(e.getData())}function T(){const o={};for(const e in u){const d=u[e];d&&(d in q[y]?o[e]=q[y][d]:o[e]=d)}s.setErrors(o)}function C(o){const{errors:e,all:d}=o.detail;u=d===!0?e:{...u,...e},T()}function I(o){y=o.detail.value,Object.keys(u).length&&T()}return A(()=>{B(()=>{p=a("#lform"),n(p,"submit",x),h=a("#nativeButtonForm"),n(h,"submit",_),k=a("#checkDataForm"),n(k,"submit",E),v=a("#formAutocompleteMode"),n(v,"change",w),b=a("#customSubmit"),n(b,"click",S),s=a("#i18nForm"),g=a("#langCheck"),s.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:o=>o.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),n(s,"validate-error",C),n(s,"submit",P),n(g,"change",I),f=a("#positionRadio"),n(f,"change",F)})}),$(()=>{p&&c(p,"submit",x),h&&c(h,"submit",_),k&&c(k,"submit",E),v&&c(v,"change",w),b&&c(b,"click",S),s&&(c(s,"validate-error",C),c(s,"submit",P)),g&&c(g,"change",I),f&&c(f,"change",F)}),(o,e)=>{const d=V("ClientOnly");return R(),M("div",null,[e[10]||(e[10]=m(`<h1 id="form" tabindex="-1">Form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;Form&quot;">​</a></h1><p>表单控件，自带数据域管理。包含数据录入、校验、重置以及对应样式。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Form, FormItem, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([FormItem, Form]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>基本的表单数据域控制展示，包含布局、初始化、验证、重置、提交。数据验证采用 <a href="https://github.com/DvShu/utilane#readme" target="_blank" rel="noreferrer">utilane/validator</a></p><p>用户编辑字段时会校验该字段及依赖它的字段，提交时会校验整个表单。业务校验失败后，字段的 <code>validity.customError</code> 为 <code>true</code>。</p>`,8)),l(d,null,{default:i(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名" value=""></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password" value=""></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password" value=""></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-space>
        <l-button html-type="reset">重置</l-button>
        <l-button html-type="submit" type="primary">提交</l-button>
      </l-space>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[11]||(e[11]=m('<blockquote><ol><li>如果想要实现按钮之间的间隔，需要引入 <code>Space</code> 组件</li><li>当 <code>Button</code> 在 <code>Form</code> 里面时，如果 <code>Button</code> 的 <code>html-type</code> 属性为 <code>reset</code>、<code>submit</code> 时会自动触发表单的重置、提交。</li></ol></blockquote><p>重置会恢复字段的默认值，不会把第一次程序赋值当作默认值。文本字段使用 <code>value</code> attribute 或 <code>defaultValue</code> 设置默认值；数组等复合字段通过对应控件的 <code>defaultValue</code> 设置。修改当前值后，默认值更新不会覆盖编辑内容，下一次重置才应用。</p><p>在单行 <code>l-input</code> 内按 Enter，可激活表单的第一个提交按钮。</p><h3 id="原生表单" tabindex="-1">原生表单 <a class="header-anchor" href="#原生表单" aria-label="Permalink to &quot;原生表单&quot;">​</a></h3><p><code>l-button</code> 在原生 <code>&lt;form&gt;</code> 中支持点击提交和重置。使用单行 <code>l-input</code> 时，也可以按 Enter 激活提交按钮。</p><p>独立的 <code>l-form</code> 会跳过内部辅助表单的原生提交校验。放在原生 <code>&lt;form&gt;</code> 里时，外层按自己的 <code>novalidate</code> 和提交按钮的 <code>formnovalidate</code> 决定是否执行原生校验。发起提交的 <code>l-form</code> 执行该层的业务校验，外层自己的按钮由原生表单处理。</p>',6)),l(d,null,{default:i(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <form id="nativeButtonForm">
    <l-input name="username" placeholder="用户名" aria-label="用户名" required></l-input>
    <l-button html-type="submit" type="primary">提交</l-button>
    <l-button html-type="reset">重置</l-button>
    <output aria-live="polite"></output>
  </form>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <form id="nativeButtonForm">
    <l-input name="username" placeholder="用户名" aria-label="用户名" required></l-input>
    <l-button html-type="submit" type="primary">提交</l-button>
    <l-button html-type="reset">重置</l-button>
    <output aria-live="polite"></output>
  </form>
`),t("textarea",{lang:"js"},`  import 'litos-ui/styles/vars.css';
  import 'litos-ui/input';
  import 'litos-ui/button';
  //-
  const form = document.querySelector('#nativeButtonForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('output').value = \`已提交 \${new FormData(form).get('username')}\`;
  });
`)])],-1)])]),_:1}),e[12]||(e[12]=t("h3",{id:"单选框和复选框的提交数据",tabindex:"-1"},[r("单选框和复选框的提交数据 "),t("a",{class:"header-anchor",href:"#单选框和复选框的提交数据","aria-label":'Permalink to "单选框和复选框的提交数据"'},"​")],-1)),e[13]||(e[13]=t("p",null,[r("点击提交可对照 "),t("code",null,"l-form.getData()"),r(" 的业务数据和原生 "),t("code",null,"FormData"),r(" 的条目。尝试勾选「订阅更新」或更改组内选项，观察空值、禁用项和同名条目的处理。")],-1)),l(d,null,{default:i(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <form id="checkDataForm">
    <l-form>
      <l-form-item label="订阅">
        <l-checkbox name="subscribe" value="yes">订阅更新</l-checkbox>
      </l-form-item>
      <l-form-item label="语言">
        <l-radio-group name="language" value="" aria-label="语言">
          <l-radio value="">不指定</l-radio>
          <l-radio value="zh">中文</l-radio>
        </l-radio-group>
      </l-form-item>
      <l-form-item label="通知方式">
        <l-checkbox-group name="channel" value="email&sms&inbox" aria-label="通知方式">
          <l-checkbox value="email">邮件</l-checkbox>
          <l-checkbox value="sms" disabled>短信（禁用）</l-checkbox>
          <l-checkbox value="inbox">站内信</l-checkbox>
        </l-checkbox-group>
      </l-form-item>
    </l-form>
    <l-button html-type="submit" type="primary">对照提交数据</l-button>
    <pre><output aria-live="polite"></output></pre>
  </form>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <form id="checkDataForm">
    <l-form>
      <l-form-item label="订阅">
        <l-checkbox name="subscribe" value="yes">订阅更新</l-checkbox>
      </l-form-item>
      <l-form-item label="语言">
        <l-radio-group name="language" value="" aria-label="语言">
          <l-radio value="">不指定</l-radio>
          <l-radio value="zh">中文</l-radio>
        </l-radio-group>
      </l-form-item>
      <l-form-item label="通知方式">
        <l-checkbox-group name="channel" value="email&sms&inbox" aria-label="通知方式">
          <l-checkbox value="email">邮件</l-checkbox>
          <l-checkbox value="sms" disabled>短信（禁用）</l-checkbox>
          <l-checkbox value="inbox">站内信</l-checkbox>
        </l-checkbox-group>
      </l-form-item>
    </l-form>
    <l-button html-type="submit" type="primary">对照提交数据</l-button>
    <pre><output aria-live="polite"></output></pre>
  </form>
`),t("textarea",{lang:"js"},`  import 'litos-ui/styles/vars.css';
  import 'litos-ui/form';
  import 'litos-ui/form-item';
  import 'litos-ui/radio';
  import 'litos-ui/radio-group';
  import 'litos-ui/checkbox';
  import 'litos-ui/checkbox-group';
  import 'litos-ui/button';
  //-
  const form = document.querySelector('#checkDataForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = form.querySelector('l-form').getData();
    const entries = [...new FormData(form)];
    form.querySelector('output').value = \`getData(): \${JSON.stringify(data)}\\nFormData: \${JSON.stringify(entries)}\`;
  });
`)])],-1)])]),_:1}),e[14]||(e[14]=m('<h3 id="统一配置自动填充" tabindex="-1">统一配置自动填充 <a class="header-anchor" href="#统一配置自动填充" aria-label="Permalink to &quot;统一配置自动填充&quot;">​</a></h3><p>Form 的 <code>autocomplete</code> 为表单内支持自动填充的控件及原生 <code>input</code>、<code>textarea</code>、<code>select</code> 提供默认值；单个控件显式设置时优先使用自己的配置。下例可动态切换默认值，邮箱始终保留 <code>email</code> 提示。</p>',2)),l(d,null,{default:i(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select-ori id="formAutocompleteMode" value="on" aria-label="自动填充默认设置">
    <option value="on">允许自动填充</option>
    <option value="off">关闭自动填充提示</option>
  </l-select-ori>
  <l-form id="autocompleteForm" autocomplete="on">
    <l-form-item label="姓名">
      <l-input name="name" placeholder="继承表单配置"></l-input>
    </l-form-item>
    <l-form-item label="电话">
      <l-md-input name="tel" html-type="tel" label="继承表单配置"></l-md-input>
    </l-form-item>
    <l-form-item label="邮箱">
      <l-input name="email" type="email" autocomplete="email" placeholder="单独提供邮箱提示"></l-input>
    </l-form-item>
  </l-form>
`),t("textarea",{lang:"js"},`  const mode = document.querySelector('#formAutocompleteMode');
  mode.addEventListener('change', () => {
    document.querySelector('#autocompleteForm').autocomplete = mode.value;
  });
`)],-1)])]),_:1}),e[15]||(e[15]=m('<p>移除控件的 <code>autocomplete</code> 可恢复继承。Form 未设置时沿用外层原生表单的配置，否则由浏览器决定；<code>off</code> 不保证阻止密码管理器填充，也不会赋予文件选择、开关等控件原本没有的填充能力。</p><h3 id="自定义验证" tabindex="-1">自定义验证 <a class="header-anchor" href="#自定义验证" aria-label="Permalink to &quot;自定义验证&quot;">​</a></h3><p>对于复杂的表单，如果默认的验证不符合需求，可以通过给 <code>Form</code> 传递 <code>novalidate=&quot;on&quot;</code> 禁用默认验证，然后手动调用 <code>Form</code> 的 <code>setErrors(errors: Record&lt;string, any&gt;)</code> 传递验证的错误信息即可。</p>',3)),l(d,null,{default:i(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button type="primary" id="customSubmit">提交</l-button>
    </l-form-item>
  </l-form>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button id="customSubmit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`),t("textarea",{lang:"ts"},`  import { $one } from 'utilane/browser';
  //-
  // 自定义验证
  const $customValidForm = $one('#customValidForm');
  const $customSubmitBtn = $one('#customSubmit');
  $customSubmitBtn.addEventListener('click', (event) => {
    $customValidForm.setErrors({
      name: '姓名不能为空',
      password: '密码不能为空',
      confimPassword: '确认密码不能为空',
    });
  });
`)])],-1)])]),_:1}),e[16]||(e[16]=m(`<blockquote><p>验证成功的字段，可以不传或者传递为 <code>undefined</code>、<code>null</code> 单独使用 FormItem 时，可通过其 <code>error</code> 属性显示错误信息；当前 FormItem 没有 <code>setError()</code> 方法。</p></blockquote><h3 id="验证多语言支持" tabindex="-1">验证多语言支持 <a class="header-anchor" href="#验证多语言支持" aria-label="Permalink to &quot;验证多语言支持&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Radio, RadioGroup, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Radio, RadioGroup]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>通过自定义验证的方式，可以配置多语言支持。通过调用 <code>Form</code> 的 <code>setSchemas</code> 方法，可以设置自定义验证规则; 然后给 <code>Form</code> 设置 <code>emit-error</code> 表明验证失败后，通过 <code>validate-error</code> 自定义事件来处理，传递验证失败的数据, 然后再通过 <code>setErrors</code> 传递自定义验证数据</p>`,4)),l(d,null,{default:i(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
    <l-radio-group value="zh" id="langCheck">
      <l-radio label="中文" value="zh" button></l-radio>
      <l-radio label="En" value="en" button></l-radio>
    </l-radio-group>
    <hr/>
    <l-form id="i18nForm" emit-error>
      <l-form-item required label="手机号" prop="mobile">
        <l-input placeholder="请输入手机号"></l-input>
      </l-form-item>
      <l-form-item required label="密码" prop="password">
        <l-input placeholder="请输入密码" type="password"></l-input>
      </l-form-item>
      <l-form-item label="">
        <l-button type="primary" html-type="submit">提交</l-button>
      </l-form-item>
    </l-form>
  </div>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <div>
    <l-radio-group value="zh" id="langCheck">
      <l-radio label="中文" value="zh" button></l-radio>
      <l-radio label="En" value="en" button></l-radio>
    </l-radio-group>
    <hr/>
    <l-form id="i18nForm" emit-error>
      <l-form-item required label="手机号" prop="mobile">
        <l-input placeholder="请输入手机号"></l-input>
      </l-form-item>
      <l-form-item required label="密码" prop="password">
        <l-input placeholder="请输入密码" type="password"></l-input>
      </l-form-item>
      <l-form-item label="">
        <l-button type="primary" html-type="submit">提交</l-button>
      </l-form-item>
    </l-form>
  </div>
`),t("textarea",{lang:"ts"},`  import { $one, on } from 'utilane/browser';
  //-
  let $i18nForm, $langCheck;
  let lang = 'zh';
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
      password_min6: 'Password length is at least 6 digits',
      password_invalid: 'Password contain letters and numbers'
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
`)])],-1)])]),_:1}),e[17]||(e[17]=m('<blockquote><p>要求传递的 <code>key</code> 必须和 <code>FormItem</code> 的 <code>prop</code> 字段一致，否则不会生效 传递的规则里，将 <code>message</code> 定义为一个唯一性的标记，用来标识自定义验证的错误信息</p></blockquote><h3 id="innerblock" tabindex="-1"><code>InnerBlock</code> <a class="header-anchor" href="#innerblock" aria-label="Permalink to &quot;`InnerBlock`&quot;">​</a></h3><p>设置 <code>inner-block</code> 能够让表单的行内元素铺满剩余宽度</p>',3)),l(d,null,{default:i(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inner-block>
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名" value="张三"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button html-type="reset">重置</l-button>
      <l-button html-type="submit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[18]||(e[18]=t("h3",{id:"行内表单",tabindex:"-1"},[r("行内表单 "),t("a",{class:"header-anchor",href:"#行内表单","aria-label":'Permalink to "行内表单"'},"​")],-1)),e[19]||(e[19]=t("p",null,"当前表单较简单时，可以在一行内放置表单。",-1)),e[20]||(e[20]=t("p",null,[r("通过设置 "),t("code",null,"inline"),r(" 属性为 "),t("code",null,"true"),r(" 可以让表单域变为行内的表单域。")],-1)),l(d,null,{default:i(()=>[...e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inline inner-block label-width="auto">
    <l-form-item label="用户名">
      <l-input placeholder="请输入用户名" value="张三"></l-input>
    </l-form-item>
    <l-form-item label="密码">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="用户名">
      <l-input placeholder="请输入用户名" value="张三"></l-input>
    </l-form-item>
    <l-form-item label="密码">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item>
      <l-button type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[21]||(e[21]=m('<h3 id="对齐方式" tabindex="-1">对齐方式 <a class="header-anchor" href="#对齐方式" aria-label="Permalink to &quot;对齐方式&quot;">​</a></h3><p>通过设置 <code>label-position</code> 来应用标签和内容的对齐方式。</p><p>您可以分别设置 <code>l-form-item</code> 的 <code>label-position</code>. 如果值为空, 则会使用 <code>l-form</code> 的 <code>label-position</code>。</p>',3)),l(d,null,{default:i(()=>[...e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
    <l-form-item label="LabelPosition">
      <l-radio-group value="right" id="positionRadio">
        <l-radio label="Left" value="left" button></l-radio>
        <l-radio label="Right" value="right" button></l-radio>
        <l-radio label="Top" value="top" button></l-radio>
      </l-radio-group>
    </l-form-item>
    <l-form-item label="用户名">
      <l-input placeholder="请输入用户名" value="张三"></l-input>
    </l-form-item>
    <l-form-item label="密码">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),e[22]||(e[22]=t("h3",{id:"只使用-formitem",tabindex:"-1"},[r("只使用 "),t("code",null,"FormItem"),r(),t("a",{class:"header-anchor",href:"#只使用-formitem","aria-label":'Permalink to "只使用 `FormItem`"'},"​")],-1)),e[23]||(e[23]=t("p",null,[t("code",null,"FormItem"),r(" 可以不放在 "),t("code",null,"Form"),r(" 里面，从而进行单独使用。")],-1)),l(d,null,{default:i(()=>[...e[9]||(e[9]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form-item id="form1" label="姓名">
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
`)],-1)])]),_:1}),e[24]||(e[24]=m(`<h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/form&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/form-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在客户端显式导入每个用到的组件，包括表单内的输入控件、按钮和组选项。样式、类型和总入口用法见<a href="/litos-ui/on_demand">按需导入</a>。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="form-attributes" tabindex="-1">Form Attributes <a class="header-anchor" href="#form-attributes" aria-label="Permalink to &quot;Form Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>inline</code></td><td>行内表单, 每一行放置尽量多的项</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>label-position</code></td><td>标签的位置</td><td><code>left</code>、<code>right</code>、<code>top</code></td><td><code>right</code></td></tr><tr><td><code>label-width</code></td><td>表单域标签的宽度, 可以传 <code>auto</code></td><td><code>string</code></td><td><code>80px</code></td></tr><tr><td><code>label-height</code></td><td>表单域标签的高度，数字按 px 处理，也可传 CSS 长度</td><td><code>string</code></td><td>跟随 <code>--l-form-control-height</code></td></tr><tr><td><code>inner-block</code></td><td>表单内的输入元素是否铺满剩余宽度</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用表单内的控件</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>autocomplete</code></td><td>表单内控件的自动填充默认提示，控件自身配置优先；支持动态更新</td><td><code>on</code>、<code>off</code></td><td>未设置，沿用外层原生表单或浏览器默认</td></tr><tr><td><code>novalidate</code></td><td>是否跳过输入和提交时的自动业务校验</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>emit-error</code></td><td>通过 <code>validate-error</code> 上报自动校验结果，由调用方处理提示</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><p>在 <code>l-form-item</code> 上设置 <code>disabled</code>，可以单独禁用该表单项下的控件。</p><h3 id="form-properties" tabindex="-1">Form Properties <a class="header-anchor" href="#form-properties" aria-label="Permalink to &quot;Form Properties&quot;">​</a></h3><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>disabled</code></td><td>读取或设置表单的禁用状态，赋值时同步更新 <code>disabled</code> HTML 属性</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>autocomplete</code></td><td>读取或设置自身的同名 attribute；设为 <code>&quot;&quot;</code> 移除配置</td><td><code>&quot;on&quot; | &quot;off&quot; | &quot;&quot;</code></td><td><code>&quot;&quot;</code></td></tr><tr><td><code>nativeForm</code></td><td>只读，当前关联的原生表单；未挂载或断开后为 <code>undefined</code></td><td><code>HTMLFormElement | undefined</code></td><td><code>undefined</code></td></tr><tr><td><code>validationErrors</code></td><td>只读，当前展示错误的快照</td><td><code>Readonly&lt;Record&lt;string, string | undefined&gt;&gt;</code></td><td><code>{}</code></td></tr><tr><td><code>validator</code></td><td>校验器实例，通常通过下方 Schema 方法配置规则</td><td><code>Validator</code>（来自 utilane）</td><td>自动创建</td></tr></tbody></table><h3 id="form-slots" tabindex="-1">Form Slots <a class="header-anchor" href="#form-slots" aria-label="Permalink to &quot;Form Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>表单项</td></tr></tbody></table><h3 id="form-events" tabindex="-1">Form Events <a class="header-anchor" href="#form-events" aria-label="Permalink to &quot;Form Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>submit</code></td><td>表单提交事件，detail 为表单数据</td><td><code>(e: CustomEvent): void</code></td></tr><tr><td><code>validate-error</code></td><td><code>emit-error</code> 开启时上报校验结果。<code>detail.all</code> 为 <code>true</code> 时替换整表错误，为字段名数组时合并 <code>detail.errors</code>，值为 <code>undefined</code> 的字段已通过</td><td><code>(e: CustomEvent): void</code></td></tr></tbody></table><p>开启 <code>emit-error</code> 后，提交失败的整表事件会包含业务错误和已触发且尚未解决的原生约束错误。同一字段优先报告业务错误。动态开启时，已有的原生错误改由事件上报。关闭后，尚未解决的原生错误恢复内置提示。</p><h3 id="form-methods" tabindex="-1">Form Methods <a class="header-anchor" href="#form-methods" aria-label="Permalink to &quot;Form Methods&quot;">​</a></h3><p>自定义规则函数使用同步布尔返回值。返回 Promise 会使该字段校验失败。程序修改值后，可调用 <code>validateField()</code> 重新校验指定字段。</p><p><code>getData()</code> 同步读取已关联字段的当前值。程序赋值后可以立即读取，用户 <code>input</code> 或 <code>change</code> 回调也可以直接读取。它保留禁用字段和原有业务值，同名字段取 DOM 顺序最后一个。每次调用返回新的顶层对象，组件业务对象仍保留原引用。</p><p>原生控件按实际类型读取。复选框返回布尔值，单选框返回选中项的值，多选下拉返回字符串数组，文件输入返回 <code>File</code>、<code>File[]</code> 或 <code>null</code>，其他文本值保留为字符串。独立 <code>l-form</code> 可用 <code>form</code> 属性关联同一 DOM 树中的外置控件，目标 ID 从 <code>lForm.nativeForm.id</code> 取得。多个 <code>l-form</code> 共用外层原生表单时，每个 <code>getData()</code> 读取自己范围内的控件。</p><p><code>l-radio</code> 和 <code>l-checkbox</code> 的值按下表读取。分组时使用组的字段名。参见<a href="#单选框和复选框的提交数据">提交数据演示</a>。</p><table tabindex="0"><thead><tr><th>控件</th><th><code>l-form.getData()</code></th><th>原生 <code>FormData</code></th></tr></thead><tbody><tr><td>独立 Radio／Checkbox</td><td>保留选项 <code>value</code>，包括未勾选或禁用时</td><td>仅提交已勾选且可用的选项。Checkbox 的半选状态独立于是否勾选</td></tr><tr><td>RadioGroup</td><td>返回匹配的选项值，包括禁用项。无匹配时为 <code>null</code></td><td>提交匹配且可用的选项值。匹配空字符串选项时提交 <code>&quot;&quot;</code></td></tr><tr><td>CheckboxGroup</td><td>返回匹配值的编码字符串，包括禁用项。无匹配时为 <code>&quot;&quot;</code>，仅匹配空值选项时为 <code>&amp;</code></td><td>每个已选且可用的值各生成一条同名条目</td></tr></tbody></table><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>validate</code></td><td>校验全部数据，结果通过 Promise 返回</td><td><code>() =&gt; Promise&lt;{ result: boolean; errors: Record&lt;string, any&gt; }&gt;</code></td></tr><tr><td><code>getData</code></td><td>返回当前字段值的浅快照</td><td><code>() =&gt; Record&lt;string, any&gt;</code></td></tr><tr><td><code>validateField</code></td><td>校验指定字段。成功时 resolve，失败时 reject，错误对象的 <code>detail</code> 包含字段错误</td><td><code>(field: string | string[]) =&gt; Promise&lt;void&gt;</code></td></tr><tr><td><code>clearValidate</code></td><td>清除错误提示和交互状态，保留字段的实际有效性</td><td><code>() =&gt; void</code></td></tr><tr><td><code>reset</code></td><td>触发关联原生表单的重置；未取消时恢复默认值并清理提示，共用表单时其他字段也会重置</td><td><code>() =&gt; void</code></td></tr><tr><td><code>submit</code></td><td>执行业务提交，校验通过后触发 <code>submit</code>；<code>novalidate</code> 时跳过自动业务校验</td><td><code>() =&gt; void</code></td></tr><tr><td><code>setErrors</code></td><td>替换当前展示错误；无错误的项可省略或传 <code>undefined</code>／<code>null</code>，传 <code>{}</code> 清空</td><td><code>(errors: Record&lt;string, any&gt;) =&gt; void</code></td></tr><tr><td><code>setValidateErrors</code></td><td><code>emit-error</code> 开启时触发 <code>validate-error</code> 并传入 <code>errors</code>、<code>all</code>；否则同 <code>setErrors()</code>。<code>all</code> 默认 <code>true</code></td><td><code>(errors: Record&lt;string, string | undefined&gt;, all?: string | string[] | boolean) =&gt; void</code></td></tr><tr><td><code>setSchemas</code></td><td>替换整组校验规则</td><td><code>(schemas: SchemaType[]) =&gt; void</code></td></tr><tr><td><code>setSchema</code></td><td>替换指定 <code>key</code> 的校验规则，保留其他字段规则</td><td><code>(schema: SchemaType) =&gt; void</code></td></tr><tr><td><code>addSchemas</code></td><td>批量追加规则，同名 <code>key</code> 的规则累加</td><td><code>(schemas: SchemaType[]) =&gt; void</code></td></tr><tr><td><code>addSchema</code></td><td>追加单个字段的规则，同名 <code>key</code> 的规则累加</td><td><code>(schema: SchemaType) =&gt; void</code></td></tr></tbody></table><h3 id="schematype" tabindex="-1">SchemaType <a class="header-anchor" href="#schematype" aria-label="Permalink to &quot;SchemaType&quot;">​</a></h3><p><code>SchemaType</code>、<code>RuleType</code> 可从 <code>utilane</code> 导入。<code>RuleType</code> 支持内置规则字符串、正则表达式、同步布尔函数，以及 <code>{ rule, message }</code> 对象。</p><table tabindex="0"><thead><tr><th>字段</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>key</code></td><td>字段名，与控件的 <code>name</code> 或 FormItem 的 <code>prop</code> 对应</td><td><code>string</code></td><td>必填</td></tr><tr><td><code>required</code></td><td>是否启用必填校验</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>rules</code></td><td>按顺序执行的校验规则</td><td><code>RuleType[]</code></td><td><code>[]</code></td></tr><tr><td><code>message</code></td><td>未单独指定规则消息时使用的错误提示</td><td><code>string</code></td><td>使用校验器默认提示</td></tr></tbody></table><h3 id="formitem-attributes" tabindex="-1">FormItem Attributes <a class="header-anchor" href="#formitem-attributes" aria-label="Permalink to &quot;FormItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>label</code></td><td>标签文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>verify</code></td><td>内置验证规则:<code>required</code>-必填,<code>same:password</code>-一般用于验证确认密码,<code>mobile</code>-验证电话号码</td><td><code>string</code></td><td>-</td></tr><tr><td><code>pattern</code></td><td>正则表达式</td><td><code>string</code></td><td>-</td></tr><tr><td><code>validity</code></td><td>验证失败时的提示信息</td><td><code>string</code></td><td>-</td></tr><tr><td><code>prop</code></td><td>对应表单域 <code>name</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>label-position</code></td><td>标签的位置，局部设置时覆盖 Form 配置</td><td><code>left</code>、<code>right</code>、<code>top</code></td><td>继承 Form，独立使用为 <code>right</code></td></tr><tr><td><code>label-width</code></td><td>标签宽度，局部设置时覆盖 Form 配置</td><td><code>string</code></td><td>继承 Form，独立使用为 <code>auto</code></td></tr><tr><td><code>label-height</code></td><td>标签高度，局部设置时覆盖 Form 配置</td><td><code>string</code></td><td>继承 Form 或 <code>--l-form-control-height</code></td></tr><tr><td><code>required</code></td><td>是否必填</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用该表单项下的表单组件</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>表单内的输入元素是否铺满剩余宽度；显式 <code>false</code> 可覆盖 Form 配置</td><td><code>boolean</code></td><td>继承 Form</td></tr><tr><td><code>error</code></td><td>错误提示</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><p>更改 <code>required</code>、<code>verify</code>、<code>pattern</code> 或 <code>validity</code> HTML 属性后，表单项按更新后的属性配置校验。</p><p>点击单控件行的标签，可聚焦原生输入控件或 <code>l-input</code>、<code>l-input-number</code> 等内部只有一个输入控件的组件。多控件行的 <code>label</code> 用作分组名称，请为各字段分别提供原生标签、<code>aria-label</code> 或 <code>aria-labelledby</code>。</p><h3 id="formitem-slots" tabindex="-1">FormItem Slots <a class="header-anchor" href="#formitem-slots" aria-label="Permalink to &quot;FormItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>表单项</td></tr></tbody></table><h3 id="formitem-events" tabindex="-1">FormItem Events <a class="header-anchor" href="#formitem-events" aria-label="Permalink to &quot;FormItem Events&quot;">​</a></h3><p>FormItem 当前没有单独派发 focus 或 blur 自定义事件。需要监听输入焦点时，在具体输入控件上绑定相应的原生事件。</p><h3 id="formitem-methods" tabindex="-1">FormItem Methods <a class="header-anchor" href="#formitem-methods" aria-label="Permalink to &quot;FormItem Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>setRules</code></td><td>替换当前 <code>prop</code> 的业务规则；重复调用不累加旧规则</td><td><code>(config: { required?: boolean; rules?: RuleType[]; message?: string }) =&gt; void</code></td></tr></tbody></table><h3 id="表单控件通用-api" tabindex="-1">表单控件通用 API <a class="header-anchor" href="#表单控件通用-api" aria-label="Permalink to &quot;表单控件通用 API&quot;">​</a></h3><p>以下 API 适用于 Input、MdInput、InputNumber、Select、SelectOri、Radio、Checkbox、两种 Group、Switch、ColorPicker 和日期控件。具体值类型以各控件文档为准；Upload 的文件列表通过自身 API 管理。</p><h4 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h4><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>name</code></td><td>字段名，未单独设置时可继承 FormItem 的 <code>prop</code></td><td><code>string</code></td><td>未设置</td></tr><tr><td><code>form</code></td><td>关联的原生 <code>&lt;form&gt;</code> 的 ID，显式配置优先</td><td><code>string</code></td><td>自动关联</td></tr><tr><td><code>value</code></td><td>重置默认值；当前值尚未被修改时同步到当前值</td><td><code>string</code></td><td>由控件决定</td></tr><tr><td><code>disabled</code></td><td>控件自身的禁用状态，Form、FormItem 或 Group 也可提供禁用配置</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>required</code></td><td>原生必填约束，具体空值规则由控件决定</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>autocomplete</code></td><td>浏览器填充提示；控件未单独设置时继承 Form 默认值</td><td><code>string</code></td><td>未设置</td></tr><tr><td><code>inner-block</code></td><td>宽度是否铺满，支持此布局的控件可局部覆盖上级配置</td><td><code>boolean</code></td><td>继承上级配置</td></tr><tr><td><code>readonly</code></td><td>只读约束，仅对支持只读的输入类型生效</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>pattern</code></td><td>文本格式约束，仅对支持该约束的输入类型生效</td><td><code>string</code></td><td>未设置</td></tr><tr><td><code>minlength</code>、<code>maxlength</code></td><td>文本长度约束</td><td><code>number</code></td><td>未设置</td></tr><tr><td><code>min</code>、<code>max</code>、<code>step</code></td><td>数值或日期约束，按控件类型生效</td><td><code>number</code> 或 <code>string</code></td><td>未设置</td></tr></tbody></table><p>Radio／Checkbox 的选中默认值使用 <code>checked</code>，当前选中状态使用实例的 <code>checked</code> property；<code>value</code> 是选项值。</p><h4 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h4><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>value</code></td><td>读取或设置当前业务值</td><td>由控件决定</td></tr><tr><td><code>defaultValue</code></td><td>读取或设置重置默认值，与 <code>value</code> attribute 同步</td><td>由控件决定</td></tr><tr><td><code>name</code></td><td>读取或设置字段名；设为 <code>undefined</code> 恢复继承</td><td><code>string | undefined</code></td></tr><tr><td><code>disabled</code></td><td>读取或设置自身的禁用配置</td><td><code>boolean</code></td></tr><tr><td><code>autocomplete</code></td><td>读取或设置自身的同名 attribute；设为 <code>&quot;&quot;</code> 移除配置</td><td><code>string</code></td></tr><tr><td><code>form</code></td><td>只读，实际关联的原生表单</td><td><code>HTMLFormElement | null</code></td></tr><tr><td><code>labels</code></td><td>只读，关联到控件的原生标签</td><td><code>NodeList</code></td></tr><tr><td><code>validity</code></td><td>只读，当前原生有效性状态</td><td><code>ValidityState</code></td></tr><tr><td><code>validationMessage</code></td><td>只读，当前原生验证提示</td><td><code>string</code></td></tr><tr><td><code>willValidate</code></td><td>只读，当前是否参与原生约束校验</td><td><code>boolean</code></td></tr></tbody></table><h4 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h4><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>getValue</code></td><td>读取当前业务值</td><td><code>() =&gt; any</code></td></tr><tr><td><code>setValue</code></td><td>设置当前业务值</td><td><code>(value: any) =&gt; void</code></td></tr><tr><td><code>getName</code></td><td>读取当前字段名</td><td><code>() =&gt; string | undefined</code></td></tr><tr><td><code>setDisabled</code></td><td>设置控件自身的禁用配置</td><td><code>(disabled: boolean) =&gt; void</code></td></tr><tr><td><code>isDisabled</code></td><td>读取合并自身和上级配置后的有效禁用状态</td><td><code>() =&gt; boolean</code></td></tr><tr><td><code>checkValidity</code></td><td>检查当前原生有效性并返回结果</td><td><code>() =&gt; boolean</code></td></tr><tr><td><code>reportValidity</code></td><td>检查当前原生有效性并请求浏览器显示提示</td><td><code>() =&gt; boolean</code></td></tr><tr><td><code>setValidity</code></td><td>设置手动有效性，传 <code>{}</code> 清除手动错误；无效标志需配合非空消息</td><td><code>(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement) =&gt; void</code></td></tr><tr><td><code>reset</code></td><td>将当前控件恢复到默认值</td><td><code>() =&gt; void</code></td></tr></tbody></table><p>程序设置值不会触发用户 <code>input</code>／<code>change</code> 事件。业务规则通过 Form 的 <code>validate()</code> 或 <code>validateField()</code> 执行。</p><h3 id="form-css-variables" tabindex="-1">Form CSS Variables <a class="header-anchor" href="#form-css-variables" aria-label="Permalink to &quot;Form CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-form-gap</code></td><td>表单项间距</td><td><code>20px</code></td></tr><tr><td><code>--l-form-label-width</code></td><td>标签宽度，也可通过 <code>label-width</code> 设置</td><td>Form 为 <code>80px</code>；独立 FormItem 为 <code>auto</code></td></tr><tr><td><code>--l-form-label-height</code></td><td>标签高度，也可通过 <code>label-height</code> 设置</td><td><code>var(--l-form-control-height, 32px)</code></td></tr><tr><td><code>--l-form-label-align</code></td><td>标签文字对齐方式</td><td><code>right</code>，随 <code>label-position</code> 调整</td></tr><tr><td><code>--l-form-control-height</code></td><td>未指定标签高度时的基础高度</td><td><code>40px</code>（引入 vars.css 后；组件回退为 <code>32px</code>）</td></tr></tbody></table>`,46))])}}});export{G as __pageData,H as default};
