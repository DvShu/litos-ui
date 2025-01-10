import { formatClass, formatStyle, $one } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../utils";
import { random } from "ph-utils";
import { emit, add, clear } from "./form_events";
import type { SchemaType } from "ph-utils/validator";
import Validator from "ph-utils/validator";
//@ts-ignore
import css from "./index.less?inline";

export default class Form extends BaseComponent {
  public static baseName = "form";
  /** 是否行内表单 */
  public inline = false;
  public labelPosition?: "left" | "right" | "top" = "right";
  public labelWidth?: string;
  public id: string;
  public disabled: boolean = false;
  public sharedAttrs: string[] = ["disabled", "id", "innerBlock"];
  public validator: Validator;
  public innerBlock = false;
  public novalidate = false;
  private _data?: Record<string, any>;
  private emit: CustomEvent;

  constructor() {
    super();
    initAttr(this);
    //@ts-ignore
    if (this.id == null) {
      this.id = `l-f${random(3)}-${random(6)}`;
    }
    this.validator = new Validator([]);
    this.emit = new CustomEvent("submit");
  }

  static get observedAttributes() {
    return ["disabled", "label-position"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        emit(this.id, "attributeChanged", name, val, this.id);
        this.disabled = val;
      }
    } else if (name === "label-position") {
      const $form = $one("form", this.root);
      if ($form) {
        $form.className = formatClass([
          "l-form",
          this.inline ? "l-form-inline" : undefined,
          `l-form--${newValue}`,
        ]);
      }
    }
  }

  connectedCallback(): void {
    this.loadStyleText([css]);
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
    return `<form class="${classStr}" style="${styleStr}"><slot></slot></form>`;
  }

  ruleChange = (schema: SchemaType) => {
    this.validator.addSchema(schema);
  };

  _valueChange = (name: string, value: any, valid = true) => {
    if (this._data == null) {
      this._data = {};
    }
    const needValid = Object.hasOwn(this._data, name);
    this._data[name] = value;
    if (!this.novalidate && needValid && valid) {
      this.validator
        .validateKey(name, value, this._data)
        .then(() => {
          emit(this.id, "validateChange", true, name);
        })
        .catch((err) => {
          emit(this.id, "validateChange", err.detail, name);
        });
    }
  };

  public validateField(field: string | string[]) {
    const tacks: Promise<{ key: string; value: any }>[] = [];
    if (this._data != null) {
      if (Array.isArray(field)) {
        for (let i = 0, len = field.length; i < len; i++) {
          const f = field[i];
          tacks.push(this.validator.validateKey(f, this._data[f], this._data));
        }
      } else {
        tacks.push(
          this.validator.validateKey(field, this._data[field], this._data)
        );
      }
      Promise.allSettled(tacks).then((results) => {
        for (let i = 0, len = results.length; i < len; i++) {
          const result = results[i];
          if (result.status === "rejected") {
            emit(
              this.id,
              "validateChange",
              result.reason.detail,
              result.reason.key
            );
          } else {
            emit(this.id, "validateChange", true, result.value.key);
          }
        }
      });
    }
  }

  public clearValidate() {
    emit(this.id, "validateChange", true);
  }

  public reset() {
    this.clearValidate();
    emit(this.id, "reset");
  }

  public submit() {
    if (this.novalidate) {
      this.dispatchEvent(this.emit);
    } else {
      this.validate().then((valid) => {
        if (valid) {
          this.dispatchEvent(this.emit);
        }
      });
    }
  }

  /**
   * 校验全部表单数据
   */
  public async validate() {
    if (this._data != null) {
      try {
        await this.validator.validate(this._data);
        emit(this.id, "validateChange", true);
        return Promise.resolve(true);
      } catch (err: any) {
        emit(this.id, "validateChange", err.detail);
        return Promise.resolve(false);
      }
    }
    return Promise.resolve(true);
  }

  public getData() {
    return { ...this._data };
  }
}
