import{b as p,i as f,o as g,a as x,c}from"./chunks/dom.DntxtiBs.js";import{v as k,P as y,x as q,C as T,o as C,c as v,ag as s,E as l,w as r,j as e,a as d}from"./chunks/framework.-4c4jpF6.js";const $=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"components/table.md","filePath":"components/table.md","lastUpdated":1768057580000}'),w={name:"components/table.md"},D=Object.assign(w,{setup(P){let n;const i=[{id:1,name:"张三",age:18,address:"北京朝阳"},{id:2,name:"李四",age:19,address:"北京朝阳"},{id:3,name:"王五",age:20,address:"北京朝阳"}];let u=i.concat([{id:4,name:"赵六",age:21,address:"北京朝阳"},{id:5,name:"钱七",age:22,address:"北京朝阳"},{id:6,name:"孙八",age:23,address:"北京朝阳"}]);const h=[{title:"姓名",key:"name",sorter:!0},{title:"年龄",key:"age",sorter:!0},{title:"住址",key:"address"},{title:"操作",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(c("l-button",{...o,"data-action":"edit",textContent:"编辑"})),t.push(c("l-button",{...o,"data-action":"delete",textContent:"删除"})),t}}];let m=[{title:"姓名",key:"name",width:80,fixed:"left"},{title:"年龄",key:"age",width:200},{title:"住址",key:"address",width:200},{title:"操作",width:200,fixed:"right",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(c("l-button",{...o,"data-action":"edit",textContent:"编辑"})),t.push(c("l-button",{...o,"data-action":"delete",textContent:"删除"})),t}}];function b(a){const t=a.detail;t.action==="edit"||t.action}return k(()=>{y(()=>{n=p(".data-table"),n.length&&(f(n,(a,t)=>{t===4?a.setColumns(m):a.setColumns(h),t===3?a.setData([]):t===4?a.setData(u):a.setData(i)}),g(n[0],"action",b))})}),q(()=>{n&&n.length&&x(n[0],"action",b),n=null}),(a,t)=>{const o=T("ClientOnly");return C(),v("div",null,[t[6]||(t[6]=s(`<h1 id="table-表格" tabindex="-1">Table 表格 <a class="header-anchor" href="#table-表格" aria-label="Permalink to &quot;Table 表格&quot;">​</a></h1><p>用于展示大量结构化数据</p><p>这个表格只是一个简单的数据展示功能，只包含有固定表头和列、排序功能。如果当前组件不能满足需求需要使用更多功能的时候，可以考虑使用 <a href="https://tanstack.com/table/latest" target="_blank" rel="noreferrer">TanstackTable</a></p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Table } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Table);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>先通过 <code>setColumns()</code> 定义列, 再通过 <code>setData()</code> 定义数据源；如果需要最后一列操作列，则可以通过给元素定义 <code>data-action</code> 属性，然后监听 <code>table</code> 的 <code>action</code> 事件。</p>`,8)),l(o,null,{default:r(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),e("textarea",{lang:"js"},`  import { on, $$ } from 'ph-utils/dom';
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
        'data-id': \`\${rowData.id}\`
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
`)])],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"斑马纹",tabindex:"-1"},[d("斑马纹 "),e("a",{class:"header-anchor",href:"#斑马纹","aria-label":'Permalink to "斑马纹"'},"​")],-1)),t[8]||(t[8]=e("p",null,[d("表格默认带斑马纹，可以通过设置 "),e("code",null,"stripe"),d(" 为 "),e("code",null,"off"),d(" 来取消斑马纹")],-1)),l(o,null,{default:r(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" stripe="off"></l-table>
`)],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"边框",tabindex:"-1"},[d("边框 "),e("a",{class:"header-anchor",href:"#边框","aria-label":'Permalink to "边框"'},"​")],-1)),t[10]||(t[10]=e("p",null,[d("默认情况下，"),e("code",null,"Table"),d(" 组件是不具有竖直方向的边框的， 如果需要，可以使用 "),e("code",null,"border"),d(" 属性，把该属性设置为 "),e("code",null,"on"),d(" 即可启用。")],-1)),l(o,null,{default:r(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"空表格",tabindex:"-1"},[d("空表格 "),e("a",{class:"header-anchor",href:"#空表格","aria-label":'Permalink to "空表格"'},"​")],-1)),t[12]||(t[12]=e("p",null,"数据列表没有数据时，显示空表格",-1)),l(o,null,{default:r(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`)],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"固定表头和列",tabindex:"-1"},[d("固定表头和列 "),e("a",{class:"header-anchor",href:"#固定表头和列","aria-label":'Permalink to "固定表头和列"'},"​")],-1)),t[14]||(t[14]=e("p",null,[d("设置 "),e("code",null,"fixed-head"),d(" 属性即可实现固定表头。将需要固定的列设置 "),e("code",null,"fixed"),d(" 为 "),e("code",null,"left"),d(" 或 "),e("code",null,"right"),d("，就能实现固定列。")],-1)),l(o,null,{default:r(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" fixed-head max-height="200px"></l-table>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),e("textarea",{lang:"js"},`  import { on, $$ } from 'ph-utils/dom';
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
        'data-id': \`\${rowData.id}\`
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
`)])],-1)])]),_:1}),t[15]||(t[15]=s('<blockquote><p>可以通过 <code>max-height</code> 来设置表格的最大高度, 以更好的适配固定 <code>head</code></p></blockquote><blockquote><p>如果需要改变滚动条样式，引入 <a href="/litos-ui/css_util#_3-滚动条样式">滚动条样式</a>，然后给 <code>table</code> 添加 <code>l-scrollbar</code></p></blockquote><h3 id="排序" tabindex="-1">排序 <a class="header-anchor" href="#排序" aria-label="Permalink to &quot;排序&quot;">​</a></h3><p>给列的选项增加 <code>sorter</code> 为 <code>true</code>、<code>costom</code> 来启用排序，同时配置 <code>key</code> 字段标记排序 <code>key</code>；如果 <code>sorter=costom</code> 就能启用手动排序，这个时候会触发一个<code>sort</code> 事件，然后在 <code>sort</code> 事件中调用 <code>setData</code> 方法来设置排序后的数据。</p>',4)),l(o,null,{default:r(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[16]||(t[16]=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="table-attibutes" tabindex="-1">Table Attibutes <a class="header-anchor" href="#table-attibutes" aria-label="Permalink to &quot;Table Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>stripe</code></td><td>斑马纹</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>border</code></td><td>是否显示四周边框</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>fixed-head</code></td><td>是否固定表头</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>fixed-column</code></td><td>是否固定列，在进行列解析时，会自动确认该属性</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>max-height</code></td><td>最大高度</td><td><code>number | string</code></td><td><code>undefined</code></td></tr><tr><td><code>table-layout</code></td><td>表格布局</td><td><code>&quot;auto&quot; | &quot;fixed&quot;</code></td><td><code>undefined</code></td></tr></tbody></table><h3 id="table-column-attributes" tabindex="-1">Table Column Attributes <a class="header-anchor" href="#table-column-attributes" aria-label="Permalink to &quot;Table Column Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>title</code></td><td>列的标题</td><td><code>string</code></td></tr><tr><td><code>key</code></td><td>列标识, 列排序必传</td><td><code>string</code></td></tr><tr><td><code>width</code></td><td>列宽度, 固定列时，需要传</td><td><code>number</code> | <code>string</code></td></tr><tr><td><code>fixed</code></td><td>是否固定列</td><td><code>&quot;left&quot;</code> | <code>&quot;right&quot;</code></td></tr><tr><td><code>left</code></td><td>列固定左时, 左边偏移量</td><td><code>number</code></td></tr><tr><td><code>right</code></td><td>列固定右时, 右边偏移量</td><td><code>number</code></td></tr><tr><td><code>children</code></td><td>多级表头</td><td><code>Column[]</code></td></tr><tr><td><code>titleRowspan</code></td><td>表头跨行</td><td><code>number</code></td></tr><tr><td><code>titleColspan</code></td><td>表头跨列</td><td><code>number</code></td></tr><tr><td><code>sorter</code></td><td>列是否支持排序</td><td><code>boolean</code> | <code>&quot;custom&quot;</code></td></tr><tr><td><code>style</code></td><td>列的样式</td><td><code>Record&lt;string, string | null | undefined&gt;</code></td></tr><tr><td><code>colspan</code></td><td>td colspan</td><td><code>number</code> | <code>(rowData: any, rowIndex: number) =&gt; number</code></td></tr><tr><td><code>rowspan</code></td><td>td rowspan</td><td><code>number</code> | <code>(rowData: any, rowIndex: number) =&gt; number</code></td></tr><tr><td><code>render</code></td><td>单元格内容渲染函数</td><td><code>(rowData: any, rowIndex: number) =&gt; HTMLElement | DocumentFragment | HTMLElement[] | string</code></td></tr></tbody></table><h3 id="table-events" tabindex="-1">Table Events <a class="header-anchor" href="#table-events" aria-label="Permalink to &quot;Table Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th><th>detail</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td><td>-</td></tr><tr><td><code>sort</code></td><td>排序时触发</td><td><code>(event: CustomEvent)</code></td><td><code>{ index: number, key: string, dir: asc | desc }</code></td></tr><tr><td><code>[action]</code></td><td>所有设置了 <code>data-action</code> 属性的节点，点击时触发</td><td><code>(event: CustomEvent)</code></td><td>该节点上的所有的 <code>dataset</code> 属性</td></tr></tbody></table><h3 id="table-methods" tabindex="-1">Table Methods <a class="header-anchor" href="#table-methods" aria-label="Permalink to &quot;Table Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>setColumns</code></td><td>设置列</td><td><code>(columns: Column[]) =&gt; void</code></td></tr><tr><td><code>setData</code></td><td>设置数据</td><td><code>(data: any[], sortInfo?: {key: string; order: &quot;asc&quot; | &quot;desc&quot;}}) =&gt; void</code></td></tr></tbody></table><h3 id="table-css-variables" tabindex="-1">Table CSS Variables <a class="header-anchor" href="#table-css-variables" aria-label="Permalink to &quot;Table CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-table-max-height</code></td><td>表格最大高度</td><td><code>100%</code></td></tr><tr><td><code>--l-table-font-size</code></td><td>表格字体大小</td><td><code>14px</code></td></tr><tr><td><code>--l-table-td-padding</code></td><td>单元格内边距</td><td><code>10px</code></td></tr><tr><td><code>--l-table-th-padding</code></td><td>表头单元格内边距</td><td><code>10px</code></td></tr><tr><td><code>--l-table-layout</code></td><td>表格布局；<code>auto</code> 或 <code>fixed</code></td><td><code>auto</code></td></tr><tr><td><code>--l-table-border-color</code></td><td>表格边框颜色（包括单元格底部和边框表格）</td><td><code>#e6e6e6</code></td></tr><tr><td><code>--l-table-th-bg</code></td><td>表头背景色</td><td><code>#f2f2f2</code></td></tr><tr><td><code>--l-table-th-color</code></td><td>表头文字颜色</td><td><code>#000000</code></td></tr><tr><td><code>--l-table-td-bg</code></td><td>单元格背景色</td><td><code>#ffffff</code></td></tr><tr><td><code>--l-table-td-color</code></td><td>单元格文字颜色</td><td><code>#000000</code></td></tr><tr><td><code>--l-table-row-hover-bg</code></td><td>行悬停时单元格背景色</td><td><code>#f2f2f2</code></td></tr><tr><td><code>--l-table-empty-color</code></td><td>空状态文字颜色</td><td><code>#999999</code></td></tr><tr><td><code>--l-table-stripe-bg</code></td><td>斑马纹偶数行背景色</td><td><code>#fafafa</code></td></tr><tr><td><code>--l-table-sort-inactive-color</code></td><td>排序图标未激活状态颜色</td><td><code>#c0c4cc</code></td></tr></tbody></table>',11))])}}});export{$ as __pageData,D as default};
