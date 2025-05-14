import BaseComponent from "../base";
import css from "./index.less?inline";
import { getAttr, $$ } from "ph-utils/dom";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel";

  connectedCallback(): void {
    this.loadStyleText(css);
    // 手动设置高度
    const height = getAttr(this, "height");
    if (height) {
      this.style.height = `${height}`;
    }
    super.connectedCallback();
  }
  render() {
    const fragment = document.createDocumentFragment();
    // container
    const $container = $$("div", { class: "container" });
    fragment.appendChild($container);
    for (let i = 0; i < 4; i++) {
      const $item = $$("div", { class: "item", textContent: `item ${i}` });
      $container.appendChild($item);
    }
    return fragment;
  }
}
