import { parseAttrValue, regist } from "../util";
import BaseComponent from "../base";
import { formatClass, $one, addClass, removeClass } from "ph-utils/dom";
import LoadingIcon from "../icon/loading";
import { adjust } from "ph-utils/color";

/**
 * 将样式对象格式化为 CSS 样式字符串。
 * @param styleObj - 样式对象，可以是字符串数组或键值对对象。
 * @returns 格式化后的 CSS 样式字符串。
 */
function formatStyle(
  styleObj: (string | undefined | null | "")[] | Record<string, string>
) {
  let styleStr = "";
  if (Array.isArray(styleObj)) {
    for (let i = 0, len = styleObj.length; i < len; i++) {
      const item = styleObj[i];
      if (item) {
        styleStr += `${item};`;
      }
    }
  } else {
    for (const key in styleObj) {
      if (styleObj[key]) {
        styleStr += `${key}:${styleObj[key]};`;
      }
    }
  }
  return styleStr;
}

regist(LoadingIcon);

export default class Button extends BaseComponent {
  public static baseName = "button";

  constructor() {
    super();
    this.loadExternalStyle(["animation"]);
  }

  // 初始化属性观察器
  static get observedAttributes() {
    return ["loading", "color"];
  }

  // 当属性发生变化时调用的回调函数
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const $btn = $one(".l-btn", this.shadow as any) as HTMLButtonElement;
    if ($btn) {
      if (name === "loading") {
        const loading = parseAttrValue(newValue, false, name);
        const $btn = $one(".l-btn", this.shadow as any) as HTMLButtonElement;
        if (loading) {
          addClass($btn, "l-btn-loading");
          $btn.disabled = true;
          $btn.innerHTML = this.loadingBody();
        } else {
          removeClass($btn, "l-btn-loading");
          $btn.disabled = this.getAttr("disabled", false);
          $btn.innerHTML = "<slot></slot>";
        }
      } else if (name === "color") {
        const text = this.getAttr("text", false);
        const ghost = this.getAttr("ghost", false);
        $btn.style.cssText = this.applyColor(newValue, text, ghost);
      }
    }
  }

  connectedCallback(): void {
    this.loadStyle(["button"]);
    this.render();
  }

  public render() {
    // 创建一些 HTML 并应用到 shadow dom 中
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
      this.getAttr("block", false) ? "l-btn-block" : "",
      shape === "round" ? "l-btn-round" : "",
      shape === "circle" ? "l-btn-circle" : "",
      ghost ? "l-btn-ghost" : "",
      text ? "l-btn-text" : "",
      isLoading ? "l-btn-loading" : "",
    ];
    $btn.className = formatClass(classes);
    $btn.disabled = this.getAttr("disabled", false) || isLoading;
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
    this.shadow.appendChild($btn);
  }

  loadingBody() {
    const loadingText = this.getAttr("loading-text", "");
    const res = ['<l-loading-icon class="l-rotate-anim"></l-loading-icon>'];
    if (loadingText === "") {
      res.push("<slot></slot>");
    } else {
      res.push(`<span>${loadingText}</span>`);
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
}
