import{_ as l,C as d,o as b,c as o,a2 as i,E as s,w as r,j as a,a as e}from"./chunks/framework.nU6eqUhJ.js";const g=JSON.parse('{"title":"Tabbar 标签栏","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabbar.md","filePath":"components/tabbar.md","lastUpdated":1793115401000}'),c={name:"components/tabbar.md"};function h(p,t,m,u,k,E){const n=d("ClientOnly");return b(),o("div",null,[t[4]||(t[4]=i("",8)),s(n,null,{default:r(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar style="border: 1px solid #dedede" name="Search">
    <l-tabbar-item name="Reduction" icon>
      <l-reduction-icon slot="icon"></l-reduction-icon>
      <span>Reduction</span>
    </l-tabbar-item>
    <l-tabbar-item name="RefreshLieft" icon>
      <l-refresh-left-icon slot="icon"></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </l-tabbar-item>
    <l-tabbar-item name="Search" icon>
      <l-search-icon slot="icon"></l-search-icon>
      <span>Search</span>
    </l-tabbar-item>
    <l-tabbar-item name="RefreshRight" icon>
      <l-refresh-right-icon slot="icon"></l-refresh-right-icon>
      <span>RefreshRight</span>
    </l-tabbar-item>
    <l-tabbar-item name="Sort" icon>
      <l-sort-icon slot="icon"></l-sort-icon>
      <span>Sort</span>
    </l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),t[5]||(t[5]=a("h3",{id:"选项卡模式",tabindex:"-1"},[e("选项卡模式 "),a("a",{class:"header-anchor",href:"#选项卡模式","aria-label":'Permalink to "选项卡模式"'},"​")],-1)),t[6]||(t[6]=a("p",null,[e("基础的、简洁的选项卡，设置 "),a("code",null,"type"),e(" 为 "),a("code",null,"bar"),e("。")],-1)),s(n,null,{default:r(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar type="bar" name="2">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),t[7]||(t[7]=a("h3",{id:"卡片式",tabindex:"-1"},[e("卡片式 "),a("a",{class:"header-anchor",href:"#卡片式","aria-label":'Permalink to "卡片式"'},"​")],-1)),t[8]||(t[8]=a("p",null,[e("具有卡片风格的标签。只需要设置 "),a("code",null,"type"),e(" 属性为 "),a("code",null,"card"),e(" 就可以使选项卡改变为标签风格。 同时可以通过 "),a("code",null,"gap"),e(" 调整选项卡之间的间距。")],-1)),s(n,null,{default:r(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar type="card" name="1">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),t[9]||(t[9]=a("h3",{id:"排列方式",tabindex:"-1"},[e("排列方式 "),a("a",{class:"header-anchor",href:"#排列方式","aria-label":'Permalink to "排列方式"'},"​")],-1)),t[10]||(t[10]=a("p",null,[e("主轴的排列方式，只对 "),a("code",null,"bar"),e(" 类型生效。只需要将 "),a("code",null,"justify-content"),e(" 的属性设置为 "),a("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E5%80%BC",target:"_blank",rel:"noreferrer"},"justify-content"),e(" 可用值即可。")],-1)),s(n,null,{default:r(()=>[...t[3]||(t[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" justify-content="center">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <l-tabbar-item name="1">选项1</l-tabbar-item>
    <l-tabbar-item name="2">选项2</l-tabbar-item>
    <l-tabbar-item name="3">选项3</l-tabbar-item>
  </l-tabbar>
`)],-1)])]),_:1}),t[11]||(t[11]=i("",14))])}const f=l(c,[["render",h]]);export{g as __pageData,f as default};
