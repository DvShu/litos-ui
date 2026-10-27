import type { DefaultTheme, LocaleConfig } from "vitepress";

export const en: LocaleConfig<DefaultTheme.Config>[string] = {
  label: "English",
  lang: "en",
  description: "A Web Components UI library with customizable themes and dark mode",
  themeConfig: {
    notFound: {
      title: "Page not found",
      quote: "Check the link or return to the home page.",
      linkLabel: "Go to home",
      linkText: "Go to home",
    },
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Guide", link: "/en/usage" },
      { text: "Components", link: "/en/components/button" },
    ],
    sidebar: [
      {
        text: "Guide",
        collapsed: true,
        items: [
          {
            text: "Getting Started",
            link: "/en/usage",
          },
          { text: "On-demand Imports", link: "/en/on_demand" },
          {
            text: "Style Reset",
            link: "/en/reset",
          },
          { text: "Utility Styles", link: "/en/css_util" },
          { text: "Theming", link: "/en/theme" },
        ],
      },
      {
        text: "General",
        collapsed: true,
        items: [
          { text: "Base", link: "/en/components/base" },
          { text: "Transition", link: "/en/components/transition" },
          { text: "Container", link: "/en/components/container" },
          {
            text: "Icon",
            link: "/en/components/icon",
          },
          {
            text: "Polygon",
            link: "/en/components/polygon",
          },

          {
            text: "Theme",
            link: "/en/components/theme",
          },
        ],
      },
      {
        text: "Form",
        collapsed: true,
        items: [
          {
            text: "Button",
            link: "/en/components/button",
          },
          {
            text: "Input",
            link: "/en/components/input",
          },
          {
            text: "MdInput Material Input",
            link: "/en/components/md_input",
          },
          {
            text: "Radio",
            link: "/en/components/radio",
          },
          {
            text: "Checkbox",
            link: "/en/components/checkbox",
          },
          {
            text: "SelectOri Native Select",
            link: "/en/components/select_ori",
          },
          {
            text: "Select",
            link: "/en/components/select",
          },
          {
            text: "Switch",
            link: "/en/components/switch",
          },
          {
            text: "ColorPicker",
            link: "/en/components/color_picker",
          },
          {
            text: "Form",
            link: "/en/components/form",
          },
          {
            text: "DatePickerOri Legacy Date Picker",
            link: "/en/components/date_picker_ori",
          },
          {
            text: "DatePicker",
            link: "/en/components/date_picker",
          },
          {
            text: "InputNumber",
            link: "/en/components/input_number",
          },
          {
            text: "Upload",
            link: "/en/components/upload",
          },
        ],
      },
      {
        text: "Data Display",
        collapsed: true,
        items: [
          {
            text: "List",
            link: "/en/components/list",
          },
          {
            text: "Loading",
            link: "/en/components/loading",
          },
          {
            text: "Carousel",
            link: "/en/components/carousel",
          },
          {
            text: "Qrcode",
            link: "/en/components/qrcode",
          },
          {
            text: "Pagination",
            link: "/en/components/pagination",
          },
          {
            text: "Tabs",
            link: "/en/components/tabs",
          },
          {
            text: "PageHeader",
            link: "/en/components/page_header",
          },
          {
            text: "Tag",
            link: "/en/components/tag",
          },
          {
            text: "Collapse",
            link: "/en/components/collapse",
          },
          {
            text: "Image",
            link: "/en/components/image",
          },
          {
            text: "Table",
            link: "/en/components/table",
          },
          {
            text: "Space",
            link: "/en/components/space",
          },
          {
            text: "Calendar",
            link: "/en/components/calendar",
          },
          {
            text: "Card",
            link: "/en/components/card",
          },
        ],
      },
      {
        text: "Feedback",
        collapsed: true,
        items: [
          {
            text: "Message",
            link: "/en/components/message",
          },
          {
            text: "Notification",
            link: "/en/components/notification",
          },
          {
            text: "Popover",
            link: "/en/components/popover",
          },
          {
            text: "Dialog",
            link: "/en/components/dialog",
          },
          {
            text: "Mask",
            link: "/en/components/mask",
          },
          {
            text: "Modal",
            link: "/en/components/modal",
          },
        ],
      },
      {
        text: "Navigation",
        collapsed: true,
        items: [
          {
            text: "Tabbar",
            link: "/en/components/tabbar",
          },
          {
            text: "Menu",
            link: "/en/components/menu",
          },
        ],
      },
      {
        text: "Business Components",
        collapsed: true,
        items: [
          {
            text: "DescriptionPanel",
            link: "/en/components/description_panel",
          },
        ],
      },
    ],
    outline: { level: [1, 4], label: "On this page" },
    lastUpdated: {
      text: "Last updated",
      formatOptions: { dateStyle: "full", timeStyle: "medium" },
    },
    langMenuLabel: "Change language",
    darkModeSwitchLabel: "Appearance",
    lightModeSwitchTitle: "Switch to light theme",
    darkModeSwitchTitle: "Switch to dark theme",
    sidebarMenuLabel: "Menu",
    returnToTopLabel: "Return to top",
    docFooter: { prev: "Previous page", next: "Next page" },
  },
};