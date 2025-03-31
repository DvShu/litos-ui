import { formatClass, $one, addClass, removeClass } from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
import BaseComponent from "../base";
import { emit, clear, add, remove } from "../utils/event";
import { random } from "ph-utils";
import type { RuleType } from "ph-utils/validator";
//@ts-ignore
import css from "./form_item.less?inline";

export default class FormItem extends BaseComponent {
  public static baseName = "form-item";
  tagName = "l-form-item";
  public disabled: boolean = false;
  public sharedAttrs: string[] = ["disabled", "id", "name", "innerBlock"];
  /** 是否必须 */
  public required: boolean = false;
  public error?: string;
  /** 标签文本 */
  public label?: string;
  public id: string;
  /** 内置验证规则: required - 必填, same:password - 一般用于验证确认密码和密码, phone - 验证电话号码 */
  public verify?: string;
  /** 验证失败错误信息 */
  public validity?: string;
  /** 自定义验证的正则 */
  public pattern?: string;
  public name?: string;
  public innerBlock = false;
  public labelPosition?: "left" | "right" | "top" = "right";
  private formId?: string;

  public constructor() {
    super();
    initAttr(this);
    //@ts-ignore
    if (this.id == null) {
      this.id = `l-fi${random(3)}-${random(6)}`;
    }
  }

  static get observedAttributes() {
    return ["error", "label", "disabled"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "error") {
      if (newValue != this.error) {
        this.error = newValue;
        this._updateError();
      }
    } else if (name === "label") {
      this.label = newValue;
      this._updateLabel();
    } else if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        emit(this.id, "attributeChanged", name, val, this.id);
        this.disabled = val;
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyleText([css]);
    this.formId = this._getFormId();
    if (this.name && this.formId) {
      let rules: any[] = this.verify?.split("|") || [];
      if (this.pattern) {
        rules.push(new RegExp(this.pattern));
      }
      const schema = {
        key: this.name,
        required: this.required,
        message: this.validity,
        rules: rules,
      };
      emit(this.formId, "ruleChange", schema);
      add(this.formId, "validateChange", this._validateChange);
    }
  }

  disconnectedCallback(): void {
    clear(this.id);
    if (this.formId) {
      remove(this.formId, "validateChange", this._validateChange);
    }
  }

  public setRules(rules: {
    required?: boolean;
    rules?: RuleType[];
    message?: string;
  }) {
    const schema = { ...rules, key: this.name };
    if (schema.required != null && this.required) {
      schema.required = true;
    }
    if (this.formId) {
      emit(this.formId, "ruleChange", schema);
    }
  }

  public setError(error: string) {
    this.error = error;
  }

  public render() {
    const classObj = [
      `l-form-item`,
      this.required ? "is-required" : undefined,
      this.error ? "is-error" : undefined,
      `l-form-item--${this.labelPosition}`,
    ];
    const labelStr =
      this.label != null
        ? `<label class="l-form-item__label">${this.label}</label>`
        : "";
    const errorStr = this.error
      ? `<div class="l-form-item__error">${this.error}</div>`
      : "";
    return [
      `<div class="${formatClass(classObj)}">${labelStr}`,
      '<div class="l-form-item__content">',
      `<slot></slot>${errorStr}</div></div>`,
    ].join("");
  }

  private _validateChange = (
    result: true | Record<string, string>,
    name?: string
  ) => {
    const error = result === true ? undefined : result[this.name as string];
    if (name == null || (name === this.name && this.error != error)) {
      this.error = error;
      this._updateError();
    }
  };

  private _updateError() {
    if (!this.rendered) return;
    let $error = $one(".l-form-item__error", this.root);
    if ($error) {
      if (this.error) {
        $error.textContent = this.error;
      } else {
        $error.remove();
      }
    } else {
      if (this.error) {
        $error = document.createElement("div");
        $error.className = "l-form-item__error";
        $error.textContent = this.error;
        const $parent = $one(".l-form-item__content", this.root);
        if ($parent) {
          $parent.appendChild($error);
        }
      }
    }
    const $root = $one(".l-form-item", this.root);
    if ($root) {
      if (this.error) {
        addClass($root, "is-error");
      } else {
        removeClass($root, "is-error");
      }
    }
  }

  private _updateLabel() {
    if (!this.rendered) return;
    let $label = $one(".l-form-item__label", this.root);
    if ($label == null) {
      if (this.label != null) {
        $label = document.createElement("div");
        $label.className = "l-form-item__label";
        $label.textContent = this.label;
        const $main = $one(".l-form-item", this.root);
        if ($main) {
          $main.appendChild($label);
        }
      }
    } else {
      if (this.label != null) {
        $label.textContent = this.label;
      } else {
        $label.remove();
      }
    }
  }

  private _getFormId() {
    let $parent = this.parentElement;
    let formId: undefined | string = undefined;
    while ($parent != null) {
      const tagName = $parent.tagName;
      if (tagName === "L-FORM") {
        formId = ($parent as any).id;
        break;
      }
      if (tagName === "BODY") break;
      $parent = $parent.parentElement;
    }
    $parent = null;
    return formId;
  }
}
