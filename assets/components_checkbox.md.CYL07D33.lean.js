import{$ as b,o as u,a as k}from"./chunks/dom.DntxtiBs.js";import{v as x,P as p,x as m,C as v,o as g,c as C,ag as r,E as n,w as c,j as t,a as o}from"./chunks/framework.-4c4jpF6.js";const P=JSON.parse('{"title":"Checkbox 复选框","description":"","frontmatter":{},"headers":[],"relativePath":"components/checkbox.md","filePath":"components/checkbox.md","lastUpdated":1767969697000}'),f={name:"components/checkbox.md"},y=Object.assign(f,{setup(q){let a,d;function i(h){const e=h.detail.value.length;e===4?(a.removeAttribute("indeterminate"),a.checked=!0):e===0?(a.removeAttribute("indeterminate"),a.checked=!1):a.setAttribute("indeterminate","")}function s(h){h.detail.checked?d.value="CD&BJ&SZ&HZ":d.value=""}return x(()=>{p(()=>{d=b("#group"),a=b("#check-all"),u(d,"change",i),u(a,"change",s)})}),m(()=>{d&&k(d,"change",i),a&&k(a,"change",s)}),(h,e)=>{const l=v("ClientOnly");return g(),C("div",null,[e[5]||(e[5]=r("",7)),n(l,null,{default:c(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
`)],-1)])]),_:1}),e[6]||(e[6]=t("h3",{id:"禁用状态",tabindex:"-1"},[o("禁用状态 "),t("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),e[7]||(e[7]=t("p",null,[o("使用 "),t("code",null,"disabled"),o(" 属性来禁用复选框。")],-1)),n(l,null,{default:c(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox disabled checked>禁用</l-checkbox>
`)],-1)])]),_:1}),e[8]||(e[8]=t("h3",{id:"多选框组",tabindex:"-1"},[o("多选框组 "),t("a",{class:"header-anchor",href:"#多选框组","aria-label":'Permalink to "多选框组"'},"​")],-1)),e[9]||(e[9]=t("p",null,[o("结合 "),t("code",null,"l-checkbox-group"),o(" 组件实现单选框组")],-1)),n(l,null,{default:c(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="SH">上海</l-checkbox>
  </l-checkbox>
`)],-1)])]),_:1}),e[10]||(e[10]=r("",3)),n(l,null,{default:c(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox>
`)],-1)])]),_:1}),e[11]||(e[11]=t("h3",{id:"中间状态",tabindex:"-1"},[o("中间状态 "),t("a",{class:"header-anchor",href:"#中间状态","aria-label":'Permalink to "中间状态"'},"​")],-1)),e[12]||(e[12]=t("p",null,[o("设置 "),t("code",null,"indeterminate"),o(" 属性，表示不确定状态，一般用于实现部分选中的状态。")],-1)),n(l,null,{default:c(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
`),t("textarea",{lang:"ts"},`  import { $one, on, off } from 'ph-utils/dom';
  //-
  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // 全选
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // 全不选
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // 部分选中
    }
  }
  //-
  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // 全选
    } else {
      $group.value = ''; // 全不选
    }
  }
  //-
  const $group = $one('#group');
  const $allCheck = $one('#check-all');
  //-
  on($group, 'change', handleGroupChange);
  on($allCheck, 'change', handleAllCheckChange);
  // 页面关闭时移除事件
  // off($group, 'change', handleGroupChange);
  // off($allCheck, 'change', handleAllCheckChange);
`)])],-1)])]),_:1}),e[13]||(e[13]=r("",13))])}}});export{P as __pageData,y as default};
