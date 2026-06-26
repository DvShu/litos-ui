import{$ as l,c as d}from"./chunks/dom.BraL7hJS.js";import{v as h,P as u,C as m,o as b,c as p,a2 as r,E as c,w as s,j as t,a}from"./chunks/framework.DEyxsvWG.js";const x=JSON.parse('{"title":"Menu 菜单","description":"","frontmatter":{},"headers":[],"relativePath":"components/menu.md","filePath":"components/menu.md","lastUpdated":1781371650000}'),k={name:"components/menu.md"},_=Object.assign(k,{setup(y){const n=[{key:"N1",label:"导航一",icon:()=>d("iconify-icon",{icon:"tdesign:app"}),children:[{key:"A1",label:"选项1"},{key:"A2",label:"选项2"},{key:"A3",label:"选项3"}]},{key:"N2",label:"导航二",icon:()=>d("iconify-icon",{icon:"solar:bug-outline"}),children:[{key:"B1",label:"选项1"},{key:"B2",label:"选项2"},{key:"B3",label:"选项3"}]},{key:"N3",label:"导航三",icon:()=>d("iconify-icon",{icon:"stash:light-bulb"}),children:[{key:"C1",label:"选项1"},{key:"C2",label:"选项2"}]},{key:"N4",label:"选项四",icon:()=>d("iconify-icon",{icon:"solar:book-linear"})}];return h(()=>{u(()=>{{const o=l("#menu");o.items=n;const e=l("#menu-accordion");e.items=n}})}),(o,e)=>{const i=m("ClientOnly");return b(),p("div",null,[e[2]||(e[2]=r("",7)),c(i,null,{default:s(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-menu id="menu" selected-index="A1">
  </l-menu>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`    <l-menu id="menu" selected-index="A1">
    </l-menu>
  `),t("textarea",{lang:"ts"},`    const menuItems = [
      {
        key: "N1",
        label: "导航一",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "选项1" },
          { key: "A2", label: "选项2" },
          { key: "A3", label: "选项3" },
        ],
      },
      {
        key: "N2",
        label: "导航二",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "选项1" },
          { key: "B2", label: "选项2" },
          { key: "B3", label: "选项3" },
        ],
      },
      {
        key: "N3",
        label: "导航三",
        icon: () => {
          return $$('iconify-icon', { icon: 'stash:light-bulb' });
        },
        children: [
          { key: "C1", label: "选项1" },
          { key: "C2", label: "选项2" },
        ],
      },
      {
        key: "N4",
        label: "选项四",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),e[3]||(e[3]=t("h3",{id:"手风琴模式",tabindex:"-1"},[a("手风琴模式 "),t("a",{class:"header-anchor",href:"#手风琴模式","aria-label":'Permalink to "手风琴模式"'},"​")],-1)),e[4]||(e[4]=t("p",null,[a("设置 "),t("code",null,"accordion"),a(" 属性，同一时间只展开一个子菜单。")],-1)),c(i,null,{default:s(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-menu id="menu-accordion" accordion> 
  </l-menu>
`)],-1)])]),_:1}),e[5]||(e[5]=r("",13))])}}});export{x as __pageData,_ as default};
