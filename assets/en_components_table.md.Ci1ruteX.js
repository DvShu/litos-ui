import{b as f,i as y,o as u,a as b,c as s}from"./chunks/browser.CpyXlELn.js";import{v as x,P as k,x as C,C as w,o as q,c as v,a2 as c,E as l,w as r,j as e,a as d}from"./chunks/framework.nU6eqUhJ.js";const A=JSON.parse('{"title":"Table","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/table.md","filePath":"en/components/table.md","lastUpdated":1793253144000}'),E={name:"en/components/table.md"},P=Object.assign(E,{setup(T){let n;const h=[{id:1,name:"Zhang San",age:18,address:"Chaoyang, Beijing"},{id:2,name:"Li Si",age:19,address:"Chaoyang, Beijing"},{id:3,name:"Wang Wu",age:20,address:"Chaoyang, Beijing"}];let m=h.concat([{id:4,name:"Zhao Liu",age:21,address:"Chaoyang, Beijing"},{id:5,name:"Qian Qi",age:22,address:"Chaoyang, Beijing"},{id:6,name:"Sun Ba",age:23,address:"Chaoyang, Beijing"}]);const p=[{title:"Name",key:"name",sorter:!0},{title:"Age",key:"age",sorter:!0},{title:"Address",key:"address"},{title:"Actions",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(s("l-button",{...o,"data-action":"edit",textContent:"Edit"})),t.push(s("l-button",{...o,"data-action":"delete",textContent:"Delete"})),t}}];let g=[{title:"Name",key:"name",width:80,fixed:"left"},{title:"Age",key:"age",width:200},{title:"Address",key:"address",width:200},{title:"Actions",width:200,fixed:"right",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(s("l-button",{...o,"data-action":"edit",textContent:"Edit"})),t.push(s("l-button",{...o,"data-action":"delete",textContent:"Delete"})),t}}];function i(a){const t=a.detail;t.action==="edit"||t.action}return x(()=>{k(()=>{n=f(".data-table"),n.length&&(y(n,(a,t)=>{t===4?a.setColumns(g):a.setColumns(p),t===3?a.setData([]):t===4?a.setData(m):a.setData(h)}),u(n[0],"edit",i),u(n[0],"delete",i))})}),C(()=>{n&&n.length&&(b(n[0],"edit",i),b(n[0],"delete",i)),n=null}),(a,t)=>{const o=w("ClientOnly");return q(),v("div",null,[t[6]||(t[6]=c(`<h1 id="table" tabindex="-1">Table <a class="header-anchor" href="#table" aria-label="Permalink to &quot;Table&quot;">​</a></h1><p>Display structured datasets.</p><p>This table provides basic data display, fixed headers and columns, and sorting. For more advanced requirements, consider <a href="https://tanstack.com/table/latest" target="_blank" rel="noreferrer">TanstackTable</a></p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Table, Button } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Table, Button]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Define columns with <code>setColumns()</code> and provide data with <code>setData()</code>. To create an action column, add <code>data-action</code> to its elements and listen for events with the corresponding names (<code>edit</code> and <code>delete</code> in this example).</p>`,8)),l(o,null,{default:r(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),e("textarea",{lang:"js"},`  import { on, $$, $one } from 'utilane/browser';
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
        'data-id': \`\${rowData.id}\`
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
`)])],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"striped-rows",tabindex:"-1"},[d("Striped Rows "),e("a",{class:"header-anchor",href:"#striped-rows","aria-label":'Permalink to "Striped Rows"'},"​")],-1)),t[8]||(t[8]=e("p",null,[d("Tables have striped rows by default. Set "),e("code",null,'stripe="off"'),d(" to disable them.")],-1)),l(o,null,{default:r(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" stripe="off"></l-table>
`)],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"borders",tabindex:"-1"},[d("Borders "),e("a",{class:"header-anchor",href:"#borders","aria-label":'Permalink to "Borders"'},"​")],-1)),t[10]||(t[10]=e("p",null,[d("Vertical borders are hidden by default. Enable "),e("code",null,"border"),d(" to show them.")],-1)),l(o,null,{default:r(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"empty-state",tabindex:"-1"},[d("Empty State "),e("a",{class:"header-anchor",href:"#empty-state","aria-label":'Permalink to "Empty State"'},"​")],-1)),t[12]||(t[12]=e("p",null,"An empty state is shown when the data array is empty.",-1)),l(o,null,{default:r(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`)],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"fixed-header-and-columns",tabindex:"-1"},[d("Fixed Header and Columns "),e("a",{class:"header-anchor",href:"#fixed-header-and-columns","aria-label":'Permalink to "Fixed Header and Columns"'},"​")],-1)),t[14]||(t[14]=e("p",null,[d("Enable "),e("code",null,"fixed-head"),d(" to fix the header. Set a column’s "),e("code",null,"fixed"),d(" option to "),e("code",null,"left"),d(" or "),e("code",null,"right"),d(" to fix that column.")],-1)),l(o,null,{default:r(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" fixed-head max-height="200px"></l-table>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),e("textarea",{lang:"js"},`  import { on, $$, $one } from 'utilane/browser';
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
        'data-id': \`\${rowData.id}\`
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
`)])],-1)])]),_:1}),t[15]||(t[15]=c('<blockquote><p>Use <code>max-height</code> to limit the scrollable table height when fixing the header.</p></blockquote><blockquote><p>To customize the scrollbar, import the <a href="/litos-ui/en/css_util#_3-scrollbar-styles">scrollbar styles</a> and add <code>l-scrollbar</code> to the table.</p></blockquote><h3 id="sorting" tabindex="-1">Sorting <a class="header-anchor" href="#sorting" aria-label="Permalink to &quot;Sorting&quot;">​</a></h3><p>Set <code>sorter</code> to <code>true</code> or <code>custom</code> and supply a column <code>key</code>. With <code>sorter=&quot;custom&quot;</code>, the table emits <code>sort</code>; handle it and call <code>setData</code> with the sorted data.</p>',4)),l(o,null,{default:r(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[16]||(t[16]=c(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="table-attributes" tabindex="-1">Table Attributes <a class="header-anchor" href="#table-attributes" aria-label="Permalink to &quot;Table Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>stripe</code></td><td>Striped rows</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>border</code></td><td>Whether to show outer borders</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>fixed-head</code></td><td>Whether to fix the header</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>fixed-column</code></td><td>Whether columns are fixed; determined automatically when columns are parsed</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>max-height</code></td><td>Maximum height</td><td><code>number | string</code></td><td><code>-</code></td></tr><tr><td><code>table-layout</code></td><td>Table layout</td><td><code>&quot;auto&quot; | &quot;fixed&quot;</code></td><td><code>-</code></td></tr></tbody></table><h3 id="table-column-options" tabindex="-1">Table Column Options <a class="header-anchor" href="#table-column-options" aria-label="Permalink to &quot;Table Column Options&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>title</code></td><td>Column title</td><td><code>string</code></td></tr><tr><td><code>key</code></td><td>Column key; required for sorting</td><td><code>string</code></td></tr><tr><td><code>width</code></td><td>Column width; required for fixed columns</td><td><code>number</code> | <code>string</code></td></tr><tr><td><code>fixed</code></td><td>Whether the column is fixed</td><td><code>&quot;left&quot;</code> | <code>&quot;right&quot;</code></td></tr><tr><td><code>left</code></td><td>Left offset for a column fixed to the left</td><td><code>number</code></td></tr><tr><td><code>right</code></td><td>Right offset for a column fixed to the right</td><td><code>number</code></td></tr><tr><td><code>children</code></td><td>Nested header columns</td><td><code>Column[]</code></td></tr><tr><td><code>titleRowspan</code></td><td>Header row span</td><td><code>number</code></td></tr><tr><td><code>titleColspan</code></td><td>Header column span</td><td><code>number</code></td></tr><tr><td><code>sorter</code></td><td>Whether sorting is enabled</td><td><code>boolean</code> | <code>&quot;custom&quot;</code></td></tr><tr><td><code>style</code></td><td>Column styles</td><td><code>Record&lt;string, string | null | undefined&gt;</code></td></tr><tr><td><code>colspan</code></td><td>td colspan</td><td><code>number</code> | <code>(rowData: any, rowIndex: number) =&gt; number</code></td></tr><tr><td><code>rowspan</code></td><td>td rowspan</td><td><code>number</code> | <code>(rowData: any, rowIndex: number) =&gt; number</code></td></tr><tr><td><code>render</code></td><td>Cell content renderer</td><td><code>(rowData: any, rowIndex: number) =&gt; HTMLElement | DocumentFragment | HTMLElement[] | string</code></td></tr></tbody></table><h3 id="table-events" tabindex="-1">Table Events <a class="header-anchor" href="#table-events" aria-label="Permalink to &quot;Table Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th><th>detail</th></tr></thead><tbody><tr><td><code>click</code></td><td>Fires when clicked</td><td><code>(event: Event)</code></td><td>-</td></tr><tr><td><code>sort</code></td><td>Fires when sorting is requested</td><td><code>(event: CustomEvent)</code></td><td><code>{ index: number, key: string, dir: asc | desc }</code></td></tr><tr><td><code>[action]</code></td><td>Fires with the data-action value as the event name when that element is clicked</td><td><code>(event: CustomEvent)</code></td><td>All dataset fields on the clicked element</td></tr></tbody></table><h3 id="table-methods" tabindex="-1">Table Methods <a class="header-anchor" href="#table-methods" aria-label="Permalink to &quot;Table Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>setColumns</code></td><td>Sets the columns</td><td><code>(columns: Column[]) =&gt; void</code></td></tr><tr><td><code>setData</code></td><td>Sets the data</td><td><code>(data: any[], sortInfo?: {key: string; order: &quot;asc&quot; | &quot;desc&quot;}) =&gt; void</code></td></tr></tbody></table><h3 id="table-css-variables" tabindex="-1">Table CSS Variables <a class="header-anchor" href="#table-css-variables" aria-label="Permalink to &quot;Table CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--l-table-max-height</code></td><td>Maximum table height</td><td><code>100%</code></td></tr><tr><td><code>--l-table-font-size</code></td><td>Table font size</td><td><code>14px</code></td></tr><tr><td><code>--l-table-td-padding</code></td><td>Cell padding</td><td><code>10px</code></td></tr><tr><td><code>--l-table-th-padding</code></td><td>Header cell padding</td><td><code>10px</code></td></tr><tr><td><code>--l-table-layout</code></td><td>Table layout: auto or fixed</td><td><code>auto</code></td></tr><tr><td><code>--l-table-border-color</code></td><td>Border color for cell bottoms and bordered tables</td><td><code>#e6e6e6</code></td></tr><tr><td><code>--l-table-th-bg</code></td><td>Header background</td><td><code>#f2f2f2</code></td></tr><tr><td><code>--l-table-th-color</code></td><td>Header text color</td><td><code>#000000</code></td></tr><tr><td><code>--l-table-td-bg</code></td><td>Cell background</td><td><code>#ffffff</code></td></tr><tr><td><code>--l-table-td-color</code></td><td>Cell text color</td><td><code>#000000</code></td></tr><tr><td><code>--l-table-row-hover-bg</code></td><td>Cell background on row hover</td><td><code>#f2f2f2</code></td></tr><tr><td><code>--l-table-empty-color</code></td><td>Empty-state text color</td><td><code>#999999</code></td></tr><tr><td><code>--l-table-stripe-bg</code></td><td>Background of even striped rows</td><td><code>#fafafa</code></td></tr><tr><td><code>--l-table-sort-inactive-color</code></td><td>Inactive sort icon color</td><td><code>#c0c4cc</code></td></tr></tbody></table>`,14))])}}});export{A as __pageData,P as default};
