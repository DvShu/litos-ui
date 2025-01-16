import { initAttr, parseAttrValue } from "../utils";
import css from "./index.less?inline";
import FormInner from "../form/form_inner";
import { random, isBlank } from "ph-utils";
import {
  $,
  $one,
  $$,
  iterate,
  getAttr,
  addClass,
  removeClass,
  on,
  off,
} from "ph-utils/dom";

export default class Checkbox extends FormInner {
  public static baseName = "checkbox";
  public type?: "button";
  public checked = false;
  public label?: string;
  public indeterminate = false;

  _ignoreInitAttrs = ["value"];

  constructor() {
    super(false);
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText(css);
    if (!this.getName()) {
      this.name = `la${random(3)}_${random(6)}`;
    }
    super.connectedCallback();
    this.#initEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeEvents();
  }

  static get observedAttributes(): string[] {
    return ["disabled", "value", "indeterminate"];
  }

  protected attributeChange(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "indeterminate") {
      this.indeterminate = parseAttrValue(newValue, false);
      const $label = $one("label[l-value]", this.root);
      if ($label) {
        if (this.indeterminate) {
          addClass($label, "l-checkbox--indeterminate");
        } else {
          removeClass($label, "l-checkbox--indeterminate");
        }
      }
    } else if (name === "value") {
      const v = newValue.split("&").map((v) => decodeURIComponent(v));
      this.setValue(v);
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $label = $one('[slot="label"]', this);
    const $default = $("[check-value]", this);
    if ($label || this.label) {
      this.value = this.checked;
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
      this.#parseValue();
      iterate($default, (el) => {
        const $labelNode = el.cloneNode(true) as HTMLElement;
        const value = getAttr(el, "check-value");
        fragment.appendChild(
          this.#itemRender(
            $labelNode.outerHTML,
            value,
            this.value.includes(value)
          )
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

  public setValue(value: boolean | string[]): void {
    super.setValue(value);
    if (typeof value === "boolean") {
      const $label = $one(`label`, this.root);
      if ($label) {
        if (this.checked) {
          addClass($label, "is-checked");
        } else {
          removeClass($label, "is-checked");
        }
      }
    } else {
      const $labels = $("label[l-value]", this.root);
      iterate($labels, (el) => {
        const checkValue = getAttr(el, "l-value");
        if (value.includes(checkValue)) {
          addClass(el, "is-checked");
        } else {
          removeClass(el, "is-checked");
        }
      });
    }
  }

  #parseValue() {
    const valueAttr = getAttr(this, "value");
    let parsedValue: boolean | string[] = [];
    if (this.hasAttribute("checked")) {
      parsedValue = this.checked;
    }
    if (!isBlank(valueAttr)) {
      parsedValue = valueAttr.split("&").map((v) => decodeURIComponent(v));
    }
    this._resetValue = parsedValue;
    this.value = parsedValue;
  }

  #checkChange = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    let $prev;
    if (typeof this.value === "boolean") {
      this.value = $target.checked;
      $prev = $one("label", this.root);
    } else {
      const value = $target.value;
      if ($target.checked) {
        this.value.push(value);
      } else {
        const i = (this.value as string[]).indexOf(value);
        if (i > -1) {
          this.value.splice(i, i);
        }
      }
      this.pushValueChange();
      $prev = $one(`label[l-value="${value}"]`, this.root);
    }
    if ($prev) {
      if ($target.checked) {
        addClass($prev, "is-checked");
      } else {
        removeClass($prev, "is-checked");
      }
    }
  };

  #initEvents() {
    iterate($("input", this.root), (el) => {
      on(el, "change", this.#checkChange);
    });
  }

  #removeEvents() {
    iterate($("input", this.root), (el) => {
      off(el, "change", this.#checkChange);
    });
  }
}
