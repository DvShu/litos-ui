# Form

表单控件，自带数据域管理。包含数据录入、校验、重置以及对应样式。

## 引用

```js
import { Form, FormItem, regist, Space } from "litos-ui";

regist([Form, FormItem]);
regist([Space]); // 表单按钮组的间距
```

## 演示

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { $one, on, off } from 'ph-utils/dom';

  function handlePositionChange(e) {
    const position = e.target.value;
    const $form = $one('#positionForm');
    $form.setAttribute('label-position', position);
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        const $form = $one('#lform');
        $form.addEventListener('submit', (event) => {
          const $target = event.target;
          console.log($target.getData());
        });

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
        

        const $positionRadio = $one('#positionRadio');
        on($positionRadio, 'change', handlePositionChange);
      }
    })
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      const $positionRadio = $one('#positionRadio');
      if ($positionRadio) {
        off($positionRadio, 'change', handlePositionChange);
      }
    }
  })
</script>

### 基础用法

基本的表单数据域控制展示，包含布局、初始化、验证、重置、提交。数据验证采用 [ph-utils/validator](https://gitee.com/towardly/ph/wikis/utils/validator)

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="lform">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
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

### 自定义验证

对于复杂的表单，如果默认的验证不符合需求，可以通过给 `Form` 传递 `novalidate="on"` 禁用默认验证，然后手动调用 `Form` 的 `setErrors(errors: Reocord<string, any>)` 传递验证的错误信息即可。

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
  import { $one } from 'ph-utils/dom';
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
> 当然也可以手动验证数据，然后分别调用输入框以及 `FormItem` 的 `setError({})` 方法设置错误

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
  <l-form-item id="form1" label="姓名" inner-block>
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Form Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `inline` | 行内表单, 每一行放置尽量多的项 | `boolean` | `false` |
| `label-position` | 标签的位置 | `left`、`right`、`top` | `right` |
| `label-width` | 表单域标签的宽度, 可以传 `auto` | `string` | `80px` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `inner-block` | 表单内的输入元素是否铺满剩余宽度 | `boolean` | `false` |
| `novalidate` | 是否在提交时禁用表单验证 | `boolean` | `false` |

### Form Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 表单项 |

### Form Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `submit` | 表单提交事件 | `(e: Event): void` |

### Form Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `validate` | 对整个表单进行校验的方法 | `() => void` |
| `validateField` | 对部分表单字段进行校验的方法 | `(props: string | string[]) => void` |
| `clearValidate` | 移除表单项的校验结果 | `() => void` |
| `setErrors(errors: Record<string, string>)` | 设置表单错误信息 | - |

### FormItem Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 标签文本 | `string` | - |
| `verify` | 内置验证规则:`required`-必填,`same:password`-一般用于验证确认密码,`mobile`-验证电话号码 | `string` | - |
| `pattern` | 正则表达式 | `string` | - |
| `validity` | 验证失败时的提示信息 | `string` | - |
| `prop` | 对应表单域 `name` | `string` | - |
| `label-position` | 标签的位置 | `left`、`right`、`top` | `right` |
| `required` | 是否必填 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `inner-block` | 表单内的输入元素是否铺满剩余宽度 | `boolean` | `false` |

### FormItem Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 表单项 |

### FormItem Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `blur` | 在 Input 失去焦点时触发 | `(e: Event): void` |
| `focus` | 在 Input 获得焦点时触发 | `(e: Event

### Form CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |