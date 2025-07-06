import{L as e}from"./chunks/index.DIrpdclg.js";import{o as r,$ as n,a as c}from"./chunks/dom.9mb3_FO4.js";import{v as b,P as m,x as E,C as x,c as y,o as v,ag as p,G as s,j as d,w as o,a as t}from"./chunks/framework.DaU-16c2.js";const T=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1742894124000}'),L={name:"components/loading.md"},B=Object.assign(L,{setup(f){function g(){e.init("loading3"),setTimeout(()=>{e.close("loading3")},3e3)}function h(){const i=e.create();setTimeout(()=>{i.hide()},3e3)}function k(i){const a=i.target.getAttribute("data-loading");e.init(a)}function u(i){const a=i.target.getAttribute("data-loading");e.close(a)}return b(()=>{m(()=>{e.init("loading1"),e.init("loading2"),e.init("loading5"),r(n('[l-loading="loading3"]'),"click",g),r(n("#startLoading"),"click",h),r(n("#startBarLoading"),"click",k),r(n("#endBarLoading"),"click",u)})}),E(()=>{c(n('[l-loading="loading3"]'),"click",g),c(n("#startLoading"),"click",h),c(n("#startBarLoading"),"click",k),c(n("#endBarLoading"),"click",u)}),(i,a)=>{const l=x("ClientOnly");return v(),y("div",null,[a[6]||(a[6]=p("",6)),s(l,null,{default:o(()=>a[0]||(a[0]=[d("l-code-preview",null,[d("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),d("div",{class:"source"},[d("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),d("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])),_:1,__:[0]}),a[7]||(a[7]=d("h3",{id:"自定义内容",tabindex:"-1"},[t("自定义内容 "),d("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),a[8]||(a[8]=d("p",null,"你可以自定义加载中组件的文字，背景颜色。",-1)),a[9]||(a[9]=d("p",null,[t("在绑定了 "),d("code",null,"l-loading"),t(" 属性的元素上添加 "),d("code",null,"l-loading-text"),t(" 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。"),d("code",null,"l-loading-background"),t(" 用来设定背景色值。")],-1)),s(l,null,{default:o(()=>a[1]||(a[1]=[d("l-code-preview",null,[d("textarea",{lang:"html"},`  <div 
    style="height:150px;" 
    l-loading="loading2" 
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
`),d("div",{class:"source"},[d("textarea",{lang:"html"},`  <div 
    style="height:150px;" 
    l-loading="loading" 
    l-loading-text="loading……"
    l-loading-background="rgba(255, 255, 255, .9)"
  >
    内容加载区域
  </div>
`),d("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])),_:1,__:[1]}),a[10]||(a[10]=d("h3",{id:"全屏",tabindex:"-1"},[t("全屏 "),d("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),a[11]||(a[11]=d("p",null,[t("通过传递 "),d("code",null,"l-loading-fullscreen"),t(" 属性将遮罩插入至 "),d("code",null,"body"),t(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),d("code",null,'l-loading-lock="false"'),t(" 可以允许滚动。")],-1)),s(l,null,{default:o(()=>a[2]||(a[2]=[d("l-code-preview",null,[d("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),d("div",{class:"source"},[d("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),d("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])),_:1,__:[2]}),a[12]||(a[12]=d("h3",{id:"进度条风格",tabindex:"-1"},[t("进度条风格 "),d("a",{class:"header-anchor",href:"#进度条风格","aria-label":'Permalink to "进度条风格"'},"​")],-1)),a[13]||(a[13]=d("p",null,[t("通过传递 "),d("code",null,'l-loading-shape="bar"'),t(" 参数可以将圆形加载变为进度条风格。")],-1)),s(l,null,{default:o(()=>a[3]||(a[3]=[d("l-code-preview",null,[d("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;" 
    l-loading="loading4" 
    l-loading-shape="bar"
  >
    <l-button id="startBarLoading" data-loading="loading4">开始</l-button>
    <l-button id="endBarLoading" data-loading="loading4">结束</l-button>
  </div>
`),d("div",{class:"source"},[d("textarea",{lang:"html"},`  <l-button>按钮</l-button>
`)])],-1)])),_:1,__:[3]}),a[14]||(a[14]=d("h3",{id:"边框动画风格",tabindex:"-1"},[t("边框动画风格 "),d("a",{class:"header-anchor",href:"#边框动画风格","aria-label":'Permalink to "边框动画风格"'},"​")],-1)),a[15]||(a[15]=d("p",null,[t("通过传递 "),d("code",null,'l-loading-shape="border"'),t(" 参数可以变为边框加载动画。")],-1)),s(l,null,{default:o(()=>a[4]||(a[4]=[d("l-code-preview",null,[d("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px" 
    l-loading="loading5"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
`),d("div",{class:"source"},[d("textarea",{lang:"html"},`  <div 
    style="height:150px;border:1px solid #dedede;padding:5px;border-radius:5px" 
    l-loading="loading5" 
    l-loading-mask="1"
    l-loading-shape="border"
  >
    内容加载区域
  </div>
`),d("textarea",{lang:"js"},`  LLoading.init();
`)])],-1)])),_:1,__:[4]}),a[16]||(a[16]=p("",8)),s(l,null,{default:o(()=>a[5]||(a[5]=[d("l-code-preview",null,[d("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),d("div",{class:"source"},[d("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),d("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])),_:1,__:[5]}),a[17]||(a[17]=p("",5))])}}});export{T as __pageData,B as default};
