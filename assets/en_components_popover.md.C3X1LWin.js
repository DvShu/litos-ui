import{P as s,c as w,p as C}from"./chunks/popover.DbU6wtGt.js";import{t as P}from"./chunks/browser.CpyXlELn.js";import{v as F,P as A,x as q,C as x,o as _,c as D,a2 as d,E as r,w as l,j as e,a as o}from"./chunks/framework.nU6eqUhJ.js";const R=JSON.parse('{"title":"Popover","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/popover.md","filePath":"en/components/popover.md","lastUpdated":1793253144000}'),H={name:"en/components/popover.md"},L=Object.assign(H,{setup(B){let h,u,m,g,k,v,b,f,p,i,E,c;function y(){if(i){let n=document.createElement("l-tag");n.setAttribute("closeable","true"),n.setAttribute("type","primary"),n.setAttribute("data-title","Tag tooltip"),n.style.marginRight="5px",n.classList.add("tooltip-tag"),n.innerHTML="Tag",i.appendChild(n),P(n,"l-scale","enter"),n=null}}function T(n){P(n.target,"l-scale","leave",()=>{n.target.remove()})}return F(()=>{A(()=>{c=new s({theme:"tooltip",reference:".tooltip-tag"}),i=document.getElementById("tagGroup"),i&&(i.addEventListener("close",T),E=w(i,"tooltip-tag",c)),p=document.getElementById("addTag"),p&&p.addEventListener("click",y),h=new s,u=new s({reference:"#hover-popover",trigger:"hover"}),m=new s({reference:"#click-popover",trigger:"click"}),g=new s({reference:"#focus-popover",trigger:"focus"}),k=new s({reference:"#none-arrow",arrow:!1,offset:5}),v=new s({reference:"#custom",contentRender(){const n=document.createDocumentFragment(),t=document.createElement("p");t.innerHTML="Custom content 1",n.appendChild(t);const a=document.createElement("p");return a.innerHTML="Custom content 2",n.appendChild(a),n},updateContent(n,t){}}),b=new s({reference:"#tooltip",theme:"tooltip"}),f=new s({...C,reference:"#popconfirm",onPopoverAction(n){console.log(n)}})})}),q(()=>{i&&i.removeEventListener("close",T),E&&(E.disconnect(),E=void 0),c&&(c.destroy(),c=void 0),p&&p.removeEventListener("click",y),h&&h.destroy(),h=void 0,u&&u.destroy(),u=void 0,m&&m.destroy(),m=void 0,g&&g.destroy(),g=void 0,k&&k.destroy(),k=void 0,v&&v.destroy(),v=void 0,b&&b.destroy(),b=void 0,f&&f.destroy(),f=void 0}),(n,t)=>{const a=x("ClientOnly");return _(),D("div",null,[t[8]||(t[8]=d(`<h1 id="popover" tabindex="-1">Popover <a class="header-anchor" href="#popover" aria-label="Permalink to &quot;Popover&quot;">​</a></h1><p>Show a floating card when an element is clicked or hovered. Unlike a tooltip, a popover can contain interactive elements such as links and buttons, making it suitable for more complex content.</p><h2 id="import-and-registration" tabindex="-1">Import and Registration <a class="header-anchor" href="#import-and-registration" aria-label="Permalink to &quot;Import and Registration&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Popover, regist, Button, WarnIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/popover.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Button, WarnIcon]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Register Button and WarnIcon when using Popconfirm.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> popover</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Popover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// On unmount, call popover.destroy().</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><p>Add a <code>data-title</code> attribute and the <code>l-popover-reference</code> class to the trigger element, then create a <code>Popover</code> instance.</p>`,7)),r(a,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <a data-title="Hover hint" class="l-popover-reference">Hint</a>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <a data-title="Hover hint" class="l-popover-reference">Hint</a>
`),e("textarea",{lang:"js"},`  let popover = new Popover();
  // On unmount, call popover.destroy().
`)])],-1)])]),_:1}),t[9]||(t[9]=d('<blockquote><p>Pass <code>reference</code> to specify the reference elements when constructing <code>Popover</code>. If omitted, it finds all <code>.l-popover-reference</code> elements.</p></blockquote><h3 id="triggers" tabindex="-1">Triggers <a class="header-anchor" href="#triggers" aria-label="Permalink to &quot;Triggers&quot;">​</a></h3><p>Set <code>trigger</code> to <code>hover</code>, <code>click</code>, or <code>focus</code>. The default is <code>hover</code>.</p>',3)),r(a,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="hover-popover" data-title="Hover hint">Hover hint</l-button>
  <l-button id="click-popover" data-title="Click hint">Click hint</l-button>
  <l-button id="focus-popover" data-title="Focus hint">Focus hint</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="hover-popover" data-title="Hover hint">Hover hint</l-button>
  <l-button id="click-popover" data-title="Click hint">Click hint</l-button>
  <l-button id="focus-popover" data-title="Focus hint">Focus hint</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#hover-popover',
    trigger: 'hover',
  });
  new Popover({
    reference: '#click-popover',
    trigger: 'click',
  });
  new Popover({
    reference: '#focus-popover',
    trigger: 'focus',
  });
`)])],-1)])]),_:1}),t[10]||(t[10]=d('<blockquote><p>Set <code>trigger: &quot;manual&quot;</code> for manual control, then call <code>popover.show(reference)</code> and <code>popover.hide()</code>. The separate <code>updatePosition</code> and <code>autoUpdate</code> helpers handle positioning rather than visibility.</p></blockquote><h3 id="placement" tabindex="-1">Placement <a class="header-anchor" href="#placement" aria-label="Permalink to &quot;Placement&quot;">​</a></h3><p>There are <code>12</code> placements. Set the placement with the <code>data-placement</code> attribute.</p>',3)),r(a,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="top-start">top-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="top">top</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="top-end">top-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="left-start">left-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="left">left</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="left-end">left-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="right-start">right-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="right">right</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="right-end">right-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="bottom-start">bottom-start</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="bottom">bottom</l-button>
    <l-button class="l-popover-reference" data-title="Hint content" data-placement="bottom-end">bottom-end</l-button>
  </div>
`)],-1)])]),_:1}),t[11]||(t[11]=d('<blockquote><p>You can also pass <code>placement</code> when constructing <code>Popover</code>.</p></blockquote><h3 id="hiding-the-arrow" tabindex="-1">Hiding the Arrow <a class="header-anchor" href="#hiding-the-arrow" aria-label="Permalink to &quot;Hiding the Arrow&quot;">​</a></h3><p>Set <code>arrow</code> to <code>false</code> when constructing <code>Popover</code> to hide the arrow. Use <code>offset</code> to adjust the distance from the reference element.</p>',3)),r(a,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="none-arrow" data-title="Hint content">Hint</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="none-arrow" data-title="Hint content">Hint</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#none-arrow',
    arrow: false,
    offset: 5,
  });
`)])],-1)])]),_:1}),t[12]||(t[12]=e("h3",{id:"custom-content",tabindex:"-1"},[o("Custom Content "),e("a",{class:"header-anchor",href:"#custom-content","aria-label":'Permalink to "Custom Content"'},"​")],-1)),t[13]||(t[13]=e("p",null,[o("Customize content with "),e("code",null,"contentRender"),o(" and "),e("code",null,"updateContent"),o(", or supply a custom DOM element through the "),e("code",null,"popover"),o(" option.")],-1)),r(a,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="custom">Hint</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="custom">Hint</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#custom',
    // Provide a renderer called when content is first created.
    contentRender () {
      const fragment = document.createDocumentFragment();
      const $p1 = document.createElement('p');
      $p1.innerHTML = 'Custom content 1';
      fragment.appendChild($p1);
      const $p2 = document.createElement('p');
      $p2.innerHTML = 'Custom content 2';
      fragment.appendChild($p2);
      return fragment;
    },
    // Update content on each show; datas contains the reference data attributes.
    updateContent (popoverEl, datas) {}
  })
`)])],-1)])]),_:1}),t[14]||(t[14]=d(`<blockquote><p>Pass your own element through <code>popover</code> to customize the entire popover structure.</p></blockquote><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group--WQGp" id="tab-gGe3Iq1" checked><label data-title="html" for="tab-gGe3Iq1">html</label><input type="radio" name="group--WQGp" id="tab-KPmBrDQ"><label data-title="js" for="tab-KPmBrDQ">js</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;popover&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-popover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-popover-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    &lt;!-- Add the remaining content here. --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-popover-arrow&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> $popover</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#popover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Popover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  reference: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#custom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  popover: $popover,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div></div><h3 id="tooltip" tabindex="-1">Tooltip <a class="header-anchor" href="#tooltip" aria-label="Permalink to &quot;Tooltip&quot;">​</a></h3><p>The tooltip variant uses slightly different styling. Set the constructor option <code>theme: &#39;tooltip&#39;</code> to enable it.</p>`,4)),r(a,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button data-title="Hint content" id="tooltip">Hint</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button data-title="Hint content" id="tooltip">Hint</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#tooltip',
    theme: 'tooltip',
  });
`)])],-1)])]),_:1}),t[15]||(t[15]=e("h3",{id:"popconfirm",tabindex:"-1"},[o("Popconfirm "),e("a",{class:"header-anchor",href:"#popconfirm","aria-label":'Permalink to "Popconfirm"'},"​")],-1)),t[16]||(t[16]=e("p",null,[o("Import the "),e("code",null,"popconfirmProps"),o(" configuration and set "),e("code",null,"data-content"),o(" on the reference element to provide the confirmation message.")],-1)),t[17]||(t[17]=e("p",null,"The built-in confirmation buttons currently use Chinese labels. This page translates the examples without changing component localization.",-1)),r(a,null,{default:l(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button data-content="Delete this item?" id="popconfirm">Delete</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button data-content="Delete this item?" id="popconfirm">Delete</l-button>
`),e("textarea",{lang:"js"},`  import { regist, Button, WarnIcon, popconfirmProps } from 'litos-ui';
  regist([Button, WarnIcon]);
  //-
  new Popover({
    ...popconfirmProps,
    reference: '#popconfirm',
    onPopoverAction (action) {
      console.log(action);
    }
  });
`)])],-1)])]),_:1}),t[18]||(t[18]=e("h3",{id:"dynamic-list-elements",tabindex:"-1"},[o("Dynamic List Elements "),e("a",{class:"header-anchor",href:"#dynamic-list-elements","aria-label":'Permalink to "Dynamic List Elements"'},"​")],-1)),t[19]||(t[19]=e("p",null,[o("Use "),e("code",null,"createPopoverObserver"),o(" to track elements added to or removed from a dynamic list, such as when changing pages.")],-1)),r(a,null,{default:l(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="addTag" type="primary">Add tag</l-button>
  <hr />
  <div id="tagGroup"></div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="addTag" type="primary">Add tag</l-button>
  <hr />
  <div id="tagGroup"></div>
`),e("textarea",{lang:"js"},`  import { createPopoverObserver, Popover, Tag, Button, CloseIcon, regist } from 'litos-ui';
  import 'litos-ui/styles/transition.css';
  regist([CloseIcon, Button, Tag]);
  import { transition } from 'utilane/browser';
  //-
  let $tagGroup = document.getElementById('tagGroup');
  let $addTag = document.getElementById('addTag');
  //-
  let tooltip = new Popover({
    reference: '.tooltip-tag',
    theme: 'tooltip',
  });
  //-
  let observer = createPopoverObserver(tagGroup, 'tooltip-tag', tooltip);
  //-
  function handleAddTag() {
    if ($tagGroup) {
      let $addTagTmp = document.createElement('l-tag');
      $addTagTmp.setAttribute('closeable', 'true');
      $addTagTmp.setAttribute('type', 'primary');
      $addTagTmp.setAttribute('data-title', 'Tag tooltip'); // Set the tooltip content.
      $addTagTmp.style.marginRight = "5px";
      $addTagTmp.classList.add('tooltip-tag'); // Add the tooltip-tag class.
      $addTagTmp.innerHTML = 'Tag';
      $tagGroup.appendChild($addTagTmp);
      transition($addTagTmp, 'l-scale', "enter");
      $addTagTmp = null;
    }
  }
  //-
  function handleRemoveTag(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }
  //-
  $addTag.addEventListener('click', handleAddTag);
  $tagGroup.addEventListener('close', handleRemoveTag);
  //-
  // Release resources on unmount.
  // tooltip.destroy();
  // observer.disconnect();
  // tooltip = null;
  // observer = null;
  // $addTag.removeEventListener('click', handleAddTag);
  // $tagGroup.removeEventListener('close', handleRemoveTag);
`)])],-1)])]),_:1}),t[20]||(t[20]=d(`<p><code>createPopoverObserver(target: HTMLElement,class: string,popover: Popover): MutationObserver</code></p><p>Creates an observer that updates the popover references when elements with the specified class are added or removed.</p><ol><li><code>target</code>: The element whose children are observed, typically a list container or table.</li><li><code>class</code>: The class used to identify relevant added or removed elements.</li><li><code>popover</code>: The Popover instance whose references are updated when matching elements change.</li></ol><blockquote><p>For a small, fixed set of elements, call <code>popover.addReference</code> and <code>popover.removeReference</code> manually instead of using <code>createPopoverObserver</code>.</p></blockquote><h2 id="on-demand-entry" tabindex="-1">On-demand entry <a class="header-anchor" href="#on-demand-entry" aria-label="Permalink to &quot;On-demand entry&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/popover.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Popover } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/popover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See <a href="/litos-ui/en/on_demand">On-demand Imports</a> for styles, child elements, types and root-entry compatibility.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="popover-constructor-options" tabindex="-1">Popover Constructor Options <a class="header-anchor" href="#popover-constructor-options" aria-label="Permalink to &quot;Popover Constructor Options&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>reference</code></td><td>Reference elements; defaults to all .l-popover-reference elements</td><td><code>HTMLElement</code>, <code>HTMLElement[]</code>, <code>string</code></td><td><code>-</code></td></tr><tr><td><code>popover</code></td><td>Popover DOM element; created automatically if omitted</td><td><code>HTMLElement</code></td><td><code>-</code></td></tr><tr><td><code>contentRender</code></td><td>Content renderer</td><td><code>() =&gt; HTMLElement | string | DocumentFragment</code></td><td><code>-</code></td></tr><tr><td><code>updateContent</code></td><td>Runs on each show to update content; datas contains the reference element data attributes</td><td><code>(popoverElement: HTMLElement, datas?: Record&lt;string, any&gt;) =&gt; void</code></td><td><code>-</code></td></tr><tr><td><code>trigger</code></td><td>Trigger mode</td><td><code>hover</code>, <code>click</code>, <code>focus</code>, <code>manual</code> (manual control)</td><td><code>hover</code></td></tr><tr><td><code>offset</code></td><td>Offset</td><td><code>number</code></td><td><code>10</code></td></tr><tr><td><code>arrow</code></td><td>Whether to show the arrow</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>arrowSize</code></td><td>Arrow size</td><td><code>number</code></td><td><code>8</code></td></tr><tr><td><code>theme</code></td><td>Theme</td><td><code>default</code>, <code>tooltip</code>, <code>popconfirm</code></td><td><code>default</code></td></tr><tr><td><code>placement</code></td><td>Placement</td><td><code>top</code>, <code>top-start</code>, <code>top-end</code>, <code>bottom</code>, <code>bottom-start</code>, <code>bottom-end</code>, <code>left</code>, <code>left-start</code>, <code>left-end</code>, <code>right</code>, <code>right-start</code>, <code>right-end</code></td><td><code>top</code></td></tr><tr><td><code>popoverWidth</code></td><td>Popover width; trigger matches the reference element width</td><td><code>number</code>, <code>trigger</code></td><td><code>-</code></td></tr><tr><td><code>onPopoverAction</code></td><td>Called when a popover element with data-action is clicked</td><td><code>(action: string, target: HTMLElement) =&gt; void</code></td><td><code>-</code></td></tr><tr><td><code>onOpenChange</code></td><td>Called when visibility changes</td><td><code>(isOpen: boolean, popoverElement?: HTMLElement) =&gt; void</code></td><td><code>-</code></td></tr><tr><td><code>onOutsideTap</code></td><td>Called on outside clicks; isReference and isPopover identify the clicked area</td><td><code>(e: Event, isReference: boolean, isPopover: boolean) =&gt; void</code></td><td><code>-</code></td></tr></tbody></table><h3 id="popover-methods" tabindex="-1">Popover Methods <a class="header-anchor" href="#popover-methods" aria-label="Permalink to &quot;Popover Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Parameters</th></tr></thead><tbody><tr><td><code>destroy</code></td><td>Destroys the instance</td><td><code>-</code></td></tr><tr><td><code>hide</code></td><td>Hides the popover</td><td><code>-</code></td></tr><tr><td><code>show</code></td><td>Shows the popover</td><td><code>(reference: HTMLElement)</code> The element used to position the popover</td></tr></tbody></table>`,12))])}}});export{R as __pageData,L as default};
