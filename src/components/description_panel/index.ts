import BaseComponent from "../base";
import { kebabToCamel, parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import {
  $one,
  on,
  shouldEventNext,
  hasClass,
  addClass,
  removeClass,
} from "ph-utils/dom";

export default class DescriptionPanel extends BaseComponent {
  public static baseName = "description-panel";

  /** 内容折叠后的高度, 默认: 100px */
  public collapseHeight: number = 100;

  static get observedAttributes(): string[] | null | undefined {
    return ["collapse-height"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const parsedValue = parseAttrValue(newValue, this[name as "id"]) as any;
    name = kebabToCamel(name);
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
      switch (name) {
        case "collapseHeight":
          if (this.collapseHeight !== 100) {
            this.style.setProperty(
              "--l-desc-panel-min-height",
              `${this.collapseHeight}px`
            );
          } else {
            this.style.removeProperty("--l-desc-panel-min-height");
          }
          break;
      }
    }
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  render() {
    const children = [
      `<div class="content"><slot></slot></div>`,
      '<div class="l-desc-panel-operator">',
      '<l-button type="primary" data-action="collapse" class="l-desc-panel-btnmore" text>',
      "<span>查看更多</span>",
      '<l-arrow-down-icon class="l-desc-panel-arrow"></l-arrow-down-icon>',
      "</l-button></div>",
    ];
    return children.join("");
  }

  afterInit(): void {
    this.classList.add("collapse");
    const $content = $one(".content", this.root);
    let $operator = $one(".l-desc-panel-operator", this.root);
    if ($content) {
      let contentHeight = $content.getBoundingClientRect().height;
      if (contentHeight <= this.collapseHeight) {
        if ($operator) {
          $operator.remove();
          $operator = null;
        }
      }
      let offsetHeight = 0;
      if ($operator) {
        const operatorHeight = $operator.getBoundingClientRect().height;
        const paddingTop =
          getComputedStyle($operator).getPropertyValue("padding-top");
        offsetHeight = operatorHeight - parseInt(paddingTop);
      }
      this.style.setProperty(
        "--l-desc-panel-max-height",
        `${contentHeight + offsetHeight}px`
      );
    }
    if ($operator) {
      on($operator, "click", this.#onCollapse);
    }
  }

  #onCollapse = (e: Event) => {
    const [next, _action, target] = shouldEventNext(
      e,
      "data-action",
      e.currentTarget as HTMLElement
    );
    if (next) {
      const $text = $one("span", target);
      if (hasClass(this, "collapse")) {
        removeClass(this, "collapse");
        if ($text) $text.textContent = "收起";
      } else {
        addClass(this, "collapse");
        if ($text) $text.textContent = "查看更多";
      }
    }
  };
}
