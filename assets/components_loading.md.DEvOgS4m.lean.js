import{L as e}from"./chunks/index.CUe7CM8d.js";import{a as m,$ as E,o as y}from"./chunks/browser.CpyXlELn.js";import{v as L,P as x,x as v,C as f,o as F,c as C,a2 as r,E as s,w as l,j as a,a as n}from"./chunks/framework.nU6eqUhJ.js";const P=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1793253144000}'),B={name:"components/loading.md"},S=Object.assign(B,{setup(T){const p=[];let h=!1;function o(t,i){const d=E(t);d&&(y(d,"click",i),p.push([d,i]))}function c(){e.init("loading3"),setTimeout(()=>{e.close("loading3")},3e3)}function g(){const t=e.create();setTimeout(()=>{t.hide()},3e3)}function k(){const t=e.create({to:"#startLoading1Parent",fullscreen:!1});setTimeout(()=>{t.updateLoadingText("重新加载中……")},3e3),setTimeout(()=>{t.hide()},6e3)}function u(t){const i=t.target.getAttribute("data-loading");e.init(i)}function b(t){const i=t.target.getAttribute("data-loading");e.close(i)}return L(()=>{x(()=>{h||(e.init("loading1"),e.init("loading2"),e.init("loading5"),o('[l-loading="loading3"]',c),o("#startLoading",g),o("#startBarLoading",u),o("#endBarLoading",b),o("#startLoading1",k))})}),v(()=>{h=!0;for(const[t,i]of p)m(t,"click",i);p.length=0}),(t,i)=>{const d=f("ClientOnly");return F(),C("div",null,[i[7]||(i[7]=r("",9)),s(d,null,{default:l(()=>[...i[0]||(i[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),i[8]||(i[8]=r("",3)),s(d,null,{default:l(()=>[...i[1]||(i[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
    style="height:150px;"
    l-loading="loading2"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div
    style="height:150px;"
    l-loading="loading"
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),i[9]||(i[9]=a("h3",{id:"全屏",tabindex:"-1"},[n("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),i[10]||(i[10]=a("p",null,[n("通过传递 "),a("code",null,"l-loading-fullscreen"),n(" 属性将遮罩插入至 "),a("code",null,"body"),n(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),n(" 可以允许滚动。")],-1)),s(d,null,{default:l(()=>[...i[2]||(i[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),i[11]||(i[11]=a("h3",{id:"进度条风格",tabindex:"-1"},[n("进度条风格 "),a("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),i[12]||(i[12]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="bar"'),n(" 参数可以将圆形加载变为进度条风格。")],-1)),s(d,null,{default:l(()=>[...i[3]||(i[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;"
    l-loading="loading4"
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
`),a("textarea",{lang:"js"},`  //-
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
`)])],-1)])]),_:1}),i[13]||(i[13]=a("h3",{id:"边框动画风格",tabindex:"-1"},[n("边框动画风格 "),a("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),i[14]||(i[14]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="border"'),n(" 参数可以变为边框加载动画。")],-1)),s(d,null,{default:l(()=>[...i[4]||(i[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px"
    l-loading="loading5"
    l-loading-mask="1"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
`)])],-1)])]),_:1}),i[15]||(i[15]=r("",8)),s(d,null,{default:l(()=>[...i[5]||(i[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),i[16]||(i[16]=a("p",null,[n("使用编程方式时，可以修改加载文案。调用 "),a("code",null,"loading1.updateLoadingText(str)")],-1)),s(d,null,{default:l(()=>[...i[6]||(i[6]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">开始</l-button>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">开始</l-button>
  </div>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading1');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create({ to: '#startLoading1Parent', fullscreen: false });
    setTimeout(() => {
      loading.updateLoadingText("重新加载中……");
    }, 3000);
    setTimeout(() => {
      loading.hide();
    }, 6000);
  });
`)])],-1)])]),_:1}),i[17]||(i[17]=r("",10))])}}});export{P as __pageData,S as default};
