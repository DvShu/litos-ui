import BaseComponent from "../base";
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./item.less?inline";
import { $$, $one, queryHideNodeSize, on, off } from "ph-utils/dom";

export default class CollapaseItem extends BaseComponent {
  public static baseName = "collapse-item";

  public name: string = "";
  public headerText?: string = "";
  #expand: boolean = false;

  connectedCallback(): void {
    this.loadStyleText(css);
    this.#setStyleAndClass();
    super.connectedCallback();
  }

  #setStyleAndClass() {
    if (this.expand) {
      this.classList.add("l-collapse-expand");
    } else {
      this.classList.remove("l-collapse-expand");
    }
  }

  get expand() {
    return this.#expand;
  }

  set expand(value: boolean) {
    this.#expand = value;
    this.#handleExpand();
  }

  static get observedAttributes() {
    return ["name", "header-text", "expand"];
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
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // header
    const $header = $$("div", {
      class: "l-collapse-item__header",
      part: "header",
    });
    const $arrow = $$("l-arrow-right-icon", { class: "l-collapse-arrow-icon" });
    $header.appendChild($arrow);
    if (this.headerText) {
      const $headerText = $$("span", {
        part: "header-text",
        textContent: `${this.headerText}`,
      });
      $header.appendChild($headerText);
    } else {
      $header.appendChild(
        $$("slot", {
          name: "header-text",
        })
      );
    }
    fragment.appendChild($header);
    // content
    if (this.expand) {
      fragment.appendChild(this.#createContentElement(false));
    }
    return fragment;
  }

  afterInit(): void {
    const $parent = this.parentElement as any;
    if ($parent && $parent.tagName.endsWith("COLLAPASE")) {
      this.#parentKeyChange({
        arrowPlacement: $parent.arrowPlacement,
        headerJustify: $parent.headerJustify,
        background: $parent.background,
        gap: $parent.gap,
      });
    }
    const $header = $one(".l-collapse-item__header", this.root);
    if ($header) {
      on($header, "click", this.#handleHeaderTap);
    }
  }

  beforeDestroy(): void {
    const $header = $one(".l-collapse-item__header", this.root);
    if ($header) {
      off($header, "click", this.#handleHeaderTap);
    }
  }

  #handleHeaderTap = () => {
    this.expand = !this.expand;
  };

  #parentKeyChange(props: Record<string, any>) {
    let $header = $one(".l-collapse-item__header", this.root);
    if ($header) {
      if (props.arrowPlacement === "right") {
        $header.classList.add("arrow-right");
      } else {
        $header.classList.remove("arrow-right");
      }
      if (props.headerJustify === "space-between") {
        $header.classList.add("space-between");
      } else {
        $header.classList.remove("space-between");
      }
    }
    if (props.background) {
      this.classList.add("background");
    } else {
      this.classList.remove("background");
    }
    if (props.gap && props.gap !== "0px") {
      this.classList.add("space");
    } else {
      this.classList.remove("space");
    }
  }

  #handleExpand() {
    if (!this.rendered) return;
    let $content = $one(".l-collapse-content", this.root);
    let contentHeight = 0;
    if (this.#expand) {
      this.classList.add("l-collapse-expand");
      // 展开面板
      if (!$content) {
        $content = this.#createContentElement(true);
        this.root.appendChild($content);
      }
      const size = queryHideNodeSize($content, null);
      $content.style.height = `${size.height}px`;
      $content.style.display = "block";

      contentHeight = size.height;
    } else {
      // 折叠面板
      this.classList.remove("l-collapse-expand");
      if ($content) {
        const rect = $content.getBoundingClientRect();
        contentHeight = rect.height;
      }
    }
    if ($content) {
      const frames = [{ height: "0px" }, { height: `${contentHeight}px` }];
      if (!this.#expand) {
        frames.reverse();
      }
      let anim = $content.animate(frames, {
        duration: 150,
      });
      if (!this.#expand) {
        anim.onfinish = () => {
          $content.style.display = "none";
          anim.onfinish = null;
          anim = null as any;
        };
      }
    }
    this.emit("expand-change", {
      detail: { name: this.name, expand: this.expand },
    });
  }

  #createContentElement(hide = true) {
    const $content = $$("div", {
      class: "l-collapse-content",
      style: hide ? "display: none;" : "",
    });
    $$(
      "div",
      {
        class: "l-collapse-content-box",
        innerHTML: "<slot></slot>",
      },
      $content
    );
    return $content;
  }
}
