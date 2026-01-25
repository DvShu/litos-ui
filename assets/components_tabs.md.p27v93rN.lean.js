import{T as r}from"./chunks/index.CCKllM7k.js";import{d as h,v as k,P as d,x as b,C as o,o as E,c as m,ag as t,E as l,w as e,j as a,a as i}from"./chunks/framework.-4c4jpF6.js";import"./chunks/dom.DntxtiBs.js";const _=JSON.parse('{"title":"Tabs 标签页","description":"","frontmatter":{},"headers":[],"relativePath":"components/tabs.md","filePath":"components/tabs.md","lastUpdated":1753941375000}'),u={name:"components/tabs.md"},f=h({...u,setup(c){let p;return k(()=>{d(()=>{p=r.init()})}),b(()=>{p.destroy()}),(g,s)=>{const n=o("ClientOnly");return E(),m("div",null,[s[3]||(s[3]=t("",9)),l(n,null,{default:e(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-tabs">
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
`)])],-1)])]),_:1}),s[4]||(s[4]=t("",2)),l(n,null,{default:e(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="login-form-wrapper">
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
`)],-1)])]),_:1}),s[7]||(s[7]=t("",2))])}}});export{_ as __pageData,f as default};
