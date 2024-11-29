import { formatClass, $one } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr, tagAttr } from "../util";
import type Form from "../form";
import FormItem from "../form/form_item";
import { add } from "../form/form_events";

export default class Input extends BaseComponent {
  public static baseName: string = "input";
  /** 原生 input 的 type */
  public type: string = "text";
  public placeholder: string | undefined = undefined;
  public autosize = false;
  public disabled = false;
  /** 限制输入类型, number, integer */
  public allowInput: string | undefined = undefined;
  private $input: HTMLInputElement | undefined = undefined;
  /** 表单 form 的 唯一标记 */
  private form: string | undefined = undefined;

  get value(): string {
    if (this.$input) return this.$input.value;
    return "";
  }

  set value(value: string | undefined) {
    if (this.$input) {
      this.$input.value = value || "";
    }
  }

  constructor() {
    super();
    initAttr(this);
  }

  connectedCallback(): void {
    this.loadStyle(["input"]);
    const formInfo = this._getForm();
    if (formInfo.formId) {
      add(formInfo.formId, "formAttributeChanged", this._formAttributeChanged);
    }
    super.connectedCallback();
  }

  render() {
    const val = this.getAttr("value", "");
    let valStr = tagAttr("value", val);
    const placeholderStr = tagAttr("placeholder", this.placeholder);
    const disabledStr = tagAttr("disabled", this.disabled);
    const classStr = formatClass({
      "l-input": true,
      "is-autosize": this.autosize,
    });
    this.shadow.innerHTML = `<input${valStr} type="${this.type}"${placeholderStr}${disabledStr} class="${classStr}" />`;
    this.$input = $one("input", this.shadow as any) as HTMLInputElement;
  }

  private _formAttributeChanged(name: string, value: string) {}

  private _getForm() {
    let $form: Form | undefined;
    let $formItem: FormItem | undefined;
    let $parent = this.parentElement;
    while ($parent != null) {
      const tagName = $parent.tagName;
      if (tagName === "L-FORM") {
        $form = $parent as Form;
        break;
      }
      if (tagName === "BODY") break;
      if (tagName === "L-FORM-ITEM") {
        $formItem = $parent as FormItem;
      }
      $parent = $parent.parentElement;
    }
    return {
      $form,
      $formItem,
      formId: $form?.formId,
      formDisabled: $form?.disabled,
      formItemDisabled: $formItem?.disabled,
    };
  }
}
