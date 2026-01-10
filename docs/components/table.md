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
  let dataSource1 = dataSource.concat([{
    id: 4,
    name: '赵六',
    age: 21,
    address: '北京朝阳',
  }, {
    id: 5,
    name: '钱七',
    age: 22,
    address: '北京朝阳',
  }, {
    id: 6,
    name: '孙八',
    age: 23,
    address: '北京朝阳',
  }]);

  const columns = [{
    title: '姓名',
    key: 'name',
    sorter: true
  }, {
    title: '年龄',
    key: 'age',
    sorter: true,
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
  }];
  let columns1 = [{
    title: '姓名',
    key: 'name',
    width: 80,
    fixed: 'left'
  }, {
    title: '年龄',
    key: 'age',
    width: 200,
  }, {
    title: '住址',
    key: 'address',
    width: 200,
  }, {
    title: '操作',
    width: 200,
    fixed: 'right',
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
  }];

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
        iterate($tables, ($table, i) => {
          if (i === 4) {
            $table.setColumns(columns1);
          } else {
            $table.setColumns(columns);
          }
          if (i === 3) {
            $table.setData([]);
          } else if (i === 4) {
            $table.setData(dataSource1);
          } else {
            $table.setData(dataSource);
          }
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

### 边框

默认情况下，`Table` 组件是不具有竖直方向的边框的， 如果需要，可以使用 `border` 属性，把该属性设置为 `on` 即可启用。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" border></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

### 空表格

数据列表没有数据时，显示空表格

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table"></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

### 固定表头和列

设置 `fixed-head` 属性即可实现固定表头。将需要固定的列设置 `fixed` 为 `left` 或 `right`，就能实现固定列。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" fixed-head max-height="200px"></l-table>
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
  const columns = [{
    title: '姓名',
    key: 'name',
    fixed: 'left',
    width: 80
  }, {
    title: '年龄',
    key: 'age',
    width: 200
  }, {
    title: '住址',
    key: 'address',
    width: 200
  }, {
    title: '操作',
    width: 200,
    fixed: 'right',
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
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 可以通过 `max-height` 来设置表格的最大高度, 以更好的适配固定 `head`

> 如果需要改变滚动条样式，引入 [滚动条样式](/css_util#_3-滚动条样式)，然后给 `table` 添加 `l-scrollbar`

### 排序

给列的选项增加 `sorter` 为 `true`、`costom` 来启用排序，同时配置 `key` 字段标记排序 `key`；如果 `sorter=costom` 就能启用手动排序，这个时候会触发一个`sort` 事件，然后在 `sort` 事件中调用 `setData` 方法来设置排序后的数据。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" border></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Table Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `stripe` | 斑马纹 | `boolean` | `true` |
| `border` | 是否显示四周边框 | `boolean` | `false` |
| `fixed-head` | 是否固定表头 | `boolean` | `false` |
| `fixed-column` | 是否固定列，在进行列解析时，会自动确认该属性 | `boolean` | `false` |
| `max-height` | 最大高度 | `number \| string` | `undefined` |
| `table-layout` | 表格布局 | `"auto" \| "fixed"` | `undefined` |

### Table Column Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `title` | 列的标题 | `string` |
| `key` | 列标识, 列排序必传 | `string` |
| `width` | 列宽度, 固定列时，需要传 | `number` \| `string` |
| `fixed` | 是否固定列 | `"left"` \| `"right"` |
| `left` | 列固定左时, 左边偏移量 | `number` |
| `right` | 列固定右时, 右边偏移量 | `number` |
| `children` | 多级表头 | `Column[]` |
| `titleRowspan` | 表头跨行 | `number` |
| `titleColspan` | 表头跨列 | `number` |
| `sorter` | 列是否支持排序 | `boolean` \| `"custom"` |
| `style` | 列的样式 | `Record<string, string \| null \| undefined>` |
| `colspan` | td colspan | `number` \| `(rowData: any, rowIndex: number) => number` |
| `rowspan` | td rowspan | `number` \| `(rowData: any, rowIndex: number) => number` |
| `render` | 单元格内容渲染函数 | `(rowData: any, rowIndex: number) => HTMLElement \| DocumentFragment \| HTMLElement[] \| string` |

### Table Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 | detail |
| --- | --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` | - |
| `sort` | 排序时触发 | `(event: CustomEvent)` | `{ index: number, key: string, dir: asc \| desc }` |
| `[action]` | 所有设置了 `data-action` 属性的节点，点击时触发 | `(event: CustomEvent)` | 该节点上的所有的 `dataset` 属性 |

### Table Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `setColumns` | 设置列 | `(columns: Column[]) => void` |
| `setData` | 设置数据 | `(data: any[], sortInfo?: {key: string; order: "asc" \| "desc"}}) => void` |

### Table CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-table-max-height` | 表格最大高度 | `100%` |
| `--l-table-font-size` | 表格字体大小 | `14px` |
| `--l-table-td-padding` | 单元格内边距 | `10px` |
| `--l-table-th-padding` | 表头单元格内边距 | `10px` |
| `--l-table-layout` | 表格布局；`auto` 或 `fixed` | `auto` |
| `--l-table-border-color` | 表格边框颜色（包括单元格底部和边框表格） | `#e6e6e6` |
| `--l-table-th-bg` | 表头背景色 | `#f2f2f2` |
| `--l-table-th-color` | 表头文字颜色 | `#000000` |
| `--l-table-td-bg` | 单元格背景色 | `#ffffff` |
| `--l-table-td-color` | 单元格文字颜色 | `#000000` |
| `--l-table-row-hover-bg` | 行悬停时单元格背景色 | `#f2f2f2` |
| `--l-table-empty-color` | 空状态文字颜色 | `#999999` |
| `--l-table-stripe-bg` | 斑马纹偶数行背景色 | `#fafafa` |
| `--l-table-sort-inactive-color` | 排序图标未激活状态颜色 | `#c0c4cc` |
