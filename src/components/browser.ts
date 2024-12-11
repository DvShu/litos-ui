import { regist } from "./util";

import Button from "./button";
import Input from "./input";
import BaseIcon from "./icon/base";
import ArrowDownIcon from "./icon/arrow_down";
import CaretTopIcon from "./icon/caret_top";
import CaretBottomIcon from "./icon/caret_bottom";
import FontIcon from "./icon/font_icon";
import LoadingIcon from "./icon/loading";
import SearchIcon from "./icon/search";
import Message from "./message";
import Form from "./form";
import FormItem from "./form/form_item";
import Radio from "./radio";
import List from "./list";
import Polygon from "./polygon";
//Web Components Import
regist(Polygon)
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
