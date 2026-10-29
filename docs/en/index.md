---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LitosUI"
  text: "Web Component UI"
  tagline: Native Web Components, customizable themes, TypeScript
  image:
    src: /logo.svg
    alt: LitosUI logo
  actions:
    - theme: brand
      text: Getting Started
      link: /en/usage
    - theme: alt
      text: GitHub
      link: https://github.com/DvShu/litos-ui

features:
  - title: Native Components
    details: Built with native Web Components, using Custom Elements and Shadow DOM. Runs in browsers that support these APIs.
    icon: 🧩
  - title: Installation
    details: Install litos-ui from npm, import the components you need with ESM, and register them with regist.
    icon: 📦
  - title: Theming
    details: Customize colors with CSS variables. Choose from the Jade, Coral, and Tangerine presets, with support for dark mode.
    icon: 🎨
  - title: Styling
    details: Customize components with CSS variables and CSS parts. See each component's documentation for its styling options.
    icon: 🛠️
  - title: TypeScript
    details: Written in TypeScript, with type declarations included in the package for API discovery and type hints during development.
    icon: 📝
  - title: Browser Environment
    details: Requires browser APIs such as Custom Elements, Shadow DOM, and constructable stylesheets. In server-rendered applications, import and register components on the client.
    icon: 🌐
---