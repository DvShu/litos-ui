import { $one } from "ph-utils/dom";

/** 初始化对话框配置 */
type DialogInitialParams = {
  /** dialog 节点 */
  el: HTMLDialogElement | string;
  /** 是否在点击 esc 时关闭弹窗 */
  escClose?: boolean;
};
const DialogBox = (option?: DialogInitialParams) => {
  let $dialog: HTMLDialogElement;
  let config: Required<DialogInitialParams>;
  function init(option: DialogInitialParams) {
    if (!config) {
      config = { escClose: true, ...option };
      $dialog = $one(config.el) as HTMLDialogElement;
    }
  }

  if (option != null) {
    init(option);
  }

  return {
    init,
  };
};
export default DialogBox;
