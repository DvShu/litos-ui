import { formatClass, $one, on, off } from "utilane/browser";
import { kebabToCamel, parseAttrValue, unitNumberStr } from "../utils";
import { Validator } from "utilane";
import type { SchemaType } from "utilane";
import formSheet from "./style";
import BaseComponent from "../base";
import FormInner from "./form_inner";
import FormItem from "./form_item";
import { FormOwner, listenFormSubmit } from "./owner";
import { FormAutocomplete, normalizeFormAutocomplete } from "./autocomplete";
import {
  createFormContextProvider,
  FORM_CONTEXT_EVENTS,
  provideFormContext,
  type FormContextField,
  type NativeFieldValidity,
} from "./context";

type SchemaUpdate = ReturnType<Validator["setSchema"]>;
type ValidatorRule = Validator["rules"][string][number];
type DataField = FormInner | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type NativeFeedback = {
  name?: string;
  item?: FormItem;
  message?: string;
  revision: number;
  fromInvalid: boolean;
};
const selectionPresent = () => true;
const selectionMissing = () => false;
const checkedPredicates = new WeakSet<(value: any) => boolean>([
  selectionPresent,
  selectionMissing,
]);

function readDataValue(field: DataField): unknown {
  if (field instanceof FormInner) return field.valueSnapshot;
  if (field instanceof HTMLInputElement) {
    if (field.type === "checkbox") return field.checked;
    if (field.type === "file") {
      return field.multiple ? Array.from(field.files ?? []) : (field.files?.item(0) ?? null);
    }
  }
  if (field instanceof HTMLSelectElement && field.multiple) {
    return Array.from(field.selectedOptions, ({ value }) => value);
  }
  return field.value;
}

function rulesFor(validator: Validator, key: string): ValidatorRule[] {
  return Object.hasOwn(validator.rules, key) ? validator.rules[key] : [];
}

function requireSynchronousRules(rules: readonly ValidatorRule[]): void {
  for (const rule of rules) {
    const predicate = rule.rule;
    if (typeof predicate !== "function" || checkedPredicates.has(predicate)) continue;
    const checked = function (this: ValidatorRule, value: any): boolean {
      const result: unknown = predicate.call(this, value);
      if (result && typeof (result as PromiseLike<unknown>).then === "function") {
        // The rule has already started. Consume its rejection and fail this validation now.
        void Promise.resolve(result).catch(() => {});
        throw new TypeError("校验规则必须同步返回布尔值，不支持 Promise。");
      }
      return Boolean(result);
    };
    checkedPredicates.add(checked);
    rule.rule = checked;
  }
}

function isRequiredRule({ rule }: ValidatorRule): boolean {
  return rule === "required" || rule === selectionPresent || rule === selectionMissing;
}

function validateKey(
  validator: Validator,
  key: string,
  data: Record<string, any>,
  rules: readonly ValidatorRule[],
  selection?: boolean,
): void {
  requireSynchronousRules(rules);
  const required =
    selection === undefined ? "required" : selection ? selectionPresent : selectionMissing;
  const replaced = new Map<ValidatorRule, ValidatorRule["rule"]>();
  try {
    // Substitute only the required rule so custom validators still receive the original value.
    for (const item of rules) {
      if (!isRequiredRule(item) || item.rule === required) continue;
      replaced.set(item, item.rule);
      item.rule = required;
    }
    validator.validateKey(key, data[key], data);
  } finally {
    for (const [item, original] of replaced) {
      if (item.rule === required) item.rule = original;
    }
  }
}

// 名为 elements 的控件可能遮蔽 form.elements。
function getFormElements(form: HTMLFormElement): HTMLFormControlsCollection {
  return Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, "elements")!.get!.call(form);
}

class FormValidator extends Validator {
  // Validator 在构造时调用 setSchemas，由该方法初始化索引。
  declare private dependentsBySource: Map<string, Set<string>>;
  onSchemaRemoved?: (key: string) => void;

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
    this.replaceRules(key, []);
    this.onSchemaRemoved?.(key);
  }

  replaceRules(key: string, rules: ValidatorRule[]): void {
    this.removeDependencies(key, rulesFor(this, key));
    super.removeSchema(key);
    if (rules.length === 0) return;
    this.rules[key] = rules;
    this.indexDependencies({ key, rules });
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
  innerBlock: boolean;
  disabled: boolean;
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
  private errorRevision = 0;
  private readonly displayRevisions = new Map<string, number>();
  private readonly businessErrors = new Map<string, { message: string; revision: number }>();
  private readonly displayedBusinessErrors = new Set<string>();
  private readonly nativeFeedback = new Map<DataField, NativeFeedback>();
  private readonly pendingNativeReports = new Map<string, object>();
  private readonly itemRules = new Map<
    FormItem,
    { validator: Validator; key: string; rules: ValidatorRule[] }
  >();
  private readonly nativeOwner = new FormOwner(this, () => {
    if (this.nativeFeedback.size) queueMicrotask(this.reconcileNativeFeedback);
    return [...this.fields(), ...this.querySelectorAll<HTMLElement>("button, l-button")];
  });
  private readonly fieldContext = createFormContextProvider();
  private readonly autocompleteConfiguration = new FormAutocomplete(
    this,
    () => {
      this.nativeOwner.refreshPending();
      return { form: this.nativeOwner.form, ownsForm: this.nativeOwner.ownsForm };
    },
    (autocomplete) =>
      this.fieldContext.updateConfiguration({
        innerBlock: this._state.innerBlock,
        disabled: this._state.disabled,
        autocomplete,
      }),
  );
  private readonly locallyClearedFields = new Set<FormContextField>();
  private disposeContext?: () => void;
  private readonly provider = {
    getSnapshot: () => this.fieldContext.getSnapshot(),
    registerField: (field: FormContextField) => {
      if (field.target instanceof FormInner) this.nativeOwner.scheduleRefresh();
      const unregister = this.fieldContext.registerField(field, () =>
        this.initializeFieldValidity(field),
      );
      this.fieldContext.updateFieldName(field, this.fieldName(field));
      return () => {
        if (!unregister()) return;
        this.locallyClearedFields.delete(field);
        if (field.target instanceof FormItem) this.replaceItemRules(field.target);
        else if (
          field.target instanceof FormInner &&
          (!this.isDataField(field.target) || field.target.form !== this.nativeOwner.form)
        ) {
          this.invalidateBusinessRules(field.target.name);
        }
      };
    },
    fieldNameChanged: (
      field: FormContextField,
      name: string | undefined,
      previousName?: string,
    ) => {
      if (field.target instanceof FormInner) this.invalidateBusinessRules(previousName);
      if (this.fieldContext.updateFieldName(field, name)) this.initializeFieldValidity(field, name);
    },
    fieldValidityCleared: (field: FormContextField) => {
      const name = this.fieldName(field);
      if (name && this.errorMessages[name]) this.locallyClearedFields.add(field);
    },
    fieldValueChanged: ({ target }: FormContextField) => {
      if (
        this.businessErrors.size &&
        target instanceof FormInner &&
        this.isDataField(target) &&
        target.form === this.nativeOwner.form
      ) {
        this.invalidateBusinessRules(target.name);
      }
    },
    validateInput: ({ target }: FormContextField) => {
      if (target instanceof FormInner) this.validateInput(target);
    },
  };
  private listeningForm?: HTMLFormElement;
  private stopNativeSubmit?: () => void;
  private resetScope = {};
  private validationRoot?: Node;

  /** 当前原生表单；独立 l-form 使用辅助 form，已有原生祖先时复用。 */
  public get nativeForm(): HTMLFormElement | undefined {
    this.nativeOwner.refreshPending();
    return this.nativeOwner.form;
  }

  public get disabled(): boolean {
    return this._state.disabled;
  }

  public get autocomplete(): "on" | "off" | "" {
    return normalizeFormAutocomplete(this.getAttribute("autocomplete")) ?? "";
  }

  public set autocomplete(value: "on" | "off" | "" | null | undefined) {
    if (value == null || value === "") this.removeAttribute("autocomplete");
    else this.setAttribute("autocomplete", value);
  }

  public set disabled(value: boolean) {
    if (value) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
  }

  private fields(): FormInner[] {
    return Array.from(this.querySelectorAll<HTMLElement>("*")).filter(
      (field): field is FormInner => field instanceof FormInner && field.closest("l-form") === this,
    );
  }

  private nativeReset = (event: Event) => {
    if (event.target !== this.listeningForm) return;
    const scope = this.resetScope;
    const revision = this.errorRevision;
    // 等待原生回调和取消决定，清理本次重置开始前的状态。
    setTimeout(() => {
      if (event.defaultPrevented || !this.isConnected || this.resetScope !== scope) return;
      this.clearPresentation(revision);
      for (const [name, error] of this.businessErrors) {
        if (error.revision <= revision) this.updateBusinessErrors({}, [name]);
      }
    }, 0);
  };

  private validationField(target: EventTarget | null): DataField | undefined {
    if (
      !(
        target instanceof FormInner ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    )
      return;
    if (!this.listeningForm || target.form !== this.listeningForm || !target.isConnected) return;
    const host = target.closest("l-form");
    if (host === this || (!host && this.nativeOwner.ownsForm)) return target;
  }

  private nativeInvalid = (event: Event) => {
    const field = this.validationField(event.target);
    if (field) this.updateNativeFeedback(field, true, event.type === "invalid");
  };

  private nativeValidityChanged = (event: Event) => {
    if ((event as CustomEvent<NativeFieldValidity>).detail?.duringReset) return;
    const field = this.validationField(event.target);
    if (field) this.updateNativeFeedback(field);
  };

  private nativeInput = (event: Event) => {
    const field = this.validationField(event.target);
    if (field && !(field instanceof FormInner)) {
      this.updateNativeFeedback(field);
      this.validateInput(field);
    }
  };

  private updateNativeFeedback(field: DataField, touch = false, nativeInvalid = false): void {
    const previous = this.nativeFeedback.get(field);
    if (!previous && (!touch || !field.willValidate)) return;
    const item = field.closest("l-form-item");
    const name =
      field.name || (item instanceof FormItem ? item.getAttribute("prop") : null) || undefined;
    const fromInvalid = nativeInvalid || !!previous?.fromInvalid;
    const message = !field.willValidate
      ? undefined
      : field instanceof FormInner
        ? (field.constraintValidationMessage ??
          (fromInvalid ? field.validationMessage || undefined : undefined))
        : field.validationMessage || undefined;
    const next = {
      name,
      item: item instanceof FormItem && item.closest("l-form") === this ? item : undefined,
      message,
      revision: touch || !previous ? ++this.errorRevision : previous.revision,
      fromInvalid,
    };
    this.nativeFeedback.set(field, next);
    if (
      next.message === previous?.message &&
      next.item === previous?.item &&
      next.name === previous?.name
    )
      return;
    this.notifyNativeFeedback(field, previous, next);
  }

  private notifyNativeFeedback(
    field: DataField,
    previous?: NativeFeedback,
    next?: NativeFeedback,
  ): void {
    if (!previous?.message && !next?.message) return;
    if (this._state.emitError) {
      for (const name of new Set([previous?.name, next?.name])) {
        if (!name || this.pendingNativeReports.has(name)) continue;
        const token = {};
        this.pendingNativeReports.set(name, token);
        queueMicrotask(() => {
          if (this.pendingNativeReports.get(name) !== token) return;
          this.pendingNativeReports.delete(name);
          if (!this.isConnected || !this._state.emitError) return;
          const message = this.businessErrors.get(name)?.message ?? this.nativeMessageForName(name);
          this.setValidateErrors({ [name]: message }, [name]);
        });
      }
      return;
    }
    for (const registration of this.fieldContext.getFields()) {
      if (
        registration.target === field ||
        registration.target === previous?.item ||
        registration.target === next?.item
      )
        this.notifyFieldError(registration);
    }
  }

  private nativeMessageForName(name: string): string | undefined {
    for (const [field, feedback] of this.nativeFeedback) {
      if (feedback.name !== name) continue;
      const message = this.activeNativeMessage(field, feedback);
      if (message) return message;
    }
  }

  private activeNativeMessage(field: DataField, feedback: NativeFeedback): string | undefined {
    if (!feedback.message || !this.validationField(field) || !field.willValidate) return;
    return field instanceof FormInner ? feedback.message : field.validationMessage || undefined;
  }

  private setEmitError(enabled: boolean): void {
    if (this._state.emitError === enabled) return;
    this._state.emitError = enabled;
    this.pendingNativeReports.clear();

    const targets = new Set<EventTarget>();
    for (const [field, feedback] of this.nativeFeedback) {
      if (!feedback.message || !this.validationField(field)) continue;
      targets.add(field);
      if (feedback.item) targets.add(feedback.item);
      if (enabled && this.activeNativeMessage(field, feedback))
        this.notifyNativeFeedback(field, undefined, feedback);
    }
    for (const field of this.fieldContext.getFields()) {
      if (targets.has(field.target) && !this.locallyClearedFields.has(field))
        this.notifyFieldError(field);
    }
  }

  private reconcileNativeFeedback = (): void => {
    for (const [field, previous] of this.nativeFeedback) {
      if (!this.validationField(field)) {
        this.nativeFeedback.delete(field);
        this.notifyNativeFeedback(field, previous);
      } else if (field.closest("l-form-item") !== (previous.item ?? null)) {
        this.updateNativeFeedback(field);
      }
    }
  };

  private listenNativeForm(): void {
    const form = this.nativeForm;
    if (form === this.listeningForm) return;
    this.stopNativeSubmit?.();
    this.listeningForm?.removeEventListener("reset", this.nativeReset, true);
    this.resetScope = {};
    this.listeningForm = form;
    this.stopNativeSubmit =
      form && listenFormSubmit(form, this, this.nativeOwner.ownsForm, () => this.submit());
    form?.addEventListener("reset", this.nativeReset, true);
  }

  constructor() {
    super();
    this.version = 2;
    this._state = {
      /** 是否行内表单 */
      inline: false,
      innerBlock: false,
      disabled: false,
      labelPosition: "right",
      labelWidth: "80px",
      novalidate: false,
      emitError: false,
    };
    const validator = new FormValidator([]);
    validator.onSchemaRemoved = (key) => {
      if (this.validator === validator) this.revalidateChangedRules([key]);
    };
    this.validator = validator;
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
      "autocomplete",
    ];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string | null): void {
    switch (name) {
      case "label-position":
        this._state.labelPosition = newValue as "left";
        break;
      case "inner-block":
      case "disabled":
        this._state[kebabToCamel(name) as "disabled"] = parseAttrValue(newValue, false, name);
        this.autocompleteConfiguration.refresh();
        break;
      case "autocomplete":
        this.autocompleteConfiguration.refresh();
        break;
      case "label-width":
      case "label-height":
        this._state[kebabToCamel(name) as "labelHeight"] = unitNumberStr(newValue) as string;
        break;
      case "novalidate":
        this._state.novalidate = parseAttrValue(newValue, false, name);
        if (this._state.novalidate) this.updateBusinessErrors({}, this.businessErrors.keys());
        break;
      case "emit-error":
        this.setEmitError(parseAttrValue(newValue, false, name));
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
    if (Object.prototype.hasOwnProperty.call(this, "autocomplete")) {
      const value = this.autocomplete;
      delete (this as Partial<Form>).autocomplete;
      this.autocomplete = value;
    }
    this.disposeContext = provideFormContext(this, "form", this.provider);
    super.connectedCallback();
    this.nativeOwner.start();
    this.listenNativeForm();
    this.autocompleteConfiguration.start();
    for (const field of this.querySelectorAll("*")) {
      if (
        (field instanceof FormInner || field instanceof FormItem) &&
        field.closest("l-form") === this
      )
        field.refreshFormContext();
    }
  }

  afterInit(): void {
    on(this, "form-rule-change", this.ruleChange);
    on(this, "input", this.nativeInput);
    this.addEventListener("focusout", this.nativeInvalid);
    this.addEventListener("change", this.nativeValidityChanged);
    this.validationRoot = this.getRootNode();
    this.validationRoot.addEventListener("invalid", this.nativeInvalid, true);
    this.validationRoot.addEventListener(
      FORM_CONTEXT_EVENTS.nativeValidity,
      this.nativeValidityChanged,
      true,
    );
  }

  disconnectedCallback(): void {
    this.autocompleteConfiguration.stop();
    for (const item of this.itemRules.keys()) this.replaceItemRules(item);
    this.businessErrors.clear();
    this.nativeFeedback.clear();
    this.pendingNativeReports.clear();
    this.disposeContext?.();
    this.disposeContext = undefined;
    this.fieldContext.dispose();
    this.locallyClearedFields.clear();
    this.stopNativeSubmit?.();
    this.stopNativeSubmit = undefined;
    this.listeningForm?.removeEventListener("reset", this.nativeReset, true);
    this.resetScope = {};
    this.listeningForm = undefined;
    this.nativeOwner.stop();
    off(this, "form-rule-change", this.ruleChange);
    off(this, "input", this.nativeInput);
    this.removeEventListener("focusout", this.nativeInvalid);
    this.removeEventListener("change", this.nativeValidityChanged);
    this.validationRoot?.removeEventListener("invalid", this.nativeInvalid, true);
    this.validationRoot?.removeEventListener(
      FORM_CONTEXT_EVENTS.nativeValidity,
      this.nativeValidityChanged,
      true,
    );
    this.validationRoot = undefined;

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
    const source = e.composedPath()[0];
    if (!(source instanceof FormItem) || source.closest("l-form") !== this) return;
    e.stopPropagation();
    this.replaceItemRules(source, e.detail ?? undefined);
  };

  private replaceItemRules(source: FormItem, schema?: SchemaType): void {
    const next = schema ? rulesFor(new Validator([schema]), schema.key) : [];
    const validator = this.validator;
    const registration = this.itemRules.get(source);
    const previous = registration?.validator === validator ? registration : undefined;
    const affected = new Set<string>();
    if (previous) affected.add(previous.key);
    if (schema) affected.add(schema.key);
    const changed: string[] = [];
    for (const key of affected) {
      const current = rulesFor(validator, key);
      const owned = previous?.key === key ? previous.rules : [];
      const incoming = schema?.key === key ? next : [];
      const previousIndex = current.findIndex((rule) => owned.includes(rule));
      if (previousIndex === -1 && incoming.length === 0) continue;
      const combined = current.filter((rule) => !owned.includes(rule));
      combined.splice(previousIndex === -1 ? combined.length : previousIndex, 0, ...incoming);
      this.replaceRules(key, combined);
      changed.push(key);
    }
    this.itemRules.delete(source);
    if (schema && next.length) {
      this.itemRules.set(source, { validator, key: schema.key, rules: next });
    }
    this.revalidateChangedRules(changed);
  }

  private replaceRules(key: string, rules: ValidatorRule[]): void {
    if (this.validator instanceof FormValidator) this.validator.replaceRules(key, rules);
    else if (rules.length) this.validator.rules[key] = rules;
    else this.validator.removeSchema(key);
  }

  private revalidateChangedRules(names: Iterable<string>): void {
    if (!this.isConnected) return;
    const invalid = [...new Set(names)].filter(
      (key) => this.businessErrors.has(key) || this.displayedBusinessErrors.has(key),
    );
    if (invalid.length)
      this.applyFieldErrors(this.validateKeys(invalid, this.validationData(invalid)), invalid);
  }

  public addSchemas(schemas: SchemaType[]) {
    this.validator.addSchemas(schemas);
    this.revalidateChangedRules(schemas.map(({ key }) => key));
  }

  public setSchemas(schemas: SchemaType[]) {
    const keys = Object.keys(this.validator.rules);
    this.validator.setSchemas(schemas);
    this.revalidateChangedRules([...keys, ...schemas.map(({ key }) => key)]);
  }

  public setSchema(schema: SchemaType) {
    this.validator.setSchema(schema);
    this.revalidateChangedRules([schema.key]);
  }

  public addSchema(schema: SchemaType) {
    this.validator.addSchema(schema);
    this.revalidateChangedRules([schema.key]);
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

  private relatedRuleNames(name: string): string[] {
    const validator = this.validator;
    // 外部替换的 Validator 实例没有索引，仍可通过规则表发现依赖。
    return validator instanceof FormValidator
      ? validator.getInputValidationFields(name)
      : Object.entries(validator.rules).flatMap(([key, rules]) =>
          key === name || rules.some((rule) => rule.sameKey === name) ? [key] : [],
        );
  }

  private invalidateBusinessRules(name?: string): void {
    if (!name || this.businessErrors.size === 0) return;
    this.updateBusinessErrors({}, new Set([name, ...this.relatedRuleNames(name)]));
  }

  private validateInput(field: DataField): void {
    const name = field.name;
    if (this._state.novalidate || !name) return;
    const names = this.relatedRuleNames(name);
    if (names.length === 0) return;

    const form = this.nativeForm;
    if (!form || field.form !== form || !this.isDataField(field)) return;
    const data = this.validationData(names, form, name);
    if (!Object.hasOwn(data, name)) return;
    this.applyFieldErrors(this.validateKeys(names, data), names);
  }

  private validateKeys(
    names: readonly string[],
    data: Record<string, any>,
  ): Record<string, string | undefined> {
    const validator = this.validator;
    const form = this.nativeForm;
    const elements = form && getFormElements(form);
    return Object.fromEntries(
      names.map((key) => {
        try {
          if (validator instanceof FormValidator && !Object.hasOwn(validator.rules, key))
            return [key, undefined];
          const rules = rulesFor(validator, key);
          const field =
            elements && rules.some(isRequiredRule) ? this.findDataField(elements, key) : undefined;
          const selection =
            field instanceof FormInner && !field.isDisabled() ? field.requiredSelection : undefined;
          validateKey(validator, key, data, rules, selection);
          return [key, undefined];
        } catch (error) {
          const message = (error as { detail?: Record<string, string> } | null)?.detail?.[key];
          return [
            key,
            message ?? (error instanceof Error && error.message ? error.message : "校验失败"),
          ];
        }
      }),
    );
  }

  private applyFieldErrors(
    errors: Record<string, string | undefined>,
    names: string[],
    emitError = this._state.emitError,
  ): void {
    this.updateBusinessErrors(errors, names);
    if (emitError) {
      const feedback = Object.fromEntries(
        names.map((name) => {
          this.pendingNativeReports.delete(name);
          return [name, errors[name] ?? this.nativeMessageForName(name)];
        }),
      );
      this.setValidateErrors(feedback, names);
      return;
    }

    const changed = new Set<string>();
    for (const key of names) {
      const message = errors[key];
      if ((this.errorMessages[key] || undefined) !== (message || undefined)) changed.add(key);
      if (message === undefined) {
        delete this.errorMessages[key];
        this.displayRevisions.delete(key);
        this.displayedBusinessErrors.delete(key);
      } else {
        this.errorMessages[key] = message;
        this.displayRevisions.set(key, ++this.errorRevision);
        this.displayedBusinessErrors.add(key);
      }
    }
    for (const key of names) {
      if (changed.has(key)) {
        this.notifyErrorChange(key);
      } else if (this.locallyClearedFields.size) {
        this.notifyErrorChange(key, true);
      }
    }
  }

  private updateBusinessErrors(
    errors: Record<string, string | undefined>,
    names: Iterable<string>,
  ): void {
    for (const name of names) {
      const message = errors[name];
      if (message) this.businessErrors.set(name, { message, revision: ++this.errorRevision });
      else if (!this.businessErrors.delete(name)) continue;
      for (const { target } of this.fieldContext.getFieldsByName(name)) {
        if (target instanceof FormInner) this.applyFieldValidity(target, name);
      }
    }
  }

  private applyFieldValidity(target: FormInner, name?: string): void {
    target.applyBusinessValidity(
      name && target.form === this.nativeOwner.form && this.isDataField(target)
        ? this.businessErrors.get(name)?.message
        : undefined,
    );
  }

  private isDataField(field: Element | null): field is DataField {
    if (!field || (!this.nativeOwner.ownsForm && field.closest("l-form") !== this)) return false;
    if (field instanceof FormInner) return !field.grouped;
    if (field instanceof HTMLInputElement) {
      if (field.type === "radio") return field.checked;
      return !["button", "submit", "reset", "image"].includes(field.type);
    }
    return field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement;
  }

  private findDataField(elements: HTMLFormControlsCollection, name: string): DataField | undefined {
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

  private validationData(
    names: readonly string[],
    form = this.nativeForm,
    source?: string,
  ): Record<string, any> {
    if (!form) return {};
    const elements = getFormElements(form);
    const validator = this.validator;
    if (!(validator instanceof FormValidator)) return this.collectData(elements);
    const keys = new Set(names);
    if (source) keys.add(source);
    for (const key of names) {
      for (const { sameKey } of rulesFor(validator, key)) {
        if (sameKey !== undefined) keys.add(sameKey);
      }
    }

    const data: [string, unknown][] = [];
    for (const key of keys) {
      const field = this.findDataField(elements, key);
      if (field) data.push([key, readDataValue(field)]);
    }
    return Object.fromEntries(data);
  }

  public async validateField(field: string | string[]) {
    const names = [...new Set(Array.isArray(field) ? field : [field])];
    if (names.length === 0) return;
    const errors = this.validateKeys(names, this.validationData(names));
    this.applyFieldErrors(errors, names, false);
    if (Object.values(errors).some(Boolean)) {
      const error = new Error("validate field error") as Error & { detail: typeof errors };
      error.detail = errors;
      throw error;
    }
  }

  /** 当前错误快照；普通数据，不再暴露 signal 调用接口。 */
  public get validationErrors(): Readonly<Record<string, string | undefined>> {
    return this._state.emitError
      ? { ...this.errorMessages }
      : this.withNativeFeedback(this.errorMessages);
  }

  private withNativeFeedback(errors: Record<string, string | undefined>) {
    const merged: typeof errors = Object.assign(Object.create(null), errors);
    for (const [field, feedback] of this.nativeFeedback) {
      const { name } = feedback;
      if (!name || merged[name]) continue;
      const message = this.activeNativeMessage(field, feedback);
      if (message) merged[name] = message;
    }
    return { ...merged };
  }

  public clearValidate() {
    this.clearPresentation();
  }

  public reset() {
    this.listenNativeForm();
    if (this.listeningForm) HTMLFormElement.prototype.reset.call(this.listeningForm);
  }

  private clearPresentation(through = Infinity): void {
    const names = new Set<string>();
    for (const [name, revision] of this.displayRevisions) {
      if (revision > through) continue;
      if (this.errorMessages[name]) names.add(name);
      delete this.errorMessages[name];
      this.displayRevisions.delete(name);
      this.displayedBusinessErrors.delete(name);
    }
    const targets = new Set<EventTarget>();
    for (const [field, feedback] of this.nativeFeedback) {
      if (feedback.revision > through) continue;
      this.nativeFeedback.delete(field);
      if (feedback.name) this.pendingNativeReports.delete(feedback.name);
      if (!feedback.message) continue;
      targets.add(field);
      if (feedback.item) targets.add(feedback.item);
    }
    for (const field of this.fieldContext.getFields()) {
      const name = this.fieldName(field);
      if (targets.has(field.target) || (name && names.has(name)))
        this.notifyFieldError(field, name);
    }
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
            this.setValidateErrors(this.withNativeFeedback(valid.errors));
          } else {
            this.replaceDisplayedErrors(valid.errors, true);
          }
        }
      });
    }
  }

  /**
   * 校验全部表单数据
   */
  public validate() {
    const names = Object.keys(this.validator.rules);
    const results = this.validateKeys(names, this.getData());
    this.updateBusinessErrors(results, new Set([...this.businessErrors.keys(), ...names]));
    const errors = Object.fromEntries(Object.entries(results).filter(([, message]) => !!message));
    return Promise.resolve({ result: Object.keys(errors).length === 0, errors });
  }

  public getData() {
    const form = this.nativeForm;
    return form ? this.collectData(getFormElements(form)) : {};
  }

  private collectData(elements: HTMLFormControlsCollection): Record<string, any> {
    const data: [string, unknown][] = [];
    for (const field of Array.from(elements)) {
      if (this.isDataField(field) && field.name) data.push([field.name, readDataValue(field)]);
    }
    return Object.fromEntries(data);
  }

  private fieldName(field: FormContextField): string | undefined {
    return field.target instanceof FormInner ? field.target.name : field.getSnapshot().name;
  }

  private initializeFieldValidity(field: FormContextField, name = this.fieldName(field)): void {
    if (field.target instanceof FormInner) {
      if (!field.target.rendered) return;
      this.applyFieldValidity(field.target, name);
    }
    this.notifyFieldError(field, name);
  }

  private visibleError(target: EventTarget, name?: string): string | undefined {
    if (name && this.errorMessages[name]) return this.errorMessages[name];
    if (this._state.emitError) return;
    if (target instanceof FormInner) {
      const feedback = this.nativeFeedback.get(target);
      if (feedback) return this.activeNativeMessage(target, feedback);
    }
    if (target instanceof FormItem) {
      for (const [field, feedback] of this.nativeFeedback) {
        if (feedback.item !== target) continue;
        const message = this.activeNativeMessage(field, feedback);
        if (message) return message;
      }
    }
  }

  private notifyFieldError(field: FormContextField, name = this.fieldName(field)): void {
    if (field.target instanceof FormInner && !field.target.rendered) return;
    this.locallyClearedFields.delete(field);
    const message = this.visibleError(field.target, name);
    this.fieldContext.notifyValidity(field, { valid: !message, message });
  }

  private notifyErrorChange(name: string, onlyLocallyCleared = false): void {
    for (const field of this.fieldContext.getFieldsByName(name)) {
      if (onlyLocallyCleared && !this.locallyClearedFields.has(field)) continue;
      if (this.fieldName(field) === name) this.notifyFieldError(field, name);
    }
  }

  public setErrors(errorObj: Record<string, any>) {
    this.replaceDisplayedErrors(errorObj);
  }

  private replaceDisplayedErrors(errorObj: Record<string, any>, business = false): void {
    const previous = this.errorMessages;
    const next: typeof previous = Object.assign(Object.create(null), errorObj);
    this.displayRevisions.clear();
    for (const name of Object.keys(next)) this.displayRevisions.set(name, ++this.errorRevision);
    this.displayedBusinessErrors.clear();
    if (business) for (const name of Object.keys(next)) this.displayedBusinessErrors.add(name);
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