import{$ as a,o as s,a as m}from"./chunks/browser.Chubywy5.js";import{v as P,P as x,x as S,C as I,o as T,c as C,a2 as c,E as n,w as i,j as t,a as d}from"./chunks/framework.0mmZ3Di7.js";const B=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1787245584000}'),$={name:"components/form.md"},z=Object.assign($,{setup(A){let p,h,b,l,f,g="zh",u={};const v={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password length is at least 6 digits",password_invalid:"Password contain letters and numbers"}};function k(o){const e=o.target.value;a("#positionForm").setAttribute("label-position",e)}function _(o){const e=o.target;console.log(e.getData())}function y(){a("#customValidForm").setErrors({name:"姓名不能为空",password:"密码不能为空",confimPassword:"确认密码不能为空"})}function q(o){const e=o.target;u={},console.log(e.getData())}function w(){const o={};for(const e in u){const r=u[e];r&&(r in v[g]?o[e]=v[g][r]:o[e]=r)}l.setErrors(o)}function F(o){const e=o.detail,r=e.errors;e.all===!0&&(u=r),w()}function E(o){g=o.detail.value,Object.keys(u).length&&w()}return P(()=>{x(()=>{p=a("#lform"),s(p,"submit",_),h=a("#customSubmit"),s(h,"click",y),l=a("#i18nForm"),f=a("#langCheck"),l.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:o=>o.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),s(l,"validate-error",F),s(l,"submit",q),s(f,"change",E),b=a("#positionRadio"),s(b,"change",k)})}),S(()=>{p&&m(p,"submit",_),h&&m(h,"click",y),l&&(m(l,"validate-error",F),m(l,"submit",q)),f&&m(f,"change",E),b&&m(b,"change",k)}),(o,e)=>{const r=I("ClientOnly");return T(),C("div",null,[e[7]||(e[7]=c(`<h1 id="form" tabindex="-1">Form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;Form&quot;">​</a></h1><p>表单控件，自带数据域管理。包含数据录入、校验、重置以及对应样式。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Form, FormItem, regist, Space } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Form, FormItem]);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Space]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 表单按钮组的间距</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>基本的表单数据域控制展示，包含布局、初始化、验证、重置、提交。数据验证采用 <a href="https://gitee.com/towardly/ph/wikis/utils/validator" target="_blank" rel="noreferrer">ph-utils/validator</a></p>`,7)),n(r,null,{default:i(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
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
`)],-1)])]),_:1}),e[8]||(e[8]=c('<blockquote><ol><li>如果想要实现按钮之间的间隔，需要引入 <code>Space</code> 组件</li><li>当 <code>Button</code> 在 <code>Form</code> 里面时，如果 <code>Button</code> 的 <code>html-type</code> 属性为 <code>reset</code>、<code>submit</code> 时会自动触发表单的重置、提交。</li></ol></blockquote><h3 id="自定义验证" tabindex="-1">自定义验证 <a class="header-anchor" href="#自定义验证" aria-label="Permalink to &quot;自定义验证&quot;">​</a></h3><p>对于复杂的表单，如果默认的验证不符合需求，可以通过给 <code>Form</code> 传递 <code>novalidate=&quot;on&quot;</code> 禁用默认验证，然后手动调用 <code>Form</code> 的 <code>setErrors(errors: Reocord&lt;string, any&gt;)</code> 传递验证的错误信息即可。</p>',3)),n(r,null,{default:i(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
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
`),t("textarea",{lang:"ts"},`  import { $one } from 'ph-utils/browser';
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
`)])],-1)])]),_:1}),e[9]||(e[9]=c('<blockquote><p>验证成功的字段，可以不传或者传递为 <code>undefined</code>、<code>null</code> 当然也可以手动验证数据，然后分别调用输入框以及 <code>FormItem</code> 的 <code>setError({})</code> 方法设置错误</p></blockquote><h3 id="验证多语言支持" tabindex="-1">验证多语言支持 <a class="header-anchor" href="#验证多语言支持" aria-label="Permalink to &quot;验证多语言支持&quot;">​</a></h3><p>通过自定义验证的方式，可以配置多语言支持。通过调用 <code>Form</code> 的 <code>setSchemas</code> 方法，可以设置自定义验证规则; 然后给 <code>Form</code> 设置 <code>emit-error</code> 表明验证失败后，通过 <code>validate-error</code> 自定义事件来处理，传递验证失败的数据, 然后再通过 <code>setErrors</code> 传递自定义验证数据</p>',3)),n(r,null,{default:i(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
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
`),t("textarea",{lang:"ts"},`  import { $one, on } from 'ph-utils/browser';
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
`)])],-1)])]),_:1}),e[10]||(e[10]=c('<blockquote><p>要求传递的 <code>key</code> 必须和 <code>FormItem</code> 的 <code>prop</code> 字段一致，否则不会生效 传递的规则里，将 <code>message</code> 定义为一个唯一性的标记，用来标识自定义验证的错误信息</p></blockquote><h3 id="innerblock" tabindex="-1"><code>InnerBlock</code> <a class="header-anchor" href="#innerblock" aria-label="Permalink to &quot;`InnerBlock`&quot;">​</a></h3><p>设置 <code>inner-block</code> 能够让表单的行内元素铺满剩余宽度</p>',3)),n(r,null,{default:i(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inner-block>
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
`)],-1)])]),_:1}),e[11]||(e[11]=t("h3",{id:"行内表单",tabindex:"-1"},[d("行内表单 "),t("a",{class:"header-anchor",href:"#行内表单","aria-label":'Permalink to "行内表单"'},"​")],-1)),e[12]||(e[12]=t("p",null,"当前表单较简单时，可以在一行内放置表单。",-1)),e[13]||(e[13]=t("p",null,[d("通过设置 "),t("code",null,"inline"),d(" 属性为 "),t("code",null,"true"),d(" 可以让表单域变为行内的表单域。")],-1)),n(r,null,{default:i(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inline inner-block label-width="auto">
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
`)],-1)])]),_:1}),e[14]||(e[14]=c('<h3 id="对齐方式" tabindex="-1">对齐方式 <a class="header-anchor" href="#对齐方式" aria-label="Permalink to &quot;对齐方式&quot;">​</a></h3><p>通过设置 <code>label-position</code> 来应用标签和内容的对齐方式。</p><p>您可以分别设置 <code>l-form-item</code> 的 <code>label-position</code>. 如果值为空, 则会使用 <code>l-form</code> 的 <code>label-position</code>。</p>',3)),n(r,null,{default:i(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
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
`)],-1)])]),_:1}),e[15]||(e[15]=t("h3",{id:"只使用-formitem",tabindex:"-1"},[d("只使用 "),t("code",null,"FormItem"),d(),t("a",{class:"header-anchor",href:"#只使用-formitem","aria-label":'Permalink to "只使用 `FormItem`"'},"​")],-1)),e[16]||(e[16]=t("p",null,[t("code",null,"FormItem"),d(" 可以不放在 "),t("code",null,"Form"),d(" 里面，从而进行单独使用。")],-1)),n(r,null,{default:i(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form-item id="form1" label="姓名">
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
`)],-1)])]),_:1}),e[17]||(e[17]=c('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="form-attibutes" tabindex="-1">Form Attibutes <a class="header-anchor" href="#form-attibutes" aria-label="Permalink to &quot;Form Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>inline</code></td><td>行内表单, 每一行放置尽量多的项</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>label-position</code></td><td>标签的位置</td><td><code>left</code>、<code>right</code>、<code>top</code></td><td><code>right</code></td></tr><tr><td><code>label-width</code></td><td>表单域标签的宽度, 可以传 <code>auto</code></td><td><code>string</code></td><td><code>80px</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>表单内的输入元素是否铺满剩余宽度</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>novalidate</code></td><td>是否在提交时禁用表单验证</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="form-slots" tabindex="-1">Form Slots <a class="header-anchor" href="#form-slots" aria-label="Permalink to &quot;Form Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>表单项</td></tr></tbody></table><h3 id="form-events" tabindex="-1">Form Events <a class="header-anchor" href="#form-events" aria-label="Permalink to &quot;Form Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>submit</code></td><td>表单提交事件</td><td><code>(e: Event): void</code></td></tr></tbody></table><h3 id="form-methods" tabindex="-1">Form Methods <a class="header-anchor" href="#form-methods" aria-label="Permalink to &quot;Form Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>validate</code></td><td>对整个表单进行校验的方法</td><td><code>() =&gt; void</code></td></tr><tr><td><code>validateField</code></td><td>对部分表单字段进行校验的方法</td><td>`(props: string</td></tr><tr><td><code>clearValidate</code></td><td>移除表单项的校验结果</td><td><code>() =&gt; void</code></td></tr><tr><td><code>setErrors(errors: Record&lt;string, string&gt;)</code></td><td>设置表单错误信息</td><td>-</td></tr></tbody></table><h3 id="formitem-attributes" tabindex="-1">FormItem Attributes <a class="header-anchor" href="#formitem-attributes" aria-label="Permalink to &quot;FormItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>label</code></td><td>标签文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>verify</code></td><td>内置验证规则:<code>required</code>-必填,<code>same:password</code>-一般用于验证确认密码,<code>mobile</code>-验证电话号码</td><td><code>string</code></td><td>-</td></tr><tr><td><code>pattern</code></td><td>正则表达式</td><td><code>string</code></td><td>-</td></tr><tr><td><code>validity</code></td><td>验证失败时的提示信息</td><td><code>string</code></td><td>-</td></tr><tr><td><code>prop</code></td><td>对应表单域 <code>name</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>label-position</code></td><td>标签的位置</td><td><code>left</code>、<code>right</code>、<code>top</code></td><td><code>right</code></td></tr><tr><td><code>required</code></td><td>是否必填</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>表单内的输入元素是否铺满剩余宽度</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>error</code></td><td>错误提示</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="formitem-slots" tabindex="-1">FormItem Slots <a class="header-anchor" href="#formitem-slots" aria-label="Permalink to &quot;FormItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>表单项</td></tr></tbody></table><h3 id="formitem-events" tabindex="-1">FormItem Events <a class="header-anchor" href="#formitem-events" aria-label="Permalink to &quot;FormItem Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>blur</code></td><td>在 Input 失去焦点时触发</td><td><code>(e: Event): void</code></td></tr><tr><td><code>focus</code></td><td>在 Input 获得焦点时触发</td><td>`(e: Event</td></tr></tbody></table><h3 id="form-css-variables" tabindex="-1">Form CSS Variables <a class="header-anchor" href="#form-css-variables" aria-label="Permalink to &quot;Form CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>',17))])}}});export{B as __pageData,z as default};
