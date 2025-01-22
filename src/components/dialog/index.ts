import {
  $,
  $one,
  on,
  off,
  hasClass,
  addClass,
  removeClass,
} from "ph-utils/dom";

/** 初始化对话框配置 */
type DialogInitialParams = {
  /** dialog 节点 */
  el: HTMLDialogElement | string;
  /** 是否在点击 esc 时关闭弹窗 */
  escClose?: boolean;
};
const Dialog = (option?: DialogInitialParams) => {
  let $dialog: HTMLDialogElement;
  let config: Required<DialogInitialParams>;

  function handleKeydown(e: KeyboardEvent) {
    if (e.code === "Escape") {
      e.preventDefault();
      close();
    }
  }

  /**
   * 初始化对话框
   * @param option 配置项
   */
  function init(option: DialogInitialParams) {
    if (!config) {
      config = { escClose: true, ...option };
      $dialog = $one(config.el) as HTMLDialogElement;
      if ($dialog) {
        if (!hasClass($dialog, "l-dialog")) {
          addClass($dialog, "l-dialog");
        }
        on($dialog, "keydown", handleKeydown as any);
      }
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
    }
  }

  if (option != null) {
    init(option);
  }

  return {
    init,
    open,
    close,
  };
};

export default Dialog;
