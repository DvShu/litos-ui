import { read, write } from "ph-utils/file";
import { snakeCaseStyle } from "ph-utils";
import path from "node:path";

const dtsPath = path.join(process.cwd(), "lib/index.d.ts");

const reg = /export \{ default as (\w+) \} from ("\.\/.+");/g;
let dts = await read(dtsPath, null);

if (dts != null) {
  let match;

  const tagDts = [
    "\ndeclare global {",
    "    interface HTMLElementTagNameMap {",
  ];
  // 生成自定义标签的类型定义
  while ((match = reg.exec(dts)) !== null) {
    const name = match[1];
    const path = match[2];
    if (name !== "Message") {
      tagDts.push(
        `        "l-${snakeCaseStyle(name)}": import(${path}).default`
      );
    }
  }
  tagDts.push("    }\n}");
  dts = dts + tagDts.join("\n");

  await write(dtsPath, dts);
}
