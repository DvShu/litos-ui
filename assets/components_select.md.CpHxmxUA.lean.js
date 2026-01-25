import{b as k,i as m,o as g,a as f}from"./chunks/dom.DntxtiBs.js";import{v as E,P as _,x as S,C as v,o as x,c as y,ag as d,E as n,w as o,j as t,a as q}from"./chunks/framework.-4c4jpF6.js";const w=JSON.parse('{"title":"Select 选择器","description":"","frontmatter":{},"headers":[],"relativePath":"components/select.md","filePath":"components/select.md","lastUpdated":1756103824000}'),T={name:"components/select.md"},F=Object.assign(T,{setup(A){const c=["苹果","香蕉","橙子","葡萄","柠檬","草莓","樱桃","芒果","猕猴桃","杨梅","菠萝","西瓜","哈密瓜","桃子","梨","柿子","榴莲","椰子","龙眼","荔枝"],h=c.map((a,e)=>({value:e,label:a}));let l;function p(a,e){return e.label.includes(a)||e.value==a}function r(a){const e=a.target;e.loading||(e.loading=!0,setTimeout(()=>{const s=a.detail.value,u=c.filter(i=>i.includes(s)).map((i,b)=>({value:b,label:i}));e.setOptions(u),e.loading=!1},1500))}return E(()=>{_(()=>{l=k("l-select"),l&&l.length>0&&(m(l,a=>{a.setOptions(h)}),l[0].value=0,l[7].setFilter(p),l[8].setOptions([]),g(l[8],"search",r))})}),S(()=>{l&&l.length>0&&f(l[8],"search",r),l=null}),(a,e)=>{const s=v("ClientOnly");return x(),y("div",null,[e[6]||(e[6]=d("",9)),n(s,null,{default:o(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select></l-select>
`),t("div",{class:"source"},[t("textarea",{lang:"html"},`  <l-select id="select1"></l-select>
`),t("textarea",{lang:"js"},`  const $select1 = document.querySelector('#select1');
  $select1.setOptions([{value:0,label:'苹果'}, {value:1,label:'香蕉'}]);
  // 多选 $select1.value = [0, 1];
  $select1.value = 0;
`)])],-1)])]),_:1}),e[7]||(e[7]=d("",3)),n(s,null,{default:o(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select disabled></l-select>
`)],-1)])]),_:1}),e[8]||(e[8]=d("",3)),n(s,null,{default:o(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select multiple width="180px"></l-select>
  <l-select multiple collapse-tags width="180px"></l-select>
`)],-1)])]),_:1}),e[9]||(e[9]=t("h3",{id:"可清空",tabindex:"-1"},[q("可清空 "),t("a",{class:"header-anchor",href:"#可清空","aria-label":'Permalink to "可清空"'},"​")],-1)),e[10]||(e[10]=t("p",null,"设置 clearable 属性，则可将选择器清空。",-1)),n(s,null,{default:o(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select clearable width="180px"></l-select>
  <l-select multiple collapse-tags clearable width="180px"></l-select>
`)],-1)])]),_:1}),e[11]||(e[11]=d("",3)),n(s,null,{default:o(()=>[...e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select filterable width="180px"></l-select>
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
`)])],-1)])]),_:1}),e[12]||(e[12]=d("",3)),n(s,null,{default:o(()=>[...e[5]||(e[5]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-select multiple filterable remote width="180px"></l-select>
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
`)])],-1)])]),_:1}),e[13]||(e[13]=d("",13))])}}});export{w as __pageData,F as default};
