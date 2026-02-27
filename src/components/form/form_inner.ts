import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
import { getAttr } from "ph-utils/dom";
import type { FormItemSignal, FormSignal } from "./types";
import { effect } from "alien-signals";

export default class FormInner extends BaseComponent {
  public disabled = false;
  public _value: any = "";
  public _resetValue?: any; // 重置值(即初始化值)
  protected _firstPushValue = true; // 初始化时是否推送数据到 Form
  private _isReset = false; // 是否是重置, 重置时不触发数据校验
  private _name?: string;
  public formContext?: Signal<FormSignal>;
  public formItemContext?: Signal<FormItemSignal>;
  private _signalStop?: SignalStop;

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
    return ["disabled", "value", "name", "inner-block"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        this.disabled = val;
        this.disabledChange();
      }
    } else if (name === "value" || name === "name") {
      this[name] = newValue;
    } else if (name === "inner-block") {
      const innerBlock = parseAttrValue(newValue, false, name);
      this.innerBlockChange(innerBlock);
    } else {
      this.attributeChange(name, oldValue, newValue);
    }
  }

  protected attributeChange(_name: string, _oldValue: string, _newValue: string) { }

  connectedCallback(): void {
    this.setAttribute("form-role", "field");
    this.emitInject("form-context-request", this.formInject);
    this.emitInject("form-item-context-request", this.formItemInject);
    super.connectedCallback();
    this._signalStop = effect(() => {
      const itemInject = this.formItemContext ? this.formItemContext() : null;
      const formInject = this.formContext ? this.formContext() : null;
      // name
      if (!this.name && itemInject && itemInject.prop) {
        this.setAttribute("name", itemInject.prop);
      }
      // inner-block
      const innerBlockAttr = getAttr(this, "inner-block");
      if (!innerBlockAttr) {
        const inhertInnerBlock = itemInject?.innerBlock || formInject?.innerBlock;
        if (inhertInnerBlock != null) {
          this.innerBlockChange(inhertInnerBlock);
        }
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._signalStop) {
      this._signalStop();
      this._signalStop = undefined;
    }
  }

  public isDisabled() {
    return this.disabled;
  }

  public getName() {
    return this.name;
  }


  protected disabledChange() { }
  protected innerBlockChange(innerBlock: boolean) { }

  public formInject = (context: Signal<FormSignal>) => {
    this.formContext = context;
  }

  public formItemInject = (context: Signal<FormItemSignal>) => {
    this.formItemContext = context;
  }

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
