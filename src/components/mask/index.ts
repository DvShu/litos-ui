import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import {
  $$,
  addClass,
  removeClass,
  transition,
  $one,
  hasClass,
  on,
  off,
  shouldEventNext,
} from "ph-utils/dom";

export default class Mask extends BaseComponent {
  public static baseName = "mask";

  #open = false;
  public zIndex = 100;
  /** 是否可以通过点击 mask 关闭对话框 */
  public maskClosable = true;
  /** 是否在打开时禁用 body 滚动 */
  public lockScroll = true;

  #bodyOverflow = "";

  public get open() {
    return this.#open;
  }

  public set open(value: boolean) {
    this.#open = value;
    if (this.rendered) {
      this.#toggleOpen();
    }
  }

  static get observedAttributes() {
    return ["open", "z-index", "mask-closable", "lock-scroll"];
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
      switch (name) {
        case "zIndex":
          if (parsedValue === 100) {
            this.style.removeProperty("--l-mask-zindex");
          } else {
            this.style.setProperty("--l-mask-zindex", parsedValue);
          }
          break;
      }
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // overlay
    const $overlay = $$("div", {
      class: "l-mask",
      part: "mask",
    });
    fragment.appendChild($overlay);
    // panel
    const $panel = $$("div", {
      class: "l-panel",
      part: "panel",
    });
    $panel.innerHTML = "<slot></slot>";
    fragment.appendChild($panel);
    return fragment;
  }

  #toggleOpen() {
    if (this.open) {
      // 展开对话框时, 禁止内容滚动
      if (this.lockScroll) {
        this.#bodyOverflow = getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
      }
      addClass(this, "open");
      const $overlay = $one(".l-mask", this.root);
      if ($overlay) {
        transition($overlay, [["opacity", "0", "0.3s"]], "enter");
      }
      this.afterOpened();
    } else {
      if (hasClass(this, "open")) {
        const $overlay = $one(".l-mask", this.root);
        if ($overlay) {
          transition($overlay, [["opacity", "0", "0.3s"]], "leave", () => {
            removeClass(this, "open");
            this.emit("closed");
          });
        }
        if (this.lockScroll) {
          document.body.style.overflow = this.#bodyOverflow;
        }
        this.afterClosed();
      }
    }
  }

  afterInit(): void {
    this.#toggleOpen();
    const $panel = $one(".l-panel", this.root);
    if ($panel) {
      on($panel, "click", this.#onPanelClick);
    }
  }

  beforeDestroy(): void {
    const $panel = $one(".l-panel", this.root);
    if ($panel) {
      off($panel, "click", this.#onPanelClick);
    }
  }

  #onPanelClick = (e: Event) => {
    const [isNext, action] = shouldEventNext(
      e,
      "data-action",
      e.currentTarget as HTMLElement
    );
    if (!isNext) {
      if (this.maskClosable) {
        // 点击遮罩关闭
        this.open = false;
        this.emit("cancel");
      }
      return;
    }
  };

  public afterOpened() {}

  public afterClosed() {}
}
