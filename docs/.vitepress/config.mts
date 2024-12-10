import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/litos_ui/",
  title: "LitosUI",
  description: "基于 Web Component 的 UI 组件库",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/litos_ui/logo.svg",
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
  themeConfig: {
    siteTitle: false,
    outline: {
      level: [1, 4],
    },
    lastUpdated: {
      text: "最后更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    logo: "/logo.svg",
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "文档",
        link: "/usage",
      },
      {
        text: "组件",
        link: "/markdown-examples",
      },
    ],
    sidebar: [
      {
        text: "指南",
        collapsed: true,
        items: [
          {
            text: "快速开始",
            link: "/usage",
          },
          {
            text: "样式重置",
            link: "/reset",
          },
        ],
      },
      {
        text: "通用",
        collapsed: true,
        items: [
          {
            text: "Icon 图标",
            link: "/components/icon",
          },
        ],
      },
      {
        text: "表单",
        collapsed: true,
        items: [
<<<<<<< HEAD
          {
            text: "Button 按钮",
            link: "/components/button",
          },
          {
            text: "Input 输入框",
            link: "/components/input",
          },
          {
            text: "Radio 单选框",
            link: "/components/radio",
          },
          {
            text: "Form 表单",
            link: "/components/form",
          },
=======
          { text: "Button 按钮", link: "/components/button" },
          { text: "Input", link: "/components/input" },
>>>>>>> d28da02 (CI: 组件生成命令)
        ],
      },
      {
        text: "数据展示",
        collapsed: true,
<<<<<<< HEAD
        items: [
          /* TemplateItem */
        ],
=======
        items: [],
>>>>>>> d28da02 (CI: 组件生成命令)
      },
      {
        text: "反馈",
        collapsed: true,
        items: [
          {
            text: "Message 消息提示",
            link: "/components/message",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/DvShu/litos-ui",
      },
    ],
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
