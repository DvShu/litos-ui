import{$ as n,o as d,a as m}from"./chunks/browser.7zTvUqO3.js";import{v as C,P as S,x,C as _,o as I,c as A,a2 as f,E as l,w as s,j as t,a}from"./chunks/framework.nU6eqUhJ.js";const B=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/form.md","filePath":"en/components/form.md","lastUpdated":1793335100000}'),$={name:"en/components/form.md"},R=Object.assign($,{setup(T){let p,h,c,i,b,g="en",u={};const k={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password must be at least 6 characters",password_invalid:"Password must contain letters and numbers"}};function y(r){const e=r.target.value;n("#positionForm").setAttribute("label-position",e)}function v(r){const e=r.target;console.log(e.getData())}function w(){n("#customValidForm").setErrors({name:"Name is required",password:"Password is required",confimPassword:"Confirm password is required"})}function E(r){const e=r.target;u={},console.log(e.getData())}function q(){const r={};for(const e in u){const o=u[e];o&&(o in k[g]?r[e]=k[g][o]:r[e]=o)}i.setErrors(r)}function F(r){const e=r.detail,o=e.errors;e.all===!0&&(u=o),q()}function P(r){g=r.detail.value,Object.keys(u).length&&q()}return C(()=>{S(()=>{p=n("#lform"),d(p,"submit",v),h=n("#customSubmit"),d(h,"click",w),i=n("#i18nForm"),b=n("#langCheck"),i.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:r=>r.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),d(i,"validate-error",F),d(i,"submit",E),d(b,"change",P),c=n("#positionRadio"),d(c,"change",y)})}),x(()=>{p&&m(p,"submit",v),h&&m(h,"click",w),i&&(m(i,"validate-error",F),m(i,"submit",E)),b&&m(b,"change",P),c&&m(c,"change",y)}),(r,e)=>{const o=_("ClientOnly");return I(),A("div",null,[e[7]||(e[7]=f("",8)),l(o,null,{default:s(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
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
`)],-1)])]),_:1}),e[8]||(e[8]=f("",3)),l(o,null,{default:s(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
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
`)])],-1)])]),_:1}),e[9]||(e[9]=f("",5)),l(o,null,{default:s(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
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
`)],-1)])]),_:1}),e[21]||(e[21]=f("",21))])}}});export{B as __pageData,R as default};
