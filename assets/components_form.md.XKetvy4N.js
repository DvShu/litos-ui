import{$ as i,o as c,a as h}from"./chunks/dom.DBNJew1L.js";import{v as p,P as b,x as u,C as f,c as k,o as y,ag as n,G as a,j as e,w as r,a as d}from"./chunks/framework._HD6XqYi.js";const x=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1753091688000}'),v={name:"components/form.md"},F=Object.assign(v,{setup(g){function s(l){const t=l.target.value;i("#positionForm").setAttribute("label-position",t)}return p(()=>{b(()=>{{i("#lform").addEventListener("submit",o=>{const m=o.target;console.log(m.getData())});const t=i("#positionRadio");c(t,"change",s)}})}),u(()=>{{const l=i("#positionRadio");l&&h(l,"change",s)}}),(l,t)=>{const o=f("ClientOnly");return y(),k("div",null,[t[5]||(t[5]=n(`<h1 id="form" tabindex="-1">Form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;Form&quot;">​</a></h1><p>Form</p><h2 id="引用" tabindex="-1">引用 <a class="header-anchor" href="#引用" aria-label="Permalink to &quot;引用&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Form, FormItem, regist } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">regist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Form, FormItem]);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>基本的表单数据域控制展示，包含布局、初始化、验证、提交。数据验证采用 <a href="https://gitee.com/towardly/ph/wikis/utils/validator" target="_blank" rel="noreferrer">ph-utils/validator</a></p>`,7)),a(o,null,{default:r(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="lform">
    <l-form-item required label="姓名" name="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" name="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" name="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button html-type="reset">重置</l-button>
      <l-button html-type="submit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),t[6]||(t[6]=n('<blockquote><ol><li>如果想要实现按钮之间的间隔，需要引入 <code>litos-ui/styles/reset.css</code> 文件</li><li>当 <code>Button</code> 在 <code>Form</code> 里面时，如果 <code>Button</code> 的 <code>html-type</code> 属性为 <code>reset</code>、<code>submit</code> 时会自动触发表单的重置、提交。</li></ol></blockquote><h3 id="innerblock" tabindex="-1"><code>InnerBlock</code> <a class="header-anchor" href="#innerblock" aria-label="Permalink to &quot;`InnerBlock`&quot;">​</a></h3><p>设置 <code>inner-block</code> 能够让表单的行内元素铺满剩余宽度</p>',3)),a(o,null,{default:r(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form inner-block>
    <l-form-item required label="姓名" name="name">
      <l-input placeholder="请输入姓名" value="张三"></l-input>
    </l-form-item>
    <l-form-item required label="密码" name="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" name="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button html-type="reset">重置</l-button>
      <l-button html-type="submit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),t[7]||(t[7]=e("h3",{id:"行内表单",tabindex:"-1"},[d("行内表单 "),e("a",{class:"header-anchor",href:"#行内表单","aria-label":'Permalink to "行内表单"'},"​")],-1)),t[8]||(t[8]=e("p",null,"当前表单较简单时，可以在一行内放置表单。",-1)),t[9]||(t[9]=e("p",null,[d("通过设置 "),e("code",null,"inline"),d(" 属性为 "),e("code",null,"true"),d(" 可以让表单域变为行内的表单域。")],-1)),a(o,null,{default:r(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form inline inner-block label-width="auto">
    <l-form-item label="用户名">
      <l-input placeholder="请输入用户名" value="张三"></l-input>
    </l-form-item>
    <l-form-item label="密码">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="用户名">
      <l-input placeholder="请输入用户名" value="张三"></l-input>
    </l-form-item>
    <l-form-item label="密码">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item>
      <l-button type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),t[10]||(t[10]=n('<h3 id="对齐方式" tabindex="-1">对齐方式 <a class="header-anchor" href="#对齐方式" aria-label="Permalink to &quot;对齐方式&quot;">​</a></h3><p>通过设置 <code>label-position</code> 来应用标签和内容的对齐方式。</p><p>您可以分别设置 <code>l-form-item</code> 的 <code>label-position</code>. 如果值为空, 则会使用 <code>l-form</code> 的 <code>label-position</code>。</p>',3)),a(o,null,{default:r(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
    <l-form-item label="LabelPosition">
      <l-radio-group value="right" id="positionRadio">
        <l-radio label="Left" value="left" button></l-radio>
        <l-radio label="Right" value="right" button></l-radio>
        <l-radio label="Top" value="top" button></l-radio>
      </l-radio-group>
    </l-form-item>
    <l-form-item label="用户名">
      <l-input placeholder="请输入用户名" value="张三"></l-input>
    </l-form-item>
    <l-form-item label="密码">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),t[11]||(t[11]=e("h3",{id:"只使用-formitem",tabindex:"-1"},[d("只使用 "),e("code",null,"FormItem"),d(),e("a",{class:"header-anchor",href:"#只使用-formitem","aria-label":'Permalink to "只使用 `FormItem`"'},"​")],-1)),t[12]||(t[12]=e("p",null,[e("code",null,"FormItem"),d(" 可以不放在 "),e("code",null,"Form"),d(" 里面，从而进行单独使用。")],-1)),a(o,null,{default:r(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form-item id="form1" label="姓名">
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
`)],-1)])]),_:1}),t[13]||(t[13]=n('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="form-attibutes" tabindex="-1">Form Attibutes <a class="header-anchor" href="#form-attibutes" aria-label="Permalink to &quot;Form Attibutes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>inline</code></td><td>行内表单, 每一行放置尽量多的项</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>label-position</code></td><td>标签的位置</td><td><code>left</code>、<code>right</code>、<code>top</code></td><td><code>right</code></td></tr><tr><td><code>label-width</code></td><td>表单域标签的宽度, 可以传 <code>auto</code></td><td><code>string</code></td><td><code>80px</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>表单内的输入元素是否铺满剩余宽度</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>novalidate</code></td><td>是否在提交时禁用表单验证</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="form-slots" tabindex="-1">Form Slots <a class="header-anchor" href="#form-slots" aria-label="Permalink to &quot;Form Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>表单项</td></tr></tbody></table><h3 id="form-events" tabindex="-1">Form Events <a class="header-anchor" href="#form-events" aria-label="Permalink to &quot;Form Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>submit</code></td><td>表单提交事件</td><td><code>(e: Event): void</code></td></tr></tbody></table><h3 id="form-methods" tabindex="-1">Form Methods <a class="header-anchor" href="#form-methods" aria-label="Permalink to &quot;Form Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>validate</code></td><td>对整个表单进行校验的方法</td><td><code>() =&gt; void</code></td></tr><tr><td><code>validateField</code></td><td>对部分表单字段进行校验的方法</td><td>`(props: string</td></tr><tr><td><code>clearValidate</code></td><td>移除表单项的校验结果</td><td><code>() =&gt; void</code></td></tr></tbody></table><h3 id="formitem-attributes" tabindex="-1">FormItem Attributes <a class="header-anchor" href="#formitem-attributes" aria-label="Permalink to &quot;FormItem Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>label</code></td><td>标签文本</td><td><code>string</code></td><td>-</td></tr><tr><td><code>verify</code></td><td>内置验证规则:<code>required</code>-必填,<code>same:password</code>-一般用于验证确认密码,<code>mobile</code>-验证电话号码</td><td><code>string</code></td><td>-</td></tr><tr><td><code>pattern</code></td><td>正则表达式</td><td><code>string</code></td><td>-</td></tr><tr><td><code>validity</code></td><td>验证失败时的提示信息</td><td><code>string</code></td><td>-</td></tr><tr><td><code>name</code></td><td>表单域 <code>name</code> 字段</td><td><code>string</code></td><td>-</td></tr><tr><td><code>label-position</code></td><td>标签的位置</td><td><code>left</code>、<code>right</code>、<code>top</code></td><td><code>right</code></td></tr><tr><td><code>required</code></td><td>是否必填</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td><code>inner-block</code></td><td>表单内的输入元素是否铺满剩余宽度</td><td><code>boolean</code></td><td><code>false</code></td></tr></tbody></table><h3 id="formitem-slots" tabindex="-1">FormItem Slots <a class="header-anchor" href="#formitem-slots" aria-label="Permalink to &quot;FormItem Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td><code>default</code></td><td>表单项</td></tr></tbody></table><h3 id="formitem-events" tabindex="-1">FormItem Events <a class="header-anchor" href="#formitem-events" aria-label="Permalink to &quot;FormItem Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>blur</code></td><td>在 Input 失去焦点时触发</td><td><code>(e: Event): void</code></td></tr><tr><td><code>focus</code></td><td>在 Input 获得焦点时触发</td><td>`(e: Event</td></tr></tbody></table><h3 id="form-css-variables" tabindex="-1">Form CSS Variables <a class="header-anchor" href="#form-css-variables" aria-label="Permalink to &quot;Form CSS Variables&quot;">​</a></h3><table tabindex="0"><thead><tr><th>变量名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td></tr></tbody></table>',17))])}}});export{x as __pageData,F as default};
