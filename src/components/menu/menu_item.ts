import { $$, $one } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./menu_item.less?inline";

export default class Menu extends BaseComponent {
  static baseName = "menu-item";

  connectedCallback(): void {
    this.loadStyleText(css);
    initAttr(this);
    super.connectedCallback();
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
