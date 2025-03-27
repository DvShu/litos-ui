import Modal from "./index";
import Button from "../button/index";
import { regist } from "../utils/index";
import { $$, on, off } from "ph-utils/dom";

type ModalBoxOptions = {
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 右上角关闭按钮, 1-显示在框内，2-显示在框角, 0-不显示, 默认: 0 */
  close?: number;
  /** 点击蒙层是否允许关闭, 默认: false */
  maskClosable?: boolean;
};

function defaultOption(option?: ModalBoxOptions): ModalBoxOptions {
  return { showCancel: true, close: 0, maskClosable: false, ...option };
}

function alert(content: string, title: string, option?: ModalBoxOptions) {
  regist([Button, Modal]);
  const opts = defaultOption(option);
  if (!option || option.showCancel == null) {
    opts.showCancel = false;
  }
  let $modal = $$("l-modal", {
    cancel: `${opts.showCancel}`,
    title,
    textContent: content,
    open: true,
    class: "l-modal-box",
    close: `${opts.close}`,
  });
  on(
    $modal,
    "close",
    () => {
      $modal.remove();
      $modal = undefined as any;
    },
    { once: true }
  );
  on(
    $modal,
    "ok",
    () => {
      $modal.removeAttribute("open");
    },
    { once: true }
  );
  document.body.appendChild($modal);
}

export default {
  alert,
};
