# SelectOri 原生下拉框

这个是原生的下拉选择，只是对于 `select` 标签进行了一定的优化，通常用于单选时使用。

## 引用

```js
import { SelectOri, regist } from "litos-ui";

regist(SelectOri);
```

## 演示

### 基础用法

通过 `options` 属性设置选项或者通过 `slot-default` 来手动渲染选项。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select-ori>
    <option value="1">选项一</option>
    <option value="2">选项二</option>
    <option value="3">选项三</option>
  </l-select-ori>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### SelectOri Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 原生的 `name` 属性 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `value` | 选中项绑定值 | `string` | - |

### SelectOri Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 选项列表 |

### SelectOri Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `chnage` | 选中项改变时触发 | `(event: Event)` |

### SelectOri Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `setOptions` | 重新设置新的选项列表 | `(options: SelectOption[]): void` |
| `appendOptions` | 为选项列表追加新的选项 | `(options: SelectOption[]): void` |

### SelectOption Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选项值 | `string` | - |
| `label` | 选项标签 | `string` | - |
