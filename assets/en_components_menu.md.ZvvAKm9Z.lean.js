import{$ as r,b as m,o as b,a as k,c as l}from"./chunks/browser.7zTvUqO3.js";import{v as y,P as g,x as f,C as x,o as v,c as E,a2 as p,E as c,w as u,j as e,a as d}from"./chunks/framework.nU6eqUhJ.js";const w=JSON.parse('{"title":"Menu","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/menu.md","filePath":"en/components/menu.md","lastUpdated":1793253144000}'),M={name:"en/components/menu.md"},O=Object.assign(M,{setup(A){const s=[{key:"N1",label:"Navigation 1",icon:()=>l("iconify-icon",{icon:"tdesign:app"}),children:[{key:"A1",label:"Option 1"},{key:"A2",label:"Option 2"},{key:"A3",label:"Option 3"}]},{key:"N2",label:"Navigation 2",icon:()=>l("iconify-icon",{icon:"solar:bug-outline"}),children:[{key:"B1",label:"Option 1"},{key:"B2",label:"Option 2"},{key:"B3",label:"Option 3"}]},{key:"N3",label:"Navigation 3",icon:()=>l("iconify-icon",{icon:"stash:light-bulb"}),children:[{key:"C1",label:"Option 1"},{key:"C2",label:"Option 2"}]},{key:"N4",label:"Option 4",icon:()=>l("iconify-icon",{icon:"solar:book-linear"})}];let i,o;function h(n){if(n.target.getAttribute("role")==="collapsed"){const a=n.target.getAttribute("data-action");o&&(a==="collapse"?o.setAttribute("collapsed",""):o.removeAttribute("collapsed"))}}return y(()=>{g(()=>{{const n=r("#menu");n.items=s;const t=r("#menu-accordion");t.items=s,o=r("#menu-collapsed"),o&&(o.items=s),i=m("l-button[role]"),i&&i.forEach(a=>{b(a,"click",h)})}})}),f(()=>{i&&i.forEach(n=>{k(n,"click",h)})}),(n,t)=>{const a=x("ClientOnly");return v(),E("div",null,[t[3]||(t[3]=p("",8)),c(a,null,{default:u(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-menu id="menu" selected-index="A1">
  </l-menu>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`    <l-menu id="menu" selected-index="A1">
    </l-menu>
  `),e("textarea",{lang:"ts"},`    const menuItems = [
      {
        key: "N1",
        label: "Navigation 1",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "Option 1" },
          { key: "A2", label: "Option 2" },
          { key: "A3", label: "Option 3" },
        ],
      },
      {
        key: "N2",
        label: "Navigation 2",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "Option 1" },
          { key: "B2", label: "Option 2" },
          { key: "B3", label: "Option 3" },
        ],
      },
      {
        key: "N3",
        label: "Navigation 3",
        icon: () => {
          return $$('iconify-icon', { icon: 'stash:light-bulb' });
        },
        children: [
          { key: "C1", label: "Option 1" },
          { key: "C2", label: "Option 2" },
        ],
      },
      {
        key: "N4",
        label: "Option 4",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),t[4]||(t[4]=e("h3",{id:"accordion-mode",tabindex:"-1"},[d("Accordion Mode "),e("a",{class:"header-anchor",href:"#accordion-mode","aria-label":'Permalink to "Accordion Mode"'},"​")],-1)),t[5]||(t[5]=e("p",null,[d("Set the "),e("code",null,"accordion"),d(" attribute to keep only one submenu expanded at a time.")],-1)),c(a,null,{default:u(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-menu id="menu-accordion" accordion>
  </l-menu>
`)],-1)])]),_:1}),t[6]||(t[6]=e("h3",{id:"collapsed-mode",tabindex:"-1"},[d("Collapsed Mode "),e("a",{class:"header-anchor",href:"#collapsed-mode","aria-label":'Permalink to "Collapsed Mode"'},"​")],-1)),t[7]||(t[7]=e("p",null,[d("Set "),e("code",null,"collapsed"),d(" to display a narrow, icon-only menu and collapse all expanded submenus. Use "),e("code",null,"collapsed-width"),d(" to set the collapsed width and "),e("code",null,"collapsed-icon-size"),d(" to set the icon size in this mode.")],-1)),c(a,null,{default:u(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div>
    <l-button role="collapsed" data-action="expand">Expand</l-button>
    <l-button role="collapsed" data-action="collapse">Collapse</l-button>
  </div>
  <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
  </l-menu>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`    <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
    </l-menu>
  `),e("textarea",{lang:"ts"},`    const menuItems = [
      {
        key: "N1",
        label: "Navigation 1",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "Option 1" },
          { key: "A2", label: "Option 2" },
          { key: "A3", label: "Option 3" },
        ],
      },
      {
        key: "N2",
        label: "Navigation 2",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "Option 1" },
          { key: "B2", label: "Option 2" },
          { key: "B3", label: "Option 3" },
        ],
      },
      {
        key: "N4",
        label: "Option 4",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu-collapsed');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),t[8]||(t[8]=p("",16))])}}});export{w as __pageData,O as default};
