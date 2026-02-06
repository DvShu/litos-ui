import{P as s,c as F,p as C}from"./chunks/popover.Hrv0TtSB.js";import{t as P}from"./chunks/dom.DntxtiBs.js";import{v as A,P as _,x as q,C as w,o as x,c as B,ag as r,E as d,w as l,j as e,a}from"./chunks/framework.-4c4jpF6.js";const R=JSON.parse('{"title":"Popover 弹出气泡","description":"","frontmatter":{},"headers":[],"relativePath":"components/popover.md","filePath":"components/popover.md","lastUpdated":1754560800000}'),D={name:"components/popover.md"},V=Object.assign(D,{setup($){let h,u,k,v,g,m,b,E,p,i,f,c;function y(){if(i){let o=document.createElement("l-tag");o.setAttribute("closable","true"),o.setAttribute("type","primary"),o.setAttribute("data-title","标签提示"),o.style.marginRight="5px",o.classList.add("tooltip-tag"),o.innerHTML="标签",i.appendChild(o),P(o,"l-scale","enter"),o=null}}function T(o){P(o.target,"l-scale","leave",()=>{o.target.remove()})}return A(()=>{_(()=>{c=new s({theme:"tooltip",reference:".tooltip-tag"}),i=document.getElementById("tagGroup"),i&&(i.addEventListener("close",T),f=F(i,"tooltip-tag",c)),p=document.getElementById("addTag"),p&&p.addEventListener("click",y),h=new s,u=new s({reference:"#hover-popover",trigger:"hover"}),k=new s({reference:"#click-popover",trigger:"click"}),v=new s({reference:"#focus-popover",trigger:"focus"}),g=new s({reference:"#none-arrow",arrow:!1,offset:5}),m=new s({reference:"#custom",contentRender(){const o=document.createDocumentFragment(),t=document.createElement("p");t.innerHTML="自定义内容1",o.appendChild(t);const n=document.createElement("p");return n.innerHTML="自定义内容2",o.appendChild(n),o},updateContent(o,t){}}),b=new s({reference:"#tooltip",theme:"tooltip"}),E=new s({...C,reference:"#popconfirm",onPopoverAction(o){console.log(o)}})})}),q(()=>{i&&i.removeEventListener("close",T),f&&(f.disconnect(),f=void 0),c&&(c.destroy(),c=void 0),p&&p.removeEventListener("click",y),h&&h.destroy(),h=void 0,u&&u.destroy(),u=void 0,k&&k.destroy(),k=void 0,v&&v.destroy(),v=void 0,g&&g.destroy(),g=void 0,m&&m.destroy(),m=void 0,b&&b.destroy(),b=void 0,E&&E.destroy(),E=void 0}),(o,t)=>{const n=w("ClientOnly");return x(),B("div",null,[t[8]||(t[8]=r(`<h1 id="popover-弹出气泡" tabindex="-1">Popover 弹出气泡 <a class="header-anchor" href="#popover-弹出气泡" aria-label="Permalink to &quot;Popover 弹出气泡&quot;">​</a></h1><p>点击/鼠标移入元素，弹出气泡式的卡片浮层。在内容周围弹出一些隐藏的信息。和 <code>Tooltip</code> 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Popover, regist, Button, WarnIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/popover.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Button, WarnIcon]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 当使用 Popconfirm 时，需要注册 Button 和 WarnIcon 组件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> popover</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Popover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 页面结束时调用: popover.destroy();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>最简单的用法，给需要弹出的元素添加 <code>data-title</code> 属性以及 <code>l-popover-reference</code> 类, 然后构造一个 <code>Popover</code> 对象。</p>`,7)),d(n,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <a data-title="悬浮提示" class="l-popover-reference">提示</a>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <a data-title="悬浮提示" class="l-popover-reference">提示</a>
`),e("textarea",{lang:"js"},`  let popover = new Popover();
  // 页面结束时调用: popover.destroy();
`)])],-1)])]),_:1}),t[9]||(t[9]=r('<blockquote><p>构造 <code>Popver</code> 对象时支持传递 <code>reference</code> 参数，用于指定弹出层的参考元素，如果不指定则查找所有的 <code>.l-popover-reference</code> 元素。</p></blockquote><h3 id="触发方式" tabindex="-1">触发方式 <a class="header-anchor" href="#触发方式" aria-label="Permalink to &quot;触发方式&quot;">​</a></h3><p>三种触发方式：鼠标移入[<code>hover</code>]、点击[<code>click</code>]、焦点[<code>focus</code>]；通过 <code>trigger</code> 属性设置触发方式。默认为：<code>hover</code>；</p>',3)),d(n,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="hover-popover" data-title="悬浮提示">悬浮提示</l-button>
  <l-button id="click-popover" data-title="点击提示">点击提示</l-button>
  <l-button id="focus-popover" data-title="焦点提示">焦点提示</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="hover-popover" data-title="悬浮提示">悬浮提示</l-button>
  <l-button id="click-popover" data-title="点击提示">点击提示</l-button>
  <l-button id="focus-popover" data-title="焦点提示">焦点提示</l-button>
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
`)])],-1)])]),_:1}),t[10]||(t[10]=r('<blockquote><p>如果需要自定义触发方式，则可以通过引入 <code>updatePosition</code> 或者 <code>autoUpdate</code> 函数来，手动显示和隐藏弹出层。</p></blockquote><h3 id="位置" tabindex="-1">位置 <a class="header-anchor" href="#位置" aria-label="Permalink to &quot;位置&quot;">​</a></h3><p>有 <code>12</code> 个弹出位置。通过 <code>data-placement</code> 属性设置弹出位置。</p>',3)),d(n,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="top-start">top-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="top">top</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="top-end">top-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="left-start">left-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="left">left</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="left-end">left-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="right-start">right-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="right">right</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="right-end">right-end</l-button>
  </div>
  <div class="popover-p-row">
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="bottom-start">bottom-start</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="bottom">bottom</l-button>
    <l-button class="l-popover-reference" data-title="提示内容" data-placement="bottom-end">bottom-end</l-button>
  </div>
`)],-1)])]),_:1}),t[11]||(t[11]=r('<blockquote><p>也可以再构造 <code>Popover</code> 对象时传递 <code>placement</code> 参数来设置弹出位置。</p></blockquote><h3 id="不显示箭头" tabindex="-1">不显示箭头 <a class="header-anchor" href="#不显示箭头" aria-label="Permalink to &quot;不显示箭头&quot;">​</a></h3><p>构造 <code>Popover</code> 时将 <code>arrow</code> 参数设置为 <code>false</code> 即可；同时可以设置 <code>offset</code> 参数来设置偏移量。</p>',3)),d(n,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="none-arrow" data-title="提示内容">提示</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="none-arrow" data-title="提示内容">提示</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#none-arrow',
    arrow: false,
    offset: 5,
  });
`)])],-1)])]),_:1}),t[12]||(t[12]=e("h3",{id:"自定义内容",tabindex:"-1"},[a("自定义内容 "),e("a",{class:"header-anchor",href:"#自定义内容","aria-label":'Permalink to "自定义内容"'},"​")],-1)),t[13]||(t[13]=e("p",null,[a("通过 "),e("code",null,"slot"),a(" 插槽来设置 "),e("code",null,"l-popover"),a(" 的内容")],-1)),d(n,null,{default:l(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="custom">提示</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="custom">提示</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#custom',
    // 提供自定义的内容渲染函数, 初次渲染时调用
    contentRender () {
      const fragment = document.createDocumentFragment();
      const $p1 = document.createElement('p');
      $p1.innerHTML = '自定义内容1';
      fragment.appendChild($p1);
      const $p2 = document.createElement('p');
      $p2.innerHTML = '自定义内容2';
      fragment.appendChild($p2);
      return fragment;
    },
    // 每次显示的时候，都会调用这个函数更新渲染内容, datas 为 reference 节点上的 data 属性集
    updateContent (popoverEl, datas) {}
  })
`)])],-1)])]),_:1}),t[14]||(t[14]=r(`<blockquote><p>出了通过这种形式外，也可以自己通过 <code>popover</code> 属性，指向一个 <code>popover</code> 节点，这个时候，可以完全自定义包括整个 <code>popover</code> 在内的结构</p></blockquote><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-sBWKp" id="tab-F6F5Rfw" checked><label data-title="html" for="tab-F6F5Rfw">html</label><input type="radio" name="group-sBWKp" id="tab-KiefGaG"><label data-title="js" for="tab-KiefGaG">js</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;popover&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-popover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-popover-content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    &lt;!--这里填充其余内容部分--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-popover-arrow&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> $popover</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#popover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Popover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  reference: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#custom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  popover: $popover,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div></div><h3 id="tooltip" tabindex="-1">Tooltip <a class="header-anchor" href="#tooltip" aria-label="Permalink to &quot;Tooltip&quot;">​</a></h3><p><code>tooltip</code> 相对于 <code>popover</code> 只是样式进行了小调整；只需要设置 <code>theme=&quot;tooltip&quot;</code> 属性就能即可。</p>`,4)),d(n,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button data-title="提示内容" id="tooltip">提示</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button data-title="提示内容" id="tooltip">提示</l-button>
`),e("textarea",{lang:"js"},`  new Popover({
    reference: '#tooltip',
    theme: 'tooltip',
  });
`)])],-1)])]),_:1}),t[15]||(t[15]=e("h3",{id:"popconfirm",tabindex:"-1"},[a("Popconfirm "),e("a",{class:"header-anchor",href:"#popconfirm","aria-label":'Permalink to "Popconfirm"'},"​")],-1)),t[16]||(t[16]=e("p",null,[a("引入 "),e("code",null,"Popconfirm"),a(" 配置，然后在 "),e("code",null,"reference"),a(" 节点上添加 "),e("code",null,"data-content"),a(" 属性为提示内容。")],-1)),d(n,null,{default:l(()=>[...t[6]||(t[6]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button data-content="确定删除吗？" id="popconfirm">删除</l-button>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button data-content="确定删除吗？" id="popconfirm">删除</l-button>
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
`)])],-1)])]),_:1}),t[17]||(t[17]=e("h3",{id:"列表元素",tabindex:"-1"},[a("列表元素 "),e("a",{class:"header-anchor",href:"#列表元素","aria-label":'Permalink to "列表元素"'},"​")],-1)),t[18]||(t[18]=e("p",null,[a("由于动态列表元素，牵涉到元素的添加和删除，如果翻页等等，所以提供了 "),e("code",null,"createPopoverObserver"),a(" 函数来配合监听列表元素的添加和删除。")],-1)),d(n,null,{default:l(()=>[...t[7]||(t[7]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="addTag" type="primary">添加标签</l-button>
  <hr />
  <div id="tagGroup"></div>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-button id="addTag" type="primary">添加标签</l-button>
  <hr />
  <div id="tagGroup"></div>
`),e("textarea",{lang:"js"},`  import { createPopoverObserver, Popover } from 'litos-ui';
  import { transition } from 'ph-utils/dom';
  //-
  let tagGroup = document.getElementById('tagGroup');
  let addTagBtn = document.getElementById('addTag');
  //-
  let tootip = new Popover({
    reference: '.tooltip-tag',
    theme: 'tooltip',
  });
  //-
  let observer = createPopoverObserver(tagGroup, 'tooltip-tag', tootip);
  //-
  function handleAddTag() {
    if ($tagGroup) {
      let $addTagTmp = document.createElement('l-tag');
      $addTagTmp.setAttribute('closable', 'true');
      $addTagTmp.setAttribute('type', 'primary');
      $addTagTmp.setAttribute('data-title', '标签提示'); // 设置提示内容
      $addTagTmp.style.marginRight = "5px";
      $addTagTmp.classList.add('tooltip-tag'); // 添加 tooltip-tag 类名
      $addTagTmp.innerHTML = '标签';
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
  $tagGroup.addEventListener('click', handleAddTag);
  //-
  // 移除的时候释放资源
  // tooltip.destroy();
  // observer.disconnect();
  // tooltip = null;
  // observer = null;
  // $tagGroup.removeEventListener('click', handleRemoveTag);
`)])],-1)])]),_:1}),t[19]||(t[19]=r('<p><code>createPopoverObserver(target: HTMLElement,class: string,popover: Popover): MutationObserver</code></p><p>创建元素监听器, 监听到元素添加和删除, 然后根据 <code>class</code> 类名, 来修改 <code>Popover</code> 元素。</p><ol><li><code>target</code>: 目标元素, 监听这个元素下的子元素添加和删除, 通常为列表容器或者 <code>table</code>。</li><li><code>class</code>: 类名, 当子元素添加和删除, 都包含这个类名时, 才会触发 <code>Popover</code> 元素的添加和删除。</li><li><code>popover</code>: <code>Popover</code> 对象, 当子元素添加和删除时符合 <code>class</code> 规则时, 会触发 <code>Popover refenrence</code> 元素的添加和删除。</li></ol><blockquote><p>如果是固定且少量的元素，则可以不用 <code>createPopoverObserver</code>，转而自己手动执行 <code>popover.addReference</code> 和 <code>popover.removeReference</code> 方法</p></blockquote><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="popover-constructor-attibutes" tabindex="-1">Popover Constructor Attibutes <a class="header-anchor" href="#popover-constructor-attibutes" aria-label="Permalink to &quot;Popover Constructor Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>reference</code></td><td>触发元素, 不传,则查询所有的 <code>.l-popover-reference</code></td><td><code>HTMLElement</code>、<code>HTMLElement[]</code>、<code>string</code></td><td><code>-</code></td></tr><tr><td><code>popover</code></td><td><code>Popover</code>元素节点, 不传会自动创建</td><td><code>HTMLElement</code></td><td><code>-</code></td></tr><tr><td><code>contentRender</code></td><td>内容渲染函数</td><td>`() =&gt; HTMLElement</td><td>string</td></tr><tr><td><code>updateContent</code></td><td>内容更新函数, <code>datas</code> 为 <code>reference</code> 节点上的 <code>data</code> 属性集</td><td><code>(popoverElement: HTMLElement, datas?: Record&lt;string, any&gt;) =&gt; void</code></td><td><code>-</code></td></tr><tr><td><code>trigger</code></td><td>触发方式</td><td><code>hover</code>、<code>click</code>、<code>focus</code></td><td><code>hover</code></td></tr><tr><td><code>offset</code></td><td>偏移量</td><td><code>number</code></td><td><code>10</code></td></tr><tr><td><code>arrow</code></td><td>是否显示箭头</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td><code>arrowSize</code></td><td>箭头大小</td><td><code>number</code></td><td><code>8</code></td></tr><tr><td><code>width</code></td><td>宽度</td><td><code>string</code>、<code>number</code></td><td><code>-</code></td></tr><tr><td><code>theme</code></td><td>主题</td><td><code>default</code>、<code>tooltip</code></td><td><code>default</code></td></tr><tr><td><code>placement</code></td><td>位置</td><td><code>top</code>、<code>top-start</code>、<code>top-end</code>、<code>bottom</code>、<code>bottom-start</code>、<code>bottom-end</code>、<code>left</code>、<code>left-start</code>、<code>left-end</code>、<code>right</code>、<code>right-start</code>、<code>right-end</code></td><td><code>top</code></td></tr><tr><td><code>popoverWidth</code></td><td>弹出宽度, <code>trigger</code> 保持和触发元素宽度一致</td><td><code>string</code>、<code>trigger</code></td><td><code>-</code></td></tr><tr><td><code>onPopoverAction</code></td><td>点击 <code>Popover</code> 内具有 <code>data-action</code> 的元素时触发</td><td><code>(action: string) =&gt; void</code></td><td><code>-</code></td></tr></tbody></table><h3 id="popover-css-variables" tabindex="-1">Popover CSS Variables <a class="header-anchor" href="#popover-css-variables" aria-label="Permalink to &quot;Popover CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>-</code></td><td>-</td><td><code>-</code></td></tr></tbody></table>',9))])}}});export{R as __pageData,V as default};
