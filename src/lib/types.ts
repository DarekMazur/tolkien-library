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
  email: string;
  emailVerified: boolean;
  password: string;
  isBanned: boolean;
  userName: string;
  role: IRole;
}
