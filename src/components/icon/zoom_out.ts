import BaseIcon from "./base";

export default class ZoomOut extends BaseIcon {
  public static baseName = "zoom-out-icon";

  connectedCallback() {
    super.connectedCallback();
  }

  renderChildren() {
    return '<path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64"></path>';
  }
}
