import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";

export default class BaseOverlay extends BaseComponent {
  public static baseName = "base-overlay";

  #open = false;

  public get open() {
    return this.#open;
  }

  public set open(value: boolean) {
    this.#open = value;
    this.render();
  }

  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
  }

  render() {}
}
