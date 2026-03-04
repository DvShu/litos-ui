import { formatClass, formatStyle, $one, on, off } from "ph-utils/dom";
import { parseAttrValue, unitNumberStr } from "../utils";
import Validator from "ph-utils/validator";
//@ts-ignore
import css from "./index.less?inline";
import { signal } from "alien-signals";
import type { FormSignal } from "./types";
import BaseComponent from "../base";

interface FormState {
  inline: boolean;
  labelPosition: "left" | "right" | "top";
  labelWidth: string;
  novalidate: boolean;
}

export default class Form extends BaseComponent<FormState> {
  public static baseName = "form";
  public validator: Validator;
  private _data?: Record<string, any>;
  public context: Signal<FormSignal>;
  public errors: Signal<Record<string, string | undefined>>; // 验证错误
  public resetCtx: Signal<number>;

  constructor() {
    super();
    this._state = {
      /** 是否行内表单 */
      inline: false,
      labelPosition: "right",
      labelWidth: "80px",
      novalidate: false,
    };
    this.validator = new Validator([]);
    this.context = signal({ innerBlock: false });
    this.errors = signal({});
    this.resetCtx = signal(0);
  }

  static get observedAttributes() {
    return ["label-position", "inner-block", "inline", "novalidate", "label-width"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "label-position":
        this._state.labelPosition = newValue as "left";
        break;
      case "inner-block":
        const isBlock = parseAttrValue(newValue, false, name);
        this.context({ innerBlock: isBlock });
        break;
      case "label-width":
        this._state.labelWidth = unitNumberStr(newValue) as string;
        break;
      default:
        const value = parseAttrValue(newValue, false, name);
        this._state[name as "inline"] = value;
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("label-position") || changedProps.has("inline")) {
      const $form = $one("form", this.root);
      if ($form) {
        $form.className = formatClass([
          "l-form",
          this._state.inline ? "l-form-inline" : undefined,
          `l-form--${this._state.labelPosition}`,
        ]);
      }
    }
    if (changedProps.has("label-width")) {
      if (this._state.labelWidth) {
        this.style.setProperty('--l-form-label-width', this._state.labelWidth);
      } else {
        this.style.removeProperty('--l-form-label-width');
      }
    }
  }

  connectedCallback(): void {
    on(this, "form-context-request", this._provide);
    this.loadStyleText([css]);
    super.connectedCallback();
  }

  afterInit(): void {
    on(this, "form-rule-change", this.ruleChange);
    on(this, "form-value-change", this._valueChange);
    on(this, "form-action", this._formAction);
  }

  disconnectedCallback(): void {
    this.validator = undefined as any;
    off(this, "form-rule-change", this.ruleChange);
    off(this, "form-value-change", this._valueChange);
    off(this, "form-context-request", this._provide);
    off(this, "form-action", this._formAction);
    super.disconnectedCallback();
  }

  render() {
    const classStr = formatClass([
      "l-form",
      this._state.inline ? "l-form-inline" : undefined,
      `l-form--${this._state.labelPosition}`,
    ]);
    if (this._state.labelWidth) {
      this.style.setProperty('--l-form-label-width', this._state.labelWidth);
    }
    return `<form class="${classStr}"><slot></slot></form>`;
  }

  public ruleChange = (e: CustomEvent) => {
    e.stopPropagation();
    this.validator.addSchema(e.detail);
  };

  private _provide(e: CustomEvent) {
    const { context, callback } = e.detail;
    if (context === "form-context-request") {
      callback(this.context, this.errors, this.resetCtx);
    }
  }

  _formAction = (e: CustomEvent) => {
    if (e.detail === "submit") {
      this.submit();
    } else {
      this.reset();
    }
  };

  _valueChange = (e: CustomEvent) => {
    const { name, value, valid } = e.detail;
    if (!name) return;
    if (this._data == null) {
      this._data = {};
    }
    const needValid = Object.hasOwn(this._data, name);
    this._data[name] = value;
    if (!this._state.novalidate && needValid && valid) {
      this.validator
        .validateKey(name, value, this._data)
        .then(() => {
          const oldValud = this.errors();
          oldValud[name] = undefined;
          this.errors({ ...oldValud });
        })
        .catch((err) => {
          this.errors({ ...this.errors(), ...err.detail });
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
        tacks.push(this.validator.validateKey(field, this._data[field], this._data));
      }

      Promise.allSettled(tacks).then((results) => {
        let validResult: Record<string, any> = {};
        for (let i = 0, len = results.length; i < len; i++) {
          const result = results[i];
          if (result.status === "rejected") {
            validResult = { ...validResult, ...result.reason.detail };
          } else {
            validResult[result.value.key] = undefined;
          }
        }
        this.errors({ ...this.errors(), ...validResult });
      });
    }
  }

  public clearValidate() {
    this.errors({});
  }

  public reset() {
    this.clearValidate();
    const old = this.resetCtx();
    this.resetCtx(old >= 100 ? 1 : old + 1);
  }

  public submit() {
    console.log(this._state.novalidate);
    if (this._state.novalidate) {
      this.dispatchEvent(new CustomEvent("submit", { detail: this.getData() }));
    } else {
      this.validate().then((valid) => {
        if (valid) {
          this.dispatchEvent(new CustomEvent("submit", { detail: this.getData() }));
        }
      });
    }
  }

  /**
   * 校验全部表单数据
   */
  public async validate() {
    try {
      await this.validator.validate(this._data);
      this.errors({});
      return Promise.resolve(true);
    } catch (err: any) {
      this.errors(err.detail);
      return Promise.resolve(false);
    }
  }

  public getData() {
    return { ...this._data };
  }

  public setErrors(errorObj: Record<string, any>) {
    this.errors(errorObj);
  }

}