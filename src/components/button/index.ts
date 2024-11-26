import { parseAttrValue, regist } from "../util";
import BaseComponent from "../base";
import { formatClass, $one, addClass, removeClass } from "ph-utils/dom";
import LoadingIcon from "../icon/loading";

regist(LoadingIcon);

export default class Button extends BaseComponent {
  public static tagName = "button";

  constructor() {
    super();
    import("../styles/animation.css?inline").then((res) => {
      this.createStyle(res.default);
    });
  }

  // 初始化属性观察器
  static get observedAttributes() {
    return ["loading"];
  }

  // 当属性发生变化时调用的回调函数
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "loading") {
      const loading = parseAttrValue(newValue, "boolean", name);
      const $btn = $one(".l-btn", this.shadow as any) as HTMLButtonElement;
      if ($btn) {
        if (loading) {
          addClass($btn, "l-btn-loading");
          $btn.disabled = true;
          $btn.innerHTML = this.loadingBody();
        } else {
          removeClass($btn, "l-btn-loading");
          $btn.disabled = this.getAttr("disabled", false);
          $btn.innerHTML = "<slot></slot>";
        }
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
    // class
    const classes = [
      "l-btn",
      `l-btn-${type}`,
      this.getAttr("block", false) ? "l-btn-block" : "",
      shape === "round" ? "l-btn-round" : "",
      shape === "circle" ? "l-btn-circle" : "",
      this.getAttr("ghost", false) ? "l-btn-ghost" : "",
      this.getAttr("text", false) ? "l-btn-text" : "",
      isLoading ? "l-btn-loading" : "",
    ];
    $btn.className = formatClass(classes);
    $btn.disabled = this.getAttr("disabled", false) || isLoading;
    $btn.type = this.getAttr("html-type", "button") as "button";
    if (isLoading) {
      $btn.innerHTML = this.loadingBody();
    } else {
      $btn.innerHTML = "<slot></slot>";
    }

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
}
