import { $one, addClass, removeClass, $$ } from "utilane/browser";
import { kebabToCamel, unitNumberStr } from "../utils";
import type { RuleType, SchemaType } from "utilane";
import formItemSheet from "./form_item_style";
import BaseComponent from "../base";
import FormInner from "./form_inner";
import {
  FieldAccessibility,
  fieldControlSelector,
  referenceElements,
  type NativeFieldControl,
} from "./accessibility";
import {
  createFormContextProvider,
  FORM_CONTEXT_EVENTS,
  provideFormContext,
  readFormBooleanAttribute,
  requestFormContext,
} from "./context";
import type { FormContextField, FormContextProvider, FormFieldValidity } from "./context";

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

type ItemField = FormInner | NativeFieldControl;
const nativePresentationOwners = new WeakMap<NativeFieldControl, FormItem>();

export default class FormItem extends BaseComponent<FormItemState> {
  public static baseName = "form-item";

  private readonly itemContext = createFormContextProvider();
  private disposeContext?: () => void;
  private formContext?: FormContextProvider;
  private unregisterForm?: () => void;
  private programRules?: Omit<SchemaType, "key">;
  private validationError?: string;
  private accessibilityObserver?: MutationObserver;
  private accessibilityScheduled = false;
  private readonly connectedFields = new Set<ItemField>();
  private readonly nativePresentation = new Map<NativeFieldControl, FieldAccessibility>();
  private readonly itemProvider: FormContextProvider = {
    getSnapshot: () => this.itemContext.getSnapshot(),
    registerField: (field) => {
      const unregister = this.itemContext.registerField(field);
      this.scheduleAccessibility();
      return () => {
        if (unregister()) this.scheduleAccessibility();
      };
    },
  };
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
          this.formContext?.fieldNameChanged?.(this.formField, this._state.prop);
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
    const rulesChanged = ["required", "verify", "pattern", "validity"].includes(name);
    if (rulesChanged) this.programRules = undefined;
    if (this.rendered && (name === "prop" || rulesChanged)) this._parseSchema();
  }

  private updateContext(): void {
    const { prop, innerBlock, required, disabled } = this._state;
    this.itemContext.updateConfiguration({ prop, innerBlock, required, disabled });
  }

  /** @internal 处理先于 Form 升级的表单项。 */
  public refreshFormContext = (): void => {
    if (!this.rendered) return;
    const provider = requestFormContext(this, "form");
    if (this.formContext === provider) return;
    this.unregisterForm?.();
    this.formContext = provider;
    this.unregisterForm = provider?.registerField(this.formField);
    if (provider) this._parseSchema();
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
    if (changedProps.has("label") || changedProps.has("required")) this.updateAccessibility();
  }

  afterInit(): void {
    this.updateContext();
    this.disposeContext = provideFormContext(this, "item", this.itemProvider);
    // 先定义的字段可能已挂载；提供者延迟升级时主动重关联，不依赖 DOM 变更。
    for (const child of this.querySelectorAll<HTMLElement>("*")) {
      const consumer = child as HTMLElement & { refreshFormContext?: () => void };
      consumer.refreshFormContext?.();
    }
    this.addEventListener(FORM_CONTEXT_EVENTS.validity, this.receiveValidity);
    this.addEventListener(FORM_CONTEXT_EVENTS.configuration, this.refreshFormContext);
    this.refreshFormContext();
    this._updateRequired();
    this._updateError();
    this.root.addEventListener("click", this.focusFieldFromLabel);
    this.root.querySelector("slot")?.addEventListener("slotchange", this.updateAccessibility);
    this.addEventListener("focusin", this.updateAccessibility);
    this.accessibilityObserver = new MutationObserver(this.updateAccessibility);
    this.accessibilityObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "type",
        "name",
        "slot",
        "for",
        "id",
        "hidden",
        "required",
        "aria-label",
        "aria-labelledby",
        "aria-describedby",
        "aria-invalid",
        "aria-required",
      ],
    });
  }

  beforeDestroy(): void {
    this.root.removeEventListener("click", this.focusFieldFromLabel);
    this.root.querySelector("slot")?.removeEventListener("slotchange", this.updateAccessibility);
    this.removeEventListener("focusin", this.updateAccessibility);
    this.accessibilityObserver?.disconnect();
    for (const field of this.connectedFields) this.clearFieldPresentation(field);
    this.connectedFields.clear();
    this.removeEventListener(FORM_CONTEXT_EVENTS.validity, this.receiveValidity);
    this.removeEventListener(FORM_CONTEXT_EVENTS.configuration, this.refreshFormContext);
    this.unregisterForm?.();
    this.unregisterForm = undefined;
    this.formContext = undefined;
    this.disposeContext?.();
    this.disposeContext = undefined;
    this.itemContext.dispose();
    this.validationError = undefined;
  }

  public setRules(rules: { required?: boolean; rules?: RuleType[]; message?: string }) {
    this.programRules = {
      ...rules,
      rules: Array.isArray(rules.rules) ? [...rules.rules] : rules.rules,
    };
    if (this.rendered) this._parseSchema();
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
      fragment.appendChild(this.createLabel(this._state.label));
    }
    const $content = $$("div", { class: "l-form-item__content" });
    $content.appendChild($$("slot"));
    if (this.errorMessage) {
      $content.appendChild(
        $$("div", {
          id: "l-form-item-error",
          class: "l-form-item__error",
          textContent: this.errorMessage,
        }),
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
    if (!prop) return this._updateRules();
    if (this.programRules) return this._updateRules({ ...this.programRules, key: prop });
    const rules: RuleType[] = this._state.verify ? this._state.verify.split("|") : [];
    if (this._state.pattern) rules.push(new RegExp(this._state.pattern));
    this._updateRules({
      key: prop,
      required: this._state.required,
      message: this._state.validity,
      rules,
    });
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
      $error.id = "l-form-item-error";
      $error.className = "l-form-item__error";
      $error.textContent = message;
      $one(".l-form-item__content", this.root)?.appendChild($error);
    }
    this.updateAccessibility();
  }

  private _updateLabel() {
    if (!this.rendered) return;
    const current = this.root.querySelector(".l-form-item__label");
    const label = this._state.label;
    if (label === undefined) current?.remove();
    else if (!current) this.root.prepend(this.createLabel(label));
    else this.setLabelText(current, label);
  }

  private createLabel(text: string): HTMLLabelElement {
    const label = this.ownerDocument.createElement("label");
    label.className = "l-form-item__label";
    label.id = "l-form-item-label";
    this.setLabelText(label, text);
    return label;
  }

  private setLabelText(label: Element, text: string): void {
    label.replaceChildren();
    if (text) {
      label.removeAttribute("aria-hidden");
      label.append($$("span", { class: "l-form-item__required", "aria-hidden": "true" }), text);
    } else label.setAttribute("aria-hidden", "true");
  }

  private itemFields(): ItemField[] {
    const fields: ItemField[] = [];
    const visit = (node: Element) => {
      if (node instanceof FormItem || node.hasAttribute("hidden")) return;
      if (node instanceof FormInner || node.matches(fieldControlSelector)) {
        fields.push(node as ItemField);
        return;
      }
      for (const child of node.children) visit(child);
    };
    for (const node of this.root.querySelector("slot")?.assignedElements() ?? []) visit(node);
    return fields;
  }

  private focusFieldFromLabel = (event: Event): void => {
    if (event.defaultPrevented || !this._state.label?.trim()) return;
    if (!(event.target instanceof Element) || !event.target.closest(".l-form-item__label")) return;
    const fields = this.itemFields();
    if (fields.length !== 1 || this._state.disabled) return;
    const field = fields[0];
    if (field instanceof FormInner && field.isDisabled()) return;
    const control = field instanceof FormInner ? field.formItemControl : field;
    // 调用 focus 保留复选框、步进器和移动端原生控件自己的激活行为。
    if (control && !control.matches(":disabled")) control.focus();
  };

  private scheduleAccessibility(): void {
    if (this.accessibilityScheduled) return;
    this.accessibilityScheduled = true;
    queueMicrotask(() => {
      this.accessibilityScheduled = false;
      this.updateAccessibility();
    });
  }

  private clearFieldPresentation(field: ItemField): void {
    if (field instanceof FormInner) field.setFormItemPresentation(this);
    else {
      this.nativePresentation.get(field)?.clear(this);
      this.nativePresentation.delete(field);
      if (nativePresentationOwners.get(field) === this) nativePresentationOwners.delete(field);
    }
  }

  private updateAccessibility = (): void => {
    if (!this.isConnected || !this.rendered) return;
    const fields = this.itemFields();
    for (const field of this.connectedFields) {
      if (!fields.includes(field)) this.clearFieldPresentation(field);
    }
    this.connectedFields.clear();
    const label = this._state.label?.trim() || undefined;
    const error = this.errorMessage;
    const single = fields.length === 1 ? fields[0] : undefined;
    const named = this._state.prop ? fields.filter((field) => field.name === this._state.prop) : [];
    const errorCandidate = single ?? (named.length === 1 ? named[0] : undefined);
    const errorField =
      errorCandidate instanceof FormInner && !errorCandidate.formItemControl
        ? undefined
        : errorCandidate;
    const singleSupportsLabel =
      single && (!(single instanceof FormInner) || !!single.formItemControl);
    const groupError = fields.length > 0 && !errorField ? error || undefined : undefined;
    for (const field of fields) {
      this.connectedFields.add(field);
      const fieldLabel = singleSupportsLabel ? label : undefined;
      const fieldError = field === errorField ? error : undefined;
      if (field instanceof FormInner) {
        field.setFormItemPresentation(this, fieldLabel, fieldError, groupError);
      } else {
        let presentation = this.nativePresentation.get(field);
        if (!presentation) {
          nativePresentationOwners.get(field)?.clearFieldPresentation(field);
          presentation = new FieldAccessibility(field);
          this.nativePresentation.set(field, presentation);
          nativePresentationOwners.set(field, this);
        }
        const ownName =
          presentation.authoredValue("aria-label") !== null ||
          referenceElements(field, "aria-labelledby").length > 0 ||
          !!field.labels?.length;
        presentation.attribute("aria-label", ownName ? undefined : fieldLabel);
        presentation.attribute("aria-invalid", fieldError ? "true" : undefined);
        presentation.attribute(
          "aria-required",
          this._state.required &&
            !field.required &&
            presentation.authoredValue("aria-required") === null
            ? "true"
            : undefined,
        );
        presentation.describe(this, fieldError ?? "");
      }
    }
    const content = this.root.querySelector(".l-form-item__content");
    if (!content) return;
    const groupLabel = !!label && fields.length > 0 && !singleSupportsLabel;
    if (groupLabel || groupError) content.setAttribute("role", "group");
    else content.removeAttribute("role");
    if (groupLabel) content.setAttribute("aria-labelledby", "l-form-item-label");
    else content.removeAttribute("aria-labelledby");
    if (groupError) content.setAttribute("aria-describedby", "l-form-item-error");
    else content.removeAttribute("aria-describedby");
  };

  private _updateRules(schema?: SchemaType) {
    this.emit("form-rule-change", { bubbles: true, composed: true, detail: schema });
  }
}