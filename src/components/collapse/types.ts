export type CollapseContext = Signal<{
  arrowPlacement: "left" | "right";
  headerJustify: "flex-start" | "flex-end" | "space-between";
  /** 是否带有背景边框 */
  background: boolean;
  gap?: string;
}>;