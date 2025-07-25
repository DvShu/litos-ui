import BaseComponent from "../base";
import { initAttr } from "../utils";

// @ts-ignore
import css from "./index.less?inline";
// @ts-ignore
import maskCss from "../styles/mask.css?inline";

import { $$, $one, on, off, transition, shouldEventNext } from "ph-utils/dom";
import { parseAttrValue } from "../utils/index";

export default class Modal extends BaseComponent {
  static baseName: string = "modal";

  /** 是否显示对话框 */
  public show: boolean = false;
  /** 关闭时销毁 Modal 里的子元素 */
  public destroyOnClose: boolean = false;
  /** 点击蒙层是否允许关闭 */
  public maskClosable: boolean = true;
  /** 是否展示遮罩 */
  public mask = true;
  /** 标题 */
  title = "";
  /** 是否展示底部 */
  footer = true;
  /** 是否显示取消按钮 */
  public cancel = true;
  /** 取消按钮文本 */
  public cancelText = "取消";
  /** 确定按钮文本 */
  public okText = "确定";
  /** 对话框宽度 */
  width?: string;
  /** 确认按钮加载中 */
  confirmLoading = false;
  /** 右上角关闭按钮, 1-显示在框内，2-显示在框角, 0-不显示 */
  close = 1;
  /** 对话框垂直方向位置 */
  verticalAlign: "top" | "bottom" | "middle" = "top";
  /** 是否是移动风格弹出框 */
  mobile = false;
  /** 设置 Modal 的 z-index */
  zIndex?: string;

  #bodyOverflow = "";

  static get observedAttributes() {
    return ["show", "width", "confirm-loading"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (!this.rendered) return;
    if (name === "show") {
      this.show = parseAttrValue(newValue, false);
      if (this.show) {
        this.#openModal();
      } else {
        this.#closeModal();
      }
    } else if (name === "width") {
      this.width = parseAttrValue(newValue, undefined);
      this.#setWidth();
    } else if (name === "confirm-loading") {
      this.confirmLoading = parseAttrValue(newValue, false, "confirm-loading");
      const $ok = $one('l-button[modal-action="ok"]', this.root);
      if ($ok) {
        $ok.setAttribute("loading", this.confirmLoading.toString());
      }
    }
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([maskCss, css]);
    super.connectedCallback();
    this.#setWidth();
    if (this.zIndex) {
      this.style.setProperty("--l-modal-zindex", this.zIndex);
    }
  }

  render() {
    if (this.show) {
      this.#openModal();
    }
  }

  #setWidth() {
    if (this.width) {
      this.style.setProperty("--l-modal-width", this.width);
    } else {
      this.style.removeProperty("--l-modal-width");
    }
  }


  #openModal() {
    // 展开对话框时, 禁止内容滚动
    this.#bodyOverflow = getComputedStyle(document.body).overflow;
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
      if (this.mask) {
        $mask = $$("div", { class: "l-mask l-modal-mask", part: "mask" });
        fragment.appendChild($mask);
      }
      $wrapper = $$("div", { class: "l-modal-wrapper", part: "wrapper" });
      const $modal = $$("div", {
        class: [
          "l-modal",
          `l-modal--${this.mobile ? "mobile" : "pc"}`,
          `l-modal--${this.verticalAlign}`,
        ],
        part: "default",
      });
      $modal.setAttribute("modal-action", "modal");

      // close
      if (this.close !== 0) {
        const $close = $$("l-button", {
          shape: "circle",
          type: "normal",
          class: `l-btn-modal-close l-modal-close${this.close}`,
          "modal-action": "close",
        });
        const $closeIcon = $$("l-close-icon");
        $close.appendChild($closeIcon);
        $modal.appendChild($close);
      }

      // modal-header
      const $header = $$("header", { class: "l-modal-header", part: "header" });
      const $headerSlot = $$("slot", { name: "header" });
      $headerSlot.textContent = this.title || "";
      $header.appendChild($headerSlot);
      $modal.appendChild($header);

      // modal-body
      const $body = $$("div", {
        class: "l-modal-container",
        part: "container",
      });

      const $bodySlot = $$("slot");
      $body.appendChild($bodySlot);
      $modal.appendChild($body);

      // modal-footer
      if (this.footer) {
        const $footer = $$("footer", {
          class: "l-modal-footer",
          part: "footer",
        });
        const $footerSlot = $$("slot", { name: "footer" });

        if (this.cancel) {
          const $cancelBtn = $$("l-button", {
            class: "l-modal-footer-btn",
            text: this.mobile,
          });
          $cancelBtn.textContent = this.cancelText;
          $cancelBtn.setAttribute("modal-action", "cancel");
          $footerSlot.appendChild($cancelBtn);
        }

        const $okBtn = $$("l-button", {
          type: "primary",
          class: "l-modal-footer-btn",
          loading: this.confirmLoading,
          text: this.mobile,
        });
        $okBtn.textContent = this.okText;
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
    document.body.style.setProperty("overflow", this.#bodyOverflow);
    const $modal = $one(".l-modal", this.root) as HTMLElement;
    transition($modal, "modal-transition", "leave", () => {
      if (this.destroyOnClose) {
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
        (this.maskClosable && action === "mask") ||
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
          })
        );
      }
    }
  };
}
