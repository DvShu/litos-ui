import{b as m,i as g,o as k,a as y}from"./chunks/browser.CplAf69P.js";import{v as f,x as E,C as S,o as v,c as x,a2 as d,E as i,w as o,j as t,a as n,P as w}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const P=JSON.parse('{"title":"Select","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/select.md","filePath":"en/components/select.md","lastUpdated":1795187990000}'),q={name:"en/components/select.md"},F=Object.assign(q,{setup(T){const c=["Apple","Banana","Orange","Grape","Lemon","Strawberry","Cherry","Mango","Kiwifruit","Bayberry","Pineapple","Watermelon","Hami melon","Peach","Pear","Persimmon","Durian","Coconut","Longan","Lychee"],h=c.map((s,e)=>({value:e,label:s}));let a;function p(s){const e=s.target;e.loading||(e.loading=!0,setTimeout(()=>{const l=s.detail.value,u=c.filter(r=>r.includes(l)).map((r,b)=>({value:b,label:r}));e.setOptions(u),e.loading=!1},1500))}return f(()=>{w(()=>{a=m("l-select"),a&&a.length>0&&(g(a,s=>{s.setOptions(h)}),a[0].value=0,a[8].setOptions([]),k(a[8],"search",p))})}),E(()=>{a&&a.length>0&&y(a[8],"search",p),a=null}),(s,e)=>{const l=S("ClientOnly");return v(),x("div",null,[e[6]||(e[6]=d("",9)),i(l,null,{default:o(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option"></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" id="select1"></l-select>
`),t("textarea",{lang:"js"},`  const $select1 = document.querySelector('#select1');
  $select1.setOptions([{value:0,label:'Apple'}, {value:1,label:'Banana'}]);
  // Multiple selection: $select1.value = [0, 1];
  $select1.value = 0;
`)])],-1)])]),_:1}),e[7]||(e[7]=d("",3)),i(l,null,{default:o(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" disabled></l-select>
`)],-1)])]),_:1}),e[8]||(e[8]=d("",4)),i(l,null,{default:o(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" multiple width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" multiple collapse-tags width="180px"></l-select>
`)],-1)])]),_:1}),e[9]||(e[9]=t("h3",{id:"clearable-selection",tabindex:"-1"},[n("Clearable Selection "),t("a",{class:"header-anchor",href:"#clearable-selection","aria-label":'Permalink to "Clearable Selection"'},"​")],-1)),e[10]||(e[10]=t("p",null,[n("Enable "),t("code",null,"clearable"),n(" to let users clear the selection.")],-1)),i(l,null,{default:o(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" clearable width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" multiple collapse-tags clearable width="180px"></l-select>
`)],-1)])]),_:1}),e[11]||(e[11]=t("h3",{id:"filtering-options",tabindex:"-1"},[n("Filtering Options "),t("a",{class:"header-anchor",href:"#filtering-options","aria-label":'Permalink to "Filtering Options"'},"​")],-1)),e[12]||(e[12]=t("p",null,"Filter options to find them quickly.",-1)),e[13]||(e[13]=t("p",null,[n("Enable "),t("code",null,"filterable"),n(" to search options. By default, Select matches labels containing the input. Call "),t("code",null,"setFilter()"),n(" with a custom function to change this behavior. The function receives the search string and option, and returns a boolean indicating whether the option matches.")],-1)),i(l,null,{default:o(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" filterable width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" multiple filterable width="180px"></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" filterable width="180px"></l-select>
  <l-select empty-text="No options" placeholder="Select an option" id="select2" multiple filterable width="180px"></l-select>
`),t("textarea",{lang:"js"},`  const $select2 = document.querySelector('#select2');
  $select2.setOptions([{value:0,label:'Apple'}, {value:1,label:'Banana'}]);
  //-
  function filter(match, option) {
    return option.label.includes(match) || option.value == match;
  }
  //-
  $select2.setFilter(filter);
`)])],-1)])]),_:1}),e[14]||(e[14]=d("",3)),i(l,null,{default:o(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" multiple filterable remote width="180px"></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select empty-text="No options" placeholder="Select an option" id="select3" multiple filterable remote width="180px"></l-select>
`),t("textarea",{lang:"js"},`  const fruits = ["Apple", "Banana", "Orange", "Grape", "Lemon", "Strawberry", "Cherry", "Mango", "Kiwifruit", "Bayberry", "Pineapple", "Watermelon", "Hami melon", "Peach", "Pear", "Persimmon", "Durian", "Coconut", "Longan", "Lychee"];
  const $select = document.querySelector('#select3');
  //-
  function handleSearch(e) {
    const $target = e.target;
    if ($target.loading) return;
    $target.loading = true;
    // You can also set loading through an attribute.
    // $target.setAttribute('loading', 'on');
    const searchValue = e.detail.value;
    // Simulate a request.
    setTimeout(() => {
      const options = fruits.filter((item) => {
        return item.includes(searchValue);
      }).map((item, index) => {
        return { value: index, label: item }
      });
      $target.setOptions(options);
      $target.loading = false;
      // $target.setAttribute('loading', 'off');
    }, 1500);
  }
  //-
  $select.addEventListener('search', handleSearch);
  // $select.removeEventListener('search', handleSearch);
`)])],-1)])]),_:1}),e[15]||(e[15]=d("",20))])}}});export{P as __pageData,F as default};
