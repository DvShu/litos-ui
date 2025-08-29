import{b as u,i as b,o as v,a as k,c as w}from"./chunks/dom.DBNJew1L.js";import{P as E}from"./chunks/popover.itIACCyP.js";import{v as f,P as x,x as P,C as y,c as I,o as C,ag as p,G as l,j as e,w as d,a as i}from"./chunks/framework._HD6XqYi.js";const A=JSON.parse('{"title":"Image 图片","description":"","frontmatter":{},"headers":[],"relativePath":"components/image.md","filePath":"components/image.md","lastUpdated":1754976652000}'),q={name:"components/image.md"},j=Object.assign(q,{setup(S){let t,c,r,o;const h=["/litos-ui/img1.svg","/litos-ui/img2.svg","https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"];function m(){t&&(k(t,"closed",m),t.remove(),t=void 0)}function g(s){const a=Number(s.target.getAttribute("data-preview-index"));t||(t=w("l-image-preview"),t.setImages(h),t.setCurrentIndex(a),v(t,"closed",m),document.body.appendChild(t),t.open=!0)}return f(()=>{x(()=>{c=u(".morePreview"),c.forEach(s=>{s.setPreviewImageList(h)}),r=u(".customPreview"),b(r,s=>{v(s,"click",g)}),o=new E({theme:"tooltip"})})}),P(()=>{c=void 0,this.handlePreviewClosed(),r&&b(r,s=>{k(s,"click",g)}),o&&(o.destroy(),o=void 0)}),(s,a)=>{const n=y("ClientOnly");return C(),I("div",null,[a[8]||(a[8]=p(`<h1 id="image-图片" tabindex="-1">Image 图片 <a class="header-anchor" href="#image-图片" aria-label="Permalink to &quot;Image 图片&quot;">​</a></h1><p>可预览的图片，在保留所有原生 <code>img</code> 的特性下，支持懒加载，自定义占位图片、加载失败等</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  regist,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Image,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ImagePreview,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  CloseIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ArrowLeftIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ArrowRightIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ZoomInIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ZoomOutIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ReductionIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RefreshLeftIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RefreshRightIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Image]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 需要图片预览时, 如果禁用图片预览, 则不需要引入下面</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ImagePreview,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  CloseIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ArrowLeftIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ArrowRightIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ZoomInIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ZoomOutIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ReductionIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RefreshLeftIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  RefreshRightIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>通过 <code>src</code> 属性来设置图片的地址, 可以通过 <code>width</code>、<code>height</code> 来设置图片的宽度、高度</p>`,7)),l(n,null,{default:d(()=>[...a[0]||(a[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px"></l-image>
`)],-1)])]),_:1}),a[9]||(a[9]=p('<h3 id="适应容器" tabindex="-1">适应容器 <a class="header-anchor" href="#适应容器" aria-label="Permalink to &quot;适应容器&quot;">​</a></h3><p>通过设置 <code>fit</code> 属性来控制图片的填充模式，可选值有：</p><ul><li>fill: 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。</li><li>contain: 保持原有尺寸比例完整显示在内容区域内，可能会留白。</li><li>cover: 保持原有尺寸比例缩放图片，直到图片至少一边填满内容区域，另一边超出内容区域并被裁剪。</li><li>none: 不改变图像本身的尺寸、密度和方向。</li><li>scale-down: 将图像缩小，以使其适应元素的内容框，同时保持其原始纵横比。如果无法满足这一条件（即图像已经小于或等于元素的大小），则将使用 &#39;none&#39; 值进行替代。</li></ul>',3)),l(n,null,{default:d(()=>[...a[1]||(a[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="docs-image-area1">
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
`)],-1)])]),_:1}),a[20]||(a[20]=p('<blockquote><p>从 <code>ios 15.4</code> 开始已经全面支持; 对于不支持 <code>loading=&quot;lazy&quot;</code> 属性的浏览器，可以通过 <a href="https://github.com/mfranzke/loading-attribute-polyfill" target="_blank" rel="noreferrer">loading-attribute-polyfill</a> 来兼容</p></blockquote><h3 id="手动预览" tabindex="-1">手动预览 <a class="header-anchor" href="#手动预览" aria-label="Permalink to &quot;手动预览&quot;">​</a></h3><p>如果不想通过 <code>Image</code> 组件来预览图片，也可以手动通过使用 <code>ImagePreview</code> 来预览图片</p>',3)),l(n,null,{default:d(()=>[...a[7]||(a[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image 
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
`)])],-1)])]),_:1}),a[21]||(a[21]=p('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="image-attibutes" tabindex="-1">Image Attibutes <a class="header-anchor" href="#image-attibutes" aria-label="Permalink to &quot;Image Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>src</code></td><td><em>必填</em> , 图片源地址，同原生属性一致</td><td><code>string</code></td><td>—</td></tr><tr><td><code>width</code></td><td>宽度</td><td><code>string</code></td><td>-</td></tr><tr><td><code>height</code></td><td>高度</td><td><code>string</code></td><td>-</td></tr><tr><td><code>alt</code></td><td>原生属性 <code>alt</code></td><td><code>string</code></td><td>-</td></tr><tr><td><code>loading</code></td><td>原生属性, 浏览器加载图像的策略</td><td><code>eager</code>、<code>lazy</code></td><td><code>eager</code></td></tr><tr><td><code>fit</code></td><td>确定图片如何适应容器框，同原生 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank" rel="noreferrer">object-fit</a></td><td><code>string</code></td><td>-</td></tr><tr><td><code>fallback</code></td><td>图片加载失败时显示的地址</td><td><code>string</code></td><td>-</td></tr><tr><td><code>custom-fallback</code></td><td>自定义图片加载失败时的内容</td><td><code>string</code></td><td>-</td></tr><tr><td><code>placeholder</code></td><td>图片占位, 用于加载大图时的占位</td><td><code>string</code></td><td>-</td></tr><tr><td><code>preview-disabled</code></td><td>禁用图片预览</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>preview-image-list</code></td><td>预览图片地址列表, 多图预览时使用, 用 <code>,</code> 分隔</td><td><code>string</code></td><td>-</td></tr><tr><td><code>preview-index</code></td><td>初始预览图像索引</td><td><code>number</code></td><td><code>0</code></td></tr></tbody></table><h3 id="image-slots" tabindex="-1">Image Slots <a class="header-anchor" href="#image-slots" aria-label="Permalink to &quot;Image Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>内容</td></tr><tr><td><code>fallback</code></td><td>图片加载失败时的内容</td></tr></tbody></table><h3 id="image-events" tabindex="-1">Image Events <a class="header-anchor" href="#image-events" aria-label="Permalink to &quot;Image Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>click</code></td><td>点击按钮时触发</td><td><code>(event: Event)</code></td></tr></tbody></table><h3 id="image-methods" tabindex="-1">Image Methods <a class="header-anchor" href="#image-methods" aria-label="Permalink to &quot;Image Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>setPreviewImageList(imageList: string[] | undefined)</code></td><td>设置预览图片地址列表</td><td><code>void</code></td></tr><tr><td><code>setPreviewIndex(index: number)</code></td><td>设置预览图片索引</td><td><code>void</code></td></tr><tr><td><code>openPreview()</code></td><td>打开预览</td><td><code>void</code></td></tr><tr><td><code>closePreview()</code></td><td>关闭预览</td><td><code>void</code></td></tr></tbody></table><h3 id="image-css-variables" tabindex="-1">Image CSS Variables <a class="header-anchor" href="#image-css-variables" aria-label="Permalink to &quot;Image CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>',11))])}}});export{A as __pageData,j as default};
