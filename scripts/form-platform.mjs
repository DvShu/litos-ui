/** Migration gate; not wired into production controls before T326. */
export function inspectFormPlatform(scope = globalThis) {
  const missing = [];
  const requireFunction = (object, key, label) => {
    if (typeof object?.[key] !== "function") missing.push(label);
  };
  requireFunction(scope.HTMLElement?.prototype, "attachInternals", "HTMLElement.attachInternals");
  requireFunction(scope.customElements, "define", "customElements.define");
  requireFunction(scope, "FormData", "FormData");
  const internals = scope.ElementInternals?.prototype;
  for (const name of ["setFormValue", "setValidity", "checkValidity", "reportValidity"]) {
    requireFunction(internals, name, `ElementInternals.${name}`);
  }
  for (const name of ["form", "labels", "validity", "validationMessage", "willValidate"]) {
    if (!internals || !(name in internals)) missing.push(`ElementInternals.${name}`);
  }
  for (const name of ["requestSubmit", "reset", "checkValidity"]) {
    requireFunction(scope.HTMLFormElement?.prototype, name, `HTMLFormElement.${name}`);
  }
  return { supported: missing.length === 0, missing };
}

export function assertFormPlatform(scope = globalThis) {
  const result = inspectFormPlatform(scope);
  if (!result.supported) {
    throw new Error(
      `Litos UI native forms require iOS/iPadOS 16.4+ or equivalent capabilities. Missing: ${result.missing.join(", ")}`,
    );
  }
  return result;
}