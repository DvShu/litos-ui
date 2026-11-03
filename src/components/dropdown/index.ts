import { Popover } from "../utils/popover";

export interface DropdownItem {
  key: string;
  label: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}
export type DropdownPlacement =
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-start"
  | "top"
  | "top-end";
export interface DropdownOptions {
  reference: HTMLElement | HTMLElement[] | string;
  items?: DropdownItem[];
  /** Custom menu contents. Takes effect when items is omitted; the caller retains ownership. */
  content?: HTMLElement;
  trigger?: "click" | "hover" | "manual";
  placement?: DropdownPlacement;
  disabled?: boolean;
  closeOnSelect?: boolean;
  onSelect?: (detail: {
    key: string;
    item: DropdownItem;
    index: number;
    reference: HTMLElement | undefined;
  }) => void;
  onOpenChange?: (open: boolean) => void;
}
export interface DropdownInstance {
  readonly popover: Popover;
  readonly menu: HTMLElement;
  show(reference?: HTMLElement): void;
  hide(): void;
  isOpen(): boolean;
  setItems(items: DropdownItem[]): void;
  setDisabled(disabled: boolean): void;
  destroy(): void;
}

/** Creates a browser-only dropdown using the existing Popover display and positioning. */
export function createDropdown(options: DropdownOptions): DropdownInstance {
  const references =
    typeof options.reference === "string"
      ? Array.from(document.querySelectorAll<HTMLElement>(options.reference))
      : Array.isArray(options.reference)
        ? [...options.reference]
        : [options.reference];
  if (!references.length || references.some((reference) => !(reference instanceof HTMLElement)))
    throw new TypeError("Dropdown requires at least one valid reference element");
  const menu = document.createElement("div");
  menu.className = "l-popover l-dropdown-menu";
  menu.setAttribute("role", options.items === undefined && options.content ? "group" : "menu");
  menu.style.display = "none";
  let items: DropdownItem[] = [];
  let activeReference: HTMLElement | undefined;
  let opened = false;
  let destroyed = false;
  const savedAria = references.map((reference) => ({
    reference,
    expanded: reference.getAttribute("aria-expanded"),
    popup: reference.getAttribute("aria-haspopup"),
  }));
  const content = options.items === undefined ? options.content : undefined;
  const contentParent = content?.parentNode;
  const contentNext = content?.nextSibling;
  if (content) menu.append(content);
  document.body.append(menu);
  function render(value: DropdownItem[]) {
    items = Array.isArray(value)
      ? value
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            key: String(item.key ?? ""),
            label: String(item.label ?? ""),
            disabled: !!item.disabled,
            danger: !!item.danger,
            divider: !!item.divider,
          }))
      : [];
    menu.replaceChildren();
    menu.setAttribute("role", "menu");
    items.forEach((item, index) => {
      if (item.divider) {
        const line = document.createElement("div");
        line.setAttribute("role", "separator");
        menu.append(line);
        return;
      }
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "menuitem");
      button.disabled = !!item.disabled;
      button.setAttribute("aria-disabled", String(!!item.disabled));
      button.dataset.dropdownIndex = String(index);
      button.className = item.danger
        ? "l-dropdown-item l-dropdown-item--danger"
        : "l-dropdown-item";
      button.textContent = item.label;
      menu.append(button);
    });
  }
  if (!content) render(options.items || []);
  let instance: Popover;
  instance = new Popover({
    reference: references,
    popover: menu,
    trigger: options.trigger || "click",
    placement: options.placement || "bottom-start",
    arrow: false,
    offset: 6,
    disabled: !!options.disabled,
    updateContent: () => {
      /* Menu contents are managed by this factory. */
    },
    onOpenChange: (open) => {
      references.forEach((reference) =>
        reference.setAttribute("aria-expanded", String(open && reference === activeReference)),
      );
      if (opened !== open) {
        opened = open;
        options.onOpenChange?.(open);
      }
    },
    onOutsideTap: (_event, isReference, isPopover) => {
      if (!isReference && !isPopover) instance.hide();
    },
  });
  // Capture runs before Popover's trigger listener, including clicks on nested trigger content.
  const capture = (event: Event) => {
    activeReference = event.currentTarget as HTMLElement;
  };
  references.forEach((reference) => {
    reference.setAttribute("aria-haspopup", content ? "true" : "menu");
    reference.setAttribute("aria-expanded", "false");
    reference.addEventListener("click", capture, true);
    reference.addEventListener("mouseenter", capture, true);
  });
  const select = (event: Event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(
      "button[data-dropdown-index]",
    );
    if (!button || !menu.contains(button) || button.disabled || instance.options.disabled) return;
    const index = Number(button.dataset.dropdownIndex);
    const item = items[index];
    if (!item) return;
    const reference = activeReference;
    if (options.closeOnSelect !== false) instance.hide();
    options.onSelect?.({ key: item.key, item: { ...item }, index, reference });
  };
  menu.addEventListener("click", select);
  return {
    popover: instance,
    menu,
    show(reference = references[0]) {
      if (destroyed) return;
      if (!references.includes(reference)) throw new TypeError("Unknown Dropdown reference");
      activeReference = reference;
      instance.show(reference);
    },
    hide() {
      if (!destroyed) instance.hide();
    },
    isOpen() {
      return !destroyed && instance.isShow();
    },
    setItems(value) {
      if (destroyed) return;
      if (content && menu.contains(content)) {
        if (contentParent)
          contentParent.insertBefore(
            content,
            contentNext?.parentNode === contentParent ? contentNext : null,
          );
        else content.remove();
      }
      render(value);
      references.forEach((reference) => reference.setAttribute("aria-haspopup", "menu"));
      if (opened && activeReference) {
        instance.hide();
        instance.show(activeReference);
      }
    },
    setDisabled(value) {
      if (!destroyed) {
        instance.setOption("disabled", !!value);
        if (value) instance.hide();
      }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      menu.removeEventListener("click", select);
      references.forEach((reference) => {
        reference.removeEventListener("click", capture, true);
        reference.removeEventListener("mouseenter", capture, true);
      });
      instance.destroy();
      if (content && menu.contains(content)) {
        if (contentParent)
          contentParent.insertBefore(
            content,
            contentNext?.parentNode === contentParent ? contentNext : null,
          );
        else content.remove();
      }
      savedAria.forEach(({ reference, expanded, popup }) => {
        if (expanded === null) reference.removeAttribute("aria-expanded");
        else reference.setAttribute("aria-expanded", expanded);
        if (popup === null) reference.removeAttribute("aria-haspopup");
        else reference.setAttribute("aria-haspopup", popup);
      });
    },
  };
}
export default createDropdown;