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
    const $container = $$("div", { class: "container" });
    $container.appendChild($$("slot"));
    return fragment;
  }
}
