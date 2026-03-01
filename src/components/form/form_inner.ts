import BaseComponent from "../base";
import { parseAttrValue, stopSignal } from "../utils";
import { getAttr } from "ph-utils/dom";
import type { FormItemSignal, FormSignal } from "./types";
import { effect } from "alien-signals";

export default class FormInner<T = Record<string, any>> extends BaseComponent<T> {
  public disabled = false;
  public _value: any = undefined;
  public _resetValue?: any; // 重置值(即初始化值)
  protected _firstPushValue = true; // 初始化时是否推送数据到 Form
  private _isReset = false; // 是否是重置, 重置时不触发数据校验
  private _name?: string;
  public formContext?: Signal<FormSignal>;
  public formItemContext?: Signal<FormItemSignal>;
  public formErrors?: Signal<Record<string, string>>; // 表单验证错误
  resetCtx?: Signal<number>;
  private _signalStop?: SignalStop;
  private _errorSignalStop?: SignalStop;
  private _resetSignalStop?: SignalStop;

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
    if (this._resetValue == null) {
      this._resetValue = value;
    }
    this.pushValueChange();
  }

  public getValue() {
    return this._value;
  }

  static get observedAttributes() {
    return ["disabled", "value", "name", "inner-block"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "value":
      case "name":
        this[name] = newValue;
        break;
      case "disabled":
        this.disabled = parseAttrValue(newValue, false, name);
        break;
      case "inner-block":
        const innerBlock = parseAttrValue(newValue, false, name);
        this.innerBlockChange(innerBlock);
        break;
      default:
        this.attributeChange(name, oldValue, newValue);
        break;
    }
  }

  protected attributeChange(_name: string, _oldValue: string, _newValue: string) {}

  connectedCallback(): void {
    this.emitInject("form-context-request", this.formInject as any);
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
    if (this._value == null) {
      this._resetValue = "";
      if (this._firstPushValue) {
        // 没有初始值，证明没有设置初始值，那要提交一次给表单
        this.pushValueChange();
      }
    }

    this._errorSignalStop = effect(() => {
      if (!this.name) return;
      const errors = this.formErrors ? this.formErrors() : {};
      const errorMsg = errors[this.name];
      this.validResult(errorMsg);
      // const keys = Object.keys(result);
      // if (keys[0] === thisName) {
      //   this.focus();
      // }
    });

    this._resetSignalStop = effect(() => {
      const resetValue = this.resetCtx ? this.resetCtx() : 0;
      if (resetValue > 0) {
        this.reset();
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._signalStop = stopSignal(this._signalStop);
    this._errorSignalStop = stopSignal(this._errorSignalStop);
    this._resetSignalStop = stopSignal(this._resetSignalStop);
  }

  public isDisabled() {
    return this.disabled;
  }

  public getName() {
    return this.name;
  }

  protected disabledChange() {}
  protected innerBlockChange(_innerBlock: boolean) {}
  protected validResult(_msg?: string) {}

  public formInject = (
    context: Signal<FormSignal>,
    errors: Signal<Record<string, string>>,
    reset: Signal<number>,
  ) => {
    this.formContext = context;
    this.formErrors = errors;
    this.resetCtx = reset;
  };

  public formItemInject = (context: Signal<FormItemSignal>) => {
    this.formItemContext = context;
  };

  protected pushValueChange() {
    if (this.name) {
      this.emit("form-value-change", {
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
    console.log("reset");
  }
}