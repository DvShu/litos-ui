import{b as u,i as b,o as v,a as k,c as w}from"./chunks/dom.DBNJew1L.js";import{P as E}from"./chunks/popover.itIACCyP.js";import{v as f,P as x,x as P,C as y,c as I,o as C,ag as p,G as l,j as e,w as d,a as i}from"./chunks/framework._HD6XqYi.js";const A=JSON.parse('{"title":"Image 图片","description":"","frontmatter":{},"headers":[],"relativePath":"components/image.md","filePath":"components/image.md","lastUpdated":1754976652000}'),q={name:"components/image.md"},j=Object.assign(q,{setup(S){let t,c,r,o;const h=["/litos-ui/img1.svg","/litos-ui/img2.svg","https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"];function m(){t&&(k(t,"closed",m),t.remove(),t=void 0)}function g(s){const a=Number(s.target.getAttribute("data-preview-index"));t||(t=w("l-image-preview"),t.setImages(h),t.setCurrentIndex(a),v(t,"closed",m),document.body.appendChild(t),t.open=!0)}return f(()=>{x(()=>{c=u(".morePreview"),c.forEach(s=>{s.setPreviewImageList(h)}),r=u(".customPreview"),b(r,s=>{v(s,"click",g)}),o=new E({theme:"tooltip"})})}),P(()=>{c=void 0,this.handlePreviewClosed(),r&&b(r,s=>{k(s,"click",g)}),o&&(o.destroy(),o=void 0)}),(s,a)=>{const n=y("ClientOnly");return C(),I("div",null,[a[8]||(a[8]=p("",7)),l(n,null,{default:d(()=>[...a[0]||(a[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px"></l-image>
`)],-1)])]),_:1}),a[9]||(a[9]=p("",3)),l(n,null,{default:d(()=>[...a[1]||(a[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="docs-image-area1">
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="fill"
        class="l-popover-reference"
        data-title="被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框"
      ></l-image>
      <span>fit</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="contain"
        class="l-popover-reference"
        data-title="被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比"
      ></l-image>
      <span>contain</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="cover"
        class="l-popover-reference"
        data-title="被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框"
      ></l-image>
      <span>cover</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="none"
        class="l-popover-reference"
        data-title="被替换的内容本身的尺寸、密度和方向都不改变"
      ></l-image>
      <span>none</span>
    </div>
    <div class="docs-image-area2">
      <l-image 
        src="/litos-ui/img1.svg" 
        width="100px" 
        height="100px"
        fit="scale-down"
        class="l-popover-reference"
        data-title="内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些"
      ></l-image>
      <span>scale-down</span>
    </div>
  </div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="fill"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="contain"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="cover"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="none"
  ></l-image>
  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    height="100px"
    fit="scale-down"
  ></l-image>
`)])],-1)])]),_:1}),a[10]||(a[10]=e("h3",{id:"占位",tabindex:"-1"},[i("占位 "),e("a",{class:"header-anchor",href:"#占位","aria-label":'Permalink to "占位"'},"​")],-1)),a[11]||(a[11]=e("p",null,[i("使用 "),e("code",null,"placeholder"),i(" 定义图片加载时显示的图片；通常用于加载大图时用来实现渐进加载，将 "),e("code",null,"placeholder"),i(" 设置为一个原图模糊后的图片")],-1)),l(n,null,{default:d(()=>[...a[2]||(a[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="/litos-ui/img1.svg" width="100px" placeholder="/litos-ui/img_loading.png"></l-image>
`)],-1)])]),_:1}),a[12]||(a[12]=e("h3",{id:"加载失败",tabindex:"-1"},[i("加载失败 "),e("a",{class:"header-anchor",href:"#加载失败","aria-label":'Permalink to "加载失败"'},"​")],-1)),a[13]||(a[13]=e("p",null,[i("通过配置 "),e("code",null,"fallback"),i(" 配置加载失败显示图像占位符; 也可以传递 "),e("code",null,"custom-fallback"),i(" 启用自定义加载失败占位符, 然后配置 "),e("code",null,"slot-fallback"),i(" 来自定义加载失败显示.")],-1)),l(n,null,{default:d(()=>[...a[3]||(a[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="/litos-ui/img3.svg" width="100px" height="100px" fallback="/litos-ui/loading_error.png"></l-image>
  <l-image src="/litos-ui/img3.svg" width="100px" height="100px" custom-fallback>
    <span slot="fallback">error</span>
  </l-image>
`)],-1)])]),_:1}),a[14]||(a[14]=e("h3",{id:"多图预览",tabindex:"-1"},[i("多图预览 "),e("a",{class:"header-anchor",href:"#多图预览","aria-label":'Permalink to "多图预览"'},"​")],-1)),a[15]||(a[15]=e("p",null,[i("通过 "),e("code",null,"setPreviewImageList(imageList?: string[])"),i(" 函数来设置多图预览, 可以通过 "),e("code",null,"preview-index"),i(" 属性来设置当前预览的图片索引")],-1)),l(n,null,{default:d(()=>[...a[4]||(a[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image class="morePreview" src="/litos-ui/img1.svg" width="100px" preview-index="0"></l-image>
  <l-image class="morePreview" src="/litos-ui/img2.svg" width="100px" preview-index="1"></l-image>
  <l-image class="morePreview" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px" preview-index="2"></l-image>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-image class="morePreview" src="/litos-ui/img1.svg" width="100px" preview-index="0"></l-image>
  <l-image class="morePreview" src="/litos-ui/img2.svg" width="100px" preview-index="1"></l-image>
  <l-image class="morePreview" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px" preview-index="2"></l-image>
`),e("textarea",{lang:"js"},`  import { $, iterate } from 'ph-utils/dom';
  const $morePreview = $('.morePreview');
  iterate($morePreview, (item) => {
    item.setPreviewImageList(imgs);
  });
`)])],-1)])]),_:1}),a[16]||(a[16]=e("h3",{id:"禁用预览",tabindex:"-1"},[i("禁用预览 "),e("a",{class:"header-anchor",href:"#禁用预览","aria-label":'Permalink to "禁用预览"'},"​")],-1)),a[17]||(a[17]=e("p",null,[i("通过 "),e("code",null,"preview-disabled"),i(" 属性来禁用图片预览")],-1)),l(n,null,{default:d(()=>[...a[5]||(a[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image 
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" 
    width="100px" 
    preview-disabled
  ></l-image>
`)],-1)])]),_:1}),a[18]||(a[18]=e("h3",{id:"懒加载",tabindex:"-1"},[i("懒加载 "),e("a",{class:"header-anchor",href:"#懒加载","aria-label":'Permalink to "懒加载"'},"​")],-1)),a[19]||(a[19]=e("p",null,[i("通过使用浏览器原生支持的 "),e("code",null,"loading"),i(" 属性来开启懒加载，只需要设置 "),e("code",null,'loading="lazy"')],-1)),l(n,null,{default:d(()=>[...a[6]||(a[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image 
    src="/litos-ui/img1.svg" 
    width="100px" 
    loading="lazy"
  ></l-image>
`)],-1)])]),_:1}),a[20]||(a[20]=p("",3)),l(n,null,{default:d(()=>[...a[7]||(a[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image 
    class="customPreview" 
    src="/litos-ui/img1.svg" 
    width="100px" 
    data-preview-index="0"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="/litos-ui/img2.svg" 
    width="100px" 
    data-preview-index="1"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" 
    width="100px" 
    data-preview-index="2"
    preview-disabled
  ></l-image>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-image 
    class="customPreview" 
    src="/litos-ui/img1.svg" 
    width="100px" 
    data-preview-index="0"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="/litos-ui/img2.svg" 
    width="100px" 
    data-preview-index="1"
    preview-disabled
  ></l-image>
  <l-image 
    class="customPreview" 
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" 
    width="100px" 
    data-preview-index="2"
    preview-disabled
  ></l-image>
`),e("textarea",{lang:"js"},`  import { $, iterate } from 'ph-utils/dom';
  let $preview;
  const $customPreview = $('.customPreview');
  iterate($customPreview, (item) => {
    on(item, 'click', handleCustomTap);
  });
  function handleCustomTap(e) {
    const index = Number(e.target.getAttribute('data-preview-index'));
    if (!$preview) {
      $preview = $$("l-image-preview");
      $preview.setImages(imgs);
      $preview.setCurrentIndex(index);
      on($preview, 'closed', handlePreviewClosed);
      document.body.appendChild($preview);
      $preview.open = true;
    }
  }
  function handlePreviewClosed() {
    if ($preview) {
      off($preview, 'closed', handlePreviewClosed);
      $preview.remove();
      $preview = undefined;
    }
  }
`)])],-1)])]),_:1}),a[21]||(a[21]=p("",11))])}}});export{A as __pageData,j as default};
