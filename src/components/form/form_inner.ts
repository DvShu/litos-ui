import BaseComponent from "../base";
import type Form from "../form";
import type FormItem from "../form/form_item";
import { emit, add, remove } from "./form_events";

export default class FormInner extends BaseComponent {
  public disabled = false;
  public name?: string;
  private formAttrs: Record<string, any> = {};
  private formItemAttrs: Record<string, any> = {};
  public _value?: any;
  public _resetValue?: any;

  set value(value: any) {
    this._value = value;
    if (this.formAttrs.id && this.name) {
      emit(this.formAttrs.id, "valueChange", this.name, this._value);
    }
  }

  get value() {
    return this._value;
  }

  connectedCallback(): void {
    const formInfo = this._getForm();
    this.formAttrs = formInfo.formAttr;
    this.formItemAttrs = formInfo.formItemAttr;
    if (this.formAttrs.id) {
      add(this.formAttrs.id, "attributeChanged", this._formAttributeChanged);
      const name = this._getName();
      if (name) {
        emit(this.formAttrs.id, "valueChange", name, this.formAttrs.id);
      }
    }
    if (this.formItemAttrs.id) {
      add(
        this.formItemAttrs.id,
        "attributeChanged",
        this._formAttributeChanged
      );
    }
    this.render();
  }

  disconnectedCallback(): void {
    remove(this.formAttrs.id, "attributeChanged", this._formAttributeChanged);
    remove(
      this.formItemAttrs.id,
      "attributeChanged",
      this._formAttributeChanged
    );
  }

  private _isDisabled() {
    if (this.formAttrs.disabled === true) return true;
    if (this.formItemAttrs.disabled === true) return true;
    return this.disabled;
  }

  private _getName() {
    if (this.formItemAttrs.name) return this.formItemAttrs.name;
    return this.name;
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
      this._changeDisabled();
    }
  };

  protected _changeDisabled() {}
}
