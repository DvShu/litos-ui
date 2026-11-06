import { parseAttrValue, unitNumberStr } from "../utils";
import BaseComponent from "../base";
import { formatClass, formatStyle } from "utilane/browser";
import type { ButtonColor } from "../utils";
import buttonSheet from "./style";

const accessibleAttributes = ["aria-label", "aria-labelledby", "aria-describedby"];

type ButtonState = {
  loading: boolean;
  htmlType: "submit" | "reset" | "button";
  text: boolean;
  ghost: boolean;
  color?: ButtonColor;
  height?: string;
  disabled: boolean;
  type: "normal" | "primary" | "normal-v2";
  shape: "default" | "round" | "circle";
  loadingText: string;
  size: "small" | "large" | "default";
  boxShadow: "box-shadow-none" | "box-shadow";
};

export default class Button extends BaseComponent<ButtonState> {
  public static baseName = "button";
  public static formAssociated = true;
  $btn?: HTMLButtonElement;
  private readonly internals?: ElementInternals;
  private readonly pendingActions = new Set<number>();
  private formDisabled = false;

  constructor() {
    super();
    this.internals = this.attachInternals?.();
    this.version = 2;
    this._state = {
      loading: false,
      htmlType: "button",
      text: false,
      ghost: false,
      disabled: false,
      type: "normal",
      shape: "default",
      loadingText: "加载中……",
      size: "default",
      boxShadow: "box-shadow-none",
    };
  }

  get form(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  get disabled() {
    return this._state.disabled;
  }

  set disabled(value: boolean) {
    this.setDisabled(value);
  }

  /** 自定义颜色对象；不再读取 HTML color attribute。 */
  get color(): ButtonColor | undefined {
    return this._state.color;
  }

  set color(value: ButtonColor | undefined) {
    this.setColor(value);
  }

  /** 替换颜色变量，传入 undefined 或空对象恢复默认配色。 */
  setColor(value?: ButtonColor): void {
    const previous = this._state.color;
    this._state.color = value;
    if (!this.$btn) return;
    for (const key of Object.keys(previous || {})) {
      this.$btn.style.removeProperty(key);
    }
    const cssText = formatStyle(value || {});
    if (cssText) {
      this.$btn.style.cssText += cssText;
    }
  }

  setLoading(loading: boolean) {
    this._state.loading = loading;
    this.syncDisabled();
    this.updateLoading();
  }

  setDisabled(value: boolean) {
    this._state.disabled = value;
    if (this.hasAttribute("disabled") !== value) this.toggleAttribute("disabled", value);
    this.syncDisabled();
  }

  // 初始化属性观察器
  static get observedAttributes() {
    return [
      "loading",
      "text",
      "ghost",
      "disabled",
      "height",
      "html-type",
      "type",
      "shape",
      "loading-text",
      "size",
      "box-shadow",
      ...accessibleAttributes,
    ];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "shape":
      case "type":
      case "size":
        this._state[name] = newValue as never;
        break;
      case "height":
        this._state[name] = unitNumberStr(newValue) as string;
        break;
      case "text":
      case "ghost":
        this._state[name] = parseAttrValue(newValue, false, name);
        break;
      case "disabled":
        this.setDisabled(parseAttrValue(newValue, false, name));
        break;
      case "loading":
        this._state[name] = parseAttrValue(newValue, false, name);
        this.syncDisabled();
        break;
      case "html-type":
        this._state.htmlType = newValue === "submit" || newValue === "reset" ? newValue : "button";
        if (this.$btn) this.$btn.type = this._state.htmlType;
        break;
      case "loading-text":
        this._state.loadingText = newValue ?? "加载中……";
        break;
      case "box-shadow":
        const bs = parseAttrValue(newValue, false, "box-shadow");
        this._state.boxShadow = `box-shadow${bs ? "" : "-none"}`;
        break;
      default:
        this.syncAccessibleAttribute(name);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (this.$btn) this.$btn.className = this._resetBtnClass();
    if (changedProps.has("loading") || changedProps.has("loading-text")) {
      this.updateLoading();
    }

    if (changedProps.has("height")) {
      this._updateHeight();
    }
  }

  beforeDestroy(): void {
    this.removeEventListener("click", this.handleFormClick);
    for (const action of this.pendingActions) window.clearTimeout(action);
    this.pendingActions.clear();
    this.$btn = undefined;
  }

  isFormButton() {
    const type = this.getHtmlType();
    return type === "submit" || type === "reset";
  }

  getHtmlType(): "submit" | "reset" | "button" {
    return this._state.htmlType as "submit" | "reset" | "button";
  }

  render_v2() {
    this._changedProperties.clear();
    return {
      styleSheets: [buttonSheet],
      template: this.render(),
    };
  }

  afterInit(): void {
    this.classList.add(`l-btn-${this._state.size || "default"}`);
    this.$btn = this.root.querySelector("button") ?? undefined;
    for (const name of accessibleAttributes) this.syncAccessibleAttribute(name);
    this.updateLoading();
    this._updateHeight();
    this.addEventListener("click", this.handleFormClick);
  }

  public render() {
    const $btn = this.ownerDocument.createElement("button");
    $btn.className = this._resetBtnClass();
    $btn.disabled = this.disabled || this._state.loading || this.formDisabled;
    $btn.type = this.getHtmlType();
    $btn.setAttribute("part", "default");
    const btnStyle = formatStyle(this._state.color || {});
    if (btnStyle) {
      $btn.style.cssText = btnStyle;
    }
    return $btn;
  }

  override click(): void {
    if (!this.$btn) {
      super.click();
      return;
    }
    this.$btn.click();
  }

  override focus(options?: FocusOptions): void {
    this.$btn?.focus(options);
  }

  override blur(): void {
    this.$btn?.blur();
  }

  public formDisabledCallback(disabled: boolean): void {
    this.formDisabled = disabled;
    this.syncDisabled();
  }

  private syncDisabled(): void {
    if (this.$btn) this.$btn.disabled = this.disabled || this._state.loading || this.formDisabled;
  }

  private syncAccessibleAttribute(name: string): void {
    const button = this.$btn;
    if (!button) return;
    const value = this.getAttribute(name);
    if (value === null) button.removeAttribute(name);
    else button.setAttribute(name, value);
  }

  private updateLoading(): void {
    const button = this.$btn;
    if (!button) return;
    const { loading, loadingText } = this._state;
    button.classList.toggle("l-btn-loading", loading);
    const label = this.ownerDocument.createElement(loading && loadingText ? "span" : "slot");
    if (loading) {
      const icon = this.ownerDocument.createElement("l-loading-icon");
      icon.className = "l-btn-spinner";
      icon.setAttribute("aria-hidden", "true");
      if (loadingText) label.textContent = loadingText;
      button.replaceChildren(icon, label);
    } else {
      button.replaceChildren(label);
    }
  }

  private handleFormClick = (event: MouseEvent): void => {
    const button = this.$btn;
    const type = this.getHtmlType();
    if (!button || button.disabled || type === "button" || event.defaultPrevented) return;

    // Wait for the click to finish bubbling so consumers can cancel the form action.
    const action = window.setTimeout(() => {
      this.pendingActions.delete(action);
      if (event.defaultPrevented || this.$btn !== button || button.disabled) return;
      const form = this.form;
      if (!form) return;
      if (type === "submit") HTMLFormElement.prototype.requestSubmit.call(form);
      else HTMLFormElement.prototype.reset.call(form);
    }, 0);
    this.pendingActions.add(action);
  };

  private _updateHeight() {
    if (this._state.height) {
      this.style.setProperty("--l-btn-height", this._state.height);
    } else {
      this.style.removeProperty("--l-btn-height");
    }
  }

  private _resetBtnClass() {
    return formatClass([
      "l-btn",
      `l-btn-${this._state.type}`,
      `l-btn-${this._state.shape}`,
      `l-btn-${this._state.boxShadow}`,
      this._state.ghost ? "l-btn-ghost" : "",
      this._state.text ? "l-btn-text" : "",
      this._state.loading ? "l-btn-loading" : "",
    ]);
  }
}