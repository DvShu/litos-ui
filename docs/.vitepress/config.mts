import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/neatui/",
  title: "NeatUI",
  description: "基于 Web Component 的 UI 组件库",
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/neatui-vue/logo.svg",
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,
    lastUpdated: {
      text: "最后更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    logo: "/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/markdown-examples" },
    ],
    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/DvShu/neatui" }],

    footer: {
      message: "Released under the MulanPSL2 License.",
      copyright: "Copyright © 2024-present Shu",
    },
    search: {
      provider: "local",
    },
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    externalLinkIcon: true,
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
  sitemap: {
    hostname: "https://dvshu.github.io/neatui/",
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("lt-"),
      },
    },
  },
});
