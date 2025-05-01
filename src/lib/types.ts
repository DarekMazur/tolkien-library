export interface IMainMenuList {
  id: string;
  title?: string;
  link?: string;
  isDivider: boolean;
}

export interface INewsEntry {
  id: string;
  date: Date;
  category?: string;
  content: string;
}
