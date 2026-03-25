import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel, unitNumberStr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, on, off, iterate } from "ph-utils/dom";
import { signal } from "alien-signals";
import type { CollapseContext } from "./types";

type CollapseState = {
  borderRadius?: string;
  grid?: boolean;
  accordion?: boolean;
  prop?: string;
};

export default class Collapase extends BaseComponent<CollapseState> {
  public static baseName = "collapse";

  private context: CollapseContext;
  private expands: Signal<string[]>;

  public constructor() {
    super();
    this.version = 2;
    this.context = signal({
      arrowPlacement: "left",
      headerJustify: "flex-start",
      background: false,
    });
    this.expands = signal([]);
    this._state = {
      grid: false,
      accordion: false,
    };
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
      "prop",
    ];
  }

  attributeChanged(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "arrow-placement":
      case "header-justify":
        const newContext = { ...this.context() };
        newContext[kebabToCamel(name) as "arrowPlacement"] = newValue as any;
        this.context(newContext);
        break;
      case "gap":
        this.context({ ...this.context(), gap: unitNumberStr(newValue) });
        break;
      case "border-radius":
        this._state.borderRadius = unitNumberStr(newValue);
        break;
      case "background":
        this.context({ ...this.context(), background: parseAttrValue(newValue, false, name) });
        break;
      case "accordion":
      case "grid":
        this._state[name as "grid"] = parseAttrValue(newValue, false, name);
        break;
      case "prop":
        if (newValue !== this._state.prop) {
          this._state.prop = newValue;
          const propItems = [];
          const items = newValue.split("&");
          for (let i = 0, len = items.length; i < len; i++) {
            propItems.push(items[i]);
          }
          this.expands(propItems);
        }

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
    if (this.context().gap) {
      this.style.setProperty("--l-collapse-gap", this.context().gap as string);
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
    this._setStyleAndClass();
    on(this, "collapse-context-request", this._provide);
    on(this, "expand-change", this._onChange as any);
  }

  private _provide(e: CustomEvent) {
    const { context, callback } = e.detail;
    if (context === "collapse-context-request") {
      callback(this.context, this.expands);
    }
  }

  beforeDestroy(): void {
    off(this, "collapse-context-request", this._provide);
    off(this, "expand-change", this._onChange as any);
  }

  _onChange = (e: CustomEvent) => {
    const detail = e.detail;
    let old = this.expands();
    if (detail.expand) {
      if (this._state.accordion) {
        old = [detail.prop];
      } else if (!old.includes(detail.prop)) {
        old.push(detail.prop);
      }
    } else {
      let spliceIndex = old.indexOf(detail.prop);
      if (spliceIndex !== -1) {
        old.splice(spliceIndex, 1);
      }
    }
    this.expands([...old]);
    this._state.prop = old.join("&");
    this.emit("change", { detail: { expands: old, value: this._state.prop } });
  };
}