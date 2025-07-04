import { initAttr, parseAttrValue } from "../utils";
import BaseComponent from "../base";
import {
  formatClass,
  addClass,
  removeClass,
  formatStyle,
  on,
  off,
  getAttr,
  $one,
} from "ph-utils/dom";
import { adjust } from "ph-utils/color";
import type Form from "../form";
//@ts-ignore
import buttonCss from "./index.less?inline";
//@ts-ignore
import animationCss from "../styles/animation.css?inline";

export default class Button extends BaseComponent {
  public static baseName = "button";
  public htmlType: "submit" | "reset" | "button" = "button";
  /** 加载中文本 */
  loadingText = "";
  _disabled = false;

  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this.setDisabled(value);
  }

  setDisabled(value: boolean) {
    this._disabled = value;
    const $btn = $one(".l-btn", this.root) as HTMLButtonElement;
    if ($btn) {
      $btn.disabled = value;
    }
  }

  // 初始化属性观察器
  static get observedAttributes() {
    return ["loading", "color", "disabled"];
  }

  // 当属性发生变化时调用的回调函数
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const $btn = $one(".l-btn", this.root) as HTMLButtonElement;
    if ($btn) {
      if (name === "loading") {
        const loading = parseAttrValue(newValue, false, name);
        if (loading) {
          addClass($btn, "l-btn-loading");
          $btn.disabled = true;
          $btn.innerHTML = this.loadingBody();
        } else {
          removeClass($btn, "l-btn-loading");
          $btn.disabled = this.disabled;
          $btn.innerHTML = "<slot></slot>";
        }
      } else if (name === "color") {
        const text = this.getAttr("text", false);
        const ghost = this.getAttr("ghost", false);
        $btn.style.cssText = this.applyColor(newValue, text, ghost);
      } else if (name === "disabled") {
        const disabled = parseAttrValue(newValue, false, "disabled");
        this.setDisabled(disabled);
      }
    }
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([animationCss, buttonCss]);
    this.render();
    if (this.htmlType === "reset" || this.htmlType === "submit") {
      on(this, "click", this._handleClick);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.htmlType === "reset" || this.htmlType === "submit") {
      off(this, "click", this._handleClick);
    }
  }

  public render() {
    const type = this.getAttr("type", "normal");
    const $btn = document.createElement("button");
    const isLoading = this.getAttr("loading", false);
    const shape = this.getAttr("shape", "default");
    const text = this.getAttr("text", false);
    const ghost = this.getAttr("ghost", false);
    // class
    const classes = [
      "l-btn",
      `l-btn-${type}`,
      shape === "round" ? "l-btn-round" : "",
      shape === "circle" ? "l-btn-circle" : "",
      ghost ? "l-btn-ghost" : "",
      text ? "l-btn-text" : "",
      isLoading ? "l-btn-loading" : "",
    ];
    $btn.className = formatClass(classes);
    $btn.disabled = this.disabled || isLoading;
    $btn.type = this.getAttr("html-type", "button") as "button";
    const btnStyle = this.applyColor(this.getAttr("color"), text, ghost);
    if (btnStyle) {
      $btn.style.cssText = btnStyle;
    }
    if (isLoading) {
      $btn.innerHTML = this.loadingBody();
    } else {
      $btn.innerHTML = "<slot></slot>";
    }
    $btn.setAttribute("part", "default");
    this.root.appendChild($btn);
  }

  loadingBody() {
    const loadingText = this.getAttr("loading-text", "");
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

  private _handleClick = (e: Event) => {
    const $targe = e.target as HTMLElement;
    const htmlType = getAttr($targe, "html-type");
    if (htmlType === "reset" || htmlType === "submit") {
      const $form = this._getForm();
      if ($form) {
        if (htmlType === "reset") {
          $form.reset();
        } else if (htmlType === "submit") {
          $form.submit();
        }
      }
    }
  };

  private _getForm() {
    let $parent = this.parentElement;
    let $form: Form | undefined;
    while ($parent != null) {
      const tagName = $parent.tagName;
      if (tagName === "L-FORM") {
        $form = $parent as Form;
        break;
      }
      if (tagName === "BODY") break;
      $parent = $parent.parentElement;
    }
    $parent = null;
    return $form;
  }
}
