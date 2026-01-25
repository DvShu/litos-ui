import{T as r}from"./chunks/index.CCKllM7k.js";import{d as h,v as k,P as d,x as b,C as o,o as E,c as m,ag as t,E as l,w as e,j as a,a as i}from"./chunks/framework.-4c4jpF6.js";import"./chunks/dom.DntxtiBs.js";const _=JSON.parse('{"title":"Tabs 标签页","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabs.md","filePath":"components/tabs.md","lastUpdated":1753941375000}'),u={name:"components/tabs.md"},f=h({...u,setup(c){let p;return k(()=>{d(()=>{p=r.init()})}),b(()=>{p.destroy()}),(g,s)=>{const n=o("ClientOnly");return E(),m("div",null,[s[3]||(s[3]=t(`<h1 id="tabs-标签页" tabindex="-1">Tabs 标签页 <a class="header-anchor" href="#tabs-标签页" aria-label="Permalink to &quot;Tabs 标签页&quot;">​</a></h1><p>选项卡切换组件；其实这个模块的内容就是 <a href="/litos-ui/components/tabbar">Tabbar 标签栏</a> + 内容区域；所以就没有单独抽取为组件，转而函数 + <code>html</code> 模板的形式。</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h2><h3 id="手动引入" tabindex="-1">手动引入 <a class="header-anchor" href="#手动引入" aria-label="Permalink to &quot;手动引入&quot;">​</a></h3><p>如果没有使用 <code>litosui-unplugin-resolver</code> 自动引入, 则需要手动引入</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Tabs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LTabs } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-io&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;litos-ui/styles/tabs.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 该函数会初始化所有 .l-tabs 标签页</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> tabs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LTabs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tabs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">destroy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 页面关闭时, 释放</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>基础的、简洁的标签页。</p>`,9)),l(n,null,{default:e(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">标签一</l-tabbar-item>
      <l-tabbar-item name="2">标签二</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">标签一内容</div>
      <div class="l-tabs__content" l-tab="2">标签二内容</div>
    </div>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">标签一</l-tabbar-item>
      <l-tabbar-item name="2">标签二</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">标签一内容</div>
      <div class="l-tabs__content" l-tab="2">标签二内容</div>
    </div>
  </div>
`),a("textarea",{source:"js"},`  const tabs  = LTabs.init();
  //-
  tabs.destroy(); // 页面关闭时, 释放
`)])],-1)])]),_:1}),s[4]||(s[4]=t('<h3 id="简单登录注册" tabindex="-1">简单登录注册 <a class="header-anchor" href="#简单登录注册" aria-label="Permalink to &quot;简单登录注册&quot;">​</a></h3><p>通过组件搭配: <a href="/litos-ui/components/form">form 表单</a>、<a href="/litos-ui/components/input">input 输入框</a>、<a href="/litos-ui/components/button">button 按钮</a>、<a href="/litos-ui/components/tabbar">tabbar 选项卡</a> 等组件，实现简单的登录注册。</p>',2)),l(n,null,{default:e(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="login-form-wrapper">
    <div class="l-tabs">
      <l-tabbar class="l-tabs__bar" name="login" type="bar" justify-content="space-evenly">
        <l-tabbar-item name="login">登录</l-tabbar-item>
        <l-tabbar-item name="regist">注册</l-tabbar-item>
      </l-tabbar>
      <div class="l-tabs-main">
        <div class="l-tabs__content" l-tab="login">
          <l-form inner-block>
            <l-form-item required label="用户名" name="username">
              <l-input placeholder="请输入用户名"></l-input>
            </l-form-item>
            <l-form-item required label="密码" name="password">
              <l-input placeholder="请输入密码" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">重置</l-button>
              <l-button html-type="submit" type="primary">提交</l-button>
            </l-form-item>
          </l-form>
        </div>
        <div class="l-tabs__content" l-tab="regist">
          <l-form inner-block>
            <l-form-item required label="用户名" name="username">
              <l-input placeholder="请输入用户名"></l-input>
            </l-form-item>
            <l-form-item required label="密码" name="password">
              <l-input placeholder="请输入密码" type="password"></l-input>
            </l-form-item>
            <l-form-item required label="确认密码" verify="same:password" name="confimPassword">
              <l-input placeholder="请再次输入密码" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">重置</l-button>
              <l-button html-type="submit" type="primary">提交</l-button>
            </l-form-item>
          </l-form>
        </div>
      </div>
    </div>
  </div>
`)],-1)])]),_:1}),s[5]||(s[5]=a("h3",{id:"卡片风格",tabindex:"-1"},[i("卡片风格 "),a("a",{class:"header-anchor",href:"#卡片风格","aria-label":'Permalink to "卡片风格"'},"​")],-1)),s[6]||(s[6]=a("p",null,[i("通过设置 "),a("code",null,"tabbar"),i(" 的 "),a("code",null,"type=card"),i(" 来使用卡片风格。如果需要为卡片风格的同时添加内容边框，需要添加 "),a("code",null,"l-tabs-card"),i(" 类")],-1)),l(n,null,{default:e(()=>[...s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-tabs l-tabs-card">
    <l-tabbar class="l-tabs__bar" name="1" type="card">
      <l-tabbar-item name="1">标签一</l-tabbar-item>
      <l-tabbar-item name="2">标签二</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main" style="padding:15px;">
      <div class="l-tabs__content" l-tab="1">标签一内容</div>
      <div class="l-tabs__content" l-tab="2">标签二内容</div>
    </div>
  </div>
`)],-1)])]),_:1}),s[7]||(s[7]=t(`<h3 id="基本结构" tabindex="-1">基本结构 <a class="header-anchor" href="#基本结构" aria-label="Permalink to &quot;基本结构&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-tabs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-tabbar</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-tabs__bar&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-tabbar-item</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-tabbar-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-tabbar-item</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-tabbar-item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">l-tabbar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-tabs-main&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-tabs__content&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> l-tab</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;l-tabs__content&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> l-tab</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,2))])}}});export{_ as __pageData,f as default};
