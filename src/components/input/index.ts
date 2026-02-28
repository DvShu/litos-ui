import { $one, on, off, formatStyle, addClass, $$, $, removeClass } from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
import FormInner from "../form/form_inner";
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
    return [
      "disabled",
      "value",
      "name",
      "inner-block",
      "error",
      "clearable",
      "maxlength",
      "inputmode",
    ];
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([css]);
    super.connectedCallback();
    this.$inner = $one(".l-input__inner", this.root) as HTMLInputElement;
    on(this.$inner, "input", this._input);
    on(this.$inner, "change", this.#handleChange);
    this.style.cssText = formatStyle(this._getStyleObj()) + this.getAttr("style", "");
    if (this.error) {
      addClass(this, "is-error");
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    off(this.$inner as HTMLInputElement, "input", this._input);
  }

  protected attributeChange(name: string, oldValue: string, newValue: string): void {
    const parsedValue = parseAttrValue(newValue, this[name as "id"] as any, name) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
    if (name === "error") {
      const newError = parseAttrValue(newValue, false, name);
      if (newError !== this.error) {
        this.error = newError;
        this._updateError(newError);
      }
    } else if (name === "clearable") {
      const newClearable = parseAttrValue(newValue, false, name);
      if (newClearable !== this.clearable) {
        this.clearable = newClearable;
      }
    } else if (name === "maxlength" || name === "minlength") {
      this._updateAttr(name, newValue);
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
      placeholder: this.placeholder || "",
      part: "default",
      type: this.type,
      inputmode: this.getAttr("inputmode"),
      maxlength: this.getAttr("maxlength"),
      minlength: this.getAttr("minlength"),
      disabled: this.isDisabled(),
    }) as HTMLInputElement;
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
    target.setSelectionRange(newStart, newEnd);
  }

  _input = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    let oldValue = $target.value;
    let newValue = oldValue;
    if (this.allowInput != null) {
      let dotIndex = this.allowInput.indexOf(".");
      let precision =
        dotIndex === -1 ? dotIndex : parseInt(this.allowInput.substring(dotIndex + 1));
      newValue = this._numberInputParse(oldValue, {
        integer: this.allowInput.includes("integer"),
        negative: this.allowInput.startsWith("-"),
        precision: precision,
      });
      newValue = String(newValue);
    }
    if (this.parser != null) {
      newValue = this.parser(newValue);
    }
    this._calcCurosorPosition($target, newValue);
    this.setValue(newValue);
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
      new CustomEvent("input", {
        bubbles: true,
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

  protected innerBlockChange(innerBlock: boolean) {
    if (innerBlock) {
      addClass(this, "is-block");
    } else {
      removeClass(this, "is-block");
    }
  }

  private _getStyleObj() {
    const styleObj: Record<string, string> = {};
    if (this.width) {
      styleObj["--l-input-width"] = this.width;
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
    this._updateError(msg != null);
  }

  #handleChange = (e: Event) => {
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