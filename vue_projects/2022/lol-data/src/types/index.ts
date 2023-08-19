export type MenuType = {
  name: string;
  label: string;
  child?: Array<MenuChildType>;
};

export type MenuChildType = {
  name: string;
  label: string;
  imageUrl: string;
  data?: any;
};
