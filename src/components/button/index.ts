import { kebabToCamel, parseAttrValue, unitNumberStr } from "../utils";
import BaseComponent from "../base";
import {
  formatClass,
  addClass,
  removeClass,
  formatStyle,
  on,
  off,
  replaceClass,
} from "ph-utils/dom";
import { adjust } from "ph-utils/color";
import buttonCss from "./index.less?inline";
import animationCss from "../styles/animation.css?inline";

type ButtonState = {
  loading: boolean;
  htmlType: "submit" | "reset" | "button";
  text: boolean;
  ghost: boolean;
  color?: string;
  height?: string;
  disabled: boolean;
  type: "normal" | "primary";
  shape: "default" | "round" | "circle";
  loadingText: string;
  size: "small" | "large" | "default";
};

export default class Button extends BaseComponent<ButtonState> {
  public static baseName = "button";
  $btn?: HTMLButtonElement;

  constructor() {
    super();
    this.version = 2;
    this._state = {
      loading: false,
      htmlType: "button",
      text: false,
      ghost: false,
      disabled: false,
      type: "normal",
      shape: "default",
      loadingText: "加载中……",
      size: "default",
    };
  }

  get disabled() {
    return this._state.disabled;
  }

  set disabled(value: boolean) {
    this.setDisabled(value);
  }

  setLoading(loading: boolean) {
    if (this.$btn) {
      if (loading) {
        addClass(this.$btn, "l-btn-loading");
        this.$btn.disabled = true;
        this.$btn.innerHTML = this.loadingBody();
      } else {
        removeClass(this.$btn, "l-btn-loading");
        this.$btn.disabled = this.disabled;
        this.$btn.innerHTML = "<slot></slot>";
      }
    }
  }

  setDisabled(value: boolean) {
    this._state.disabled = value;
    if (this.$btn) {
      this.$btn.disabled = value;
    }
  }

  // 初始化属性观察器
  static get observedAttributes() {
    return [
      "loading",
      "color",
      "text",
      "ghost",
      "disabled",
      "height",
      "html-type",
      "type",
      "shape",
      "loading-text",
      "size",
    ];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "color":
      case "shape":
      case "type":
      case "size":
        this._state[name] = newValue as never;
        break;
      case "height":
        this._state[name] = unitNumberStr(newValue);
        break;
      case "text":
      case "ghost":
      case "disabled":
      case "loading":
        this._state[name] = parseAttrValue(newValue, false, name);
        break;
      case "html-type":
      case "loading-text":
        this._state[kebabToCamel(name) as "htmlType"] = newValue as "button";
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    // loading 和 disabled 更新
    if (this.$btn) {
      if (changedProps.has("loading")) {
        this.setLoading(this._state.loading);
      }
      if (changedProps.has("disabled")) {
        this.setDisabled(this.disabled);
      }
      if (changedProps.has("color") && this._state.color) {
        this.$btn.style.cssText = this.applyColor(
          this._state.color,
          this._state.text,
          this._state.ghost,
        );
      }
      if (changedProps.has("type")) {
        replaceClass(this.$btn, 1, `l-btn-${this._state.type || "normal"}`);
      }
      if (changedProps.has("size")) {
        replaceClass(this.$btn, 2, `l-btn-${this._state.size || "default"}`);
      }
      if (changedProps.has("shape")) {
        replaceClass(this.$btn, 3, `l-btn-${this._state.shape || "default"}`);
      }
    }

    if (changedProps.has("height")) {
      this._updateHeight();
    }
  }

  connectedCallback(): void {
    this.className = `l-btn-${this._state.size || "default"} ${this.className}`;
    super.connectedCallback();
    if (this.isFormButton()) {
      on(this, "click", this._handleClick);
    }
    this._updateHeight();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.isFormButton()) {
      off(this, "click", this._handleClick);
    }
    this.$btn = undefined;
  }

  isFormButton() {
    const type = this.getHtmlType();
    return type === "submit" || type === "reset";
  }

  getHtmlType(): "submit" | "reset" | "button" {
    return this._state.htmlType as "submit" | "reset" | "button";
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      style: [animationCss, buttonCss],
      template: this.render(),
    };
  }

  public render() {
    const $btn = document.createElement("button");
    const isLoading = this._state.loading;
    const text = this._state.text;
    const ghost = this._state.ghost;
    // class
    const classes = [
      "l-btn",
      `l-btn-${this._state.type}`,
      `l-btn-${this._state.size}`,
      `l-btn-${this._state.shape}`,
      ghost ? "l-btn-ghost" : "",
      text ? "l-btn-text" : "",
      isLoading ? "l-btn-loading" : "",
    ];
    $btn.className = formatClass(classes);
    if (this.disabled || isLoading) {
      $btn.disabled = true;
    }
    $btn.type = this._state.htmlType as "button";
    const btnStyle = this.applyColor(this._state.color || "", text, ghost);
    if (btnStyle) {
      $btn.style.cssText = btnStyle;
    }
    if (isLoading) {
      $btn.innerHTML = this.loadingBody();
    } else {
      $btn.innerHTML = "<slot></slot>";
    }
    $btn.setAttribute("part", "default");
    this.$btn = $btn;
    return $btn;
  }

  loadingBody() {
    const loadingText = this._state.loadingText;
    const res = ['<l-loading-icon class="l-rotate-anim"></l-loading-icon>'];
    if (loadingText) {
      res.push(`<span>${loadingText}</span>`);
    } else {
      res.push("<slot></slot>");
    }
    return res.join("");
  }

  applyColor(color: string, text = false, ghost = false) {
    if (!color) return "";
    const lighten = adjust(color, 1, true);
    const darken = adjust(color, 3, false);
    const cssVars = {
      "--l-btn-border-color": text ? "transparent" : color,
      "--l-btn-text-color": ghost || text ? color : "#ffffff",
      "--l-btn-hover-text-color": ghost || text ? lighten : "#ffffff",
      "--l-btn-background": ghost || text ? "transparent" : color,
      "--l-btn-active-text-color": ghost || text ? darken : "#ffffff",
      "--l-btn-hover-border-color": text ? "transparent" : lighten,
      "--l-btn-hover-background": ghost || text ? "transparent" : lighten,
      "--l-btn-active-background": ghost || text ? "transparent" : darken,
      "--l-btn-active-border-color": text ? "transparent" : darken,
    };
    return formatStyle(cssVars);
  }

  private _updateHeight() {
    if (this._state.height) {
      this.style.setProperty("--l-btn-height", this._state.height);
    } else {
      this.style.removeProperty("--l-btn-height");
    }
  }

  private _replaceBtnClass(i: number, newClass: string) {
    if (this.$btn) {
      const old = this.$btn.classList.item(i);
      if (old) {
        this.$btn.classList.replace(old, newClass);
      }
    }
  }

  private _handleClick = () => {
    if (this._state.htmlType === "reset" || this._state.htmlType === "submit") {
      this.emit("form-action", {
        bubbles: true,
        composed: true,
        detail: this._state.htmlType,
      });
    }
  };
}