import{L as e}from"./chunks/index.CmF1zlim.js";import{o as p,b as d,a as g}from"./chunks/dom.CBY_V37t.js";import{v as k,P as u,x as b,C as E,c as m,o as y,ag as o,G as s,j as a,w as l,a as i}from"./chunks/framework.BCyZWppQ.js";const F=JSON.parse('{"title":"Loading 加载","description":"","frontmatter":{},"headers":[],"relativePath":"components/loading.md","filePath":"components/loading.md","lastUpdated":1741105103000}'),v={name:"components/loading.md"},_=Object.assign(v,{setup(L){function r(){e.init("loading3"),setTimeout(()=>{e.close("loading3")},3e3)}function c(){const h=e.create();setTimeout(()=>{h.hide()},3e3)}return k(()=>{u(()=>{e.init("loading1"),e.init("loading2"),p(d('[l-loading="loading3"]'),"click",r),p(d("#startLoading"),"click",c)})}),b(()=>{g(d('[l-loading="loading3"]'),"click",r),g(d("#startLoading"),"click",c)}),(h,t)=>{const n=E("ClientOnly");return y(),m("div",null,[t[4]||(t[4]=o("",6)),s(n,null,{default:l(()=>t[0]||(t[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div style="height:150px;" l-loading="loading1">内容加载区域</div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div l-loading="loading">内容加载区域</div>
`),a("textarea",{source:"js"},`  LLoading.init();
`)])],-1)])),_:1}),t[5]||(t[5]=a("h3",{id:"自定义内容",tabindex:"-1"},[i("自定义内容 "),a("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),t[6]||(t[6]=a("p",null,"你可以自定义加载中组件的文字，背景颜色。",-1)),t[7]||(t[7]=a("p",null,[i("在绑定了 "),a("code",null,"l-loading"),i(" 属性的元素上添加 "),a("code",null,"l-loading-text"),i(" 属性，其值会被渲染为加载文案，并显示在加载图标的下方；将其设置为空字符串可以用于取消文本。"),a("code",null,"l-loading-background"),i(" 用来设定背景色值。")],-1)),s(n,null,{default:l(()=>t[1]||(t[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div 
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
`)])],-1)])),_:1}),t[8]||(t[8]=a("h3",{id:"全屏",tabindex:"-1"},[i("全屏 "),a("a",{class:"header-anchor",href:"#全屏","aria-label":'Permalink to "全屏"'},"​")],-1)),t[9]||(t[9]=a("p",null,[i("通过传递 "),a("code",null,"l-loading-fullscreen"),i(" 属性将遮罩插入至 "),a("code",null,"body"),i(" 上保证加载数据時显示全屏动画；当全屏时默认会禁止滚动，通过传递 "),a("code",null,'l-loading-lock="false"'),i(" 可以允许滚动。")],-1)),s(n,null,{default:l(()=>t[2]||(t[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button l-loading="loading3" l-loading-fullscreen>加载</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button>按钮</l-button>
`)])],-1)])),_:1}),t[10]||(t[10]=o("",8)),s(n,null,{default:l(()=>t[3]||(t[3]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-button id="startLoading">开始</l-button>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-button id="startLoading">按钮</l-button>
`),a("textarea",{lang:"js"},`  const $startLoading = document.getElementById('startLoading');
  $startLoading.addEventListener('click', () => {
    const loading = LLoading.create();
    setTimeout(() => {
      loading.hide();
    }, 3000);
  });
`)])],-1)])),_:1}),t[11]||(t[11]=o("",5))])}}});export{F as __pageData,_ as default};
