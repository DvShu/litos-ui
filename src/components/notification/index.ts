import BaseComponent from "../base";
import { kebabToCamel, parseAttrValue, unitNumberStr, useId, regist } from "../utils";
import { $one, $$, on, off } from "utilane/browser";
import notificationSheet from "./style";
import InfoIcon from "../icon/info";
import SuccessIcon from "../icon/success";
import WarnIcon from "../icon/warn";
import CloseFilledIcon from "../icon/close_filled";
import CloseIcon from "../icon/close";
import {
  DEFAULT_GAP,
  DEFAULT_OFFSET,
  DEFAULT_ZINDEX,
  getGroupSize,
  getOldestNotification,
  layoutGroup,
  normalizePlacement,
  registerNotification,
  unregisterNotification,
} from "./placement";
import type { NotificationPlacement } from "./placement";

export type { NotificationPlacement };

/** 通知状态类型 */
export type NotificationType = "info" | "success" | "error" | "warning";

/** 命令式调用配置 */
export interface NotificationOptions {
  /** 自定义通知 id, 不传则自动生成 */
  id?: string;
  /** 标题 */
  title?: string;
  /** 消息内容, 支持 HTML 字符串 */
  message?: string;
  /** 状态类型, 默认: `info` */
  type?: NotificationType;
  /** 显示方位, 默认: `topRight` */
  placement?: NotificationPlacement;
  /** 自动关闭时间(毫秒), 设置为 `0` 时不自动关闭, 默认: `4500` */
  duration?: number;
  /** 是否显示关闭按钮, 默认: `true` */
  closable?: boolean;
  /** 是否显示状态图标, 默认: `true` */
  showIcon?: boolean;
  /** 通知宽度, 数字会自动转换为 `px` */
  width?: string | number;
  /** 距离视口边缘的距离(px), 默认: `16` */
  offset?: number;
  /** 层级, 默认: `2000` */
  zIndex?: number;
  /** 同一个方位最多同时显示的通知数量, `0` 表示不限制 */
  maxCount?: number;
  /** 行动点按钮文本, 用于给出用户下一步的操作 */
  action?: string;
  /** 自定义类名, 多个使用空格分隔 */
  customClass?: string;
  /** 关闭后的回调 */
  onClose?: (id: string) => void;
  /** 点击行动点的回调 */
  onAction?: (id: string) => void;
}

type NotificationState = {
  open: boolean;
  type: NotificationType;
  title: string;
  message: string;
  placement: NotificationPlacement;
  duration: number;
  closable: boolean;
  showIcon: boolean;
  width: string;
  offset: number;
  zIndex: number;
  maxCount: number;
  action: string;
  customClass: string;
};

/** 组件标签名 */
const TAG_NAME = "l-notification";

/** 默认自动关闭时间(毫秒) */
const DEFAULT_DURATION = 4500;

/** 状态类型与图标的映射 */
const ICON_MAP: Record<NotificationType, string> = {
  info: "info",
  success: "success",
  error: "close-filled",
  warning: "warn",
};

/** 图标是否已经注册 */
let iconRegistered = false;

/** 全局默认配置 */
let globalConfig: NotificationOptions = {};

/** 注册组件依赖的图标 */
function registIcons() {
  if (iconRegistered) return;
  iconRegistered = true;
  regist([InfoIcon, SuccessIcon, WarnIcon, CloseFilledIcon, CloseIcon]);
}

/**
 * 设置全局默认配置, 之后创建的通知都会使用该配置
 * @param option 配置项
 */
function configNotification(option: NotificationOptions) {
  globalConfig = { ...globalConfig, ...option };
}

/**
 * 创建一条通知
 * @param option 通知内容或配置项
 * @param type 状态类型, 会覆盖配置项中的 `type`
 * @returns 通知 id, 可以配合 `Notification.close` 手动关闭
 */
function showNotification(option: string | NotificationOptions, type?: NotificationType): string {
  // 保证组件与图标已经注册, 命令式使用时无需手动调用 regist
  regist(Notification);
  registIcons();
  const opts: NotificationOptions = {
    ...globalConfig,
    ...(typeof option === "string" ? { message: option } : option),
  };
  if (type) opts.type = type;
  const id = opts.id || useId();
  const placement = normalizePlacement(opts.placement);
  const $notification = document.createElement(TAG_NAME) as Notification;
  $notification.id = id;
  // 命令式创建的通知在关闭后直接从文档中移除
  $notification.removeOnClose = true;
  $notification.setAttribute("open", "");
  $notification.setAttribute("type", opts.type || "info");
  $notification.setAttribute("placement", placement);
  if (opts.title != null) $notification.setAttribute("title", opts.title);
  if (opts.message != null) $notification.setAttribute("message", opts.message);
  // 命令式调用默认 4.5s 后自动关闭, 传 0 表示不自动关闭
  $notification.setAttribute("duration", `${opts.duration ?? DEFAULT_DURATION}`);
  if (opts.closable === false) $notification.setAttribute("closable", "false");
  if (opts.showIcon === false) $notification.setAttribute("show-icon", "false");
  if (opts.width != null) $notification.setAttribute("width", `${opts.width}`);
  if (opts.offset != null) $notification.setAttribute("offset", `${opts.offset}`);
  if (opts.zIndex != null) $notification.setAttribute("z-index", `${opts.zIndex}`);
  if (opts.maxCount != null) $notification.setAttribute("max-count", `${opts.maxCount}`);
  if (opts.action) $notification.setAttribute("action", opts.action);
  if (opts.customClass) $notification.setAttribute("custom-class", opts.customClass);
  if (opts.onClose) on($notification, "close", () => opts.onClose?.(id));
  if (opts.onAction) on($notification, "action", () => opts.onAction?.(id));
  // 挂载到 body 上, 保证定位相对于视口
  document.body.appendChild($notification);
  return id;
}

/**
 * 关闭指定 id 的通知
 * @param id 通知 id
 */
function closeNotification(id: string) {
  const $notification = document.getElementById(id) as Notification | null;
  if ($notification && typeof $notification.close === "function") {
    $notification.close();
  }
}

/**
 * 关闭所有通知
 * @param placement 只关闭指定方位的通知, 不传递则关闭所有方位
 */
function closeAllNotification(placement?: NotificationPlacement) {
  const placements = placement ? [normalizePlacement(placement)] : undefined;
  const $list = document.querySelectorAll(TAG_NAME);
  for (const $item of Array.from($list)) {
    const $notification = $item as Notification;
    if (typeof $notification.close !== "function") continue;
    if (placements && !placements.includes($notification.placement)) continue;
    $notification.close();
  }
}

export default class Notification extends BaseComponent<NotificationState> {
  public static baseName = "notification";

  /* ------------------------------- 命令式 API ------------------------------- */

  /** 显示通知, 返回通知 id */
  static show = showNotification;
  /** 显示普通通知 */
  static info = (option: string | NotificationOptions) => showNotification(option, "info");
  /** 显示成功通知 */
  static success = (option: string | NotificationOptions) => showNotification(option, "success");
  /** 显示错误通知 */
  static error = (option: string | NotificationOptions) => showNotification(option, "error");
  /** 显示警告通知 */
  static warning = (option: string | NotificationOptions) => showNotification(option, "warning");
  /** 显示警告通知, `warning` 的别名 */
  static warn = (option: string | NotificationOptions) => showNotification(option, "warning");
  /** 关闭指定 id 的通知 */
  static close = closeNotification;
  /** 关闭所有通知 */
  static closeAll = closeAllNotification;
  /** 设置全局默认配置 */
  static config = configNotification;

  /** 关闭后是否从文档中移除, 命令式 API 创建的通知为 `true` */
  public removeOnClose = false;

  /** 当前是否显示 */
  private _visible = false;
  /** 自动关闭定时器 */
  private _timer?: number;
  /** 定时器开始时间 */
  private _startTime = 0;
  /** 剩余自动关闭时间 */
  private _remaining = 0;
  /** 已经应用到宿主节点上的自定义类名 */
  private _appliedClasses: string[] = [];
  /** 取消当前进行中的动画 */
  private _cancelAnimation?: () => void;
  /** 监听内容尺寸变化, 尺寸变化时重新排布 */
  private _resizeObserver?: ResizeObserver;

  private $icon?: HTMLElement;
  private $title?: HTMLElement;
  private $titleText?: HTMLElement;
  private $message?: HTMLElement;
  private $messageText?: HTMLElement;
  private $actionWrap?: HTMLElement;
  private $actionBtn?: HTMLElement;
  private $actionSlot?: HTMLSlotElement;
  private $closeBtn?: HTMLElement;

  constructor() {
    super();
    this.version = 2;
    this._state = {
      open: false,
      type: "info",
      title: "",
      message: "",
      placement: "topRight",
      // 组件式使用时默认不自动关闭, 由 open 属性控制
      duration: 0,
      closable: true,
      showIcon: true,
      width: "",
      offset: DEFAULT_OFFSET,
      zIndex: DEFAULT_ZINDEX,
      maxCount: 0,
      action: "",
      customClass: "",
    };
  }

  /** 距离视口边缘的距离(px) */
  public get notificationOffset(): number {
    return this._state.offset;
  }

  /** 与相邻通知的间距(px) */
  public get notificationGap(): number {
    const gap = parseFloat(getComputedStyle(this).getPropertyValue("--l-notification-gap"));
    return Number.isFinite(gap) ? gap : DEFAULT_GAP;
  }

  /** 当前显示方位 */
  public get placement(): NotificationPlacement {
    return this._state.placement;
  }

  public get open() {
    return this._state.open;
  }

  public set open(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.close();
    }
  }

  static get observedAttributes() {
    return [
      "open",
      "type",
      "title",
      "message",
      "placement",
      "duration",
      "closable",
      "show-icon",
      "width",
      "offset",
      "z-index",
      "max-count",
      "action",
      "custom-class",
    ];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "type":
        this._state.type = (newValue as NotificationType) || "info";
        break;
      case "title":
        this._state.title = newValue || "";
        break;
      case "message":
        this._state.message = newValue || "";
        break;
      case "action":
        this._state.action = newValue || "";
        break;
      case "custom-class":
        this._state.customClass = newValue || "";
        break;
      case "placement":
        this._state.placement = normalizePlacement(newValue);
        break;
      case "width":
        this._state.width = (unitNumberStr(newValue) as string) || "";
        break;
      case "duration":
      case "offset":
      case "z-index":
      case "max-count":
        this._state[kebabToCamel(name) as "duration"] = Number(newValue) || 0;
        break;
      case "open":
      case "closable":
      case "show-icon":
        this._state[kebabToCamel(name) as "open"] = parseAttrValue(newValue, false, name);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("type") || changedProps.has("show-icon")) {
      this._syncIcon();
    }
    if (changedProps.has("title") || changedProps.has("message")) {
      this._syncSections();
    }
    if (changedProps.has("action")) {
      this._syncActions();
    }
    if (changedProps.has("closable")) {
      this._syncClose();
    }
    if (changedProps.has("width")) {
      this._syncWidth();
    }
    if (changedProps.has("custom-class")) {
      this._syncCustomClass();
    }
    if (changedProps.has("offset") || changedProps.has("z-index")) {
      this._syncOffset();
    }
    if (changedProps.has("placement")) {
      this._updatePlacement();
    }
    if (changedProps.has("duration") && this._visible) {
      this._startTimer();
    }
    if (changedProps.has("open")) {
      this._toggleOpen();
    }
  }

  connectedCallback(): void {
    registIcons();
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // 从方位分组中移除, 其余通知会自动补位
    unregisterNotification(this);
    this._cancelPendingAnimation();
    this._unobserveSize();
    this._clearTimer();
    this._visible = false;
  }

  render_v2() {
    this._changedProperties.clear();
    return {
      styleSheets: [notificationSheet],
      template: this.render(),
    };
  }

  afterInit(): void {
    this._initRefs();
    this._bindEvents();
    this._syncAll();
    if (this._state.open) {
      if (this._visible) {
        // 重新连接时只需要重启定时器
        this._startTimer();
      } else {
        this._show();
      }
    } else {
      this._visible = false;
      this.setAttribute("hidden", "");
    }
  }

  beforeDestroy(): void {
    this._unbindEvents();
  }

  public render(): HTMLElement {
    const $root = $$("div", { class: "l-notification", part: "default" });
    // 状态图标
    $root.appendChild($$("div", { class: "l-notification-icon", part: "icon" }));
    // 内容区域: 通过属性渲染的内容与插槽内容二选一
    const $content = $$("div", { class: "l-notification-content" });
    $content.innerHTML = [
      '<div class="l-notification-title" part="title">',
      '<span class="l-notification-title-text"></span>',
      '<slot name="title"></slot>',
      "</div>",
      '<div class="l-notification-message" part="message">',
      '<span class="l-notification-message-text"></span>',
      "<slot></slot>",
      "</div>",
      '<div class="l-notification-actions" part="actions">',
      '<button type="button" class="l-notification-action" part="action"></button>',
      '<slot name="action"></slot>',
      "</div>",
    ].join("");
    $root.appendChild($content);
    // 关闭按钮
    $root.appendChild(
      $$("button", {
        class: "l-notification-close",
        part: "close",
        type: "button",
        "aria-label": "关闭",
        innerHTML: "<l-close-icon></l-close-icon>",
      }),
    );
    return $root;
  }

  /** 显示通知 */
  public show(): void {
    this._state.open = true;
    this._toggleOpen();
  }

  /** 关闭通知 */
  public close(): void {
    this._state.open = false;
    this._toggleOpen();
  }

  /* --------------------------------- 内部实现 -------------------------------- */

  private _initRefs(): void {
    const $root = this.root;
    this.$icon = $one(".l-notification-icon", $root) as HTMLElement;
    this.$title = $one(".l-notification-title", $root) as HTMLElement;
    this.$titleText = $one(".l-notification-title-text", $root) as HTMLElement;
    this.$message = $one(".l-notification-message", $root) as HTMLElement;
    this.$messageText = $one(".l-notification-message-text", $root) as HTMLElement;
    this.$actionWrap = $one(".l-notification-actions", $root) as HTMLElement;
    this.$actionBtn = $one(".l-notification-action", $root) as HTMLElement;
    this.$actionSlot = $one('slot[name="action"]', $root) as HTMLSlotElement;
    this.$closeBtn = $one(".l-notification-close", $root) as HTMLElement;
  }

  private _bindEvents(): void {
    on(this, "mouseenter", this._handleMouseEnter);
    on(this, "mouseleave", this._handleMouseLeave);
    if (this.$closeBtn) {
      on(this.$closeBtn, "click", this._handleCloseClick);
    }
    if (this.$actionBtn) {
      on(this.$actionBtn, "click", this._handleActionClick);
    }
    this.root.querySelectorAll("slot").forEach(($slot) => {
      on($slot, "slotchange", this._handleSlotChange);
    });
  }

  private _unbindEvents(): void {
    off(this, "mouseenter", this._handleMouseEnter);
    off(this, "mouseleave", this._handleMouseLeave);
    if (this.$closeBtn) {
      off(this.$closeBtn, "click", this._handleCloseClick);
    }
    if (this.$actionBtn) {
      off(this.$actionBtn, "click", this._handleActionClick);
    }
    this.root.querySelectorAll("slot").forEach(($slot) => {
      off($slot, "slotchange", this._handleSlotChange);
    });
  }

  private _syncAll(): void {
    this._syncIcon();
    this._syncSections();
    this._syncActions();
    this._syncClose();
    this._syncWidth();
    this._syncOffset();
    this._syncCustomClass();
  }

  /** 同步状态图标 */
  private _syncIcon(): void {
    const $icon = this.$icon;
    if (!$icon) return;
    const iconName = ICON_MAP[this._state.type] || ICON_MAP.info;
    if ($icon.dataset.icon !== iconName) {
      $icon.dataset.icon = iconName;
      $icon.innerHTML = `<l-${iconName}-icon></l-${iconName}-icon>`;
    }
    $icon.toggleAttribute("hidden", !this._state.showIcon);
  }

  /** 同步标题与内容 */
  private _syncSections(): void {
    this._syncSection(this.$title, this.$titleText, this._state.title, true);
    this._syncSection(this.$message, this.$messageText, this._state.message, false);
  }

  /**
   * 同步内容区域
   * @param $wrap 区域节点
   * @param $text 通过属性渲染的内容节点
   * @param value 属性值
   * @param asText 是否按照纯文本渲染, 否则按照 HTML 渲染
   */
  private _syncSection($wrap?: HTMLElement, $text?: HTMLElement, value = "", asText = false): void {
    if (!$wrap || !$text) return;
    if (asText) {
      $text.textContent = value;
    } else {
      $text.innerHTML = value;
    }
    const $slot = $wrap.querySelector("slot") as HTMLSlotElement | null;
    const hasSlot = this._hasSlotContent($slot);
    const hasValue = value !== "";
    // 存在自定义插槽内容时, 隐藏通过属性渲染的内容
    $text.toggleAttribute("hidden", hasSlot || !hasValue);
    $wrap.toggleAttribute("hidden", !(hasSlot || hasValue));
  }

  /** 同步行动点 */
  private _syncActions(): void {
    const $wrap = this.$actionWrap;
    const $btn = this.$actionBtn;
    if (!$wrap || !$btn) return;
    const action = this._state.action;
    $btn.textContent = action;
    const hasSlot = this._hasSlotContent(this.$actionSlot);
    $btn.toggleAttribute("hidden", hasSlot || action === "");
    $wrap.toggleAttribute("hidden", !(hasSlot || action !== ""));
  }

  /** 同步关闭按钮 */
  private _syncClose(): void {
    if (this.$closeBtn) {
      this.$closeBtn.toggleAttribute("hidden", !this._state.closable);
    }
  }

  /** 同步宽度 */
  private _syncWidth(): void {
    if (this._state.width) {
      this.style.setProperty("--l-notification-width", this._state.width);
    } else {
      this.style.removeProperty("--l-notification-width");
    }
  }

  /** 同步偏移与层级 */
  private _syncOffset(): void {
    this.style.setProperty("--l-notification-offset", `${this._state.offset}px`);
    this.style.setProperty("--l-notification-zindex", `${this._state.zIndex}`);
    if (this._visible) {
      layoutGroup(this._state.placement);
    }
  }

  /** 同步自定义类名 */
  private _syncCustomClass(): void {
    for (const className of this._appliedClasses) {
      this.classList.remove(className);
    }
    this._appliedClasses = this._state.customClass
      ? this._state.customClass.split(/\s+/).filter(Boolean)
      : [];
    for (const className of this._appliedClasses) {
      this.classList.add(className);
    }
  }

  /** 插槽中是否存在有效内容(忽略空白文本) */
  private _hasSlotContent($slot?: HTMLSlotElement | null): boolean {
    if (!$slot) return false;
    return $slot.assignedNodes().some((node) => {
      if (node.nodeType === 3) {
        return (node.textContent || "").trim() !== "";
      }
      return true;
    });
  }

  /** 方位变化时重新排布 */
  private _updatePlacement(): void {
    if (this._visible) {
      registerNotification(this, this._state.placement);
    }
  }

  private _toggleOpen(): void {
    if (!this.rendered) return;
    if (this._state.open) {
      this._show();
    } else {
      this._hide();
    }
  }

  private _show(): void {
    if (this._visible) return;
    this._visible = true;
    this.removeAttribute("hidden");
    // 注册到方位分组, 由分组统一计算位置, 保证同一个方位的通知不叠加
    registerNotification(this, this._state.placement);
    this._observeSize();
    this._enter();
    this._startTimer();
    this._enforceMaxCount();
  }

  private _hide(): void {
    if (!this._visible) return;
    this._visible = false;
    this._clearTimer();
    this._unobserveSize();
    // 先从分组中移除, 其余通知会自动补位
    unregisterNotification(this);
    this.emit("close", { detail: { id: this.id } });
    this._leave(() => {
      if (this.removeOnClose) {
        this.remove();
      } else {
        this.setAttribute("hidden", "");
      }
    });
  }

  /** 超出同一方位的最大数量时, 关闭最早的通知 */
  private _enforceMaxCount(): void {
    const maxCount = this._state.maxCount;
    if (maxCount <= 0) return;
    const placement = this._state.placement;
    while (getGroupSize(placement) > maxCount) {
      const $oldest = getOldestNotification(placement);
      if (!$oldest || $oldest === this) break;
      ($oldest as Notification).close();
    }
  }

  /* --------------------------------- 动画实现 -------------------------------- */

  /**
   * 入场动画
   *
   * 先应用起始状态(此时还没有过渡), 再开启过渡并移除起始状态,
   * 避免从已显示状态反向过渡。
   */
  private _enter(): void {
    this.classList.add("l-notification-enter");
    void this.offsetHeight;
    this.classList.add("l-notification-enter-active");
    this.classList.remove("l-notification-enter");
    this._onceTransitionEnd("opacity", () => {
      this.classList.remove("l-notification-enter-active");
    });
  }

  /** 离场动画 */
  private _leave(done: () => void): void {
    this.classList.add("l-notification-leave-active");
    void this.offsetHeight;
    this.classList.add("l-notification-leave");
    this._onceTransitionEnd("opacity", () => {
      this.classList.remove("l-notification-leave-active");
      this.classList.remove("l-notification-leave");
      done();
    });
  }

  /** 过渡时长(毫秒) */
  private _transitionDuration(): number {
    const value = getComputedStyle(this).transitionDuration || "";
    const first = value.split(",")[0].trim();
    const num = parseFloat(first);
    if (!num) return 300;
    return first.endsWith("ms") ? num : num * 1000;
  }

  /** 监听指定属性的过渡结束, 同时提供兜底处理 */
  private _onceTransitionEnd(propertyName: string, done: () => void): void {
    this._cancelPendingAnimation();
    let finished = false;
    let timer = 0;
    const handleTransitionEnd = (e: Event) => {
      const event = e as TransitionEvent;
      if (event.target === this && event.propertyName === propertyName) {
        finish();
      }
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      this.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(timer);
      this._cancelAnimation = undefined;
      done();
    };
    this._cancelAnimation = () => {
      finished = true;
      this.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(timer);
      this._cancelAnimation = undefined;
    };
    this.addEventListener("transitionend", handleTransitionEnd);
    // 属性值没有变化时不会触发 transitionend, 需要兜底
    timer = window.setTimeout(finish, this._transitionDuration() + 100);
  }

  private _cancelPendingAnimation(): void {
    const cancel = this._cancelAnimation;
    if (cancel) {
      this._cancelAnimation = undefined;
      cancel();
    }
  }

  /* -------------------------------- 尺寸监听 -------------------------------- */

  /** 内容尺寸变化时重新排布 */
  private _observeSize(): void {
    if (this._resizeObserver || typeof ResizeObserver === "undefined") return;
    this._resizeObserver = new ResizeObserver(() => {
      if (this._visible) {
        layoutGroup(this._state.placement);
      }
    });
    this._resizeObserver.observe(this);
  }

  private _unobserveSize(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }

  /* -------------------------------- 自动关闭定时器 ------------------------------- */

  private _startTimer(): void {
    this._clearTimer();
    const duration = this._state.duration;
    if (duration <= 0) return;
    this._remaining = duration;
    this._startTime = Date.now();
    this._timer = window.setTimeout(() => {
      this._timer = undefined;
      this.close();
    }, duration);
  }

  private _clearTimer(): void {
    if (this._timer != null) {
      clearTimeout(this._timer);
      this._timer = undefined;
    }
    this._remaining = 0;
  }

  /** 鼠标悬浮时暂停自动关闭 */
  private _pauseTimer(): void {
    if (this._timer == null) return;
    clearTimeout(this._timer);
    this._timer = undefined;
    this._remaining = Math.max(0, this._remaining - (Date.now() - this._startTime));
  }

  /** 鼠标移出时继续自动关闭 */
  private _resumeTimer(): void {
    if (this._timer != null || this._remaining <= 0) return;
    this._startTime = Date.now();
    this._timer = window.setTimeout(() => {
      this._timer = undefined;
      this.close();
    }, this._remaining);
  }

  /* ---------------------------------- 事件处理 --------------------------------- */

  private _handleMouseEnter = () => {
    this._pauseTimer();
  };

  private _handleMouseLeave = () => {
    this._resumeTimer();
  };

  private _handleCloseClick = (e: Event) => {
    e.stopPropagation();
    this.close();
  };

  private _handleActionClick = () => {
    this.emit("action", { detail: { id: this.id } });
  };

  private _handleSlotChange = () => {
    this._syncSections();
    this._syncActions();
  };
}