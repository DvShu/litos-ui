import "./tag";
import "./icon-arrow-down";
import "./icon-close-filled";
import "./icon-close";
import "./icon-loading";
import "./icon-select";
import { installStyle } from "../utils/style";
import css0 from "../../../styles/popover.css?inline";
import css1 from "../../../styles/select.css?inline";
import Select from "../select";
import { regist } from "../utils";

installStyle("popover", css0);
installStyle("select", css1);
regist(Select);
export { default } from "../select";
export * from "../select";