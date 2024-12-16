import BaseComponent from "../base";
import { initAttr } from "../util";
import { $, iterate, $one, create } from "ph-utils/dom";

type OptionItem = {
  name: string;
  text?: string | (() => string | HTMLElement);
  icon?: string | (() => string | HTMLElement);
};

export default class Tabbar extends BaseComponent {
  public static baseName = "tabbar";
  /**
   * 标签类型:
   *  1. nav - 每一项等分排列, 类似于移动端底部的标签栏
   *  2. bar - 选项卡
   *  3. card - 卡片
   */
  public type: "nav" | "bar" | "card" = "nav";
  private _name?: string;
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyle(["tabbar"]);
    this.classList.add("l-tabbar--nav");
    super.connectedCallback();
  }
  render() {
    const $items = $("[l-tabbar-item]");
    const $root = document.createDocumentFragment();
    const $wrapper = document.createElement("div");
    $wrapper.className = "l-tabbar-wrapper";
    if ($items.length > 0) {
      iterate($items, ($item) => {
        const $clone = $item.cloneNode(true) as HTMLElement;
        $clone.classList.add("l-tabbar-item");
        const $icon = $one("[l-icon]", $clone);
        const $default = $(":not([l-icon])", $clone);
        if ($icon) {
          const $iconWrapper = create("div", {
            class: [
              "l-tabbar-item-icon",
              $default.length === 0 ? "only" : undefined,
            ],
          });
          $iconWrapper.appendChild($icon.cloneNode(true));
          $icon.replaceWith($iconWrapper);
        }
        $wrapper.appendChild($clone);
      });
    }

    $root.appendChild($wrapper);
    return $root as any;
  }

  public setOptions(options: {}[]) {}
}
