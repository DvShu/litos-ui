import { elem, on, text, $one, off } from "ph-utils/dom";
import { getTheme, toggleTheme, applyTheme } from "ph-utils/theme";

export default class CustomTheme extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<l-radio id="customThemeRadio"><span radio-value="auto">自</span>'+
    '<span radio-value="light">浅</span><span radio-value="dark">深</span></l-radio>`;
    const $el = $one("#customThemeRadio", this) as HTMLInputElement;
    $el.value = getTheme();
    on($el, "change", this.#handle);
  }

  disconnectedCallback() {
    off($one("#customThemeRadio", this) as HTMLElement, "change", this.#handle);
  }

  #handle = (e: Event) => {
    const newTheme = (e.target as any).value;
    //@ts-ignore
    const transition = document.startViewTransition(() => {
      toggleTheme(newTheme, false).then();
    });

    transition.ready.then(() => {
      // 圆形动画扩散开始
      document.documentElement.animate(
        {
          clipPath: [`circle(0% at center)`, `circle(100% at center)`],
        },
        // 设置时间，已经目标伪元素
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };
}
