import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { isBlank } from "ph-utils";
import { adjust } from "ph-utils/color";
import { $$, shouldEventNext, on, off, $one } from "ph-utils/dom";

export default class Tag extends BaseComponent {
  public static baseName = "tag";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["type", "color", "closeable"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const v = newValue.trim();
    switch (name) {
      case "type":
        this._toggleTypeClass(v);
        break;
      case "color":
        this._toggleColorStyle(v);
        break;
      case "closable":
        if (!this.rendered) return;
        const isCloseable = parseAttrValue(v, false, "closeable");
        const $close = $one(".l-tag-close", this.root);
        if ($close) {
          if (isCloseable) return;
          $close.remove();
        } else {
          if (isCloseable) {
            this.root.appendChild(this.#createCloseElement());
          }
        }
        break;
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // content
    fragment.appendChild($$("div", { class: "l-tag-content", innerHTML: "<slot></slot>" }));

    if (this.getAttr("closeable", false)) {
      fragment.appendChild(this.#createCloseElement());
    }

    // suffix
    fragment.appendChild($$("slot", { name: "suffix" }));
    return fragment;
  }

  #createCloseElement() {
    return $$("div", {
      class: "l-tag-close",
      innerHTML: "<l-close-icon></l-close-icon>",
      "data-action": "close",
    });
  }

  #onActionTap = (e: Event) => {
    const [isNext, action, target] = shouldEventNext(e, "data-action", this);
    if (isNext) {
      if (action === "close") {
        this.emit("close", { detail: { ...target.dataset } });
      }
    }
  };

  afterInit(): void {
    this.classList.add(`l-tag--${this.getAttr("type", "info")}`);
    this._toggleColorStyle();
    on(this.root, "click", this.#onActionTap);
  }

  _toggleTypeClass(type: string) {
    if (!this.rendered) return;
    let isFound = false;
    for (const classItem of this.classList) {
      if (classItem.startsWith("l-tag--")) {
        this.classList.replace(classItem, `l-tag--${type}`);
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      this.classList.add(`l-tag--${type}`);
    }
  }

  _toggleColorStyle(color?: string | null) {
    if (!this.rendered) return;
    if (isBlank(color)) {
      this.style.removeProperty("--l-tag-color");
      this.style.removeProperty("--l-tag-border-color");
      this.style.removeProperty("--l-tag-background");
    } else {
      this.style.setProperty("--l-tag-color", color as string);
      this.style.setProperty("--l-tag-border-color", color as string);
      this.style.setProperty("--l-tag-background", adjust(color as string, 5, true));
    }
  }

  beforeDestroy(): void {
    off(this.root, "click", this.#onActionTap);
  }
}
