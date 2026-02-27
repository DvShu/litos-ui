import BaseComponent from "../base";
import type Form from "../form";
import type FormItem from "../form/form_item";
import { parseAttrValue } from "../utils";
import { add, remove } from "../utils/event";
import { getAttr } from "ph-utils/dom";

export default class FormInner extends BaseComponent {
  public disabled = false;
  protected formAttrs: Record<string, any> = {};
  protected formItemAttrs: Record<string, any> = {};
  public _value: any = "";
  public _resetValue?: any; // 重置值(即初始化值)
  protected _firstPushValue = true; // 初始化时是否推送数据到 Form
  private _isReset = false; // 是否是重置, 重置时不触发数据校验
  private _name?: string;

  /**
   *
   * @param firstPushValue 是否第一次赋值 value 时, 推送数据到 Form, 默认: true
   * @param delegatesFocus 是否委托焦点, 默认: true
   */
  public constructor(firstPushValue = true, delegatesFocus = true) {
    super(true, { delegatesFocus });
    this._firstPushValue = firstPushValue;
  }

  get name() {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this.setValue(value);
  }

  public setValue(value: any) {
    this._value = value;
    this.pushValueChange();
  }

  public getValue() {
    return this._value;
  }

  static get observedAttributes() {
    return ["disabled", "value", "name"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        this.disabled = val;
        this.disabledChange();
      }
    } else if (name === "value" || name === "name") {
      this[name] = newValue;
    } else {
      this.attributeChange(name, oldValue, newValue);
    }
  }

  protected attributeChange(_name: string, _oldValue: string, _newValue: string) {}

  connectedCallback(): void {
    this.setAttribute("form-role", "field");
    const formInfo = this._getForm();
    if (!this.name && formInfo.formItemAttr.name) {
      this.setAttribute("name", formInfo.formItemAttr.name);
    }
    this.formAttrs = formInfo.formAttr;
    this.formItemAttrs = formInfo.formItemAttr;
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  public isDisabled() {
    if (this.disabled === true) return true;
    if (this.formItemAttrs.disabled === true) return true;
    return this.formAttrs.disabled || false;
  }

  public getName() {
    return this.name || this.formItemAttrs.name;
  }

  private _getForm() {
    let $parent = this.parentElement;
    let formAttr: Record<string, any> = {};
    let formItemAttr: Record<string, any> = {};
    while ($parent != null) {
      const formRole = getAttr($parent, "form-role");
      if (formRole === "form") {
        formAttr.innerBlock = getAttr($parent, "inner-block", false);
        break;
      }
      if ($parent.tagName === "BODY") break;
      if (formRole === "form-item") {
        formItemAttr.name = getAttr($parent, "prop");
        formItemAttr.innerBlock = getAttr($parent, "inner-block", false);
      }
      $parent = $parent.parentElement;
    }
    $parent = null;
    return {
      formAttr,
      formItemAttr,
    };
  }

  protected disabledChange() {}

  protected pushValueChange() {
    if (this.name) {
      this.emit("formValueChange", {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          value: this._value,
          valid: !this._isReset,
        },
      });
    }
    this._isReset = false;
  }

  public reset() {
    this._isReset = true;
    this.value = this._resetValue || "";
  }
}
