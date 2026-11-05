import { $one, addClass, removeClass, $$ } from "utilane/browser";
import { kebabToCamel, unitNumberStr } from "../utils";
import type { RuleType, SchemaType } from "utilane";
import formItemSheet from "./form_item_style";
import BaseComponent from "../base";
import {
  createFormContextProvider,
  FORM_CONTEXT_EVENTS,
  provideFormContext,
  readFormBooleanAttribute,
  requestFormContext,
} from "./context";
import type { FormContextField, FormFieldValidity } from "./context";

type FormItemState = {
  /** 标签文本 */
  label?: string;
  labelPosition: "left" | "right" | "top";
  /** 显式错误；undefined 表示使用校验错误，空字符串表示显式隐藏。 */
  error?: string;
  innerBlock?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** 内置验证规则 */
  verify?: string;
  /** 正则表达式 */
  pattern?: string;
  /** 验证消息 */
  validity?: string;
  prop?: string;
  labelWidth?: string;
  labelHeight?: string;
};

export default class FormItem extends BaseComponent<FormItemState> {
  public static baseName = "form-item";

  private readonly itemContext = createFormContextProvider();
  private disposeContext?: () => void;
  private unregisterForm?: () => void;
  private validationError?: string;
  private readonly formField: FormContextField = {
    target: this,
    getSnapshot: () => ({ name: this._state.prop, value: undefined }),
  };

  constructor() {
    super();
    this.version = 2;
    this._state = { labelPosition: "right" };
  }

  static get observedAttributes() {
    return [
      "error",
      "label",
      "required",
      "disabled",
      "inner-block",
      "prop",
      "label-position",
      "verify",
      "pattern",
      "validity",
      "label-width",
      "label-height",
    ];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string | null): void {
    switch (name) {
      case "error":
      case "label":
      case "verify":
      case "pattern":
      case "validity":
        this._state[name] = newValue ?? undefined;
        break;
      case "label-position":
        this._state.labelPosition = newValue === "left" || newValue === "top" ? newValue : "right";
        break;
      case "inner-block":
        this._state.innerBlock = readFormBooleanAttribute(newValue);
        break;
      case "required":
      case "disabled":
        this._state[name] = readFormBooleanAttribute(newValue);
        break;
      case "prop":
        this._state.prop = newValue ?? undefined;
        // 不让旧字段的校验错误泄漏到新名称；显式 error 不受影响。
        this.validationError = undefined;
        if (this.rendered) {
          this.registerForm();
          this._updateError();
        }
        break;
      case "label-width":
      case "label-height":
        this._state[kebabToCamel(name) as "labelWidth"] = newValue
          ? (unitNumberStr(newValue) as string)
          : undefined;
        break;
    }
    if (["prop", "inner-block", "required", "disabled"].includes(name)) {
      this.updateContext();
    }
    if (this.rendered && ["prop", "required", "verify", "pattern", "validity"].includes(name)) {
      this._parseSchema();
    }
  }

  private updateContext(): void {
    const { prop, innerBlock, required, disabled } = this._state;
    this.itemContext.updateConfiguration({ prop, innerBlock, required, disabled });
  }

  private registerForm = (): void => {
    this.unregisterForm?.();
    this.unregisterForm = requestFormContext(this, "form")?.registerField(this.formField);
  };

  private receiveValidity = (event: Event): void => {
    if (event.target !== this) return;
    const { valid, message } = (event as CustomEvent<FormFieldValidity>).detail;
    this.validationError = valid ? undefined : message;
    this._updateError();
  };

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("required")) this._updateRequired();
    if (changedProps.has("label")) this._updateLabel();
    if (changedProps.has("error")) this._updateError();
    if (changedProps.has("label-position")) this.updateLabelPosition();
    for (const name of ["label-width", "label-height"] as const) {
      if (!changedProps.has(name)) continue;
      const value = this._state[name === "label-width" ? "labelWidth" : "labelHeight"];
      if (value) this.style.setProperty(`--l-form-${name}`, value);
      else this.style.removeProperty(`--l-form-${name}`);
    }
  }

  afterInit(): void {
    this.updateContext();
    this.disposeContext = provideFormContext(this, "item", this.itemContext);
    // 先定义的字段可能已挂载；提供者延迟升级时主动重关联，不依赖 DOM 变更。
    for (const child of this.querySelectorAll<HTMLElement>("*")) {
      const consumer = child as HTMLElement & { refreshFormContext?: () => void };
      consumer.refreshFormContext?.();
    }
    this.addEventListener(FORM_CONTEXT_EVENTS.validity, this.receiveValidity);
    this.addEventListener(FORM_CONTEXT_EVENTS.configuration, this.registerForm);
    this.registerForm();
    this._updateRequired();
    this._updateError();
    this._parseSchema();
  }

  beforeDestroy(): void {
    this.removeEventListener(FORM_CONTEXT_EVENTS.validity, this.receiveValidity);
    this.removeEventListener(FORM_CONTEXT_EVENTS.configuration, this.registerForm);
    this.unregisterForm?.();
    this.unregisterForm = undefined;
    this.disposeContext?.();
    this.disposeContext = undefined;
    this.itemContext.dispose();
    this.validationError = undefined;
  }

  public setRules(rules: { required?: boolean; rules?: RuleType[]; message?: string }) {
    const prop = this._state.prop;
    if (prop) this._updateRules({ ...rules, key: prop });
  }

  render_v2() {
    return { template: this.render(), styleSheets: [formItemSheet] };
  }

  private get errorMessage(): string | undefined {
    return this._state.error ?? this.validationError;
  }

  private updateLabelPosition(): void {
    for (const position of ["left", "right", "top"]) {
      this.classList.toggle(`l-form-item--${position}`, position === this._state.labelPosition);
    }
  }

  public render() {
    this.updateLabelPosition();
    const fragment = document.createDocumentFragment();
    if (this._state.label != null) {
      fragment.appendChild(
        $$("label", { class: "l-form-item__label", textContent: this._state.label }),
      );
    }
    const $content = $$("div", { class: "l-form-item__content" });
    $content.appendChild($$("slot"));
    if (this.errorMessage) {
      $content.appendChild(
        $$("div", { class: "l-form-item__error", textContent: this.errorMessage }),
      );
    }
    fragment.appendChild($content);
    return fragment;
  }

  private _updateRequired() {
    if (this._state.required) addClass(this, "is-required");
    else removeClass(this, "is-required");
  }

  private _parseSchema() {
    const prop = this._state.prop;
    if (prop) {
      const rules: RuleType[] = this._state.verify ? this._state.verify.split("|") : [];
      if (this._state.pattern) rules.push(new RegExp(this._state.pattern));
      this._updateRules({
        key: prop,
        required: this._state.required,
        message: this._state.validity,
        rules,
      });
    }
  }

  private _updateError() {
    const message = this.errorMessage;
    if (message) addClass(this, "is-error");
    else removeClass(this, "is-error");
    if (!this.rendered) return;
    let $error = $one(".l-form-item__error", this.root);
    if ($error) {
      if (message) $error.textContent = message;
      else $error.remove();
    } else if (message) {
      $error = document.createElement("div");
      $error.className = "l-form-item__error";
      $error.textContent = message;
      $one(".l-form-item__content", this.root)?.appendChild($error);
    }
  }

  private _updateLabel() {
    if (!this.rendered) return;
    let $label = $one(".l-form-item__label", this.root);
    if ($label == null) {
      if (this._state.label != null) {
        $label = document.createElement("label");
        $label.className = "l-form-item__label";
        $label.textContent = this._state.label;
        this.root.prepend($label);
      }
    } else if (this._state.label != null) {
      $label.textContent = this._state.label;
    } else {
      $label.remove();
    }
  }

  private _updateRules(schema: SchemaType) {
    this.emit("form-rule-change", { bubbles: true, composed: true, detail: schema });
  }
}