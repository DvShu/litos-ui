import{b as u,i as p,o as m,a as k,c as i}from"./chunks/dom.DBNJew1L.js";import{v as f,P as g,x,C as y,c as T,o as _,ag as o,G as r,j as a,w as h,a as d}from"./chunks/framework._HD6XqYi.js";const E=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"components/table.md","filePath":"components/table.md","lastUpdated":1756361320000}'),v={name:"components/table.md"},S=Object.assign(v,{setup(q){let e;const b=[{id:1,name:"张三",age:18,address:"北京朝阳"},{id:2,name:"李四",age:19,address:"北京朝阳"},{id:3,name:"王五",age:20,address:"北京朝阳"}],c=[{title:"姓名",key:"name"},{title:"年龄",key:"age"},{title:"住址",key:"address"},{title:"操作",render:n=>{const t=[],l={text:!0,type:"primary","data-id":`${n.id}`,height:"auto"};return t.push(i("l-button",{...l,"data-action":"edit",textContent:"编辑"})),t.push(i("l-button",{...l,"data-action":"delete",textContent:"删除"})),t}}];function s(n){const t=n.detail;t.action==="edit"||t.action}return f(()=>{g(()=>{e=u(".data-table"),e.length&&(p(e,n=>{n.setColumns(c),n.setData(b)}),m(e[0],"action",s))})}),x(()=>{e&&e.length&&k(e[0],"action",s),e=null}),(n,t)=>{const l=y("ClientOnly");return _(),T("div",null,[t[2]||(t[2]=o("",8)),r(l,null,{default:h(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
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
`)],-1)])]),_:1}),t[5]||(t[5]=o("",11))])}}});export{E as __pageData,S as default};
