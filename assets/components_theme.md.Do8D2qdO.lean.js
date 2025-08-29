import{_ as p,C as h,c as r,o as d,ag as n,G as e,j as a,w as t,a as l}from"./chunks/framework._HD6XqYi.js";const y=JSON.parse('{"title":"Theme 主题切换","description":"","frontmatter":{},"headers":[],"relativePath":"components/theme.md","filePath":"components/theme.md","lastUpdated":1735010203000}'),k={name:"components/theme.md"};function o(c,s,E,m,u,b){const i=h("ClientOnly");return d(),r("div",null,[s[3]||(s[3]=n("",9)),e(i,null,{default:t(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme></l-theme>
  <l-theme type="select"></l-theme>
  <l-theme type="switch" style="vertical-align:middle;"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;"></l-theme>
`)],-1)])]),_:1}),s[4]||(s[4]=n("",7)),e(i,null,{default:t(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-custom-theme>按钮</l-custom-theme>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-radio id="customThemeRadio">
    <span radio-value="auto">自</span>+
    <span radio-value="light">浅</span>
    <span radio-value="dark">深</span>
  </l-radio>
`),a("textarea",{lang:"js"},`  import { applyTheme } from "ph-utils/theme";
  //-
  const $radio = document.querySelector('#customThemeRadio');
  //-
  $radio.addEventListener('change', (e) => {
    const newTheme = (e.target as any).value;
    const transition = document.startViewTransition(() => {
      // 应用主题
      applyTheme(newTheme, true, false).then();
    });
    //-
    transition.ready.then(() => {
      /*
        如果在 click 事件中想根据鼠标位置来设置圆形扩散效果
        // 获取鼠标的坐标
        const { clientX, clientY } = e;
        a: (clientX, clientY)        
                              b: (innerWidth, innerHeight)
        a -> b 的距离就是最大半径
        //-
        // 计算最大半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
      */
      //-
      // 圆形动画扩散开始
      document.documentElement.animate(
        /*
          // 应用鼠标位置扩展
          clipPath: [
             \`circle(0% at \${clientX}px \${clientY}px)\`,
             \`circle(\${radius}px at \${clientX}px \${clientY}px)\`,
          ]
        */
        {
          clipPath: [\`circle(0% at center)\`, \`circle(100% at center)\`],
        },
        // 设置时间，已经目标伪元素
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
`),a("textarea",{lang:"css"},`  ::view-transition-new(root),
  ::view-transition-old(root) {
    /* 关闭默认动画 */
    animation: none;
  }
`)])],-1)])]),_:1}),s[5]||(s[5]=a("h3",{id:"主题色更改",tabindex:"-1"},[l("主题色更改 "),a("a",{class:"header-anchor",href:"#主题色更改","aria-label":'Permalink to "主题色更改"'},"​")],-1)),s[6]||(s[6]=a("p",null,[l("除了修改主题风格，还可以修改主题色，通过修改 "),a("code",null,"ThemeColor"),l(" 来实现。")],-1)),e(i,null,{default:t(()=>[...s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme-color></l-theme-color>
`)],-1)])]),_:1}),s[7]||(s[7]=n("",9))])}const F=p(k,[["render",o]]);export{y as __pageData,F as default};
