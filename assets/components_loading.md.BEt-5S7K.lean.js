import{L as e}from"./chunks/index.BRJsdhPc.js";import{o as r,$ as n,a as c}from"./chunks/dom.C80Rjh4g.js";import{v as m,P as E,x as L,C as y,o as x,c as v,ag as g,E as s,w as o,j as a,a as t}from"./chunks/framework.CwRcgf5g.js";const A=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1773805767000}'),f={name:"components/loading.md"},P=Object.assign(f,{setup(F){function p(){e.init("loading3"),setTimeout(()=>{e.close("loading3")},3e3)}function h(){const i=e.create();setTimeout(()=>{i.hide()},3e3)}function k(){const i=e.create({to:"#startLoading1Parent",fullscreen:!1});setTimeout(()=>{i.updateLoadingText("重新加载中……")},3e3),setTimeout(()=>{i.hide()},6e3)}function u(i){const d=i.target.getAttribute("data-loading");e.init(d)}function b(i){const d=i.target.getAttribute("data-loading");e.close(d)}return m(()=>{E(()=>{e.init("loading1"),e.init("loading2"),e.init("loading5"),console.log(),r(n('[l-loading="loading3"]'),"click",p),r(n("#startLoading"),"click",h),r(n("#startBarLoading"),"click",u),r(n("#endBarLoading"),"click",b),r(n("#startLoading1"),"click",k)})}),L(()=>{c(n('[l-loading="loading3"]'),"click",p),c(n("#startLoading"),"click",h),c(n("#startBarLoading"),"click",u),c(n("#endBarLoading"),"click",b),c(n("#startLoading1"),"click",k)}),(i,d)=>{const l=y("ClientOnly");return x(),v("div",null,[d[7]||(d[7]=g("",9)),s(l,null,{default:o(()=>[...d[0]||(d[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[8]||(d[8]=a("h3",{id:"自定义内容",tabindex:"-1"},[t("自定义内容 "),a("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),d[9]||(d[9]=a("p",null,"你可以自定义加载中组件的文字，背景颜色。",-1)),d[10]||(d[10]=a("p",null,[t("在绑定了 "),a("code",null,"l-loading"),t(" 属性的元素上添加 "),a("code",null,"l-loading-text"),t(" 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。"),a("code",null,"l-loading-background"),t(" 用来设定背景色值。")],-1)),s(l,null,{default:o(()=>[...d[1]||(d[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
`)])],-1)])]),_:1}),d[11]||(d[11]=a("h3",{id:"全屏",tabindex:"-1"},[t("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),d[12]||(d[12]=a("p",null,[t("通过传递 "),a("code",null,"l-loading-fullscreen"),t(" 属性将遮罩插入至 "),a("code",null,"body"),t(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),t(" 可以允许滚动。")],-1)),s(l,null,{default:o(()=>[...d[2]||(d[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),d[13]||(d[13]=a("h3",{id:"进度条风格",tabindex:"-1"},[t("进度条风格 "),a("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),d[14]||(d[14]=a("p",null,[t("通过传递 "),a("code",null,'l-loading-shape="bar"'),t(" 参数可以将圆形加载变为进度条风格。")],-1)),s(l,null,{default:o(()=>[...d[3]||(d[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
`)])],-1)])]),_:1}),d[15]||(d[15]=a("h3",{id:"边框动画风格",tabindex:"-1"},[t("边框动画风格 "),a("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),d[16]||(d[16]=a("p",null,[t("通过传递 "),a("code",null,'l-loading-shape="border"'),t(" 参数可以变为边框加载动画。")],-1)),s(l,null,{default:o(()=>[...d[4]||(d[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
`)])],-1)])]),_:1}),d[17]||(d[17]=g("",8)),s(l,null,{default:o(()=>[...d[5]||(d[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),d[18]||(d[18]=a("p",null,[t("使用编程方式时，可以修改加载文案。调用 "),a("code",null,"loading1.updateLoadingText(str)")],-1)),s(l,null,{default:o(()=>[...d[6]||(d[6]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
    <l-button id="startLoading1">开始</l-button>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.updateLoadingText("重新加载中……");
    }, 3000);
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),d[19]||(d[19]=g("",5))])}}});export{A as __pageData,P as default};
