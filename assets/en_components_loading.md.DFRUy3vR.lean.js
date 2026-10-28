import{L as e}from"./chunks/index.CUe7CM8d.js";import{o as r,$ as i,a as p}from"./chunks/browser.CpyXlELn.js";import{v as m,P as E,x as y,C as L,o as v,c as x,a2 as c,E as l,w as o,j as a,a as n}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/loading.md","filePath":"en/components/loading.md","lastUpdated":1793115401000}'),f={name:"en/components/loading.md"},A=Object.assign(f,{setup(F){function g(){e.init("loading3"),setTimeout(()=>{e.close("loading3")},3e3)}function h(){const d=e.create();setTimeout(()=>{d.hide()},3e3)}function k(){const d=e.create({to:"#startLoading1Parent",fullscreen:!1});setTimeout(()=>{d.updateLoadingText("重新加载中……")},3e3),setTimeout(()=>{d.hide()},6e3)}function u(d){const t=d.target.getAttribute("data-loading");e.init(t)}function b(d){const t=d.target.getAttribute("data-loading");e.close(t)}return m(()=>{E(()=>{e.init("loading1"),e.init("loading2"),e.init("loading5"),console.log(),r(i('[l-loading="loading3"]'),"click",g),r(i("#startLoading"),"click",h),r(i("#startBarLoading"),"click",u),r(i("#endBarLoading"),"click",b),r(i("#startLoading1"),"click",k)})}),y(()=>{p(i('[l-loading="loading3"]'),"click",g),p(i("#startLoading"),"click",h),p(i("#startBarLoading"),"click",u),p(i("#endBarLoading"),"click",b),p(i("#startLoading1"),"click",k)}),(d,t)=>{const s=L("ClientOnly");return v(),x("div",null,[t[7]||(t[7]=c("",9)),l(s,null,{default:o(()=>[...t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[8]||(t[8]=a("h3",{id:"自定义内容",tabindex:"-1"},[n("自定义内容 "),a("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),t[9]||(t[9]=a("p",null,"你可以自定义加载中组件的文字，背景颜色。",-1)),t[10]||(t[10]=a("p",null,[n("在绑定了 "),a("code",null,"l-loading"),n(" 属性的元素上添加 "),a("code",null,"l-loading-text"),n(" 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。"),a("code",null,"l-loading-background"),n(" 用来设定背景色值。")],-1)),l(s,null,{default:o(()=>[...t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
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
`)])],-1)])]),_:1}),t[11]||(t[11]=a("h3",{id:"全屏",tabindex:"-1"},[n("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),t[12]||(t[12]=a("p",null,[n("通过传递 "),a("code",null,"l-loading-fullscreen"),n(" 属性将遮罩插入至 "),a("code",null,"body"),n(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),n(" 可以允许滚动。")],-1)),l(s,null,{default:o(()=>[...t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])]),_:1}),t[13]||(t[13]=a("h3",{id:"进度条风格",tabindex:"-1"},[n("进度条风格 "),a("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),t[14]||(t[14]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="bar"'),n(" 参数可以将圆形加载变为进度条风格。")],-1)),l(s,null,{default:o(()=>[...t[3]||(t[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
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
`)])],-1)])]),_:1}),t[15]||(t[15]=a("h3",{id:"边框动画风格",tabindex:"-1"},[n("边框动画风格 "),a("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),t[16]||(t[16]=a("p",null,[n("通过传递 "),a("code",null,'l-loading-shape="border"'),n(" 参数可以变为边框加载动画。")],-1)),l(s,null,{default:o(()=>[...t[4]||(t[4]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div
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
`)])],-1)])]),_:1}),t[17]||(t[17]=c("",8)),l(s,null,{default:o(()=>[...t[5]||(t[5]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])]),_:1}),t[18]||(t[18]=a("p",null,[n("使用编程方式时，可以修改加载文案。调用 "),a("code",null,"loading1.updateLoadingText(str)")],-1)),l(s,null,{default:o(()=>[...t[6]||(t[6]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div id="startLoading1Parent" style="height:150px;border:1px solid #dedede;padding:5px;">
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
`)])],-1)])]),_:1}),t[19]||(t[19]=c("",8))])}}});export{q as __pageData,A as default};
