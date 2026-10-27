import "./icon-info";
import "./icon-success";
import "./icon-warn";
import "./icon-close-filled";
import "./icon-close";
import { installStyle } from "../utils/style";
import css0 from "../../../styles/notification.css?inline";
import Notification from "../notification";
import { regist } from "../utils";

installStyle("notification", css0);
regist(Notification);
export { default } from "../notification";
export * from "../notification";