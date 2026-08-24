import Dialog from "./index";
import { regist } from "../utils/index";
import { $$, on, $one } from "ph-utils/browser";
import DialogContainer from "./dialog_container";
import Button from "../button/index";
import CloseIcon from "../icon/close";
import InfoIcon from "../icon/info";
import FormItem from "../form/form_item";
import Input from "../input";

type AlertOptions = {
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 右上角关闭按钮, 1 - 显示在框内, 2 - 显示在框角, 0 - 不显示, 默认: 0 */
  close?: number;
  /** 点击蒙层是否允许关闭, 默认: false */
  maskClosable?: boolean;
  /** 显示图标 */
  icon?: () => HTMLElement;
};

type PromptOptions = AlertOptions & {
  placeholder?: string;
};

function renderDialog(
  title: string,
  content: string,
  options: PromptOptions,
  type = "alert",
): Promise<boolean | string> {
  return new Promise((resolve) => {
    // 构建 container 内容
    const inner: string[] = [];
    if (options.icon) {
      let iconNode = options.icon();
      iconNode.setAttribute("slot", "header");
      inner.push(iconNode.outerHTML);
    }
    inner.push(`<span slot="header">${title}</span>`);
    if (type === "prompt") {
      inner.push(`<l-form-item label="${content}" label-position="top" inner-block>`);
      inner.push(`<l-input placeholder="${options.placeholder || ""}"></l-input>`);
      inner.push("</l-form-item>");
    } else {
      inner.push(`<span>${content}</span>`);
    }

    // 动态创建 dialog 和 container
    const $dialog = document.createElement("dialog");
    const $container = document.createElement("l-dialog-container") as HTMLElement;
    $container.setAttribute("header", title);
    $container.setAttribute("close", `${options.close}`);
    $container.setAttribute("show-cancel", `${options.showCancel}`);
    $container.innerHTML = inner.join("");
    $dialog.appendChild($container);
    document.body.appendChild($dialog);

    const dialog = new Dialog({
      el: $dialog,
      maskClosable: options.maskClosable,
      close: options.close,
      onAction: (action, done) => {
        if (action === "ok") {
          let value: boolean | string = true;
          if (type === "prompt") {
            const $input = $one("l-input", $container) as HTMLInputElement;
            value = $input ? $input.value : "";
          }
          done();
          resolve(value);
        } else {
          done();
          resolve(false);
        }
        // 动画结束后清理 DOM
        setTimeout(() => {
          dialog.destroy();
          $dialog.remove();
        }, 350);
      },
    });
    dialog.open();
  });
}

function alert(content: string, title?: string, option?: AlertOptions): Promise<boolean> {
  regist([Button, DialogContainer, CloseIcon]);
  const opts: Required<AlertOptions> = {
    showCancel: false,
    close: 0,
    maskClosable: false,
    icon: undefined as any,
    ...option,
  };
  return renderDialog(title || "提示", content, opts, "alert") as Promise<boolean>;
}

function confirm(content: string, title?: string, option?: AlertOptions): Promise<boolean> {
  regist([Button, DialogContainer, CloseIcon, InfoIcon]);
  const opts: Required<AlertOptions> = {
    showCancel: true,
    close: 0,
    maskClosable: true,
    icon: () => $$("l-info-icon", { style: "color:#1890ff;" }),
    ...option,
  };
  return renderDialog(title || "提示", content, opts, "confirm") as Promise<boolean>;
}

function prompt(label: string, title?: string, option?: PromptOptions): Promise<string | false> {
  regist([Button, DialogContainer, CloseIcon, InfoIcon, FormItem, Input]);
  const opts: Required<PromptOptions> = {
    showCancel: true,
    close: 0,
    maskClosable: true,
    placeholder: "",
    icon: undefined as any,
    ...option,
  };
  return renderDialog(title || "提示", label, opts, "prompt") as Promise<string | false>;
}

export default {
  alert,
  confirm,
  prompt,
};
