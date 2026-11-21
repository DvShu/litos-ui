import{$ as b,o as u,a as k}from"./chunks/browser.CplAf69P.js";import{v as p,x,C as m,o as g,c as v,a2 as r,E as l,w as n,j as t,a,P as C}from"./chunks/framework.DBq8O7k4.js";import"./chunks/color-pxHcQmmD.oS3AlF8E.js";const A=JSON.parse('{"title":"Checkbox 复选框","description":"","frontmatter":{},"headers":[],"relativePath":"components/checkbox.md","filePath":"components/checkbox.md","lastUpdated":1795187990000}'),f={name:"components/checkbox.md"},P=Object.assign(f,{setup(_){let d,o;function i(h){const e=h.detail.value.length;e===4?(d.removeAttribute("indeterminate"),d.checked=!0):e===0?(d.removeAttribute("indeterminate"),d.checked=!1):(d.setAttribute("indeterminate",""),d.checked=!1)}function s(h){const e=h.detail.checked;d.removeAttribute("indeterminate"),e?o.value="CD&BJ&SZ&HZ":o.value=""}return p(()=>{C(()=>{o=b("#group"),d=b("#check-all"),u(o,"change",i),u(d,"change",s)})}),x(()=>{o&&k(o,"change",i),d&&k(d,"change",s)}),(h,e)=>{const c=m("ClientOnly");return g(),v("div",null,[e[5]||(e[5]=r(`<h1 id="checkbox-复选框" tabindex="-1">Checkbox 复选框 <a class="header-anchor" href="#checkbox-复选框" aria-label="Permalink to &quot;Checkbox 复选框&quot;">​</a></h1><p>在一组备选项中进行多选。适用提醒用户勾选场景，突出多选框选项，可以有效增加用户识别度。</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Checkbox, regist, CheckboxGroup } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Checkbox, CheckboxGroup]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>使用当只有一个选项时，可以直接 <code>checked</code> 绑定 <code>boolean</code> 值来控制是否选中；使用默认插槽来重写选项的文字。</p>`,7)),l(c,null,{default:n(()=>[...e[0]||(e[0]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox checked>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
`)],-1)])]),_:1}),e[6]||(e[6]=t("h3",{id:"禁用状态",tabindex:"-1"},[a("禁用状态 "),t("a",{class:"header-anchor",href:"#禁用状态","aria-label":'Permalink to "禁用状态"'},"​")],-1)),e[7]||(e[7]=t("p",null,[a("使用 "),t("code",null,"disabled"),a(" 属性来禁用复选框。")],-1)),l(c,null,{default:n(()=>[...e[1]||(e[1]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox disabled checked>禁用</l-checkbox>
`)],-1)])]),_:1}),e[8]||(e[8]=r('<h3 id="多选框组" tabindex="-1">多选框组 <a class="header-anchor" href="#多选框组" aria-label="Permalink to &quot;多选框组&quot;">​</a></h3><p>使用 <code>l-checkbox-group</code> 的 <code>value</code> 设置选中项。组内选项的 <code>checked</code> 可读取当前状态。原生表单和 <code>l-form.getData()</code> 都过滤无匹配的值。没有任何匹配时，原生表单省略该字段，<code>getData()</code> 中的组值为空字符串。参见 <a href="./form#单选框和复选框的提交数据">Form 提交数据演示</a>。</p>',2)),l(c,null,{default:n(()=>[...e[2]||(e[2]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ" gap="15">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="SH">上海</l-checkbox>
  </l-checkbox-group>
`)],-1)])]),_:1}),e[9]||(e[9]=r('<blockquote><p>注意：传递给 <code>l-checkbox-group</code> 的 <code>value</code> 为多选值的每一项 <code>encodeURIComponent</code> 后拼接 <code>&amp;</code></p></blockquote><p>原生表单为复选组的每个选中值生成同名条目。选中值只对应禁用选项时，提交会省略它。</p><h3 id="按钮样式" tabindex="-1">按钮样式 <a class="header-anchor" href="#按钮样式" aria-label="Permalink to &quot;按钮样式&quot;">​</a></h3><p>只需要为 <code>l-checkbox</code> 设置 <code>button</code> 属性，即可将复选框变为按钮样式</p>',4)),l(c,null,{default:n(()=>[...e[3]||(e[3]=[t("l-code-preview",null,[t("textarea",{lang:"html"},`  <l-checkbox-group value="CD&BJ">
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
`)])],-1)])]),_:1}),e[12]||(e[12]=r(`<h2 id="按需入口" tabindex="-1">按需入口 <a class="header-anchor" href="#按需入口" aria-label="Permalink to &quot;按需入口&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/vars.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/checkbox&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/checkbox-group&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在客户端显式导入每个用到的组件。使用 <code>l-checkbox-group</code> 时，组和 <code>l-checkbox</code> 选项各自导入。样式、类型和总入口用法见<a href="/litos-ui/on_demand">按需导入</a>。</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="checkbox-attributes" tabindex="-1">Checkbox Attributes <a class="header-anchor" href="#checkbox-attributes" aria-label="Permalink to &quot;Checkbox Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>value</code></td><td>value</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>checked</code></td><td>是否选中</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>button</code></td><td>是否为按钮样式</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>indeterminate</code></td><td>是否为中间状态</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>name</code></td><td>原生属性</td><td><code>string</code></td><td><code>-</code></td></tr><tr><td><code>label</code></td><td>显示的标签</td><td><code>string</code></td><td><code>-</code></td></tr></tbody></table><h3 id="checkbox-properties" tabindex="-1">Checkbox Properties <a class="header-anchor" href="#checkbox-properties" aria-label="Permalink to &quot;Checkbox Properties&quot;">​</a></h3><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>checked</code></td><td>当前选中状态</td><td><code>boolean</code></td></tr><tr><td><code>defaultChecked</code></td><td>重置默认选中状态，与 <code>checked</code> attribute 同步</td><td><code>boolean</code></td></tr></tbody></table><p>字段名、默认值和有效性等通用属性见 <a href="./form#表单控件通用-api">表单控件通用 API</a>。</p><h3 id="checkboxgroup-attributes" tabindex="-1">CheckboxGroup Attributes <a class="header-anchor" href="#checkboxgroup-attributes" aria-label="Permalink to &quot;CheckboxGroup Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>value</code></td><td>逐项用 <code>encodeURIComponent</code> 编码后以 <code>&amp;</code> 拼接。仅选中空值项时为 <code>&amp;</code>，未选中时为空字符串</td><td><code>string</code></td><td>未设置</td></tr><tr><td><code>name</code></td><td>组的表单字段名</td><td><code>string</code></td><td>未设置</td></tr><tr><td><code>disabled</code></td><td>禁用组内全部选项</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>required</code></td><td>至少有一个可提交的选中值时通过必填校验</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>gap</code></td><td>选项间距，数字按 px 处理</td><td><code>string</code></td><td><code>0px</code></td></tr><tr><td><code>form</code></td><td>关联的原生表单 ID，显式配置优先</td><td><code>string</code></td><td>自动关联</td></tr></tbody></table><p>实例的 <code>value</code>、<code>defaultValue</code>、有效性及重置方法见 <a href="./form#表单控件通用-api">表单控件通用 API</a>。</p><p>组编码时，截断字符留下的孤立 Unicode 代理项会替换为 <code>U+FFFD</code>，与原生提交一致。旧值中无法解码的百分号转义仍按原文读取。</p><h3 id="checkbox-slots" tabindex="-1">Checkbox Slots <a class="header-anchor" href="#checkbox-slots" aria-label="Permalink to &quot;Checkbox Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>标签</td></tr></tbody></table><h3 id="checkbox-events" tabindex="-1">Checkbox Events <a class="header-anchor" href="#checkbox-events" aria-label="Permalink to &quot;Checkbox Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选中改变时触发, <code>e.detail</code> 包含 <code>value</code>、<code>name</code>、<code>checked</code></td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="checkboxgroup-events" tabindex="-1">CheckboxGroup Events <a class="header-anchor" href="#checkboxgroup-events" aria-label="Permalink to &quot;CheckboxGroup Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>change</code></td><td>选中改变时触发, <code>e.detail</code> 包含 <code>value</code> 为选中的值的列表</td><td><code>(event: CustomEvent)</code></td></tr></tbody></table><h3 id="checkbox-css-variables" tabindex="-1">Checkbox CSS Variables <a class="header-anchor" href="#checkbox-css-variables" aria-label="Permalink to &quot;Checkbox CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>--l-check-size</code></td><td>复选框尺寸</td><td><code>14px</code></td></tr><tr><td><code>--l-check-border-radius</code></td><td>复选框圆角</td><td><code>3px</code></td></tr><tr><td><code>--l-primary-color</code></td><td>选中状态颜色</td><td><code>#007bff</code>（引入 vars.css 后）</td></tr><tr><td><code>--l-disabled-color</code></td><td>禁用状态颜色</td><td><code>#e6e6e6</code></td></tr><tr><td><code>--l-form-control-height</code></td><td>按钮样式高度</td><td><code>40px</code>（引入 vars.css 后；未引入时组件回退为 32px）</td></tr><tr><td><code>--l-check-gap</code></td><td>复选框组间距</td><td><code>0px</code></td></tr></tbody></table>`,21))])}}});export{A as __pageData,P as default};
