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
- validateField(field:string|string[]): Promise<void>：只执行指定字段的规则，成功 resolve undefined，失败 reject Error，detail 为字段错误映射。
- clearValidate(): void：清错误展示及提交／触碰标记；底层真实约束仍可无效。
- setErrors(errorObj): void：保持直接设置展示错误，不受 emit-error 控制。后续提交重新执行规则；不得无期限阻塞而不定义清除策略。
- setValidateErrors(errs,all=true): void：emit-error 为真时发 validate-error {errors,all}，否则更新展示。all 保留 string|string[]|boolean 类型。
- addSchema、addSchemas、setSchema、setSchemas：SchemaType 参数和 void 返回不变，继续委托 Validator 的 add/set 含义，不擅自重定义为全量替换。
- FormItem.setRules({required?,rules?,message?}): void：按当前 prop 注册规则，更改 prop 时迁移，移除时注销，重挂载恢复。

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

getData 包含当前属于该 l-form 且有非空逻辑 name 的库字段和原生数据控件。它保留 disabled 字段及独立未选中 Check 的业务值，排除组内辅助子项、弹层输入和无名字段。独立 Checkbox／Radio 的业务 value 保留 token。Group 是一个逻辑字段。

只读取已关联字段的当前值，不持续维护第二份 _data。原生控件按实际类型读取 value／checked 等明确适配；关联在外的字段必须通过所有权协议纳入，不能全局查询猜测。注册表保存引用／适配方法，不复制每次值。新旧默认初始化差异在各控件迁移时固定。

### 原生提交与恢复规则

- 字符串：原样提交，包括空字符串；state 用带版本／控件类型的字符串编码保存默认外的当前 UI 状态。
- 数值：业务值保留控件实际 number|string 语义；提交有限值的十进制字符串，空输入保持空字符串而非 0；非法数值按控件校验拒绝，不提交 NaN／Infinity 字面量。
- 布尔：普通布尔业务值保留；Switch 用户交互得到 boolean 时提交 "true"／"false"，历史程序赋值保留字符串时按该字符串提交；不强制改成复选框“关闭即排除”。未选中的 Checkbox 省略提交条目，checked 和 token 分别保存。
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

- own disabled 单独保存并反射宿主属性；fieldset 回调的有效禁用与 Form／FormItem／Group 配置禁用叠加。内部输入及交互随有效状态禁用，上级恢复不清除自身禁用。上下文禁用不反写自身属性，省略提交条目并清空有效约束；原生自身／fieldset 禁用还由浏览器排除提交／校验。
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

## 11. 统一默认值／dirty／reset（取代此前首次赋值捕获契约）

生产源码已移除 _resetValue、defaultCaptured 和 checked 首次赋值捕获。FormInner.defaultValue 读写宿主 value attribute，经 parseDefaultValue／formatDefaultValue 转换；无 attribute 时由 intrinsicDefaultValue 明确缺省。setValue/property/用户编辑标记 dirtyValue，value attribute 或 defaultValue 修改仅在 clean 时同步当前值。reset 清 dirty 再应用最新默认值；卸载重挂载保留 dirty 与当前值，浏览器 restore 恢复当前状态也不改默认值。没有把旧缓存重命名为另一个默认快照。

文本 Input 与原生文本 input 对照：首次 property 不作为默认、clean 默认同步、dirty 默认不覆盖、attribute 移除、取消 reset、重挂载均验证；defaultValue 是字符串，defaultValue=0／false 分别反射为 "0"／"false"，当前 value property 仍保留既有合法业务值兼容。类型切换清洗当前值不应额外把 clean 变 dirty。

派生控件显式定义默认来源：Select 多选为字符串数组，沿用现有逗号 attribute 格式（不支持 token 内逗号或任意对象／数值类型无损往返）；Switch 转布尔、无 attribute 为 false；ColorPicker 无 attribute 为 #000000；SelectOri 无宿主 value 时按 options 的 defaultSelected／原生首个可选项，options 更新及重挂载不捕获 live selection；日期范围沿用逗号端点格式。渲染／initAttr 不再将 value attribute 重放为程序编辑，避免挂载意外 dirty 或覆盖预设 property。

Check.defaultChecked 直接反射 checked 布尔 attribute（checked="false" 依原生存在语义仍是 true），property/用户勾选只改变 live checked 并置 dirtyChecked。配置／组同步不 dirty；reset恢复当前 defaultChecked 并清 dirtyChecked，indeterminate 与原生一样不由 reset 清除。无 value 时 token 默认 on；组默认由组 value attribute 决定，组成员不独立重复收值。

reset 清除库业务错误及其展示，但保留 setValidity 手动设置的 flags／message，调用方需要显式 setValidity() 清除；required 等内容约束仍按恢复后的值重算。此规则同时适用于独立字段 reset 和原生 formResetCallback；取消原生 reset 不改变这些状态。浏览器状态恢复回调的既有错误处理策略不在此次 reset 修改范围。

验证入口：FORM_TEST_CASE=input 为文本原生对照；FORM_TEST_CASE=defaults 为复合默认值与 Check 原生对照；native／complete 为原表单回归。中文 Input/Form 使用说明已更新，英文待同步已登记。

## 12. T334–T339 控件表单验收

- MdInput 的业务值和提交值均为文本。InputNumber 从 attribute 恢复数字默认值，用户输入使用数字，兼容程序传入的有效数字字符串。清空后业务值为 `undefined`，提交空字符串。原生提交及约束统一使用解析后的数字，失焦与确认使用同一解析规则，步进按十进制精度消除常见浮点尾差。
- SelectOri 支持挂载前配置选项，原生表单仅提交已选且可用的原生选项。Select 用户点选、删除标签和清空先同步 `value`、标签及提交值，再发送一次 `{ value, labels }`。多选使用同名条目，业务数组保留元素类型及顺序。搜索框没有 name 或外部 form owner。
- CheckGroup 接收成员登记和状态变更，保留组业务值。仅有禁用项对应某个值时，原生提交省略该值。组仍是唯一提交者，组内选项只改变选中状态。独立 Radio 按 form owner 和 name 互斥，未选中项不进入 FormData。覆盖组后升级、成员重挂载、半选及上下级禁用。
- Switch 的关闭值为 `false`，原生提交 `"false"`，开启提交 `"true"`。`required` 要求开启。ColorPicker 将业务值和提交值统一成小写六位十六进制；无效值使用 `#000000`。内部原生颜色输入不独立提交。
- DatePickerOri 使用原生日期字段的值格式，区间用一个逗号分隔字符串提交。区间两端按宿主 min／max 与对端日期收紧可选边界，反向区间无效，重置清除待发 change。DatePicker 现有文本字段和日历面板验证了单条提交及重挂载，无新增日历选取能力。
- Upload 继续通过 `fileList` 和事件管理待传 File、进度和上传结果。`l-form.getData()`、原生 `FormData` 与表单重置不管理该列表。HTTP 上传仍使用自身的 multipart 请求，表单业务可另行读取已上传结果。

Windows Chrome 158 的 `native` 123 项、`defaults` 51 项及 `complete` 100 项通过。Check、Select、无 Signal 依赖及 Upload 相关 Node 用例共 164 项通过。

通过 Pixel 9 模拟器上的 Android 17 和 Chrome 155.0.8059.39 单独点按原生日期选择器。单日期从 `2026-11-17` 改为 `2026-11-21`，区间结束日从 `2026-11-25` 改为 `2026-11-20`。系统日历将早于区间开始日 `2026-11-17` 的日期标为不可选，两个选择都同步到输入框、change 事件及原生 FormData。iOS／iPadOS 及 Firefox 的平台验收见 T348。

## 13. T343 业务校验与原生有效性

- 业务校验结果写入字段的 `validity.customError`，与原生约束和手动 `setValidity()` 合并。重置清理旧业务结果和提示。`clearValidate()` 清理提示，保留实际有效性。已参与校验的值被程序修改时，相关字段的旧业务有效性失效，下一次原生提交可重新进入业务校验。
- `validateField()` 只执行指定字段的规则，跨字段比较仍读取依赖字段的当前值。用户编辑时校验当前字段和依赖它的字段；原生 `checkValidity()` 同步读取有效性状态。`novalidate` 跳过自动业务校验，显式调用 `validate()` 和 `validateField()` 仍执行。
- FormItem 的已注册规则按实例管理。属性修改、`setRules()`、改名、移除和重新挂载更新来源；同名规则可来自多个表单项或 Form 的公开注册方法。移除表单项只移除其贡献。`addSchema()` 保持追加，`setSchema()` 保持替换当前字段规则。
- 自定义规则沿用 utilane 的同步布尔契约。返回 Promise 时该字段报错并阻止业务提交，其他字段继续校验。

Windows Chrome 158 的 `complete` 124 项、`native` 123 项、`defaults` 51 项、`inner` 16 项、`input` 52 项及 FormItem 专项 20 项通过。覆盖异步规则安全失败、改值后重新提交、显式规则与同名表单项各自注销。另有相关 Node 测试 24 项通过。

## 14. T341 表单业务快照

- `getData()` 从当前 `form.elements` 同步取值。独立 `l-form` 的辅助表单接收同树内通过 `form` 属性显式关联的外置字段。复用外层原生表单时，仍按字段最近的 `l-form` 隔离。动态改名、关联变更和移除在下一次读取时生效。
- 已关联的原生 input、select 和 textarea 使用各自的 DOM 状态。复选框为布尔值、单选框仅取选中 token、多选 select 为字符串数组，文件为 `File`、`File[]` 或 `null`。库字段保持原业务类型和引用语义。按 DOM 顺序取同名字段的最后一个值，`__proto__` 按普通自有属性写入快照。多值字段的业务数组保留原形状。
- 快照读取与事件派发独立，程序赋值后立即可读。整表和指定字段的校验使用同一字段归属与取值规则，表单内部原生控件的 `input` 进入既有的字段及依赖重验流程。

Windows Chrome 158 的 `complete` 134 项、`native` 123 项和 `lifecycle` 28 项通过，另有上下文和无 Signal 依赖测试共 11 项通过。专项复现验证了外置库字段及原生字段进入快照，并确认 `__proto__` 保留字段值与原对象原型。

## 15. T342 表单提交与校验边界

- 独立 `l-form` 的辅助表单使用 `novalidate`。复用外层 `<form>` 时，由外层表单和实际提交按钮决定是否执行浏览器约束校验。`l-form[novalidate]` 控制该层的自动业务校验。
- `l-button` 通过临时原生按钮调用 `requestSubmit()`，传递 `formnovalidate`、`name` 和 `value`，调用结束后移除按钮。共用外层表单时，一次有明确归属的提交只交给发起的 `l-form`，外层按钮由外层表单处理。单个 `l-form` 仍支持在 `nativeForm` 上无参调用 `requestSubmit()`。
- 原生提交通过 `preventDefault()` 取消后，库不再派发业务提交。`l-input` 的 Enter 可以在冒泡阶段取消，未取消时使用该层归属的提交按钮。

Windows Chrome 158 的 `complete` 145 项、`native` 123 项、`input` 52 项和 `lifecycle` 28 项通过。Safari 从 16 起支持 [`requestSubmit()`](https://webkit.org/blog/12824/news-from-wwdc-webkit-features-in-safari-16-beta/)，本轮未运行 iOS／iPadOS 16.4 实机验证。

## 16. T344 表单项的标签与错误关联

- 单控件行可把标签用于原生字段及具有单个原生输入控件的库字段。点击标签直接聚焦编辑控件，不合成点击。多控件行和没有单一输入目标的复合控件使用分组语义，各字段保留自己的名称。
- 有明确目标的错误通过同树 `aria-describedby` 关联到字段，并保留用户提供的描述。无唯一目标的错误关联到整组。必填星号作为装饰排除在名称外，控件仍保留必填状态。每条错误使用一处描述关联。[W3C 表单通知指南](https://www.w3.org/WAI/tutorials/forms/notifications/)
- Windows Chrome 158 的 FormItem 专项 39 项、Input 52 项、提交 145 项、原生表单 123 项及生命周期 28 项通过。另检查真实无障碍树中的动态名称、必填状态、分组及错误描述，并验证实际点击标签只聚焦字段。iOS／iPadOS 16.4 VoiceOver 实机验证见 T348。

## 17. T345 错误展示与重置

- `clearValidate()` 清除提示和交互状态。已计算的业务有效性、原生约束和手动 `setValidity()` 继续由各自来源维护。再次报告无效时，表单项显示对应字段的错误。
- 表单在所属 DOM 树捕获 `invalid`，仅处理当前归属的字段。失焦或报告无效后，提示随字段有效性更新。库字段用独立的有效性变化事件通知状态变化。开启 `emit-error` 时，原生约束提示和恢复通过 `validate-error` 报告。
- 原生事件和 `l-form.reset()` 共用浏览器的重置流程。取消时保留原状态，成功时只清除重置开始前的错误。使用原生原型方法调用 `reset()`，支持名为 `reset` 的字段。

Windows Chrome 158 的提交 163 项、原生表单 123 项、默认值 51 项、Input 52 项、生命周期 28 项和 FormItem 39 项通过。上下文及无 Signal 依赖检查共 11 项通过。

## 18. T346 表单布局与旧上报状态清理

- Input 使用同一规则计算铺满状态。本地 `block` 和解析后的 `inner-block` 任一启用即可铺满。改变本地属性、表单项或表单配置时，都会重新计算。表单项的显式 `left`、`right` 和 `top` 生效，移除或清空 `label-position` 时恢复继承。
- 删除旧值上报标记及构造参数。CheckGroup 保持默认焦点委托，Select 继续显式关闭焦点委托。源码、JavaScript 产物和声明均已检查。生产按需入口及总入口具名导入表单模块的构建产物均无 `alien-signals`，Collapse 的依赖及公开兼容类型保留。
- Windows Chrome 158 的 480 项浏览器检查及 21 项 Node 回归通过。浏览器测试覆盖本地与继承的铺满设置、标签布局切换、`prop` 到 `name` 的更新和组状态同步。

## 19. T347 浏览器回归与报告

- 生产组件回归覆盖独立 `l-form`、两个外层原生表单和重新创建的内部辅助表单之间的迁移。每次迁移核对字段归属及用户节点，验证旧 owner 的提交和重置与当前表单解耦，并检查同一 owner 上反复挂载后原生提交和重置各触发一次。取消重置保留字段值与提示。
- 设置 `FORM_TEST_BROWSER` 后，通过 `node scripts/check-form-owner.mjs` 运行套件。`FORM_TEST_CASE` 支持 `owner`、`lifecycle`、`inner`、`complete`、`native`、`input`、`defaults`，未设置时运行 `owner`。各套件写入独立的 `.artifacts/form-<套件>-result.json`。未知或空的套件名在启动浏览器前返回失败。
- Windows Chrome 158 的套件共 465 项，加上 FormItem 专项 47 项，共 512 项通过。Node 测试 25 项通过。运行 `defaults` 后，`owner` 报告的内容保持一致。最低设备和其它浏览器的验收见 T348。

## 20. T357 无信号依赖消费门禁

- 组件依赖由使用者显式导入／注册；消费示例手动准备 Radio、RadioGroup、FormItem 和所需图标。单独导入 Theme 不自动注册其依赖属于现有使用约定，不作为本项失败。
- `node scripts/check-form-signals.mjs` 要求设置 `FORM_TEST_BROWSER`，先重建库与声明，再执行源码边界、真实 tarball 解包后的独立消费构建和浏览器回归。未设置浏览器时直接失败；单独运行 `tests/entries.test.mjs` 时标为跳过的浏览器用例不算完整门禁通过。

```powershell
$env:FORM_TEST_BROWSER = "C:/Program Files/Google/Chrome/Application/chrome.exe"
node scripts/check-form-signals.mjs
```

- 源码检查包含 Theme 和全部表单相关入口，递归构建第三方依赖，不把 utilane external 后忽略其依赖。发布产物另检查 18 个按需入口及共享 chunk；11 组独立消费分别覆盖 Form、FormItem、Input、两种 Group、表单组合、Theme 和总入口具名导入。按需图和最终产物均无 `alien-signals`；总入口具名导入允许构建器解析尚未裁剪的 Collapse，但最终 bundle 不得保留 signal 模块。
- 全量注册作为阳性对照，仍保留 Collapse 的 signal 运行时。包内依赖声明和公开 `Signal`／`SignalStop` 类型兼容导出保留，类型入口实测可用；类型导出不会生成运行时引用。本项不代表 T360 全库卸载门禁完成。
- Group 随成员登记直接处理最近组的子项变化，阻止其向组冒泡后再发送组事件，避免外部监听器因添加时机或重挂载顺序收到子项与组的两份变化；子项自身监听器仍正常执行，成员注销和组卸载时清理内部监听。Theme 阻止内部控件的 change 外传，仅发送主题字符串；已经卸载或重挂载的旧异步切换不再补发事件。
- 2026-11-18，Windows Chrome 158.0.8127.37 的真实消费浏览器 38 项通过，覆盖文本／图标 Theme、下拉和开关风格、禁用、键盘、挂载前监听、子项自身监听、反复重挂载、嵌套组、程序赋值和表单组合。控制台无异常。新增浏览器回归已先在修复前确认失败，再在修复后通过。
- 完整门禁 7 项、相关 Node 回归 30 项通过；原生表单 123 项、完整流程 172 项、默认值 51 项回归通过。`pnpm lint`、`pnpm fmt:check`、`pnpm lib:build`、`pnpm docs:build` 通过，文档构建保留体积提示。入口文件检查改为比较源码与 tarball 的完整文件列表，不再写死 91；源码模块回归使用与构建相同的 TS 转换，支持参数属性。本项未执行 iOS／iPadOS 16.4 或其他浏览器验收，T348 保持独立。

## 21. T348 兼容性与浏览器恢复验收

2026-11-18，用户将本项调整为：iOS／iPadOS 16.4、Safari、Firefox 和 VoiceOver 只做源码、API／ARIA 与产物兼容审查；触摸只查相关 API／原生交互入口，不要求真机操作。浏览器自动恢复和自动填充仍需实际触发。本节取代此前 T348 的设备实测前提，不改变其他任务的验收范围。

- 核心 API 的静态判断通过。ElementInternals 的提交、有效性、form／labels 等能力由 Safari 16.4、Firefox 98 提供；构造 CSSStyleSheet、replaceSync 和 adoptedStyleSheets 由 Safari 16.4、Firefox 101 提供，requestSubmit 在 Safari 16 已可用。源码未依赖更晚的 CustomStateSet、跨树 ARIA 引用或 referenceTarget。参考 [ElementInternals 兼容数据](https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/ElementInternals.json)、[样式表兼容数据](https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/CSSStyleSheet.json)和 [Safari 16.4 发布说明](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)。
- 对当前按需入口的实际递归依赖图共 72 个 JavaScript 模块，比较 Oxc 的 esnext 与 safari16.4 转换结果，无额外语法转换差异或解析错误。这是当前产物的静态结果，不等于将现有 esnext 构建配置改成了长期最低版本门禁。28 项 API／类型兼容记录位于本机 `.artifacts/t348-compat-result.json`。
- 名称和错误采用内部原生控件、aria-label／aria-required／aria-invalid，以及同一 ShadowRoot 内的 aria-describedby；未依赖新式跨树引用，隐藏描述被明确引用的做法符合[可访问名称与描述规范](https://w3c.github.io/accname/#computation-steps)。标签点击同步调用 focus，避免把移动端聚焦依赖放到异步用户激活之外。本项只给出代码符合性判断，不宣称 VoiceOver 实际播报结果。
- 表单的主要触控入口为原生 input／button 和 click／input／change；选择、勾选、开关、步进及文件选择有点击入口，不要求为普通点击再绑定 touchstart。[click 支持触摸激活](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)。拖放、hover 辅助 UI 不据此宣称已做触摸体验验收。
- 原生日期类型按用户确认的既定设计保留：DatePickerOri 直接把 type 交给原生 input，不新增自定义选择器回退。week 在 iOS／iPadOS 16.4 不受支持，兼容数据记录从 18.2 起支持；macOS Safari／桌面 Firefox 也没有 week 原生选择器。month 在 iOS 可用，但 macOS Safari／桌面 Firefox 缺少对应原生 UI。回退为 text 时，依赖原生类型的格式和 min／max 约束不能视为已经覆盖。参考 [week](https://github.com/mdn/browser-compat-data/blob/main/html/elements/input/week.json) 和 [month](https://raw.githubusercontent.com/mdn/browser-compat-data/main/html/elements/input/month.json) 兼容数据。这是已接受的原生能力边界，不作为本次修复项。

实际恢复／填充使用隔离临时配置的 Chrome 158.0.8127.37 与虚构数据，运行脚本为本机 `.artifacts/t348-state-audit.mjs`；没有读取用户保存的地址或凭据，也没有手动调用恢复回调来冒充自动行为：

- 正常启用往返缓存时，离开后返回得到 pageshow.persisted=true，页面 DOM 和字段值被保留，恢复回调为 0 次，这是缓存保留路径。
- 关闭往返缓存以强制重新创建文档时，离开后通过历史返回得到 back_forward 导航，浏览器自动调用了 15 次 restore 回调。文本、独立勾选、组、数字、开关、原生选择、颜色、日期及辅助 form 字段的界面值、业务值和 FormData 均与离开前一致。结果在 `.artifacts/t348-state-result.json`，缓存路径在 `.artifacts/t348-bfcache-result.json`。
- 通过 Chrome 官方开发协议 Autofill.trigger 调用真实地址填充引擎；普通原生输入作为阳性对照，随后填充 l-input 内部的 5 个原生输入。姓名、邮箱、街道和邮编均进入原生 autofill 状态，界面、业务值和 FormData 同步，每个字段只有一条提交记录。没有直接给目标字段赋值来代替填充。宿主自定义元素作为填充目标返回 Field not found，未观察到 autocomplete 模式的 FACE 回调；已通过的是内部原生输入路径，不是宿主回调或密码管理器集成。Safari 16.4 的 FACE autocomplete 也不能承诺支持，见 [WebKit 的恢复说明](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/)。

首次校验发现密码进入恢复 state，现已修复并完成负向验收：Input 的 password、MdInput 的 html-type=password 显式将恢复 state 设为 null，提交值仍保留；文本字段运行时改成密码字段也清除可保存的 state。旧历史密码 state 不再重放，浏览器提供的 autocomplete 文本仍可更新界面和提交值。往返缓存保留活页面由浏览器负责，不通过清空密码破坏已有页面状态。

Input 和 MdInput 均提供 autocomplete attribute／property，支持动态修改、移除、组件定义前赋值和重挂载；MdInput 的 htmlType property 同步 html-type 和内部输入类型。autocomplete 模式可接收纯文本，并保留已有版本化状态的兼容处理；不由代码伪造浏览器的宿主回调。Preact 对应类型和中文示例已更新，T033／T034 依翻译约定重新打开并登记待同步内容。

可重复验收命令如下，脚本会创建隔离的临时浏览器配置，不读取用户保存的信息：

```powershell
$env:FORM_TEST_BROWSER = "C:/Program Files/Google/Chrome/Application/chrome.exe"
node scripts/check-form-state.mjs
```

- 正式 fixture 覆盖原生 form、l-form 辅助 owner、Input／MdInput 静态和动态密码字段、普通字段和组。加入 Form 级配置后，强制重建文档的恢复路径与正常往返缓存路径当前各 44 项通过，报告分别为 `.artifacts/form-state-restore-result.json` 和 `.artifacts/form-state-bfcache-result.json`。密码未进入恢复 state，仍正常提交；重新创建文档后密码为空，缓存返回保留活页面。
- 两条路径都用 Chrome 的真实 Autofill 引擎验证 Input 和 MdInput 各 5 个配置字段，包含原生输入阳性对照、autofill 状态、可信 input 事件、业务值与单条 FormData。直接调用回调的用例只验证原始文本、旧状态格式及拒绝密码历史状态的处理逻辑，不计作真实填充或自动恢复证据。宿主 autocomplete 回调的触发仍受浏览器支持限制。
- Chrome 158.0.8127.37 的 Input 63 项、默认值 60 项、原生表单 123 项、完整流程 172 项、公共层 16 项，以及 38 项实际包消费浏览器回归通过；相关 Node 回归 33 项、打包与类型门禁 7 项通过。实际 tarball 验证包含 autocomplete 类属性和 Preact JSX，72 个发布依赖模块重新静态核对 Safari 16.4 语法无额外转换差异。
- `pnpm lint`、`pnpm fmt:check`、`pnpm lib:build`、`pnpm docs:build` 通过。docs:dev 的 `/litos-ui/components/input` 和 `/litos-ui/components/md_input` 已实际打开，演示字段的 autocomplete 和类型正确透传，控制台无错误。T348 按调整后的范围完成，不将此结论描述为 Safari／Firefox／VoiceOver 的真机实测或宿主原生自动填充回调保证。

### Form 级 autocomplete 补充

Form 现在提供 autocomplete attribute／property，接受 on／off；未设置时沿用原生祖先 form 的默认配置。FormInner 中的 Input、MdInput、InputNumber、Select 的过滤输入、SelectOri、Check、颜色和日期输入统一使用表单默认值，字段显式配置优先，移除字段配置后恢复继承。直接写在 l-form 内的原生 input／textarea／select 同样继承，修改配置不改变字段值、默认值或发出用户输入事件。开关、文件选择等没有原生自动填充能力的控件不因此获得填充能力。

- `FORM_TEST_CASE=autocomplete` 的浏览器回归 40 项通过，报告为 `.artifacts/form-autocomplete-result.json`；覆盖各类控件、日期区间重建、原生字段、同值显式覆盖、属性移除、定义前赋值、动态加入、跨表单移动、移出、卸载重挂载和共享原生表单隔离。只写自身拥有的辅助 form 配置，不修改共享原生祖先 form。
- 恢复／填充用例新增 3 个未配置字段提示的控件，仅由 Form 的 on 默认值驱动真实 Autofill；另 10 个显式配置字段在 Form 默认 off 时仍保留各自提示，业务值、界面和单条 FormData 一致。两条路径各 44 项通过。
- Input 63 项、默认值 60 项、原生表单 123 项、完整流程 172 项、公共层 16 项、实际包消费浏览器 38 项、Node 回归 33 项、包消费与无 signal 门禁 7 项均通过。发布类型验证增加 Form、继承该属性的 InputNumber 及 Form 的 Preact JSX；18 个表单相关入口的当前递归图 76 个 JavaScript 模块经 Oxc 静态比较无 Safari 16.4 额外语法转换，报告为 `.artifacts/t348-form-syntax.json`。
- lint、格式、库构建和文档构建通过。实际打开 `/litos-ui/components/form` 并操作默认值选择器，姓名与电话从 on 跟随切到 off，邮箱仍为 email，控制台无错误。中文 Form／Input／MdInput 文档已更新，英文差异登记在 TRANSLATION_GUIDE.md，T042 重新打开，T033／T034 保持待同步。

## 22. T349 API 文档补齐

2026-11-18 按用户后续范围处理：只补齐审计第 4 项的 API 遗漏，不新增全字段演示；兼容及关联边界说明、动态字段演示和业务值／提交值对照等第 1～3 项暂缓。T349 保持未勾选，不将暂缓项描述为已经完成。

- Form 文档补齐 label-height／emit-error、nativeForm／validationErrors／validator、reset／submit／setValidateErrors 和四个 Schema 方法，注明追加与替换的区别，并提供 SchemaType 字段表。FormItem 补齐 disabled／标签尺寸和 setRules 方法表。
- 新增通用表单控件 API 表，集中说明字段名、显式 form、默认值、禁用、约束、填充配置、原生有效性和重置等已有能力。Radio／Checkbox 补充 checked／defaultChecked，Group 补齐 name／disabled／required／gap／form，并链接通用 API；Form CSS 变量表替换原有空占位。
- 与源码及已有声明核对：Form 9 个配置属性、5 个公开属性和 12 个业务方法，FormItem 12 个属性及 setRules；通用控件 14 个非全局属性、10 个公开属性、9 个方法，两种 Group 各 6 个属性及勾选控件的选中属性均有对应文档。相关三页共 26 个表格的紧凑格式、忽略标记和单元格结构通过检查。15 项静态核对结果见本机 `.artifacts/t349-api-result.json`。
- `pnpm lint`、`pnpm fmt:check`、`pnpm docs:build` 通过。构建页面包含新增 API 表和公共锚点，Radio／Checkbox 链接正确；llms 内容由构建自动更新，未手改生成物。本次只修改文档和维护记录，未修改运行时代码，未新增行为测试。
- 英文现有正文保留，差异合并登记在 TRANSLATION_GUIDE.md；T036／T037 重新打开，T042 保持待同步，不提前完成 T350。

## 23. T351 构建与发布校验

2026-11-18 在 Windows NT 10.0.26300、Node 26.1.0、pnpm 12.5.1、npm 11.13.0、TypeScript 7.0.2、Preact 11.2.0 和 Chrome 158.0.8127.37 下验证。初次验收发现发布包的 Preact 声明缺项和 Theme 快速切换异常。修复与复验结果见下文。

```powershell
pnpm lint
pnpm fmt:check
pnpm lib:build
pnpm docs:build
npm pack --dry-run --json --ignore-scripts

$env:FORM_TEST_BROWSER = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
node --experimental-vm-modules --test --test-concurrency=1 `
  tests/entries.test.mjs tests/module-effects.test.mjs tests/form-no-signals.test.mjs `
  tests/form-context.test.mjs tests/form-platform.test.mjs tests/form-owner-runner.test.mjs `
  tests/form-item.test.mjs tests/check-form.test.mjs tests/input-readonly.test.mjs `
  tests/styles-tree-shaking.test.mjs tests/select-text.test.mjs tests/button-docs.test.mjs `
  tests/upload-docs.test.mjs scripts/docs-llms.test.mjs

foreach ($case in @('owner', 'lifecycle', 'inner', 'complete', 'native', 'input', 'defaults', 'autocomplete')) {
  $env:FORM_TEST_CASE = $case
  node scripts/check-form-owner.mjs
}
node scripts/check-form-state.mjs
```

- lint、格式、组件库及声明构建、双语文档构建通过。文档构建有资源分块体积提示，构建仍成功。
- 库构建后用 `npm pack --dry-run --json --ignore-scripts` 核对 497 个文件、92 个按需 JavaScript 入口及其声明。正式 `npm pack --json --ignore-scripts` 生成的 litos-ui-0.23.1.tgz 与预览文件列表一致。总入口、公共声明、Preact 声明、所需 CSS 和实际依赖的内部模块均包含。表单内部模块未生成独立注册入口。
- 在临时 npm 项目运行 `npm install --offline --ignore-scripts --no-audit --no-fund <tarballs>`，实际安装库 tarball 和本地依赖版本打成的四个 tarball。使用 TypeScript 的 `strict`、`noUncheckedSideEffectImports`、`jsx: react-jsx`、`jsxImportSource: preact` 验证总入口、按需类及基础 TSX。Vite 生产构建保留显式注册和 CSS `sideEffects`，同一入口混用总入口与按需入口时排除 Collapse、Upload 和 alien-signals。共享样式的实例复用和未使用样式裁剪通过现有用例。
- 在已安装包中逐项验证 Preact 属性，23 个已支持属性缺少声明。`l-form` 缺 `inline`、`emit-error`、`label-height`。`l-form-item` 缺 `disabled`、`label-position`、`label-width`、`label-height`、`inner-block`、`error`、`verify`。两个 Group 各缺 `name`、`disabled`、`required`、`form`。`l-input` 缺 `form`、`required`、`disabled`，`l-md-input` 缺 `form`、`required`。其中 FormItem 的 `disabled` 和 Group 的 `name` 在直接编写 TSX 标签时也报错。
- 相关 Node 测试并行首轮 81／82，失败项是打包消费的 Theme 回归。串行复测 82／82，包含实际 Chrome 的 38 项打包消费和 47 项 FormItem 验证。另用已构建的 Theme 入口复现，同一轮连续触发两次切换得到两次 `change("dark")`，并出现未处理的 `AbortError: Transition was skipped. New ViewTransition started`。
- 八套表单浏览器场景最终各自通过，共 525 项。并行首轮的日期区间重建断言失败，独立运行 autocomplete 三次均为 40／40。该断言以固定等待读取按动画帧更新的编辑器，现有证据显示有时序不稳定，尚未确认产品功能回归。真实浏览器历史恢复和自动填充两条路径均为 44／44。本轮运行环境为本机 Chromium。

### Theme 连续切换修复

Theme 内部 SelectOri、Switch、RadioGroup 和 Radio 的 `change` 留在 Theme 的 Shadow DOM。主题实际变化时，由 Theme 发出一次携带主题字符串的 `change`。同一文档在过渡开始前合并连续请求，按最后的选择应用主题，已开始的动画无需因新的选择而重新启动。

实际包的 Chrome 消费回归 45 项通过。覆盖快速连点、同一选项重复触发、外部捕获监听只收到 Theme 事件以及卸载重挂载，控制台无错误。`node --test --test-concurrency=1 tests/entries.test.mjs tests/form-no-signals.test.mjs` 的 7 项门禁通过。按用户要求保留现有 Preact 声明。

### T351 复验结论

- 在上述环境重新运行 lint、格式检查、库与声明构建、双语文档构建，全部通过。文档构建仍有分块体积提示。
- 重新核对 `npm pack --dry-run --json --ignore-scripts` 与实际 tarball 的文件清单。497 个文件和 92 个按需入口通过核对。独立临时项目离线安装库及所需依赖后，总入口和按需入口、现有 Preact TSX 用法与生产构建通过。显式注册和 CSS 保留，未使用的组件及表单图中的 alien-signals 被裁剪。已知 Preact 属性声明缺项按用户确认保留。
- 串行 Node 测试 82／82，包含 Chrome 的 45 项打包消费回归和 47 项 FormItem 回归。八套表单浏览器场景 525／525，历史恢复和自动填充两条路径各 44／44。日期区间重建用例本轮通过，另在 Chrome 等待实际动画帧后验证 24 次单值和区间互切，确认每次新创建的输入均继承当时的 Form 配置。

T351 按当前确认范围验收通过。

## 24. T352 文档预览校验

- 2026-11-18，在没有 `lib/` 的临时源码副本启动 `docs:dev`，再运行 `docs:build` 和 `docs:preview`。Chrome 中实测中英文 Form 入口往返、既有 `l-form` 必填校验和重置、原生 `form` 的按钮与 Enter 提交和重置、自定义错误、标签对齐和自动填充提示切换。Input 解析、InputNumber 步进和 CheckboxGroup 选择可操作。两个预览均核对了默认蓝、翡翠绿、珊瑚红、活力橙及暗黑切换，所查页面的控制台无警告或错误。
- 动态新增和移除字段通过。改名前，`getData()` 与 `FormData` 均各自只包含一份字段数据，`submit` 只发出一次并带有正确的 `detail`。以 `value` attribute 设置的默认值可用重置按钮恢复。
- 两种预览均观察到，Vue `v-if` 插入的必填 `l-form-item` 把 `prop` 从 `extra` 改成 `renamed` 时，继承字段名的 `l-input`、`getData()` 和 `FormData` 仍使用 `extra`。填写过的字段触发新名的必填错误，提交被拦截。用户确认按每行 `prop` 固定的用法验收，运行时改名暂不视为缺陷。
- 文档构建成功并生成中英文各 49 页。双语索引、全文和 Form 页面 Markdown 均包含本轮相关更新，核对了原生表单、统一自动填充、通用控件 API 和 `validateField()`。`scripts/docs-llms.test.mjs` 通过 10 项。构建有资源分块体积提示。

T352 按用户确认的范围验收通过。

## 25. T359 发布前验收汇总

- 在当前源码副本复跑 Windows Chrome 158 的 8 套表单回归，525 项全部通过。覆盖原有写法、归属与重挂载、业务校验与错误展示、`getData()`／`FormData`、提交及重置。T352 已实测中英文开发与构建预览，按每行 `prop` 固定的用法验收，动态增删通过。
- 当前源码的无信号依赖门禁通过。下表四种表单按需组合均移除 `alien-signals` 的传递运行时依赖。全量注册仍因 Collapse 保留该依赖，符合 T360 的条件。
- 用户确认 T359 的 iOS 16.4 验收仅核对核心表单 API 兼容性，实测暂缓。沿用 [T348 的 API 兼容性核对](#21-t348-兼容性与浏览器恢复验收)。Chrome 的历史恢复与自动填充两套实测各通过 44 项。
- T350 已同步 13 个表单相关英文页面，翻译清单无本轮表单待同步项。T349 暂缓的文档扩展、T351 已接受的 Preact 声明缺项、T348 已接受的原生日期选择器平台边界及 T352 运行时改名边界均按原范围保留。

### 迁移前后体积对比

基线取表单迁移提交 `4df0291` 的父提交 `314e057`，与当前工作区源码分别构建。两份源码使用同一组已锁定的依赖和构建工具，包括 Node 26.1.0、Vite 8.3.8 和 utilane 1.2.0。消费端沿用 `tests/entries.test.mjs` 的 ES 库模式和 `minify: true`，统计所有 JavaScript chunk 拼接后的字节数及其 gzip 体积。独立全局 CSS 未计入下表。

<!-- prettier-ignore -->
| 消费场景 | 原始字节数（迁移前 → 当前） | gzip 字节数（迁移前 → 当前） | gzip 增量 |
| --- | --- | --- | --- |
| Form + FormItem | 26,860 → 72,575 | 7,666 → 18,155 | +10,489 B |
| Input | 21,815 → 36,765 | 6,590 → 10,127 | +3,537 B |
| Form + FormItem + Input | 37,361 → 83,658 | 10,173 → 21,196 | +11,023 B |
| 表单控件组合 | 102,061 → 162,462 | 24,255 → 38,508 | +14,253 B |
| 总入口全量注册 | 335,687 → 408,079 | 83,254 → 101,812 | +18,558 B |

组合场景包含 Form／FormItem、Input／MdInput／InputNumber、两种 Select、Radio／Checkbox 及其 Group、Switch、ColorPicker、DatePickerOri 和 Button。完整模块图和场景入口见本机 `.artifacts/t359-size-report.json`。

增加的模块主要包括原生表单归属、有效性和业务规则、值序列化与恢复、自动填充及无障碍处理。模块图显示，仅使用 Form／FormItem 时，对 `FormInner` 的实例判定也会保留该基类，这是可能进一步裁剪的路径。全量对比还包含两个版本之间的非表单改动。

T359 按用户确认的范围验收完成。

## 26. T379 Check 与 CheckGroup 现状盘点

- 对照迁移前提交 `314e057`。旧 `CheckGroup.values` 是可调用的 `Signal<string[]>`。子项通过冒泡的 `check-context-request` 取得 signal，再由 `effect()` 根据 token 更新选中状态。旧 `FormInner` 另用 `form-context-request`／`form-item-context-request` 获取字段配置、错误与重置 signal。组在插槽所在的 ShadowRoot 监听子项 `change`，更新组的 `value` 并发出组事件。旧组提供者没有截断向外的上下文请求，源码无法确认嵌套组有隔离保证。
- 当前 `Radio`、`Checkbox` 继承 `Check`，`RadioGroup`、`CheckboxGroup` 继承 `CheckGroup`，两个基类均继承 `FormInner`。`values` 现为已解码的 `string[]`，按值整体更新。`FormInner` 分别请求 Form、FormItem 和最近 Group，并登记字段、接收定向配置和处理原生表单关联。内部 `input` 负责焦点、激活和选中表现，表单提交由宿主的 ElementInternals 负责。独立选项按自身 `checked` 提交，分组提交由组负责。
- Chrome 验证了两种组的直属选项、普通 HTML 包装、同类嵌套组及独立选项。内层选择只更新最近的组，外层状态保持。子项监听可收到带 `value`、`name`、`checked` 的事件，组在子项处处理后发出自己的 `change`。组的普通监听可收到冒泡的内层组事件，捕获监听可先观察到子项事件。单选组 `detail.value` 为字符串，多选组为字符串数组。程序赋值样例更新选择且没有触发用户 `change`。
- 中英文 Radio／Checkbox 文档的基础用法、组示例和事件参数与上述常规用法相符。两种 Group 的发布入口实测只注册组本身，组成员按既定约定显式导入。双语示例已显式导入，但通用文字仍说会注册内建依赖。Theme 的 radio 模式使用 Shadow DOM 内部的 RadioGroup，实际消费测试确认外部只收到 Theme 的 `change`。站内 `CustomTheme` 在源码中通过组的 `value` 初始化，并在组事件中读取目标的 `value`。
- 四个派生类均有总入口导出和独立按需入口。TypeScript 7.0.2 按仓库的 Bundler 解析方式核对了实际生成声明。`getChecked()`、`setChecked()`、`defaultChecked` 和两种 Group 的 `values: string[]` 均可用，旧 `values()` 调用已无对应签名。`Radio`／`Checkbox` 的 `checked` property 在运行时可读写，两套类声明均缺少它。Preact JSX 有 `checked`，两种 Group 的 `name`、`disabled`、`required`、`form` 声明仍缺，沿用 T351 已确认的处理范围。
- 构建与声明生成成功。Check、上下文、无信号和发布包套件共 27 项通过，其中发布包的 Theme／Group Chrome 回归包含 45 项。此外，Windows Chrome 158.0.8127.37 对上述归属、事件和属性做了 18 项独立核对，控制台无异常。T379 的盘点完成。

## 27. T380 Check 状态和值事件契约

在 Windows Chrome 158.0.8127.37 下用相同样例对照迁移前提交 `314e057` 与当前源码，各运行 9 个场景。当前源码的 Check 单元测试 10 项、Chrome 原生表单 123 项及默认值回归 60 项通过。对照数据见本机 `.artifacts/t380-contract-report.json`。

### 当前用法与明确的迁移差异

- 独立项以 `checked` property 表示当前选中状态，`checked` attribute 或 `defaultChecked` 提供重置默认值。迁移前独立项同时设置 `value` 和 `checked` 时，空组 effect 会覆盖选中状态，当前已修复。组初始化及同步以组 `value` 为准，子项的 `checked` attribute 不覆盖组选择。程序控制组选择使用 `group.value`，`value` attribute 作为默认值。用户操作更新当前值，保留默认值；此前组交互还会写回 attribute。
- RadioGroup 的常规 `value` 和 `change.detail.value` 是单个字符串。CheckboxGroup 的 `value` 保留逐项编码后用 `&` 拼接的字符串格式，`change.detail.value` 保留解码后的字符串数组。普通赋值、默认值更新、重置与结构变化均未发出用户 `change`。一次实际选择触发一次所属组事件。重新点选已选 Radio 不再重复发出 `change`。子项 `detail` 继续包含 `value`、`name`、`checked`，其中 `checked` 现报告该次操作的结果，旧组子项曾报告操作前的状态。
- 多选编码现可往返 `a&b`、`100%` 和中文。迁移前用户选择时直接拼接字符串，会拆开带 `&` 的值，并可能因未转义的 `%` 抛出 `URIError`。当前旧字符串中的非法转义片段按原文读取，解码后相同的 token 只提交一次。RadioGroup 的值为单个原始字符串，包含 `&` 时原样保留。
- 未设置选项 `value` 时使用 `on`。程序赋值的 `0`、`false` 保留为组件的业务值，匹配、选项事件和原生提交采用字符串 `"0"`、`"false"`。`null`／`undefined` 的组选值表示无选择。独立选项可提交显式空字符串，与未选中时省略条目相区别。
- 移除或改动已选项的值时，组保留配置的选中 token。改值后的选项按当前组值重算，移入另一组时使用目标组的值；原 token 的选项重新插入时可恢复选中。将已选项移到组外时，当前选中状态保留。浏览器对照中，这些结构变更均未发出组 `change`。

### 修复前的实测边界

- 组值 `""` 表示未选中，与只有一个空 token 共用表示。单独点选空值项会发出组事件，但该项不会保持选中；多选还有其他项时空 token 可以共存，移除最后一个非空 token 后空选项随之清除。重复选项值共享选中状态与一个提交 token，RadioGroup 中两个相同值也会同时显示为选中。
- 直接写组内子项的 `checked` 或调用 `setChecked()` 能改变该项界面，但不会更新组 `value` 或提交数据。下一次应用组配置时，选中状态重新按组值计算。
- 删除、改值或跨组移动可让原组没有匹配的可见选项。当前代码仍保留并提交组配置中的原 token，`required` 也仍通过。这个结果与保留配置以等待迟到选项是两个验收点，后续动态关联和提交校验分别由 T385、T388 跟踪。

T380 的状态、事件和兼容差异已记录。

### 空选项、组状态和提交修复

- 单选组以 `null` 表示无选择，空字符串可匹配空值选项。旧版恢复状态中的空字符串仍按无选择读入。多选组用 `&` 表示仅选择一个空值项，空字符串仍表示无选择，普通值保持既有编码。同值单选项只保留一个具体的选中项。
- 分组时由组 `value` 决定成员的选中状态。直接写入组内选项的 `checked` 或调用 `setChecked()` 不影响界面、组值和提交数据。用户操作由组更新选中状态并发送 `change`。程序修改组 `value` 保持静默。独立选项仍可设置 `checked`。
- 组保留配置值供重新插入的选项匹配。原生 `FormData` 和必填校验只匹配当前关联且可用的选项。`l-form` 的 `getData()`、业务校验及提交快照也过滤无匹配的组值，仍可读取已禁用的匹配选项。
- Chrome 158 的原生表单回归 151 项通过，含空值、同值单选、程序赋值、移除／改值／移动／重插和 `l-form` 提交。其余表单回归、恢复与往返缓存各 44 项、相关 Node 与发布包测试 27 项、lint、格式、组件库及文档构建均通过。日期自动填充原用例的固定时间等待有时序波动，等待实际渲染帧后 63 项通过，包含 12 次单日期和区间互切。中英文同步状态见翻译指南。
- 2026-11-19 按用户确认恢复组 `value` 对选中状态的控制。Chrome 原生表单、默认值和完整流程共 385 项通过，覆盖两种组内的直接 `checked` 赋值、组值赋值、点击、空值、重复值及失效值过滤。Node 与发布包测试 27 项、lint、格式、库及文档构建通过。文档构建仍有既有的分块体积提示。

## 28. T381 选项提交责任与体积基线

### 提交和校验责任

- 独立项通过宿主的 `ElementInternals.setFormValue()` 按自身 `name` 提交。选中时提交选项值，省略 `value` 时使用 `on`。未选中或禁用时省略条目。独立项按自身约束检查有效性，重置按 `checked` attribute／`defaultChecked` 恢复。内部 `input` 负责交互，没有提交名称。
- 组统一以自身 `name` 提交和校验。单选组提交一条，多选组按选中值分别提交同名条目。组内选项声明的 `name` 和 `required` 属性无额外提交条目和必填错误。子项自身禁用状态和组／`fieldset` 的禁用状态叠加。原生 `reset()` 按组的 `value` attribute／`defaultValue` 恢复选择，无额外 `change`。实测组必填只发出一次组 `invalid`，`l-form` 中 `FormItem.prop` 给组提供名称，自定义规则也只执行一次。
- 独立 Radio 的相同非空 `name` 和相同原生 form owner 构成互斥范围。无 owner 时，互斥范围是同一 DOM 根中的同名独立项。内部 Radio 分属不同 ShadowRoot，宿主显式协调选中状态。Chrome 验证了同表单互斥、跨表单隔离、无 owner 的跨 ShadowRoot 隔离及跨 form 移动后的新组互斥。

### 修复前校验发现

- 在 HTML 中将 `required` 写在 `name` 前，独立 Radio、Checkbox 和两种组的 `name` 会被移除，已选值未进入原生 `FormData`。两种组的对照样例只交换这两个属性的顺序，`name` 写在前面时可提交。受影响样例的选中状态及 form owner 正常。
- 同名独立 Radio 已有选中项时，移除、改名或跨 form 移动该选中项，会留下旧表单的必填有效状态。`FormData` 已排除旧值，原生 `form.checkValidity()` 仍返回 `true`。移除和改名路径中，读取留在原表单的必填 Radio 的 `validity` 后，整表才返回无效。原生 `input type="radio"` 对照在移除后立即返回无效。
- 2026-11-19，修复前 Chrome 158.0.8127.37 专项校验 36 项通过 29 项，7 个失败用例对应上述两类问题，控制台无异常。原生表单常规回归 153 项、默认值回归 60 项，Check、上下文和平台单元测试 23 项均通过。

### 修复与复验

- `FormInner` 在同步有效名称前读取当前 DOM 属性。组件写入的继承名称与外部写入的显式名称分别处理。Chrome 新增用例覆盖 `required` 先于 `name` 的四种选项／组，以及定义后升级的独立选项。
- 独立 Radio 记录当前所属的同名组。移除、改名和更换 form owner 时，刷新旧组成员的有效性，并按新组范围协调互斥。Chrome 在读取字段有效性前直接检查旧表单，验证原生 `form.checkValidity()` 立即失效。重新插入及恢复原名后立即生效。
- 2026-11-19，8 套 Chrome 表单回归 567 项通过。自动历史恢复与 BFCache 各 44 项通过。相关单元与发布包套件 30 项通过，包含 Theme 和无信号依赖检查。lint、格式、库与声明构建、文档构建通过。T381 校验通过。

### 消费体积基线

沿用 T359 的同条件测法。迁移前取 `314e057`，当前取工作区源码，两侧使用 Node 26.1.0、Vite 8.3.8、utilane 1.2.0 和相同锁定依赖。各自构建库后，消费端使用独立 ES 库模式、`configFile: false`、`minify: true`，计量拼接后的 JavaScript chunk 及 gzip 字节数。两种分组场景均显式导入对应组和成员。Theme 取文本单选模式，显式导入 `theme`、`radio`、`radio-group`。独立全局 CSS 不计入。

<!-- prettier-ignore -->
| 消费场景 | 原始字节（迁移前 → 当前） | gzip 字节（迁移前 → 当前） | 模块数（迁移前 → 当前） |
| --- | --- | --- | --- |
| Radio | 19,159 → 34,244 | 5,614 → 9,054 | 11 → 11 |
| Checkbox | 19,728 → 34,834 | 5,712 → 9,152 | 11 → 11 |
| Radio + RadioGroup | 22,595 → 41,809 | 6,501 → 10,891 | 16 → 16 |
| Checkbox + CheckboxGroup | 23,119 → 42,354 | 6,596 → 10,994 | 16 → 16 |
| Theme 文本单选 | 26,968 → 47,489 | 7,895 → 12,597 | 19 → 19 |

迁移前五个消费场景均保留 `alien-signals` 的 `esm/index.mjs` 与 `esm/system.mjs`。修复后五个场景均无这两个模块，模块图包含 `form/context.js` 与 `form/accessibility.js`。完整模块图和修复前专项浏览器结果见本机 `.artifacts/t381-bundle-baseline.json`、`.artifacts/t381-browser-report.json`。

## 29. T382 组归属与隔离校验

- Chrome 158.0.8127.37 实测了两种组的默认 slot。直属选项和普通 `div` 包装均正常投影及更新组值。嵌套同类型组时，只更新最近的组。独立项按自身名称提交。移除并重挂载组后，一次用户操作只触发一次组变化。
- 两种定义顺序均通过。成员先升级时，稍后定义的同类型组会接管已经挂载、经包装的成员。组先升级时，晚定义的成员会读取组的当前值并重放定义前写入的值。源码通过局部上下文请求确定归属，组挂载时一次扫描已存在的后代以处理晚定义，移除时清理成员监听和登记。
- 混合类型失败。组请求由最近的 `group` 上下文接收，提供者未区分 Radio、Checkbox。Radio 放入 CheckboxGroup 时会改写多选组，Checkbox 放入 RadioGroup 时会替换单选值。外层存在同类型组时，中间的异型组仍会截获请求，实际事件和 `FormData` 都归到异型组。
- 默认 slot 分配边界失败。直属选项指定不存在的 `slot="missing"` 后，`assignedElements()` 为空，两种组仍登记该选项，使用其值提交并判定必填有效。移除该 `slot` 属性后，实际投影和同类型组选中、提交均正常。
- 2026-11-19，T382 首轮专项用例 28 项通过 22 项，失败集中在上述两类场景，控制台无异常。现有原生表单 165 项、所有权生命周期 28 项、Check／上下文单元测试 20 项通过。完整专项观察见本机 `.artifacts/t382-browser-report.json`。

### 默认插槽复验

- 用户确认异型组和不存在的插槽名均属使用错误。本轮以 Chrome 158.0.8127.37 复跑 22 项正常用法，全部通过。覆盖显式 `slot=""` 的直属选项、普通包装、同类型嵌套、独立提交、重挂载和两种定义顺序。Check／上下文单元测试 20 项通过。
- 复验确认 `slot="missing"` 时两种组的默认 slot 均无分配元素，组仍收值并通过必填校验。删除无效插槽名后正常投影、选中和提交均通过。T382 按用户确认的范围验收完成。复验详情见本机 `.artifacts/t382-recheck-report.json`。

## 30. T383 组选中状态与事件验收

- 两种组以普通 `string[]` 保存解析后的选中值，使用组上下文同步成员 `checked`。多选重复 token 在原生 `FormData` 中只提交一次，保留顺序。实测 `&`、`%`、中文及旧非法转义片段的解析，验证仅选中空 token 时的 `&` 编码，以及空字符串清空多选。
- 连续赋相同的组值、重置、重新挂载和组内成员的 `checked` 赋值均保持静默。选中状态和提交值同步一致。组件通过定向配置应用成员状态，用户点击也保留初始 `value` attribute 作为重置默认值。
- 一次实际切换只发出一次组 `change`，事件到达组监听器时已可读取更新后的 `FormData`。`l-form` 校验规则执行一次。单选组和多选组分别提供字符串与字符串数组，再点已选 Radio 保持静默。成员监听器和捕获阶段保留 T379 记录的事件边界。重挂载后组监听次数保持正常。
- Chrome 158.0.8127.37 专项 22 项、Check／上下文单元测试 20 项通过，控制台无异常。专项记录见本机 `.artifacts/t383-browser-report.json`。T383 校验通过。

## 31. T384 Check 无信号验收

- 源码核对确认 Check、CheckGroup 及 `FormInner`、FormItem、Form 的继承和协作链路已清理组 `effect`、停止句柄、旧组注入事件及 `alien-signals` 引用。成员通过普通上下文读取组配置和选中状态，用户操作交组处理。独立项的选中与提交无需组实例。
- 对照 `314e057` 的 `Signal<string[]>`，实际生成的总入口与两种 Group 按需入口声明均公开 `values: string[]`。类型复验确认普通数组读取可用，旧 `values()` 和 `values([...])` 调用不再兼容。程序修改组选择使用 `value`，独立项的 `getChecked()`、`setChecked()` 类型保持可用。
- 在隔离目录重新构建实际发布包并运行 `scripts/check-form-signals.mjs`，7 项通过。检查 18 个表单相关按需入口及其共享 chunk、独立消费组合和总入口具名消费的最终 bundle，覆盖 Radio、Checkbox、两种组及 Theme。全量注册的阳性对照仍包含 Collapse 的 `alien-signals`，总入口保留 `Signal`／`SignalStop` 类型导出。
- Check／上下文单元测试 20 项通过，包含独立选项。打包消费在 Chrome 158.0.8127.37 中 45 项通过，覆盖组和 Theme 的事件及重挂载，控制台无异常。结果见本机 `.artifacts/t384-consumer-report.json`。T384 校验通过。

## 32. T385 组选项动态行为校验

- 两种组的动态新增、移除和重插通过。新项读取组当前值，选项移走后原组保留配置值并立即停止提交该项，重插可恢复选择。跨组移动后，新组独立同步提交和事件，原组无残留关联。重挂载后每次切换只发一次组 `change`。
- 选项在同一包装节点内改 `value` attribute 或 property 后，选中和提交即时更新。编辑过的选项改 `value` attribute 时只改变默认值。组内选项改 `name` 后仍由组提交，修改组 `name` 后业务数据和 `FormData` 均使用新名。不同值选项重排通过。两种组沿用各自固定的选择模式，公开文档无动态 `multiple` 配置。
- 同一轮连续七次激活 `a&b`、`100%` 和中文选项，每次组事件与提交一致。多选组同值项共享选中状态，每个 token 只提交一次，排序后状态保持。单选组同值项始终只有一个被勾选。
- 单选组有两个同值项时，点击选中第二项后，用 `insertBefore()` 把它移动到第一项前，会把勾选切到另一个项。组 `value` 和 `FormData` 保持原值，排序未发出 `change`。单独重排未选中的同值项时选择保持。原生 Radio 在相同排序操作下保留原选中项。
- Chrome 158.0.8127.37 首轮专项 34 项通过 33 项，失败项为同值 Radio 重排后的选中项保持，控制台无异常。用户确认同组 Radio 的 `value` 应唯一，重复值属于使用错误。按确认的范围，33 项 Chrome 用例和 20 项 Check／上下文单元测试均通过。专项观察见本机 `.artifacts/t385-browser-report.json`。T385 验收完成。

## 33. T386 Check 禁用状态与半选校验

- CheckboxGroup 和 RadioGroup 的自身禁用、组禁用及 `fieldset` 禁用组合通过。解除组或 `fieldset` 禁用后，选项自身禁用仍生效。只有选项被 `fieldset` 禁用时，组即时排除该值并重算必填，解除禁用后恢复提交。禁用的选项不响应点击或 Enter，不发出 `change`。
- 两种组的 `gap` 继承与覆盖、按钮模式、可见标签及主题色通过。半选自身不增加 `FormData` 条目，仍由实际勾选状态决定是否提交。
- 给 Checkbox 设置 `indeterminate` 后，内部输入和浏览器无障碍树初始分别为 `true` 和 `mixed`。聚焦后按空格，勾选成功并只提交一条，但内部 `input.indeterminate` 变为 `false`，无障碍树显示已勾选，宿主属性和半选样式状态仍保留。另一个独立复现是同时处于勾选和半选状态时，对勾样式覆盖了半选横线。
- 仅通过默认插槽提供 Checkbox 的可见文本时，内部原生输入在浏览器无障碍树中的名称为空。通过 `label` 属性提供的名称可读取。
- 首轮 Chrome 158.0.8127.37 专项 70 项通过 67 项，失败项为半选键盘同步、图标优先级和插槽无障碍名称。首轮结果见本机 `.artifacts/t386-browser-report.json`。
- 修复后，原生激活按组件配置保留 `indeterminate`，半选横线优先于对勾，默认插槽文字可作为无障碍名称并随内容更新。显式提供的名称仍优先。复测真实空格键时，独立和组内 Checkbox 各只产生一次对应的变更事件，`FormData` 仍只读取勾选值。
- Chrome 专项复验 10 项、原生表单 175 项、默认值与重置 60 项、表单行 47 项、Check／上下文单元测试 20 项全部通过，浏览器控制台无异常。复验见本机 `.artifacts/t386-fix-browser-report.json`。T386 验收完成。

## 34. T387 Check 键盘与焦点校验

- Chrome 158.0.8127.37 实测 Checkbox Space、内部标签和图标点击均只切换一次。外部同树 `label for`、包裹标签和 FormItem 标签转发正常。禁用项跳过 Tab 并拦截点击。Radio Space 正常选中，同组和同表单同名独立项的互斥均生效。
- RadioGroup 的四个方向键均未移动焦点或切换选项。Tab 从第一个可用项开始逐项进入，即使组已有选中项；Shift+Tab 也逐项经过组内选项。未选中组同样有多个 Tab 停靠点。独立同名 Radio 也缺少跨 ShadowRoot 的方向键协调。原生同名 Radio 对照组的焦点、方向键换选和提交正常。[WAI 单选组键盘模式](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)、[HTML 原生单选分组条件](https://html.spec.whatwg.org/multipage/input.html#radio-button-group)
- Tab 能聚焦内部 Checkbox，但焦点轮廓只落在零尺寸且透明的原生输入上，宿主、标签和图标没有可见焦点变化。RadioGroup 即使有 `aria-label`，在 Chrome 无障碍树中仍是 `generic`，缺少 `radiogroup` 语义。[WAI 单选组无障碍模式](https://www.w3.org/WAI/ARIA/apg/patterns/radio/#wai-aria-roles-states-and-properties)
- 在捕获阶段取消 Space 触发的 `click` 时，浏览器回滚内部输入的勾选，但宿主已发送 `change`、更新勾选样式和 `FormData`，两处状态不一致。[HTML 输入激活与取消规则](https://html.spec.whatwg.org/multipage/input.html#the-input-element)
- 单个 Check 在无障碍树中仅暴露一个原生 `checkbox`／`radio`。插槽、`label` 属性、外部标签、同树 `aria-labelledby` 及 FormItem 标签的命名验证通过。跨树 ID 无法解析时，仍使用插槽文字。代码通过 `ElementInternals.labels` 和同树查询提取文本，再写入内部原生输入的 `aria-label`，符合 Safari 16.4 的 API 范围。触摸只核对共用的 `click` 激活入口，Safari、Firefox、VoiceOver 和触摸设备未实测。[Safari 16.4 Web Components 支持](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/#web-components)、[HTML 标签关联规则](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
- 首轮 Chrome 专项 47 项通过 35 项，原生表单回归 175 项及 Check／上下文单元测试 20 项通过，控制台无异常。首轮结果见本机 `.artifacts/t387-browser-report.json`。
- 修复后，RadioGroup 和同表单同名的独立 Radio 采用相同的 Tab 策略。选中且可用的项优先进入 Tab 顺序，无可用选中项时使用第一个可用项。方向键按顺序移动、跳过禁用项并循环。每次换选只发出一次对应的公开 `change`，`FormData` 只有一条选中值。Check 聚焦时显示外框，RadioGroup 使用 `ElementInternals.role` 提供默认 `radiogroup` 语义。该 API 的 Safari 支持从 16.4 起。[ElementInternals 角色兼容数据](https://github.com/mdn/browser-compat-data/blob/main/api/ElementInternals.json)
- 内部输入在原生 `change` 后同步宿主选中、半选和提交值。捕获或冒泡阶段取消 Space 触发的原生 `click` 时，宿主状态和 `FormData` 保持原值。正常的 Space、标签点击仍各触发一次切换。
- Chrome 专项复验 26 项、原生表单回归 187 项和 Check／上下文单元测试 20 项全部通过，控制台无异常。复验结果见本机 `.artifacts/t387-fix-browser-report.json`。T387 验收完成。

## 35. T388 Check 原生表单与恢复校验

- Chrome 158.0.8127.37 实测独立 Check 和两种组的原生提交、组与子项提交隔离、同名多值、`0`／`false`／空字符串、半选、动态增删和禁用均符合 T336。独立同名 Radio 按 form owner 隔离并互斥。必填组缺少可用选项时只从组发出一次 `invalid`，FormItem 能展示提示，`emit-error` 对普通选项的必填失败和恢复各上报一次。
- 原生 `reset()` 和 `l-form.reset()` 使用最新默认值，组和成员各只执行一次重置回调，未发用户事件。取消重置不调用这些回调。禁用往返缓存后执行真实历史返回，浏览器为 10 个 Check 和组各调用一次 `restore`。两种 form owner 的 `FormData`、半选、空字符串选中与无选中状态均恢复，未重复发出用户事件。恢复 state 是带版本的 JSON 字符串，符合 Safari 16.4 的字符串能力范围。[WebKit 恢复 API 说明](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/)
- 独立 Checkbox／Radio 放在必填 FormItem 中时，未勾选仍会通过 `l-form.validate()`，`l-form.submit()` 会发出包含非空 token 的 `submit`，而原生 `checkValidity()` 返回 `false` 且 `FormData` 无该项。业务必填直接读取 `getData()` 保留的 token。
- 选中空字符串时，独立 Checkbox／Radio 和 RadioGroup 都能生成正确的空字符串 `FormData`，但 FormItem 的业务必填仍报错并拦截 `l-form.submit()`。RadioGroup 的原生 `valueMissing` 为 `false`。独立项在点击触发业务校验后还被设置业务 `customError`。CheckboxGroup 的空选项编码 `&` 在该场景通过。
- `Check.formStateRestoreCallback()` 收到 `version: 1` 且带 `checked`、但缺少 `value` 的对象时，只忽略恢复值，仍应用 `checked` 和 `indeterminate`。实测原本未选中的半选项被勾选并提交旧 token。
- Safari 16.4 对应的 WebKit 源码存在 `setFormValue(null, state)` 不清除旧提交值的问题。修复前，未选中和上下文禁用路径以 `null` 清除，因此已提交过的选项在目标版本上可能残留旧值。此项为源码和上游缺陷核对。[对应 WebKit 源码](https://github.com/WebKit/WebKit/blob/WebKit-7615.1.26.11.23/Source/WebCore/html/FormAssociatedCustomElement.cpp#L91-L97)、[WebKit 缺陷 258870](https://bugs.webkit.org/show_bug.cgi?id=258870)
- 首轮 Chrome 专项 67 项通过 58 项，其中真实历史恢复 7 项全通过。既有表单回归 419 项、Check／上下文与无信号入口检查 21 项全部通过，浏览器控制台无异常。首轮结果见本机 `.artifacts/t388-browser-report.json`。
- 修复后，可用的 Check 和两种组的业务 `required` 按选中状态判断。可用的空字符串选项通过必填，其余自定义规则仍读取原值。组启用时，未选中任何选项或仅选中禁用项均无法通过必填。`emit-error` 对必填失败和选中空值后的恢复各发一次。缺少 `value` 或半选类型错误的恢复记录在改动字段前整体忽略。
- 无提交条目时，用空 `FormData` 覆盖旧提交值，并保留单独的字符串恢复状态。Safari 16.4 的源码会保存传入的 `FormData` 并只追加其中的条目。Chrome 模拟旧版忽略 `null` 的行为时，清除和恢复提交值均通过。Safari／iOS 沿用源码核对范围。[对应 WebKit 源码](https://github.com/WebKit/WebKit/blob/WebKit-7615.1.26.11.23/Source/WebCore/html/FormAssociatedCustomElement.cpp)
- Chrome 原生表单回归 211 项（新增 24 项）、默认值 60 项、完整流程 172 项、真实历史恢复 6 项及 Node 检查 21 项全部通过。库构建和 lint 通过。复验见本机 `.artifacts/t388-fix-browser-report.json`。T388 验收完成。

## 36. T389 Check 浏览器自动回归

- [浏览器夹具](../tests/check-browser.fixture.mjs) 只显式载入 Checkbox、Radio、两种组、FormItem 和 Form 六个按需入口。检查初始值、特殊值序列化、嵌套组隔离、跨组移动和重挂载、销毁后旧输入的监听清理、禁用与 `fieldset` 首个 `legend` 例外。覆盖独立项、各组、原生 `form` 和 `l-form` 辅助表单的 `FormData`、必填提示和原生重置回调。跨原生 form 移动同名 Radio 后，提交与互斥切换到新的 form owner。
- [浏览器测试](../tests/check-browser.test.mjs) 通过真实 Chromium 键盘输入验证 Tab、Shift+Tab、Space 与四个方向键，覆盖可见焦点、半选同步、取消原生激活后的回滚，以及成功切换只发一次 `change`。执行 `npm run lib:build`，将 `FORM_TEST_BROWSER` 指向 Chrome 或 Edge，再执行 `node --test tests/check-browser.test.mjs`。
- Chrome 158.0.8127.37 按需入口专项 30 项、原生表单 211 项、默认值 60 项、所有权生命周期 28 项、浏览器历史恢复与往返缓存各 44 项全部通过。Node 检查 21 项通过。T389 验收完成。

## 37. T390 Check 发布包与消费体积校验

- 重新构建库和声明。源码、四个 Check 按需入口的传递依赖、发布产物的共享 chunk 及消费端模块图均无 `alien-signals` 运行时代码。包的 `dependencies` 仍声明 `alien-signals`。源图与发布包门禁 8 项通过。
- 实际 `npm pack` 生成 `litos-ui-0.23.1.tgz`，含 497 个文件。临时 npm 项目离线安装 tarball 与锁定版本的依赖。Chrome 158.0.8127.37 中，两种组单独导入的注册边界 3 项、总入口与按需入口混用 7 项、Theme 和 Form 消费回归 45 项全部通过。两种组按既定约定显式导入成员。四个组件的总入口和按需入口解析为同一构造函数，重复调用 `regist()` 后注册身份保持一致。
- TypeScript 7.0.2 严格消费测试通过两种组的 `values: string[]`、独立项的 `getChecked()`／`setChecked()`／`defaultChecked` 及现有 Preact 写法。首轮 Chrome 验证独立项的 `checked` 运行时可读写，发布声明缺漏使两种组件经总入口或按需入口导入时均报 TS2339。T379 已记录这项类声明缺漏，Preact 沿用 T351 已确认范围。

### 消费体积复测

沿用 T381 的 Node 26.1.0、Vite 8.3.8、utilane 1.2.0 和锁定依赖。重新构建 `314e057` 与当前源码，使用独立 ES 库模式、`configFile: false` 和 `minify: true`，统计拼接后的 JavaScript 与 gzip 字节数。迁移前重建的原始体积较 T381 存档少 19～44 字节，差额与生成的模块路径注释长度一致，gzip 相差 2～3 字节。T381 的当前源码列作为下表基线。

<!-- prettier-ignore -->
| 消费场景 | 迁移前复测（原始／gzip） | T381 基线（原始／gzip） | 当前（原始／gzip） | 较 T381 增加（原始／gzip） |
| --- | --- | --- | --- | --- |
| Radio | 19,140／5,612 | 34,244／9,054 | 36,758／9,806 | 2,514／752 |
| Checkbox | 19,709／5,709 | 34,834／9,152 | 37,369／9,925 | 2,535／773 |
| Radio + RadioGroup | 22,565／6,499 | 41,809／10,891 | 44,722／11,682 | 2,913／791 |
| Checkbox + CheckboxGroup | 23,089／6,593 | 42,354／10,994 | 45,252／11,783 | 2,898／789 |
| Theme 文本单选 | 26,924／7,892 | 47,489／12,597 | 50,402／13,453 | 2,913／856 |

五个场景的保留模块数仍为 11、11、16、16、19。迁移前对照均含 signal 运行时代码，当前五个场景均通过排除检查。构建与消费结果见本机 `.artifacts/t390-audit-report.json`。

在 Check 基类补充 `checked: boolean` 声明，发布包自动化检查覆盖两个组件从总入口和按需入口读写该属性，并校验字符串赋值会被拒绝。重新构建后，在临时项目离线安装实际 tarball，四种导入的严格类型检查通过。安装包中的 Check JavaScript 校验和与首轮一致。发布包门禁 8 项、Chrome 消费回归 45 项、Check／上下文单元测试 20 项及 lint 均通过。复验见本机 `.artifacts/t390-type-recheck.json`。T390 验收完成。

## 38. T391 Check 平台与主题校验

- Windows 26H2（构建 26300.9974）上的 Chrome 158.0.8127.37 和 Edge 157.0.4341.60 各通过 25 项按需入口浏览器检查。实测 Tab、Shift+Tab、空格、方向键、可见焦点、跳过禁用项、动态移除与重新插入、原生重置和提交。Chromium 无障碍树验证选项名称、`radiogroup`、选中、半选、禁用和 FormItem 错误描述，选择有效值后错误描述清除。
- 两个浏览器均检查默认、翡翠绿、珊瑚红、活力橙及其暗黑状态。计算样式确认 Checkbox 半选横线、Radio 选中圆点、按钮选中背景、禁用色、焦点轮廓及组间距均取得预期值。浏览器控制台无异常。结果见本机 `.artifacts/t391-browser-report.json`。
- Chrome 按需入口回归 30 项通过。关闭往返缓存后，真实历史返回触发独立 Checkbox、CheckboxGroup 和 RadioGroup 的 `restore` 回调。开启往返缓存时观察到 `pageshow.persisted`。两套状态／自动填充回归各 44 项通过，真实恢复与缓存回用分别记录在 `.artifacts/form-state-restore-result.json` 和 `.artifacts/form-state-bfcache-result.json`。
- 核对了 `ElementInternals`、`role`、焦点委托、`composedPath()`、可构造样式表及同树 ARIA 引用。Check 的核心调用符合 Safari 16.4 和 Firefox 140 的 API 范围。旧版 WebKit 取消提交沿用 T388 的空 `FormData` 清除方案。检查六个按需入口实际解析的 33 个 JavaScript 模块，Oxc 对 Safari 16.4 和 Firefox 140 的目标转换均无额外语法转换差异。[WebKit Safari 16.4 发布说明](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/#web-components)、[ElementInternals 兼容数据](https://github.com/mdn/browser-compat-data/blob/main/api/ElementInternals.json)、[ShadowRoot 兼容数据](https://github.com/mdn/browser-compat-data/blob/main/api/ShadowRoot.json)
- 触摸沿用 API 核对范围。可见选项有 `cursor: pointer` 并通过 `click` 激活，事件路径判断使用 `composedPath()`，无 `pointerType` 限制。[Apple Safari 触摸与点击事件说明](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
- 用户确认 iOS／iPadOS 16.4、桌面 Safari、Firefox、VoiceOver 和实际触摸由其手动核对，并授权将 T391 标记为完成。本轮实测结果来自 Chromium。

## 39. T392 Check 文档与 llms 校验

- Radio 页已有独立、禁用、普通组和按钮组演示。普通组还缺少通过 `value` 动态选择和清空的操作，以及 `change.detail.value` 的实时反馈。API 需说明同组 Radio 的 `value` 应唯一，并补充两种组用于读取解码结果的 `values: string[]`。Checkbox 已有可操作的全选／半选／清空演示，点击成员时收到字符串数组，程序设置组值时保持静默。
- Radio、Checkbox 页的按需入口段落写着会注册内建依赖。两段示例已显式导入成员和组，说明应与示例及 T390 的实际发布包结果一致。
- Form 页的原生提交演示使用 `l-input`，通用 API 已区分 Check 的 `checked` 与选项 `value`。还缺少 Check 业务数据和原生提交的对照。实测未勾选的独立 Checkbox 仍在 `getData()` 中保留选项值，原生 `FormData` 省略该字段。CheckboxGroup 的业务值保留已选禁用成员，原生提交按组名逐条写入已选可用成员。无匹配时 `getData()` 仍保留组字段，RadioGroup 为 `null`，CheckboxGroup 为空字符串。匹配空值选项时原生提交空字符串，CheckboxGroup 的业务值为 `&`。
- 隔离输出的文档构建通过，llms 单元测试 10 项通过。两个语言索引各收录 49 页，Radio、Checkbox、Form 的六份生成 Markdown 均进入对应语言的全文，保留演示源码、API 和 Form 链接。Checkbox 中间状态的 HTML 与 TypeScript 各收录一次。Form 现有原生提交演示的生成片段只有 HTML，页面脚本中的结果反馈未进入该片段。
- Chrome 158.0.8127.37 验证中英文共六个构建预览页，独立项、禁用、组选中、Checkbox 半选联动以及 Form 现有提交和标签位置演示通过。另用同一构建验证四种 Check 提交场景，控制台无异常。结果见本机 `.artifacts/t392-audit-report.json`。
- Radio、Checkbox 已登记英文待同步，保留现有译文。相关中文 Form 内容补齐后须一起登记。T392 校验未通过，保持未勾选。

### 修复与复验

- 按用户确认暂缓第 1 项的 RadioGroup 动态值、事件演示及相关 API 补充。Radio、Checkbox、Form 与按需导入指南改为显式导入用到的组件，包括组成员与功能所需图标。示例逐个导入所用元素。
- Form 新增同一表单的 `getData()`／`FormData` 提交对照、数据规则表和源码。Radio、Checkbox 文档说明组值无匹配时的快照与原生提交行为，并链接到该示例。原生表单演示也补齐可复制的反馈脚本。更新四页英文待同步记录，重新打开 T042。
- Chrome 158.0.8127.37 复验中英文六个预览页。新演示点击提交验证初始值、用户改选、组值无匹配三种结果，另通过四种提交边界检查，控制台无异常。双语文档构建和 llms 测试 10 项通过，生成的 Form 页面与中文全文同时收录两个提交示例的 HTML 和 JavaScript。结果见本机 `.artifacts/t392-fix-report.json`。T392 按确认范围完成。

## 40. T393 Check 发布前校验

- `pnpm lint`、`pnpm fmt:check`、`pnpm lib:build`、`pnpm docs:build` 均通过，格式检查覆盖 475 个文件。文档构建保留大 chunk 提示，中英文 llms 各收录 49 页。`npm pack --dry-run --ignore-scripts` 检查了已构建的 497 个包文件及目标入口的 JS 和声明。首次执行 pnpm 触发自动重装，默认缓存缺少锁定版本。已使用本机缓存按原锁文件离线恢复 263 个包，复跑时指定对应的缓存和依赖校验配置。
- T336 的 Check 按需入口交互 30 项及实际 tarball 中的 Theme／Group／Form 消费 45 项通过。FormItem 浏览器回归 47 项通过。表单所有权、动态关联、原生提交、重置、默认值和自动填充配置八套场景最终通过 613 项。`recreated-date-editors-inherit` 在并行运行时复现 T351 记录的时序失败，改为独立执行后三次均通过 40 项。真实历史恢复与往返缓存／自动填充两套场景各通过 44 项。
- T356 的源码传递图、独立按需包、共享 chunk 与全量注册 bundle 未引入 `alien-signals` 运行时代码。严格类型检查通过，独立项的 `checked`、`defaultChecked`、`getChecked()` 和 `setChecked()` 可用，组的 `values` 以 `string[]` 读取，旧 `values()` 方法调用已失效。兼容类型导出及包依赖保留，T360 状态保持未勾选。
- 与 T390 相同条件下，Radio、Checkbox、Radio＋Group、Checkbox＋Group、Theme 文本单选五个场景的原始／gzip 体积和模块数均一致。相对 T381，原始体积增加 2,512～2,913 字节，gzip 增加 752～856 字节。34 个按需依赖模块用 Safari 16.4 和 Firefox 140 目标静态转换，输出无额外语法转换。最低版 API、触摸和 VoiceOver 沿用 T391 约定的核对范围。本轮浏览器实测为 Windows Chrome 158.0.8127.37。
- Chrome 操作中英文 Radio、Checkbox、Form 和 Theme 共八页构建预览，控制台无异常。Theme 按钮、下拉、开关、文本单选和图标单选各自切换时只发出一次公开 `change`，来源为 `l-theme`。中英文 Theme 页均可复现同页选中状态不同步。文本单选切到深色后，图标和自定义单选仍显示浅色已选。此时直接点击已选的浅色，页面继续保持深色。先在同一组切到其他选项，再点击浅色可以恢复。
- 全库 Node 测试带 `--experimental-vm-modules` 运行，288 项通过，1 个测试文件失败。`tests/neutral-colors.test.mjs` 以 `:root {` 匹配变量，当前 `styles/vars.css` 的 `:root` 与带 `data-theme` 的选择器共用声明，导致测试在收集用例前报错。用 HEAD 的测试与样式单独复现，失败属于既有测试问题。
- T336、T356 原状态保留。Theme 同页演示问题仍待处理，T393 校验未通过。报告见本机 `.artifacts/t393-docs-report.json` 和 `.artifacts/t393-bundle-report.json`。

### 修复与复验

- Theme 按钮、下拉、开关、文本单选、图标单选和文档自定义单选同步到当前页面主题。状态同步保持静默，只有发起用户操作的 `l-theme` 发出一次公开 `change`。发布包回归覆盖互相切换、无根类属性时切到自动、外部主题变更和移除重挂载。自定义演示按其源码示例记忆选择，在无 View Transition API 时直接切换。
- 颜色回归测试按选择器列表读取变量并使用 `styles/themes/` 路径，Tag 背景变量和四套配色的明暗对比度共 9 项通过。全库回归 297 项通过，发布包浏览器场景 52 项、八套表单流程 613 项、恢复与自动填充两套各 44 项通过。
- Chrome 158.0.8127.37 复验中英文八个预览页，交替使用文本、图标和自定义单选均能直接切回上一主题。无 View Transition API 的自定义演示回退通过，控制台无异常。lint、格式、库与声明构建、文档构建及 499 文件的打包预检通过。
- 四个 Check 消费场景与 T390 的体积和模块数一致。Theme 文本单选为 51,304 字节／gzip 13,689 字节，较 T390 增加 902／236 字节。35 个按需依赖模块静态核对 Safari 16.4 与 Firefox 140，无额外语法转换。包内共享主题模块无单独注册入口，构建和消费图均无 `alien-signals` 运行时引用。T393 验收完成。复验数据见本机 `.artifacts/t393-fix-docs-report.json` 和 `.artifacts/t393-fix-bundle-report.json`。

## 41. 移除旧上下文接口

T360 卸载 `alien-signals` 后，已移除旧的 `ContextProvide` 深层入口，以及总入口的 `Signal` 和 `SignalStop` 类型导出。直接使用这些旧导入的项目需要更新自己的代码。