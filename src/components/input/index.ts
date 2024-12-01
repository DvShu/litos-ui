import { formatClass, $one } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, tagAttr } from "../util";
import type Form from "../form";
import FormItem from "../form/form_item";
import { add, remove } from "../form/form_events";

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
export default class Input extends BaseComponent {
  public static baseName: string = "input";
  /** 原生 input 的 type */
  public type: string = "text";
  public placeholder: string | undefined = undefined;
  public autosize = false;
  public disabled = false;
  /** 限制输入类型, number, integer */
  public allowInput: string | undefined = undefined;
  /** 自定义输入解析器 */
  public parser?: (value: string) => string;
  private $input: HTMLInputElement | undefined = undefined;
  /** 表单 form 的 唯一标记 */
  private form: string | undefined = undefined;
  private formAttrs: Record<string, any> = {};
  private formItemAttrs: Record<string, any> = {};
  private attributeChangedHandler: undefined | ((...param: any) => void);
  private handleInput: (e: Event) => void;

  get value(): string {
    if (this.$input) return this.$input.value;
    return "";
  }

  set value(value: string | undefined) {
    if (this.$input) {
      this.$input.value = value || "";
    }
  }

  constructor() {
    super();
    initAttr(this);
    this.handleInput = this._input.bind(this);
  }

  connectedCallback(): void {
    const formInfo = this._getForm();
    this.formAttrs = formInfo.formAttr;
    this.formItemAttrs = formInfo.formItemAttr;
    if (this.formAttrs.formId) {
      this.attributeChangedHandler = this._formAttributeChanged.bind(this);
      add(
        this.formAttrs.formId,
        "attributeChanged",
        this.attributeChangedHandler
      );
    }
    this.render();
    this.loadStyle(["input"]);
  }

  disconnectedCallback(): void {
    if (this.attributeChangedHandler != null) {
      remove(
        this.formAttrs.formId,
        "attributeChanged",
        this.attributeChangedHandler
      );
    }
    this.$input?.removeEventListener("input", this.handleInput);
    this.$input = undefined;
  }

  render() {
    const val = this.getAttr("value", "");
    let valStr = tagAttr("value", val);
    const placeholderStr = tagAttr("placeholder", this.placeholder);
    const disabledStr = tagAttr("disabled", this._isDisabled());
    const classStr = formatClass({
      "l-input": true,
      "is-autosize": this.autosize,
    });
    this.shadow.innerHTML = `<input${valStr} type="${this.type}"${placeholderStr}${disabledStr} class="${classStr}" />`;
    this.$input = $one("input", this.shadow as any) as HTMLInputElement;
    this.$input.addEventListener("input", this.handleInput);
  }

  /**
   * 设置自定义的输入解析器
   * @param cb
   */
  public setParser(cb: (value: string) => string) {
    this.parser = cb;
  }

  public focus() {
    this.$input?.focus();
  }

  private _input(e: Event) {
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
      $target.value = String(value);
    }
    if (this.parser != null) {
      value = this.parser(value);
      $target.value = String(value);
    }
  }

  private _isDisabled() {
    if (this.formAttrs.disabled === true) return true;
    if (this.formItemAttrs.disabled === true) return true;
    return this.disabled;
  }

  private _formAttributeChanged(
    flag: "form" | "formItem",
    name: string,
    value: string
  ) {
    if (flag === "form") {
      this.formAttrs[name] = value;
    } else {
      this.formItemAttrs[name] = value;
    }
    if (name === "disabled") {
      this._changeDisabled();
    }
  }

  private _changeDisabled() {
    if (this.$input != null) {
      this.$input.disabled = this._isDisabled();
    }
  }

  private _getForm() {
    let $parent = this.parentElement;
    let formAttr: Record<string, any> = {};
    let formItemAttr: Record<string, any> = {};
    while ($parent != null) {
      const tagName = $parent.tagName;
      if (tagName === "L-FORM") {
        const sharedAttrs = ($parent as Form).sharedAttrs;
        for (let i = 0; i < sharedAttrs.length; i++) {
          const attr = sharedAttrs[i];
          formAttr[attr] = ($parent as Form)[attr as "disabled"];
        }
        break;
      }
      if (tagName === "BODY") break;
      if (tagName === "L-FORM-ITEM") {
        const sharedAttrs = ($parent as FormItem).sharedAttrs;
        for (let i = 0; i < sharedAttrs.length; i++) {
          const attr = sharedAttrs[i];
          formItemAttr[attr] = ($parent as FormItem)[attr as "disabled"];
        }
      }
      $parent = $parent.parentElement;
    }
    $parent = null;
    return {
      formAttr,
      formItemAttr,
    };
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
}
