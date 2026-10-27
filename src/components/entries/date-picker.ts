import "./calendar";
import "./button";
import "./icon-calendar";
import "./icon-arrow-left";
import "./icon-arrow-right";
import "./icon-d-arrow-left";
import "./icon-d-arrow-right";
import { installStyle } from "../utils/style";
import css0 from "../../../styles/popover.css?inline";
import css1 from "../../../styles/datepicker.css?inline";
import DatePicker from "../date_picker";
import { regist } from "../utils";

installStyle("popover", css0);
installStyle("datepicker", css1);
regist(DatePicker);
export { default } from "../date_picker";
export * from "../date_picker";