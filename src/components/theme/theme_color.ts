import { $one, on } from "ph-utils/dom";
import BaseComponent from "../base";
import { getColorTheme, applyColorTheme } from "ph-utils/theme";

type ThemeColorState = {
  color: string;
};

export default class ThemeColor extends BaseComponent<ThemeColorState> {
  public static baseName = "theme-color";

  public constructor() {
    super();
    this.version = 2;
    this._state = {
      color: getColorTheme() || "#722ed1",
    };
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      template: `<l-color-picker value="${this._state.color}"></l-color-picker>`,
    };
  }

  afterInit() {
    const $picker = $one("l-color-picker", this.root);
    if ($picker) {
      on($picker, "change", this.#handleChange);
    }
  }

  #handleChange = async (e: Event) => {
    const color = (e as CustomEvent).detail;
    this._state.color = color;
    await applyColorTheme(color);
    this.dispatchEvent(new CustomEvent("change", { detail: color }));
  };
}