import BaseComponent from "../base";

// @ts-ignore
import css from "./index.less?inline";
// @ts-ignore
import maskCss from "../styles/mask.css?inline";

import { $$, $one, on, off, transition, shouldEventNext } from "ph-utils/dom";
import { kebabToCamel, parseAttrValue, unitNumberStr } from "../utils/index";

type ModalState = {
  /** 关闭时销毁 Modal 里的子元素 */
  destroyOnClose: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable: boolean;
  /** 是否展示遮罩 */
  mask: boolean;
  /** 是否显示取消按钮 */
  cancel: boolean;
  /** 取消按钮文本 */
  cancelText: string;
  /** 确定按钮文本 */
  okText: string;
  /** 对话框宽度 */
  width?: string;
  /** 确认按钮加载中 */
  confirmLoading: boolean;
  /** 右上角关闭按钮, 1-显示在框内，2-显示在框角, 0-不显示 */
  close: number;
  /** 对话框垂直方向位置 */
  verticalAlign: "top" | "bottom" | "middle";
  /** 是否是移动风格弹出框 */
  mobile: boolean;
  /** 设置 Modal 的 z-index */
  zIndex?: string;
  /** 是否显示对话框 */
  show: boolean;
  /** 是否显示头部 */
  header: boolean;
  /** 是否显示底部 */
  footer: boolean;
  /** 标题 */
  headerTitle?: string;
};

export default class Modal extends BaseComponent<ModalState> {
  static baseName: string = "modal";

  _bodyOverflow = "";

  constructor() {
    super();
    this.version = 2;
    this._state = {
      destroyOnClose: false,
      maskClosable: true,
      mask: true,
      cancel: true,
      cancelText: "取消",
      okText: "确定",
      confirmLoading: false,
      close: 1,
      verticalAlign: "top",
      mobile: false,
      show: false,
      header: true,
      footer: true,
    };
  }

  static get observedAttributes() {
    return [
      "show",
      "width",
      "confirm-loading",
      "destroy-on-close",
      "mask-closable",
      "mask",
      "cancel",
      "cancel-text",
      "ok-text",
      "close",
      "vertical-align",
      "mobile",
      "z-index",
      "header",
      "footer",
      "header-title",
    ];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "show":
      case "confirm-loading":
      case "destroy-on-close":
      case "mask-closable":
      case "mask":
      case "cancel":
      case "mobile":
      case "header":
      case "footer":
        this._state[kebabToCamel(name) as "show"] = parseAttrValue(newValue, false, name) as any;
        break;
      case "cancel-text":
        this._state.cancelText = parseAttrValue(newValue, "取消");
        break;
      case "ok-text":
        this._state.okText = parseAttrValue(newValue, "确定");
        break;
      case "close":
        this._state.close = parseAttrValue(newValue, 1);
        break;
      case "width":
        this._state[name] = unitNumberStr(newValue);
        break;
      case "vertical-align":
        this._state.verticalAlign = parseAttrValue(newValue, "top") as "top" | "bottom" | "middle";
        break;
      case "z-index":
        this._state.zIndex = newValue;
        break;
      case "header-title":
        this._state.headerTitle = newValue;
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("show")) {
      if (this._state.show) {
        this.#openModal();
      } else {
        this.#closeModal();
      }
    }
    if (changedProps.has("width")) {
      this._setWidth();
    }
    if (changedProps.has("confirm-loading")) {
      const $ok = $one('l-button[modal-action="ok"]', this.root);
      if ($ok) {
        $ok.setAttribute("loading", this._state.confirmLoading.toString());
      }
    }
    if (changedProps.has("z-index")) {
      this._setZIndex();
    }
  }

  afterInit(): void {
    this._setWidth();
    this._setZIndex();
    if (this._state.show) {
      this.#openModal();
    }
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      style: [maskCss, css],
    };
  }

  _setZIndex() {
    if (this._state.zIndex) {
      this.style.setProperty("--l-modal-zindex", this._state.zIndex);
    } else {
      this.style.removeProperty("--l-modal-zindex");
    }
  }

  _setWidth() {
    if (this._state.width) {
      this.style.setProperty("--l-modal-width", this._state.width);
    } else {
      this.style.removeProperty("--l-modal-width");
    }
  }

  #openModal() {
    // 展开对话框时, 禁止内容滚动
    this._bodyOverflow = getComputedStyle(document.body).overflow;
    this.classList.add("open");
    document.body.style.overflow = "hidden";
    let $wrapper = $one(".l-modal-wrapper", this.root);
    if ($wrapper) {
      const $mask = $one(".l-mask", this.root);
      if ($mask) {
        transition($mask, "mask-transition");
      }
      const $modal = $one(".l-modal", this.root) as HTMLElement;
      transition($modal, "modal-transition");
    } else {
      const fragment = document.createDocumentFragment();
      let $mask: HTMLElement | null = null;
      if (this._state.mask) {
        $mask = $$("div", { class: "l-mask l-modal-mask", part: "mask" });
        fragment.appendChild($mask);
      }
      $wrapper = $$("div", { class: "l-modal-wrapper", part: "wrapper" });
      const $modal = $$("div", {
        class: [
          "l-modal",
          `l-modal--${this._state.mobile ? "mobile" : "pc"}`,
          `l-modal--${this._state.verticalAlign}`,
        ],
        part: "default",
      });
      $modal.setAttribute("modal-action", "modal");

      // close
      if (this._state.close !== 0) {
        const $close = $$("l-button", {
          shape: "circle",
          type: "normal",
          class: `l-btn-modal-close l-modal-close${this._state.close}`,
          "modal-action": "close",
        });
        const $closeIcon = $$("l-close-icon");
        $close.appendChild($closeIcon);
        $modal.appendChild($close);
      }

      // modal-header
      if (this._state.header) {
        const $header = $$("header", { class: "l-modal-header", part: "header" });
        const $headerSlot = $$("slot", {
          name: "header",
        });
        $headerSlot.textContent = this._state.headerTitle || "";
        $header.appendChild($headerSlot);
        $modal.appendChild($header);
      }

      // modal-body
      const $body = $$("div", {
        class: "l-modal-container",
        part: "container",
      });

      const $bodySlot = $$("slot");
      $body.appendChild($bodySlot);
      $modal.appendChild($body);

      // modal-footer
      if (this._state.footer) {
        const $footer = $$("footer", {
          class: "l-modal-footer",
          part: "footer",
        });
        const $footerSlot = $$("slot", { name: "footer" });

        if (this._state.cancel) {
          const $cancelBtn = $$("l-button", {
            class: "l-modal-footer-btn",
            text: this._state.mobile,
          });
          $cancelBtn.textContent = this._state.cancelText;
          $cancelBtn.setAttribute("modal-action", "cancel");
          $footerSlot.appendChild($cancelBtn);
        }

        const $okBtn = $$("l-button", {
          type: "primary",
          class: "l-modal-footer-btn",
          loading: this._state.confirmLoading,
          text: this._state.mobile,
        });
        $okBtn.textContent = this._state.okText;
        $okBtn.setAttribute("modal-action", "ok");
        $footerSlot.appendChild($okBtn);

        $footer.appendChild($footerSlot);
        $modal.appendChild($footer);
      }

      $wrapper.appendChild($modal);
      $wrapper.setAttribute("role", "dialog");
      $wrapper.setAttribute("modal-action", "mask");
      on($wrapper, "click", this.#handleWrapperClick);
      fragment.appendChild($wrapper);
      this.appendToRoot(fragment);
      transition($modal, "modal-transition");
      if ($mask) {
        transition($mask, "mask-transition");
      }
    }
  }

  #closeModal() {
    document.body.style.setProperty("overflow", this._bodyOverflow);
    const $modal = $one(".l-modal", this.root) as HTMLElement;
    transition($modal, "modal-transition", "leave", () => {
      if (this._state.destroyOnClose) {
        this.#destroy();
      }
      this.classList.remove("open");
      this.dispatchEvent(new CustomEvent("close"));
    });
    const $mask = $one(".l-mask", this.root);
    if ($mask) {
      transition($mask, "mask-transition", "leave");
    }
  }

  disconnectedCallback(): void {
    this.#destroy();
    super.disconnectedCallback();
  }

  #destroy() {
    const $wrapper = $one(".l-modal-wrapper", this.root);
    if ($wrapper) {
      off($wrapper, "click", this.#handleWrapperClick);
      this.root.removeChild($wrapper);
    }
    const $mask = $one(".l-mask", this.root);
    if ($mask) {
      this.root.removeChild($mask);
    }
  }

  #handleWrapperClick = (e: Event) => {
    const [next, action] = shouldEventNext(e, "modal-action", this.root);
    if (next) {
      let eventName = "";
      if (
        (this._state.maskClosable && action === "mask") ||
        action === "cancel" ||
        action === "close"
      ) {
        eventName = "cancel";
      } else if (action === "ok") {
        eventName = "ok";
      }
      if (eventName) {
        this.dispatchEvent(
          new CustomEvent(eventName, {
            detail: { action },
          }),
        );
      }
    }
  };
}