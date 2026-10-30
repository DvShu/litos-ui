/** 规范化语言标识；空值或非法标识不参与语言选择。 */
function normalizeLocale(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    return Intl.getCanonicalLocales(value.trim().replaceAll("_", "-"))[0];
  } catch {
    return undefined;
  }
}

function storedLocale(kind: "sessionStorage" | "localStorage"): string | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    return normalizeLocale(window[kind].getItem("locale"));
  } catch {
    // 浏览器隐私策略可能禁止读取 Storage。
    return undefined;
  }
}

/**
 * 获取语言：显式配置 > session/local locale > html.lang > 浏览器 > zh-CN。
 * 仅在调用时读取环境，不写入缓存或安装监听器；无浏览器环境也可调用。
 * 返回规范化语言标识，具体组件自行决定支持的语言及文案回退。
 */
export function getLocale(locale?: string | null, defaultLocale: string = "zh-CN"): string {
  const configured = normalizeLocale(locale);
  if (configured) return configured;
  const stored = storedLocale("sessionStorage") || storedLocale("localStorage");
  if (stored) return stored;
  const page =
    typeof document === "undefined" ? undefined : normalizeLocale(document.documentElement?.lang);
  if (page) return page;
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    for (const language of navigator.languages || []) {
      const normalized = normalizeLocale(language);
      if (normalized) return normalized;
    }
    const language = normalizeLocale(navigator.language);
    if (language) return language;
  }
  return defaultLocale;
}