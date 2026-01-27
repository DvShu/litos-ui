import{P as s,c as F,p as C}from"./chunks/popover.Hrv0TtSB.js";import{t as P}from"./chunks/dom.DntxtiBs.js";import{v as _,P as A,x as q,C as w,o as x,c as B,ag as r,E as d,w as l,j as e,a}from"./chunks/framework.-4c4jpF6.js";const V=JSON.parse('{"title":"Popover 弹出气泡","description":"","frontmatter":{},"headers":[],"relativePath":"components/popover.md","filePath":"components/popover.md","lastUpdated":1754560800000}'),D={name:"components/popover.md"},R=Object.assign(D,{setup(I){let h,u,k,v,g,m,b,E,p,i,f,c;function y(){if(i){let o=document.createElement("l-tag");o.setAttribute("closable","true"),o.setAttribute("type","primary"),o.setAttribute("data-title","标签提示"),o.style.marginRight="5px",o.classList.add("tooltip-tag"),o.innerHTML="标签",i.appendChild(o),P(o,"l-scale","enter"),o=null}}function T(o){P(o.target,"l-scale","leave",()=>{o.target.remove()})}return _(()=>{A(()=>{c=new s({theme:"tooltip",reference:".tooltip-tag"}),i=document.getElementById("tagGroup"),i&&(i.addEventListener("close",T),f=F(i,"tooltip-tag",c)),p=document.getElementById("addTag"),p&&p.addEventListener("click",y),h=new s,u=new s({reference:"#hover-popover",trigger:"hover"}),k=new s({reference:"#click-popover",trigger:"click"}),v=new s({reference:"#focus-popover",trigger:"focus"}),g=new s({reference:"#none-arrow",arrow:!1,offset:5}),m=new s({reference:"#custom",contentRender(){const o=document.createDocumentFragment(),t=document.createElement("p");t.innerHTML="自定义内容1",o.appendChild(t);const n=document.createElement("p");return n.innerHTML="自定义内容2",o.appendChild(n),o},updateContent(o,t){}}),b=new s({reference:"#tooltip",theme:"tooltip"}),E=new s({...C,reference:"#popconfirm",onPopoverAction(o){console.log(o)}})})}),q(()=>{i&&i.removeEventListener("close",T),f&&(f.disconnect(),f=void 0),c&&(c.destroy(),c=void 0),p&&p.removeEventListener("click",y),h&&h.destroy(),h=void 0,u&&u.destroy(),u=void 0,k&&k.destroy(),k=void 0,v&&v.destroy(),v=void 0,g&&g.destroy(),g=void 0,m&&m.destroy(),m=void 0,b&&b.destroy(),b=void 0,E&&E.destroy(),E=void 0}),(o,t)=>{const n=w("ClientOnly");return x(),B("div",null,[t[8]||(t[8]=r("",7)),d(n,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <a data-title="悬浮提示" class="l-popover-reference">提示</a>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <a data-title="悬浮提示" class="l-popover-reference">提示</a>
`),e("textarea",{lang:"js"},`  let popover = new Popover();
  // 页面结束时调用: popover.destroy();
`)])],-1)])]),_:1}),t[9]||(t[9]=r("",3)),d(n,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="hover-popover" data-title="悬浮提示">悬浮提示</l-button>
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
`)])],-1)])]),_:1}),t[10]||(t[10]=r("",3)),d(n,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="popover-p-row">
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
`)],-1)])]),_:1}),t[11]||(t[11]=r("",3)),d(n,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="none-arrow" data-title="提示内容">提示</l-button>
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
`)])],-1)])]),_:1}),t[14]||(t[14]=r("",4)),d(n,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button data-title="提示内容" id="tooltip">提示</l-button>
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
`)])],-1)])]),_:1}),t[19]||(t[19]=r("",9))])}}});export{V as __pageData,R as default};
