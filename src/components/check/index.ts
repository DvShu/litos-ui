import FormInner from "../form/form_inner";
import { on, off, $$ } from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { isNumeric } from "ph-utils";
import { iterate } from "ph-utils/dom";

export default class CheckGroup extends FormInner {
  checkedValues: string[];
  multiple: boolean;

  set value(value: string) {
    super.setValue(value);
    if (this.rendered) {
      this.updateChangedStatus();
    }
  }

  get value() {
    return this._value;
  }

  constructor() {
    super(false);
    this.multiple = true;
    this.checkedValues = [];
  }

  static get observedAttributes(): string[] {
    return ["gap", "value"];
  }

  attributeChange(name: string, oldValue: any, newValue: any) {
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
    this.updateChangedStatus();
  }

  beforeDestroy(): void {
    off(this.root, "change", this.#handleChange as any);
    this.checkedValues = [];
  }

  render() {
    return $$("slot");
  }

  #handleChange = (e: CustomEvent) => {
    e.stopPropagation(); // 阻止事件传播
    this.updatePartChild(e.detail.value);
    this.setValue(e.detail.value);

    this.emit("change", {
      detail: { value: [...this.checkedValues] },
      composed: true,
    });
  };

  protected updatePartChild(_value: string) {}

  protected updateChecked() {
    if (this.value) {
      if (this.multiple) {
        const values = this.value.split("&") as string[];
        this.checkedValues.push(...values.map((v) => decodeURIComponent(v)));
      } else {
        this.checkedValues = [this.value];
      }
    } else {
      this.checkedValues = [];
    }
  }

  protected updateChangedStatus() {
    this.updateChecked();
    this.updateChildren();
  }

  protected updateChildren() {
    const children = this.children as unknown as HTMLInputElement[];
    iterate(children, ($checkbox) => {
      let value = $checkbox.value || $checkbox.getAttribute("value");
      if (value) {
        if (this.checkedValues.includes(value)) {
          $checkbox.setAttribute("checked", "");
        } else {
          // 移除checked属性
          $checkbox.removeAttribute("checked");
        }
      }
    });
  }
}
