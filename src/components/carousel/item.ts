import BaseComponent from "../base";
import { $$ } from "ph-utils/dom";
import css from "./item.less?inline";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel-item";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }
  render() {
    return $$("slot");
  }
}
