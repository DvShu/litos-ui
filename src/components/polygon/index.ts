import { formatClass, formatStyle } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";

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
    this.loadStyleText(css);
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
    return `<div part="default" class="${classStr}" style="${styleStr}"></div>`;
  }
}
