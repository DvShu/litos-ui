import{_ as r,C as o,o as l,c as h,a2 as i,E as s,w as n,j as t,a}from"./chunks/framework.nU6eqUhJ.js";const f=JSON.parse('{"title":"PageHeader","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/page_header.md","filePath":"en/components/page_header.md","lastUpdated":1793253144000}'),c={name:"en/components/page_header.md"};function p(g,e,b,u,m,k){const d=o("ClientOnly");return l(),h("div",null,[e[2]||(e[2]=i("",7)),s(d,null,{default:n(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-page-header page-title="Title" page-sub-title="Subtitle" back-text="Back" show-right>
    <l-more-icon slot="right"></l-more-icon>
  </l-page-header>
  <hr/>
  <l-page-header page-title="Title" align="center" back-text="Back" show-right height="44px" border>
    <l-more-icon slot="right" data-action="more"></l-more-icon>
  </l-page-header>
`)],-1)])]),_:1}),e[3]||(e[3]=t("h3",{id:"events",tabindex:"-1"},[a("Events "),t("a",{class:"header-anchor",href:"#events","aria-label":'Permalink to "Events"'},"​")],-1)),e[4]||(e[4]=t("p",null,[a("Add "),t("code",null,"l-action"),a(" to a child element and listen for the page header’s "),t("code",null,"action"),a(" event. Clicking that child emits the event.")],-1)),s(d,null,{default:n(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-page-header page-title="Title" page-sub-title="Subtitle" back-text="Back" show-right>
    <l-more-icon slot="right" l-action="more"></l-more-icon>
  </l-page-header>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-page-header id="header" page-title="Title" page-sub-title="Subtitle" back-text="Back" show-right>
    <l-more-icon slot="right" l-action="more" data-param="1"></l-more-icon>
  </l-page-header>
`),t("textarea",{lang:"js"},`  const header = document.getElementById("header");
  header.addEventListener("action", (e) => {
    const detail = e.detail;
    if (detail.action === 'back') {
      // The back button was clicked.
    } else if (detail.action === 'more') {
      console.log(detail.param); // 1
    }
  });
`)])],-1)])]),_:1}),e[5]||(e[5]=i("",15))])}const E=r(c,[["render",p]]);export{f as __pageData,E as default};
