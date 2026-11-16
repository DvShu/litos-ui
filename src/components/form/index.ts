import { formatClass, $one, on, off } from "utilane/browser";
import { kebabToCamel, parseAttrValue, unitNumberStr } from "../utils";
import { Validator } from "utilane";
import type { SchemaType } from "utilane";
import formSheet from "./style";
import BaseComponent from "../base";
import FormInner from "./form_inner";
import { FormOwner } from "./owner";
import { createFormContextProvider, provideFormContext, type FormContextField } from "./context";

type SchemaUpdate = ReturnType<Validator["setSchema"]>;

// 名为 elements 的控件可能遮蔽 form.elements。
const getFormElements: (this: HTMLFormElement) => HTMLFormControlsCollection =
  Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, "elements")!.get!;

class FormValidator extends Validator {
  // Validator 在构造时调用 setSchemas，由该方法初始化索引。
  declare private dependentsBySource: Map<string, Set<string>>;

  override setSchemas(schemas: SchemaType[]): SchemaUpdate[] {
    this.dependentsBySource = new Map();
    let updates: SchemaUpdate[];
    try {
      updates = super.setSchemas(schemas);
    } catch (error) {
      // 批量解析失败时，Validator 可能已写入前面的规则。
      for (const [key, rules] of Object.entries(this.rules)) this.indexDependencies({ key, rules });
      throw error;
    }

    const latestByKey = new Map(updates.map((update) => [update.key, update]));
    for (const update of latestByKey.values()) this.indexDependencies(update);
    return updates;
  }

  override setSchema(schema: SchemaType): SchemaUpdate {
    const previous = Object.hasOwn(this.rules, schema.key) ? this.rules[schema.key] : [];
    const update = super.setSchema(schema);
    this.removeDependencies(update.key, previous);
    this.indexDependencies(update);
    return update;
  }

  // Validator.addSchemas 逐条调用 addSchema，批量追加也会更新索引。
  override addSchema(schema: SchemaType): SchemaUpdate {
    const update = super.addSchema(schema);
    this.indexDependencies(update);
    return update;
  }

  override removeSchema(key: string): void {
    const previous = Object.hasOwn(this.rules, key) ? this.rules[key] : [];
    super.removeSchema(key);
    this.removeDependencies(key, previous);
  }

  private indexDependencies({ key, rules }: SchemaUpdate): void {
    for (const { sameKey } of rules) {
      if (sameKey === undefined || sameKey === key) continue;
      let fields = this.dependentsBySource.get(sameKey);
      if (!fields) {
        fields = new Set();
        this.dependentsBySource.set(sameKey, fields);
      }
      fields.add(key);
    }
  }

  private removeDependencies(key: string, rules: SchemaUpdate["rules"]): void {
    for (const { sameKey } of rules) {
      if (sameKey === undefined) continue;
      const fields = this.dependentsBySource.get(sameKey);
      fields?.delete(key);
      if (fields?.size === 0) this.dependentsBySource.delete(sameKey);
    }
  }

  getInputValidationFields(name: string): string[] {
    const names = [...(this.dependentsBySource.get(name) ?? [])];
    if (Object.hasOwn(this.rules, name)) names.unshift(name);
    return names;
  }
}

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
  private errorMessages: Record<string, string | undefined> = Object.create(null);
  private readonly nativeOwner = new FormOwner(this, () => [
    ...this.fields(),
    ...this.querySelectorAll<HTMLElement>("button, l-button"),
  ]);
  private readonly fieldContext = createFormContextProvider();
  private readonly locallyClearedFields = new Set<FormContextField>();
  private disposeContext?: () => void;
  private readonly provider = {
    getSnapshot: () => this.fieldContext.getSnapshot(),
    registerField: (field: FormContextField) => {
      if (field.target instanceof FormInner) this.nativeOwner.scheduleRefresh();
      const unregister = this.fieldContext.registerField(field, () => this.notifyFieldError(field));
      this.fieldContext.updateFieldName(field, this.fieldName(field));
      return () => {
        if (unregister()) this.locallyClearedFields.delete(field);
      };
    },
    fieldNameChanged: (field: FormContextField, name: string | undefined) => {
      if (this.fieldContext.updateFieldName(field, name)) this.notifyFieldError(field, name);
    },
    fieldValidityCleared: (field: FormContextField) => {
      const name = this.fieldName(field);
      if (name && this.errorMessages[name]) this.locallyClearedFields.add(field);
    },
    validateInput: ({ target }: FormContextField) => {
      if (target instanceof FormInner) this.validateInput(target);
    },
  };
  private listeningForm?: HTMLFormElement;

  /** 当前原生表单；独立 l-form 使用辅助 form，已有原生祖先时复用。 */
  public get nativeForm(): HTMLFormElement | undefined {
    this.nativeOwner.refreshPending();
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
    this.validator = new FormValidator([]);
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
  }

  disconnectedCallback(): void {
    this.disposeContext?.();
    this.disposeContext = undefined;
    this.fieldContext.dispose();
    this.locallyClearedFields.clear();
    this.listeningForm?.removeEventListener("submit", this.nativeSubmit);
    this.listeningForm?.removeEventListener("reset", this.nativeReset);
    this.listeningForm = undefined;
    this.nativeOwner.stop();
    off(this, "form-rule-change", this.ruleChange);

    super.disconnectedCallback();
  }

  render_v2() {
    return {
      styleSheets: [formSheet],
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

  private validateInput(field: FormInner): void {
    const name = field.name;
    if (this._state.novalidate || !name) return;

    const validator = this.validator;
    // 外部替换的 Validator 实例没有索引，仍可通过规则表发现依赖。
    const names =
      validator instanceof FormValidator
        ? validator.getInputValidationFields(name)
        : Object.entries(validator.rules).flatMap(([key, rules]) =>
            key === name || rules.some((rule) => rule.sameKey === name) ? [key] : [],
          );
    if (names.length === 0) return;

    const form = this.nativeForm;
    if (!form || field.form !== form || !this.isDataField(field)) return;
    const elements = getFormElements.call(form);
    const data =
      validator instanceof FormValidator
        ? this.collectInputData(elements, name, names, validator)
        : this.collectData(elements);
    if (!Object.hasOwn(data, name)) return;

    const errors: Record<string, string | undefined> = {};
    for (const key of names) {
      try {
        validator.validateKey(key, data[key], data);
        errors[key] = undefined;
      } catch (error) {
        const message = (error as { detail?: Record<string, string> } | null)?.detail?.[key];
        if (message === undefined) throw error;
        errors[key] = message;
      }
    }

    if (this._state.emitError) {
      this.setValidateErrors(errors, names);
      return;
    }

    const changed = new Set<string>();
    for (const key of names) {
      const message = errors[key];
      if ((this.errorMessages[key] || undefined) !== (message || undefined)) changed.add(key);
      if (message === undefined) delete this.errorMessages[key];
      else this.errorMessages[key] = message;
    }
    for (const key of names) {
      if (changed.has(key)) {
        this.notifyErrorChange(key);
      } else if (this.locallyClearedFields.size) {
        this.notifyErrorChange(key, true);
      }
    }
  }

  private isDataField(field: Node | null): field is FormInner {
    return field instanceof FormInner && !field.grouped && field.closest("l-form") === this;
  }

  private findDataField(elements: HTMLFormControlsCollection, name: string): FormInner | undefined {
    const match = elements.namedItem(name);
    if (match instanceof Element) {
      return this.isDataField(match) && match.name === name ? match : undefined;
    }
    if (!match) return;

    // 与整表取值一致，同名字段以 DOM 顺序中最后一个为准。
    for (let index = match.length - 1; index >= 0; index--) {
      const field = match.item(index);
      if (this.isDataField(field) && field.name === name) return field;
    }
  }

  private collectInputData(
    elements: HTMLFormControlsCollection,
    name: string,
    names: string[],
    validator: FormValidator,
  ): Record<string, any> {
    const keys = new Set([name, ...names]);
    for (const key of names) {
      for (const { sameKey } of validator.rules[key] ?? []) {
        if (sameKey !== undefined) keys.add(sameKey);
      }
    }

    const data: Record<string, any> = {};
    for (const key of keys) {
      const field = this.findDataField(elements, key);
      if (field) data[key] = field.getValue();
    }
    return data;
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
          this.clearValidate();
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
      // Validator 默认遇到首个字段错误即停止；整表校验需收集所有字段错误。
      this.validator.validate(this.getData(), true);
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
    const form = this.nativeForm;
    return form ? this.collectData(getFormElements.call(form)) : {};
  }

  private collectData(elements: HTMLFormControlsCollection): Record<string, any> {
    const data: Record<string, any> = {};
    for (const field of Array.from(elements)) {
      if (this.isDataField(field) && field.name) data[field.name] = field.getValue();
    }
    return data;
  }

  private fieldName(field: FormContextField): string | undefined {
    return field.target instanceof FormInner ? field.target.name : field.getSnapshot().name;
  }

  private notifyFieldError(field: FormContextField, name = this.fieldName(field)): void {
    if (field.target instanceof FormInner && !field.target.rendered) return;
    this.locallyClearedFields.delete(field);
    const message = name ? this.errorMessages[name] || undefined : undefined;
    this.fieldContext.notifyValidity(field, { valid: !message, message });
  }

  private notifyErrorChange(name: string, onlyLocallyCleared = false): void {
    for (const field of this.fieldContext.getFieldsByName(name)) {
      if (onlyLocallyCleared && !this.locallyClearedFields.has(field)) continue;
      if (this.fieldName(field) === name) this.notifyFieldError(field, name);
    }
  }

  public setErrors(errorObj: Record<string, any>) {
    const previous = this.errorMessages;
    const next: typeof previous = Object.assign(Object.create(null), errorObj);
    this.errorMessages = next;
    for (const name of new Set([...Object.keys(previous), ...Object.keys(next)])) {
      if ((previous[name] || undefined) !== (next[name] || undefined)) this.notifyErrorChange(name);
    }
    // 通知回调可能再次重置字段，只处理本轮已有的记录。
    const locallyCleared = [...this.locallyClearedFields];
    for (const field of locallyCleared) {
      if (this.locallyClearedFields.has(field)) this.notifyFieldError(field);
    }
  }
}