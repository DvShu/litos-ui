import{b as f,i as y,o as u,a as b,c as s}from"./chunks/browser.CpyXlELn.js";import{v as x,P as k,x as C,C as w,o as q,c as v,a2 as c,E as l,w as r,j as e,a as d}from"./chunks/framework.nU6eqUhJ.js";const A=JSON.parse('{"title":"Table","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/table.md","filePath":"en/components/table.md","lastUpdated":1793253144000}'),E={name:"en/components/table.md"},P=Object.assign(E,{setup(T){let n;const h=[{id:1,name:"Zhang San",age:18,address:"Chaoyang, Beijing"},{id:2,name:"Li Si",age:19,address:"Chaoyang, Beijing"},{id:3,name:"Wang Wu",age:20,address:"Chaoyang, Beijing"}];let m=h.concat([{id:4,name:"Zhao Liu",age:21,address:"Chaoyang, Beijing"},{id:5,name:"Qian Qi",age:22,address:"Chaoyang, Beijing"},{id:6,name:"Sun Ba",age:23,address:"Chaoyang, Beijing"}]);const p=[{title:"Name",key:"name",sorter:!0},{title:"Age",key:"age",sorter:!0},{title:"Address",key:"address"},{title:"Actions",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(s("l-button",{...o,"data-action":"edit",textContent:"Edit"})),t.push(s("l-button",{...o,"data-action":"delete",textContent:"Delete"})),t}}];let g=[{title:"Name",key:"name",width:80,fixed:"left"},{title:"Age",key:"age",width:200},{title:"Address",key:"address",width:200},{title:"Actions",width:200,fixed:"right",render:a=>{const t=[],o={text:!0,type:"primary","data-id":`${a.id}`,height:"auto"};return t.push(s("l-button",{...o,"data-action":"edit",textContent:"Edit"})),t.push(s("l-button",{...o,"data-action":"delete",textContent:"Delete"})),t}}];function i(a){const t=a.detail;t.action==="edit"||t.action}return x(()=>{k(()=>{n=f(".data-table"),n.length&&(y(n,(a,t)=>{t===4?a.setColumns(g):a.setColumns(p),t===3?a.setData([]):t===4?a.setData(m):a.setData(h)}),u(n[0],"edit",i),u(n[0],"delete",i))})}),C(()=>{n&&n.length&&(b(n[0],"edit",i),b(n[0],"delete",i)),n=null}),(a,t)=>{const o=w("ClientOnly");return q(),v("div",null,[t[6]||(t[6]=c("",8)),l(o,null,{default:r(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table"></l-table>
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
`)])],-1)])]),_:1}),t[15]||(t[15]=c("",4)),l(o,null,{default:r(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-table class="data-table" border></l-table>
`)],-1)])]),_:1}),t[16]||(t[16]=c("",14))])}}});export{A as __pageData,P as default};
