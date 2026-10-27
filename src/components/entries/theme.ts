import "./button";
import "./select-ori";
import "./switch";
import "./radio-group";
import "./icon-theme-default";
import "./icon-sun";
import "./icon-moon";
import Theme from "../theme";
import { regist } from "../utils";

regist(Theme);
export { default } from "../theme";
export * from "../theme";