import type Notification from "./index";
import type { NotificationOptions, NotificationType, NotificationPlacement } from "./index";
import { useId } from "../utils";
import { on } from "utilane/browser";
import { normalizePlacement } from "./placement";

export type { NotificationOptions, NotificationType, NotificationPlacement } from "./index";

const TAG_NAME = "l-notification";
const DEFAULT_DURATION = 4500;

/** 全局默认配置 */
let globalConfig: NotificationOptions = {};

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
 * @returns 通知 id, 可以配合 `NotificationBox.close` 手动关闭
 */
function showNotification(option: string | NotificationOptions, type?: NotificationType): string {
  if (!customElements.get(TAG_NAME)) {
    throw new Error("Register Notification before calling NotificationBox methods.");
  }
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

function info(option: string | NotificationOptions) {
  return showNotification(option, "info");
}
function success(option: string | NotificationOptions) {
  return showNotification(option, "success");
}
function error(option: string | NotificationOptions) {
  return showNotification(option, "error");
}
function warning(option: string | NotificationOptions) {
  return showNotification(option, "warning");
}

export default {
  show: showNotification,
  info,
  success,
  error,
  warning,
  warn: warning,
  close: closeNotification,
  closeAll: closeAllNotification,
  config: configNotification,
};