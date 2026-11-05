import { Form, FormItem, Input, regist } from "../src/components/index.ts";
const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
try {
  regist(Form);
  regist(FormItem);
  regist(Input);
  await tick();
  const form = document.querySelector("#form"),
    input = form.querySelector("l-input");
  const owner = form.nativeForm;
  check("same-markup-owner", input.form === owner && owner.parentNode === form);
  check("no-shadow-native-form", !form.shadowRoot.querySelector("form"));
  check(
    "helper-unprojected",
    owner.hidden && owner.assignedSlot === null && owner.slot === "__l_form_owner",
  );
  const layout = form.shadowRoot.querySelector(".l-form");
  check(
    "layout-classes-preserved",
    layout.classList.contains("l-form-inline") && layout.classList.contains("l-form--top"),
  );
  check("label-width-preserved", form.style.getPropertyValue("--l-form-label-width") === "120px");
  check("initial-name-and-data", input.name === "name" && form.getData().name === "");
  let submits = 0,
    last;
  form.addEventListener("submit", (e) => {
    submits++;
    last = e.detail;
  });
  form.submit();
  await tick();
  check("failure-no-submit", submits === 0 && !!form.validationErrors.name);
  input.value = "Alice";
  form.submit();
  await tick();
  check("success-once", submits === 1 && last.name === "Alice");
  check("native-FormData", new FormData(owner).get("name") === "Alice");
  let resets = 0;
  const reset = input.reset.bind(input);
  input.reset = () => {
    resets++;
    reset();
  };
  form.reset();
  await tick();
  check("reset-once", resets === 1 && input.value === "" && form.getData().name === "");
  check("reset-clears-errors", Object.keys(form.validationErrors).length === 0);
  check("reset-FormData", new FormData(owner).get("name") === "");
  input.value = "Bob";
  owner.requestSubmit();
  await tick();
  check("native-submit-bridge", submits === 2 && last.name === "Bob");
  const alone = document.querySelector("#standalone"),
    single = alone.querySelector("l-input");
  single.value = "changed";
  check("standalone-data", new FormData(alone).get("alone") === "changed");
  alone.reset();
  check(
    "standalone-reset",
    single.value === "initial" && new FormData(alone).get("alone") === "initial",
  );
  let resetCancelled = (event) => event.preventDefault();
  owner.addEventListener("reset", resetCancelled);
  input.value = "kept";
  form.reset();
  await tick();
  check("cancelled-reset-preserves-value", input.value === "kept" && resets === 1);
  owner.removeEventListener("reset", resetCancelled);
  const zero = document.createElement("l-input");
  zero.name = "zero";
  zero.defaultValue = 0;
  alone.append(zero);
  zero.value = 4;
  alone.reset();
  check("zero-reset-baseline", zero.value === "0" && new FormData(alone).get("zero") === "0");
  const bool = document.createElement("l-input");
  bool.name = "bool";
  bool.defaultValue = false;
  alone.append(bool);
  bool.value = true;
  alone.reset();
  check(
    "false-reset-baseline",
    bool.value === "false" && new FormData(alone).get("bool") === "false",
  );
  const outer = document.createElement("form");
  document.body.append(outer);
  const embedded = document.createElement("l-form");
  outer.append(embedded);
  const embeddedInput = document.createElement("l-input");
  embeddedInput.name = "embedded";
  embeddedInput.value = "outer";
  embedded.append(embeddedInput);
  await tick();
  check(
    "native-ancestor-reused-production",
    embedded.nativeForm === outer &&
      embeddedInput.form === outer &&
      embedded.querySelector("form") === null,
  );
  let typed = 0;
  input.addEventListener("change", () => typed++);
  input.$inner.value = "typed";
  input.$inner.dispatchEvent(new Event("input", { bubbles: true }));
  check(
    "user-input-synchronizes",
    form.getData().name === "typed" && new FormData(owner).get("name") === "typed",
  );
  const item = form.querySelector("l-form-item");
  const formSheet = form.shadowRoot.adoptedStyleSheets[0];
  const itemSheet = item.shadowRoot.adoptedStyleSheets[0];
  const peerItem = document.createElement("l-form-item");
  embedded.append(peerItem);
  await tick();
  check(
    "form-shares-constructed-sheet",
    formSheet instanceof CSSStyleSheet &&
      form.shadowRoot.adoptedStyleSheets.length === 1 &&
      embedded.shadowRoot.adoptedStyleSheets[0] === formSheet,
  );
  check(
    "item-shares-separate-constructed-sheet",
    itemSheet instanceof CSSStyleSheet &&
      item.shadowRoot.adoptedStyleSheets.length === 1 &&
      peerItem.shadowRoot.adoptedStyleSheets[0] === itemSheet &&
      itemSheet !== formSheet,
  );
  check(
    "no-instance-style-elements",
    !form.shadowRoot.querySelector("style") && !item.shadowRoot.querySelector("style"),
  );
  check(
    "constructed-sheets-have-rules",
    formSheet.cssRules.length > 0 && itemSheet.cssRules.length > 0,
  );
  peerItem.remove();
  const savedOwner = owner;
  form.remove();
  check("disconnect-no-orphan", !savedOwner.isConnected);
  document.body.append(form);
  await tick();
  check(
    "remount-reuses-form-item-sheets",
    form.shadowRoot.adoptedStyleSheets[0] === formSheet &&
      item.shadowRoot.adoptedStyleSheets[0] === itemSheet &&
      !form.shadowRoot.querySelector("style") &&
      !item.shadowRoot.querySelector("style"),
  );
  input.value = "reconnect";
  form.submit();
  await tick();
  check(
    "reconnect-validator-and-owner",
    submits === 3 && last.name === "reconnect" && input.form === form.nativeForm,
  );
  form.setAttribute("inline", "false");
  form.setAttribute("label-position", "left");
  // 与 BaseComponent 的批量渲染同一帧，稍后检查类更新。
  await new Promise((resolve) => setTimeout(resolve, 100));
  // 无可见窗口时浏览器可能暂停动画帧；显式刷新批次保证布局断言确定。
  form.updateDOM(new Set(["inline", "label-position"]));
  check(
    "dynamic-layout",
    form.shadowRoot.querySelector(".l-form").classList.contains("l-form--left") &&
      !form.shadowRoot.querySelector(".l-form").classList.contains("l-form-inline"),
  );
  const multi = document.createElement("l-form");
  multi.innerHTML =
    '<l-form-item required label="姓名" prop="name"><l-input></l-input></l-form-item><l-form-item required label="密码" prop="password"><l-input type="password"></l-input></l-form-item><l-form-item required label="确认密码" prop="confirmPassword"><l-input type="password"></l-input></l-form-item>';
  document.body.append(multi);
  await tick();
  const allInvalid = await multi.validate();
  check(
    "validate-collects-all-field-errors",
    !allInvalid.result && Object.keys(allInvalid.errors).length === 3,
  );
  let multiSubmits = 0;
  multi.addEventListener("submit", () => multiSubmits++);
  multi.submit();
  await tick();
  check(
    "one-submit-shows-all-field-errors",
    multiSubmits === 0 &&
      ["name", "password", "confirmPassword"].every((key) => !!multi.validationErrors[key]) &&
      Array.from(multi.querySelectorAll("l-form-item")).every((item) =>
        item.shadowRoot.textContent.includes(multi.validationErrors[item.getAttribute("prop")]),
      ),
  );
  multi.querySelector("l-input").value = "Alice";
  multi.submit();
  await tick();
  check(
    "resubmit-preserves-all-remaining-errors",
    !multi.validationErrors.name &&
      !!multi.validationErrors.password &&
      !!multi.validationErrors.confirmPassword &&
      multiSubmits === 0,
  );
  const manualField = multi.querySelector("l-input");
  manualField.defaultValue = "reset-default";
  manualField.value = "edited";
  manualField.setValidity({ customError: true }, "手动校验错误");
  multi.setErrors({ name: "业务错误" });
  multi.reset();
  await tick();
  check(
    "reset-clears-business-errors-preserves-manual-validity",
    Object.keys(multi.validationErrors).length === 0 &&
      manualField.value === "reset-default" &&
      manualField.validity.customError &&
      manualField.validationMessage === "手动校验错误" &&
      !manualField.checkValidity(),
  );
  check(
    "reset-clears-business-error-display",
    !manualField.classList.contains("is-error") &&
      !multi.querySelector("l-form-item").shadowRoot.textContent.includes("业务错误"),
  );
  manualField.setValidity();
  check("manual-validity-explicit-clear", manualField.checkValidity());
  manualField.setValidity({ customError: true }, "独立重置保留");
  manualField.reset();
  check("field-reset-preserves-manual-validity", manualField.validationMessage === "独立重置保留");
  multi.remove();
  document.querySelector("#result").textContent = JSON.stringify({
    userAgent: navigator.userAgent,
    checks,
    pass: checks.every((item) => item.pass),
  });
} catch (error) {
  document.querySelector("#result").textContent = JSON.stringify({
    pass: false,
    error: String(error),
    checks,
  });
}