---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LitosUI"
  text: "Web Component UI"
  tagline: 轻量、样式可控、TypeScript、逻辑可控
  image:
    src: /logo.svg
  actions:
    - theme: brand
      text: 快速开始
      link: /markdown-examples
    - theme: alt
      text: GitHub
      link: https://github.com/DvShu/neatui

features:
  - title: 轻量
    details: 除了依赖于小巧的 ph-utils 工具库外，没有任何其它依赖.
    icon: 🏃
  - title: 兼容
    details: 同时兼容移动和PC，最低兼容为 ios 15.0.
    icon: 📦
  - title: 逻辑可控
    details: 该组件库不同于其它组件库通过 npm 安装，该组件库提供脚手架通过脚手架的方式构建源码倒本地，便于修改.
    icon: 🔥
  - title: 样式可控
    details: 组件提供 part 外部可以根据不同 part 修改相应的样式；组件样式基于 CSS Variables 编写；确保样式可控.
    icon: 🎨
  - title: 类型安全
    details: 组件基于 typescript 编写，提供完整的类型.
    icon: 🌍
  - title: 全平台兼容
    details: 由于组件是基于 Web Component 编写的组件，所以该组件全平台兼容.
    icon: 🌈
---
