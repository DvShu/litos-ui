import BaseComponent from "../base";
//@ts-ignore
import css from "./dialog_container.css?inline";
import { $$, formatClass, $one, $, iterate, on, off, shouldEventNext } from "ph-utils/dom";

type DialogContainerState = {
  /** 是否显示标题栏 */
  showHeader: boolean;
  /** 头部内容 */
  header?: string;
  /** 是否显示底部 */
  showFooter: boolean;
  /** 是否显示取消按钮 */
  showCancel: boolean;
  /** 取消按钮文本 */
  cancelText: string;
  /** 是否显示确定按钮 */
  showOk: boolean;
  /** 确定按钮文本 */
  okText: string;
  /** 是否显示右上角关闭按钮, 1 - 显示在框内， 2 - 显示在框角, 0 - 不显示 */
  showClose: number;
  /** 容器类名 */
  containerClass?: string;
};

export default class DialogContainer extends BaseComponent<DialogContainerState> {
  public static baseName = "dialog-container";

  constructor() {
    super();
    this.version = 2;
    this._state = {
      showHeader: true,
      showFooter: true,
      showCancel: true,
      cancelText: "取消",
      showOk: true,
      okText: "确定",
      showClose: 1,
    };
  }

  afterInit(): void {
    if (this._state.showClose === 2) {
      this.classList.add("l-container-close-outside");
    }
    const $actions = $("[data-action]", this.root) as HTMLElement[];
    iterate($actions, ($action) => {
      on($action, "click", this.#handleEvent);
    });
  }

  beforeDestroy(): void {
    const $actions = $("[data-action]", this.root) as HTMLElement[];
    iterate($actions, ($action) => {
      off($action, "click", this.#handleEvent);
    });
  }

  #handleEvent(e: Event) {
    const [next, action] = shouldEventNext(e, "data-action");
    if (next) {
      this.dispatchEvent(
        new CustomEvent("dialogAction", {
          detail: { action },
          composed: true,
        }),
      );
    }
  }

  static get observedAttributes(): string[] | null | undefined {
    return [
      "show-header",
      "header",
      "show-footer",
      "show-cancel",
      "cancel-text",
      "show-ok",
      "ok-text",
      "show-close",
      "container-class",
    ];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "show-header":
        this._state.showHeader = newValue !== null;
        this.connectedCallback();
        break;
      case "header":
        this._state.header = newValue || undefined;
        this.connectedCallback();
        break;
      case "show-footer":
        this._state.showFooter = newValue !== null;
        this.connectedCallback();
        break;
      case "show-cancel":
        this._state.showCancel = newValue !== null;
        this.connectedCallback();
        break;
      case "cancel-text":
        this._state.cancelText = newValue || "取消";
        this.connectedCallback();
        break;
      case "show-ok":
        this._state.showOk = newValue !== null;
        this.connectedCallback();
        break;
      case "ok-text":
        this._state.okText = newValue || "确定";
        this.connectedCallback();
        break;
      case "show-close":
        this._state.showClose = Number(newValue);
        if (this._state.showClose === 2) {
          this.classList.add("l-container-close-outside");
        } else {
          this.classList.remove("l-container-close-outside");
        }
        let $close = $one(".l-btn-dialog-close", this.root);
        if (this._state.showClose === 0 && $close) {
          off($close, "click", this.#handleEvent);
          $close.remove();
        } else {
          if ($close) {
            $close.className = this.#closeBtnClass();
          } else {
            $close = this.#createCloseBtn();
            on($close, "click", this.#handleEvent);
            this.root.appendChild($close);
          }
        }
        break;
      case "container-class":
        this._state.containerClass = newValue || undefined;
        this.connectedCallback();
        break;
    }
  }

  #closeBtnClass() {
    return `l-btn-dialog-close l-dialog-close${this._state.showClose}`;
  }

  #createCloseBtn() {
    const $close = $$("l-button", {
      shape: "circle",
      type: "normal",
      class: this.#closeBtnClass(),
      "data-action": "close",
    });
    const $closeIcon = $$("l-close-icon");
    $close.appendChild($closeIcon);
    return $close;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      style: css,
      template: this.render(),
    };
  }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    if (this._state.showClose !== 0) {
      fragment.appendChild(this.#createCloseBtn());
    }
    const $main = $$("div", { class: "l-dialog-main" });
    if (this._state.showHeader) {
      // header
      const $header = $$("header", { class: "l-dialog-header" });
      const $headerSlot = $$("slot", { name: "header" });
      $headerSlot.textContent = this._state.header || "";
      $header.appendChild($headerSlot);
      $main.appendChild($header);
    }

    // body
    const $body = $$("div", {
      class: formatClass(["l-dialog-container", this._state.containerClass]),
    });
    const $bodySlot = $$("slot");
    $body.appendChild($bodySlot);
    $main.appendChild($body);

    if (this._state.showFooter) {
      // footer
      const $footer = $$("div", { class: "l-dialog-footer" });
      const $footerSlot = $$("slot", { name: "footer" });
      if (this._state.showCancel) {
        const $cancelBtn = $$("l-button", { "data-action": "cancel" });
        $cancelBtn.textContent = this._state.cancelText;
        $footerSlot.appendChild($cancelBtn);
      }
      if (this._state.showOk) {
        const $okBtn = $$("l-button", { type: "primary", "data-action": "ok" });
        $okBtn.textContent = this._state.okText;
        $footerSlot.appendChild($okBtn);
      }
      $footer.appendChild($footerSlot);
      $main.appendChild($footer);
    }
    fragment.appendChild($main);
    return fragment;
  }
}