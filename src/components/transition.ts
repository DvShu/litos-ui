import BaseComponent from "./base_component";

export class Transition extends BaseComponent {
  static tagName: string = "transition";
  observer: MutationObserver;
  constructor() {
    super();
    this.observer = new MutationObserver((mutationsList) => {
      console.log("m");
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
          console.log(`属性变化: ${mutation.attributeName}`);
          console.log(mutation.target); // 变化的 DOM 元素
        }
      }
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    const slot = this.shadow.querySelector("slot");
    if (slot != null) {
      slot.addEventListener("slotchange", () => {
        if (slot.assignedNodes().length > 0) {
          this.observer.observe(slot.assignedNodes()[0], {
            attributes: true,
          });
        } else {
          this.observer.disconnect();
        }
      });
    }
  }

  render() {
    this.shadow.innerHTML = "<slot></slot>";
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
    this.observer = null as any;
  }
}
