import { initAttr, parseAttrValue, tagAttr } from "../utils";
import FormInner from "../form/form_inner";
import {
  formatClass,
  $one,
  $,
  iterate,
  getAttr,
  on,
  off,
  hasClass,
  addClass,
  removeClass,
  $$,
} from "ph-utils/dom";
import { random } from "ph-utils";
import css from "./index.less?inline";

export default class RadioGroup extends FormInner {
  public static baseName = "radio-group";
  public type?: "button";
  name?: string;

  constructor() {
    super(false);
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText(css);
    super.connectedCallback();
  }

  afterInit(): void {
    if (this.value) {
      const $radio = $one(
        `l-radio[value="${this.value}"]`,
        this
      ) as HTMLInputElement;
      if ($radio) {
        $radio.setAttribute("checked", "");
      }
    }
    on(this.root, "change", this.#handleChange as any);
  }

  beforeDestroy(): void {
    off(this.root, "change", this.#handleChange as any);
  }

  render() {
    return $$("slot");
  }

  #handleChange = (e: CustomEvent) => {
    // 清除上一个选中状态
    const $prev = $one(
      `l-radio[value="${this.value}"]`,
      this
    ) as HTMLInputElement;
    if ($prev) {
      $prev.removeAttribute("checked");
    }
    this.value = e.detail.value;
    e.stopPropagation(); // 阻止事件传播
    this.emit("change", { detail: { value: this.value }, composed: true });
  };
}
