import{b as u,i as p,o as m,a as k,c as i}from"./chunks/dom.DBNJew1L.js";import{v as f,P as g,x,C as y,c as T,o as _,ag as o,G as r,j as a,w as h,a as d}from"./chunks/framework._HD6XqYi.js";const E=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"components/table.md","filePath":"components/table.md","lastUpdated":1756361320000}'),v={name:"components/table.md"},S=Object.assign(v,{setup(q){let e;const b=[{id:1,name:"张三",age:18,address:"北京朝阳"},{id:2,name:"李四",age:19,address:"北京朝阳"},{id:3,name:"王五",age:20,address:"北京朝阳"}],c=[{title:"姓名",key:"name"},{title:"年龄",key:"age"},{title:"住址",key:"address"},{title:"操作",render:n=>{const t=[],l={text:!0,type:"primary","data-id":`${n.id}`,height:"auto"};return t.push(i("l-button",{...l,"data-action":"edit",textContent:"编辑"})),t.push(i("l-button",{...l,"data-action":"delete",textContent:"删除"})),t}}];function s(n){const t=n.detail;t.action==="edit"||t.action}return f(()=>{g(()=>{e=u(".data-table"),e.length&&(p(e,n=>{n.setColumns(c),n.setData(b)}),m(e[0],"action",s))})}),x(()=>{e&&e.length&&k(e[0],"action",s),e=null}),(n,t)=>{const l=y("ClientOnly");return _(),T("div",null,[t[2]||(t[2]=o(`<h1 id="table-表格" tabindex="-1">Table 表格 <a class="header-anchor" href="#table-表格" aria-label="Permalink to &quot;Table 表格&quot;">​</a></h1><p>用于展示大量结构化数据</p><p>这个表格只是一个简单的数据展示功能，只包含有固定表头和列、排序功能。如果当前组件不能满足需求需要使用更多功能的时候，可以考虑使用 <a href="https://tanstack.com/table/latest" target="_blank" rel="noreferrer">TanstackTable</a></p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Table } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Table);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>先通过 <code>setColumns()</code> 定义列, 再通过 <code>setData()</code> 定义数据源；如果需要最后一列操作列，则可以通过给元素定义 <code>data-action</code> 属性，然后监听 <code>table</code> 的 <code>action</code> 事件。</p>`,8)),r(l,null,{default:h(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`),a("textarea",{lang:"js"},`  import { on, $$ } from 'ph-utils/dom';
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
`)])],-1)])]),_:1}),t[3]||(t[3]=a("h3",{id:"斑马纹",tabindex:"-1"},[d("斑马纹 "),a("a",{class:"header-anchor",href:"#斑马纹","aria-label":'Permalink to "斑马纹"'},"​")],-1)),t[4]||(t[4]=a("p",null,[d("表格默认带斑马纹，可以通过设置 "),a("code",null,"stripe"),d(" 为 "),a("code",null,"off"),d(" 来取消斑马纹")],-1)),r(l,null,{default:h(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-table class="data-table" stripe="off"></l-table>
`)],-1)])]),_:1}),t[5]||(t[5]=o('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="table-attibutes" tabindex="-1">Table Attibutes <a class="header-anchor" href="#table-attibutes" aria-label="Permalink to &quot;Table Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="table-slots" tabindex="-1">Table Slots <a class="header-anchor" href="#table-slots" aria-label="Permalink to &quot;Table Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr></tbody></table><h3 id="table-events" tabindex="-1">Table Events <a class="header-anchor" href="#table-events" aria-label="Permalink to &quot;Table Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td></tr></tbody></table><h3 id="table-methods" tabindex="-1">Table Methods <a class="header-anchor" href="#table-methods" aria-label="Permalink to &quot;Table Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="table-css-variables" tabindex="-1">Table CSS Variables <a class="header-anchor" href="#table-css-variables" aria-label="Permalink to &quot;Table CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-table-td-padding</code></td><td>单元格内边距</td><td><code>10px</code></td></tr><tr><td><code>--l-table-th-padding</code></td><td>表头单元格内边距</td><td><code>var(--l-table-td-padding)</code></td></tr></tbody></table>',11))])}}});export{E as __pageData,S as default};
