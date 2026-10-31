import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
import type { TagColor } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, shouldEventNext, on, off, $one, formatStyle } from "utilane/browser";

type TagState = { color?: TagColor };

export default class Tag extends BaseComponent<TagState> {
  public static baseName = "tag";

  get color(): TagColor | undefined {
    return this._state.color;
  }

  set color(value: TagColor | undefined) {
    this.setColor(value);
  }

  /** 替换颜色变量，传入 undefined 或空对象恢复默认配色。 */
  setColor(value?: TagColor): void {
    const previous = this._state.color;
    this._state.color = value;
    for (const key of Object.keys(previous || {})) {
      this.style.removeProperty(key);
    }
    const cssText = formatStyle(value || {});
    if (cssText) this.style.cssText += cssText;
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["type", "closeable"];
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    const v = newValue?.trim() ?? "";
    switch (name) {
      case "type":
        this._toggleTypeClass(v || "info");
        break;
      case "closeable":
        if (!this.rendered) return;
        const isCloseable = newValue !== null && parseAttrValue(v, false, "closeable");
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
    this._toggleTypeClass(this.getAttr("type", "info") || "info");
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

  beforeDestroy(): void {
    off(this.root, "click", this.#onActionTap);
  }
}