// 可选：点击预览需要；使用时另行引入 litos-ui/image-preview，仅展示图片可设置 preview-disabled。
// import "./image-preview";
import Image from "../image";
import { regist } from "../utils";

regist(Image);
export { default } from "../image";
export * from "../image";