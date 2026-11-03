import assert from "node:assert/strict";
import { test } from "node:test";
import {
  FORM_CONTEXT_EVENTS,
  createFormContextProvider,
  notifyFormConfiguration,
  notifyFormValidity,
  provideFormContext,
  readFormBooleanAttribute,
  requestFormContext,
  resolveFieldContext,
} from "../src/components/form/context.ts";

// Node has no DOM tree. Forward the same mutable request detail through an explicit
// event path; real Shadow DOM/composed routing is exercised by the browser fixture.
class TreeTarget extends EventTarget {
  constructor(parent) {
    super();
    this.parent = parent;
  }
  dispatchEvent(event) {
    const result = super.dispatchEvent(event);
    if (event.bubbles && !event.cancelBubble && this.parent) {
      this.parent.dispatchEvent(
        new CustomEvent(event.type, {
          detail: event.detail,
          bubbles: true,
          composed: event.composed,
        }),
      );
    }
    return result;
  }
}

function provider(snapshot = {}) {
  const fields = new Set();
  return {
    fields,
    getSnapshot: () => ({ ...snapshot }),
    registerField(field) {
      fields.add(field);
      return () => fields.delete(field);
    },
  };
}

test("nearest same-kind provider wins through wrappers and unlike kinds", () => {
  const outer = new TreeTarget();
  const inner = new TreeTarget(outer);
  const item = new TreeTarget(inner);
  const field = new TreeTarget(new TreeTarget(item));
  const outerProvider = provider({ prop: "outer" });
  const innerProvider = provider({ prop: "inner" });
  const itemProvider = provider({ prop: "item" });
  provideFormContext(outer, "form", outerProvider);
  provideFormContext(inner, "form", innerProvider);
  provideFormContext(item, "item", itemProvider);
  assert.equal(requestFormContext(field, "form"), innerProvider);
  assert.equal(requestFormContext(field, "item"), itemProvider);
  assert.equal(requestFormContext(field, "group"), undefined);
  assert.equal(requestFormContext(inner, "form"), outerProvider);
});

test("first responder blocks duplicate listeners on its host", () => {
  const host = new TreeTarget();
  const first = provider();
  provideFormContext(host, "group", first);
  let extraCalls = 0;
  host.addEventListener(FORM_CONTEXT_EVENTS.request, () => extraCalls++);
  assert.equal(requestFormContext(new TreeTarget(host), "group"), first);
  assert.equal(extraCalls, 0);
});

test("provider cleanup, moves and reconnects do not retain stale answers", () => {
  const a = new TreeTarget();
  const b = new TreeTarget();
  const field = new TreeTarget(a);
  const pa = provider();
  const pb = provider();
  const dispose = provideFormContext(a, "form", pa);
  provideFormContext(b, "form", pb);
  assert.equal(requestFormContext(field, "form"), pa);
  field.parent = b;
  assert.equal(requestFormContext(field, "form"), pb);
  field.parent = a;
  dispose();
  dispose();
  assert.equal(requestFormContext(field, "form"), undefined);
  const reconnect = provideFormContext(a, "form", pa);
  assert.equal(requestFormContext(field, "form"), pa);
  reconnect();
});

test("registration uses stable field identity and direct current snapshots", () => {
  const p = provider({ innerBlock: true });
  let name = "before";
  const field = { target: new EventTarget(), getSnapshot: () => ({ name, value: 1 }) };
  const unregister = p.registerField(field);
  name = "after";
  assert.equal([...p.fields][0].getSnapshot().name, "after");
  assert.deepEqual(p.getSnapshot(), { innerBlock: true });
  unregister();
  unregister();
  assert.equal(p.fields.size, 0);
});

test("configuration and validity notifications are direct, copied and removable", () => {
  const parent = new TreeTarget();
  const field = new TreeTarget(parent);
  let ancestorCalls = 0;
  let configuration;
  let validity;
  parent.addEventListener(FORM_CONTEXT_EVENTS.configuration, () => ancestorCalls++);
  const onConfiguration = (event) => {
    assert.equal(event.bubbles, false);
    assert.equal(event.composed, false);
    configuration = event.detail;
  };
  field.addEventListener(FORM_CONTEXT_EVENTS.configuration, onConfiguration);
  field.addEventListener(FORM_CONTEXT_EVENTS.validity, (event) => (validity = event.detail));
  const snapshot = { innerBlock: false, prop: "first" };
  notifyFormConfiguration(field, snapshot);
  snapshot.prop = "changed";
  assert.deepEqual(configuration, { innerBlock: false, prop: "first" });
  notifyFormValidity(field, { valid: false, message: "required" });
  assert.deepEqual(validity, { valid: false, message: "required" });
  notifyFormValidity(field, { valid: true });
  assert.deepEqual(validity, { valid: true });
  assert.equal(ancestorCalls, 0);
  field.removeEventListener(FORM_CONTEXT_EVENTS.configuration, onConfiguration);
  notifyFormConfiguration(field, {});
  assert.equal(configuration.prop, "first");
});

test("explicit false overrides true; missing settings inherit and removals reset", () => {
  const contexts = {
    form: { innerBlock: true, disabled: true, required: true },
    item: { innerBlock: false, prop: "a" },
    group: { required: false },
  };
  assert.deepEqual(resolveFieldContext({}, contexts), {
    name: "a",
    innerBlock: false,
    disabled: true,
    required: false,
  });
  assert.equal(resolveFieldContext({ disabled: false }, contexts).disabled, true);
  assert.equal(resolveFieldContext({ innerBlock: true }, contexts).innerBlock, true);
  assert.equal(
    resolveFieldContext({}, { form: contexts.form, item: { prop: "b" } }).innerBlock,
    true,
  );
  assert.deepEqual(resolveFieldContext({}), {
    name: undefined,
    innerBlock: false,
    disabled: false,
    required: false,
  });
});

test("name override survives prop/layout updates; removing name restores current prop", () => {
  let item = { prop: "before", innerBlock: false };
  assert.equal(resolveFieldContext({}, { item }).name, "before");
  item = { ...item, prop: "after", innerBlock: true };
  assert.equal(resolveFieldContext({ name: "explicit" }, { item }).name, "explicit");
  assert.equal(resolveFieldContext({ name: "" }, { item }).name, "");
  assert.equal(resolveFieldContext({ name: undefined }, { item }).name, "after");
  assert.equal(resolveFieldContext({}, { item: { innerBlock: false } }).name, undefined);
});

test("effective disabled preserves own state while parent disabling is applied and removed", () => {
  const local = { disabled: false };
  assert.equal(resolveFieldContext(local, { group: { disabled: true } }).disabled, true);
  assert.equal(local.disabled, false);
  assert.equal(resolveFieldContext(local, { group: { disabled: false } }).disabled, false);
  local.disabled = true;
  assert.equal(resolveFieldContext(local, { form: { disabled: true } }).disabled, true);
  assert.equal(resolveFieldContext(local, {}).disabled, true);
  assert.equal(
    resolveFieldContext({ disabled: false }, { item: { disabled: true } }).disabled,
    true,
  );
});

test("minimal provider deduplicates fields, replaces configuration, notifies and clears", () => {
  const p = createFormContextProvider({ prop: "first", innerBlock: true });
  const target = new EventTarget();
  let configurationCalls = 0;
  let validityCalls = 0;
  let configuration;
  target.addEventListener(FORM_CONTEXT_EVENTS.configuration, (event) => {
    configurationCalls++;
    configuration = event.detail;
  });
  target.addEventListener(FORM_CONTEXT_EVENTS.validity, () => validityCalls++);
  const field = { target, getSnapshot: () => ({ value: 1 }) };
  const staleUnregister = p.registerField(field);
  const unregister = p.registerField(field);
  staleUnregister();
  assert.equal(p.getFields().length, 1);
  p.getFields().pop();
  assert.equal(p.getFields().length, 1);
  const snapshot = p.getSnapshot();
  snapshot.prop = "not shared";
  assert.equal(p.getSnapshot().prop, "first");
  p.updateConfiguration({ innerBlock: false });
  assert.deepEqual(configuration, { innerBlock: false });
  assert.deepEqual(p.getSnapshot(), { innerBlock: false });
  assert.equal(configurationCalls, 1);
  p.notifyValidity(field, { valid: false });
  assert.equal(validityCalls, 1);
  unregister();
  unregister();
  p.updateConfiguration({});
  p.notifyValidity(field, { valid: true });
  assert.equal(configurationCalls, 1);
  assert.equal(validityCalls, 1);
  p.registerField(field);
  p.dispose();
  p.dispose();
  assert.equal(p.getFields().length, 0);
  p.updateConfiguration({});
  assert.equal(configurationCalls, 1);
  // Reuse after remount; stale cleanup must not remove the fresh registration.
  p.registerField(field);
  unregister();
  assert.equal(p.getFields().length, 1);
  p.dispose();
});

test("boolean attributes distinguish absent, empty, false and named values", () => {
  assert.equal(readFormBooleanAttribute(null), undefined);
  assert.equal(readFormBooleanAttribute(""), true);
  assert.equal(readFormBooleanAttribute("inner-block"), true);
  assert.equal(readFormBooleanAttribute("true"), true);
  assert.equal(readFormBooleanAttribute("false"), false);
  assert.equal(readFormBooleanAttribute(" FALSE "), false);
});