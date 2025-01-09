<<<<<<< HEAD
class Button {
  public static baseName = "button";
  #abc() {}
}

const a = new Button();
console.log(Button.baseName);
=======
import { regist } from "./components/index";
import Button from "./components/button";

regist([Button]);
>>>>>>> 4c4a6c8 (fix: 修复tree shaking)
