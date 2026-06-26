export type MenuItem = {
  key: string;
  label: string | ((item: MenuItem) => HTMLElement);
  icon?: (item: MenuItem) => HTMLElement;
  children?: MenuItem[];
};