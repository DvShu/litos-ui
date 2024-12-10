import { formatClass, formatStyle } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../util";
import { random } from "ph-utils";
import { emit, add, clear } from "./form_events";
import type { SchemaType } from "ph-utils/validator";
import Validator from "ph-utils/validator";

export default class Form extends BaseComponent {
  public static baseName = "form";
  /** 是否行内表单 */
  public inline = false;
  public labelPosition?: "left" | "right" | "top" = "right";
  public labelWidth?: string;
  public id: string;
  public disabled: boolean = false;
  public sharedAttrs: string[] = ["disabled", "id"];
  public validator: Validator;
  private _data?: Record<string, any>;

  constructor() {
    super();
    initAttr(this);
    //@ts-ignore
    if (this.id == null) {
      this.id = `l-f${random(3)}-${random(6)}`;
    }
    this.validator = new Validator([]);
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        emit(this.id, "attributeChanged", name, val, this.id);
        this.disabled = val;
      }
    }
  }

  connectedCallback(): void {
    this.loadStyle(["form"]);
    super.connectedCallback();
    add(this.id, "ruleChange", this.ruleChange);
    add(this.id, "valueChange", this._valueChange);
  }

  disconnectedCallback(): void {
    clear(this.id);
    this.validator = undefined as any;
  }

  render() {
    const classStr = formatClass([
      "l-form",
      this.inline ? "l-form-inline" : undefined,
      `l-form--${this.labelPosition}`,
    ]);
    const styleStr = formatStyle({
      "--l-form-label-width": this.labelWidth ? this.labelWidth : "",
    });
    this.shadow.innerHTML = `<form class="${classStr}" style="${styleStr}"><slot></slot></form>`;
  }

  ruleChange = (schema: SchemaType) => {
    this.validator.addSchema(schema);
  };

  _valueChange = (name: string, value: any) => {
    if (this._data == null) {
      this._data = {};
    }
    const needValid = Object.hasOwn(this._data, name);
    this._data[name] = value;
    if (needValid) {
      this.validator
        .validateKey(name, value, this._data)
        .then((res) => {
          emit(this.id, "validateChange", true, name);
        })
        .catch((err) => {
          emit(this.id, "validateChange", err.detail, name);
        });
    }
  };
}
