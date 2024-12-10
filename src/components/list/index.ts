import BaseComponent from "../base";
import { initAttr, regist } from "../util";
import LoadingIcon from "../icon/loading";

regist(LoadingIcon);

export default class List extends BaseComponent {
  public static baseName = "list";

  /** 是否已经全部加载完成 */
  public finish = false;
  /** 是否显示无限加载模式 */
  public infinite = true;
  private observer?: IntersectionObserver;
  private loadMoreEmit: CustomEvent;

  constructor() {
    super();
    initAttr(this);
    this.loadMoreEmit = new CustomEvent("load-more");
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
    }
  }
  render() {
    const content = ["<slot></slot>"];
    if (this.infinite) {
      content.push(`<div class="l-list-loadmore">`);
      let text = " 加载中……";
      if (!this.finish) {
        text = "已经到底啦！";
        content.push(
          `<l-loading-icon class="l-list-icon l-rotate-anim"></l-loading-icon>`
        );
      }
      content.push(`<span class="nt-list-loadmore-text">${text}</span></div>`);
    }
    this.root.innerHTML = content.join("");
  }
}
