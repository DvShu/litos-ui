import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel, unitNumberStr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, on, off, iterate } from "ph-utils/dom";

type CollapseState = {
  arrowPlacement?: "left" | "right";
  headerJustify?: "flex-start" | "flex-end" | "space-between";
  /** 是否带有背景边框 */
  background?: boolean;
  gap?: string;
  borderRadius?: string;
  grid?: boolean;
  accordion?: boolean;
};

export default class Collapase extends BaseComponent<CollapseState> {
  public static baseName = "collapse";

  private _expandItems: Set<string>;

  public constructor() {
    super();
    this.version = 2;
    this._state = {
      arrowPlacement: "left",
      headerJustify: "flex-start",
      grid: false,
      accordion: true,
      background: false,
    };
    this._expandItems = new Set<string>();
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
      "expand",
    ];
  }

  attributeChanged(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "arrow-placement":
      case "header-justify":
        this._state[kebabToCamel(name) as "arrowPlacement"] = newValue as any;
        break;
      case "gap":
      case "border-radius":
        const v = unitNumberStr(newValue);
        this._state[kebabToCamel(name) as "gap"] = v;
        break;
      case "background":
      case "accordion":
      case "grid":
        this._state[name as "grid"] = parseAttrValue(newValue, false, name);
        break;
      case "expand":
        this._expandItems.clear();
        const item = newValue.split("&");
        item.forEach((v: string) => {
          this._expandItems.add(v);
        });
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("gap") || changedProps.has("borderRadius") || changedProps.has("grid")) {
      this._setStyleAndClass();
    }
  }

  render_v2() {
    return {
      template: $$("slot"),
      style: css,
    };
  }

  _setStyleAndClass() {
    if (this._state.gap) {
      this.style.setProperty("--l-collapse-gap", this._state.gap);
    } else {
      this.style.removeProperty("--l-collapse-gap");
    }
    if (this._state.borderRadius) {
      this.style.setProperty("--l-collapse-border-radius", this._state.borderRadius);
    } else {
      this.style.removeProperty("--l-collapse-border-radius");
    }
    if (this._state.grid) {
      this.classList.add("l-collapse-grid");
    } else {
      this.classList.remove("l-collapse-grid");
    }
  }

  afterInit(): void {
    on(this, "expand-change", this._onChange as any);
    const children = this.children;
    iterate(children, (child) => {
      const name = child.getAttribute("name");
      if (name) {
        if (this._expandItems.size > 0) {
          if (this._expandItems.has(name)) {
            child.setAttribute("expand", "on");
          }
        } else {
          let expand: any = child.getAttribute("expand");
          if (expand != null) {
            expand = parseAttrValue(expand, false, "expand");
            if (expand) {
              this._expandItems.add(name);
            }
          }
        }
      }
    });
    if (this._expandItems.size > 0) {
      const children = this.children;
      iterate(children, (child) => {
        const name = child.getAttribute("name");
        if (name && this._expandItems.has(name)) {
          child.setAttribute("expand", "on");
        }
      });
    }
  }

  beforeDestroy(): void {
    off(this, "expand-change", this._onChange as any);
  }

  _onChange = (e: CustomEvent) => {
    const detail = e.detail;
    if (detail.expand) {
      if (this.accordion) {
        const children = this.children;
        iterate(children, (child) => {
          if ((child as any).name !== detail.name) {
            (child as any).expand = false;
          }
        });
        this._expandItems.clear();
      }
      this._expandItems.add(detail.name);
    } else {
      this._expandItems.delete(detail.name);
    }
    this.emit("change", { detail: { expandedNames: [...this._expandItems] } });
  };
}