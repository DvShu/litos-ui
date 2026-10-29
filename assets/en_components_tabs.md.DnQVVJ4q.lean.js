import{T as p}from"./chunks/index.pqjXB6xk.js";import{d as h,v as k,P as o,x as d,C as b,o as m,c as E,a2 as t,E as l,w as e,j as a,a as i}from"./chunks/framework.nU6eqUhJ.js";import"./chunks/browser.CpyXlELn.js";const _=JSON.parse('{"title":"Tabs","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/tabs.md","filePath":"en/components/tabs.md","lastUpdated":1793253144000}'),u={name:"en/components/tabs.md"},f=h({...u,setup(c){let r;return k(()=>{o(()=>{r=p.init()})}),d(()=>{r.destroy()}),(g,s)=>{const n=b("ClientOnly");return m(),E("div",null,[s[3]||(s[3]=t("",9)),l(n,null,{default:e(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">Tab one</l-tabbar-item>
      <l-tabbar-item name="2">Tab two</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">Tab one content</div>
      <div class="l-tabs__content" l-tab="2">Tab two content</div>
    </div>
  </div>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">Tab one</l-tabbar-item>
      <l-tabbar-item name="2">Tab two</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">Tab one content</div>
      <div class="l-tabs__content" l-tab="2">Tab two content</div>
    </div>
  </div>
`),a("textarea",{source:"js"},`  const tabs  = LTabs.init();
  //-
  tabs.destroy(); // Release listeners when the page unmounts.
`)])],-1)])]),_:1}),s[4]||(s[4]=t("",2)),l(n,null,{default:e(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="login-form-wrapper">
    <div class="l-tabs">
      <l-tabbar class="l-tabs__bar" name="login" type="bar" justify-content="space-evenly">
        <l-tabbar-item name="login">Sign in</l-tabbar-item>
        <l-tabbar-item name="regist">Sign up</l-tabbar-item>
      </l-tabbar>
      <div class="l-tabs-main">
        <div class="l-tabs__content" l-tab="login">
          <l-form inner-block>
            <l-form-item required label="Username" name="username">
              <l-input placeholder="Enter your username"></l-input>
            </l-form-item>
            <l-form-item required label="Password" name="password">
              <l-input placeholder="Enter your password" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">Reset</l-button>
              <l-button html-type="submit" type="primary">Submit</l-button>
            </l-form-item>
          </l-form>
        </div>
        <div class="l-tabs__content" l-tab="regist">
          <l-form inner-block>
            <l-form-item required label="Username" name="username">
              <l-input placeholder="Enter your username"></l-input>
            </l-form-item>
            <l-form-item required label="Password" name="password">
              <l-input placeholder="Enter your password" type="password"></l-input>
            </l-form-item>
            <l-form-item required label="Confirm password" verify="same:password" name="confimPassword">
              <l-input placeholder="Enter your password again" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">Reset</l-button>
              <l-button html-type="submit" type="primary">Submit</l-button>
            </l-form-item>
          </l-form>
        </div>
      </div>
    </div>
  </div>
`)],-1)])]),_:1}),s[5]||(s[5]=a("h3",{id:"card-style",tabindex:"-1"},[i("Card Style "),a("a",{class:"header-anchor",href:"#card-style","aria-label":'Permalink to "Card Style"'},"​")],-1)),s[6]||(s[6]=a("p",null,[i("Set the tabbar’s "),a("code",null,"type=card"),i(" for card styling. Add "),a("code",null,"l-tabs-card"),i(" to the container to give the content area a border as well.")],-1)),l(n,null,{default:e(()=>[...s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <div class="l-tabs l-tabs-card">
    <l-tabbar class="l-tabs__bar" name="1" type="card">
      <l-tabbar-item name="1">Tab one</l-tabbar-item>
      <l-tabbar-item name="2">Tab two</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main" style="padding:15px;">
      <div class="l-tabs__content" l-tab="1">Tab one content</div>
      <div class="l-tabs__content" l-tab="2">Tab two content</div>
    </div>
  </div>
`)],-1)])]),_:1}),s[7]||(s[7]=t("",5))])}}});export{_ as __pageData,f as default};
