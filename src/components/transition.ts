import { initAttr } from ".";
import BaseComponent from "./base";
import { transition } from "ph-utils/dom";

export class Transition extends BaseComponent {
  static baseName: string = "transition";
  /** 应用过滤动画的属性值, 例如: opacity: 0; transform: xx; */
  sheetRec: [string, string, string][];
  public duration = "0.3s";

  static get observedAttributes() {
    return ["sheets"];
  }

  constructor() {
    super();
    initAttr(this);
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
    transition(target, this.sheetRec, "enter");
  }

  public hide(finish?: () => void) {
    const target = this._getSlotFirstChild();
    if (!target) return;
    transition(target, this.sheetRec, "leave", finish);
  }

  private _parseSheets(sheets: string) {
    const sheetsArr = sheets.split(";");
    const sheetsObj: [string, string, string][] = [];
    sheetsArr.forEach((sheet) => {
      if (sheet) {
        const [key, value] = sheet.split(":");
        sheetsObj.push([key.trim(), value.trim(), this.duration]);
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
