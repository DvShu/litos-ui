import{$ as r,o as u,a as h}from"./chunks/dom.C80Rjh4g.js";import{v as b,P as f,x as k,C as y,o as g,c as v,ag as i,E as a,w as n,j as e,a as d}from"./chunks/framework.CwRcgf5g.js";const P=JSON.parse('{"title":"Form","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1772379915000}'),q={name:"components/form.md"},w=Object.assign(q,{setup(F){function s(l){const t=l.target.value;r("#positionForm").setAttribute("label-position",t)}return b(()=>{f(()=>{{r("#lform").addEventListener("submit",m=>{const p=m.target;console.log(p.getData())});const t=r("#customValidForm");r("#customSubmit").addEventListener("click",m=>{t.setErrors({name:"姓名不能为空",password:"密码不能为空",confimPassword:"确认密码不能为空"})});const c=r("#positionRadio");u(c,"change",s)}})}),k(()=>{{const l=r("#positionRadio");l&&h(l,"change",s)}}),(l,t)=>{const o=y("ClientOnly");return g(),v("div",null,[t[6]||(t[6]=i("",7)),a(o,null,{default:n(()=>[...t[0]||(t[0]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="lform">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-space>
        <l-button html-type="reset">重置</l-button>
        <l-button html-type="submit" type="primary">提交</l-button>
      </l-space>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),t[7]||(t[7]=i("",3)),a(o,null,{default:n(()=>[...t[1]||(t[1]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button type="primary" id="customSubmit">提交</l-button>
    </l-form-item>
  </l-form>
`),e("div",{class:"source"},[e("textarea",{lang:"html"},`  <l-form id="customValidForm" novalidate="on">
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button id="customSubmit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`),e("textarea",{lang:"ts"},`  import { $one } from 'ph-utils/dom';
  //-
  // 自定义验证
  const $customValidForm = $one('#customValidForm');
  const $customSubmitBtn = $one('#customSubmit');
  $customSubmitBtn.addEventListener('click', (event) => {
    $customValidForm.setErrors({
      name: '姓名不能为空',
      password: '密码不能为空',
      confimPassword: '确认密码不能为空',
    });
  });
`)])],-1)])]),_:1}),t[8]||(t[8]=i("",3)),a(o,null,{default:n(()=>[...t[2]||(t[2]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form inner-block>
    <l-form-item required label="姓名" prop="name">
      <l-input placeholder="请输入姓名" value="张三"></l-input>
    </l-form-item>
    <l-form-item required label="密码" prop="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" prop="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button html-type="reset">重置</l-button>
      <l-button html-type="submit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
`)],-1)])]),_:1}),t[9]||(t[9]=e("h3",{id:"行内表单",tabindex:"-1"},[d("行内表单 "),e("a",{class:"header-anchor",href:"#行内表单","aria-label":'Permalink to "行内表单"'},"​")],-1)),t[10]||(t[10]=e("p",null,"当前表单较简单时，可以在一行内放置表单。",-1)),t[11]||(t[11]=e("p",null,[d("通过设置 "),e("code",null,"inline"),d(" 属性为 "),e("code",null,"true"),d(" 可以让表单域变为行内的表单域。")],-1)),a(o,null,{default:n(()=>[...t[3]||(t[3]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form inline inner-block label-width="auto">
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
`)],-1)])]),_:1}),t[12]||(t[12]=i("",3)),a(o,null,{default:n(()=>[...t[4]||(t[4]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form id="positionForm" inner-block label-width="100px">
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
`)],-1)])]),_:1}),t[13]||(t[13]=e("h3",{id:"只使用-formitem",tabindex:"-1"},[d("只使用 "),e("code",null,"FormItem"),d(),e("a",{class:"header-anchor",href:"#只使用-formitem","aria-label":'Permalink to "只使用 `FormItem`"'},"​")],-1)),t[14]||(t[14]=e("p",null,[e("code",null,"FormItem"),d(" 可以不放在 "),e("code",null,"Form"),d(" 里面，从而进行单独使用。")],-1)),a(o,null,{default:n(()=>[...t[5]||(t[5]=[e("l-code-preview",null,[e("textarea",{lang:"html"},`  <l-form-item id="form1" label="姓名" inner-block>
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
`)],-1)])]),_:1}),t[15]||(t[15]=i("",17))])}}});export{P as __pageData,w as default};
