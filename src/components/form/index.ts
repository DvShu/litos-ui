import { formatClass, $one, on, off } from "utilane/browser";
import { kebabToCamel, parseAttrValue, unitNumberStr } from "../utils";
import { Validator } from "utilane";
import type { SchemaType } from "utilane";
//@ts-ignore
import css from "./index.less?inline";
import BaseComponent from "../base";
import FormInner from "./form_inner";
import { FormOwner } from "./owner";
import { createFormContextProvider, provideFormContext } from "./context";

interface FormState {
  inline: boolean;
  labelPosition: "left" | "right" | "top";
  labelWidth: string;
  labelHeight?: string;
  novalidate: boolean;
  /** 验证错误，不直接处理，而是通过事件上报 */
  emitError: boolean;
}

export default class Form extends BaseComponent<FormState> {
  public static baseName = "form";
  public validator: Validator;
  private errorMessages: Record<string, string | undefined> = {};
  private readonly nativeOwner = new FormOwner(this, () => this.fields());
  private readonly fieldContext = createFormContextProvider();
  private disposeContext?: () => void;
  private readonly provider = {
    getSnapshot: () => this.fieldContext.getSnapshot(),
    registerField: (field: import("./context").FormContextField) => {
      const unregister = this.fieldContext.registerField(field);
      queueMicrotask(() => {
        if (!this.isConnected) return;
        this.nativeOwner.refresh();
        if (this.fieldContext.getFields().includes(field)) {
          const message = this.errorMessages[field.getSnapshot().name ?? ""];
          this.fieldContext.notifyValidity(field, { valid: !message, message });
        }
      });
      return unregister;
    },
  };
  private listeningForm?: HTMLFormElement;

  /** 当前原生表单；独立 l-form 使用辅助 form，已有原生祖先时复用。 */
  public get nativeForm(): HTMLFormElement | undefined {
    this.nativeOwner.refresh();
    return this.nativeOwner.form;
  }

  private fields(): FormInner[] {
    return Array.from(this.querySelectorAll<HTMLElement>("*")).filter(
      (field): field is FormInner => field instanceof FormInner && field.closest("l-form") === this,
    );
  }

  private nativeSubmit = (event: Event) => {
    // 仅拦截原生 form 事件，库 submit 仍由 this.emit 发送。
    if (event.target !== this.listeningForm) return;
    event.preventDefault();
    event.stopPropagation();
    this.submit();
  };

  private nativeReset = (event: Event) => {
    if (event.target !== this.listeningForm) return;
    // 等全部 reset 监听器执行后再判断取消；原生字段回调由浏览器执行。
    queueMicrotask(() => {
      if (event.defaultPrevented || !this.isConnected) return;
      this.clearValidate();
    });
  };

  private listenNativeForm(): void {
    const form = this.nativeForm;
    if (form === this.listeningForm) return;
    this.listeningForm?.removeEventListener("submit", this.nativeSubmit);
    this.listeningForm?.removeEventListener("reset", this.nativeReset);
    this.listeningForm = form;
    form?.addEventListener("submit", this.nativeSubmit);
    form?.addEventListener("reset", this.nativeReset);
  }

  constructor() {
    super();
    this.version = 2;
    this._state = {
      /** 是否行内表单 */
      inline: false,
      labelPosition: "right",
      labelWidth: "80px",
      novalidate: false,
      emitError: false,
    };
    this.validator = new Validator([]);
  }

  static get observedAttributes() {
    return [
      "label-position",
      "inner-block",
      "inline",
      "novalidate",
      "label-width",
      "label-height",
      "emit-error",
      "disabled",
    ];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "label-position":
        this._state.labelPosition = newValue as "left";
        break;
      case "inner-block":
        const isBlock = parseAttrValue(newValue, false, name);
        this.fieldContext.updateConfiguration({
          innerBlock: isBlock,
          disabled: parseAttrValue(this.getAttribute("disabled") ?? "", false, "disabled"),
        });
        break;
      case "disabled":
        this.fieldContext.updateConfiguration({
          innerBlock: parseAttrValue(this.getAttribute("inner-block") ?? "", false, "inner-block"),
          disabled: parseAttrValue(newValue, false, name),
        });
        break;
      case "label-width":
      case "label-height":
        this._state[kebabToCamel(name) as "labelHeight"] = unitNumberStr(newValue) as string;
        break;

      default:
        const value = parseAttrValue(newValue, false, name);
        this._state[kebabToCamel(name) as "inline"] = value;
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("label-position") || changedProps.has("inline")) {
      const $form = $one(".l-form", this.root);
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
        this.style.setProperty("--l-form-label-width", this._state.labelWidth);
      } else {
        this.style.removeProperty("--l-form-label-width");
      }
    }
    if (changedProps.has("label-height")) {
      if (this._state.labelHeight) {
        this.style.setProperty("--l-form-label-height", this._state.labelHeight);
      } else {
        this.style.removeProperty("--l-form-label-height");
      }
    }
  }

  connectedCallback(): void {
    this.disposeContext = provideFormContext(this, "form", this.provider);
    super.connectedCallback();
    this.nativeOwner.start();
    this.listenNativeForm();
    for (const field of this.fields()) field.refreshFormContext();
  }

  afterInit(): void {
    on(this, "form-rule-change", this.ruleChange);
    on(this, "form-value-change", this._valueChange);
    on(this, "form-action", this._formAction);
  }

  disconnectedCallback(): void {
    this.disposeContext?.();
    this.disposeContext = undefined;
    this.fieldContext.dispose();
    this.listeningForm?.removeEventListener("submit", this.nativeSubmit);
    this.listeningForm?.removeEventListener("reset", this.nativeReset);
    this.listeningForm = undefined;
    this.nativeOwner.stop();
    off(this, "form-rule-change", this.ruleChange);
    off(this, "form-value-change", this._valueChange);

    off(this, "form-action", this._formAction);
    super.disconnectedCallback();
  }

  render_v2() {
    return {
      style: [css],
      template: this.render(),
    };
  }

  render() {
    const classStr = formatClass([
      "l-form",
      this._state.inline ? "l-form-inline" : undefined,
      `l-form--${this._state.labelPosition}`,
    ]);
    if (this._state.labelWidth) {
      this.style.setProperty("--l-form-label-width", this._state.labelWidth);
    }
    return `<div class="${classStr}"><slot></slot></div>`;
  }

  public ruleChange = (e: CustomEvent) => {
    e.stopPropagation();
    this.validator.setSchema(e.detail);
  };

  public addSchemas(schemas: SchemaType[]) {
    this.validator.addSchemas(schemas);
  }

  public setSchemas(schemas: SchemaType[]) {
    this.validator.setSchemas(schemas);
  }

  public setSchema(schema: SchemaType) {
    this.validator.setSchema(schema);
  }

  public addSchema(schema: SchemaType) {
    this.validator.addSchema(schema);
  }

  _formAction = (e: CustomEvent) => {
    e.stopPropagation();
    if (e.detail === "submit") {
      this.submit();
    } else {
      this.reset();
    }
  };

  _valueChange = (e: CustomEvent) => {
    e.stopPropagation();
    const { name, valid } = e.detail;
    if (name && valid && this.errorMessages[name])
      this.setErrors({ ...this.errorMessages, [name]: undefined });
  };

  public setValidateErrors(
    errs: Record<string, string | undefined>,
    all: string | string[] | boolean = true,
  ) {
    if (this._state.emitError) {
      this.emit("validate-error", {
        detail: { errors: errs, all },
      });
    } else {
      this.setErrors(errs);
    }
  }

  public async validateField(field: string | string[]) {
    const names = Array.isArray(field) ? field : [field];
    const result = await this.validate();
    const errors = Object.fromEntries(
      names.map((name) => [name, (result.errors as Record<string, string>)[name]]),
    );
    this.setErrors({ ...this.errorMessages, ...errors });
    if (Object.values(errors).some(Boolean)) {
      const error = new Error("validate field error") as Error & { detail: typeof errors };
      error.detail = errors;
      throw error;
    }
  }

  /** 当前错误快照；普通数据，不再暴露 signal 调用接口。 */
  public get validationErrors(): Readonly<Record<string, string | undefined>> {
    return { ...this.errorMessages };
  }

  public clearValidate() {
    this.setErrors({});
  }

  public reset() {
    this.listenNativeForm();
    this.listeningForm?.reset();
  }

  public submit() {
    if (this._state.novalidate) {
      this.emit("submit", { detail: this.getData() });
    } else {
      this.validate().then((valid) => {
        if (valid.result) {
          this.emit("submit", { detail: this.getData() });
        } else {
          if (this._state.emitError) {
            this.emit("validate-error", {
              detail: {
                errors: valid.errors,
                all: true,
              },
            });
          } else {
            this.setErrors(valid.errors);
          }
        }
      });
    }
  }

  /**
   * 校验全部表单数据
   */
  public validate() {
    try {
      this.validator.validate(this.getData());
      return Promise.resolve({
        result: true,
        errors: {},
      });
    } catch (err: any) {
      return Promise.resolve({
        result: false,
        errors: err.detail,
      });
    }
  }

  public getData() {
    const data: Record<string, any> = {};
    for (const field of this.fields()) {
      if (!field.grouped && field.name && field.form === this.nativeForm)
        data[field.name] = field.getValue();
    }
    return data;
  }

  public setErrors(errorObj: Record<string, any>) {
    this.errorMessages = { ...errorObj };
    for (const field of this.fieldContext.getFields()) {
      const name = field.getSnapshot().name;
      const message = name ? this.errorMessages[name] : undefined;
      this.fieldContext.notifyValidity(field, { valid: !message, message });
    }
  }
}