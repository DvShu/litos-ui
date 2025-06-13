import FormInner from "../form/form_inner";
import { on, off, $$ } from "ph-utils/dom";
import { initAttr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";

export default class CheckGroup extends FormInner {
  button = false; // 是否为按钮样式

  checkedValues: string[];

  constructor() {
    super(false);
    this.checkedValues = [];
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText([css]);
    super.connectedCallback();
  }

  afterInit(): void {
    on(this.root, "change", this.#handleChange as any);
  }

  beforeDestroy(): void {
    off(this.root, "change", this.#handleChange as any);
    this.checkedValues = [];
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
