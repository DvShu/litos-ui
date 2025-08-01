import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./item.less?inline";
import { $$, $one } from "ph-utils/dom";

export default class CollapaseItem extends BaseComponent {
  public static baseName = "collapase-item";

  public name: string = "";
  public headerText: string = "";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["name", "header-text"];
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
    const fragment = document.createDocumentFragment();
    // header
    const $header = $$("div", {
      class: "l-collapse-item__header",
      part: "header",
    });
    const $arrow = $$("l-arrow-right-icon", { class: "l-collapse-arrow-icon" });
    $header.appendChild($arrow);
    if (this.headerText) {
      const $headerText = $$("span", {
        part: "header-text",
        textContent: `${this.headerText}`,
      });
      $header.appendChild($headerText);
    } else {
      $header.appendChild(
        $$("slot", {
          name: "header-text",
        })
      );
    }

    fragment.appendChild($header);
    // content
    return fragment;
  }

  afterInit(): void {
    const $parent = this.parentElement as any;
    if ($parent && $parent.tagName.endsWith("COLLAPASE")) {
      this.#parentKeyChange({
        arrowPlacement: $parent.arrowPlacement,
        headerJustify: $parent.headerJustify,
      });
    }
  }

  #parentKeyChange(props: Record<string, any>) {
    let $header = $one(".l-collapse-item__header", this.root);
    if ($header) {
      if (props.arrowPlacement === "right") {
        $header.classList.add("arrow-right");
      } else {
        $header.classList.remove("arrow-right");
      }
      if (props.headerJustify === "space-between") {
        $header.classList.add("space-between");
      } else {
        $header.classList.remove("space-between");
      }
    }
  }
}
