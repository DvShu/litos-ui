import { icons } from "../icons";
import { $one, on, off, shouldEventNext } from "ph-utils/dom";
import { copy } from "ph-utils/copy";
import Message from "../components/message";

export default class IconList extends HTMLElement {
  private handleItemClick: (
    e: Event,
    currTarget?: HTMLElement,
    flag?: string
  ) => void;
  public constructor() {
    super();
    this.handleItemClick = this._handleItemClick.bind(this);
  }

  connectedCallback() {
    const items = [];
    for (const icon of icons) {
      items.push(
        `<div class="icon-item" data-name="${icon.tagName}"><${icon.tagName} class="icon"></${icon.tagName}><span class="name">${icon.name}</span></div>`
      );
    }
    this.innerHTML = `<div class="icon-list">${items.join("")}</div>`;
    this._initEvents();
  }

  private _initEvents() {
    on($one(".icon-list", this) as HTMLElement, "click", this.handleItemClick);
  }

  disconnectedCallback() {
    off($one(".icon-list", this) as HTMLElement, "click", this.handleItemClick);
  }

  private _handleItemClick(e: Event) {
    const [flag, tagName] = shouldEventNext(e, "data-name");
    if (flag) {
      copy(`<${tagName}></${tagName}>`).then();
      Message.success("复制成功");
    }
  }
}
