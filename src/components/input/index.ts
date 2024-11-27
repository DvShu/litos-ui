import BaseComponent from "../base";
import { initAttr } from "../util";

export default class Input extends BaseComponent {
  public static tagName: string = "input";
  public a: number = 0;
  private _b: number = 0;

  constructor() {
    super();
    initAttr(this);

    console.log(this.a);
  }

  connectedCallback(): void {
    this.loadStyle(["input"]);
    super.connectedCallback();
  }

  render() {}
}
