import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
//@ts-ignore
import css from "./item.less?inline";
import { $one, $$, addClass, removeClass } from "ph-utils/dom";

export default class TabbarItem extends BaseComponent {
  public static baseName = "tabbar-item";
  public name!: string;
  public icon?: boolean;
  public onlyIcon?: boolean;

  static get observedAttributes(): string[] | null | undefined {
    return ["name", "label", "icon", "only-icon"];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyleText(css);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "icon" || name === "only-icon") {
      const value = parseAttrValue(newValue, false, "icon");
      this[name as "icon"] = value;
      this.#iconAttrChange();
    } else {
      this[name as "name"] = newValue;
    }
  }

  #iconAttrChange() {
    // Handle icon attribute change
    if (!this.rendered) return;
    let $iconWrapper = $one(".icon-wrapper", this.root);
    if (this.icon) {
      // 显示图标
      if (!$iconWrapper) {
        $iconWrapper = $$("div", {
          class: ["icon-wrapper", this.onlyIcon ? "only" : ""],
          innerHTML: "<slot name='icon'></slot>",
        });
        this.root.prepend($iconWrapper);
      } else {
        if (this.onlyIcon) {
          addClass($iconWrapper, "only");
        } else {
          removeClass($iconWrapper, "only");
        }
      }
    } else {
      // 不显示图标
      if ($iconWrapper) {
        $iconWrapper.remove();
      }
    }
    // 只显示图标则移除文本
    let $defaultSlot = $one("slot:not([name])", this.root);
    if (this.onlyIcon) {
      if ($defaultSlot) {
        $defaultSlot.remove();
      }
    } else {
      // 恢复文本
      if (!$defaultSlot) {
        const $defaultSlot = $$("slot");
        this.root.appendChild($defaultSlot);
      }
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    if (this.icon) {
      const $iconWrapper = $$("div", {
        class: ["icon-wrapper", this.onlyIcon ? "only" : ""],
        innerHTML: "<slot name='icon'></slot>",
      });
      fragment.appendChild($iconWrapper);
    }
    if (!this.onlyIcon) {
      const $defaultSlot = $$("slot");
      fragment.appendChild($defaultSlot);
    }
    return fragment;
  }
}
