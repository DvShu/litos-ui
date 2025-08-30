export interface Column {
  /**  列的唯一标识 */
  id?: string;
  /** 列的标题 */
  title?: string;
  /** 列标识, 列排序必传 */
  key?: string;
  /** 列宽度, 固定列时，需要传 */
  width?: number | string;
  /** 是否固定列, left - 固定在左方, right - 固定右方 */
  fixed?: "left" | "right";
  /** 列固定左时, 左边偏移量 */
  left?: number;
  /** 列固定右时, 右边偏移量 */
  right?: number;
  /** 多级表头 */
  children?: Column[];
  /** 表头跨行 */
  titleRowspan?: number;
  /** 表头跨列 */
  titleColspan?: number;
  /** 列是否支持排序 */
  sorter?: boolean;
  /** 列的样式 */
  style?: Record<string, string | null | undefined>;
  /** td colspan */
  colspan?: number | ((rowData: any, rowIndex: number) => number);
  /** td rowspan */
  rowspan?: number | ((rowData: any, rowIndex: number) => number);
  /** 单元格内容渲染函数 */
  render?: (
    rowData: any,
    rowIndex: number
  ) => HTMLElement | DocumentFragment | HTMLElement[] | string;
}
