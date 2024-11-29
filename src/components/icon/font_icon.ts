import BaseIcon from "./base";

export default class FontIcon extends BaseIcon {
  public static baseName = "font-icon";

  private _t: number | undefined;
  private _start: number;
  public constructor() {
    super();
    this.useLink = true;
    this._t = undefined;
    this._start = 0;
  }

  renderChildren() {
    return "";
  }

  render() {
    super.render();
  }

  disconnectedCallback(): void {
    if (this._t != null) {
      cancelAnimationFrame(this._t);
      this._t = undefined;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    const name = this.getAttribute("name");
    this._start = Date.now();
    if (name) {
      this._loadIcon(name);
    }
  }

  _loadIcon(name: string) {
    const _curr = Date.now();
    if (_curr - this._start >= 10000) return;
    this._t = requestAnimationFrame(() => {
      const $symbol = document.querySelector(`#${name}`);
      if ($symbol == null) {
        this._loadIcon(name);
        return;
      }
      this._t = undefined;
      let viewBox = $symbol.getAttribute("viewBox");
      if (!viewBox) {
        viewBox = "0 0 1024 1024";
      }
      const $svg = this.shadow.querySelector("svg");
      if ($svg != null) {
        $svg.setAttribute("viewBox", viewBox);
        $svg.innerHTML = $symbol.innerHTML;
      }
    });
  }
}
