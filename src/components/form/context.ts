/**
 * 表单内部的无依赖通信协议，不负责发现字段或管理原生 form 所有权。
 * 当前调用：tests/form-context.test.mjs；tests/form-lifecycle.fixture.html 通过
 * scripts/check-form-owner.mjs 提供的 /context.js 加载本模块。
 * 生产 Form／FormItem／FormInner／CheckGroup 已通过 T356 使用本协议，无旧 signal 并行链路。
 * vite.config.ts 将本文件排除出独立入口扫描，不是供使用者导入的公共组件入口。
 */
/** 上下文提供者类别；provideFormContext 与 requestFormContext 用它匹配最近的同类祖先。 */
export type FormContextKind = "form" | "item" | "group";

/**
 * 配置快照：由提供者读取、配置更新事件传递、resolveFieldContext 合并。
 * 生产中分别来自 Form、FormItem 和 Group；协议测试和浏览器样例同时覆盖。
 * 仅含行为配置；标签尺寸等纯样式优先通过 CSS 变量继承。
 */
export interface FormContextSnapshot {
  /** 未设置时继承；false 是明确的局部覆盖，不等于缺省。 */
  readonly innerBlock?: boolean;
  /** 自身或上级禁用来源；最终有效禁用取所有来源的逻辑或。 */
  readonly disabled?: boolean;
  readonly required?: boolean;
  /** FormItem 提供的后备字段名，不能当成控件显式设置的 name。 */
  readonly prop?: string;
  /** CheckGroup 的当前选中 token，由普通配置通知同步成员。 */
  readonly values?: readonly string[];
  readonly multiple?: boolean;
}

/** 有效性通知数据；notifyFormValidity 与提供者的 notifyValidity 使用，供字段错误 UI 监听。 */
export interface FormFieldValidity {
  readonly valid: boolean;
  readonly message?: string;
}

/** 当前业务值快照；由已登记字段的 getSnapshot 返回，不是原生 FormData 提交条目。 */
export interface FormFieldSnapshot {
  readonly name?: string;
  readonly value: unknown;
  /** 自身或上级禁用来源；最终有效禁用取所有来源的逻辑或。 */
  readonly disabled?: boolean;
}

/**
 * 字段登记适配接口；createFormContextProvider 以这个对象的身份去重。
 * 由 FormInner／FormItem 提供稳定实例，协议测试及浏览器样例同时覆盖。
 * 改名或改值时调用 getSnapshot 读取新状态，不另存一份持续同步的业务值缓存。
 */
export interface FormContextField {
  /** 定向配置／有效性事件的接收目标，通常为字段宿主元素。 */
  readonly target: EventTarget;
  /** 由未来表单数据收集调用；登记期间始终返回当前 name、value 和自身禁用状态。 */
  getSnapshot(): FormFieldSnapshot;
}

/** 最小提供者契约；provideFormContext 对外响应此对象，requestFormContext 将其返回给字段。 */
export interface FormContextProvider {
  /** 字段初始化／重新关联时读取；返回新副本或不可变快照，而非共享可变状态源。 */
  getSnapshot(): Readonly<FormContextSnapshot>;
  /** 字段挂载时登记，返回可重复调用的注销函数；移动／断开前由调用方执行注销。 */
  registerField(field: FormContextField): () => void;
}

/** createFormContextProvider 的返回接口；供宿主更新配置、通知错误并在销毁时清理登记。 */
export interface ManagedFormContextProvider extends FormContextProvider {
  /** 宿主读取当前字段列表的副本，不向外暴露内部 Set。 */
  getFields(): readonly FormContextField[];
  /** 宿主属性变化时整体替换配置并通知字段，使已移除的配置恢复继承。 */
  updateConfiguration(snapshot: Readonly<FormContextSnapshot>): void;
  /** 校验协调方调用；仅向当前仍登记的字段发送有效性通知，不执行校验规则。 */
  notifyValidity(field: FormContextField, validity: Readonly<FormFieldValidity>): void;
  /** 宿主销毁时清空登记；请求监听器须另调用 provideFormContext 返回的清理函数移除。 */
  dispose(): void;
}

/**
 * 为单个 Form／FormItem／Group 创建最小字段集合及配置快照管理器。
 * 由生产 Form／FormItem／CheckGroup 及协议测试、生命周期样例创建并持有。
 * 不发现 DOM 所有权、不提供通用订阅系统；字段负责登记与注销，宿主负责 dispose。
 * 重复登记同一字段只保留一项；旧注销函数不会误删后一次登记。
 */
export function createFormContextProvider(
  initialSnapshot: Readonly<FormContextSnapshot> = {},
): ManagedFormContextProvider {
  let snapshot = { ...initialSnapshot };
  const fields = new Set<FormContextField>();
  // 登记令牌保证旧注销函数不会删除同一字段的新一轮登记。
  const registrations = new Map<FormContextField, object>();
  return {
    getSnapshot: () => ({ ...snapshot }),
    getFields: () => [...fields],
    registerField(field) {
      const token = {};
      fields.add(field);
      registrations.set(field, token);
      return () => {
        if (registrations.get(field) !== token) return;
        registrations.delete(field);
        fields.delete(field);
      };
    },
    updateConfiguration(nextSnapshot) {
      snapshot = { ...nextSnapshot };
      // 固定本轮接收者；回调中新登记的字段等下一轮更新，已注销的字段跳过。
      const recipients = Array.from(fields);
      for (const field of recipients) {
        if (fields.has(field)) notifyFormConfiguration(field.target, snapshot);
      }
    },
    notifyValidity(field, validity) {
      if (fields.has(field)) notifyFormValidity(field.target, validity);
    },
    dispose() {
      fields.clear();
      registrations.clear();
    },
  };
}

/** 本模块事件名；由提供／请求函数及定向通知函数使用，测试和未来字段监听方按此绑定。 */
export const FORM_CONTEXT_EVENTS = {
  request: "l-form-context-request",
  configuration: "l-form-context-configuration",
  validity: "l-form-context-validity",
} as const;

/** 仅供 provideFormContext／requestFormContext 使用的同步请求载荷；最近提供者写入响应。 */
interface ContextRequest {
  readonly kind: FormContextKind;
  readonly requester: EventTarget;
  provider?: FormContextProvider;
}

/**
 * 在宿主安装某一类别的上下文响应监听器；当前由协议测试和浏览器样例调用。
 * 由 Form／FormItem／Group 初始化时调用，销毁时执行返回的清理函数。
 * 请求沿冒泡及 composed 路径传播，最近同类提供者响应后停止后续传播；宿主自己
 * 请求同类上下文时跳过自身。此函数不扫描 DOM、不推断 owner，也不自动登记字段。
 */
export function provideFormContext(
  target: EventTarget,
  kind: FormContextKind,
  provider: FormContextProvider,
): () => void {
  const listener = (event: Event) => {
    const request = (event as CustomEvent<ContextRequest>).detail;
    if (!request || request.kind !== kind || request.requester === target || request.provider)
      return;
    request.provider = provider;
    event.stopImmediatePropagation();
  };
  target.addEventListener(FORM_CONTEXT_EVENTS.request, listener);
  return () => target.removeEventListener(FORM_CONTEXT_EVENTS.request, listener);
}

/**
 * 从字段目标同步请求最近同类上下文；当前测试验证包装节点、移动及 Shadow DOM 路径。
 * 由控件／上下文消费者挂载或重新关联时调用，找不到时返回 undefined。
 * 返回提供者不等于已登记；调用方还需 registerField，并在移动前清理旧登记。
 * 本函数不持有提供者或安装长期监听器。
 */
export function requestFormContext(
  target: EventTarget,
  kind: FormContextKind,
): FormContextProvider | undefined {
  const detail: ContextRequest = { kind, requester: target };
  target.dispatchEvent(
    new CustomEvent(FORM_CONTEXT_EVENTS.request, { detail, bubbles: true, composed: true }),
  );
  return detail.provider;
}

/**
 * 向单个字段目标发送配置副本；createFormContextProvider.updateConfiguration 内部调用。
 * 字段监听 FORM_CONTEXT_EVENTS.configuration 后重新计算配置；事件不冒泡、不跨树，
 * 不是父级向整棵子树广播，也不会自动修改控件属性或 DOM。
 */
export function notifyFormConfiguration(
  target: EventTarget,
  snapshot: Readonly<FormContextSnapshot>,
): void {
  target.dispatchEvent(
    new CustomEvent<Readonly<FormContextSnapshot>>(FORM_CONTEXT_EVENTS.configuration, {
      detail: { ...snapshot },
    }),
  );
}

/**
 * 向约定的字段目标发送有效性副本；提供者 notifyValidity 调用此函数。
 * 当前协议测试验证定向分发；未来由字段／FormItem 的 UI 协调层监听。
 * 不冒泡、不跨树，不触发用户 change，不代替 setValidity 或业务规则执行。
 */
export function notifyFormValidity(
  target: EventTarget,
  validity: Readonly<FormFieldValidity>,
): void {
  target.dispatchEvent(
    new CustomEvent<Readonly<FormFieldValidity>>(FORM_CONTEXT_EVENTS.validity, {
      detail: { ...validity },
    }),
  );
}

/** resolveFieldContext 的计算结果；未来由控件应用到名称、布局和交互状态，不反写显式配置。 */
export interface ResolvedFieldContext {
  readonly name?: string;
  readonly innerBlock: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
}

/**
 * 纯函数合并本地与上级配置；当前由单元测试和浏览器样例使用，由字段配置更新入口调用。
 * innerBlock／required 优先级为本地 > Group > FormItem > Form，明确的 false 可以覆盖。
 * disabled 对所有来源取逻辑或，本地 false 不能解除父级禁用；自身禁用需另行保存，
 * 才能在父级解除禁用后恢复。fieldset 的有效禁用由后续原生回调另外叠加。
 * 显式 name（含空字符串）优先于 item.prop；传 undefined 表示移除覆盖并恢复继承。
 * 不把继承名称写回显式 name。增删配置或移动后传入全新快照，不合并陈旧结果。
 */
export function resolveFieldContext(
  local: Readonly<FormContextSnapshot> & { readonly name?: string },
  contexts: {
    readonly form?: Readonly<FormContextSnapshot>;
    readonly item?: Readonly<FormContextSnapshot>;
    readonly group?: Readonly<FormContextSnapshot>;
  } = {},
): ResolvedFieldContext {
  const { form, item, group } = contexts;
  return {
    name: local.name ?? item?.prop,
    innerBlock:
      local.innerBlock ?? group?.innerBlock ?? item?.innerBlock ?? form?.innerBlock ?? false,
    disabled: !!(local.disabled || group?.disabled || item?.disabled || form?.disabled),
    required: local.required ?? group?.required ?? item?.required ?? form?.required ?? false,
  };
}

/**
 * 将 HTML 布尔配置转为三态输入，供 attributeChanged 的配置读取入口使用。
 * 生产 FormInner／FormItem 及单元测试调用：移除属性为 undefined（继承），空值／属性名为 true，
 * 忽略大小写和首尾空白的 false 为 false；其他字符串保持 true，不等同原生布尔属性解析。
 */
export function readFormBooleanAttribute(value: string | null): boolean | undefined {
  if (value === null) return undefined;
  return value.trim().toLowerCase() !== "false";
}