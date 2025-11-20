import{b as m,i as f,o as k,a as x,c as i}from"./chunks/dom.DBNJew1L.js";import{v as g,P as y,x as T,C as q,c as C,o as v,ag as c,G as o,j as e,w as s,a}from"./chunks/framework._HD6XqYi.js";const E=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"components/table.md","filePath":"components/table.md","lastUpdated":1756917444000}'),$={name:"components/table.md"},D=Object.assign($,{setup(P){let d;const r=[{id:1,name:"张三",age:18,address:"北京朝阳"},{id:2,name:"李四",age:19,address:"北京朝阳"},{id:3,name:"王五",age:20,address:"北京朝阳"}];let b=r.concat([{id:4,name:"赵六",age:21,address:"北京朝阳"},{id:5,name:"钱七",age:22,address:"北京朝阳"},{id:6,name:"孙八",age:23,address:"北京朝阳"}]);const u=[{title:"姓名",key:"name"},{title:"年龄",key:"age"},{title:"住址",key:"address"},{title:"操作",render:n=>{const t=[],l={text:!0,type:"primary","data-id":`${n.id}`,height:"auto"};return t.push(i("l-button",{...l,"data-action":"edit",textContent:"编辑"})),t.push(i("l-button",{...l,"data-action":"delete",textContent:"删除"})),t}}];let p=[{title:"姓名",key:"name",width:80,fixed:"left"},{title:"年龄",key:"age",width:200},{title:"住址",key:"address",width:200},{title:"操作",width:200,fixed:"right",render:n=>{const t=[],l={text:!0,type:"primary","data-id":`${n.id}`,height:"auto"};return t.push(i("l-button",{...l,"data-action":"edit",textContent:"编辑"})),t.push(i("l-button",{...l,"data-action":"delete",textContent:"删除"})),t}}];function h(n){const t=n.detail;t.action==="edit"||t.action}return g(()=>{y(()=>{d=m(".data-table"),d.length&&(f(d,(n,t)=>{t===4?n.setColumns(p):n.setColumns(u),t===3?n.setData([]):t===4?n.setData(b):n.setData(r)}),k(d[0],"action",h))})}),T(()=>{d&&d.length&&x(d[0],"action",h),d=null}),(n,t)=>{const l=q("ClientOnly");return v(),C("div",null,[t[5]||(t[5]=c("",8)),o(l,null,{default:s(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
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
`)])],-1)])]),_:1}),t[14]||(t[14]=c("",15))])}}});export{E as __pageData,D as default};
