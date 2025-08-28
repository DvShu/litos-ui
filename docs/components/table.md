# Table 表格

用于展示大量结构化数据

这个表格只是一个简单的数据展示功能，只包含有固定表头和列、排序功能。如果当前组件不能满足需求需要使用更多功能的时候，可以考虑使用 [TanstackTable](https://tanstack.com/table/latest)

## 引用

```js
import { regist, Table } from "litos-ui";

regist(Table);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick  }  from 'vue';
  import { $, iterate, $$, on, off } from 'ph-utils/dom'

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
    key: 'name',
  }, {
    title: '年龄',
    key: 'age',
  }, {
    title: '住址',
    key: 'address',
  }, {
    title: '操作',
    render: (rowData) => {
      const children = [];
      const attrs = {
        text: true,
        type: 'primary',
        'data-id': `${rowData.id}`,
        height: 'auto'
      }
      children.push($$('l-button', { ...attrs, 'data-action': 'edit', textContent: '编辑' }));
      children.push($$('l-button', { ...attrs, 'data-action': 'delete', textContent: '删除' }));
      return children;
    }
  }]

  function handleAction(e) {
    const d = e.detail;
    if (d.action === 'edit') {
      // 编辑 d.id 数据
    } else if (d.action === 'delete') {
      // 删除 d.id 数据
    }
  }

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
        on($tables[0], 'action', handleAction);
      });
    }
  });

  onUnmounted(() => {
    if ($tables && $tables.length) {
      off($tables[0], 'action', handleAction);
    }
    $tables = null;
  });
</script>

### 基础用法

先通过 `setColumns()` 定义列, 再通过 `setData()` 定义数据源；如果需要最后一列操作列，则可以通过给元素定义 `data-action` 属性，然后监听 `table` 的 `action` 事件。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table"></l-table>
</textarea>
<div class="source">
<textarea lang="html">
  <l-table class="data-table"></l-table>
</textarea>
<textarea lang="js">
  import { on, $$ } from 'ph-utils/dom';
  //-
  const $table = $('.data-table');
  //-
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
  //-
  const columns = [{
    title: '姓名',
    key: 'name',
  }, {
    title: '年龄',
    key: 'age',
  }, {
    title: '住址',
    key: 'address',
  }, {
    title: '操作',
    render: (rowData) => {
      const children = [];
      const attrs = {
        text: true,
        type: 'primary',
        'data-id': `${rowData.id}`
      }
      children.push($$('l-button', { 
        ...attrs, 
        'data-action': 'edit', 
        textContent: '编辑' 
      }));
      //-
      children.push($$('l-button', { 
        ...attrs, 
        'data-action': 'delete', 
        textContent: '删除' 
      }));
      return children;
    }
  }];
  $table.setColumns(columns);
  $table.setData(dataSource);
  //-
  function handleAction(e) {
    const d = e.detail;
    if (d.action === 'edit') {
      // 编辑 d.id 数据
    } else if (d.action === 'delete') {
      // 删除 d.id 数据
    }
  }
  //-
  on($table, 'action', handleAction);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 斑马纹

表格默认带斑马纹，可以通过设置 `stripe` 为 `off` 来取消斑马纹

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" stripe="off"></l-table>
</textarea>
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
| `--l-table-td-padding` | 单元格内边距 | `10px` |
| `--l-table-th-padding` | 表头单元格内边距 | `var(--l-table-td-padding)` |
