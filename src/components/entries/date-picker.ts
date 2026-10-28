import "./calendar";
import "./button";
import "./icon-calendar";
import "./icon-arrow-left";
import "./icon-arrow-right";
import "./icon-d-arrow-left";
import "./icon-d-arrow-right";
// 由消费端或后续 Vite 插件引入全局样式。
// import "../../../styles/popover.css";
// 由消费端或后续 Vite 插件引入全局样式。
// import "../../../styles/datepicker.css";
import DatePicker from "../date_picker";
import { regist } from "../utils";

regist(DatePicker);
export { default } from "../date_picker";
export * from "../date_picker";