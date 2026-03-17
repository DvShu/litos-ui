import FormInner from "../form/form_inner";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $one } from "ph-utils/dom";
import { langs } from "./langs";
import type { LangItem } from "./langs";
import { get } from "ph-utils/storage";
import { format, parse, startOf, endOf } from "ph-utils/date";

type CalendarState = {
  locale: string;
  minDate: number;
  maxDate: number;
  year: number;
  month: number;
  type: "select" | "range";
};

export default class Calendar extends FormInner<CalendarState> {
  public static baseName = "calendar";

  private _langData: LangItem;
  private $container?: HTMLTableElement;
  /** 选择的日期列表 */
  private _selectDates: string[];
  private _range?: [number, number];

  public constructor() {
    super();
    this.version = 2;
    const appLocale = get("l_app_locale", "zh-CN", { storage: "session" });
    const now = new Date();
    this._state = {
      locale: appLocale,
      minDate: -Infinity,
      maxDate: Infinity,
      year: now.getFullYear(),
      month: now.getMonth(),
      type: "select",
    };
    this._langData = langs[appLocale];
    this._selectDates = [];
  }

  public setValue(v: string) {
    if (v != this.value) {
      super.setValue(v);
      if (this._state.type === "select") {
        this._selectDates = v.split(",");
      } else {
        this._range = v.split(",").map((item) => parse(item).getTime()) as [number, number];
      }
      this.batchUpdate();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  afterInit(): void {
    this.$container = $one(".calendar-table", this.root) as HTMLTableElement;
  }

  beforeDestroy(): void {
    this.$container = undefined;
  }

  static get observedAttributes() {
    return [
      ...FormInner.observedAttributes,
      "locale",
      "year",
      "month",
      "min-date",
      "max-date",
      "type",
    ];
  }

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
        this._state.type = newValue as "select" | "range";
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
      if (title === this.value) {
        tdClass += " active";
      }
      tbodyHtml += `<td class="${tdClass}" title="${title}">${tdContent}</td>`;
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
    const template = `<table class="calendar-table">${this.rerender()}</table>`;

    return {
      template: template,
      style: [css],
    };
  }
  //只要 minDate、maxDate、_rangeStart、_rangeEnd、_hoverDate、_selectedDates 任何一个发生了改变，都调用这个统一的函数。
  private _updateCellsState() {
    // if (!this._dayCells || this._dayCells.length === 0) return;
    // 1. 提前提取状态，避免在循环内部重复读取 this
    // const min = this._state.minDate;
    // const max = this._state.maxDate;
    // const mode = this._state.mode; // 'single' | 'range' | 'multiple'
    // const val = this.value; // 单选的值
    // // 区间选择的状态
    // const rangeStart = this._rangeStart;
    // const rangeEnd = this._rangeEnd || this._hoverDate;
    // let rangeMin = 0,
    //   rangeMax = 0;
    // if (rangeStart && rangeEnd) {
    //   rangeMin = Math.min(rangeStart, rangeEnd);
    //   rangeMax = Math.max(rangeStart, rangeEnd);
    // }
    // // 2. 一次性遍历 42 个节点
    // this._dayCells.forEach((td) => {
    //   // 假设渲染时存了 data-ts 时间戳
    //   const tsStr = td.dataset.ts;
    //   if (!tsStr) return;
    //   const ts = parseInt(tsStr, 10);
    //   // --- A. 计算所有布尔值状态 ---
    //   // 禁用状态
    //   const isDisabled = ts < min || ts > max;
    //   // 单选模式状态
    //   // const title = td.getAttribute("title"); // 如果用 title 比对的话
    //   // const isSingleActive = mode === 'single' && title === val;
    //   // 区间模式状态
    //   const isRangeStart = mode === "range" && !!rangeStart && ts === rangeStart;
    //   const isRangeEnd = mode === "range" && !!rangeEnd && ts === rangeEnd;
    //   const isInRange = mode === "range" && rangeMin > 0 && ts > rangeMin && ts < rangeMax;
    //   // 多选模式状态
    //   const isMultiActive = mode === "multiple" && this._selectedDates.has(ts);
    //   // --- B. 统一应用到 classList ---
    //   // 重点：把所有状态通过 toggle 批量映射到 DOM 上
    //   td.classList.toggle("disabled", isDisabled);
    //   // td.classList.toggle("active", isSingleActive || isMultiActive);
    //   // 如果被禁用，强制不展示任何高亮效果
    //   if (isDisabled) {
    //     td.classList.remove("active", "range-start", "range-end", "in-range");
    //   } else {
    //     td.classList.toggle("range-start", isRangeStart);
    //     td.classList.toggle("range-end", isRangeEnd);
    //     td.classList.toggle("in-range", isInRange);
    //   }
    // });
  }
}