const messages = {
  "zh-CN": {
    showSource: "查看源代码",
    hideSource: "隐藏源代码",
    copyCode: "复制代码",
    copied: "复制成功",
    auto: "自动",
    light: "浅色",
    dark: "深色",
  },
  en: {
    showSource: "View source",
    hideSource: "Hide source",
    copyCode: "Copy code",
    copied: "Copied successfully",
    auto: "Auto",
    light: "Light",
    dark: "Dark",
  },
};

export function docText(key: keyof typeof messages.en): string {
  const language = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "zh-CN";
  return messages[language][key];
}