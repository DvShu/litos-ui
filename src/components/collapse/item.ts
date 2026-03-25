import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel, stopSignal } from "../utils";
//@ts-ignore
import css from "./item.less?inline";
import { $$, $one, queryHideNodeSize, on, off } from "ph-utils/dom";
import type { CollapseContext } from "./types";
import { effect } from "alien-signals";

type CollapaseItemState = {
  prop: string;
  headerText: string;
  expand: boolean;
};

export default class CollapaseItem extends BaseComponent<CollapaseItemState> {
  public static baseName = "collapse-item";
  private $header?: HTMLDivElement;
  public context?: CollapseContext;
  private _ctxStop?: SignalStop;
  private _expandStop?: SignalStop;
  public expands?: Signal<string[]>;

  public constructor() {
    super();
    this.version = 2;
    this._state = {
      prop: "",
      headerText: "",
      expand: false,
    };
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("expand")) {
      this._setStyleAndClass();
      this._handleExpand();
    }
  }

  _setStyleAndClass() {
    if (this._state.expand) {
      this.classList.add("l-collapse-expand");
    } else {
      this.classList.remove("l-collapse-expand");
    }
  }

  static get observedAttributes() {
    return ["prop", "header-text", "expand"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "prop":
      case "header-text":
        this._state[kebabToCamel(name) as "prop"] = newValue;
        break;

      case "expand":
        const v = parseAttrValue(newValue, false, "expand");
        if (v !== this._state.expand) {
          this._state.expand = v;
        }
        break;
    }
  }

  render_v2() {
    if (this._state.expand) {
      this._emitChange();
    }
    const fragment = document.createDocumentFragment();
    // header
    const $header = $$("div", {
      class: "l-collapse-item__header",
      part: "header",
    });
    const $arrow = $$("l-arrow-right-icon", { class: "l-collapse-arrow-icon" });
    $header.appendChild($arrow);
    if (this._state.headerText) {
      const $headerText = $$("span", {
        part: "header-text",
        textContent: `${this._state.headerText}`,
      });
      $header.appendChild($headerText);
    } else {
      $header.appendChild(
        $$("slot", {
          name: "header-text",
        }),
      );
    }
    fragment.appendChild($header);
    // content
    if (this._state.expand) {
      fragment.appendChild(this._createContentElement(false));
    }
    return {
      template: fragment,
      style: css,
    };
  }

  afterInit(): void {
    this._setStyleAndClass();
    this.$header = $one(".l-collapse-item__header", this.root) as HTMLDivElement;
    this.emitInject("collapse-context-request", this.contextInject as any);
    this._ctxStop = effect(this._updateLayout);
    this._expandStop = effect(this._handleExpandsChange);
    if (this.$header) {
      on(this.$header, "click", this._handleHeaderTap);
    }
  }

  beforeDestroy(): void {
    this._ctxStop = stopSignal(this._ctxStop);
    this._expandStop = stopSignal(this._expandStop);
    if (this.$header) {
      off(this.$header, "click", this._handleHeaderTap);
    }
    this.$header = undefined;
  }

  _handleExpandsChange = () => {
    if (!this.expands) return;
    const exds = this.expands();
    const itemExpand = exds.includes(this._state.prop);
    if (itemExpand !== this._state.expand) {
      this._handleHeaderTap();
    }
  };

  _handleHeaderTap = () => {
    this._state.expand = !this._state.expand;
    this._setStyleAndClass();
    this._handleExpand();
  };

  _updateLayout = () => {
    if (!this.context) return;
    const contextValue = this.context();
    if (this.$header) {
      if (contextValue.arrowPlacement === "right") {
        this.$header.classList.add("arrow-right");
      } else {
        this.$header.classList.remove("arrow-right");
      }
      if (contextValue.headerJustify === "space-between") {
        this.$header.classList.add("space-between");
      } else {
        this.$header.classList.remove("space-between");
      }
    }
    if (contextValue.background) {
      this.classList.add("background");
    } else {
      this.classList.remove("background");
    }
    if (contextValue.gap) {
      this.classList.add("space");
    } else {
      this.classList.remove("space");
    }
  };

  public contextInject = (ctx: CollapseContext, exds: Signal<string[]>) => {
    this.context = ctx;
    this.expands = exds;
  };

  _handleExpand() {
    if (!this.rendered) return;
    let $content = $one(".l-collapse-content", this.root);
    let contentHeight = 0;
    if (this._state.expand) {
      this.classList.add("l-collapse-expand");
      // 展开面板
      if (!$content) {
        $content = this._createContentElement(true);
        this.root.appendChild($content);
      }
      const size = queryHideNodeSize($content, null);
      $content.style.height = `${size.height}px`;
      $content.style.display = "block";

      contentHeight = size.height;
    } else {
      // 折叠面板
      this.classList.remove("l-collapse-expand");
      if ($content) {
        const rect = $content.getBoundingClientRect();
        contentHeight = rect.height;
      }
    }
    if ($content) {
      const frames = [{ height: "0px" }, { height: `${contentHeight}px` }];
      if (!this._state.expand) {
        frames.reverse();
      }
      let anim = $content.animate(frames, {
        duration: 150,
      });
      anim.onfinish = () => {
        if (!this._state.expand) {
          $content.style.display = "none";
        }
        anim.onfinish = null;
        anim = null as any;
      };
    }
    this._emitChange();
  }

  _emitChange = () => {
    this.emit("expand-change", {
      detail: { prop: this._state.prop, expand: this._state.expand },
    });
  };

  _createContentElement(hide = true) {
    const $content = $$("div", {
      class: "l-collapse-content",
      style: hide ? "display: none;" : "",
    });
    $$(
      "div",
      {
        class: "l-collapse-content-box",
        innerHTML: "<slot></slot>",
      },
      $content,
    );
    return $content;
  }
}