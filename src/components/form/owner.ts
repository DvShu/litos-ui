/**
 * 表单原生所有权管理的内部原语：创建辅助 form，并协调同一 DOM 树内的字段关联。
 * 当前使用位置：tests/form-lifecycle.fixture.html，通过 scripts/check-form-owner.mjs
 * 提供的 /owner.js 加载并验证。生产 Form 在 T340 接入；由 Form 持有本管理器，FormInner 不直接依赖它。
 * vite.config.ts 将它排除出独立组件入口扫描；不属于公开导入 API。
 * 宿主接入后必须在连接／断开生命周期调用 start／stop；不穿透额外 ShadowRoot。
 */
/** selectFields 回调与内部关联集合使用的字段类型；调用方只能返回真正参与表单的宿主。 */
export interface OwnedFormField extends HTMLElement {
  // 此类型不保证元素已声明 formAssociated；能力与升级时机由接入方负责验证。
}

// 辅助 form 的候选 ID 序号；refresh 仍会检查当前 DOM 树中是否冲突。
let sequence = 0;
// start／stop 使用，防止同一个宿主同时安装多个所有权管理器。
const managers = new WeakMap<HTMLElement, FormOwner>();
// refresh／release 使用；跨宿主移交前释放旧管理器写入的 form 属性。
const assignments = new WeakMap<OwnedFormField, FormOwner>();

/**
 * 单个 l-form 的所有权控制器，当前由生命周期浏览器样例实例化。
 * 由生产 Form 持有，字段注册／升级后可主动 refresh；不负责上下文或校验规则。
 * 无原生祖先 form 时使用空的隐藏辅助 form；有祖先时复用，字段显式 form 始终优先。
 * 嵌套 l-form 明确拒绝；多个宿主复用同一原生 form 时不承诺原生提交／重置隔离。
 * 仅管理关联属性和自身辅助节点，从不移动、重建或清空应用内容。
 */
export class FormOwner {
  /** 管理器自行创建的空辅助 form；stop 移除，不包含用户字段。 */
  private auxiliary?: HTMLFormElement;
  /** 只观察当前宿主子树的结构和 form／id，不全局监听 document。 */
  private observer?: MutationObserver;
  /** 只记录本管理器写入的字段及 ID，用于安全恢复原本缺省的 form 属性。 */
  private readonly managed = new Map<OwnedFormField, string>();
  /** start／stop 的幂等状态。 */
  private active = false;
  /** refresh 重入保护；属性不同才写入，避免观察器循环更新。 */
  private refreshing = false;
  /** 对外 form getter 的当前结果，可为辅助 form 或应用原生祖先 form。 */
  private current?: HTMLFormElement;

  /**
   * 由 Form 初始化及浏览器样例的宿主 connectedCallback 创建。
   * @param host 所属 l-form 宿主；本构造函数不修改 DOM，随后显式 start。
   * @param selectFields 返回当前候选字段，refresh 每次重新读取；不能返回辅助 input。
   */
  constructor(host: HTMLElement, selectFields: () => Iterable<OwnedFormField>) {
    this.host = host;
    this.selectFields = selectFields;
  }

  readonly host: HTMLElement;
  private readonly selectFields: () => Iterable<OwnedFormField>;

  /**
   * 当前浏览器样例读取此值断言 owner；供 Form 的提交／重置协调入口使用。
   * 未启动、停止或宿主断开后为 undefined；不会隐式执行 refresh。
   */
  get form(): HTMLFormElement | undefined {
    return this.current;
  }

  /**
   * 宿主连接时调用：首次同步并安装局部观察器；重复调用不重复安装。
   * 当前由样例 connectedCallback 调用；首次失败会执行 stop 清理后再抛出错误。
   */
  start(): void {
    if (this.active) return;
    const existing = managers.get(this.host);
    if (existing && existing !== this)
      throw new Error("Litos UI: host already has a form owner manager.");
    managers.set(this.host, this);
    this.active = true;
    try {
      this.refresh();
      // 仅观察宿主范围；宿主自身移动需由其生命周期执行 stop／start。
      this.observer = new MutationObserver(() => this.refresh());
      this.observer.observe(this.host, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["form", "id"],
      });
    } catch (error) {
      this.stop();
      throw error;
    }
  }

  /**
   * 内部由 refresh、跨管理器移交和 stop 调用，释放一项由本管理器写入的关联。
   * 仅在属性仍等于本次写入值时移除；用户显式更改后的值不回滚。
   */
  private release(field: OwnedFormField): void {
    const assigned = this.managed.get(field);
    // 只恢复仍由本管理器拥有的属性；用户后写入的显式关联优先。
    if (assigned !== undefined && field.getAttribute("form") === assigned)
      field.removeAttribute("form");
    this.managed.delete(field);
    if (assignments.get(field) === this) assignments.delete(field);
  }

  /**
   * start 与局部观察器调用；未来字段升级／登记以及特殊移动后也应主动调用。
   * 重读候选字段并修正 owner、ID 和归属，处理增删、框架替换及跨宿主移交。
   * 不监听宿主之外的 ID 更改：外部新冲突需下一次主动 refresh 才会发现。
   * 明确拒绝同树嵌套 l-form；不跨 ShadowRoot 查找祖先或字段。
   */
  refresh(): void {
    if (!this.active || this.refreshing) return;
    this.refreshing = true;
    try {
      if (!this.host.isConnected) {
        for (const field of this.managed.keys()) this.release(field);
        this.auxiliary?.remove();
        this.auxiliary = undefined;
        this.current = undefined;
        return;
      }
      // 不将共享原生 owner 冒充嵌套表单隔离；此结构必须明确拒绝。
      if (this.host.parentElement?.closest("l-form")) {
        throw new Error("Litos UI: nested l-form is not supported by the native owner protocol.");
      }
      const ancestor = this.host.parentElement?.closest("form") ?? undefined;
      let owner: HTMLFormElement;
      if (ancestor) {
        this.auxiliary?.remove();
        this.auxiliary = undefined;
        owner = ancestor;
      } else {
        if (!this.auxiliary) {
          this.auxiliary = this.host.ownerDocument.createElement("form");
          this.auxiliary.hidden = true;
          this.auxiliary.noValidate = true;
          this.auxiliary.slot = "__l_form_owner";
        }
        owner = this.auxiliary;
        if (owner.parentNode !== this.host) this.host.append(owner);
        const root = this.host.getRootNode() as Document | ShadowRoot;
        // 不继续使用已被应用元素占用或形成重复的 ID。
        if (
          !owner.id ||
          root.getElementById(owner.id) !== owner ||
          Array.from(root.querySelectorAll("[id]")).some(
            (node) => node !== owner && node.id === owner.id,
          )
        ) {
          let id: string;
          do {
            id = `l-form-owner-${++sequence}`;
          } while (root.getElementById(id));
          owner.id = id;
        }
      }
      this.current = owner;
      const root = this.host.getRootNode();
      const fields = new Set(
        Array.from(this.selectFields()).filter(
          (field) =>
            field.isConnected &&
            field.getRootNode() === root &&
            this.host.contains(field) &&
            field.closest("l-form") === this.host &&
            !field.closest("form"),
        ),
      );
      // 支持复用原生祖先 form；下面仍以字段显式 form 为最高优先级。
      if (ancestor) {
        for (const field of this.selectFields()) {
          if (
            field.isConnected &&
            field.getRootNode() === root &&
            this.host.contains(field) &&
            field.closest("l-form") === this.host &&
            field.closest("form") === ancestor
          )
            fields.add(field);
        }
      }
      for (const field of this.managed.keys()) {
        if (!fields.has(field)) this.release(field);
      }
      for (const field of fields) {
        const priorManager = assignments.get(field);
        if (priorManager && priorManager !== this) priorManager.release(field);
        const previous = this.managed.get(field);
        const attribute = field.getAttribute("form");
        if (previous !== undefined && attribute !== previous) this.managed.delete(field);
        if (field.hasAttribute("form") && !this.managed.has(field)) continue;
        if (ancestor) {
          // 原生祖先关系已足够关联，不改应用 form 的 ID，也不保留旧自动属性。
          this.release(field);
        } else if (field.getAttribute("form") !== owner.id) {
          field.setAttribute("form", owner.id);
          this.managed.set(field, owner.id);
          assignments.set(field, this);
        }
      }
    } finally {
      this.refreshing = false;
    }
  }

  /**
   * 当前由浏览器样例 disconnectedCallback 调用，由 Form 断开／销毁时调用。
   * 停止观察、恢复自动属性、移除辅助 form 并注销宿主；重复调用安全。
   * 不移除应用原生 form 或用户节点；需要重新挂载时可以再次 start。
   */
  stop(): void {
    this.active = false;
    this.observer?.disconnect();
    this.observer = undefined;
    for (const field of this.managed.keys()) this.release(field);
    this.auxiliary?.remove();
    this.auxiliary = undefined;
    this.current = undefined;
    if (managers.get(this.host) === this) managers.delete(this.host);
  }
}