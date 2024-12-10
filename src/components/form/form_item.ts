import { formatClass, $one } from "ph-utils/dom";
import { Form, initAttr } from "..";
import BaseComponent from "../base";

export default class FormItem extends BaseComponent {
  public static baseName = "form-item";
  public disabled: boolean = false;
  public sharedAttrs: string[] = ["disabled"];
  /** 是否必须 */
  public required: boolean = false;
  public error?: string;
  /** 标签文本 */
  public label?: string;
  private formId?: string;

  public constructor() {
    super();
    initAttr(this);
  }

  static get observedAttributes() {
    return ["error", "label"];
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
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyle(["form"]);
    this.formId = this._getFormId();
  }

  public setError(error: string) {
    this.error = error;
  }

  public render() {
    const classObj = [
      `l-form-item`,
      this.required ? "is-required" : undefined,
      this.error ? "is-error" : undefined,
    ];
    const labelStr =
      this.label != null
        ? `<label class="l-form-item__label">${this.label}</label>`
        : "";
    const errorStr = this.error
      ? `<div class="l-form-item__error">${this.error}</div>`
      : "";
    this.shadow.innerHTML = [
      `<div class="${formatClass(classObj)}">${labelStr}`,
      '<div class="l-form-item__content">',
      `<slot></slot>${errorStr}</div></div>`,
    ].join("");
  }

  private _updateError() {
    let $error = $one(".l-form-item__error", this);
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
        const $parent = $one(".l-form-item__content", this);
        $parent.appendChild($error);
      }
    }
  }

  private _updateLabel() {
    let $label = $one(".l-form-item__label", this);
    if ($label == null) {
      if (this.label != null) {
        $label = document.createElement("div");
        $label.className = "l-form-item__label";
        $label.textContent = this.label;
        const $main = $one(".l-form-item", this);
        $main.appendChild($label);
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
        formId = ($parent as Form).formId;
        break;
      }
      if (tagName === "BODY") break;
      $parent = $parent.parentElement;
    }
    $parent = null;
    return formId;
  }
}
