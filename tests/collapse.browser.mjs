import "../src/components/entries/collapse.ts";

const result = document.querySelector("#result");
const checks = [];
const check = (name, pass) => {
  if (!pass) throw new Error(name);
  checks.push(name);
};
const checkEqual = (name, actual, expected) => {
  const observed = JSON.stringify(actual);
  const wanted = JSON.stringify(expected);
  if (observed !== wanted) throw new Error(`${name}: expected ${wanted}, got ${observed}`);
  checks.push(name);
};
const frame = () =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
const header = (item) => item.shadowRoot.querySelector('[part="header"]');
const toggle = (item) => header(item).querySelector("button");
const open = (item) => item.classList.contains("l-collapse-expand");
const style = (element) => getComputedStyle(element);
const direction = (item) => style(header(item)).flexDirection;
const alignment = (item) => style(header(item)).justifyContent.replace(/^flow-/, "flex-");

try {
  const lateGroup = document.querySelector("#late-collapse");
  const [lateA, lateB] = lateGroup.querySelectorAll("l-collapse-item");
  check(
    "items in existing markup adopt the group's selection, initial expand and layout",
    open(lateA) && open(lateB) && [lateA, lateB].every((item) => direction(item) === "row-reverse"),
  );
  lateGroup.setAttribute("prop", "b");
  check(
    "late-registered items subscribe silently",
    !open(lateA) && open(lateB) && !window.upgradeEvents.length,
  );

  const fixture = document.createElement("div");
  const changes = [];
  const itemChanges = [];
  fixture.addEventListener("change", (event) => changes.push(event.detail));
  fixture.addEventListener("expand-change", (event) => itemChanges.push(event.detail));
  fixture.innerHTML = `
    <l-collapse prop="a" background gap="8" arrow-placement="right">
      <l-collapse-item prop="a" expand="false">A</l-collapse-item>
      <div>
        <l-collapse-item prop="b" expand>B</l-collapse-item>
      </div>
    </l-collapse>
    <l-collapse-item prop="solo" expand>
      <span slot="header-text" id="caption">Custom title</span>
      <button type="button" slot="header-text"><span>Button</span></button>
      <a slot="header-text" href="#collapse-anchor">Link</a>
      <span slot="header-text" role="button" tabindex="0">Custom action</span>
      <div id="collapse-anchor">Content</div>
    </l-collapse-item>`;
  document.body.append(fixture);
  const group = fixture.querySelector("l-collapse");
  const [a, b, solo] = fixture.querySelectorAll("l-collapse-item");
  check(
    "opt-in entry registers both elements",
    customElements.get("l-collapse") && customElements.get("l-collapse-item"),
  );
  check("initial prop and expand work with a wrapper", [a, b, solo].every(open));
  check("initial expansion is silent", !changes.length && !itemChanges.length);

  group.setAttribute("prop", "b");
  check(
    "changing prop updates both items silently",
    !open(a) && open(b) && !changes.length && !itemChanges.length,
  );
  group.removeAttribute("prop");
  check(
    "removing prop clears selection silently",
    !open(a) && !open(b) && !changes.length && !itemChanges.length,
  );
  b.removeAttribute("expand");
  b.setAttribute("expand", "");
  check(
    "changing a wrapped item's expand updates the group silently",
    !open(a) && open(b) && !changes.length && !itemChanges.length,
  );

  group.setAttribute("accordion", "");
  header(a).click();
  check(
    "an accordion click emits exactly one item and one group event",
    open(a) && !open(b) && changes.length === 1 && itemChanges.length === 1,
  );
  check(
    "event details report the actual selection",
    changes[0].value === "a" &&
      changes[0].expands.join() === "a" &&
      itemChanges[0].prop === "a" &&
      itemChanges[0].expand === true,
  );
  changes[0].expands.push("external");
  check("the event payload does not share the internal array", a.expands().join() === "a");
  group.setAttribute("prop", "b&a");
  check(
    "accordion prop picks the first name silently",
    !open(a) && open(b) && changes.length === 1 && itemChanges.length === 1,
  );

  fixture.append(b);
  check(
    "moving out clears injected state and layout",
    !b.context &&
      !b.expands &&
      style(b).backgroundColor === "rgba(0, 0, 0, 0)" &&
      style(header(b)).paddingLeft === "0px" &&
      direction(b) === "row",
  );
  group.removeAttribute("prop");
  group.setAttribute("arrow-placement", "left");
  group.setAttribute("arrow-placement", "right");
  check("the former owner cannot change a standalone panel", open(b) && direction(b) === "row");
  group.querySelector("div").append(b);
  check(
    "reattaching adopts current group state and layout silently",
    !open(b) &&
      direction(b) === "row-reverse" &&
      style(header(b)).paddingLeft === "15px" &&
      changes.length === 1 &&
      itemChanges.length === 1,
  );

  const button = solo.querySelector("button");
  let clicks = 0;
  button.addEventListener("click", () => clicks++);
  button.firstElementChild.click();
  solo.querySelector("a").click();
  solo.querySelector('[role="button"]').click();
  check(
    "title controls keep their own behavior without toggling the panel",
    open(solo) && clicks === 1 && location.hash === "#collapse-anchor" && itemChanges.length === 1,
  );
  solo.querySelector("#caption").click();
  check(
    "plain slotted title text still toggles a standalone panel",
    !open(solo) &&
      itemChanges.length === 2 &&
      itemChanges[1].prop === "solo" &&
      itemChanges[1].expand === false &&
      changes.length === 1,
  );

  const originalHeader = header(solo);
  solo.setAttribute("header-text", "<b>literal text</b>");
  await frame();
  check(
    "changing from a slot to text is safe and preserves the header",
    header(solo) === originalHeader &&
      header(solo).querySelector('[part="header-text"]').textContent === "<b>literal text</b>" &&
      !header(solo).querySelector("b, slot"),
  );
  solo.setAttribute("header-text", "Updated");
  await frame();
  check(
    "changing text updates the existing title",
    header(solo).querySelector('[part="header-text"]').textContent === "Updated",
  );
  solo.removeAttribute("header-text");
  await frame();
  check(
    "removing header-text restores the slot",
    header(solo).querySelector("slot").assignedElements().includes(button),
  );
  check("title updates are silent", changes.length === 1 && itemChanges.length === 2);

  const boundaryFixture = document.createElement("div");
  boundaryFixture.innerHTML = `
    <l-collapse accordion prop="a">
      <l-collapse-item prop="a">A</l-collapse-item>
      <div><l-collapse-item prop="b">B</l-collapse-item></div>
    </l-collapse>`;
  document.body.append(boundaryFixture);
  const boundaryGroup = boundaryFixture.querySelector("l-collapse");
  const [boundaryA, boundaryB] = boundaryFixture.querySelectorAll("l-collapse-item");
  const groupEvents = [];
  let itemEvents = 0;
  let bubbledItemEvents = 0;
  boundaryFixture.addEventListener("change", (event) => groupEvents.push(event.detail.value));
  boundaryFixture.addEventListener("expand-change", () => bubbledItemEvents++);
  boundaryB.addEventListener("expand-change", (event) => {
    itemEvents++;
    event.stopPropagation();
  });
  header(boundaryB).click();
  check(
    "stopping the public item event does not prevent group coordination or notification",
    !open(boundaryA) &&
      open(boundaryB) &&
      groupEvents.join() === "b" &&
      itemEvents === 1 &&
      bubbledItemEvents === 0,
  );
  boundaryGroup.querySelector("div").dispatchEvent(
    new CustomEvent("expand-change", {
      bubbles: true,
      composed: true,
      detail: { prop: "a", expand: true },
    }),
  );
  boundaryB.dispatchEvent(
    new CustomEvent("expand-change", {
      bubbles: true,
      composed: true,
      detail: { prop: "b", expand: false },
    }),
  );
  check(
    "same-name events dispatched on a descendant or an item do not change group state",
    !open(boundaryA) && open(boundaryB) && groupEvents.join() === "b" && bubbledItemEvents === 1,
  );

  group.removeAttribute("accordion");
  const alias = document.createElement("l-collapse-item");
  alias.setAttribute("prop", "a");
  group.querySelector("div").append(alias);
  const beforeGroupEvents = changes.length;
  const beforeItemEvents = itemChanges.length;
  a.expands(["a", "b", "a"]);
  check(
    "the callable expansion API preserves order and duplicates while synchronizing all items",
    a.expands().join() === "a,b,a" && b.expands === a.expands && [a, b, alias].every(open),
  );
  let renders = 0;
  const applyExpand = a._handleExpand.bind(a);
  a._handleExpand = () => {
    renders++;
    applyExpand();
  };
  a.expands(["a", "b", "a"]);
  check(
    "equivalent expansion lists leave the DOM and public events unchanged",
    renders === 0 &&
      changes.length === beforeGroupEvents &&
      itemChanges.length === beforeItemEvents,
  );
  header(alias).click();
  check(
    "aliases apply the same state without reporting another user request",
    !open(alias) &&
      !open(a) &&
      open(b) &&
      changes.length === beforeGroupEvents + 1 &&
      itemChanges.length === beforeItemEvents + 1 &&
      changes.at(-1).expands.join() === "b",
  );

  const destination = document.createElement("l-collapse");
  const destinationWrapper = document.createElement("div");
  destination.append(destinationWrapper);
  document.body.append(destination);
  destinationWrapper.append(b);
  a.expands(["b", "a"]);
  check(
    "a wrapped item releases the former group's state updates after moving",
    !open(b) && b.expands !== a.expands && open(a) && open(alias),
  );
  destination.setAttribute("prop", "b");
  check("a wrapped move subscribes to its destination", open(b) && b.expands().join() === "b");

  const legacy = document.createElement("l-collapse-item");
  legacy.setAttribute("prop", "legacy");
  let legacyExpands = ["legacy"];
  let legacyLayout = {
    arrowPlacement: "left",
    headerJustify: "flex-start",
    background: false,
  };
  const legacyEvents = [];
  legacy.addEventListener("expand-change", (event) => legacyEvents.push(event.detail));
  legacy.contextInject(
    () => legacyLayout,
    () => legacyExpands,
  );
  document.body.append(legacy);
  check(
    "two-argument context injection reads initial snapshots on mount",
    open(legacy) && direction(legacy) === "row" && legacyEvents.length === 0,
  );
  legacyExpands = [];
  legacyLayout = { arrowPlacement: "right", headerJustify: "space-between", background: true };
  check(
    "source changes wait for the caller's explicit refresh",
    open(legacy) && direction(legacy) === "row",
  );
  legacy._updateLayout();
  legacy._handleExpandsChange();
  legacy._handleExpandsChange();
  check(
    "explicit updates apply the latest injected layout and selection silently",
    !open(legacy) &&
      direction(legacy) === "row-reverse" &&
      alignment(legacy) === "space-between" &&
      style(header(legacy)).paddingLeft === "15px" &&
      legacyEvents.length === 0,
  );
  for (let attempt = 0; attempt < 4; attempt++) {
    const previousHeader = header(legacy);
    const wasOpen = open(legacy);
    legacy.remove();
    document.body.append(legacy);
    legacyExpands = wasOpen ? [] : ["legacy"];
    legacy._handleExpandsChange();
    previousHeader.click();
    check(
      `standalone remount ${attempt + 1} releases the provider and old header`,
      open(legacy) === wasOpen &&
        direction(legacy) === "row" &&
        !legacy.context &&
        !legacy.expands &&
        legacyEvents.length === attempt,
    );
    header(legacy).click();
    check(
      `standalone remount ${attempt + 1} publishes a single toggle`,
      open(legacy) !== wasOpen &&
        legacyEvents.length === attempt + 1 &&
        legacyEvents.at(-1).expand === open(legacy),
    );
  }

  const layoutScope = document.createElement("div");
  layoutScope.style.setProperty("--l-collapse-gap", "19px");
  layoutScope.style.setProperty("--l-collapse-border-radius", "24px");
  layoutScope.style.setProperty("--l-collapse-header-direction", "row-reverse");
  layoutScope.innerHTML = `<l-collapse border-radius="9" background="on">
    <l-collapse-item header-text="Direct">Direct</l-collapse-item>
    <div>
      <l-collapse-item header-text="First">First</l-collapse-item>
      <l-collapse-item header-text="Last">Last</l-collapse-item>
    </div>
  </l-collapse>`;
  const layoutEvents = [];
  layoutScope.addEventListener("expand-change", (event) => layoutEvents.push(event.type));
  layoutScope.addEventListener("change", (event) => layoutEvents.push(event.type));
  document.body.append(layoutScope);
  const layoutGroup = layoutScope.querySelector("l-collapse");
  const [direct, first, last] = layoutScope.querySelectorAll("l-collapse-item");
  check(
    "group defaults isolate inherited presentation while retaining wrapper-edge radii",
    style(layoutGroup).gap === "0px" &&
      direction(first) === "row" &&
      style(first).borderTopLeftRadius === "9px" &&
      style(first).borderBottomLeftRadius === "0px" &&
      style(last).borderTopLeftRadius === "0px" &&
      style(last).borderBottomLeftRadius === "9px" &&
      style(first).borderTopWidth === "1px" &&
      style(last).borderTopWidth === "0px",
  );
  layoutGroup.setAttribute("border-radius", "13px");
  await frame();
  check(
    "dynamic radius updates on its own",
    style(direct).borderTopLeftRadius === "13px" && style(first).borderTopLeftRadius === "13px",
  );
  layoutGroup.removeAttribute("border-radius");
  await frame();
  check(
    "dynamic radius removal restores the local default",
    style(first).borderTopLeftRadius === "0px" && style(last).borderBottomLeftRadius === "0px",
  );

  layoutGroup.setAttribute("header-justify", "flex-end");
  check(
    "left arrow honors explicit end alignment",
    direction(first) === "row" && alignment(first) === "flex-end",
  );
  layoutGroup.setAttribute("arrow-placement", "right");
  check(
    "a right arrow preserves the trailing alignment",
    direction(first) === "row-reverse" && alignment(first) === "flex-start",
  );
  layoutGroup.removeAttribute("header-justify");
  check(
    "removing alignment restores leading placement for the right arrow",
    alignment(first) === "flex-end",
  );
  layoutGroup.removeAttribute("arrow-placement");
  layoutGroup.setAttribute("background", "false");
  check(
    "attribute fallback applies defaults to wrapped items",
    direction(first) === "row" &&
      alignment(first) === "flex-start" &&
      style(header(first)).paddingLeft === "0px",
  );

  layoutGroup.setAttribute("background", "background");
  layoutGroup.setAttribute("gap", "0");
  layoutGroup.setAttribute("border-radius", "8px 12px / 3px 5px");
  await frame();
  check(
    "explicit zero gap preserves separated frames and full CSS radius syntax",
    style(layoutGroup).gap === "0px" &&
      style(last).borderTopWidth === "1px" &&
      style(last).borderTopLeftRadius === "8px 3px" &&
      style(last).borderTopRightRadius === "12px 5px",
  );
  layoutGroup.setAttribute("gap", "calc(4px + 3px)");
  check("CSS length expressions still set the gap", style(layoutGroup).gap === "7px");
  layoutGroup.removeAttribute("gap");
  check(
    "removing the gap restores the local zero and continuous frames",
    style(layoutGroup).gap === "0px" && style(last).borderTopWidth === "0px",
  );

  layoutGroup.style.setProperty("--l-collapse-gap", "17px");
  layoutGroup.style.setProperty("--l-collapse-border-radius", "7px");
  layoutGroup.style.setProperty("--l-collapse-border-color", "#123456");
  layoutGroup.setAttribute("border-radius", "4px");
  layoutGroup.setAttribute("gap", "6");
  layoutGroup.removeAttribute("gap");
  await frame();
  check(
    "host overrides survive attribute updates and reach wrapped items",
    style(layoutGroup).gap === "17px" &&
      style(first).borderTopLeftRadius === "7px" &&
      style(first).borderBottomColor === "rgb(18, 52, 86)",
  );
  const layout = first.context();
  first.context({ ...layout, arrowPlacement: "right", headerJustify: "space-between" });
  check(
    "the callable group layout API applies ordinary snapshots",
    direction(last) === "row-reverse" &&
      alignment(last) === "space-between" &&
      !layoutEvents.length,
  );

  const animationFixture = document.createElement("div");
  animationFixture.innerHTML = `<l-collapse prop="animated">
    <div><l-collapse-item prop="animated" header-text="Animated">
      <div style="height: 80px">Content</div>
    </l-collapse-item></div>
  </l-collapse>`;
  const animationEvents = [];
  animationFixture.addEventListener("change", (event) => animationEvents.push(event.type));
  animationFixture.addEventListener("expand-change", (event) => animationEvents.push(event.type));
  document.body.append(animationFixture);
  const animationGroup = animationFixture.querySelector("l-collapse");
  const animatedItem = animationFixture.querySelector("l-collapse-item");
  const panel = () => animatedItem.shadowRoot.querySelector(".l-collapse-content");
  await frame();
  for (const animation of panel().getAnimations()) animation.finish();
  await frame();
  check(
    "initial height settles with the panel open",
    open(animatedItem) && style(panel()).display === "block",
  );

  const animations = [];
  const fullHeight = panel().getBoundingClientRect().height;
  const observeHeightAnimation = (element) => {
    const animate = element.animate.bind(element);
    element.animate = (frames, options) => {
      const animation = animate(frames, options);
      animation.pause();
      animations.push({ frames, animation });
      return animation;
    };
  };
  observeHeightAnimation(panel());
  animationGroup.setAttribute("prop", "missing");
  check(
    "the intermediate selection is readable in the same turn",
    !open(animatedItem) && animatedItem.expands().join() === "missing",
  );
  animationGroup.setAttribute("prop", "animated");
  await frame();
  check(
    "a parent prop round trip schedules no height animation",
    open(animatedItem) && style(panel()).display === "block" && !animations.length,
  );

  animationGroup.setAttribute("prop", "missing");
  animatedItem.setAttribute("expand", "");
  await frame();
  check(
    "opposing parent and child updates in one frame leave height unchanged",
    open(animatedItem) && !animations.length && !animationEvents.length,
  );

  animationGroup.setAttribute("prop", "animated");
  animationGroup.setAttribute("prop", "missing");
  animatedItem.setAttribute("expand", "false");
  check(
    "a changed target defers its height animation until the next frame",
    !open(animatedItem) && !animations.length,
  );
  await frame();
  check(
    "a frame with one different final state starts one animation",
    animations.length === 1 && !animationEvents.length,
  );
  const closing = animations[0].animation;
  const oldFinish = closing.onfinish;
  closing.pause();
  closing.currentTime = 75;
  const midway = panel().getBoundingClientRect().height;
  animatedItem.setAttribute("expand", "true");
  await frame();
  check(
    "reversal cancels the old animation and starts from the current height",
    animations.length === 2 &&
      closing.playState === "idle" &&
      closing.onfinish === null &&
      midway > 0 &&
      midway < fullHeight &&
      Math.abs(parseFloat(animations[1].frames[0].height) - midway) < 1,
  );
  oldFinish?.();
  check(
    "an obsolete finish callback leaves the reopened panel visible",
    open(animatedItem) && style(panel()).display === "block",
  );

  animatedItem.remove();
  check(
    "unmount cancels the in-progress animation",
    animations[1].animation.playState === "idle" && animations[1].animation.onfinish === null,
  );
  animationGroup.querySelector("div").append(animatedItem);
  observeHeightAnimation(panel());
  animatedItem.setAttribute("expand", "false");
  const detachedPanel = panel();
  animatedItem.remove();
  await frame();
  check(
    "unmount cancels an uncommitted expansion frame",
    animations.length === 2 && !detachedPanel.isConnected,
  );
  animationGroup.querySelector("div").append(animatedItem);
  header(animatedItem).click();
  check(
    "a remounted click updates the state and emits once per level",
    open(animatedItem) && animationEvents.join() === "change,expand-change",
  );
  await frame();
  check(
    "the height commit emits no extra events",
    animationEvents.join() === "change,expand-change",
  );

  const resizingItem = document.createElement("l-collapse-item");
  const resizingContent = document.createElement("div");
  resizingContent.style.height = "80px";
  resizingContent.style.marginTop = "5px";
  resizingItem.append(resizingContent);
  document.body.append(resizingItem);
  const resizingPanel = resizingItem.shadowRoot.querySelector(".l-collapse-content");
  const firstAnimation = animations.length;
  observeHeightAnimation(resizingPanel);
  resizingItem.setAttribute("expand", "true");
  await frame();
  const openingAnimation = animations[firstAnimation];
  openingAnimation.animation.currentTime = 40;
  const beforeGrowth = resizingPanel.getBoundingClientRect().height;
  resizingContent.style.height = "150px";
  await frame();
  const growingAnimation = animations[firstAnimation + 1];
  check(
    "growth during opening retargets from the visible height within the original duration",
    openingAnimation.animation.playState === "idle" &&
      openingAnimation.frames[1].height === "100px" &&
      growingAnimation.frames[1].height === "170px" &&
      Math.abs(parseFloat(growingAnimation.frames[0].height) - beforeGrowth) < 1 &&
      growingAnimation.animation.effect.getTiming().duration === 110,
  );
  growingAnimation.animation.currentTime = 90;
  const beforeShrink = resizingPanel.getBoundingClientRect().height;
  resizingContent.style.height = "40px";
  await frame();
  const shrinkingAnimation = animations[firstAnimation + 2];
  check(
    "shrinking during opening can retarget below the current visible height",
    growingAnimation.animation.playState === "idle" &&
      shrinkingAnimation.frames[1].height === "60px" &&
      Math.abs(parseFloat(shrinkingAnimation.frames[0].height) - beforeShrink) < 1 &&
      shrinkingAnimation.animation.effect.getTiming().duration === 20,
  );
  shrinkingAnimation.animation.finish();
  await frame();
  const settledHeight = resizingPanel.getBoundingClientRect().height;
  resizingContent.style.height = "100px";
  await frame();
  check(
    "finished opening releases the height and stays at the natural height on further resize",
    settledHeight === 60 &&
      resizingPanel.getBoundingClientRect().height === 120 &&
      animations.length === firstAnimation + 3 &&
      !resizingPanel.getAnimations().length,
  );

  resizingItem.setAttribute("expand", "false");
  await frame();
  const finishingClose = animations[firstAnimation + 3].animation;
  const finishClose = finishingClose.onfinish;
  const visibleWhenReopened = await new Promise((resolve) => {
    finishingClose.onfinish = (event) => {
      resizingItem.setAttribute("expand", "true");
      finishClose.call(finishingClose, event);
      const visible =
        open(resizingItem) && style(resizingPanel).display === "block" && !resizingPanel.inert;
      resizingItem.setAttribute("expand", "false");
      resolve(visible);
    };
    finishingClose.finish();
  });
  check(
    "a closing finish before the next expansion frame cannot hide a reopened panel",
    visibleWhenReopened,
  );
  await frame();
  check(
    "returning to closed before the next frame settles the finished closing animation",
    style(resizingPanel).display === "none" &&
      resizingPanel.inert &&
      finishingClose.playState === "idle" &&
      animations.length === firstAnimation + 4,
  );

  checkSelectionBoundaries();
  await checkSlotChanges();
  result.textContent = JSON.stringify({ checks });
} catch (error) {
  result.textContent = JSON.stringify({ checks, error: error.message });
}

function recordExpansionEvents(fixture) {
  const events = [];
  fixture.addEventListener("change", ({ detail }) => {
    events.push(["change", detail.expands, detail.value]);
  });
  fixture.addEventListener("expand-change", ({ detail }) => {
    events.push(["expand-change", detail.prop, detail.expand]);
  });
  return events;
}

function checkSelectionBoundaries() {
  const fixture = document.createElement("div");
  fixture.innerHTML = `
    <l-collapse id="initial-accordion" accordion prop="a&b">
      <l-collapse-item prop="a" expand="false">A</l-collapse-item>
      <l-collapse-item prop="b" expand>B</l-collapse-item>
      <div><l-collapse-item prop="c" expand>C</l-collapse-item></div>
    </l-collapse>
    <l-collapse id="unmatched-accordion" accordion prop="missing&a">
      <l-collapse-item prop="a">A</l-collapse-item>
    </l-collapse>
    <l-collapse id="empty-prop" prop="">
      <l-collapse-item prop="">Empty identifier</l-collapse-item>
      <div><l-collapse-item>Omitted identifier</l-collapse-item></div>
      <l-collapse-item prop="named">Named item</l-collapse-item>
    </l-collapse>
    <l-collapse id="dynamic-accordion" prop="b&a&b">
      <div><l-collapse-item prop="a">A</l-collapse-item></div>
      <l-collapse-item prop="b">B</l-collapse-item>
    </l-collapse>`;
  const events = recordExpansionEvents(fixture);
  document.body.append(fixture);
  const items = (id) => [...fixture.querySelectorAll(`#${id} l-collapse-item`)];
  const initial = items("initial-accordion");
  checkEqual(
    "initial accordion uses the last explicit initial expansion",
    [initial.map(open), initial[0].expands()],
    [[false, false, true], ["c"]],
  );
  const [unmatched] = items("unmatched-accordion");
  checkEqual(
    "initial accordion keeps an unmatched first identifier",
    [open(unmatched), unmatched.expands()],
    [false, ["missing"]],
  );
  checkEqual("initial selection boundaries apply silently", events, []);

  const emptyItems = items("empty-prop");
  const [explicit, omitted] = emptyItems;
  checkEqual(
    "an empty group prop selects both explicit and omitted empty identifiers",
    [emptyItems.map(open), explicit.expands()],
    [[true, true, false], [""]],
  );
  toggle(explicit).click();
  checkEqual(
    "closing one empty identifier closes both items",
    [emptyItems.map(open), explicit.expands()],
    [[false, false, false], []],
  );
  toggle(omitted).click();
  checkEqual(
    "reopening an empty identifier opens both items and each click emits one event pair",
    [emptyItems.map(open), explicit.expands(), events.splice(0)],
    [
      [true, true, false],
      [""],
      [
        ["change", [], ""],
        ["expand-change", "", false],
        ["change", [""], ""],
        ["expand-change", "", true],
      ],
    ],
  );
  fixture.querySelector("#empty-prop").removeAttribute("prop");
  checkEqual(
    "removing the empty prop clears both aliases silently",
    [emptyItems.map(open), explicit.expands(), events],
    [[false, false, false], [], []],
  );

  const accordion = fixture.querySelector("#dynamic-accordion");
  const accordionItems = items("dynamic-accordion");
  const [first] = accordionItems;
  checkEqual(
    "initial multi-open prop keeps its order and duplicate identifiers",
    [accordionItems.map(open), first.expands()],
    [
      [true, true],
      ["b", "a", "b"],
    ],
  );
  accordion.setAttribute("accordion", "");
  checkEqual(
    "enabling accordion keeps the first selected identifier silently",
    [accordionItems.map(open), first.expands(), events],
    [[false, true], ["b"], []],
  );
  accordion.removeAttribute("accordion");
  first.setAttribute("expand", "");
  checkEqual(
    "disabling accordion allows another item to open silently",
    [accordionItems.map(open), first.expands(), events],
    [[true, true], ["b", "a"], []],
  );
  fixture.remove();
}

async function checkSlotChanges() {
  const fixture = document.createElement("div");
  fixture.innerHTML = `
    <l-collapse id="slot-source" prop="b&a">
      <l-collapse-item id="source-a" prop="a">A</l-collapse-item>
      <div id="slot-wrapper"></div>
    </l-collapse>
    <l-collapse id="slot-destination" prop="a">
      <l-collapse-item id="destination-a" prop="a">A at destination</l-collapse-item>
    </l-collapse>
    <l-collapse-item id="title-projection">
      <span id="old-caption" slot="header-text">Original caption</span>
      Body
    </l-collapse-item>`;
  const events = recordExpansionEvents(fixture);
  document.body.append(fixture);
  await frame();

  const source = fixture.querySelector("#slot-source");
  const destination = fixture.querySelector("#slot-destination");
  const anchor = fixture.querySelector("#source-a");
  const wrapper = fixture.querySelector("#slot-wrapper");
  const sourceSlot = source.shadowRoot.querySelector("slot");
  const destinationSlot = destination.shadowRoot.querySelector("slot");
  const assigned = (slot) => slot.assignedElements().map((element) => element.id);
  const watchAssignment = (slot) => {
    const changes = [];
    slot.addEventListener("slotchange", (event) => changes.push([event.isTrusted, assigned(slot)]));
    return changes;
  };
  const sourceChanges = watchAssignment(sourceSlot);
  const destinationChanges = watchAssignment(destinationSlot);
  checkEqual(
    "the default slot exposes the direct item and its sibling wrapper",
    assigned(sourceSlot),
    ["source-a", "slot-wrapper"],
  );

  const createSelectedItem = (id) => {
    const item = document.createElement("l-collapse-item");
    item.id = id;
    item.setAttribute("prop", "b");
    return item;
  };
  const added = createSelectedItem("added-b");
  source.append(added);
  await frame();
  checkEqual(
    "adding a selected direct item opens it and emits a native slotchange",
    [open(added), sourceChanges.splice(0)],
    [true, [[true, ["source-a", "slot-wrapper", "added-b"]]]],
  );

  const replacement = createSelectedItem("replacement-b");
  added.replaceWith(replacement);
  await frame();
  checkEqual(
    "replacing an item keeps its current selection and projects the new element",
    [open(replacement), added.expands === undefined, sourceChanges.splice(0)],
    [true, true, [[true, ["source-a", "slot-wrapper", "replacement-b"]]]],
  );

  replacement.remove();
  await frame();
  checkEqual(
    "removing a selected item keeps its identifier and updates the default slot",
    [anchor.expands(), sourceChanges.splice(0)],
    [["b", "a"], [[true, ["source-a", "slot-wrapper"]]]],
  );
  source.prepend(replacement);
  await frame();
  checkEqual(
    "reinsertion restores the current selection at the new slot position",
    [open(replacement), sourceChanges.splice(0)],
    [true, [[true, ["replacement-b", "source-a", "slot-wrapper"]]]],
  );

  source.prepend(anchor);
  await frame();
  checkEqual(
    "direct reordering updates projection and preserves selection order",
    [open(anchor), open(replacement), anchor.expands(), sourceChanges.splice(0)],
    [true, true, ["b", "a"], [[true, ["source-a", "replacement-b", "slot-wrapper"]]]],
  );

  const wrapped = createSelectedItem("wrapped-b");
  wrapper.append(wrapped);
  await frame();
  checkEqual(
    "inserting an item inside an existing wrapper does not change the default slot",
    [open(wrapped), assigned(sourceSlot), sourceChanges.splice(0)],
    [true, ["source-a", "replacement-b", "slot-wrapper"], []],
  );

  destination.append(replacement);
  await frame();
  checkEqual(
    "a direct cross-group move adopts destination state and emits native slotchange in each group",
    [open(replacement), anchor.expands(), sourceChanges.splice(0), destinationChanges.splice(0)],
    [
      false,
      ["b", "a"],
      [[true, ["source-a", "slot-wrapper"]]],
      [[true, ["destination-a", "replacement-b"]]],
    ],
  );
  destination.setAttribute("prop", "b");
  checkEqual(
    "the destination can reopen the moved item and structure changes are silent",
    [open(replacement), events],
    [true, []],
  );

  const title = fixture.querySelector("#title-projection");
  const titleSlot = header(title).querySelector('slot[name="header-text"]');
  const titleChanges = watchAssignment(titleSlot);
  checkEqual(
    "the projected title names the toggle",
    toggle(title).getAttribute("aria-label"),
    "Original caption",
  );
  fixture.querySelector("#old-caption").removeAttribute("slot");
  const newCaption = document.createElement("span");
  newCaption.id = "new-caption";
  newCaption.slot = "header-text";
  newCaption.textContent = "Replacement caption";
  title.append(newCaption);
  await frame();
  checkEqual(
    "native title slotchange updates assignment and the toggle's accessible name silently",
    [titleChanges, toggle(title).getAttribute("aria-label"), events],
    [[[true, ["new-caption"]]], "Replacement caption", []],
  );
  fixture.remove();
}