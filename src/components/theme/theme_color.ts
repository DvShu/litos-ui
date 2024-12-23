import { $one, on } from "ph-utils/dom";
import BaseComponent from "../base";
import { getColorTheme, applyColorTheme } from "ph-utils/theme";

export default class ThemeColor extends BaseComponent {
  public static baseName = "theme-color";
  public color: string;

  public constructor() {
    super();
    console.log(getColorTheme());
    this.color = getColorTheme() || "#722ed1";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#initEvents();
  }

  render(): string | void | HTMLElement | HTMLElement[] {
    const $picker = document.createElement(
      "l-color-picker"
    ) as HTMLInputElement;
    $picker.value = this.color;
    return $picker;
  }

  #initEvents() {
    const $picker = $one("l-color-picker", this.root);
    if ($picker) {
      on($picker, "change", this.#handleChange);
    }
  }

  #handleChange = async (e: Event) => {
    const color = (e as CustomEvent).detail;
    this.color = color;
    await applyColorTheme(color);
    this.dispatchEvent(new CustomEvent("change", { detail: color }));
  };
}
