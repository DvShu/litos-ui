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
} from "ph-utils/dom";

export default class BaseOverlay extends BaseComponent {
  public static baseName = "base-overlay";

  #open = false;
  public zIndex = 100;

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
    return ["open", "z-index"];
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    name = kebabToCamel(name);
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
      switch (name) {
        case "zIndex":
          if (parsedValue === 100) {
            this.style.removeProperty("--l-overlay-zindex");
          } else {
            this.style.setProperty("--l-overlay-zindex", parsedValue);
          }
          break;
      }
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // overlay
    const $overlay = $$("div", {
      class: "l-overlay-backdrop",
      part: "overlay",
    });
    fragment.appendChild($overlay);
    // panel
    const $panel = $$("div", {
      class: "l-overlay-panel",
      part: "panel",
    });
    $panel.innerHTML = "<slot></slot>";
    fragment.appendChild($panel);
    return fragment;
  }

  #toggleOpen() {
    if (this.open) {
      addClass(this, "open");
      const $overlay = $one(".l-overlay-backdrop", this.root);
      if ($overlay) {
        transition($overlay, [["opacity", "0", "0.3s"]], "enter");
      }
      this.afterOpened();
    } else {
      if (hasClass(this, "open")) {
        const $overlay = $one(".l-overlay-backdrop", this.root);
        if ($overlay) {
          transition($overlay, [["opacity", "0", "0.3s"]], "leave", () => {
            removeClass(this, "open");
            this.emit("closed");
          });
        }
        this.afterClosed();
      }
    }
  }

  afterInit(): void {
    this.#toggleOpen();
    const $panel = $one(".l-overlay-panel", this.root);
    if ($panel) {
      on($panel, "click", this.#onPanelClick, {  });
    }
  }

  beforeDestroy(): void {
    const $panel = $one(".l-overlay-panel", this.root);
    if ($panel) {
      off($panel, "click", this.#onPanelClick);
    }
  }

  #onPanelClick = (e: Event) => {}

  public afterOpened() {}

  public afterClosed() {}
}
