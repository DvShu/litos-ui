export type LangItem = {
  weekdays: string[];
};

export const langs: Record<string, LangItem> = {
  "en-US": { weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  "zh-CN": {
    weekdays: ["一", "二", "三", "四", "五", "六", "七"],
  },
};