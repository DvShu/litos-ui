import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$ } from "ph-utils/dom";

export default class Image extends BaseComponent {
  public static baseName = "image";

  public alt?: string;
  private _src: string = "";
  /** eager - 立即加载图像, lazy - 懒加载 */
  private _loading: "lazy" | "eager" = "eager";
  public fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  public width?: string;
  public height?: string;
  private _placeholder?: string;

  public get src() {
    return this._src;
  }

  public set src(value: string) {
    this._src = value;
  }

  public get loading() {
    return this._loading;
  }

  public set loading(value: "lazy" | "eager") {
    this._loading = value;
  }

  public get placeholder(): string | undefined {
    return this._placeholder;
  }

  public set placeholder(value: string) {
    this._placeholder = value;
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["src", "loading", "fit", "width", "height", "placeholder"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
    switch (name) {
      case "width":
      case "height":
        if (this.rendered) {
          this._updateSize();
        }
        break;
    }
  }

  render() {
    const alt = this.alt || this.getAttribute("alt");
    const src = this.placeholder || this.src;
    return $$("img", {
      class: "l-image-inner",
      alt,
      loading: this.loading,
      src,
    });
  }

  private _updateSize() {
    if (this.width) {
      this.style.setProperty("width", this.width);
    } else {
      this.style.removeProperty("width");
    }
    if (this.height) {
      this.style.setProperty("height", this.height);
    } else {
      this.style.removeProperty("height");
    }
  }

  afterInit(): void {
    if (this.fit && this.fit !== "fill") {
      this.style.setProperty("--l-image-fit", this.fit);
    }
    this._updateSize();
  }
}
