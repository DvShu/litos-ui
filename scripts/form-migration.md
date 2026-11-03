# 原生表单迁移契约与结构门禁（T321～T325）

日期：2026-11-01。本文件面向维护者，不是已发布 API 文档。生产控件尚未迁移，以下“目标”约束后续实现；本轮不提前完成 T326、T340、T354 等任务。保留现有工作区修改和 T353 完成状态。

## 1. T321：现状调用链与职责替代

### 现有链路

- FormInner 初始化向上发出 form-context-request 和 form-item-context-request；BaseComponent.emitInject 使用同步冒泡／composed CustomEvent 回调。ContextProvide 只转交上下文，本身不导入 alien-signals。
- Form.context 为 innerBlock，FormItem.context 为 innerBlock／prop；FormInner 的 effect 读取二者，实现 prop 到 name 和布局配置继承。
- FormInner.setValue → pushValueChange → form-value-change {name,value,valid} → Form._valueChange → _data[name]。valid 是“不是重置”的标记，不是实际校验结果；程序赋值也更新内部数据，不应由此伪造用户 input/change。
- FormItem 挂载时解析 required、verify（按 | 分割）、pattern（RegExp）、validity，自 prop 生成 schema；form-rule-change 向上添加到 Validator。setRules 同样注册 schema。属性动态更新没有完整的规则重新注册／移除闭环。
- Form.validate 调用 utilane Validator，返回结果对象；submit 通过时发 submit，失败时写 errors signal 或发 validate-error。
- Form.errors → FormItem effect 渲染错误，同时 FormInner effect 调用控件 validResult。Form.reset → clearValidate + resetCtx 自增 → 每个 FormInner effect 调用 reset。
- CheckGroup 另有 values signal，value 解析后发布选中 token；Check effect 设置 checked。子项用户 change → Group 修改 value → values → 子项。仅替换 FormInner 不能移除此运行时依赖。
- Button 根据 html-type 发 form-action，Form 将 submit 分支映射 submit，其余映射 reset；Shadow DOM 内 button 不天然成为外部原生 form 的 submitter。

### 文件／组件清单

- 直接运行时：src/components/form/index.ts、form_item.ts、form_inner.ts，src/components/check/index.ts、check.ts。
- 继承 FormInner：Input、MdInput、InputNumber、Select、SelectOri、Switch、ColorPicker、DatePicker、DatePickerOri；Radio／Checkbox 经 Check 继承，RadioGroup／CheckboxGroup 经 CheckGroup 继承。
- Upload 不继承 FormInner；不能假定其 fileList、File 或已上传结果会被 Form.getData 收集。保持上传协议，原生文件提交另由 T339 确定。
- 间接受影响：Theme（SelectOri／Switch／RadioGroup）、ThemeColor（ColorPicker）、Pagination（Input）、DialogBox／ModalBox（Input／FormItem）。必须回归，不需要各自创建 signal 替代系统。
- 非表单保留：Collapse／CollapseItem 仍有直接 signal/effect；直到对应任务完成前不得卸载包。Signal／SignalStop 是本地公开类型；Base.emitInject、ContextProvide、stopSignal 不能只因名字含 signal 就删，先区分类型兼容与运行时依赖。

### 控件真实值与事件差异（静态审计）

- Input：用户值为字符串（可经 parser），程序赋值可 any；change.detail 为 {value,name}。常规 input 来源是内部原生事件，清除另有自定义 input，不能把所有 input 统一改成同一 detail。
- InputNumber：初始 attribute 可能是字符串，用户有效输入为 number，非法失焦可为 undefined；当前空输入的 Number('')／parseFloat 路径不一致，后续修复需保持空输入不自动变 0。input/change 带 {value,name}，避免内部原生 input 与库事件双发。
- Select：单值可 string／number／boolean／对象，多值可数组；change.detail 为 {value,labels}，search 为 {value}。用户选择直接写 _value、数组原地修改和清空路径可能漏上报；observedAttributes 漏 name／inner-block，不能当作目标行为保留。
- SelectOri：用户值为 string，程序值可 any；change.detail 是字符串，不是 {value}。原生默认第一项与未初始化业务 value 可能不一致。
- Switch：用户值 boolean，历史 attribute 可为字符串，change.detail 为 null；不能把字符串 false 隐式当布尔 false 而不记录修复边界。
- ColorPicker：用户颜色字符串，默认 #000000；默认模型可能未向 Form 推送或建立 reset 基线，目标需补齐。
- MdInput：用户字符串，只有内部原生 input；运行时 observedAttributes 仅 disabled，初始化／动态 value、name 和 DOM 同步缺口后续补齐。
- DatePickerOri：单值或逗号区间字符串，change.detail 为 {value,dateStr,dates}，当前事件不冒泡／不 composed；不能为了统一基类静默改事件标志。
- DatePicker：尚未完成的骨架，不能凭继承 any 值宣称已有可用日期交互；本轮不补齐整套日期功能。
- Radio／Checkbox：业务 value 是 token，checked 独立；change.detail 为 {value,name,checked}。RadioGroup value 是单字符串；CheckboxGroup value 为 & 拼接字符串，change.detail.value 才是数组，特殊 &／% 的旧编码缺陷需回归。
- Upload：继承 BaseComponent，自行创建 HTTP 上传 FormData；fileList 为业务描述（可含 raw File／url／status），并非 l-form 值。其 reset／文件提交能力不在本轮默认为已支持。

还须回归：Form 断开时将 validator 置空而重新挂载未重建；FormItem setRules 最终 addSchema 会累积规则；inner-block 更新丢 prop，显式 false 被 || 继承覆盖；组内子项和 Group 可能重复上报同名值；Button 动态 html-type 的 DOM／监听同步和禁用守卫不完整。上述是审计发现，交给对应后续实现任务，不宣称本轮已修复。

### 目标分工

- 提交值：控件 setFormValue；原生 FormData 不再要求 _data 持续副本。
- reset／有效 disabled／owner：原生生命周期回调；UI 和默认值仍由控件实现。
- 配置：CSS 变量优先，行为配置使用快照请求和定向方法更新；动态属性移除恢复继承，用户显式 name 不被 prop 覆盖。
- 规则：继续复用 Validator，由规则层执行，结果写 setValidity；跨字段依赖显式登记，提交前整体验证，checkValidity 不等待 Promise。
- 错误：字段有效性与展示状态分离，普通事件／方法定向更新 FormItem，clearValidate 不伪造有效性。
- 分组：普通组选中状态和显式协调，组／子项只一个原生提交责任者；详见 Check 独立计划。

## 2. T323：冻结 API、事件和迁移差异

### 保持的表面行为

用户仍写 l-form > l-form-item > l-input，不额外指定 form ID，不手动注册字段。保留 Form 的 inline、label-position、label-width、label-height、inner-block、novalidate、emit-error，以及 FormItem 已有标签、规则、错误和布局属性；不新增文档未承诺的插槽。配置动态更新是目标，现有缺陷不是必须保留的行为。

- getData(): Record<string, any>：同步、浅快照，保留组件业务值而非统一字符串化。嵌套值不承诺深拷贝。
- submit(): void：校验通过发一次库 submit，detail 为 getData 快照；novalidate 跳过提交前规则检查，不影响显式 validate。现有异步调度不改成 Promise 返回 API。
- reset(): void：恢复默认业务值并清展示，默认值不能使用 || 丢失 0／false。不新增一个不存在的公共 reset 自定义事件。
- validate(): Promise<{result:boolean,errors:Record<string,any>}>：业务校验失败 resolve result=false，不改成 reject；显式调用不因 novalidate 跳过。不默认等同 reportValidity 或触发原生气泡 UI。
- validateField(field:string|string[]): Promise<void>：成功 resolve undefined，失败 reject Error，detail 为字段错误映射；目前方法未执行规则，后续补齐，不保持伪通过。
- clearValidate(): void：清错误展示及提交／触碰标记；底层真实约束仍可无效。
- setErrors(errorObj): void：保持直接设置展示错误，不受 emit-error 控制。后续提交重新执行规则；不得无期限阻塞而不定义清除策略。
- setValidateErrors(errs,all=true): void：emit-error 为真时发 validate-error {errors,all}，否则更新展示。all 保留 string|string[]|boolean 类型。
- addSchema、addSchemas、setSchema、setSchemas：SchemaType 参数和 void 返回不变，继续委托 Validator 的 add/set 含义，不擅自重定义为全量替换。
- FormItem.setRules({required?,rules?,message?}): void：按 prop 关联；动态改 prop／规则注销需在 T343 实现。

### 内部与外部事件边界

- 库 submit 和 validate-error 保持 bubbles/composed、非 cancelable 的既有约定；不要暗改为通过 preventDefault 取消库提交。使用者自行监听库 submit 发请求，库不自动导航。
- 内部真实 form 的原生 submit 必须 preventDefault，stopPropagation 防止泄漏出第二个同名 submit；校验／库事件由单一协调入口触发，原生 form.submit 不可用于替代。
- 原生 reset 可取消；reset.preventDefault 后不可改变值和错误展示。没有取消时才清 UI，避免在 reset 事件监听器早于后续取消者执行时抢先清状态。
- form-action、form-value-change、form-rule-change 和上下文事件是内部协议，可替换但必须同步修改全部调用者，不能作为新公开 API。Input 等既有用户事件 detail 和程序赋值不发用户事件的原则保留。
- 原生 invalid 不冒泡，捕获监听用于校验流程；另外通知有效性变化，不能用 invalid 假装实时状态流。

### 明确修复／变化（后续实现，不是本轮已修复）

- validateField 与字段变化路径当前没有实际 Validator 调用，须补齐；Select 某些交互直接改 _value 不上报，实时读取新值纠正旧缓存滞后。
- 删除／改名字段不保留旧缓存数据，旧值残留视为缺陷。
- getData 对同名多个逻辑字段明确采用当前 DOM 顺序最后一个值（保持旧对象最后写入覆盖的形状，消除事件时序不确定性）；不会自动改成数组。原生 FormData 则保留全部同名条目，用户需要多值时用 getAll。
- 前：getData 依赖上次上报，可能残留旧字段；后：form.getData() 调用形式不变，读取当前关联字段，按本文件规则形成业务快照。
- 前：Array.from(new FormData(form)) 不包含自定义字段；迁移后：原生条目可用，但不能用 Object.fromEntries 替代业务 getData。

## 3. T325：三层值模型

### 业务快照

getData 包含当前属于该 l-form 且有非空逻辑 name 的库字段，包含 disabled 和独立未选中 Check 的业务值，以兼容旧数据模型；不包含组内辅助子项、弹层输入和无名字段。独立 Checkbox／Radio 的业务 value 是 token，不是 checked。Group 是一个逻辑字段。

只读取已关联字段的当前值，不持续维护第二份 _data。原生控件按实际类型读取 value／checked 等明确适配；关联在外的字段必须通过所有权协议纳入，不能全局查询猜测。注册表保存引用／适配方法，不复制每次值。新旧默认初始化差异在各控件迁移时固定。

### 原生提交与恢复规则

- 字符串：原样提交，包括空字符串；state 用带版本／控件类型的字符串编码保存默认外的当前 UI 状态。
- 数值：业务值保留控件实际 number|string 语义；提交有限值的十进制字符串，空输入保持空字符串而非 0；非法数值按控件校验拒绝，不提交 NaN／Infinity 字面量。
- 布尔：普通布尔业务值保留；Switch 用户交互得到 boolean 时提交 "true"／"false"，历史程序赋值保留字符串时按该字符串提交；不强制改成复选框“关闭即排除”。原生 checkbox 未选中时 setFormValue(null)；checked 和 token 分别保存。
- null／undefined：业务快照保留该值（属性存在），原生提交用 null 排除；state 以类型标记区分缺失与空值，不隐式变成 "null"／"undefined"。
- 日期：不新增统一 Date 类型转换；DatePickerOri 等继续用各自现有业务字符串，提交同样明确格式。真实 Date 扩展值只允许控件显式序列化，不隐式受本机时区影响。
- 数组：已有多选业务类型不改变；Select 等确有数组值时，用 FormData 同名重复条目提交；空数组不产生条目。CheckboxGroup 当前业务 value 为 & 编码字符串（change.detail.value 为数组），保持两种 API 的区别，提交适配解码为同名多值，不改变公开 value。
- 对象：业务值保留引用；Select 当前选项 value 可为对象／数字／布尔，业务值及引用语义保留；原生提交必须提供显式稳定序列化钩子，对象未配置序列化时标记不可提交并给出明确错误，绝不隐式提交 [object Object]。这是新增原生提交通道的限制，不是删除旧 getData 对象值能力。普通业务对象无恢复保证。
- File：仅明确实现文件提交适配的控件使用 setFormValue(File/FormData)；Upload 本轮仍不自动纳入。state 不把 File 编码 JSON，不承诺恢复文件选择。
- 同名多值：FormData 保留顺序和全部条目，getData 保持对象最后字段覆盖；一个多值字段自身业务数组不被展平到其他业务类型。
- disabled：原生提交／约束检查由 UA 排除，业务 getData 保留。readonly 不等于 disabled，提交仍参与，约束资格按控件规范处理。
- 未选中：独立 Check 原生不提交，业务快照保留 token；组只提交选中项，组内子项永不重复提交。

恢复 state 以字符串为最低共同能力，只保存恢复该控件必需的数据，不序列化整个表单或持久化密码。密码不写自定义恢复 state；不保证浏览器 restore／autocomplete 回调一定发生。重置恢复默认值与历史恢复是两套流程。

## 4. T322：同树隐藏 form 的验证结论

scripts/check-form-owner.mjs 启动仅本机随机端口的临时 HTTP fixture，调用独立临时 profile 的 headless Chromium，完成后关闭。运行：

```powershell
$env:FORM_TEST_BROWSER = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node scripts/check-form-owner.mjs
```

本次 Chrome 156.0.0.0（Windows headless）23／23 通过：

- l-form Light DOM 创建 hidden form，slot 指向无对应插槽的保留名，控件 form=id 关联；辅助 form 不投影，用户节点不移动、控件不隐藏。
- FormItem Shadow DOM slot 和普通包装节点不影响同树关联；l-form 位于应用 ShadowRoot 内时，同一个 ShadowRoot 的关联仍有效。
- form.elements、FormData、checkValidity（有效／无效）、reset 回调正确；隐藏的是空辅助 form 而不是控件。
- 外部原生祖先 form 的独立字段正常关联；跨 ShadowRoot 的 ID 不关联；Shadow DOM 内 form 包 slot 不能成为外部字段 owner。
- 同名多值保留，disabled 字段不参与原生 FormData。

结论：首选结构在当前 Chromium 的平台最小样例可行，采用作为后续 T340 的实现方向。fixture 使用 gate-* 最小元素，不代表生产 l-form 已接入。外层原生 form 下禁止创建嵌套辅助 form，优先复用合法祖先 owner；用户显式 form 优先级、ID 分配／冲突和注销恢复的 T354 后续实现见第 6 节；嵌套 l-form 明确拒绝，不假装支持隔离。额外自定义 ShadowRoot 内的字段不自动穿透关联。

结果输出 .artifacts/form-owner-result.json（本机运行产物，不作为手写源码）。断言失败或浏览器缺失会非零退出。

## 5. T324：能力门禁及兼容边界

已实现 scripts/form-platform.mjs 的 inspectFormPlatform／assertFormPlatform，并在 fixture 使用；它们是迁移门禁工具，不被生产入口自动导入。T326 接入时在 attachInternals 前复用／迁入内部模块，避免 Vite 递归扫描误暴露新公共入口。

检测 attachInternals、Custom Elements、FormData、setFormValue、setValidity、checkValidity、reportValidity、form、labels、validity、validationMessage、willValidate，以及原生 form 的 requestSubmit／reset／checkValidity；缺失时输出明确的 iOS 16.4+ 能力要求和缺失列表，无 signal／polyfill 回退。不按 UA 字符串放行。该结构检测不证明生命周期、原生 UI 或辅助技术正确，仍需 fixture 和真实设备验收。

参考：

- [WebKit Safari 16.4 发布说明](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/#web-components)：ElementInternals／表单关联基础支持。
- [WebKit 表单关联介绍](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/)：原生回调、字符串恢复 state 及当时 autocomplete 限制。
- [MDN ElementInternals 兼容数据](https://github.com/mdn/browser-compat-data/blob/main/api/ElementInternals.json)：本轮核心提交／校验／form／labels API Safari 16.4，Firefox 的表单核心从 98 支持；不能只看 ElementInternals 构造器支持版本。

不依赖 CustomStateSet／:state（Safari 更晚），不依赖跨树引用新扩展，也不承诺自动填充、文件恢复或原生验证气泡各浏览器完全一致。自定义规则必须自己执行。

验收矩阵：iOS／iPadOS 16.4 为强制最低设备目标，当前稳定 Safari 同时回归；Chromium 本轮实测 Chrome 156，Firefox 后续以 140 ESR 及实施时稳定版作为具体验收目标，不宣称这些是库已发布最低版本。当前只有 Chrome 最小 fixture 实测通过，Safari／iOS／iPadOS／Firefox 未实测；T348 保持未完成。能力检测单元测试通过不等于整体最低系统兼容。构建 target 目前 esnext，后续 lib／消费构建必须另核对产物语法，不以 API 版本证明整个 bundle 能在 16.4 运行。

## 6. T354／T355：内部原语与接入责任

新增 src/components/form/owner.ts 和 context.ts，两者无运行时依赖，并从 Vite 自动入口扫描排除。生产 Form／FormInner／FormItem／Group 仍使用旧链路；这次交付的是经过真实 DOM 验证的内部原语，该阶段记录不代表生产迁移；后续 T326／T340 已接入的范围见第 7 节，T356 仍未完成。

### 所有权规则

- FormOwner(host, selectFields) 由 Form 生命周期 start／stop 管理；selectFields 只返回真实参与关联的库字段，不收集内部辅助输入。refresh 可用于字段完成升级后登记、显式刷新和无断开重连的特殊移动。
- 非嵌套 l-form、无同树原生祖先 form：创建空的 hidden form，放入保留 slot __l_form_owner；同树控件通过 form ID 关联。分配 ID 前检查冲突，局部观察到 ID 冲突则重分配。外部代码在 host 之外复制 ID 无法由局部观察器自动发现，应在宿主更新／注册时 refresh；不承诺自动监控整个 document。
- 同树原生祖先 form 存在：直接复用，不创建嵌套原生 form、不改应用 form 的 ID。多个 l-form 包在同一原生 form 内共享原生提交／重置范围，不能承诺原生互相隔离；未来库方法只处理各自字段集合，整表原生操作仍影响全部原生字段。
- 显式 form（包括空字符串、无效目标、指向外部 form）总是优先，不覆盖、不替用户修正。只有原来缺省的属性才由管理器写入；注销时仅移除仍等于内部赋值的属性，用户后来写的新值保留。用户移除显式 form 后恢复自动管理。
- 字段移到另一 host：移交旧管理器的内部属性后重新关联；删除字段恢复原本缺省属性。host disconnected 必须 stop，reconnected start；框架替换辅助节点后重新附加同一个辅助 form，不移动或清空用户节点。
- 嵌套 l-form 暂不支持：同树检测到外层 l-form 时明确抛错，不能悄悄归属外层。应用 ShadowRoot 内的独立 l-form 支持同树关联；不穿透额外自定义 ShadowRoot 查找字段或外层 form。
- 仅在 host 范围观察 childList 和 form／id 属性（subtree 用于已支持包装节点），不是全局观察器；属性写回只在不同值时进行，observer 异步批次刷新，无递归写回。真实生产接入仍须遵守不反复重建监听的原则。

### 通信协议

- provideFormContext(host, kind, provider) 安装 form／item／group 三种最近提供者，requestFormContext 同步请求，最近同类处理后停止传播；不同种类不会互相拦截，provider 自己请求会向祖先寻找。
- provider 返回配置快照和 registerField 接口，注册保留字段 target／当前值 getter，不缓存业务值或 name；注销幂等，断开和移动先清旧登记。字段动态配置变化需主动通知，不能假定事件自动向下广播。
- 配置和有效性通知是定向、nonbubbling／noncomposed 的普通 CustomEvent；不对外冒充用户 input／change，无 signal/effect 和通用依赖追踪。
- resolveFieldContext 保持 innerBlock 显式 false 与 name 空串覆盖；移除覆盖后使用当前 item.prop。禁用是有效状态：自身／组／项／表单任一有效禁用均不能被子项 false 解除；fieldset 通过原生回调叠加，不反写用户自身 disabled。
- 纯样式继续用 CSS 变量；prop／name 和布尔值只在控制器中解析，不把继承 name 反写成用户显式 name。旧 Signal 类型兼容处理与运行时依赖移除分开，不为类型兼容再引入旧机制。

### 验证与后续边界

FORM_TEST_CASE=lifecycle 配合原 runner 执行 tests/form-lifecycle.fixture.html：Chrome 156 通过动态关联、显式属性、空 form、ID 冲突、移动／重挂载、包装字段、祖先 form 复用、应用 ShadowRoot、嵌套拒绝、框架替换及保留用户 DOM；同时真实跨 ShadowRoot 测试最近上下文、定向更新、注销及显式配置。额外 Node 测试检查协议边界。此结果不是 iOS 16.4／Firefox 实测，最低设备验收仍留 T324／T348。

## 7. T340：生产 Form 与最小 Input 闭环

Form 现持有 FormOwner，通过 nativeForm 只读访问接口取得当前原生 owner（访问时刷新）。Shadow DOM 仅保留具有原 l-form 样式类的 div + slot 布局；原生辅助 form 位于 Light DOM 保留 slot，不投影到默认内容。原有 inline、label-position、label-width／height 和 FormItem 内容布局不变。宿主连接／断开负责 start／stop 及原生 submit／reset 监听，重新挂载不再丢失 Validator。

Form 现在提供新 form 类上下文配置，同时保留旧注入事件兼容现有字段。FormItem／Group／FormInner 的 signal 全面替换仍属 T356。本次不能视为移除了 alien-signals。

最小 Input 明确开启 nativeValueEnabled：初始化、value、setValue 和用户输入同步 setFormValue；提交字符串与业务值分开，其他派生默认不提交原生值，避免组成员重复。Form.getData／validate 对试点读取当前业务值，其他控件仍保留旧缓存（全字段快照收口留 T341）。name property 对试点反射宿主 name，以支持原生关联。

reset() 调用当前 nativeForm.reset()。Input 的原生 formResetCallback 仅恢复一次默认值，清理和旧控件兼容恢复在未取消 reset 的微任务执行；不再广播 resetCtx。默认基线仍须组件保存，不是浏览器自动记忆。此次用 ?? 修正 0／false 丢失，默认值属性语义、对象克隆及全控件状态回调仍由后续任务完成。原生祖先 form 复用时 reset 作用于整个原生 form，不能承诺各 l-form 隔离。

原生 requestSubmit 的 submit 事件经 Form 拦截后走现有业务 validate／submit 事件，防止页面导航；库 submit() 保持 void 和非取消自定义事件契约。原生约束桥接、全控件禁用／状态恢复未在本次补齐。

执行：FORM_TEST_BROWSER 指向 Chrome／Edge；FORM_TEST_CASE=complete 运行 node scripts/check-form-owner.mjs。tests/form-complete.fixture.html 保持 l-form > l-form-item > l-input 原写法，tests/form-complete.browser.mjs 使用真实生产类。Chrome 156 共 23 项：初始及用户输入收值、一次失败和一次成功提交、原生 FormData、只重置一次、取消重置、0／false、原生祖先复用、独立原生 form、卸载清理及重挂载、布局类和 CSS 变量。动画帧可能在 headless 暂停，动态布局断言直接刷新 BaseComponent 批次，不声称已进行可视化验收。T326 fixture 16 项和所有权 fixture 28 项同时回归；浏览器结果按 case 分文件输出 .artifacts/form-*-result.json，不再覆盖基线。iOS／iPadOS 16.4 和 Firefox 仍需实机验收。

## 8. T327～T332／T356：公共原生表单链路

本节取代第 7 节的临时试点边界：Form、FormInner、FormItem、Check／CheckGroup 已删除 signal／effect、resetCtx 及旧注入通信。上下文只由 T355 请求／定向事件提供，字段持有稳定登记身份，断开／owner 改变时先注销后重取；FormItem 不再继承 ContextProvide，其他非表单组件的共享工具不受影响。历史 FormSignal／FormItemSignal 仅保留类型定义，不构成运行时状态源。Form.validationErrors 是普通只读错误快照，旧内部 errors()／context() signal 访问不再支持，公开 setErrors／clearValidate 保留。

### 值与关联

- FormInner 默认通过 serializeFormValue／syncNativeValue 同步原生提交；null 不提交，序列化不发送用户 input／change。派生控件的初始化、setValue／property、attribute、用户输入、清空和重置统一接入；宿主有 name，内部 Shadow DOM 输入不重复命名。
- Check 独立项提交 checked token 或 null；组成员 grouped 只由组提交；CheckGroup 多选及 Select 多选使用同名重复 FormData 条目，业务值仍分别维持旧组字符串和 Select 数组约定。组字符串保留 & 格式并逐 token 编码；其历史空 token 与无选择歧义没有擅自更换公共格式。
- formAssociatedCallback 每次重新登记上下文及同步值；提供者延迟定义后主动刷新后代，FormOwner 局部观察器处理节点变化。显式 form 优先；Form.getData 从当前所属字段模型取值，删除／改名／移出不遗留旧缓存，禁用业务字段仍保留，组成员不重复收集。
- 日期、数字、Markdown、颜色、Switch、Select／SelectOri 同步实际内部 UI 后重新提交；DatePicker 当前仍保留既有日历壳功能，不在此次扩展完整日期面板。

### 禁用、默认值与恢复

- own disabled 单独保存并反射宿主属性；fieldset 回调的有效禁用与 Form／FormItem／Group 配置禁用叠加。内部输入及交互随有效状态禁用，上级恢复不清除自身禁用。上下文禁用不反写自身属性，以 null 提交且清空有效约束；原生自身／fieldset 禁用还由浏览器排除提交／校验。
- defaultValue 明确设置重置基线，首次程序值建立基线，动态 value attribute 更新默认和当前值；之后 property 只更新当前值。普通数组／对象默认值复制，保留 0／false／空串。原生 formResetCallback 和程序 reset 不发送用户事件、不广播上下文；取消原生 reset 不改变值，错误恢复与当前约束重算分离。Check 额外保存 checked 默认状态；indeterminate 作为 UI 状态恢复，不当作业务提交值。
- serializeFormState 使用版本化 JSON 字符串，提交 value 和恢复 state 分离；formStateRestoreCallback 接收 restore／autocomplete 模式，恢复业务值、UI 和原生提交。Check 另外编码 checked／indeterminate，Select 数组原样编码。默认支持可 JSON 表达的库字段状态，未知版本／非法字符串不覆盖当前值；不承诺 File、FormData、循环对象等任意对象恢复。
- 本轮在真实 Chromium DOM 中显式调用恢复回调验证两种模式；没有验证浏览器历史导航、密码管理器或系统自动填充自动触发回调。Safari／iOS／iPadOS 16.4 和 Firefox 仍未实机测试，不把处理函数验证当成最低设备兼容或自动填充保证。

### 原生约束

宿主 required／pattern／minlength／maxlength／min／max／step 被显式转换到原生 input 探测器；程序值也手动检查长度，不能依赖原生输入对用户编辑才执行的长度校验。InputNumber 使用 number 探测，日期范围按每端点检查，Check／组使用独立缺值钩子。有效性同步至 internals.setValidity，使用内部可聚焦输入／按钮作锚点；缺少适用输入的复合组没有伪造跨树锚点。readonly 暂不计算内容约束，disabled 不参与有效约束；willValidate 返回平台实际状态。业务 Validator 错误通过定向有效性通知显示，setValidity 手动状态另存至清理／重置。完整业务规则与原生错误整表融合仍留后续验证任务。

### 验证

FORM_TEST_CASE=native 配合现有 runner，Chrome 156 的 tests/form-native.browser.mjs 通过 63 项，包含先字段后提供者升级、各赋值入口、移动、目标 form 删除重建、有效禁用、重置／恢复／约束和跨控件序列化；errors 为空。原有 complete 23 项、inner 16 项、lifecycle 28 项回归通过。FormItem 专项真实浏览器 20 项作为 Node 测试之一执行；Check 普通协议测试 8 项。总组回归 285 项通过，lint、格式、库／声明和文档构建通过。

## 9. T333：Input 完整试点

Input 保留现有共享 CSSStyleSheet 和 readonly 实现，补齐动态 type／pattern／min／max／step／长度／inputmode／autocomplete 的内部原生属性同步。程序值先由同类型原生 input 规范化，非法 number／date 值不再出现 UI 为空但宿主和 FormData 提交原字符串的分叉；未改变合法 0／false 的默认值契约。长度限制只用于适用的文本类型；用户 badInput 通过单独钩子合并到 internals，不用重放字符串抹掉编辑态。

宿主 FACE 仍是唯一原生字段，内部 input 移除 name。内部 change 不再向外冒泡后又被宿主重复发送；程序赋值无用户事件，清空发送一次 composed input。清空控件改为 type=button 的原生按钮，带名称和焦点样式，激活后回到编辑输入；readonly／disabled 立即隐藏按钮，陈旧引用点击也不会改值。数字等不支持 selection API 的类型不再尝试 setSelectionRange。

同树原生 label 继续关联宿主，保留 labels 和 delegatesFocus，宿主 focus／blur 显式转发给内部编辑器。内部可访问名称按 aria-labelledby 引用文本 > aria-label > 原生 labels > FormItem label 建立文本桥接，不依赖跨 ShadowRoot IDREF 新能力；aria-hidden／hidden 装饰节点不纳入复制。观察器只观察已有命名源和局部父容器，卸载清理，覆盖局部 label 插入、文本修改及 for 改绑。容器之外新建或替换的引用源在 focus／宿主属性刷新时重读，不对 document 建全局观察器。aria-required 使用公共层已解析的有效 required，不另建布尔继承规则。未给宿主额外添加 textbox role，避免和内部编辑器人为建立两份编辑角色。

FORM_TEST_CASE=input 执行 scripts/check-form-owner.mjs：Chrome 156 tests/input-complete.browser.mjs 33 项通过，检查原生 label/control/labels、label 激活和程序焦点、命名桥接／隐藏装饰／动态改绑、事件次数、单条 FormData、动态只读禁用、非法值清洗、约束、重置和共享样式重挂载。native 63／complete 23／inner 16 项回归通过；285 项总组回归、lint、格式、库／声明和文档构建通过。

边界：浏览器测试使用真实 DOM 和显式事件／click，不是操作系统级键盘输入或屏幕阅读器录音测试；未检查完整平台 AX 树，不据此宣称 VoiceOver／NVDA 无重复播报或 Safari 16.4 已通过。清空按钮使用浏览器原生键盘激活语义，真实 Tab／Shift-Tab／Enter／Space 和 number 非法键入中间态仍需设备人工验收。主题视觉与现有共享样式未整体重写，本次不代替主题／辅助技术专项验收。

## 10. Form 信号依赖彻底清理

删除无引用的 form/types.ts（FormSignal／FormItemSignal），移除 Vite 中相应历史排除项。BaseComponent.emitInject 使用一般 Context 类型参数，不再导入 Signal；共享 utils 的 stopSignal 只声明普通清理函数签名，不再耦合 SignalStop。该兼容函数仍供 Collapse 使用，但 Form 的按需构建不会保留它，不存在替代 signal 的并行状态源。

新增 tests/form-no-signals.test.mjs：真实构建 Form／FormItem 及 13 个控件按需入口，检查解析模块图、外部导入、产物和源文件类型依赖。alien-signals 不能被改成 external 掩盖，也不允许重新引入 resetCtx／旧注入事件。执行 node --test tests/form-no-signals.test.mjs 即可独立检查。

边界：整个项目的 package.json 和 Vite external 仍保留 alien-signals，因为 Collapse 尚未迁移。全量总入口加载所有导出时仍可能加载 Collapse 的信号依赖；这不代表 Form 有依赖。测试表单无信号边界应使用表单按需入口；要让全量总入口也完全没有 alien-signals，还需完成 Collapse 迁移后再删除包依赖和公共 Signal 类型。此次不自动勾选 Collapse 任务。