import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { isBlank } from "ph-utils";
import { adjust } from "ph-utils/color";
import { $$, shouldEventNext, on, off, $one } from "ph-utils/dom";

export default class Tag extends BaseComponent {
  public static baseName = "tag";

  public type: string = "primary";
  public color?: string;
  public closeable?: boolean = false;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["type", "color", "closeable"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
    switch (name) {
      case "type":
        this._toggleTypeClass();
        break;
      case "color":
        this._toggleColorStyle();
        break;
      case "closable":
        if (!this.rendered) return;
        const $close = $one(".l-tag-close", this.root);
        if ($close) {
          $close.remove();
        } else {
          this.root.appendChild(this.#createCloseElement());
        }
        break;
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // content
    fragment.appendChild(
      $$("div", { class: "l-tag-content", innerHTML: "<slot></slot>" })
    );
    if (this.closeable) {
      fragment.appendChild(this.#createCloseElement());
    }
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
    this._toggleTypeClass();
    this._toggleColorStyle();
    on(this.root, "click", this.#onActionTap);
  }

  _toggleTypeClass() {
    if (!this.rendered) return;
    let isFound = false;
    for (const classItem of this.classList) {
      if (classItem.startsWith("l-tag--")) {
        this.classList.replace(classItem, `l-tag--${this.type}`);
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      this.classList.add(`l-tag--${this.type}`);
    }
  }

  _toggleColorStyle() {
    if (!this.rendered) return;
    if (isBlank(this.color)) {
      this.style.removeProperty("--l-tag-color");
      this.style.removeProperty("--l-tag-border-color");
      this.style.removeProperty("--l-tag-background");
    } else {
      this.style.setProperty("--l-tag-color", this.color as string);
      this.style.setProperty("--l-tag-border-color", this.color as string);
      this.style.setProperty("--l-tag-background", adjust(this.color, 5, true));
    }
  }

  beforeDestroy(): void {
    off(this.root, "click", this.#onActionTap);
  }
}
