import BaseComponent from "../base";
import { initAttr } from "../utils";
import css from "./index.less?inline";
import maskCss from "../styles/mask.css?inline";
import { $$, $one } from "ph-utils/dom";
import { parseAttrValue } from "../utils/index";

export default class Modal extends BaseComponent {
  public static tagName = "l-modal";

  /** 是否显示对话框 */
  public open: boolean = false;
  public destroyOnClose: boolean = false;

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
      this.open = parseAttrValue(newValue, this.open);
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
    document.body.style.overflow = "hidden";
    const $wrapper = $one(".l-modal-wrapper");
    if ($wrapper) {
    } else {
      const fragment = document.createDocumentFragment();
      const $mask = $$("div", { class: "l-mask" });
      fragment.appendChild($mask);
      const $wrapper = $$("div", { class: "l-modal-wrapper" });
      fragment.appendChild($wrapper);
      this.appendToRoot(fragment);
    }
  }

  #closeModal() {
    document.body.style.setProperty("overflow", this.#bodyOverflow);
    if (this.destroyOnClose) {
      this.root.innerHTML = "";
    }
  }
}
