import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, on, off, shouldEventNext } from "ph-utils/dom";
import { isBlank } from "ph-utils";

export default class PageHeader extends BaseComponent {
  public static baseName = "page-header";

  public showLeft?: boolean = true;
  public showBack = true;
  public backText = "返回";
  public pageTitle?: string;
  public pageSubTitle?: string;
  public align: "left" | "center" = "left";
  public showRight = true;
  public border = false;
  public height?: string;

  connectedCallback(): void {
    this.loadStyleText(css);
    this.classList.add(`l-page-header-align-${this.align}`);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return [
      "show-left",
      "show-back",
      "back-text",
      "page-title",
      "page-sub-title",
      "align",
      "show-right",
      "border",
      "height",
    ];
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
    }
    switch (name) {
      case "border":
        if (parsedValue) {
          this.classList.add("l-page-header-border");
        } else {
          this.classList.remove("l-page-header-border");
        }
        break;

      case "height":
        if (parsedValue) {
          this.style.setProperty("--l-page-header-height", parsedValue);
        }
        break;
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    if (this.showLeft) {
      const $left = $$("div", { class: "l-page-header-left" });
      if (this.showBack) {
        const $back = $$("l-button", {
          text: true,
          class: "l-page-header-back",
          "l-action": "back",
          innerHTML: `<l-arrow-left-icon></l-arrow-left-icon><span>${this.backText}</span>`,
        });
        $left.appendChild($back);
      }
      const $slot = $$("slot", { name: "left" });
      $left.appendChild($slot);
      fragment.appendChild($left);
    }
    const $content = $$("div", {
      class: "l-page-header-content",
    });
    if (!isBlank(this.pageTitle)) {
      const $title = $$("div", {
        class: "l-page-header-title",
        innerHTML: this.pageTitle,
      });
      $content.appendChild($title);
    }
    if (!isBlank(this.pageSubTitle)) {
      const $subTitle = $$("div", {
        class: "l-page-header-sub-title",
        innerHTML: this.pageSubTitle,
      });
      $content.appendChild($subTitle);
    }
    const $slot = $$("slot");
    $content.appendChild($slot);
    fragment.appendChild($content);
    // right
    if (this.showRight) {
      const $right = $$("div", { class: "l-page-header-right" });
      const $rightSlot = $$("slot", { name: "right" });
      $right.appendChild($rightSlot);
      fragment.appendChild($right);
    }
    return fragment;
  }

  #onTap = (e: Event) => {
    const [isAction, action, target] = shouldEventNext(
      e,
      "l-action",
      this.root
    );
    if (isAction) {
      const dataset = target.dataset;
      this.emit("action", { detail: { action, ...dataset } });
    }
  };

  afterInit(): void {
    on(this.root, "click", this.#onTap);
  }

  beforeDestroy(): void {
    off(this.root, "click", this.#onTap);
  }
}
