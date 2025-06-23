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

export interface IRegisteredUser {
  avatar: string;
  email: string;
  emailVerified: boolean;
  userName: string;
}

export interface IUser extends IRegisteredUser {
  id: string;
  isBanned: boolean;
  role: IRole;
}
