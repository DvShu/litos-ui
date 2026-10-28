# T200：组件依赖与模块顶层副作用审计

当前样式约定已按用户要求调整：全局 CSS 引入只保留注释，待消费端或后续 Vite 插件配置；删除样式安装与样式工厂 helper。8 个共享样式模块直接创建并导出模块级 CSSStyleSheet，实例共用该对象。全部入口导入时全局 style 注入数为 0。下文计数与 helper 描述保留为 T200 完成时的历史审计基线，不代表这次样式调整后的实现；当前运行时图使用审计脚本重新生成，入口资源与待接入 CSS 以 PUBLIC_ENTRIES.md 为准。

审计日期：2026-10-28。范围为当前工作区的 `src/components/`，包括总入口、实现、内部辅助模块及 `entries/` 注册包装。以源码为准，不用旧 `lib/` 产物推断当前行为。保留审计开始前已有的 package、构建配置、注册入口改动及脚本删除。

本记录完成 T200 的依赖梳理与边界检查，不代表 T201～T207、T226、T227 或各组件适配已完成。下文同时记录功能必要依赖和入口现状；发现缺口不等于本次已经修复该功能。

## 复查方法

```bash
node scripts/audit-dependencies.mjs
node scripts/audit-dependencies.mjs --json
node --test tests/dependency-boundaries.test.mjs
node --experimental-vm-modules --test tests/module-effects.test.mjs
```

审计脚本读取 TypeScript AST，输出运行时 import／re-export 图、各注册入口的传递模块、共享模块、样式、第三方依赖及顶层 call／new 清单。排除 type-only 引用，不执行组件模块，不依赖构建产物或浏览器。默认命令对实现反引注册入口、经总入口加载组件等边界违规返回非零状态。

AST 检查不能证明任意函数无副作用，也不能从字符串、动态标签或插槽推断所有注册需求。以下依赖表由实际渲染代码、条件分支、服务 API 和注册调用人工核对；顶层调用还需结合被调用函数的实现判断。包体积、浏览器交互、注册幂等与产物类型解析由各自验收任务负责。

脚本使用当前已安装 TypeScript 7 的 unstable AST API，不新增依赖；升级 TypeScript 时需同步核对 API。VM 用例剥离 TS 类型，在受控的 HTMLElement／document／customElements 桩中求值真实实现及包装；外部包使用当前安装的 ESM，CSS 字符串以空桩代替，不验证 CSS 内容。没有预先挂载的标签，因此不执行元素升级后的生命周期，不能据此声称浏览器加载注册入口绝不会触发实例事件。

## 入口与继承边界

- 总入口 `src/components/index.ts` 导出纯实现和工具，不导出或执行 `entries/` 包装。这里的“纯”指无自动注册／全局样式注入，不表示没有浏览器环境要求或对象分配。
- `entries/*.ts` 是明确的 opt-in 注册／全局样式入口，直接引用实现及其他所需注册包装；实现及内部辅助模块不得反向引用这些包装，也不得通过总入口引用其他组件。
- 同一实现模块可供多个入口复用；继承、类型引用、用户插槽和内建生成元素分别统计。继承不构成注册基类的理由。
- `regist()` 在调用时通过 `customElements.get()` 避免同名重复定义；总入口与包装共用实现路径，不创建第二份组件类。本次只审计依赖图，跨副本／不同版本的构造函数冲突不由此自动解决。

<!-- prettier-ignore -->
| 实现依赖 | 使用范围 | 注册边界 |
| --- | --- | --- |
| BaseComponent | 所有元素的直接或传递基类 | `base` 入口只导出基类，不注册派生类；普通元素入口不额外注册基类 |
| FormInner | Input、InputNumber、MdInput、SelectOri、Switch、Select、DatePicker、DatePickerOri、ColorPicker、Check、CheckGroup 等 | 保留实现与 signals 依赖，不注册 FormInner 或全部表单控件 |
| Check／CheckGroup | Radio、Checkbox／RadioGroup、CheckboxGroup | 内部基类不注册；组入口准备标准子元素 |
| ContextProvide | FormItem 等上下文提供者 | 保留上下文事件实现，不注册为元素 |
| BaseIcon／icon_style | 具体图标、FontIcon | 派生图标只注册自身，不因继承就注册 BaseIcon |
| Mask／共享 mask 样式 | ImagePreview；Modal 使用带 mask 类名的原生 div | ImagePreview 不额外注册 Mask；Modal 不因 CSS 类名而注册 Mask |
| Input 的内联 LESS | ColorPicker、DatePicker 等 | 复用样式不等于使用 `l-input`，不能据此注册 Input |
| ImagePreview 的类型 | Upload 的预览实例标注 | type-only import 不会加载、注册 ImagePreview；运行预览仍需实际元素依赖 |

## 元素、子组件与图标必要依赖

表中不重复列出自身。依赖是完整现有能力的并集，不要求所有条件分支在导入时立即执行。标记“配套”的子组件来自标准组合约定，不是内部生成元素；表中未列出的用户插槽内容和自定义图标由使用者选择。

<!-- prettier-ignore -->
| 对象／源码（相对 src/components） | 必要元素依赖 | 条件与排除项 |
| --- | --- | --- |
| BaseComponent — base.ts | 无 | 基类 API；不注册 |
| Button — button/index.ts | LoadingIcon | loading 状态；不能仅验证默认按钮 |
| Input — input/index.ts | CloseFilledIcon | clearable 状态；FormInner 仅为继承依赖 |
| InputNumber — input_number/index.ts | 无 | 原生输入与控制按钮，不需要 Input 元素 |
| MdInput — md_input/index.ts | 无 | FormInner 和内联样式 |
| SelectOri — select_ori/index.ts | 无 | 原生 select／option，与 Select 分离 |
| Switch — switch/index.ts | 无 | 图标插槽内容不作为固定依赖 |
| Radio — check/radio.ts | 无 | Check／FormInner 仅为继承依赖 |
| Checkbox — check/checkbox.ts | 无 | Check／FormInner 仅为继承依赖 |
| RadioGroup — check/radio_group.ts | Radio（配套） | 子项与组的 signals 联动 |
| CheckboxGroup — check/checkbox_group.ts | Checkbox（配套） | 不注册 Radio／RadioGroup |
| FormItem — form/form_item.ts | 无 | 不引入所有可插入控件 |
| Form — form/index.ts | FormItem（配套） | Input、Select 等由业务选择 |
| Calendar — calendar/index.ts | 无 | langs 数据为内部依赖，不是元素 |
| Polygon — polygon/index.ts | 无 | 原生 DOM／CSS |
| Qrcode — qrcode/index.ts | 无 | qrcode-generator-es 为运行时依赖，非注册依赖 |
| Table — table/index.ts | 无 | 排序箭头由 CSS／原生 span 实现，不需要 SortIcon |
| Space — space/index.ts | 无 | 插槽内容由使用者导入 |
| Card — card/index.ts | 无 | 不引入示例内的 Button |
| Mask — mask/index.ts | 无 | 自身与共享 mask 样式 |
| Tag — tag/index.ts | CloseIcon | closeable 状态 |
| ColorPicker — color_picker/index.ts | 无 | 原生 input[type=color]；仅复用 Input 的 LESS |
| List — list/index.ts | LoadingIcon | infinite 且未 finish 时；空内容为插槽，不存在独立空状态元素 |
| TabbarItem — tabbar/item.ts | 无 | 用户图标插槽；激活／卡片／间距由父元素联动，无 disabled 实现 |
| Tabbar — tabbar/index.ts | TabbarItem（配套） | 不引入示例图标 |
| CarouselItem — carousel/item.ts | 无 | 内容插槽 |
| Carousel — carousel/index.ts | CarouselItem（配套）、ArrowLeftIcon、ArrowRightIcon | 箭头标签由方向字符串生成；arrows=never 不代表其他模式可省略依赖；timer 为内部模块 |
| CollapseItem — collapse/item.ts | ArrowRightIcon | 展开箭头 |
| Collapse — collapse/index.ts | CollapseItem（配套）及其 ArrowRightIcon | 父子入口共享同一类 |
| Menu — menu/index.ts | ArrowRightIcon | 嵌套展开；自定义图标不捆绑全集 |
| Select — select/index.ts | ArrowDownIcon、SelectIcon、Tag、CloseIcon、CloseFilledIcon、LoadingIcon | multiple 使用 Tag／Close；clearable 使用 CloseFilled；loading 使用 Loading；Popover 是实现工具，不引入 Popconfirm 的 Button／Warn |
| Pagination — pagination/index.ts | Button、Input、ArrowLeftIcon、ArrowRightIcon、DArrowLeftIcon、DArrowRightIcon、MoreIcon | 连同 Button／Input 条件依赖；包含简单布局、更多页、跳页输入 |
| DatePickerOri — date_picker_ori/index.ts | 无 | 原生日期输入，含源码支持的区间，不引入自绘日历 |
| DatePicker — date_picker/index.ts | Calendar、Button、CalendarIcon、ArrowLeftIcon、ArrowRightIcon、DArrowLeftIcon、DArrowRightIcon | 弹层内容按需创建；包含 Button 条件依赖与 Popover 实现／样式 |
| DescriptionPanel — description_panel/index.ts | Button、ArrowDownIcon | 展开操作，包含 Button 条件依赖 |
| PageHeader — page_header/index.ts | Button、ArrowLeftIcon | 返回区域，包含 Button 条件依赖 |
| ImagePreview — image/image_preview.ts | CloseIcon、ArrowLeftIcon、ArrowRightIcon、ZoomInIcon、ZoomOutIcon、ReductionIcon、RefreshLeftIcon、RefreshRightIcon | 图标名称经动态模板拼接；继承 Mask 不额外注册 Mask |
| Image — image/index.ts | ImagePreview 及其八个图标 | previewDisabled 默认为 false，普通点击预览也需依赖 |
| Upload — upload/index.ts | CloseIcon、PictureIcon、EyeOutlineIcon、DeleteIcon、ImagePreview 及其八个图标 | 普通列表移除、picture-card 占位／失败／动作与内建预览；当前使用 EyeOutline，不是旧版 Search／Plus；用户提供的触发 Button 不作为固定依赖 |
| Theme — theme/index.ts | Button、SelectOri、Switch、RadioGroup、Radio、ThemeDefaultIcon、SunIcon、MoonIcon | 包含全部内建显示模式及 Button 条件依赖 |
| ThemeColor — theme/theme_color.ts | ColorPicker | 不因 ColorPicker 复用 Input 样式而需要 Input 元素 |
| DialogContainer — dialog/dialog_container.ts | Button、CloseIcon | 确认／取消／关闭，包含 Button loading 依赖 |
| Modal — modal/index.ts | Button、CloseIcon | 遮罩为原生 div；包含 Button loading 依赖 |
| Notification — notification/index.ts | InfoIcon、SuccessIcon、WarnIcon、CloseFilledIcon、CloseIcon | 元素和服务共用；error 映射 CloseFilled，warning 映射 Warn |

所有 36 个公开图标均只需注册自身，共享 BaseIcon 和 icon_style 的实现，不需要注册其他图标。完整清单如下（左侧为公开类名，右侧为源码）：

<!-- prettier-ignore -->
| 图标 | 源码（相对 src/components） |
| --- | --- |
| BaseIcon | icon/base.ts |
| FontIcon | icon/font_icon.ts |
| ArrowDownIcon | icon/arrow_down.ts |
| ArrowLeftIcon | icon/arrow_left.ts |
| ArrowRightIcon | icon/arrow_right.ts |
| ArrowUpIcon | icon/arrow_up.ts |
| CaretTopIcon | icon/caret_top.ts |
| CaretBottomIcon | icon/caret_bottom.ts |
| LoadingIcon | icon/loading.ts |
| SearchIcon | icon/search.ts |
| SunIcon | icon/sun.ts |
| MoonIcon | icon/moon.ts |
| ReductionIcon | icon/reduction.ts |
| RefreshLeftIcon | icon/refresh_left.ts |
| RefreshRightIcon | icon/refresh_right.ts |
| SortIcon | icon/sort.ts |
| ThemeDefaultIcon | icon/theme_default.ts |
| CloseIcon | icon/close.ts |
| InfoIcon | icon/info.ts |
| SuccessIcon | icon/success.ts |
| WarnIcon | icon/warn.ts |
| CloseFilledIcon | icon/close_filled.ts |
| MoreIcon | icon/more.ts |
| DArrowLeftIcon | icon/d_arrow_left.ts |
| DArrowRightIcon | icon/d_arrow_right.ts |
| ZoomInIcon | icon/zoom_in.ts |
| ZoomOutIcon | icon/zoom_out.ts |
| SelectIcon | icon/select.ts |
| CalendarIcon | icon/calendar.ts |
| RefreshIcon | icon/refresh.ts |
| CopyIcon | icon/copy.ts |
| PlusIcon | icon/plus.ts |
| MinusIcon | icon/minus.ts |
| EyeOutlineIcon | icon/eye_outline.ts |
| DeleteIcon | icon/delete.ts |
| PictureIcon | icon/picture.ts |

BaseIcon 允许直接使用 SVG 内容；FontIcon 从外部 symbol 查找内容，其 requestAnimationFrame 查询在实例初始化后发生，不是导入时的副作用，也不需要 iconify-icon 运行时。

## 服务、工具与运行时注册

<!-- prettier-ignore -->
| 对象／源码 | 必要元素／实现 | 导入与调用边界 |
| --- | --- | --- |
| Message — message/index.ts | CloseFilledIcon、SuccessIcon、WarnIcon、InfoIcon | 首次显式调用服务才惰性注册图标、创建消息与计时器；entries/message 预先注册图标、安装 message 全局样式，不打开消息 |
| Loading — loading/index.ts | 原生 DOM | 服务方法执行时创建遮罩、spinner、进度与监听；entries/loading 只准备全局样式 |
| Dialog — dialog/index.ts | 标准容器用法依赖 DialogContainer、Button、CloseIcon | 类本身管理原生 dialog，不能注册成 l-dialog；实例／open 才处理 DOM、事件和 body 状态；entries/dialog 安装样式并准备容器 |
| DialogBox — dialog/dialog_box.ts | Dialog、DialogContainer、Button、CloseIcon；confirm 的 InfoIcon；prompt 的 FormItem、Input | alert／confirm／prompt 方法各自惰性 regist；prompt 当前仍会注册 FormItem／Input，不能仅根据包装的注释判定它们缺失；Button loading、Input clearable 图标不由该惰性注册传递补齐 |
| ModalBox — modal/modal_box.ts | Modal、Button、CloseIcon；confirm 的 InfoIcon；prompt 的 FormItem、Input | 与 DialogBox 相同的调用时惰性注册边界，另需 modal_box 全局样式 |
| Tabs — tabs/index.ts | Tabbar／TabbarItem（标准配套） | Tabs.init() 才扫描 .l-tabs 和绑定监听，返回 destroy；包装安装 tabs 样式，不执行 init |
| Popover — utils/popover.ts | 原生 DOM、定位、外部点击、Observer | new Popover／引用／显示／autoUpdate 等显式流程才产生 DOM 和监听；普通包装只安装 popover 样式，不注册确认框元素 |
| popconfirmProps — utils/popover.ts | Button、WarnIcon，传递 Button loading | 配置对象的 contentRender 在调用时生成确认框；专用包装准备依赖，不将配置对象注册成元素 |
| createTransition — utils/transition.ts | 原生 DOM、MutationObserver | 工厂／init／add 显式调用；包装只安装 transition 样式，不自动观察页面 |
| utils／clickoutside／event | 纯函数和内部状态 | regist 被调用才定义元素；clickoutside.set 才绑定 document 点击监听，最后一个 remove 时解除；event 在调用时创建事件集合 |

Notification 计入上方 UI 元素一次；其命令式 API 在 show 时注册自身／图标，实例连接生命周期也准备图标。总入口保留这些原有调用行为，但不会在空导入时打开服务。

## 顶层副作用清单

当前源码有 90 个注册／工具包装和 113 个实现／辅助 TS 模块。以下是人工分类，而非把所有 new 或方法定义都视为副作用。

<!-- prettier-ignore -->
| 分类 | 模块／内容 | 导入时实际行为及处置 |
| --- | --- | --- |
| 共享 CSSStyleSheet 初始化（8 处） | button/style.ts、dialog/dialog_container_style.ts、input_number/style.ts、notification/style.ts、icon/icon_style.ts、styles/mask/index.ts、styles/animation/index.ts、upload/style.ts | 顶层调用带 PURE 标注的 createStyleSheet；函数创建离线 CSSStyleSheet 并 replaceSync，不挂到 DOM。没有消费者时可裁剪；模块保留时仍立即需要 CSSStyleSheet，优化／惰性缓存归 T203 |
| 内部容器分配（2 处） | notification/placement.ts 的 groups、utils/clickoutside.ts 的 nodeList | 顶层 new Map，只分配模块内状态，不绑事件、注册元素或操作 DOM |
| 常量／函数／类定义 | seed、消息实例数组、主题选项、图标映射、popconfirmProps、服务对象与类 | 初始化普通值；回调和实例字段中的代码不会在导入时自动执行。BaseComponent 的 extends HTMLElement 在类定义时读取浏览器全局，因此实现入口也有客户端环境要求 |
| 元素注册 | entries 内的 regist 调用及其传递包装 | 有意保留的注册副作用；不能对这些入口套用纯初始化标注，也不能让纯实现反引它们 |
| 全局样式安装 | date-picker、dialog、dialog-box、loading、message、modal-box、notification、popover、popconfirm、select、tabs、transition 包装 | installStyle 用固定 id 检查后向 document.head 插入 style；Select／DatePicker 与 Popover 共用 popover id。只安装必要服务样式，不打开服务 |
| 延迟 DOM／事件／Observer／请求 | 各元素生命周期、服务函数、Upload 请求处理、定位与过渡工具 | 未发现实现模块在顶层直接启动这些工作。需在相关实例／服务卸载时清理；本次静态审计不宣称已验证全部清理行为 |

`?inline` CSS／LESS 导入提供字符串，不等于安装全局 CSS。普通元素的样式在渲染时放入 Shadow DOM，八个共享表在实例使用时 adopted；服务包装的 installStyle 才会更改 document.head。vars、reset、container、scrollbar、主题预设仍由消费端显式导入。sideEffects 的发布路径与优化后的保留效果归 T202／T204／T206 验证，不能仅凭上述源码分类认定打包结果正确。

### 第三方初始化与共享依赖

- `utilane`／`utilane/browser`：工具及 DOM 操作函数；模块中引用这些函数不表示调用了它们。实际 DOM 工作在组件生命周期或服务方法内执行。
- `alien-signals`：Form、FormItem、Check／CheckGroup、FormInner、Collapse 等实现依赖；signal／effect 在构造、连接或交互流程中执行，未发现组件模块顶层启动订阅。
- `qrcode-generator-es`：只有 Qrcode 实现使用；QRCodeRender／renderToCanvas 在绘制流程调用，不是自动注册入口副作用。其他组件不应通过总入口带入它。
- 外部包本身仍有内部初始化：alien-signals 在导入时创建 reactive system，qrcode-generator-es 建立 Mode 常量，utilane 含内部 Map／静态状态；这些不是组件注册、DOM 挂载或监听，不能将“无浏览器全局副作用”写成“没有任何初始化”。
- `iconify-icon` 仅用于文档站，不是组件实现依赖；Shiki 等文档依赖也不进入此运行时图。
- 对当前安装的 utilane、utilane/browser、alien-signals、qrcode-generator-es，分别在无 DOM 全局的 Node 进程环境中 import 成功；该检查只证明这些版本的导入不要求 DOM，不证明它们所有 API 纯净，也不提供组件 SSR 承诺。
- Button／LoadingIcon、Input／CloseFilledIcon、ImagePreview 图标、popover 全局样式、共享 mask／animation 表是多入口共享节点。注册入口共用同一源码模块和 regist 实现；普通 Popover／Select 不因 utils/popover.ts 中同时存在 popconfirmProps 就注册 Button／WarnIcon。

## 当前差异与后续归属

以下记录审计开始时已存在的入口改动，不恢复被注释的 import，也不将其他任务自动勾选。完整功能所需依赖仍以本审计表为准；“可选状态”表示条件使用，不表示标签无需注册。

<!-- prettier-ignore -->
| 当前入口现状 | 影响 | 后续任务 |
| --- | --- | --- |
| button 注释 icon-loading | 只导入 button 不准备内建 loading 图标；引用 Button 的复合入口也不会自动补上 | T229、T227、T206 |
| input 注释 icon-close-filled；tag 注释 icon-close | clearable／closeable 依赖需另外准备 | T230、T248、T206 |
| select 仅预注册 ArrowDown／SelectIcon | multiple 的 Tag／Close、clearable 的 CloseFilled、loading 的 Loading 未由入口准备；不能用默认单选验证代替全状态验收 | T255、T226、T206 |
| image 注释 image-preview；upload 仅预注册 CloseIcon | Image 默认允许预览；Upload 的 picture-card 占位／动作／预览链需另外准备；当前 type-only 引用不能承担运行时依赖 | T261、T276、T206 |
| dialog-box／modal-box 包装注释 form-item／input | prompt 实现仍会惰性注册二者；不应误报为功能必然缺失，但 Button／Input 的条件图标仍需核对 | T269、T270、T226 |
| color-picker 包装导入 input；theme-color 传递引入它 | 比源码实际所需多注册 Input；共享 Input LESS 无需 Input 元素 | T249、T263、T226 |
| 按需文档仍称 Button 自带 loading、元素带完整内建依赖 | 与当前可选导入改动不一致；需要在对应功能迁移时统一行为和说明 | T205、T226 |
| tests/entries.test.mjs 仍按 90 条显式 exports 枚举 | 当前 package 使用通配符 exports，该消费测试需改为展开实际公开入口后验收；不能引用此前通过结果宣称当前改动已通过 | T201、T206、T207 |

## 本次结论与验证范围

必要依赖覆盖当前 43 个 UI 元素、36 个图标、7 个服务／工具和 BaseComponent，共 87 个对象，并补充 popconfirm、transition、工具及样式边界。未发现纯实现反向依赖注册入口或经总入口加载全库的路径；顶层没有实现侧自动监听、请求、Observer 或服务打开。条件图标缺口、额外注册及文档／消费测试差异已明确列出，后续按归属处理。

本次可重复验证结果：

- 静态依赖审计通过：203 个模块、90 个入口、819 条运行时引用、103 个顶层 call／new 位置；边界违规、未解析相对模块引用、语法错误和依赖循环均为 0。103 个位置包括注册／样式包装中的有意调用，不能解读为 103 个违规副作用。
- `node --test tests/dependency-boundaries.test.mjs`：11 项通过，覆盖真实图与合成的直接／间接反向引用、类型引用排除、动态导入、顶层与实例区分等。
- `node --experimental-vm-modules --test tests/module-effects.test.mjs`：3 项通过。纯总入口创建 8 个离线表，0 注册／0 全局 style；同一上下文加载全部包装后仍为 8 个表，共 79 个元素注册及 10 个唯一全局 style；两种加载顺序保持构造函数身份一致。
- 本次修改的 Markdown／脚本／测试经过局部格式化及格式检查，lint 与全库格式检查通过。pnpm exec 的供应链联网校验阻塞时已终止，改用当前安装的 Oxfmt 及 `node --run` 执行检查，没有安装或更新依赖。

自动验证针对运行时图和审计分类，不替代生产消费端与真实浏览器验收。不因 T200 完成而更新其他任务状态；本次不修改实现、发布包、构建配置或已有入口改动。