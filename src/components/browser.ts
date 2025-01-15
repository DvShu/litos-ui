import { regist } from "./utils";

import Button from "./button";
import Input from "./input";
import BaseIcon from "./icon/base";
import ArrowDownIcon from "./icon/arrow_down";
import ArrowLeftIcon from "./icon/arrow_left";
import ArrowRightIcon from "./icon/arrow_right";
import ArrowUpIcon from "./icon/arrow_up";
import CaretTopIcon from "./icon/caret_top";
import CaretBottomIcon from "./icon/caret_bottom";
import FontIcon from "./icon/font_icon";
import LoadingIcon from "./icon/loading";
import SearchIcon from "./icon/search";
import SunIcon from "./icon/sun";
import MoonIcon from "./icon/moon";
import ReductionIcon from "./icon/reduction";
import RefreshLeftIcon from "./icon/refresh_left";
import RefreshRightIcon from "./icon/refresh_right";
import ThemeDefaultIcon from "./icon/theme_default";
import SortIcon from "./icon/sort";
import Message from "./message";
import Form from "./form";
import FormItem from "./form/form_item";
import Radio from "./radio";
import List from "./list";
import Polygon from "./polygon";
import SelectOri from "./select_ori";
import Switch from "./switch";
import ColorPicker from "./color_picker";
import Tabbar from "./tabbar";
import Theme from "./theme";
import ThemeColor from "./theme/theme_color";
import Popover from "./popover";
import Popconfirm from "./popconfirm";
import Checkbox from "./checkbox";
//Web Components Import
regist(Checkbox)
regist(Popconfirm);
regist(Popover);
regist(ThemeDefaultIcon);
regist(ThemeColor);
regist(Theme);
regist(Tabbar);
regist(ColorPicker);
regist(Switch);
regist(SelectOri);
regist(Polygon);
regist(List);
regist(Radio);
regist(Form);
regist(FormItem);
regist(Button);
regist(Input);
regist(BaseIcon);
regist(ArrowDownIcon);
regist(CaretTopIcon);
regist(CaretBottomIcon);
regist(FontIcon);
regist(LoadingIcon);
regist(SearchIcon);
regist(SunIcon);
regist(MoonIcon);
regist(ReductionIcon);
regist(RefreshLeftIcon);
regist(RefreshRightIcon);
regist(SortIcon);
regist([ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon]);

// @ts-expect-error x
globalThis.LMessage = Message;

/** 加载 style 样式 */
function loadStyle() {
  const scriptSrc = (document.currentScript as HTMLScriptElement).src;
  const lS = scriptSrc.lastIndexOf("/");
  const base = scriptSrc.slice(0, lS + 1);
  const styleUrl = `${base}litos-ui.css`;
  const $style = document.createElement("link");
  $style.rel = "stylesheet";
  $style.href = styleUrl;
  $style.id = "litos-ui-style";
  document.head.appendChild($style);
}

loadStyle();

import "../../styles/reset.css";
import "../../styles/message.css";
import "./styles/animation.css";
import "./button/index.less";
import "./icon/index.less";
import "./input/index.less";
import "./form/index.less";
import "./radio/index.less";
import "./list/index.less";
import "./polygon/index.less";
import "./switch/index.less";
import "./color_picker/index.less";
import "./tabbar/index.less";
import "./theme/index.less";
import "./popover/index.less";
import "./popconfirm/index.less";
import "./checkbox/index.less";
