import FormInner from "../form/form_inner";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { parse } from "ph-utils/date";
import { $$ } from "ph-utils/dom";
import { langs } from "./langs";
import type { LangItem } from "./langs";
import { get } from "ph-utils/storage";
import { format } from "ph-utils/date";

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

  render(): string {
    const year = this._currentDate.getFullYear();
    const month = this._currentDate.getMonth();
    const currentDate = this._currentDate.getDate(); // 当前日期

    // 1. 生成表头 (thead)
    const theadRows = this._langData.weekdays
      .map((weekday) => `<th>${weekday}</th>`)
      .join("");

    // 2. 计算网格数据区间
    const firstDate = new Date(year, month, 1);
    let startDayIdx = firstDate.getDay() - 1;
    if (startDayIdx < 0) startDayIdx = 6;

    // 本月天数
    const currDate = new Date(year, month + 1, 0);
    const daysCount = currDate.getDate();
    const currTitlePrefix = format(currDate, "yyyy-mm");
    // 上个月天数
    const prevDate = new Date(year, month, 0);
    const prevDaysCount = prevDate.getDate();
    const prevTitlePrefix = format(prevDate, "yyyy-mm");
    // 下一个月
    const nextDate = new Date(year, month + 1, 1);
    const nextTitlePrefix = format(nextDate, "yyyy-mm");

    // 3. 一次性生成 42 个格子 (tbody)
    let tbodyHtml = "";
    for (let i = 0; i < 42; i++) {
      // 每 7 天是一个新行
      if (i % 7 === 0) {
        tbodyHtml += "<tr>";
      }

      let tdContent: string;
      let tdClass = "day";
      let titlePrefix = "";

      if (i < startDayIdx) {
        // 上个月的补全
        tdContent = `${prevDaysCount - startDayIdx + i + 1}`;
        tdClass += " empty";
        titlePrefix = prevTitlePrefix;
      } else if (i < startDayIdx + daysCount) {
        // 本月的天数
        const day = i - startDayIdx + 1;
        tdContent = `${day}`;
        if (day === currentDate) {
          tdClass += " active";
        }
        titlePrefix = currTitlePrefix;
      } else {
        // 下个月的补全
        tdContent = `${i - startDayIdx - daysCount + 1}`;
        tdClass += " empty";
        titlePrefix = nextTitlePrefix;
      }
      const title = `${titlePrefix}-${tdContent.padStart(2, '0')}`
      tbodyHtml += `<td class="${tdClass}" title="${title}">${tdContent}</td>`;

      if (i % 7 === 6) {
        tbodyHtml += "</tr>";
      }
    }

    // 4. 返回完整拼接的 table 字符串
    return `<table class="calendar-table"><thead><tr>${theadRows}</tr></thead><tbody>${tbodyHtml}</tbody></table>`;
  }
}