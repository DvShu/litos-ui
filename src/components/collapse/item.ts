import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
//@ts-ignore
import css from "./item.less?inline";
import { $$, on, off } from "utilane/browser";
import type {
  CollapseAccessor,
  CollapseContext,
  CollapseExpandChange,
  RegisterCollapseItem,
  SetCollapseItemExpand,
} from "./types";

const interactiveHeaderSelector = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "label",
  "summary",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  "[tabindex]",
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
].join(",");
const ignoredCaptionSelector = `${interactiveHeaderSelector},[hidden],[aria-hidden="true"],script,style,template`;
const panelId = "collapse-panel";
const toggleId = "collapse-toggle";
const expandDuration = 150;

function getHeaderCaption(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (!(node instanceof Element) || node.matches(ignoredCaptionSelector)) return "";
  return Array.from(node.childNodes, getHeaderCaption).join("");
}

type CollapaseItemState = {
  prop: string;
  headerText: string;
  expand: boolean;
};

export default class CollapaseItem extends BaseComponent<CollapaseItemState> {
  public static baseName = "collapse-item";
  private $header?: HTMLDivElement;
  private $toggle?: HTMLButtonElement;
  private $titleSlot?: HTMLSlotElement;
  private _captionObserver?: MutationObserver;
  public context?: CollapseContext;
  private _pendingExpand?: boolean;
  private _pendingGroup?: Element;
  private _setGroupExpand?: SetCollapseItemExpand;
  private _unregisterGroupItem?: () => void;
  private _visualExpanded = false;
  private _expandFrame?: number;
  private _expandAnimation?: Animation;
  private _stopWatchingExpansion?: () => void;
  public expands?: CollapseAccessor<string[]>;

  public constructor() {
    super();
    this.version = 2;
    this._state = {
      prop: "",
      headerText: "",
      expand: false,
    };
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("header-text")) this._updateHeaderText();
    if (changedProps.has("toggle-label")) this._updateToggleLabel();
    if (changedProps.has("heading-level")) {
      this.$toggle?.parentElement?.setAttribute("aria-level", this._headingLevel());
    }
  }

  _setStyleAndClass() {
    if (this._state.expand) {
      this.classList.add("l-collapse-expand");
    } else {
      this.classList.remove("l-collapse-expand");
    }
    this.$toggle?.setAttribute("aria-expanded", String(this._state.expand));
  }

  static get observedAttributes() {
    return ["prop", "header-text", "expand", "heading-level", "toggle-label"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string | null): void {
    switch (name) {
      case "prop":
        this._state.prop = newValue ?? "";
        break;
      case "header-text":
        this._state.headerText = newValue ?? "";
        break;

      case "expand":
        const expand = parseAttrValue(newValue, false, "expand");
        if (this.rendered) this._applyAttributeExpand(expand);
        if (!this.rendered || this._pendingGroup) this._pendingExpand = expand;
        break;
    }
  }

  render_v2() {
    const fragment = document.createDocumentFragment();
    const $header = $$("div", {
      class: "l-collapse-item__header",
      part: "header",
    });
    const $heading = $$("div", {
      class: "l-collapse-item__heading",
      role: "heading",
      "aria-level": this._headingLevel(),
    });
    const $toggle = $$("button", {
      class: "l-collapse-item__toggle",
      id: toggleId,
      type: "button",
      "aria-expanded": String(this._state.expand),
      "aria-controls": panelId,
    });
    $toggle.append(
      $$("l-arrow-right-icon", { class: "l-collapse-arrow-icon", "aria-hidden": "true" }),
    );
    $heading.append($toggle);
    $header.append($heading);
    const text = this._state.headerText;
    if (text) {
      $toggle.append(this._createHeaderText(text));
    } else {
      $header.append($$("slot", { name: "header-text" }));
    }
    const $panel = this._createContentElement(!this._state.expand);
    $panel.id = panelId;
    $panel.inert = !this._state.expand;
    $panel.setAttribute("role", "group");
    $panel.setAttribute("aria-labelledby", toggleId);
    fragment.append($header, $panel);
    return {
      template: fragment,
      style: css,
    };
  }

  private _headingLevel() {
    const level = this.getAttribute("heading-level") ?? "";
    return /^[1-6]$/.test(level) ? level : "3";
  }

  private _createHeaderText(text: string) {
    return $$("span", { part: "header-text", textContent: text });
  }

  private _updateHeaderText() {
    if (!this.$header || !this.$toggle) return;
    const title = this.$toggle.querySelector('[part="header-text"]');
    const text = this._state.headerText;
    if (text) {
      if (title) title.textContent = text;
      else this.$toggle.append(this._createHeaderText(text));
      if (this.$titleSlot) {
        this.$titleSlot.remove();
        this._setTitleSlot();
      } else this._updateToggleLabel();
    } else if (!this.$titleSlot) {
      title?.remove();
      const slot = $$("slot", { name: "header-text" }) as HTMLSlotElement;
      this.$header.append(slot);
      this._setTitleSlot(slot);
    }
  }

  private _setTitleSlot(slot?: HTMLSlotElement) {
    this.$titleSlot?.removeEventListener("slotchange", this._observeTitleCaption);
    this.$titleSlot = slot;
    slot?.addEventListener("slotchange", this._observeTitleCaption);
    this._observeTitleCaption();
  }

  private _observeTitleCaption = () => {
    this._captionObserver?.disconnect();
    for (const element of this.$titleSlot?.assignedElements() ?? []) {
      this._captionObserver ??= new MutationObserver(this._updateToggleLabel);
      this._captionObserver.observe(element, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: [
          "hidden",
          "aria-hidden",
          "href",
          "controls",
          "contenteditable",
          "tabindex",
          "role",
        ],
      });
    }
    this._updateToggleLabel();
  };

  private _updateToggleLabel = () => {
    if (!this.$toggle) return;
    const label = this.getAttribute("toggle-label")?.trim();
    if (label) {
      this.$toggle.setAttribute("aria-label", label);
    } else if (this._state.headerText.trim()) {
      this.$toggle.removeAttribute("aria-label");
    } else {
      const caption = this.$titleSlot?.assignedElements().map(getHeaderCaption).join(" ").trim();
      this.$toggle.setAttribute("aria-label", caption || "Toggle panel");
    }
  };

  afterInit(): void {
    this._visualExpanded = this._state.expand;
    this.$header = this.root.querySelector<HTMLDivElement>(".l-collapse-item__header") ?? undefined;
    this.$toggle = this.$header?.querySelector("button") ?? undefined;
    this._setTitleSlot(this.$header?.querySelector("slot") ?? undefined);
    this._setStyleAndClass();
    // An initial expand="false" still allows the parent's prop to select this item.
    if (this._pendingExpand === false && !this._state.expand) this._pendingExpand = undefined;
    if (!this._connectGroup()) {
      // The item entry can upgrade first when markup is already in the document.
      this._pendingGroup = this.closest("l-collapse") ?? undefined;
      this._pendingGroup?.addEventListener("collapse-context-ready", this._handleGroupReady, {
        once: true,
      });
      if (this._pendingExpand !== undefined) this._applyExpand(this._pendingExpand);
      if (!this._pendingGroup) this._pendingExpand = undefined;
    }
    if (this.$header) {
      on(this.$header, "click", this._handleHeaderTap);
    }
  }

  private _connectGroup() {
    this.emitInject("collapse-context-request", this._receiveGroupContext as any);
    if (!this.context) return false;
    const pendingExpand = this._pendingExpand;
    this._pendingExpand = undefined;
    if (pendingExpand !== undefined) this._applyAttributeExpand(pendingExpand);
    if (!this._unregisterGroupItem) this._updateLayout();
    this._handleExpandsChange();
    return true;
  }

  private _receiveGroupContext = (
    context: CollapseContext,
    expands: CollapseAccessor<string[]>,
    setGroupExpand?: SetCollapseItemExpand,
    registerItem?: RegisterCollapseItem,
  ) => {
    this.contextInject(context, expands, setGroupExpand);
    this._unregisterGroupItem?.();
    this._unregisterGroupItem = registerItem?.({
      getProp: () => this._state.prop,
      applyExpand: (expand) => this._applyExpand(expand),
    });
  };

  private _handleGroupReady = () => {
    this._pendingGroup = undefined;
    this._connectGroup();
  };

  beforeDestroy(): void {
    if (this._expandFrame !== undefined) {
      cancelAnimationFrame(this._expandFrame);
      this._expandFrame = undefined;
    }
    this._cancelExpandAnimation();
    this._pendingGroup?.removeEventListener("collapse-context-ready", this._handleGroupReady);
    this._pendingGroup = undefined;
    this._pendingExpand = undefined;
    this._unregisterGroupItem?.();
    this._unregisterGroupItem = undefined;
    if (this.context) this.classList.remove("background", "space");
    this.context = undefined;
    this.expands = undefined;
    this._setGroupExpand = undefined;
    if (this.$header) {
      off(this.$header, "click", this._handleHeaderTap);
    }
    this.$header = undefined;
    this.$toggle = undefined;
    this._setTitleSlot();
  }

  _handleExpandsChange = () => {
    if (!this.expands) return;
    this._applyExpand(this.expands().includes(this._state.prop));
  };

  _handleHeaderTap = (event?: Event) => {
    if (event?.defaultPrevented) return;
    for (const target of event?.composedPath() ?? []) {
      if (target === this.$header || target === this.$toggle) break;
      if (target instanceof Element && target.matches(interactiveHeaderSelector)) return;
    }
    const detail = { prop: this._state.prop, expand: !this._state.expand };
    this._applyExpand(detail.expand);
    if (this._pendingGroup) this._pendingExpand = detail.expand;
    this._setGroupExpand?.(detail, true);
    this._emitChange(detail);
  };

  private _applyExpand(expand: boolean) {
    if (expand === this._state.expand) return;
    this._state.expand = expand;
    this._handleExpand();
  }

  private _applyAttributeExpand(expand: boolean) {
    this._applyExpand(expand);
    this._setGroupExpand?.({ prop: this._state.prop, expand });
  }

  _updateLayout = () => {
    if (!this.context) return;
    const contextValue = this.context();
    if (this.$header) {
      if (contextValue.arrowPlacement === "right") {
        this.$header.classList.add("arrow-right");
      } else {
        this.$header.classList.remove("arrow-right");
      }
      if (contextValue.headerJustify === "space-between") {
        this.$header.classList.add("space-between");
      } else {
        this.$header.classList.remove("space-between");
      }
    }
    if (contextValue.background) {
      this.classList.add("background");
    } else {
      this.classList.remove("background");
    }
    if (contextValue.gap) {
      this.classList.add("space");
    } else {
      this.classList.remove("space");
    }
  };

  public contextInject = (
    ctx: CollapseContext,
    exds: CollapseAccessor<string[]>,
    setGroupExpand?: SetCollapseItemExpand,
  ) => {
    this.context = ctx;
    this.expands = exds;
    this._setGroupExpand = setGroupExpand;
  };

  _handleExpand() {
    if (!this.rendered) return;
    this._setStyleAndClass();
    const panel = this.root.getElementById(panelId);
    if (!panel) return;
    if (!this._state.expand && panel.matches(":focus-within")) {
      this.$toggle?.focus({ preventScroll: true });
    }
    panel.inert = !this._state.expand;
    if (!this.rendered) return;
    if (this._expandFrame !== undefined || this._visualExpanded === this._state.expand) return;
    this._expandFrame = requestAnimationFrame(() => {
      this._expandFrame = undefined;
      this._commitExpansion();
    });
  }

  private _commitExpansion() {
    const panel = this.root.getElementById(panelId);
    if (!this.rendered || !panel) return;
    const expand = this._state.expand;
    if (expand === this._visualExpanded) {
      // The logical state can change twice after a native finish event but before this frame.
      if (this._expandAnimation?.playState === "finished") this._settleExpansion(panel, expand);
      return;
    }
    this._visualExpanded = expand;
    const motion = this.ownerDocument.defaultView?.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion?.matches || typeof panel.animate !== "function") {
      this._settleExpansion(panel, expand);
      return;
    }

    // Read the current height before canceling an interrupted animation.
    const fromHeight =
      panel.style.display === "none" ? 0 : parseFloat(getComputedStyle(panel).height) || 0;
    this._cancelExpandAnimation();
    if (expand) panel.style.display = "block";
    const toHeight = expand ? this._expandedHeight(panel) : 0;
    if (fromHeight === toHeight) {
      this._settleExpansion(panel, expand);
      return;
    }

    this._playHeightAnimation(panel, expand, fromHeight, toHeight, expandDuration);
    this._watchExpansion(panel, expand, motion, toHeight);
  }

  private _expandedHeight(panel: HTMLElement) {
    const box = panel.firstElementChild;
    if (!box) return 0;
    const style = getComputedStyle(panel);
    const height = parseFloat(getComputedStyle(box).height);
    return Number.isFinite(height)
      ? height + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
      : 0;
  }

  private _playHeightAnimation(
    panel: HTMLElement,
    expand: boolean,
    fromHeight: number,
    toHeight: number,
    duration: number,
  ) {
    this._cancelHeightAnimation();
    const animation = panel.animate([{ height: `${fromHeight}px` }, { height: `${toHeight}px` }], {
      duration,
      fill: "both",
    });
    this._expandAnimation = animation;
    animation.onfinish = () => {
      if (this._expandAnimation !== animation || this._state.expand !== expand) return;
      this._settleExpansion(panel, expand);
    };
  }

  private _watchExpansion(
    panel: HTMLElement,
    expand: boolean,
    motion: MediaQueryList | undefined,
    targetHeight: number,
  ) {
    let resize: ResizeObserver | undefined;
    const stop = () => {
      resize?.disconnect();
      motion?.removeEventListener("change", onMotionChange);
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches && this._stopWatchingExpansion === stop) {
        this._settleExpansion(panel, this._state.expand);
      }
    };
    this._stopWatchingExpansion = stop;
    motion?.addEventListener("change", onMotionChange);

    const box = panel.firstElementChild;
    if (!expand || !box || typeof ResizeObserver === "undefined") return;
    resize = new ResizeObserver(() => {
      const animation = this._expandAnimation;
      if (!animation || this._stopWatchingExpansion !== stop || !this._state.expand) return;
      const remaining =
        Number(animation.effect?.getComputedTiming().endTime ?? 0) - Number(animation.currentTime);
      if (remaining <= 0) return;
      const nextHeight = this._expandedHeight(panel);
      if (Math.abs(nextHeight - targetHeight) < 0.5) return;

      // Retarget within the original duration, starting from the height the user can see now.
      const currentHeight = parseFloat(getComputedStyle(panel).height) || 0;
      targetHeight = nextHeight;
      this._playHeightAnimation(panel, true, currentHeight, nextHeight, remaining);
    });
    resize.observe(box, { box: "border-box" });
  }

  private _settleExpansion(panel: HTMLElement, expand: boolean) {
    this._cancelExpandAnimation();
    this._visualExpanded = expand;
    panel.style.display = expand ? "block" : "none";
  }

  private _cancelExpandAnimation() {
    this._stopWatchingExpansion?.();
    this._stopWatchingExpansion = undefined;
    this._cancelHeightAnimation();
  }

  private _cancelHeightAnimation() {
    const animation = this._expandAnimation;
    if (!animation) return;
    this._expandAnimation = undefined;
    animation.onfinish = null;
    animation.cancel();
  }

  _emitChange = (
    detail: CollapseExpandChange = { prop: this._state.prop, expand: this._state.expand },
  ) => {
    this.emit("expand-change", { detail });
  };

  _createContentElement(hide = true) {
    const $content = $$(
      "div",
      {
        class: "l-collapse-content",
        style: hide ? "display: none;" : "",
      },
      [
        $$("div", {
          class: "l-collapse-content-box",
          innerHTML: "<slot></slot>",
        }),
      ],
    );
    return $content;
  }
}