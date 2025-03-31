import Modal from "./index";
import Button from "../button/index";
import CloseIcon from "../icon/close";
import InfoIcon from "../icon/info";
import { regist } from "../utils/index";
import { $$, on, $one } from "ph-utils/dom";
import FormItem from "../form/form_item";
import Input from "../input";

type AlertOptions = {
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 右上角关闭按钮, 1-显示在框内，2-显示在框角, 0-不显示, 默认: 0 */
  close?: number;
  /** 点击蒙层是否允许关闭, 默认: false */
  maskClosable?: boolean;
  /** 显示图标 */
  icon?: () => HTMLElement;
};

type PromptOptions = AlertOptions & {
  placeholder?: string;
};

function renderModal(
  title: string,
  content: string,
  options: PromptOptions,
  type = "alert"
): Promise<boolean | string> {
  return new Promise((resolve) => {
    const inner: string[] = [];
    if (options.icon) {
      let iconNode = options.icon();
      iconNode.setAttribute("slot", "header");
      inner.push(iconNode.outerHTML);
    }
    inner.push(`<span slot="header">${title}</span>`);
    if (type === "prompt") {
      inner.push(
        `<l-form-item label="${content}" label-position="top" inner-block>`
      );
      inner.push(
        `<l-input placeholder="${options.placeholder || ""}"></l-input>`
      );
      inner.push("</l-form-item>");
    } else {
      inner.push(`<span>${content}</span>`);
    }
    let $modal = $$("l-modal", {
      cancel: `${options.showCancel}`,
      innerHTML: inner.join(""),
      open: true,
      class: `l-modal-box l-modal-box--${type}`,
      close: `${options.close}`,
      "mask-closable": `${options.maskClosable}`,
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
        let value: boolean | string = true;
        if (type === "prompt") {
          const $input = $one(".l-modal-box l-input") as HTMLInputElement;
          value = $input.value;
        }
        $modal.removeAttribute("open");
        resolve(value);
      },
      { once: true }
    );
    on(
      $modal,
      "cancel",
      () => {
        $modal.removeAttribute("open");
        resolve(false);
      },
      { once: true }
    );
    document.body.appendChild($modal);
  });
}

function alert(
  content: string,
  title?: string,
  option?: AlertOptions
): Promise<boolean> {
  regist([Button, Modal, CloseIcon]);
  return new Promise((resolve) => {
    const opts = {
      showCancel: false,
      close: 0,
      maskClosable: false,
      icon: undefined,
      ...option,
    };
    return renderModal(title || "提示", content, opts, "alert");
  });
}

function confirm(content: string, title?: string, option?: AlertOptions) {
  regist([Button, Modal, CloseIcon, InfoIcon]);
  const opts = {
    showCancel: true,
    close: 0,
    maskClosable: true,
    icon: () => $$("l-info-icon", { style: "color:#1890ff;" }),
    ...option,
  };
  return renderModal(title || "提示", content, opts, "confirm");
}

function prompt(label: string, title?: string, option?: PromptOptions) {
  regist([Button, Modal, CloseIcon, InfoIcon, FormItem, Input]);
  const opts = {
    showCancel: true,
    close: 0,
    maskClosable: true,
    placeholder: "",
    ...option,
  };
  return renderModal(title || "提示", label, opts, "prompt");
}

export default {
  alert,
  confirm,
  prompt,
};
