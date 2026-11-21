import{$ as a,o as n,a as c}from"./chunks/browser.CplAf69P.js";import{v as A,x as $,C as V,o as R,c as M,a2 as m,E as l,w as i,j as t,a as r,P as B}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const G=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1795187990000}'),N={name:"components/form.md"},H=Object.assign(N,{setup(L){let p,h,b,f,s,g,v,k,y="zh",u={};const q={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password length is at least 6 digits",password_invalid:"Password contain letters and numbers"}};function F(o){const e=o.target.value;a("#positionForm").setAttribute("label-position",e)}function x(o){const e=o.target;console.log(e.getData())}function _(o){o.preventDefault();const e=o.currentTarget;e.querySelector("output").value=`已提交 ${new FormData(e).get("username")}`}function E(o){o.preventDefault();const e=o.currentTarget,d=e.querySelector("l-form").getData(),D=[...new FormData(e)];e.querySelector("output").value=`getData(): ${JSON.stringify(d)}
FormData: ${JSON.stringify(D)}`}function w(o){a("#autocompleteForm").autocomplete=o.currentTarget.value}function S(){a("#customValidForm").setErrors({name:"姓名不能为空",password:"密码不能为空",confimPassword:"确认密码不能为空"})}function P(o){const e=o.target;u={},console.log(e.getData())}function T(){const o={};for(const e in u){const d=u[e];d&&(d in q[y]?o[e]=q[y][d]:o[e]=d)}s.setErrors(o)}function C(o){const{errors:e,all:d}=o.detail;u=d===!0?e:{...u,...e},T()}function I(o){y=o.detail.value,Object.keys(u).length&&T()}return A(()=>{B(()=>{p=a("#lform"),n(p,"submit",x),h=a("#nativeButtonForm"),n(h,"submit",_),k=a("#checkDataForm"),n(k,"submit",E),v=a("#formAutocompleteMode"),n(v,"change",w),b=a("#customSubmit"),n(b,"click",S),s=a("#i18nForm"),g=a("#langCheck"),s.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:o=>o.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),n(s,"validate-error",C),n(s,"submit",P),n(g,"change",I),f=a("#positionRadio"),n(f,"change",F)})}),$(()=>{p&&c(p,"submit",x),h&&c(h,"submit",_),k&&c(k,"submit",E),v&&c(v,"change",w),b&&c(b,"click",S),s&&(c(s,"validate-error",C),c(s,"submit",P)),g&&c(g,"change",I),f&&c(f,"change",F)}),(o,e)=>{const d=V("ClientOnly");return R(),M("div",null,[e[10]||(e[10]=m("",8)),l(d,null,{default:i(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
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
`)],-1)])]),_:1}),e[11]||(e[11]=m("",6)),l(d,null,{default:i(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <form id="nativeButtonForm">
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
`)])],-1)])]),_:1}),e[14]||(e[14]=m("",2)),l(d,null,{default:i(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select-ori id="formAutocompleteMode" value="on" aria-label="自动填充默认设置">
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
`)],-1)])]),_:1}),e[15]||(e[15]=m("",3)),l(d,null,{default:i(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
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
`)])],-1)])]),_:1}),e[16]||(e[16]=m("",4)),l(d,null,{default:i(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
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
`)])],-1)])]),_:1}),e[17]||(e[17]=m("",3)),l(d,null,{default:i(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inner-block>
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
`)],-1)])]),_:1}),e[21]||(e[21]=m("",3)),l(d,null,{default:i(()=>[...e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
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
`)],-1)])]),_:1}),e[24]||(e[24]=m("",46))])}}});export{G as __pageData,H as default};
