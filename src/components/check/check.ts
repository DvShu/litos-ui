import { effect } from "alien-signals";
import FormInner from "../form/form_inner";
import { parseAttrValue, stopSignal } from "../utils";
import { $$, on, off, addClass, toggleClass, removeClass } from "ph-utils/dom";

type CheckState = {
  /** 是否为按钮样式 */
  button: boolean;
  label?: string;
};

export default class Check extends FormInner<CheckState> {
  /** 是否选中 */
  private _checked: boolean;
  _inputType: "radio" | "checkbox"; // input类型
  $input?: HTMLInputElement;
  _groupCtx?: Signal<string[]>;
  _groupCtxStop?: SignalStop;

  setChecked(isChecked: boolean) {
    this._checked = isChecked;
    this.checkedChange();
  }

  getChecked() {
    return this._checked;
  }

  constructor() {
    super();
    this._checked = false;
    this._inputType = "radio";
    // 防止浏览器将组件视为原生 checkbox
    Object.defineProperty(this, "checked", {
      configurable: true,
      enumerable: true,
      get: this.getChecked,
      set: this.setChecked,
    });
  }

  static get observedAttributes() {
    return ["checked", "label", "button", ...FormInner.observedAttributes];
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.getChecked()) {
      this.setChecked(true);
    }
    if (this.isDisabled()) {
      addClass(this, "is-disabled");
    }
    this.emitInject("check-context-request", (context: Signal<string[]>) => {
      this._groupCtx = context;
    });
    this._groupCtxStop = effect(() => {
      if (this.value == null) return;
      const values = this._groupCtx ? this._groupCtx() : [];
      this.setChecked(values.includes(this.value));
    });
  }

  afterInit(): void {
    on(this, "click", this.#handleClick);
  }

  beforeDestroy(): void {
    off(this, "click", this.#handleClick);
    this._groupCtxStop = stopSignal(this._groupCtxStop);
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $input = $$("input", {
      type: this._inputType,
      class: "l-check__input",
      name: this.getName(),
      value: this.value,
      checked: this.getChecked(),
      disabled: this.isDisabled() ? "disabled" : undefined,
    }) as HTMLInputElement;
    this.$input = $input;
    fragment.appendChild($input);

    if (!this._state.button) {
      const $inner = $$("span", { class: "l-check__inner" });
      fragment.appendChild($inner);
    }

    const $label = $$("label", {
      class: "l-check__label",
      part: "label",
    });
    const $labelSlot = $$("slot", {
      textContent: this._state.label,
    });
    $label.appendChild($labelSlot);
    fragment.appendChild($label);

    return fragment;
  }

  protected attributeChange(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "checked":
        const isChecked = parseAttrValue(newValue, false, "checked");
        this.setChecked(isChecked);
        break;
      case "button":
        this._state.button = parseAttrValue(newValue, false, "button");
        break;
      case "label":
        this._state.label = newValue;
        break;
    }
  }

  protected checkedChange(): void {
    if (this.getChecked()) {
      addClass(this, "is-checked");
    } else {
      removeClass(this, "is-checked");
    }

    if (this.$input) {
      this.$input.checked = this.getChecked();
    }
  }

  protected disabledChange(): void {
    toggleClass(this, "is-disabled");
    if (this.$input) {
      this.$input.disabled = this.isDisabled();
    }
  }

  #handleClick = () => {
    if (this.isDisabled()) return;
    if (this.value && this._groupCtx) {
      // 处于 group 中
      this.emit('change', { bubbles: true, composed: true, detail: { value: this.value } });
    } else {
      // 通过 checked 属性控制
      if (this._inputType === 'radio') {
        this.setChecked(true);
      } else {
        this.setChecked(!this.getChecked());
      }
    }
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

  _doChangeAction() { }
}