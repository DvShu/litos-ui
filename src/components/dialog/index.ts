import {
  $,
  $one,
  on,
  off,
  hasClass,
  addClass,
  removeClass,
  getAttr,
} from "ph-utils/dom";

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
  showClose?: number;
};

/** 初始化对话框配置 */
type DialogInitialParams = DialogProps & {
  /** dialog 节点 */
  el: HTMLDialogElement | string;
};
const Dialog = (option?: DialogInitialParams) => {
  let $dialog: HTMLDialogElement;
  let $container: HTMLElement | undefined;
  let config: Required<DialogInitialParams>;

  function handleKeydown(e: KeyboardEvent) {
    if (e.code === "Escape") {
      e.preventDefault();
      close();
    }
  }

  function handleClick(e: Event) {
    if ($dialog.isSameNode(e.target as HTMLDialogElement)) {
      // 点击的是遮罩
      if (config && config.maskClosable) {
        close();
      }
    }
  }

  /**
   * 初始化对话框
   * @param option 配置项
   */
  function init(option: DialogInitialParams) {
    if (!config) {
      let tmpconfig = {
        escClose: true,
        verticalAlign: "top",
        maskClosable: true,
        showClose: 1,
        ...option,
      };
      $dialog = $one(option.el) as HTMLDialogElement;
      if ($dialog) {
        if (!hasClass($dialog, "l-dialog")) {
          addClass($dialog, "l-dialog");
        }
        $container = $one("l-dialog-container", $dialog);
        // 垂直方向位置
        const verticalAlign = getAttr($dialog, "vertical-align");
        tmpconfig.verticalAlign = verticalAlign || "top";
        addClass($dialog, `l-dialog--vertical-${tmpconfig.verticalAlign}`);
        // traslate
        const translate = getAttr($dialog, "translate") || tmpconfig.translate;
        if (translate) {
          $dialog.style.setProperty(
            "--l-dialog-translate",
            `translate3d(${translate})`
          );
        }
        // width
        const width = getAttr($dialog, "width") || tmpconfig.width;
        if (width) {
          $dialog.style.setProperty("--l-dialog-width", width);
        }
        // showClose
        const showClose = getAttr($dialog, "show-close", 1);
        if (showClose === 2) {
          addClass($dialog, "l-dialog-close-outside");
        }
        if ($container) {
          $container.setAttribute("show-close", `${showClose}`);
        }
        tmpconfig.showClose = showClose;
        // 监听 esc
        on($dialog, "keydown", handleKeydown as any);
        on($dialog, "click", handleClick);
      }
      config = tmpconfig as any;
    }
  }

  /**
   * 打开对话框
   */
  function open() {
    if ($dialog) {
      $dialog.showModal();
      addClass($dialog, "l-dialog--open");
      addClass(document.body, "l-body--dialog-open");
    }
  }

  /**
   * 关闭对话框
   */
  function close() {
    if ($dialog && hasClass($dialog, "l-dialog--open")) {
      on(
        $dialog,
        "transitionend",
        () => {
          $dialog.close();
          removeClass(document.body, "l-body--dialog-open");
        },
        { once: true }
      );
      removeClass($dialog, "l-dialog--open");
    }
  }

  function destroy() {
    if ($dialog) {
      close();
      off($dialog, "keydown", handleKeydown as any);
      off($dialog, "click", handleClick);
      $container = undefined;
      $dialog = undefined as any;
    }
  }

  function setProp(
    key: keyof DialogProps,
    value: DialogProps[keyof DialogProps]
  ) {
    if (config) {
      config[key as "verticalAlign"] = value as "top";
      if ($dialog) {
        if (key === "verticalAlign") {
          const newClassName = $dialog.className.replace(
            /l-dialog--vertical-\w+/g,
            function () {
              return `l-dialog--vertical-${value || "top"}`;
            }
          );
          $dialog.className = newClassName;
        } else if (key === "translate") {
          if (value) {
            $dialog.style.setProperty(
              "--l-dialog-translate",
              `translate3d(${value})`
            );
          } else {
            $dialog.style.removeProperty("--l-dialog-translate");
          }
        } else if (key === "width") {
          if (value) {
            $dialog.style.setProperty("--l-dialog-width", value as string);
          } else {
            $dialog.style.removeProperty("--l-dialog-width");
          }
        } else if (key === "showClose") {
          if ($container) {
            $container.setAttribute("show-close", `${value}`);
          }
        }
      }
    }
  }

  function setProps(props: DialogProps) {
    for (const key in props) {
      setProp(key as "verticalAlign", props[key as "verticalAlign"]);
    }
  }

  if (option != null) {
    init(option);
  }

  return {
    init,
    open,
    close,
    destroy,
    setProp,
    setProps,
  };
};

export default Dialog;
