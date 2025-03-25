import Modal from "./index";
import Button from "../button/index";
import { regist } from "../utils/index";
import { $$ } from "ph-utils/dom";

type ModalBoxOptions = {
  /** 是否显示取消按钮, 默认: true */
  showCancel?: boolean;
};

function defaultOption(option?: ModalBoxOptions): ModalBoxOptions {
  return { showCancel: true, ...option };
}

function alert(content: string, title: string, option?: ModalBoxOptions) {
  regist([Button, Modal]);
  const opts = defaultOption(option);
  const $modal = $$("l-modal", {
    cancel: opts.showCancel,
    title,
    textContent: content,
    open: true,
  });
  document.body.appendChild($modal);
}

export default {
  alert,
};
