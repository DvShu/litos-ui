// 可选：multiple 多选标签需要；使用时另行引入 litos-ui/tag。
// import "./tag";
import "./icon-arrow-down";
// 可选：clearable 清空功能需要；使用时另行引入 litos-ui/icon-close-filled。
// import "./icon-close-filled";
// 可选：multiple 多选标签移除按钮需要；使用时另行引入 litos-ui/icon-close。
// import "./icon-close";
// 可选：loading 状态需要；使用时另行引入 litos-ui/icon-loading。
// import "./icon-loading";
import "./icon-select";
// 由消费端或后续 Vite 插件引入全局样式。
// import "../../../styles/popover.css";
// 由消费端或后续 Vite 插件引入全局样式。
// import "../../../styles/select.css";
import Select from "../select";
import { regist } from "../utils";

regist(Select);
export { default } from "../select";
export * from "../select";