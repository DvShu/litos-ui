import{$ as r,o as s,a as c}from"./chunks/browser.CplAf69P.js";import{v as T,x as I,C as A,o as R,c as D,a2 as m,E as a,w as i,j as t,a as n,P as V}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const O=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/form.md","filePath":"en/components/form.md","lastUpdated":1795187990000}'),N={name:"en/components/form.md"},U=Object.assign(N,{setup($){let h,p,b,f,l,g,v,y="en",u={};const w={zh:{mobile_required:"手机号不能为空",mobile_invalid:"请输入正确的手机号码",password_required:"密码不能为空",password_min6:"密码至少为6位",password_invalid:"密码必须包含字母和数字"},en:{mobile_required:"Mobile is required",mobile_invalid:"Please enter a valid mobile number",password_required:"Password is required",password_min6:"Password must be at least 6 characters",password_invalid:"Password must contain letters and numbers"}};function k(o){const e=o.target.value;r("#positionForm").setAttribute("label-position",e)}function q(o){const e=o.target;console.log(e.getData())}function F(o){o.preventDefault();const e=o.currentTarget;e.querySelector("output").value=`Submitted ${new FormData(e).get("username")}`}function E(o){r("#autocompleteForm").autocomplete=o.currentTarget.value}function S(){r("#customValidForm").setErrors({name:"Name is required",password:"Password is required",confimPassword:"Confirm password is required"})}function x(o){const e=o.target;u={},console.log(e.getData())}function P(){const o={};for(const e in u){const d=u[e];d&&(d in w[y]?o[e]=w[y][d]:o[e]=d)}l.setErrors(o)}function _(o){const{errors:e,all:d}=o.detail;u=d===!0?e:{...u,...e},P()}function C(o){y=o.detail.value,Object.keys(u).length&&P()}return T(()=>{V(()=>{h=r("#lform"),s(h,"submit",q),p=r("#nativeButtonForm"),s(p,"submit",F),v=r("#formAutocompleteMode"),s(v,"change",E),b=r("#customSubmit"),s(b,"click",S),l=r("#i18nForm"),g=r("#langCheck"),l.setSchemas([{key:"mobile",rules:[{rule:"required",message:"mobile_required"},{rule:"mobile",message:"mobile_invalid"}]},{key:"password",rules:[{rule:"required",message:"password_required"},{rule:o=>o.length>=6,message:"password_min6"},{rule:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,15})$/,message:"password_invalid"}]}]),s(l,"validate-error",_),s(l,"submit",x),s(g,"change",C),f=r("#positionRadio"),s(f,"change",k)})}),I(()=>{h&&c(h,"submit",q),p&&c(p,"submit",F),v&&c(v,"change",E),b&&c(b,"click",S),l&&(c(l,"validate-error",_),c(l,"submit",x)),g&&c(g,"change",C),f&&c(f,"change",k)}),(o,e)=>{const d=A("ClientOnly");return R(),D("div",null,[e[9]||(e[9]=m("",8)),a(d,null,{default:i(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="lform">
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
`)],-1)])]),_:1}),e[10]||(e[10]=m("",6)),a(d,null,{default:i(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <form id="nativeButtonForm">
    <l-input name="username" placeholder="Username" aria-label="Username" required></l-input>
    <l-button html-type="submit" type="primary">Submit</l-button>
    <l-button html-type="reset">Reset</l-button>
    <output aria-live="polite"></output>
  </form>
`)],-1)])]),_:1}),e[11]||(e[11]=m("",3)),a(d,null,{default:i(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select-ori id="formAutocompleteMode" value="on" aria-label="Default autofill setting">
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
`)],-1)])]),_:1}),e[12]||(e[12]=m("",3)),a(d,null,{default:i(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
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
`)])],-1)])]),_:1}),e[13]||(e[13]=m("",5)),a(d,null,{default:i(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div>
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
`)])],-1)])]),_:1}),e[14]||(e[14]=m("",3)),a(d,null,{default:i(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-form inner-block>
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
`)],-1)])]),_:1}),e[23]||(e[23]=m("",43))])}}});export{O as __pageData,U as default};
