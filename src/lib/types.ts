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

export interface IIdentityProps {
  id: string;
  adminContact: {
    name?: string;
    value: string;
  };
}

export interface ICategoryProps {
  id: string;
  title: string;
  slug: string;
  pages?: Array<IPageProps>;
}

export interface IPageProps {
  id: string;
  title: string;
  content: string;
  category?: ICategoryProps;
}
