import{_ as r,C as o,o as l,c as h,a2 as s,E as n,w as i,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const E=JSON.parse('{"title":"PageHeader","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/page_header.md","filePath":"en/components/page_header.md","lastUpdated":1793115401000}'),c={name:"en/components/page_header.md"};function p(g,t,b,u,m,k){const d=o("ClientOnly");return l(),h("div",null,[t[2]||(t[2]=s("",7)),n(d,null,{default:i(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-page-header page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right"></l-more-icon>
  </l-page-header>
  <hr/>
  <l-page-header page-title="标题" align="center" show-right height="44px" border>
    <l-more-icon slot="right" data-action="more"></l-more-icon>
  </l-page-header>
`)],-1)])]),_:1}),t[3]||(t[3]=e("h3",{id:"监听事件",tabindex:"-1"},[a("监听事件 "),e("a",{class:"header-anchor",href:"#监听事件","aria-label":'Permalink to "监听事件"'},"​")],-1)),t[4]||(t[4]=e("p",null,[a("通过监听 "),e("code",null,"page-header"),a(" 的 "),e("code",null,"action"),a(" 事件, 然后给任何子节点添加 "),e("code",null,"l-action"),a(" 属性, 点击子节点会自动触发 "),e("code",null,"action"),a(" 事件。")],-1)),n(d,null,{default:i(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-page-header page-title="标题" page-sub-title="副标题" show-right>
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
`)])],-1)])]),_:1}),t[5]||(t[5]=s("",14))])}const f=r(c,[["render",p]]);export{E as __pageData,f as default};
