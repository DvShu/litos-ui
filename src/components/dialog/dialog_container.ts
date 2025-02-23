import BaseComponent from "../base";
//@ts-ignore
import css from "./dialog_container.css?inline";
import { $$, formatClass, $one } from "ph-utils/dom";
import { initAttr } from "../utils";

export default class DialogContainer extends BaseComponent {
  public static baseName = "dialog-container";

  /** 是否显示标题栏 */
  public showHeader = true;
  /** 头部内容 */
  public header?: string;
  /** 是否显示底部 */
  public showFooter = true;
  /** 是否显示取消按钮 */
  public showCancel = true;
  /** 取消按钮文本 */
  public cancelText = "取消";
  /** 是否显示确定按钮 */
  public showOk = true;
  /** 确定按钮文本 */
  public okText = "确定";
  /** 是否显示右上角关闭按钮, 1 - 显示在框内， 2 - 显示在框角, 0 - 不显示 */
  public showClose = 1;
  public containerClass?: string;

  connectedCallback(): void {
    this.loadStyleText(css);
    initAttr(this);
    if (this.showClose === 2) {
      this.classList.add("l-container-close-outside");
    }
    super.connectedCallback();
  }

  static get observedAttributes(): string[] | null | undefined {
    return ["show-close"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    switch (name) {
      case "show-close":
        this.showClose = Number(newValue);
        if (this.showClose === 2) {
          this.classList.add("l-container-close-outside");
        } else {
          this.classList.remove("l-container-close-outside");
        }
        let $close = $one(".l-btn-dialog-close", this.root);
        if (this.showClose === 0 && $close) {
          $close.remove();
        } else {
          if ($close) {
            $close.className = this.#closeBtnClass();
          } else {
            $close = this.#createCloseBtn();
            this.root.appendChild($close);
          }
        }
        break;
    }
  }

  #closeBtnClass() {
    return `l-btn-dialog-close l-dialog-close${this.showClose}`;
  }

  #createCloseBtn() {
    const $close = $$("l-button", {
      shape: "circle",
      type: "normal",
      class: this.#closeBtnClass(),
    });
    const $closeIcon = $$("l-close-icon");
    $close.appendChild($closeIcon);
    return $close;
  }

  render() {
    const children = [];
    if (this.showClose !== 0) {
      children.push(this.#createCloseBtn());
    }
    const $main = $$("div", { class: "l-dialog-main" });
    if (this.showHeader) {
      // header
      const $header = $$("header", { class: "l-dialog-header" });
      const $headerSlot = $$("slot", { name: "header" });
      $headerSlot.textContent = this.header || "";
      $header.appendChild($headerSlot);
      $main.appendChild($header);
    }

    // body
    const $body = $$("div", {
      class: formatClass(["l-dialog-container", this.containerClass]),
    });
    const $bodySlot = $$("slot");
    $body.appendChild($bodySlot);
    $main.appendChild($body);

    if (this.showFooter) {
      // footer
      const $footer = $$("div", { class: "l-dialog-footer" });
      const $footerSlot = $$("slot", { name: "footer" });
      if (this.showCancel) {
        const $cancelBtn = $$("l-button");
        $cancelBtn.textContent = this.cancelText;
        $footerSlot.appendChild($cancelBtn);
      }
      if (this.showOk) {
        const $okBtn = $$("l-button", { type: "primary" });
        $okBtn.textContent = this.okText;
        $footerSlot.appendChild($okBtn);
      }
      $footer.appendChild($footerSlot);
      $main.appendChild($footer);
    }
    children.push($main);
    return children;
  }
}
