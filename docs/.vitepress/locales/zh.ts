import type { DefaultTheme, LocaleConfig } from "vitepress";

export const zh: LocaleConfig<DefaultTheme.Config>[string] = {
  label: "简体中文",
  lang: "zh-CN",
  description: "基于 Web Components 的 UI 组件库",
  themeConfig: {
    notFound: {
      title: "页面未找到",
      quote: "请检查链接，或返回首页继续浏览。",
      linkLabel: "返回首页",
      linkText: "返回首页",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/usage" },
      { text: "组件", link: "/components/button" },
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
          { text: "主题切换", link: "/theme" },
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
            text: "Select 选择器",
            link: "/components/select",
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
            text: "DatePickerOri 日期选择器",
            link: "/components/date_picker_ori",
          },
          {
            text: "DatePicker 日期选择器",
            link: "/components/date_picker",
          },
          {
            text: "InputNumber 数字输入框",
            link: "/components/input_number",
          },
          {
            text: "Upload 上传",
            link: "/components/upload",
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
          {
            text: "Qrcode 二维码",
            link: "/components/qrcode",
          },
          {
            text: "Pagination 分页",
            link: "/components/pagination",
          },
          {
            text: "Tabs 标签页",
            link: "/components/tabs",
          },
          {
            text: "PageHeader 页头",
            link: "/components/page_header",
          },
          {
            text: "Tag 标签",
            link: "/components/tag",
          },
          {
            text: "Collapse 折叠面板",
            link: "/components/collapse",
          },
          {
            text: "Image 图片",
            link: "/components/image",
          },
          {
            text: "Table 表格",
            link: "/components/table",
          },
          {
            text: "Space 间距",
            link: "/components/space",
          },
          {
            text: "Calendar 日历",
            link: "/components/calendar",
          },
          {
            text: "Card 卡片",
            link: "/components/card",
          },
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
            text: "Notification 通知提醒框",
            link: "/components/notification",
          },
          {
            text: "Popover 弹出气泡",
            link: "/components/popover",
          },
          {
            text: "Dialog 对话框",
            link: "/components/dialog",
          },
          {
            text: "Mask 浮层遮罩",
            link: "/components/mask",
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
      {
        text: "业务组件",
        collapsed: true,
        items: [
          {
            text: "DescriptionPanel 简介面板",
            link: "/components/description_panel",
          },
        ],
      },
    ],
    outline: { level: [1, 4], label: "本页目录" },
    lastUpdated: {
      text: "最后更新时间",
      formatOptions: { dateStyle: "full", timeStyle: "medium" },
    },
    langMenuLabel: "切换语言",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    docFooter: { prev: "上一页", next: "下一页" },
  },
};