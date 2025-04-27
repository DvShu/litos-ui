import FormInner from "../form/form_inner";
import { initAttr, parseAttrValue } from "../utils";
import { $$, $one, on, off, addClass, toggleClass } from "ph-utils/dom";

export default class Check extends FormInner {
  /** 是否选中 */
  checked = false;
  label?: string;
  /** 是否为按钮样式 */
  button = false;
  _inputType = "radio"; // input类型

  static get observedAttributes() {
    return ["disabled", "checked"];
  }

  connectedCallback(): void {
    initAttr(this);
    super.connectedCallback();
    if (this.checked) {
      addClass(this, "is-checked");
    }
    if (this.isDisabled()) {
      addClass(this, "is-disabled");
    }
  }

  afterInit(): void {
    on(this, "click", this.#handleClick);
  }

  beforeDestroy(): void {
    off(this, "click", this.#handleClick);
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $input = $$("input", {
      type: this._inputType,
      class: "l-check__input",
      name: this.getName(),
      value: this.value,
      disabled: this.isDisabled(),
      checked: this.checked,
    });
    fragment.appendChild($input);

    if (!this.button) {
      const $inner = $$("span", { class: "l-check__inner" });
      fragment.appendChild($inner);
    }

    const $label = $$("label", {
      class: "l-check__label",
      part: "label",
    });
    const $labelSlot = $$("slot", {
      textContent: this.label,
    });
    $label.appendChild($labelSlot);
    fragment.appendChild($label);

    return fragment;
  }

  protected attributeChange(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    if (name === "checked") {
      const checked = parseAttrValue(newValue, false, "checked");
      if (checked !== this.checked) {
        this.checked = checked;

        toggleClass(this, "is-checked");
        const $input = $one("input", this.root) as HTMLInputElement;
        if ($input) {
          $input.checked = checked;
        }
      }
    }
  }

  protected disabledChange(): void {
    toggleClass(this, "is-disabled");
  }

  #handleClick = () => {
    if (this.isDisabled()) return;
    this._checkedChange();
  };

  _checkedChange() {}
}
