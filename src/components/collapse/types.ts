export type CollapseAccessor<T> = {
  (): T;
  (value: T): void;
};

export type CollapseExpandChange = { prop: string; expand: boolean };
export type SetCollapseItemExpand = (detail: CollapseExpandChange, notify?: boolean) => void;
export type CollapseItemBinding = {
  getProp: () => string;
  applyExpand: (expand: boolean) => void;
};
export type RegisterCollapseItem = (item: CollapseItemBinding) => () => void;

export type CollapseLayout = {
  arrowPlacement: "left" | "right";
  headerJustify: "flex-start" | "flex-end" | "space-between";
  /** 是否带有背景边框 */
  background: boolean;
  gap?: string;
};

export type CollapseContext = CollapseAccessor<CollapseLayout>;