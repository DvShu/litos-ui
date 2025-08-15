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
} from "litos-ui";

regist([Select, ArrowDownIcon]);
// multiple
regist([Tag, CloseIcon]);
// loading
regist([LoadingIcon]);
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
        }
      });
    }
  });

  onUnmounted(() => {
    $selects = null;
  });
</script>

### 基础用法

通过 `setOptions()` 函数设置选项

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select multiple data-title="ddd"></l-select>
</textarea>
<div class="source">
<textarea lang="html">
  <l-select></l-select>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 禁用

通过 `disabled` 属性设置禁用状态

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-select disabled filterable></l-select>
</textarea>
</l-code-preview>
</ClientOnly>

> 也可以通过 `l-form-item` 或 `l-form-item` 组件的 `disabled` 属性设置禁用状态

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
