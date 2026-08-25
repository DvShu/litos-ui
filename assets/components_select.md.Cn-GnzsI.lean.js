import{b,i as k,o as m,a as g}from"./chunks/browser.Chubywy5.js";import{v as f,P as E,x as _,C as S,o as v,c as x,a2 as d,E as n,w as o,j as t,a as y}from"./chunks/framework.CiKxQFaU.js";const C=JSON.parse('{"title":"Select 选择器","description":"","frontmatter":{},"headers":[],"relativePath":"components/select.md","filePath":"components/select.md","lastUpdated":1787245584000}'),q={name:"components/select.md"},w=Object.assign(q,{setup(T){const c=["苹果","香蕉","橙子","葡萄","柠檬","草莓","樱桃","芒果","猕猴桃","杨梅","菠萝","西瓜","哈密瓜","桃子","梨","柿子","榴莲","椰子","龙眼","荔枝"],h=c.map((s,e)=>({value:e,label:s}));let l;function r(s){const e=s.target;e.loading||(e.loading=!0,setTimeout(()=>{const a=s.detail.value,p=c.filter(i=>i.includes(a)).map((i,u)=>({value:u,label:i}));e.setOptions(p),e.loading=!1},1500))}return f(()=>{E(()=>{l=b("l-select"),l&&l.length>0&&(k(l,s=>{s.setOptions(h)}),l[0].value=0,l[8].setOptions([]),m(l[8],"search",r))})}),_(()=>{l&&l.length>0&&g(l[8],"search",r),l=null}),(s,e)=>{const a=S("ClientOnly");return v(),x("div",null,[e[6]||(e[6]=d("",9)),n(a,null,{default:o(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select id="select1"></l-select>
`),t("textarea",{lang:"js"},`  const $select1 = document.querySelector('#select1');
  $select1.setOptions([{value:0,label:'苹果'}, {value:1,label:'香蕉'}]);
  // 多选 $select1.value = [0, 1];
  $select1.value = 0;
`)])],-1)])]),_:1}),e[7]||(e[7]=d("",3)),n(a,null,{default:o(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select disabled></l-select>
`)],-1)])]),_:1}),e[8]||(e[8]=d("",3)),n(a,null,{default:o(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select multiple width="180px"></l-select>
  <l-select multiple collapse-tags width="180px"></l-select>
`)],-1)])]),_:1}),e[9]||(e[9]=t("h3",{id:"可清空",tabindex:"-1"},[y("可清空 "),t("a",{class:"header-anchor",href:"#可清空","aria-label":'Permalink to "可清空"'},"​")],-1)),e[10]||(e[10]=t("p",null,"设置 clearable 属性，则可将选择器清空。",-1)),n(a,null,{default:o(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select clearable width="180px"></l-select>
  <l-select multiple collapse-tags clearable width="180px"></l-select>
`)],-1)])]),_:1}),e[11]||(e[11]=d("",3)),n(a,null,{default:o(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select filterable width="180px"></l-select>
  <l-select multiple filterable width="180px"></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select filterable width="180px"></l-select>
  <l-select id="select2" multiple filterable width="180px"></l-select>
`),t("textarea",{lang:"js"},`  const $select2 = document.querySelector('#select2');
  $select2.setOptions([{value:0,label:'苹果'}, {value:1,label:'香蕉'}]);
  //-
  function filter(match, option) {
    return option.label.includes(match) || option.value == match;
  }
  //-
  $select2.setFilter(filter);
`)])],-1)])]),_:1}),e[12]||(e[12]=d("",3)),n(a,null,{default:o(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select multiple filterable remote width="180px"></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select id="select3" multiple filterable remote width="180px"></l-select>
`),t("textarea",{lang:"js"},`  const fruits = ["苹果", "香蕉", "橙子", "葡萄", "柠檬", "草莓", "樱桃", "芒果", "猕猴桃", "杨梅", "菠萝", "西瓜", "哈密瓜", "桃子", "梨", "柿子", "榴莲", "椰子", "龙眼", "荔枝"];
  const $select = document.querySelector('#select3');
  //-
  function handleSearch(e) {
    const $target = e.target;
    if ($target.loading) return;
    $target.loading = true;
    // 也可以通过属性设置 loading
    // $target.setAttribute('loading', 'on');
    const searchValue = e.detail.value;
    // 模拟请求
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
`)])],-1)])]),_:1}),e[13]||(e[13]=d("",13))])}}});export{C as __pageData,w as default};
