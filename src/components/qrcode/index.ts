import BaseComponent from "../base";
//@ts-ignore
import css from "./index.less?inline";
import { QRCodeRender, renderToCanvas } from "qrcode-generator-es";
import { $one } from "ph-utils/dom";

export default class Qrcode extends BaseComponent {
  public static baseName = "qrcode";

  /** 二维码内容 */
  public text?: string;
  /** 二维码颜色 */
  public fill: string = "#000000";
  /** 二维码大小 */
  public size?: string | number = "100";
  /** 二维码等级 */
  public level?: "L" | "M" | "Q" | "H" = "M";
  /** 插入二维码中间的图标 */
  public icon?: string;
  private _qrcode?: QRCodeRender;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes(): string[] | null | undefined {
    return ["text", "fill", "size", "level", "icon"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (oldValue !== newValue) {
      this[name as "text"] = newValue;
      this.#updateOption(name, newValue);
      this.#drawQrcode();
    }
  }

  afterInit(): void {
    this.#drawQrcode();
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
        console.log(this.icon);
        this._qrcode = new QRCodeRender({
          renderFn: renderToCanvas,
          text: this.text,
          size: Number(this.size),
          level: this.level,
          fill: this.fill,
          icon: this.icon ? { src: this.icon } : undefined,
          el: $el,
        });
      }
    }
    if (this._qrcode != null && this.text) {
      console.log(this._qrcode);
      this._qrcode.render();
    }
  }

  render() {
    return "<canvas class='renderer-el' width='100' height='100'></canvas>";
  }
}
