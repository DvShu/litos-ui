import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import {
  $$,
  formatClass,
  on,
  off,
  shouldEventNext,
  $one,
  addClass,
  removeClass,
} from "ph-utils/dom";

export default class ImageHTML extends BaseComponent {
  public static baseName = "image";

  public alt?: string;
  private _src: string = "";
  /** eager - 立即加载图像, lazy - 懒加载 */
  private _loading: "lazy" | "eager" = "eager";
  public fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  public width?: string;
  public height?: string;
  public fallback?: string;
  public customFallback?: boolean = false;
  /** 是否加载错误 */
  public isError?: boolean = false;
  /** 是否禁用图片预览 */
  public previewDisabled?: boolean = false;
  private _previewEl?: HTMLElement;
  private _previewImageList?: string[];
  private _previewIndex?: number = 0;
  private _placeholder?: string;
  private _imageInner?: HTMLImageElement;

  public get src() {
    return this._src;
  }

  public set src(value: string) {
    this._src = value;
    this._loadActualImage();
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

  public get previewImageList(): string[] | undefined {
    return this._previewImageList;
  }

  public set previewImageList(value: string[]) {
    this.setPreviewImageList(value);
  }

  public get previewIndex(): number | undefined {
    return this._previewIndex;
  }

  public set previewIndex(value: number) {
    this.setPreviewIndex(value);
  }

  public setPreviewImageList(imageList: string[] | undefined) {
    this._previewImageList = imageList;
  }

  public setPreviewIndex(index: number) {
    this._previewIndex = index;
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return [
      "src",
      "loading",
      "fit",
      "width",
      "height",
      "placeholder",
      "preview-disabled",
      "preview-image-list",
      "preview-index",
      "fallback",
      "custom-fallback",
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      if (name === "previewImageList") {
        this.setPreviewImageList(
          parsedValue ? parsedValue.split(",") : undefined
        );
      } else {
        this[name as "id"] = parsedValue;
      }
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
      class: formatClass([
        "l-image-inner",
        !this.previewDisabled ? "l-image-inner--preview" : undefined,
      ]),
      alt,
      loading: this.loading,
      src,
      part: "inner",
      "l-action": "inner",
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
    this._imageInner = $one(".l-image-inner", this.root) as HTMLImageElement;
    on(this._imageInner, "click", this._onTap);
    on(this._imageInner, "error", this._onError);
    on(this._imageInner, "load", this._onLoad);
    this._loadActualImage();
  }

  beforeDestroy(): void {
    if (this._imageInner) {
      off(this._imageInner, "click", this._onTap);
      off(this._imageInner, "error", this._onError);
      off(this._imageInner, "load", this._onLoad);
    }
  }

  public setIsError(isError = false) {
    if (this.isError !== isError) {
      this.isError = isError;
      if (isError) {
        // 图片加载错误
        if (!this.customFallback) {
          if (this.fallback && this._imageInner) {
            this._imageInner.src = this.fallback;
          }
          return;
        }
        if (this._imageInner) {
          addClass(this._imageInner, "l-image-hide");
        }
        // 自定义错误显示
        let $fallback = $one(".l-image-fallback", this.root);
        if (!this.fallback) {
          $fallback = $$("div", {
            class: "l-image-fallback",
            part: "fallback",
            innerHTML: "<slot name='fallback'></slot>",
          });
          this.root.appendChild($fallback);
        }
      } else {
        if (this._imageInner) {
          removeClass(this._imageInner, "l-image-hide");
        }
        const $fallback = $one(".l-image-fallback", this.root);
        if ($fallback) {
          $fallback.remove();
        }
      }
    }
  }

  public openPreview() {
    if (!this._previewEl) {
      const $preview = $$("l-image-preview");
      ($preview as any).setImages(this.previewImageList || [this.src]);
      ($preview as any).setCurrentIndex(this.previewIndex || 0);
      $preview.setAttribute("open", "on");
      this._previewEl = $preview;
      document.body.appendChild($preview);
      on(this._previewEl, "closed", this._onPreviewClosed);
    }
  }

  public closePreview() {
    if (this._previewEl) {
      off(this._previewEl, "closed", this._onPreviewClosed);
      this._previewEl.remove();
      this._previewEl = undefined;
    }
  }

  private _onError = () => {
    this.setIsError(true);
  };

  private _onLoad = () => {
    this.setIsError(false);
  };

  private _onPreviewClosed = () => {
    this.closePreview();
  };

  private _onTap = (e: Event) => {
    const [next, action] = shouldEventNext(e, "l-action", this.root);
    if (next) {
      if (action === "inner") {
        if (!this.previewDisabled && !this.isError) {
          this.openPreview();
        }
      }
    }
  };

  private _clearTmpImg(tmpImg?: HTMLImageElement) {
    if (tmpImg) {
      tmpImg.onload = null;
      tmpImg.onerror = null;
      tmpImg = undefined as any;
    }
  }

  private _loadActualImage() {
    if (this.placeholder && this.rendered) {
      let $tmpimg = new Image();
      $tmpimg.src = this.src;
      $tmpimg.onload = () => {
        if (this._imageInner) {
          this._imageInner.src = this.src;
        }
        this._clearTmpImg($tmpimg);
      };
      $tmpimg.onerror = () => {
        this.setIsError(true);
        this._clearTmpImg($tmpimg);
      };
    }
  }
}
