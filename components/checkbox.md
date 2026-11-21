---
url: https://dvshu.github.io/litos-ui/components/checkbox.md
---
# Checkbox 复选框

在一组备选项中进行多选。适用提醒用户勾选场景，突出多选框选项，可以有效增加用户识别度。

## 引用

```js
import { Checkbox, regist, CheckboxGroup } from "litos-ui";

regist([Checkbox, CheckboxGroup]);
```

## 演示

### 基础用法

使用当只有一个选项时，可以直接 `checked` 绑定 `boolean` 值来控制是否选中；使用默认插槽来重写选项的文字。

```html
  <l-checkbox checked>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
```

### 禁用状态

使用 `disabled` 属性来禁用复选框。

```html
  <l-checkbox disabled checked>禁用</l-checkbox>
```

### 多选框组

使用 `l-checkbox-group` 的 `value` 设置选中项。组内选项的 `checked` 可读取当前状态。原生表单和 `l-form.getData()` 都过滤无匹配的值。没有任何匹配时，原生表单省略该字段，`getData()` 中的组值为空字符串。参见 [Form 提交数据演示](https://dvshu.github.io/litos-ui/components/form.md#%E5%8D%95%E9%80%89%E6%A1%86%E5%92%8C%E5%A4%8D%E9%80%89%E6%A1%86%E7%9A%84%E6%8F%90%E4%BA%A4%E6%95%B0%E6%8D%AE)。

```html
  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="SH">上海</l-checkbox>
  </l-checkbox-group>
```

> 注意：传递给 `l-checkbox-group` 的 `value` 为多选值的每一项 `encodeURIComponent` 后拼接 `&`

原生表单为复选组的每个选中值生成同名条目。选中值只对应禁用选项时，提交会省略它。

### 按钮样式

只需要为 `l-checkbox` 设置 `button` 属性，即可将复选框变为按钮样式

```html
  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
```

### 中间状态

设置 `indeterminate` 属性，表示不确定状态，一般用于实现部分选中的状态。

```html
  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
```

```ts
  import { $one, on, off } from 'utilane/browser';
  //-
  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // 全选
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // 全不选
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // 部分选中
    }
  }
  //-
  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // 全选
    } else {
      $group.value = ''; // 全不选
    }
  }
  //-
  const $group = $one('#group');
  const $allCheck = $one('#check-all');
  //-
  on($group, 'change', handleGroupChange);
  on($allCheck, 'change', handleAllCheckChange);
  // 页面关闭时移除事件
  // off($group, 'change', handleGroupChange);
  // off($allCheck, 'change', handleAllCheckChange);
```

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/checkbox";
import "litos-ui/checkbox-group";
```

在客户端显式导入每个用到的组件。使用 `l-checkbox-group` 时，组和 `l-checkbox` 选项各自导入。样式、类型和总入口用法见[按需导入](https://dvshu.github.io/litos-ui/on_demand.md)。

## API

### Checkbox Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | value | `string` | `-` |
| `checked` | 是否选中 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `button` | 是否为按钮样式 | `boolean` | `false` |
| `indeterminate` | 是否为中间状态 | `boolean` | `false` |
| `name` | 原生属性 | `string` | `-` |
| `label` | 显示的标签 | `string` | `-` |

### Checkbox Properties

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `checked` | 当前选中状态 | `boolean` |
| `defaultChecked` | 重置默认选中状态，与 `checked` attribute 同步 | `boolean` |

字段名、默认值和有效性等通用属性见 [表单控件通用 API](https://dvshu.github.io/litos-ui/components/form.md#%E8%A1%A8%E5%8D%95%E6%8E%A7%E4%BB%B6%E9%80%9A%E7%94%A8-api)。

### CheckboxGroup Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 逐项用 `encodeURIComponent` 编码后以 `&` 拼接。仅选中空值项时为 `&`，未选中时为空字符串 | `string` | 未设置 |
| `name` | 组的表单字段名 | `string` | 未设置 |
| `disabled` | 禁用组内全部选项 | `boolean` | `false` |
| `required` | 至少有一个可提交的选中值时通过必填校验 | `boolean` | `false` |
| `gap` | 选项间距，数字按 px 处理 | `string` | `0px` |
| `form` | 关联的原生表单 ID，显式配置优先 | `string` | 自动关联 |

实例的 `value`、`defaultValue`、有效性及重置方法见 [表单控件通用 API](https://dvshu.github.io/litos-ui/components/form.md#%E8%A1%A8%E5%8D%95%E6%8E%A7%E4%BB%B6%E9%80%9A%E7%94%A8-api)。

组编码时，截断字符留下的孤立 Unicode 代理项会替换为 `U+FFFD`，与原生提交一致。旧值中无法解码的百分号转义仍按原文读取。

### Checkbox Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 标签 |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 选中改变时触发, `e.detail` 包含 `value`、`name`、`checked` | `(event: CustomEvent)` |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 选中改变时触发, `e.detail` 包含 `value` 为选中的值的列表 | `(event: CustomEvent)` |

### Checkbox CSS Variables

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-check-size` | 复选框尺寸 | `14px` |
| `--l-check-border-radius` | 复选框圆角 | `3px` |
| `--l-primary-color` | 选中状态颜色 | `#007bff`（引入 vars.css 后） |
| `--l-disabled-color` | 禁用状态颜色 | `#e6e6e6` |
| `--l-form-control-height` | 按钮样式高度 | `40px`（引入 vars.css 后；未引入时组件回退为 32px） |
| `--l-check-gap` | 复选框组间距 | `0px` |
