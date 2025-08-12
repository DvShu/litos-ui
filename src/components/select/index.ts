import BaseComponent from "../base"
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline"

export default class Select extends BaseComponent {
  public static baseName = "select";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(name: string,oldValue: string,newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(newValue,this[name as "id"] as any,name) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
  }

  render() {}
}