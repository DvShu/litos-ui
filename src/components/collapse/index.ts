import BaseComponent from "../base";
import { parseAttrValue, unitNumberStr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, on, off } from "utilane/browser";
import type {
  CollapseAccessor,
  CollapseContext,
  CollapseExpandChange,
  CollapseItemBinding,
  CollapseLayout,
  RegisterCollapseItem,
} from "./types";

type CollapseState = {
  borderRadius?: string;
  grid?: boolean;
  accordion?: boolean;
  prop?: string;
};

export default class Collapase extends BaseComponent<CollapseState> {
  public static baseName = "collapse";

  private _layout: CollapseLayout = {
    arrowPlacement: "left",
    headerJustify: "flex-start",
    background: false,
  };
  private readonly context = ((layout?: CollapseLayout) => {
    if (layout === undefined) return this._layout;
    this._layout = layout;
    if (this.rendered) this._setStyleAndClass();
  }) as CollapseContext;
  private _expandedProps: string[] = [];
  private readonly _items = new Set<CollapseItemBinding>();

  // Keep Item.expands() and Item.expands(values) callable while storing one plain list.
  private readonly expands = ((values?: string[]) => {
    if (values === undefined) return this._expandedProps;
    this._applyExpandedProps(values);
  }) as CollapseAccessor<string[]>;

  public constructor() {
    super();
    this.version = 2;
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

  attributeChanged(name: string, oldValue: string, newValue: string | null) {
    switch (name) {
      case "arrow-placement":
        this.context({ ...this._layout, arrowPlacement: newValue === "right" ? "right" : "left" });
        break;
      case "header-justify":
        this.context({
          ...this._layout,
          headerJustify:
            newValue === "flex-end" || newValue === "space-between" ? newValue : "flex-start",
        });
        break;
      case "gap":
        this.context({ ...this._layout, gap: unitNumberStr(newValue) || undefined });
        break;
      case "border-radius":
        this._state.borderRadius = unitNumberStr(newValue) || undefined;
        break;
      case "background":
        this.context({ ...this._layout, background: parseAttrValue(newValue, false, name) });
        break;
      case "grid":
        this._state.grid = parseAttrValue(newValue, false, name);
        break;
      case "accordion": {
        this._state.accordion = parseAttrValue(newValue, false, name);
        const expands = this._expandedProps;
        if (this._state.accordion && expands.length > 1) {
          this._updateItemExpand({ prop: expands[0], expand: true });
        }
        break;
      }
      case "prop": {
        const props = newValue === null ? [] : newValue.split("&");
        const expands = this._state.accordion ? props.slice(0, 1) : props;
        this._state.prop = newValue === null ? undefined : expands.join("&");
        this._applyExpandedProps(expands);
        break;
      }
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("border-radius") || changedProps.has("grid")) {
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
    const { gap, arrowPlacement, headerJustify, background } = this._layout;
    const arrowRight = arrowPlacement === "right";
    // Reversing the arrow order must not reverse the alignment of the title row.
    const align = arrowRight !== (headerJustify === "flex-end") ? "flex-end" : "flex-start";
    this.style.setProperty("--_l-collapse-gap-attribute", gap ?? "");
    this.style.setProperty("--_l-collapse-radius-attribute", this._state.borderRadius ?? "");
    this.style.setProperty("--l-collapse-header-direction", arrowRight ? "row-reverse" : "row");
    this.style.setProperty(
      "--l-collapse-header-justify",
      headerJustify === "space-between" ? headerJustify : align,
    );
    this.classList.toggle("l-collapse-background", background);
    this.classList.toggle("l-collapse-spaced", Boolean(gap));
    this.classList.toggle("l-collapse-grid", Boolean(this._state.grid));
  }

  afterInit(): void {
    this._setStyleAndClass();
    on(this, "collapse-context-request", this._provide);
    this.dispatchEvent(new Event("collapse-context-ready"));
  }

  private _provide(e: CustomEvent) {
    const { context, callback } = e.detail;
    if (context === "collapse-context-request") {
      callback(this.context, this.expands, this._setItemExpand, this._registerItem);
    }
  }

  beforeDestroy(): void {
    off(this, "collapse-context-request", this._provide);
    this._items.clear();
  }

  private _registerItem: RegisterCollapseItem = (item) => {
    this._items.add(item);
    return () => {
      this._items.delete(item);
    };
  };

  private _applyExpandedProps(values: string[]) {
    if (this._expandedProps === values) return;
    this._expandedProps = values;
    for (const item of this._items) {
      item.applyExpand(this._expandedProps.includes(item.getProp()));
    }
  }

  private _updateItemExpand = ({ prop, expand }: CollapseExpandChange) => {
    const current = this._expandedProps;
    let next = current;
    if (expand) {
      if (this._state.accordion) {
        if (current.length !== 1 || current[0] !== prop) next = [prop];
      } else if (!current.includes(prop)) {
        next = [...current, prop];
      }
    } else if (current.includes(prop)) {
      next = current.filter((value) => value !== prop);
    }
    if (next === current) return;
    this._state.prop = next.join("&");
    this._applyExpandedProps(next);
  };

  private _setItemExpand = (detail: CollapseExpandChange, notify = false) => {
    this._updateItemExpand(detail);
    if (!notify) return;
    const expands = this._expandedProps;
    this.emit("change", { detail: { expands: [...expands], value: expands.join("&") } });
  };

  _onChange = (e: CustomEvent<CollapseExpandChange>) => {
    this._setItemExpand(e.detail, true);
  };
}