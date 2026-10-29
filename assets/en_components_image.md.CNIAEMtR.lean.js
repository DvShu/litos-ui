import{b as u,i as b,o as v,a as w,c as k}from"./chunks/browser.CpyXlELn.js";import{P as f}from"./chunks/popover.DbU6wtGt.js";import{v as E,P as x,x as y,C as P,o as I,c as S,a2 as h,E as l,w as r,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const A=JSON.parse('{"title":"Image","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/image.md","filePath":"en/components/image.md","lastUpdated":1793253144000}'),C={name:"en/components/image.md"},T=Object.assign(C,{setup(F){let t,p,d,o;const m=["/litos-ui/img1.svg","/litos-ui/img2.svg","https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"];function c(){t&&(w(t,"closed",c),t.remove(),t=void 0)}function g(s){const i=Number(s.target.getAttribute("data-preview-index"));t||(t=k("l-image-preview"),t.setImages(m),t.setCurrentIndex(i),v(t,"closed",c),document.body.appendChild(t),t.open=!0)}return E(()=>{x(()=>{p=u(".morePreview"),p.forEach(s=>{s.setPreviewImageList(m)}),d=u(".customPreview"),b(d,s=>{v(s,"click",g)}),o=new f({theme:"tooltip"})})}),y(()=>{p=void 0,c(),d&&b(d,s=>{w(s,"click",g)}),o&&(o.destroy(),o=void 0)}),(s,i)=>{const n=P("ClientOnly");return I(),S("div",null,[i[8]||(i[8]=h("",7)),l(n,null,{default:r(()=>[...i[0]||(i[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px"></l-image>
`)],-1)])]),_:1}),i[9]||(i[9]=h("",3)),l(n,null,{default:r(()=>[...i[1]||(i[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="docs-image-area1">
    <div class="docs-image-area2">
      <l-image
        src="/litos-ui/img1.svg"
        width="100px"
        height="100px"
        fit="fill"
        class="l-popover-reference"
        data-title="Stretch to fill the content box; the aspect ratio may change."
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
        data-title="Fit the entire image while preserving its aspect ratio."
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
        data-title="Fill the content box while preserving the aspect ratio, cropping overflow."
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
        data-title="Keep the image at its intrinsic size."
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
        data-title="Use the smaller image size produced by none and contain."
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
`)])],-1)])]),_:1}),i[10]||(i[10]=e("h3",{id:"placeholder",tabindex:"-1"},[a("Placeholder "),e("a",{class:"header-anchor",href:"#placeholder","aria-label":'Permalink to "Placeholder"'},"​")],-1)),i[11]||(i[11]=e("p",null,[a("Set "),e("code",null,"placeholder"),a(" to an image displayed while the main image loads. For progressive loading of large images, use a blurred version of the original.")],-1)),l(n,null,{default:r(()=>[...i[2]||(i[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="/litos-ui/img1.svg" width="100px" placeholder="/litos-ui/img_loading.png"></l-image>
`)],-1)])]),_:1}),i[12]||(i[12]=e("h3",{id:"error-fallback",tabindex:"-1"},[a("Error Fallback "),e("a",{class:"header-anchor",href:"#error-fallback","aria-label":'Permalink to "Error Fallback"'},"​")],-1)),i[13]||(i[13]=e("p",null,[a("Set "),e("code",null,"fallback"),a(" to an image URL displayed on failure. To provide custom fallback content, enable "),e("code",null,"custom-fallback"),a(" and use the "),e("code",null,"fallback"),a(" slot.")],-1)),l(n,null,{default:r(()=>[...i[3]||(i[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="/litos-ui/img3.svg" width="100px" height="100px" fallback="/litos-ui/loading_error.png"></l-image>
  <l-image src="/litos-ui/img3.svg" width="100px" height="100px" custom-fallback>
    <span slot="fallback">error</span>
  </l-image>
`)],-1)])]),_:1}),i[14]||(i[14]=e("h3",{id:"multiple-image-preview",tabindex:"-1"},[a("Multiple-image Preview "),e("a",{class:"header-anchor",href:"#multiple-image-preview","aria-label":'Permalink to "Multiple-image Preview"'},"​")],-1)),i[15]||(i[15]=e("p",null,[a("Call "),e("code",null,"setPreviewImageList(imageList?: string[])"),a(" to supply the preview images, and set "),e("code",null,"preview-index"),a(" to choose the initial image.")],-1)),l(n,null,{default:r(()=>[...i[4]||(i[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image class="morePreview" src="/litos-ui/img1.svg" width="100px" preview-index="0"></l-image>
  <l-image class="morePreview" src="/litos-ui/img2.svg" width="100px" preview-index="1"></l-image>
  <l-image class="morePreview" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px" preview-index="2"></l-image>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-image class="morePreview" src="/litos-ui/img1.svg" width="100px" preview-index="0"></l-image>
  <l-image class="morePreview" src="/litos-ui/img2.svg" width="100px" preview-index="1"></l-image>
  <l-image class="morePreview" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px" preview-index="2"></l-image>
`),e("textarea",{lang:"js"},`  import { $, $$, on, off, iterate } from 'utilane/browser';
  const imgs = [
    '/litos-ui/img1.svg',
    '/litos-ui/img2.svg',
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  ];
  const $morePreview = $('.morePreview');
  iterate($morePreview, (item) => {
    item.setPreviewImageList(imgs);
  });
`)])],-1)])]),_:1}),i[16]||(i[16]=e("h3",{id:"disabling-preview",tabindex:"-1"},[a("Disabling Preview "),e("a",{class:"header-anchor",href:"#disabling-preview","aria-label":'Permalink to "Disabling Preview"'},"​")],-1)),i[17]||(i[17]=e("p",null,[a("Set "),e("code",null,"preview-disabled"),a(" to disable image preview.")],-1)),l(n,null,{default:r(()=>[...i[5]||(i[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image
    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    width="100px"
    preview-disabled
  ></l-image>
`)],-1)])]),_:1}),i[18]||(i[18]=e("h3",{id:"lazy-loading",tabindex:"-1"},[a("Lazy Loading "),e("a",{class:"header-anchor",href:"#lazy-loading","aria-label":'Permalink to "Lazy Loading"'},"​")],-1)),i[19]||(i[19]=e("p",null,[a("Set "),e("code",null,'loading="lazy"'),a(" to use native browser lazy loading.")],-1)),l(n,null,{default:r(()=>[...i[6]||(i[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image
    src="/litos-ui/img1.svg"
    width="100px"
    loading="lazy"
  ></l-image>
`)],-1)])]),_:1}),i[20]||(i[20]=e("blockquote",null,[e("p",null,[a("Lazy loading depends on browser support. If needed, evaluate "),e("a",{href:"https://github.com/mfranzke/loading-attribute-polyfill",target:"_blank",rel:"noreferrer"},"loading-attribute-polyfill"),a(" for your target browsers.")])],-1)),i[21]||(i[21]=e("h3",{id:"manual-preview",tabindex:"-1"},[a("Manual Preview "),e("a",{class:"header-anchor",href:"#manual-preview","aria-label":'Permalink to "Manual Preview"'},"​")],-1)),i[22]||(i[22]=e("p",null,[a("Use "),e("code",null,"ImagePreview"),a(" directly to preview images without relying on the "),e("code",null,"Image"),a(" component.")],-1)),l(n,null,{default:r(()=>[...i[7]||(i[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image
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
`),e("textarea",{lang:"js"},`  import { $, $$, on, off, iterate } from 'utilane/browser';
  const imgs = [
    '/litos-ui/img1.svg',
    '/litos-ui/img2.svg',
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  ];
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
`)])],-1)])]),_:1}),i[23]||(i[23]=h("",14))])}}});export{A as __pageData,T as default};
