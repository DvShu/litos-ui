export const fieldControlSelector =
  'input:not([type="hidden"],[type="button"],[type="submit"],[type="reset"],[type="image"]),textarea,select';

export type NativeFieldControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function referenceElements(element: Element, attribute: string): Element[] {
  const root = element.getRootNode() as Document | ShadowRoot;
  return (element.getAttribute(attribute) ?? "")
    .split(/\s+/)
    .map((id) => (id ? root.getElementById?.(id) : null))
    .filter((node): node is HTMLElement => !!node);
}

export function referenceText(elements: Iterable<Element>): string {
  return Array.from(elements, (element) => {
    const clone = element.cloneNode(true) as Element;
    for (const decoration of clone.querySelectorAll('[aria-hidden="true"],[hidden],script,style'))
      decoration.remove();
    return clone.textContent?.trim();
  })
    .filter(Boolean)
    .join(" ");
}

let nextDescriptionId = 0;

/** 管理本组件写入的 ARIA 值，移除关联时恢复使用者自己的值。 */
export class FieldAccessibility {
  private readonly attributes = new Map<string, { original: string | null; value: string }>();
  private description?: HTMLElement;

  constructor(private readonly control: HTMLElement) {}

  authoredValue(attribute: string): string | null {
    const actual = this.control.getAttribute(attribute);
    const assigned = this.attributes.get(attribute);
    return assigned && assigned.value === actual ? assigned.original : actual;
  }

  attribute(attribute: string, value?: string): void {
    const original = this.authoredValue(attribute);
    const actual = this.control.getAttribute(attribute);
    if (value === undefined) {
      this.attributes.delete(attribute);
      if (original === actual) return;
      if (original === null) this.control.removeAttribute(attribute);
      else this.control.setAttribute(attribute, original);
    } else {
      this.attributes.set(attribute, { original, value });
      if (value !== actual) this.control.setAttribute(attribute, value);
    }
  }

  describe(container: HTMLElement | ShadowRoot, text: string): void {
    const attribute = "aria-describedby";
    const previous = this.description?.id;
    const current = this.control.getAttribute(attribute) ?? "";
    const ids = current.split(/\s+/).filter((id) => id && id !== previous);
    if (text) {
      if (this.description && this.description.parentNode !== container) {
        this.description.remove();
        this.description = undefined;
      }
      if (!this.description) {
        const root = container.getRootNode() as Document | ShadowRoot;
        const description = this.control.ownerDocument.createElement("span");
        do {
          description.id = `l-form-description-${++nextDescriptionId}`;
        } while (root.getElementById?.(description.id));
        description.hidden = true;
        container.append(description);
        this.description = description;
      }
      if (this.description.textContent !== text) this.description.textContent = text;
      ids.push(this.description.id);
    } else if (this.description) {
      this.description.remove();
      this.description = undefined;
    } else {
      return;
    }
    const next = ids.join(" ");
    if (next && next !== current) this.control.setAttribute(attribute, next);
    else if (!next && current) this.control.removeAttribute(attribute);
  }

  clear(container: HTMLElement | ShadowRoot): void {
    for (const attribute of this.attributes.keys()) this.attribute(attribute);
    this.describe(container, "");
  }
}