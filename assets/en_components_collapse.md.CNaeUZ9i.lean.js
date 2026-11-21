import{_ as i,C as r,o as s,c as p,a2 as n,E as d,w as o,j as e,a as l}from"./chunks/framework.DBq8O7k4.js";const k=JSON.parse('{"title":"Collapse","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/collapse.md","filePath":"en/components/collapse.md","lastUpdated":1795187990000}'),c={name:"en/components/collapse.md"};function h(u,t,m,g,b,x){const a=r("ClientOnly");return s(),p("div",null,[t[10]||(t[10]=n("",8)),d(a,null,{default:o(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse>
    <l-collapse-item prop="1" header-text="Red light" expand>
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"controlled-expansion",tabindex:"-1"},[l("Controlled Expansion "),e("a",{class:"header-anchor",href:"#controlled-expansion","aria-label":'Permalink to "Controlled Expansion"'},"​")],-1)),t[12]||(t[12]=e("p",null,[l("Set "),e("code",null,"prop"),l(" on "),e("code",null,"l-collapse"),l(" to the expanded panel names, separated by "),e("code",null,"&"),l(".")],-1)),d(a,null,{default:o(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse prop="1&3">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[13]||(t[13]=e("blockquote",null,[e("p",null,[l("You can also add "),e("code",null,"expand"),l(" to an "),e("code",null,"l-collapse-item"),l(" to expand it.")])],-1)),t[14]||(t[14]=e("h3",{id:"accordion",tabindex:"-1"},[l("Accordion "),e("a",{class:"header-anchor",href:"#accordion","aria-label":'Permalink to "Accordion"'},"​")],-1)),t[15]||(t[15]=e("p",null,[l("Enable "),e("code",null,"accordion"),l(" to allow only one panel to be expanded at a time.")],-1)),d(a,null,{default:o(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse accordion>
    <l-collapse-item prop="1" header-text="Red light" expand>
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[16]||(t[16]=e("h3",{id:"arrow-placement",tabindex:"-1"},[l("Arrow Placement "),e("a",{class:"header-anchor",href:"#arrow-placement","aria-label":'Permalink to "Arrow Placement"'},"​")],-1)),t[17]||(t[17]=e("p",null,[l("Set "),e("code",null,"arrow-placement"),l(" to "),e("code",null,"left"),l(" (default) or "),e("code",null,"right"),l(".")],-1)),d(a,null,{default:o(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[18]||(t[18]=e("h3",{id:"header-alignment",tabindex:"-1"},[l("Header Alignment "),e("a",{class:"header-anchor",href:"#header-alignment","aria-label":'Permalink to "Header Alignment"'},"​")],-1)),t[19]||(t[19]=e("p",null,[l("Use "),e("code",null,"header-justify"),l(" to align the header content. "),e("code",null,"flex-start"),l(" and "),e("code",null,"flex-end"),l(" align it to the start and end of the row, respectively, while "),e("code",null,"space-between"),l(" places the text and arrow at opposite ends.")],-1)),d(a,null,{default:o(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[20]||(t[20]=e("h3",{id:"background-and-border",tabindex:"-1"},[l("Background and Border "),e("a",{class:"header-anchor",href:"#background-and-border","aria-label":'Permalink to "Background and Border"'},"​")],-1)),t[21]||(t[21]=e("p",null,[l("Enable "),e("code",null,"background"),l(" to show the panel background and border.")],-1)),d(a,null,{default:o(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background>
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[22]||(t[22]=e("h3",{id:"panel-spacing",tabindex:"-1"},[l("Panel Spacing "),e("a",{class:"header-anchor",href:"#panel-spacing","aria-label":'Permalink to "Panel Spacing"'},"​")],-1)),t[23]||(t[23]=e("p",null,[l("Set "),e("code",null,"gap"),l(" to control the space between panels.")],-1)),d(a,null,{default:o(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background gap="10px">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[24]||(t[24]=e("h3",{id:"border-radius",tabindex:"-1"},[l("Border Radius "),e("a",{class:"header-anchor",href:"#border-radius","aria-label":'Permalink to "Border Radius"'},"​")],-1)),t[25]||(t[25]=e("p",null,[l("Set "),e("code",null,"border-radius"),l(" to round the panel corners.")],-1)),d(a,null,{default:o(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse arrow-placement="right" header-justify="space-between" background border-radius="5px">
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[26]||(t[26]=e("h3",{id:"grid-layout",tabindex:"-1"},[l("Grid Layout "),e("a",{class:"header-anchor",href:"#grid-layout","aria-label":'Permalink to "Grid Layout"'},"​")],-1)),t[27]||(t[27]=e("p",null,[l("Enable "),e("code",null,"grid"),l(" to arrange panels in a grid.")],-1)),d(a,null,{default:o(()=>[...t[8]||(t[8]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse
    arrow-placement="right"
    header-justify="space-between"
    background
    border-radius="5px"
    gap="10px"
    grid
  >
    <l-collapse-item prop="1" header-text="Red light">
      <div>Red light - Stop</div>
    </l-collapse-item>
    <l-collapse-item prop="2" header-text="Green light">
      <div>Green light - Go</div>
    </l-collapse-item>
    <l-collapse-item prop="3" header-text="Yellow light">
      <div>Yellow light - Wait</div>
    </l-collapse-item>
  </l-collapse>
`)],-1)])]),_:1}),t[28]||(t[28]=e("h3",{id:"wrappers-and-standalone-panels",tabindex:"-1"},[l("Wrappers and Standalone Panels "),e("a",{class:"header-anchor",href:"#wrappers-and-standalone-panels","aria-label":'Permalink to "Wrappers and Standalone Panels"'},"​")],-1)),t[29]||(t[29]=e("p",null,[l("Place "),e("code",null,"l-collapse-item"),l(" directly inside "),e("code",null,"l-collapse"),l(", inside a regular wrapper element, or on its own. In "),e("code",null,"grid"),l(" mode, each direct child occupies one grid cell, so panels inside a wrapper share a cell.")],-1)),d(a,null,{default:o(()=>[...t[9]||(t[9]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-collapse grid gap="8" prop="delivery">
    <div>
      <l-collapse-item prop="delivery" header-text="Delivery Options">
        <div>Courier delivery is available.</div>
      </l-collapse-item>
      <l-collapse-item prop="pickup" header-text="Store Pickup">
        <div>Pick up your order once it is ready.</div>
      </l-collapse-item>
    </div>
    <l-collapse-item prop="returns" header-text="Returns and Exchanges">
      <div>Request a return or exchange from the order details.</div>
    </l-collapse-item>
  </l-collapse>
  <l-collapse-item header-text="Opening Hours">
    <div>Monday to Sunday, 09:00–18:00.</div>
  </l-collapse-item>
`)],-1)])]),_:1}),t[30]||(t[30]=n("",23))])}const y=i(c,[["render",h]]);export{k as __pageData,y as default};
