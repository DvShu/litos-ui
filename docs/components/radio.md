# Radio 单选框

在一组选项中进行单选操作。

## 引用

```js
import { RadioGroup, Radio, regist } from "litos-ui";

regist([RadioGroup, Radio]);
```

## 演示

### 基础用法

当只有一个选项时，可以直接 `checked` 绑定 `boolean` 值来控制是否选中；使用 `slot` 来重写选项的文字。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<l-radio>
  <span>
    <span>同意</span>
    <a href='#'>隐私协议</a>
  </span>
</l-radio>
</textarea>
</l-code-preview>
</ClientOnly>

同一表单内，同名的独立 `l-radio` 会互斥。不同表单可以各自选中同名项。

### 禁用状态

设置 `disabled` 属性即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-radio disabled label="禁用"></l-radio>
</textarea>
</l-code-preview>
</ClientOnly>

### 单选框组

结合 `l-radio-group` 组件实现单选框组

原生表单按组的 `name` 提交当前可用选项的值。组值找不到匹配选项时，原生表单省略该字段，`l-form.getData()` 中的组值为 `null`。参见 [Form 提交数据演示](./form#单选框和复选框的提交数据)。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-radio-group value="1" gap="15">
    <l-radio label="女" value="0"></l-radio>
    <l-radio label="男" value="1"></l-radio>
  </l-radio-group>
</textarea>
</l-code-preview>
</ClientOnly>

### 按钮样式

在单选框组基础上，给 `l-radio` 设置 `button` 属性可以使用按钮样式。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-radio-group value="0">
    <l-radio label="女" value="0" button></l-radio>
    <l-radio label="未知" value="-1" button></l-radio>
    <l-radio label="男" value="1" button></l-radio>
  </l-radio-group>
</textarea>
</l-code-preview>
</ClientOnly>

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/radio";
import "litos-ui/radio-group";
```

在客户端显式导入每个用到的组件。使用 `l-radio-group` 时，组和 `l-radio` 选项各自导入。样式、类型和总入口用法见[按需导入](/on_demand)。

## API

### Radio Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 原生 `name` 属性 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `button` | 是否使用按钮风格 | `boolean` | `false` |
| `value` | 选项值 | `string` | - |
| `checked` | 是否选中 | `boolean` | `false` |
| `label` | 标签文本 | `string` | - |

### Radio Properties

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `checked` | 当前选中状态 | `boolean` |
| `defaultChecked` | 重置默认选中状态，与 `checked` attribute 同步 | `boolean` |

字段名、默认值和有效性等通用属性见 [表单控件通用 API](./form#表单控件通用-api)。

### Radio Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 单选框选项文本 |

### Radio Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 单个选项变化时 detail 包含 value、name、checked；组的 change 事件 detail.value 为选中值 | `(event: CustomEvent)` |

### RadioGroup Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选中的选项值，空字符串可匹配 `value=""` 的选项 | `string` | 未设置 |
| `name` | 组的表单字段名 | `string` | 未设置 |
| `disabled` | 禁用组内全部选项 | `boolean` | `false` |
| `required` | 有可提交的选中值时通过必填校验 | `boolean` | `false` |
| `gap` | 选项间距，数字按 px 处理 | `string` | `0px` |
| `form` | 关联的原生表单 ID，显式配置优先 | `string` | 自动关联 |

实例的 `value`、`defaultValue`、有效性及重置方法见 [表单控件通用 API](./form#表单控件通用-api)。

通过组的 `value` 设置选中项，设为 `null` 可清空选择。组内选项的 `checked` 可读取当前状态。同值选项也只会选中一个。

组内选项通过 `l-radio` 子元素提供，当前没有 `setItems()` 方法。

### Radio CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-check-size` | 单选框尺寸 | `14px` |