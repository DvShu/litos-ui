import FormInner from "../form/form_inner";
import { on, off, $$ } from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { isNumeric } from "ph-utils";

export default class CheckGroup extends FormInner {

  checkedValues: string[];

  constructor() {
    super(false);
    this.checkedValues = [];
  }

  static get observedAttributes(): string[] {
    return ['gap', 'value']
  }

  attributeChange(name: string, oldValue: any, newValue: any) {
    console.log(name)
    if (name === "gap") {
      const gap = parseAttrValue(newValue, undefined);
      if (gap) {
        const gapValue = isNumeric(gap) ? `${gap}px` : gap;
        this.style.setProperty("--l-check-gap", gapValue);
      } else {
        this.style.removeProperty("--l-check-gap");
      }
      return;
    }
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
