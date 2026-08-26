import { $one, $$, on, off, addClass, removeClass } from "ph-utils/browser";
import { parseAttrValue, unitNumberStr } from "../utils";
import FormInner from "../form/form_inner";
import inputNumberSheet from "./style";

interface InputNumberState {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step: number;
  /** 小数精度 */
  precision?: number;
  /** 占位符 */
  placeholder: string;
  /** 尺寸 */
  size: "small" | "default" | "large";
  /** 宽度 */
  width?: string;
  /** 是否禁用步进按钮 */
  controlsDisabled: boolean;
}

export default class InputNumber extends FormInner<InputNumberState> {
  public static baseName = "input-number";

  $input?: HTMLInputElement;
  $minusBtn?: HTMLButtonElement;
  $plusBtn?: HTMLButtonElement;

  constructor() {
    super();
    this.version = 2;
    this._state = {
      step: 1,
      placeholder: "",
      size: "default",
      controlsDisabled: false,
    };
  }

  static get observedAttributes() {
    return [
      "disabled",
      "value",
      "name",
      "inner-block",
      "min",
      "max",
      "step",
      "precision",
      "placeholder",
      "size",
      "width",
      "controls-disabled",
    ];
  }

  protected attributeChange(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "min":
      case "max":
      case "precision":
        const v = Number(newValue);
        this._state[name] = Number.isFinite(v) ? v : undefined;
        break;
      case "step":
        const v2 = Number(newValue);
        this._state.step = Number.isFinite(v2) ? v2 : 1;
        break;
      case "placeholder":
      case "size":
        this._state[name] = newValue.trim() as never;
        break;
      case "width":
        this._state.width = unitNumberStr(newValue) as string;
        break;
      case "controls-disabled":
        this._state.controlsDisabled = parseAttrValue(newValue, false, "controls-disabled");
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("placeholder") && this.$input) {
      this.$input.placeholder = this._state.placeholder;
    }
    if (changedProps.has("width")) {
      this._updateWidth();
    }
    if (changedProps.has("controls-disabled")) {
      this._updateControls();
    }
    if (changedProps.has("step") || changedProps.has("min") || changedProps.has("max")) {
      this._updateBtnState();
    }
  }

  render_v2() {
    return {
      template: this.render(),
      styleSheets: [inputNumberSheet],
    };
  }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    // 减少按钮
    const $minus = $$("button", {
      class: "l-input-number__btn l-input-number__minus",
      type: "button",
      part: "minus",
    }) as HTMLButtonElement;
    $minus.innerHTML =
      '<svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor"><path d="M128 512h768a25.6 25.6 0 1 1 0 51.2H128a25.6 25.6 0 1 1 0-51.2z"></path></svg>';
    $minus.disabled = this.isDisabled();
    fragment.appendChild($minus);

    // 输入框
    const $input = $$("input", {
      class: "l-input-number__inner",
      value: this._formatValue(this.value),
      name: this.getName(),
      placeholder: this._state.placeholder,
      part: "default",
      type: "text",
      inputmode: this._state.precision != null ? "decimal" : "numeric",
      disabled: this.isDisabled() ? true : undefined,
    }) as HTMLInputElement;
    fragment.appendChild($input);

    // 增加按钮
    const $plus = $$("button", {
      class: "l-input-number__btn l-input-number__plus",
      type: "button",
      part: "plus",
    }) as HTMLButtonElement;
    $plus.innerHTML =
      '<svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor"><path d="M512 128a25.6 25.6 0 0 1 25.6 25.6v332.8h332.8a25.6 25.6 0 1 1 0 51.2H537.6v332.8a25.6 25.6 0 1 1-51.2 0V537.6H153.6a25.6 25.6 0 1 1 0-51.2h332.8V153.6A25.6 25.6 0 0 1 512 128z"></path></svg>';
    $plus.disabled = this.isDisabled();
    fragment.appendChild($plus);

    return fragment;
  }

  afterInit(): void {
    this.$input = $one(".l-input-number__inner", this.root) as HTMLInputElement;
    this.$minusBtn = $one(".l-input-number__minus", this.root) as HTMLButtonElement;
    this.$plusBtn = $one(".l-input-number__plus", this.root) as HTMLButtonElement;

    on(this.$input, "input", this._handleInput);
    on(this.$input, "change", this._handleChange);
    on(this.$input, "blur", this._handleBlur);
    on(this.$input, "keydown", this._handleKeydown);
    on(this.$minusBtn, "click", this._handleMinus);
    on(this.$plusBtn, "click", this._handlePlus);

    this._updateWidth();
    this._updateBtnState();
    this._updateControls();
    this.className = `l-input-number--${this._state.size || "default"} ${this.className}`;
  }

  beforeDestroy(): void {
    if (this.$input) {
      off(this.$input, "input", this._handleInput);
      off(this.$input, "change", this._handleChange);
      off(this.$input, "blur", this._handleBlur);
      off(this.$input, "keydown", this._handleKeydown);
    }
    if (this.$minusBtn) {
      off(this.$minusBtn, "click", this._handleMinus);
    }
    if (this.$plusBtn) {
      off(this.$plusBtn, "click", this._handlePlus);
    }
    this.$input = undefined;
    this.$minusBtn = undefined;
    this.$plusBtn = undefined;
  }

  set value(value: any) {
    this.setValue(value);
    if (this.$input) {
      this.$input.value = this._formatValue(value);
    }
    this._updateBtnState();
  }

  get value() {
    return this.getValue();
  }

  disabledChange(): void {
    if (this.isDisabled()) {
      addClass(this, "is-disabled");
    } else {
      removeClass(this, "is-disabled");
    }
    if (this.$input) this.$input.disabled = this.isDisabled();
    if (this.$minusBtn) this.$minusBtn.disabled = this.isDisabled();
    if (this.$plusBtn) this.$plusBtn.disabled = this.isDisabled();
  }

  focus() {
    this.$input?.focus();
  }

  /** 将值限制在 min/max 范围内并格式化精度 */
  private _clamp(value: number): number {
    const { min, max, precision } = this._state;
    if (min != null && value < min) value = min;
    if (max != null && value > max) value = max;
    if (precision != null) {
      value = parseFloat(value.toFixed(precision));
    }
    return value;
  }

  private _formatValue(value: any): string {
    if (value == null || value === "") return "";
    const num = Number(value);
    if (isNaN(num)) return "";
    const { precision } = this._state;
    if (precision != null) {
      return num.toFixed(precision);
    }
    return String(num);
  }

  private _getCurrentNum(): number {
    const raw = this.$input?.value ?? this.value;
    if (raw == null || raw === "") return 0;
    const num = Number(raw);
    return isNaN(num) ? 0 : num;
  }

  private _commitValue(num: number) {
    const clamped = this._clamp(num);
    this.value = clamped;
    if (this.$input) {
      this.$input.value = this._formatValue(clamped);
    }
    this.emit("input", {
      bubbles: true,
      detail: { value: clamped, name: this.getName() },
    });
    this._updateBtnState();
  }

  private _handleInput = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    let raw = $target.value;
    // 允许用户正在输入负号或末尾小数点
    if (raw === "-" || raw === "." || raw === "-.") {
      return;
    }
    const num = Number(raw);
    if (Number.isFinite(num)) {
      this.setValue(num);
      this.emit("input", {
        bubbles: true,
        detail: { value: num, name: this.getName() },
      });
    }
  };

  private _handleChange = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    const num = Number($target.value);
    if (Number.isFinite(num)) {
      const clamped = this._clamp(num);
      this.value = clamped;
      if (this.$input) {
        this.$input.value = this._formatValue(clamped);
      }
      this.emit("change", { detail: { value: clamped, name: this.getName() } });
    }
  };

  private _handleBlur = () => {
    // 失焦时格式化当前输入值
    if (this.$input) {
      const raw = this.$input.value;
      const num = parseFloat(raw);
      if (Number.isFinite(num)) {
        const clamped = this._clamp(num);
        this.value = clamped;
        this.$input.value = this._formatValue(clamped);
      } else {
        this.value = undefined;
        this.$input.value = "";
      }
    }
  };

  private _handleKeydown = (e: Event) => {
    const ke = e as KeyboardEvent;
    if (this.isDisabled()) return;
    if (ke.key === "ArrowUp") {
      ke.preventDefault();
      this._stepUp();
    } else if (ke.key === "ArrowDown") {
      ke.preventDefault();
      this._stepDown();
    }
  };

  private _handleMinus = () => {
    if (this.isDisabled()) return;
    this._stepDown();
    this.focus();
  };

  private _handlePlus = () => {
    if (this.isDisabled()) return;
    this._stepUp();
    this.focus();
  };

  private _stepUp() {
    const current = this._getCurrentNum();
    this._commitValue(current + this._state.step);
  }

  private _stepDown() {
    const current = this._getCurrentNum();
    this._commitValue(current - this._state.step);
  }

  private _updateBtnState() {
    const num = this._getCurrentNum();
    const { min, max } = this._state;
    if (this.$minusBtn && min != null) {
      this.$minusBtn.disabled = this.isDisabled() || num <= min;
    }
    if (this.$plusBtn && max != null) {
      this.$plusBtn.disabled = this.isDisabled() || num >= max;
    }
  }

  private _updateWidth() {
    if (this._state.width) {
      this.style.setProperty("--l-input-number-width", this._state.width);
    } else {
      this.style.removeProperty("--l-input-number-width");
    }
  }

  private _updateControls() {
    if (this._state.controlsDisabled) {
      addClass(this, "l-input-number--no-controls");
      if (this.$minusBtn) this.$minusBtn.style.display = "none";
      if (this.$plusBtn) this.$plusBtn.style.display = "none";
    } else {
      removeClass(this, "l-input-number--no-controls");
      if (this.$minusBtn) this.$minusBtn.style.display = "";
      if (this.$plusBtn) this.$plusBtn.style.display = "";
    }
  }

  protected innerBlockChange(innerBlock: boolean) {
    if (innerBlock) {
      addClass(this, "is-block");
    } else {
      removeClass(this, "is-block");
    }
  }

  protected validResult(msg?: string): void {
    if (msg != null) {
      addClass(this, "is-error");
    } else {
      removeClass(this, "is-error");
    }
  }
}