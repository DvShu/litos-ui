import { $one, on, off, hasClass, addClass, removeClass, getAttr } from "ph-utils/browser";

type DialogProps = {
  /** 对话框在垂直方向位置 */
  verticalAlign?: "top" | "bottom" | "middle";
  /** css translate, 例如: 0,0,0 -> translate3d(0,0,0) */
  translate?: string;
  /** 对话框宽度 */
  width?: string;
  /** 是否在点击 esc 时关闭弹窗 */
  escClose?: boolean;
  /** 是否可以通过点击 mask 关闭对话框 */
  maskClosable?: boolean;
  /** 是否显示右上角关闭按钮, 1 - 显示在框内， 2 - 显示在框角, 0 - 不显示 */
  close?: number;
};

/** 初始化对话框配置 */
type DialogInitialParams = DialogProps & {
  /** dialog 节点 */
  el: HTMLDialogElement | string;
  /** 返回 true 表明手动调用 done 关闭 */
  onAction?: (action: string, done: () => void) => boolean;
};

export default class Dialog {
  private $dialog!: HTMLDialogElement;
  private $container: HTMLElement | null | undefined;
  private config!: Required<DialogInitialParams>;

  constructor(option?: DialogInitialParams) {
    if (option != null) {
      this.init(option);
    }
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      e.preventDefault();
      this.close();
    }
  };

  private handleClick = (e: Event) => {
    if (this.$dialog.isSameNode(e.target as HTMLDialogElement)) {
      if (this.config && this.config.maskClosable) {
        this.close();
      }
    }
  };

  private handleContainerAction = (e: CustomEvent) => {
    const action = e.detail.action;
    if (action === "ok" && this.$container?.hasAttribute("confirm-loading")) {
      return;
    }
    if (this.config.onAction != null) {
      this.config.onAction(action, () => this.close());
    }
  };

  /**
   * 初始化对话框
   * @param option 配置项
   */
  init(option: DialogInitialParams) {
    if (!this.config) {
      let tmpconfig = {
        escClose: true,
        verticalAlign: "top",
        maskClosable: true,
        close: 1,
        ...option,
      };
      this.$dialog = $one(option.el) as HTMLDialogElement;
      if (this.$dialog) {
        if (!hasClass(this.$dialog, "l-dialog")) {
          addClass(this.$dialog, "l-dialog");
        }
        this.$container = $one("l-dialog-container", this.$dialog);
        // 垂直方向位置
        const verticalAlign = getAttr(this.$dialog, "vertical-align");
        tmpconfig.verticalAlign = verticalAlign || "top";
        addClass(this.$dialog, `l-dialog--vertical-${tmpconfig.verticalAlign}`);
        // translate
        const translate = getAttr(this.$dialog, "translate") || tmpconfig.translate;
        if (translate) {
          this.$dialog.style.setProperty("--l-dialog-translate", `translate3d(${translate})`);
        }
        // width
        const width = getAttr(this.$dialog, "width") || tmpconfig.width;
        if (width) {
          this.$dialog.style.setProperty("--l-dialog-width", width);
        }
        // close
        const close = getAttr(this.$dialog, "close", 1);
        if (close === 2) {
          addClass(this.$dialog, "l-dialog-close-outside");
        }
        if (this.$container) {
          this.$container.setAttribute("close", `${close}`);
        }
        tmpconfig.close = close;
        // 监听 esc
        on(this.$dialog, "keydown", this.handleKeydown as any);
        on(this.$dialog, "click", this.handleClick);
        if (this.$container) {
          on(this.$container, "dialogAction", this.handleContainerAction as any);
        }
      }
      this.config = tmpconfig as any;
    }
  }

  /**
   * 打开对话框
   */
  open() {
    if (this.$dialog) {
      this.$dialog.showModal();
      addClass(this.$dialog, "l-dialog--open");
      addClass(document.body, "l-body--dialog-open");
    }
  }

  /**
   * 关闭对话框
   */
  close() {
    if (this.$dialog && hasClass(this.$dialog, "l-dialog--open")) {
      on(
        this.$dialog,
        "transitionend",
        () => {
          this.$dialog.close();
          removeClass(document.body, "l-body--dialog-open");
        },
        { once: true },
      );
      removeClass(this.$dialog, "l-dialog--open");
    }
  }

  destroy() {
    if (this.$dialog) {
      this.close();
      off(this.$dialog, "keydown", this.handleKeydown as any);
      off(this.$dialog, "click", this.handleClick);
      if (this.$container) {
        off(this.$container, "dialogAction", this.handleContainerAction as any);
      }
      this.$container = undefined;
      this.$dialog = undefined as any;
    }
  }

  setProp(key: keyof DialogProps, value: DialogProps[keyof DialogProps]) {
    if (this.config) {
      this.config[key as "verticalAlign"] = value as "top";
      if (this.$dialog) {
        if (key === "verticalAlign") {
          const newClassName = this.$dialog.className.replace(/l-dialog--vertical-\w+/g, () => {
            return `l-dialog--vertical-${value || "top"}`;
          });
          this.$dialog.className = newClassName;
        } else if (key === "translate") {
          if (value) {
            this.$dialog.style.setProperty("--l-dialog-translate", `translate3d(${value})`);
          } else {
            this.$dialog.style.removeProperty("--l-dialog-translate");
          }
        } else if (key === "width") {
          if (value) {
            this.$dialog.style.setProperty("--l-dialog-width", value as string);
          } else {
            this.$dialog.style.removeProperty("--l-dialog-width");
          }
        } else if (key === "close") {
          if (this.$container) {
            this.$container.setAttribute("close", `${value}`);
          }
        }
      }
    }
  }

  setProps(props: DialogProps) {
    for (const key in props) {
      this.setProp(key as "verticalAlign", props[key as "verticalAlign"]);
    }
  }

  /**
   * 设置确定按钮 loading 状态
   * @param loading 是否 loading
   */
  setConfirmLoading(loading: boolean) {
    if (this.$container) {
      if (loading) {
        this.$container.setAttribute("confirm-loading", "");
      } else {
        this.$container.removeAttribute("confirm-loading");
      }
    }
  }
}