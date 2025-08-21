# Select 选择器

下拉选择器

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器
- 选项过多时，使用下拉菜单展示并选择内容

> `l-select` 的默认宽度更改为 `100%` 当使用内联形式时，宽度将显示异常。为了保持显示正常, 您需要手动配置 `l-select` 的宽度

## 引用

```js
import {
  regist,
  Select,
  ArrowDownIcon,
  Tag,
  CloseIcon,
  LoadingIcon,
  CloseFilledIcon,
} from "litos-ui";
import "litos-ui/styles/select.css";

regist([Select, ArrowDownIcon]);
// multiple
regist([Tag, CloseIcon]);
// loading
regist([LoadingIcon]);
// clearable
regist([CloseFilledIcon]);
```

## 演示

<script setup>
  import { $, iterate } from 'ph-utils/dom';
  import { onMounted, onUnmounted, nextTick } from 'vue';
  const fruits = ["苹果", "香蕉", "橙子", "葡萄", "柠檬", "草莓", "樱桃", "芒果", "猕猴桃", "杨梅", "菠萝", "西瓜", "哈密瓜", "桃子", "梨", "柿子", "榴莲", "椰子", "龙眼", "荔枝"];
  const options = fruits.map((item, i) => { return { value: i, label: item } });

  let $selects;

  onMounted(() => {
    if (!import.meta.env.SSR) {
      nextTick(() => {
        $selects = $('l-select');
        if ($selects && $selects.length > 0) {
          iterate($selects, (el) => {
            el.setOptions(options);
          });
          $selects[0].value = 0;
        }
      });
    }
  });

  onUnmounted(() => {
    $selects = null;
  });
</script>

### 基础用法

通过 `setOptions()` 函数设置选项，可以通过 `.value` 获取或设置选中项[多选，设置为数组]

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select></l-select>
</textarea>
<div class="source">
<textarea lang="html">
  <l-select id="select1"></l-select>
</textarea>
<textarea lang="js">
  const $select1 = document.querySelector('#select1');
  $select1.setOptions([{value:0,label:'苹果'}, {value:1,label:'香蕉'}]);
  // 多选 $select1.value = [0, 1];
  $select1.value = 0;
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 1. 可以通过 `value-field` 和 `label-field` 属性设置选项的 `value` 和 `label` 字段
> 2. 如果选中项是字符串，可以直接通过节点的 `value` 属性，设置选中值设置选中值[多选用 `,` 分隔]

### 禁用

通过 `disabled` 属性设置禁用状态

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select disabled></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

> 也可以通过 `l-form-item` 或 `l-form-item` 组件的 `disabled` 属性设置禁用状态

### 多选用

设置 `multiple` 属性即可启用多选，默认情况下选中值会以 `Tag` 组件的形式展现， 你也可以设置 `collapse-tags` 属性将它们合并为一段文字。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select multiple width="180px"></l-select>
  <l-select multiple collapse-tags width="180px"></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

### 可清空

设置 clearable 属性，则可将选择器清空。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select clearable width="180px"></l-select>
  <l-select multiple collapse-tags clearable width="180px"></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

### 过滤选项

可以利用过滤功能快速查找选项。

为 `l-select` 添加 `filterable` 属性即可启用搜索功能。 默认情况下，`Select` 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过 `setFilter()` 传入一个 `filter` 函数来实现。 `filter` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值以及当前选项，返回值为 `boolean` 表明当前选项是否符合过滤。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select filterable width="180px"></l-select>
  <l-select multiple filterable ></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Select Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### Select Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Select Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Select Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### Select CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |
