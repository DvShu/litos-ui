import{b as m,i as f,o as k,a as x,c as i}from"./chunks/dom.DBNJew1L.js";import{v as g,P as y,x as T,C as q,c as C,o as v,ag as c,G as o,j as e,w as s,a}from"./chunks/framework._HD6XqYi.js";const E=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"components/table.md","filePath":"components/table.md","lastUpdated":1756917444000}'),$={name:"components/table.md"},D=Object.assign($,{setup(P){let d;const r=[{id:1,name:"张三",age:18,address:"北京朝阳"},{id:2,name:"李四",age:19,address:"北京朝阳"},{id:3,name:"王五",age:20,address:"北京朝阳"}];let b=r.concat([{id:4,name:"赵六",age:21,address:"北京朝阳"},{id:5,name:"钱七",age:22,address:"北京朝阳"},{id:6,name:"孙八",age:23,address:"北京朝阳"}]);const u=[{title:"姓名",key:"name"},{title:"年龄",key:"age"},{title:"住址",key:"address"},{title:"操作",render:n=>{const t=[],l={text:!0,type:"primary","data-id":`${n.id}`,height:"auto"};return t.push(i("l-button",{...l,"data-action":"edit",textContent:"编辑"})),t.push(i("l-button",{...l,"data-action":"delete",textContent:"删除"})),t}}];let p=[{title:"姓名",key:"name",width:80,fixed:"left"},{title:"年龄",key:"age",width:200},{title:"住址",key:"address",width:200},{title:"操作",width:200,fixed:"right",render:n=>{const t=[],l={text:!0,type:"primary","data-id":`${n.id}`,height:"auto"};return t.push(i("l-button",{...l,"data-action":"edit",textContent:"编辑"})),t.push(i("l-button",{...l,"data-action":"delete",textContent:"删除"})),t}}];function h(n){const t=n.detail;t.action==="edit"||t.action}return g(()=>{y(()=>{d=m(".data-table"),d.length&&(f(d,(n,t)=>{t===4?n.setColumns(p):n.setColumns(u),t===3?n.setData([]):t===4?n.setData(b):n.setData(r)}),k(d[0],"action",h))})}),T(()=>{d&&d.length&&x(d[0],"action",h),d=null}),(n,t)=>{const l=q("ClientOnly");return v(),C("div",null,[t[5]||(t[5]=c(`<h1 id="table-表格" tabindex="-1">Table 表格 <a class="header-anchor" href="#table-表格" aria-label="Permalink to &quot;Table 表格&quot;">​</a></h1><p>用于展示大量结构化数据</p><p>这个表格只是一个简单的数据展示功能，只包含有固定表头和列、排序功能。如果当前组件不能满足需求需要使用更多功能的时候，可以考虑使用 <a href="https://tanstack.com/table/latest" target="_blank" rel="noreferrer">TanstackTable</a></p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { regist, Table } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Table);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>先通过 <code>setColumns()</code> 定义列, 再通过 <code>setData()</code> 定义数据源；如果需要最后一列操作列，则可以通过给元素定义 <code>data-action</code> 属性，然后监听 <code>table</code> 的 <code>action</code> 事件。</p>`,8)),o(l,null,{default:s(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
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
`)])],-1)])]),_:1}),t[6]||(t[6]=e("h3",{id:"斑马纹",tabindex:"-1"},[a("斑马纹 "),e("a",{class:"header-anchor",href:"#斑马纹","aria-label":'Permalink to "斑马纹"'},"​")],-1)),t[7]||(t[7]=e("p",null,[a("表格默认带斑马纹，可以通过设置 "),e("code",null,"stripe"),a(" 为 "),e("code",null,"off"),a(" 来取消斑马纹")],-1)),o(l,null,{default:s(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" stripe="off"></l-table>
`)],-1)])]),_:1}),t[8]||(t[8]=e("h3",{id:"边框",tabindex:"-1"},[a("边框 "),e("a",{class:"header-anchor",href:"#边框","aria-label":'Permalink to "边框"'},"​")],-1)),t[9]||(t[9]=e("p",null,[a("默认情况下，"),e("code",null,"Table"),a(" 组件是不具有竖直方向的边框的， 如果需要，可以使用 "),e("code",null,"border"),a(" 属性，把该属性设置为 "),e("code",null,"on"),a(" 即可启用。")],-1)),o(l,null,{default:s(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[10]||(t[10]=e("h3",{id:"空表格",tabindex:"-1"},[a("空表格 "),e("a",{class:"header-anchor",href:"#空表格","aria-label":'Permalink to "空表格"'},"​")],-1)),t[11]||(t[11]=e("p",null,"数据列表没有数据时，显示空表格",-1)),o(l,null,{default:s(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
`)],-1)])]),_:1}),t[12]||(t[12]=e("h3",{id:"固定表头和列",tabindex:"-1"},[a("固定表头和列 "),e("a",{class:"header-anchor",href:"#固定表头和列","aria-label":'Permalink to "固定表头和列"'},"​")],-1)),t[13]||(t[13]=e("p",null,[a("设置 "),e("code",null,"fixed-head"),a(" 属性即可实现固定表头。将需要固定的列设置 "),e("code",null,"fixed"),a(" 为 "),e("code",null,"left"),a(" 或 "),e("code",null,"right"),a("，就能实现固定列。")],-1)),o(l,null,{default:s(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" fixed-head max-height="200px"></l-table>
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
`)])],-1)])]),_:1}),t[14]||(t[14]=c('<blockquote><p>可以通过 <code>max-height</code> 来设置表格的最大高度, 以更好的适配固定 <code>head</code></p></blockquote><blockquote><p>如果需要改变滚动条样式，引入 <a href="/litos-ui/css_util#_3-滚动条样式">滚动条样式</a>，然后给 <code>table</code> 添加 <code>l-scrollbar</code></p></blockquote><h3 id="排序" tabindex="-1">排序 <a class="header-anchor" href="#排序" aria-label="Permalink to &quot;排序&quot;">​</a></h3><p>给列的选项增加 <code>sorter</code> 为 <code>true</code>、<code>default</code>、<code>(a,b)-&gt;number</code> 来启用排序，同时配置 <code>key</code> 字段标记排序 <code>key</code>；可以通过 <code>setDefaultSort</code> 设置初始排序；如果 <code>sorter=true</code> 就能启用手动排序，这个时候会触发一个<code>sorter</code> 事件</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="table-attibutes" tabindex="-1">Table Attibutes <a class="header-anchor" href="#table-attibutes" aria-label="Permalink to &quot;Table Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="table-slots" tabindex="-1">Table Slots <a class="header-anchor" href="#table-slots" aria-label="Permalink to &quot;Table Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr></tbody></table><h3 id="table-events" tabindex="-1">Table Events <a class="header-anchor" href="#table-events" aria-label="Permalink to &quot;Table Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td></tr></tbody></table><h3 id="table-methods" tabindex="-1">Table Methods <a class="header-anchor" href="#table-methods" aria-label="Permalink to &quot;Table Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="table-css-variables" tabindex="-1">Table CSS Variables <a class="header-anchor" href="#table-css-variables" aria-label="Permalink to &quot;Table CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-table-td-padding</code></td><td>单元格内边距</td><td><code>10px</code></td></tr><tr><td><code>--l-table-th-padding</code></td><td>表头单元格内边距</td><td><code>var(--l-table-td-padding)</code></td></tr><tr><td><code>--l-table-max-height</code></td><td>表格最大高度</td><td><code>100%</code></td></tr><tr><td><code>--l-table-layout</code></td><td>表格布局; <code>auto</code>、<code>fixed</code></td><td><code>auto</code></td></tr></tbody></table>',15))])}}});export{E as __pageData,D as default};
