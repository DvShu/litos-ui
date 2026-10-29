import{b as u,i as b,o as v,a as w,c as k}from"./chunks/browser.CpyXlELn.js";import{P as f}from"./chunks/popover.DbU6wtGt.js";import{v as E,P as x,x as y,C as P,o as I,c as S,a2 as h,E as l,w as r,j as e,a}from"./chunks/framework.nU6eqUhJ.js";const A=JSON.parse('{"title":"Image","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/image.md","filePath":"en/components/image.md","lastUpdated":1793253144000}'),C={name:"en/components/image.md"},T=Object.assign(C,{setup(F){let t,p,d,o;const m=["/litos-ui/img1.svg","/litos-ui/img2.svg","https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"];function c(){t&&(w(t,"closed",c),t.remove(),t=void 0)}function g(s){const i=Number(s.target.getAttribute("data-preview-index"));t||(t=k("l-image-preview"),t.setImages(m),t.setCurrentIndex(i),v(t,"closed",c),document.body.appendChild(t),t.open=!0)}return E(()=>{x(()=>{p=u(".morePreview"),p.forEach(s=>{s.setPreviewImageList(m)}),d=u(".customPreview"),b(d,s=>{v(s,"click",g)}),o=new f({theme:"tooltip"})})}),y(()=>{p=void 0,c(),d&&b(d,s=>{w(s,"click",g)}),o&&(o.destroy(),o=void 0)}),(s,i)=>{const n=P("ClientOnly");return I(),S("div",null,[i[8]||(i[8]=h(`<h1 id="image" tabindex="-1">Image <a class="header-anchor" href="#image" aria-label="Permalink to &quot;Image&quot;">​</a></h1><p>An image component with preview, native image attributes, lazy loading, placeholders, and error fallbacks.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
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
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register these components when image preview is enabled.</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Set the image URL with <code>src</code>, and its dimensions with <code>width</code> and <code>height</code>.</p>`,7)),l(n,null,{default:r(()=>[...i[0]||(i[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" width="100px"></l-image>
`)],-1)])]),_:1}),i[9]||(i[9]=h('<h3 id="object-fit" tabindex="-1">Object Fit <a class="header-anchor" href="#object-fit" aria-label="Permalink to &quot;Object Fit&quot;">​</a></h3><p>Set <code>fit</code> to control how the image fits its container:</p><ul><li>fill: Stretch the image to fill the content box. Its aspect ratio may change.</li><li>contain: Fit the entire image inside the content box while preserving its aspect ratio; empty space may remain.</li><li>cover: Fill the content box while preserving the aspect ratio, cropping any overflow.</li><li>none: Keep the image at its intrinsic size.</li><li>scale-down: Use the smaller result of none and contain, preserving the aspect ratio without enlarging the image.</li></ul>',3)),l(n,null,{default:r(()=>[...i[1]||(i[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="docs-image-area1">
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
`)])],-1)])]),_:1}),i[23]||(i[23]=h(`<h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/image&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="image-attributes" tabindex="-1">Image Attributes <a class="header-anchor" href="#image-attributes" aria-label="Permalink to &quot;Image Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>src</code></td><td>Required image URL, matching the native src attribute</td><td><code>string</code></td><td>—</td></tr><tr><td><code>width</code></td><td>Width</td><td><code>string</code></td><td>-</td></tr><tr><td><code>height</code></td><td>Height</td><td><code>string</code></td><td>-</td></tr><tr><td><code>alt</code></td><td>Native alt attribute</td><td><code>string</code></td><td>-</td></tr><tr><td><code>loading</code></td><td>Native browser image loading strategy</td><td><code>eager</code>, <code>lazy</code></td><td><code>eager</code></td></tr><tr><td><code>fit</code></td><td>How the image fits its container; see <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank" rel="noreferrer">object-fit</a></td><td><code>string</code></td><td>-</td></tr><tr><td><code>fallback</code></td><td>Image URL displayed when loading fails</td><td><code>string</code></td><td>-</td></tr><tr><td><code>custom-fallback</code></td><td>Whether to use custom fallback content</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>placeholder</code></td><td>Placeholder image displayed while the main image loads</td><td><code>string</code></td><td>-</td></tr><tr><td><code>preview-disabled</code></td><td>Whether to disable image preview</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>preview-image-list</code></td><td>Comma-separated preview image URLs</td><td><code>string</code></td><td>-</td></tr><tr><td><code>preview-index</code></td><td>Initial preview image index</td><td><code>number</code></td><td><code>0</code></td></tr></tbody></table><h3 id="image-slots" tabindex="-1">Image Slots <a class="header-anchor" href="#image-slots" aria-label="Permalink to &quot;Image Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>Content</td></tr><tr><td><code>fallback</code></td><td>Content displayed when image loading fails</td></tr></tbody></table><h3 id="image-events" tabindex="-1">Image Events <a class="header-anchor" href="#image-events" aria-label="Permalink to &quot;Image Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Event</th><th>Description</th><th>Callback parameter</th></tr></thead><tbody><tr><td><code>click</code></td><td>Fires when the image is clicked</td><td><code>(event: Event)</code></td></tr></tbody></table><h3 id="image-methods" tabindex="-1">Image Methods <a class="header-anchor" href="#image-methods" aria-label="Permalink to &quot;Image Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td><code>setPreviewImageList(imageList: string[] | undefined)</code></td><td>Sets the preview image URLs</td><td><code>void</code></td></tr><tr><td><code>setPreviewIndex(index: number)</code></td><td>Sets the preview image index</td><td><code>void</code></td></tr><tr><td><code>openPreview()</code></td><td>Opens the preview</td><td><code>void</code></td></tr><tr><td><code>closePreview()</code></td><td>Closes the preview</td><td><code>void</code></td></tr></tbody></table><h3 id="image-css-variables" tabindex="-1">Image CSS Variables <a class="header-anchor" href="#image-css-variables" aria-label="Permalink to &quot;Image CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>`,14))])}}});export{A as __pageData,T as default};
