import { $$, $one, addClass, removeClass } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../utils";
// @ts-ignore
import css from "./sub_menu.less?inline";

function getHiddenElementHeight(el) {
  // 保存原来的样式
  const originalDisplay = el.style.display;
  const originalVisibility = el.style.visibility;
  const originalPosition = el.style.position;

  // 设置为可见但不可见状态，不影响布局
  el.style.display = "block";
  el.style.visibility = "hidden";
  el.style.position = "absolute";

  // 读取高度
  const height = el.getBoundingClientRect().height;

  // 恢复原样式
  el.style.display = originalDisplay;
  el.style.visibility = originalVisibility;
  el.style.position = originalPosition;

  return height;
}

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

  static get observedAttributes() {
    return ["collapse"];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    if (name === "collapse") {
      const value = parseAttrValue(newValue, true, "collapse");
      if (value) {
        addClass(this, "collapse");
      } else {
        // removeClass(this, "collapse");
        // 计算子菜单实际高度
        const $menu = $one(".l-menu", this.root) as HTMLElement;
        const h = getHiddenElementHeight($menu);
        console.log(h);
        if ($menu) {
          const rect = $menu.getBoundingClientRect();
          const height = rect.height;
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
    const $content = $$("div", { class: "l-menu" });
    $content.appendChild($$("slot"));
    fragment.appendChild($content);
    return fragment;
  }
}
