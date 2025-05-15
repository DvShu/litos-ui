import BaseComponent from "../base";
import { $$ } from "ph-utils/dom";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel-item";

  connectedCallback(): void {
    this.loadStyleText(
      ":host{width:100%;height:100%;position:absolute;left:0;top:0;box-sizing:border-box;z-index:1;}"
    );
    super.connectedCallback();
  }
  render() {
    return $$("slot");
  }
}
