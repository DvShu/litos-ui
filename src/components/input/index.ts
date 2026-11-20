import { $one, on, off, formatStyle, addClass, $$, $, removeClass } from "utilane/browser";
import { parseAttrValue, unitNumberStr } from "../utils";
import FormInner from "../form/form_inner";
import type Button from "../button";
import inputSheet from "./style";

interface InputState {
  /** 原生 input 的类型，默认为 "text" */
  type: string;
  /** 输入框占位符 */
  placeholder: string;
  /** 是否自动调整大小 */
  autosize: boolean;
  /** 限制输入类型, number, integer */
  allowInput: string | undefined;
  clearable: boolean;
  readonly: boolean;
  error?: string;
  maxlength?: string;
  minlength?: string;
  inputmode?: string;
  block: boolean;
  width?: string;
}

/**
 * 输入组件，提供基本的输入功能，并支持自定义输入解析器和表单联动。
 *
 * @property {(value: string) => string | undefined} parser - 自定义输入解析器。
 *
 * @method setParser - 设置自定义输入解析器。
 * @method focus - 输入框获取焦点
 */
export default class Input extends FormInner<InputState> {
  public static baseName: string = "input";
  /** 自定义输入解析器 */
  public parser?: (value: string) => string;

  $inner?: HTMLInputElement;
  private formInnerBlock = false;
  private userBadInput = false;
  protected override get formStateRestorationEnabled(): boolean {
    return (this.getAttribute("type") || "text").toLowerCase() !== "password";
  }
  protected override get acceptsAutocompleteText(): boolean {
    return true;
  }
  protected override get nativeBadInput(): boolean {
    return this.userBadInput;
  }

  private syncInputAttributes(): void {
    if (!this.$inner) return;
    this.$inner.type = this.getAttribute("type") || "text";
    for (const attr of ["pattern", "min", "max", "step", "minlength", "maxlength", "inputmode"]) {
      const value = this.getAttribute(attr);
      if (value === null) this.$inner.removeAttribute(attr);
      else this.$inner.setAttribute(attr, value);
    }
    this.$inner.readOnly = this.readOnly;
    this.$inner.disabled = this.isDisabled();
  }

  protected override configurationApplied(): void {
    this.syncInputAttributes();
  }

  protected override attributeChanged(name: string, oldValue: string, newValue: string): void {
    super.attributeChanged(name, oldValue, newValue);
    this.syncInputAttributes();
    if (name === "type" && this.$inner) {
      const dirty = this.dirtyValue;
      this.setValue(this.$inner.value);
      this.dirtyValue = dirty;
    }
    if (this.rendered && ["readonly", "clearable"].includes(name)) this.#renderClearable();
  }

  public override focus(options?: FocusOptions): void {
    if (!this.isDisabled()) this.$inner?.focus(options);
  }
  public override blur(): void {
    this.$inner?.blur();
  }

  public constructor() {
    super();
    this.version = 2;
    this._state = {
      type: "text",
      placeholder: "",
      autosize: false,
      allowInput: undefined,
      block: false,
      clearable: false,
      readonly: false,
    };
  }

  public override get nativeValueEnabled(): boolean {
    return true;
  }

  protected override serializeFormValue(): string {
    return String(this.getValue() ?? "");
  }

  public override setValue(value: any): void {
    this.userBadInput = false;
    const native = this.$inner ?? this.ownerDocument.createElement("input");
    native.type = this.getAttribute("type") || "text";
    const text = String(value ?? "");
    native.value = text;
    // number/date 等类型由浏览器清洗非法值；仅当字符串改变时替换业务值，保留 0／false。
    super.setValue(native.value === text ? value : native.value);
    if (this.$inner) this.#renderClearable();
    this.syncNativeValue();
  }

  set value(value: any) {
    this.setValue(value);
  }

  get value() {
    return this.getValue();
  }

  get readOnly() {
    return this._state.readonly;
  }

  set readOnly(value: boolean) {
    if (value) this.setAttribute("readonly", "");
    else this.removeAttribute("readonly");
  }

  static get observedAttributes() {
    return [
      ...new Set([
        ...FormInner.observedAttributes,
        "disabled",
        "readonly",
        "value",
        "name",
        "inner-block",
        "error",
        "clearable",
        "maxlength",
        "minlength",
        "inputmode",
        "type",
        "placeholder",
        "width",
        "block",
        "autocomplete",
      ]),
    ];
  }

  afterInit(): void {
    this.$inner = $one(".l-input__inner", this.root) as HTMLInputElement;
    this.$inner.value = String(this.getValue() ?? "");
    this.#renderClearable();
    this.syncInputAttributes();
    this.$inner.addEventListener("keydown", this.#submitOnEnter);
    on(this.$inner, "input", this._input);
    on(this.$inner, "change", this.#handleChange);
    this.style.cssText = formatStyle(this._getStyleObj()) + this.getAttr("style", "");
  }

  beforeDestroy(): void {
    this.$inner?.removeEventListener("keydown", this.#submitOnEnter);
    off(this.$inner as HTMLInputElement, "input", this._input);
    off(this.$inner as HTMLInputElement, "change", this.#handleChange);
    const clear = $one(".l-clearable", this.root);
    if (clear) off(clear, "click", this.#handleClear);
  }

  #submitOnEnter = (event: KeyboardEvent): void => {
    const input = this.$inner;
    const form = this.form;
    if (
      !input ||
      !form ||
      input.form ||
      this.isDisabled() ||
      event.defaultPrevented ||
      event.key !== "Enter" ||
      event.isComposing ||
      event.keyCode === 229 ||
      event.repeat ||
      !["text", "search", "tel", "url", "email", "password", "number"].includes(input.type)
    )
      return;

    const host = this.closest("l-form");
    const scope =
      host && form.contains(host) ? host : (form.getRootNode() as Document | ShadowRoot);
    const isSubmitter = (control: HTMLButtonElement | HTMLInputElement | Button) => {
      if (control.form !== form) return false;
      if (control instanceof HTMLButtonElement || control instanceof HTMLInputElement) {
        return control.type === "submit" || control.type === "image";
      }
      return control.getAttribute("html-type") === "submit";
    };
    const submitter = Array.from(
      scope.querySelectorAll<HTMLButtonElement | HTMLInputElement | Button>(
        'button, input, l-button[html-type="submit"]',
      ),
    ).find(isSubmitter);
    if (!submitter) return;
    // 影子输入不归外层 form 所有，原生 Enter 不会代为提交。
    setTimeout(() => {
      if (event.defaultPrevented || !this.isConnected || this.$inner !== input || this.isDisabled())
        return;
      if (this.form === form && isSubmitter(submitter)) submitter.click();
    }, 0);
  };

  protected attributeChange(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "error":
      case "maxlength":
      case "minlength":
      case "inputmode":
      case "placeholder":
      case "type":
        this._state[name] = newValue;
        break;
      case "clearable":
      case "readonly":
      case "block":
        const v = parseAttrValue(newValue, false, name);
        this._state[name] = v;
        break;
      case "width":
        this._state.width = unitNumberStr(newValue) as string;
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("readonly") && this.$inner) {
      this.$inner.readOnly = this._state.readonly;
    }
    if (changedProps.has("readonly") || changedProps.has("clearable")) {
      this.#renderClearable();
    }
    // 新的按条件更新逻辑:
    if (changedProps.has("clearable")) {
      if (this._state.clearable) {
        addClass(this, "l-input--clearable");
      } else {
        removeClass(this, "l-input--clearable");
      }
    }

    if (changedProps.has("error")) {
      this._updateError(
        this._state.error != null || this.$inner?.getAttribute("aria-invalid") === "true",
      );
    }

    if (changedProps.has("maxlength")) {
      this._updateAttr("maxlength", this._state.maxlength);
    }

    if (changedProps.has("minlength")) {
      this._updateAttr("minlength", this._state.minlength);
    }

    if (changedProps.has("inputmode")) {
      this._updateAttr("inputmode", this._state.inputmode);
    }

    if (changedProps.has("block")) {
      this.updateBlock();
    }
    if (changedProps.has("placeholder")) {
      if (this.$inner) this.$inner.placeholder = this._state.placeholder;
    }
  }

  _updateAttr(key: string, value: any) {
    if (this.$inner) {
      if (value) {
        this.$inner.setAttribute(key, value);
      } else {
        this.$inner.removeAttribute(key);
      }
    }
  }

  render_v2() {
    return {
      template: this.render(),
      styleSheets: [inputSheet],
    };
  }

  render() {
    const fragment = document.createDocumentFragment();
    // prefix
    const $prefixChildren = $('[slot="prefix"]', this);
    if ($prefixChildren.length > 0) {
      const $prefix = $$("slot", {
        name: "prefix",
      });
      const $prefixArea = $$("span", {
        class: "l-input__prefix",
        part: "prefix",
      });
      $prefixArea.appendChild($prefix);
      fragment.appendChild($prefixArea);
    }

    // inner
    const $inner = $$("input", {
      class: "l-input__inner",
      value: this.value,
      placeholder: this._state.placeholder,
      part: "default",
      type: this._state.type,
      inputmode: this._state.inputmode,
      maxlength: this._state.maxlength,
      minlength: this._state.minlength,
      disabled: this.isDisabled() ? true : undefined,
    }) as HTMLInputElement;
    $inner.readOnly = this._state.readonly;
    fragment.appendChild($inner);

    // suffix
    const $suffixChildren = $('[slot="suffix"]', this);
    if ($suffixChildren.length > 0) {
      const $suffix = $$("slot", {
        name: "suffix",
      });
      const $suffixArea = $$("span", {
        class: "l-input__suffix",
        part: "suffix",
      });
      $suffixArea.appendChild($suffix);
      fragment.appendChild($suffixArea);
    }
    return fragment;
  }
  /**
   * 设置自定义的输入解析器
   * @param cb
   */
  public setParser(cb: (value: string) => string) {
    this.parser = cb;
  }

  _calcCurosorPosition(target: HTMLInputElement, newValue: string) {
    // 5. 【关键】计算新光标位置并恢复
    const start = target.selectionStart || 0;
    const end = target.selectionEnd || 0;
    const oldValue = target.value;
    let newStart = start;
    let newEnd = end;

    // 简单策略：如果新值比旧值短，说明删了字符，光标前移
    // 更健壮的做法：对比差异，但通常可简化处理
    if (newValue.length < oldValue.length) {
      // 例如：用户在中间删了一个非法字符
      newStart = Math.max(0, start - (oldValue.length - newValue.length));
      newEnd = newStart;
    } else if (newValue.length > oldValue.length) {
      // 插入合法字符，光标通常就在插入点后，可保持原偏移
      // 但需防止超出长度
      newStart = Math.min(newValue.length, start + (newValue.length - oldValue.length));
      newEnd = newStart;
    } else {
      // 长度不变（如替换），保持原位置（但要限制范围）
      newStart = Math.min(newValue.length, start);
      newEnd = newStart;
    }
    target.value = newValue;
    if (["text", "search", "url", "tel", "password"].includes(target.type))
      target.setSelectionRange(newStart, newEnd);
  }

  _input = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    if (this.readOnly || this.isDisabled()) {
      $target.value = String(this.getValue() ?? "");
      e.stopImmediatePropagation();
      return;
    }
    const badInput = $target.validity.badInput;
    let oldValue = $target.value;
    let newValue = oldValue;
    if (this._state.allowInput != null) {
      let dotIndex = this._state.allowInput.indexOf(".");
      let precision =
        dotIndex === -1 ? dotIndex : parseInt(this._state.allowInput.substring(dotIndex + 1));
      newValue = this._numberInputParse(oldValue, {
        integer: this._state.allowInput.includes("integer"),
        negative: this._state.allowInput.startsWith("-"),
        precision: precision,
      });
      newValue = String(newValue);
    }
    if (this.parser != null) {
      newValue = this.parser(newValue);
    }
    try {
      this._calcCurosorPosition($target, newValue);
    } catch (e: any) {
      console.warn(e);
    }

    this.setValue(newValue);
    this.userBadInput = badInput;
    this.syncNativeValue();
    this.#renderClearable();
    this.validateInput();
  };

  #renderClearable() {
    let $clearWrapper = $one(".l-clearable", this.root);
    if (
      this._state.clearable &&
      !this.readOnly &&
      !this.isDisabled() &&
      String(this.value ?? "").length > 0
    ) {
      if ($clearWrapper == null) {
        // 创建清除按钮
        $clearWrapper = $$("button", {
          class: "l-input__suffix l-clearable",
          type: "button",
          "aria-label": "清空输入",
          part: "clear",
        });
        const $clearIcon = $$("l-close-filled-icon", { "aria-hidden": "true" });
        $clearWrapper.appendChild($clearIcon);
        this.root.appendChild($clearWrapper);
        on($clearWrapper, "click", this.#handleClear);
      }
    } else {
      if ($clearWrapper) {
        off($clearWrapper, "click", this.#handleClear);
        // 清除按钮
        $clearWrapper.remove();
      }
    }
  }

  #handleClear = () => {
    if (this.readOnly || this.isDisabled()) return;
    this.value = "";
    this.validateInput();
    this.focus();
    this.dispatchEvent(
      new CustomEvent("input", {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    );
    this.#renderClearable();
  };

  disabledChange() {
    if (this.isDisabled()) {
      this.classList.add("is-disabled");
    } else {
      this.classList.remove("is-disabled");
    }
    if (this.$inner) {
      this.$inner.disabled = this.isDisabled();
      this.#renderClearable();
    }
  }

  private _numberInputParse(
    value: string,
    config: { integer: boolean; negative: boolean; precision: number },
  ) {
    let str = value.trim();

    // 允许空字符串
    if (str === "") return "";

    // 检查是否以负号开头（仅当允许负数时）
    let startsWithMinus = str.startsWith("-");
    if (startsWithMinus) {
      if (!config.negative) {
        str = str.slice(1); // 去掉负号继续处理
        startsWithMinus = false;
      }
    }
    // 现在 str 应该是纯数字+小数点
    if (config.integer) {
      // 只保留数字
      str = str.replace(/[^\d]/g, "");
    } else {
      // 小数：只保留数字和最多一个小数点
      const parts = str.split(".");
      if (parts.length > 2) {
        // 多个小数点：只取前两部分（如 "1.2.3" → "1.2"）
        str = parts[0] + "." + parts.slice(1).join("").substring(0, config.precision);
      } else if (parts.length === 2) {
        // 限制小数位数
        const integerPart = parts[0].replace(/[^\d]/g, "");
        const decimalPart = parts[1].replace(/[^\d]/g, "").substring(0, config.precision);
        str = `${integerPart}.${decimalPart}`;
      } else {
        // 无小数点
        str = str.replace(/[^\d]/g, "");
      }
    }

    // 移除前导零（可选，根据需求）
    // 注意：保留 "0"，但 "00" → "0"，"01" → "1"
    if (str.length > 1) {
      str = str.replace(/^0+(\d)/, "$1");
    }
    return startsWithMinus ? "-" + str : str;
  }

  protected override innerBlockChange(innerBlock: boolean): void {
    this.formInnerBlock = innerBlock;
    this.updateBlock();
  }

  private updateBlock(): void {
    this.classList.toggle("is-block", this._state.block || this.formInnerBlock);
  }

  private _getStyleObj() {
    const styleObj: Record<string, string> = {};
    if (this._state.width) {
      styleObj["--l-input-width"] = this._state.width;
    }
    return styleObj;
  }

  private _updateError(isError = false) {
    if (isError) {
      addClass(this, "is-error");
    } else {
      removeClass(this, "is-error");
    }
  }

  protected validResult(msg?: string): void {
    super.validResult(msg);
    this._updateError(!!msg || !!this._state.error);
  }

  #handleChange = (e: Event) => {
    e.stopPropagation();
    if (this.readOnly || this.isDisabled()) return;
    const $target = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: $target.value, name: this.getName() },
      }),
    );
  };
}