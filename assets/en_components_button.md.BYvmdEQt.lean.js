import{g as r}from"./chunks/index.CPlhR6H9.js";import{v as u,x as c,C as b,o as h,c as p,a2 as s,E as n,w as d,j as t,a as o,P as m}from"./chunks/framework.DBq8O7k4.js";import"./chunks/index.IdDs_81b.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const B=JSON.parse('{"title":"Button","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/button.md","filePath":"en/components/button.md","lastUpdated":1795187990000}'),g={name:"en/components/button.md"},C=Object.assign(g,{setup(f){let i=!1;return u(async()=>{if(await m(),i)return;const l=document.querySelector('l-button[data-custom-color="solid"]'),e=document.querySelector('l-button[data-custom-color="ghost"]'),a=document.querySelector('l-button[data-custom-color="text"]');l&&(l.color=r("#00AA7E")),e&&e.setColor(r("#1e9fff",!1,!0)),a&&(a.color=r("#FF7802",!0))}),c(()=>{i=!0}),(l,e)=>{const a=b("ClientOnly");return h(),p("div",null,[e[11]||(e[11]=s("",6)),n(a,null,{default:d(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button box-shadow>Default</l-button>
  <l-button type="normal-v2" box-shadow>Default</l-button>
  <l-button type="primary" box-shadow>Primary</l-button>
`)],-1)])]),_:1}),e[12]||(e[12]=t("blockquote",null,[t("p",null,[o("Import "),t("code",null,"litos-ui/styles/reset.css"),o(" to apply the spacing used between these buttons.")])],-1)),e[13]||(e[13]=t("h3",{id:"text-buttons",tabindex:"-1"},[o("Text Buttons "),t("a",{class:"header-anchor",href:"#text-buttons","aria-label":'Permalink to "Text Buttons"'},"​")],-1)),e[14]||(e[14]=t("p",null,[o("Add "),t("code",null,"text"),o(" to use a text button. Combine it with "),t("code",null,"type"),o(" for different styles.")],-1)),n(a,null,{default:d(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button text>Default</l-button>
  <l-button type="primary" text>Primary</l-button>
`)],-1)])]),_:1}),e[15]||(e[15]=t("h3",{id:"button-sizes",tabindex:"-1"},[o("Button Sizes "),t("a",{class:"header-anchor",href:"#button-sizes","aria-label":'Permalink to "Button Sizes"'},"​")],-1)),e[16]||(e[16]=t("p",null,[o("Buttons have three sizes. Set "),t("code",null,"size"),o(" to "),t("code",null,"large"),o(" or "),t("code",null,"small"),o("; the default is "),t("code",null,"default"),o(".")],-1)),n(a,null,{default:d(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button size="large">Default</l-button>
  <l-button>Primary</l-button>
  <l-button size="small">Primary</l-button>
`)],-1)])]),_:1}),e[17]||(e[17]=t("h3",{id:"disabled-state",tabindex:"-1"},[o("Disabled State "),t("a",{class:"header-anchor",href:"#disabled-state","aria-label":'Permalink to "Disabled State"'},"​")],-1)),e[18]||(e[18]=t("p",null,[o("Use the boolean "),t("code",null,"disabled"),o(" attribute to disable button interaction.")],-1)),n(a,null,{default:d(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button disabled>Default</l-button>
  <l-button disabled type="primary">Primary</l-button>
  <l-button text disabled>Text</l-button>
`)],-1)])]),_:1}),e[19]||(e[19]=t("h3",{id:"loading-state",tabindex:"-1"},[o("Loading State "),t("a",{class:"header-anchor",href:"#loading-state","aria-label":'Permalink to "Loading State"'},"​")],-1)),e[20]||(e[20]=t("p",null,[o("Set "),t("code",null,"loading"),o(" to show the loading state and "),t("code",null,"loading-text"),o(" to customize its text.")],-1)),n(a,null,{default:d(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button id="loadingBtn" loading loading-text="Loading...">Button</l-button>
  <l-button type="primary" loading loading-text="Loading">Button</l-button>
`)],-1)])]),_:1}),e[21]||(e[21]=t("h3",{id:"block-buttons",tabindex:"-1"},[o("Block Buttons "),t("a",{class:"header-anchor",href:"#block-buttons","aria-label":'Permalink to "Block Buttons"'},"​")],-1)),e[22]||(e[22]=t("p",null,[o("Add "),t("code",null,"block"),o(" to make the button fill its parent’s width (100%).")],-1)),n(a,null,{default:d(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button block type="primary">Button</l-button>
`)],-1)])]),_:1}),e[23]||(e[23]=t("h3",{id:"button-shapes",tabindex:"-1"},[o("Button Shapes "),t("a",{class:"header-anchor",href:"#button-shapes","aria-label":'Permalink to "Button Shapes"'},"​")],-1)),e[24]||(e[24]=t("p",null,[o("Use "),t("code",null,"shape"),o(" to choose "),t("code",null,"default"),o(", "),t("code",null,"round"),o(", or "),t("code",null,"circle"),o(".")],-1)),n(a,null,{default:d(()=>[...e[6]||(e[6]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button>default</l-button>
  <l-button shape="round">round</l-button>
  <l-button shape="circle">C</l-button>
`)],-1)])]),_:1}),e[25]||(e[25]=s("",3)),n(a,null,{default:d(()=>[...e[7]||(e[7]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button shape="circle">
    <l-search-icon />
  </l-button>
  <l-button shape="round" type="primary">
    <l-search-icon></l-search-icon>
    <span>Search</span>
  </l-button>
`)],-1)])]),_:1}),e[26]||(e[26]=t("h3",{id:"transparent-background",tabindex:"-1"},[o("Transparent Background "),t("a",{class:"header-anchor",href:"#transparent-background","aria-label":'Permalink to "Transparent Background"'},"​")],-1)),e[27]||(e[27]=t("p",null,[o("Enable "),t("code",null,"ghost"),o(" for a transparent background, commonly used on colored surfaces.")],-1)),n(a,null,{default:d(()=>[...e[8]||(e[8]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button ghost type="primary">Primary</l-button>
`)],-1)])]),_:1}),e[28]||(e[28]=t("h3",{id:"custom-colors",tabindex:"-1"},[o("Custom Colors "),t("a",{class:"header-anchor",href:"#custom-colors","aria-label":'Permalink to "Custom Colors"'},"​")],-1)),e[29]||(e[29]=t("p",null,[o("Pass a color variable object through the JavaScript "),t("code",null,"color"),o(" property or "),t("code",null,"setColor()"),o(", together with the "),t("code",null,"generateButtonColor(color, text = false, ghost = false)"),o(" utility function.")],-1)),n(a,null,{default:d(()=>[...e[9]||(e[9]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button data-custom-color="solid">Custom color</l-button>
  <l-button data-custom-color="ghost" ghost>Ghost button</l-button>
  <l-button data-custom-color="text" text>Text button</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button data-custom-color="solid">Custom color</l-button>
  <l-button data-custom-color="ghost" ghost>Ghost button</l-button>
  <l-button data-custom-color="text" text>Text button</l-button>
`),t("textarea",{lang:"js"},`import { generateButtonColor } from "litos-ui/utils";
const solid = document.querySelector('l-button[data-custom-color="solid"]');
const ghost = document.querySelector('l-button[data-custom-color="ghost"]');
const text = document.querySelector('l-button[data-custom-color="text"]');
solid.color = generateButtonColor("#00AA7E");
ghost.setColor(generateButtonColor("#1e9fff", false, true));
text.color = generateButtonColor("#FF7802", true);
`)])],-1)])]),_:1}),e[30]||(e[30]=t("h3",{id:"custom-types",tabindex:"-1"},[o("Custom Types "),t("a",{class:"header-anchor",href:"#custom-types","aria-label":'Permalink to "Custom Types"'},"​")],-1)),e[31]||(e[31]=t("p",null,[o("Set a custom "),t("code",null,"type"),o(" and style "),t("code",null,'l-button[type="x"]::part(default)'),o(".")],-1)),n(a,null,{default:d(()=>[...e[10]||(e[10]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-button type="blue">Blue button</l-button>
  <l-button type="gradient">Gradient button</l-button>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-button type="blue">Blue button</l-button>
  <l-button type="gradient">Gradient button</l-button>
`),t("textarea",{lang:"css"},`  l-button[type="blue"]::part(default) {
    --l-btn-border-color: #1677ff;
    --l-btn-hover-border-color: #4096ff;
    --l-btn-active-border-color: #0958d9;
  }
  l-button[type="gradient"]::part(default) {
    border: none;
    --l-btn-text-color: #389e0d;
    --l-btn-active-text-color: #0fd850;
    --l-btn-background: linear-gradient(90deg, #0fd850 0%, #f9f047 100%);
    --l-btn-hover-background: linear-gradient(90deg, #2af06a 0%, #fbf478 100%);
    --l-btn-active-background: linear-gradient(90deg, #0a9036 0%, #ece008 100%);
  }
`)])],-1)])]),_:1}),e[32]||(e[32]=s("",27))])}}});export{B as __pageData,C as default};
