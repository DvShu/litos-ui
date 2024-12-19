import BaseComponent from "../base";
import { initAttr } from "../util";
import { $one, create, off, on } from "ph-utils/dom";
import { getTheme, applyTheme } from "ph-utils/theme";

export default class Theme extends BaseComponent {
  public static baseName = "theme";
  public type: "button" | "select" | "switch" | "radio" = "button";
  public theme;
  #$inner?: HTMLElement;
  constructor() {
    super();
    initAttr(this);
    this.theme = getTheme();
  }
  connectedCallback(): void {
    this.loadStyle(["theme"]);
    super.connectedCallback();
    this.#initEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeEvents();
  }

  render() {
    switch (this.type) {
      case "select":
        return this.#selectRender();
      case "radio":
        return this.#radioRender();
      case "switch":
        return this.#switchRender();
      default:
        return this.#buttonRender();
    }
  }

  #buttonRender() {
    const $inner = create("l-button", {
      class: "l-theme-btn l-theme-inner",
    });
    this.#updateButtonChild($inner);
    return $inner;
  }

  #updateButtonChild(target: HTMLElement) {
    const tag = this.theme === "auto" ? "sun" : "moon";
    target.innerHTML = `<l-${tag}-icon></l-${tag}-icon>`;
  }

  #selectRender() {
    const $inner = create("l-select-ori", {
      class: "l-theme-inner",
    }) as HTMLSelectElement;
    $inner.value = this.theme;
    const children: string[] = [
      '<option value="auto">跟随系统</option>',
      '<option value="light">浅色模式</option>',
      '<option value="dark">深色模式</option>',
    ];
    $inner.innerHTML = children.join("");
    return $inner;
  }

  #switchRender() {
    const $inner = create("l-switch", {
      class: "l-theme-switch l-theme-inner",
    }) as any;
    $inner.value = this.theme === "dark";
    $inner.innerHTML =
      '<l-sun-icon slot="unchecked-action"></l-sun-icon>' +
      '<l-moon-icon slot="checked-action"></l-moon-icon>';
    return $inner;
  }

  #radioRender() {}

  #handle = (e: Event) => {
    console.log(e.target);
  };

  #initEvents() {
    this.#$inner = $one(".l-theme-inner", this.root) as HTMLElement;
    if (this.type === "button") {
      on(this.#$inner, "click", this.#handle);
    } else {
      on(this.#$inner, "change", this.#handle);
    }
  }

  #removeEvents() {
    if (this.#$inner) {
      if (this.type === "button") {
        off(this.#$inner, "click", this.#handle);
      } else {
        off(this.#$inner, "change", this.#handle);
      }
      this.#$inner = undefined;
    }
  }
}
