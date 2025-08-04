import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, on, off, iterate } from "ph-utils/dom";

export default class Collapase extends BaseComponent {
  public static baseName = "collapse";

  public arrowPlacement?: "left" | "right" = "left";
  public headerJustify?: "flex-start" | "flex-end" | "space-between" =
    "flex-start";
  /** 是否带有背景边框 */
  public background?: boolean = false;
  public gap?: string;
  public borderRadius?: string;
  public grid?: boolean = false;
  public accordion?: boolean = false;
  #expandItems: Set<string> = new Set();

  connectedCallback(): void {
    this.loadStyleText(css);
    this.#setStyleAndClass();
    super.connectedCallback();
  }

  static get observedAttributes() {
    return [
      "arrow-placement",
      "header-justify",
      "background",
      "gap",
      "border-radius",
      "grid",
      "accordion",
      "name",
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (name === "name") {
      if (parsedValue) {
        this.#expandItems.clear();
        const item = parsedValue.split("&");
        item.forEach((v: string) => {
          this.#expandItems.add(decodeURIComponent(v));
        });
      }
    } else {
      if (parsedValue !== this[name as "id"]) {
        this[name as "id"] = parsedValue;
      }
    }
  }

  render() {
    return $$("slot");
  }

  #setStyleAndClass() {
    if (this.gap && this.gap !== "0px") {
      this.style.setProperty("--l-collapse-gap", this.gap);
    }
    if (this.borderRadius && this.borderRadius !== "0px") {
      this.style.setProperty("--l-collapse-border-radius", this.borderRadius);
    }
    if (this.grid) {
      this.classList.add("l-collapse-grid");
    }
  }

  afterInit(): void {
    on(this, "expand-change", this.#onChange as any);
    const children = this.children;
    iterate(children, (child) => {
      const name = child.getAttribute("name");
      if (name) {
        if (this.#expandItems.size > 0) {
          if (this.#expandItems.has(name)) {
            child.setAttribute("expand", "on");
          }
        } else {
          let expand: any = child.getAttribute("expand");
          if (expand != null) {
            expand = parseAttrValue(expand, false, "expand");
            if (expand) {
              this.#expandItems.add(name);
            }
          }
        }
      }
    });
    if (this.#expandItems.size > 0) {
      const children = this.children;
      iterate(children, (child) => {
        const name = child.getAttribute("name");
        if (name && this.#expandItems.has(name)) {
          child.setAttribute("expand", "on");
        }
      });
    }
  }

  beforeDestroy(): void {
    off(this, "expand-change", this.#onChange as any);
  }

  #onChange = (e: CustomEvent) => {
    const detail = e.detail;
    if (detail.expand) {
      if (this.accordion) {
        const children = this.children;
        iterate(children, (child) => {
          if ((child as any).name !== detail.name) {
            (child as any).expand = false;
          }
        });
        this.#expandItems.clear();
      }
      this.#expandItems.add(detail.name);
    } else {
      this.#expandItems.delete(detail.name);
    }
    this.emit("change", { detail: { expandedNames: [...this.#expandItems] } });
  };
}
