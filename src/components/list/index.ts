import BaseComponent from "../base";
import { initAttr, parseAttrValue, regist } from "../util";
import LoadingIcon from "../icon/loading";
import { $one } from "ph-utils/dom";

regist(LoadingIcon);

export default class List extends BaseComponent {
  public static baseName = "list";

  /** 是否已经全部加载完成 */
  public finish = false;
  /** 是否显示无限加载模式 */
  public infinite = true;
  private observer?: IntersectionObserver;
  private loadMoreEmit: CustomEvent;
  private $more?: HTMLElement;

  constructor() {
    super();
    initAttr(this);
    this.loadMoreEmit = new CustomEvent("load-more");
  }

  static get observedAttributes(): string[] | null | undefined {
    return ["finish"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "finish") {
      const finish = parseAttrValue(newValue, false, name);
      if (this.finish !== finish) {
        this.finish = finish;
        this._finishChange();
      }
    }
  }

  connectedCallback(): void {
    this.loadStyle(["list"]);
    this.loadExternalStyle(["animation"]);
    super.connectedCallback();
    if (this.infinite) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.finish) {
          this.dispatchEvent(this.loadMoreEmit);
        }
      });
      this.$more = $one(".l-list-loadmore", this.root);
      if (!this.finish && this.$more) {
        this.observer.observe(this.$more);
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.observer) {
      if (this.$more) {
        this.observer.unobserve(this.$more);
        this.$more = undefined;
      }
      this.observer.disconnect();
      this.observer = undefined;
    }
    this.loadMoreEmit = undefined as any;
  }

  render() {
    const content = ["<slot></slot>"];
    if (this.infinite) {
      content.push(`<div class="l-list-loadmore">`);
      if (!this.finish) {
        content.push(
          `<l-loading-icon class="l-list-icon l-rotate-anim"></l-loading-icon>`
        );
      }
      content.push(
        `<span class="l-list-loadmore-text">${this._loadingText()}</span></div>`
      );
    }
    this.root.innerHTML = content.join("");
  }

  _loadingText() {
    return this.finish ? "已经到底啦！" : "加载中……";
  }

  _finishChange() {
    if (this.$more) {
      if (this.observer) {
        if (this.finish) {
          this.observer.unobserve(this.$more);
        } else {
          this.observer.observe(this.$more);
        }
      }
      const $text = $one(".l-list-loadmore-text", this.$more);
      if ($text) {
        $text.textContent = this._loadingText();
      }
      let $icon = $one(".l-list-icon", this.$more);
      if (this.finish) {
        if ($icon) {
          $icon.remove();
        }
      } else {
        if ($icon == null) {
          $icon = document.createElement("l-loading-icon");
          $icon.className = "l-list-icon l-rotate-anim";
          this.$more.prepend($icon);
        }
      }
    }
  }
}
