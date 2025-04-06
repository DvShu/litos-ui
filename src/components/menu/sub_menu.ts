import { $$, $one } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./sub_menu.less?inline";

export default class Menu extends BaseComponent {
  static baseName = "sub-menu";

  connectedCallback(): void {
    this.loadStyleText(css);
    initAttr(this);
    super.connectedCallback();
  }

  render() {
    const fragment = document.createDocumentFragment();
    // title
    const $title = $$("div", { class: "l-submenu-title" });
    const $icon = $one('[slot="icon"]', this);
    if ($icon) {
      // icon
      const $iconWrapper = $$("span", { class: "l-menu-icon-wrap" });
      $iconWrapper.appendChild($$("slot", { name: "icon" }));
      $title.appendChild($iconWrapper);
    }
    $title.appendChild($$("slot", { name: "title" }));
    // arrow
    const $arrow = $$("l-arrow-right-icon", { class: "l-submenu-arrow-icon" });
    $title.appendChild($arrow);
    fragment.appendChild($title);
    // content
    const $content = $$("div", { class: "l-menu" });
    $content.appendChild($$("slot"));
    fragment.appendChild($content);
    return fragment;
  }
}
