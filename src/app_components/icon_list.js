import { icons } from "../icons";
import { $one, on, off } from "ph-utils/dom";
import { copy } from "ph-utils/copy";
export default class IconList extends HTMLElement {
    handleItemClick;
    constructor() {
        super();
        this.handleItemClick = this._handleItemClick.bind(this);
    }
    connectedCallback() {
        const items = [];
        for (const icon of icons) {
            items.push(`<div class="icon-item" data-name="${icon.tagName}"><${icon.tagName} class="icon"></${icon.tagName}><span class="name">${icon.name}</span></div>`);
        }
        this.innerHTML = `<div class="icon-list">${items.join("")}</div>`;
        this._initEvents();
    }
    _initEvents() {
        on($one(".icon-list", this), "click", this.handleItemClick, {
            eventFlag: "data-name",
        });
    }
    disconnectedCallback() {
        off($one(".icon-list", this), "click", this.handleItemClick);
    }
    _handleItemClick(_e, currTarget, flag) {
        if (flag) {
            copy(`<${flag}></${flag}>`).then();
            // @ts-expect-error: Unreachable code error
            LMessage.success("复制成功");
        }
    }
}
