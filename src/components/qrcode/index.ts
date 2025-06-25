import BaseComponent from "../base";
//@ts-ignore
import css from "./index.less?inline";

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

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }
  render() {}
}
