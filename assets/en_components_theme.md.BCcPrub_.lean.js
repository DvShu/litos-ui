import{_ as p,C as r,o as h,c as o,a2 as e,E as n,w as t,j as a,a as l}from"./chunks/framework.nU6eqUhJ.js";const y=JSON.parse('{"title":"Theme","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/theme.md","filePath":"en/components/theme.md","lastUpdated":1793253144000}'),d={name:"en/components/theme.md"};function c(k,s,m,u,E,b){const i=r("ClientOnly");return h(),o("div",null,[s[3]||(s[3]=e("",10)),n(i,null,{default:t(()=>[...s[0]||(s[0]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme style="vertical-align:middle;"></l-theme>
  <l-theme type="select" style="vertical-align:middle;"></l-theme>
  <l-theme type="switch" style="vertical-align:middle;"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;" label="icon"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;"></l-theme>
`)],-1)])]),_:1}),s[4]||(s[4]=e("",7)),n(i,null,{default:t(()=>[...s[1]||(s[1]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-custom-theme>Theme</l-custom-theme>
`),a("div",{class:"source"},[a("textarea",{lang:"html"},`  <l-radio-group gap="15" id="customThemeRadio">
    <l-radio value="auto">System</l-radio>
    <l-radio value="light">Light</l-radio>
    <l-radio value="dark">Dark</l-radio>
  </l-radio-group>
`),a("textarea",{lang:"js"},`  import { applyTheme } from "utilane/browser";
  //-
  const $radio = document.querySelector('#customThemeRadio');
  //-
  $radio.addEventListener('change', (e) => {
    const newTheme = e.target.value;
    const transition = document.startViewTransition(() => {
      // Apply the theme.
      applyTheme(newTheme, true, false).then();
    });
    //-
    transition.ready.then(() => {
      /*
        For a circular reveal centered on the pointer in a click handler:
        // Get the pointer coordinates.
        const { clientX, clientY } = e;
        a: (clientX, clientY)
                              b: (innerWidth, innerHeight)
        The distance from a to b is the maximum radius.
        //-
        // Calculate the maximum radius.
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
      */
      //-
      // Start the circular reveal.
      document.documentElement.animate(
        /*
          // Expand from the pointer position.
          clipPath: [
             \`circle(0% at \${clientX}px \${clientY}px)\`,
             \`circle(\${radius}px at \${clientX}px \${clientY}px)\`,
          ]
        */
        {
          clipPath: [\`circle(0% at center)\`, \`circle(100% at center)\`],
        },
        // Set the duration and target pseudo-element.
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
`),a("textarea",{lang:"css"},`  ::view-transition-new(root),
  ::view-transition-old(root) {
    /* Disable the default animation. */
    animation: none;
  }
`)])],-1)])]),_:1}),s[5]||(s[5]=a("h3",{id:"changing-the-theme-color",tabindex:"-1"},[l("Changing the Theme Color "),a("a",{class:"header-anchor",href:"#changing-the-theme-color","aria-label":'Permalink to "Changing the Theme Color"'},"​")],-1)),s[6]||(s[6]=a("p",null,[l("In addition to switching modes, you can change the primary theme color with "),a("code",null,"ThemeColor"),l(".")],-1)),n(i,null,{default:t(()=>[...s[2]||(s[2]=[a("l-code-preview",null,[a("textarea",{lang:"html"},`  <l-theme-color></l-theme-color>
`)],-1)])]),_:1}),s[7]||(s[7]=e("",12))])}const v=p(d,[["render",c]]);export{y as __pageData,v as default};
