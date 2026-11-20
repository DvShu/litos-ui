# Form

表单控件，自带数据域管理。包含数据录入、校验、重置以及对应样式。

## 引用

```js
import { Form, FormItem, regist } from "litos-ui";

regist([FormItem, Form]);
```

## 演示

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { $one, on, off } from 'utilane/browser';

  let $form, $nativeForm, $customSubmitBtn, $positionRadio, $i18nForm, $langCheck, $autocompleteMode;
  let $checkDataForm;
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

  function handlePositionChange(e) {
    const position = e.target.value;
    const $posform = $one('#positionForm');
    $posform.setAttribute('label-position', position);
  }

  function handleFormSubmit(event) {
    const $target = event.target;
    console.log($target.getData());
  }

  function handleNativeSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    form.querySelector('output').value = `已提交 ${new FormData(form).get('username')}`;
  }

  function handleCheckDataSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = form.querySelector('l-form').getData();
    const entries = [...new FormData(form)];
    form.querySelector('output').value = `getData(): ${JSON.stringify(data)}\nFormData: ${JSON.stringify(entries)}`;
  }

  function handleAutocompleteChange(event) {
    $one('#autocompleteForm').autocomplete = event.currentTarget.value;
  }

  function handleCustomClick() {
    const $customValidForm = $one('#customValidForm');
    $customValidForm.setErrors({
      name: '姓名不能为空',
      password: '密码不能为空',
      confimPassword: '确认密码不能为空',
    });
  }

  function handleI18nSubmit(event) {
    const $target = event.target;
    errors = {};
    console.log($target.getData());
  }

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

  function handleI18nError(event) {
    const { errors: nextErrors, all } = event.detail;
    errors = all === true ? nextErrors : { ...errors, ...nextErrors };
    setI18nErrors();
  }

  function handleLangChange(e) {
    lang = e.detail.value;
    if (Object.keys(errors).length) {
      setI18nErrors(errors);
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $form = $one('#lform');
        on($form, 'submit', handleFormSubmit);
        $nativeForm = $one('#nativeButtonForm');
        on($nativeForm, 'submit', handleNativeSubmit);
        $checkDataForm = $one('#checkDataForm');
        on($checkDataForm, 'submit', handleCheckDataSubmit);
        $autocompleteMode = $one('#formAutocompleteMode');
        on($autocompleteMode, 'change', handleAutocompleteChange);

        // 自定义验证
        $customSubmitBtn = $one('#customSubmit');
        on($customSubmitBtn, 'click', handleCustomClick);

        // 自定义验证 - 支持 i18n
        $i18nForm = $one('#i18nForm');
        $langCheck = $one("#langCheck");
        $i18nForm.setSchemas([{
          key: 'mobile',
          rules: [
            { rule: 'required', message: 'mobile_required' },
            { rule: 'mobile', message: 'mobile_invalid' },
          ]
        }, {
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

        $positionRadio = $one('#positionRadio');
        on($positionRadio, 'change', handlePositionChange);
      }
    })
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if ($form) {
        off($form, 'submit', handleFormSubmit);
      }
      if ($nativeForm) {
        off($nativeForm, 'submit', handleNativeSubmit);
      }
      if ($checkDataForm) {
        off($checkDataForm, 'submit', handleCheckDataSubmit);
      }
      if ($autocompleteMode) {
        off($autocompleteMode, 'change', handleAutocompleteChange);
      }
      if ($customSubmitBtn) {
        off($customSubmitBtn, 'click', handleCustomClick);
      }
      if ($i18nForm) {
        off($i18nForm, 'validate-error', handleI18nError);
        off($i18nForm, 'submit', handleI18nSubmit);
      }
      if ($langCheck) {
        off($langCheck, 'change', handleLangChange);
      }
      if ($positionRadio) {
        off($positionRadio, 'change', handlePositionChange);
      }
    }
  })
</script>

### 基础用法

基本的表单数据域控制展示，包含布局、初始化、验证、重置、提交。数据验证采用 [utilane/validator](https://github.com/DvShu/utilane#readme)

用户编辑字段时会校验该字段及依赖它的字段，提交时会校验整个表单。业务校验失败后，字段的 `validity.customError` 为 `true`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="lform">
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
</textarea>
</l-code-preview>
</ClientOnly>

> 1. 如果想要实现按钮之间的间隔，需要引入 `Space` 组件
> 2. 当 `Button` 在 `Form` 里面时，如果 `Button` 的 `html-type` 属性为 `reset`、`submit` 时会自动触发表单的重置、提交。

重置会恢复字段的默认值，不会把第一次程序赋值当作默认值。文本字段使用 `value` attribute 或 `defaultValue` 设置默认值；数组等复合字段通过对应控件的 `defaultValue` 设置。修改当前值后，默认值更新不会覆盖编辑内容，下一次重置才应用。

在单行 `l-input` 内按 Enter，可激活表单的第一个提交按钮。

### 原生表单

`l-button` 在原生 `<form>` 中支持点击提交和重置。使用单行 `l-input` 时，也可以按 Enter 激活提交按钮。

独立的 `l-form` 会跳过内部辅助表单的原生提交校验。放在原生 `<form>` 里时，外层按自己的 `novalidate` 和提交按钮的 `formnovalidate` 决定是否执行原生校验。发起提交的 `l-form` 执行该层的业务校验，外层自己的按钮由原生表单处理。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <form id="nativeButtonForm">
    <l-input name="username" placeholder="用户名" aria-label="用户名" required></l-input>
    <l-button html-type="submit" type="primary">提交</l-button>
    <l-button html-type="reset">重置</l-button>
    <output aria-live="polite"></output>
  </form>
</textarea>
<div class="source">
<textarea lang="html">
  <form id="nativeButtonForm">
    <l-input name="username" placeholder="用户名" aria-label="用户名" required></l-input>
    <l-button html-type="submit" type="primary">提交</l-button>
    <l-button html-type="reset">重置</l-button>
    <output aria-live="polite"></output>
  </form>
</textarea>
<textarea lang="js">
  import 'litos-ui/styles/vars.css';
  import 'litos-ui/input';
  import 'litos-ui/button';
  //-
  const form = document.querySelector('#nativeButtonForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('output').value = `已提交 ${new FormData(form).get('username')}`;
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 单选框和复选框的提交数据

点击提交可对照 `l-form.getData()` 的业务数据和原生 `FormData` 的条目。尝试勾选「订阅更新」或更改组内选项，观察空值、禁用项和同名条目的处理。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <form id="checkDataForm">
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
</textarea>
<div class="source">
<textarea lang="html">
  <form id="checkDataForm">
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
</textarea>
<textarea lang="js">
  import 'litos-ui/styles/vars.css';
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
    form.querySelector('output').value = `getData(): ${JSON.stringify(data)}\nFormData: ${JSON.stringify(entries)}`;
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 统一配置自动填充

Form 的 `autocomplete` 为表单内支持自动填充的控件及原生 `input`、`textarea`、`select` 提供默认值；单个控件显式设置时优先使用自己的配置。下例可动态切换默认值，邮箱始终保留 `email` 提示。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select-ori id="formAutocompleteMode" value="on" aria-label="自动填充默认设置">
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
</textarea>
<textarea lang="js">
  const mode = document.querySelector('#formAutocompleteMode');
  mode.addEventListener('change', () => {
    document.querySelector('#autocompleteForm').autocomplete = mode.value;
  });
</textarea>
</l-code-preview>
</ClientOnly>

移除控件的 `autocomplete` 可恢复继承。Form 未设置时沿用外层原生表单的配置，否则由浏览器决定；`off` 不保证阻止密码管理器填充，也不会赋予文件选择、开关等控件原本没有的填充能力。

### 自定义验证

对于复杂的表单，如果默认的验证不符合需求，可以通过给 `Form` 传递 `novalidate="on"` 禁用默认验证，然后手动调用 `Form` 的 `setErrors(errors: Record<string, any>)` 传递验证的错误信息即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="customValidForm" novalidate="on">
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
</textarea>
<div class="source">
<textarea lang="html">
  <l-form id="customValidForm" novalidate="on">
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
</textarea>
<textarea lang="ts">
  import { $one } from 'utilane/browser';
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 验证成功的字段，可以不传或者传递为 `undefined`、`null`
> 单独使用 FormItem 时，可通过其 `error` 属性显示错误信息；当前 FormItem 没有 `setError()` 方法。

### 验证多语言支持

```js
import { Radio, RadioGroup, regist } from "litos-ui";
regist([Radio, RadioGroup]);
```

通过自定义验证的方式，可以配置多语言支持。通过调用 `Form` 的 `setSchemas` 方法，可以设置自定义验证规则; 然后给 `Form` 设置 `emit-error` 表明验证失败后，通过 `validate-error` 自定义事件来处理，传递验证失败的数据, 然后再通过 `setErrors` 传递自定义验证数据

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div>
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
</textarea>
<div class="source">
<textarea lang="html">
  <div>
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
</textarea>
<textarea lang="ts">
  import { $one, on } from 'utilane/browser';
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 要求传递的 `key` 必须和 `FormItem` 的 `prop` 字段一致，否则不会生效
> 传递的规则里，将 `message` 定义为一个唯一性的标记，用来标识自定义验证的错误信息

### `InnerBlock`

设置 `inner-block` 能够让表单的行内元素铺满剩余宽度

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form inner-block>
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
</textarea>
</l-code-preview>
</ClientOnly>

### 行内表单

当前表单较简单时，可以在一行内放置表单。

通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form inline inner-block label-width="auto">
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
</textarea>
</l-code-preview>
</ClientOnly>

### 对齐方式

通过设置 `label-position` 来应用标签和内容的对齐方式。

您可以分别设置 `l-form-item` 的 `label-position`. 如果值为空, 则会使用 `l-form` 的 `label-position`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="positionForm" inner-block label-width="100px">
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
</textarea>
</l-code-preview>
</ClientOnly>

### 只使用 `FormItem`

`FormItem` 可以不放在 `Form` 里面，从而进行单独使用。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form-item id="form1" label="姓名">
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
</textarea>
</l-code-preview>
</ClientOnly>

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/form";
import "litos-ui/form-item";
```

在客户端显式导入每个用到的组件，包括表单内的输入控件、按钮和组选项。样式、类型和总入口用法见[按需导入](/on_demand)。

## API

### Form Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `inline` | 行内表单, 每一行放置尽量多的项 | `boolean` | `false` |
| `label-position` | 标签的位置 | `left`、`right`、`top` | `right` |
| `label-width` | 表单域标签的宽度, 可以传 `auto` | `string` | `80px` |
| `label-height` | 表单域标签的高度，数字按 px 处理，也可传 CSS 长度 | `string` | 跟随 `--l-form-control-height` |
| `inner-block` | 表单内的输入元素是否铺满剩余宽度 | `boolean` | `false` |
| `disabled` | 是否禁用表单内的控件 | `boolean` | `false` |
| `autocomplete` | 表单内控件的自动填充默认提示，控件自身配置优先；支持动态更新 | `on`、`off` | 未设置，沿用外层原生表单或浏览器默认 |
| `novalidate` | 是否跳过输入和提交时的自动业务校验 | `boolean` | `false` |
| `emit-error` | 通过 `validate-error` 上报自动校验结果，由调用方处理提示 | `boolean` | `false` |

在 `l-form-item` 上设置 `disabled`，可以单独禁用该表单项下的控件。

### Form Properties

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `disabled` | 读取或设置表单的禁用状态，赋值时同步更新 `disabled` HTML 属性 | `boolean` | `false` |
| `autocomplete` | 读取或设置自身的同名 attribute；设为 `""` 移除配置 | `"on" \| "off" \| ""` | `""` |
| `nativeForm` | 只读，当前关联的原生表单；未挂载或断开后为 `undefined` | `HTMLFormElement \| undefined` | `undefined` |
| `validationErrors` | 只读，当前展示错误的快照 | `Readonly<Record<string, string \| undefined>>` | `{}` |
| `validator` | 校验器实例，通常通过下方 Schema 方法配置规则 | `Validator`（来自 utilane） | 自动创建 |

### Form Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 表单项 |

### Form Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `submit` | 表单提交事件，detail 为表单数据 | `(e: CustomEvent): void` |
| `validate-error` | `emit-error` 开启时上报校验结果。`detail.all` 为 `true` 时替换整表错误，为字段名数组时合并 `detail.errors`，值为 `undefined` 的字段已通过 | `(e: CustomEvent): void` |

开启 `emit-error` 后，提交失败的整表事件会包含业务错误和已触发且尚未解决的原生约束错误。同一字段优先报告业务错误。动态开启时，已有的原生错误改由事件上报。关闭后，尚未解决的原生错误恢复内置提示。

### Form Methods

自定义规则函数使用同步布尔返回值。返回 Promise 会使该字段校验失败。程序修改值后，可调用 `validateField()` 重新校验指定字段。

`getData()` 同步读取已关联字段的当前值。程序赋值后可以立即读取，用户 `input` 或 `change` 回调也可以直接读取。它保留禁用字段和原有业务值，同名字段取 DOM 顺序最后一个。每次调用返回新的顶层对象，组件业务对象仍保留原引用。

原生控件按实际类型读取。复选框返回布尔值，单选框返回选中项的值，多选下拉返回字符串数组，文件输入返回 `File`、`File[]` 或 `null`，其他文本值保留为字符串。独立 `l-form` 可用 `form` 属性关联同一 DOM 树中的外置控件，目标 ID 从 `lForm.nativeForm.id` 取得。多个 `l-form` 共用外层原生表单时，每个 `getData()` 读取自己范围内的控件。

`l-radio` 和 `l-checkbox` 的值按下表读取。分组时使用组的字段名。参见[提交数据演示](#单选框和复选框的提交数据)。

<!-- prettier-ignore -->
| 控件 | `l-form.getData()` | 原生 `FormData` |
| --- | --- | --- |
| 独立 Radio／Checkbox | 保留选项 `value`，包括未勾选或禁用时 | 仅提交已勾选且可用的选项。Checkbox 的半选状态独立于是否勾选 |
| RadioGroup | 返回匹配的选项值，包括禁用项。无匹配时为 `null` | 提交匹配且可用的选项值。匹配空字符串选项时提交 `""` |
| CheckboxGroup | 返回匹配值的编码字符串，包括禁用项。无匹配时为 `""`，仅匹配空值选项时为 `&` | 每个已选且可用的值各生成一条同名条目 |

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `validate` | 校验全部数据，结果通过 Promise 返回 | `() => Promise<{ result: boolean; errors: Record<string, any> }>` |
| `getData` | 返回当前字段值的浅快照 | `() => Record<string, any>` |
| `validateField` | 校验指定字段。成功时 resolve，失败时 reject，错误对象的 `detail` 包含字段错误 | `(field: string \| string[]) => Promise<void>` |
| `clearValidate` | 清除错误提示和交互状态，保留字段的实际有效性 | `() => void` |
| `reset` | 触发关联原生表单的重置；未取消时恢复默认值并清理提示，共用表单时其他字段也会重置 | `() => void` |
| `submit` | 执行业务提交，校验通过后触发 `submit`；`novalidate` 时跳过自动业务校验 | `() => void` |
| `setErrors` | 替换当前展示错误；无错误的项可省略或传 `undefined`／`null`，传 `{}` 清空 | `(errors: Record<string, any>) => void` |
| `setValidateErrors` | `emit-error` 开启时触发 `validate-error` 并传入 `errors`、`all`；否则同 `setErrors()`。`all` 默认 `true` | `(errors: Record<string, string \| undefined>, all?: string \| string[] \| boolean) => void` |
| `setSchemas` | 替换整组校验规则 | `(schemas: SchemaType[]) => void` |
| `setSchema` | 替换指定 `key` 的校验规则，保留其他字段规则 | `(schema: SchemaType) => void` |
| `addSchemas` | 批量追加规则，同名 `key` 的规则累加 | `(schemas: SchemaType[]) => void` |
| `addSchema` | 追加单个字段的规则，同名 `key` 的规则累加 | `(schema: SchemaType) => void` |

### SchemaType

`SchemaType`、`RuleType` 可从 `utilane` 导入。`RuleType` 支持内置规则字符串、正则表达式、同步布尔函数，以及 `{ rule, message }` 对象。

<!-- prettier-ignore -->
| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | 字段名，与控件的 `name` 或 FormItem 的 `prop` 对应 | `string` | 必填 |
| `required` | 是否启用必填校验 | `boolean` | `false` |
| `rules` | 按顺序执行的校验规则 | `RuleType[]` | `[]` |
| `message` | 未单独指定规则消息时使用的错误提示 | `string` | 使用校验器默认提示 |

### FormItem Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 标签文本 | `string` | - |
| `verify` | 内置验证规则:`required`-必填,`same:password`-一般用于验证确认密码,`mobile`-验证电话号码 | `string` | - |
| `pattern` | 正则表达式 | `string` | - |
| `validity` | 验证失败时的提示信息 | `string` | - |
| `prop` | 对应表单域 `name` | `string` | - |
| `label-position` | 标签的位置，局部设置时覆盖 Form 配置 | `left`、`right`、`top` | 继承 Form，独立使用为 `right` |
| `label-width` | 标签宽度，局部设置时覆盖 Form 配置 | `string` | 继承 Form，独立使用为 `auto` |
| `label-height` | 标签高度，局部设置时覆盖 Form 配置 | `string` | 继承 Form 或 `--l-form-control-height` |
| `required` | 是否必填 | `boolean` | `false` |
| `disabled` | 是否禁用该表单项下的表单组件 | `boolean` | `false` |
| `inner-block` | 表单内的输入元素是否铺满剩余宽度；显式 `false` 可覆盖 Form 配置 | `boolean` | 继承 Form |
| `error` | 错误提示 | `string` | `-` |

更改 `required`、`verify`、`pattern` 或 `validity` HTML 属性后，表单项按更新后的属性配置校验。

点击单控件行的标签，可聚焦原生输入控件或 `l-input`、`l-input-number` 等内部只有一个输入控件的组件。多控件行的 `label` 用作分组名称，请为各字段分别提供原生标签、`aria-label` 或 `aria-labelledby`。

### FormItem Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 表单项 |

### FormItem Events

FormItem 当前没有单独派发 focus 或 blur 自定义事件。需要监听输入焦点时，在具体输入控件上绑定相应的原生事件。

### FormItem Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `setRules` | 替换当前 `prop` 的业务规则；重复调用不累加旧规则 | `(config: { required?: boolean; rules?: RuleType[]; message?: string }) => void` |

### 表单控件通用 API

以下 API 适用于 Input、MdInput、InputNumber、Select、SelectOri、Radio、Checkbox、两种 Group、Switch、ColorPicker 和日期控件。具体值类型以各控件文档为准；Upload 的文件列表通过自身 API 管理。

#### Attributes

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 字段名，未单独设置时可继承 FormItem 的 `prop` | `string` | 未设置 |
| `form` | 关联的原生 `<form>` 的 ID，显式配置优先 | `string` | 自动关联 |
| `value` | 重置默认值；当前值尚未被修改时同步到当前值 | `string` | 由控件决定 |
| `disabled` | 控件自身的禁用状态，Form、FormItem 或 Group 也可提供禁用配置 | `boolean` | `false` |
| `required` | 原生必填约束，具体空值规则由控件决定 | `boolean` | `false` |
| `autocomplete` | 浏览器填充提示；控件未单独设置时继承 Form 默认值 | `string` | 未设置 |
| `inner-block` | 宽度是否铺满，支持此布局的控件可局部覆盖上级配置 | `boolean` | 继承上级配置 |
| `readonly` | 只读约束，仅对支持只读的输入类型生效 | `boolean` | `false` |
| `pattern` | 文本格式约束，仅对支持该约束的输入类型生效 | `string` | 未设置 |
| `minlength`、`maxlength` | 文本长度约束 | `number` | 未设置 |
| `min`、`max`、`step` | 数值或日期约束，按控件类型生效 | `number` 或 `string` | 未设置 |

Radio／Checkbox 的选中默认值使用 `checked`，当前选中状态使用实例的 `checked` property；`value` 是选项值。

#### Properties

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `value` | 读取或设置当前业务值 | 由控件决定 |
| `defaultValue` | 读取或设置重置默认值，与 `value` attribute 同步 | 由控件决定 |
| `name` | 读取或设置字段名；设为 `undefined` 恢复继承 | `string \| undefined` |
| `disabled` | 读取或设置自身的禁用配置 | `boolean` |
| `autocomplete` | 读取或设置自身的同名 attribute；设为 `""` 移除配置 | `string` |
| `form` | 只读，实际关联的原生表单 | `HTMLFormElement \| null` |
| `labels` | 只读，关联到控件的原生标签 | `NodeList` |
| `validity` | 只读，当前原生有效性状态 | `ValidityState` |
| `validationMessage` | 只读，当前原生验证提示 | `string` |
| `willValidate` | 只读，当前是否参与原生约束校验 | `boolean` |

#### Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `getValue` | 读取当前业务值 | `() => any` |
| `setValue` | 设置当前业务值 | `(value: any) => void` |
| `getName` | 读取当前字段名 | `() => string \| undefined` |
| `setDisabled` | 设置控件自身的禁用配置 | `(disabled: boolean) => void` |
| `isDisabled` | 读取合并自身和上级配置后的有效禁用状态 | `() => boolean` |
| `checkValidity` | 检查当前原生有效性并返回结果 | `() => boolean` |
| `reportValidity` | 检查当前原生有效性并请求浏览器显示提示 | `() => boolean` |
| `setValidity` | 设置手动有效性，传 `{}` 清除手动错误；无效标志需配合非空消息 | `(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement) => void` |
| `reset` | 将当前控件恢复到默认值 | `() => void` |

程序设置值不会触发用户 `input`／`change` 事件。业务规则通过 Form 的 `validate()` 或 `validateField()` 执行。

### Form CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-form-gap` | 表单项间距 | `20px` |
| `--l-form-label-width` | 标签宽度，也可通过 `label-width` 设置 | Form 为 `80px`；独立 FormItem 为 `auto` |
| `--l-form-label-height` | 标签高度，也可通过 `label-height` 设置 | `var(--l-form-control-height, 32px)` |
| `--l-form-label-align` | 标签文字对齐方式 | `right`，随 `label-position` 调整 |
| `--l-form-control-height` | 未指定标签高度时的基础高度 | `40px`（引入 vars.css 后；组件回退为 `32px`） |