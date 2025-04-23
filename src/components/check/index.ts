import FormInner from "../form/form_inner";
import { on, off, $$ } from "ph-utils/dom";
import { initAttr } from "../utils";
import css from "./index.less?inline";

export default class CheckGroup extends FormInner {
  button = false; // 是否为按钮样式

  checkedValues: Set<string>;

  constructor() {
    super(false);
    this.checkedValues = new Set();
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([css]);
    super.connectedCallback();
  }

  public attributeInitAfter(): void {
    if (this.value) {
      this.checkedValues.add(this.value);
    }
  }

  afterInit(): void {
    on(this.root, "change", this.#handleChange as any);
  }

  beforeDestroy(): void {
    off(this.root, "change", this.#handleChange as any);
  }

  render() {
    return $$("slot");
  }

  #handleChange = (e: CustomEvent) => {
    this.valueChange(e.detail.value);
    e.stopPropagation(); // 阻止事件传播
    this.emit("change", {
      detail: { value: [...this.checkedValues] },
      composed: true,
    });
  };

  public valueChange(_value: string) {}
}
