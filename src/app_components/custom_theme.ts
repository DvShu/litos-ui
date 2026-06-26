import { on, $one, off } from "ph-utils/dom";
import { getTheme, toggleTheme } from "ph-utils/theme";

export default class CustomTheme extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<l-radio-group gap="15" id="customThemeRadio"><l-radio value="auto">自</l-radio><l-radio value="light">浅</l-radio><l-radio value="dark">深</l-radio></l-radio-group>`;
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
        },
      );
    });
  };
}