import { formatClass, formatStyle, $one, on, off } from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
import Validator from "ph-utils/validator";
//@ts-ignore
import css from "./index.less?inline";
import { signal } from "alien-signals";
import ContextProvide from "../utils/context_provide";
import type { FormSignal } from "./types";

export default class Form extends ContextProvide<FormSignal> {
  public static baseName = "form";
  /** 是否行内表单 */
  public inline = false;
  public labelPosition?: "left" | "right" | "top" = "right";
  public labelWidth?: string = "80px";
  public validator: Validator;
  public novalidate = false;
  private _data?: Record<string, any>;

  constructor() {
    super();
    this.validator = new Validator([]);
    this.contextEventName = 'form-context-request';
    this.context = signal({ innerBlock: false });
  }

  static get observedAttributes() {
    return ["label-position", "inner-block"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === "label-position") {
      const $form = $one("form", this.root);
      if ($form) {
        $form.className = formatClass([
          "l-form",
          this.inline ? "l-form-inline" : undefined,
          `l-form--${newValue}`,
        ]);
      }
    }
    switch (name) {
      case "label-position":
        const $form = $one("form", this.root);
        if ($form) {
          $form.className = formatClass([
            "l-form",
            this.inline ? "l-form-inline" : undefined,
            `l-form--${newValue}`,
          ]);
        }
        break;

      case "inner-block":
        const isBlock = parseAttrValue(newValue, false, name);
        this.context({ innerBlock: isBlock });
        break;
    }
  }

  connectedCallback(): void {
    initAttr(this);
    this.setAttribute("form-role", "form");
    this.loadStyleText([css]);
    super.connectedCallback();
  }

  afterInit(): void {
    on(this, "form-rule-change", this.ruleChange);
  }

  disconnectedCallback(): void {
    this.validator = undefined as any;
    off(this, "form-rule-change", this.ruleChange);
    super.disconnectedCallback();
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

  public ruleChange = (e: CustomEvent) => {
    e.stopPropagation();
    this.validator.addSchema(e.detail);
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
          // emit(this.id, "validateChange", true, name);
        })
        .catch((err) => {
          // emit(this.id, "validateChange", err.detail, name);
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
        for (let i = 0, len = results.length; i < len; i++) {
          const result = results[i];
          if (result.status === "rejected") {
            // emit(this.id, "validateChange", result.reason.detail, result.reason.key);
          } else {
            // emit(this.id, "validateChange", true, result.value.key);
          }
        }
      });
    }
  }

  public clearValidate() {
    // emit(this.id, "validateChange", true);
  }

  public reset() {
    this.clearValidate();
    // emit(this.id, "reset");
  }

  public submit() {
    if (this.novalidate) {
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
    if (this._data != null) {
      try {
        await this.validator.validate(this._data);
        // emit(this.id, "validateChange", true);
        return Promise.resolve(true);
      } catch (err: any) {
        // emit(this.id, "validateChange", err.detail);
        return Promise.resolve(false);
      }
    }
    return Promise.resolve(true);
  }

  public getData() {
    return { ...this._data };
  }
}
