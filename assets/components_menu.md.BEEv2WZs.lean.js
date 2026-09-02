import{$ as r,b,o as p,a as k,c as i}from"./chunks/browser.Chubywy5.js";import{v as y,P as f,x as g,C as x,o as v,c as A,a2 as m,E as s,w as u,j as e,a as d}from"./chunks/framework.0mmZ3Di7.js";const q=JSON.parse('{"title":"Menu 菜单","description":"","frontmatter":{},"headers":[],"relativePath":"components/menu.md","filePath":"components/menu.md","lastUpdated":1787493620000}'),$={name:"components/menu.md"},_=Object.assign($,{setup(M){const c=[{key:"N1",label:"导航一",icon:()=>i("iconify-icon",{icon:"tdesign:app"}),children:[{key:"A1",label:"选项1"},{key:"A2",label:"选项2"},{key:"A3",label:"选项3"}]},{key:"N2",label:"导航二",icon:()=>i("iconify-icon",{icon:"solar:bug-outline"}),children:[{key:"B1",label:"选项1"},{key:"B2",label:"选项2"},{key:"B3",label:"选项3"}]},{key:"N3",label:"导航三",icon:()=>i("iconify-icon",{icon:"stash:light-bulb"}),children:[{key:"C1",label:"选项1"},{key:"C2",label:"选项2"}]},{key:"N4",label:"选项四",icon:()=>i("iconify-icon",{icon:"solar:book-linear"})}];let l,a;function h(o){if(o.target.getAttribute("role")==="collapsed"){const n=o.target.getAttribute("data-action");a&&(n==="collapse"?a.setAttribute("collapsed",""):a.removeAttribute("collapsed"))}}return y(()=>{f(()=>{{const o=r("#menu");o.items=c;const t=r("#menu-accordion");t.items=c,a=r("#menu-collapsed"),a&&(a.items=c),l=b("l-button[role]"),l&&l.forEach(n=>{p(n,"click",h)})}})}),g(()=>{l&&l.forEach(o=>{k(o,"click",h)})}),(o,t)=>{const n=x("ClientOnly");return v(),A("div",null,[t[3]||(t[3]=m("",7)),s(n,null,{default:u(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-menu id="menu" selected-index="A1">
  </l-menu>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`    <l-menu id="menu" selected-index="A1">
    </l-menu>
  `),e("textarea",{lang:"ts"},`    const menuItems = [
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
  `)])],-1)])]),_:1}),t[4]||(t[4]=e("h3",{id:"手风琴模式",tabindex:"-1"},[d("手风琴模式 "),e("a",{class:"header-anchor",href:"#手风琴模式","aria-label":'Permalink to "手风琴模式"'},"​")],-1)),t[5]||(t[5]=e("p",null,[d("设置 "),e("code",null,"accordion"),d(" 属性，同一时间只展开一个子菜单。")],-1)),s(n,null,{default:u(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-menu id="menu-accordion" accordion> 
  </l-menu>
`)],-1)])]),_:1}),t[6]||(t[6]=e("h3",{id:"压缩模式",tabindex:"-1"},[d("压缩模式 "),e("a",{class:"header-anchor",href:"#压缩模式","aria-label":'Permalink to "压缩模式"'},"​")],-1)),t[7]||(t[7]=e("p",null,[d("设置 "),e("code",null,"collapsed"),d(" 属性，菜单将压缩为仅显示图标的窄栏模式，同时自动折叠所有已展开的子菜单。通过 "),e("code",null,"collapsed-width"),d(" 控制压缩后的宽度，"),e("code",null,"collapsed-icon-size"),d(" 控制压缩后的图标大小。")],-1)),s(n,null,{default:u(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div>
    <l-button role="collapsed" data-action="expand">展开</l-button>
    <l-button role="collapsed" data-action="collapse">折叠</l-button>
  </div>
  <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
  </l-menu>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`    <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
    </l-menu>
  `),e("textarea",{lang:"ts"},`    const menuItems = [
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
        key: "N4",
        label: "选项四",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu-collapsed');
    $menu.items = menuItems;
  `)])],-1)])]),_:1}),t[8]||(t[8]=m("",13))])}}});export{q as __pageData,_ as default};
