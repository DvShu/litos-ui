# T226：公开入口与依赖映射

由 `node scripts/public-entries.mjs --write` 生成，使用 `--check` 检查漂移，`--json` 获取完整数据。条件依赖统一维护在 `scripts/entry-requirements.json`；其余映射从当前源码和 exports 提取。

覆盖 87 个公开对象及 popconfirm、transition、utils，共 90 个规范入口。总入口保留纯实现，独立包装不反向污染总入口。图标规范路径为 icon/*；不将通配符可解析的其他拼写当作新增 API 承诺。详见 [T200 审计](./TREE_SHAKING_AUDIT.md)。

示例在客户端执行，并预先导入 litos-ui/styles/vars.css；主题、reset、container、scrollbar 按需显式导入。DOM 示例只展示最小挂载，完整交互与配套内容见组件文档。Popover 示例需要页面已有 button；Tabs 需要已有 .l-tabs 和配套 Tabbar。SSR 仅在客户端加载。

继承不构成注册要求；用户插槽内容及自定义图标不纳入固定依赖。条件依赖是全部现有能力的并集，区分内建、标准配套、调用时注册。实际注册列仅表示导入时行为，不含服务函数内惰性注册。消费示例显式补齐全部条件依赖，不宣称当前包装已自动覆盖全部功能。

声明列包括 default 与具名导出及公开类型；默认类的实例类型使用 InstanceType<typeof 默认导入>。内部未导出的类型不作为公开 API。当前全局 CSS 引入仅保留注释，供后续 Vite 插件配置，不自动安装；待接入列记录这些资源。组件内联样式及模块级共享 CSSStyleSheet 继续复用，vars.css 仍需显式引入。本映射校验不代替打包、类型编译或浏览器验收。

## 总入口补充工具与类型

下列补充 API 保留在总入口，不创建注册元素。

<!-- prettier-ignore -->
| API | 公开入口／源码 | 使用边界 |
| --- | --- | --- |
| Signal、SignalStop | litos-ui；utils/signal_types.ts | 仅类型，使用 import type |
| addClickOutside、removeClickOutside | litos-ui；utils/clickoutside.ts | 调用时绑定／解除监听；既有 lib/utils/clickoutside.js 保留 set／remove 原名 |
| regist、useId、属性转换等工具 | litos-ui 或 litos-ui/utils；utils/index.ts | 具名导入，regist 显式调用才注册 |
| Popover、getOverflowAncestors、updatePosition、autoUpdate、createPopoverObserver、popconfirmProps | litos-ui 或 popover／popconfirm；utils/popover.ts | 配置与显式函数，普通 Popover 不注册确认框依赖 |

```ts
import type { Signal, SignalStop } from "litos-ui";
import { addClickOutside, removeClickOutside } from "litos-ui";
const el = document.createElement("div");
addClickOutside(el, () => console.log("outside"));
// 卸载时
removeClickOutside(el);
```

## litos-ui/base

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `BaseComponent` |
| 实现／包装 | `src/components/base.ts` ／ `src/components/entries/base.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | `HTMLElement` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | 无 |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | 无 |
| 第三方实现依赖 | `utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import BaseComponent from "litos-ui/base";
class Demo extends BaseComponent {}
customElements.define("demo-element", Demo);
```

## litos-ui/button

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Button` |
| 实现／包装 | `src/components/button/index.ts` ／ `src/components/entries/button.ts` |
| 行为／标签 | 自动注册 ／ `l-button` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/loading`（loading 状态；内建） |
| 传递条件依赖 | `icon/loading` |
| 入口实际注册 | `l-button` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/loading";
import "litos-ui/button";
document.body.insertAdjacentHTML("beforeend", "<l-button></l-button>");
```

## litos-ui/calendar

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Calendar` |
| 实现／包装 | `src/components/calendar/index.ts` ／ `src/components/entries/calendar.ts` |
| 行为／标签 | 自动注册 ／ `l-calendar` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-calendar` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `calendar/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/calendar";
document.body.insertAdjacentHTML("beforeend", "<l-calendar></l-calendar>");
```

## litos-ui/card

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Card` |
| 实现／包装 | `src/components/card/index.ts` ／ `src/components/entries/card.ts` |
| 行为／标签 | 自动注册 ／ `l-card` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-card` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `card/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/card";
document.body.insertAdjacentHTML("beforeend", "<l-card></l-card>");
```

## litos-ui/carousel

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Carousel` |
| 实现／包装 | `src/components/carousel/index.ts` ／ `src/components/entries/carousel.ts` |
| 行为／标签 | 自动注册 ／ `l-carousel` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `carousel-item`（标准配套；标准配套）；`icon/arrow-left`（箭头导航；内建）；`icon/arrow-right`（箭头导航；内建） |
| 传递条件依赖 | `carousel-item`、`icon/arrow-left`、`icon/arrow-right` |
| 入口实际注册 | `l-arrow-left-icon`、`l-arrow-right-icon`、`l-carousel`、`l-carousel-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `carousel/index.less`、`carousel/item.less`、`icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/carousel-item";
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/arrow-right";
import "litos-ui/carousel";
document.body.insertAdjacentHTML("beforeend", "<l-carousel></l-carousel>");
```

## litos-ui/carousel-item

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CarouselItem` |
| 实现／包装 | `src/components/carousel/item.ts` ／ `src/components/entries/carousel-item.ts` |
| 行为／标签 | 自动注册 ／ `l-carousel-item` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-carousel-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `carousel/item.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/carousel-item";
document.body.insertAdjacentHTML("beforeend", "<l-carousel-item></l-carousel-item>");
```

## litos-ui/checkbox

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Checkbox` |
| 实现／包装 | `src/components/check/checkbox.ts` ／ `src/components/entries/checkbox.ts` |
| 行为／标签 | 自动注册 ／ `l-checkbox` |
| 继承实现（不注册） | `Check` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-checkbox` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `check/check.less`、`check/checkbox.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/checkbox";
document.body.insertAdjacentHTML("beforeend", "<l-checkbox></l-checkbox>");
```

## litos-ui/checkbox-group

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CheckboxGroup` |
| 实现／包装 | `src/components/check/checkbox_group.ts` ／ `src/components/entries/checkbox-group.ts` |
| 行为／标签 | 自动注册 ／ `l-checkbox-group` |
| 继承实现（不注册） | `CheckGroup` |
| 条件依赖 | `checkbox`（标准配套；标准配套） |
| 传递条件依赖 | `checkbox` |
| 入口实际注册 | `l-checkbox`、`l-checkbox-group` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `check/check.less`、`check/checkbox.less`、`check/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/checkbox";
import "litos-ui/checkbox-group";
document.body.insertAdjacentHTML("beforeend", "<l-checkbox-group></l-checkbox-group>");
```

## litos-ui/collapse

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Collapse` |
| 实现／包装 | `src/components/collapse/index.ts` ／ `src/components/entries/collapse.ts` |
| 行为／标签 | 自动注册 ／ `l-collapse` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `collapse-item`（标准配套；标准配套） |
| 传递条件依赖 | `collapse-item`、`icon/arrow-right` |
| 入口实际注册 | `l-arrow-right-icon`、`l-collapse`、`l-collapse-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `collapse/index.less`、`collapse/item.less`、`icon/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/collapse-item";
import "litos-ui/icon/arrow-right";
import "litos-ui/collapse";
document.body.insertAdjacentHTML("beforeend", "<l-collapse></l-collapse>");
```

## litos-ui/collapse-item

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CollapseItem` |
| 实现／包装 | `src/components/collapse/item.ts` ／ `src/components/entries/collapse-item.ts` |
| 行为／标签 | 自动注册 ／ `l-collapse-item` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/arrow-right`（展开箭头；内建） |
| 传递条件依赖 | `icon/arrow-right` |
| 入口实际注册 | `l-arrow-right-icon`、`l-collapse-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `collapse/item.less`、`icon/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-right";
import "litos-ui/collapse-item";
document.body.insertAdjacentHTML("beforeend", "<l-collapse-item></l-collapse-item>");
```

## litos-ui/color-picker

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ColorPicker` |
| 实现／包装 | `src/components/color_picker/index.ts` ／ `src/components/entries/color-picker.ts` |
| 行为／标签 | 自动注册 ／ `l-color-picker` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-color-picker`、`l-input` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `color_picker/index.less`、`input/index.less`、`input/input_inner.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/color-picker";
document.body.insertAdjacentHTML("beforeend", "<l-color-picker></l-color-picker>");
```

## litos-ui/date-picker

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DatePicker` |
| 实现／包装 | `src/components/date_picker/index.ts` ／ `src/components/entries/date-picker.ts` |
| 行为／标签 | 自动注册 ／ `l-date-picker` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | `calendar`（弹层日历；内建）；`button`（确认；内建）；`icon/calendar`（输入图标；内建）；`icon/arrow-left`（切月；内建）；`icon/arrow-right`（切月；内建）；`icon/d-arrow-left`（切年；内建）；`icon/d-arrow-right`（切年；内建） |
| 传递条件依赖 | `button`、`calendar`、`icon/arrow-left`、`icon/arrow-right`、`icon/calendar`、`icon/d-arrow-left`、`icon/d-arrow-right`、`icon/loading` |
| 入口实际注册 | `l-arrow-left-icon`、`l-arrow-right-icon`、`l-button`、`l-calendar`、`l-calendar-icon`、`l-d-arrow-left-icon`、`l-d-arrow-right-icon`、`l-date-picker` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/datepicker.css`、`../../styles/popover.css` |
| 样式资源（含内联） | `button/index.less`、`calendar/index.less`、`date_picker/index.less`、`icon/index.less`、`input/input_inner.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/calendar";
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/arrow-right";
import "litos-ui/icon/calendar";
import "litos-ui/icon/d-arrow-left";
import "litos-ui/icon/d-arrow-right";
import "litos-ui/icon/loading";
import "litos-ui/date-picker";
document.body.insertAdjacentHTML("beforeend", "<l-date-picker></l-date-picker>");
```

## litos-ui/date-picker-ori

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DatePickerOri` |
| 实现／包装 | `src/components/date_picker_ori/index.ts` ／ `src/components/entries/date-picker-ori.ts` |
| 行为／标签 | 自动注册 ／ `l-date-picker-ori` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-date-picker-ori` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `date_picker_ori/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/date-picker-ori";
document.body.insertAdjacentHTML("beforeend", "<l-date-picker-ori></l-date-picker-ori>");
```

## litos-ui/description-panel

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DescriptionPanel` |
| 实现／包装 | `src/components/description_panel/index.ts` ／ `src/components/entries/description-panel.ts` |
| 行为／标签 | 自动注册 ／ `l-description-panel` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `button`（展开操作；内建）；`icon/arrow-down`（展开箭头；内建） |
| 传递条件依赖 | `button`、`icon/arrow-down`、`icon/loading` |
| 入口实际注册 | `l-arrow-down-icon`、`l-button`、`l-description-panel` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`description_panel/index.less`、`icon/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/arrow-down";
import "litos-ui/icon/loading";
import "litos-ui/description-panel";
document.body.insertAdjacentHTML("beforeend", "<l-description-panel></l-description-panel>");
```

## litos-ui/dialog

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Dialog` |
| 实现／包装 | `src/components/dialog/index.ts` ／ `src/components/entries/dialog.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | `dialog-container`（标准容器用法；标准配套） |
| 传递条件依赖 | `button`、`dialog-container`、`icon/close`、`icon/loading` |
| 入口实际注册 | `l-button`、`l-close-icon`、`l-dialog-container` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/dialog.css` |
| 样式资源（含内联） | `button/index.less`、`dialog/dialog_container.css`、`icon/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/dialog-container";
import "litos-ui/icon/close";
import "litos-ui/icon/loading";
import Dialog from "litos-ui/dialog";
const el = document.createElement("dialog");
document.body.append(el);
const dialog = new Dialog({ el });
dialog.open();
dialog.close();
dialog.destroy();
el.remove();
```

## litos-ui/dialog-box

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DialogBox` |
| 实现／包装 | `src/components/dialog/dialog_box.ts` ／ `src/components/entries/dialog-box.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | `dialog-container`（弹框；内建）；`icon/info`（confirm；内建）；`form-item`（prompt 调用时注册；调用时注册）；`input`（prompt 调用时注册；调用时注册） |
| 传递条件依赖 | `button`、`dialog-container`、`form-item`、`icon/close`、`icon/close-filled`、`icon/info`、`icon/loading`、`input` |
| 入口实际注册 | `l-button`、`l-close-icon`、`l-dialog-container`、`l-info-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/dialog.css` |
| 样式资源（含内联） | `button/index.less`、`dialog/dialog_container.css`、`form/form_item.less`、`icon/index.less`、`input/index.less`、`input/input_inner.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/dialog-container";
import "litos-ui/form-item";
import "litos-ui/icon/close";
import "litos-ui/icon/close-filled";
import "litos-ui/icon/info";
import "litos-ui/icon/loading";
import "litos-ui/input";
import DialogBox from "litos-ui/dialog-box";
await DialogBox.alert("保存成功");
```

## litos-ui/dialog-container

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DialogContainer` |
| 实现／包装 | `src/components/dialog/dialog_container.ts` ／ `src/components/entries/dialog-container.ts` |
| 行为／标签 | 自动注册 ／ `l-dialog-container` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `button`（确认／取消含 loading；内建）；`icon/close`（关闭；内建） |
| 传递条件依赖 | `button`、`icon/close`、`icon/loading` |
| 入口实际注册 | `l-button`、`l-close-icon`、`l-dialog-container` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`dialog/dialog_container.css`、`icon/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/close";
import "litos-ui/icon/loading";
import "litos-ui/dialog-container";
document.body.insertAdjacentHTML("beforeend", "<l-dialog-container></l-dialog-container>");
```

## litos-ui/form

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Form` |
| 实现／包装 | `src/components/form/index.ts` ／ `src/components/entries/form.ts` |
| 行为／标签 | 自动注册 ／ `l-form` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `form-item`（标准配套；标准配套） |
| 传递条件依赖 | `form-item` |
| 入口实际注册 | `l-form`、`l-form-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `form/form_item.less`、`form/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/form-item";
import "litos-ui/form";
document.body.insertAdjacentHTML("beforeend", "<l-form></l-form>");
```

## litos-ui/form-item

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `FormItem` |
| 实现／包装 | `src/components/form/form_item.ts` ／ `src/components/entries/form-item.ts` |
| 行为／标签 | 自动注册 ／ `l-form-item` |
| 继承实现（不注册） | `ContextProvide` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-form-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `form/form_item.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/form-item";
document.body.insertAdjacentHTML("beforeend", "<l-form-item></l-form-item>");
```

## litos-ui/icon/arrow-down

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ArrowDownIcon` |
| 实现／包装 | `src/components/icon/arrow_down.ts` ／ `src/components/entries/icon-arrow-down.ts` |
| 行为／标签 | 自动注册 ／ `l-arrow-down-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-arrow-down-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-down";
document.body.insertAdjacentHTML("beforeend", "<l-arrow-down-icon></l-arrow-down-icon>");
```

## litos-ui/icon/arrow-left

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ArrowLeftIcon` |
| 实现／包装 | `src/components/icon/arrow_left.ts` ／ `src/components/entries/icon-arrow-left.ts` |
| 行为／标签 | 自动注册 ／ `l-arrow-left-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-arrow-left-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-left";
document.body.insertAdjacentHTML("beforeend", "<l-arrow-left-icon></l-arrow-left-icon>");
```

## litos-ui/icon/arrow-right

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ArrowRightIcon` |
| 实现／包装 | `src/components/icon/arrow_right.ts` ／ `src/components/entries/icon-arrow-right.ts` |
| 行为／标签 | 自动注册 ／ `l-arrow-right-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-arrow-right-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-right";
document.body.insertAdjacentHTML("beforeend", "<l-arrow-right-icon></l-arrow-right-icon>");
```

## litos-ui/icon/arrow-up

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ArrowUpIcon` |
| 实现／包装 | `src/components/icon/arrow_up.ts` ／ `src/components/entries/icon-arrow-up.ts` |
| 行为／标签 | 自动注册 ／ `l-arrow-up-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-arrow-up-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-up";
document.body.insertAdjacentHTML("beforeend", "<l-arrow-up-icon></l-arrow-up-icon>");
```

## litos-ui/icon/base

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `BaseIcon` |
| 实现／包装 | `src/components/icon/base.ts` ／ `src/components/entries/icon-base.ts` |
| 行为／标签 | 自动注册 ／ `l-base-icon` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-base-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/base";
document.body.insertAdjacentHTML("beforeend", "<l-base-icon></l-base-icon>");
```

## litos-ui/icon/calendar

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CalendarIcon` |
| 实现／包装 | `src/components/icon/calendar.ts` ／ `src/components/entries/icon-calendar.ts` |
| 行为／标签 | 自动注册 ／ `l-calendar-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-calendar-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/calendar";
document.body.insertAdjacentHTML("beforeend", "<l-calendar-icon></l-calendar-icon>");
```

## litos-ui/icon/caret-bottom

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CaretBottomIcon` |
| 实现／包装 | `src/components/icon/caret_bottom.ts` ／ `src/components/entries/icon-caret-bottom.ts` |
| 行为／标签 | 自动注册 ／ `l-caret-bottom-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-caret-bottom-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/caret-bottom";
document.body.insertAdjacentHTML("beforeend", "<l-caret-bottom-icon></l-caret-bottom-icon>");
```

## litos-ui/icon/caret-top

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CaretTopIcon` |
| 实现／包装 | `src/components/icon/caret_top.ts` ／ `src/components/entries/icon-caret-top.ts` |
| 行为／标签 | 自动注册 ／ `l-caret-top-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-caret-top-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/caret-top";
document.body.insertAdjacentHTML("beforeend", "<l-caret-top-icon></l-caret-top-icon>");
```

## litos-ui/icon/close

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CloseIcon` |
| 实现／包装 | `src/components/icon/close.ts` ／ `src/components/entries/icon-close.ts` |
| 行为／标签 | 自动注册 ／ `l-close-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-close-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/close";
document.body.insertAdjacentHTML("beforeend", "<l-close-icon></l-close-icon>");
```

## litos-ui/icon/close-filled

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CloseFilledIcon` |
| 实现／包装 | `src/components/icon/close_filled.ts` ／ `src/components/entries/icon-close-filled.ts` |
| 行为／标签 | 自动注册 ／ `l-close-filled-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-close-filled-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/close-filled";
document.body.insertAdjacentHTML("beforeend", "<l-close-filled-icon></l-close-filled-icon>");
```

## litos-ui/icon/copy

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `CopyIcon` |
| 实现／包装 | `src/components/icon/copy.ts` ／ `src/components/entries/icon-copy.ts` |
| 行为／标签 | 自动注册 ／ `l-copy-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-copy-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/copy";
document.body.insertAdjacentHTML("beforeend", "<l-copy-icon></l-copy-icon>");
```

## litos-ui/icon/d-arrow-left

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DArrowLeftIcon` |
| 实现／包装 | `src/components/icon/d_arrow_left.ts` ／ `src/components/entries/icon-d-arrow-left.ts` |
| 行为／标签 | 自动注册 ／ `l-d-arrow-left-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-d-arrow-left-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/d-arrow-left";
document.body.insertAdjacentHTML("beforeend", "<l-d-arrow-left-icon></l-d-arrow-left-icon>");
```

## litos-ui/icon/d-arrow-right

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DArrowRightIcon` |
| 实现／包装 | `src/components/icon/d_arrow_right.ts` ／ `src/components/entries/icon-d-arrow-right.ts` |
| 行为／标签 | 自动注册 ／ `l-d-arrow-right-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-d-arrow-right-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/d-arrow-right";
document.body.insertAdjacentHTML("beforeend", "<l-d-arrow-right-icon></l-d-arrow-right-icon>");
```

## litos-ui/icon/delete

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `DeleteIcon` |
| 实现／包装 | `src/components/icon/delete.ts` ／ `src/components/entries/icon-delete.ts` |
| 行为／标签 | 自动注册 ／ `l-delete-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-delete-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/delete";
document.body.insertAdjacentHTML("beforeend", "<l-delete-icon></l-delete-icon>");
```

## litos-ui/icon/eye-outline

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `EyeOutlineIcon` |
| 实现／包装 | `src/components/icon/eye_outline.ts` ／ `src/components/entries/icon-eye-outline.ts` |
| 行为／标签 | 自动注册 ／ `l-eye-outline-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-eye-outline-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/eye-outline";
document.body.insertAdjacentHTML("beforeend", "<l-eye-outline-icon></l-eye-outline-icon>");
```

## litos-ui/icon/font-icon

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `FontIcon` |
| 实现／包装 | `src/components/icon/font_icon.ts` ／ `src/components/entries/icon-font-icon.ts` |
| 行为／标签 | 自动注册 ／ `l-font-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-font-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/font-icon";
document.body.insertAdjacentHTML("beforeend", "<l-font-icon></l-font-icon>");
```

## litos-ui/icon/info

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `InfoIcon` |
| 实现／包装 | `src/components/icon/info.ts` ／ `src/components/entries/icon-info.ts` |
| 行为／标签 | 自动注册 ／ `l-info-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-info-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/info";
document.body.insertAdjacentHTML("beforeend", "<l-info-icon></l-info-icon>");
```

## litos-ui/icon/loading

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `LoadingIcon` |
| 实现／包装 | `src/components/icon/loading.ts` ／ `src/components/entries/icon-loading.ts` |
| 行为／标签 | 自动注册 ／ `l-loading-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-loading-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/loading";
document.body.insertAdjacentHTML("beforeend", "<l-loading-icon></l-loading-icon>");
```

## litos-ui/icon/minus

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `MinusIcon` |
| 实现／包装 | `src/components/icon/minus.ts` ／ `src/components/entries/icon-minus.ts` |
| 行为／标签 | 自动注册 ／ `l-minus-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-minus-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/minus";
document.body.insertAdjacentHTML("beforeend", "<l-minus-icon></l-minus-icon>");
```

## litos-ui/icon/moon

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `MoonIcon` |
| 实现／包装 | `src/components/icon/moon.ts` ／ `src/components/entries/icon-moon.ts` |
| 行为／标签 | 自动注册 ／ `l-moon-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-moon-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/moon";
document.body.insertAdjacentHTML("beforeend", "<l-moon-icon></l-moon-icon>");
```

## litos-ui/icon/more

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `MoreIcon` |
| 实现／包装 | `src/components/icon/more.ts` ／ `src/components/entries/icon-more.ts` |
| 行为／标签 | 自动注册 ／ `l-more-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-more-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/more";
document.body.insertAdjacentHTML("beforeend", "<l-more-icon></l-more-icon>");
```

## litos-ui/icon/picture

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `PictureIcon` |
| 实现／包装 | `src/components/icon/picture.ts` ／ `src/components/entries/icon-picture.ts` |
| 行为／标签 | 自动注册 ／ `l-picture-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-picture-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/picture";
document.body.insertAdjacentHTML("beforeend", "<l-picture-icon></l-picture-icon>");
```

## litos-ui/icon/plus

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `PlusIcon` |
| 实现／包装 | `src/components/icon/plus.ts` ／ `src/components/entries/icon-plus.ts` |
| 行为／标签 | 自动注册 ／ `l-plus-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-plus-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/plus";
document.body.insertAdjacentHTML("beforeend", "<l-plus-icon></l-plus-icon>");
```

## litos-ui/icon/reduction

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ReductionIcon` |
| 实现／包装 | `src/components/icon/reduction.ts` ／ `src/components/entries/icon-reduction.ts` |
| 行为／标签 | 自动注册 ／ `l-reduction-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-reduction-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/reduction";
document.body.insertAdjacentHTML("beforeend", "<l-reduction-icon></l-reduction-icon>");
```

## litos-ui/icon/refresh

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `RefreshIcon` |
| 实现／包装 | `src/components/icon/refresh.ts` ／ `src/components/entries/icon-refresh.ts` |
| 行为／标签 | 自动注册 ／ `l-refresh-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-refresh-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/refresh";
document.body.insertAdjacentHTML("beforeend", "<l-refresh-icon></l-refresh-icon>");
```

## litos-ui/icon/refresh-left

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `RefreshLeftIcon` |
| 实现／包装 | `src/components/icon/refresh_left.ts` ／ `src/components/entries/icon-refresh-left.ts` |
| 行为／标签 | 自动注册 ／ `l-refresh-left-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-refresh-left-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/refresh-left";
document.body.insertAdjacentHTML("beforeend", "<l-refresh-left-icon></l-refresh-left-icon>");
```

## litos-ui/icon/refresh-right

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `RefreshRightIcon` |
| 实现／包装 | `src/components/icon/refresh_right.ts` ／ `src/components/entries/icon-refresh-right.ts` |
| 行为／标签 | 自动注册 ／ `l-refresh-right-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-refresh-right-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/refresh-right";
document.body.insertAdjacentHTML("beforeend", "<l-refresh-right-icon></l-refresh-right-icon>");
```

## litos-ui/icon/search

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `SearchIcon` |
| 实现／包装 | `src/components/icon/search.ts` ／ `src/components/entries/icon-search.ts` |
| 行为／标签 | 自动注册 ／ `l-search-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-search-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/search";
document.body.insertAdjacentHTML("beforeend", "<l-search-icon></l-search-icon>");
```

## litos-ui/icon/select

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `SelectIcon` |
| 实现／包装 | `src/components/icon/select.ts` ／ `src/components/entries/icon-select.ts` |
| 行为／标签 | 自动注册 ／ `l-select-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-select-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/select";
document.body.insertAdjacentHTML("beforeend", "<l-select-icon></l-select-icon>");
```

## litos-ui/icon/sort

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `SortIcon` |
| 实现／包装 | `src/components/icon/sort.ts` ／ `src/components/entries/icon-sort.ts` |
| 行为／标签 | 自动注册 ／ `l-sort-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-sort-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/sort";
document.body.insertAdjacentHTML("beforeend", "<l-sort-icon></l-sort-icon>");
```

## litos-ui/icon/success

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `SuccessIcon` |
| 实现／包装 | `src/components/icon/success.ts` ／ `src/components/entries/icon-success.ts` |
| 行为／标签 | 自动注册 ／ `l-success-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-success-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/success";
document.body.insertAdjacentHTML("beforeend", "<l-success-icon></l-success-icon>");
```

## litos-ui/icon/sun

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `SunIcon` |
| 实现／包装 | `src/components/icon/sun.ts` ／ `src/components/entries/icon-sun.ts` |
| 行为／标签 | 自动注册 ／ `l-sun-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-sun-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/sun";
document.body.insertAdjacentHTML("beforeend", "<l-sun-icon></l-sun-icon>");
```

## litos-ui/icon/theme-default

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ThemeDefaultIcon` |
| 实现／包装 | `src/components/icon/theme_default.ts` ／ `src/components/entries/icon-theme-default.ts` |
| 行为／标签 | 自动注册 ／ `l-theme-default-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-theme-default-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/theme-default";
document.body.insertAdjacentHTML("beforeend", "<l-theme-default-icon></l-theme-default-icon>");
```

## litos-ui/icon/warn

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `WarnIcon` |
| 实现／包装 | `src/components/icon/warn.ts` ／ `src/components/entries/icon-warn.ts` |
| 行为／标签 | 自动注册 ／ `l-warn-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-warn-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/warn";
document.body.insertAdjacentHTML("beforeend", "<l-warn-icon></l-warn-icon>");
```

## litos-ui/icon/zoom-in

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ZoomInIcon` |
| 实现／包装 | `src/components/icon/zoom_in.ts` ／ `src/components/entries/icon-zoom-in.ts` |
| 行为／标签 | 自动注册 ／ `l-zoom-in-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-zoom-in-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/zoom-in";
document.body.insertAdjacentHTML("beforeend", "<l-zoom-in-icon></l-zoom-in-icon>");
```

## litos-ui/icon/zoom-out

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ZoomOutIcon` |
| 实现／包装 | `src/components/icon/zoom_out.ts` ／ `src/components/entries/icon-zoom-out.ts` |
| 行为／标签 | 自动注册 ／ `l-zoom-out-icon` |
| 继承实现（不注册） | `BaseIcon` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-zoom-out-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/zoom-out";
document.body.insertAdjacentHTML("beforeend", "<l-zoom-out-icon></l-zoom-out-icon>");
```

## litos-ui/image

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Image` |
| 实现／包装 | `src/components/image/index.ts` ／ `src/components/entries/image.ts` |
| 行为／标签 | 自动注册 ／ `l-image` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `image-preview`（默认允许点击预览；内建） |
| 传递条件依赖 | `icon/arrow-left`、`icon/arrow-right`、`icon/close`、`icon/reduction`、`icon/refresh-left`、`icon/refresh-right`、`icon/zoom-in`、`icon/zoom-out`、`image-preview` |
| 入口实际注册 | `l-image` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `image/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/arrow-right";
import "litos-ui/icon/close";
import "litos-ui/icon/reduction";
import "litos-ui/icon/refresh-left";
import "litos-ui/icon/refresh-right";
import "litos-ui/icon/zoom-in";
import "litos-ui/icon/zoom-out";
import "litos-ui/image-preview";
import "litos-ui/image";
document.body.insertAdjacentHTML("beforeend", "<l-image></l-image>");
```

## litos-ui/image-preview

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ImagePreview` |
| 实现／包装 | `src/components/image/image_preview.ts` ／ `src/components/entries/image-preview.ts` |
| 行为／标签 | 自动注册 ／ `l-image-preview` |
| 继承实现（不注册） | `Mask` |
| 条件依赖 | `icon/close`（关闭；内建）；`icon/arrow-left`（导航；内建）；`icon/arrow-right`（导航；内建）；`icon/zoom-in`（缩放；内建）；`icon/zoom-out`（缩放；内建）；`icon/reduction`（还原；内建）；`icon/refresh-left`（旋转；内建）；`icon/refresh-right`（旋转；内建） |
| 传递条件依赖 | `icon/arrow-left`、`icon/arrow-right`、`icon/close`、`icon/reduction`、`icon/refresh-left`、`icon/refresh-right`、`icon/zoom-in`、`icon/zoom-out` |
| 入口实际注册 | `l-arrow-left-icon`、`l-arrow-right-icon`、`l-close-icon`、`l-image-preview`、`l-reduction-icon`、`l-refresh-left-icon`、`l-refresh-right-icon`、`l-zoom-in-icon`、`l-zoom-out-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less`、`image/image_preview.less`、`mask/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/arrow-right";
import "litos-ui/icon/close";
import "litos-ui/icon/reduction";
import "litos-ui/icon/refresh-left";
import "litos-ui/icon/refresh-right";
import "litos-ui/icon/zoom-in";
import "litos-ui/icon/zoom-out";
import "litos-ui/image-preview";
document.body.insertAdjacentHTML("beforeend", "<l-image-preview></l-image-preview>");
```

## litos-ui/input

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Input` |
| 实现／包装 | `src/components/input/index.ts` ／ `src/components/entries/input.ts` |
| 行为／标签 | 自动注册 ／ `l-input` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | `icon/close-filled`（clearable 状态；内建） |
| 传递条件依赖 | `icon/close-filled` |
| 入口实际注册 | `l-input` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `input/index.less`、`input/input_inner.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/close-filled";
import "litos-ui/input";
document.body.insertAdjacentHTML("beforeend", "<l-input></l-input>");
```

## litos-ui/input-number

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `InputNumber` |
| 实现／包装 | `src/components/input_number/index.ts` ／ `src/components/entries/input-number.ts` |
| 行为／标签 | 自动注册 ／ `l-input-number` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-input-number` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `input_number/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/input-number";
document.body.insertAdjacentHTML("beforeend", "<l-input-number></l-input-number>");
```

## litos-ui/list

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `List` |
| 实现／包装 | `src/components/list/index.ts` ／ `src/components/entries/list.ts` |
| 行为／标签 | 自动注册 ／ `l-list` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/loading`（infinite 且未 finish；内建） |
| 传递条件依赖 | `icon/loading` |
| 入口实际注册 | `l-list`、`l-loading-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less`、`list/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/loading";
import "litos-ui/list";
document.body.insertAdjacentHTML("beforeend", "<l-list></l-list>");
```

## litos-ui/loading

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Loading` |
| 实现／包装 | `src/components/loading/index.ts` ／ `src/components/entries/loading.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | 无 |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/loading.css` |
| 样式资源（含内联） | 无 |
| 第三方实现依赖 | `utilane/browser` |
| 声明／具名导出 | `LoadingInstance`、`default` |

客户端消费示例：

```js
import Loading from "litos-ui/loading";
Loading.init(); // 页面已有 [l-loading] 节点
Loading.close();
```

## litos-ui/mask

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Mask` |
| 实现／包装 | `src/components/mask/index.ts` ／ `src/components/entries/mask.ts` |
| 行为／标签 | 自动注册 ／ `l-mask` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-mask` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `mask/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/mask";
document.body.insertAdjacentHTML("beforeend", "<l-mask></l-mask>");
```

## litos-ui/md-input

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `MdInput` |
| 实现／包装 | `src/components/md_input/index.ts` ／ `src/components/entries/md-input.ts` |
| 行为／标签 | 自动注册 ／ `l-md-input` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-md-input` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `md_input/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/md-input";
document.body.insertAdjacentHTML("beforeend", "<l-md-input></l-md-input>");
```

## litos-ui/menu

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Menu` |
| 实现／包装 | `src/components/menu/index.ts` ／ `src/components/entries/menu.ts` |
| 行为／标签 | 自动注册 ／ `l-menu` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/arrow-right`（子菜单；内建） |
| 传递条件依赖 | `icon/arrow-right` |
| 入口实际注册 | `l-arrow-right-icon`、`l-menu` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less`、`menu/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-right";
import "litos-ui/menu";
document.body.insertAdjacentHTML("beforeend", "<l-menu></l-menu>");
```

## litos-ui/message

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Message` |
| 实现／包装 | `src/components/message/index.ts` ／ `src/components/entries/message.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | `icon/close-filled`（error；首次显示注册；调用时注册）；`icon/success`（success；首次显示注册；调用时注册）；`icon/warn`（warn；首次显示注册；调用时注册）；`icon/info`（info；首次显示注册；调用时注册） |
| 传递条件依赖 | `icon/close-filled`、`icon/info`、`icon/success`、`icon/warn` |
| 入口实际注册 | `l-close-filled-icon`、`l-info-icon`、`l-success-icon`、`l-warn-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/message.css` |
| 样式资源（含内联） | `icon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/close-filled";
import "litos-ui/icon/info";
import "litos-ui/icon/success";
import "litos-ui/icon/warn";
import Message from "litos-ui/message";
Message.success("保存成功");
```

## litos-ui/modal

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Modal` |
| 实现／包装 | `src/components/modal/index.ts` ／ `src/components/entries/modal.ts` |
| 行为／标签 | 自动注册 ／ `l-modal` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `button`（确认／取消含 loading；内建）；`icon/close`（关闭；内建） |
| 传递条件依赖 | `button`、`icon/close`、`icon/loading` |
| 入口实际注册 | `l-button`、`l-close-icon`、`l-modal` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`icon/index.less`、`modal/index.less`、`styles/animation/index.css`、`styles/mask/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/close";
import "litos-ui/icon/loading";
import "litos-ui/modal";
document.body.insertAdjacentHTML("beforeend", "<l-modal></l-modal>");
```

## litos-ui/modal-box

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ModalBox` |
| 实现／包装 | `src/components/modal/modal_box.ts` ／ `src/components/entries/modal-box.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | `modal`（弹框；内建）；`icon/info`（confirm；内建）；`form-item`（prompt 调用时注册；调用时注册）；`input`（prompt 调用时注册；调用时注册） |
| 传递条件依赖 | `button`、`form-item`、`icon/close`、`icon/close-filled`、`icon/info`、`icon/loading`、`input`、`modal` |
| 入口实际注册 | `l-button`、`l-close-icon`、`l-info-icon`、`l-modal` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/modal_box.css` |
| 样式资源（含内联） | `button/index.less`、`form/form_item.less`、`icon/index.less`、`input/index.less`、`input/input_inner.less`、`modal/index.less`、`styles/animation/index.css`、`styles/mask/index.css` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/form-item";
import "litos-ui/icon/close";
import "litos-ui/icon/close-filled";
import "litos-ui/icon/info";
import "litos-ui/icon/loading";
import "litos-ui/input";
import "litos-ui/modal";
import ModalBox from "litos-ui/modal-box";
await ModalBox.alert("保存成功");
```

## litos-ui/notification

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Notification` |
| 实现／包装 | `src/components/notification/index.ts` ／ `src/components/entries/notification.ts` |
| 行为／标签 | 自动注册 ／ `l-notification` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/info`（info；连接或调用时也会注册；调用时注册）；`icon/success`（success；调用时注册）；`icon/warn`（warning；调用时注册）；`icon/close-filled`（error；调用时注册）；`icon/close`（关闭；调用时注册） |
| 传递条件依赖 | `icon/close`、`icon/close-filled`、`icon/info`、`icon/success`、`icon/warn` |
| 入口实际注册 | `l-close-filled-icon`、`l-close-icon`、`l-info-icon`、`l-notification`、`l-success-icon`、`l-warn-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/notification.css` |
| 样式资源（含内联） | `icon/index.less`、`notification/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `NotificationOptions`、`NotificationPlacement`、`NotificationType`、`default` |

客户端消费示例：

```js
import "litos-ui/icon/close";
import "litos-ui/icon/close-filled";
import "litos-ui/icon/info";
import "litos-ui/icon/success";
import "litos-ui/icon/warn";
import "litos-ui/notification";
document.body.insertAdjacentHTML("beforeend", "<l-notification></l-notification>");
```

## litos-ui/page-header

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `PageHeader` |
| 实现／包装 | `src/components/page_header/index.ts` ／ `src/components/entries/page-header.ts` |
| 行为／标签 | 自动注册 ／ `l-page-header` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `button`（返回；内建）；`icon/arrow-left`（返回；内建） |
| 传递条件依赖 | `button`、`icon/arrow-left`、`icon/loading` |
| 入口实际注册 | `l-arrow-left-icon`、`l-button`、`l-page-header` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`icon/index.less`、`page_header/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/loading";
import "litos-ui/page-header";
document.body.insertAdjacentHTML("beforeend", "<l-page-header></l-page-header>");
```

## litos-ui/pagination

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Pagination` |
| 实现／包装 | `src/components/pagination/index.ts` ／ `src/components/entries/pagination.ts` |
| 行为／标签 | 自动注册 ／ `l-pagination` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `button`（翻页按钮；内建）；`input`（跳页输入；内建）；`icon/arrow-left`（翻页；内建）；`icon/arrow-right`（翻页；内建）；`icon/d-arrow-left`（首尾页；内建）；`icon/d-arrow-right`（首尾页；内建）；`icon/more`（更多页；内建） |
| 传递条件依赖 | `button`、`icon/arrow-left`、`icon/arrow-right`、`icon/close-filled`、`icon/d-arrow-left`、`icon/d-arrow-right`、`icon/loading`、`icon/more`、`input` |
| 入口实际注册 | `l-arrow-left-icon`、`l-arrow-right-icon`、`l-button`、`l-d-arrow-left-icon`、`l-d-arrow-right-icon`、`l-input`、`l-more-icon`、`l-pagination` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`icon/index.less`、`input/index.less`、`input/input_inner.less`、`pagination/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/arrow-right";
import "litos-ui/icon/close-filled";
import "litos-ui/icon/d-arrow-left";
import "litos-ui/icon/d-arrow-right";
import "litos-ui/icon/loading";
import "litos-ui/icon/more";
import "litos-ui/input";
import "litos-ui/pagination";
document.body.insertAdjacentHTML("beforeend", "<l-pagination></l-pagination>");
```

## litos-ui/polygon

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Polygon` |
| 实现／包装 | `src/components/polygon/index.ts` ／ `src/components/entries/polygon.ts` |
| 行为／标签 | 自动注册 ／ `l-polygon` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-polygon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `polygon/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/polygon";
document.body.insertAdjacentHTML("beforeend", "<l-polygon></l-polygon>");
```

## litos-ui/popconfirm

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Popover／定位函数／popconfirmProps` |
| 实现／包装 | `src/components/utils/popover.ts` ／ `src/components/entries/popconfirm.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | `button`（确认／取消；内建）；`icon/warn`（警告图标；内建） |
| 传递条件依赖 | `button`、`icon/loading`、`icon/warn` |
| 入口实际注册 | `l-button`、`l-warn-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/popover.css` |
| 样式资源（含内联） | `button/index.less`、`icon/index.less`、`styles/animation/index.css` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `Popover`、`autoUpdate`、`createPopoverObserver`、`getOverflowAncestors`、`popconfirmProps`、`updatePosition` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/loading";
import "litos-ui/icon/warn";
import { Popover, popconfirmProps } from "litos-ui/popconfirm";
const popover = new Popover({ ...popconfirmProps, reference: document.querySelector("button") });
// 卸载时
popover.destroy();
```

## litos-ui/popover

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Popover／定位函数／popconfirmProps` |
| 实现／包装 | `src/components/utils/popover.ts` ／ `src/components/entries/popover.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | 无 |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/popover.css` |
| 样式资源（含内联） | 无 |
| 第三方实现依赖 | `utilane/browser` |
| 声明／具名导出 | `Popover`、`autoUpdate`、`createPopoverObserver`、`getOverflowAncestors`、`popconfirmProps`、`updatePosition` |

客户端消费示例：

```js
import { Popover } from "litos-ui/popover";
const popover = new Popover({ reference: document.querySelector("button") });
// 卸载时
popover.destroy();
```

## litos-ui/qrcode

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Qrcode` |
| 实现／包装 | `src/components/qrcode/index.ts` ／ `src/components/entries/qrcode.ts` |
| 行为／标签 | 自动注册 ／ `l-qrcode` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-qrcode` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `qrcode/index.less` |
| 第三方实现依赖 | `qrcode-generator-es`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/qrcode";
document.body.insertAdjacentHTML("beforeend", "<l-qrcode></l-qrcode>");
```

## litos-ui/radio

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Radio` |
| 实现／包装 | `src/components/check/radio.ts` ／ `src/components/entries/radio.ts` |
| 行为／标签 | 自动注册 ／ `l-radio` |
| 继承实现（不注册） | `Check` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-radio` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `check/check.less`、`check/radio.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/radio";
document.body.insertAdjacentHTML("beforeend", "<l-radio></l-radio>");
```

## litos-ui/radio-group

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `RadioGroup` |
| 实现／包装 | `src/components/check/radio_group.ts` ／ `src/components/entries/radio-group.ts` |
| 行为／标签 | 自动注册 ／ `l-radio-group` |
| 继承实现（不注册） | `CheckGroup` |
| 条件依赖 | `radio`（标准配套；标准配套） |
| 传递条件依赖 | `radio` |
| 入口实际注册 | `l-radio`、`l-radio-group` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `check/check.less`、`check/index.less`、`check/radio.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/radio";
import "litos-ui/radio-group";
document.body.insertAdjacentHTML("beforeend", "<l-radio-group></l-radio-group>");
```

## litos-ui/select

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Select` |
| 实现／包装 | `src/components/select/index.ts` ／ `src/components/entries/select.ts` |
| 行为／标签 | 自动注册 ／ `l-select` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | `icon/arrow-down`（基础箭头；内建）；`icon/select`（选中标记；内建）；`tag`（multiple；内建）；`icon/close`（multiple 移除；内建）；`icon/close-filled`（clearable；内建）；`icon/loading`（loading；内建） |
| 传递条件依赖 | `icon/arrow-down`、`icon/close`、`icon/close-filled`、`icon/loading`、`icon/select`、`tag` |
| 入口实际注册 | `l-arrow-down-icon`、`l-select`、`l-select-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/popover.css`、`../../styles/select.css` |
| 样式资源（含内联） | `icon/index.less`、`select/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `SelectOption`、`default` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-down";
import "litos-ui/icon/close";
import "litos-ui/icon/close-filled";
import "litos-ui/icon/loading";
import "litos-ui/icon/select";
import "litos-ui/tag";
import "litos-ui/select";
document.body.insertAdjacentHTML("beforeend", "<l-select></l-select>");
```

## litos-ui/select-ori

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `SelectOri` |
| 实现／包装 | `src/components/select_ori/index.ts` ／ `src/components/entries/select-ori.ts` |
| 行为／标签 | 自动注册 ／ `l-select-ori` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-select-ori` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `input/input_inner.less`、`select_ori/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/select-ori";
document.body.insertAdjacentHTML("beforeend", "<l-select-ori></l-select-ori>");
```

## litos-ui/space

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Space` |
| 实现／包装 | `src/components/space/index.ts` ／ `src/components/entries/space.ts` |
| 行为／标签 | 自动注册 ／ `l-space` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-space` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `space/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/space";
document.body.insertAdjacentHTML("beforeend", "<l-space></l-space>");
```

## litos-ui/switch

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Switch` |
| 实现／包装 | `src/components/switch/index.ts` ／ `src/components/entries/switch.ts` |
| 行为／标签 | 自动注册 ／ `l-switch` |
| 继承实现（不注册） | `FormInner` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-switch` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `switch/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/switch";
document.body.insertAdjacentHTML("beforeend", "<l-switch></l-switch>");
```

## litos-ui/tabbar

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Tabbar` |
| 实现／包装 | `src/components/tabbar/index.ts` ／ `src/components/entries/tabbar.ts` |
| 行为／标签 | 自动注册 ／ `l-tabbar` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `tabbar-item`（标准配套；标准配套） |
| 传递条件依赖 | `tabbar-item` |
| 入口实际注册 | `l-tabbar`、`l-tabbar-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `tabbar/index.less`、`tabbar/item.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/tabbar-item";
import "litos-ui/tabbar";
document.body.insertAdjacentHTML("beforeend", "<l-tabbar></l-tabbar>");
```

## litos-ui/tabbar-item

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `TabbarItem` |
| 实现／包装 | `src/components/tabbar/item.ts` ／ `src/components/entries/tabbar-item.ts` |
| 行为／标签 | 自动注册 ／ `l-tabbar-item` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-tabbar-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `tabbar/item.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/tabbar-item";
document.body.insertAdjacentHTML("beforeend", "<l-tabbar-item></l-tabbar-item>");
```

## litos-ui/table

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Table` |
| 实现／包装 | `src/components/table/index.ts` ／ `src/components/entries/table.ts` |
| 行为／标签 | 自动注册 ／ `l-table` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | `l-table` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `table/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `Column`、`default` |

客户端消费示例：

```js
import "litos-ui/table";
document.body.insertAdjacentHTML("beforeend", "<l-table></l-table>");
```

## litos-ui/tabs

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Tabs` |
| 实现／包装 | `src/components/tabs/index.ts` ／ `src/components/entries/tabs.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | `tabbar`（标准配套；标准配套） |
| 传递条件依赖 | `tabbar`、`tabbar-item` |
| 入口实际注册 | `l-tabbar`、`l-tabbar-item` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/tabs.css` |
| 样式资源（含内联） | `tabbar/index.less`、`tabbar/item.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/tabbar";
import "litos-ui/tabbar-item";
import Tabs from "litos-ui/tabs";
const tabs = Tabs.init(); // 配套 DOM 挂载后
// 卸载时
tabs.destroy();
```

## litos-ui/tag

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Tag` |
| 实现／包装 | `src/components/tag/index.ts` ／ `src/components/entries/tag.ts` |
| 行为／标签 | 自动注册 ／ `l-tag` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/close`（closeable 状态；内建） |
| 传递条件依赖 | `icon/close` |
| 入口实际注册 | `l-tag` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `tag/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/icon/close";
import "litos-ui/tag";
document.body.insertAdjacentHTML("beforeend", "<l-tag></l-tag>");
```

## litos-ui/theme

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Theme` |
| 实现／包装 | `src/components/theme/index.ts` ／ `src/components/entries/theme.ts` |
| 行为／标签 | 自动注册 ／ `l-theme` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `button`（按钮模式；内建）；`select-ori`（原生选择模式；内建）；`switch`（开关模式；内建）；`radio-group`（单选模式；内建）；`icon/theme-default`（自动模式；内建）；`icon/sun`（浅色；内建）；`icon/moon`（暗黑；内建） |
| 传递条件依赖 | `button`、`icon/loading`、`icon/moon`、`icon/sun`、`icon/theme-default`、`radio`、`radio-group`、`select-ori`、`switch` |
| 入口实际注册 | `l-button`、`l-moon-icon`、`l-radio`、`l-radio-group`、`l-select-ori`、`l-sun-icon`、`l-switch`、`l-theme`、`l-theme-default-icon` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `button/index.less`、`check/check.less`、`check/index.less`、`check/radio.less`、`icon/index.less`、`input/input_inner.less`、`select_ori/index.less`、`styles/animation/index.css`、`switch/index.less`、`theme/index.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/button";
import "litos-ui/icon/loading";
import "litos-ui/icon/moon";
import "litos-ui/icon/sun";
import "litos-ui/icon/theme-default";
import "litos-ui/radio";
import "litos-ui/radio-group";
import "litos-ui/select-ori";
import "litos-ui/switch";
import "litos-ui/theme";
document.body.insertAdjacentHTML("beforeend", "<l-theme></l-theme>");
```

## litos-ui/theme-color

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `ThemeColor` |
| 实现／包装 | `src/components/theme/theme_color.ts` ／ `src/components/entries/theme-color.ts` |
| 行为／标签 | 自动注册 ／ `l-theme-color` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `color-picker`（内建颜色选择；内建） |
| 传递条件依赖 | `color-picker` |
| 入口实际注册 | `l-color-picker`、`l-input`、`l-theme-color` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `color_picker/index.less`、`input/index.less`、`input/input_inner.less` |
| 第三方实现依赖 | `alien-signals`、`utilane`、`utilane/browser` |
| 声明／具名导出 | `default` |

客户端消费示例：

```js
import "litos-ui/color-picker";
import "litos-ui/theme-color";
document.body.insertAdjacentHTML("beforeend", "<l-theme-color></l-theme-color>");
```

## litos-ui/transition

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `transition` |
| 实现／包装 | `src/components/utils/transition.ts` ／ `src/components/entries/transition.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | 无 |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | `../../styles/transition.css` |
| 样式资源（含内联） | 无 |
| 第三方实现依赖 | `utilane/browser` |
| 声明／具名导出 | `createTransition` |

客户端消费示例：

```js
import { createTransition } from "litos-ui/transition";
const transition = createTransition();
transition.init();
// 卸载时
transition.destroy();
```

## litos-ui/upload

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `Upload` |
| 实现／包装 | `src/components/upload/index.ts` ／ `src/components/entries/upload.ts` |
| 行为／标签 | 自动注册 ／ `l-upload` |
| 继承实现（不注册） | `BaseComponent` |
| 条件依赖 | `icon/close`（普通列表移除；内建）；`icon/picture`（图片占位与失败；内建）；`icon/eye-outline`（图片卡片预览动作；内建）；`icon/delete`（图片卡片删除；内建）；`image-preview`（内建预览；内建） |
| 传递条件依赖 | `icon/arrow-left`、`icon/arrow-right`、`icon/close`、`icon/delete`、`icon/eye-outline`、`icon/picture`、`icon/reduction`、`icon/refresh-left`、`icon/refresh-right`、`icon/zoom-in`、`icon/zoom-out`、`image-preview` |
| 入口实际注册 | `l-close-icon`、`l-upload` |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | `icon/index.less`、`styles/animation/index.css`、`upload/index.less` |
| 第三方实现依赖 | `utilane`、`utilane/browser` |
| 声明／具名导出 | `UploadFile`、`UploadRequestHandler`、`UploadRequestOptions`、`UploadRequestResult`、`UploadResponseContext`、`UploadResponseParser`、`default`、`defaultUploadResponseParser` |

客户端消费示例：

```js
import "litos-ui/icon/arrow-left";
import "litos-ui/icon/arrow-right";
import "litos-ui/icon/close";
import "litos-ui/icon/delete";
import "litos-ui/icon/eye-outline";
import "litos-ui/icon/picture";
import "litos-ui/icon/reduction";
import "litos-ui/icon/refresh-left";
import "litos-ui/icon/refresh-right";
import "litos-ui/icon/zoom-in";
import "litos-ui/icon/zoom-out";
import "litos-ui/image-preview";
import "litos-ui/upload";
document.body.insertAdjacentHTML("beforeend", "<l-upload></l-upload>");
```

## litos-ui/utils

<!-- prettier-ignore -->
| 项目 | 映射 |
| --- | --- |
| 公共对象 | `utils` |
| 实现／包装 | `src/components/utils/index.ts` ／ `src/components/entries/utils.ts` |
| 行为／标签 | 显式 API ／ 无元素标签 |
| 继承实现（不注册） | 无 |
| 条件依赖 | 无额外元素依赖 |
| 传递条件依赖 | 无 |
| 入口实际注册 | 无 |
| 全局 CSS（含传递包装） | 无 |
| 待插件接入的全局 CSS | 无 |
| 样式资源（含内联） | 无 |
| 第三方实现依赖 | `utilane` |
| 声明／具名导出 | `initAttr`、`kebabToCamel`、`parseAttrValue`、`regist`、`setAttrs`、`stopSignal`、`tagAttr`、`tagAttrs`、`unitNumberStr`、`useId` |

客户端消费示例：

```js
import { kebabToCamel } from "litos-ui/utils";
console.log(kebabToCamel("demo-value"));
```