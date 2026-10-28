import "./icon-info";
import "./icon-success";
import "./icon-warn";
import "./icon-close-filled";
import "./icon-close";
// 由消费端或后续 Vite 插件引入全局样式。
// import "../../../styles/notification.css";
import Notification from "../notification";
import { regist } from "../utils";

regist(Notification);
export { default } from "../notification";
export * from "../notification";