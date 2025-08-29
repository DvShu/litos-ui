import{_ as i,C as l,c as s,o as h,ag as o,G as r,j as e,w as n,a}from"./chunks/framework._HD6XqYi.js";const P=JSON.parse('{"title":"PageHeader","description":"","frontmatter":{},"headers":[],"relativePath":"components/page_header.md","filePath":"components/page_header.md","lastUpdated":1753941375000}'),c={name:"components/page_header.md"};function p(g,t,b,u,m,k){const d=l("ClientOnly");return h(),s("div",null,[t[2]||(t[2]=o("",7)),r(d,null,{default:n(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-page-header page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right"></l-more-icon>
  </l-page-header>
  <hr/>
  <l-page-header page-title="标题" align="center" show-right height="44px" border>
    <l-more-icon slot="right" data-action="more"></l-more-icon>
  </l-page-header>
`)],-1)])]),_:1}),t[3]||(t[3]=e("h3",{id:"监听事件",tabindex:"-1"},[a("监听事件 "),e("a",{class:"header-anchor",href:"#监听事件","aria-label":'Permalink to "监听事件"'},"​")],-1)),t[4]||(t[4]=e("p",null,[a("通过监听 "),e("code",null,"page-header"),a(" 的 "),e("code",null,"action"),a(" 事件, 然后给任何子节点添加 "),e("code",null,"l-action"),a(" 属性, 点击子节点会自动触发 "),e("code",null,"action"),a(" 事件。")],-1)),r(d,null,{default:n(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-page-header page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right" l-action="more"></l-more-icon>
  </l-page-header>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-page-header id="header" page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right" l-action="more" data-param="1"></l-more-icon>
  </l-page-header>
`),e("textarea",{lang:"js"},`  const header = document.getElementById("header");
  header.addEventListener("action", (e) => {
    const detail = e.detail;
    if (detail.action === 'back') {
      // 点击了返回按钮
    } else if (detail.action === 'more') {
      console.log(detail.param); // 1
    }
  });
`)])],-1)])]),_:1}),t[5]||(t[5]=o("",11))])}const _=i(c,[["render",p]]);export{P as __pageData,_ as default};
