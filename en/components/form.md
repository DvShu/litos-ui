---
url: https://dvshu.github.io/litos-ui/en/components/form.md
---
# Form

A form with field management, data entry, validation, reset behavior, and layout styles.

## Import and Registration

```js
import { Button, Form, FormItem, Input, Space, regist } from "litos-ui";

regist([FormItem, Form, Input, Button, Space]);
```

## Examples

### Basic Usage

A basic form with layout, default values, validation, reset, and submission. Validation uses [utilane/validator](https://github.com/DvShu/utilane#readme).

Editing a field validates it and any fields that depend on it. Submission validates the entire form. A failed business rule sets the field's `validity.customError` to `true`.

```html
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
```

> 1. Use the Space component to add spacing between buttons.
> 2. Inside Form, a Button with `html-type="reset"` or `html-type="submit"` triggers form reset or submission.

Use the `value` attribute or `defaultValue` property to set the value restored on reset. For composite fields such as arrays, use the control's `defaultValue`. Once the current value has changed, updating the default preserves the current edit until the next reset. The first assignment to the `value` property only sets the current value.

Press Enter in a single-line `l-input` to activate the form's first submit button.

### Native Forms

`l-button` can submit or reset a native `<form>`. Pressing Enter in a single-line `l-input` can also activate its submit button.

Standalone `l-form` skips browser constraint validation on submit and runs its business validation. When it sits inside a native `<form>`, the browser checks constraints according to that form's `novalidate` attribute and the submit button's `formnovalidate` attribute. The `l-form` that starts submission runs its own business rules. The browser handles submissions from the outer form's own buttons.

```html
  <form id="nativeButtonForm">
    <l-input name="username" placeholder="Username" aria-label="Username" required></l-input>
    <l-button html-type="submit" type="primary">Submit</l-button>
    <l-button html-type="reset">Reset</l-button>
    <output aria-live="polite"></output>
  </form>
```

### Form-wide Autofill

Form's `autocomplete` supplies a default for supported controls and native `input`, `textarea`, and `select` elements within the form. Change the default below to see the fields inherit it while the email field keeps its own `email` hint.

Register `SelectOri` and `MdInput` alongside the basic form components to use this example.

```html
  <l-select-ori id="formAutocompleteMode" value="on" aria-label="Default autofill setting">
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
```

```js
  const mode = document.querySelector('#formAutocompleteMode');
  mode.addEventListener('change', () => {
    document.querySelector('#autocompleteForm').autocomplete = mode.value;
  });
```

Remove a field's `autocomplete` attribute to restore inheritance. When Form leaves it unset, it uses the setting from the surrounding native form, if available. The browser controls whether to offer autofill. Password managers can still fill fields with `off`, and autofill applies only to controls that already support it.

### Custom Validation

Set `novalidate` to skip automatic business validation on input and submission. Use `setErrors()` to display your own errors.

```html
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
```

```ts
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
```

> Omit valid fields, or pass undefined or null for them.
> For standalone FormItem usage, set its `error` attribute to display a message. There is no `setError()` method on FormItem.

### Localized Validation

The example defaults to English and retains Chinese messages under the `zh` key to demonstrate language switching. This translates validation messages supplied by the page; it does not change built-in component messages.

```js
import { Radio, RadioGroup, regist } from "litos-ui";
regist([Radio, RadioGroup]);
```

Configure custom validation rules with `setSchemas()` to provide localized messages. Enable `emit-error` to receive validation failures through `validate-error`, translate the error identifiers, then pass the messages to `setErrors()`.

```html
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
```

```ts
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
```

> Each schema key must match the field's `name`. If the control inherits its name from FormItem, use that item's `prop`.
> Use unique message identifiers in the rules so they can be mapped to localized error messages.

### `InnerBlock`

Enable `inner-block` to let form controls fill the remaining width.

```html
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
```

### Inline Form

Place a simple form on a single row.

Enable `inline` to arrange form fields inline.

```html
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
```

### Label Alignment

Set `label-position` to control label alignment relative to the content.

Set `label-position` on individual form items to override the form setting. When it is empty, the form’s label position is used.

```html
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
```

### Standalone FormItem

FormItem can be used on its own, outside Form.

```html
  <l-form-item id="form1" label="Name">
    <l-input placeholder="Enter text"></l-input>
  </l-form-item>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/form";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](https://dvshu.github.io/litos-ui/en/on_demand.md) for styles, child elements, types and root-entry compatibility.

## API

### Form Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `inline` | Inline form; arrange as many items as possible on each row | `boolean` | `false` |
| `label-position` | Label position | `left`, `right`, `top` | `right` |
| `label-width` | Field label width; accepts auto | `string` | `80px` |
| `label-height` | Field label height. Accepts a CSS length or a number in pixels | `string` | Follows `--l-form-control-height` |
| `inner-block` | Whether controls fill the remaining width | `boolean` | `false` |
| `disabled` | Disables the form's controls | `boolean` | `false` |
| `autocomplete` | Default autofill hint for controls without their own setting. Can change at runtime | `on`, `off` | Not set. Uses the surrounding native form setting or the browser default |
| `novalidate` | Skips automatic business validation on input and submission | `boolean` | `false` |
| `emit-error` | Reports automatic validation results through `validate-error` so the caller can display errors | `boolean` | `false` |

Set `disabled` on `l-form-item` to disable only the controls in that item.

### Form Properties

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `disabled` | Reads or sets the form's disabled state and reflects it to the HTML attribute | `boolean` | `false` |
| `autocomplete` | Reads or sets the form's own attribute. Assign `""` to remove it | `"on" \| "off" \| ""` | `""` |
| `nativeForm` | Read-only. The associated native form, or `undefined` before mounting or after disconnecting | `HTMLFormElement \| undefined` | `undefined` |
| `validationErrors` | Read-only snapshot of the errors currently displayed | `Readonly<Record<string, string \| undefined>>` | `{}` |
| `validator` | Validator instance. Use the schema methods below to configure rules | `Validator` from utilane | Created automatically |

### Form Slots

| Name | Description |
| --- | --- |
| `default` | Form item |

### Form Events

| Event | Description | Callback parameter |
| --- | --- | --- |
| `submit` | Fires on submission. `event.detail` contains the form data | `(e: CustomEvent): void` |
| `validate-error` | Reports validation results when `emit-error` is enabled. Replace all errors if `event.detail.all` is `true`, or merge `event.detail.errors` for the specified fields when it is an array of names. An `undefined` entry indicates that the field passed validation | `(e: CustomEvent): void` |

### Form Methods

Custom rule functions return a boolean synchronously. Returning a Promise causes the field to fail validation. Call `validateField()` to revalidate specific fields after setting a value in code.

`getData()` reads the current values of associated fields synchronously. You can read them immediately after assigning a value or from an `input` or `change` handler. It includes disabled fields, keeps their original business values, and uses the last control in DOM order when several share a name. Each call returns a new top-level object and preserves references to field values.

Native checkboxes return booleans, radio buttons return the selected value, and multiple selects return string arrays. File inputs return `File`, `File[]`, or `null`. Other text inputs return strings. To associate a control outside a standalone `l-form`, set its `form` attribute to `lForm.nativeForm.id`. Both elements must be in the same DOM tree. When multiple `l-form` elements share a surrounding native form, each `getData()` call reads its own controls.

| Method | Description | Type |
| --- | --- | --- |
| `validate` | Validates all data and returns a Promise with the result | `() => Promise<{ result: boolean; errors: Record<string, any> }>` |
| `getData` | Returns a shallow snapshot of the current field values | `() => Record<string, any>` |
| `validateField` | Validates the specified fields. Resolves on success and rejects with field errors in `error.detail` on failure | `(field: string \| string[]) => Promise<void>` |
| `clearValidate` | Clears displayed errors and interaction state while preserving field validity | `() => void` |
| `reset` | Triggers a reset on the associated native form. If the reset proceeds, defaults are restored and error messages are cleared. Other controls that share the form also reset | `() => void` |
| `submit` | Runs business validation and emits `submit` on success. With `novalidate`, it skips automatic business validation | `() => void` |
| `setErrors` | Replaces the displayed errors. Omit entries for valid fields or set them to `undefined` or `null`. Pass `{}` to clear all displayed errors | `(errors: Record<string, any>) => void` |
| `setValidateErrors` | With `emit-error`, emits `validate-error` with `errors` and `all`. Otherwise behaves like `setErrors()`. `all` defaults to `true` | `(errors: Record<string, string \| undefined>, all?: string \| string[] \| boolean) => void` |
| `setSchemas` | Replaces the entire set of validation rules | `(schemas: SchemaType[]) => void` |
| `setSchema` | Replaces the validation rules for the specified `key` and keeps other fields' rules | `(schema: SchemaType) => void` |
| `addSchemas` | Appends rules for multiple fields. Rules for the same `key` are cumulative | `(schemas: SchemaType[]) => void` |
| `addSchema` | Appends rules for one field. Rules for the same `key` are cumulative | `(schema: SchemaType) => void` |

### SchemaType

Import `SchemaType` and `RuleType` from `utilane`. A `RuleType` can be a built-in rule string, a regular expression, a synchronous boolean function, or a `{ rule, message }` object.

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `key` | Field name matching the control's `name` or FormItem's `prop` | `string` | Required |
| `required` | Enables required validation | `boolean` | `false` |
| `rules` | Validation rules in execution order | `RuleType[]` | `[]` |
| `message` | Error message used when a rule provides none | `string` | Validator's default message |

### FormItem Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Label text | `string` | - |
| `verify` | Built-in rules: required, same:password (password confirmation), and mobile (phone number) | `string` | - |
| `pattern` | Regular expression | `string` | - |
| `validity` | Message displayed on validation failure | `string` | - |
| `prop` | Field key used to identify the form value | `string` | - |
| `label-position` | Label position. Overrides the Form setting when set | `left`, `right`, `top` | Inherited from Form, or `right` when standalone |
| `label-width` | Label width. Overrides the Form setting when set | `string` | Inherited from Form, or `auto` when standalone |
| `label-height` | Label height. Overrides the Form setting when set | `string` | Inherited from Form or `--l-form-control-height` |
| `required` | Whether the field is required | `boolean` | `false` |
| `disabled` | Disables the controls in this form item | `boolean` | `false` |
| `inner-block` | Whether controls fill the remaining width. Explicit `false` overrides Form | `boolean` | Inherited from Form |
| `error` | Error message | `string` | `-` |

Changing `required`, `verify`, `pattern`, or `validity` updates the FormItem's validation settings.

Clicking the label focuses a native control or a component with one internal input, such as `l-input` or `l-input-number`. When a FormItem contains several controls, `label` names the group. Give each field a native label, `aria-label`, or `aria-labelledby`.

### FormItem Slots

| Name | Description |
| --- | --- |
| `default` | Form item |

### FormItem Events

FormItem does not emit custom focus or blur events. Listen for the corresponding native events on the input control.

### FormItem Methods

| Method | Description | Type |
| --- | --- | --- |
| `setRules` | Replaces the business rules for the current `prop` on each call | `(config: { required?: boolean; rules?: RuleType[]; message?: string }) => void` |

### Common Form Control APIs

These APIs apply to Input, MdInput, InputNumber, Select, SelectOri, Radio, Checkbox, both group types, Switch, ColorPicker, and the date controls. See each control's page for its value types. Upload manages its file list through its own API.

#### Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Field name. Can inherit FormItem's `prop` when unset | `string` | Not set |
| `form` | ID of the associated native `<form>`. An explicit ID takes precedence | `string` | Associated automatically |
| `value` | Default restored on reset. Also updates the current value until it is edited or assigned | `string` | Depends on the control |
| `disabled` | The control's own disabled state. Form, FormItem, or a group can also disable it | `boolean` | `false` |
| `required` | Native required constraint. What counts as empty depends on the control | `boolean` | `false` |
| `autocomplete` | Browser autofill hint. Inherits the Form default when unset | `string` | Not set |
| `inner-block` | Whether the control fills the remaining width. Controls that support this layout can override the inherited setting | `boolean` | Inherited |
| `readonly` | Read-only constraint for input types that support it | `boolean` | `false` |
| `pattern` | Text format constraint for input types that support it | `string` | Not set |
| `minlength`, `maxlength` | Text length constraints | `number` | Not set |
| `min`, `max`, `step` | Numeric or date constraints, depending on the control type | `number` or `string` | Not set |

For Radio and Checkbox, the `checked` attribute sets the default selection and the `checked` property holds the current selection. `value` is the option's value.

#### Properties

| Name | Description | Type |
| --- | --- | --- |
| `value` | Reads or sets the current business value | Depends on the control |
| `defaultValue` | Reads or sets the reset value and reflects the `value` attribute | Depends on the control |
| `name` | Reads or sets the field name. Assign `undefined` to restore inheritance | `string \| undefined` |
| `disabled` | Reads or sets the control's own disabled setting | `boolean` |
| `autocomplete` | Reads or sets the control's own attribute. Assign `""` to remove it | `string` |
| `form` | Read-only. The associated native form | `HTMLFormElement \| null` |
| `labels` | Read-only. Native labels associated with the control | `NodeList` |
| `validity` | Read-only. Current native validity state | `ValidityState` |
| `validationMessage` | Read-only. Current native validation message | `string` |
| `willValidate` | Read-only. Whether the control participates in native constraint validation | `boolean` |

#### Methods

| Method | Description | Type |
| --- | --- | --- |
| `getValue` | Reads the current business value | `() => any` |
| `setValue` | Sets the current business value | `(value: any) => void` |
| `getName` | Reads the current field name | `() => string \| undefined` |
| `setDisabled` | Sets the control's own disabled setting | `(disabled: boolean) => void` |
| `isDisabled` | Reads the effective disabled state after combining local and inherited settings | `() => boolean` |
| `checkValidity` | Checks native validity and returns the result | `() => boolean` |
| `reportValidity` | Checks native validity and asks the browser to display its message | `() => boolean` |
| `setValidity` | Sets validity manually. Pass `{}` to clear manual errors. An invalid flag requires a nonempty message | `(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement) => void` |
| `reset` | Restores the control's default value | `() => void` |

Setting values in code does not emit user `input` or `change` events. Call Form's `validate()` or `validateField()` to run business rules.

### Form CSS Variables

| Name | Description | Default |
| --- | --- | --- |
| `--l-form-gap` | Spacing between form items | `20px` |
| `--l-form-label-width` | Label width. Also settable with `label-width` | `80px` for Form, `auto` for a standalone FormItem |
| `--l-form-label-height` | Label height. Also settable with `label-height` | `var(--l-form-control-height, 32px)` |
| `--l-form-label-align` | Label text alignment | `right`, adjusted by `label-position` |
| `--l-form-control-height` | Base height when no label height is set | `40px` with vars.css, `32px` component fallback |
