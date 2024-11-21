import BaseComponent from "../base_component";
import { Transition } from "../transition";
import { regist } from "../util";

regist(Transition);

export default class Component extends BaseComponent {
  static tagName: string = "component";

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.render();
    const $t = this.shadow.querySelector("#text") as HTMLElement;
    setTimeout(() => {
      // const $s = this.shadow.querySelector("#s") as HTMLElement;
      // $s.style.color = "red";
      $t.remove();
    }, 1500);
  }
  render(): void {
    this.shadow.innerHTML =
      "<l-transition><div id='text'><span id='s'>Hello World</span></div></l-transition>";
  }
}
