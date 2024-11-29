import { formatClass, formatStyle } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../util";
import { random } from "ph-utils";

export default class Form extends BaseComponent {
  public static baseName = "form";
  /** 是否行内表单 */
  public inline = false;
  public labelPosition?: "left" | "right" | "top" = "right";
  public labelWidth?: string;
  public formId: string;
  public disabled: boolean = false;
  constructor() {
    super();
    this.formId = `l-f${random(3)}-${random(6)}`;
    initAttr(this);
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
      "-l-form-label-width": this.labelWidth ? this.labelWidth : "",
    });
    this.shadow.innerHTML = `<form class="${classStr}" style="${styleStr}"><slot></slot></form>`;
  }
}
