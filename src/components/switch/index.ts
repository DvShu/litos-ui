import { on, off, $one, addClass, removeClass } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { initAttr, parseAttrValue } from "../utils";

type ActionRenderFn = (cfg: { checked: boolean }) => string | HTMLElement;

export default class Switch extends FormInner {
  public static baseName = "switch";

  public actionRender?: ActionRenderFn;
  public checkedText?: string;
  public uncheckedText?: string;

  constructor() {
    super(false);
    initAttr(this);
    const oriValue = this.value
      ? parseAttrValue(this.value, false, "value")
      : false;
    this._resetValue = oriValue;
    this.value = oriValue;
  }
  connectedCallback(): void {
    this.loadStyle(["switch"]);
    super.connectedCallback();
    this.pushValueChange();
    this.#renderAction();
    on(this, "click", this.#click);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    off(this, "click", this.#click);
    this.actionRender = undefined;
  }

  render() {
    if (this.isDisabled()) {
      this.classList.add("l-switch--disabled");
    }
    if (this.value) {
      this.classList.add("l-switch--checked");
    }
    const $children = ['<div class="l-switch-action" part="action"></div>'];
    if (this.checkedText || this.uncheckedText) {
      const text = this.value
        ? this.checkedText || ""
        : this.uncheckedText || "";
      $children.push(`<span class="l-switch-text">${text}</span>`);
    }
    return $children.join("");
  }

  #click = (e: Event) => {
    if (this.isDisabled()) return;
    this.setValue(!this.value);
    this.dispatchEvent(new CustomEvent("change"));
  };

  public setValue(value: boolean) {
    super.setValue(value);
    if (value) {
      addClass(this, "l-switch--checked");
    } else {
      removeClass(this, "l-switch--checked");
    }
    const $text = $one(".l-switch-text", this.root);
    if ($text) {
      $text.textContent = this.value
        ? this.checkedText || ""
        : this.uncheckedText || "";
    }
    this.#renderAction();
  }

  public setActionRender(render: ActionRenderFn) {
    this.actionRender = render;
    this.#renderAction();
  }

  #renderAction() {
    const $action = $one(".l-switch-action", this.root) as HTMLElement;
    if (!$action) return;
    if (this.actionRender) {
      const rendered = this.actionRender({ checked: this.value });
      if (typeof rendered === "string") {
        $action.innerHTML = rendered;
      } else {
        $action.innerHTML = rendered.outerHTML;
      }
    } else {
      const $checkedSlot = $one('[slot="checked-action"]', this);
      const $uncheckedSlot = $one('[slot="unchecked-action"]', this);
      if (this.value && $checkedSlot) {
        $action.innerHTML = '<slot name="checked-action"></slot>';
      } else if (!this.value && $uncheckedSlot) {
        $action.innerHTML = '<slot name="unchecked-action"></slot>';
      }
    }
  }
}
