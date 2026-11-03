import BaseComponent from "../base";
import {
  FORM_CONTEXT_EVENTS,
  requestFormContext,
  resolveFieldContext,
  readFormBooleanAttribute,
} from "./context";
import type { FormContextField, FormContextProvider, FormFieldValidity } from "./context";

/** 原生表单控件公共基类；所有权由 FormOwner 维护，上下文只使用普通请求／定向事件。 */
export default class FormInner<T = Record<string, any>> extends BaseComponent<T> {
  public static formAssociated = true;
  protected readonly internals: ElementInternals;
  public _disabled = false;
  public _value: any = undefined;
  public _resetValue?: any;
  protected _firstPushValue = true;
  private defaultCaptured = false;
  private ownDisabled = false;
  private nativeDisabled = false;
  private contextDisabled = false;
  protected contextRequired = false;
  private explicitName?: string;
  private effectiveName?: string;
  private reflectingName = false;
  private reflectingDisabled = false;
  private restoring = false;
  private connecting = false;
  private unregister: (() => void)[] = [];
  protected groupContext?: FormContextProvider;
  private formContext?: FormContextProvider;
  private itemContext?: FormContextProvider;
  private businessError = "";
  private manualValidity: ValidityStateFlags = {};
  private manualMessage = "";
  protected readonly contextField: FormContextField = {
    target: this,
    getSnapshot: () => ({ name: this.name, value: this.getValue(), disabled: this.isDisabled() }),
  };

  public constructor(firstPushValue = true, delegatesFocus = true) {
    super(true, { delegatesFocus });
    if (typeof this.attachInternals !== "function") {
      throw new Error(
        "Litos UI：原生表单需要 iOS／iPadOS 16.4+ 或具备 ElementInternals 的浏览器。",
      );
    }
    this.internals = this.attachInternals();
    this._firstPushValue = firstPushValue;
  }

  public get nativeValueEnabled(): boolean {
    return true;
  }
  /** 组成员由组统一提交／收集，Check 覆盖此标志。 */
  public get grouped(): boolean {
    return false;
  }
  public get valueSnapshot(): any {
    return this.getValue();
  }
  public get form(): HTMLFormElement | null {
    return this.internals.form;
  }
  public get labels(): NodeList {
    return this.internals.labels;
  }
  public get validity(): ValidityState {
    this.syncNativeValidity();
    return this.internals.validity;
  }
  public get validationMessage(): string {
    this.syncNativeValidity();
    return this.internals.validationMessage;
  }
  public get willValidate(): boolean {
    return this.internals.willValidate;
  }
  public checkValidity(): boolean {
    this.syncNativeValidity();
    return this.internals.checkValidity();
  }
  public reportValidity(): boolean {
    this.syncNativeValidity();
    return this.internals.reportValidity();
  }
  public setValidity(flags: ValidityStateFlags = {}, message?: string, anchor?: HTMLElement): void {
    this.manualValidity = { ...flags };
    this.manualMessage = message ?? "";
    this.internals.setValidity(flags, message, anchor);
  }

  get name(): string | undefined {
    return this.effectiveName ?? this.explicitName;
  }
  set name(value: string | undefined) {
    if (this.reflectingName) return;
    this.explicitName = value == null ? undefined : String(value);
    this.refreshConfiguration();
  }
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this.setValue(value);
  }
  public setValue(value: any): void {
    this._value = value;
    if (!this.defaultCaptured && !this.restoring) {
      this._resetValue = this.copyValue(value);
      this.defaultCaptured = true;
    }
    this.pushValueChange();
  }
  public getValue(): any {
    return this._value;
  }
  /** 显式默认值是重置基线；修改它不伪造用户事件，也不覆盖当前编辑值。 */
  public get defaultValue(): any {
    return this.copyValue(this._resetValue);
  }
  public set defaultValue(value: any) {
    this._resetValue = this.copyValue(value);
    this.defaultCaptured = true;
  }
  protected copyValue(value: any): any {
    if (Array.isArray(value)) return value.map((item) => this.copyValue(item));
    if (value && Object.getPrototypeOf(value) === Object.prototype) {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, this.copyValue(item)]),
      );
    }
    return value;
  }

  static get observedAttributes(): string[] {
    return [
      "disabled",
      "value",
      "name",
      "form",
      "inner-block",
      "required",
      "pattern",
      "minlength",
      "maxlength",
      "min",
      "max",
      "step",
      "readonly",
    ];
  }
  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    if (name === "value") {
      // HTML value 的动态更改更新默认值；程序 value 赋值只更改当前值。
      this.defaultValue = newValue ?? "";
      this.value = newValue ?? "";
    } else if (name === "name") {
      if (!this.reflectingName) this.name = newValue ?? undefined;
    } else if (name === "disabled") {
      if (!this.reflectingDisabled) this.setDisabled(readFormBooleanAttribute(newValue) ?? false);
    } else if (name === "inner-block" || name === "required") {
      this.refreshConfiguration();
    } else {
      this.attributeChange(name, oldValue, newValue);
      if (name === "form" && this.isConnected) this.bindContexts();
    }
    this.syncNativeValue();
  }
  protected attributeChange(_name: string, _oldValue: string, _newValue: string): void {}

  connectedCallback(): void {
    this.connecting = true;
    // 定义前 property 不能遮蔽原型 setter；升级后重放一次。
    for (const key of ["value", "name", "disabled", "defaultValue"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = (this as any)[key];
        delete (this as any)[key];
        (this as any)[key] = value;
      }
    }
    this.addEventListener(FORM_CONTEXT_EVENTS.configuration, this.configurationChanged);
    this.addEventListener(FORM_CONTEXT_EVENTS.validity, this.validityChanged);
    this.bindContexts();
    super.connectedCallback();
    this.connecting = false;
    if (!this.defaultCaptured) {
      this._resetValue = this.copyValue(this.getValue() ?? "");
      this.defaultCaptured = true;
    }
    this.refreshConfiguration();
    this.syncNativeValue();
  }
  disconnectedCallback(): void {
    this.unbindContexts();
    this.removeEventListener(FORM_CONTEXT_EVENTS.configuration, this.configurationChanged);
    this.removeEventListener(FORM_CONTEXT_EVENTS.validity, this.validityChanged);
    super.disconnectedCallback();
  }
  private unbindContexts(): void {
    this.unregister.forEach((stop) => stop());
    this.unregister = [];
    this.formContext = undefined;
    this.itemContext = undefined;
    this.groupContext = undefined;
  }
  public refreshFormContext(): void {
    this.bindContexts();
  }

  private bindContexts(): void {
    this.unbindContexts();
    if (!this.isConnected) return;
    this.formContext = requestFormContext(this, "form");
    this.itemContext = requestFormContext(this, "item");
    this.groupContext = requestFormContext(this, "group");
    for (const provider of new Set([this.formContext, this.itemContext, this.groupContext])) {
      if (provider) this.unregister.push(provider.registerField(this.contextField));
    }
    this.refreshConfiguration();
  }
  private configurationChanged = (): void => {
    this.refreshConfiguration();
  };
  private validityChanged = (event: Event): void => {
    const validity = (event as CustomEvent<FormFieldValidity>).detail;
    this.businessError = validity.valid ? "" : validity.message || "校验失败";
    this.validResult(this.businessError || undefined);
    this.syncNativeValidity();
  };
  protected refreshConfiguration(): void {
    const result = resolveFieldContext(
      {
        name: this.explicitName,
        disabled: this.ownDisabled,
        innerBlock: readFormBooleanAttribute(this.getAttribute("inner-block")),
        required: readFormBooleanAttribute(this.getAttribute("required")),
      },
      {
        form: this.formContext?.getSnapshot(),
        item: this.itemContext?.getSnapshot(),
        group: this.groupContext?.getSnapshot(),
      },
    );
    this.effectiveName = result.name;
    this.reflectingName = true;
    try {
      if (result.name === undefined) {
        if (this.hasAttribute("name")) this.removeAttribute("name");
      } else if (this.getAttribute("name") !== result.name) this.setAttribute("name", result.name);
    } finally {
      this.reflectingName = false;
    }
    this.contextDisabled = !!(
      this.formContext?.getSnapshot().disabled ||
      this.itemContext?.getSnapshot().disabled ||
      this.groupContext?.getSnapshot().disabled
    );
    this.contextRequired = result.required;
    this.configurationApplied();
    this.innerBlockChange(result.innerBlock);
    this.applyDisabled();
    this.syncNativeValue();
  }

  public isDisabled(): boolean {
    return this._disabled;
  }
  public get disabled(): boolean {
    return this.ownDisabled;
  }
  public set disabled(value: boolean) {
    this.setDisabled(!!value);
  }
  public setDisabled(value: boolean): void {
    this.ownDisabled = !!value;
    this.reflectingDisabled = true;
    try {
      if (this.ownDisabled) {
        if (this.getAttribute("disabled") !== "") this.setAttribute("disabled", "");
      } else if (this.hasAttribute("disabled")) this.removeAttribute("disabled");
    } finally {
      this.reflectingDisabled = false;
    }
    this.applyDisabled();
  }
  private applyDisabled(): void {
    this._disabled = this.ownDisabled || this.nativeDisabled || this.contextDisabled;
    if (this.rendered && !this.connecting) this.disabledChange();
    // 原生 fieldset／自身禁用由浏览器排除；上下文禁用没有宿主 attribute，需主动排除值。
    this.syncNativeValue();
  }
  public getName(): string | undefined {
    return this.name;
  }
  protected configurationApplied(): void {}
  protected disabledChange(): void {}
  protected innerBlockChange(_innerBlock: boolean): void {}
  protected validResult(_msg?: string): void {}

  /** 原生 owner 的每次变化都重新登记，不缓存首次 owner。 */
  public formAssociatedCallback(_form: HTMLFormElement | null): void {
    if (this.isConnected) this.bindContexts();
    this.syncNativeValue();
  }
  public formDisabledCallback(disabled: boolean): void {
    this.nativeDisabled = disabled;
    this.applyDisabled();
  }
  protected serializeFormValue(): string | File | FormData | null {
    return String(this.getValue() ?? "");
  }
  /** Safari 16.4 基线使用版本化字符串；提交值与业务恢复状态独立。 */
  protected serializeFormState(): string {
    return JSON.stringify({ version: 1, value: this.getValue() ?? "" });
  }
  protected syncNativeValue(): void {
    if (!this.internals || !this.nativeValueEnabled) return;
    this.internals.setFormValue(
      this.isDisabled() ? null : this.serializeFormValue(),
      this.serializeFormState(),
    );
    const anchor = this.root?.querySelector<HTMLInputElement>("input,textarea,select");
    if (anchor) {
      anchor.disabled = this.isDisabled();
      if ("readOnly" in anchor)
        anchor.readOnly = readFormBooleanAttribute(this.getAttribute("readonly")) ?? false;
    }
    this.syncNativeValidity();
  }
  public formResetCallback(): void {
    this.reset();
  }
  public formStateRestoreCallback(
    state: string | File | FormData | null,
    _mode: "restore" | "autocomplete",
  ): void {
    if (typeof state !== "string") return;
    try {
      const decoded = JSON.parse(state);
      if (decoded?.version !== 1 || !Object.hasOwn(decoded, "value")) return;
      this.restoring = true;
      this.value = decoded.value;
      this.businessError = "";
      this.manualValidity = {};
      this.manualMessage = "";
      this.validResult();
      this.syncNativeValue();
    } catch {
      /* 不认识的浏览器状态不覆盖当前值。 */
    } finally {
      this.restoring = false;
    }
  }

  /** 将宿主约束显式应用到探测用原生 input，不让 Shadow DOM input 变成第二个字段。 */
  protected get nativeBadInput(): boolean {
    return false;
  }

  protected get nativeValueMissing(): boolean | undefined {
    return undefined;
  }

  protected get nativeConstraintValues(): readonly unknown[] {
    return [this.getValue()];
  }

  protected syncNativeValidity(): void {
    if (!this.internals || !this.ownerDocument) return;
    const anchor =
      this.root?.querySelector<HTMLElement>("input,textarea,select,button,[tabindex]") ?? undefined;
    const flags: ValidityStateFlags = {};
    let message = "";
    const readOnly = readFormBooleanAttribute(this.getAttribute("readonly")) ?? false;
    if (!this.isDisabled() && !readOnly && !this.grouped) {
      const probe = this.ownerDocument.createElement("input");
      const type =
        this.getAttribute("type") ?? (anchor instanceof HTMLInputElement ? anchor.type : "text");
      probe.type =
        (this.constructor as typeof FormInner & { baseName?: string }).baseName === "input-number"
          ? "number"
          : ["checkbox", "radio", "file", "hidden", "submit", "button", "reset"].includes(type)
            ? "text"
            : type;
      for (const attr of ["pattern", "min", "max", "step", "minlength", "maxlength"]) {
        const value = this.getAttribute(attr);
        if (value !== null) probe.setAttribute(attr, value);
      }
      for (const raw of this.nativeConstraintValues) {
        probe.value = Array.isArray(raw) ? raw.join(",") : String(raw ?? "");
        probe.required = this.contextRequired;
        const names = [
          "valueMissing",
          "typeMismatch",
          "patternMismatch",
          "rangeUnderflow",
          "rangeOverflow",
          "stepMismatch",
          "badInput",
        ] as const;
        for (const name of names) if (probe.validity[name]) flags[name] = true;
        if (this.contextRequired && (raw === false || (Array.isArray(raw) && !raw.length)))
          flags.valueMissing = true;
        if (probe.required && this.nativeValueMissing !== undefined) {
          if (this.nativeValueMissing) flags.valueMissing = true;
          else delete flags.valueMissing;
        }
        const min = Number(this.getAttribute("minlength")),
          max = Number(this.getAttribute("maxlength"));
        if (
          ["text", "search", "url", "tel", "email", "password"].includes(probe.type) &&
          probe.value &&
          this.hasAttribute("minlength") &&
          min >= 0 &&
          probe.value.length < min
        )
          flags.tooShort = true;
        if (
          ["text", "search", "url", "tel", "email", "password"].includes(probe.type) &&
          this.hasAttribute("maxlength") &&
          max >= 0 &&
          probe.value.length > max
        )
          flags.tooLong = true;
        message =
          probe.validationMessage ||
          (flags.tooShort ? "输入长度不足" : flags.tooLong ? "输入长度超出限制" : "");
      }
      if (this.nativeBadInput) {
        flags.badInput = true;
        message = "请输入有效值";
      }
      Object.assign(flags, this.manualValidity);
      if (Object.values(this.manualValidity).some(Boolean)) message = this.manualMessage;
      if (this.businessError) {
        flags.customError = true;
        message = this.businessError;
      }
    }
    const invalid = Object.values(flags).some(Boolean);
    // 某些复合控件没有可聚焦锚点，不能把非后代元素传给 setValidity。
    this.internals.setValidity(flags, invalid ? message || "请检查字段值" : "", anchor);
  }
  protected pushValueChange(): void {
    this.syncNativeValue();
    if (this.name && !this.restoring) {
      this.emit("form-value-change", {
        bubbles: true,
        composed: true,
        detail: { name: this.name, value: this.getValue(), valid: true },
      });
    }
  }
  public reset(): void {
    this.restoring = true;
    try {
      this.value = this.copyValue(this._resetValue ?? "");
      this.businessError = "";
      this.manualValidity = {};
      this.manualMessage = "";
      this.validResult();
      this.syncNativeValue();
    } finally {
      this.restoring = false;
    }
  }
}