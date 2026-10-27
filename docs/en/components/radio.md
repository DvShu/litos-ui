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

在单选框组基础上，设置 `type` 为 `button` 可以使用按钮样式。

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

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/radio";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

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
| `value` | 选中的选项值 | `string` | - |
| `gap` | 选项间距 | `string` | - |

组内选项通过 `l-radio` 子元素提供，当前没有 `setItems()` 方法。

### Radio CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-check-size` | 单选框尺寸 | `14px` |