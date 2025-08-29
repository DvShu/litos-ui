import{L as i}from"./chunks/index.C2UTmmv1.js";import{o as r,$ as t,a as c}from"./chunks/dom.DBNJew1L.js";import{v as b,P as m,x as E,C as y,c as L,o as x,ag as p,G as l,j as a,w as o,a as n}from"./chunks/framework._HD6XqYi.js";const A=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1753941375000}'),v={name:"components/loading.md"},T=Object.assign(v,{setup(f){function g(){i.init("loading3"),setTimeout(()=>{i.close("loading3")},3e3)}function h(){const e=i.create();setTimeout(()=>{e.hide()},3e3)}function k(e){const d=e.target.getAttribute("data-loading");i.init(d)}function u(e){const d=e.target.getAttribute("data-loading");i.close(d)}return b(()=>{m(()=>{i.init("loading1"),i.init("loading2"),i.init("loading5"),r(t('[l-loading="loading3"]'),"click",g),r(t("#startLoading"),"click",h),r(t("#startBarLoading"),"click",k),r(t("#endBarLoading"),"click",u)})}),E(()=>{c(t('[l-loading="loading3"]'),"click",g),c(t("#startLoading"),"click",h),c(t("#startBarLoading"),"click",k),c(t("#endBarLoading"),"click",u)}),(e,d)=>{const s=y("ClientOnly");return x(),L("div",null,[d[6]||(d[6]=p("",9)),l(s,null,{default:o(()=>[...d[0]||(d[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[7]||(d[7]=a("h3",{id:"自定义内容",tabindex:"-1"},[n("自定义内容 "),a("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),d[8]||(d[8]=a("p",null,"你可以自定义加载中组件的文字，背景颜色。",-1)),d[9]||(d[9]=a("p",null,[n("在绑定了 "),a("code",null,"l-loading"),n(" 属性的元素上添加 "),a("code",null,"l-loading-text"),n(" 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。"),a("code",null,"l-loading-background"),n(" 用来设定背景色值。")],-1)),l(s,null,{default:o(()=>[...d[1]||(d[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
`)])],-1)])]),_:1}),d[10]||(d[10]=a("h3",{id:"全屏",tabindex:"-1"},[n("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),d[11]||(d[11]=a("p",null,[n("通过传递 "),a("code",null,"l-loading-fullscreen"),n(" 属性将遮罩插入至 "),a("code",null,"body"),n(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),n(" 可以允许滚动。")],-1)),l(s,null,{default:o(()=>[...d[2]||(d[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[12]||(d[12]=a("h3",{id:"进度条风格",tabindex:"-1"},[n("进度条风格 "),a("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),d[13]||(d[13]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="bar"'),n(" 参数可以将圆形加载变为进度条风格。")],-1)),l(s,null,{default:o(()=>[...d[3]||(d[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
    LLoading.init('loading5');
  }
  //-
  function handleEndBarLoading() {
    LLoading.close('loading5');
  }
  //-
  const $startBarLoading = document.getElementById('startBarLoading');
  const $endBarLoading = document.getElementById('endBarLoading');
  $startBarLoading.addEventListener('click', handleStartBarLoading);
  $endBarLoading.addEventListener('click', handleEndBarLoading);
`)])],-1)])]),_:1}),d[14]||(d[14]=a("h3",{id:"边框动画风格",tabindex:"-1"},[n("边框动画风格 "),a("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),d[15]||(d[15]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="border"'),n(" 参数可以变为边框加载动画。")],-1)),l(s,null,{default:o(()=>[...d[4]||(d[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
`)])],-1)])]),_:1}),d[16]||(d[16]=p("",8)),l(s,null,{default:o(()=>[...d[5]||(d[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),d[17]||(d[17]=p("",5))])}}});export{A as __pageData,T as default};
