import {
  $$,
  $one,
  addClass,
  removeClass,
  queryHideNodeSize,
  on,
  off,
  hasClass,
} from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../utils";
// @ts-ignore
import css from "./sub_menu.less?inline";

export default class SubMenu extends BaseComponent {
  static baseName = "sub-menu";

  /** 默认折叠子菜单 */
  expanded = false;
  /** 是否激活状态, 通常是下面的子菜单项被选中 */
  active = false;
  #transitionT?: number;

  connectedCallback(): void {
    this.loadStyleText(css);
    initAttr(this);
    if (!this.expanded) {
      addClass(this, "collapsed");
    }
    if (this.active) {
      addClass(this, "is-active");
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
    if (this.#transitionT) clearTimeout(this.#transitionT);
  }

  static get observedAttributes() {
    return ["expanded"];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    if (!this.rendered) return;
    if (name === "expanded") {
      const expanded = parseAttrValue(newValue, false, "expanded");
      if (this.expanded !== expanded) {
        this.expanded = expanded;
        // 计算子菜单实际高度
        const $menu = $one(".l-menu", this.root) as HTMLElement;
        if (!this.expanded) {
          addClass(this, "collapsed");
          $menu.style.height = "0";
        } else {
          removeClass(this, "collapsed");

          const size = queryHideNodeSize($menu, null as any);
          $menu.style.height = "0";
          removeClass($menu, "l-menu--collapsed");
          requestAnimationFrame(() => {
            $menu.style.height = `${size.height}px`;
          });
        }
        setTimeout(() => {
          this.#menuTransitionEnd({
            target: $menu,
            propertyName: "height",
          } as any);
        }, 350);
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
      class: ["l-menu", !this.expanded ? "l-menu--collapsed" : undefined],
    });
    $content.appendChild($$("slot"));
    fragment.appendChild($content);
    return fragment;
  }

  #menuTransitionEnd = (e: TransitionEvent) => {
    if (!this.expanded && e.propertyName === "height") {
      const target = e.target as HTMLElement;
      target.style.removeProperty("height");
      addClass(target, "l-menu--collapsed");
    }
  };
}
