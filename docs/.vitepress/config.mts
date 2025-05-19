import { defineConfig } from "vitepress";

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
          { text: "工具样式", link: "/css_util" },
        ],
      },
      {
        text: "通用",
        collapsed: true,
        items: [
          { text: "Base 基础组件", link: "/components/base" },
          { text: "Transition 过渡动画", link: "/components/transition" },
          { text: "Container 容器布局", link: "/components/container" },
          {
            text: "Icon 图标",
            link: "/components/icon",
          },
          {
            text: "Polygon 多边形",
            link: "/components/polygon",
          },

          {
            text: "Theme 主题切换",
            link: "/components/theme",
          },
        ],
      },
      {
        text: "表单",
        collapsed: true,
        items: [
          {
            text: "Button 按钮",
            link: "/components/button",
          },
          {
            text: "Input 输入框",
            link: "/components/input",
          },
          {
            text: "MdInput Material输入框",
            link: "/components/md_input",
          },
          {
            text: "Radio 单选框",
            link: "/components/radio",
          },
          {
            text: "Checkbox 复选框",
            link: "/components/checkbox",
          },
          {
            text: "SelectOri 原生下拉框",
            link: "/components/select_ori",
          },
          {
            text: "Switch 开关",
            link: "/components/switch",
          },
          {
            text: "ColorPicker 颜色选择器",
            link: "/components/color_picker",
          },
          {
            text: "Form 表单",
            link: "/components/form",
          },
          {
            text: "DatePicker 日期选择器",
            link: "/components/date_picker",
          },
        ],
      },
      {
        text: "数据展示",
        collapsed: true,
        items: [
          {
            text: "List 滚动列表",
            link: "/components/list",
          },
          {
            text: "Loading 加载",
            link: "/components/loading",
          },
          {
            text: "Carousel 轮播",
            link: "/components/carousel",
          },
          /* TemplateItem */
        ],
      },
      {
        text: "反馈",
        collapsed: true,
        items: [
          {
            text: "Message 消息提示",
            link: "/components/message",
          },
          {
            text: "Popover 弹出气泡",
            link: "/components/popover",
          },
          {
            text: "Popconfirm 气泡确认框",
            link: "/components/popconfirm",
          },
          {
            text: "Dialog 对话框",
            link: "/components/dialog",
          },
          {
            text: "Modal 对话框",
            link: "/components/modal",
          },
        ],
      },
      {
        text: "导航",
        collapsed: true,
        items: [
          {
            text: "Tabbar 标签栏",
            link: "/components/tabbar",
          },
          {
            text: "Menu 菜单",
            link: "/components/menu",
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
