import{_ as d,C as l,o,c as h,a2 as r,E as i,w as n,j as e,a as t}from"./chunks/framework.nU6eqUhJ.js";const E=JSON.parse('{"title":"Card","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/card.md","filePath":"en/components/card.md","lastUpdated":1793253144000}'),p={name:"en/components/card.md"};function c(k,a,u,b,m,g){const s=l("ClientOnly");return o(),h("div",null,[a[5]||(a[5]=r("",6)),i(s,null,{default:n(()=>[...a[0]||(a[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card header-text="Card title">
    <div>Card content</div>
    <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
  </l-card>
`)],-1)])]),_:1}),a[6]||(a[6]=e("h2",{id:"simple-card",tabindex:"-1"},[t("Simple Card "),e("a",{class:"header-anchor",href:"#simple-card","aria-label":'Permalink to "Simple Card"'},"​")],-1)),a[7]||(a[7]=e("p",null,[t("Show only the content area by setting "),e("code",null,'show-header="false"'),t(".")],-1)),i(s,null,{default:n(()=>[...a[1]||(a[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card header-text="Card title" show-header="false">
    <div>Card content</div>
  </l-card>
`)],-1)])]),_:1}),a[8]||(a[8]=e("h2",{id:"complete-card",tabindex:"-1"},[t("Complete Card "),e("a",{class:"header-anchor",href:"#complete-card","aria-label":'Permalink to "Complete Card"'},"​")],-1)),a[9]||(a[9]=e("p",null,"A card with a header, content, actions, and a footer.",-1)),i(s,null,{default:n(()=>[...a[2]||(a[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card header-text="Card title" show-footer footer-text="Footer">
    <div>Card content</div>
    <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
  </l-card>
`)],-1)])]),_:1}),a[10]||(a[10]=e("h2",{id:"custom-header-and-footer",tabindex:"-1"},[t("Custom Header and Footer "),e("a",{class:"header-anchor",href:"#custom-header-and-footer","aria-label":'Permalink to "Custom Header and Footer"'},"​")],-1)),a[11]||(a[11]=e("p",null,[t("Set "),e("code",null,"header-text"),t(" and "),e("code",null,"footer-text"),t(", or customize these areas with the "),e("code",null,"header"),t(" and "),e("code",null,"footer"),t(" slots.")],-1)),i(s,null,{default:n(()=>[...a[3]||(a[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-card show-footer>
    <span slot="header" style="color: red">Card title</span>
    <div>Card content</div>
    <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    <span slot="footer" style="color: orange">Footer</span>
  </l-card>
`)],-1)])]),_:1}),a[12]||(a[12]=e("h2",{id:"grid-cards",tabindex:"-1"},[t("Grid Cards "),e("a",{class:"header-anchor",href:"#grid-cards","aria-label":'Permalink to "Grid Cards"'},"​")],-1)),a[13]||(a[13]=e("p",null,"Combine cards with a grid layout to build a dashboard overview.",-1)),a[14]||(a[14]=e("p",null,[t("The library does not provide a grid layout. You can use "),e("a",{href:"https://unocss.dev/interactive/?s=grid",target:"_blank",rel:"noreferrer"},"unocss"),t(" or "),e("a",{href:"https://tailwindcss.com/docs/display#grid",target:"_blank",rel:"noreferrer"},"tailwindcss"),t(" for a CSS grid layout.")],-1)),i(s,null,{default:n(()=>[...a[4]||(a[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="grid grid-cols-3 gap-4">
    <l-card header-text="Card title1">
      <div>Card content1</div>
      <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    </l-card>
    <l-card header-text="Card title2">
      <div>Card content2</div>
      <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    </l-card>
    <l-card header-text="Card title3">
      <div>Card content3</div>
      <l-button slot="header-extra" text type="primary" size="small">Button</l-button>
    </l-card>
  </div>
`)],-1)])]),_:1}),a[15]||(a[15]=r("",19))])}const C=d(p,[["render",c]]);export{E as __pageData,C as default};
