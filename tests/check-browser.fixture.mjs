import "litos-ui/checkbox";
import "litos-ui/checkbox-group";
import "litos-ui/radio";
import "litos-ui/radio-group";
import "litos-ui/form-item";
import "litos-ui/form";

document.body.insertAdjacentHTML(
  "afterbegin",
  `<form id="native">
    <button id="before" type="button">Before</button>
    <l-checkbox id="half" name="standalone" value="0" indeterminate>Mixed option</l-checkbox>
    <fieldset id="field">
      <legend><l-checkbox id="legend" name="legend" checked>Legend</l-checkbox></legend>
      <l-checkbox-group id="outer" name="multi" value="a">
        <l-checkbox id="a" name="ignored" value="a">A</l-checkbox>
        <div><l-checkbox id="b" value="b" disabled>B</l-checkbox></div>
        <l-checkbox-group id="inner" name="nested" value="n">
          <l-checkbox id="n" value="n">Nested N</l-checkbox>
          <l-checkbox id="m" value="m">Nested M</l-checkbox>
        </l-checkbox-group>
      </l-checkbox-group>
    </fieldset>
    <button id="before-radios" type="button">Before radios</button>
    <l-radio-group id="radios" name="radio" value="c" required aria-label="Priority">
      <l-radio id="first" value="a">First</l-radio>
      <l-radio id="blocked" value="b" disabled>Disabled</l-radio>
      <div style="display: contents"><l-radio id="selected" value="c" button>Selected</l-radio></div>
    </l-radio-group>
    <button id="after" type="button">After</button>
    <l-radio id="peer-a" name="peer" value="one" checked>One</l-radio>
    <l-radio id="peer-b" name="peer" value="two">Two</l-radio>
  </form>
  <form id="other-owner"><l-radio id="peer-outside" name="peer" value="other" checked>Other</l-radio></form>
  <l-form id="library">
    <l-form-item id="row" prop="choice" label="Choice" required>
      <l-radio-group id="library-group">
        <l-radio id="blank" value="">Empty option</l-radio>
        <l-radio id="regular" value="regular">Regular</l-radio>
      </l-radio-group>
    </l-form-item>
  </l-form>`,
);

const get = (id) => document.getElementById(id);
const owner = (id) => (id === "library" ? get(id).nativeForm : get(id));
const entries = (id) => [...new FormData(owner(id))];
const changes = [];
const resetCalls = [];
const checks = [];
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const check = (name, pass) => checks.push({ name, pass: !!pass });
const checked = (id) => get(id).checked && get(id).$input.checked;
const selected = (id) =>
  [...get(id).querySelectorAll("l-checkbox,l-radio")].filter((field) => field.checked);
const directChanges = (id) =>
  changes.filter((change) => change.id === id).map(({ value }) => value);
const errorText = () => get("row").shadowRoot.querySelector(".l-form-item__error")?.textContent;

for (const element of document.querySelectorAll(
  "l-checkbox,l-checkbox-group,l-radio,l-radio-group",
)) {
  const reset = element.reset.bind(element);
  element.reset = () => {
    resetCalls.push(element.id);
    reset();
  };
  element.addEventListener("change", (event) => {
    if (event.target === element) changes.push({ id: element.id, value: event.detail.value });
  });
}

window.checkFixture = {
  get,
  checks,
  check,
  entries,
  checked,
  equal,
  directChanges,
  active: () => document.activeElement?.id,
  focusVisible: (id) =>
    get(id).shadowRoot.activeElement === get(id).$input &&
    getComputedStyle(get(id)).outlineStyle === "solid",

  verifyFormBehavior() {
    check(
      "narrow entries register Check and Form in isolation",
      ["checkbox", "checkbox-group", "radio", "radio-group", "form-item", "form"].every(
        (name) => !!customElements.get(`l-${name}`),
      ) &&
        !customElements.get("l-theme") &&
        !customElements.get("l-input"),
    );
    check(
      "initial group and distinct owner entries",
      equal(entries("native"), [
        ["legend", "on"],
        ["multi", "a"],
        ["nested", "n"],
        ["radio", "c"],
        ["peer", "one"],
      ]) && equal(entries("other-owner"), [["peer", "other"]]),
    );
    check(
      "native input is unnamed and group owns its submission",
      get("a").$input.name === "" &&
        get("a").$input.form === null &&
        get("a").form === get("native") &&
        get("half").$input.indeterminate,
    );

    get("m").$input.click();
    check(
      "nested option affects only its nearest group",
      checked("m") &&
        checked("a") &&
        equal(directChanges("inner"), [["n", "m"]]) &&
        directChanges("outer").length === 0 &&
        equal(new FormData(get("native")).getAll("nested"), ["n", "m"]),
    );

    const moved = get("a");
    const oldInput = moved.$input;
    get("inner").append(moved);
    check(
      "cross-group move drops old submission and reapplies selection",
      !moved.checked &&
        !new FormData(get("native")).has("multi") &&
        !new FormData(get("native")).has("ignored"),
    );
    moved.$input.click();
    check(
      "moved option emits one new-group change",
      equal(directChanges("inner"), [
        ["n", "m"],
        ["n", "m", "a"],
      ]) &&
        directChanges("outer").length === 0 &&
        equal(directChanges("a"), ["a"]),
    );

    get("outer").prepend(moved);
    const order = directChanges("a").length;
    oldInput.click();
    check(
      "disconnected internal input can no longer change the member",
      moved.$input !== oldInput && checked("a") && directChanges("a").length === order,
    );
    moved.$input.click();
    check(
      "remounted option changes and reports exactly once",
      !moved.checked &&
        equal(directChanges("outer"), [[]]) &&
        directChanges("a").length === order + 1,
    );

    get("field").disabled = true;
    check(
      "fieldset disables the group and nested options, with first legend exception",
      get("a").$input.disabled &&
        get("m").$input.disabled &&
        !get("legend").$input.disabled &&
        new FormData(get("native")).has("legend") &&
        !new FormData(get("native")).has("nested"),
    );
    get("field").disabled = false;
    check(
      "re-enabling fieldset preserves member's own disabled state",
      !get("a").$input.disabled &&
        get("b").disabled &&
        get("b").$input.disabled &&
        !get("m").$input.disabled,
    );
    get("b").$input.click();
    check(
      "disabled native input causes no member or group change",
      directChanges("b").length === 0 && directChanges("outer").length === 1,
    );
    get("outer").value = "a";
    moved.value = "special&%";
    check(
      "changing the member token removes previous value from submission",
      !moved.checked && !new FormData(owner("native")).has("multi"),
    );
    get("outer").value = encodeURIComponent("special&%");
    check(
      "serialized special token recovers selection",
      checked("a") && new FormData(owner("native")).get("multi") === "special&%",
    );

    check(
      "FormItem reports one missing group and inherits its name",
      !owner("library").checkValidity() &&
        !!errorText() &&
        get("library-group").name === "choice" &&
        entries("library").length === 0,
    );
    get("blank").$input.click();
    check(
      "native click corrects FormItem error with one group change",
      checked("blank") &&
        owner("library").checkValidity() &&
        !errorText() &&
        equal(entries("library"), [["choice", ""]]) &&
        equal(directChanges("library-group"), [""]),
    );
  },

  verifyReset() {
    const events = changes.length;
    const start = resetCalls.length;
    get("a").defaultValue = "a";
    owner("native").reset();
    owner("other-owner").reset();
    get("library").reset();
    const calls = resetCalls.slice(start);
    check(
      "browser reset calls each field once and emits no user event",
      changes.length === events &&
        calls.length ===
          document.querySelectorAll("l-checkbox,l-checkbox-group,l-radio,l-radio-group").length &&
        new Set(calls).size === calls.length,
    );
    check(
      "reset restores both owners' defaults and retains half selection",
      checked("a") &&
        checked("selected") &&
        checked("peer-a") &&
        !get("half").checked &&
        get("half").$input.indeterminate &&
        selected("library-group").length === 0 &&
        entries("library").length === 0 &&
        !errorText(),
    );
  },
};