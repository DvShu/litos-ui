# Table

Display structured datasets.

This table provides basic data display, fixed headers and columns, and sorting. For more advanced requirements, consider [TanstackTable](https://tanstack.com/table/latest)

## Import and Registration

```js
import { regist, Table, Button } from "litos-ui";

regist([Table, Button]);
```

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick  }  from 'vue';
  import { $, iterate, $$, on, off } from 'utilane/browser'

  let $tables;

  const dataSource = [
    {
      id: 1,
      name: 'Zhang San',
      age: 18,
      address: 'Chaoyang, Beijing',
    },
    {
      id: 2,
      name: 'Li Si',
      age: 19,
      address: 'Chaoyang, Beijing',
    },
    {
      id: 3,
      name: 'Wang Wu',
      age: 20,
      address: 'Chaoyang, Beijing',
    },
  ];
  let dataSource1 = dataSource.concat([{
    id: 4,
    name: 'Zhao Liu',
    age: 21,
    address: 'Chaoyang, Beijing',
  }, {
    id: 5,
    name: 'Qian Qi',
    age: 22,
    address: 'Chaoyang, Beijing',
  }, {
    id: 6,
    name: 'Sun Ba',
    age: 23,
    address: 'Chaoyang, Beijing',
  }]);

  const columns = [{
    title: 'Name',
    key: 'name',
    sorter: true
  }, {
    title: 'Age',
    key: 'age',
    sorter: true,
  }, {
    title: 'Address',
    key: 'address',
  }, {
    title: 'Actions',
    render: (rowData) => {
      const children = [];
      const attrs = {
        text: true,
        type: 'primary',
        'data-id': `${rowData.id}`,
        height: 'auto'
      }
      children.push($$('l-button', { ...attrs, 'data-action': 'edit', textContent: 'Edit' }));
      children.push($$('l-button', { ...attrs, 'data-action': 'delete', textContent: 'Delete' }));
      return children;
    }
  }];
  let columns1 = [{
    title: 'Name',
    key: 'name',
    width: 80,
    fixed: 'left'
  }, {
    title: 'Age',
    key: 'age',
    width: 200,
  }, {
    title: 'Address',
    key: 'address',
    width: 200,
  }, {
    title: 'Actions',
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
      children.push($$('l-button', { ...attrs, 'data-action': 'edit', textContent: 'Edit' }));
      children.push($$('l-button', { ...attrs, 'data-action': 'delete', textContent: 'Delete' }));
      return children;
    }
  }];

  function handleAction(e) {
    const d = e.detail;
    if (d.action === 'edit') {
      // Edit the record identified by d.id.
    } else if (d.action === 'delete') {
      // Delete the record identified by d.id.
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

        on($tables[0], 'edit', handleAction);
        on($tables[0], 'delete', handleAction);
      });
    }
  });

  onUnmounted(() => {
    if ($tables && $tables.length) {
      off($tables[0], 'edit', handleAction);
      off($tables[0], 'delete', handleAction);
    }
    $tables = null;
  });
</script>

### Basic Usage

Define columns with `setColumns()` and provide data with `setData()`. To create an action column, add `data-action` to its elements and listen for events with the corresponding names (`edit` and `delete` in this example).

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
  import { on, $$, $one } from 'utilane/browser';
  //-
  const $table = $one('.data-table');
  //-
  const dataSource = [
    {
      id: 1,
      name: 'Zhang San',
      age: 18,
      address: 'Chaoyang, Beijing',
    },
    {
      id: 2,
      name: 'Li Si',
      age: 19,
      address: 'Chaoyang, Beijing',
    },
    {
      id: 3,
      name: 'Wang Wu',
      age: 20,
      address: 'Chaoyang, Beijing',
    },
  ];
  //-
  const columns = [{
    title: 'Name',
    key: 'name',
  }, {
    title: 'Age',
    key: 'age',
  }, {
    title: 'Address',
    key: 'address',
  }, {
    title: 'Actions',
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
        textContent: 'Edit'
      }));
      //-
      children.push($$('l-button', {
        ...attrs,
        'data-action': 'delete',
        textContent: 'Delete'
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
      // Edit the record identified by d.id.
    } else if (d.action === 'delete') {
      // Delete the record identified by d.id.
    }
  }
  //-
  on($table, 'edit', handleAction);
  on($table, 'delete', handleAction);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Striped Rows

Tables have striped rows by default. Set `stripe="off"` to disable them.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" stripe="off"></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

### Borders

Vertical borders are hidden by default. Enable `border` to show them.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" border></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

### Empty State

An empty state is shown when the data array is empty.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table"></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

### Fixed Header and Columns

Enable `fixed-head` to fix the header. Set a column’s `fixed` option to `left` or `right` to fix that column.

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
  import { on, $$, $one } from 'utilane/browser';
  //-
  const $table = $one('.data-table');
  //-
  const columns = [{
    title: 'Name',
    key: 'name',
    fixed: 'left',
    width: 80
  }, {
    title: 'Age',
    key: 'age',
    width: 200
  }, {
    title: 'Address',
    key: 'address',
    width: 200
  }, {
    title: 'Actions',
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
        textContent: 'Edit'
      }));
      //-
      children.push($$('l-button', {
        ...attrs,
        'data-action': 'delete',
        textContent: 'Delete'
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

> Use `max-height` to limit the scrollable table height when fixing the header.

> To customize the scrollbar, import the [scrollbar styles](/en/css_util#_3-scrollbar-styles) and add `l-scrollbar` to the table.

### Sorting

Set `sorter` to `true` or `custom` and supply a column `key`. With `sorter="custom"`, the table emits `sort`; handle it and call `setData` with the sorted data.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-table class="data-table" border></l-table>
</textarea>
</l-code-preview>
</ClientOnly>

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/table";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Table Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `stripe` | Striped rows | `boolean` | `true` |
| `border` | Whether to show outer borders | `boolean` | `false` |
| `fixed-head` | Whether to fix the header | `boolean` | `false` |
| `fixed-column` | Whether columns are fixed; determined automatically when columns are parsed | `boolean` | `false` |
| `max-height` | Maximum height | `number \| string` | `-` |
| `table-layout` | Table layout | `"auto" \| "fixed"` | `-` |

### Table Column Options

<!-- prettier-ignore -->
| Name | Description | Type |
| --- | --- | --- |
| `title` | Column title | `string` |
| `key` | Column key; required for sorting | `string` |
| `width` | Column width; required for fixed columns | `number` \| `string` |
| `fixed` | Whether the column is fixed | `"left"` \| `"right"` |
| `left` | Left offset for a column fixed to the left | `number` |
| `right` | Right offset for a column fixed to the right | `number` |
| `children` | Nested header columns | `Column[]` |
| `titleRowspan` | Header row span | `number` |
| `titleColspan` | Header column span | `number` |
| `sorter` | Whether sorting is enabled | `boolean` \| `"custom"` |
| `style` | Column styles | `Record<string, string \| null \| undefined>` |
| `colspan` | td colspan | `number` \| `(rowData: any, rowIndex: number) => number` |
| `rowspan` | td rowspan | `number` \| `(rowData: any, rowIndex: number) => number` |
| `render` | Cell content renderer | `(rowData: any, rowIndex: number) => HTMLElement \| DocumentFragment \| HTMLElement[] \| string` |

### Table Events

<!-- prettier-ignore -->
| Event | Description | Callback parameter | detail |
| --- | --- | --- | --- |
| `click` | Fires when clicked | `(event: Event)` | - |
| `sort` | Fires when sorting is requested | `(event: CustomEvent)` | `{ index: number, key: string, dir: asc \| desc }` |
| `[action]` | Fires with the data-action value as the event name when that element is clicked | `(event: CustomEvent)` | All dataset fields on the clicked element |

### Table Methods

<!-- prettier-ignore -->
| Method | Description | Type |
| --- | --- | --- |
| `setColumns` | Sets the columns | `(columns: Column[]) => void` |
| `setData` | Sets the data | `(data: any[], sortInfo?: {key: string; order: "asc" \| "desc"}) => void` |

### Table CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-table-max-height` | Maximum table height | `100%` |
| `--l-table-font-size` | Table font size | `14px` |
| `--l-table-td-padding` | Cell padding | `10px` |
| `--l-table-th-padding` | Header cell padding | `10px` |
| `--l-table-layout` | Table layout: auto or fixed | `auto` |
| `--l-table-border-color` | Border color for cell bottoms and bordered tables | `#e6e6e6` |
| `--l-table-th-bg` | Header background | `#f2f2f2` |
| `--l-table-th-color` | Header text color | `#000000` |
| `--l-table-td-bg` | Cell background | `#ffffff` |
| `--l-table-td-color` | Cell text color | `#000000` |
| `--l-table-row-hover-bg` | Cell background on row hover | `#f2f2f2` |
| `--l-table-empty-color` | Empty-state text color | `#999999` |
| `--l-table-stripe-bg` | Background of even striped rows | `#fafafa` |
| `--l-table-sort-inactive-color` | Inactive sort icon color | `#c0c4cc` |