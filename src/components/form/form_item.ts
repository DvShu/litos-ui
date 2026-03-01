import { $one, addClass, removeClass, $$, on } from "ph-utils/dom";
import { initAttr, parseAttrValue, stopSignal } from "../utils";
import type { RuleType } from "ph-utils/validator";
//@ts-ignore
import css from "./form_item.less?inline";
import type { SchemaType } from "ph-utils/validator";
import ContextProvide from "../utils/context_provide";
import { effect, signal } from "alien-signals";
import type { FormItemSignal } from "./types";


type FormItemState = {
  /** 标签文本 */
  label?: string;
  labelPosition?: "left" | "right" | "top";
  error?: string;
  required: boolean;
  /** 内置验证规则 */
  verify?: string;
  /** 正则表达式 */
  pattern?: string;
  /** 验证消息 */
  validity?: string;
}

export default class FormItem extends ContextProvide<FormItemSignal, FormItemState> {
  public static baseName = "form-item";

  public formErrors?: Signal<Record<string, string>>; // 表单验证错误
  private _errorSignalStop?: SignalStop

  constructor() {
    super();
    this.contextEventName = "form-item-context-request";
    this._state = {
      labelPosition: "right",
      required: false
    }
    this.context = signal({ innerBlock: false });
  }

  static get observedAttributes() {
    return ["error", "label", "required", "inner-block", "prop", "label-position", "verify", "pattern", "validity"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case 'error':
      case 'label':
      case 'verify':
      case 'pattern':
      case 'validity':
        this._state[name] = newValue;
        break;
      case 'label-position':
        this._state.labelPosition = newValue as "left";
        break;

      case "inner-block":
        const isBlock = parseAttrValue(newValue, false, name);
        this.context({ innerBlock: isBlock });
        break;
      case "required":
        const isRequired = parseAttrValue(newValue, false, name);
        this._state.required = isRequired;
        break;
      case "prop":
        this.context({ ...this.context(), prop: newValue });
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    /* 旧代码注释：
    // required
    this._updateRequired();

    // label
    this._updateLabel();

    // error
    this._updateError();
    */

    // 新的按条件更新逻辑:
    if (changedProps.has("required")) {
      this._updateRequired();
    }

    if (changedProps.has("label")) {
      this._updateLabel();
    }

    if (changedProps.has("error")) {
      this._updateError();
    }
  }


  connectedCallback(): void {
    this.loadStyleText([css]);
    super.connectedCallback();
    this._updateRequired();
    this._parseSchema();
    this.emitInject("form-context-request", ((_context: Signal<FormItemSignal>, errors: Signal<Record<string, string>>) => {
      this.formErrors = errors;
    }) as any);
    this._errorSignalStop = effect(() => {
      const name = this.context().prop;
      const errors = this.formErrors ? this.formErrors() : null;
      if (name && errors) {
        this._state.error = errors[name];
        this._updateError()
      }
    });
  }

  beforeDestroy(): void {
    stopSignal(this._errorSignalStop);
  }


  public setRules(rules: { required?: boolean; rules?: RuleType[]; message?: string }) {
    const prop = this.getAttr("prop");
    if (prop) {
      const schema = { ...rules, key: prop };
      this._updateRules(schema);
    }
  }

  public render() {
    this.classList.add(`l-form-item--${this._state.labelPosition}`);
    const fragment = document.createDocumentFragment();
    if (this._state.label != null) {
      fragment.appendChild(
        $$("label", {
          class: "l-form-item__label",
          textContent: this._state.label,
        }),
      );
    }
    const $content = $$("div", { class: "l-form-item__content" });
    const $slot = $$("slot");
    $content.appendChild($slot);
    if (this._state.error) {
      $content.appendChild($$("div", { class: "l-form-item__error", textContent: this._state.error }));
    }
    fragment.appendChild($content);
    return fragment;
  }

  private _updateRequired() {
    if (this._state.required) {
      addClass(this, "is-required");
    } else {
      removeClass(this, "is-required");
    }
  }

  private _parseSchema() {
    const prop = this.context().prop;
    if (prop) {
      let rules: any[] = [];
      const verify = this._state.verify;
      if (verify) {
        rules = verify.split("|");
      }
      const pattern = this._state.pattern;
      if (pattern) {
        rules.push(new RegExp(pattern));
      }
      const schema = {
        key: prop,
        required: this._state.required,
        message: this._state.validity,
        rules: rules,
      };
      this._updateRules(schema);
    }
  }


  private _updateError() {
    if (this._state.error) {
      addClass(this, "is-error");
    } else {
      removeClass(this, "is-error");
    }
    if (!this.rendered) return;
    let $error = $one(".l-form-item__error", this.root);
    if ($error) {
      if (this._state.error) {
        $error.textContent = this._state.error;
      } else {
        $error.remove();
      }
    } else {
      if (this._state.error) {
        $error = document.createElement("div");
        $error.className = "l-form-item__error";
        $error.textContent = this._state.error;
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
      if (this._state.label != null) {
        $label = document.createElement("div");
        $label.className = "l-form-item__label";
        $label.textContent = this._state.label;
        this.root.prepend($label);
      }
    } else {
      if (this._state.label != null) {
        $label.textContent = this._state.label;
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