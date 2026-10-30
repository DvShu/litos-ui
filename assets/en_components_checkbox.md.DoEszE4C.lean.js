import{$ as b,o as u,a as k}from"./chunks/browser.7zTvUqO3.js";import{v as p,P as x,x as m,C as g,o as v,c as C,a2 as s,E as d,w as c,j as t,a as o}from"./chunks/framework.nU6eqUhJ.js";const q=JSON.parse('{"title":"Checkbox","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/checkbox.md","filePath":"en/components/checkbox.md","lastUpdated":1793335100000}'),f={name:"en/components/checkbox.md"},A=Object.assign(f,{setup(y){let a,n;function h(i){const e=i.detail.value.length;e===4?(a.removeAttribute("indeterminate"),a.checked=!0):e===0?(a.removeAttribute("indeterminate"),a.checked=!1):(a.setAttribute("indeterminate",""),a.checked=!1)}function r(i){const e=i.detail.checked;a.removeAttribute("indeterminate"),e?n.value="CD&BJ&SZ&HZ":n.value=""}return p(()=>{x(()=>{n=b("#group"),a=b("#check-all"),u(n,"change",h),u(a,"change",r)})}),m(()=>{n&&k(n,"change",h),a&&k(a,"change",r)}),(i,e)=>{const l=g("ClientOnly");return v(),C("div",null,[e[5]||(e[5]=s("",7)),d(l,null,{default:c(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox checked>
    <span>
      <span>I agree to the</span>
      <a href='#'>Privacy policy</a>
    </span>
  </l-checkbox>
`)],-1)])]),_:1}),e[6]||(e[6]=t("h3",{id:"disabled-state",tabindex:"-1"},[o("Disabled State "),t("a",{class:"header-anchor",href:"#disabled-state","aria-label":'Permalink to "Disabled State"'},"​")],-1)),e[7]||(e[7]=t("p",null,[o("Set "),t("code",null,"disabled"),o(" to disable a checkbox.")],-1)),d(l,null,{default:c(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox disabled checked>Disabled</l-checkbox>
`)],-1)])]),_:1}),e[8]||(e[8]=t("h3",{id:"checkbox-group",tabindex:"-1"},[o("Checkbox Group "),t("a",{class:"header-anchor",href:"#checkbox-group","aria-label":'Permalink to "Checkbox Group"'},"​")],-1)),e[9]||(e[9]=t("p",null,[o("Place checkboxes inside "),t("code",null,"l-checkbox-group"),o(" for multiple selection.")],-1)),d(l,null,{default:c(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">Chengdu</l-checkbox>
    <l-checkbox value="BJ">Beijing</l-checkbox>
    <l-checkbox value="SZ">Shenzhen</l-checkbox>
    <l-checkbox value="SH">Shanghai</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[10]||(e[10]=s("",3)),d(l,null,{default:c(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[11]||(e[11]=t("h3",{id:"indeterminate-state",tabindex:"-1"},[o("Indeterminate State "),t("a",{class:"header-anchor",href:"#indeterminate-state","aria-label":'Permalink to "Indeterminate State"'},"​")],-1)),e[12]||(e[12]=t("p",null,[o("Set "),t("code",null,"indeterminate"),o(" to show a partially selected state.")],-1)),d(l,null,{default:c(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
    <l-checkbox id="check-all" indeterminate>Select all</l-checkbox>
  </div>
  <l-checkbox-group id="group" value="CD&BJ">
    <l-checkbox value="CD" button>Chengdu</l-checkbox>
    <l-checkbox value="BJ" button>Beijing</l-checkbox>
    <l-checkbox value="SZ" button>Shenzhen</l-checkbox>
    <l-checkbox value="HZ" button>Hangzhou</l-checkbox>
  </l-checkbox-group>
`),t("textarea",{lang:"ts"},`  import { $one, on, off } from 'utilane/browser';
  //-
  function handleGroupChange(e) {
    const valueLen = e.detail.value.length;
    if (valueLen === 4) {
      $allCheck.removeAttribute('indeterminate'); // Select all
      $allCheck.checked = true;
    } else if (valueLen === 0) {
      $allCheck.removeAttribute('indeterminate'); // Clear all
      $allCheck.checked = false;
    } else {
      $allCheck.setAttribute('indeterminate', ''); // Partially selected
    }
  }
  //-
  function handleAllCheckChange(e) {
    const checked = e.detail.checked;
    if (checked) {
      $group.value = 'CD&BJ&SZ&HZ'; // Select all
    } else {
      $group.value = ''; // Clear all
    }
  }
  //-
  const $group = $one('#group');
  const $allCheck = $one('#check-all');
  //-
  on($group, 'change', handleGroupChange);
  on($allCheck, 'change', handleAllCheckChange);
  // Remove listeners when the page unmounts.
  // off($group, 'change', handleGroupChange);
  // off($allCheck, 'change', handleAllCheckChange);
`)])],-1)])]),_:1}),e[13]||(e[13]=s("",16))])}}});export{q as __pageData,A as default};
