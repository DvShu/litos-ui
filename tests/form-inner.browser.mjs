import { Input as AggregateInput, regist } from "../src/components/index.ts";
import EntryInput from "../src/components/entries/input.ts";

const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
try {
  check("entry-and-aggregate-identity", AggregateInput === EntryInput);
  regist(AggregateInput);
  check("same-registration", customElements.get("l-input") === EntryInput);
  const form = document.querySelector("form");
  const input = document.querySelector("l-input");
  check("predefinition-upgrade", input instanceof EntryInput);
  check("inherited-formAssociated", EntryInput.formAssociated === true);
  check("native-owner", input.form === form && Array.from(form.elements).includes(input));
  check("native-labels", input.labels.length === 1 && input.labels[0].htmlFor === input.id);
  const nativeInput = input.shadowRoot.querySelector("input");
  check("actual-input-rendered", nativeInput instanceof HTMLInputElement);
  const internals = input.internals;
  let invalids = 0;
  input.addEventListener("invalid", (event) => {
    invalids++;
    event.preventDefault();
  });
  input.setValidity({ customError: true }, "测试错误", nativeInput);
  check(
    "validity-and-message",
    input.validity.customError && input.validationMessage === "测试错误",
  );
  check("check-invalid", input.checkValidity() === false && invalids === 1);
  check("report-invalid", input.reportValidity() === false && invalids === 2);
  check("form-invalid", form.checkValidity() === false);
  input.setValidity();
  check(
    "clear-validity",
    input.validity.valid && input.validationMessage === "" && input.checkValidity(),
  );
  input.remove();
  form.append(input);
  check("internals-reused-after-remount", input.internals === internals && input.form === form);
  const second = document.createElement("l-input");
  form.append(second);
  check("one-internals-per-instance", second.internals !== internals && second.form === form);
  let duplicateRejected = false;
  try {
    input.attachInternals();
  } catch (error) {
    duplicateRejected = error.name === "NotSupportedError";
  }
  check("second-attach-rejected", duplicateRejected);
  // T340 的最小 Input 已启用值提交，其他控件仍留待 T327。
  check("input-value-submission", new FormData(form).get("username") === "初值");
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