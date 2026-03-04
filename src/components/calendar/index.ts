import FormInner from "../form/form_inner";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { parse } from "ph-utils/date";
import { $$ } from "ph-utils/dom";
import { langs } from "./langs";
import type { LangItem } from "./langs";
import { get } from "ph-utils/storage";

type CalendarState = {
  locale: string;
};

export default class Calendar extends FormInner<CalendarState> {
  public static baseName = "calendar";

  private _currentDate: Date;
  private _langData: LangItem;

  public constructor() {
    super();
    this._currentDate = new Date();
    const appLocale = get("l_app_locale", "zh-CN", { storage: "session" });
    this._state = {
      locale: appLocale,
    };
    this._langData = langs[appLocale];
  }

  public setValue(v: string) {
    super.setValue(v);
    this._currentDate = parse(v);
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return [...FormInner.observedAttributes, "locale"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "locale":
        if (langs.hasOwnProperty(newValue)) {
          this._state.locale = newValue;
          this._langData = langs[newValue];
        }
        break;

      default:
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("locale")) {
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // weekdays
    const $weekdays = $$("div", { class: "weekdays" });

    fragment.appendChild($weekdays);
  }
}