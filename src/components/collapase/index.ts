import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$ } from "ph-utils/dom";

export default class Collapase extends BaseComponent {
  public static baseName = "collapase";

  public arrowPlacement?: "left" | "right" = "left";
  public headerJustify?: "flex-start" | "flex-end" | "space-between" =
    "flex-start";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["arrow-placement", "header-justify"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
  }

  render() {
    return $$("slot");
  }
}
