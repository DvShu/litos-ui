import { icons } from "../icons";
import { $one, on, off } from "ph-utils/dom";
import { copy } from "ph-utils/copy";

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
    on($one(".icon-list", this), "click", this.handleItemClick, {
      eventFlag: "data-name",
    });
  }

  disconnectedCallback() {
    off($one(".icon-list", this), "click", this.handleItemClick);
  }

  private _handleItemClick(_e: Event, currTarget?: HTMLElement, flag?: string) {
    if (flag) {
      copy(`<${flag}></${flag}>`).then();
      // @ts-ignore
      LMessage.success("复制成功");
    }
  }
}
