import BaseComponent from "../base";
import { parseAttrValue, tagAttr, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { formatClass, on, off, shouldEventNext, $one } from "ph-utils/dom";

export default class Pagination extends BaseComponent {
  public static baseName = "pagination";

  /** 数据总数 */
  public total?: number;
  /** 总页数 */
  public pageCount?: number;
  /** 每页显示条目个数 */
  public pageSize?: number = 10;
  /** 对齐方式 */
  public align?: "start" | "center" | "end";
  /** 是否为简单分页 */
  public simple?: boolean = false;
  /** 单页隐藏 */
  public hideOnSinglePage?: boolean = false;

  /** 当前页码 */
  #current = 1;
  /** 总页数 */
  #totalPage = 0;

  public get current() {
    return this.#current;
  }

  public set current(current: number) {
    this.setCurrent(current);
  }

  public setCurrent(current: number) {
    if (current !== this.#current) {
      this.#current = current;
      this.rerender();
    }
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes(): string[] | null | undefined {
    return [
      "align",
      "current",
      "page-count",
      "total",
      "hide-on-single-page",
      "simple",
    ];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "align"]) {
      this[name as "align"] = parsedValue;
      switch (name) {
        case "align":
          this.style.setProperty(
            "--l-pagination-justify-content",
            parsedValue === "center" ? parsedValue : `flex-${parsedValue}`
          );
          break;
        case "total":
        case "page-count":
          this.#totalPage = this.#calcTotalPage();
          break;
        case "simple":
        case "hide-on-single-page":
          if (this.rendered) {
            this.rerender();
          }
          break;
      }
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
      toPage = Math.min(this.#totalPage, Math.max(1, toPage));
      if (toPage !== this.current) {
        this.setCurrent(toPage);
        this.emit("change", {
          detail: {
            current: toPage,
            pageSize: this.pageSize || 10,
            totalPage: this.#totalPage,
          },
        });
      }
    }
  };

  #calcTotalPage() {
    let pageCount = this.pageCount;
    if (pageCount == null && this.total != null) {
      pageCount = Math.ceil(this.total / (this.pageSize || 10));
    }
    if (pageCount == null || pageCount <= 0) {
      pageCount = 1;
    }
    return pageCount;
  }

  #renderMain() {
    if (this.#totalPage <= 1) return "";
    const children: string[] = [];
    // 上一页切换按钮
    children.push(
      this.#generateItemElem("l-button", {
        title: "上一页",
        disabled: this.current === 1,
        "data-page": this.current - 1,
        innerHTML: "<l-arrow-left-icon></l-arrow-left-icon>",
        class: ["l-pagination-item", "l-pagination--btn", "prev-btn"],
      })
    );

    if (this.simple) {
      children.push(
        this.#generateItemElem("div", {
          class: ["l-pagination-item", "l-pagination-simple-layout"],
          innerHTML: [
            this.#generateItemElem("l-input", {
              inputmode: "numeric",
              value: `${this.current}`,
              class: ["l-pagination-simple-input"],
              "allow-input": "integer",
            }),
            '<span class="l-pagination-simple-divide">/</span>',
            `<span>${this.#totalPage}</span>`,
          ],
        })
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
            this.current === 1 ? "active" : "",
          ],
          "data-page": "1",
        })
      );

      // 向前5页按钮
      if (this.current > 4) {
        children.push(
          this.#generateItemElem("a", {
            title: "上5页",
            innerHTML: [
              "<l-d-arrow-left-icon class='darrow-icon'></l-d-arrow-left-icon>",
              "<l-more-icon class='more-icon'></l-more-icon>",
            ],
            class: ["l-pagination-item", "l-pagination--link"],
            "data-page": `${this.current - 5}`,
          })
        );
      }

      // 中间部分，显示包括当前页在内的最多5页
      // 由于当显示到最末尾的时候，是不足5页的，所以需要再往前推
      let start = Math.max(this.current - 2, 1);
      let end = Math.min(this.current + 2, this.#totalPage);
      let diff = end - start;
      if (diff < 4) {
        // 不足5页，往后继续推
        end = Math.min(this.#totalPage, end + diff);
      }
      diff = end - start;
      if (diff < 4) {
        // 还不足5页，往前推
        start = Math.max(1, start - diff);
      }
      for (let i = start; i <= end; i++) {
        if (i <= 1) continue;
        if (i >= this.#totalPage) break;
        children.push(
          this.#generateItemElem("a", {
            title: `${i}`,
            innerHTML: `${i}`,
            class: [
              "l-pagination-item",
              "l-pagination--link",
              this.current === i ? "active" : "",
            ],
            "data-page": `${i}`,
          })
        );
      }

      // 向后5页
      if (this.current < this.#totalPage - 3) {
        children.push(
          this.#generateItemElem("a", {
            title: "下5页",
            innerHTML: [
              "<l-d-arrow-right-icon class='darrow-icon'></l-d-arrow-right-icon>",
              "<l-more-icon class='more-icon'></l-more-icon>",
            ],
            class: ["l-pagination-item", "l-pagination--link"],
            "data-page": `${this.current + 5}`,
          })
        );
      }

      // 末页按钮
      if (this.#totalPage > 1) {
        children.push(
          this.#generateItemElem("a", {
            title: `${this.#totalPage}`,
            innerHTML: `${this.#totalPage}`,
            class: [
              "l-pagination-item",
              "l-pagination--link",
              this.current === this.#totalPage ? "active" : "",
            ],
            "data-page": `${this.#totalPage}`,
          })
        );
      }
    }

    // 下一页切换按钮
    children.push(
      this.#generateItemElem("l-button", {
        title: `${this.current + 1}`,
        innerHTML: "<l-arrow-right-icon></l-arrow-right-icon>",
        class: ["l-pagination-item", "l-pagination--btn", "next-btn"],
        disabled: this.current === this.#totalPage,
        "data-page": `${this.current + 1}`,
      })
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
      $target.value = `${this.current}`;
      return;
    }
    this.setCurrent(Number(value));
  };

  #onKeyup = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const $target = e.target as HTMLInputElement;
      const value = $target.value;
      if (value) {
        const toPage = Number(value);
        this.setCurrent(toPage);
      }
    }
  };

  #simpleInputParser = (value: string) => {
    if (value) {
      let nvalue = Number(value);
      nvalue = Math.max(1, Math.min(this.#totalPage, nvalue));
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
        attrs.push(` class="${formatClass(clazz)}"`);
      } else {
        attrs.push(tagAttr(key, options[key]));
      }
    }
    return `<${tagName}${attrs.join("")}>${innerHTML}</${tagName}>`;
  }
}
