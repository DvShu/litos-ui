import {
  $one,
  on,
  off,
  formatStyle,
  addClass,
  $$,
  $,
  removeClass,
} from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
import FormInner from "../form/form_inner";
import { add, remove } from "../utils/event";
//@ts-ignore
import css from "./index.less?inline";

type InputMode =
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url"
  | "none";

/**
 * 输入组件，提供基本的输入功能，并支持自定义输入解析器和表单联动。
 *
 * @property {string} type - 原生 input 的类型，默认为 "text"。
 * @property {string | undefined} placeholder - 输入框占位符。
 * @property {boolean} autosize - 是否自动调整大小。
 * @property {boolean} disabled - 是否禁用输入框。
 * @property {string | undefined} allowInput - 限制输入类型，如 "number", "integer"。
 * @property {(value: string) => string | undefined} parser - 自定义输入解析器。
 *
 * @method setParser - 设置自定义输入解析器。
 * @method focus - 输入框获取焦点
 */
export default class Input extends FormInner {
  public static baseName: string = "input";
  /** 原生 input 的 type */
  public type: string = "text";
  public placeholder: string | undefined = undefined;
  public autosize = false;
  /** 限制输入类型, number, integer */
  public allowInput: string | undefined = undefined;
  /** 自定义输入解析器 */
  public parser?: (value: string) => string;
  /** 宽度 */
  public width?: string;
  /** 宽度铺满 */
  public block = false;
  public error = false;
  public maxlength?: number;
  public inputmode: InputMode = "text";

  $inner?: HTMLInputElement;
  #clearable = false;

  set value(value: any) {
    this.setValue(value);
    if (this.$inner) {
      this.$inner.value = value;
    }
  }

  get value() {
    return this.getValue();
  }

  get clearable() {
    return this.#clearable;
  }

  set clearable(value: boolean) {
    this.#clearable = value;
    if (value) {
      addClass(this, "l-input--clearable");
    } else {
      removeClass(this, "l-input--clearable");
    }
  }

  static get observedAttributes() {
    return ["disabled", "error", "clearable", "maxlength", "inputmode"];
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([css]);
    super.connectedCallback();
    this.$inner = $one(".l-input__inner", this.root) as HTMLInputElement;
    on(this.$inner, "input", this._input);
    on(this.$inner, "change", this.#handleChange);
    this.style.cssText =
      formatStyle(this._getStyleObj()) + this.getAttr("style", "");
    if (this.error) {
      addClass(this, "is-error");
    }
    if (this.getName() && this.formAttrs.id) {
      add(this.formAttrs.id, "validateChange", this._validateChange);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.formAttrs.id) {
      remove(this.formAttrs.id, "validateChange", this._validateChange);
    }
    off(this.$inner as HTMLInputElement, "input", this._input);
  }

  protected attributeChange(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
    if (name === "error") {
      const newError = parseAttrValue(newValue, false, name);
      if (newError !== this.error) {
        this.error = newError;
        this._updateError();
      }
    } else if (name === "clearable") {
      const newClearable = parseAttrValue(newValue, false, name);
      if (newClearable !== this.clearable) {
        this.clearable = newClearable;
      }
    } else if (name === "maxlength") {
      const newMinlength = parseAttrValue(newValue, -1);
      if (newMinlength !== this["maxlength"]) {
        this["maxlength"] = newMinlength;
      }
    }
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
      name: this.getName(),
      placeholder: this.placeholder,
      disabled: this.isDisabled(),
      part: "default",
      type: this.type,
      inputmode: this.inputmode,
    });
    if (this.maxlength && this.maxlength >= 0) {
      $inner.setAttribute("maxlength", String(this.maxlength));
    }
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

  _input = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    let value = $target.value;
    if (this.allowInput != null) {
      let dotIndex = this.allowInput.indexOf(".");
      let precition =
        dotIndex === -1
          ? dotIndex
          : parseInt(this.allowInput.substring(dotIndex + 1));
      value = this._numberInputParse(value, {
        integer: this.allowInput.includes("integer"),
        negative: this.allowInput.startsWith("-"),
        precition: precition,
      });
      value = String(value);
    }
    if (this.parser != null) {
      value = this.parser(value);
    }
    $target.value = value;
    this.setValue(value);
    this.#renderClearable();
  };

  #renderClearable() {
    if (this.clearable) {
      let $clearWrapper = $one(".l-clearable", this.root);
      if (this.value.length > 0) {
        if ($clearWrapper == null) {
          // 创建清除按钮
          $clearWrapper = $$("span", {
            class: "l-input__suffix l-clearable",
          });
          const $clearIcon = $$("l-close-filled-icon");
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
  }

  #handleClear = () => {
    this.value = "";
    this.dispatchEvent(
      new CustomEvent("input", { bubbles: true, detail: { value: this.value } })
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
    }
  }

  private _numberInputParse(
    value: string,
    config: { integer: boolean; negative: boolean; precition: number }
  ) {
    let val = value;
    let negative = config.negative ? "-?" : "";
    if (config.integer) {
      const match = val.match(new RegExp(`^(${negative}\\d*)`));
      if (match != null) {
        return match[1];
      }
      return val.substring(0, val.length - 1);
    }
    const match = val.match(
      new RegExp(
        `(${negative}\\d+\\.\\d{0,${config.precition}})|(${negative}\\d*)`
      )
    );
    if (match != null) {
      val = match[1] || match[2];
    } else {
      val = "";
    }
    return match != null ? match[1] || match[2] : "";
  }

  private _getStyleObj() {
    const styleObj: Record<string, string> = {};
    if (this._isBlock()) {
      styleObj["--l-input-width"] = "100%";
    }
    if (this.width) {
      styleObj["--l-input-width"] = this.width;
    }
    return styleObj;
  }

  private _isBlock() {
    if (this.block === true) return true;
    if (this.formItemAttrs.innerBlock === true) return true;
    if (this.formAttrs.innerBlock === true) return true;
    return false;
  }

  private _updateError() {
    if (this.error) {
      addClass(this, "is-error");
    } else {
      removeClass(this, "is-error");
    }
  }

  private _validateChange = (
    result: true | Record<string, string>,
    name?: string
  ) => {
    const thisName = this.getName() as string;
    if (thisName) {
      const error = result === true ? false : result[thisName] != null;
      if (name == null || (name === thisName && this.error != error)) {
        this.error = error;
        this._updateError();
      }
      const keys = Object.keys(result);
      if (keys[0] === thisName) {
        this.focus();
      }
    }
  };

  #handleChange = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: $target.value },
      })
    );
  };
}
