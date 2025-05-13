import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../utils";
import { $one, getAttr } from "ph-utils/dom";
//@ts-ignore
import css from "./index.less?inline";
//@ts-ignore
import animationCss from "../styles/animation.css?inline";

export default class List extends BaseComponent {
  public static baseName = "list";

  /** 是否已经全部加载完成 */
  public finish = false;
  /** 是否显示无限加载模式 */
  public infinite = true;
  private observer?: IntersectionObserver;
  private $more?: HTMLElement;
  private _page = 0;

  static get observedAttributes(): string[] | null | undefined {
    return ["finish", "infinite"];
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
    } else if (name === "infinite") {
      const infinite = parseAttrValue(newValue, true, name);
      if (this.infinite !== infinite) {
        this.infinite = infinite;
      }
    }
  }

  connectedCallback(): void {
    this.loadStyleText([css, animationCss]);
    super.connectedCallback();
    if (this.infinite) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.finish) {
          this._page++;
          this.setAttribute("loading", "");
          this.emit("load", { detail: { page: this._page } });
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
    return content.join("");
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
