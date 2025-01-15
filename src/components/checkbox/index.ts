import { initAttr, tagAttr } from "../utils";
import css from "./index.less?inline";
import FormInner from "../form/form_inner";
import { random } from "ph-utils";
import { $, $one, $$, iterate, getAttr } from "ph-utils/dom";

export default class Checkbox extends FormInner {
  public static baseName = "checkbox";
  public type?: "button";
  public checked = false;
  public label?: string;
  public indeterminate = false;
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyleText(css);
    if (!this.getName()) {
      this.name = `la${random(3)}_${random(6)}`;
    }
    super.connectedCallback();
  }

  protected attributeChange(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "indeterminate") {
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $label = $one('[slot="label"]', this);
    const $default = $("[check-value]", this);
    if ($label || this.label) {
      if ($label) {
        fragment.appendChild(
          this.#itemRender("slot", undefined, this.checked, "label")
        );
      } else {
        fragment.appendChild(
          this.#itemRender(
            this.label as string,
            undefined,
            this.checked,
            "label"
          )
        );
      }
    } else if ($default.length > 0) {
      iterate($default, (el) => {
        const $labelNode = el.cloneNode(true) as HTMLElement;
        const value = getAttr(el, "check-value");
        fragment.appendChild(
          this.#itemRender($labelNode.outerHTML, value, this.value === value)
        );
      });
    }
    return fragment;
  }

  #itemRender(
    label: string | "slot",
    value?: string,
    checked = false,
    labelPart: string | undefined = undefined
  ) {
    const $item = $$("label", {
      class: {
        "l-checkbox": true,
        "l-checkbox--button": this.type === "button",
        "is-checked": checked,
        "l-checkbox--disabled": this.isDisabled(),
        "l-checkbox--indeterminate": this.indeterminate,
      },
      "l-value": value,
    });
    const $input = $$("input", {
      class: "l-checkbox__input",
      type: "checkbox",
      name: this.getName(),
      value,
      checked,
      disabled: this.isDisabled(),
    });
    $item.appendChild($input);
    if (this.type !== "button") {
      const $inner = $$("span", {
        class: "l-checkbox__inner",
      });
      $item.appendChild($inner);
    }
    let labelStr = label === "slot" ? '<slot name="label"></slot>' : label;
    const $labelContent = $$("div", {
      class: "l-checkbox__label",
      part: labelPart,
    });
    $labelContent.innerHTML = labelStr;
    $item.appendChild($labelContent);
    return $item;
  }
}
