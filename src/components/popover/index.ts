import BaseComponent from "../base";
import { initAttr } from "../utils";
import { $$, $one, on, off } from "ph-utils/dom";

type PlacementProp =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";
type TriggerProp = "hover" | "click" | "focus" | "manual";

export default class Popover extends BaseComponent {
  public static baseName = "popover";
  public inline = false;
  public placement: PlacementProp = "bottom";
  public contentClass?: string;
  public content?: string;
  public showArrow = true;
  public show = false;
  public trigger: TriggerProp = "hover";
  public disabled = false;
  public isShow = false;
  constructor() {
    super();
    initAttr(this);
    this.style.display = this.inline ? "inline-block" : "block";
    this.isShow = this.show;
  }
  connectedCallback(): void {
    this.loadStyle(["popover"]);
    super.connectedCallback();
    this.renderContent();
    this.#initEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeEvents();
  }
  render() {
    // trigger
    const $trigger = document.createElement("slot");
    $trigger.setAttribute("name", "trigger");
    return $trigger;
  }

  renderContent() {
    if (!this.isShow) return;
    // content
    const $content = $$("div", {
      class: [
        "l-popover--content",
        `l-popover-${this.placement}`,
        this.contentClass,
      ],
    });
    $content.innerHTML = this.content ? this.content : "<slot></slot>";
    if (this.showArrow) {
      const $arrow = $$("div", {
        class: "l-popover--arrow",
      });
      $content.appendChild($arrow);
    }
    this.root.appendChild($content);
  }

  #initEvents() {
    if (this.trigger === "hover" || this.trigger === "click") {
      const $trigger = $one('[slot="trigger"]', this);
      if ($trigger) {
        if (this.trigger === "hover") {
          on($trigger, "mouseenter", this.#handleMouseEnter);
          on($trigger, "mouseleave", this.#hanldeMouseLeave);
        } else {
          on($trigger, "click", this.#handleClick);
        }
      }
    }
  }

  #removeEvents() {}

  #handleMouseEnter = (e: Event) => {
    this.#showFn(e.target as HTMLElement);
  };

  #hanldeMouseLeave = () => {};

  #handleClick = () => {};

  #showFn($referece: HTMLElement) {}
}
