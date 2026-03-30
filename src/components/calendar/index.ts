import { parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $one, off, on, shouldEventNext } from "ph-utils/dom";
import { langs } from "./langs";
import type { LangItem } from "./langs";
import { get } from "ph-utils/storage";
import { format, startOf, endOf, timestamp } from "ph-utils/date";
import BaseComponent from "../base";

type CalendarState = {
  locale: string;
  minDate: number;
  maxDate: number;
  year: number;
  month: number;
  type: "select" | "range";
};

export default class Calendar extends BaseComponent<CalendarState> {
  public static baseName = "calendar";

  private _langData: LangItem;
  private $container?: HTMLTableElement;
  /** 选择的日期列表 */
  private _selectDates: string[];
  private _range?: [number, number];
  private _value: string;

  public constructor() {
    super();
    this.version = 2;
    const appLocale = get("l_app_locale", "zh-CN", { storage: "session" });
    const now = new Date();
    this._value = "";
    this._state = {
      locale: appLocale,
      minDate: -Infinity,
      maxDate: Infinity,
      year: now.getFullYear(),
      type: "select",
      month: now.getMonth(),
    };
    this._langData = langs[appLocale];
    this._selectDates = [];
  }

  get value() {
    return this._value;
  }

  set value(v: string) {
    this.setValue(v);
  }

  public setValue(v: string) {
    if (v != this._value) {
      this._value = v;
      this._updateValue();
    }
  }

  private _updateValue() {
    if (this._state.type === "range") {
      this._range = this._value.split(",").map((v: string) => {
        return timestamp(v, "ms");
      }) as [number, number];
      this._selectDates = [];
    } else {
      this._selectDates = this._value.split("&");
      this._range = undefined;
    }
    this.batchUpdate();
  }

  afterInit(): void {
    this.$container = $one(".calendar-table", this.root) as HTMLTableElement;
    on(this.root, "click", this.handleCellClick);
  }

  beforeDestroy(): void {
    this.$container = undefined;
    off(this.root, "click", this.handleCellClick);
  }

  static get observedAttributes() {
    return ["value", "locale", "year", "month", "min-date", "max-date", "type"];
  }

  handleCellClick = (e: Event) => {
    const [next, day, target] = shouldEventNext(e, "l-day", this.root);
    if (next) {
      const clazzList = target.classList;
      let isActiveMonth = !clazzList.contains("prev-month") && !clazzList.contains("next-month");

      this.emit("day-click", {
        detail: {
          minTimestamp: this._state.minDate,
          maxTimestamp: this._state.maxDate,
          dayTimestamp: Number(day),
          day: target.title,
          isActiveMonth,
        },
      });
    }
  };

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "locale":
        if (langs.hasOwnProperty(newValue)) {
          this._state.locale = newValue;
          this._langData = langs[newValue];
        }
        break;
      case "min-date":
        this._state.minDate = startOf(newValue).getTime();
        break;
      case "max-date":
        this._state.maxDate = endOf(newValue).getTime();
        break;
      case "year":
        this._state.year = parseAttrValue(newValue, this._state.year);
        break;
      case "month":
        this._state.month = parseAttrValue(newValue, this._state.month + 1) - 1;
        break;
      case "type":
        this._state.type = newValue as "select";
        this._updateValue();
        break;
      case "value":
        this.setValue(newValue);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("locale")) {
      this.rerenderHeader();
    } else if (changedProps.has("year") || changedProps.has("month")) {
      if (this.$container) {
        this.$container.innerHTML = this.rerender();
      }
    } else {
      this.rerenderBody();
    }
  }

  private _renderHeader() {
    const temp = this._langData.weekdays.map((weekday) => `<th>${weekday}</th>`).join("");
    return `<tr>${temp}</tr>`;
  }

  private _renderBody() {
    const year = this._state.year;
    const month = this._state.month;
    const today = format(null, "yyyy-mm-dd");

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

    const firstGridDate = new Date(firstDate);
    firstGridDate.setDate(firstGridDate.getDate() - startDayIdx);
    let currentGridTs = firstGridDate.setHours(0, 0, 0, 0);

    const ONE_DAY_MS = 86400000; // 一天的毫秒数

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
        tdClass += " prev-month";
        titlePrefix = prevTitlePrefix;
      } else if (i < startDayIdx + daysCount) {
        // 本月的天数
        const day = i - startDayIdx + 1;
        tdContent = `${day}`;
        titlePrefix = currTitlePrefix;
      } else {
        // 下个月的补全
        tdContent = `${i - startDayIdx - daysCount + 1}`;
        tdClass += " next-month";
        titlePrefix = nextTitlePrefix;
      }

      const isDisabled = currentGridTs < this._state.minDate || currentGridTs > this._state.maxDate;
      if (isDisabled) {
        tdClass += " disabled";
      }

      const title = `${titlePrefix}-${tdContent.padStart(2, "0")}`;
      if (title === today) {
        tdClass += " today";
      }
      if (this._selectDates.includes(title)) {
        tdClass += " active";
      }
      tbodyHtml += `<td class="${tdClass}" title="${title}" l-day="${currentGridTs}">${tdContent}</td>`;
      // 步进：移动到下一天的时间戳
      currentGridTs += ONE_DAY_MS;
      if (i % 7 === 6) {
        tbodyHtml += "</tr>";
      }
    }
    return tbodyHtml;
  }

  rerenderHeader() {
    if (this.$container) {
      const $header = $one("thead", this.$container) as HTMLTableElement;
      $header.innerHTML = this._renderHeader();
    }
  }

  rerenderBody() {
    if (this.$container) {
      const $body = $one("tbody", this.$container) as HTMLTableElement;
      $body.innerHTML = this._renderBody();
    }
  }

  rerender() {
    return `<thead>${this._renderHeader()}</thead><tbody>${this._renderBody()}</tbody>`;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    // 4. 返回完整拼接的 table 字符串
    const template = `<table class="calendar-table" l-day="__stop__">${this.rerender()}</table>`;

    return {
      template: template,
      style: [css],
    };
  }
}