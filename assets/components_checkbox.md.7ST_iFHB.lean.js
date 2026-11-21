import{$ as b,o as u,a as k}from"./chunks/browser.CplAf69P.js";import{v as p,x,C as m,o as g,c as v,a2 as r,E as l,w as n,j as t,a,P as C}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const A=JSON.parse('{"title":"Checkbox 复选框","description":"","frontmatter":{},"headers":[],"relativePath":"components/checkbox.md","filePath":"components/checkbox.md","lastUpdated":1795187990000}'),f={name:"components/checkbox.md"},P=Object.assign(f,{setup(_){let d,o;function i(h){const e=h.detail.value.length;e===4?(d.removeAttribute("indeterminate"),d.checked=!0):e===0?(d.removeAttribute("indeterminate"),d.checked=!1):(d.setAttribute("indeterminate",""),d.checked=!1)}function s(h){const e=h.detail.checked;d.removeAttribute("indeterminate"),e?o.value="CD&BJ&SZ&HZ":o.value=""}return p(()=>{C(()=>{o=b("#group"),d=b("#check-all"),u(o,"change",i),u(d,"change",s)})}),x(()=>{o&&k(o,"change",i),d&&k(d,"change",s)}),(h,e)=>{const c=m("ClientOnly");return g(),v("div",null,[e[5]||(e[5]=r("",7)),l(c,null,{default:n(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox checked>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
`)],-1)])]),_:1}),e[6]||(e[6]=t("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),t("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),e[7]||(e[7]=t("p",null,[a("使用 "),t("code",null,"disabled"),a(" 属性来禁用复选框。")],-1)),l(c,null,{default:n(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox disabled checked>禁用</l-checkbox>
`)],-1)])]),_:1}),e[8]||(e[8]=r("",2)),l(c,null,{default:n(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="SH">上海</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[9]||(e[9]=r("",4)),l(c,null,{default:n(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[10]||(e[10]=t("h3",{id:"中间状态",tabindex:"-1"},[a("中间状态 "),t("a",{class:"header-anchor",href:"#中间状态","aria-label":'Permalink to "中间状态"'},"​")],-1)),e[11]||(e[11]=t("p",null,[a("设置 "),t("code",null,"indeterminate"),a(" 属性，表示不确定状态，一般用于实现部分选中的状态。")],-1)),l(c,null,{default:n(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>全选</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox-group>
`),t("textarea",{lang:"ts"},`  import { $one, on, off } from 'utilane/browser';
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
`)])],-1)])]),_:1}),e[12]||(e[12]=r("",21))])}}});export{A as __pageData,P as default};
