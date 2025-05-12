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

export interface IRole {
  id: string;
  roleName: string;
  roleShorthand: string;
}

export interface IUser {
  id: string;
  avatar: string;
  email: string;
  emailVerified: boolean;
  isBanned: boolean;
  userName: string;
  role: IRole;
}
