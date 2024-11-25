export const icons: { name: string; tagName: string }[] = [];

export function add(tagName: string) {
  if (
    !tagName.endsWith("icon") ||
    tagName === "base-icon" ||
    tagName === "font-icon"
  )
    return;
  let names = tagName.split("-");
  names = names.map((name) => {
    if (name === "icon") return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
  icons.push({ name: names.join(""), tagName: `l-${tagName}` });
}
