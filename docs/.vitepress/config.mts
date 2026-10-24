import { defineConfig } from "vitepress";
import { zh } from "./locales/zh";
import { en } from "./locales/en";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/litos-ui/",
  title: "LitosUI",
  description: "基于 Web Component 的 UI 组件库",
  lastUpdated: true,
  cleanUrls: true,
  lang: "zh-CN",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/litos-ui/logo.svg",
        type: "image/svg+xml",
      },
    ],
    [
      "script",
      {
        src: "//at.alicdn.com/t/c/font_4432992_0ygpzjm2hdqa.js",
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
  locales: { root: zh, en },
  themeConfig: {
    siteTitle: false,
    logo: "/logo.svg",
    i18nRouting: true,
    socialLinks: [{ icon: "github", link: "https://github.com/DvShu/litos-ui" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Shu",
    },
    externalLinkIcon: true,
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
              modal: {
                noResultsText: "没有找到相关结果",
                resetButtonTitle: "清除搜索",
                footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
              },
            },
          },
        },
      },
    },
  },
  sitemap: {
    hostname: "https://dvshu.github.io/litos-ui/",
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("l-"),
      },
    },
  },
});