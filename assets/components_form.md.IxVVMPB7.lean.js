import{$ as n,o as c,a as h}from"./chunks/dom.CgJDYxOB.js";import{v as p,P as b,x as u,C as f,c as k,o as y,ag as i,G as l,j as e,w as r,a as d}from"./chunks/framework.BCyZWppQ.js";const x=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1737345140000}'),v={name:"components/form.md"},F=Object.assign(v,{setup(g){function s(a){const t=a.target.value;n("#positionForm").setAttribute("label-position",t)}return p(()=>{b(()=>{{n("#lform").addEventListener("submit",o=>{const m=o.target;console.log(m.getData())});const t=n("#positionRadio");c(t,"change",s)}})}),u(()=>{{const a=n("#positionRadio");a&&h(a,"change",s)}}),(a,t)=>{const o=f("ClientOnly");return y(),k("div",null,[t[5]||(t[5]=i("",7)),l(o,null,{default:r(()=>t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="lform">
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
`)],-1)])),_:1}),t[6]||(t[6]=i("",3)),l(o,null,{default:r(()=>t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form inner-block>
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
`)],-1)])),_:1}),t[7]||(t[7]=e("h3",{id:"行内表单",tabindex:"-1"},[d("行内表单 "),e("a",{class:"header-anchor",href:"#行内表单","aria-label":'Permalink to "行内表单"'},"​")],-1)),t[8]||(t[8]=e("p",null,"当前表单较简单时，可以在一行内放置表单。",-1)),t[9]||(t[9]=e("p",null,[d("通过设置 "),e("code",null,"inline"),d(" 属性为 "),e("code",null,"true"),d(" 可以让表单域变为行内的表单域。")],-1)),l(o,null,{default:r(()=>t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form inline inner-block>
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
`)],-1)])),_:1}),t[10]||(t[10]=i("",3)),l(o,null,{default:r(()=>t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block>
    <l-form-item label="LabelPositin">
      <l-radio value="right" type="button" id="positionRadio">
        <span radio-value="left">Left</span>
        <span radio-value="right">Right</span>
        <span radio-value="top">Top</span>
      </l-radio>
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
`)],-1)])),_:1}),t[11]||(t[11]=e("h3",{id:"只使用-formitem",tabindex:"-1"},[d("只使用 "),e("code",null,"FormItem"),d(),e("a",{class:"header-anchor",href:"#只使用-formitem","aria-label":'Permalink to "只使用 `FormItem`"'},"​")],-1)),t[12]||(t[12]=e("p",null,[e("code",null,"FormItem"),d(" 可以不放在 "),e("code",null,"Form"),d(" 里面，从而进行单独使用。")],-1)),l(o,null,{default:r(()=>t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form-item id="form1" label="姓名">
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
`)],-1)])),_:1}),t[13]||(t[13]=i("",17))])}}});export{x as __pageData,F as default};
