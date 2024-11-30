import { formatClass, formatStyle } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../util";
import { random } from "ph-utils";
import { emit } from "./form_events";

export default class Form extends BaseComponent {
  public static baseName = "form";
  /** 是否行内表单 */
  public inline = false;
  public labelPosition?: "left" | "right" | "top" = "right";
  public labelWidth?: string;
  public formId: string;
  public disabled: boolean = false;
  public sharedAttrs: string[] = ["disabled", "formId"];
  constructor() {
    super();
    this.formId = `l-f${random(3)}-${random(6)}`;
    initAttr(this);
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "disabled") {
      const val = parseAttrValue(newValue, false, name);
      if (val !== this.disabled) {
        emit(this.formId, "attributeChanged", "form", name, val, this.disabled);
        this.disabled = val;
      }
    }
  }

  connectedCallback(): void {
    this.loadStyle(["form"]);
    super.connectedCallback();
  }

  render() {
    const classStr = formatClass([
      "l-form",
      this.inline ? "l-form-inline" : undefined,
      `l-form--${this.labelPosition}`,
    ]);
    const styleStr = formatStyle({
      "--l-form-label-width": this.labelWidth ? this.labelWidth : "",
    });
    this.shadow.innerHTML = `<form class="${classStr}" style="${styleStr}"><slot></slot></form>`;
  }
}
