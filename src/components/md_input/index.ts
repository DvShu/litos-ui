import { $$, addClass, removeClass, $one, on, off } from "utilane/browser";
import FormInner from "../form/form_inner";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./index.less?inline";
import { isBlank, random } from "utilane";

export default class MdInput extends FormInner {
  public static baseName = "md-input";

  protected _ignoreInitAttrs = ["value"];

  /** 是否显示四周边框 */
  public outline = false;
  public htmlType: "text" | "number" | "password" | "tel" = "text";
  public inputmode?: "text" | "numeric" | "decimal" | "tel";
  public label?: string;

  static get observedAttributes() {
    return [...new Set([...FormInner.observedAttributes, "disabled"])];
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText(css);
    super.connectedCallback();
    this.#initEvents();
    this.syncNativeValue();
    this.disabledChange();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeEvents();
  }

  render() {
    if (!isBlank(this.value)) {
      addClass(this, "l-has-value");
    }
    if (this.outline) {
      addClass(this, "l-md-input-outline");
    }
    const fragment = document.createDocumentFragment();
    const innerId = `l-md-input-${random(8)}`;
    // inner
    const $inner = $$("input", {
      class: "l-md-input__inner",
      type: this.htmlType,
      value: this.value ?? "",
      disabled: this.isDisabled(),
      inputmode: this.inputmode,
      id: innerId,
    });
    fragment.appendChild($inner);
    if (this.label) {
      // label
      const $label = $$("label", {
        class: "l-md-input__label",
        for: innerId,
      });
      $label.textContent = this.label;
      fragment.appendChild($label);
    }
    return fragment;
  }

  public setValue(value: any): void {
    super.setValue(value);
    const $inner = $one("input", this.root) as HTMLInputElement;
    if ($inner) {
      $inner.value = value ?? "";
    }
    this.classList.toggle("l-has-value", !isBlank(value));
    this.syncNativeValue();
  }

  protected disabledChange(): void {
    const input = $one("input", this.root) as HTMLInputElement;
    if (input) input.disabled = this.isDisabled();
  }

  #initEvents() {
    const $inner = $one("input", this.root) as HTMLInputElement;
    if ($inner) {
      on($inner, "input", this.#handleInput);
    }
  }

  #removeEvents() {
    const $inner = $one("input", this.root) as HTMLInputElement;
    if ($inner) {
      off($inner, "input", this.#handleInput);
    }
  }

  #handleInput = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    const value = $target.value;
    this.setValue(value);
    if (!isBlank(value)) {
      addClass(this, "l-has-value");
    } else {
      removeClass(this, "l-has-value");
    }
  };
}