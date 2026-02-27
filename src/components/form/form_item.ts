import { $one, addClass, removeClass, $$ } from "ph-utils/dom";
import { initAttr, parseAttrValue } from "../utils";
import type { RuleType } from "ph-utils/validator";
//@ts-ignore
import css from "./form_item.less?inline";
import type { SchemaType } from "ph-utils/validator";
import ContextProvide from "../utils/context_provide";
import { signal } from "alien-signals";
import type { FormItemSignal } from "./types";

export default class FormItem extends ContextProvide<FormItemSignal> {
  public static baseName = "form-item";
  /** 标签文本 */
  public label?: string;
  public labelPosition?: "left" | "right" | "top" = "right";
  private formId?: string;

  constructor() {
    super();
    this.contextEventName = 'form-item-context-request';
    this.context = signal({ innerBlock: false });
  }

  static get observedAttributes() {
    return ["error", "label", "required", "inner-block", "prop"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // 如果新旧值相同，直接返回，避免不必要的逻辑执行
    if (oldValue === newValue) return;
    switch (name) {
      case "error":
        const isError = parseAttrValue(newValue);
        this._updateError(isError);
        break;

      case "label":
        this.label = newValue;
        this._updateLabel();
        break;

      case "prop":
        this.context({ ...this.context(), prop: newValue });
        break;

      case "required":
        const isRequired = parseAttrValue(newValue, false, name);
        if (isRequired) {
          this.classList.add("is-required");
        } else {
          this.classList.remove("is-required");
        }
        break;

      case "inner-block":
        const isBlock = parseAttrValue(newValue, false, name);
        this.context({ innerBlock: isBlock });
        break;
    }
  }

  connectedCallback(): void {
    initAttr(this);
    this.setAttribute("form-role", "form-item");
    this.loadStyleText([css]);
    super.connectedCallback();
    this._parseSchema();
    //   add(this.formId, "validateChange", this._validateChange);
  }


  public setRules(rules: { required?: boolean; rules?: RuleType[]; message?: string }) {
    const prop = this.getAttr("prop");
    if (prop) {
      const schema = { ...rules, key: prop };
      this._updateRules(schema);
    }
  }

  public render() {
    this.classList.add(`l-form-item--${this.labelPosition}`);
    const fragment = document.createDocumentFragment();
    if (this.label != null) {
      fragment.appendChild(
        $$("label", {
          class: "l-form-item__label",
          textContent: this.label,
        }),
      );
    }
    const $content = $$("div", { class: "l-form-item__content" });
    const $slot = $$("slot");
    $content.appendChild($slot);
    if (this.error) {
      $content.appendChild($$("div", { class: "l-form-item__error", textContent: this.error }));
    }
    fragment.appendChild($content);
    return fragment;
  }

  private _parseSchema() {
    const prop = this.getAttr("prop");
    if (prop) {
      let rules: any[] = [];
      const verify = this.getAttr("verify");
      if (verify) {
        rules = verify.split("|");
      }
      const pattern = this.getAttr("pattern");
      if (pattern) {
        rules.push(new RegExp(pattern));
      }
      const schema = {
        key: prop,
        required: this.getAttr("required", false),
        message: this.getAttr("validity"),
        rules: rules,
      };
      this._updateRules(schema);
    }
  }

  private _validateChange = (result: true | Record<string, string>, name?: string) => {
    // const error = result === true ? undefined : result[this.prop as string];
    // if (name == null || (name === this.prop && this.error != error)) {
    //   this.error = error;
    // }
  };

  private _updateError(error?: string) {
    if (this.error) {
      addClass(this, "is-error");
    } else {
      removeClass(this, "is-error");
    }
    if (!this.rendered) return;
    let $error = $one(".l-form-item__error", this.root);
    if ($error) {
      if (this.error) {
        $error.textContent = this.error;
      } else {
        $error.remove();
      }
    } else {
      if (this.error) {
        $error = document.createElement("div");
        $error.className = "l-form-item__error";
        $error.textContent = this.error;
        const $parent = $one(".l-form-item__content", this.root);
        if ($parent) {
          $parent.appendChild($error);
        }
      }
    }
  }

  private _updateLabel() {
    if (!this.rendered) return;
    let $label = $one(".l-form-item__label", this.root);
    if ($label == null) {
      if (this.label != null) {
        $label = document.createElement("div");
        $label.className = "l-form-item__label";
        $label.textContent = this.label;
        this.root.prepend($label);
      }
    } else {
      if (this.label != null) {
        $label.textContent = this.label;
      } else {
        $label.remove();
      }
    }
  }

  private _updateRules(schema: SchemaType) {
    this.emit("form-rule-change", {
      bubbles: true,
      composed: true,
      detail: schema,
    });
  }
}
