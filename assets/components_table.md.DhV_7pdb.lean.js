import{b as p,i as f,o as g,a as x,c}from"./chunks/dom.DntxtiBs.js";import{v as k,P as y,x as q,C as T,o as C,c as v,ag as s,E as l,w as r,j as e,a as d}from"./chunks/framework.-4c4jpF6.js";const $=JSON.parse('{"title":"Table 表格","description":"","frontmatter":{},"headers":[],"relativePath":"components/table.md","filePath":"components/table.md","lastUpdated":1768057580000}'),w={name:"components/table.md"},D=Object.assign(w,{setup(P){let n;const i=[{id:1,name:"张三",age:18,address:"北京朝阳"},{id:2,name:"李四",age:19,address:"北京朝阳"},{id:3,name:"王五",age:20,address:"北京朝阳"}];let u=i.concat([{id:4,name:"赵六",age:21,address:"北京朝阳"},{id:5,name:"钱七",age:22,address:"北京朝阳"},{id:6,name:"孙八",age:23,address:"北京朝阳"}]);const h=[{title:"姓名",key:"name",sorter:!0},{title:"年龄",key:"age",sorter:!0},{title:"住址",key:"address"},{title:"操作",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(c("l-button",{...o,"data-action":"edit",textContent:"编辑"})),t.push(c("l-button",{...o,"data-action":"delete",textContent:"删除"})),t}}];let m=[{title:"姓名",key:"name",width:80,fixed:"left"},{title:"年龄",key:"age",width:200},{title:"住址",key:"address",width:200},{title:"操作",width:200,fixed:"right",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(c("l-button",{...o,"data-action":"edit",textContent:"编辑"})),t.push(c("l-button",{...o,"data-action":"delete",textContent:"删除"})),t}}];function b(a){const t=a.detail;t.action==="edit"||t.action}return k(()=>{y(()=>{n=p(".data-table"),n.length&&(f(n,(a,t)=>{t===4?a.setColumns(m):a.setColumns(h),t===3?a.setData([]):t===4?a.setData(u):a.setData(i)}),g(n[0],"action",b))})}),q(()=>{n&&n.length&&x(n[0],"action",b),n=null}),(a,t)=>{const o=T("ClientOnly");return C(),v("div",null,[t[6]||(t[6]=s("",8)),l(o,null,{default:r(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
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
`)])],-1)])]),_:1}),t[15]||(t[15]=s("",4)),l(o,null,{default:r(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[16]||(t[16]=s("",11))])}}});export{$ as __pageData,D as default};
