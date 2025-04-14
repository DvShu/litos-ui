import {
  $one,
  on,
  off,
  formatStyle,
  addClass,
  removeClass,
  $$,
  $,
} from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
import FormInner from "../form/form_inner";
import { add, remove } from "../utils/event";
//@ts-ignore
import css from "./index.less?inline";

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
  /** clearable */
  public clearable = false;

  set value(value: any) {
    this.setValue(value);
    const $inner = $one(".l-input__inner", this.root) as HTMLInputElement;
    $inner.value = value;
  }

  get value() {
    return this.getValue();
  }

  static get observedAttributes() {
    return ["disabled", "error"];
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([css]);
    super.connectedCallback();
    this.disabledChange();
    on(this.root, "input", this._input);
    this.style.cssText =
      formatStyle(this._getStyleObj()) + this.getAttr("style", "");
    if (this.getName() && this.formAttrs.id) {
      add(this.formAttrs.id, "validateChange", this._validateChange);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.formAttrs.id) {
      remove(this.formAttrs.id, "validateChange", this._validateChange);
    }
    off(this.root, "input", this._input);
  }

  protected attributeChange(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "error") {
      const newError = parseAttrValue(newValue, false, name);
      if (newError !== this.error) {
        this.error = newError;
        this._updateError();
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
    });
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

  public focus() {
    const $inner = $one(".l-input__inner", this.root) as HTMLInputElement;
    $inner.focus();
  }

  _input = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    console.log($target);
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
      $target.value = value;
    }
    if (this.parser != null) {
      value = this.parser(value);
      $target.value = value;
    }
    this.setValue(value);
  };

  disabledChange() {
    if (this.isDisabled()) {
      this.classList.add("is-disabled");
    } else {
      this.classList.remove("is-disabled");
    }
    const $inner = $one(".l-input__inner", this.root) as HTMLInputElement;
    $inner.disabled = this.isDisabled();
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
    // if (this.$input) {
    //   if (this.error) {
    //     addClass(this.$input, "is-error");
    //   } else {
    //     removeClass(this.$input, "is-error");
    //   }
    // }
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
}
