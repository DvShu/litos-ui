/**
 * 通知方位与布局管理
 *
 * 同一个方位上的通知不会相互叠加: 每个通知都是 `position: fixed`,
 * 由这里统一计算它们在所在方位上的位置, 新增/移除时重新排布,
 * 位置变化通过 CSS 过渡形成平滑的位移动画。
 *
 * 通知节点不会被移动到其他位置, 因此声明式使用时依然由使用方管理其生命周期。
 */

/** 通知显示方位 */
export type NotificationPlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export const PLACEMENTS: NotificationPlacement[] = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

/** 默认显示方位 */
export const DEFAULT_PLACEMENT: NotificationPlacement = "topRight";

/** 默认距离视口边缘的距离(px) */
export const DEFAULT_OFFSET = 16;

/** 默认层级 */
export const DEFAULT_ZINDEX = 2000;

/** 默认通知之间的间距(px) */
export const DEFAULT_GAP = 16;

/** 参与布局的通知需要提供的信息 */
export interface NotificationLayoutItem extends HTMLElement {
  /** 距离视口边缘的距离(px) */
  readonly notificationOffset: number;
  /** 与相邻通知的间距(px) */
  readonly notificationGap: number;
}

/** 每个方位上已经显示的通知, 索引 0 最靠近角落(最新创建) */
const groups = new Map<NotificationPlacement, NotificationLayoutItem[]>();

/** 是否为顶部方位 */
export function isTopPlacement(placement: string): boolean {
  return placement === "topLeft" || placement === "topRight";
}

/** 是否为左侧方位 */
export function isLeftPlacement(placement: string): boolean {
  return placement === "topLeft" || placement === "bottomLeft";
}

/** 规范化方位, 非法值回退为 `topRight` */
export function normalizePlacement(placement?: string | null): NotificationPlacement {
  return PLACEMENTS.includes(placement as NotificationPlacement)
    ? (placement as NotificationPlacement)
    : DEFAULT_PLACEMENT;
}

/** 查询通知所在的方位 */
export function findPlacement($el: HTMLElement): NotificationPlacement | undefined {
  for (const [placement, group] of groups) {
    if (group.includes($el as NotificationLayoutItem)) {
      return placement;
    }
  }
  return undefined;
}

/** 某个方位上正在显示的通知数量 */
export function getGroupSize(placement: NotificationPlacement): number {
  return groups.get(placement)?.length ?? 0;
}

/** 某个方位上最早创建的通知(最远离角落) */
export function getOldestNotification(
  placement: NotificationPlacement,
): NotificationLayoutItem | undefined {
  const group = groups.get(placement);
  return group && group.length > 0 ? group[group.length - 1] : undefined;
}

/**
 * 注册到方位分组并重新排布
 *
 * 最新创建的通知放在最靠近角落的位置, 已有的通知依次向后移动。
 */
export function registerNotification(
  $el: NotificationLayoutItem,
  placement: NotificationPlacement,
): void {
  unregisterNotification($el);
  let group = groups.get(placement);
  if (!group) {
    group = [];
    groups.set(placement, group);
  }
  group.unshift($el);
  layoutGroup(placement);
}

/** 从方位分组中移除并重新排布 */
export function unregisterNotification($el: NotificationLayoutItem): void {
  for (const [placement, group] of groups) {
    const index = group.indexOf($el);
    if (index > -1) {
      group.splice(index, 1);
      layoutGroup(placement);
      return;
    }
  }
}

/** 重新计算某个方位上所有通知的位置 */
export function layoutGroup(placement: NotificationPlacement): void {
  const group = groups.get(placement);
  if (!group) return;
  const isTop = isTopPlacement(placement);
  const positionName = isTop ? "top" : "bottom";
  const oppositeName = isTop ? "bottom" : "top";
  let distance = 0;
  for (const $el of group) {
    // 位置 = 自身偏移 + 前面所有通知占用的高度与间距
    $el.style.setProperty(positionName, `${$el.notificationOffset + distance}px`);
    $el.style.removeProperty(oppositeName);
    distance += $el.offsetHeight + $el.notificationGap;
  }
}
