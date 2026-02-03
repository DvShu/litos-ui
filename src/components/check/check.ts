import FormInner from "../form/form_inner";
import { initAttr, parseAttrValue } from "../utils";
import { $$, $one, on, off, addClass, toggleClass, removeClass } from "ph-utils/dom";

export default class Check extends FormInner {
  /** 是否选中 */
  private _checked = false;
  label?: string;
  /** 是否为按钮样式 */
  button = false;
  _inputType = "radio"; // input类型

  setChecked(isChecked: boolean) {
    this._checked = isChecked;
    this.checkedChange();
  }

  getChecked() {
    return this._checked;
  }

  constructor() {
    super();
    // 防止浏览器将组件视为原生 checkbox
    Object.defineProperty(this, "checked", {
      configurable: true,
      enumerable: true,
      get: this.getChecked,
      set: this.setChecked,
    });
  }

  static get observedAttributes() {
    return ["disabled", "checked"];
  }

  connectedCallback(): void {
    initAttr(this);
    super.connectedCallback();
    if (this.getChecked()) {
      addClass(this, "is-checked");
    }
    if (this.isDisabled()) {
      addClass(this, "is-disabled");
    }
  }

  afterInit(): void {
    on(this, "click", this.#handleClick);
    console.log("inner value: " + this.value);
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
      checked: this.getChecked(),
    }) as HTMLInputElement;
    if (this.isDisabled()) {
      $input.disabled = true;
    }
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

  protected attributeChange(name: string, _oldValue: string, newValue: string): void {
    if (name === "checked") {
      const checked = parseAttrValue(newValue, false, "checked");
      if (checked !== this.getChecked()) {
        this.setChecked(checked);
      }
    }
  }

  protected checkedChange(): void {
    if (this.getChecked()) {
      addClass(this, "is-checked");
    } else {
      removeClass(this, "is-checked");
    }
    const $input = $one("input", this.root) as HTMLInputElement;
    if ($input) {
      $input.checked = this.getChecked();
    }
  }

  protected disabledChange(): void {
    toggleClass(this, "is-disabled");
  }

  #handleClick = () => {
    if (this.isDisabled()) return;
    this._doChangeAction();
  };

  emitChange() {
    this.emit("change", {
      detail: {
        value: this.value,
        name: this.getName(),
        checked: this.getChecked(),
      },
      composed: true,
    });
  }

  _doChangeAction() {}
}
