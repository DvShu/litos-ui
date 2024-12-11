import { formatClass, formatStyle } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../util";

export default class Polygon extends BaseComponent {
  public static baseName = "polygon";

  public shape:
    | "triangle-top"
    | "triangle-bottom"
    | "triangle-left"
    | "triangle-right"
    | "triangle-top-right"
    | "triangle-top-left"
    | "triangle-bottom-right"
    | "triangle-bottom-left" = "triangle-top";
  public background?: string;

  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyle(["polygon"]);
    super.connectedCallback();
  }
  render() {
    const classStr = formatClass([
      "l-polygon",
      this.shape ? `l-polygon-${this.shape}` : "",
    ]);
    const styleStr = formatStyle([
      this.background ? `--l-polygen-background: ${this.background}` : "",
    ]);
    this.root.innerHTML = `<div part="default" class="${classStr}" style="${styleStr}"></div>`;
  }
}
