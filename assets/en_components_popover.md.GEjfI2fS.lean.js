import{P as s,c as w,p as C}from"./chunks/popover.uNdPJAbg.js";import{t as P}from"./chunks/browser.7zTvUqO3.js";import{v as F,P as A,x as q,C as x,o as _,c as H,a2 as d,E as r,w as l,j as e,a as o}from"./chunks/framework.nU6eqUhJ.js";const R=JSON.parse('{"title":"Popover","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/popover.md","filePath":"en/components/popover.md","lastUpdated":1793253144000}'),D={name:"en/components/popover.md"},L=Object.assign(D,{setup(B){let h,u,m,g,k,v,b,f,p,i,E,c;function y(){if(i){let n=document.createElement("l-tag");n.setAttribute("closeable","true"),n.setAttribute("type","primary"),n.setAttribute("data-title","Tag tooltip"),n.style.marginRight="5px",n.classList.add("tooltip-tag"),n.innerHTML="Tag",i.appendChild(n),P(n,"l-scale","enter"),n=null}}function T(n){P(n.target,"l-scale","leave",()=>{n.target.remove()})}return F(()=>{A(()=>{c=new s({theme:"tooltip",reference:".tooltip-tag"}),i=document.getElementById("tagGroup"),i&&(i.addEventListener("close",T),E=w(i,"tooltip-tag",c)),p=document.getElementById("addTag"),p&&p.addEventListener("click",y),h=new s,u=new s({reference:"#hover-popover",trigger:"hover"}),m=new s({reference:"#click-popover",trigger:"click"}),g=new s({reference:"#focus-popover",trigger:"focus"}),k=new s({reference:"#none-arrow",arrow:!1,offset:5}),v=new s({reference:"#custom",contentRender(){const n=document.createDocumentFragment(),t=document.createElement("p");t.innerHTML="Custom content 1",n.appendChild(t);const a=document.createElement("p");return a.innerHTML="Custom content 2",n.appendChild(a),n},updateContent(n,t){}}),b=new s({reference:"#tooltip",theme:"tooltip"}),f=new s({...C,reference:"#popconfirm",onPopoverAction(n){console.log(n)}})})}),q(()=>{i&&i.removeEventListener("close",T),E&&(E.disconnect(),E=void 0),c&&(c.destroy(),c=void 0),p&&p.removeEventListener("click",y),h&&h.destroy(),h=void 0,u&&u.destroy(),u=void 0,m&&m.destroy(),m=void 0,g&&g.destroy(),g=void 0,k&&k.destroy(),k=void 0,v&&v.destroy(),v=void 0,b&&b.destroy(),b=void 0,f&&f.destroy(),f=void 0}),(n,t)=>{const a=x("ClientOnly");return _(),H("div",null,[t[8]||(t[8]=d("",7)),r(a,null,{default:l(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <a data-title="Hover hint" class="l-popover-reference">Hint</a>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <a data-title="Hover hint" class="l-popover-reference">Hint</a>
`),e("textarea",{lang:"js"},`  let popover = new Popover();
  // On unmount, call popover.destroy().
`)])],-1)])]),_:1}),t[9]||(t[9]=d("",3)),r(a,null,{default:l(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="hover-popover" data-title="Hover hint">Hover hint</l-button>
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
`)])],-1)])]),_:1}),t[10]||(t[10]=d("",3)),r(a,null,{default:l(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <div class="popover-p-row">
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
`)],-1)])]),_:1}),t[11]||(t[11]=d("",3)),r(a,null,{default:l(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button id="none-arrow" data-title="Hint content">Hint</l-button>
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
`)])],-1)])]),_:1}),t[14]||(t[14]=d("",4)),r(a,null,{default:l(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-button data-title="Hint content" id="tooltip">Hint</l-button>
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
`)])],-1)])]),_:1}),t[20]||(t[20]=d("",12))])}}});export{R as __pageData,L as default};
