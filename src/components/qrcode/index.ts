import BaseComponent from "../base";
import css from "./index.less?inline";
import { QRCodeRender, renderToCanvas } from "qrcode-generator-es";
import { $one } from "ph-utils/dom";

type QrcodeState = {
  /** 二维码内容 */
  text?: string;
  /** 二维码颜色 */
  fill: string;
  /** 二维码大小 */
  size?: string | number;
  /** 二维码等级 */
  level?: "L" | "M" | "Q" | "H";
  /** 插入二维码中间的图标 */
  icon?: string;
};

export default class Qrcode extends BaseComponent<QrcodeState> {
  public static baseName = "qrcode";

  private _qrcode?: QRCodeRender;

  constructor() {
    super();
    this.version = 2;
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes(): string[] | null | undefined {
    return ["text", "fill", "size", "level", "icon"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this._state[name as "text"] = newValue as never;
      this.#updateOption(name, newValue);
    }
  }

  protected updateDOM(): void {
    this.#drawQrcode();
  }

  afterInit(): void {
    this.#drawQrcode();
  }

  beforeDestroy(): void {
    if (this._qrcode) {
      this._qrcode.destroy();
      this._qrcode = undefined;
    }
  }

  #updateOption(name: string, value: any) {
    if (this._qrcode) {
      if (name === "icon") {
        this._qrcode.option.icon = value ? { src: value } : undefined;
      } else {
        this._qrcode.option[name as "text"] = value;
      }
    }
  }

  #drawQrcode() {
    if (!this._qrcode) {
      const $el = $one("canvas", this.root);
      if ($el) {
        this._qrcode = new QRCodeRender({
          renderFn: renderToCanvas,
          text: this._state.text,
          size: Number(this._state.size || 120),
          level: this._state.level || "M",
          fill: this._state.fill || "#000000",
          icon: this._state.icon ? { src: this._state.icon } : undefined,
          el: $el,
        });
      }
    }
    if (this._qrcode != null && this._state.text) {
      this._qrcode.render();
    }
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      template: this.render(),
      style: css,
    };
  }
  render() {
    return `<canvas class='renderer-el'></canvas>`;
  }
}