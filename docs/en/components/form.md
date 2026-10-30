# Form

A form with field management, data entry, validation, reset behavior, and layout styles.

## Import and Registration

```js
import { Form, FormItem, regist } from "litos-ui";

regist([FormItem, Form]);
```

## Examples

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { $one, on, off } from 'utilane/browser';

  let $form, $customSubmitBtn, $positionRadio, $i18nForm, $langCheck;
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

  function handlePositionChange(e) {
    const position = e.target.value;
    const $posform = $one('#positionForm');
    $posform.setAttribute('label-position', position);
  }

  function handleFormSubmit(event) {
    const $target = event.target;
    console.log($target.getData());
  }

  function handleCustomClick() {
    const $customValidForm = $one('#customValidForm');
    $customValidForm.setErrors({
      name: 'Name is required',
      password: 'Password is required',
      confimPassword: 'Confirm password is required',
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
    const detail = event.detail;
    const errs = detail.errors;
    if (detail.all === true) {
      errors = errs;
    }
    setI18nErrors(errs);
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

        // Custom validation
        $customSubmitBtn = $one('#customSubmit');
        on($customSubmitBtn, 'click', handleCustomClick);

        // Custom validation with localization
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

### Basic Usage

```js
import { Space, Button, Input, regist } from "litos-ui";
regist([Space, Button, Input]);
```

A basic form with layout, initialization, validation, reset, and submission. Validation uses [utilane/validator](https://github.com/DvShu/utilane#readme)

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="lform">
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
</textarea>
</l-code-preview>
</ClientOnly>

> 1. Use the Space component to add spacing between buttons.
> 2. Inside Form, a Button with `html-type="reset"` or `html-type="submit"` triggers form reset or submission.

### Custom Validation

For custom validation, set `novalidate="on"` to disable validation on submission, then call `setErrors(errors: Record<string, any>)` to supply error messages.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="customValidForm" novalidate="on">
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
</textarea>
<div class="source">
<textarea lang="html">
  <l-form id="customValidForm" novalidate="on">
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
</textarea>
<textarea lang="ts">
  import { $one } from 'utilane/browser';
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Omit valid fields, or pass undefined or null for them.
> For standalone FormItem usage, set its `error` attribute to display a message. There is no `setError()` method on FormItem.

### Localized Validation

The example defaults to English and retains Chinese messages under the `zh` key to demonstrate language switching. This translates validation messages supplied by the page; it does not change built-in component messages.

```js
import { Radio, RadioGroup, regist } from "litos-ui";
regist([Radio, RadioGroup]);
```

Configure custom validation rules with `setSchemas()` to provide localized messages. Enable `emit-error` to receive validation failures through `validate-error`, translate the error identifiers, then pass the messages to `setErrors()`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div>
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
</textarea>
<div class="source">
<textarea lang="html">
  <div>
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
</textarea>
<textarea lang="ts">
  import { $one, on } from 'utilane/browser';
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> Each schema key must match a FormItem prop.
> Use unique message identifiers in the rules so they can be mapped to localized error messages.

### `InnerBlock`

Enable `inner-block` to let form controls fill the remaining width.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form inner-block>
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
</textarea>
</l-code-preview>
</ClientOnly>

### Inline Form

Place a simple form on a single row.

Enable `inline` to arrange form fields inline.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form inline inner-block label-width="auto">
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
</textarea>
</l-code-preview>
</ClientOnly>

### Label Alignment

Set `label-position` to control label alignment relative to the content.

Set `label-position` on individual form items to override the form setting. When it is empty, the form’s label position is used.

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
</textarea>
</l-code-preview>
</ClientOnly>

### Standalone FormItem

FormItem can be used on its own, outside Form.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form-item id="form1" label="Name">
    <l-input placeholder="Enter text"></l-input>
  </l-form-item>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/form";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Form Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `inline` | Inline form; arrange as many items as possible on each row | `boolean` | `false` |
| `label-position` | Label position | `left`, `right`, `top` | `right` |
| `label-width` | Field label width; accepts auto | `string` | `80px` |
| `inner-block` | Whether controls fill the remaining width | `boolean` | `false` |
| `novalidate` | Whether to disable validation on submission | `boolean` | `false` |

Form and FormItem do not provide a shared disabled attribute. Configure disabled on each input control.

### Form Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Form item |

### Form Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter |
| --- | --- | --- |
| `submit` | Fires on submission; detail contains the form data | `(e: CustomEvent): void` |
| `validate-error` | Reports validation errors when emit-error is enabled; detail contains errors and all | `(e: CustomEvent): void` |

### Form Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `validate` | Validates all data and returns a Promise with the result | `() => Promise<{ result: boolean; errors: Record<string, any> }>` |
| `validateField` | Does not currently apply field validation rules; use validate for full validation | `(field: string \| string[]) => Promise<void>` |
| `clearValidate` | Clears validation results from form items | `() => void` |
| `setErrors(errors: Record<string, string>)` | Sets form error messages | - |

### FormItem Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Label text | `string` | - |
| `verify` | Built-in rules: required, same:password (password confirmation), and mobile (phone number) | `string` | - |
| `pattern` | Regular expression | `string` | - |
| `validity` | Message displayed on validation failure | `string` | - |
| `prop` | Field key used to identify the form value | `string` | - |
| `label-position` | Label position | `left`, `right`, `top` | `right` |
| `required` | Whether the field is required | `boolean` | `false` |
| `inner-block` | Whether controls fill the remaining width | `boolean` | `false` |
| `error` | Error message | `string` | `-` |

### FormItem Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Form item |

### FormItem Events

FormItem does not emit custom focus or blur events. Listen for the corresponding native events on the input control.

### Form CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| - | - | - |