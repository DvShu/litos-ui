import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import type { Column } from "./types";
import {
  $$,
  $one,
  formatStyle,
  iterate,
  on,
  off,
  shouldEventNext,
} from "ph-utils/dom";
import { random } from "ph-utils";

export default class Table extends BaseComponent {
  public static baseName = "table";

  /** 斑马纹 */
  public stripe = true;
  /** 是否显示四周边框 */
  public border = false;
  /** 是否固定表头 */
  public fixedHead = false;

  public columns?: Column[] = [];
  public data?: any[] = [];

  /** 左边固定列, 格式: [列key, 宽度] */
  private _fixedLeft: [string, number][] = [];
  /** 右边固定列, 格式: [列key, 宽度] */
  private _fixedRight: [string, number][] = [];
  /** 缓存列通用样式, 避免渲染数据时，重复计算 */
  private _globalColStyles?: Record<string, string>;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  public setColumns(columns: Column[]) {
    this._fixedLeft = [];
    this._fixedRight = [];
    this.columns = this._parseColumns(
      columns,
      this._fixedLeft,
      this._fixedRight
    );
    this.rerender();
  }

  public setData(data: any[]) {
    this.data = data;
    if (this.columns && this.columns.length > 0) {
      this.rerender();
    }
  }

  static get observedAttributes() {
    return ["stripe", "border", "fixed-head"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
      switch (name) {
        case "stripe":
          this._classAttrChannge("stripe", parsedValue);
          break;
        case "border":
          this._classAttrChannge("border", parsedValue);
          break;
        case "fixedHead":
          this._updateFixedHead();
          break;
      }
    }
  }

  render() {
    const $table = $$("table", {
      class: [
        "l-table",
        this.stripe ? "l-table-stripe" : "",
        this.border ? "l-table-border" : "",
      ],
    });

    $table.appendChild(this._headRender());
    $table.appendChild(this._bodyRender());

    return $table;
  }

  rerender() {
    if (this.rendered) {
      const $thead = $one("thead", this.root);
      if ($thead) {
        $thead.replaceWith(this._headRender());
      }
      const $tbody = $one("tbody", this.root);
      if ($tbody) {
        $tbody.replaceWith(this._bodyRender());
      }
    }
  }

  private _classAttrChannge(attr: string, value: boolean) {
    if (this.rendered) {
      const $table = $one("table", this.root);
      if ($table) {
        $table.classList.toggle(`l-table-${attr}`, value);
      }
    }
  }

  private _updateFixedHead() {
    if (this.rendered) {
      const $thead = $one("thead", this.root);
      if ($thead) {
        $thead.classList.toggle("l-table-fixed", this.fixedHead);
        $thead.style.top = this.fixedHead ? "0" : "";
      }
    }
  }

  private _headRender() {
    const $thead = $$("thead", {
      class: {
        "l-table-fixed": this.fixedHead,
      },
      style: {
        top: this.fixedHead ? "0" : undefined,
      },
    });
    if (this.columns) {
      this._rendHeadRow($thead, this.columns);
    }
    return $thead;
  }

  private _rendHeadRow(thead: HTMLElement, columns: Column[]) {
    const $tr = $$("tr");
    for (let i = 0, len = columns.length; i < len; i++) {
      const column = columns[i];
      $tr.appendChild(this._headColRender(column, i));
      if (column.children) {
        this._rendHeadRow(thead, column.children);
      }
    }
    thead.appendChild($tr);
  }

  private _headColRender(column: Column, index: number) {
    const $th = $$("th") as HTMLTableCellElement;
    if (column.titleColspan) {
      $th.colSpan = column.titleColspan;
    }
    if (column.titleRowspan) {
      $th.rowSpan = column.titleRowspan;
    }
    $th.appendChild(
      $$("span", {
        textContent: column.title,
      })
    );
    if (column.sorter) {
      // 排序，显示排序图标
      const $caret = $$("span", { class: "caret-wrapper" });
      $caret.appendChild($$("span", { class: "sort-caret ascending" }));
      $caret.appendChild($$("span", { class: "sort-caret descending" }));
      $th.appendChild($caret);
    }
    return $th;
  }

  private _bodyRender() {
    const $tbody = $$("tbody");
    if (this.data && this.data.length > 0) {
      for (let i = 0, len = this.data.length; i < len; i++) {
        const rowData = this.data[i];
        if (this.columns) {
          const $tr = $$("tr");
          this._bodyRowRender(this.columns, i, rowData, $tr);
          $tbody.appendChild($tr);
        }
      }
    } else {
      const $emptyTr = $$("tr");
      const $td = $$("td", {
        class: "l-table__empty-col",
        textContent: "暂无数据",
      }) as HTMLTableCellElement;
      if (this.columns) {
        $td.colSpan = this.columns.length;
      }
      $emptyTr.appendChild($td);
      $tbody.appendChild($emptyTr);
    }
    return $tbody;
  }

  private _bodyRowRender(
    columns: Column[],
    rowIndex: number,
    rowData: any,
    tr: HTMLElement
  ) {
    for (let i = 0, len = columns.length; i < len; i++) {
      const column = columns[i];
      if (column.children && column.children.length > 0) {
        // 多级表头数据列渲染
        this._bodyRowRender(column.children, rowIndex, rowData, tr);
      } else {
        // 非多级表头数据列渲染
        const $td = $$("td") as HTMLTableCellElement;
        if (typeof column.rowspan === "number") {
          $td.rowSpan = column.rowspan;
        }
        if (typeof column.rowspan === "function") {
          $td.rowSpan = column.rowspan(rowData, rowIndex);
        }
        if (typeof column.colspan === "number") {
          $td.colSpan = column.colspan;
        }
        if (typeof column.colspan === "function") {
          $td.colSpan = column.colspan(rowData, rowIndex);
        }
        if (column.fixed) {
          $td.className = "l-fixed";
        }
        $td.style.cssText = this._getColumnStyle(
          column,
          this._fixedLeft,
          this._fixedRight
        );
        if (column.render) {
          const colRendered = column.render(rowData, rowIndex);
          if (typeof colRendered === "string") {
            $td.innerHTML = colRendered;
          } else if (Array.isArray(colRendered)) {
            iterate(colRendered, (item) => {
              $td.appendChild(item);
            });
          } else {
            $td.appendChild(colRendered);
          }
        } else {
          $td.textContent = column.key ? rowData[column.key] : "";
        }
        tr.appendChild($td);
      }
    }
  }

  /**
   * 解析列配置，表头跨行跨列、固定列
   * @param columns 列配置
   * @param fixedLeft 左边固定列
   * @param fixedRight 右边固定列
   * @returns
   */
  private _parseColumns(
    columns: Column[],
    fixedLeft: [string, number][],
    fixedRight: [string, number][]
  ): Column[] {
    const result: Column[] = [];
    for (let i = 0, len = columns.length; i < len; i++) {
      const column = columns[i];
      // 设置列的id用于固定列的宽度计算
      if (!column.id) {
        column.id = column.key || column.title;
      }
      if (!column.id) {
        column.id = `${i}_${random(6)}`;
      }
      if (column.fixed) {
        const width = Number.parseFloat(`${column.width || 0}`);
        if (column.fixed === "left") {
          fixedLeft.push([column.id, width]);
        } else if (column.fixed === "right") {
          fixedRight.push([column.id, width]);
        }
      }
      // 如果有多级表头, 递归解析
      if (column.children) {
        const childrenColumns = this._parseColumns(
          column.children,
          fixedLeft,
          fixedRight
        );
        column.titleRowspan = column.titleRowspan || 1;
        if (!column.titleColspan) {
          column.titleColspan = childrenColumns.reduce((prev, cur) => {
            return prev + (cur.titleColspan || 1);
          }, 0);
        }
        result.push({ ...column, children: childrenColumns });
      } else {
        // 如果元素没有子级，意味着它占满从当前层级到最底层的所有行
        column.titleRowspan = column.titleRowspan || this._getMaxDepth(columns);
        column.titleColspan = column.titleColspan || 1;
        result.push({ ...column });
      }
    }

    return result;
  }

  /**
   * 获取多级表头的最大深度
   * @param headers 表头配置
   * @returns 最大深度, 最大跨行数
   */
  private _getMaxDepth(headers: Column[]): number {
    let maxDepth = 1;
    for (const header of headers) {
      if (header.children) {
        maxDepth = Math.max(maxDepth, this._getMaxDepth(header.children) + 1);
      }
    }
    return maxDepth;
  }

  private _getColumnStyle(
    column: Column,
    fixedLeft: [string, number][],
    fixedRight: [string, number][]
  ) {
    const id = column.id as string;
    if (this._globalColStyles && id in this._globalColStyles) {
      return this._globalColStyles[id];
    }
    const styles = { ...column.style };
    if (column.width) {
      if (typeof column.width === "number") {
        styles.width = `${column.width}px`;
      } else {
        styles.width = column.width;
      }
    }
    if (!this._globalColStyles) {
      this._globalColStyles = {};
    }
    const res = formatStyle(styles);
    this._globalColStyles[id] = res;
    return res;
  }

  private _handleTap = (e: Event) => {
    const [isNext, action, target] = shouldEventNext(
      e,
      "data-action",
      e.currentTarget as HTMLElement
    );
    if (isNext) {
      const dataset = target.dataset;
      this.emit("action", { detail: dataset });
    }
  };

  afterInit(): void {
    on(this.root, "click", this._handleTap);
  }

  beforeDestroy(): void {
    off(this.root, "click", this._handleTap);
  }
}
