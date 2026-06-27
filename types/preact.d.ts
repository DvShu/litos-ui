import type { HTMLAttributes } from "preact";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  type?: "primary" | "default" | "link";
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  "loading-text"?: string;
  ghost?: boolean;
}

interface ModalProps extends HTMLAttributes<HTMLElement> {
  header?: string | boolean;
  show?: string | boolean;
  onok?: (e: CustomEvent) => void;
  oncancel?: (e: CustomEvent) => void;
  footer?: boolean | string;
  close?: boolean | string;
  title?: string;
  "destroy-on-close"?: boolean;
  "vertical-align"?: string;
  "mask-closable"?: string | boolean;
}

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  closeable?: boolean;
  type?: "primary" | "info" | "success";
}

interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelPosition?: "top" | "left";
  required?: boolean;
  prop?: string;
  /** 验证失败时的提示信息 */
  validity?: string;
  pattern?: string;
}

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** 标题 */
  "page-title"?: string;
  /** 对齐方式 */
  align?: "left" | "center";
  onaction?: (e: CustomEvent) => void;
}

interface CheckBoxProps extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  value?: string;
  label?: string;
}

interface CheckboxGroupProps extends HTMLAttributes<HTMLElement> {
  gap?: string;
  value?: string;
  onchange?: (e: CustomEvent) => void;
}

interface MenuProps extends HTMLAttributes<HTMLElement> {
  index?: string;
  onselect?: (e: CustomEvent) => void;
  /** 当前选中的菜单 */
  "selected-index"?: string;
}

interface IconProps extends HTMLAttributes<HTMLElement> {}

interface QrcodeProps extends HTMLAttributes<HTMLElement> {
  text: string;
  size?: number | string;
  level?: "H" | "M" | "Q" | "L";
}

type FormProps = HTMLAttributes<HTMLElement> & {
  /** 表单内的输入元素是否铺满剩余宽度 */
  "inner-block"?: boolean;
  /** 标签的位置; 默认: left */
  "label-position"?: "top" | "left" | "right";
  /** 表单域标签的宽度, 可以传 auto */
  "label-width"?: string;
  novalidate?: boolean;
  onsubmit?: (
    e: CustomEvent<{
      email: string;
      password: string;
    }>,
  ) => void | Promise<void>;
};

type InputProps = HTMLAttributes<HTMLElement> & {
  placeholder?: string;
  value?: string;
  oninput?: (e: CustomEvent) => void;
  type?: string;
  name?: string;
  maxlength?: number;
};

// 正确扩展 Preact 的 JSX 命名空间以支持 VSCode 智能感知
declare global {
  namespace preact {
    namespace JSX {
      // 扩展 IntrinsicElements 以支持自定义元素
      interface IntrinsicElements {
        "l-arrow-right-icon": IconProps;
        "l-select-icon": IconProps;
        "l-close-icon": IconProps;
        "l-checkbox": CheckBoxProps;
        "l-checkbox-group": CheckboxGroupProps;
        "l-radio-group": CheckboxGroupProps;
        "l-radio": CheckBoxProps;
        "l-button": ButtonProps;
        "l-tag": TagProps;
        "l-modal": ModalProps;
        "l-form-item": FormItemProps;
        "l-form": FormProps;
        "l-page-header": PageHeaderProps;
        "l-menu": MenuProps;
        "l-sub-menu": MenuProps;
        "l-menu-item": MenuProps;
        "l-arrow-down-icon": IconProps;
        "l-qrcode": QrcodeProps;
        "l-input": InputProps;
      }
    }
  }
}