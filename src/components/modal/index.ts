import BaseComponent from "../base";
import { initAttr } from "../utils";
import css from "./index.less?inline";
import maskCss from "../styles/mask.css?inline";
import { $$, $one, on, off, transition } from "ph-utils/dom";
import { parseAttrValue } from "../utils/index";

export default class Modal extends BaseComponent {
  public static tagName = "l-modal";

  /** 是否显示对话框 */
  public open: boolean = false;
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

  #bodyOverflow = "";

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (!this.rendered) return;
    if (name === "open") {
      this.open = parseAttrValue(newValue, false);
      if (this.open) {
        this.#openModal();
      } else {
        this.#closeModal();
      }
    }
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([maskCss, css]);
    super.connectedCallback();
  }
  render() {
    if (this.open) {
      this.#openModal();
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
        $mask = $$("div", { class: "l-mask" });
        fragment.appendChild($mask);
      }
      $wrapper = $$("div", { class: "l-modal-wrapper" });
      const $modal = $$("div", { class: "l-modal" });

      // modal-header
      const $header = $$("header", { class: "l-modal-header" });
      const $headerSlot = $$("slot", { name: "header" });
      $headerSlot.textContent = this.title || "";
      $header.appendChild($headerSlot);
      $modal.appendChild($header);

      // modal-body
      const $body = $$("div", {
        class: "l-modal-container",
      });
      const $bodySlot = $$("slot");
      $body.appendChild($bodySlot);
      $modal.appendChild($body);

      // modal-footer
      if (this.footer) {
        const $footer = $$("footer", { class: "l-modal-footer" });
        const $footerSlot = $$("slot", { name: "footer" });

        if (this.cancel) {
          const $cancelBtn = $$("l-button");
          $cancelBtn.textContent = this.cancelText;
          $footerSlot.appendChild($cancelBtn);
        }

        const $okBtn = $$("l-button", { type: "primary" });
        $okBtn.textContent = this.okText;
        $footerSlot.appendChild($okBtn);

        $footer.appendChild($footerSlot);
        $modal.appendChild($footer);
      }

      $wrapper.appendChild($modal);
      $wrapper.setAttribute("role", "dialog");
      on($wrapper, "click", this.#handleMaskClick);
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
        const $wrapper = $one(".l-modal-wrapper", this.root);
        if ($wrapper) {
          off($wrapper, "click", this.#handleMaskClick);
        }
        this.root.innerHTML = "";
      } else {
        this.classList.remove("open");
      }
    });
    const $mask = $one(".l-mask", this.root);
    if ($mask) {
      transition($mask, "mask-transition", "leave");
    }
  }

  #handleMaskClick = () => {
    if (this.maskClosable) {
      this.dispatchEvent(new CustomEvent("cancel"));
    }
  };
}
