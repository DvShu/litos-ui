import { $$, $one } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./menu_item.less?inline";

export default class Menu extends BaseComponent {
  static baseName = "menu-item";

  public constructor() {
    super();
    this.version = 2;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      template: this.render(),
      style: css,
    };
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $icon = $one('[slot="icon"]', this);
    if ($icon) {
      // icon
      const $iconWrapper = $$("span", { class: "l-menu-icon-wrap" });
      $iconWrapper.appendChild($$("slot", { name: "icon" }));
      fragment.appendChild($iconWrapper);
    }
    fragment.appendChild($$("slot"));
    return fragment;
  }
}