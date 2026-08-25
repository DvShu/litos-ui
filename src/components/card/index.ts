import { kebabToCamel, parseAttrValue } from "../utils";
import BaseComponent from "../base";
import cardCss from "./index.less?inline";
import { $$ } from "ph-utils/browser";

type CardState = {
  /** 标题 */
  headerText?: string;
  /** 是否显示标题 */
  showHeader: boolean;
  /** 底部区域内容 */
  footerText: string;
  /** 是否显示底部区域 */
  showFooter: boolean;
};

export default class Card extends BaseComponent<CardState> {
  public static baseName = "card";

  constructor() {
    super();
    this.version = 2;
    this._state = {
      headerText: "",
      showHeader: true,
      footerText: "",
      showFooter: false,
    };
  }

  static get observedAttributes() {
    return ["header-text", "show-header", "footer-text", "show-footer"];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "header-text":
      case "footer-text":
        this._state[kebabToCamel(name) as "headerText" | "footerText"] = newValue;
        break;
      case "show-header":
      case "show-footer":
        this._state[kebabToCamel(name) as "showHeader" | "showFooter"] = parseAttrValue(
          newValue,
          false,
          name,
        );
        break;
    }
  }

  render_v2() {
    return {
      style: cardCss,
      template: this.render(),
    };
  }

  public render() {
    const fragment = document.createDocumentFragment();

    if (this._state.showHeader) {
      const header = $$(
        "div",
        {
          class: "l-card__header",
          part: "header",
        },
        [
          this._state.headerText
            ? $$("span", { textContent: this._state.headerText })
            : $$("slot", { name: "header" }),
          $$("slot", { name: "header-extra" }),
        ],
      );

      fragment.appendChild(header);
    }

    const body = $$(
      "div",
      {
        class: "l-card__body",
        part: "body",
      },
      [$$("slot")],
    );
    fragment.appendChild(body);

    if (this._state.showFooter) {
      const footer = $$(
        "div",
        {
          class: "l-card__footer",
          part: "footer",
        },
        [
          this._state.footerText
            ? $$("span", { textContent: this._state.footerText })
            : $$("slot", { name: "footer" }),
        ],
      );

      fragment.appendChild(footer);
    }

    return fragment;
  }
}