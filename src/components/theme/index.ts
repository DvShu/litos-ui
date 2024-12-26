import BaseComponent from "../base";
import { initAttr } from "../utils";
import { $one, create, off, on } from "ph-utils/dom";
import { getTheme, applyTheme } from "ph-utils/theme";

const RADIO_ITEMS = [
  { value: "auto", text: "跟随系统", icon: "l-theme-default-icon" },
  { value: "light", text: "浅色模式", icon: "l-sun-icon" },
  { value: "dark", text: "深色模式", icon: "l-moon-icon" },
];

export default class Theme extends BaseComponent {
  public static baseName = "theme";
  public type: "button" | "select" | "switch" | "radio" = "button";
  public label?: "text" | "icon" = "text";
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

  #radioRender() {
    const $inner = create("l-radio", {
      class: "l-theme-inner",
    }) as HTMLInputElement;
    $inner.value = this.theme;
    $inner.type = "button";
    const children = RADIO_ITEMS.map((item) => {
      if (this.label === "icon") {
        return `<${item.icon} radio-value="${item.value}"></${item.icon}>`;
      } else {
        return `<span radio-value="${item.value}">${item.text}</span>`;
      }
    });
    $inner.innerHTML = children.join("");
    return $inner;
  }

  #handle = async (e: Event) => {
    let newTheme;
    if (this.type === "button") {
      newTheme = this.theme === "dark" ? "auto" : "dark";
    } else {
      const value: any = (e.target as any).value;
      if (this.type !== "switch") {
        newTheme = value;
      } else {
        newTheme = value ? "dark" : "light";
      }
    }
    await applyTheme(newTheme);
    this.theme = newTheme;
    if (this.type === "button") {
      this.#updateButtonChild(this.#$inner as any);
    }
    this.dispatchEvent(new CustomEvent("change", { detail: newTheme }));
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
