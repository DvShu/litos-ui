// Explicit dependency imports are part of the consumer contract.
import "litos-ui/form-item";
import "litos-ui/form";
import "litos-ui/input";
import "litos-ui/checkbox";
import "litos-ui/checkbox-group";
import "litos-ui/radio";
import "litos-ui/radio-group";
import "litos-ui/button";
import "litos-ui/select-ori";
import "litos-ui/switch";
import "litos-ui/icon/theme-default";
import "litos-ui/icon/sun";
import "litos-ui/icon/moon";
import "litos-ui/theme";
import { applyTheme, getTheme } from "utilane/browser";

const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const tick = () => new Promise((resolve) => setTimeout(resolve, 20));
const waitFor = async (predicate) => {
  for (let attempt = 0; attempt < 100 && !predicate(); attempt++) await tick();
};
const observeThemeChanges = (theme) => {
  const events = [];
  const capture = (event) => {
    if (event.target === theme) {
      events.push({ source: event.composedPath()[0], detail: event.detail });
    }
  };
  document.body.addEventListener("change", capture, true);
  return {
    matches: (...values) =>
      events.length === values.length &&
      events.every((event, index) => event.source === theme && event.detail === values[index]),
    stop: () => document.body.removeEventListener("change", capture, true),
  };
};
try {
  await applyTheme("light", true, false);
  const buttonTheme = document.createElement("l-theme");
  document.body.append(buttonTheme);
  const button = buttonTheme.shadowRoot.querySelector("l-button");
  const buttonEvents = observeThemeChanges(buttonTheme);
  button.click();
  button.click();
  await waitFor(() => buttonTheme.theme === "auto");
  check("rapid-button-clicks-apply-the-latest-choice-once", buttonEvents.matches("auto"));
  check(
    "rapid-button-clicks-sync-theme-and-page",
    buttonTheme.theme === "auto" && getTheme() === "auto",
  );
  button.click();
  await waitFor(() => buttonTheme.theme === "dark");
  check("button-remains-interactive-after-rapid-clicks", buttonEvents.matches("auto", "dark"));
  buttonEvents.stop();
  buttonTheme.remove();
  await applyTheme("light", true, false);

  for (const label of ["text", "icon"]) {
    const theme = document.createElement("l-theme");
    theme.setAttribute("type", "radio");
    theme.setAttribute("label", label);
    const changes = [];
    theme.addEventListener("change", (event) => changes.push(event.detail));
    const captured = observeThemeChanges(theme);
    document.body.append(theme);
    let group = theme.shadowRoot.querySelector("l-radio-group");
    let radios = [...group.querySelectorAll("l-radio")];
    check(
      `${label}-initial-selection-without-form-owner`,
      group.value === "light" && radios[1].checked && group.form === null,
    );
    radios[2].click();
    await waitFor(() => theme.theme === "dark");
    check(
      `${label}-one-public-change`,
      changes.length === 1 && changes[0] === "dark" && getTheme() === "dark",
    );
    check(
      `${label}-mutual-exclusion`,
      group.value === "dark" &&
        radios[2].checked &&
        radios.filter((radio) => radio.checked).length === 1,
    );
    const before = changes.length;
    radios[2].click();
    await tick();
    check(`${label}-same-selection-is-silent`, changes.length === before);
    group.disabled = true;
    radios[1].click();
    check(
      `${label}-disabled-is-silent`,
      group.value === "dark" &&
        changes.length === before &&
        radios.every((radio) => radio.$input.disabled),
    );
    group.disabled = false;
    radios[1].$input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
    await waitFor(() => theme.theme === "light");
    check(
      `${label}-keyboard-one-change`,
      changes.length === before + 1 && changes.at(-1) === "light",
    );
    theme.remove();
    document.body.append(theme);
    group = theme.shadowRoot.querySelector("l-radio-group");
    radios = [...group.querySelectorAll("l-radio")];
    check(`${label}-remount-selection`, radios[1].checked && group.value === "light");
    radios[0].click();
    await waitFor(() => theme.theme === "auto");
    check(
      `${label}-remount-one-auto-change`,
      changes.length === before + 2 && changes.at(-1) === "auto" && getTheme() === "auto",
    );
    check(
      `${label}-only-theme-change-crosses-the-shadow-boundary`,
      captured.matches("dark", "light", "auto"),
    );
    captured.stop();
    theme.remove();
    await applyTheme("light", true, false);
  }
  const pendingTheme = document.createElement("l-theme");
  pendingTheme.setAttribute("type", "radio");
  let pendingChanges = 0;
  pendingTheme.addEventListener("change", () => pendingChanges++);
  document.body.append(pendingTheme);
  pendingTheme.shadowRoot.querySelectorAll("l-radio")[2].click();
  pendingTheme.remove();
  document.body.append(pendingTheme);
  await waitFor(() => getTheme() === "dark");
  await tick();
  check("remount-drops-old-pending-theme-change", pendingChanges === 0);
  pendingTheme.remove();
  await applyTheme("light", true, false);
  for (const type of ["select", "switch"]) {
    const theme = document.createElement("l-theme");
    theme.setAttribute("type", type);
    const changes = [];
    theme.addEventListener("change", (event) => changes.push(event.detail));
    const captured = observeThemeChanges(theme);
    document.body.append(theme);
    const inner = theme.shadowRoot.querySelector(".l-theme-inner");
    if (type === "switch") inner.click();
    else {
      const select = inner.shadowRoot.querySelector("select");
      select.value = "dark";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await waitFor(() => changes.length > 0);
    check(
      `${type}-one-public-change`,
      theme.theme === "dark" && changes.length === 1 && changes[0] === "dark",
    );
    check(`${type}-only-theme-change-crosses-the-shadow-boundary`, captured.matches("dark"));
    captured.stop();
    theme.remove();
    await applyTheme("light", true, false);
  }

  const peers = [["button"], ["select"], ["switch"], ["radio"], ["radio", "icon"]].map(
    ([type, label]) => {
      const theme = document.createElement("l-theme");
      theme.setAttribute("type", type);
      if (label) theme.setAttribute("label", label);
      document.body.append(theme);
      return theme;
    },
  );
  const [peerButton, peerSelect, peerSwitch, textTheme, iconTheme] = peers;
  const textChanges = observeThemeChanges(textTheme);
  const iconChanges = observeThemeChanges(iconTheme);
  const selectChanges = observeThemeChanges(peerSelect);
  const switchChanges = observeThemeChanges(peerSwitch);
  const buttonChanges = observeThemeChanges(peerButton);
  const themeControl = (theme) => theme.shadowRoot.querySelector(".l-theme-inner");
  const option = (theme, value) => themeControl(theme).querySelector(`l-radio[value="${value}"]`);
  const matchesMode = (mode) =>
    peers.every((theme) => theme.theme === mode) &&
    !!themeControl(peerButton).querySelector(mode === "auto" ? "l-sun-icon" : "l-moon-icon") &&
    themeControl(peerSelect).value === mode &&
    themeControl(peerSwitch).value === (mode === "dark") &&
    option(textTheme, mode).checked &&
    option(iconTheme, mode).checked;

  option(textTheme, "dark").click();
  await waitFor(() => matchesMode("dark") && textChanges.matches("dark"));
  check("text-radio-synchronizes-all-peer-controls", matchesMode("dark"));
  check(
    "peer-synchronization-stays-silent",
    textChanges.matches("dark") &&
      iconChanges.matches() &&
      selectChanges.matches() &&
      switchChanges.matches() &&
      buttonChanges.matches(),
  );

  option(iconTheme, "light").click();
  await waitFor(() => matchesMode("light") && iconChanges.matches("light"));
  check(
    "icon-radio-can-select-the-previous-mode-after-sync",
    matchesMode("light") && getTheme() === "light",
  );

  document.documentElement.removeAttribute("class");
  option(textTheme, "auto").click();
  await waitFor(() => matchesMode("auto") && textChanges.matches("dark", "auto"));
  check(
    "auto-synchronizes-peers-without-a-root-class-attribute",
    matchesMode("auto") && !document.documentElement.hasAttribute("class"),
  );

  iconTheme.remove();
  await applyTheme("dark", true, false);
  check(
    "external-theme-change-updates-mounted-controls-and-skips-removed-ones",
    peers.slice(0, -1).every((theme) => theme.theme === "dark") && iconTheme.theme === "auto",
  );
  document.body.append(iconTheme);
  check("remounted-theme-reads-current-document-mode", matchesMode("dark"));
  check(
    "only-activated-peer-emits-public-changes",
    textChanges.matches("dark", "auto") &&
      iconChanges.matches("light") &&
      selectChanges.matches() &&
      switchChanges.matches() &&
      buttonChanges.matches(),
  );

  for (const changes of [textChanges, iconChanges, selectChanges, switchChanges, buttonChanges])
    changes.stop();
  for (const theme of peers) theme.remove();

  for (const type of ["checkbox", "radio"]) {
    const group = document.createElement(`l-${type}-group`);
    group.setAttribute("value", "a");
    group.innerHTML = `<l-${type} value="a">A</l-${type}><div><l-${type} value="b">B</l-${type}></div>`;
    const members = [...group.querySelectorAll(`l-${type}`)];
    const events = [];
    let earlyMemberChanges = 0,
      lateMemberChanges = 0;
    for (const member of members) member.addEventListener("change", () => earlyMemberChanges++);
    group.addEventListener("change", (event) =>
      events.push({ target: event.target, detail: event.detail }),
    );
    document.body.append(group);
    for (const member of members) member.addEventListener("change", () => lateMemberChanges++);
    members[1].click();
    check(
      `${type}-member-listeners-before-and-after-mount`,
      earlyMemberChanges === 1 && lateMemberChanges === 1,
    );
    check(
      `${type}-listener-before-mount-sees-only-group`,
      events.length === 1 &&
        events[0].target === group &&
        events[0].detail.value.toString() === (type === "radio" ? "b" : "a,b"),
    );
    for (let index = 0; index < 3; index++) {
      group.remove();
      document.body.append(group);
      const before = events.length;
      members[index % 2].click();
      check(
        `${type}-remount-${index}-one-change`,
        events.length === before + 1 && events.at(-1).target === group,
      );
    }
    const before = events.length;
    check(
      `${type}-member-listeners-survive-remounts`,
      earlyMemberChanges === 4 && lateMemberChanges === 4,
    );
    group.value = "b";
    check(
      `${type}-programmatic-change-is-silent`,
      events.length === before && members[1].checked && !members[0].checked,
    );
    group.remove();
  }
  const outer = document.createElement("l-checkbox-group");
  outer.setAttribute("value", "outer");
  outer.innerHTML =
    '<l-checkbox value="outer">Outer</l-checkbox><l-checkbox-group><l-checkbox value="inner">Inner</l-checkbox></l-checkbox-group>';
  const inner = outer.querySelector("l-checkbox-group");
  const nestedEvents = [];
  outer.addEventListener("change", (event) => nestedEvents.push(event.target));
  document.body.append(outer);
  inner.querySelector("l-checkbox").click();
  check(
    "nested-group-keeps-nearest-owner-and-one-event",
    outer.value === "outer" &&
      inner.value === "inner" &&
      nestedEvents.length === 1 &&
      nestedEvents[0] === inner,
  );
  outer.remove();

  const form = document.createElement("l-form");
  form.innerHTML =
    '<l-form-item prop="title" label="Title"><l-input value="hello"></l-input></l-form-item><l-radio-group name="mode" value="a"><l-radio value="a">A</l-radio><l-radio value="b">B</l-radio></l-radio-group><l-checkbox-group name="tags" value="a"><l-checkbox value="a">A</l-checkbox><l-checkbox value="b">B</l-checkbox></l-checkbox-group>';
  document.body.append(form);
  await tick();
  const input = form.querySelector("l-input");
  check("combined-business-data", form.getData().title === "hello" && form.getData().mode === "a");
  check(
    "combined-native-data",
    new FormData(form.nativeForm).get("title") === "hello" &&
      new FormData(form.nativeForm).getAll("tags").join() === "a",
  );
  input.value = "changed";
  form.querySelector('l-radio[value="b"]').click();
  check(
    "combined-current-data",
    form.getData().title === "changed" &&
      form.getData().mode === "b" &&
      new FormData(form.nativeForm).get("mode") === "b",
  );
  form.reset();
  check("combined-reset", form.getData().title === "hello" && form.getData().mode === "a");
  form.remove();
} catch (error) {
  checks.push({ name: "exception", pass: false, error: error.stack });
}
document.querySelector("#result").textContent = JSON.stringify({
  userAgent: navigator.userAgent,
  checks,
  pass: checks.every((item) => item.pass),
});