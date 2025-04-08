import {
  $$,
  $one,
  addClass,
  removeClass,
  queryHideNodeSize,
  on,
  off,
} from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../utils";
// @ts-ignore
import css from "./sub_menu.less?inline";

export default class Menu extends BaseComponent {
  static baseName = "sub-menu";

  /** 默认折叠子菜单 */
  collapse = true;

  connectedCallback(): void {
    this.loadStyleText(css);
    initAttr(this);
    if (this.collapse) {
      addClass(this, "collapse");
    } else {
      removeClass(this, "collapse");
    }
    super.connectedCallback();
  }

  afterInit(): void {
    const $menu = $one(".l-menu", this.root) as HTMLElement;
    on($menu, "transitionend", this.#menuTransitionEnd as any);
  }

  beforeDestroy(): void {
    const $menu = $one(".l-menu", this.root) as HTMLElement;
    off($menu, "transitionend", this.#menuTransitionEnd as any);
  }

  static get observedAttributes() {
    return ["collapse"];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    if (!this.rendered) return;
    if (name === "collapse") {
      const collapseValue = parseAttrValue(newValue, true, "collapse");
      if (this.collapse !== collapseValue) {
        this.collapse = collapseValue;
        // 计算子菜单实际高度
        const $menu = $one(".l-menu", this.root) as HTMLElement;
        if (this.collapse) {
          addClass(this, "collapse");
          $menu.style.height = "0";
        } else {
          removeClass(this, "collapse");

          const size = queryHideNodeSize($menu, null as any);
          $menu.style.height = "0";
          removeClass($menu, "l-menu--collapse");
          requestAnimationFrame(() => {
            $menu.style.height = `${size.height}px`;
          });
        }
      }
    }
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
    const $content = $$("div", {
      class: ["l-menu", this.collapse ? "l-menu--collapse" : undefined],
    });
    $content.appendChild($$("slot"));
    fragment.appendChild($content);
    return fragment;
  }

  #menuTransitionEnd = (e: TransitionEvent) => {
    if (this.collapse) {
      const target = e.target as HTMLElement;
      target.style.removeProperty("height");
      addClass(target, "l-menu--collapse");
    }
  };
}
