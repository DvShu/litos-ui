import BaseComponent from "../base";
import { $$ } from "ph-utils/dom";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel-item";

  connectedCallback(): void {
    this.loadStyleText(":host{width:100%;height:100%;box-sizing:border-box;}");
    super.connectedCallback();
  }
  render() {
    return $$("div");
  }
}
