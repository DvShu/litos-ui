import Mask from "../mask";
//@ts-ignore
import css from "./image_preview.less?inline";
import { $$, $one, on, off } from "ph-utils/dom";

export default class ImagePreview extends Mask {
  public static baseName = "image-preview";

  public urlList: string[] = [];
  public currentIndex: number = 0;
  // 缩放
  private _scale: number = 1;
  // 旋转
  private _rotate: number = 0;

  public setImages(urlList: string[]) {
    this.urlList = urlList;
  }

  public setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  static customAttributes = ["current-index"];

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  contentRender(): string | HTMLElement | DocumentFragment {
    const children: string[] = [this._generateBtnString("close", "close")];
    if (this.urlList.length > 1) {
      children.push(this._generateBtnString("prev", "arrow-left"));
      children.push(this._generateBtnString("next", "arrow-right"));
    }
    children.push('<div class="l-image-preview-footer">');
    children.push(
      `<div class="l-image-preview-progress">${this._getProgress()}</div>`
    );
    children.push('<div class="l-image-preview-operations">');
    children.push(this._generateBtnString("zoom-in", "zoom-in"));
    children.push(this._generateBtnString("zoom-out", "zoom-out"));
    children.push(this._generateBtnString("reduction", "reduction"));
    children.push(this._generateBtnString("refresh-left", "refresh-left"));
    children.push(this._generateBtnString("refresh-right", "refresh-right"));
    children.push("</div></div>");
    const thisImageSrc = this.urlList[this.currentIndex];
    const transformValue = this._getTransformStyleValue();
    children.push(
      `<img src="${thisImageSrc}" class="l-image-preview-img" style="transform: ${transformValue};" />`
    );
    return $$("div", {
      class: "l-image-preview--container",
      innerHTML: children.join(""),
    });
  }

  _generateBtnString(name: string, iconName: string) {
    return `<button aria-label="${name}" data-action="${name}" class="l-image-preview__btn l-image-preview__${name}"><l-${iconName}-icon></l-${iconName}-icon></button>`;
  }

  _getProgress() {
    return `${this.currentIndex + 1}&nbsp;/&nbsp;${this.urlList.length}`;
  }

  _getTransformStyleValue() {
    return `scale3d(${this._scale}, ${this._scale}, 1) rotate3d(0, 0, 1, ${this._rotate}deg)`;
  }

  private _updateImgAttr() {
    const $img = $one(".l-image-preview-img", this.root) as HTMLImageElement;
    if ($img) {
      $img.src = this.urlList[this.currentIndex];
      $img.style.transform = this._getTransformStyleValue();
    }
  }

  private _updateProgress() {
    const $progress = $one(
      ".l-image-preview-progress",
      this.root
    ) as HTMLDivElement;
    if ($progress) {
      $progress.innerHTML = this._getProgress();
    }
  }

  private _resetTransform() {
    this._scale = 1;
    this._rotate = 0;
    this._updateImgAttr();
  }

  public onAction(action: string): boolean {
    switch (action) {
      case "close":
        this.open = false;
        break;
      case "prev":
        if (this.currentIndex === 0) {
          this.currentIndex = this.urlList.length - 1;
        } else {
          this.currentIndex--;
        }
        this._resetTransform();
        this._updateProgress();
        break;
      case "next":
        if (this.currentIndex === this.urlList.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
        this._resetTransform();
        this._updateProgress();
        break;
      case "zoom-in":
        this._transformScale("in");
        break;
      case "zoom-out":
        this._transformScale("out");
        break;
      case "reduction":
        this._resetTransform();
        break;
      case "refresh-left":
        this._rotate -= 90;
        this._updateImgAttr();
        break;
      case "refresh-right":
        this._rotate += 90;
        this._updateImgAttr();
        break;
    }
    return true;
  }

  private _handleWhell = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      this._transformScale("out");
    } else {
      this._transformScale("in");
    }
  };

  public afterOpened(): void {
    on(document, "wheel", this._handleWhell as any, { passive: true });
  }

  private _transformScale(type: "out" | "in") {
    if (type === "in") {
      if (this._scale < 3) {
        this._scale += 0.25;
      }
    } else {
      if (this._scale > 0.25) {
        this._scale -= 0.25;
      }
    }
    this._updateImgAttr();
  }

  public afterClosed(): void {
    off(document, "wheel", this._handleWhell as any);
  }
}
