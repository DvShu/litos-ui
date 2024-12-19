import { formatClass, on, off, $one, toggleClass } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { initAttr, parseAttrValue } from "../util";

type ActionRenderFn = (cfg: { checked: boolean }) => string | HTMLElement;

export default class Switch extends FormInner {
  public static baseName = "switch";

  public actionRender?: ActionRenderFn;
  public checkedText?: string;
  public uncheckedText?: string;

  private _changeEmit: CustomEvent;
  private _$root?: HTMLElement;

  constructor() {
    super(false);
    initAttr(this);
    const oriValue = this.value
      ? parseAttrValue(this.value, false, "value")
      : false;
    this._resetValue = oriValue;
    this.value = oriValue;
    this._changeEmit = new CustomEvent("change");
  }
  connectedCallback(): void {
    this.loadStyle(["switch"]);
    super.connectedCallback();
    this.pushValueChange();
    this._$root = $one(".l-switch", this.root);
    this._renderAction();
    on(this._$root as HTMLElement, "click", this._handleClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._$root) {
      off(this._$root, "click", this._handleClick);
    }
    this.actionRender = undefined;
  }

  render() {
    const $root = document.createElement("div");
    $root.className = formatClass({
      "l-switch": true,
      "l-switch--disabled": this.isDisabled(),
      "l-switch--checked": this.value,
    });
    const $children = ['<div class="l-switch-action"></div>'];
    if (this.checkedText || this.uncheckedText) {
      const text = this.value
        ? this.checkedText || ""
        : this.uncheckedText || "";
      $children.push(`<span class="l-switch-text">${text}</span>`);
    }
    $root.setAttribute("part", "default");
    $root.innerHTML = $children.join("");
    return $root;
  }

  private _handleClick = (e: Event) => {
    if (this.isDisabled()) return;
    this.setValue(!this.value);
    this.dispatchEvent(this._changeEmit);
  };

  public setValue(value: boolean) {
    super.setValue(value);
    if (this._$root) {
      toggleClass(this._$root, "l-switch--checked");
      const $text = $one(".l-switch-text", this._$root);
      if ($text) {
        $text.textContent = this.value
          ? this.checkedText || ""
          : this.uncheckedText || "";
      }
      this._renderAction();
    }
  }

  public setActionRender(render: ActionRenderFn) {
    this.actionRender = render;
    this._renderAction();
  }

  private _renderAction() {
    if (!this._$root) return;
    const $action = $one(".l-switch-action", this._$root) as HTMLElement;
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
