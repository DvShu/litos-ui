import BaseComponent from "./base";
import { startTransition, endTransition } from "ph-utils/dom";

export class Transition extends BaseComponent {
  static tagName: string = "transition";
  /** 应用过滤动画的属性值, 例如: opacity: 0; transform: xx; */
  sheetRec: [string, string][];

  static get observedAttributes() {
    return ["sheets"];
  }

  constructor() {
    super();
    this.sheetRec = this._parseSheets(this.getAttr("sheets", "opacity: 0"));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.show();
  }

  render() {
    this.shadow.innerHTML = `<slot></slot>`;
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "sheets") {
      this.sheetRec = this._parseSheets(newValue);
    }
  }

  private show() {
    const target = this._getSlotFirstChild();
    if (!target) return;
    const duration = this.getAttr("duration", "0.3s");
    startTransition(target, this.sheetRec, duration);
  }

  public hide(finish?: () => void) {
    const target = this._getSlotFirstChild();
    if (!target) return;
    endTransition(target, this.sheetRec, finish);
  }

  private _parseSheets(sheets: string) {
    const sheetsArr = sheets.split(";");
    const sheetsObj: [string, string][] = [];
    sheetsArr.forEach((sheet) => {
      if (sheet) {
        const [key, value] = sheet.split(":");
        sheetsObj.push([key.trim(), value.trim()]);
      }
    });
    return sheetsObj;
  }

  private _getSlotFirstChild() {
    const slot = this.shadow.querySelector("slot");
    if (slot != null && slot.assignedNodes().length > 0) {
      return slot.assignedNodes()[0] as HTMLElement;
    }
    return null;
  }
}
