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
    this.loadStyleText([css, maskCss]);
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
    let $mask = $one(".l-mask", this.root);
    if ($wrapper) {
      if ($mask) {
        transition($mask, [["opacity", "0", "0.3s"]]);
      }
    } else {
      const fragment = document.createDocumentFragment();
      if (this.mask) {
        $mask = $$("div", { class: "l-mask" });
        transition($mask, [["opacity", "0", "0.3s"]]);
        fragment.appendChild($mask);
      }
      $wrapper = $$("div", { class: "l-modal-wrapper" });
      $wrapper.setAttribute("role", "dialog");
      on($wrapper, "click", this.#handleMaskClick);
      fragment.appendChild($wrapper);
      this.appendToRoot(fragment);
    }
  }

  #closeModal() {
    document.body.style.setProperty("overflow", this.#bodyOverflow);
    if (this.destroyOnClose) {
      const $wrapper = $one(".l-modal-wrapper", this.root);
      if ($wrapper) {
        off($wrapper, "click", this.#handleMaskClick);
      }
      this.root.innerHTML = "";
    } else {
      this.classList.remove("open");
    }
  }

  #handleMaskClick = () => {
    if (this.maskClosable) {
      this.dispatchEvent(new CustomEvent("cancel"));
    }
  };
}
