import BaseComponent from "../base";
import {
  FieldAccessibility,
  fieldControlSelector,
  referenceElements,
  referenceText,
  type NativeFieldControl,
} from "./accessibility";
import {
  FORM_CONTEXT_EVENTS,
  requestFormContext,
  resolveFieldContext,
  readFormBooleanAttribute,
} from "./context";
import type {
  FormContextField,
  FormContextProvider,
  FormFieldValidity,
  NativeFieldValidity,
} from "./context";

/** 原生表单控件公共基类；所有权由 FormOwner 维护，上下文只使用普通请求／定向事件。 */
export default class FormInner<T = Record<string, any>> extends BaseComponent<T> {
  public static formAssociated = true;
  protected readonly internals: ElementInternals;
  public _disabled = false;
  #value: any = undefined;
  protected dirtyValue = false;
  private applyingDefault = false;
  private applyingFormReset = false;
  private valueInitialized = false;
  private ownDisabled = false;
  private nativeDisabled = false;
  private contextDisabled = false;
  protected contextRequired = false;
  private explicitName?: string;
  private effectiveName?: string;
  private syncedNameAttribute: string | null = null;
  private reflectingDisabled = false;
  private connecting = false;
  private unregister: (() => void)[] = [];
  protected groupContext?: FormContextProvider;
  private formContext?: FormContextProvider;
  private itemContext?: FormContextProvider;
  private manualValidity: ValidityStateFlags = {};
  private manualMessage = "";
  private businessMessage?: string;
  private nativeValidity?: NativeFieldValidity;
  private displayedValidityMessage?: string;
  private itemPresentation?: {
    owner: HTMLElement;
    label?: string;
    error?: string;
    groupError?: string;
  };
  private accessibilityControl?: NativeFieldControl;
  private fieldAccessibility?: FieldAccessibility;
  private accessibilityObserver?: MutationObserver;
  protected readonly contextField: FormContextField = {
    target: this,
    getSnapshot: () => ({ name: this.name, value: this.getValue(), disabled: this.isDisabled() }),
  };

  public constructor(delegatesFocus = true) {
    super(true, { delegatesFocus });
    if (typeof this.attachInternals !== "function") {
      throw new Error(
        "Litos UI：原生表单需要 iOS／iPadOS 16.4+ 或具备 ElementInternals 的浏览器。",
      );
    }
    this.internals = this.attachInternals();
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
  /** @internal 由选中状态决定必填的控件可提供结果。 */
  public get requiredSelection(): boolean | undefined {
    return undefined;
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
  /** @internal 原生约束和手动错误的提示，独立于业务规则的 customError。 */
  public get constraintValidationMessage(): string | undefined {
    return this.nativeValidity?.constraintMessage;
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
    this.internals.setValidity(flags, message, anchor);
    this.manualValidity = { ...flags };
    this.manualMessage = message ?? "";
    this.syncNativeValidity(anchor);
  }

  get name(): string | undefined {
    return this.effectiveName ?? this.explicitName;
  }
  set name(value: string | undefined) {
    this.syncedNameAttribute = this.getAttribute("name");
    this.explicitName = value == null ? undefined : String(value);
    this.refreshConfiguration();
  }
  public get autocomplete(): string {
    return this.getAttribute("autocomplete") ?? "";
  }
  public set autocomplete(value: string | null | undefined) {
    if (value == null || value === "") this.removeAttribute("autocomplete");
    else this.setAttribute("autocomplete", value);
  }
  get value(): any {
    return this.#value;
  }
  set value(value: any) {
    this.setValue(value);
  }
  public setValue(value: any): void {
    const changed = !Object.is(this.#value, value);
    this.#value = value;
    if (!this.applyingDefault) this.dirtyValue = true;
    if (changed) this.notifyFieldValueChanged();
    this.syncNativeValue();
  }
  protected notifyFieldValueChanged(): void {
    if (!this.applyingFormReset) this.formContext?.fieldValueChanged?.(this.contextField);
  }
  public getValue(): any {
    return this.#value;
  }
  /** 默认值来源于 value attribute；程序赋值／用户输入不再捕获为重置基线。 */
  public get defaultValue(): any {
    return this.copyValue(this.parseDefaultValue(this.getAttribute("value")));
  }
  public set defaultValue(value: any) {
    this.setAttribute("value", this.formatDefaultValue(value));
  }
  protected get intrinsicDefaultValue(): any {
    return "";
  }
  protected parseDefaultValue(value: string | null): any {
    return value === null ? this.intrinsicDefaultValue : value;
  }
  protected formatDefaultValue(value: any): string {
    return String(value ?? "");
  }
  /** 默认同步走派生 setter 更新 UI，但不把控件标记为已编辑，也不伪造用户事件。 */
  protected applyDefaultValue(): void {
    if (this.dirtyValue) return;
    this.applyingDefault = true;
    try {
      this.value = this.copyValue(this.defaultValue);
    } finally {
      this.applyingDefault = false;
    }
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
      "autocomplete",
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
      "id",
      "aria-label",
      "aria-labelledby",
      "aria-describedby",
      "aria-invalid",
    ];
  }
  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    if (name === "value") {
      // 与原生文本输入一致：dirty 时只改变默认值，reset 后重新跟随默认属性。
      this.applyDefaultValue();
    } else if (name === "name") {
      if (this.getAttribute("name") === this.syncedNameAttribute) return;
      this.refreshConfiguration();
    } else if (name === "disabled") {
      if (!this.reflectingDisabled) this.setDisabled(readFormBooleanAttribute(newValue) ?? false);
    } else if (name === "inner-block" || name === "required") {
      this.refreshConfiguration();
    } else if (name === "id" || name.startsWith("aria-")) {
      this.syncFieldAccessibility();
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
    for (const key of ["value", "name", "disabled", "defaultValue", "autocomplete", "htmlType"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = (this as any)[key];
        delete (this as any)[key];
        (this as any)[key] = value;
      }
    }
    if (!this.valueInitialized) {
      this.applyDefaultValue();
      this.valueInitialized = true;
    }
    this.addEventListener(FORM_CONTEXT_EVENTS.configuration, this.configurationChanged);
    this.addEventListener(FORM_CONTEXT_EVENTS.validity, this.validityChanged);
    this.bindContexts();
    super.connectedCallback();
    this.connecting = false;
    this.addEventListener("focusin", this.syncFieldAccessibility);
    this.refreshConfiguration();
    this.syncNativeValue();
  }
  disconnectedCallback(): void {
    this.removeEventListener("focusin", this.syncFieldAccessibility);
    this.accessibilityObserver?.disconnect();
    this.fieldAccessibility?.clear(this.root);
    this.accessibilityControl = undefined;
    this.fieldAccessibility = undefined;
    this.itemPresentation = undefined;
    this.displayedValidityMessage = undefined;
    this.nativeValidity = undefined;
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
    this.applyBusinessValidity();
  }
  public refreshFormContext(): void {
    this.bindContexts();
  }

  protected validateInput(): void {
    this.formContext?.validateInput?.(this.contextField);
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
    this.validResult(validity.valid ? undefined : validity.message || "校验失败");
  };

  /** @internal 表单已执行的规则结果，与外部提示和手动 setValidity 分开。 */
  public applyBusinessValidity(message?: string): void {
    if (this.businessMessage === message) return;
    this.businessMessage = message;
    this.syncNativeValidity();
  }
  protected refreshConfiguration(): void {
    const nameAttribute = this.getAttribute("name");
    // Read the DOM before reflecting a name. Upgrade may queue several attribute reactions,
    // including the reaction to our own write after the original callback has returned.
    if (nameAttribute !== this.syncedNameAttribute) this.explicitName = nameAttribute ?? undefined;
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
    const previousName = this.effectiveName;
    const nameChanged = previousName !== result.name;
    this.effectiveName = result.name;
    this.syncedNameAttribute = result.name ?? null;
    if (nameAttribute !== this.syncedNameAttribute) {
      if (result.name === undefined) this.removeAttribute("name");
      else this.setAttribute("name", result.name);
    }
    this.contextDisabled = !!(
      this.formContext?.getSnapshot().disabled ||
      this.itemContext?.getSnapshot().disabled ||
      this.groupContext?.getSnapshot().disabled
    );
    this.contextRequired = result.required;
    this.configurationApplied();
    this.syncFieldAccessibility();
    this.innerBlockChange(result.innerBlock);
    this.applyDisabled();
    this.syncNativeValue();
    if (nameChanged)
      this.formContext?.fieldNameChanged?.(this.contextField, result.name, previousName);
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
  protected validResult(message?: string): void {
    this.displayedValidityMessage = message;
    this.syncFieldAccessibility();
  }

  /** @internal 单一编辑控件才可作为行标签的聚焦目标。 */
  public get formItemControl(): NativeFieldControl | undefined {
    const controls = this.root?.querySelectorAll<NativeFieldControl>(fieldControlSelector);
    return controls?.length === 1 ? controls[0] : undefined;
  }

  /** @internal 行标签和错误随控件归属变化。 */
  public setFormItemPresentation(
    owner: HTMLElement,
    label?: string,
    error?: string,
    groupError?: string,
  ): void {
    if (label === undefined && error === undefined && groupError === undefined) {
      if (this.itemPresentation?.owner !== owner) return;
      this.itemPresentation = undefined;
    } else {
      const current = this.itemPresentation;
      if (
        current?.owner === owner &&
        current.label === label &&
        current.error === error &&
        current.groupError === groupError
      )
        return;
      this.itemPresentation = { owner, label, error, groupError };
    }
    this.syncFieldAccessibility();
  }

  protected get fallbackAccessibleName(): string | undefined {
    return undefined;
  }

  private syncFieldAccessibility = (): void => {
    if (!this.isConnected || !this.rendered) return;
    const control = this.formItemControl;
    if (control !== this.accessibilityControl) {
      this.fieldAccessibility?.clear(this.root);
      this.accessibilityControl = control;
      this.fieldAccessibility = control && new FieldAccessibility(control);
    }
    const presentation = this.fieldAccessibility;
    if (!control || !presentation) return;

    const labelledBy = referenceElements(this, "aria-labelledby");
    const externalLabels = Array.from(this.labels ?? []) as HTMLLabelElement[];
    const explicit = this.getAttribute("aria-label");
    const name =
      (labelledBy.length ? referenceText(labelledBy) : explicit) ??
      (referenceText(externalLabels) ||
        presentation.authoredValue("aria-label") ||
        referenceText(referenceElements(control, "aria-labelledby")) ||
        referenceText(control.labels ?? []) ||
        this.getAttribute("label") ||
        this.fallbackAccessibleName ||
        this.itemPresentation?.label);
    presentation.attribute("aria-label", name || undefined);
    presentation.attribute("aria-required", String(this.contextRequired));

    const describedBy = referenceElements(this, "aria-describedby");
    const error = this.itemPresentation?.error ?? this.displayedValidityMessage;
    const invalid = !!(error || this.displayedValidityMessage);
    const fieldDescription = error === this.itemPresentation?.groupError ? undefined : error;
    const description = Array.from(
      new Set([referenceText(describedBy), fieldDescription].filter(Boolean)),
    ).join(" ");
    presentation.attribute(
      "aria-invalid",
      invalid ? "true" : (this.getAttribute("aria-invalid") ?? "false"),
    );
    // 引用节点和编辑控件在同一 ShadowRoot，保留宿主已有描述。
    presentation.describe(this.root, description);

    this.accessibilityObserver?.disconnect();
    this.accessibilityObserver ??= new MutationObserver(this.syncFieldAccessibility);
    this.accessibilityObserver.observe(this.parentElement ?? this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["for", "id", "label", "slot", "aria-hidden", "hidden"],
    });
    for (const element of [...labelledBy, ...externalLabels, ...describedBy]) {
      this.accessibilityObserver.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["id", "aria-hidden", "hidden"],
      });
    }
  };

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
  /** 字段可拒绝保存和重放历史状态，同时继续参与提交和原生自动填充。 */
  protected get formStateRestorationEnabled(): boolean {
    return true;
  }
  protected get acceptsAutocompleteText(): boolean {
    return false;
  }
  /** Safari 16.4 基线使用版本化字符串；显式 null 禁止保存该字段的恢复 state。 */
  protected serializeFormState(): string | null {
    if (!this.formStateRestorationEnabled) return null;
    return JSON.stringify({ version: 1, value: this.getValue() ?? "" });
  }
  protected syncNativeValue(): void {
    if (!this.internals || !this.nativeValueEnabled) return;
    this.syncAutocomplete();
    const value = this.isDisabled() ? null : this.serializeFormValue();
    // Older WebKit leaves the previous value in place when passed null (WebKit 258870).
    this.internals.setFormValue(value ?? new FormData(), this.serializeFormState());
    const anchor = this.root?.querySelector<HTMLInputElement>("input,textarea,select");
    if (anchor) {
      anchor.disabled = this.isDisabled();
      if ("readOnly" in anchor)
        anchor.readOnly = readFormBooleanAttribute(this.getAttribute("readonly")) ?? false;
    }
    this.syncNativeValidity();
  }
  protected syncAutocomplete(): void {
    const value = this.getAttribute("autocomplete") ?? this.formContext?.getSnapshot().autocomplete;
    for (const control of this.root?.querySelectorAll("input,textarea,select") ?? []) {
      if (value === undefined) control.removeAttribute("autocomplete");
      else if (control.getAttribute("autocomplete") !== value)
        control.setAttribute("autocomplete", value);
    }
  }
  public formResetCallback(): void {
    this.applyingFormReset = true;
    try {
      this.reset();
    } finally {
      this.applyingFormReset = false;
    }
  }
  public formStateRestoreCallback(
    state: string | File | FormData | null,
    mode: "restore" | "autocomplete",
  ): void {
    if (typeof state !== "string") return;
    if (mode !== "autocomplete" && !this.formStateRestorationEnabled) return;
    let value: unknown;
    try {
      const decoded = JSON.parse(state);
      if (decoded?.version === 1 && Object.hasOwn(decoded, "value")) value = decoded.value;
      else if (mode === "autocomplete" && this.acceptsAutocompleteText) value = state;
      else return;
    } catch {
      if (mode !== "autocomplete" || !this.acceptsAutocompleteText) return;
      value = state;
    }
    try {
      this.value = value;
      this.manualValidity = {};
      this.manualMessage = "";
      this.validResult();
      this.formContext?.fieldValidityCleared?.(this.contextField);
      this.syncNativeValue();
    } catch {
      /* 合法 JSON 也可能不是此控件接受的值，不让损坏的状态中断页面。 */
    }
  }

  /** 将宿主约束显式应用到探测用原生 input，不让 Shadow DOM input 变成第二个字段。 */
  protected get nativeBadInput(): boolean {
    return false;
  }

  protected get nativeValueMissing(): boolean | undefined {
    return undefined;
  }

  protected get nativeSubmissionError(): string | undefined {
    return undefined;
  }

  protected get nativeConstraintValues(): readonly unknown[] {
    return [this.getValue()];
  }

  protected syncNativeValidity(manualAnchor?: HTMLElement): void {
    if (!this.internals || !this.ownerDocument) return;
    const anchor =
      this.root?.querySelector<HTMLElement>("input,textarea,select,button,[tabindex]") ?? undefined;
    const flags: ValidityStateFlags = {};
    let message = "";
    const readOnly = readFormBooleanAttribute(this.getAttribute("readonly")) ?? false;
    const checksConstraints = !this.isDisabled() && !readOnly && !this.grouped;
    if (checksConstraints) {
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
      const submissionError = this.nativeSubmissionError;
      if (submissionError) {
        flags.customError = true;
        message = submissionError;
      }
      for (const flag of Object.keys(this.manualValidity) as (keyof ValidityStateFlags)[]) {
        if (this.manualValidity[flag]) flags[flag] = true;
      }
    }
    const manualError = checksConstraints && Object.values(this.manualValidity).some(Boolean);
    if (manualError) message = this.manualMessage;
    const constraintMessage = Object.values(flags).some(Boolean)
      ? message || "请检查字段值"
      : undefined;
    const businessMessage = checksConstraints ? this.businessMessage : undefined;
    if (businessMessage) flags.customError = true;
    const validationMessage =
      (manualError ? constraintMessage : businessMessage) ?? constraintMessage;
    // 某些复合控件没有可聚焦锚点，不能把非后代元素传给 setValidity。
    this.internals.setValidity(flags, validationMessage ?? "", manualAnchor ?? anchor);
    const next: NativeFieldValidity = {
      valid: this.internals.validity.valid,
      message: validationMessage,
      flags,
      constraintMessage,
      willValidate: this.internals.willValidate,
    };
    const previous = this.nativeValidity;
    this.nativeValidity = next;
    if (!this.isConnected || !this.rendered) return;
    if (
      previous &&
      previous.valid === next.valid &&
      previous.message === next.message &&
      previous.constraintMessage === next.constraintMessage &&
      previous.willValidate === next.willValidate &&
      Object.keys(previous.flags).length === Object.keys(flags).length &&
      Object.keys(flags).every((flag) => previous.flags[flag as keyof ValidityStateFlags])
    )
      return;
    this.dispatchEvent(
      new CustomEvent<NativeFieldValidity>(FORM_CONTEXT_EVENTS.nativeValidity, {
        bubbles: true,
        detail: { ...next, flags: { ...flags }, duringReset: this.applyingFormReset },
      }),
    );
  }
  public reset(): void {
    this.dirtyValue = false;
    this.applyDefaultValue();
    // reset 只清业务错误；手动 setValidity 的状态及消息需由调用方显式清除。
    this.applyBusinessValidity();
    this.validResult();
    this.formContext?.fieldValidityCleared?.(this.contextField);
    this.syncNativeValue();
  }
}