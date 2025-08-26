# Table 表格

用于展示大量结构化数据

这个表格只是一个简单的数据展示功能，只包含有固定表头和列、排序功能。如果当前组件不能满足需求需要使用更多功能的时候，可以考虑使用 [TanstackTable](https://tanstack.com/table/latest)

## 引用

```js
import { regist, Table } from "litos-ui";

regist(Table);
```

## 演示

<script>
  import { onMounted, onUnmounted, nextTick, iterate }  from 'vue';
  import { $ } from 'ph-utils/dom'

  let $tables;

  const dataSource = [
    {
      id: 1,
      name: '张三',
      age: 18,
      address: '北京朝阳',
    },
    {
      id: 2,
      name: '李四',
      age: 19,
      address: '北京朝阳',
    },
    {
      id: 3,
      name: '王五',
      age: 20,
      address: '北京朝阳',
    },
  ];

  const columns = [{
    title: '姓名',
    key: 'name'
    width: 80
  }, {
    title: '年龄',
    key: 'age',
    width: 80
  }, {
    title: '住址',
    key: 'address',
    width: 80
  }, {
    title: '操作',
    width: 80,
    render: () => [
    ]
  }]

  onMounted(() => {
    if (!import.meta.env.SSR) {
      nextTick(() => {
        $tables = $('.data-table');
        if (!$tables.length) {
          return;
        }
        iterate($tables, ($table) => {
          $table.setColumns(columns);
          $table.setData(dataSource);
        });
      });
    }
  });

  onUnmounted(() => {
    $tables = null;
  });
</script>

### 基础用法

先通过 `setColumns()` 定义列, 再通过 `setData()` 定义数据源

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table"></l-table>
</textarea>
<div class="source">
<textarea lang="html">
  <l-table></l-table>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Table Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### Table Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Table Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Table Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### Table CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |
