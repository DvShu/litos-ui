import { elem, on, text, $one, off } from "ph-utils/dom";
import { getTheme } from "ph-utils/theme";

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
    console.log((e.target as any).value);
  };
}
