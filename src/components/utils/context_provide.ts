import BaseComponent from "../base";
import { on, off } from 'ph-utils/dom'

export default class ContextProvide<T> extends BaseComponent {

  public context!: Signal<T>;
  public contextEventName: string;

  constructor() {
    super();
    this.contextEventName = 'context-request';
  }

  connectedCallback(): void {
    super.connectedCallback();
    on(this, this.contextEventName, this.contextProvideHandler)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    off(this, this.contextEventName, this.contextProvideHandler)
  }

  private contextProvideHandler(e: CustomEvent) {
    const { context, callback } = e.detail;
    if (context === this.contextEventName) {
      callback(this.context);
    }
  }
}