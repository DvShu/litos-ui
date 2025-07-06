import{$ as b,o as u,a as k}from"./chunks/dom.9mb3_FO4.js";import{v as x,P as p,x as m,C as v,c as g,o as C,ag as r,G as n,j as t,w as c,a}from"./chunks/framework.DaU-16c2.js";const P=JSON.parse('{"title":"Checkbox 复选框","description":"","frontmatter":{},"headers":[],"relativePath":"components/checkbox.md","filePath":"components/checkbox.md","lastUpdated":1747127567000}'),f={name:"components/checkbox.md"},y=Object.assign(f,{setup(_){let o,d;function i(h){const e=h.detail.value.length;e===4?(o.removeAttribute("indeterminate"),o.checked=!0):e===0?(o.removeAttribute("indeterminate"),o.checked=!1):o.setAttribute("indeterminate","")}function s(h){h.detail.checked?d.value="CD&BJ&SZ&HZ":d.value=""}return x(()=>{p(()=>{d=b("#group"),o=b("#check-all"),u(d,"change",i),u(o,"change",s)})}),m(()=>{d&&k(d,"change",i),o&&k(o,"change",s)}),(h,e)=>{const l=v("ClientOnly");return C(),g("div",null,[e[5]||(e[5]=r(`<h1 id="checkbox-复选框" tabindex="-1">Checkbox 复选框 <a class="header-anchor" href="#checkbox-复选框" aria-label="Permalink to &quot;Checkbox 复选框&quot;">​</a></h1><p>在一组备选项中进行多选。适用提醒用户勾选场景，突出多选框选项，可以有效增加用户识别度。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Checkbox, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Checkbox]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>使用当只有一个选项时，可以直接 <code>checked</code> 绑定 <code>boolean</code> 值来控制是否选中；使用 <code>slot-label</code> 来重写选项的文字。</p>`,7)),n(l,null,{default:c(()=>e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
`)],-1)])),_:1,__:[0]}),e[6]||(e[6]=t("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),t("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),e[7]||(e[7]=t("p",null,[a("使用 "),t("code",null,"disabled"),a(" 属性来禁用复选框。")],-1)),n(l,null,{default:c(()=>e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox disabled checked>禁用</l-checkbox>
`)],-1)])),_:1,__:[1]}),e[8]||(e[8]=t("h3",{id:"多选框组",tabindex:"-1"},[a("多选框组 "),t("a",{class:"header-anchor",href:"#多选框组","aria-label":'Permalink to "多选框组"'},"​")],-1)),e[9]||(e[9]=t("p",null,[a("结合 "),t("code",null,"l-checkbox-group"),a(" 组件实现单选框组")],-1)),n(l,null,{default:c(()=>e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="SH">上海</l-checkbox>
  </l-checkbox>
`)],-1)])),_:1,__:[2]}),e[10]||(e[10]=r('<blockquote><p>注意：传递给 <code>l-checkbox-group</code> 的 <code>value</code> 为多选值的每一项 <code>encodeURIComponent</code> 后拼接 <code>&amp;</code></p></blockquote><h3 id="按钮样式" tabindex="-1">按钮样式 <a class="header-anchor" href="#按钮样式" aria-label="Permalink to &quot;按钮样式&quot;">​</a></h3><p>只需要为 <code>l-checkbox</code> 设置 <code>button</code> 属性，即可将复选框变为按钮样式</p>',3)),n(l,null,{default:c(()=>e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD" button>成都</l-checkbox>
    <l-checkbox value="BJ" button>北京</l-checkbox>
    <l-checkbox value="SZ" button>深圳</l-checkbox>
    <l-checkbox value="HZ" button>杭州</l-checkbox>
  </l-checkbox>
`)],-1)])),_:1,__:[3]}),e[11]||(e[11]=t("h3",{id:"中间状态",tabindex:"-1"},[a("中间状态 "),t("a",{class:"header-anchor",href:"#中间状态","aria-label":'Permalink to "中间状态"'},"​")],-1)),e[12]||(e[12]=t("p",null,[a("设置 "),t("code",null,"indeterminate"),a(" 属性，表示不确定状态，一般用于实现部分选中的状态。")],-1)),n(l,null,{default:c(()=>e[4]||(e[4]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <div style="margin-bottom: 10px;">
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
`)])],-1)])),_:1,__:[4]}),e[13]||(e[13]=r('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="checkbox-attibutes" tabindex="-1">Checkbox Attibutes <a class="header-anchor" href="#checkbox-attibutes" aria-label="Permalink to &quot;Checkbox Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>value</code></td><td>value</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>checked</code></td><td>是否选中</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>button</code></td><td>是否为按钮样式</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>indeterminate</code></td><td>是否为中间状态</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>name</code></td><td>原生属性</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>label</code></td><td>显示的标签</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="checkboxgroup-attributes" tabindex="-1">CheckboxGroup Attributes <a class="header-anchor" href="#checkboxgroup-attributes" aria-label="Permalink to &quot;CheckboxGroup Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>value</code></td><td>多选值,每一项 <code>encodeURIComponent</code> 后拼接 <code>&amp;</code></td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="checkbox-slots" tabindex="-1">Checkbox Slots <a class="header-anchor" href="#checkbox-slots" aria-label="Permalink to &quot;Checkbox Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>标签</td></tr></tbody></table><h3 id="checkbox-events" tabindex="-1">Checkbox Events <a class="header-anchor" href="#checkbox-events" aria-label="Permalink to &quot;Checkbox Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选中改变时触发, <code>e.detail</code> 包含 <code>value</code>、<code>name</code>、<code>checked</code></td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="checkboxgroup-events" tabindex="-1">CheckboxGroup Events <a class="header-anchor" href="#checkboxgroup-events" aria-label="Permalink to &quot;CheckboxGroup Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选中改变时触发, <code>e.detail</code> 包含 <code>value</code> 为选中的值的列表</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="checkbox-css-variables" tabindex="-1">Checkbox CSS Variables <a class="header-anchor" href="#checkbox-css-variables" aria-label="Permalink to &quot;Checkbox CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l</code></td><td>x</td><td><code>#fff</code></td></tr></tbody></table>',13))])}}});export{P as __pageData,y as default};
