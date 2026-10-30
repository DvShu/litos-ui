import{L as d}from"./chunks/index.XvLRJ_08.js";import{a as m,$ as y,o as E}from"./chunks/browser.7zTvUqO3.js";import{v,P as x,x as f,C as L,o as C,c as F,a2 as r,E as s,w as l,j as e,a as i}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"Loading","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/loading.md","filePath":"en/components/loading.md","lastUpdated":1793253144000}'),B={name:"en/components/loading.md"},q=Object.assign(B,{setup(T){const p=[];let h=!1;function o(a,t){const n=y(a);n&&(E(n,"click",t),p.push([n,t]))}function c(){d.init("loading3"),setTimeout(()=>{d.close("loading3")},3e3)}function g(){const a=d.create();setTimeout(()=>{a.hide()},3e3)}function u(){const a=d.create({to:"#startLoading1Parent",fullscreen:!1});setTimeout(()=>{a.updateLoadingText("Reloading...")},3e3),setTimeout(()=>{a.hide()},6e3)}function k(a){const t=a.target.getAttribute("data-loading");d.init(t)}function b(a){const t=a.target.getAttribute("data-loading");d.close(t)}return v(()=>{x(()=>{h||(d.init("loading1"),d.init("loading2"),d.init("loading5"),o('[l-loading="loading3"]',c),o("#startLoading",g),o("#startBarLoading",k),o("#endBarLoading",b),o("#startLoading1",u))})}),f(()=>{h=!0;for(const[a,t]of p)m(a,"click",t);p.length=0}),(a,t)=>{const n=L("ClientOnly");return C(),F("div",null,[t[7]||(t[7]=r("",9)),s(n,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">Content loading area</div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div l-loading="loading">Content loading area</div>
`),e("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[8]||(t[8]=r("",3)),s(n,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div
    style="height:150px;"
    l-loading="loading2"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    Content loading area
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div
    style="height:150px;"
    l-loading="loading"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    Content loading area
  </div>
`),e("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"fullscreen",tabindex:"-1"},[i("Fullscreen "),e("a",{class:"header-anchor",href:"#fullscreen","aria-label":'Permalink to "Fullscreen"'},"​")],-1)),t[10]||(t[10]=e("p",null,[i("Add "),e("code",null,"l-loading-fullscreen"),i(" to mount the overlay on "),e("code",null,"body"),i(" and display a fullscreen indicator. Scrolling is locked by default; set "),e("code",null,'l-loading-lock="false"'),i(" to allow scrolling.")],-1)),s(n,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>Load</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>Load</l-button>
`),e("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"progress-bar",tabindex:"-1"},[i("Progress Bar "),e("a",{class:"header-anchor",href:"#progress-bar","aria-label":'Permalink to "Progress Bar"'},"​")],-1)),t[12]||(t[12]=e("p",null,[i("Set "),e("code",null,'l-loading-shape="bar"'),i(" to use a progress bar instead of a circular spinner.")],-1)),s(n,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">Start</l-button>
    <l-button id="endBarLoading" data-loading="loading4">Stop</l-button>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">Start</l-button>
    <l-button id="endBarLoading" data-loading="loading4">Stop</l-button>
  </div>
`),e("textarea",{lang:"js"},`  //-
  function handleStartBarLoading() {
    LLoading.init('loading4');
  }
  //-
  function handleEndBarLoading() {
    LLoading.close('loading4');
  }
  //-
  const $startBarLoading = document.getElementById('startBarLoading');
  const $endBarLoading = document.getElementById('endBarLoading');
  $startBarLoading.addEventListener('click', handleStartBarLoading);
  $endBarLoading.addEventListener('click', handleEndBarLoading);
`)])],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"animated-border",tabindex:"-1"},[i("Animated Border "),e("a",{class:"header-anchor",href:"#animated-border","aria-label":'Permalink to "Animated Border"'},"​")],-1)),t[14]||(t[14]=e("p",null,[i("Set "),e("code",null,'l-loading-shape="border"'),i(" to use an animated border.")],-1)),s(n,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-shape="border"
  >
    Content loading area
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-mask="1"
    l-loading-shape="border"
  >
    Content loading area
  </div>
`)])],-1)])]),_:1}),t[15]||(t[15]=r("",8)),s(n,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="startLoading">Start</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="startLoading">Button</l-button>
`),e("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),t[16]||(t[16]=e("p",null,[i("Update the text of an imperative indicator with "),e("code",null,"loading1.updateLoadingText(str)"),i(".")],-1)),s(n,null,{default:l(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">Start</l-button>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">Start</l-button>
  </div>
`),e("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading1');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create({ to: '#startLoading1Parent', fullscreen: false });
    setTimeout(() => {
      loading.updateLoadingText("Reloading...");
    }, 3000);
    setTimeout(() => {
      loading.hide();
    }, 6000);
  });
`)])],-1)])]),_:1}),t[17]||(t[17]=r("",10))])}}});export{P as __pageData,q as default};
