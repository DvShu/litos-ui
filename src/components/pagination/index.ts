import BaseComponent from "../base";
import { parseAttrValue, tagAttr, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { on, off, shouldEventNext, $one, clsx } from "ph-utils/browser";

type PaginationProps = {
  /** 数据总数 */
  total: number;
  /** 总页数 */
  pageCount: number;
  /** 每页显示条目个数, 默认: 10 */
  pageSize: number;
  /** 对齐方式, 默认: start */
  align: "start" | "center" | "end";
  /** 是否为简单分页, 默认: false */
  simple: boolean;
  /** 单页隐藏, 默认: false */
  hideOnSinglePage: boolean;
  /** 当前页码, 默认: 1 */
  currentPage: number;
};

export default class Pagination extends BaseComponent<PaginationProps> {
  public static baseName = "pagination";

  constructor() {
    super();
    this.version = 2;
    this._state = {
      total: 0,
      pageCount: 0,
      pageSize: 10,
      align: "start",
      simple: false,
      hideOnSinglePage: false,
      currentPage: 1,
    };
  }

  static get observedAttributes(): string[] | null | undefined {
    return [
      "align",
      "current-page",
      "page-count",
      "total",
      "hide-on-single-page",
      "simple",
      "page-size",
    ];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "align":
        this._state.align = (newValue || "start") as "start" | "center" | "end";
        break;
      case "total":
      case "page-count":
      case "page-size":
      case "current-page":
        const v = parseAttrValue(newValue, this._state[name as "total"]);
        this._state[kebabToCamel(name) as "total"] = v;
        if (name === "total" || name === "page-count") {
          this._state.pageCount = this.#calcTotalPage();
        }
        break;
      case "simple":
      case "hide-on-single-page":
        this._state[kebabToCamel(name) as "simple"] = parseAttrValue(newValue, false, name);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("align")) {
      const value =
        this._state.align === "center" ? this._state.align : `flex-${this._state.align}`;
      this.style.setProperty("--l-pagination-justify-content", value);
    } else {
      this.rerender();
      changedProps.clear();
    }
  }

  rerender() {
    const $pagination = $one(".l-pagination", this.root);
    if ($pagination) {
      this.#destroySimpleInput();
      $pagination.innerHTML = this.#renderMain();
      this.#initSimpleInput();
    }
  }

  render() {
    return `<div class="l-pagination">${this.#renderMain()}</div>`;
  }

  render_v2() {
    return {
      template: this.render(),
      style: css,
    };
  }

  afterInit(): void {
    on(this.root, "click", this.#onTap);
    this.#initSimpleInput();
  }

  beforeDestroy(): void {
    off(this.root, "click", this.#onTap);
    this.#destroySimpleInput();
  }

  #onTap = (e: Event) => {
    const [should, page] = shouldEventNext(e, "data-page", this.root);
    if (should) {
      let toPage = Number(page);

      toPage = Math.min(this._state.pageCount, Math.max(1, toPage));
      if (toPage !== this._state.currentPage) {
        this._state.currentPage = toPage;
        this.rerender();
        this.emit("change", {
          detail: {
            current: toPage,
            pageSize: this._state.pageSize || 10,
            totalPage: this._state.pageCount,
          },
        });
      }
    }
  };

  #calcTotalPage() {
    let pageCount = this._state.pageCount;
    const total = this._state.total;
    if (pageCount === 0 && total > 0) {
      pageCount = Math.ceil(total / (this._state.pageSize || 10));
    }
    return pageCount;
  }

  #renderMain() {
    if (this._state.pageCount <= 1) return "";
    const children: string[] = [];
    // 上一页切换按钮
    children.push(
      this.#generateItemElem("l-button", {
        title: "上一页",
        disabled: this._state.currentPage === 1,
        "data-page": this._state.currentPage - 1,
        innerHTML: "<l-arrow-left-icon></l-arrow-left-icon>",
        class: ["l-pagination-item", "l-pagination--btn", "prev-btn"],
      }),
    );

    if (this._state.simple) {
      children.push(
        this.#generateItemElem("div", {
          class: ["l-pagination-item", "l-pagination-simple-layout"],
          innerHTML: [
            this.#generateItemElem("l-input", {
              inputmode: "numeric",
              value: `${this._state.currentPage}`,
              class: ["l-pagination-simple-input"],
              "allow-input": "integer",
            }),
            '<span class="l-pagination-simple-divide">/</span>',
            `<span>${this._state.pageCount}</span>`,
          ],
        }),
      );
    } else {
      // 首页按钮
      children.push(
        this.#generateItemElem("a", {
          title: "1",
          innerHTML: "1",
          class: [
            "l-pagination-item",
            "l-pagination--link",
            this._state.currentPage === 1 ? "active" : "",
          ],
          "data-page": "1",
        }),
      );

      // 向前5页按钮
      if (this._state.currentPage > 4) {
        children.push(
          this.#generateItemElem("a", {
            title: "上5页",
            innerHTML: [
              "<l-d-arrow-left-icon class='darrow-icon'></l-d-arrow-left-icon>",
              "<l-more-icon class='more-icon'></l-more-icon>",
            ],
            class: ["l-pagination-item", "l-pagination--link"],
            "data-page": `${this._state.currentPage - 5}`,
          }),
        );
      }

      // 中间部分，显示包括当前页在内的最多5页
      // 由于当显示到最末尾的时候，是不足5页的，所以需要再往前推
      let start = Math.max(this._state.currentPage - 2, 1);
      let end = Math.min(this._state.currentPage + 2, this._state.pageCount);
      let diff = end - start;
      if (diff < 4) {
        // 不足5页，往后继续推
        end = Math.min(this._state.pageCount, end + (4 - diff));
      }
      diff = end - start;
      if (diff < 4) {
        // 还不足5页，往前推
        start = Math.max(1, start - (4 - diff));
      }
      for (let i = start; i <= end; i++) {
        if (i <= 1) continue;
        if (i >= this._state.pageCount) break;
        children.push(
          this.#generateItemElem("a", {
            title: `${i}`,
            innerHTML: `${i}`,
            class: [
              "l-pagination-item",
              "l-pagination--link",
              this._state.currentPage === i ? "active" : "",
            ],
            "data-page": `${i}`,
          }),
        );
      }

      // 向后5页
      if (this._state.currentPage < this._state.pageCount - 3) {
        children.push(
          this.#generateItemElem("a", {
            title: "下5页",
            innerHTML: [
              "<l-d-arrow-right-icon class='darrow-icon'></l-d-arrow-right-icon>",
              "<l-more-icon class='more-icon'></l-more-icon>",
            ],
            class: ["l-pagination-item", "l-pagination--link"],
            "data-page": `${this._state.currentPage + 5}`,
          }),
        );
      }

      // 末页按钮
      if (this._state.pageCount > 1) {
        children.push(
          this.#generateItemElem("a", {
            title: `${this._state.pageCount}`,
            innerHTML: `${this._state.pageCount}`,
            class: [
              "l-pagination-item",
              "l-pagination--link",
              this._state.currentPage === this._state.pageCount ? "active" : "",
            ],
            "data-page": `${this._state.pageCount}`,
          }),
        );
      }
    }

    // 下一页切换按钮
    children.push(
      this.#generateItemElem("l-button", {
        title: `${this._state.currentPage + 1}`,
        innerHTML: "<l-arrow-right-icon></l-arrow-right-icon>",
        class: ["l-pagination-item", "l-pagination--btn", "next-btn"],
        disabled: this._state.currentPage === this._state.pageCount,
        "data-page": `${this._state.currentPage + 1}`,
      }),
    );
    return children.join("");
  }

  #initSimpleInput() {
    const $input = $one(".l-pagination-simple-input", this.root) as any;
    if ($input) {
      $input.setParser(this.#simpleInputParser);
      on($input, "keyup", this.#onKeyup as any);
      on($input, "blur", this.#onBlur as any);
    }
  }

  #destroySimpleInput() {
    const $input = $one(".l-pagination-simple-input", this.root) as any;
    if ($input) {
      $input.setParser(undefined);
      off($input, "keyup", this.#onKeyup as any);
      off($input, "blur", this.#onBlur as any);
    }
  }

  #onBlur = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    const value = $target.value;
    if (!value) {
      $target.value = `${this._state.currentPage}`;
      return;
    }
    this._state.currentPage = Number(value);
    this.rerender();
  };

  #onKeyup = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const $target = e.target as HTMLInputElement;
      const value = $target.value;
      if (value) {
        const toPage = Number(value);
        this._state.currentPage = toPage;
        this.rerender();
      }
    }
  };

  #simpleInputParser = (value: string) => {
    if (value) {
      let nvalue = Number(value);
      nvalue = Math.max(1, Math.min(this._state.pageCount, nvalue));
      value = String(nvalue);
    }
    return value;
  };

  #generateItemElem(tagName: string = "a", options: Record<string, any>) {
    let attrs = [];
    let innerHTML = "";
    for (const key in options) {
      if (key === "innerHTML") {
        innerHTML = options[key];
        if (Array.isArray(innerHTML)) {
          innerHTML = innerHTML.join("");
        }
      } else if (key === "class") {
        const clazz = options.class;
        attrs.push(` class="${clsx(clazz)}"`);
      } else {
        attrs.push(tagAttr(key, options[key]));
      }
    }
    return `<${tagName}${attrs.join("")}>${innerHTML}</${tagName}>`;
  }
}