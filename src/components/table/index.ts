import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import type { Column } from "./types";
import { $$ } from "ph-utils/dom";

export default class Table extends BaseComponent {
  public static baseName = "table";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return [];
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
    const $table = $$("table", { class: "l-table" });

    const $thead = $$("thead");
    $thead.appendChild(this._headRender());
    $table.appendChild($thead);

    const $tbody = $$("tbody");
    $table.appendChild($tbody);

    return $table;
  }

  private _headRender() {
    const fragment = document.createDocumentFragment();

    return fragment;
  }
}
