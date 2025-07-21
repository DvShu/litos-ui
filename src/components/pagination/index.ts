import BaseComponent from "../base"
//@ts-ignore
import css from "./index.less?inline"

export default class Pagination extends BaseComponent {
  public static baseName = "pagination";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }
  render() {}
}