// 可选：picture-card 图片占位和失败状态需要；使用时另行引入 litos-ui/icon-picture。
// import "./icon-picture";
// 可选：picture-card 预览按钮需要；使用时另行引入 litos-ui/icon-eye-outline。
// import "./icon-eye-outline";
import "./icon-close";
// 可选：picture-card 删除按钮需要；使用时另行引入 litos-ui/icon-delete。
// import "./icon-delete";
// 可选：内置图片预览需要；使用时另行引入 litos-ui/image-preview。
// import "./image-preview";
import Upload from "../upload";
import { regist } from "../utils";

regist(Upload);
export { default } from "../upload";
export * from "../upload";