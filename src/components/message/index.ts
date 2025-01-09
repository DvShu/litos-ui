import { useId, regist } from "../utils";
import { transition } from "ph-utils/dom";
import MaskClose from "../icon/mask_close";
import Success from "../icon/success";
import Warn from "../icon/warn";
import Info from "../icon/info";

const instances: HTMLElement[] = []; // 保存所有的消息体
const transitionSheet: [string, string, string][] = [
  ["opacity", "0", "0.3s"],
  ["transform", "translate3d(-50%, -100%, 0)", "0.3s"],
];

/** 消息配置 */
interface MessageOption {
  /** 显示时间，单位为毫秒，默认为：3000。 设为 0 则不会自动关闭 */
  duration?: number;
  /** 显示的消息 */
  message: string;
  /** 消息类型：error、warning、success、info */
  type?: string;
  /** 宽度 */
  width?: string;
  /** 自定义类名 */
  customClass?: string;
}

interface MessageInstance {
  (option: string | MessageOption): string;
  info: (msg: string | MessageOption) => string;
  warn: (msg: string | MessageOption) => string;
  success: (msg: string | MessageOption) => string;
  error: (msg: string | MessageOption) => string;
  show: (msg: string | MessageOption) => string;
  close: (id: string) => void;
  [index: string]: any;
}

/** 关闭消息 */
function close(id: string) {
  // 查询需要删除的消息节点
  const idx = instances.findIndex((vm) => {
    return vm.id === id;
  });
  if (idx === -1) return;
  // 从消息列表中移除消息
  const removedVm = instances.splice(idx, 1)[0];
  if (removedVm == null) return;
  transition(removedVm, transitionSheet, "leave", () => {
    removedVm.remove();
  });
  const removedHeight = 15 + removedVm.offsetHeight;
  const len = instances.length;
  if (len === 0) return;
  // 消息移除后，重新构建后续消息的 top
  for (let i = idx; i < len; i++) {
    const instance = instances[i];
    const offset = parseInt(instance.style.top, 10) - removedHeight;
    instance.style.setProperty("top", `${offset}px`);
  }
}

function renderBody(props: any) {
  const $message = document.createElement("div");
  $message.id = props.id;
  const type = props.type || "info";
  // class
  let className = `l-message l-message-${type}`;
  if (props.customClass) {
    className += " " + props.customClass;
  }
  $message.className = className;
  // style
  $message.style.setProperty("top", `${props.offset}px`);
  $message.style.setProperty("z-index", `${props.zindex || 1000}`);
  if (props.width) {
    $message.style.setProperty("width", props.width);
  }
  // icon
  let iconName = type;
  if (iconName === "error") {
    iconName = "mask-close";
  }
  $message.innerHTML = [
    '<div class="l-message-container">',
    `<l-${iconName}-icon class="l-message-icon"></l-${iconName}-icon>`,
    `<span class="l-message-content">${props.message}</span>`,
    "</div>",
  ].join("");
  return $message;
}

const Message: MessageInstance = ((option: string | MessageOption) => {
  regist([MaskClose, Success, Warn, Info]);
  // 计算消息的位置
  const offset = instances.reduce(
    (prev, curr) => prev + curr.offsetHeight + 15,
    15
  );

  // 消息id
  const id = useId();
  const props: any = typeof option === "string" ? { message: option } : option;
  props.id = id;
  props.offset = offset;

  const $msg = renderBody(props);
  instances.push($msg);
  document.body.appendChild($msg);
  transition($msg, transitionSheet, "enter");
  let duration = props.duration;
  if (duration == null) {
    duration = 3000;
  }
  if (duration !== 0) {
    setTimeout(() => {
      close(id);
    }, duration);
  }
  return id;
}) as any;

function show(
  options: string | MessageOption,
  type: "info" | "success" | "error" | "warn" = "info"
) {
  const opts: MessageOption =
    typeof options === "string" ? { message: options } : options;
  opts.type = type as any;
  return Message(opts);
}
for (const type of ["info", "success", "error", "warn", "show"]) {
  Message[type] = (options: string | MessageOption) => {
    const opts: MessageOption =
      typeof options === "string" ? { message: options } : options;
    if (type !== "show") {
      opts.type = type as any;
    } else if (opts.type == null) {
      opts.type = "info";
    }
    return Message(opts);
  };
}
Message.info = (options: string | MessageOption) => show(options, "info");
Message.success = (options: string | MessageOption) => show(options, "success");
Message.error = (options: string | MessageOption) => show(options, "error");
Message.warn = (options: string | MessageOption) => show(options, "warn");
Message.show = (options: string | MessageOption) => show(options);
Message.close = close;

export default Message;
