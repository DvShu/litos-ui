import BaseComponent from "../base";
import type Form from "../form";
import type FormItem from "../form/form_item";
import { parseAttrValue } from "../utils";
import { emit, add, remove } from "../utils/event";
import { getAttr } from "ph-utils/dom";

export default class FormInner extends BaseComponent {
  public disabled = false;
  protected formAttrs: Record<string, any> = {};
  protected formItemAttrs: Record<string, any> = {};
  public _value: any = "";
  public _resetValue?: any;
  protected _firstPushValue = true;
  private _reseting = false;

  /**
   *
   * @param firstPushValue 是否第一次赋值 value 时, 推送数据到 Form, 默认: true
   */
  public constructor(firstPushValue = true) {
    super(true, { delegatesFocus: true });
    this._firstPushValue = firstPushValue;
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
    return ["disabled", "value"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        this.disabled = val;
        this.disabledChange();
      }
    } else if (name === "value") {
      this.value = newValue;
    } else {
      this.attributeChange(name, oldValue, newValue);
    }
  }

  protected attributeChange(
    _name: string,
    _oldValue: string,
    _newValue: string
  ) {}

  connectedCallback(): void {
    const formInfo = this._getForm();
    this.formAttrs = formInfo.formAttr;
    this.formItemAttrs = formInfo.formItemAttr;
    if (this.formAttrs.id) {
      add(this.formAttrs.id, "attributeChanged", this._formAttributeChanged);
      add(this.formAttrs.id, "reset", this._resetFieldValue);
      if (this._firstPushValue) {
        this.pushValueChange();
      }
    }
    if (this.formItemAttrs.id) {
      add(
        this.formItemAttrs.id,
        "attributeChanged",
        this._formAttributeChanged
      );
    }
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    if (this.formAttrs.id) {
      remove(this.formAttrs.id, "attributeChanged", this._formAttributeChanged);
      remove(this.formAttrs.id, "reset", this._resetFieldValue);
    }
    if (this.formItemAttrs.id) {
      remove(
        this.formItemAttrs.id,
        "attributeChanged",
        this._formAttributeChanged
      );
    }
    super.disconnectedCallback();
  }

  public isDisabled() {
    if (this.disabled === true) return true;
    if (this.formItemAttrs.disabled === true) return true;
    return this.formAttrs.disabled || false;
  }

  public getName() {
    const name = getAttr(this, "name");
    if (name) return name;
    return this.formItemAttrs.name;
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

  private _formAttributeChanged = (name: string, value: string, id: string) => {
    if (id === this.formAttrs.formId) {
      this.formAttrs[name] = value;
    } else {
      this.formItemAttrs[name] = value;
    }
    if (name === "disabled") {
      this.disabledChange();
    }
  };

  protected disabledChange() {}

  protected pushValueChange() {
    const name = this.getName();
    if (this.formAttrs.id && name) {
      emit(
        this.formAttrs.id,
        "valueChange",
        name,
        this._value,
        !this._reseting
      );
    }
    this._reseting = false;
  }

  private _resetFieldValue = () => {
    this._reseting = true;
    this.reset();
  };

  public reset() {
    this.value = this._resetValue || "";
  }
}
