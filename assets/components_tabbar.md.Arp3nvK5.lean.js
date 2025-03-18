import{_ as o,C as i,c as s,o as b,ag as l,G as n,j as t,w as r,a as e}from"./chunks/framework.BCyZWppQ.js";const y=JSON.parse('{"title":"Tabbar 标签栏","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabbar.md","filePath":"components/tabbar.md","lastUpdated":1736310296000}'),c={name:"components/tabbar.md"};function h(m,a,p,u,v,f){const d=i("ClientOnly");return b(),s("div",null,[a[5]||(a[5]=l("",8)),n(d,null,{default:r(()=>a[0]||(a[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar style="border: 1px solid #dedede" name="Search">
    <div l-name="Reduction">
      <l-reduction-icon l-icon></l-reduction-icon>
      <span>Reduction</span>
    </div>
    <div l-name="RefreshLieft">
      <l-refresh-left-icon l-icon></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </div>
    <div l-name="Search">
      <l-search-icon l-icon></l-search-icon>
      <span>Search</span>
    </div>
    <div l-name="RefreshRight">
      <l-refresh-right-icon l-icon></l-refresh-right-icon>
      <span>RefreshRight</span>
    </div>
    <div l-name="Sort">
      <l-sort-icon l-icon></l-sort-icon>
      <span>Sort</span>
    </div>
  </l-tabbar>
`)],-1)])),_:1}),a[6]||(a[6]=t("h3",{id:"选项卡模式",tabindex:"-1"},[e("选项卡模式 "),t("a",{class:"header-anchor",href:"#选项卡模式","aria-label":'Permalink to "选项卡模式"'},"​")],-1)),a[7]||(a[7]=t("p",null,[e("基础的、简洁的选项卡，设置 "),t("code",null,"type"),e(" 为 "),t("code",null,"bar"),e("。")],-1)),n(d,null,{default:r(()=>a[1]||(a[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="2">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
`)],-1)])),_:1}),a[8]||(a[8]=t("h3",{id:"卡片式",tabindex:"-1"},[e("卡片式 "),t("a",{class:"header-anchor",href:"#卡片式","aria-label":'Permalink to "卡片式"'},"​")],-1)),a[9]||(a[9]=t("p",null,[e("具有卡片风格的标签。只需要设置 "),t("code",null,"type"),e(" 属性为 "),t("code",null,"card"),e(" 就可以使选项卡改变为标签风格。 同时可以通过 "),t("code",null,"gap"),e(" 调整选项卡之间的间距。")],-1)),n(d,null,{default:r(()=>a[2]||(a[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="card" name="1">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
`)],-1)])),_:1}),a[10]||(a[10]=t("h3",{id:"排列方式",tabindex:"-1"},[e("排列方式 "),t("a",{class:"header-anchor",href:"#排列方式","aria-label":'Permalink to "排列方式"'},"​")],-1)),a[11]||(a[11]=t("p",null,[e("主轴的排列方式，只对 "),t("code",null,"bar"),e(" 类型生效。只需要将 "),t("code",null,"justify-content"),e(" 的属性设置为 "),t("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E5%80%BC",target:"_blank",rel:"noreferrer"},"justify-content"),e(" 可用值即可。")],-1)),n(d,null,{default:r(()=>a[3]||(a[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" justify-content="center">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
`)],-1)])),_:1}),a[12]||(a[12]=t("h3",{id:"自定义内容",tabindex:"-1"},[e("自定义内容 "),t("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),a[13]||(a[13]=t("p",null,[e("通过设置 "),t("code",null,"custom-content"),e(" 属性可以自定义选项卡的内容。这样的话，选项卡每一项的样式完全可控。给每一项添加 "),t("code",null,"l-name"),e(" 属性。")],-1)),n(d,null,{default:r(()=>a[4]||(a[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" custom-content class="custom-tabbar">
    <div l-name="1" class="custom-tabbar-item">选项1</div>
    <div l-name="2" class="custom-tabbar-item">选项2</div>
    <div l-name="3" class="custom-tabbar-item">选项3</div>
  </l-tabbar>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-tabbar type="bar" name="1" custom-content class="custom-tabbar">
    <div l-name="1" class="custom-tabbar-item">选项1</div>
    <div l-name="2" class="custom-tabbar-item">选项2</div>
    <div l-name="3" class="custom-tabbar-item">选项3</div>
  </l-tabbar>
`),t("textarea",{lang:"css"},`  .custom-tabbar {
    --l-tabbar-line-color: #4998f4;
    --l-tabbar-height: auto;
  }
  .custom-tabbar-item {
    padding: 10px 0;
  }
  .custom-tabbar-item.active {
    color: #4998f4;
  }
`)])],-1)])),_:1}),a[14]||(a[14]=l("",13))])}const k=o(c,[["render",h]]);export{y as __pageData,k as default};
