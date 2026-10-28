# 按需导入与 Tree Shaking

在客户端入口导入小写 kebab-case 子路径，元素入口会自动注册自身和内建依赖。基础变量仍需显式引入。

本页对应当前源码构建的包；在包含这些入口的新版本发布前，可用本地 `npm pack` 产物安装验证，不能假定既有 npm 版本已经提供这些路径。

```js
import "litos-ui/styles/vars.css";
import "litos-ui/button";
import "litos-ui/input-number";
```

```html
<l-button type="primary" loading>保存</l-button> <l-input-number value="2"></l-input-number>
```

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-button type="primary">保存</l-button>
  <l-button type="primary" loading>保存中</l-button>
  <l-input-number value="2"></l-input-number>
</textarea>
</l-code-preview>
</ClientOnly>

Button 自带 loading 图标注册。Form、Tabbar、Carousel、Collapse 的入口包含标准配套子元素；用户插槽内放入的其他组件仍需单独导入。Theme 包含全部内建显示模式。单独引入图标，例如 `litos-ui/icon/arrow-left`，只注册该图标。

## 类、类型与服务

元素子路径同时默认导出组件类，并透出相关公开类型。子路径与总入口共享构造函数，可与手动 `regist()` 混用；总入口继续保留，不自动注册组件。

```js
import Button from "litos-ui/button";
import Message from "litos-ui/message";
import Notification from "litos-ui/notification";
import { Popover, popconfirmProps } from "litos-ui/popconfirm";

Message.success("保存成功");
Notification.success("保存成功");
```

```ts
import type { UploadFile } from "litos-ui/upload";
import type { Column } from "litos-ui/table";
```

服务子路径仍需显式调用 API。全局 CSS 的 import 暂时仅保留注释，等待后续 Vite 插件配置，不自动向 document.head 注入样式。空导入不会打开消息、向全局注入 API 或自动扫描页面。普通气泡使用 `litos-ui/popover`；确认框配置使用 `litos-ui/popconfirm`，额外注册 Button 和 WarnIcon。Tabs.init() 和 createTransition().init() 仍需显式调用，并在卸载时清理。

## 样式、主题与 SSR

元素的 Shadow DOM 样式随入口加载。组件模块级 CSSStyleSheet 在实例间共享，不通过样式工厂创建。Message、Loading、Dialog、ModalBox、Notification、Tabs、Popover、Select、DatePicker 所需全局 CSS 当前不由子路径引入，使用时需自行通过现有 styles 子路径引入或后续 Vite 插件接入；vars.css 仍需引入一次。reset、container、scrollbar 和主题配色沿用现有 styles 子路径按需引入，配色选择一套，无需引入全库样式集合。

```js
import "litos-ui/styles/theme-jade.css";
document.documentElement.classList.toggle("dark");
```

这些入口依赖浏览器 API。SSR 框架需在客户端专用入口或挂载生命周期内加载：

```js
await import("litos-ui/button");
```

Tree Shaking 用于删除未使用的纯导出与无关组件；显式自动注册入口属于需要保留的副作用，生产构建不会裁掉它。二次打包时保留包的 sideEffects 信息。该用法不依赖自动导入插件。原有总入口以及 lib、styles、types 深层路径继续兼容。

## 公开入口

<!-- prettier-ignore -->
| 子路径 | 行为 |
| --- | --- |
| `litos-ui/base` | 显式 API |
| `litos-ui/message` | 服务 API |
| `litos-ui/dialog` | 服务 API |
| `litos-ui/dialog-container` | 自动注册 |
| `litos-ui/dialog-box` | 服务 API |
| `litos-ui/loading` | 服务 API |
| `litos-ui/tabs` | 服务 API |
| `litos-ui/modal` | 自动注册 |
| `litos-ui/modal-box` | 服务 API |
| `litos-ui/icon/base` | 自动注册 |
| `litos-ui/icon/arrow-down` | 自动注册 |
| `litos-ui/icon/arrow-left` | 自动注册 |
| `litos-ui/icon/arrow-right` | 自动注册 |
| `litos-ui/icon/arrow-up` | 自动注册 |
| `litos-ui/icon/caret-top` | 自动注册 |
| `litos-ui/icon/caret-bottom` | 自动注册 |
| `litos-ui/icon/font-icon` | 自动注册 |
| `litos-ui/icon/loading` | 自动注册 |
| `litos-ui/icon/search` | 自动注册 |
| `litos-ui/icon/sun` | 自动注册 |
| `litos-ui/icon/moon` | 自动注册 |
| `litos-ui/icon/reduction` | 自动注册 |
| `litos-ui/icon/refresh-left` | 自动注册 |
| `litos-ui/icon/refresh-right` | 自动注册 |
| `litos-ui/icon/sort` | 自动注册 |
| `litos-ui/icon/theme-default` | 自动注册 |
| `litos-ui/icon/close` | 自动注册 |
| `litos-ui/icon/info` | 自动注册 |
| `litos-ui/icon/success` | 自动注册 |
| `litos-ui/icon/warn` | 自动注册 |
| `litos-ui/icon/close-filled` | 自动注册 |
| `litos-ui/icon/more` | 自动注册 |
| `litos-ui/icon/d-arrow-left` | 自动注册 |
| `litos-ui/icon/d-arrow-right` | 自动注册 |
| `litos-ui/icon/zoom-in` | 自动注册 |
| `litos-ui/icon/zoom-out` | 自动注册 |
| `litos-ui/icon/select` | 自动注册 |
| `litos-ui/icon/calendar` | 自动注册 |
| `litos-ui/icon/refresh` | 自动注册 |
| `litos-ui/icon/copy` | 自动注册 |
| `litos-ui/icon/plus` | 自动注册 |
| `litos-ui/icon/minus` | 自动注册 |
| `litos-ui/icon/eye-outline` | 自动注册 |
| `litos-ui/icon/delete` | 自动注册 |
| `litos-ui/icon/picture` | 自动注册 |
| `litos-ui/form` | 自动注册 |
| `litos-ui/form-item` | 自动注册 |
| `litos-ui/radio-group` | 自动注册 |
| `litos-ui/radio` | 自动注册 |
| `litos-ui/checkbox` | 自动注册 |
| `litos-ui/checkbox-group` | 自动注册 |
| `litos-ui/button` | 自动注册 |
| `litos-ui/input` | 自动注册 |
| `litos-ui/input-number` | 自动注册 |
| `litos-ui/select-ori` | 自动注册 |
| `litos-ui/switch` | 自动注册 |
| `litos-ui/md-input` | 自动注册 |
| `litos-ui/select` | 自动注册 |
| `litos-ui/date-picker` | 自动注册 |
| `litos-ui/date-picker-ori` | 自动注册 |
| `litos-ui/color-picker` | 自动注册 |
| `litos-ui/list` | 自动注册 |
| `litos-ui/polygon` | 自动注册 |
| `litos-ui/tabbar` | 自动注册 |
| `litos-ui/tabbar-item` | 自动注册 |
| `litos-ui/theme` | 自动注册 |
| `litos-ui/theme-color` | 自动注册 |
| `litos-ui/menu` | 自动注册 |
| `litos-ui/carousel` | 自动注册 |
| `litos-ui/carousel-item` | 自动注册 |
| `litos-ui/qrcode` | 自动注册 |
| `litos-ui/description-panel` | 自动注册 |
| `litos-ui/pagination` | 自动注册 |
| `litos-ui/mask` | 自动注册 |
| `litos-ui/page-header` | 自动注册 |
| `litos-ui/tag` | 自动注册 |
| `litos-ui/collapse` | 自动注册 |
| `litos-ui/collapse-item` | 自动注册 |
| `litos-ui/image` | 自动注册 |
| `litos-ui/image-preview` | 自动注册 |
| `litos-ui/table` | 自动注册 |
| `litos-ui/space` | 自动注册 |
| `litos-ui/card` | 自动注册 |
| `litos-ui/calendar` | 自动注册 |
| `litos-ui/upload` | 自动注册 |
| `litos-ui/notification` | 自动注册 |
| `litos-ui/popover` | 显式 API |
| `litos-ui/popconfirm` | 显式 API |
| `litos-ui/transition` | 显式 API |
| `litos-ui/utils` | 显式 API |