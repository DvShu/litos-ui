import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "MyLib",
      // 将添加适当的扩展名后缀
      fileName: "my-lib",
    },
  },
});
